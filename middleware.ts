// Next.js Middleware - Advanced Security with IP Whitelisting (Edge Runtime)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IP Whitelist Configuration (Edge-compatible)
const WHITELIST_ENABLED = process.env.IP_WHITELIST_ENABLED === 'true';

// Production IP whitelist for API routes
const API_WHITELIST = new Set([
  // Vercel Edge Network
  '76.76.21.0',
  // Add your office/trusted IPs here
  // '203.0.113.10',
]);

// Trusted admin IPs (for sensitive operations)
const ADMIN_WHITELIST = new Set([
  '127.0.0.1',
  '::1',
  // Add admin IPs
]);

// Enhanced rate limiting with blacklist capability
const rateLimitMap = new Map<string, {
  count: number;
  resetTime: number;
  violations: number;
  blacklisted: boolean;
}>();

// Security headers (Edge compatible)
const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
} as const;

// Content Security Policy
const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.openweathermap.org https://power.larc.nasa.gov https://*.vercel.app https://api.mapbox.com https://*.tiles.mapbox.com https://events.mapbox.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ');

// CIDR matching for IP ranges (Edge-compatible)
function isInCIDR(ip: string, cidr: string): boolean {
  const [range, bits] = cidr.split('/');
  if (!bits) return ip === range;

  const mask = ~(2 ** (32 - parseInt(bits)) - 1);
  const ipNum = ipToNumber(ip);
  const rangeNum = ipToNumber(range);

  return (ipNum & mask) === (rangeNum & mask);
}

function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

// Check if IP is in whitelist
function isWhitelisted(ip: string, route: string): boolean {
  // Development mode: allow all
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Localhost IPs: always allowed
  if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === '::ffff:127.0.0.1') {
    return true;
  }

  // Admin routes: strict whitelist
  if (route.startsWith('/api/admin')) {
    return ADMIN_WHITELIST.has(ip);
  }

  // API routes: whitelist check if enabled
  if (WHITELIST_ENABLED && route.startsWith('/api/')) {
    return API_WHITELIST.has(ip) ||
           isInCIDR(ip, '76.76.21.0/24') || // Vercel Edge
           isInCIDR(ip, '76.223.0.0/20');   // Vercel Infrastructure
  }

  // Public routes: allow all
  return true;
}

// Advanced rate limiting with auto-blacklist
function checkAdvancedRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  blacklisted: boolean;
} {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Development mode or localhost: much higher limits, no blacklist
  const isDev = process.env.NODE_ENV === 'development';
  const isLocalhost = ip === '127.0.0.1' || ip === '::1' || ip === 'localhost' || ip === '::ffff:127.0.0.1';

  const MAX_REQUESTS = (isDev || isLocalhost) ? 10000 : 100;
  const WINDOW_MS = 900000; // 15 min
  const MAX_VIOLATIONS = (isDev || isLocalhost) ? 1000 : 5;
  const BLACKLIST_DURATION = 3600000; // 1 hour

  // Never blacklist localhost or development
  if (isDev || isLocalhost) {
    if (record) {
      record.blacklisted = false;
      record.violations = 0;
    }
  }

  // Check if blacklisted
  if (record?.blacklisted && !(isDev || isLocalhost)) {
    if (now < record.resetTime) {
      return { allowed: false, remaining: 0, blacklisted: true };
    } else {
      // Unblacklist after duration
      record.blacklisted = false;
      record.violations = 0;
    }
  }

  // Create or reset record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
      violations: record?.violations || 0,
      blacklisted: false
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1, blacklisted: false };
  }

  record.count++;

  // Check limit
  if (record.count > MAX_REQUESTS) {
    record.violations++;

    // Auto-blacklist after too many violations
    if (record.violations >= MAX_VIOLATIONS) {
      record.blacklisted = true;
      record.resetTime = now + BLACKLIST_DURATION;
      console.warn(`[SECURITY] IP blacklisted for abuse: ${ip}`);
    }

    return { allowed: false, remaining: 0, blacklisted: record.blacklisted };
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    blacklisted: false
  };
}

// Clean old records
function cleanOldRecords(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (!record.blacklisted && now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Main middleware function
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Extract client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';

  // DEVELOPMENT MODE: Skip all security checks
  if (process.env.NODE_ENV === 'development') {
    const response = NextResponse.next();
    response.headers.set('X-Dev-Mode', 'true');
    response.headers.set('X-Client-IP', ip);

    // Add CORS headers for development
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');

    return response;
  }

  // IP Whitelist check (for protected routes) - ONLY IN PRODUCTION
  if (!isWhitelisted(ip, pathname)) {
    console.warn(`[SECURITY] Blocked non-whitelisted IP: ${ip} -> ${pathname}`);
    return new NextResponse('Forbidden - IP not whitelisted', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Blocked-Reason': 'ip-whitelist'
      }
    });
  }

  // Advanced rate limiting - ONLY IN PRODUCTION
  const rateLimit = checkAdvancedRateLimit(ip);

  if (!rateLimit.allowed) {
    if (rateLimit.blacklisted) {
      console.error(`[SECURITY] Blacklisted IP attempted access: ${ip}`);
      return new NextResponse('Forbidden - IP Blacklisted', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Blocked-Reason': 'blacklisted'
        }
      });
    }

    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '900',
        'Content-Type': 'text/plain',
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 900)
      }
    });
  }

  const response = NextResponse.next();

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining));

  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add Content Security Policy
  response.headers.set('Content-Security-Policy', CSP_HEADER);

  // CORS configuration
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://tarim.ailydian.com',
    'https://agritech-platform.vercel.app',
    'https://agritech-platform-emrahsardag-yandexcoms-projects.vercel.app'
  ];

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    allowedOrigins.push('http://localhost:3000');
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // Prevent sensitive parameter exposure
  const suspiciousParams = ['api_key', 'apikey', 'key', 'token', 'secret', 'password'];
  let hasSuspiciousParams = false;

  suspiciousParams.forEach(param => {
    if (url.searchParams.has(param)) {
      console.warn(`[SECURITY] Suspicious parameter in URL: ${param} from IP: ${ip}`);
      url.searchParams.delete(param);
      hasSuspiciousParams = true;
    }
  });

  // Clean old records periodically
  if (Math.random() < 0.01) {
    cleanOldRecords();
  }

  // Security event logging
  if (pathname.startsWith('/api/')) {
    console.log(`[API] ${request.method} ${pathname} - IP: ${ip} - Rate: ${rateLimit.remaining}/100`);
  }

  // Redirect if suspicious params found
  if (hasSuspiciousParams) {
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
