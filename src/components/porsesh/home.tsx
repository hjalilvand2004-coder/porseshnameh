"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { SAMPLES } from "@/lib/mpi/samples";
import { computeAssessment } from "@/lib/mpi/engine";
import { STEPS } from "@/lib/mpi/questions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { faDateTime, faNum, faPct } from "@/lib/mpi/format";
import {
  ArrowLeft, ClipboardList, Database, FlaskConical, Layers, Lock, Sparkles, Trash2,
  TriangleAlert, Upload, Users2, ShieldCheck, Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * صفحه اصلی — معرفی، محرمانگی، شروع، سناریوهای نمونه و ورود/خروج داده
 */

export function HomeView() {
  const createAssessment = usePorsesh((s) => s.createAssessment);
  const assessments = usePorsesh((s) => s.assessments);
  const importJson = usePorsesh((s) => s.importJson);
  const seedDemoBank = usePorsesh((s) => s.seedDemoBank);
  const clearDemoBank = usePorsesh((s) => s.clearDemoBank);
  const [file, setFile] = useState<File | null>(null);
  const demoCount = useMemo(() => Object.values(assessments).filter((a) => a.demo).length, [assessments]);

  const onImport = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = importJson(String(reader.result));
      toast({ title: r.ok ? "ورود موفق" : "خطا در ورود", description: r.message, variant: r.ok ? "default" : "destructive" });
      if (r.ok) setFile(null);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* قهرمان */}
      <section className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute -start-16 -top-16 size-64 rounded-full bg-white/5" aria-hidden />
        <div className="absolute -end-10 bottom-0 size-48 rounded-full bg-white/5" aria-hidden />
        <div className="relative max-w-3xl space-y-4">
          <Badge className="bg-white/15 text-white border-white/25 gap-1.5">
            <Sparkles className="size-3.5" aria-hidden /> غربالگری محرومیت چندبعدی EM-MPI
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-bold leading-snug">
            پرسش‌نامه مدرن خانوار — سنجش محرومیت با عدالت، شفافیت و کرامت انسانی
          </h1>
          <p className="text-primary-foreground/85 leading-8 text-sm sm:text-base">
            سه لایه سنجش: اطلاعات پرونده‌ای، پرسشنامه عملیاتی ۳۰ شاخص EM-MPI در پنج بُعد، و بررسی حرفه‌ای/ارجاع.
            موتور قواعد قطعی و مستقل، ثبت نشانه‌های فوریت بدون انتظار برای تکمیل فرم، و بازبینی انسانی مددکار.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <Button size="lg" variant="secondary" onClick={() => createAssessment()}>
              شروع پرسشنامه جدید <ArrowLeft className="size-4" aria-hidden />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white" onClick={() => usePorsesh.getState().setView("assessments")}>
              <Layers className="size-4" aria-hidden /> بانک پرونده‌ها ({faNum(Object.keys(assessments).length)})
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white" onClick={() => usePorsesh.getState().setView("rules")}>
              <FlaskConical className="size-4" aria-hidden /> قواعد و خودآزمایی
            </Button>
          </div>
        </div>
      </section>

      {/* اصول غیرقابل نقض */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          { icon: ShieldCheck, title: "غربالگری، نه تصمیم", text: "EM-MPI ابزار سطح‌بندی اولیه است؛ هیچ خروجی الگوریتمی به‌تنهایی تصمیم نهایی درباره خانوار نیست." },
          { icon: Lock, title: "تفکیک و حداقل داده", text: "اطلاعات پرونده‌ای از امتیاز محرومیت تفکیک شده؛ دین، تأهل، شهر/روستا و مشابه امتیاز مستقل ندارند." },
          { icon: TriangleAlert, title: "فوریت بدون شرط", text: "ثبت نشانه خطر و رسیدگی فوری مستقل از تکمیل پرسشنامه و مستقل از امتیاز است." },
          { icon: Users2, title: "بازبینی انسانی", text: "مددکار با دلیل و مدرک داده را اصلاح می‌کند و موتور قواعد امتیاز را دوباره محاسبه می‌کند." },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border bg-card p-5">
            <c.icon className="size-6 text-teal-strong mb-2.5" aria-hidden />
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-6">{c.text}</p>
          </div>
        ))}
      </section>

      {/* جریان پرسشنامه */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="font-bold text-lg flex items-center gap-2 mb-1.5">
          <Compass className="size-5 text-teal-strong" aria-hidden /> مسیر پرسشنامه (۱۰ گام)
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-6">
          بررسی فوریت در آغاز انجام می‌شود و در تمام مراحل در دسترس می‌ماند؛ تکمیل پرسشنامه شرط رسیدگی اضطراری نیست.
        </p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {STEPS.map((s) => (
            <li key={s.key} className={cn("rounded-xl border p-3.5", s.scored === false ? "bg-muted/40" : "bg-background")}>
              <div className="flex items-center gap-2 mb-1">
                <span className="grid place-items-center size-6 rounded-full bg-teal-soft text-teal-strong text-xs font-bold">{faNum(s.index)}</span>
                {s.scored === false && <Badge variant="outline" className="text-[10px]">بدون امتیاز</Badge>}
              </div>
              <div className="text-sm font-medium leading-5">{s.title}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* بانک داده نمونه */}
      <section className="rounded-2xl border bg-card p-6">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <Database className="size-5 text-teal-strong" aria-hidden />
          <h2 className="font-bold text-lg">بانک داده نمونه — {faNum(demoCount)} پرونده آزمایشی</h2>
          {demoCount > 0 && <Badge variant="outline" className="bg-teal-soft text-teal-strong">در بانک موجود است</Badge>}
        </div>
        <p className="text-sm text-muted-foreground leading-6 mb-4">
          هشت خانوار ساختگی با شرایط مختلف (سطوح ۱ تا ۵ محرومیت، بی‌خانمان، سالمند تنها، کودک معلول،
          اطلاعات ناقص، ارجاع‌شده و پرونده بسته) در بانک ذخیره شده تا رفتار موتور قواعد، پرچم‌های خطر،
          ارجاع و داشبورد حرفه‌ای بدون ورود داده قابل آزمودن باشد. همه نام‌ها «(نمونه)» هستند.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button onClick={() => { seedDemoBank(true); toast({ title: "بانک داده نمونه بارگذاری شد", description: "۸ پرونده آزمایشی با شرایط مختلف در بانک ذخیره شد." }); }}>
            <Database className="size-4" aria-hidden /> بارگذاری/بازنشانی ۸ پرونده نمونه
          </Button>
          {demoCount > 0 && (
            <Button variant="outline" onClick={() => { clearDemoBank(); toast({ title: "پرونده‌های نمونه پاک شد" }); }}>
              <Trash2 className="size-4" aria-hidden /> پاک‌کردن پرونده‌های نمونه
            </Button>
          )}
          <Button variant="ghost" onClick={() => usePorsesh.getState().setView("assessments")}>
            مشاهده بانک پرونده‌ها <ArrowLeft className="size-4" aria-hidden />
          </Button>
        </div>
      </section>

      {/* سناریوهای نمونه */}
      <section className="rounded-2xl border bg-card p-6">
        <h2 className="font-bold text-lg flex items-center gap-2 mb-1.5">
          <FlaskConical className="size-5 text-teal-strong" aria-hidden /> سناریوهای نمونه (داده ساختگی)
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-6">
          برای آزمون سامانه، یکی از سناریوهای پذیرش را بارگذاری کنید: همه داده‌ها فرضی و فقط برای نمایش رفتار موتور قواعد است.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {SAMPLES.map((s) => (
            <div key={s.id} className="rounded-xl border p-4 space-y-2 bg-background">
              <h3 className="font-semibold text-sm leading-5">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-5">{s.desc}</p>
              <Button size="sm" variant="outline" onClick={() => {
                const a = s.build();
                createAssessment(a);
                toast({ title: "سناریوی نمونه بارگذاری شد", description: s.title });
              }}>
                بارگذاری سناریو
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ورود داده */}
      <section className="rounded-2xl border bg-card p-6 flex flex-wrap items-center gap-3">
        <Database className="size-5 text-teal-strong" aria-hidden />
        <div className="min-w-56">
          <h2 className="font-semibold text-sm">بازیابی پرونده‌ها از فایل JSON</h2>
          <p className="text-xs text-muted-foreground">خروجی پیشین را وارد کنید تا در همین مرورگر ادامه دهید.</p>
        </div>
        <Input type="file" accept="application/json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="max-w-xs" />
        <Button variant="outline" disabled={!file} onClick={onImport}>
          <Upload className="size-4" aria-hidden /> ورود داده
        </Button>
      </section>
    </div>
  );
}

/**
 * فهرست پرونده‌ها
 */
export function AssessmentsView() {
  const assessments = usePorsesh((s) => s.assessments);
  const setActive = usePorsesh((s) => s.setActive);
  const setView = usePorsesh((s) => s.setView);
  const remove = usePorsesh((s) => s.removeAssessment);
  const createAssessment = usePorsesh((s) => s.createAssessment);
  const list = useMemo(() => Object.values(assessments).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), [assessments]);

  const statusLabel: Record<string, string> = {
    draft: "پیش‌نویس", submitted: "ثبت‌شده", in_review: "در بازبینی", referred: "ارجاع‌شده", closed: "بسته",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <ClipboardList className="size-6 text-teal-strong" aria-hidden /> پرونده‌های ارزیابی
        </h1>
        <Button onClick={() => createAssessment()} className="ms-auto">پرسشنامه جدید</Button>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border bg-card p-10 text-center text-muted-foreground">
          <Layers className="size-10 mx-auto mb-3 opacity-40" aria-hidden />
          هنوز پرونده‌ای ثبت نشده است. از «پرسشنامه جدید» شروع کنید یا سناریوی نمونه را بارگذاری نمایید.
        </div>
      ) : (
        <div className="grid gap-3">
          {list.map((a) => {
            const res = computeAssessment(a);
            const name = a.household.headName || a.household.responderName || "خانوار بدون نام";
            return (
              <div key={a.id} className="rounded-2xl border bg-card p-4.5 p-5 flex flex-wrap items-center gap-3">
                <div className="min-w-52">
                  <div className="font-semibold flex items-center gap-2">
                    {name}
                    {a.demo && <Badge variant="outline" className="text-[10px] bg-teal-soft text-teal-strong border-teal-strong/30">نمونه</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {faDateTime(a.updatedAt)} • {faNum(a.members.length)} عضو • نسخه قواعد {a.ruleSetVersion}
                  </div>
                </div>
                <Badge variant={a.status === "draft" ? "outline" : "default"} className={a.status !== "draft" ? "bg-primary" : ""}>
                  {statusLabel[a.status]}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  تکمیل {faPct(res.completeness)}
                </Badge>
                {res.status === "final" ? (
                  <Badge className="bg-teal-strong">امتیاز {faNum(res.total!)} — {res.level?.label}</Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-700 border-amber-300">غیرنهایی — جمع جزئی {faNum(res.partialSum)}</Badge>
                )}
                {a.flags.filter((f) => f.status === "open" || f.status === "confirmed").length > 0 && (
                  <Badge className="bg-destructive text-white">پرچم فعال: {faNum(a.flags.filter((f) => f.status === "open" || f.status === "confirmed").length)}</Badge>
                )}
                <div className="ms-auto flex gap-2">
                  <Button size="sm" onClick={() => { setActive(a.id); setView("wizard"); }}>ادامه پرسشنامه</Button>
                  <Button size="sm" variant="outline" onClick={() => { setActive(a.id); setView("professional"); }}>داشبورد</Button>
                  <Button size="sm" variant="ghost" aria-label="حذف پرونده" onClick={() => { if (confirm("این پیش‌نویس حذف شود؟")) remove(a.id); }}>
                    <Trash2 className="size-4 text-destructive" aria-hidden />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** دیالوگ ساده شروع (برای استفاده‌های آینده) */
export function NewAssessmentDialog() {
  const createAssessment = usePorsesh((s) => s.createAssessment);
  return (
    <Dialog>
      <DialogTrigger asChild><Button>شروع</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>پرسشنامه جدید</DialogTitle>
          <DialogDescription>اطلاعات فقط در مرورگر شما ذخیره می‌شود.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => createAssessment()}>ایجاد</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
