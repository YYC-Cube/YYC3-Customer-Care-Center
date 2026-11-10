'use client';

/**
 * @file checkbox.tsx
 * @description 复选框（shadcn 兼容 API：checked/onCheckedChange）——原模块缺失，原生 input 实现，
 *              支持 ref 设 indeterminate（消费方 batch-operations 依赖）。
 */

import { forwardRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', checked = false, onCheckedChange, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      role="checkbox"
      aria-checked={checked === 'indeterminate' ? 'mixed' : checked === true}
      checked={checked === true}
      className={`h-4 w-4 shrink-0 cursor-pointer accent-slate-900 ${className}`}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  ),
);
Checkbox.displayName = 'Checkbox';
