/**
 * اعتبارسنجی فرم ثبت‌نام سامانه — الگوبرداری از فرم ورود سرویس امداد
 * (کد ملی، شماره موبایل، تاریخ تولد، کد پستی، رمز عبور و توافقنامه)
 *
 * کد ملی «کلید و مبنای شناسایی فرد» است (national-id.ts) و ثبت‌نام بدون آن
 * ممکن نیست. رمز عبور مطابق قواعد سرویس مرجع:
 *   • دقیقاً ۶ کاراکتر، ترکیبی از اعداد و حروف انگلیسی؛
 *   • استفاده از کاراکترهای & < > " / ; , * | = % مجاز نیست.
 *
 * ⚠️ رمز عبور هرگز به‌صورت متن ساده ذخیره نمی‌شود؛ فقط هش یک‌طرفه (نسخه نمایشی
 * از مکانیزم) در پرونده نگه داشته می‌شود. در استقرار عملیاتی، احراز هویت سمت
 * سرور با هش نمکی (bcrypt/argon2) انجام می‌شود و این فیلد در سمت کلاینت نیست.
 */

import { faNum } from "./format";
import { normalizeDigits } from "./national-id";

/* ---------------- شماره موبایل ---------------- */

/** موبایل ایران: ۰۹ + ۹ رقم (پذیرش ارقام فارسی/عربی و حذف فاصله/خط تیره) */
export function isValidMobile(input: string): boolean {
  return /^09\d{9}$/.test(normalizeDigits(input));
}

export function mobileError(input: string): string | null {
  const m = normalizeDigits(input);
  if (m.length === 0) return "شماره موبایل اجباری است — کد تأیید و اطلاع‌رسانی پیگیری درخواست به همین شماره ارسال می‌شود.";
  if (!/^09/.test(m)) return "شماره موبایل باید با ۰۹ شروع شود (مثلاً ۰۹۱۲۳۴۵۶۷۸۹).";
  if (m.length !== 11) return `شماره موبایل باید ۱۱ رقم باشد (${faNum(m.length)} رقم وارد شده).`;
  if (!isValidMobile(m)) return "شماره موبایل معتبر نیست — فقط رقم مجاز است.";
  return null;
}

/* ---------------- تاریخ تولد (شمسی) ---------------- */

/** طول ماه‌های سال شمسی؛ اسفند در سال کبیسه ۳۰ روز است */
function jalaliMonthLength(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  // سال کبیسه — الگوریتم متداول ۳۳ ساله (نطق/بیرشک تقریبی) برای بازه ۱۳۰۰ تا ۱۴۲۰
  const rem = year % 33;
  const leap = [1, 5, 9, 13, 17, 22, 26, 30].includes(rem);
  return leap ? 30 : 29;
}

/** نرمال‌سازی ورودی تاریخ به قالب YYYY/MM/DD یا null اگر قابل خواندن نباشد */
export function normalizeJalaliDate(input: string): string | null {
  const s = normalizeDigits(input).replace(/[.\-]/g, "/");
  let y: string, m: string, d: string;
  if (s.includes("/")) {
    const parts = s.split("/").filter(Boolean);
    if (parts.length !== 3) return null;
    [y, m, d] = parts;
  } else if (s.length === 8) {
    y = s.slice(0, 4); m = s.slice(4, 6); d = s.slice(6, 8);
  } else {
    return null;
  }
  if (!/^\d{4}$/.test(y) || !/^\d{1,2}$/.test(m) || !/^\d{1,2}$/.test(d)) return null;
  const yy = Number(y), mm = Number(m), dd = Number(d);
  if (yy < 1300 || yy > 1420) return null;
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > jalaliMonthLength(yy, mm)) return null;
  return `${y}/${m.padStart(2, "0")}/${d.padStart(2, "0")}`;
}

export function birthDateError(input: string): string | null {
  if (normalizeDigits(input).length === 0) return "تاریخ تولد اجباری است — با کد ملی و تاریخ تولد، هویت از ثبت احوال تطبیق داده می‌شود.";
  if (!normalizeJalaliDate(input)) return "تاریخ تولد شمسی معتبر نیست — قالب مثال: ۱۳۶۲/۰۵/۱۲ (روز/ماه/سال در محدوده درست).";
  return null;
}

/* ---------------- رمز عبور — قواعد سرویس مرجع ---------------- */

