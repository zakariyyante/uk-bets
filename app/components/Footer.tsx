import Logo from './Logo';
import Image from "next/image";
import { BRAND } from "../config/brand";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[color:var(--surface-1)] border-t border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] py-6 sm:py-8 lg:py-12"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-center mb-6 sm:mb-8">
          <Logo />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h5 className="text-blue-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Quick Links</h5>
            <ul className="space-y-1 sm:space-y-2 text-blue-100/40 text-xs sm:text-sm">
              <li>
                <a href="/" className="hover:text-[color:var(--accent)] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#casinos" className="hover:text-[color:var(--accent)] transition-colors">
                  Casinos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-blue-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Legal</h5>
            <ul className="space-y-1 sm:space-y-2 text-blue-100/40 text-xs sm:text-sm">
              <li>
                <a href="/privacy" className="hover:text-[color:var(--accent)] transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[color:var(--accent)] transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[color:var(--accent)] transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h5 className="text-blue-200/80 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Disclaimer</h5>
            <p className="text-blue-100/40 text-xs sm:text-sm leading-relaxed">
              This comparison portal provides independent editorial reviews. All listed casinos are
              regulated by the UK Gambling Commission. Gambling is entertainment — never wager more
              than you can comfortably afford to lose.
            </p>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-10 flex flex-col items-center gap-3">
          <p className="text-blue-200/50 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            Play Responsibly
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 rounded-2xl bg-[color:var(--muted)]/30 border border-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] px-4 py-3">
            <div className="bg-black/20 rounded-xl px-3 py-2 border border-[color:color-mix(in_oklab,var(--primary)_16%,transparent)]">
              <Image src="/18plus.png" alt="18+ only" width={64} height={64} className="h-10 w-auto" />
            </div>
            <a
              href="https://www.gambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/20 rounded-xl px-4 py-2 border border-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] hover:border-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] transition-colors"
              aria-label="Visit GambleAware"
            >
              <Image src="/gambleaware.png" alt="GambleAware" width={220} height={56} className="h-10 w-auto" />
            </a>
            <a
              href="https://www.gamcare.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/20 rounded-xl px-4 py-2 border border-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] hover:border-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] transition-colors"
              aria-label="Visit GamCare"
            >
              <Image src="/gamcare.png" alt="GamCare" width={220} height={56} className="h-10 w-auto" />
            </a>
            <a
              href="https://www.gamstop.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/20 rounded-xl px-4 py-2 border border-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] hover:border-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] transition-colors"
              aria-label="Visit GAMSTOP"
            >
              <Image src="/gamstop.png" alt="GAMSTOP" width={220} height={56} className="h-10 w-auto" />
            </a>
          </div>
          <p className="text-blue-200/50 text-[11px] sm:text-xs text-center max-w-4xl leading-relaxed mt-1">
            New customers only. 18+. T&amp;Cs apply.{" "}
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] hover:text-[color:var(--accent)] transition-colors"
            >
              BeGambleAware.org
            </a>
            . National Gambling Helpline: 0808 8020 133.
          </p>
        </div>

        <div className="border-t border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] pt-4 sm:pt-6 text-center mt-6">
          <p className="text-blue-100/30 text-xs sm:text-sm">
            &copy; {BRAND.year} {BRAND.domain}. For informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
