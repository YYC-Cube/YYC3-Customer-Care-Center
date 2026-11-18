#!/usr/bin/env node
/**
 * @file migrate-palette-to-tokens.mjs
 * @description 将硬编码调色板类名（bg-orange-500 等）批量迁移到语义令牌类名
 * @module scripts.migrate-palette-to-tokens
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 迁移是「值等价」的：旧族名在 tailwind.config.ts 中已别名到同一语义色阶，
 * 因此 bg-orange-500 与 bg-warning-500 解析出的 HEX 完全一致，视觉零漂移。
 *
 * 用法：node scripts/migrate-palette-to-tokens.mjs [--apply]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = process.cwd();
const APPLY = process.argv.includes('--apply');

const OUT_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'coverage', 'docs', 'scripts', 'public']);
const ROOTS = ['app', 'components', 'hooks', 'lib'];
const EXCLUDE_FILES = new Set(['lib/design-tokens.ts', 'tailwind.config.ts']);

const FAMILY_TO_RAMP = {
  gray: 'neutral', slate: 'neutral', zinc: 'neutral', neutral: 'neutral', stone: 'neutral',
  blue: 'primary', sky: 'primary', indigo: 'primary', cyan: 'primary',
  purple: 'accent', violet: 'accent', fuchsia: 'accent', pink: 'accent',
  green: 'success', emerald: 'success', teal: 'success', lime: 'success',
  amber: 'warning', yellow: 'warning', orange: 'warning',
  red: 'danger', rose: 'danger',
};

const SHADES = '50|100|200|300|400|500|600|700|800|900|950';
const PROPS =
  'bg|text|border|border-[xytrbl]|from|via|to|ring|ring-offset|fill|stroke|divide|outline|decoration|placeholder|caret|accent|shadow';

const CLASS_RE = new RegExp(`(${PROPS})-(${Object.keys(FAMILY_TO_RAMP).join('|')})-(${SHADES})\\b`, 'g');

const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (OUT_DIRS.has(entry.name)) continue;
      walk(join(dir, entry.name));
    } else if (['.ts', '.tsx'].includes(extname(entry.name))) {
      files.push(join(dir, entry.name));
    }
  }
}
for (const root of ROOTS) {
  try { walk(join(ROOT, root)); } catch { /* 目录不存在则跳过 */ }
}

const stats = { filesScanned: 0, filesChanged: 0, replacements: 0 };
const perRamp = {};
const changed = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  if (EXCLUDE_FILES.has(rel)) continue;
  stats.filesScanned++;

  const source = readFileSync(file, 'utf8');
  let hits = 0;
  const next = source.replace(CLASS_RE, (_m, prop, family, shade) => {
    const ramp = FAMILY_TO_RAMP[family];
    if (!ramp || ramp === family) return _m;
    hits++;
    perRamp[ramp] = (perRamp[ramp] || 0) + 1;
    return `${prop}-${ramp}-${shade}`;
  });

  if (next !== source) {
    stats.filesChanged++;
    stats.replacements += hits;
    changed.push({ file: rel, hits });
    if (APPLY) writeFileSync(file, next, 'utf8');
  }
}

// 迁移后残留检测：仅统计「族名 ≠ 语义色阶」的真遗留类名
const LEGACY_RE = new RegExp(
  `(${PROPS})-(${Object.entries(FAMILY_TO_RAMP).filter(([f, r]) => f !== r).map(([f]) => f).join('|')})-(${SHADES})\\b`,
  'g',
);
const residual = [];
for (const file of files) {
  const rel = relative(ROOT, file);
  if (EXCLUDE_FILES.has(rel)) continue;
  const matches = readFileSync(file, 'utf8').match(LEGACY_RE);
  if (matches) residual.push({ file: rel, count: matches.length, sample: matches.slice(0, 3) });
}

console.log(`\n${APPLY ? '✅ 已写入' : '🔍 预演（未写入）'}`);
console.log(`扫描文件: ${stats.filesScanned}　变更文件: ${stats.filesChanged}　替换次数: ${stats.replacements}`);
console.log('按语义色阶分布:', perRamp);
console.log(`\n残留（动态拼接，走别名兜底）: ${residual.length} 个文件`);
for (const r of residual.slice(0, 10)) console.log(`  - ${r.file}: ${r.count} 处，例 ${r.sample.join(', ')}`);
console.log('\n变更最多的文件:');
for (const c of changed.sort((a, b) => b.hits - a.hits).slice(0, 12)) console.log(`  ${c.hits}\t${c.file}`);
