#!/usr/bin/env node
/**
 * @file migrate-hex-to-tokens.mjs
 * @description 将内联硬编码 HEX 迁移为 colorRamp / color.media 令牌引用
 * @module scripts.migrate-hex-to-tokens
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 等价规则：HEX 取自 Tailwind 调色板，按「族 → 语义色阶 + 同色号」映射，
 * 与 migrate-palette-to-tokens.mjs 保持完全一致的收敛口径。
 *
 * 用法：node scripts/migrate-hex-to-tokens.mjs [--apply]
 */

import { readFileSync, writeFileSync } from 'node:fs';

const APPLY = process.argv.includes('--apply');

/** HEX → 令牌表达式 */
const HEX_MAP = {
  // neutral（slate 阶梯 + gray 同名阶梯）
  '#f8fafc': 'colorRamp.neutral[50]', '#f9fafb': 'colorRamp.neutral[50]',
  '#f1f5f9': 'colorRamp.neutral[100]', '#f3f4f6': 'colorRamp.neutral[100]',
  '#e2e8f0': 'colorRamp.neutral[200]', '#e5e7eb': 'colorRamp.neutral[200]',
  '#cbd5e1': 'colorRamp.neutral[300]', '#d1d5db': 'colorRamp.neutral[300]',
  '#94a3b8': 'colorRamp.neutral[400]', '#9ca3af': 'colorRamp.neutral[400]',
  '#64748b': 'colorRamp.neutral[500]', '#6b7280': 'colorRamp.neutral[500]',
  '#475569': 'colorRamp.neutral[600]', '#4b5563': 'colorRamp.neutral[600]',
  '#334155': 'colorRamp.neutral[700]', '#374151': 'colorRamp.neutral[700]',
  '#1e293b': 'colorRamp.neutral[800]', '#1f2937': 'colorRamp.neutral[800]',
  '#0f172a': 'colorRamp.neutral[900]', '#111827': 'colorRamp.neutral[900]',
  // primary（sky / blue / indigo / cyan）
  '#0ea5e9': 'colorRamp.primary[500]', '#38bdf8': 'colorRamp.primary[400]',
  '#0284c7': 'colorRamp.primary[600]', '#0369a1': 'colorRamp.primary[700]',
  '#3b82f6': 'colorRamp.primary[500]', '#60a5fa': 'colorRamp.primary[400]',
  '#2563eb': 'colorRamp.primary[600]', '#1d4ed8': 'colorRamp.primary[700]',
  '#6366f1': 'colorRamp.primary[500]', '#4f46e5': 'colorRamp.primary[600]',
  '#06b6d4': 'colorRamp.primary[500]', '#0891b2': 'colorRamp.primary[600]',
  '#667eea': 'colorRamp.primary[500]',
  // accent（violet / purple / fuchsia）
  '#8b5cf6': 'colorRamp.accent[500]', '#a78bfa': 'colorRamp.accent[400]',
  '#7c3aed': 'colorRamp.accent[600]', '#6d28d9': 'colorRamp.accent[700]',
  '#a855f7': 'colorRamp.accent[500]', '#c084fc': 'colorRamp.accent[400]',
  '#9333ea': 'colorRamp.accent[600]', '#d946ef': 'colorRamp.accent[500]',
  '#8884d8': 'colorRamp.accent[500]', '#764ba2': 'colorRamp.accent[600]',
  // success（emerald / green / teal）
  '#10b981': 'colorRamp.success[500]', '#34d399': 'colorRamp.success[400]',
  '#059669': 'colorRamp.success[600]', '#047857': 'colorRamp.success[700]',
  '#065f46': 'colorRamp.success[800]', '#064e3b': 'colorRamp.success[900]',
  '#22c55e': 'colorRamp.success[500]', '#16a34a': 'colorRamp.success[600]',
  '#15803d': 'colorRamp.success[700]', '#14b8a6': 'colorRamp.success[500]',
  '#0d9488': 'colorRamp.success[600]',
  // warning（amber / yellow / orange）
  '#f59e0b': 'colorRamp.warning[500]', '#fbbf24': 'colorRamp.warning[400]',
  '#d97706': 'colorRamp.warning[600]', '#b45309': 'colorRamp.warning[700]',
  '#92400e': 'colorRamp.warning[800]',
  '#f97316': 'colorRamp.warning[500]', '#ea580c': 'colorRamp.warning[600]',
  '#c2410c': 'colorRamp.warning[700]', '#9a3412': 'colorRamp.warning[800]',
  '#eab308': 'colorRamp.warning[500]', '#facc15': 'colorRamp.warning[400]',
  // danger（red / rose）
  '#ef4444': 'colorRamp.danger[500]', '#f87171': 'colorRamp.danger[400]',
  '#dc2626': 'colorRamp.danger[600]', '#b91c1c': 'colorRamp.danger[700]',
  '#f43f5e': 'colorRamp.danger[500]', '#e11d48': 'colorRamp.danger[600]',
  // 媒体固定色
  '#000000': 'color.media.ink',
  '#ffffff': 'color.media.paper',
  '#fff': 'color.media.paper',
  '#ccc': 'colorRamp.neutral[300]',
};

