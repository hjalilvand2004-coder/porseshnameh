"use client";

import { Badge } from "@/components/ui/badge";
import { GitCompareArrows, ShieldAlert } from "lucide-react";
import { faNum } from "@/lib/mpi/format";

/**
 * نقشه مهاجرت پرسشنامه قدیمی — بازنگری فیلدبه‌فیلد
 * «حذف» به معنای حذف از پرسشنامه عمومی غربالگری است، نه حذف از سوابق سازمانی.
 */

interface Row {
  old?: string;
  action: string;
  actionTone?: "keep" | "change" | "remove" | "add" | "split";
  next: string;
  model: string;
}

const ACTION_STYLE: Record<string, string> = {
  keep: "bg-emerald-50 text-emerald-800 border-emerald-200",
  change: "bg-amber-50 text-amber-800 border-amber-200",
  remove: "bg-red-50 text-red-800 border-red-200",
  add: "bg-teal-50 text-teal-800 border-teal-200",
  split: "bg-blue-50 text-blue-800 border-blue-200",
};

const ACTION_LABEL: Record<string, string> = {
  keep: "حفظ", change: "تغییر", remove: "حذف از غربالگری", add: "افزودن", split: "تفکیک",
};

const TABLE1: Row[] = [
  { old: "نام و نام خانوادگی مسئول خانوار", action: "keep", next: "«فرد پاسخ‌گو/مسئول پیگیری خانوار» همراه با نسبت او با سرپرست", model: "اطلاعات پایه" },
  { old: "کد ملی مسئول خانوار", action: "change", next: "استعلام مجاز و ثبت وضعیت «فاقد مدرک/نیازمند بررسی»؛ نبود کد ملی موجب رد درخواست نشود", model: "اطلاعات پایه؛ E4 در صورت مانع واقعی" },
  { old: "نام و کد ملی سرپرست", action: "keep", next: "سرپرست و پاسخ‌گو دو نقش مستقل؛ در صورت یکسان‌بودن، ورود تکراری حذف شود", model: "اطلاعات پایه" },
  { old: "کدپستی و آدرس", action: "keep", next: "استان، شهرستان، محل سکونت فعلی، نشانی قابل مراجعه و روش تماس؛ نشانی ثابت برای بی‌خانمان اجباری نباشد", model: "C1، C9" },
  { old: "محل زندگی", action: "change", next: "موقعیت جغرافیایی برای خط فقر منطقه‌ای و دسترسی خدمات؛ بدون امتیاز مستقیم شهر/روستا/حاشیه", model: "D3، C9" },
  { old: "دوره حمایت از خانواده", action: "keep", next: "تاریخ شروع حمایت، وضعیت جاری و خدمات قبلی؛ ترجیحاً پیش‌تکمیل از پرونده (خارج از امتیاز)", model: "سابقه خدمات" },
  { old: "نوع محل سکونت", action: "change", next: "واحد مسکونی، سکونت موقت، مرکز نگهداری، فضای غیرمسکونی، آلونک/کپر، خودرو/فضای عمومی، سایر", model: "C1، C2" },
  { old: "وضعیت سکونت", action: "split", next: "سه فیلد مستقل: «نوع حق سکونت»، «ایمنی و قابلیت سکونت»، «پایداری و خطر ازدست‌دادن مسکن»", model: "C1، C2، C3" },
  { old: "سال پایان ساخت", action: "change", next: "اختیاری/مشروط — فقط بررسی فنی؛ قدمت به‌تنهایی امتیاز ندارد", model: "داده کمکی C2" },
  { old: "دارای پایان کار ساختمانی", action: "change", next: "انتقال به بخش مشروط — فقط اگر بر ایمنی، حق سکونت یا خدمت اثر واقعی دارد", model: "C2، C3، E4" },
  { old: "متراژ زمین", action: "remove", next: "در صورت نیاز خدمات مسکن، در فرم تخصصی ثبت شود", model: "خارج از امتیاز" },
  { old: "— (جدید)", action: "add", next: "زیربنای قابل استفاده، تعداد اتاق قابل سکونت و وضعیت فضای خواب ایمن", model: "C4" },
  { old: "اجاره‌بها و ودیعه", action: "keep", next: "اجاره ماهانه و ودیعه جدا، اقساط ضروری، شارژ، قبوض اصلی و معوقه", model: "C8" },
  { old: "تاریخ شروع و پایان اجاره", action: "keep", next: "همراه تمدید، اخطار تخلیه و تاریخ احتمالی ازدست‌دادن مسکن", model: "C1، C3" },
  { old: "انشعابات آب، برق و گاز", action: "change", next: "وجود، فعال‌بودن، پایداری، ایمنی، قطع، علت قطع و اثر آن", model: "C5" },
  { old: "انشعاب فاضلاب", action: "change", next: "روش دفع فاضلاب و وضعیت بهداشتی واقعی؛ نبود شبکه شهری به‌تنهایی محرومیت نیست", model: "C6" },
  { old: "تلفن", action: "split", next: "انتقال به بخش تماس و دسترسی ارتباطی — نه امتیاز مستقل", model: "اطلاعات تماس" },
  { old: "سرویس بهداشتی و حمام", action: "change", next: "وجود، قابل استفاده‌بودن، اشتراکی‌بودن، ایمنی و نقص مؤثر", model: "C6" },
  { old: "دین", action: "remove", next: "در EM-MPI امتیاز ندارد؛ فقط در صورت ضرورت قانونی، جداگانه با دسترسی محدود", model: "خارج از امتیاز" },
  { old: "نیازمند مشاوره حقوقی و قضایی", action: "change", next: "نوع مانع، خدمت یا حق مسدودشده، شدت، مدت و فوریت؛ بدون جزئیات غیرضروری", model: "E4، R8" },
  { old: "نوع رسانه در اختیار", action: "change", next: "ابزار ارتباطی/آموزشی، قابلیت استفاده، اشتراک، اینترنت و نیاز واقعی برنامه آموزشی", model: "B5" },
  { old: "نوع درخواست", action: "keep", next: "چندانتخابی؛ تفکیک «درخواست خانوار» از «نیاز شناسایی‌شده»؛ افزودن پاسخ اداری، مراقبت و رسیدگی فوری", model: "مدیریت درخواست" },
  { old: "منبع درآمد خانوار", action: "change", next: "برای هر منبع: دریافت‌کننده، مبلغ، دوره، استمرار، قابلیت اتکا و وضعیت تأیید", model: "D3" },
  { old: "ارثیه", action: "split", next: "دریافت یک‌باره، دارایی یا درآمد مستمر؛ مطابق دستورالعمل واحد منابع — در درآمد ماهانه خودکار نیست", model: "داده مالی" },
  { old: "نیازسنجی آزاد", action: "keep", next: "نیازهای اولویت‌دار خانوار، شرح کوتاه اختیاری و تفکیک نیاز از درخواست", model: "ارجاع و برنامه خدمت" },
];

