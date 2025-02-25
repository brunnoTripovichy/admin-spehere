import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`logo ${className}`}>
      {/* SVG Logo */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="30" />
        <circle cx="40" cy="40" r="15" fill="var(--background)" />
      </svg>

      {/* Text Logo */}
      <span>Admin Sphere</span>
    </div>
  );
};

export default Logo;
