import { useEffect, useState } from 'react';
import { Menu, X, Mountain } from 'lucide-react';

const LINKS = [
  { href: '#story', label: '島嶼故事' },
  { href: '#ecology', label: '生態觀察' },
  { href: '#walkway', label: '虛擬走道' },
  { href: '#location', label: '地理位置' },
  { href: '#records', label: '計畫資料' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-paper-100/95 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              scrolled ? 'bg-persimmon-400 text-paper-50' : 'bg-paper-50/20 text-paper-50 backdrop-blur-sm'
            }`}
          >
            <Mountain className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span
            className={`font-serif text-lg transition-colors ${
              scrolled ? 'text-earth-600' : 'text-paper-50'
            }`}
          >
            地景臺灣島
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-light transition-colors ${
                  scrolled
                    ? 'text-earth-500 hover:text-persimmon-400'
                    : 'text-paper-100/90 hover:text-paper-50'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="選單"
          className={`md:hidden ${scrolled ? 'text-earth-600' : 'text-paper-50'}`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-paper-300 bg-paper-100/98 backdrop-blur-md md:hidden">
          <ul className="flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm font-light text-earth-500 transition hover:bg-paper-200 hover:text-persimmon-400"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
