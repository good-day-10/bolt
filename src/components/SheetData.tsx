import { useEffect, useState } from 'react';
import { Table2, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { fetchSheet, type SheetRow } from '@/lib/sheet';
import { useReveal } from '@/hooks/useReveal';

export default function SheetData() {
  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    let active = true;
    fetchSheet()
      .then((data) => {
        if (active) {
          setRows(data);
          setLoading(false);
        }
      })
      .catch((e: Error) => {
        if (active) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <section id="records" className="relative bg-paper-100 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-light tracking-[0.3em] text-stream-400">
            PROJECT RECORDS
          </span>
          <h2 className="mt-4 font-serif text-3xl text-earth-600 md:text-5xl">
            程式設計後台資料庫
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-stream-400" />
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-earth-400">
            連結 Google 試算表，即時同步作品的計畫資料與設計紀錄。
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} overflow-hidden hand-border bg-paper-50 shadow-lg`}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-20 text-earth-400">
              <Loader2 className="h-8 w-8 animate-spin text-stream-400" />
              <span className="font-light">載入資料中…</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-4 py-20 text-earth-400">
              <AlertCircle className="h-8 w-8 text-persimmon-400" />
              <span className="font-light">資料載入失敗：{error}</span>
              <span className="text-sm text-earth-300">
                請確認 Google 試算表的公開發布連結是否有效
              </span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-earth-400">
              <Table2 className="h-8 w-8 text-earth-300" />
              <span className="font-light">試算表目前沒有資料列</span>
            </div>
          ) : (
            <TableWrapper headers={headers} rows={rows} />
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTjI8FZQcYhRev1IW24ZxVQ8dNk5qxwpliq5ypHERWkaSaGK1VeuYw9wk5yoVavs2ABpJuUXFNpRObM/pub?gid=2011544134&single=true&output=csv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-light text-stream-400 transition hover:text-stream-500"
          >
            <ExternalLink className="h-4 w-4" />
            前往原始 Google 試算表
          </a>
        </div>
      </div>
    </section>
  );
}

function TableWrapper({ headers, rows }: { headers: string[]; rows: SheetRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-earth-100 bg-paper-200">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-5 py-4 font-serif text-sm font-semibold text-earth-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-paper-200 transition-colors hover:bg-paper-200/50"
            >
              {headers.map((h) => (
                <td
                  key={h}
                  className="whitespace-nowrap px-5 py-3.5 text-sm font-light text-earth-500"
                >
                  {row[h] ? row[h] : <span className="text-earth-300">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
