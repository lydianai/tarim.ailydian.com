'use client';

export default function LydianAgriLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background Circle - Earth Tone */}
        <circle cx="100" cy="100" r="95" fill="url(#earthGradient)" />

        {/* Wheat/Grain Element - Top */}
        <g transform="translate(100, 40)">
          {/* Center stalk */}
          <path d="M0 0 L0 60" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          {/* Left grains */}
          <ellipse cx="-8" cy="15" rx="6" ry="10" fill="#fff" opacity="0.9" />
          <ellipse cx="-10" cy="30" rx="6" ry="10" fill="#fff" opacity="0.9" />
          <ellipse cx="-8" cy="45" rx="6" ry="10" fill="#fff" opacity="0.9" />
          {/* Right grains */}
          <ellipse cx="8" cy="15" rx="6" ry="10" fill="#fff" opacity="0.9" />
          <ellipse cx="10" cy="30" rx="6" ry="10" fill="#fff" opacity="0.9" />
          <ellipse cx="8" cy="45" rx="6" ry="10" fill="#fff" opacity="0.9" />
        </g>

        {/* Leaf Elements - Growth Symbol */}
        <g transform="translate(100, 110)">
          {/* Left leaf */}
          <path
            d="M-5 0 Q-30 -10 -35 -25 Q-30 -15 -5 -5 Z"
            fill="url(#leafGradient)"
            opacity="0.95"
          />
          {/* Right leaf */}
          <path
            d="M5 0 Q30 -10 35 -25 Q30 -15 5 -5 Z"
            fill="url(#leafGradient)"
            opacity="0.95"
          />
        </g>

        {/* Soil/Earth Line - Bottom */}
        <path
          d="M30 140 Q50 145 70 140 T110 140 T150 140 T170 140"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Data Dots - Tech Integration */}
        <circle cx="60" cy="100" r="3" fill="#fff" opacity="0.6" />
        <circle cx="140" cy="100" r="3" fill="#fff" opacity="0.6" />
        <circle cx="75" cy="85" r="2" fill="#fff" opacity="0.5" />
        <circle cx="125" cy="85" r="2" fill="#fff" opacity="0.5" />

        {/* Gradients */}
        <defs>
          <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function LydianAgriLogoWithText({ size = "normal" }: { size?: "small" | "normal" | "large" }) {
  const sizes = {
    small: { logo: "w-8 h-8", text: "text-base", subtitle: "text-[10px]" },
    normal: { logo: "w-10 h-10", text: "text-xl", subtitle: "text-xs" },
    large: { logo: "w-16 h-16", text: "text-3xl", subtitle: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <LydianAgriLogo className={s.logo} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className={`${s.text} font-display font-bold bg-gradient-to-r from-agri-600 to-forest-600 bg-clip-text text-transparent`}>
            Lydian
          </span>
          <span className={`${s.text} font-display font-semibold text-harvest-600`}>
            AgriTech
          </span>
        </div>
        <span className={`${s.subtitle} font-medium text-earth-600 tracking-wide uppercase`}>
          Agricultural Intelligence
        </span>
      </div>
    </div>
  );
}
