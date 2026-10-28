/** قالب‌بندی فارسی: اعداد، مبلغ، تاریخ و زمان */

export function faNum(n: number | undefined | null, digits = 0): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return n.toLocaleString("fa-IR", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

/** تبدیل ارقام یک رشته (مثل تاریخ 1362/01/12) به ارقام فارسی */
export function faStr(s: string | undefined | null): string {
  if (!s) return "—";
  return s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function faScore(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return n.toLocaleString("fa-IR", { maximumFractionDigits: 2 });
}

export function faMoney(n: number | undefined | null): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return `${n.toLocaleString("fa-IR")} تومان`;
}

export function faDate(d: string | Date | undefined): string {
  if (!d) return "—";
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeZone: "Asia/Tehran" }).format(date);
  } catch {
    return "—";
  }
}

export function faDateTime(d: string | Date | undefined): string {
  if (!d) return "—";
  try {
    const date = typeof d === "string" ? new Date(d) : d;
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tehran" }).format(date);
  } catch {
    return "—";
  }
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** درصد با رقم فارسی */
export function faPct(n: number): string {
  return `${faNum(Math.round(n))}٪`;
}
