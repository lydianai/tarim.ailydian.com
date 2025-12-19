// IP Whitelisting System
// Advanced IP-based access control for API routes

export interface IPWhitelistConfig {
  enabled: boolean;
  mode: 'whitelist' | 'blacklist';
  defaultAction: 'allow' | 'deny';
  rules: IPRule[];
}

export interface IPRule {
  id: string;
  type: 'single' | 'range' | 'cidr';
  value: string | string[];
  action: 'allow' | 'deny';
  description: string;
  routes?: string[]; // Specific routes this rule applies to
  priority: number; // Lower number = higher priority
}

export interface GeoLocation {
  country?: string;
  region?: string;
  city?: string;
  blocked?: boolean;
}

// Production IP Whitelist Configuration
export const productionWhitelist: IPRule[] = [
  {
    id: 'vercel-edge',
    type: 'cidr',
    value: [
      '76.76.21.0/24',  // Vercel Edge Network
      '76.223.0.0/20'   // Vercel Infrastructure
    ],
    action: 'allow',
    description: 'Vercel Edge Network IPs',
    priority: 1
  },
  {
    id: 'office-network',
    type: 'cidr',
    value: '192.168.1.0/24', // Example office network
    action: 'allow',
    description: 'Company Office Network',
    routes: ['/api/admin/*'],
    priority: 2
  },
  {
    id: 'trusted-partners',
    type: 'single',
    value: [
      '203.0.113.10',  // Example partner IP
      '198.51.100.50'  // Example trusted service
    ],
    action: 'allow',
    description: 'Trusted Partner IPs',
    routes: ['/api/*'],
    priority: 3
  },
  {
    id: 'block-known-bad',
    type: 'single',
    value: [
      '192.0.2.100',   // Example blocked IP
    ],
    action: 'deny',
    description: 'Known malicious IPs',
    priority: 0  // Highest priority
  }
];

// Development IP Whitelist (more permissive)
export const developmentWhitelist: IPRule[] = [
  {
    id: 'localhost',
    type: 'single',
    value: ['127.0.0.1', '::1'],
    action: 'allow',
    description: 'Localhost development',
    priority: 1
  },
  {
    id: 'local-network',
    type: 'cidr',
    value: '192.168.0.0/16',
    action: 'allow',
    description: 'Local network development',
    priority: 2
  }
];

// Get appropriate whitelist based on environment
export function getIPWhitelist(): IPRule[] {
  return process.env.NODE_ENV === 'production'
    ? productionWhitelist
    : developmentWhitelist;
}

// IP Address Utilities
export class IPWhitelistManager {
  private rules: IPRule[];
  private cache: Map<string, boolean>;

  constructor(rules?: IPRule[]) {
    this.rules = rules || getIPWhitelist();
    this.rules.sort((a, b) => a.priority - b.priority); // Sort by priority
    this.cache = new Map();
  }

