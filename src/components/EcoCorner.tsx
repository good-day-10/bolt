import { useEffect, useState } from 'react';
import { X, Bug, Leaf } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

type Creature = {
  id: string;
  name: string;
  latin: string;
  tag: '螃蟹' | '青蛙';
  img: string;
  short: string;
  diary: string;
  observed: string;
};

const CREATURES: Creature[] = [
  {
    id: 'crab-1',
    name: '泥岸小蟹',
    latin: 'Sesarmid Crab',
    tag: '螃蟹',
    img: 'https://images.pexels.com/photos/18113137/pexels-photo-18113137.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    short: '島邊泥灘上的小居民，總在清晨與黃昏現身。',
    diary:
      '我們在堆土的第三天發現了牠——一隻不到指甲大小的螃蟹，從泥土縫隙裡探頭。後來越來越多，大大小小在島邊漫步，像在巡視自己的領地。牠們挖的小洞，成了島嶼第一條看不見的路。',
    observed: '堆土第三日 · 島邊泥灘',
  },
  {
    id: 'frog-1',
    name: '池塘赤蛙',
    latin: 'Pond Frog',
    tag: '青蛙',
    img: 'https://images.pexels.com/photos/12079027/pexels-photo-12079027.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    short: '圍島的水引來了蛙，夜裡合唱從未停過。',
    diary:
      '排水口設好那天傍晚，第一聲蛙鳴出現了。我們蹲在走道上聽了很久——那是一種我們在城市裡久違的聲音。後來的每個夜晚，蛙鳴成了島嶼的配樂，有時獨唱，有時合唱，像在告訴我們：這裡活著。',
    observed: '設置排水口當夜 · 水邊草叢',
  },
  {
    id: 'crab-2',
    name: '橘鉗大蟹',
    latin: 'Fiddler Crab',
    tag: '螃蟹',
    img: 'https://images.pexels.com/photos/5014154/pexels-photo-5014154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    short: '一隻舉著大鉗的傢伙，佔據了排水口旁的石頭。',
    diary:
      '牠是島上最大的一隻蟹，鉗子一邊大一邊小，站在排水口的石頭上揮舞，像在向水流示威，又像在向我們打招呼。我們沒有打擾牠，只是遠遠記下牠的位置——那是牠選擇的家門口。',
    observed: '走道完工隔日 · 排水口旁',
  },
  {
    id: 'frog-2',
    name: '翠綠樹蛙',
    latin: 'Tree Frog',
    tag: '青蛙',
    img: 'https://images.pexels.com/photos/17578755/pexels-photo-17578755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    short: '不知從哪裡跳來的綠色小精靈，停在島上的草葉。',
    diary:
      '我們在島上的矮草上發現了一隻翠綠色的蛙，比手掌還小，一動也不動地停在葉尖。牠的顏色和泥土、草葉完全不同，卻又奇異地和諧。那一刻我們明白——我們蓋了一座島，而島開始迎來自己的居民。',
    observed: '完工一週後 · 島上草葉',
  },
];

export default function EcoCorner() {
  const [selected, setSelected] = useState<Creature | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="ecology" className="relative bg-moss-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-light tracking-[0.3em] text-moss-500">
            ECOLOGICAL CORNER
          </span>
          <h2 className="mt-4 font-serif text-3xl text-earth-600 md:text-5xl">
            島嶼的新居民
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-moss-400" />
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-earth-400">
            我們堆土引水，本以為只是造一座島。
            <br />
            沒想到，螃蟹與青蛙比我們更早決定搬進來。
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CREATURES.map((c) => (
            <EcoCard key={c.id} creature={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && <EcoLightbox creature={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function EcoCard({ creature, onClick }: { creature: Creature; onClick: () => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isCrab = creature.tag === '螃蟹';
  const Icon = isCrab ? Bug : Leaf;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''}`}
    >
      <button
        onClick={onClick}
        className="group flex h-full w-full flex-col overflow-hidden hand-border bg-paper-50 text-left shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
      >
        <div className="relative overflow-hidden">
          <img
            src={creature.img}
            alt={creature.name}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-paper-50/90 px-3 py-1 text-xs font-medium text-moss-600 backdrop-blur-sm">
            <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
            {creature.tag}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-serif text-xl text-earth-600">{creature.name}</h3>
          <p className="text-xs italic text-earth-300">{creature.latin}</p>
          <p className="mt-1 line-clamp-2 text-sm font-light leading-relaxed text-earth-400">
            {creature.short}
          </p>
          <span className="mt-3 text-xs font-medium text-persimmon-400 transition group-hover:text-persimmon-500">
            閱讀觀察筆記 →
          </span>
        </div>
      </button>
    </div>
  );
}

function EcoLightbox({ creature, onClose }: { creature: Creature; onClose: () => void }) {
  const isCrab = creature.tag === '螃蟹';
  const Icon = isCrab ? Bug : Leaf;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-earth-700/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto hand-border bg-paper-50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="關閉"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper-100/90 text-earth-500 transition hover:bg-persimmon-100 hover:text-persimmon-500"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img
              src={creature.img}
              alt={creature.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 p-8">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-moss-100 px-3 py-1 text-xs font-medium text-moss-600">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                {creature.tag}
              </span>
              <span className="text-xs text-earth-300">{creature.observed}</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-earth-600">{creature.name}</h3>
              <p className="text-sm italic text-earth-300">{creature.latin}</p>
            </div>

            <div className="h-px bg-earth-100" />

            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wider text-persimmon-400">
                觀察筆記
              </h4>
              <p className="font-light leading-loose text-earth-500">{creature.diary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
