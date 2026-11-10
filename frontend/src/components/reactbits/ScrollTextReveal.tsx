'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  once?: boolean;
}

export function ScrollTextReveal({
  text,
  delay = 50,
  wordDelay = 35,
  className = '',
  style = {},
  as: Component = 'span',
  once = false,
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(' ');

  return (
    <Component
      ref={ref}
      className={`scroll-text-reveal ${className}`}
      style={{ display: 'inline', ...style }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.12em',
            marginBottom: '-0.12em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              filter: isVisible ? 'blur(0px)' : 'blur(4px)',
              transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay + idx * wordDelay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay + idx * wordDelay}ms, filter 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay + idx * wordDelay}ms`,
              willChange: 'opacity, transform, filter',
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}

export default ScrollTextReveal;
