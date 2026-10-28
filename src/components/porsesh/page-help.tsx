"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck, ShieldCheck, Landmark, Lock, Info, Home, FileText, Scale,
} from "lucide-react";

/**
 * راهنمای صفحه — محتوای توضیحی هر گام از صفحه به فرم مودال منتقل شده است
 *
 * به‌جای پاراگراف‌های بلند روی فرم، یک دکمه «راهنمای این صفحه» بالای گام
 * قرار می‌گیرد و با کلیک، همه توضیحات (هدف، محرمانگی، قواعد واکشی و
 * ملاک‌های وب‌سرویس، بدون تکرار پرسش‌ها) در مودال نشان داده می‌شود.
 */

function HelpBlock({ icon: Icon, title, children }: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border p-3.5 space-y-2 leading-6 bg-card">
      <h4 className="font-bold text-[13px] flex items-center gap-2">
        <span className="grid place-items-center size-6 rounded-lg bg-teal-soft text-teal-strong shrink-0">
          <Icon className="size-3.5" aria-hidden />
        </span>
        {title}
      </h4>
      <div className="text-[12.5px] text-foreground/90 space-y-1.5">{children}</div>
    </section>
  );
}

export type PageHelpKey = "identity" | "base";

export function PageHelpDialog({ stepKey, trigger }: { stepKey: PageHelpKey; trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs min-h-8 no-print">
            <BookOpenCheck className="size-4 text-teal-strong" aria-hidden /> راهنمای این صفحه
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        {stepKey === "identity" ? <IdentityHelp /> : <BaseHelp />}
      </DialogContent>
    </Dialog>
  );
}

/* ================= راهنمای گام ۱ — هویت و واکشی ================= */

function IdentityHelp() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-base leading-6">
          <ShieldCheck className="size-5 text-teal-strong shrink-0" aria-hidden />
          هویت، محرمانگی و واکشی از مراجع ثبتی
        </DialogTitle>
        <DialogDescription className="text-xs leading-5">
          راهنمای کامل این صفحه — با ثبت کد ملی، کد پستی و تاریخ تولد سرپرست، اطلاعات هویتی از ثبت احوال
          و نشانی از پست واکشی و ملاک می‌شود؛ سایر مراجع نیز با کد ملی استعلام می‌شوند. نوع درخواست در گام آخر ثبت می‌شود.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2.5">
        <HelpBlock icon={ShieldCheck} title="به پرسش‌نامه خانوار خوش آمدید">
          <p>
            این پرسش‌نامه برای <b>سنجش عملیاتی محرومیت</b> خانوار طراحی شده است، نه رد یا پذیرش درخواست.
            پاسخ‌ها به <strong>محرمانگی کامل</strong> پردازش می‌شوند. اگر از فرم ثبت‌نام آمده‌اید، شناسه‌ها
            و داده هویتی به‌صورت خودکار واکشی شده است؛ در غیر این صورت سه شناسه (کد ملی، تاریخ تولد، کد پستی) را وارد کنید تا واکشی انجام شود.
          </p>
        </HelpBlock>

        <HelpBlock icon={Lock} title="قواعد شناسه‌ها و محرمانگی">
          <ul className="list-disc ps-5 space-y-1.5">
            <li><b>کد ملی سرپرست اجباری است</b> — کلید شناسایی خانوار و مبنای استعلام همه مراجع (ثبت احوال، پست، شاپرک، تأمین اجتماعی، املاک، آموزش‌وپرورش، علوم). اگر سرپرست فاقد مدرک است، مسیر دریافت مدرک (R8) با همراهی مددکار فعال می‌شود.</li>
            <li>نوع درخواست شما در <b>ثبت‌نام</b> انتخاب شده است؛ در گام آخر به‌عنوان داده خدماتی قابل تکمیل و اصلاح است.</li>
            <li>شماره موبایل، رمز عبور (فقط هش) و توافقنامه بانکی نیز از ثبت‌نام منتقل شده‌اند.</li>
            <li>کد پستی برای واکشی نشانی از پست است و برای بی‌خانمان‌ها اجباری نیست.</li>
          </ul>
        </HelpBlock>

        <HelpBlock icon={Landmark} title="واکشی و ملاک ثبتی">
          <ul className="list-disc ps-5 space-y-1.5">
            <li><b>کد ملی کلید و مبنای شناسایی فرد است و اجباری:</b> هویت و اعضای خانوار از <b>ثبت احوال</b> و نشانی و موقعیت جغرافیایی از <b>پست</b> (از کد پستی) واکشی می‌شود؛ سپس سایر مراجع متولی (بیمه، املاک، آموزش‌وپرورش، علوم) نیز با همان کد ملی استعلام می‌شوند.</li>
            <li>داده واکشی‌شده <b>ملاک</b> است و در فرم فقط‌خواندنی می‌شود؛ اصلاح آن فقط از مسیر واکشی مجدد با شناسه‌های درست یا درخواست به مرجع ثبتی است.</li>
            <li>نتیجه استعلام سایر مراجع به‌صورت <b>«پیش‌تکمیل»</b> با حفظ منبع و تاریخ اعمال می‌شود — پیش‌تکمیل تأیید خودکار شرایط جاری نیست (قاعده مهاجرت داده).</li>
            <li>نسخه نمایشی آفلاین است؛ پاسخ استعلام‌ها شبیه‌سازی‌شده و قطعی از همان کدهای واردشده ساخته می‌شود.</li>
          </ul>
        </HelpBlock>

        <HelpBlock icon={Info} title="نکته‌های کاربردی">
          <ul className="list-disc ps-5 space-y-1.5">
            <li>اگر وضعیت فوری یا خطرناکی دارید، از دکمه «فوریت» در پایین صفحه استفاده کنید — نیازی به تکمیل بقیه فرم نیست.</li>
            <li>در هر زمان می‌توانید پیش‌نویس را ذخیره و بعداً ادامه دهید؛ پاسخ‌ها به‌صورت خودکار ذخیره می‌شوند.</li>
          </ul>
        </HelpBlock>
      </div>
    </>
  );
}

