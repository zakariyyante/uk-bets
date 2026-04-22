import CasinoCard from './components/CasinoCard';
import Header from './components/Header';
import MobileCasinoModal from './components/MobileCasinoModal';
import Footer from "./components/Footer";
import { casinos } from './data/casinos';
import { BRAND } from "./config/brand";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const gclid = resolvedSearchParams?.gclid as string | undefined;
  const hasGclid = !!gclid;

  const isOnline = hasGclid;
  const year = BRAND.year;

  const mobileCasinos = casinos.filter(casino => casino.isMobile === true);
  const regularCasinos = casinos.filter(casino => !casino.isMobile);
  
  return (
    <div className="min-h-screen bg-[color:var(--background)] felt-texture">
      <MobileCasinoModal mobileCasinos={mobileCasinos} isOnline={isOnline} gclidValue={gclid} />
      
      <Header />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-8 pb-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10 text-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl sm:text-8xl opacity-[0.04] text-[color:var(--primary)] rotate-12 select-none">♠</div>
          <div className="absolute top-20 right-16 text-5xl sm:text-7xl opacity-[0.04] text-[color:var(--accent)] -rotate-12 select-none">♥</div>
          <div className="absolute bottom-10 left-1/4 text-5xl sm:text-7xl opacity-[0.04] text-[color:var(--primary)] rotate-6 select-none">♦</div>
          <div className="absolute bottom-5 right-1/4 text-6xl sm:text-8xl opacity-[0.04] text-[color:var(--accent)] -rotate-6 select-none">♣</div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="inline-block mb-5 px-5 py-2 rounded-full bg-gradient-to-r from-[color:var(--primary)]/10 to-[color:var(--accent)]/10 border border-[color:color-mix(in_oklab,var(--primary)_24%,transparent)]">
            <span className="text-xs sm:text-sm font-bold text-[color:var(--accent)] uppercase tracking-wider">
              {BRAND.name} • Updated for {year}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Discover the UK&apos;s <span className="gold-text">Top-Rated</span> Casino Platforms
          </h1>
          <p className="text-base sm:text-lg text-blue-100/50 mb-8 max-w-2xl mx-auto">
            Expert-reviewed UK casino offers, refreshed weekly with clear rankings and safer-gambling resources.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 bg-[color:var(--card-bg)] rounded-full px-5 py-2.5 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
              <span className="text-[color:var(--accent)] text-lg">♠</span>
              <span className="text-blue-100/70 text-sm font-semibold">UKGC licensed</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[color:var(--card-bg)] rounded-full px-5 py-2.5 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
              <span className="text-[color:var(--accent)] text-lg">★</span>
              <span className="text-blue-100/70 text-sm font-semibold">Editor picks</span>
            </div>
            <div className="flex items-center gap-2.5 bg-[color:var(--card-bg)] rounded-full px-5 py-2.5 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
              <span className="text-[color:var(--accent)] text-lg">♦</span>
              <span className="text-blue-100/70 text-sm font-semibold">Fast payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Casino Cards Section */}
      <section id="casinos" className="container mx-auto px-4 pb-16">
        <div className="mb-3 sm:mb-5 lg:mb-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-4xl font-extrabold gold-text mb-2 sm:mb-4 tracking-wide">
            Editors&apos; Top Selections
          </h3>
          <p className="text-sm sm:text-base text-blue-100/40">Refreshed weekly — ranked by withdrawal speed, bonuses, and real player feedback.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {regularCasinos.map((casino, index) => (
            <CasinoCard
              key={casino.id}
              casino={casino}
              rank={index + 1}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 bg-[color:var(--muted)]/25 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)] rounded-2xl p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
          <p className="text-blue-200/50 text-xs sm:text-sm text-center">
            <strong className="text-blue-200/70">New customers only.</strong> 18+. T&Cs apply. BeGambleAware.org. Please play responsibly.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[color:var(--surface-1)] py-8 sm:py-12 lg:py-16 border-y border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-4 sm:mb-6 lg:mb-8 text-center">
            How We Rank UK Casinos
          </h3>
          
          <div className="casino-card-bg rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-[color:color-mix(in_oklab,var(--primary)_18%,transparent)]">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-100 mb-3 sm:mb-4">
              What Sets Our Reviews Apart?
            </h4>
            <p className="text-blue-100/50 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Our independent editorial team rigorously evaluates every platform so UK players can
              make confident, informed choices. Each casino is scored across licensing, game variety,
              promotions, payment options, and customer care.
            </p>
            <ul className="space-y-2.5 text-blue-100/50 text-sm sm:text-base">
              <li className="flex items-start gap-2.5">
                <span className="text-[color:var(--accent)] mt-0.5">♠</span>
                <span>Every listed platform holds full UKGC certification</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[color:var(--accent)] mt-0.5">♦</span>
                <span>We independently audit security standards and RNG fairness</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[color:var(--accent)] mt-0.5">♣</span>
                <span>Our editorial ratings are unbiased and commercially independent</span>
              </li>
            </ul>
          </div>

          <div id="guide" className="bg-[color:var(--card-bg)] rounded-2xl p-4 sm:p-6 lg:p-8 border border-[color:color-mix(in_oklab,var(--primary)_14%,transparent)] shadow-lg">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold gold-text mb-3 sm:mb-4">
              Responsible Gambling
            </h4>
            <p className="text-blue-100/60 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              Safer gambling is at the heart of everything we do. If you or someone you know needs
              support, confidential help is always available:
            </p>
            <ul className="space-y-2 text-blue-100/60 text-sm sm:text-base">
              <li>• <strong className="text-blue-200/80">BeGambleAware:</strong> Visit{' '}
                <a href="https://www.begambleaware.org" className="text-[color:var(--accent)] hover:opacity-90 underline decoration-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] underline-offset-2">
                  begambleaware.org
                </a>
              </li>
              <li>• <strong className="text-blue-200/80">GamCare:</strong> Call 0808 8020 133 or visit{' '}
                <a href="https://www.gamcare.org.uk" className="text-[color:var(--accent)] hover:opacity-90 underline decoration-[color:color-mix(in_oklab,var(--accent)_40%,transparent)] underline-offset-2">
                  gamcare.org.uk
                </a>
              </li>
              <li>• <strong className="text-blue-200/80">National Gambling Helpline:</strong> 0808 8020 133</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
