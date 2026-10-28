"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ChevronLeft, ChevronRight, CircleCheck, X } from "lucide-react";
import { normalizeDigits } from "@/lib/mpi/national-id";
import { faNum, faStr } from "@/lib/mpi/format";
import { cn } from "@/lib/utils";

/**
 * تقویم شمسی (جلالی) — انتخابگر تاریخ تولد و سایر تاریخ‌های ثبتی
 *
 * • خروجی همیشه «YYYY/MM/DD» نرمال با ارقام لاتین است — سازگار با
 *   normalizeJalaliDate و اعتبارسنج birthDateError (محدوده ۱۳۰۰ تا ۱۴۲۰).
 * • طول ماه اسفند با همان قاعده ۳۳ ساله registration.ts محاسبه می‌شود
 *   تا روزهای مجاز تقویم با اعتبارسنج فرم دقیقاً یکی باشد.
 * • چیدمان کامل راست‌به‌چپ: هفته از شنبه، جهت ماه‌ها راست به چپ.
 */

const J_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];
const J_WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export const J_YEAR_MIN = 1300;
export const J_YEAR_MAX = 1420;

const div = (a: number, b: number) => Math.trunc(a / b);

/** طول ماه شمسی — قاعده ۳۳ ساله (همان قاعده registration.ts) */
function jalaliMonthLength(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(year % 33) ? 30 : 29;
}

/** میلادی → شمسی — الگوریتم متداول جلالی (برای دکمه «امروز») */
export function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const G_DM = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy: number;
  if (gy > 1600) { jy = 979; gy -= 1600; } else { jy = 0; gy -= 621; }
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + div(gy2 + 3, 4) - div(gy2 + 99, 100) + div(gy2 + 399, 400) - 80 + gd + G_DM[gm - 1];
  jy += 33 * div(days, 12053); days %= 12053;
  jy += 4 * div(days, 1461); days %= 1461;
  if (days > 365) { jy += div(days - 1, 365); days = (days - 1) % 365; }
  const jm = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

/** شمسی → میلادی — برای تعیین روز هفته اول ماه */
export function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  let gy: number;
  if (jy > 979) { gy = 1600; jy -= 979; } else { gy = 621; }
  let days = 365 * jy + div(jy, 33) * 8 + div((jy % 33) + 3, 4) + 78 + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  gy += 400 * div(days, 146097); days %= 146097;
  if (days > 36524) {
    days -= 1;
    gy += 100 * div(days, 36524); days %= 36524;
    if (days >= 365) days += 1;
  }
  gy += 4 * div(days, 1461); days %= 1461;
  if (days > 365) { gy += div(days - 1, 365); days = (days - 1) % 365; }
  let gd = days + 1;
  const leap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0;
  const G_ML = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gm = 0;
  while (gm < 12 && gd > G_ML[gm]) { gd -= G_ML[gm]; gm += 1; }
  return [gy, gm + 1, gd];
}

function parseJalali(v?: string | null): { y: number; m: number; d: number } | null {
  const s = normalizeDigits(v ?? "");
  const m = s.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!m) return null;
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  if (y < J_YEAR_MIN || y > J_YEAR_MAX || mo < 1 || mo > 12) return null;
  if (d < 1 || d > jalaliMonthLength(y, mo)) return null;
  return { y, m: mo, d };
}

const fmt = (y: number, m: number, d: number) =>
  `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}`;

/** شنبه = ۰ … جمعه = ۶ برای روزی از تقویم شمسی */
function jalaliWeekday(y: number, m: number, d: number): number {
  const [gy, gm, gd] = jalaliToGregorian(y, m, d);
  return (new Date(gy, gm - 1, gd).getDay() + 1) % 7;
}

