'use client';

import React, { useEffect, useRef } from 'react';

interface SquaresBackgroundProps {
  speed?: number;
  squareSize?: number;
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  borderColor?: string;
  hoverFillColor?: string;
  className?: string;
}

export function SquaresBackground({
  speed = 0.5,
  squareSize = 48,
  direction = 'diagonal',
  borderColor = 'rgba(226, 232, 240, 0.45)',
  hoverFillColor = 'rgba(2, 132, 199, 0.05)',
  className = '',
}: SquaresBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const col = Math.floor((mouseX - (gridOffset.x % squareSize)) / squareSize);
      const row = Math.floor((mouseY - (gridOffset.y % squareSize)) / squareSize);
      hoveredSquare.current = { x: col, y: row };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numCols = Math.ceil(canvas.width / squareSize) + 2;
      const numRows = Math.ceil(canvas.height / squareSize) + 2;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let i = -1; i < numCols; i++) {
        for (let j = -1; j < numRows; j++) {
          const x = i * squareSize + (gridOffset.x % squareSize);
          const y = j * squareSize + (gridOffset.y % squareSize);

          if (
            hoveredSquare.current &&
            hoveredSquare.current.x === i &&
            hoveredSquare.current.y === j
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }

          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      // Smooth floating drift
      if (direction === 'diagonal') {
        gridOffset.x += speed * 0.4;
        gridOffset.y += speed * 0.4;
      } else if (direction === 'right') {
        gridOffset.x += speed * 0.5;
      } else if (direction === 'down') {
        gridOffset.y += speed * 0.5;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`squares-background ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0,
      }}
    />
  );
}

export default SquaresBackground;
