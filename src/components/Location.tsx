import { MapPin, Coffee, Leaf, Navigation } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function Location() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="location" className="relative overflow-hidden bg-paper-200 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-sm font-light tracking-[0.3em] text-persimmon-400">
            LOCATION & CONTEXT
          </span>
          <h2 className="mt-4 font-serif text-3xl text-earth-600 md:text-5xl">
            在新埔，三點相連
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-persimmon-400" />
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-earth-400">
            味衛佳柿餅的甜、涼井人文咖啡廳的香，
            <br />
            與我們用泥土與水築成的島——在新埔的這一角相遇。
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} grid items-center gap-12 lg:grid-cols-2`}
        >
          {/* Hand-drawn map */}
          <div className="relative">
            <HandDrawnMap />
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-6">
            <LocationCard
              icon={MapPin}
              name="味衛佳柿餅"
              desc="新埔知名柿餅觀光工廠，秋季曬柿景象聞名全台。我們的島就在柿餅場旁的空地上。"
              tag="在地特產"
              color="persimmon"
            />
            <LocationCard
              icon={Coffee}
              name="涼井人文咖啡廳"
              desc="一間以古井與人文為主題的咖啡廳，是造訪地景臺灣島前後最好的歇腳處。"
              tag="人文咖啡"
              color="earth"
            />
            <LocationCard
              icon={Leaf}
              name="地景臺灣島"
              desc="池塘水流旁，一座用雙手堆出的臺灣。螃蟹漫步、蛙鳴不斷——歡迎來看看我們的島。"
              tag="地景藝術"
              color="moss"
            />
          </div>
        </div>

        {/* Visit info bar */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-paper-50 p-8 text-center shadow-sm md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <Navigation className="h-5 w-5 text-stream-400" strokeWidth={1.5} />
            <span className="font-light text-earth-500">
              新竹縣新埔鎮 · 味衛佳柿餅旁空地
            </span>
          </div>
          <span className="text-sm font-light text-earth-300">
            建議於秋季柿餅產季前往，可同時欣賞曬柿與地景藝術
          </span>
        </div>
      </div>
    </section>
  );
}

function LocationCard({
  icon: Icon,
  name,
  desc,
  tag,
  color,
}: {
  icon: typeof MapPin;
  name: string;
  desc: string;
  tag: string;
  color: 'persimmon' | 'earth' | 'moss';
}) {
  const colorMap = {
    persimmon: 'bg-persimmon-100 text-persimmon-500',
    earth: 'bg-earth-100 text-earth-500',
    moss: 'bg-moss-100 text-moss-500',
  };

  return (
    <div className="group flex gap-5 rounded-2xl bg-paper-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-paper-200 text-earth-500 transition group-hover:bg-persimmon-100 group-hover:text-persimmon-500">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-xl text-earth-600">{name}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs ${colorMap[color]}`}>{tag}</span>
        </div>
        <p className="font-light leading-relaxed text-earth-400">{desc}</p>
      </div>
    </div>
  );
}

function HandDrawnMap() {
  return (
    <div className="relative aspect-square w-full hand-border bg-paper-50 shadow-md">
      <svg viewBox="0 0 400 400" className="h-full w-full p-4">
        {/* Wavy water lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path
            key={i}
            d={`M 20 ${280 + i * 16} Q 100 ${270 + i * 16}, 200 ${285 + i * 16} T 380 ${280 + i * 16}`}
            stroke="#81A4CD"
            strokeWidth="1.2"
            fill="none"
            opacity={0.25 + i * 0.04}
          />
        ))}

        {/* Pond shape */}
        <path
          d="M 60 250 Q 30 210, 80 180 Q 140 150, 200 170 Q 280 160, 340 200 Q 380 240, 330 280 Q 260 310, 180 300 Q 100 310, 60 250 Z"
          fill="#D4E3F0"
          fillOpacity="0.5"
          stroke="#81A4CD"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Taiwan island (center of pond) */}
        <path
          d="M 190 200 C 180 195, 175 210, 185 230 C 195 250, 210 255, 220 245 C 230 230, 228 210, 218 200 C 210 193, 198 195, 190 200 Z"
          fill="#B89884"
          fillOpacity="0.7"
          stroke="#6B4D3E"
          strokeWidth="1.8"
        />
        {/* Mountains on island */}
        <path d="M 195 215 L 202 205 L 210 218" stroke="#6B4D3E" strokeWidth="1.5" fill="none" />
        <path d="M 200 220 L 205 212 L 212 222" stroke="#6B4D3E" strokeWidth="1.2" fill="none" opacity="0.6" />

        {/* Drain outlet */}
        <circle cx="330" cy="250" r="4" fill="#81A4CD" />
        <path d="M 330 250 L 360 250" stroke="#81A4CD" strokeWidth="2" markerEnd="url(#arrow)" />

        {/* Walkway (dashed path around island) */}
        <path
          d="M 170 180 Q 140 200, 150 240 Q 170 275, 220 270 Q 260 265, 255 230 Q 245 195, 200 185 Q 185 180, 170 180 Z"
          fill="none"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeDasharray="5 4"
        />

        {/* Marker: Persimmon (top-left) */}
        <g>
          <circle cx="100" cy="100" r="22" fill="#E07A5F" fillOpacity="0.15" stroke="#E07A5F" strokeWidth="2" />
          <circle cx="100" cy="100" r="8" fill="#E07A5F" />
          <text x="100" y="75" textAnchor="middle" className="font-serif" fontSize="13" fill="#6B4D3E" fontWeight="600">
            味衛佳柿餅
          </text>
        </g>

        {/* Marker: Cafe (top-right) */}
        <g>
          <circle cx="310" cy="90" r="22" fill="#6B4D3E" fillOpacity="0.15" stroke="#6B4D3E" strokeWidth="2" />
          <circle cx="310" cy="90" r="8" fill="#6B4D3E" />
          <text x="310" y="65" textAnchor="middle" className="font-serif" fontSize="13" fill="#6B4D3E" fontWeight="600">
            涼井咖啡
          </text>
        </g>

        {/* Marker: Island label */}
        <text x="204" y="340" textAnchor="middle" className="font-serif" fontSize="12" fill="#6A8D73" fontWeight="600">
          地景臺灣島
        </text>

        {/* Connecting paths */}
        <path d="M 100 100 Q 150 140, 180 185" stroke="#B89884" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
        <path d="M 310 90 Q 270 130, 235 195" stroke="#B89884" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />

        {/* Arrow marker */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#81A4CD" />
          </marker>
        </defs>

        {/* Compass */}
        <g transform="translate(350, 350)">
          <circle r="18" fill="none" stroke="#6B4D3E" strokeWidth="1" opacity="0.4" />
          <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="#E07A5F" opacity="0.6" />
          <text x="0" y="-22" textAnchor="middle" fontSize="10" fill="#6B4D3E">N</text>
        </g>
      </svg>
    </div>
  );
}
