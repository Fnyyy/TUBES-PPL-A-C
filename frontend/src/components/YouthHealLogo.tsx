'use client';

import React from 'react';

interface YouthHealLogoProps {
  size?: number;
  className?: string;
  color?: string;
  accentColor?: string;
  style?: React.CSSProperties;
}

export function YouthHealLogo({
  size = 36,
  className = '',
  color = '#1e3a8a',
  accentColor = '#0284c7',
  style = {},
}: YouthHealLogoProps) {
  const id = React.useId();
  const gradId = `yh-grad-${id.replace(/:/g, '')}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>

      {/* Outer Shield Contour */}
      <path
        d="M50 12 L79 23 C79 53 66 75 50 88 C34 75 21 53 21 23 Z"
        stroke={`url(#${gradId})`}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Speech Bubble (Top Left) */}
      <g fill={`url(#${gradId})`}>
        <path d="M33 26 C40 26 46 29.5 46 34 C46 38.5 40 42 33 42 C30.8 42 28.8 41.3 27.2 40.2 L23 42 L24.3 38.3 C23.5 37 23 35.6 23 34 C23 29.5 28 26 33 26 Z" />
        {/* Three dots in speech bubble */}
        <circle cx="28.5" cy="34" r="1.3" fill="#ffffff" />
        <circle cx="33.5" cy="34" r="1.3" fill="#ffffff" />
        <circle cx="38.5" cy="34" r="1.3" fill="#ffffff" />
      </g>

      {/* Sparkle / Four-pointed star (Top Right) */}
      <path
        d="M65 26 Q65 31 70 31 Q65 31 65 36 Q65 31 60 31 Q65 31 65 26 Z"
        fill={`url(#${gradId})`}
      />

      {/* 3 People Figures */}
      {/* Center Person (Larger) */}
      <circle cx="50" cy="45" r="5" fill={`url(#${gradId})`} />
      <path
        d="M42 59 C42 54 45.6 51 50 51 C54.4 51 58 54 58 59 C58 64 54.4 67 50 67 C45.6 67 42 64 42 59 Z"
        fill={`url(#${gradId})`}
      />

      {/* Left Person (Smaller) */}
      <circle cx="36" cy="49" r="3.8" fill={`url(#${gradId})`} />
      <path
        d="M30 60 C30 55.8 33 53.5 36 53.5 C38.5 53.5 40.5 55.2 41 57.5 C39 61 36 63 32 63 C30.8 63 30 61.5 30 60 Z"
        fill={`url(#${gradId})`}
      />

      {/* Right Person (Smaller) */}
      <circle cx="64" cy="49" r="3.8" fill={`url(#${gradId})`} />
      <path
        d="M70 60 C70 55.8 67 53.5 64 53.5 C61.5 53.5 59.5 55.2 59 57.5 C61 61 64 63 68 63 C69.2 63 70 61.5 70 60 Z"
        fill={`url(#${gradId})`}
      />

      {/* Two Protective Cupped Hands at the bottom */}
      <path
        d="M26 51 C27 60 34 76 50 82 C44 75 35 68 33 59 C37 66 43 71 50 74 C47 67 40 60 34 57 Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M74 51 C73 60 66 76 50 82 C56 75 65 68 67 59 C63 66 57 71 50 74 C53 67 60 60 66 57 Z"
        fill={`url(#${gradId})`}
      />
    </svg>
  );
}

export default YouthHealLogo;
