"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Target, Users, CalendarClock, ClipboardList, Hash, Activity, Scale,
  FileSearch, ShieldAlert, Landmark, FileBadge2, CircleCheck, CircleDashed, AlertTriangle, Info,
} from "lucide-react";
import { faNum, faScore, faDateTime } from "@/lib/mpi/format";
import { WEIGHTS, DIMENSIONS, scaleOf } from "@/lib/mpi/rules";
import { resolveIndicator } from "@/lib/mpi/engine";
import type { Assessment, IndicatorId } from "@/lib/mpi/types";
import { dimensionOf, charterTitle, charterUnitChip, charterOf } from "@/lib/mpi/charter";
import { WEB_SERVICES } from "@/lib/mpi/legacy-map";
import { cn } from "@/lib/utils";

/**
 * شناسنامه عملیاتی سنجش شاخص — دکمه و مودال
 *
 * در جاهایی که شاخص‌های MPI سنجیده می‌شوند (کارت هر شاخص در ویزارد و جدول ۳۰ شاخص
 * داشبورد حرفه‌ای)، دکمه «شناسنامه سنجش» مودالی با نُه جزء استاندارد باز می‌کند:
 * مفهوم، واحد و تجمیع، دوره زمانی، پرسش‌های واقعه‌محور، داده کمی، شواهد زمینه‌ای،
 * قواعد تعیین سطح با مصداق‌های شاهد‌محور، وضعیت شواهد، استثناها و مرز شاخص‌ها —
 * به‌علاوه سهم وب‌سرویس‌های سازمان‌های متولی با وضعیت زنده استعلام پرونده.
 */

const SERVICE_META: Record<string, { name: string; org: string }> = {};
for (const s of WEB_SERVICES) SERVICE_META[s.id] = { name: s.name.split(" — ")[0], org: s.org };

function CharterSection({
  index, icon: Icon, title, tone, children, hint,
}: {
  index: number; icon: React.ElementType; title: string; tone: string; children: React.ReactNode; hint?: string;
}) {
  return (
    <section className={cn("rounded-2xl border p-4 space-y-2.5 leading-6", tone)}>
      <h4 className="font-bold text-[13px] flex items-center gap-2">
        <span className="grid place-items-center size-7 rounded-lg bg-background/85 border shrink-0 font-mono text-[11px] text-teal-strong">{faNum(index)}</span>
        <Icon className="size-4 text-teal-strong shrink-0" aria-hidden />
        {title}
      </h4>
      {hint && <p className="text-[11.5px] text-muted-foreground leading-5">{hint}</p>}
      <div className="text-[12.5px] text-foreground/90">{children}</div>
    </section>
  );
}

