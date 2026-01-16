'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Casino } from '../data/casinos';
import { Star } from 'lucide-react';
import { logos } from './CasinoLogos';
import Image from 'next/image';

interface ExclusiveOfferPopupProps {
  casino: Casino;
}

export default function ExclusiveOfferPopup({ casino }: ExclusiveOfferPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sevenSecondsPassed, setSevenSecondsPassed] = useState(false);
  const [hasGclid, setHasGclid] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem('exclusiveOfferShown');
    if (alreadyShown) {
      return;
    }

    // Check if URL contains gclid parameter
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');
    
    if (!gclid) {
      // No gclid parameter, don't show popup
      return;
    }
    
    setHasGclid(true);

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
    // Popup shows if gclid exists AND (7 seconds passed OR scrolled to bottom)
    if (hasGclid && (sevenSecondsPassed || hasScrolled)) {
      setIsVisible(true);
      // Mark as shown in session storage
      sessionStorage.setItem('exclusiveOfferShown', 'true');
    }
  }, [hasGclid, sevenSecondsPassed, hasScrolled]);

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
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
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
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl border border-purple-500/30 max-w-md w-full overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors border border-slate-600"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Golden Ribbon Banner */}
        <div className="relative mb-4 -mt-2">
          <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold text-center py-3 px-8 mx-4 rounded-sm">
            {/* Left ribbon end */}
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[12px] border-t-yellow-500 border-b-[12px] border-b-yellow-500 border-r-[20px] border-r-transparent transform translate-x-[-20px]"></div>
            {/* Right ribbon end */}
            <div className="absolute right-0 top-0 w-0 h-0 border-t-[12px] border-t-yellow-500 border-b-[12px] border-b-yellow-500 border-l-[20px] border-l-transparent transform translate-x-[20px]"></div>
            <span className="relative z-10 text-sm sm:text-base uppercase tracking-wide font-extrabold">
              EXCLUSIVE OFFER
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="w-48 h-20 flex items-center justify-center">
                {renderLogo()}
              </div>
            </div>
          </div>

          {/* Offer Text */}
          <div className="text-center mb-4 space-y-1">
            <p className="text-white font-bold text-xl sm:text-2xl leading-tight">
              {casino.bonus.split('+')[0]}
            </p>
            {casino.bonus.includes('+') && (
              <p className="text-white font-bold text-lg sm:text-xl">
                {casino.bonus.split('+').slice(1).join('+')}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {renderStars(casino.rating)}
            <span className="text-white font-bold text-lg">
              {casino.rating.toFixed(1)}/10
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={casino.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg text-center text-lg uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            PLAY NOW
          </a>
        </div>
      </div>
    </div>
  );
}
