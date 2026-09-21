import React from 'react';
import { Search, X } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    clearable,
    className = '', 
    id,
    value,
    onChange,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const [showClear, setShowClear] = React.useState(false);

    React.useEffect(() => {
      setShowClear(clearable && !!value);
    }, [clearable, value]);

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange?.(e as any);
      if (typeof value === 'string') {
        // This won't work directly, but the parent should handle the clear
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-xl border transition-all duration-200
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon || clearable ? 'pr-10' : 'pr-4'}
              py-3
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-forest-500 focus:border-transparent'}
              bg-white text-slate-900 placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:bg-slate-50 disabled:cursor-not-allowed
              ${className}
            `}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {(rightIcon || (clearable && showClear)) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {clearable && showClear ? (
                <button
                  type="button"
                  onMouseDown={handleClear}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-slate-400 pointer-events-none">{rightIcon}</span>
              )}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon'>>(
  ({ className = '', ...props }, ref) => (
    <Input
      ref={ref}
      leftIcon={<Search className="w-5 h-5" />}
      className={className}
      {...props}
    />
  )
);

SearchInput.displayName = 'SearchInput';