'use client';

import React, { useState, InputHTMLAttributes, forwardRef } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, id, error, helperText, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`field relative ${className}`}>
        {/* Label */}
        <label
          htmlFor={id}
          className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm md:text-base font-medium"
        >
          {label}
        </label>

        {/* Input Field with Toggle Button */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id={id}
            ref={ref}
            className={`w-full pr-10 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 
              text-xs sm:text-sm md:text-base border rounded-md bg-gray-50 dark:bg-gray-900
              text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200
              focus:ring-2 focus:outline-none 
              placeholder:italic placeholder:text-gray-500 dark:placeholder:text-gray-500
              ${error ? 'border-red-500 focus:ring-red-400 hover:border-red-400' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-400 hover:border-gray-400'}`}
            {...props}
          />

          {/* Toggle Visibility Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

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

InputPassword.displayName = 'InputPassword';

export default InputPassword;
