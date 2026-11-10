'use client';

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  style = {},
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(120deg, #1e3a8a 0%, #0284c7 35%, #38bdf8 50%, #0284c7 65%, #1e3a8a 100%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: `shinyTextSweep ${speed}s ease-in-out infinite`,
        willChange: 'background-position',
        ...style,
      }}
    >
      {text}
    </span>
  );
}

export default ShinyText;
