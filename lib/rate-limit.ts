import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
};

export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = DEFAULT_CONFIG
): { success: boolean; limit: number; remaining: number; resetTime: number } | NextResponse {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }
  
  if (record.count >= config.maxRequests) {
    // Rate limit exceeded
    return NextResponse.json(
      { error: 'Too many requests, please try again later' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(config.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(record.resetTime),
        },
      }
    );
  }
  
  // Increment count
  record.count++;
  
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

// Stricter rate limits for auth endpoints
export function authRateLimit(request: NextRequest) {
  return rateLimit(request, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10, // 10 attempts per 15 min
  });
}

// API key rate limits
export function apiKeyRateLimit(request: NextRequest) {
  return rateLimit(request, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
  });
}
