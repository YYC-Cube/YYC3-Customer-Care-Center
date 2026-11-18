/**
 * @file responsive-layout.tsx
 * @description 全局响应式布局：Provider + 主壳体（导航 / 头部 / 内容区）
 * @module components.layout.responsive-layout
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  useResponsiveLayout,
  normalizeLayoutConfig,
  loadStoredLayoutConfig,
  getSidebarOffset,
  type LayoutConfig,
} from '@/lib/responsive-layout';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';

type ContentStyles = ReturnType<typeof useResponsiveLayout>['getContentStyles'] extends () => infer T ? T : never;

interface LayoutContextType {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  layoutConfig: LayoutConfig
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void
  getContentStyles: () => ContentStyles
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a ResponsiveLayoutProvider');
  }
  return context;
}

/**
 * 可选读取布局上下文：未包裹 Provider 时返回 undefined，
 * 供移动端布局等「可独立使用」的组件复用统一状态机而不抛错。
 */
export function useOptionalLayoutContext() {
  return useContext(LayoutContext);
}

/** 深度合并布局配置（保留未修改的嵌套字段） */
function mergeLayoutConfig(prev: LayoutConfig, patch: Partial<LayoutConfig>): LayoutConfig {
  return normalizeLayoutConfig({
    ...prev,
    ...patch,
    sidebar: { ...prev.sidebar, ...patch.sidebar, width: { ...prev.sidebar.width, ...patch.sidebar?.width } },
    header: { ...prev.header, ...patch.header },
    content: { ...prev.content, ...patch.content, padding: { ...prev.content.padding, ...patch.content?.padding } },
    grid: {
      ...prev.grid,
      ...patch.grid,
      columns: { ...prev.grid.columns, ...patch.grid?.columns },
      gap: { ...prev.grid.gap, ...patch.grid?.gap },
    },
  });
}

interface ResponsiveLayoutProviderProps {
  children: React.ReactNode
  initialConfig?: Partial<LayoutConfig>
}

export function ResponsiveLayoutProvider({ children, initialConfig }: ResponsiveLayoutProviderProps) {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>(() => normalizeLayoutConfig(initialConfig));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 客户端挂载后恢复用户配置（localStorage 在设置页写入）
  useEffect(() => {
    const stored = loadStoredLayoutConfig();
    if (initialConfig) setLayoutConfig(mergeLayoutConfig(stored, initialConfig));
    else setLayoutConfig(stored);
  }, [initialConfig]);

  // 所有响应式判定只调用一次 Hook，配置来源唯一
  const { isMobile, isTablet, isDesktop, getContentStyles } = useResponsiveLayout(layoutConfig);

  // 移动端进入抽屉模式时关闭侧栏
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const updateLayoutConfig = useCallback((config: Partial<LayoutConfig>) => {
    setLayoutConfig((prev) => {
      const next = mergeLayoutConfig(prev, config);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('layout-config', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const value: LayoutContextType = {
    sidebarCollapsed, setSidebarCollapsed,
    sidebarOpen, setSidebarOpen,
    isMobile, isTablet, isDesktop,
    layoutConfig, updateLayoutConfig,
    getContentStyles,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

interface ResponsiveLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  showHeader?: boolean
  className?: string
}

export function ResponsiveLayout({
  children,
  showSidebar = true,
  showHeader = true,
  className,
}: ResponsiveLayoutProps) {
  const {
    sidebarCollapsed, sidebarOpen, setSidebarOpen,
    isMobile, layoutConfig, getContentStyles,
  } = useLayoutContext();

  // 侧栏宽度与视觉宽度共用同一配置，消除 w-56/w-14 与 256/64 的双源偏差
  const sidebarWidth = getSidebarOffset(isMobile, sidebarCollapsed, layoutConfig);
  const showHeaderThisViewport = showHeader && (layoutConfig.header.showOnMobile || !isMobile);

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {showSidebar && (
        <>
          <Sidebar />
          {/* 移动端遮罩：抽屉打开时可点击关闭 */}
          {isMobile && sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50"
              aria-hidden="true"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      {/* 主区域：宽度 = 100% - 侧栏宽度，避免 100% + marginLeft 造成横向溢出 */}
      <div
        className="min-h-screen transition-[margin,width] duration-300 ease-in-out"
        style={{
          marginLeft: showSidebar ? `${sidebarWidth}px` : 0,
          width: showSidebar ? `calc(100% - ${sidebarWidth}px)` : '100%',
        }}
      >
        {showHeaderThisViewport && (
          <Header
            height={layoutConfig.header.height}
            sticky={layoutConfig.header.sticky}
            onMenuClick={showSidebar && isMobile ? () => setSidebarOpen(true) : undefined}
          />
        )}

        <main className="min-h-screen w-full" style={getContentStyles()}>
          {children}
        </main>
      </div>
    </div>
  );
}
