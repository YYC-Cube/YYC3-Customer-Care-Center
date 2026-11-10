'use client';

/**
 * @file enhanced-button.tsx
 * @description 增强按钮（shadcn Button 兼容 API + icon prop）——原模块缺失，本文件为恢复构建的兼容实现。
 */

import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

const variants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-input bg-background hover:bg-accent',
  ghost: 'hover:bg-accent',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizes: Record<string, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-10 px-8',
  icon: 'h-9 w-9',
};

export interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: LucideIcon;
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className = '', variant = 'default', size = 'default', icon: Icon, children, ...props }, ref) => {
    const cls = [
      'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      variants[variant] || variants.default,
      sizes[size] || sizes.default,
      className,
    ].join(' ');
    return (
      <button ref={ref} className={cls} {...props}>
        {Icon ? <Icon className="w-4 h-4" /> : null}
        {children}
      </button>
    );
  },
);
EnhancedButton.displayName = 'EnhancedButton';
