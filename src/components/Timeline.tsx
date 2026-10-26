import { Droplets, Mountain, Waves, Footprints } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Step = {
  num: string;
  title: string;
  desc: string;
  img: string;
  icon: typeof Droplets;
  alt: string;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: '引水與堆土',
    desc: '我們從一旁的池塘引水流出，在空地上堆起泥土。水與土在此相遇，為島嶼打下最初的基底。這是一場與大地的對話——用雙手感受泥土的濕潤與重量。',
    img: 'https://images.pexels.com/photos/29277604/pexels-photo-29277604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Droplets,
    alt: '雙手捧著泥土',
  },
  {
    num: '02',
    title: '塑形臺灣山脈',
    desc: '在土堆上細細捏出臺灣的輪廓，中央山脈由北而南綿延。我們仔細觀察島嶼的弧度與稜線，讓泥土記住山的形狀，讓每一座小山丘都承載著土地的記憶。',
    img: 'https://images.pexels.com/photos/7866675/pexels-photo-7866675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Mountain,
    alt: '臺灣山巒雲霧',
  },
  {
    num: '03',
    title: '設置排水口',
    desc: '池塘的水將島嶼圍繞，我們在低處設置排水口，讓水流循環不息。水進水出，島嶼在水中央呼吸——就像真正的島，有自己的潮汐與節奏。',
    img: 'https://images.pexels.com/photos/27516571/pexels-photo-27516571.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Waves,
    alt: '池塘水面倒影',
  },
  {
    num: '04',
    title: '鋪設觀賞走道',
    desc: '我們繞著島鋪設了一條走道，讓人可以慢慢走、慢慢看。從每一個角度欣賞這座手作島嶼——腳下的步道，也是觀看的路徑，繞島一圈，就像環島一樣。',
    img: 'https://images.pexels.com/photos/17683201/pexels-photo-17683201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: Footprints,
    alt: '森林步道',
  },
];

export default function Timeline() {
  const { ref: pathRef, visible: pathVisible } = useReveal<HTMLDivElement>();

  return (
    <section id="story" className="relative overflow-hidden bg-paper-100 py-24 md:py-32">
      {/* Section header */}
      <div className="mx-auto mb-20 max-w-3xl px-6 text-center">
        <span className="text-sm font-light tracking-[0.3em] text-persimmon-400">
          THE MAKING OF TAIWAN
        </span>
        <h2 className="mt-4 font-serif text-3xl text-earth-600 md:text-5xl">
          島嶼誕生的四個步伐
        </h2>
        <div className="mx-auto mt-6 h-px w-24 bg-persimmon-400" />
        <p className="mt-6 font-light leading-relaxed text-earth-400">
          水流蜿蜒，如一條 S 型曲線貫穿時間。
          <br />
          這是我們堆築臺灣島的故事——從一捧土到一座山。
        </p>
      </div>

      {/* S-curve path (decorative SVG) */}
      <div ref={pathRef} className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 1100"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            className={`timeline-path ${pathVisible ? 'is-visible' : ''}`}
            d="M 100 80 Q 1100 200, 100 400 Q 100 500, 1100 620 Q 1100 720, 100 850 Q 100 950, 600 1050"
            stroke="#81A4CD"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Steps */}
      <div className="relative mx-auto max-w-6xl px-6">
        {STEPS.map((step, idx) => (
          <TimelineItem key={step.num} step={step} reverse={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ step, reverse }: { step: Step; reverse: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} mb-24 flex flex-col gap-8 last:mb-0 md:mb-32 md:flex-row md:items-center ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div className="flex-1">
        <div className="group relative overflow-hidden hand-border bg-earth-100 shadow-lg transition-all duration-500 hover:shadow-2xl">
          <img
            src={step.img}
            alt={step.alt}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-earth-600/0 transition-colors duration-500 group-hover:bg-earth-600/10" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col gap-4 md:px-8">
        <div className="flex items-center gap-4">
          <span className="font-serif text-5xl font-light text-persimmon-200 md:text-6xl">
            {step.num}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-100 text-moss-500">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="font-serif text-2xl text-earth-600 md:text-3xl">{step.title}</h3>
        <p className="font-light leading-loose text-earth-400">{step.desc}</p>
      </div>
    </div>
  );
}
