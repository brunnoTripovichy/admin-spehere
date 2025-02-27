'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, id, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className={`field ${className}`}>
        {/* Label */}
        <label
          htmlFor={id}
          className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm md:text-base font-medium"
        >
          {label}
        </label>

        {/* Input Field */}
        <input
          id={id}
          ref={ref}
          className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 
            text-xs sm:text-sm md:text-base border rounded-md bg-white dark:bg-gray-900
            text-gray-800 dark:text-gray-100 shadow-sm transition-all duration-200
            focus:ring-2 focus:outline-none 
            ${error ? 'border-red-500 focus:ring-red-400 hover:border-red-400' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-400 hover:border-gray-400'}`}
          {...props}
        />

        {/* Helper Text or Error Message */}
        {helperText && !error && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
