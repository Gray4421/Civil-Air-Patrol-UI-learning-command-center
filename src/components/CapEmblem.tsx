import React from 'react';

interface CapEmblemProps {
  className?: string;
  size?: number;
  showRims?: boolean;
}

export const CapEmblem: React.FC<CapEmblemProps> = ({ 
  className = '', 
  size = 40,
  showRims = true 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-label="Civil Air Patrol Emblem"
    >
      {/* Outer Blue Disk (CAP Navy #002855) */}
      <circle cx="50" cy="50" r="48" fill="#002855" stroke={showRims ? "#FFC72C" : "#FFFFFF"} strokeWidth="2.5" />

      {/* Inner Accent Ring */}
      {showRims && (
        <circle cx="50" cy="50" r="43.5" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
      )}

      {/* White Triangle (Downward-pointing iconic CAP Triangle) */}
      <polygon
        points="22,30 78,30 50,78"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Red Three-Bladed Propeller (CAP Red #C8102E) */}
      <g transform="translate(50, 48)">
        {/* Blade 1 (pointing up-left) */}
        <path
          d="M 0,-2 C -3,-14 -12,-20 -15,-18 C -17,-15 -10,-6 -2,-1 Z"
          fill="#C8102E"
        />
        {/* Blade 2 (pointing up-right) */}
        <path
          d="M 2,-1 C 10,-6 17,-15 15,-18 C 12,-20 3,-14 0,-2 Z"
          fill="#C8102E"
        />
        {/* Blade 3 (pointing straight down into the triangle apex) */}
        <path
          d="M -2,1 C -3,13 -1,22 1,22 C 3,22 3,13 2,1 Z"
          fill="#C8102E"
        />

        {/* Central Propeller Hub */}
        <circle cx="0" cy="0" r="3.5" fill="#002855" stroke="#FFC72C" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
};
