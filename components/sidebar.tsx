/**
 * @file sidebar.tsx
 * @description sidebar component/module for YYC3 Customer Care Center
 * @module components.sidebar
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLayoutContext } from '@/components/layout/responsive-layout';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Target,
  Users,
  CheckSquare,
  FileCheck,
  Zap,
  DollarSign,
  CreditCard,
  Receipt,
  Banknote,
  MessageSquare,
  Video,
  FileImage,
  Bell,
  Brain,
  TrendingUp,
  Bot,
  Settings,
  Shield,
  Database,
  Puzzle,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Pin,
  PinOff,
  Smartphone,
} from 'lucide-react';

interface SidebarProps {
  activeModule?: string
  setActiveModule?: (module: string) => void
  className?: string
}

export function Sidebar({ activeModule = 'dashboard', setActiveModule, className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { sidebarCollapsed, setSidebarCollapsed, sidebarOpen, setSidebarOpen, isMobile, layoutConfig } = useLayoutContext();

  // 侧栏宽度取唯一配置源；移动端固定为展开宽度，作为抽屉滑入
  const isVisuallyCollapsed = !isMobile && sidebarCollapsed && !isHovered;
  const sidebarWidthPx = isVisuallyCollapsed
    ? layoutConfig.sidebar.width.collapsed
    : layoutConfig.sidebar.width.expanded;

  // 根据路径设置活跃模块
  useEffect(() => {
    const pathToModule: Record<string, string> = {
      '/': 'dashboard',
      '/analytics': 'analytics',
      '/reports': 'reports',
      '/kpi': 'kpi',
      '/customers': 'customers',
      '/tasks': 'tasks',
      '/approval': 'approval',
      '/okr': 'okr',
      '/finance': 'finance',
      '/finance/budget': 'budget',
      '/finance/invoices': 'invoices',
      '/finance/payments': 'payments',
      '/communication/chat': 'chat',
      '/communication/meetings': 'meetings',
      '/communication/documents': 'documents',
      '/communication/notifications': 'notifications',
      '/ai': 'ai-analysis',
      '/ai/prediction': 'ai-prediction',
      '/ai/automation': 'ai-automation',
      '/security/permissions': 'permissions',
      '/security/audit': 'audit',
      '/security/mfa': 'mfa',
      '/system/settings': 'settings',
      '/system/database': 'database',
      '/system/integrations': 'integrations',
      '/system/backup': 'backup',
    };

    const currentModule = pathToModule[pathname] || 'dashboard';
    if (setActiveModule && currentModule !== activeModule) {
      setActiveModule(currentModule);
    }
  }, [pathname, activeModule, setActiveModule]);

  const menuItems = [
    {
      category: '应用总览',
      color: 'blue',
      items: [
        {
          id: 'dashboard',
          label: '服务中心',
          icon: LayoutDashboard,
          path: '/',
        },
        {
          id: 'analytics',
          label: '数据分析',
          icon: BarChart3,
          path: '/analytics',
        },
        {
          id: 'reports',
          label: '报表中心',
          icon: FileText,
          path: '/reports',
        },
        {
          id: 'kpi',
          label: '指标监控',
          icon: Target,
          path: '/kpi',
        },
      ],
    },
    {
      category: 'AI智能助手',
      color: 'purple',
      items: [
        {
          id: 'ai-analysis',
          label: '智能分析',
          icon: Brain,
          path: '/ai',
        },
        {
          id: 'ai-prediction',
          label: '客户数据',
          icon: TrendingUp,
          path: '/ai/prediction',
        },
        {
          id: 'ai-automation',
          label: '智能表单',
          icon: Bot,
          path: '/ai/automation',
        },
      ],
    },
    {
      category: '高级功能',
      color: 'mixed',
      items: [
        {
          id: 'multi-tenant',
          label: '门店管理',
          icon: Users,
          path: '/multi-tenant',
          color: 'green',
        },
        {
          id: 'bi-analysis',
          label: '商业智能',
          icon: BarChart3,
          path: '/bi-analysis',
          color: 'purple',
        },
        {
          id: 'mobile-app',
          label: '移动应用',
          icon: Smartphone,
          path: '/mobile-app',
          color: 'red',
        },
        {
          id: 'security-center',
          label: '安全中心',
          icon: Shield,
          path: '/security',
          color: 'orange',
        },
      ],
    },
    {
      category: '核心功能',
      color: 'mixed',
      items: [
        {
          id: 'customers',
          label: '客户管理',
          icon: Users,
          path: '/customers',
          color: 'orange',
        },
        {
          id: 'tasks',
          label: '任务管理',
          icon: CheckSquare,
          path: '/tasks',
          color: 'green',
        },
        {
          id: 'communication',
          label: '沟通协作',
          icon: MessageSquare,
          path: '/communication',
          color: 'green',
        },
        {
          id: 'data-analytics',
          label: '数据分析',
          icon: BarChart3,
          path: '/analytics',
          color: 'purple',
        },
        {
          id: 'finance',
          label: '财务管理',
          icon: DollarSign,
          path: '/finance',
          color: 'orange',
        },
        {
          id: 'project-management',
          label: '项目管理',
          icon: Target,
          path: '/projects',
          color: 'purple',
        },
      ],
    },
    {
      category: '财务管理',
      color: 'orange',
      items: [
        {
          id: 'budget',
          label: '预算管理',
          icon: CreditCard,
          path: '/finance/budget',
        },
        {
          id: 'invoices',
          label: '发票管理',
          icon: Receipt,
          path: '/finance/invoices',
        },
        {
          id: 'payments',
          label: '支付管理',
          icon: Banknote,
          path: '/finance/payments',
        },
      ],
    },
    {
      category: '沟通协作',
      color: 'green',
      items: [
        {
          id: 'chat',
          label: '即时聊天',
          icon: MessageSquare,
          path: '/communication/chat',
        },
        {
          id: 'meetings',
          label: '视频会议',
          icon: Video,
          path: '/communication/meetings',
        },
        {
          id: 'documents',
          label: '文档协作',
          icon: FileImage,
          path: '/communication/documents',
        },
        {
          id: 'notifications',
          label: '通知中心',
          icon: Bell,
          path: '/communication/notifications',
        },
      ],
    },
    {
      category: '系统设置',
      color: 'slate',
      items: [
        {
          id: 'approval',
          label: '审批管理',
          icon: FileCheck,
          path: '/approval',
        },
        {
          id: 'okr',
          label: '目标管理',
          icon: Zap,
          path: '/okr',
        },
        {
          id: 'settings',
          label: '基础设置',
          icon: Settings,
          path: '/system/settings',
        },
        {
          id: 'database',
          label: '数据库管理',
          icon: Database,
          path: '/system/database',
        },
        {
          id: 'integrations',
          label: '集成管理',
          icon: Puzzle,
          path: '/system/integrations',
        },
        {
          id: 'backup',
          label: '备份恢复',
          icon: HardDrive,
          path: '/system/backup',
        },
      ],
    },
  ];

  const handleNavigation = (path: string, moduleId: string) => {
    router.push(path);
    setActiveModule?.(moduleId);
    if (isMobile) setSidebarOpen(false);
  };

  const handleLogoClick = () => {
    router.push('/');
    setActiveModule?.('dashboard');
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (!sidebarCollapsed) {
      setIsPinned(false);
    }
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setSidebarCollapsed(false);
    }
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    if (!isPinned) {
      setIsHovered(true);
      setSidebarCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile || isPinned) return;
    setIsHovered(false);
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    collapseTimerRef.current = setTimeout(() => {
      collapseTimerRef.current = null;
      setSidebarCollapsed(true);
    }, 300);
  };

  useEffect(() => () => {
    if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        border: 'border-l-primary-500',
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        text: 'text-primary-700 dark:text-primary-300',
        hover: 'hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-l-primary-500',
        collapsedBg: 'bg-primary-100 dark:bg-primary-900/30',
        collapsedBorder: 'border-l-4 border-l-primary-500',
        iconColor: 'text-primary-600 dark:text-primary-400',
      },
      purple: {
        border: 'border-l-accent-500',
        bg: 'bg-accent-50 dark:bg-accent-900/20',
        text: 'text-accent-700 dark:text-accent-300',
        hover: 'hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:border-l-accent-500',
        collapsedBg: 'bg-accent-100 dark:bg-accent-900/30',
        collapsedBorder: 'border-l-4 border-l-accent-500',
        iconColor: 'text-accent-600 dark:text-accent-400',
      },
      green: {
        border: 'border-l-success-500',
        bg: 'bg-success-50 dark:bg-success-900/20',
        text: 'text-success-700 dark:text-success-300',
        hover: 'hover:bg-success-50 dark:hover:bg-success-900/20 hover:border-l-success-500',
        collapsedBg: 'bg-success-100 dark:bg-success-900/30',
        collapsedBorder: 'border-l-4 border-l-success-500',
        iconColor: 'text-success-600 dark:text-success-400',
      },
      orange: {
        border: 'border-l-warning-500',
        bg: 'bg-warning-50 dark:bg-warning-900/20',
        text: 'text-warning-700 dark:text-warning-300',
        hover: 'hover:bg-warning-50 dark:hover:bg-warning-900/20 hover:border-l-warning-500',
        collapsedBg: 'bg-warning-100 dark:bg-warning-900/30',
        collapsedBorder: 'border-l-4 border-l-warning-500',
        iconColor: 'text-warning-600 dark:text-warning-400',
      },
      red: {
        border: 'border-l-danger-500',
        bg: 'bg-danger-50 dark:bg-danger-900/20',
        text: 'text-danger-700 dark:text-danger-300',
        hover: 'hover:bg-danger-50 dark:hover:bg-danger-900/20 hover:border-l-danger-500',
        collapsedBg: 'bg-danger-100 dark:bg-danger-900/30',
        collapsedBorder: 'border-l-4 border-l-danger-500',
        iconColor: 'text-danger-600 dark:text-danger-400',
      },
      slate: {
        border: 'border-l-neutral-500',
        bg: 'bg-neutral-50 dark:bg-neutral-900/20',
        text: 'text-neutral-700 dark:text-neutral-300',
        hover: 'hover:bg-neutral-50 dark:hover:bg-neutral-900/20 hover:border-l-neutral-500',
        collapsedBg: 'bg-neutral-100 dark:bg-neutral-900/30',
        collapsedBorder: 'border-l-4 border-l-neutral-500',
        iconColor: 'text-neutral-600 dark:text-neutral-400',
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.slate;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'bg-card border-r border-border h-screen transition-all duration-300 ease-in-out flex flex-col shadow-lg fixed top-0 left-0 z-50',
          isMobile && '-translate-x-full',
          isMobile && sidebarOpen && 'translate-x-0',
          className,
        )}
        style={{ width: `${sidebarWidthPx}px` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 顶部控制区域 */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
          {!isVisuallyCollapsed && (
            <div className="flex flex-col items-center space-y-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                onClick={handleLogoClick}
              >
                <img src="/yyc3-pwa-icon.png" alt="YYC Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-primary-700 leading-tight">
                  Customer Care Center
                </p>
              </div>
            </div>
          )}

          {isVisuallyCollapsed && (
            <div className="flex justify-center w-full">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
                onClick={handleLogoClick}
              >
                <img src="/yyc3-pwa-icon.png" alt="YYC Logo" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          {!isVisuallyCollapsed && (
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={togglePin} className="p-1">
                    {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isPinned ? '取消固定' : '固定侧边栏'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={toggleCollapse} className="p-1">
                    {isVisuallyCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isVisuallyCollapsed ? '展开侧边栏' : '收缩侧边栏'}</p>
                </TooltipContent>
              </Tooltip>
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="p-1" aria-label="关闭导航菜单">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-4">
          {menuItems.map((category) => (
            <div key={category.category} className={cn('px-3', sidebarCollapsed && !isHovered && 'px-2')}>
              {!isVisuallyCollapsed && (
                <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
              )}

              <div className="space-y-2">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id;
                  const itemColor = ('color' in item ? item.color : undefined) || category.color;
                  const colors = getColorClasses(itemColor);

                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full transition-all duration-300 group relative',
                            // 展开状态样式
                            !isVisuallyCollapsed && [
                              'justify-start h-10 px-3 border-l-4 border-transparent',
                              isActive
                                ? `${colors.border} ${colors.bg} ${colors.text} shadow-sm`
                                : `hover:border-l-4 ${colors.hover} text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:shadow-xl hover:scale-105`,
                            ],
                            // 收缩状态样式
                            isVisuallyCollapsed && [

                              'justify-center h-10 w-10 mx-auto rounded-lg shadow-sm',
                              `${colors.collapsedBg} ${colors.collapsedBorder} hover:shadow-md hover:scale-105`,
                            ],
                          )}
                          onClick={() => handleNavigation(item.path, item.id)}
                        >
                          <Icon
                            className={cn(
                              'flex-shrink-0 transition-colors duration-300',
                              !isVisuallyCollapsed && 'w-5 h-5',
                              isVisuallyCollapsed && `w-5 h-5 ${colors.iconColor}`,
                            )}
                          />
                          {!isVisuallyCollapsed && (
                            <span className="ml-3 font-medium group-hover:translate-x-1 transition-all duration-300">
                              {item.label}
                            </span>
                          )}
                        </Button>
                      </TooltipTrigger>
                      {sidebarCollapsed && !isHovered && (
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* 底部状态 */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          {!isVisuallyCollapsed && (
            <div className="flex items-center space-x-3 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span>系统运行正常</span>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
