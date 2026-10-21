"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpenCheck, History, GitBranch, HelpCircle, Lightbulb, Lock } from "lucide-react";
import { faNum } from "@/lib/mpi/format";
import { WEIGHTS } from "@/lib/mpi/rules";
import type { IndicatorId } from "@/lib/mpi/types";
import { LEGACY_MAP, indicatorLegacyBadge, serviceFeedLabel } from "@/lib/mpi/legacy-map";
import { SECTION_GUIDE, ACTION_MIGRATION_POLICY, stepMappingRows, servicesOfIndicator } from "@/lib/mpi/section-guide";
import { cn } from "@/lib/utils";

/**
 * دکمه و مودال «راهنمای مهاجرت» — در سربرگ هر بخش پرسشنامه
 *
 * کلیک روی دکمه، فرم مودالی باز می‌کند که سه پرسش را پاسخ می‌دهد:
 *  ۱) فلسفه این بخش چیست؟
 *  ۲) ارتباطش با پرسشنامه قبلی چیست؟
 *  ۳) سیاست جابجایی و تحول به پرسشنامه جدید چیست؟ (مکانیزم انتقال داده)
 *
 * برچسب ماهیت (LegacyBadge) روی کارت شاخص‌ها خلاصه همین رابطه است؛
 * این مودال شرح کامل و جدول نگاشت همان بخش را نشان می‌دهد.
 */

const STEP_TITLES: Record<string, string> = {
  identity: "هویت، محرمانگی و واکشی از مراجع ثبتی",
  urgency: "بررسی اولیه نشانه‌های فوریت",
  base: "اطلاعات پایه و اعضای خانوار",
  health: "سلامت و امنیت زیستی (A)",
  education: "آموزش و رشد انسانی (B)",
  housing: "استاندارد زندگی و مسکن (C)",
  livelihood: "معیشت، اشتغال و درآمد (D)",
  care: "ظرفیت مراقبت و پشتوانه اجتماعی (E)",
  quality: "مدارک، کیفیت داده و موارد نیازمند بررسی",
  summary: "خلاصه غربالگری، بازبینی انسانی و ارجاع",
};

function GuideBlock({ icon: Icon, title, tone, children }: { icon: React.ElementType; title: string; tone: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-2xl border p-4 space-y-2 leading-7", tone)}>
      <h4 className="font-bold text-sm flex items-center gap-2">
        <span className="grid place-items-center size-7 rounded-lg bg-background/80 border shrink-0"><Icon className="size-4" aria-hidden /></span>
        {title}
      </h4>
      <div className="text-[13px] text-foreground/90">{children}</div>
    </section>
  );
}

/* ============ مودال راهنمای یک بخش (گام) ============ */

