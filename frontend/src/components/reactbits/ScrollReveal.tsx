'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  distance?: number; // translateY in px
  blur?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 750,
  distance = 24,
  blur = true,
  className = '',
  style = {},
  as: Component = 'div',
  once = false,
}: ScrollRevealProps) {
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const transitionStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : `translateY(${distance}px)`,
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : undefined,
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform, filter',
    ...style,
  };

  return (
    <Component ref={ref} className={`scroll-reveal-item ${className}`} style={transitionStyle}>
      {children}
    </Component>
  );
}

export default ScrollReveal;
