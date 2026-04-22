'use client';

import type { KeyboardEvent, MouseEvent } from "react";
import { Casino } from '../data/casinos';
import { logos } from './CasinoLogos';
import Image from 'next/image';
import { track } from '@vercel/analytics';

interface CasinoCardProps {
  casino: Casino;
  rank?: number;
  isOnline?: boolean;
}

export default function CasinoCard({ casino, rank, isOnline = false }: CasinoCardProps) {
  const handleCasinoClick = () => {
    if (casino.isMobile) {
      track('Casino Click', {
        casino: casino.name
      });
    }
  };
  const handleCardClick = () => {
    handleCasinoClick();
    window.open(casino.url, '_blank', 'noopener,noreferrer');
  };
  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      return (
        <Image 
          src={casino.logo} 
          alt={`${casino.name} Casino`} 
          width={260} 
          height={180} 
          className="h-full w-full object-contain"
        />
      );
    }
    return logos[casino.logo as keyof typeof logos];
  };

  return (
    <article
      className="group relative overflow-hidden casino-card-bg rounded-2xl p-5 shadow-xl transition-all duration-300 cursor-pointer border border-[color:color-mix(in_oklab,var(--primary)_28%,transparent)] hover:border-[color:color-mix(in_oklab,var(--accent)_45%,transparent)] casino-glow gold-shimmer"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)] rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)] rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)] rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[color:color-mix(in_oklab,var(--primary)_30%,transparent)] rounded-br-2xl" />

      {isOnline && casino.badge && (
        <span className="absolute top-0 left-0 rounded-br-xl rounded-tl-2xl px-3 py-1.5 text-[11px] font-extrabold bg-gradient-to-r from-[color:var(--primary-2)] to-[color:var(--accent)] text-white shadow-lg">
          {casino.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-40 h-28 sm:w-48 sm:h-32 flex items-start justify-start [&>svg]:text-white [&>svg]:fill-white [&>svg]:w-full [&>svg]:h-full">
          {renderLogo()}
        </div>
        <div className="text-right">
          <div className="gold-text text-3xl sm:text-4xl font-extrabold leading-none">
            {casino.rating.toFixed(1)}
          </div>
          <div className="text-[color:var(--accent)] text-sm tracking-tight">★★★★★</div>
        </div>
      </div>

      <div className="text-center mb-4 rounded-xl bg-gradient-to-r from-[color:var(--muted)]/35 via-[color:var(--muted)]/55 to-[color:var(--muted)]/35 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] px-4 py-3">
        <div className="text-base sm:text-lg font-extrabold text-blue-100 tracking-tight">
          {casino.bonus}
        </div>
      </div>

      <a
        href={casino.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.stopPropagation();
          handleCasinoClick();
        }}
        className="block w-full bg-gradient-to-r from-[color:var(--primary-2)] via-[color:var(--accent)] to-[color:var(--primary)] text-white font-extrabold py-3 px-4 rounded-xl text-base uppercase shadow-lg transition-all duration-300 hover:opacity-95 flex items-center justify-center gap-2 tracking-wide"
      >
         Play Now
      </a>
      <div className="mt-2 text-center text-[11px] text-blue-200/40">
        T&amp;Cs apply.
      </div>
    </article>
  );
}
