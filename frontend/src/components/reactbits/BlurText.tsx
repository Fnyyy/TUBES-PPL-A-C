'use client';

import React from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  style?: React.CSSProperties;
}

export function BlurText({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  style = {},
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`blur-text-container ${className}`} style={{ display: 'inline', ...style }}>
      {elements.map((item, index) => (
        <span
          key={index}
          className="blur-text-element"
          style={{
            display: 'inline-block',
            animation: `blurTextIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            animationDelay: `${index * delay}ms`,
            opacity: 0,
            filter: 'blur(8px)',
            transform: 'translateY(12px)',
            willChange: 'filter, opacity, transform',
            marginRight: animateBy === 'words' ? '0.3em' : '0.02em',
          }}
        >
          {item}
        </span>
      ))}
    </span>
  );
}

export default BlurText;