export function JalaliDatePicker({
  value, onChange, id, disabled, placeholder = "انتخاب تاریخ", invalid, ariaLabel,
}: {
  value?: string;
  onChange: (normalized: string) => void;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  invalid?: boolean;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const parsed = parseJalali(value);
  const [view, setView] = useState<{ y: number; m: number }>(() =>
    parsed ?? { y: 1362, m: 1 });

  const openCalendar = () => {
    if (parsed) setView({ y: parsed.y, m: parsed.m });
    setOpen(true);
  };

  const stepMonth = (delta: number) => {
    setView((v) => {
      let y = v.y, m = v.m + delta;
      if (m < 1) { m = 12; y -= 1; }
      if (m > 12) { m = 1; y += 1; }
      y = Math.min(J_YEAR_MAX, Math.max(J_YEAR_MIN, y));
      return { y, m };
    });
  };

  const pick = (d: number) => {
    onChange(fmt(view.y, view.m, d));
    setOpen(false);
  };

  const today = (() => {
    const n = new Date();
    const [ty, tm, td] = gregorianToJalali(n.getFullYear(), n.getMonth() + 1, n.getDate());
    return { y: ty, m: tm, d: td, inRange: ty >= J_YEAR_MIN && ty <= J_YEAR_MAX };
  })();

  const leadingBlanks = jalaliWeekday(view.y, view.m, 1);
  const daysCount = jalaliMonthLength(view.y, view.m);
  const cells: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen} dir="rtl">
      <PopoverTrigger asChild>
        <button
          type="button" id={id} disabled={disabled}
          onClick={openCalendar}
          role="combobox" aria-expanded={open} aria-haspopup="dialog" aria-label={ariaLabel}
          className={cn(
            "flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            invalid
              ? "border-destructive focus-visible:ring-destructive/30"
              : "border-input hover:border-ring/60",
          )}
        >
          <span className={cn("truncate", !parsed && "text-muted-foreground")}>
            {parsed ? faStr(fmt(parsed.y, parsed.m, parsed.d)) : placeholder}
          </span>
          <CalendarIcon className="size-4 shrink-0 text-teal-strong" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[19rem] p-3 space-y-2.5" dir="rtl">
        {/* سربرگ: ماه و سال */}
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => stepMonth(-1)} disabled={view.y <= J_YEAR_MIN && view.m === 1}
            className="grid place-items-center size-7 rounded-lg border bg-card hover:border-ring/60 disabled:opacity-40"
            aria-label="ماه قبل"><ChevronRight className="size-4" aria-hidden /></button>
          <Select value={String(view.m)} onValueChange={(v) => setView((s) => ({ ...s, m: Number(v) }))}>
            <SelectTrigger className="h-7 flex-1 text-xs" aria-label="ماه"><SelectValue /></SelectTrigger>
            <SelectContent>{J_MONTHS.map((mn, i) => (
              <SelectItem key={mn} value={String(i + 1)} className="text-xs">{mn}</SelectItem>
            ))}</SelectContent>
          </Select>
          <Select value={String(view.y)} onValueChange={(v) => setView((s) => ({ ...s, y: Number(v) }))}>
            <SelectTrigger className="h-7 w-24 text-xs" aria-label="سال"><SelectValue /></SelectTrigger>
            <SelectContent className="max-h-56">
              {Array.from({ length: J_YEAR_MAX - J_YEAR_MIN + 1 }, (_, i) => J_YEAR_MAX - i).map((y) => (
                <SelectItem key={y} value={String(y)} className="text-xs">{faNum(y)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button type="button" onClick={() => stepMonth(1)} disabled={view.y >= J_YEAR_MAX && view.m === 12}
            className="grid place-items-center size-7 rounded-lg border bg-card hover:border-ring/60 disabled:opacity-40"
            aria-label="ماه بعد"><ChevronLeft className="size-4" aria-hidden /></button>
        </div>

        {/* شبکه روزها */}
        <div className="grid grid-cols-7 gap-y-0.5 text-center">
          {J_WEEKDAYS.map((w) => (
            <div key={w} className="text-[10px] text-muted-foreground py-1 font-medium">{w}</div>
          ))}
          {cells.map((d, i) =>
            d === null ? (
              <div key={`b${i}`} />
            ) : (
              <button
                key={d} type="button" onClick={() => pick(d)}
                aria-label={`${d} ${J_MONTHS[view.m - 1]} ${view.y}`}
                aria-pressed={parsed?.y === view.y && parsed?.m === view.m && parsed?.d === d}
                className={cn(
                  "mx-auto grid place-items-center size-8 rounded-lg text-[12.5px] transition-colors",
                  parsed?.y === view.y && parsed?.m === view.m && parsed?.d === d
                    ? "bg-primary text-primary-foreground font-bold"
                    : today.y === view.y && today.m === view.m && today.d === d
                      ? "bg-teal-soft text-teal-strong font-semibold border border-teal-strong/40"
                      : "hover:bg-muted",
                )}
              >
                {faNum(d)}
              </button>
            ),
          )}
        </div>

        {/* پابرگ: امروز و پاک‌کردن */}
        <div className="flex items-center justify-between pt-1 border-t">
          <button
            type="button" disabled={!today.inRange}
            onClick={() => { onChange(fmt(today.y, today.m, today.d)); setOpen(false); }}
            className="text-[11px] text-teal-strong flex items-center gap-1 hover:underline disabled:opacity-40 disabled:no-underline pt-1.5"
          >
            <CircleCheck className="size-3.5" aria-hidden /> امروز ({faNum(fmt(today.y, today.m, today.d))})
          </button>
          <button
            type="button" onClick={() => { onChange(""); setOpen(false); }}
            className="text-[11px] text-muted-foreground flex items-center gap-1 hover:underline pt-1.5"
          >
            <X className="size-3.5" aria-hidden /> پاک کردن
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
