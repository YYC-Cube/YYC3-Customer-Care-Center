import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * Next 16 / ESLint 9 flat config
 * eslint-config-next v16 已原生导出 flat config，无需 FlatCompat。
 */
export default [
  {
    ignores: [
      '.next/**',
      '.static-export/**',
      'node_modules/**',
      'out/**',
      'public/**',
      'coverage/**',
      'next-env.d.ts',
      // Node 端脚本/配置文件：允许 CommonJS require
      'process-markdown-files.js',
      'scripts/**',
      'tailwind.config.ts',
      'postcss.config.*',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'warn',

      // ── 存量技术债：降级为告警，避免阻断 CI；按模块逐步收敛 ──
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];
