import React from 'react';
const HelperTextInfo = ({ children, className = '', }) => {
    return (<p className={`text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 
        leading-relaxed sm:leading-normal ${className}`}>
      {children}
    </p>);
};
export default HelperTextInfo;
