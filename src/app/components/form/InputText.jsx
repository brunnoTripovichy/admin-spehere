'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
const InputText = forwardRef((_a, ref) => {
    var { label, id, error, helperText, className = '' } = _a, props = __rest(_a, ["label", "id", "error", "helperText", "className"]);
    return (<div className={`field ${className}`}>
        {/* Label */}
        <label htmlFor={id} className="text-gray-800 dark:text-gray-300 text-xs sm:text-sm md:text-base font-medium">
          {label}
        </label>

        {/* Input Field */}
        <input type="text" id={id} ref={ref} className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 
            text-xs sm:text-sm md:text-base border rounded-md bg-gray-50 dark:bg-gray-900
            text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200
            focus:ring-2 focus:outline-none 
            placeholder:italic placeholder:text-gray-500 dark:placeholder:text-gray-500
            ${error ? 'border-red-500 focus:ring-red-400 hover:border-red-400' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-400 hover:border-gray-400'}`} {...props}/>

        {/* Helper Text or Error Message */}
        {helperText && !error && (<p className="text-xs text-gray-500 dark:text-gray-400">
            {helperText}
          </p>)}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>);
});
InputText.displayName = 'InputText';
export default InputText;
