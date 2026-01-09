import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth';

// IMPORTANT: In production, use bcrypt to hash passwords
// This is a temporary solution using environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@ailydian.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'LydianAgri2025!';

// Rate limiting (simple in-memory store - use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const attempt = loginAttempts.get(ip);

  if (!attempt) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Reset if lockout time has passed
  if (now - attempt.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Check if locked out
  if (attempt.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment attempts
  attempt.count++;
  attempt.lastAttempt = now;
  return { allowed: true, remaining: MAX_ATTEMPTS - attempt.count };
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Date.now() + LOCKOUT_TIME)
          }
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    // TODO: Replace with bcrypt.compare in production
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        {
          status: 401,
          headers: {
            'X-RateLimit-Remaining': String(rateLimit.remaining)
          }
        }
      );
    }

    // Create session
    await createSession(email, 'admin');

    // Reset login attempts on success
    loginAttempts.delete(ip);

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: { email, role: 'admin' }
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(MAX_ATTEMPTS)
        }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