const FORBIDDEN_PW_CHARS = `&<>"/;,*|=%`;

export function passwordError(pw: string): string | null {
  if (pw.length === 0) return "رمز عبور اجباری است.";
  const bad = pw.split("").filter((c) => FORBIDDEN_PW_CHARS.includes(c));
  if (bad.length > 0) return `برای رمز عبور از کاراکترهای ${FORBIDDEN_PW_CHARS} استفاده نکنید (شامل «${bad[0] === '"' ? '"Double Quote"' : bad[0]}»).`;
  if (pw.length !== 6) return `رمز عبور باید شامل ۶ کاراکتر باشد (${faNum(pw.length)} کاراکتر وارد شده).`;
  if (!/^[A-Za-z0-9]+$/.test(pw)) return "رمز عبور فقط می‌تواند ترکیبی از اعداد و حروف انگلیسی باشد.";
  if (!/[A-Za-z]/.test(pw)) return "رمز عبور باید ترکیبی باشد — حداقل یک حرف انگلیسی در آن باشد.";
  if (!/\d/.test(pw)) return "رمز عبور باید ترکیبی باشد — حداقل یک عدد در آن باشد.";
  return null;
}

/** هش یک‌طرفه نمایشی (FNV-1a) — متن ساده هرگز ذخیره نمی‌شود */
export function hashPassword(pw: string): string {
  let h = 2166136261;
  for (let i = 0; i < pw.length; i++) {
    h ^= pw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `fnv1a:${(h >>> 0).toString(16).padStart(8, "0")}`;
}

/* ---------------- نوع درخواست (الگوی فرم مرجع) ---------------- */

export type RegistrationKind = "need_service" | "provide_service";

export const REGISTRATION_KINDS: { value: RegistrationKind; label: string; desc: string }[] = [
  {
    value: "need_service",
    label: "اعلام نیازمندی و دریافت خدمات دارم.",
    desc: "پرسشنامه غربالگری محرومیت خانوار (EM-MPI) برای شما آغاز می‌شود؛ اطلاعات هویتی و نشانی از مراجع ثبتی واکشی و ملاک می‌شود.",
  },
  {
    value: "provide_service",
    label: "متقاضی ارائه خدمت به مددجویان و نیازمندان هستم",
    desc: "پرسشنامه محرومیت برای شما تکمیل نمی‌شود؛ به داشبورد حرفه‌ای (پرونده خانوارها، ارجاع و بازبینی) هدایت می‌شوید.",
  },
];

/* ---------------- توافقنامه دسترسی به اطلاعات بانکی ---------------- */

export const BANK_AGREEMENT_PARAGRAPHS: { h: string; p: string }[] = [
  {
    h: "۱) هدف دسترسی",
    p: "با رضایت شما، وضعیت حساب و گردش بانکی سرپرست خانوار فقط برای «راستی‌آزمایی معیشت و درآمد» (بُعد D از شاخص‌های EM-MPI) و تطبیق منابع اعلامی با سابقه بانکی، از طریق شبکه شاپرک و بانک‌های عامل استعلام می‌شود.",
  },
  {
    h: "۲) دامنه دسترسی",
    p: "مانده حساب، گردش ۹۰ روز اخیر به‌صورت تجمیعی، وضعیت تسهیلات و چک برگشتی؛ جزئیات خرید، محل خرج کردن و کدهای فروشنده مشاهده نمی‌شوند.",
  },
  {
    h: "۳) محرمانگی و محدودیت استفاده",
    p: "داده بانکی فقط در همین پرونده غربالگری استفاده می‌شود، امتیاز مستقل ایجاد نمی‌کند (لایه اطلاعات پرونده‌ای جدا از امتیاز است)، در اختیار اشخاص ثالث قرار نمی‌گیرد و دسترسی به آن نقش‌محور و ثبت‌شده در گزارش ممیزی است.",
  },
  {
    h: "۴) مدت و لغو رضایت",
    p: "این رضایت تا بستن پرونده معتبر است و هر زمان قابل لغو است؛ لغو رضایت بانکی مانع ادامه ارزیابی سایر بخش‌های پرسشنامه و مانع ثبت درخواست نیست، فقط راستی‌آزمایی بانکی به مسیر مدارک مردمی منتقل می‌شود.",
  },
];
