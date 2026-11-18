'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initializeDefaultHandlers } from '@/lib/button-handler';
import { setupDefaultActions } from '@/lib/action-manager';

const ROUTE_MAP: Record<string, string> = {
  dashboard: '/',
  tasks: '/tasks',
  customers: '/customers',
  analytics: '/analytics',
};

/**
 * 系统启动引导：注册默认按钮处理器与全局动作，并接管导航事件。
 * 解决 initializeDefaultHandlers / setupDefaultActions 从未被调用、按钮点击无响应的问题。
 */
export function SystemBootstrap() {
  const router = useRouter();

  useEffect(() => {
    initializeDefaultHandlers();
    setupDefaultActions();

    const onNavigate = (event: Event) => {
      const moduleId = (event as CustomEvent<string>).detail;
      const path = ROUTE_MAP[moduleId];
      if (path) router.push(path);
    };

    window.addEventListener('navigateTo', onNavigate as EventListener);
    return () => window.removeEventListener('navigateTo', onNavigate as EventListener);
  }, [router]);

  return null;
}