/** 排除：CSS 选择器字面量、令牌定义本体 */
const EXCLUDE = new Set(['components/ui/chart.tsx', 'lib/design-tokens.ts', 'tailwind.config.ts']);

const FILES = [
  'app/ai/customer-data/page.tsx',
  'components/finance-module.tsx',
  'components/training/user-training-center.tsx',
  'components/charts/finance-chart.tsx',
  'components/charts/sales-chart.tsx',
  'components/charts/performance-chart.tsx',
  'components/data-analytics.tsx',
  'components/kpi-tracking.tsx',
  'components/performance/auto-optimization-engine.tsx',
  'components/ai-analysis-module.tsx',
  'components/real-time-data-processor.tsx',
  'components/training/training-promotion-system.tsx',
  'components/user-feedback/feedback-collection-system.tsx',
  'components/electronic-signature.tsx',
  'components/reports/intelligent-report-generator.tsx',
  'components/api/api-management-center.tsx',
  'components/avatar-upload.tsx',
  'components/visualization/enhanced-data-visualization.tsx',
  'lib/database-seeder.ts',
];

const token = (hex) => HEX_MAP[String(hex).toLowerCase()];

/** 插入 import，且绝不破坏 'use client' 指令与文件头注释的顺序 */
function injectImport(source, names) {
  const line = `import { ${names} } from '@/lib/design-tokens';\n`;
  // 'use client' 必须位于模块首条语句，故优先在其后插入
  const directive = /^(['"])use client\1;?\r?\n/m.exec(source);
  if (directive) return source.replace(directive[0], directive[0] + line);
  const header = /^\/\*\*[\s\S]*?\*\/\r?\n/.exec(source);
  if (header) return source.replace(header[0], header[0] + line);
  return line + source;
}

let total = 0;
const report = [];
const needs = new Set();

for (const file of FILES) {
  if (EXCLUDE.has(file)) continue;
  const original = readFileSync(file, 'utf8');
  let source = original;
  let count = 0;
  let usesColor = false;
  let usesRamp = false;

  const track = (expr) => {
    count++;
    if (expr.startsWith('color.media')) usesColor = true;
    if (expr.startsWith('colorRamp')) usesRamp = true;
    return expr;
  };

  // 1) 双色字符串（渐变）→ 模板字面量
  source = source.replace(
    /(['"])(#[0-9a-fA-F]{3,8}),\s*(#[0-9a-fA-F]{3,8})\1/g,
    (m, _q, a, b) => {
      const ta = token(a);
      const tb = token(b);
      if (!ta || !tb) return m;
      return `\`\${${track(ta)}}, \${${track(tb)}}\``;
    },
  );

  // 2) JSX 属性 ="#hex" → ={token}
  source = source.replace(/="(#[0-9a-fA-F]{3,8})"/g, (m, hex) => {
    const t = token(hex);
    return t ? `={${track(t)}}` : m;
  });

  // 3) 表达式内 '#hex' / "#hex" → token
  source = source.replace(/(['"])(#[0-9a-fA-F]{3,8})\1/g, (m, _q, hex) => {
    const t = token(hex);
    return t ? track(t) : m;
  });

  if (count > 0 && !source.includes("from '@/lib/design-tokens'")) {
    const names = [];
    if (usesRamp) names.push('colorRamp');
    if (usesColor) names.push('color');
    source = injectImport(source, names.join(', '));
  }

  total += count;
  report.push({ file, count });
  if (APPLY && source !== original) writeFileSync(file, source, 'utf8');
}

console.log(`\n${APPLY ? '✅ 已写入' : '🔍 预演（未写入）'}`);
console.log(`文件数: ${report.filter((r) => r.count > 0).length}　替换次数: ${total}`);
for (const r of report.sort((a, b) => b.count - a.count)) {
  if (r.count) console.log(`  ${r.count}\t${r.file}`);
}
