'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { layoutToken } from '@/lib/design-tokens';

/** 响应式断点（唯一数据源，来自设计令牌） */
export const breakpoints = layoutToken.breakpoints;

export type Breakpoint = keyof typeof breakpoints
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/** 布局配置接口 */
export interface LayoutConfig {
  sidebar: {
    width: { expanded: number; collapsed: number }
    autoCollapse: boolean
    collapseDelay: number
    hoverExpand: boolean
    mobileBreakpoint: number
  }
  header: { height: number; sticky: boolean; showOnMobile: boolean }
  content: {
    padding: { mobile: number; tablet: number; desktop: number }
    maxWidth: number
    centered: boolean
  }
  grid: {
    columns: { mobile: number; tablet: number; desktop: number }
    gap: { mobile: number; tablet: number; desktop: number }
  }
}

/** 默认布局配置（数值全部来自布局令牌） */
export const defaultLayoutConfig: LayoutConfig = {
  sidebar: {
    width: { expanded: layoutToken.sidebar.widthExpanded, collapsed: layoutToken.sidebar.widthCollapsed },
    autoCollapse: true,
    collapseDelay: 5000,
    hoverExpand: false,
    mobileBreakpoint: layoutToken.sidebar.mobileBreakpoint,
  },
  header: {
    height: layoutToken.header.height,
    sticky: true,
    showOnMobile: true,
  },
  content: {
    padding: {
      mobile: layoutToken.content.paddingMobile,
      tablet: layoutToken.content.paddingTablet,
      desktop: layoutToken.content.paddingDesktop,
    },
    maxWidth: layoutToken.content.maxWidth,
    centered: true,
  },
  grid: {
    columns: { mobile: 1, tablet: 2, desktop: 3 },
    gap: { mobile: 16, tablet: 20, desktop: 24 },
  },
};

/** 深度合并配置，避免局部配置覆盖整个分组 */
export function normalizeLayoutConfig(config: Partial<LayoutConfig> = {}): LayoutConfig {
  return {
    sidebar: { ...defaultLayoutConfig.sidebar, ...config.sidebar, width: { ...defaultLayoutConfig.sidebar.width, ...config.sidebar?.width } },
    header: { ...defaultLayoutConfig.header, ...config.header },
    content: {
      ...defaultLayoutConfig.content,
      ...config.content,
      padding: { ...defaultLayoutConfig.content.padding, ...config.content?.padding },
    },
    grid: {
      ...defaultLayoutConfig.grid,
      ...config.grid,
      columns: { ...defaultLayoutConfig.grid.columns, ...config.grid?.columns },
      gap: { ...defaultLayoutConfig.grid.gap, ...config.grid?.gap },
    },
  };
}

/** 服务端安全读取本地布局配置 */
export function loadStoredLayoutConfig(): LayoutConfig {
  if (typeof window === 'undefined') return defaultLayoutConfig;
  try {
    const raw = window.localStorage.getItem('layout-config');
    return raw ? normalizeLayoutConfig(JSON.parse(raw)) : defaultLayoutConfig;
  } catch {
    return defaultLayoutConfig;
  }
}

/** 统一计算主内容区左侧偏移：移动端抽屉模式偏移为 0 */
export function getSidebarOffset(isMobile: boolean, collapsed: boolean, config: LayoutConfig): number {
  if (isMobile) return 0;
  return collapsed ? config.sidebar.width.collapsed : config.sidebar.width.expanded;
}

/** 响应式布局 Hook */
export function useResponsiveLayout(config: Partial<LayoutConfig> = {}) {
  const layoutConfig = useMemo(() => normalizeLayoutConfig(config), [config]);
  const mobileBreakpoint = layoutConfig.sidebar.mobileBreakpoint;

  // SSR 使用桌面默认值，挂载后按真实视口修正，避免 hydration 抖动
  const [windowSize, setWindowSize] = useState({ width: mobileBreakpoint, height: 800 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { width, height } = windowSize;

  const screenSize: ScreenSize = useMemo(() => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, [width]);

  // 单一断点口径：mobileBreakpoint（1024）与 Tailwind lg 对齐
  const isMobile = mounted && width < mobileBreakpoint;
  const isTablet = mounted && width >= breakpoints.md && width < mobileBreakpoint;
  const isDesktop = mounted && width >= mobileBreakpoint;
  const orientation = width > height ? 'landscape' : 'portrait';

  const getResponsiveValue = useCallback(
    <T,>(values: Partial<Record<ScreenSize, T>>, fallback: T): T =>
      values[screenSize] ?? values.lg ?? values.md ?? values.sm ?? fallback,
    [screenSize],
  );

  const getPadding = useCallback(() => {
    if (width < breakpoints.md) return layoutConfig.content.padding.mobile;
    if (width < mobileBreakpoint) return layoutConfig.content.padding.tablet;
    return layoutConfig.content.padding.desktop;
  }, [width, mobileBreakpoint, layoutConfig.content.padding]);

  const getContentStyles = useCallback(() => {
    const padding = getPadding();
    return {
      padding: `${padding}px`,
      maxWidth: layoutConfig.content.centered ? `${layoutConfig.content.maxWidth}px` : '100%',
      margin: layoutConfig.content.centered ? '0 auto' : '0',
    };
  }, [getPadding, layoutConfig.content]);

  const getGridStyles = useCallback(() => {
    const columns = width < breakpoints.md
      ? layoutConfig.grid.columns.mobile
      : width < mobileBreakpoint
        ? layoutConfig.grid.columns.tablet
        : layoutConfig.grid.columns.desktop;
    const gap = width < breakpoints.md
      ? layoutConfig.grid.gap.mobile
      : width < mobileBreakpoint
        ? layoutConfig.grid.gap.tablet
        : layoutConfig.grid.gap.desktop;
    return { display: 'grid', gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: `${gap}px` } as const;
  }, [width, mobileBreakpoint, layoutConfig.grid]);

  return {
    screenSize, windowSize, isMobile, isTablet, isDesktop, orientation,
    layoutConfig, getResponsiveValue, getContentStyles, getGridStyles, breakpoints,
  };
}

/** 响应式容器 Hook */
export function useResponsiveContainer() {
  const { isMobile, isTablet, isDesktop, getContentStyles } = useResponsiveLayout();

  const getContainerClass = useCallback((variant: 'full' | 'contained' | 'fluid' = 'contained') => {
    const base = 'w-full';
    switch (variant) {
    case 'full': return `${base} min-h-screen`;
    case 'contained': return `${base} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`;
    case 'fluid': return `${base} px-4 sm:px-6 lg:px-8`;
    default: return base;
    }
  }, []);

  return { isMobile, isTablet, isDesktop, getContainerClass, getContentStyles };
}
