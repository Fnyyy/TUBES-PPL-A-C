'use client';

import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

export function DecryptedText({
  text,
  speed = 45,
  maxIterations = 12,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  encryptedClassName = 'tech-glitch-char',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (animateOn === 'view' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setIsScrolledIntoView(true);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [animateOn, hasAnimated]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const shouldAnimate =
      (animateOn === 'view' && isScrolledIntoView) ||
      (animateOn === 'hover' && isHovering);

    if (shouldAnimate) {
      const charPool = useOriginalCharsOnly
        ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
        : characters.split('');

      const getNextChar = (original: string) => {
        if (original === ' ') return ' ';
        return charPool[Math.floor(Math.random() * charPool.length)] || original;
      };

      interval = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split('')
            .map((char, index) => {
              if (text[index] === ' ') return ' ';

              if (sequential) {
                let revealIndex = 0;
                if (revealDirection === 'start') {
                  revealIndex = Math.floor((currentIteration / maxIterations) * text.length);
                  return index <= revealIndex ? text[index] : getNextChar(text[index]);
                } else if (revealDirection === 'end') {
                  revealIndex = text.length - Math.floor((currentIteration / maxIterations) * text.length);
                  return index >= revealIndex ? text[index] : getNextChar(text[index]);
                }
              }

              return Math.random() < currentIteration / maxIterations
                ? text[index]
                : getNextChar(text[index]);
            })
            .join('')
        );

        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          if (animateOn === 'view') {
            setHasAnimated(true);
          }
        }
      }, speed);
    } else if (!isHovering && animateOn === 'hover') {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [
    isHovering,
    isScrolledIntoView,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    animateOn,
  ]);

  return (
    <span
      ref={containerRef}
      className={`decrypted-text-container ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
      style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}

export default DecryptedText;
