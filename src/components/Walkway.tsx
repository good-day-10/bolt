import { useEffect, useRef, useState } from 'react';
import { Footprints } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type View = {
  label: string;
  caption: string;
  img: string;
};

const VIEWS: View[] = [
  {
    label: '北側入口',
    caption: '走道的起點。從這裡開始，繞島一圈。',
    img: 'https://images.pexels.com/photos/17683201/pexels-photo-17683201.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    label: '西岸泥灘',
    caption: '島的西側，泥灘上螃蟹的小洞密密麻麻。',
    img: 'https://images.pexels.com/photos/29517528/pexels-photo-29517528.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    label: '南端排水口',
    caption: '水從這裡流出，島在水中呼吸。橘鉗大蟹常駐於此。',
    img: 'https://images.pexels.com/photos/997133/pexels-photo-997133.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    label: '東岸草坡',
    caption: '翠綠樹蛙停過的草葉，向著池塘的方向傾斜。',
    img: 'https://images.pexels.com/photos/36996794/pexels-photo-36996794.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
  {
    label: '回到起點',
    caption: '繞島一圈，像環島一樣。謝謝你走完這條路。',
    img: 'https://images.pexels.com/photos/13905859/pexels-photo-13905859.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
  },
];

export default function Walkway() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref: headerRef, visible: headerVisible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress from when section top enters viewport to when it leaves
      const total = rect.height - vh;
      if (total <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      const idx = Math.min(
        VIEWS.length - 1,
        Math.floor(progress * VIEWS.length)
      );
      setActive(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="walkway"
      ref={sectionRef}
      className="relative"
      style={{ height: `${VIEWS.length * 80}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Section header overlay */}
        <div
          ref={headerRef}
          className={`reveal ${headerVisible ? 'is-visible' : ''} absolute left-0 right-0 top-0 z-20 px-6 pt-28 text-center`}
        >
          <span className="text-sm font-light tracking-[0.3em] text-persimmon-400">
            VIRTUAL WALKWAY
          </span>
          <h2 className="mt-3 font-serif text-3xl text-paper-50 drop-shadow-md md:text-4xl">
            走一趟我們的島
          </h2>
        </div>

        {/* Images stack */}
        <div className="absolute inset-0">
          {VIEWS.map((v, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <img
                src={v.img}
                alt={v.label}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-earth-700/50 via-transparent to-earth-700/70" />
            </div>
          ))}
        </div>

        {/* Caption + progress */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-paper-100/80">
              <Footprints className="h-4 w-4" strokeWidth={1.5} />
              <span className="text-xs tracking-widest">
                {active + 1} / {VIEWS.length}
              </span>
            </div>

            <h3
              key={`label-${active}`}
              className="animate-fade-up font-serif text-2xl text-paper-50 drop-shadow-md md:text-3xl"
            >
              {VIEWS[active].label}
            </h3>
            <p
              key={`cap-${active}`}
              className="animate-fade-up mt-3 font-light leading-relaxed text-paper-100/90"
            >
              {VIEWS[active].caption}
            </p>

            {/* Progress dots */}
            <div className="mt-8 flex items-center justify-center gap-2.5">
              {VIEWS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-8 bg-persimmon-400'
                      : 'w-1.5 bg-paper-100/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
