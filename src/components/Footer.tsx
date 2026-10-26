import { Mountain, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-earth-700 py-16 text-paper-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-persimmon-400 text-paper-50">
              <Mountain className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="font-serif text-xl text-paper-100">地景臺灣島</span>
          </div>

          <p className="max-w-xl font-light leading-relaxed text-paper-200/70">
            用泥土與水，堆疊出我們心中的臺灣。
            <br />
            一座在新埔誕生的地景藝術，一個有螃蟹與青蛙的微型生態。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-light text-paper-200/60">
            <span>新竹縣新埔鎮</span>
            <span className="text-paper-200/30">·</span>
            <span>味衛佳柿餅旁</span>
            <span className="text-paper-200/30">·</span>
            <span>涼井人文咖啡廳旁</span>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs font-light text-paper-200/40">
            <span>以泥土與雙手製作</span>
            <Heart className="h-3 w-3 fill-persimmon-400 text-persimmon-400" />
            <span>Land Art Taiwan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
