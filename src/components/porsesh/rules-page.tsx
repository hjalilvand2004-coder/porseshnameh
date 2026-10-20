"use client";

import { useMemo } from "react";
import { runSelfTests } from "@/lib/mpi/selftest";
import {
  DEPRECATED_REFS,
  DIMENSIONS,
  FLAG_DEFS,
  INDICATORS_BY_DIM,
  LEVELS,
  LEVEL_LABELS_PENDING_APPROVAL,
  OBSERVATION_META_FIELDS,
  PENDING_APPROVALS,
  REFERRAL_PATHS,
  RULE_SET,
  TOTAL_CAP,
  WEIGHTS,
  scaleOf,
} from "@/lib/mpi/rules";
import { QUESTION_GROUPS } from "@/lib/mpi/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faNum } from "@/lib/mpi/format";
import { CircleCheck, CircleX, FlaskConical, Info, PenLine, ScrollText, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * صفحه قواعد — نسخه قواعد، وزن‌ها، سطوح، پرچم‌ها، ماتریس پوشش، خودآزمایی و نیازمند تصویب
 */

const DIM_LABELS = DIMENSIONS;

export function RulesView() {
  const tests = useMemo(() => runSelfTests(), []);
  const allPass = tests.every((t) => t.pass);
  const indicatorCount = Object.values(INDICATORS_BY_DIM).flat().length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ScrollText className="size-6 text-teal-strong" aria-hidden /> قواعد رسمی EM-MPI و ممیزی
        </h1>
        <Badge variant="outline" className="font-mono">{RULE_SET.fullId}</Badge>
        <Badge variant="outline" className="text-amber-700 border-amber-300">نمونه نمایشی — قواعد نسخه‌پذیر</Badge>
      </header>

      <p className="text-sm leading-7 max-w-4xl">
        معیارهای اختصاصی جدول‌های A1 تا A7، B1 تا B7، C1 تا C9، D1 تا D3 و E1 تا E4 مبنای طراحی و محاسبه‌اند.
        ارجاعات قدیمی {DEPRECATED_REFS.join("، ")} شاخص معتبر جدید نیستند. هیچ وزن، آستانه، دوره ارزیابی یا
        قاعده ناموجودی خودسرانه به‌عنوان قاعده رسمی ساخته نشده است؛ موارد نامعین با وضعیت «نیازمند تصویب» ثبت شده‌اند.
      </p>

      <Tabs defaultValue="weights">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="weights">وزن‌ها و سطوح</TabsTrigger>
          <TabsTrigger value="coverage">ماتریس پوشش</TabsTrigger>
          <TabsTrigger value="flags">نشانه‌های خطر R1–R9</TabsTrigger>
          <TabsTrigger value="selftest" className="gap-1.5">
            خودآزمایی
            <Badge className={cn("h-4.5 px-1.5 text-[10px]", allPass ? "bg-emerald-600" : "bg-destructive")}>
              {tests.filter((t) => t.pass).length}/{faNum(tests.length)}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">نیازمند تصویب</TabsTrigger>
        </TabsList>

        {/* وزن‌ها */}
        <TabsContent value="weights" className="mt-4 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {(Object.keys(DIM_LABELS) as (keyof typeof DIM_LABELS)[]).map((d) => (
              <div key={d} className="rounded-2xl border bg-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-primary">{d}</Badge>
                  <span className="text-sm font-semibold">{DIM_LABELS[d].title}</span>
                </div>
                <div className="text-xs text-muted-foreground">سقف بُعد: {faNum(DIM_LABELS[d].cap)}</div>
                <ul className="mt-2.5 space-y-1.5 text-xs">
                  {INDICATORS_BY_DIM[d].map((id) => (
                    <li key={id} className="flex items-center justify-between gap-2 border-b last:border-0 pb-1.5 last:pb-0">
                      <span className="font-mono">{id}</span>
                      <span className="truncate text-muted-foreground">{WEIGHTS[id]}</span>
                      <Badge variant="outline" className="text-[10px] px-1.5">{scaleOf(id).length === 3 ? "سه‌حالته" : "پنج‌حالته"}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border bg-card p-5 text-sm leading-7">
            <p><b>کل:</b> {faNum(TOTAL_CAP)} امتیاز (جمع سقف ابعاد: {faNum(Object.values(DIM_LABELS).reduce((a, d) => a + d.cap, 0))}) — جمع وزن‌ها: {faNum(Object.values(WEIGHTS).reduce((a, b) => a + b, 0))}</p>
            <p><b>ضرایب:</b> سه‌حالته ۰ / ۰٫۵ / ۱ — پنج‌حالته ۰ / ۰٫۲۵ / ۰٫۵ / ۰٫۷۵ / ۱ (شاخص‌های پنج‌حالته: A6، C4، C8، D3)</p>
            <p><b>فرمول:</b> امتیاز شاخص = وزن × ضریب شدت • امتیاز بُعد = مجموع شاخص‌ها • امتیاز کل = A+B+C+D+E — اعشار میانی حفظ می‌شود.</p>
            <p><b>مرز سطوح (نامبهم):</b> {LEVELS.map((l) => `${faNum(l.min)} تا کمتر از ${faNum(l.max === 1000 ? 1001 : l.max)}`).join(" / ")} — سطح آخر ۶۰۰ تا ۱۰۰۰</p>
            {LEVEL_LABELS_PENDING_APPROVAL && <p className="text-amber-700"><TriangleAlert className="inline size-4" aria-hidden /> برچسب‌های سطح برای نمایش پیشنهادی‌اند و باید توسط مرجع تأیید شوند.</p>}
          </div>
        </TabsContent>

        {/* ماتریس پوشش */}
        <TabsContent value="coverage" className="mt-4">
          <div className="rounded-2xl border bg-card p-5 overflow-x-auto thin-scroll">
            <h3 className="font-semibold mb-1">ماتریس پوشش {faNum(indicatorCount)} شاخص × پرسش‌ها</h3>
            <p className="text-xs text-muted-foreground mb-3">هر شاخص با پرسش‌های عملیاتی (شواهد) سنجیده می‌شود؛ «شدت محرومیت» مستقیماً از خانوار پرسیده نمی‌شود.</p>
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b text-xs text-muted-foreground">
                  <th className="text-start py-2 px-2">شاخص</th>
                  <th className="text-start py-2 px-2">عنوان</th>
                  <th className="text-center py-2 px-2">وزن</th>
                  <th className="text-center py-2 px-2">مقیاس</th>
                  <th className="text-center py-2 px-2">تعداد پرسش</th>
                  <th className="text-center py-2 px-2">پوشش</th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(INDICATORS_BY_DIM) as (keyof typeof INDICATORS_BY_DIM)[]).flatMap((d) =>
                  INDICATORS_BY_DIM[d].map((id) => {
                    const qs = countQuestions(id);
                    return (
                      <tr key={id} className="border-b last:border-0">
                        <td className="py-2 px-2 font-mono">{id}</td>
                        <td className="py-2 px-2">{INDICATOR_TITLES_FA[id]}</td>
                        <td className="py-2 px-2 text-center font-mono">{faNum(WEIGHTS[id])}</td>
                        <td className="py-2 px-2 text-center">{scaleOf(id).length === 3 ? "سه‌حالته" : "پنج‌حالته"}</td>
                        <td className="py-2 px-2 text-center font-mono">{faNum(qs)}</td>
                        <td className="py-2 px-2 text-center">
                          <Badge variant="outline" className="text-emerald-700 border-emerald-300 gap-1"><CircleCheck className="size-3" aria-hidden /> پوشش‌داده‌شده</Badge>
                        </td>
                      </tr>
                    );
                  }),
                )}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border bg-card p-5 mt-4">
            <h3 className="font-semibold mb-2">فیلدهای مشترک پشت هر شاخص</h3>
            <div className="flex flex-wrap gap-1.5">
              {OBSERVATION_META_FIELDS.map((f) => <Badge key={f} variant="secondary">{f}</Badge>)}
            </div>
          </div>
        </TabsContent>

        {/* پرچم‌ها */}
        <TabsContent value="flags" className="mt-4 space-y-3">
          <p className="text-sm leading-7">
            نشانه‌های خطر امتیاز افزایشی ندارند؛ فقط مسیر رسیدگی و تأیید تخصصی (گردش کار انسانی جداگانه) فعال می‌کنند.
            تعریف‌های زیر پیشنهادی است و باید توسط مرجع تصویب شود.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(Object.keys(FLAG_DEFS) as (keyof typeof FLAG_DEFS)[]).map((c) => (
              <div key={c} className="rounded-2xl border bg-card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-destructive text-white">{c}</Badge>
                  <span className="font-semibold text-sm">{FLAG_DEFS[c].title}</span>
                  {FLAG_DEFS[c].strict && <Badge variant="outline" className="text-[10px]">محرمانه</Badge>}
                </div>
                <p className="text-xs text-muted-foreground leading-5">{FLAG_DEFS[c].desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="font-semibold mb-2">مسیرهای خروجی (ارجاع فقط به CDI محدود نیست)</h3>
            <div className="flex flex-wrap gap-1.5">
              {REFERRAL_PATHS.map((p) => <Badge key={p.id} variant="secondary">{p.label}</Badge>)}
            </div>
            <p className="text-xs text-muted-foreground mt-2.5 leading-5">
              در بازه ۳۰۰ تا ۴۴۹، اختلاف «امکان ارجاع» و «ارجاع عادی» در اسناد برای تأیید مرجع ثبت شده است.
            </p>
          </div>
        </TabsContent>

        {/* خودآزمایی */}
        <TabsContent value="selftest" className="mt-4">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <FlaskConical className="size-5 text-teal-strong" aria-hidden />
              <h3 className="font-semibold">خودآزمایی معیارهای پذیرش (قطعی و تکرارپذیر)</h3>
              <Badge className={cn(allPass ? "bg-emerald-600" : "bg-destructive")}>{tests.filter((t) => t.pass).length} از {faNum(tests.length)} موفق</Badge>
              <Button size="sm" variant="outline" className="ms-auto" onClick={() => window.location.reload()}>اجرای مجدد</Button>
            </div>
            <ul className="space-y-2">
              {tests.map((t) => (
                <li key={t.id} className={cn("rounded-xl border p-3.5", t.pass ? "border-emerald-200 bg-emerald-50/40" : "border-red-200 bg-red-50/40")}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {t.pass ? <CircleCheck className="size-4 text-emerald-600" aria-hidden /> : <CircleX className="size-4 text-destructive" aria-hidden />}
                    <span className="font-mono">{t.id}</span> — {t.title}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-5">{t.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        {/* نیازمند تصویب */}
        <TabsContent value="pending" className="mt-4 space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
            <h3 className="font-semibold flex items-center gap-2 mb-1"><PenLine className="size-5 text-amber-600" aria-hidden /> فهرست موارد نیازمند تأیید مرجع</h3>
            <p className="text-sm leading-6">
              این موارد در سند مرجع عدد، دوره واحد یا تعریف قطعی ندارند؛ به‌عنوان «نیازمند تصویب» علامت خورده‌اند و
              در نمونه محصول به‌عنوان قاعده مصوب معرفی نمی‌شوند.
            </p>
          </div>
          <ul className="space-y-2.5">
            {PENDING_APPROVALS.map((p, i) => (
              <li key={i} className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="font-mono">{p.scope}</Badge>
                  <span className="text-sm font-medium">{p.item}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-5">{p.why}</p>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border bg-card p-5 text-sm leading-7">
            <h3 className="font-semibold mb-1.5 flex items-center gap-2"><Info className="size-4 text-teal-strong" aria-hidden /> تفکیک‌های صریح (جلوگیری از خطای معنایی)</h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>وجود بیمه ≠ دسترسی مؤثر به خدمت</li>
              <li>داشتن دستگاه ≠ دسترسی آموزشی کافی</li>
              <li>وجود انشعاب ≠ خدمت پایدار</li>
              <li>سالم/ناسالم ≠ شدت بیماری یا محدودیت</li>
              <li>مستأجر بودن ≠ محرومیت مسکن</li>
              <li>روزمزد بودن ≠ ناپایداری احرازشده</li>
              <li>بی‌سوادی اسمی ≠ اختلال سواد کارکردی</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              از داده تاریخی ناقص، ضریب شدت جدید ساخته نمی‌شود؛ برای این موارد وضعیت «نیازمند تکمیل» ثبت و سوابق قدیمی با منشأ آن‌ها حفظ می‌شود.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function countQuestions(id: string): number {
  return QUESTION_GROUPS.filter((g) => g.indicator === id).reduce((acc, g) => acc + g.questions.length, 0);
}

const INDICATOR_TITLES_FA: Record<string, string> = {
  A1: "بیماری مزمن یا جدی", A2: "محدودیت عملکردی پایدار", A3: "درمان ضروری انجام‌نشده", A4: "فشار هزینه‌های درمانی", A5: "پوشش بیمه‌ای مؤثر", A6: "ناامنی غذایی ۳۰ روز اخیر", A7: "سلامت روان و ایمنی خانوار",
  B1: "ترک تحصیل و آموزش اجباری", B2: "خطر ترک تحصیل", B3: "سواد کارکردی", B4: "مانع واقعی آموزش", B5: "ابزار دیجیتال آموزشی", B6: "نیاز آموزشی ویژه", B7: "مهارت و توانمندسازی",
  C1: "بی‌خانمانی و تهدید سکونت", C2: "ایمنی و قابلیت سکونت", C3: "پایداری حق سکونت", C4: "تراکم و فضای خواب ایمن", C5: "آب، برق و انرژی", C6: "بهداشت محیط مسکن", C7: "وسایل ضروری زندگی", C8: "فشار هزینه مسکن", C9: "دسترسی به خدمات پایه",
  D1: "اشتغال و استمرار درآمد", D2: "بیکاری سایر اعضای توانمند", D3: "کفایت منابع قابل اتکا",
  E1: "چشم‌انداز معیشت ۱۲ ماه", E2: "بار مراقبت", E3: "پشتوانه اجتماعی در بحران", E4: "مانع هویتی/حقوقی/اداری",
};