  // Check if IP is allowed
  isAllowed(ip: string, route?: string): boolean {
    // Check cache first
    const cacheKey = `${ip}:${route || '*'}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Apply rules in priority order
    for (const rule of this.rules) {
      // Check if rule applies to this route
      if (rule.routes && route) {
        const routeMatches = rule.routes.some(r => this.matchRoute(route, r));
        if (!routeMatches) continue;
      }

      // Check if IP matches rule
      if (this.matchesRule(ip, rule)) {
        const allowed = rule.action === 'allow';
        this.cache.set(cacheKey, allowed);
        return allowed;
      }
    }

    // Default action if no rules match
    const defaultAllowed = process.env.NODE_ENV !== 'production'; // Allow in dev, deny in prod
    this.cache.set(cacheKey, defaultAllowed);
    return defaultAllowed;
  }

  // Check if IP matches a specific rule
  private matchesRule(ip: string, rule: IPRule): boolean {
    switch (rule.type) {
      case 'single':
        const values = Array.isArray(rule.value) ? rule.value : [rule.value];
        return values.includes(ip);

      case 'range':
        return this.isInRange(ip, rule.value as string);

      case 'cidr':
        const cidrs = Array.isArray(rule.value) ? rule.value : [rule.value];
        return cidrs.some(cidr => this.isInCIDR(ip, cidr));

      default:
        return false;
    }
  }

  // Check if route matches pattern
  private matchRoute(route: string, pattern: string): boolean {
    // Convert wildcard pattern to regex
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\//g, '\\/');

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(route);
  }

  // Check if IP is in CIDR range
  private isInCIDR(ip: string, cidr: string): boolean {
    const [range, bits] = cidr.split('/');
    const mask = ~(2 ** (32 - parseInt(bits)) - 1);

    const ipNum = this.ipToNumber(ip);
    const rangeNum = this.ipToNumber(range);

    return (ipNum & mask) === (rangeNum & mask);
  }

  // Check if IP is in range
  private isInRange(ip: string, range: string): boolean {
    const [start, end] = range.split('-');
    const ipNum = this.ipToNumber(ip);
    const startNum = this.ipToNumber(start);
    const endNum = this.ipToNumber(end);

    return ipNum >= startNum && ipNum <= endNum;
  }

  // Convert IP string to number
  private ipToNumber(ip: string): number {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
  }

  // Add rule
  addRule(rule: IPRule): void {
    this.rules.push(rule);
    this.rules.sort((a, b) => a.priority - b.priority);
    this.cache.clear(); // Invalidate cache
  }

  // Remove rule
  removeRule(id: string): void {
    this.rules = this.rules.filter(r => r.id !== id);
    this.cache.clear();
  }

  // Get statistics
  getStats(): {
    totalRules: number;
    allowRules: number;
    denyRules: number;
    cacheSize: number;
  } {
    return {
      totalRules: this.rules.length,
      allowRules: this.rules.filter(r => r.action === 'allow').length,
      denyRules: this.rules.filter(r => r.action === 'deny').length,
      cacheSize: this.cache.size
    };
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Geo-blocking capabilities
export class GeoBlocker {
  private blockedCountries: Set<string>;
  private blockedRegions: Map<string, Set<string>>;

  constructor() {
    this.blockedCountries = new Set([
      // Add countries to block if needed
      // 'KP', 'IR', etc.
    ]);

    this.blockedRegions = new Map();
  }

  // Check if location is blocked
  isBlocked(geo: GeoLocation): boolean {
    if (geo.country && this.blockedCountries.has(geo.country)) {
      return true;
    }

    if (geo.country && geo.region) {
      const regions = this.blockedRegions.get(geo.country);
      if (regions && regions.has(geo.region)) {
        return true;
      }
    }

    return false;
  }

  // Block country
  blockCountry(countryCode: string): void {
    this.blockedCountries.add(countryCode);
  }

  // Unblock country
  unblockCountry(countryCode: string): void {
    this.blockedCountries.delete(countryCode);
  }

  // Block region
  blockRegion(countryCode: string, region: string): void {
    if (!this.blockedRegions.has(countryCode)) {
      this.blockedRegions.set(countryCode, new Set());
    }
    this.blockedRegions.get(countryCode)!.add(region);
  }
}

// Rate limiting per IP with advanced features
export class AdvancedRateLimiter {
  private ipLimits: Map<string, {
    count: number;
    resetTime: number;
    violations: number;
    blacklisted: boolean;
  }>;

  private config: {
    maxRequests: number;
    windowMs: number;
    maxViolations: number;
    blacklistDuration: number;
  };

  constructor(config?: Partial<AdvancedRateLimiter['config']>) {
    this.ipLimits = new Map();
    this.config = {
      maxRequests: 100,
      windowMs: 900000, // 15 minutes
      maxViolations: 5,
      blacklistDuration: 3600000, // 1 hour
      ...config
    };
  }

  // Check if request is allowed
  checkLimit(ip: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    blacklisted: boolean;
  } {
    const now = Date.now();
    let record = this.ipLimits.get(ip);

    // Check if blacklisted
    if (record?.blacklisted) {
      if (now < record.resetTime) {
        return {
          allowed: false,
          remaining: 0,
          resetTime: record.resetTime,
          blacklisted: true
        };
      } else {
        // Unblacklist
        record.blacklisted = false;
        record.violations = 0;
      }
    }

    // Create or reset record
    if (!record || now > record.resetTime) {
      record = {
        count: 0,
        resetTime: now + this.config.windowMs,
        violations: record?.violations || 0,
        blacklisted: false
      };
      this.ipLimits.set(ip, record);
    }

    // Increment count
    record.count++;

    // Check limit
    if (record.count > this.config.maxRequests) {
      record.violations++;

      // Blacklist if too many violations
      if (record.violations >= this.config.maxViolations) {
        record.blacklisted = true;
        record.resetTime = now + this.config.blacklistDuration;
      }

      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
        blacklisted: record.blacklisted
      };
    }

    return {
      allowed: true,
      remaining: this.config.maxRequests - record.count,
      resetTime: record.resetTime,
      blacklisted: false
    };
  }

  // Get stats for IP
  getIPStats(ip: string) {
    return this.ipLimits.get(ip) || null;
  }

  // Manually blacklist IP
  blacklistIP(ip: string, duration?: number): void {
    const record = this.ipLimits.get(ip) || {
      count: 0,
      resetTime: 0,
      violations: this.config.maxViolations,
      blacklisted: false
    };

    record.blacklisted = true;
    record.resetTime = Date.now() + (duration || this.config.blacklistDuration);
    this.ipLimits.set(ip, record);
  }

  // Unblacklist IP
  unblacklistIP(ip: string): void {
    const record = this.ipLimits.get(ip);
    if (record) {
      record.blacklisted = false;
      record.violations = 0;
    }
  }

  // Clean old records
  cleanup(): void {
    const now = Date.now();
    for (const [ip, record] of this.ipLimits.entries()) {
      if (!record.blacklisted && now > record.resetTime) {
        this.ipLimits.delete(ip);
      }
    }
  }
}

// Export singleton instances
export const ipWhitelistManager = new IPWhitelistManager();
export const geoBlocker = new GeoBlocker();
export const advancedRateLimiter = new AdvancedRateLimiter();

// Helper function to extract IP from request
export function extractIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return headers.get('x-real-ip') || 'unknown';
}
