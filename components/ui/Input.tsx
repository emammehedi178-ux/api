import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-300 font-sans">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-gray-800/50 border border-gray-700 text-white rounded-md py-3 px-4 transition-all",
              "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange",
              "placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed",
              icon ? "pl-10" : "",
              error ? "border-red-500 focus:ring-red-500 focus:border-red-500 animate-shake" : "",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;