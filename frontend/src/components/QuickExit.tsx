'use client';

import { useEffect } from 'react';
import { BoltIcon } from './Icons';

export default function QuickExit() {
  const exitSafely = () => {
    window.location.replace('https://classroom.google.com');
  };

  useEffect(() => {
    let escCount = 0;
    let timer: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        escCount++;
        clearTimeout(timer);
        if (escCount >= 3) {
          exitSafely();
        } else {
          timer = setTimeout(() => {
            escCount = 0;
          }, 1200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return (
    <button
      className="sos-floating"
      onClick={exitSafely}
      title="Tekan ESC 3x atau klik untuk keluar darurat ke Google Classroom"
      type="button"
    >
      <BoltIcon size={16} />
      <span className="sos-text">Quick Exit (ESC 3x)</span>
    </button>
  );
}
