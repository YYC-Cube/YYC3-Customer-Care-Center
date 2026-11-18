/**
 * @file client.ts
 * @description 前端 API 客户端：统一解包 ApiEnvelope 并处理网络错误
 * @module lib.api.client
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

interface ApiEnvelope<T> {
  code: number
  message: string
  data: T
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

  let payload: ApiEnvelope<T> | { message?: string };
  try {
    payload = await response.json();
  } catch {
    throw new Error(`API 返回无效 JSON (${response.status})`);
  }

  if (!response.ok || !('code' in payload) || payload.code !== 0) {
    throw new Error(('message' in payload && payload.message) || `请求失败 (${response.status})`);
  }

  return (payload as ApiEnvelope<T>).data;
}

export const apiClient = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(url: string, body: unknown) =>
    request<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
};
