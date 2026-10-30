export const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjI8FZQcYhRev1IW24ZxVQ8dNk5qxwpliq5ypHERWkaSaGK1VeuYw9wk5yoVavs2ABpJuUXFNpRObM/pub?gid=2011544134&single=true&output=csv';

export type SheetRow = Record<string, string>;

export async function fetchSheet(): Promise<SheetRow[]> {
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

// Minimal RFC-4180-ish CSV parser (handles quoted fields, commas, newlines)
function parseCSV(text: string): SheetRow[] {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (ch === '\r') {
        // skip
      } else {
        field += ch;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj: SheetRow = {};
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? '').trim();
    });
    return obj;
  });
}
