import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const buttonClasses: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-white hover:bg-forest-deep',
  secondary: 'border border-line bg-white text-ink hover:border-forest hover:text-forest',
  danger: 'bg-alert text-white hover:bg-red-900',
};

export const buttonBase =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50';

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${buttonBase} ${buttonClasses[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
