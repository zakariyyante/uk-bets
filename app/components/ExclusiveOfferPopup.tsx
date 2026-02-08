'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Casino } from '../data/casinos';
import { Star } from 'lucide-react';
import { logos } from './CasinoLogos';
import Image from 'next/image';

interface ExclusiveOfferPopupProps {
  casino: Casino;
  isOnline: boolean;
}

export default function ExclusiveOfferPopup({ casino, isOnline }: ExclusiveOfferPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sevenSecondsPassed, setSevenSecondsPassed] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem('exclusiveOfferShown');
    if (alreadyShown) {
      return;
    }

    if (!isOnline) {
      // Not eligible, don't show popup
      return;
    }

    // Set timer for 5 seconds
    const timer = setTimeout(() => {
      setSevenSecondsPassed(true);
    }, 7000);

    // Track scroll to bottom
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Check if user scrolled to bottom (within 50px threshold)
      if (scrollTop + windowHeight >= documentHeight - 50) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if all conditions are met to show popup
    // Popup shows if eligible AND (7 seconds passed OR scrolled to bottom)
    if (isOnline && (sevenSecondsPassed || hasScrolled)) {
      setIsVisible(true);
      // Mark as shown in session storage
      sessionStorage.setItem('exclusiveOfferShown', 'true');
    }
  }, [isOnline, sevenSecondsPassed, hasScrolled]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown in session storage (in case it wasn't already set)
    sessionStorage.setItem('exclusiveOfferShown', 'true');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
    );
  };

  // Render logo: either from logos object (SVG) or as Image (PNG)
  const renderLogo = () => {
    if (typeof casino.logo === 'string' && casino.logo.startsWith('/')) {
      // It's an image path
      return (
        <Image 
          src={casino.logo} 
          alt={`${casino.name} Casino`} 
          width={200} 
          height={80} 
          className="w-full h-full object-contain"
        />
      );
    }
    // It's a LogoKey, render from logos object
    return logos[casino.logo as keyof typeof logos];
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center transition-colors border border-slate-800"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Golden Ribbon Banner */}
        <div className="relative mb-4 -mt-2">
          <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold text-center py-3 px-8 mx-4 rounded-sm">
            {/* Left ribbon end */}
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[12px] border-t-teal-500 border-b-[12px] border-b-teal-500 border-r-[20px] border-r-transparent transform translate-x-[-20px]"></div>
            {/* Right ribbon end */}
            <div className="absolute right-0 top-0 w-0 h-0 border-t-[12px] border-t-teal-500 border-b-[12px] border-b-teal-500 border-l-[20px] border-l-transparent transform translate-x-[20px]"></div>
            <span className="relative z-10 text-sm sm:text-base uppercase tracking-wide font-extrabold">
              EXCLUSIVE OFFER
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="w-48 h-20 flex items-center justify-center">
                {renderLogo()}
              </div>
            </div>
          </div>

          {/* Offer Text */}
          <div className="text-center mb-4 space-y-1">
            <p className="text-slate-900 font-extrabold text-xl sm:text-2xl leading-tight">
              {casino.bonus.split('+')[0]}
            </p>
            {casino.bonus.includes('+') && (
              <p className="text-slate-900 font-extrabold text-lg sm:text-xl">
                {casino.bonus.split('+').slice(1).join('+')}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {renderStars(casino.rating)}
            <span className="text-slate-700 font-bold text-lg">
              {casino.rating.toFixed(1)}/10
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={casino.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="block w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl text-center text-lg uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            PLAY NOW
          </a>
        </div>
      </div>
    </div>
  );
}
