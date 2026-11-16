'use client';

import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-wrapper">
      {/* Top subtle gradient progress indicator that sweeps across upon page navigation */}
      <div className="page-progress-bar" />
      {/* Main page content with smooth upward fade enter transition */}
      <div className="page-transition-enter">
        {children}
      </div>
    </div>
  );
}
