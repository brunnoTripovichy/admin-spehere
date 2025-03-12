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
import React from 'react';
/**
 * Standalone Checkbox component that can be used independently of form libraries
 */
const Checkbox = (_a) => {
    var { label, error, helperText, className = '', id } = _a, props = __rest(_a, ["label", "error", "helperText", "className", "id"]);
    // Generate a unique ID if none is provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
    return (<div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input type="checkbox" id={checkboxId} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded 
                     dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-blue-600" {...props}/>
      </div>
      <div className="ml-2 text-sm">
        <label htmlFor={checkboxId} className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {helperText && !error && (<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {helperText}
          </p>)}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>);
};
export default Checkbox;
