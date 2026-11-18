import type { NextRequest } from 'next/server';
import { ok, fail, requireFields } from '@/lib/api/response';

export const dynamic = 'force-dynamic';

interface Endpoint {
  id: string
  name: string
  url: string
  method: string
  category: string
  description: string
  authentication: string
  rateLimit: string
}

const endpoints: Endpoint[] = [
  { id: 'api_1', name: '获取客户列表', url: '/api/customers', method: 'GET', category: '客户管理', description: '分页获取客户信息', authentication: 'api-key', rateLimit: '1000' },
  { id: 'api_2', name: '获取任务列表', url: '/api/tasks', method: 'GET', category: '任务管理', description: '获取任务清单', authentication: 'api-key', rateLimit: '1000' },
  { id: 'api_3', name: '获取 OKR', url: '/api/okrs', method: 'GET', category: '目标管理', description: '获取目标与关键结果', authentication: 'api-key', rateLimit: '500' },
];

let sequence = 10;

export async function GET() {
  return ok(endpoints);
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('请求体不是合法 JSON');
  }

  const invalid = requireFields(body, ['name', 'url']);
  if (invalid) return fail(invalid);

  const endpoint: Endpoint = {
    id: `api_${++sequence}`,
    name: String(body.name),
    url: String(body.url),
    method: String(body.method ?? 'GET'),
    category: String(body.category ?? ''),
    description: String(body.description ?? ''),
    authentication: String(body.authentication ?? 'api-key'),
    rateLimit: String(body.rateLimit ?? '1000'),
  };
  endpoints.unshift(endpoint);
  return ok(endpoint, 201);
}