/* ================= راهنمای گام ۳ — اطلاعات پایه ================= */

function BaseHelp() {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-base leading-6">
          <Info className="size-5 text-teal-strong shrink-0" aria-hidden />
          راهنمای اطلاعات پایه و پرونده‌ای
        </DialogTitle>
        <DialogDescription className="text-xs leading-5">
          همه توضیحات این صفحه — نقش‌ها، فیلدهای ملاک از وب‌سرویس‌ها، وضعیت مدرک هویتی و هزینه‌های مسکن.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2.5">
        <HelpBlock icon={Info} title="این بخش چه نقشی دارد؟">
          <p>
            این اطلاعات «شناخت خانوار» است و <b>بدون امتیاز مستقل</b>؛ فقط برای اجرای منطق نمایش و مراجعه به‌کار می‌رود.
            کد ملی، کد پستی و تاریخ تولد در گام ۱ ثبت و واکشی می‌شوند و اینجا فقط در صورت نبود واکشی وارد می‌گردند.
          </p>
          <ul className="list-disc ps-5 space-y-1.5">
            <li><b>سرپرست</b> و <b>فرد پاسخ‌گو</b> دو نقش مستقل‌اند؛ پاسخ‌گو ممکن است همسر یا فرزند سرپرست باشد.</li>
            <li>برای جلوگیری از پرسش تکراری، <b>نوع محل سکونت و حق سکونت</b> فقط در گام «مسکن» (C1/C3) و <b>تعداد اتاق و زیربنا</b> فقط در شاخص C4 ثبت می‌شوند — اینجا تکرار نمی‌شوند.</li>
          </ul>
        </HelpBlock>

        <HelpBlock icon={Landmark} title="فیلدهای ملاک — گرفته‌شده از وب‌سرویس‌ها">
          <p>
            بخشی از فیلدهای این صفحه از <b>وب‌سرویس سازمان‌های متولی</b> پر می‌شود و پس از واکشی
            با برچسب «ملاک — غیرقابل ویرایش» قفل می‌گردد:
          </p>
          <ul className="list-disc ps-5 space-y-1.5">
            <li><b>ثبت احوال:</b> نام سرپرست، کد ملی و تاریخ تولد سرپرست.</li>
            <li><b>پست (از کد پستی):</b> کد پستی، استان، شهرستان و نشانی استاندارد.</li>
            <li><b>فرم ثبت‌نام:</b> شماره موبایل سرپرست.</li>
          </ul>
          <p className="text-muted-foreground">
            اصلاح این فیلدها فقط از مسیر «اصلاح شناسه‌ها و واکشی مجدد» در گام ۱ یا درخواست به مرجع ثبتی ممکن است —
            طبق قاعده تقدم منابع، داده مرجع ملاک است و پیش‌تکمیل تأیید خودکار شرایط جاری نیست.
          </p>
        </HelpBlock>

        <HelpBlock icon={FileText} title="وضعیت مدرک هویتی سرپرست (R8)">
          <p>
            کد ملی سرپرست کلید پرونده و اجباری است. اگر سرپرست مدارک هویتی ندارد، گزینه
            «فاقد مدرک / نیازمند بررسی» را انتخاب کنید — مسیر دریافت مدرک (پرچم R8) با همراهی
            مددکار فعال می‌شود و گزینه «در جریان دریافت» برای پرونده‌های در حال پیگیری است.
          </p>
        </HelpBlock>

        <HelpBlock icon={Home} title="فاقد نشانی ثابت و هزینه‌های مسکن">
          <ul className="list-disc ps-5 space-y-1.5">
            <li>برای فرد <b>بی‌خانمان</b>، نشانی اجباری نیست؛ با تیک «فاقد نشانی ثابت» مسیر بررسی میدانی فعال می‌شود.</li>
            <li><b>ودیعه</b> جدا از هزینه ماهانه ثبت می‌شود و در محاسبه فشار هزینه مسکن (C8) لحاظ نمی‌گردد.</li>
            <li><b>تعداد اتاق و زیربنا</b> — که در تراکم (C4) امتیاز دارند — فقط در گام «مسکن» پرسیده می‌شوند و اینجا تکرار نمی‌شوند.</li>
            <li>«شروع دوره حمایت» و «خدمات حمایتی قبلی» اختیاری‌اند و فقط برای زمینه پرونده ثبت می‌شوند.</li>
          </ul>
        </HelpBlock>

        <HelpBlock icon={Scale} title="حریم داده">
          <p>
            همه داده‌ها فقط در مرورگر شما ذخیره می‌شود (نسخه نمایشی آفلاین)؛ پاسخ وب‌سرویس‌ها شبیه‌سازی‌شده است
            و هیچ اطلاعاتی به بیرون ارسال نمی‌گردد.
          </p>
        </HelpBlock>
      </div>
    </>
  );
}

/** ردیف سربرگ فشرده — جای پاراگراف‌های بلند روی فرم */
export function PageHelpBar({ stepKey, title, hint, icon: Icon }: {
  stepKey: PageHelpKey;
  title: string;
  hint: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-card p-3.5 flex items-center gap-3 flex-wrap">
      <span className="grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong shrink-0">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-48 flex-1">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs text-muted-foreground leading-5 mt-0.5">{hint}</p>
      </div>
      <PageHelpDialog stepKey={stepKey} />
    </div>
  );
}

