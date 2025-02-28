import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`logo flex items-center gap-2 ${className}`}>
      {/* SVG Logo */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary dark:fill-primary-hover transition-colors duration-200"
      >
        <circle
          cx="40"
          cy="40"
          r="30"
          className="fill-primary dark:fill-blue-500"
        />
        <circle
          cx="40"
          cy="40"
          r="15"
          className="fill-background dark:fill-gray-900"
        />
      </svg>

      {/* Text Logo */}
      <span className="text-foreground dark:text-gray-100 text-xl font-semibold transition-colors duration-200">
        Admin Sphere
      </span>
    </div>
  );
};

export default Logo;