const TABLE2: Row[] = [
  { old: "نام عضو و کد ملی", action: "keep", next: "شناسه داخلی عضو، وضعیت مدرک و جلوگیری از ورود تکراری", model: "اطلاعات اعضا" },
  { old: "— (جدید)", action: "add", next: "تاریخ تولد/سن، عضویت واقعی، نقش تأمین معاش، نقش مراقب و وضعیت تحصیل", model: "منطق تمام ابعاد" },
  { old: "نسبت با سرپرست", action: "keep", next: "گزینه‌های استاندارد و «سایر»", model: "اطلاعات پایه" },
  { old: "وضعیت همسر", action: "change", next: "اطلاعات پرونده‌ای؛ بدون امتیاز مستقیم", model: "ترکیب خانوار" },
  { old: "تاریخ ثبت طلاق", action: "change", next: "فقط در صورت نیاز حقوقی/خدماتی یا بررسی تغییر ترکیب خانوار", model: "خارج از امتیاز مستقیم" },
  { old: "وضعیت نظام وظیفه", action: "change", next: "وضعیت جاری و اثر واقعی بر امکان کار یا دسترسی خدمت؛ حذف دسته‌بندی‌های غیرضروری از فرم عمومی", model: "D1، D2، E4 حسب اثر" },
  { old: "تاریخ شروع و پایان خدمت", action: "change", next: "تنها برای عضو مرتبط با بررسی اشتغال یا خدمت", model: "داده کمکی" },
  { old: "مهارت‌های فرهنگی و هنری", action: "keep", next: "نوع مهارت، سطح، قابلیت عرضه، علاقه و امکان فعالیت — بخش توانمندسازی", model: "B7" },
  { old: "ویژگی‌های فردی", action: "split", next: "جداکردن وضعیت خانوادگی، بیماری، معلولیت، مراقبت، برنامه حمایتی و نشانه خطر", model: "ابعاد مرتبط" },
  { old: "فوت شوهر، طلاق، سالمندی سرپرست و مشابه", action: "change", next: "رویداد/وضعیت خنثی و اثر آن بر معیشت، مراقبت و حمایت؛ بدون امتیاز برای عنوان", model: "E1، E2، E3" },
  { old: "«سرپرست فاقد صلاحیت»، «بدسرپرست» و مشابه", action: "change", next: "رفتار یا وضعیت قابل مشاهده و اثر آن بر امنیت و مراقبت؛ بدون برچسب‌زنی کلی", model: "A7، E2، پرچم‌های خطر" },
  { old: "برنامه رفع فقر، اکرام، تغذیه و سایر برنامه‌ها", action: "split", next: "بخش سوابق و برنامه‌های حمایتی؛ حذف موارد تکراری", model: "سابقه خدمت" },
  { old: "کودک دارای سوءتغذیه، مادر باردار و شیرده", action: "split", next: "وضعیت فردی مرتبط و نیاز تغذیه/درمان؛ سوءتغذیه نیازمند بررسی حرفه‌ای", model: "A3، A6، R3" },
  { old: "نگهداری کودک، سالمند یا بیمار", action: "change", next: "نیاز مراقبتی، ساعات/شدت مراقبت، مراقب موجود و پشتیبانی", model: "E2، R6" },
  { old: "علت زندانی، وضعیت جرم", action: "remove", next: "در صورت ضرورت قانونی، ثبت محدود و محرمانه؛ عنوان جرم امتیاز ندارد", model: "خارج از امتیاز" },
  { old: "تاریخ ورود و پایان محکومیت", action: "change", next: "فقط برای بررسی غیبت تأمین‌کننده/مراقب و برنامه‌ریزی خدمت", model: "داده زمینه‌ای" },
  { old: "دلیل عدم صلاحیت", action: "remove", next: "ثبت نشانه خطر یا اختلال عملکرد با شواهد و دسترسی محدود", model: "A7 و پرچم خطر" },
  { old: "وضعیت اشتغال", action: "split", next: "فعالیت درآمدزا، توان کار، امکان کار، آمادگی، جست‌وجو و محدودیت مراقبتی/پزشکی", model: "D1، D2" },
  { old: "سازمان: فرد/پست خاص/تابع ارجاع", action: "remove", next: "در صورت کاربرد واقعی، به تنظیمات داخلی سازمان منتقل شود", model: "خارج از سنجش" },
  { old: "وضعیت شغلی", action: "keep", next: "نوع کار + استمرار فعالیت و دریافت درآمد؛ فصلی/روزمزدی به‌تنهایی امتیاز ندارد", model: "D1" },
  { old: "کودک کار", action: "split", next: "پرسش حفاظت از کودک و اثر کار بر امنیت و تحصیل؛ نه صرفاً نوع شغل", model: "B1، B2، R4" },
  { old: "سالمند شاغل", action: "change", next: "سن و اشتغال جدا؛ بررسی توان، اختیار و شرایط کار بدون امتیاز خودکار", model: "داده زمینه‌ای" },
  { old: "علت بیکاری", action: "keep", next: "ساختاری‌سازی: نبود فرصت، محدودیت پزشکی، مراقبت، مهارت، ابزار یا سرمایه", model: "D1، D2، B7، E2" },
  { old: "علاقه به خدمات اشتغال", action: "keep", next: "علاقه، آمادگی و امکان مشارکت به‌صورت جدا", model: "B7" },
  { old: "توانایی کار", action: "change", next: "توان عملکردی، امکان واقعی و موانع؛ نه پاسخ ساده بله/خیر", model: "D1، D2" },
  { old: "بیمه پایه درمانی دارد؟", action: "change", next: "اعتبار پوشش، اعضای تحت پوشش، قابلیت استفاده، فرانشیز و موانع دسترسی", model: "A5" },
  { old: "سابقه و نوع بیمه اجتماعی", action: "keep", next: "ترجیحاً استعلام مجاز؛ ابزار بررسی سابقه — خارج از امتیاز مستقیم", model: "اعتبارسنجی/خدمت" },
  { old: "وضعیت جسمانی سالم/ناسالم", action: "remove", next: "بیماری مؤثر، محدودیت عملکرد، نیاز درمان و اثر بر زندگی", model: "A1، A2، A3" },
  { old: "بیماری و معلولیت", action: "split", next: "دو گروه مستقل؛ نوع، شدت اثر، خدمت دریافتی و نیاز تأمین‌نشده", model: "A1، A2، A3" },
  { old: "وضعیت سواد", action: "change", next: "سواد کارکردی فرد مسئول امور خانوار؛ توان پیگیری خدمات، خواندن پیام و دستور درمان", model: "B3" },
  { old: "میزان سواد", action: "keep", next: "مدرک تحصیلی به‌تنهایی امتیاز ندارد — داده زمینه‌ای", model: "داده زمینه‌ای" },
  { old: "در حال تحصیل", action: "change", next: "ثبت‌نام، حضور، وقفه، ترک تحصیل، عوامل خطر، دسترسی، ابزار و نیاز ویژه", model: "B1، B2، B4، B5، B6" },
];

