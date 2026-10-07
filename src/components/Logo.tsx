import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.25 : 1.0;
  const width = 220 * scale;
  const height = 55 * scale;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-[1.02]"
      >
        <defs>
          <linearGradient id="neonEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="neonPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="cmoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield Border */}
        <polygon
          points="30,6 52,18 52,42 30,54 8,42 8,18"
          fill="#121217"
          stroke="url(#neonEmeraldGrad)"
          strokeWidth="2"
        />
        <polygon
          points="30,12 46,21 46,39 30,48 14,39 14,21"
          fill="#09090B"
          stroke="#27272A"
          strokeWidth="1.5"
        />

        {/* Neural "M" Core */}
        <path
          d="M19 38V22L30 33L41 22V38"
          stroke="url(#neonEmeraldGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#cmoGlow)"
        />
        <circle cx="30" cy="33" r="2.5" fill="#34D399" />
        <circle cx="19" cy="22" r="2" fill="#6366F1" />
        <circle cx="41" cy="22" r="2" fill="#6366F1" />

        {/* Brand Text */}
        <text
          x="68"
          y="37"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          fill="#F8FAFC"
          letterSpacing="1"
        >
          Ma<tspan fill="url(#neonEmeraldGrad)">Insane</tspan>
        </text>
        <text
          x="69"
          y="49"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="700"
          fontSize="8.5"
          fill="#64748B"
          letterSpacing="3"
        >
          AUTONOMOUS AI CMO
        </text>
      </svg>
    </div>
  );
};
