// Next.js Middleware for Security Headers (Edge Runtime Compatible)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge-compatible rate limiting (in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Security headers (Edge compatible)
const SECURITY_HEADERS = {
  'X-DNS-Prefetch-Control': 'off',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
} as const;

// Content Security Policy
const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.openweathermap.org https://power.larc.nasa.gov",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 900000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

// Clean old rate limit records periodically
function cleanOldRecords(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get client IP (Edge runtime compatible)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

  // Rate limiting check
  const isAllowed = checkRateLimit(ip, 100, 900000);

  if (!isAllowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '900',
        'Content-Type': 'text/plain'
      }
    });
  }

  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add Content Security Policy
  response.headers.set('Content-Security-Policy', CSP_HEADER);

  // Add CORS headers (production-safe)
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://tarim.ailydian.com',
    'https://agritech-platform.vercel.app',
    'https://agritech-platform-emrahsardag-yandexcoms-projects.vercel.app'
  ];

  // Allow localhost only in development
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000');
  }

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  // Prevent sensitive parameter exposure in URLs
  const url = request.nextUrl.clone();
  const suspiciousParams = ['api_key', 'apikey', 'key', 'token', 'secret', 'password'];

  let hasSuspiciousParams = false;
  suspiciousParams.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      hasSuspiciousParams = true;
    }
  });

  // Clean old rate limit records every 100 requests
  if (Math.random() < 0.01) {
    cleanOldRecords();
  }

  // Redirect if suspicious params found
  if (hasSuspiciousParams) {
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
