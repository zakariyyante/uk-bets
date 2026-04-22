'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Casinos', href: '/#casinos' },
    { name: 'Guide', href: '/#guide' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--background)]/95 backdrop-blur-xl border-b border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3.5">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-blue-100/70 hover:text-[color:var(--accent)] transition-colors font-semibold tracking-wide text-sm px-4 py-2 rounded-lg hover:bg-[color:var(--muted)]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="/#casinos"
            className="hidden lg:inline-flex items-center justify-center bg-gradient-to-r from-[color:var(--primary-2)] via-[color:var(--accent)] to-[color:var(--primary)] text-white font-extrabold px-5 py-2.5 rounded-xl uppercase text-sm tracking-wide shadow-lg hover:opacity-95 transition-opacity"
          >
            Play Now
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-blue-300/80 hover:text-[color:var(--accent)] transition-colors p-2 rounded-lg hover:bg-[color:var(--muted)]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-100/70 hover:text-[color:var(--accent)] transition-colors font-semibold py-2.5 px-3 rounded-lg hover:bg-[color:var(--muted)]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/#casinos"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center bg-gradient-to-r from-[color:var(--primary-2)] via-[color:var(--accent)] to-[color:var(--primary)] text-white font-extrabold px-4 py-3 rounded-xl uppercase text-sm tracking-wide shadow-lg"
              >
                Play Now
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
