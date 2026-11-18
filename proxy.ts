import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  checkIPAccess,
  createIPAccessControl,
  getClientIP,
  isValidIPv4,
} from '@/lib/cidr';

/**
 * @file proxy.ts
 * @description Next.js 16 Proxy（原 middleware）— CIDR IP 访问控制
 * @module proxy
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

const ipAccessConfig = createIPAccessControl('deny', [
  { cidr: '0.0.0.0/8', action: 'allow', description: 'Development network' },
  { cidr: '10.0.0.0/8', action: 'allow', description: 'Private network' },
  { cidr: '172.16.0.0/12', action: 'allow', description: 'Private network' },
  { cidr: '192.168.0.0/16', action: 'allow', description: 'Private network' },
  { cidr: '127.0.0.0/8', action: 'allow', description: 'Loopback addresses' },
]);

/**
 * 白名单仅放行无需鉴权的基础端点与静态资源。
 * 其余 /api/* 与页面同样受 IP 访问控制约束，避免绕过网络层防护。
 */
const allowedPaths = ['/api/health', '/api/public', '/login', '/register', '/favicon.ico', '/_next'];

/**
 * 统一安全响应头（运行时唯一来源）
 * 说明：next.config 的 headers() 与 Proxy 叠加时不生效，故收敛到 Proxy 注入。
 */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'off',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

function applySecurityHeaders(headers: Headers) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
}

const bypassIPCheck = (pathname: string): boolean =>
  allowedPaths.some((path) => pathname.startsWith(path));

/** IPv6 回环归一化，避免本地开发被误判为非法 IP */
function normalizeClientIP(raw: string): string {
  const ip = raw.trim().replace(/^\[|\]$/g, '');
  if (ip === '::1' || ip === '::ffff:127.0.0.1' || ip === '0:0:0:0:0:0:0:1') return '127.0.0.1';
  const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  return mapped ? mapped[1] : ip;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (bypassIPCheck(pathname)) {
    const passthrough = NextResponse.next();
    applySecurityHeaders(passthrough.headers);
    return passthrough;
  }

  const headers: Record<string, string | string[] | undefined> = {};
  request.headers.forEach((value, key) => { headers[key] = value; });
  const clientIP = normalizeClientIP(getClientIP(headers));

  if (!isValidIPv4(clientIP)) {
    return NextResponse.json({ error: 'Invalid IP address', ip: clientIP }, { status: 400 });
  }

  if (!checkIPAccess(clientIP, ipAccessConfig)) {
    console.warn(`IP access denied: ${clientIP} - ${pathname}`);
    return NextResponse.json(
      { error: 'Access denied', message: 'Your IP address is not authorized', ip: clientIP },
      { status: 403 },
    );
  }

  const response = NextResponse.next();
  applySecurityHeaders(response.headers);
  response.headers.set('X-Client-IP', clientIP);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
