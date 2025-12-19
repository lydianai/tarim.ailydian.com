// Ultra-Secure Configuration System
// Military-grade obfuscation for API providers and sensitive data
// SERVER-ONLY MODULE - Do not import in client components or middleware

import 'server-only';
import crypto from 'crypto';

// Secure random key generator
const generateSecureKey = (seed: string): string => {
  return crypto.createHash('sha256').update(seed + process.env.NODE_ENV).digest('hex');
};

// Obfuscated provider names - no AI brand names exposed
export const PROVIDER_ALIASES = {
  // Weather & Climate APIs
  W001: 'OpenWeatherMap',
  W002: 'NASA POWER',
  W003: 'NOAA NCDC',

  // Agricultural Data APIs
  A001: 'USDA NASS',
  A002: 'FAO FAOSTAT',
  A003: 'EPA Pesticides',

  // Satellite & Geospatial APIs
  S001: 'Sentinel Hub',
  S002: 'MODIS',
  S003: 'Copernicus',
  S004: 'SoilGrids',

  // Drone APIs
  D001: 'DJI Cloud',
  D002: 'Parrot API',

  // Intelligence Services (completely obfuscated)
  I001: 'Primary Intelligence Service',
  I002: 'Secondary Intelligence Service',
  I003: 'Tertiary Intelligence Service'
} as const;

// Reverse lookup type-safe
type ProviderName = typeof PROVIDER_ALIASES[keyof typeof PROVIDER_ALIASES];
const reverseAliasMap = new Map<ProviderName, string>(
  Object.entries(PROVIDER_ALIASES).map(([k, v]) => [v as ProviderName, k])
);

export const getProviderAlias = (name: string): string => {
  return reverseAliasMap.get(name as ProviderName) || 'UNKNOWN';
};

export const getProviderName = (alias: string): string => {
  return PROVIDER_ALIASES[alias as keyof typeof PROVIDER_ALIASES] || 'Unknown Provider';
};

// Secure environment variable accessor with fallback
export const getSecureEnv = (key: string, fallback: string = ''): string => {
  if (typeof window !== 'undefined') {
    // Client-side: only allow NEXT_PUBLIC_ vars
    return key.startsWith('NEXT_PUBLIC_') ? process.env[key] || fallback : fallback;
  }
  // Server-side: allow all env vars
  return process.env[key] || fallback;
};

// API Key masker for logs
export const maskApiKey = (key: string): string => {
  if (!key || key.length < 8) return '****';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

// Request signature generator
export const generateRequestSignature = (
  method: string,
  url: string,
  timestamp: number
): string => {
  const signatureBase = `${method}:${url}:${timestamp}`;
  return crypto
    .createHmac('sha256', getSecureEnv('API_SIGNATURE_SECRET', 'default-secret'))
    .update(signatureBase)
    .digest('hex');
};

// Rate limiting configuration
export const RATE_LIMITS = {
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  auth: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5
  },
  data: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30
  }
} as const;

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
} as const;

// Content Security Policy
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'https://api.openweathermap.org', 'https://power.larc.nasa.gov'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
} as const;

// Generate CSP header string
export const getCSPHeader = (): string => {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

// Sensitive data detector
export const containsSensitiveData = (text: string): boolean => {
  const patterns = [
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /token/i,
    /bearer\s+\w+/i,
    /\b[A-Za-z0-9]{32,}\b/ // Long alphanumeric strings (potential keys)
  ];

  return patterns.some(pattern => pattern.test(text));
};

// Sanitize logs
export const sanitizeLog = (message: string): string => {
  let sanitized = message;

  // Remove potential API keys
  sanitized = sanitized.replace(/([a-zA-Z0-9]{32,})/g, (match) => {
    return match.length > 20 ? `${match.slice(0, 4)}...${match.slice(-4)}` : match;
  });

  // Remove email addresses
  sanitized = sanitized.replace(/[\w.-]+@[\w.-]+\.\w+/g, '[EMAIL]');

  // Remove potential secrets
  sanitized = sanitized.replace(/(?:secret|password|token)[:=]\s*["']?([^"'\s]+)["']?/gi,
    (match, value) => match.replace(value, '****'));

  return sanitized;
};

// IP address validator and rate limiter
export class SecurityValidator {
  private ipAttempts = new Map<string, { count: number; resetTime: number }>();

  checkRateLimit(ip: string, limit: number = 100, windowMs: number = 900000): boolean {
    const now = Date.now();
    const record = this.ipAttempts.get(ip);

    if (!record || now > record.resetTime) {
      this.ipAttempts.set(ip, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= limit) {
      return false;
    }

    record.count++;
    return true;
  }

  clearOldRecords(): void {
    const now = Date.now();
    for (const [ip, record] of this.ipAttempts.entries()) {
      if (now > record.resetTime) {
        this.ipAttempts.delete(ip);
      }
    }
  }
}

export const securityValidator = new SecurityValidator();

// Environment validator
export const validateEnvironment = (): {
  isSecure: boolean;
  warnings: string[];
} => {
  const warnings: string[] = [];

  // Check for exposed secrets
  if (typeof window !== 'undefined') {
    const publicEnvVars = Object.keys(process.env).filter(key =>
      key.startsWith('NEXT_PUBLIC_')
    );

    publicEnvVars.forEach(key => {
      const value = process.env[key];
      if (value && containsSensitiveData(key)) {
        warnings.push(`Potentially sensitive data in public env var: ${key}`);
      }
    });
  }

  // Check NODE_ENV
  if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    warnings.push('Running in development mode');
  }

  return {
    isSecure: warnings.length === 0,
    warnings
  };
};

// Encrypt sensitive data before storing (modern crypto API)
export const encryptData = (data: string, key?: string): string => {
  const encryptionKey = key || getSecureEnv('ENCRYPTION_KEY', 'fallback-key-32-chars-required!');

  // Create a 32-byte key from the provided key
  const keyBuffer = crypto.createHash('sha256').update(encryptionKey).digest();

  // Generate a random IV
  const iv = crypto.randomBytes(16);

  // Create cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Prepend IV to encrypted data
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt sensitive data
export const decryptData = (encryptedData: string, key?: string): string => {
  try {
    const encryptionKey = key || getSecureEnv('ENCRYPTION_KEY', 'fallback-key-32-chars-required!');

    // Create a 32-byte key from the provided key
    const keyBuffer = crypto.createHash('sha256').update(encryptionKey).digest();

    // Extract IV and encrypted data
    const parts = encryptedData.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];

    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', sanitizeLog(String(error)));
    return '';
  }
};

// Secure logger
export class SecureLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const sanitized = sanitizeLog(message);
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${sanitized}`;

    if (this.isDevelopment) {
      console[level](logMessage);
    } else {
      // In production, send to secure logging service
      // For now, just use console
      console[level](logMessage);
    }
  }

  info(message: string): void {
    this.log(message, 'info');
  }

  warn(message: string): void {
    this.log(message, 'warn');
  }

  error(message: string): void {
    this.log(message, 'error');
  }
}

export const secureLogger = new SecureLogger();
