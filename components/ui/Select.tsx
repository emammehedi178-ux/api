import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: string[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-300 font-sans">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full bg-gray-800/50 border border-gray-700 text-white rounded-md py-3 px-4 appearance-none transition-all",
              "focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange",
              "disabled:opacity-50",
              error ? "border-red-500 focus:ring-red-500" : "",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt} value={opt} className="bg-gray-900 text-white">
                {opt}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;