function MigrationTable({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="px-5 py-3.5 border-b bg-muted/40">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-xs text-muted-foreground border-b bg-card">
              <th className="text-start py-2.5 px-4">فیلد موجود</th>
              <th className="text-start py-2.5 px-4">اقدام</th>
              <th className="text-start py-2.5 px-4">شکل پیشنهادی در نسخه جدید</th>
              <th className="text-start py-2.5 px-4">ارتباط با مدل</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b last:border-0 align-top">
                <td className="py-2.5 px-4 font-medium">{r.old}</td>
                <td className="py-2.5 px-4">
                  <Badge variant="outline" className={ACTION_STYLE[r.actionTone ?? "change"]}>
                    {ACTION_LABEL[r.action]}
                  </Badge>
                </td>
                <td className="py-2.5 px-4 leading-6 max-w-md">{r.next}</td>
                <td className="py-2.5 px-4 font-mono text-xs whitespace-nowrap">{r.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MigrationView() {
  const totalFields = TABLE1.length + TABLE2.length;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <GitCompareArrows className="size-6 text-teal-strong" aria-hidden /> نقشه مهاجرت پرسشنامه قدیمی
        </h1>
        <Badge variant="outline">{faNum(totalFields)} فیلد بررسی‌شده</Badge>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 text-sm leading-7 flex gap-3">
        <ShieldAlert className="size-5 shrink-0 text-amber-600 mt-1" aria-hidden />
        <div>
          <p>
            «حذف» عمدتاً به معنای حذف از <b>پرسشنامه عمومی غربالگری</b> است، نه حذف از سوابق سازمانی.
            نگهداری اطلاعات پرونده‌ای تابع ضرورت، مجوز قانونی و سطح دسترسی است. اطلاعات پایه قابل انتقال است،
            ولی بخش عمده شدت محرومیت باید دوباره جمع‌آوری شود: از «بیمه دارد»، «گوشی دارد» یا «مسکن اجاره‌ای»
            نمی‌توان امتیاز جدید معتبر استخراج کرد.
          </p>
          <p className="mt-2 text-muted-foreground">
            برای هر فیلد در نسخه کامل مهاجرت این ستون‌ها تکمیل می‌شود: نام قدیمی، اقدام، نام جدید، تغییر معنا، شاخص مرتبط،
            تبدیل داده قدیمی، نیاز به جمع‌آوری مجدد، اثر امتیازی، حساسیت و دلیل تغییر. از داده تاریخی ناقص، ضریب شدت جدید ساخته نمی‌شود.
          </p>
        </div>
      </div>

      <MigrationTable title="جدول ۱ — اطلاعات خانوار، مسکن، درخواست و درآمد" rows={TABLE1} />
      <MigrationTable title="جدول ۲ — اطلاعات فردی، اجتماعی، اشتغال، بیمه، سلامت و تحصیل" rows={TABLE2} />
    </div>
  );
}
