'use client';

/**
 * @file enhanced-button.tsx
 * @description 增强按钮（Button 兼容 API + icon / loading）——组件令牌 component.enhancedButton
 * @module components.ui.enhanced-button
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 令牌来源：lib/design-tokens.ts → component.enhancedButton
 * 禁止就地硬编码色值 / 尺寸。
 */

import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** 变体 → 令牌映射（对应 component.enhancedButton.variant） */
const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground border border-primary hover:bg-primary-hover active:bg-primary-hover',
  secondary: 'bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/80',
  outline: 'border border-input bg-background text-foreground hover:bg-muted active:bg-neutral-200',
  ghost: 'text-foreground hover:bg-muted active:bg-neutral-200',
  destructive: 'bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive-hover',
  link: 'text-primary hover:text-primary-hover hover:underline underline-offset-4',
};

/** 尺寸 → 令牌映射（对应 component.enhancedButton.size） */
const sizes: Record<string, string> = {
  default: 'h-9 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-[13px]',
  lg: 'h-10 px-6 text-sm',
  icon: 'size-9 p-0',
};

export interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: LucideIcon;
  /** loading 态：令牌 opacity 0.7 + cursor progress */
  loading?: boolean;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant = 'default', size = 'default', icon: Icon, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring',
          'disabled:pointer-events-none disabled:opacity-50',
          loading && 'cursor-progress opacity-70',
          variants[variant] || variants.default,
          sizes[size] || sizes.default,
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon ? <Icon className="w-4 h-4" /> : null}
        {children}
      </button>
    );
  },
);
EnhancedButton.displayName = 'EnhancedButton';
