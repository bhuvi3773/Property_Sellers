import React from 'react';

/**
 * Logo Component
 * Visually stunning interlocking geometric gold emblem with architectural typography.
 * Completely responsive across desktop, tablet, and mobile (320px+).
 */
export default function Logo({ size = 'default', showTagline = true, className = '' }) {
  return (
    <div className={`brand-logo-container brand-logo-${size} ${className}`}>
      {/* Visually Stunning Interlocking Architectural Gold Emblem */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-emblem-svg"
      >
        <defs>
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="35%" stopColor="#DFBE85" />
            <stop offset="70%" stopColor="#C8A870" />
            <stop offset="100%" stopColor="#8A6E37" />
          </linearGradient>
          <linearGradient id="innerGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#DFBE85" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8A6E37" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Diamond Shield */}
        <polygon
          points="24,2 46,24 24,46 2,24"
          stroke="url(#goldMetallic)"
          strokeWidth="1.5"
          fill="#111613"
        />

        {/* Inner Secondary Facet */}
        <polygon
          points="24,7 41,24 24,41 7,24"
          stroke="rgba(223, 190, 133, 0.35)"
          strokeWidth="1"
          fill="none"
        />

        {/* Interlocking Arch Vault: 'V' for Vault and 'A' Arch for Vista */}
        <path
          d="M14 16 L24 35 L34 16"
          stroke="url(#goldMetallic)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Central Geometric Keystone Pillar */}
        <path
          d="M24 10 L24 28"
          stroke="url(#goldMetallic)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Radiant Horizon Line (The Vista) */}
        <line
          x1="13"
          y1="24"
          x2="35"
          y2="24"
          stroke="url(#goldMetallic)"
          strokeWidth="1"
          strokeDasharray="1.5 2"
        />

        {/* Zenith Star Sparkle */}
        <circle cx="24" cy="10" r="1.5" fill="#FFF2D6" />
      </svg>

      {/* Typography Block */}
      <div className="brand-text-block">
        <span className="brand-title">VAULT & VISTA</span>
        {showTagline && (
          <span className="brand-subtitle">
            <span className="brand-subtitle-main">Architectural Residences</span>
            <span className="brand-subtitle-dot">•</span>
            <span className="brand-subtitle-country">India</span>
          </span>
        )}
      </div>
    </div>
  );
}
