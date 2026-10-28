import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Input({ label, hint, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold">{label}</span>
      <input
        className={`h-11 rounded-lg border border-line bg-white px-3.5 transition-colors placeholder:text-muted/60 focus:border-forest ${className ?? ''}`}
        {...props}
      />
      {hint && <span className="text-sm text-muted">{hint}</span>}
    </label>
  );
}
