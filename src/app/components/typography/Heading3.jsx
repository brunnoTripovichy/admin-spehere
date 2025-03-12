import React from 'react';
const Heading3 = ({ children, className = '' }) => {
    return (<h3 className={`text-lg sm:text-xl lg:text-2xl font-medium tracking-normal 
        leading-snug sm:leading-tight text-gray-900 dark:text-gray-200 
        mb-2 sm:mb-3 lg:mb-4 ${className}`}>
      {children}
    </h3>);
};
export default Heading3;
