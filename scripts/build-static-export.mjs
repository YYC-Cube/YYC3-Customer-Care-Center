#!/usr/bin/env node
/**
 * @file build-static-export.mjs
 * @description 构建 GitHub Pages 静态镜像（剔除 API 路由与 Proxy）
 * @module scripts.build-static-export
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 背景：`output: 'export'` 不支持 route handler（POST/force-dynamic）与 proxy/middleware。
 * 方案：在独立镜像目录中复制源码、剔除 app/api 与 proxy.ts 后执行静态导出，
 *       主仓库仍保留完整 standalone 构建能力。
 *
 * 用法：node scripts/build-static-export.mjs
 */

import { cpSync, rmSync, existsSync, symlinkSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const MIRROR = join(ROOT, '.static-export');

const EXCLUDE = new Set([
  'node_modules',
  '.next',
  '.git',
  '.github',
  '.static-export',
  'out',
  'coverage',
  '.vercel',
]);

console.log('→ 清理镜像目录');
rmSync(MIRROR, { recursive: true, force: true });
mkdirSync(MIRROR, { recursive: true });

console.log('→ 复制源码');
// 逐项复制：cpSync 不允许把目录复制进自身子目录
for (const entry of readdirSync(ROOT, { withFileTypes: true })) {
  if (EXCLUDE.has(entry.name)) continue;
  if (entry.name.startsWith('.env') && entry.name !== '.env.example') continue;
  cpSync(join(ROOT, entry.name), join(MIRROR, entry.name), {
    recursive: true,
    dereference: false,
  });
}

console.log('→ 剔除 API 路由与 Proxy');
rmSync(join(MIRROR, 'app', 'api'), { recursive: true, force: true });
for (const f of ['proxy.ts', 'middleware.ts']) {
  rmSync(join(MIRROR, f), { force: true });
}

console.log('→ 链接依赖');
const nm = join(ROOT, 'node_modules');
if (!existsSync(nm)) {
  console.error('✗ 缺少 node_modules，请先执行安装');
  process.exit(1);
}
symlinkSync(nm, join(MIRROR, 'node_modules'), 'dir');

console.log('→ 执行静态导出构建');
const result = spawnSync('npx', ['next', 'build'], {
  cwd: MIRROR,
  stdio: 'inherit',
  env: { ...process.env, STATIC_EXPORT: 'true', NEXT_TELEMETRY_DISABLED: '1' },
});

if (result.status !== 0) {
  console.error('✗ 静态导出失败');
  process.exit(result.status ?? 1);
}

console.log(`✓ 静态产物位于 ${join('.static-export', 'out')}`);