export function SectionGuideDialog({ stepKey, trigger }: { stepKey: string; trigger?: React.ReactNode }) {
  const g = SECTION_GUIDE[stepKey];
  const rows = stepMappingRows(stepKey);
  const scored = rows.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs min-h-8 no-print">
            <BookOpenCheck className="size-4 text-teal-strong" aria-hidden /> راهنمای بخش
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base leading-6">
            <BookOpenCheck className="size-5 text-teal-strong shrink-0" aria-hidden />
            راهنمای مهاجرت — {STEP_TITLES[stepKey] ?? stepKey}
          </DialogTitle>
          <DialogDescription className="text-xs leading-5">
            فلسفه این بخش، ارتباطش با پرسشنامه قبلی و سیاست جابجایی و تحول به نسخه جدید — برچسب ماهیت روی هر کارت شاخص، خلاصه همین راهنماست.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* ۱) فلسفه */}
          <GuideBlock icon={Lightbulb} title="۱) فلسفه این بخش چیست؟" tone="bg-teal-soft/40 border-teal-strong/25">
            <p>{g.philosophy}</p>
            <ul className="list-disc ps-5 space-y-1 text-[12.5px] text-muted-foreground mt-1.5">
              {g.philosophyPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </GuideBlock>

          {/* ۲) ارتباط با پرسشنامه قبلی */}
          <GuideBlock icon={History} title="۲) ارتباط با پرسشنامه قبلی" tone="bg-amber-50/60 border-amber-200">
            <p>{g.legacyRelation}</p>
          </GuideBlock>

          {/* جدول نگاشت شاخص‌های این بخش (گام‌های امتیازی) */}
          {scored && (
            <section className="rounded-2xl border p-4 space-y-2.5 bg-card">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <span className="grid place-items-center size-7 rounded-lg bg-muted shrink-0"><History className="size-4" aria-hidden /></span>
                نگاشت شاخص‌های این بخش به فیلدهای نسخه قبلی
              </h4>
              <div className="rounded-xl border overflow-x-auto thin-scroll">
                <table className="w-full text-[12px] leading-5 min-w-[520px]">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-2.5 py-2 text-start font-semibold w-14">شاخص</th>
                      <th className="px-2.5 py-2 text-start font-semibold">عنوان</th>
                      <th className="px-2.5 py-2 text-start font-semibold w-20">اقدام</th>
                      <th className="px-2.5 py-2 text-start font-semibold">منبع قبلی</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const meta = LEGACY_MAP[r.id];
                      const lg = indicatorLegacyBadge(r.id);
                      return (
                        <tr key={r.id} className="border-t align-top">
                          <td className="px-2.5 py-2 font-mono font-bold text-teal-strong">{r.id}</td>
                          <td className="px-2.5 py-2">
                            {r.title}
                            <span className="text-muted-foreground text-[11px]"> — وزن {faNum(WEIGHTS[r.id])}</span>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-4">{r.note}</p>
                          </td>
                          <td className="px-2.5 py-2"><span className={cn("inline-block rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap", lg.className)}>{lg.short}</span></td>
                          <td className="px-2.5 py-2 text-muted-foreground text-[11.5px]">
                            <ul className="space-y-1">{meta.old.map((o, i) => <li key={i}>{o}</li>)}</ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ۳) سیاست مهاجرت و مکانیزم */}
          <GuideBlock icon={GitBranch} title="۳) سیاست جابجایی و تحول به پرسشنامه جدید" tone="bg-sky-50/60 border-sky-200">
            <p>{g.migrationPolicy}</p>
            <ol className="list-decimal ps-5 space-y-1.5 text-[12.5px] text-muted-foreground mt-2">
              {g.migrationMechanism.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </GuideBlock>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ============ مودال راهنمای یک شاخص (کنار برچسب ماهیت) ============ */

export function IndicatorGuideButton({ id }: { id: IndicatorId }) {
  const [open, setOpen] = useState(false);
  const m = LEGACY_MAP[id];
  const lg = indicatorLegacyBadge(id);
  const policy = ACTION_MIGRATION_POLICY[m.action];
  const svc = servicesOfIndicator(id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          title="راهنمای این شاخص — فلسفه، ارتباط با نسخه قبلی و سیاست مهاجرت"
          aria-label={`راهنمای مهاجرت شاخص ${id}`}
          className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] bg-card hover:border-teal-strong/50 hover:bg-teal-soft/30 transition-colors cursor-pointer select-none no-print"
        >
          <HelpCircle className="size-3 text-teal-strong" aria-hidden /> راهنما
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span className="font-mono text-teal-strong">{id}</span>
            راهنمای مهاجرت شاخص
          </DialogTitle>
          <DialogDescription className="text-xs">{lg.old ? `منبع قبلی: ${lg.old}` : undefined}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium", lg.className)}>
              <History className="size-3" aria-hidden /> ماهیت: {lg.short}
            </span>
            <Badge variant="outline" className="text-[11px]">وزن {faNum(WEIGHTS[id])} از ۱۰۰۰</Badge>
            {svc.length > 0 && (
              <Badge variant="outline" className="text-[11px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30">
                <Lock className="size-3" aria-hidden /> راستی‌آزمایی ثبتی: {svc.map((s) => s.split(" — ")[0]).join("، ")}
              </Badge>
            )}
          </div>

          <GuideBlock icon={Lightbulb} title="فلسفه سنجش این‌گونه" tone="bg-teal-soft/40 border-teal-strong/25">
            <p>{m.note}</p>
          </GuideBlock>

          <GuideBlock icon={History} title="ارتباط با پرسشنامه قبلی" tone="bg-amber-50/60 border-amber-200">
            <ul className="list-disc ps-5 space-y-1">
              {m.old.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </GuideBlock>

          <GuideBlock icon={GitBranch} title="سیاست جابجایی و تحول به نسخه جدید" tone="bg-sky-50/60 border-sky-200">
            <p>{policy}</p>
            {svc.length > 0 && (
              <p className="text-[12px] text-muted-foreground mt-1.5">پیش‌تکمیل از استعلام ثبتی با کلید کد ملی سرپرست انجام می‌شود؛ پیش‌تکمیل تأیید خودکار شرایط جاری نیست.</p>
            )}
          </GuideBlock>
        </div>
      </DialogContent>
    </Dialog>
  );
}
