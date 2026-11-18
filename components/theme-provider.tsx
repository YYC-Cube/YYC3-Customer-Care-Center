/**
 * @file theme-provider.tsx
 * @description 主题提供者（无外部依赖实现，替代 next-themes 包装）
 * @module components.theme-provider
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 原实现依赖未安装的 `next-themes`，导致 TS2307。
 * 此处以最小实现提供同名 API：切换 `documentElement` 的 `dark` 类并持久化。
 */

'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: 'class' | 'data-theme';
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'yyc3-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>('light');

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (enableSystem ? systemTheme : 'light') : theme;

  // 读取持久化主题 + 监听系统主题变化
  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    if (stored) setThemeState(stored);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setSystemTheme(media.matches ? 'dark' : 'light');
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [storageKey]);

  // 应用到根元素
  React.useEffect(() => {
    const root = document.documentElement;
    if (attribute === 'class') {
      root.classList.toggle('dark', resolvedTheme === 'dark');
    } else {
      root.dataset.theme = resolvedTheme;
    }
  }, [attribute, resolvedTheme]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      setThemeState(next);
      window.localStorage.setItem(storageKey, next);
    },
    [storageKey],
  );

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
