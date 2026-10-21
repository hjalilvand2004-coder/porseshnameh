/**
 * اعتبارسنجی شناسه‌های ثبتی — کد ملی (کلید شناسایی خانوار) و کد پستی
 *
 * کد ملی سرپرست «کلید و مبنای شناسایی فرد» است: استعلام ثبت احوال، پست، تأمین
 * اجتماعی، اموال و املاک، آموزش‌وپرورش و علوم همه با این کلید انجام می‌شود.
 * طبق سیاست نسخه جدید، کد ملی «اجباری» است و بدون کد ملیِ معتبر (الگوریتم
 * رقم کنترل ثبت احوال) ادامه پرسشنامه مجاز نیست — مسیر «فاقد مدرک» فقط با
 * ثبت پرچم R8 و با همراهی مددکار برای دریافت مدرک پیگیری می‌شود.
 */

import { faNum } from "./format";

/** تبدیل ارقام فارسی/عربی به لاتین + حذف جداکننده‌ها */
export function normalizeDigits(s: string): string {
  return (s ?? "")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[\s\-_]/g, "");
}

/**
 * اعتبارسنجی کد ملی ۱۰ رقمی ایران — الگوریتم رقم کنترل:
 * ۹ رقم اول را در اوزان ۱۰ تا ۲ ضرب، جمع را mod ۱۱ می‌گیریم؛
 * اگر باقیمانده < ۵ باشد باید با رقم دهم برابر باشد، وگرنه ۱۱ منهای باقیمانده.
 */
export function isValidIranianNationalId(input: string): boolean {
  const nid = normalizeDigits(input);
  if (!/^\d{10}$/.test(nid)) return false;
  // کدهای تکراری بی‌معنا که از الگوریتم عبور می‌کنند
  if (/^(\d)\1{9}$/.test(nid)) return false;
  const digits = nid.split("").map(Number);
  const check = digits[9];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
  const rem = sum % 11;
  return rem < 5 ? check === rem : check === 11 - rem;
}

/** کد پستی ایران: ۱۰ رقم (برای واکشی نشانی از سرویس پست) */
export function isValidPostalCode(input: string): boolean {
  return /^\d{10}$/.test(normalizeDigits(input));
}

/** پیام خطای کد ملی برای نمایش یکسان در فرم */
export function nationalIdError(input: string): string | null {
  const nid = normalizeDigits(input);
  if (nid.length === 0) return "کد ملی سرپرست اجباری است — کلید شناسایی خانوار و مبنای استعلام همه مراجع.";
  if (nid.length !== 10) return `کد ملی باید دقیقاً ۱۰ رقم باشد (${faNum(nid.length)} رقم وارد شده)`;
  if (!/^\d{10}$/.test(nid)) return "کد ملی فقط می‌تواند رقم باشد.";
  if (!isValidIranianNationalId(nid)) return "کد ملی با الگوریتم ثبت احوال تطبیق ندارد — رقم کنترل نادرست است؛ کد را دوباره بررسی کنید.";
  return null;
}