function BulletList({ items, marker }: { items: string[]; marker?: "dot" | "cross" | "check" }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span
            aria-hidden
            className={cn(
              "mt-[7px] size-1.5 rounded-full shrink-0",
              marker === "cross" ? "bg-rose-400" : marker === "check" ? "bg-emerald-500" : "bg-teal-strong/70",
            )}
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function CoeffBadge({ coeff }: { coeff: string }) {
  return (
    <span className="inline-grid place-items-center rounded-lg border border-teal-strong/35 bg-teal-soft/60 px-2 py-0.5 font-mono text-[11.5px] font-bold text-teal-strong min-w-9">
      {coeff}
    </span>
  );
}

export function IndicatorCharterButton({ id, assessment }: { id: IndicatorId; assessment?: Assessment }) {
  const [open, setOpen] = useState(false);
  const dim = dimensionOf(id);
  const title = charterTitle(id);
  const unit = charterUnitChip(id);
  const five = scaleOf(id).length === 5;
  const live = assessment ? resolveIndicator(id, assessment.answers, assessment) : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="شناسنامه عملیاتی سنجش این شاخص — مفهوم، واحد، دوره، قواعد سطح و مصداق‌ها"
        aria-label={`شناسنامه عملیاتی سنجش شاخص ${id}`}
        className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] bg-card hover:border-teal-strong/50 hover:bg-teal-soft/40 transition-colors cursor-pointer select-none no-print"
      >
        <FileBadge2 className="size-3 text-teal-strong" aria-hidden /> شناسنامه سنجش
      </button>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto thin-scroll grid-cols-[minmax(0,1fr)]">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base leading-6">
            <FileBadge2 className="size-5 text-teal-strong shrink-0" aria-hidden />
            <span className="font-mono text-teal-strong">{id}</span>
            <span className="min-w-0 flex-1 basis-40 break-words">شناسنامه عملیاتی سنجش — {title}</span>
          </DialogTitle>
          <DialogDescription className="text-xs leading-5">
            نُه جزء استاندارد سنجش این شاخص: چه چیزی سنجیده می‌شود، با چه واحدی، در چه دوره‌ای، با کدام شواهد و بر چه قواعدی — همراه مصداق‌های شاهد‌محور برای یکسان‌سازی تفسیر ارزیابان.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {/* نوار ویژگی‌ها */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <Badge variant="outline" className="gap-1 font-mono">بُعد {dim} — {DIMENSIONS[dim].title}</Badge>
            <Badge variant="outline" className="gap-1">وزن {faNum(WEIGHTS[id])} از ۱۰۰۰</Badge>
            <Badge variant="outline" className={cn("gap-1", five ? "text-violet-700 border-violet-300" : "text-teal-700 border-teal-300")}>
              مقیاس {five ? "پنج‌حالته" : "سه‌حالته"}
            </Badge>
            <Badge variant="outline" className="gap-1"><Users className="size-3" aria-hidden /> واحد: {unit}</Badge>
            {live?.status === "ok" && live.coeff !== undefined && (
              <Badge variant="outline" className="gap-1 text-emerald-700 border-emerald-300">
                <CircleCheck className="size-3" aria-hidden /> ضریب فعلی پرونده: {faScore(live.coeff)} — امتیاز {faScore(WEIGHTS[id] * live.coeff)} از {faNum(WEIGHTS[id])}
              </Badge>
            )}
            {live && live.status !== "ok" && (
              <Badge variant="outline" className="gap-1 text-amber-700 border-amber-300">
                <CircleDashed className="size-3" aria-hidden /> پرونده: {live.status === "incomplete" ? "ناقص — بدون امتیاز" : "تعارض"}
              </Badge>
            )}
          </div>

          {/* ۱) مفهوم اصلی شاخص */}
          <CharterSection index={1} icon={Target} title="مفهوم اصلی شاخص — چه چیزی سنجیده می‌شود؟" tone="bg-teal-soft/40 border-teal-strong/25">
            <p>{charterOf(id).concept}</p>
            <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50/70 p-3">
              <p className="font-semibold text-[12px] text-rose-800 mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="size-3.5" aria-hidden /> خارج از دامنه این شاخص:
              </p>
              <BulletList items={charterOf(id).outOfScope} marker="cross" />
            </div>
          </CharterSection>

          {/* ۲) واحد سنجش و تجمیع */}
          <CharterSection index={2} icon={Users} title="واحد سنجش و تجمیع" tone="bg-sky-50/60 border-sky-200">
            <p><b>واحد سنجش:</b> {charterOf(id).unit}</p>
            <p><b>تجمیع به سطح خانوار:</b> {charterOf(id).aggregation}</p>
          </CharterSection>

          {/* ۳) دوره زمانی */}
          <CharterSection index={3} icon={CalendarClock} title="دوره زمانی" tone="bg-amber-50/60 border-amber-200">
            <p>{charterOf(id).period}</p>
          </CharterSection>

          {/* ۴) پرسش‌های واقعه‌محور */}
          <CharterSection
            index={4}
            icon={ClipboardList}
            title="پرسش‌های واقعه‌محور — رخداد، تداوم، فراوانی و پیامد"
            tone="bg-card border-border"
            hint={charterOf(id).questionIds.length === 0
              ? "این شاخص پرسش جداگانه در ویزارد ندارد و از پروفایل اعضا/داده‌های پایه (گام اطلاعات پایه) محاسبه می‌شود."
              : undefined}
          >
            <BulletList items={charterOf(id).eventQuestions} />
            {charterOf(id).questionIds.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {charterOf(id).questionIds.map((q) => (
                  <span key={q} className="rounded-md bg-muted border px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground">{q}</span>
                ))}
              </div>
            )}
          </CharterSection>

          {/* ۵) داده‌های کمی */}
          <CharterSection index={5} icon={Hash} title="داده‌های کمی" tone="bg-card border-border">
            <BulletList items={charterOf(id).quantitative} />
          </CharterSection>

          {/* ۶) شواهد زمینه‌ای و عملکردی */}
          <CharterSection index={6} icon={Activity} title="شواهد زمینه‌ای و عملکردی — اثر واقعی بر زندگی" tone="bg-card border-border">
            <BulletList items={charterOf(id).contextualEvidence} />
          </CharterSection>

          {/* ۷) قواعد تعیین سطح + مصداق‌های شاهد‌محور */}
          <CharterSection
            index={7}
            icon={Scale}
            title="قواعد تعیین سطح و لنگرهای مصداقی"
            tone="bg-teal-soft/30 border-teal-strong/25"
            hint="قاعده هر ضریب با «و»/«یا» مشخص است؛ مصداق‌ها شاهد عینی برای یکسان‌سازی تفسیر ارزیابان‌اند، نه قاعده امتیاز جدید."
          >
            <div className="rounded-xl border overflow-x-auto thin-scroll bg-card/70">
              <table className="w-full text-[12px] leading-5 min-w-[560px]">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="px-2.5 py-2 text-start font-semibold w-16">ضریب</th>
                    <th className="px-2.5 py-2 text-start font-semibold">قاعده احراز</th>
                    <th className="px-2.5 py-2 text-start font-semibold">مصداق / شاهد مثال</th>
                  </tr>
                </thead>
                <tbody>
                  {charterOf(id).levelRules.map((r) => (
                    <tr key={r.coeff} className="border-t align-top">
                      <td className="px-2.5 py-2"><CoeffBadge coeff={r.coeff} /></td>
                      <td className="px-2.5 py-2">{r.rule}</td>
                      <td className="px-2.5 py-2 text-muted-foreground">
                        {charterOf(id).anchors.find((a) => a.coeff === r.coeff)?.example ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 text-[12px] text-amber-900 leading-5">
              <b>تقدم قواعد:</b> {charterOf(id).precedence}
            </p>
            {charterOf(id).pendingApproval && (
              <p className="mt-1.5 rounded-xl border border-amber-300 bg-amber-50 p-2.5 text-[11.5px] text-amber-800 leading-5 flex gap-1.5">
                <AlertTriangle className="size-3.5 shrink-0 mt-0.5" aria-hidden />
                نیازمند تصویب مرجع: {charterOf(id).pendingApproval}
              </p>
            )}
          </CharterSection>

          {/* ۸) وضعیت شواهد */}
          <CharterSection index={8} icon={FileSearch} title="وضعیت شواهد — منبع، کفایت، تعارض و تأیید" tone="bg-card border-border">
            <BulletList items={charterOf(id).evidenceStatus} />
          </CharterSection>

          {/* ۹) استثناها و مرز شاخص */}
          <CharterSection index={9} icon={ShieldAlert} title="موارد استثنایی و مرز شاخص‌ها" tone="bg-rose-50/60 border-rose-200">
            <BulletList items={charterOf(id).exceptions} marker="cross" />
          </CharterSection>

          {/* + وب‌سرویس‌های متولی */}
          <CharterSection
            index={10}
            icon={Landmark}
            title="سهم وب‌سرویس‌های سازمان‌های متولی"
            tone="bg-sky-50/60 border-sky-200"
            hint="داده مراجع ثبتی بالاترین تقدم را دارد، «ملاک» است و در فرم غربالگری قابل ویرایش نیست؛ پیش‌تکمیل تأیید خودکار شرایط جاری نیست."
          >
            {charterOf(id).serviceInputs.length === 0 ? (
              <p className="flex gap-1.5 text-muted-foreground">
                <Info className="size-3.5 shrink-0 mt-0.5" aria-hidden />
                این شاخص از استعلام ثبتی مستقیم تغذیه نمی‌شود — ملاک: خوداظهاری ساختاریافته + مدارک معتبر + مشاهده مددکار (تقدم منابع سطح ۲ تا ۵).
              </p>
            ) : (
              <div className="space-y-2">
                {charterOf(id).serviceInputs.map((s) => {
                  const meta = SERVICE_META[s.serviceId];
                  const ws = assessment?.webServices?.[s.serviceId];
                  return (
                    <div key={s.serviceId} className="rounded-xl border bg-card/80 p-3 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[12px]">{meta?.name ?? s.serviceId}</span>
                        <span className="text-[11px] text-muted-foreground">{meta?.org}</span>
                        {ws ? (
                          <Badge variant="outline" className={cn(
                            "gap-1 text-[10px]",
                            ws.status === "ok" ? "text-emerald-700 border-emerald-300" : ws.status === "partial" ? "text-amber-700 border-amber-300" : "text-red-700 border-red-300",
                          )}>
                            {ws.status === "ok" ? <CircleCheck className="size-3" aria-hidden /> : <AlertTriangle className="size-3" aria-hidden />}
                            {ws.status === "ok" ? "واکشی شد — ملاک" : ws.status === "partial" ? "دریافت جزئی" : "ناموفق"}
                            <span className="text-muted-foreground">· {faDateTime(ws.fetchedAt)}</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1 text-[10px] text-muted-foreground">
                            <CircleDashed className="size-3" aria-hidden /> استعلام نشده — از گام اطلاعات پایه یا ثبت‌نام
                          </Badge>
                        )}
                      </div>
                      <p className="text-[12px] leading-5">{s.contribution}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CharterSection>
        </div>
      </DialogContent>
    </Dialog>
  );
}

