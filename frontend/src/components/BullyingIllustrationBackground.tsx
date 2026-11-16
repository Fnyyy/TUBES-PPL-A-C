'use client';

import React, { useEffect, useState } from 'react';

interface BullyingIllustrationBackgroundProps {
  variant?: 'hero' | 'full';
  opacity?: number;
}

export default function BullyingIllustrationBackground({
  variant = 'hero',
  opacity = 1,
}: BullyingIllustrationBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`bullying-bg-container ${variant === 'full' ? 'bullying-bg-full' : 'bullying-bg-hero'}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Ambient Vignette & Cyber Glow */}
      <div className="bullying-vignette" />
      <div className="bullying-cyber-glow" />

      {/* Main Vector SVG Scene - Composed to balance left typography and right artwork */}
      <svg
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        className="bullying-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial glow from laptop screen */}
          <radialGradient id="laptopScreenBeam" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#1e3a8a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#080d1a" stopOpacity="0" />
          </radialGradient>

          {/* Rust Red/Brown Monster Gradient */}
          <linearGradient id="monsterRust" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9e4a3b" />
            <stop offset="100%" stopColor="#4f2018" />
          </linearGradient>

          {/* Deep Teal Monster Gradient */}
          <linearGradient id="monsterTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e444d" />
            <stop offset="100%" stopColor="#0f2429" />
          </linearGradient>

          {/* Dark Slate Shadow Gradient */}
          <linearGradient id="monsterDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a2538" />
            <stop offset="100%" stopColor="#090f1a" />
          </linearGradient>

          {/* Speech Bubble Teal Gradient */}
          <linearGradient id="speechBubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1b4d55" />
            <stop offset="100%" stopColor="#0f2e34" />
          </linearGradient>

          {/* Scrim Gradient to protect Left Text Column from any background collision */}
          <linearGradient id="leftTextProtectionScrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#080d1a" stopOpacity="1" />
            <stop offset="42%" stopColor="#080d1a" stopOpacity="0.96" />
            <stop offset="60%" stopColor="#080d1a" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#080d1a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#080d1a" stopOpacity="0" />
          </linearGradient>

          <filter id="screenGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---------------- BASE DARK CANVAS ---------------- */}
        <rect width="1440" height="850" fill="#080d1a" />
        
        {/* Ambient Dark Navy/Indigo Glow beneath artwork on the right */}
        <circle cx="980" cy="460" r="420" fill="#13203c" opacity="0.65" />
        <circle cx="1200" cy="300" r="300" fill="#1e1834" opacity="0.4" />
        <circle cx="820" cy="320" r="280" fill="#132a38" opacity="0.45" />

        {/* ---------------- ARTWORK ON RIGHT HALF (CX ≈ 980) ---------------- */}

        {/* Monster 1: Left-behind of victim (Deep Teal Silhouette) */}
        <g className="anim-monster-sway" style={{ transformOrigin: '760px 400px' }}>
          <path
            d="M 680 650 Q 670 330 730 260 Q 770 210 820 270 Q 860 340 870 650 Z"
            fill="url(#monsterTeal)"
            opacity="0.9"
          />
          <ellipse cx="770" cy="260" rx="55" ry="60" fill="#1e444d" />
          {/* Evil eye slits */}
          <ellipse cx="755" cy="255" rx="7" ry="10" fill="#38bdf8" opacity="0.85" />
          <ellipse cx="785" cy="252" rx="7" ry="10" fill="#38bdf8" opacity="0.85" />
          {/* Grinning mouth */}
          <path d="M 748 290 Q 772 315 798 290" stroke="#091217" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Raised menacing claw */}
          <path
            d="M 720 320 Q 660 220 635 150 Q 645 145 655 155 Q 675 220 735 340 Z"
            fill="url(#monsterTeal)"
            opacity="0.9"
          />
        </g>

        {/* Monster 2: Center Giant (Rust Red/Brown Shouting Monster with Sharp Teeth) */}
        <g className="anim-monster-breathe" style={{ transformOrigin: '980px 360px' }}>
          {/* Towering Body */}
          <path
            d="M 820 680 Q 810 290 870 200 Q 930 140 1040 140 Q 1120 180 1150 290 Q 1160 520 1160 680 Z"
            fill="url(#monsterRust)"
            opacity="0.95"
          />
          {/* Head */}
          <path
            d="M 860 190 C 860 130 1100 130 1100 190 C 1100 270 1100 310 860 310 Z"
            fill="#9e4a3b"
          />
          {/* Angry Angled Eyes */}
          <polygon points="915,200 955,212 925,222" fill="#090f1a" />
          <polygon points="1045,200 1005,212 1035,222" fill="#090f1a" />
          <polygon points="925,206 948,214 932,218" fill="#ef4444" className="anim-eye-glow" />
          <polygon points="1035,206 1012,214 1028,218" fill="#ef4444" className="anim-eye-glow" />
          {/* Shouting Jagged Mouth */}
          <path
            d="M 930 240 Q 980 230 1030 240 L 1025 320 Q 980 340 935 320 Z"
            fill="#120604"
          />
          {/* Monster teeth */}
          <polygon points="940,240 950,275 960,240" fill="#f87171" />
          <polygon points="970,238 980,280 990,238" fill="#f87171" />
          <polygon points="1000,238 1010,280 1020,238" fill="#f87171" />
          <polygon points="950,320 960,290 970,320" fill="#f87171" />
          <polygon points="990,320 1000,285 1010,320" fill="#f87171" />
        </g>

        {/* Monster 3: Right Profile Monster pointing long claw */}
        <g className="anim-monster-sway-rev" style={{ transformOrigin: '1240px 400px' }}>
          <path
            d="M 1170 680 Q 1180 330 1220 220 Q 1280 160 1340 210 Q 1390 270 1410 680 Z"
            fill="url(#monsterRust)"
            opacity="0.9"
          />
          <ellipse cx="1280" cy="230" rx="55" ry="65" fill="#a85242" />
          <path d="M 1240 250 Q 1270 280 1320 245" stroke="#120604" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="1270" cy="210" r="5" fill="#ef4444" />

          {/* Accusing Pointing Arm reaching to victim */}
          <g className="anim-accuse-point-right">
            <path
              d="M 1230 380 Q 1160 375 1070 410 Q 1030 420 990 425 L 990 440 Q 1050 445 1120 435 Q 1190 445 1230 450 Z"
              fill="#a85242"
            />
            <path
              d="M 1070 410 C 1030 415 980 422 960 425 C 950 427 950 440 960 442 C 1000 442 1050 440 1090 435 Z"
              fill="#b85d4d"
            />
          </g>
        </g>

        {/* Monster 4: Dark Slate Looming Shadow on Far Right */}
        <g className="anim-monster-breathe" style={{ transformOrigin: '1380px 420px' }}>
          <path
            d="M 1320 700 Q 1340 370 1390 300 Q 1430 270 1450 330 L 1450 700 Z"
            fill="url(#monsterDark)"
            opacity="0.85"
          />
        </g>

        {/* Pointing Hand from Top Right (Reference Image 2) */}
        <g className="anim-finger-point-tl" style={{ transformOrigin: '1300px 80px' }}>
          <path
            d="M 1380 40 Q 1330 80 1260 140 L 1240 160 Q 1230 155 1240 145 L 1280 110 Q 1340 60 1390 30 Z"
            fill="#e2e8f0"
            opacity="0.65"
          />
          <circle cx="1240" cy="155" r="7" fill="#cbd5e1" opacity="0.75" />
        </g>

        {/* Thumbs Down from Right (Reference Image 2) */}
        <g className="anim-thumb-down-tr" style={{ transformOrigin: '1360px 480px' }}>
          <rect x="1340" y="450" width="30" height="42" rx="7" fill="#e2e8f0" opacity="0.6" />
          <path d="M 1340 478 L 1322 510 Q 1318 522 1332 522 L 1348 512 L 1348 478 Z" fill="#cbd5e1" opacity="0.7" />
        </g>

        {/* Claws Reaching on Desk */}
        <g className="anim-accuse-point-right">
          <path
            d="M 1200 680 Q 1140 625 1060 635 Q 1030 640 1010 655 L 1015 675 Q 1070 675 1130 705 Z"
            fill="#9e4a3b"
            opacity="0.85"
          />
        </g>

        {/* ---------------- VICTIM BOY & GLOWING LAPTOP (CENTERPIECE AT X ≈ 980) ---------------- */}
        <g id="victimStudent">
          {/* Laptop Screen Light Cone Beam */}
          <polygon
            points="880,680 1080,680 1200,440 760,440"
            fill="url(#laptopScreenBeam)"
            opacity="0.9"
            className="anim-laptop-pulse"
          />

          {/* Yellow Shirt / Shoulders */}
          <path
            d="M 800 680 Q 815 570 870 545 Q 920 535 980 535 Q 1040 535 1090 545 Q 1145 570 1160 680 Z"
            fill="#eab308"
          />
          <path
            d="M 825 680 Q 840 590 885 570 Q 895 620 905 680 Z"
            fill="#ca8a04"
            opacity="0.6"
          />
          <path
            d="M 1135 680 Q 1120 590 1075 570 Q 1065 620 1055 680 Z"
            fill="#ca8a04"
            opacity="0.6"
          />

          {/* Collar & Neck */}
          <polygon points="955,540 980,575 1005,540" fill="#f8fafc" />
          <rect x="960" y="505" width="40" height="40" rx="4" fill="#fed7aa" />

          {/* Head */}
          <ellipse cx="980" cy="460" rx="65" ry="75" fill="#fde68a" />
          <ellipse cx="912" cy="465" rx="14" ry="20" fill="#fed7aa" />
          <ellipse cx="1048" cy="465" rx="14" ry="20" fill="#fed7aa" />

          {/* Brown Teen Hair */}
          <path
            d="M 905 450 Q 900 370 980 370 Q 1060 370 1055 450 Q 1040 410 1020 415 Q 1000 395 980 410 Q 955 395 935 420 Q 915 425 905 450 Z"
            fill="#451a03"
          />
          <path
            d="M 950 410 Q 980 435 990 415 Q 1005 435 1025 420 Q 1020 400 980 400 Z"
            fill="#592407"
          />

          {/* Worried Eyebrows */}
          <path d="M 942 445 Q 958 432 968 440" stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 1018 445 Q 1002 432 992 440" stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Anxious Eyes looking down */}
          <ellipse cx="958" cy="460" rx="6" ry="8" fill="#1e293b" />
          <ellipse cx="1002" cy="460" rx="6" ry="8" fill="#1e293b" />
          <circle cx="959" cy="458" r="2.5" fill="#ffffff" />
          <circle cx="1003" cy="458" r="2.5" fill="#ffffff" />

          {/* Sad downturned mouth */}
          <path d="M 965 495 Q 980 488 995 495" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Sweat drop */}
          <path d="M 928 440 Q 924 448 928 454 Q 934 454 933 446 Z" fill="#38bdf8" opacity="0.85" />

          {/* Hands */}
          <ellipse cx="865" cy="670" rx="28" ry="18" fill="#fde68a" />
          <ellipse cx="1095" cy="670" rx="28" ry="18" fill="#fde68a" />

          {/* Laptop */}
          <g id="laptop">
            <rect x="855" y="630" width="250" height="150" rx="14" fill="#334155" stroke="#475569" strokeWidth="3" />
            <rect x="865" y="640" width="230" height="130" rx="8" fill="#1e293b" />
            <circle cx="980" cy="700" r="16" fill="#e2e8f0" opacity="0.9" filter="url(#screenGlow)" />
            <ellipse cx="980" cy="635" rx="130" ry="15" fill="#38bdf8" opacity="0.95" filter="url(#screenGlow)" />
          </g>
        </g>

        {/* ---------------- FLOATING SPEECH BUBBLES AROUND ARTWORK ---------------- */}

        {/* Bubble 1: Top-Left of boy ("#!***") */}
        <g className="anim-bubble-float-1" style={{ transformOrigin: '730px 140px' }}>
          <rect x="660" y="105" width="155" height="68" rx="18" fill="url(#speechBubbleGrad)" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="780,165 820,195 770,175" fill="#0f2e34" stroke="#38bdf8" strokeWidth="2" />
          <text x="737" y="148" fill="#f43f5e" fontFamily="monospace, sans-serif" fontWeight="900" fontSize="28" letterSpacing="5" textAnchor="middle">
            #!***
          </text>
        </g>

        {/* Bubble 2: Top-Center ("#!***") */}
        <g className="anim-bubble-float-2" style={{ transformOrigin: '980px 80px' }}>
          <rect x="900" y="45" width="165" height="72" rx="18" fill="url(#speechBubbleGrad)" stroke="#2dd4bf" strokeWidth="3" />
          <polygon points="970,115 985,145 1005,115" fill="#0f2e34" stroke="#2dd4bf" strokeWidth="2" />
          <text x="982" y="92" fill="#ef4444" fontFamily="monospace, sans-serif" fontWeight="900" fontSize="30" letterSpacing="5" textAnchor="middle">
            #!***
          </text>
        </g>

        {/* Bubble 3: Top-Right ("#!**!") */}
        <g className="anim-bubble-float-3" style={{ transformOrigin: '1220px 120px' }}>
          <rect x="1150" y="85" width="160" height="68" rx="18" fill="url(#speechBubbleGrad)" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="1170,145 1130,175 1185,155" fill="#0f2e34" stroke="#38bdf8" strokeWidth="2" />
          <text x="1230" y="128" fill="#f43f5e" fontFamily="monospace, sans-serif" fontWeight="900" fontSize="28" letterSpacing="4" textAnchor="middle">
            #!**!
          </text>
        </g>

        {/* Bubble 4: Right Mid ("#!@!!") */}
        <g className="anim-bubble-float-1" style={{ transformOrigin: '1240px 580px' }}>
          <rect x="1170" y="550" width="165" height="70" rx="18" fill="url(#speechBubbleGrad)" stroke="#0ea5e9" strokeWidth="3" />
          <polygon points="1185,580 1140,595 1185,610" fill="#0f2e34" stroke="#0ea5e9" strokeWidth="2" />
          <text x="1252" y="593" fill="#f43f5e" fontFamily="monospace, sans-serif" fontWeight="900" fontSize="28" letterSpacing="4" textAnchor="middle">
            #!@!!
          </text>
        </g>

        {/* ---------------- PROTECTIVE GRADIENT SCRIM FOR LEFT COLUMN TEXT ---------------- */}
        {/* Ensures the left text (Hentikan, buttons, descriptions) has zero collision and 100% crisp contrast */}
        <rect x="0" y="0" width="820" height="850" fill="url(#leftTextProtectionScrim)" />

        {/* Floating cyber particles */}
        <circle cx="200" cy="220" r="2.5" fill="#38bdf8" className="anim-particle-1" opacity="0.5" />
        <circle cx="450" cy="180" r="2" fill="#38bdf8" className="anim-particle-2" opacity="0.4" />
        <circle cx="350" cy="550" r="3" fill="#22d3ee" className="anim-particle-3" opacity="0.5" />
        <circle cx="1080" cy="240" r="3.5" fill="#38bdf8" className="anim-particle-1" />
        <circle cx="1320" cy="380" r="2.5" fill="#f43f5e" className="anim-particle-2" />
      </svg>
    </div>
  );
}
