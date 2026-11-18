/**
 * @file response.ts
 * @description API 统一响应封装（成功 / 失败 / 校验）
 * @module lib.api.response
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import { NextResponse } from 'next/server';

export interface ApiEnvelope<T> {
  code: 0
  message: 'ok'
  data: T
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiEnvelope<T>>({ code: 0, message: 'ok', data }, { status });
}

export function fail(message: string, status = 400, detail?: unknown) {
  return NextResponse.json(
    { code: status, message, ...(detail !== undefined ? { detail } : {}) },
    { status },
  );
}

export function requireFields(body: Record<string, unknown>, fields: string[]): string | null {
  const missing = fields.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');
  return missing.length ? `缺少必填字段: ${missing.join(', ')}` : null;
}
