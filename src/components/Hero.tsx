import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Droplets } from 'lucide-react';

const HERO_IMG =
  'https://images.pexels.com/photos/32654390/pexels-photo-32654390.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920';

type Ripple = { x: number; y: number; id: number };

export default function Hero() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const addRipple = useCallback((x: number, y: number) => {
    const id = idRef.current++;
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => {
      setRipples((r) => r.filter((rip) => rip.id !== id));
    }, 1400);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener('mousemove', handle);
    return () => el.removeEventListener('mousemove', handle);
  }, [addRipple]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="臺灣山嵐全景"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-700/40 via-earth-600/30 to-paper-100/90" />
        <div className="absolute inset-0 bg-earth-600/10" />
      </div>

      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-span"
          style={{ left: r.x, top: r.y, width: 24, height: 24 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-3 text-paper-100/80">
          <Droplets className="h-5 w-5" />
          <span className="text-sm font-light tracking-[0.3em]">LAND ART · TAIWAN</span>
          <Droplets className="h-5 w-5" />
        </div>

        <h1 className="mb-8 font-serif text-4xl leading-tight text-paper-50 drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          用泥土與水，
          <br />
          <span className="text-persimmon-300">堆疊出</span>
          <span className="text-paper-50">我們心中的臺灣</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl font-light leading-relaxed text-paper-100/90 sm:text-lg md:text-xl">
          在新埔味衛佳柿餅與涼井人文咖啡廳旁，
          <br className="hidden sm:block" />
          我們引池塘之水、聚泥土之形，
          <br className="hidden sm:block" />
          堆出一座有山脈的島，也迎來了螃蟹與青蛙。
        </p>

        <a
          href="#story"
          className="group inline-flex flex-col items-center gap-2 text-paper-100/70 transition hover:text-paper-50"
        >
          <span className="text-xs tracking-widest">向下滑動 · 探索島嶼</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
