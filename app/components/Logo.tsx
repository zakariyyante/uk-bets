interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Casino logo">
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a67c2e"/>
            <stop offset="50%" stopColor="#f0d078"/>
            <stop offset="100%" stopColor="#d4a843"/>
          </linearGradient>
          <linearGradient id="logoCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c41e3a"/>
            <stop offset="100%" stopColor="#ff4060"/>
          </linearGradient>
        </defs>
        {/* Diamond shape background */}
        <rect x="5" y="5" width="28" height="28" rx="4" transform="rotate(0, 19, 19)" fill="#0f1120" stroke="url(#logoGold)" strokeWidth="1.5"/>
        {/* Spade suit */}
        <path d="M19 8 C19 8, 12 14, 12 18 C12 21, 14 23, 17 22 C15 24, 14 26, 14 27 L24 27 C24 26, 23 24, 21 22 C24 23, 26 21, 26 18 C26 14, 19 8, 19 8Z" fill="url(#logoGold)"/>
        {/* Small diamond accent */}
        <rect x="17" y="29" width="4" height="4" rx="0.5" transform="rotate(45, 19, 31)" fill="url(#logoCrimson)"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[17px] font-extrabold tracking-tight gold-text">
          TOP
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] text-amber-400/70 uppercase">
          Casinos
        </span>
      </div>
    </div>
  );
}
