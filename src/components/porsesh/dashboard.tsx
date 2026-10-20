"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { computeAssessment, autoQualityIssues, suggestFlags } from "@/lib/mpi/engine";
import { FLAG_DEFS, LEVEL_LABELS_PENDING_APPROVAL, PENDING_APPROVALS, REFERRAL_PATHS, TOTAL_CAP } from "@/lib/mpi/rules";
import type { Assessment, IndicatorId, ReferralStatus } from "@/lib/mpi/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlagsDialog, FlagsList } from "@/components/porsesh/flags";
import { answerLabel } from "@/components/porsesh/fields";
import { QUESTION_GROUPS } from "@/lib/mpi/questions";
import { faNum, faPct, faScore, faDateTime, nowIso, uid } from "@/lib/mpi/format";
import { canViewSensitive } from "@/lib/mpi/selftest";
import {
  AlertTriangle, BarChart3, CircleCheck, CircleDashed, ClipboardCheck, Download, FileWarning,
  Gauge, Handshake, History, ListChecks, Pencil, Printer, ShieldAlert, ClipboardPen,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* ---------------- کارت نتیجه (خلاصه غربالگری) ---------------- */

export function ResultCard({ assessment, compact = false }: { assessment: Assessment; compact?: boolean }) {
  const res = useMemo(() => computeAssessment(assessment), [assessment]);
  const levelColor = ["", "bg-emerald-600", "bg-lime-600", "bg-amber-500", "bg-orange-600", "bg-red-600"][res.level?.index ?? 0] ?? "bg-slate-400";

  return (
    <div className="space-y-4">
      <div className={cn("rounded-2xl border p-5", res.status === "final" ? "bg-card" : "bg-amber-50/60 border-amber-200")}>
        <div className="flex flex-wrap items-center gap-3">
          <Gauge className={cn("size-6", res.status === "final" ? "text-teal-strong" : "text-amber-600")} aria-hidden />
          <h3 className="font-bold text-lg">خلاصه غربالگری EM-MPI خانوار</h3>
          <Badge className={res.status === "final" ? "bg-teal-strong" : "bg-amber-500 text-white"}>
            {res.status === "final" ? "نتیجه نهایی" : "غیرنهایی / نیازمند بررسی"}
          </Badge>
          <span className="text-xs text-muted-foreground ms-auto">تکمیل داده: {faPct(res.completeness)} ({faNum(res.finalizedCount)} از {faNum(res.indicators.length)} شاخص)</span>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3 items-center">
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">{res.status === "final" ? "امتیاز کل (از ۱۰۰۰)" : "جمع جزئی شاخص‌های تکمیل‌شده"}</div>
            <div className="text-4xl font-bold" dir="ltr">{faScore(res.status === "final" ? res.total : res.partialSum)}</div>
            {res.status !== "final" && (
              <p className="text-[11px] text-amber-700 mt-1 leading-4">جمع جزئی معیار سطح نهایی نیست؛ داده ناقص صفر یا یک امتیاز نمی‌گیرد.</p>
            )}
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">سطح اولیه محرومیت</div>
            {res.level ? (
              <>
                <div className={cn("inline-grid place-items-center w-12 h-12 rounded-full text-white text-xl font-bold", levelColor)}>{faNum(res.level.index)}</div>
                <div className="text-sm font-semibold mt-1.5">{res.level.label}</div>
                {LEVEL_LABELS_PENDING_APPROVAL && <div className="text-[11px] text-muted-foreground mt-0.5">برچسب سطوح پیشنهادی — نیازمند تأیید مرجع</div>}
              </>
            ) : (
              <div className="text-sm text-muted-foreground py-3">با تکمیل همه ۳۰ شاخص، سطح تعیین می‌شود.</div>
            )}
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">وضعیت تصمیم</div>
            <p className="text-sm leading-6 text-start">
              EM-MPI ابزار غربالگری و سطح‌بندی اولیه است؛ نه ابزار پذیرش، رد یا تعیین میزان حمایت. هیچ خروجی الگوریتمی به‌تنهایی تصمیم نهایی نیست.
            </p>
          </div>
        </div>
      </div>

      {/* ابعاد — مقایسه بر اساس درصد به دلیل تفاوت سقف */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <BarChart3 className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">پنج بُعد — درصد محرومیت نسبت به سقف هر بُعد</h4>
        </div>
        <div className="space-y-3">
          {res.dimensions.map((d) => (
            <div key={d.id}>
              <div className="flex flex-wrap items-baseline gap-2 text-sm mb-1">
                <span className="font-medium">{d.title}</span>
                <Badge variant="outline" className="font-mono">{d.id}</Badge>
                <span className="text-muted-foreground text-xs">امتیاز {faScore(d.score)} از سقف {faNum(d.cap)}</span>
                {!d.complete && <Badge variant="outline" className="text-amber-700 border-amber-300 text-[11px]">ناقص</Badge>}
                <span className="ms-auto font-semibold">{faPct(d.pct)}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden" role="img" aria-label={`${d.title}: ${faPct(d.pct)}`}>
                <div
                  className={cn("h-full rounded-full transition-all", d.pct >= 60 ? "bg-red-500" : d.pct >= 30 ? "bg-amber-500" : "bg-teal-strong")}
                  style={{ width: `${Math.min(100, d.pct)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!compact && <IndicatorTable assessment={assessment} />}
    </div>
  );
}

/* ---------------- جدول شاخص‌ها ---------------- */

function IndicatorTable({ assessment }: { assessment: Assessment }) {
  const res = useMemo(() => computeAssessment(assessment), [assessment]);
  const [open, setOpen] = useState<IndicatorId | null>(null);

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-2 mb-3.5">
        <ListChecks className="size-5 text-teal-strong" aria-hidden />
        <h4 className="font-semibold">۳۰ شاخص — وزن، ضریب شدت، امتیاز و مبنا</h4>
      </div>
      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-start text-xs text-muted-foreground border-b">
              <th className="py-2 px-2 text-start">شاخص</th>
              <th className="py-2 px-2 text-start">بُعد</th>
              <th className="py-2 px-2 text-center">وزن</th>
              <th className="py-2 px-2 text-center">ضریب</th>
              <th className="py-2 px-2 text-center">امتیاز</th>
              <th className="py-2 px-2 text-center">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {res.indicators.map((i) => (
              <tr key={i.id} className="border-b last:border-0">
                <td className="py-2 px-2">
                  <button className="hover:underline text-start font-medium" onClick={() => setOpen(open === i.id ? null : i.id)} aria-expanded={open === i.id}>
                    {i.id} — {INDICATOR_NAME[i.id]}
                  </button>
                  {open === i.id && (
                    <div className="mt-1.5 text-xs text-muted-foreground leading-5 rounded-lg bg-muted/50 p-2.5 max-w-md">
                      {i.basis}
                      {i.pendingApproval && <span className="block mt-1 text-amber-700">آستانه این شاخص «نیازمند تصویب» است.</span>}
                    </div>
                  )}
                </td>
                <td className="py-2 px-2"><Badge variant="outline" className="font-mono">{i.dimension}</Badge></td>
                <td className="py-2 px-2 text-center font-mono">{faNum(i.weight)}</td>
                <td className="py-2 px-2 text-center font-mono">{i.coeff !== undefined ? faScore(i.coeff) : "—"}</td>
                <td className="py-2 px-2 text-center font-mono">{i.score !== undefined ? faScore(i.score) : "—"}</td>
                <td className="py-2 px-2 text-center">
                  {i.status === "ok" ? (
                    <Badge variant="outline" className="text-emerald-700 border-emerald-300 gap-1"><CircleCheck className="size-3" aria-hidden /> محاسبه‌شده</Badge>
                  ) : i.status === "incomplete" ? (
                    <Badge variant="outline" className="text-amber-700 border-amber-300 gap-1"><CircleDashed className="size-3" aria-hidden /> ناقص</Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-700 border-red-300">تناقض</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const INDICATOR_NAME: Record<IndicatorId, string> = {
  A1: "بیماری مزمن یا جدی", A2: "محدودیت عملکردی", A3: "درمان ضروری انجام‌نشده", A4: "فشار هزینه درمان", A5: "پوشش بیمه‌ای مؤثر", A6: "ناامنی غذایی", A7: "سلامت روان و ایمنی",
  B1: "آموزش اجباری", B2: "خطر ترک تحصیل", B3: "سواد کارکردی", B4: "مانع دسترسی آموزش", B5: "ابزار دیجیتال", B6: "نیاز آموزشی ویژه", B7: "توانمندسازی",
  C1: "بی‌خانمانی/تهدید سکونت", C2: "ایمنی مسکن", C3: "پایداری حق سکونت", C4: "تراکم و فضای خواب", C5: "آب/برق/انرژی", C6: "بهداشت مسکن", C7: "وسایل ضروری", C8: "فشار هزینه مسکن", C9: "دسترسی خدمات پایه",
  D1: "اشتغال تأمین‌کننده", D2: "بیکاری سایر اعضا", D3: "کفایت منابع",
  E1: "چشم‌انداز معیشت", E2: "بار مراقبت", E3: "پشتوانه بحران", E4: "مانع اداری/حقوقی",
};

/* ---------------- پانل کیفیت داده ---------------- */

export function QualityPanel({ assessment, editable = true }: { assessment: Assessment; editable?: boolean }) {
  const addIssue = usePorsesh((s) => s.addIssue);
  const resolveIssue = usePorsesh((s) => s.resolveIssue);
  const auto = useMemo(() => autoQualityIssues(assessment), [assessment]);
  const manual = assessment.qualityIssues.filter((i) => i.type === "manual" || i.status === "resolved");
  const autoKeys = new Set(auto.map((a) => a.description));

  const registerAll = () => {
    for (const a of auto) {
      if (!assessment.qualityIssues.some((i) => i.description === a.description && i.status === "open")) {
        addIssue(assessment.id, { ...a });
      }
    }
    toast({ title: "مسائل کیفیت داده در پرونده ثبت شد" });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <FileWarning className="size-5 text-amber-600" aria-hidden />
          <h4 className="font-semibold">مسائل شناسایی‌شده خودکار ({faNum(auto.length)})</h4>
          {auto.length > 0 && editable && (
            <Button size="sm" variant="outline" onClick={registerAll} className="ms-auto">ثبت همه در پرونده</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-5 mb-3">
          پاسخ‌های «نمی‌دانم / مایل به پاسخ نیستم / نیازمند بررسی» به امتیاز خودکار تبدیل نمی‌شوند؛ به‌صورت مسئله کیفیت داده ثبت و پیگیری می‌شوند.
        </p>
        {auto.length === 0 ? (
          <p className="text-sm text-emerald-700 flex items-center gap-1.5"><CircleCheck className="size-4" aria-hidden /> تناقض یا پاسخ خاصی یافت نشد.</p>
        ) : (
          <ul className="space-y-2">
            {auto.map((i, idx) => (
              <li key={idx} className="text-sm rounded-lg border bg-amber-50/50 border-amber-200 px-3 py-2 leading-6 flex items-start gap-2">
                <AlertTriangle className="size-4 mt-1 shrink-0 text-amber-600" aria-hidden />
                <span>{i.description}</span>
                {i.scope && <Badge variant="outline" className="font-mono ms-auto shrink-0">{String(i.scope).toUpperCase()}</Badge>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {manual.length > 0 && (
        <div className="rounded-2xl border bg-card p-5">
          <h4 className="font-semibold mb-3">مسائل ثبت‌شده پرونده ({faNum(manual.length)})</h4>
          <ul className="space-y-2">
            {manual.map((i) => (
              <li key={i.id} className={cn("text-sm rounded-lg border px-3 py-2.5 leading-6", i.status === "open" ? "bg-card" : "bg-muted/40")}>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={i.status === "open" ? "destructive" : "secondary"}>{i.status === "open" ? "باز" : "حل‌شده"}</Badge>
                  {i.type === "manual" && <Badge variant="outline">دستی</Badge>}
                  <span>{i.description}</span>
                  <span className="text-xs text-muted-foreground ms-auto">{faDateTime(i.createdAt)}</span>
                </div>
                {i.status === "open" && editable && (
                  <ResolveInline onResolve={(res) => resolveIssue(assessment.id, i.id, res)} />
                )}
                {i.resolution && <p className="text-xs text-emerald-700 mt-1">راه‌حل: {i.resolution}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* پیشنهاد پرچم‌های خودکار */}
      <AutoFlagsPanel assessment={assessment} />
    </div>
  );
}

function ResolveInline({ onResolve }: { onResolve: (r: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2 mt-2">
      <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="راه‌حل / توضیح بررسی ..." className="max-w-md" />
      <Button size="sm" variant="outline" onClick={() => { if (val.trim()) { onResolve(val); setVal(""); } }}>ثبت حل</Button>
    </div>
  );
}

function AutoFlagsPanel({ assessment }: { assessment: Assessment }) {
  const addFlag = usePorsesh((s) => s.addFlag);
  const flags = useMemo(() => suggestFlags(assessment), [assessment]);
  const existing = new Set(assessment.flags.map((f) => f.code));
  const pending = flags.filter((f) => !existing.has(f.code));

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="size-5 text-destructive" aria-hidden />
        <h4 className="font-semibold">نشانه‌های خطر پیشنهادی از پاسخ‌ها ({faNum(pending.length)})</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-5 mb-3">
        پرچم قرمز امتیاز افزایشی ندارد. پیشنهاد سیستم باید با تأیید تخصصی (گردش کار انسانی) معتبر شود.
      </p>
      {pending.length === 0 ? (
        <p className="text-sm text-emerald-700 flex items-center gap-1.5"><CircleCheck className="size-4" aria-hidden /> نشانه خطر جدیدی از پاسخ‌ها استخراج نشد یا همه ثبت شده‌اند.</p>
      ) : (
        <ul className="space-y-2">
          {pending.map((f, idx) => (
            <li key={idx} className="flex flex-wrap items-center gap-2 text-sm rounded-lg border border-red-200 bg-red-50/40 px-3 py-2">
              <Badge className="bg-destructive text-white">{f.code}</Badge>
              <span className="font-medium">{f.title}</span>
              <span className="text-xs text-muted-foreground">{f.detail}</span>
              <Button size="sm" variant="outline" className="ms-auto" onClick={() => addFlag(assessment.id, { code: f.code, detail: f.detail, source: "پیشنهاد سیستم", suggested: true })}>
                ثبت و ارجاع برای تأیید تخصصی
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------------- پانل ارجاع ---------------- */

const REF_STATUS: Record<ReferralStatus, string> = {
  draft: "پیش‌نویس", sent: "ارسال‌شده", accepted: "پذیرش مسئولیت", rejected: "برگشتی", in_progress: "در جریان خدمت", closed: "نتیجه نهایی",
};

export function ReferralPanel({ assessment }: { assessment: Assessment }) {
  const addReferral = usePorsesh((s) => s.addReferral);
  const updateReferral = usePorsesh((s) => s.updateReferral);
  const [path, setPath] = useState<string>(REFERRAL_PATHS[3].id);
  const [dest, setDest] = useState("");
  const [priority, setPriority] = useState<"normal" | "priority" | "fast" | "immediate">("normal");
  const [reason, setReason] = useState("");

  const create = () => {
    if (!dest.trim()) {
      toast({ title: "مقصد ارجاع را وارد کنید", variant: "destructive" });
      return;
    }
    addReferral(assessment.id, { path, destination: dest, priority, reason: reason || undefined });
    setDest(""); setReason("");
    toast({ title: "ارجاع ثبت شد", description: "تا پذیرش مسئولیت مقصد، مالکیت حرفه‌ای نزد مددکار فعلی حفظ می‌شود." });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Handshake className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">ثبت ارجاع</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-5 mb-3">
          ارجاع فقط به CDI محدود نیست. همیار/مرکز بر اساس تخصص، جغرافیا، ظرفیت، فوریت و مجوز دسترسی پیشنهاد می‌شود؛ همیار جایگزین تصمیم تخصصی مددکار نیست.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="r-path">مسیر خروجی</Label>
            <Select value={path} onValueChange={setPath}>
              <SelectTrigger id="r-path"><SelectValue /></SelectTrigger>
              <SelectContent>{REFERRAL_PATHS.map((p) => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-prio">اولویت</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger id="r-prio"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">عادی</SelectItem>
                <SelectItem value="priority">اولویت‌دار</SelectItem>
                <SelectItem value="fast">سریع و چندبخشی</SelectItem>
                <SelectItem value="immediate">فوری (مستقل از امتیاز)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-dest">مقصد</Label>
            <Input id="r-dest" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="مرکز/واحد/مددکار مقصد ..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-reason">دلیل پیشنهاد</Label>
            <Input id="r-reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="بر اساس فوریت، تخصص، ظرفیت ..." />
          </div>
        </div>
        <Button onClick={create} className="mt-3.5">ثبت ارجاع</Button>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h4 className="font-semibold mb-3">ارجاع‌های پرونده ({faNum(assessment.referrals.length)})</h4>
        {assessment.referrals.length === 0 ? (
          <p className="text-sm text-muted-foreground">ارجاعی ثبت نشده است.</p>
        ) : (
          <ul className="space-y-2.5">
            {assessment.referrals.map((r) => {
              const pathLabel = REFERRAL_PATHS.find((p) => p.id === r.path)?.label ?? r.path;
              return (
                <li key={r.id} className="rounded-xl border p-3.5 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge className="bg-primary">{pathLabel}</Badge>
                    <Badge variant="outline">{REF_STATUS[r.status]}</Badge>
                    {r.priority === "immediate" && <Badge className="bg-destructive text-white">فوری</Badge>}
                    <span className="font-medium">→ {r.destination}</span>
                    <span className="text-xs text-muted-foreground ms-auto">{faDateTime(r.createdAt)}</span>
                  </div>
                  {r.reason && <p className="text-xs text-muted-foreground">دلیل: {r.reason}</p>}
                  <div className="flex flex-wrap gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => updateReferral(assessment.id, r.id, { status: "accepted", ownershipAccepted: true, acceptedAt: nowIso() })} disabled={r.status === "accepted" || r.status === "closed"}>
                      پذیرش مسئولیت مقصد
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateReferral(assessment.id, r.id, { status: "in_progress" })}>در جریان خدمت</Button>
                    <Button size="sm" variant="outline" onClick={() => updateReferral(assessment.id, r.id, { status: "rejected", outcome: "برگشت — نیازمند بررسی" })}>برگشت</Button>
                    <Button size="sm" variant="outline" onClick={() => updateReferral(assessment.id, r.id, { status: "closed", outcome: r.outcome || "خدمت ارائه شد", closedAt: nowIso() })}>ثبت نتیجه نهایی</Button>
                  </div>
                  {r.ownershipAccepted && <p className="text-xs text-emerald-700">مسئولیت در مقصد پذیرفته شد{r.acceptedAt ? ` (${faDateTime(r.acceptedAt)})` : ""}.</p>}
                  {r.outcome && <p className="text-xs text-muted-foreground">نتیجه: {r.outcome}</p>}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------------- پانل بررسی حرفه‌ای ---------------- */

export function ReviewPanel({ assessment }: { assessment: Assessment }) {
  const addReview = usePorsesh((s) => s.addReview);
  const correctData = usePorsesh((s) => s.correctData);
  const res = useMemo(() => computeAssessment(assessment), [assessment]);
  const mode = usePorsesh((s) => s.mode);
  const canSeeSensitive = canViewSensitive("caseworker");

  const [note, setNote] = useState("");
  const [decision, setDecision] = useState<"data_confirmed" | "field_review" | "correction" | "referred" | "other">("data_confirmed");
  const [corKey, setCorKey] = useState("");
  const [corVal, setCorVal] = useState("");
  const [corReason, setCorReason] = useState("");

  const answerableKeys = useMemo(() => {
    const keys: string[] = [];
    for (const g of QUESTION_GROUPS) for (const q of g.questions) {
      if (q.type === "single" && q.options) keys.push(q.id);
    }
    return keys;
  }, []);

  return (
    <div className="space-y-4">
      {!canSeeSensitive && mode !== "pro" && (
        <p className="text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          نمای فعلی خانوار است؛ جزئیات حساس (مانند A7) در این نمای نمایش داده نمی‌شود.
        </p>
      )}

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardPen className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">نظر و تصمیم مددکار</h4>
        </div>
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="rv-note">یادداشت حرفه‌ای</Label>
            <Textarea id="rv-note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="جمع‌بندی بازبینی انسانی، شواهد میدانی و توصیه ..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rv-decision">تصمیم</Label>
            <Select value={decision} onValueChange={(v) => setDecision(v as typeof decision)}>
              <SelectTrigger id="rv-decision"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="data_confirmed">تأیید داده‌های فعلی</SelectItem>
                <SelectItem value="field_review">نیازمند بررسی میدانی تکمیلی</SelectItem>
                <SelectItem value="correction">اصلاح داده با دلیل و مدرک</SelectItem>
                <SelectItem value="referred">ارجاع انجام شد</SelectItem>
                <SelectItem value="other">سایر</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => { addReview(assessment.id, { by: "مددکار (نمونه)", role: "مددکار خانواده", note, decision }); setNote(""); toast({ title: "بررسی حرفه‌ای ثبت شد" }); }}>
            ثبت بررسی
          </Button>
        </div>
        {assessment.reviews.length > 0 && (
          <ul className="mt-4 space-y-2">
            {assessment.reviews.map((r) => (
              <li key={r.id} className="text-sm rounded-lg border bg-muted/30 p-3 leading-6">
                <span className="font-medium">{r.by}</span> — {faDateTime(r.at)} — <Badge variant="secondary">{r.decision}</Badge>
                {r.note && <p className="mt-1">{r.note}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Pencil className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">اصلاح مستند داده (مددکار)</h4>
        </div>
        <p className="text-xs text-muted-foreground leading-5 mb-3">
          تغییر دستی مستقیم امتیاز یا وزن مجاز نیست؛ اصلاح داده با دلیل و مدرک انجام می‌شود و موتور قواعد امتیاز را دوباره محاسبه و نسخه را ثبت می‌کند.
        </p>
        <div className="grid gap-3">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cor-key">پرسش/کلید داده</Label>
              <Select value={corKey || "none"} onValueChange={setCorKey}>
                <SelectTrigger id="cor-key"><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="none">— انتخاب کنید —</SelectItem>
                  {answerableKeys.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cor-val">مقدار جدید (کد گزینه)</Label>
              <Input id="cor-val" dir="ltr" value={corVal} onChange={(e) => setCorVal(e.target.value)} placeholder="مثلاً adequate" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cor-reason">دلیل و مدرک</Label>
              <Input id="cor-reason" value={corReason} onChange={(e) => setCorReason(e.target.value)} placeholder="مثلاً استعلام میدانی ۱۴۰۴/۰۷" />
            </div>
          </div>
          <Button variant="outline" onClick={() => {
            if (!corKey || corKey === "none" || !corVal || !corReason) {
              toast({ title: "کلید، مقدار جدید و دلیل الزامی است", variant: "destructive" });
              return;
            }
            correctData(assessment.id, "مددکار (نمونه)", { answerKey: corKey, newValue: corVal, reason: corReason });
            setCorKey(""); setCorVal(""); setCorReason("");
            toast({ title: "اصلاح ثبت شد و امتیاز مجدداً محاسبه شد" });
          }}>
            ثبت اصلاح مستند
          </Button>
          {assessment.corrections.length > 0 && (
            <ul className="space-y-2">
              {assessment.corrections.map((c) => (
                <li key={c.id} className="text-xs rounded-lg border bg-muted/30 p-3 leading-5" dir="rtl">
                  <span className="font-semibold">{c.by}</span> — {faDateTime(c.at)} — <span className="font-mono" dir="ltr">{c.answerKey}</span>: <span dir="ltr">{String(c.oldValue ?? "—")}</span> ← <span dir="ltr">{String(c.newValue)}</span>
                  <span className="block mt-0.5 text-muted-foreground">دلیل: {c.reason}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <ClipboardCheck className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">موارد نیازمند تأیید مرجع</h4>
        </div>
        <ul className="text-sm space-y-2 leading-6">
          {PENDING_APPROVALS.map((p, i) => (
            <li key={i} className="rounded-lg border bg-amber-50/40 border-amber-200 px-3 py-2">
              <Badge variant="outline" className="font-mono me-1.5">{p.scope}</Badge>
              {p.item}
              <span className="block text-xs text-muted-foreground mt-0.5">{p.why}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- پانل ممیزی ---------------- */

export function AuditPanel({ assessment }: { assessment: Assessment }) {
  const exportOne = usePorsesh((s) => s.exportOne);

  const download = () => {
    const blob = new Blob([exportOne(assessment.id)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const aEl = document.createElement("a");
    aEl.href = url;
    aEl.download = `${assessment.id}.json`;
    aEl.click();
    URL.revokeObjectURL(url);
    toast({ title: "پرونده صادر شد" });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <History className="size-5 text-teal-strong" aria-hidden />
          <h4 className="font-semibold">سابقه رخدادها (ممیزی) — {faNum(assessment.audit.length)} رخداد</h4>
          <div className="ms-auto flex gap-2 no-print">
            <Button size="sm" variant="outline" onClick={download}><Download className="size-3.5" aria-hidden /> خروجی JSON</Button>
            <Button size="sm" variant="outline" onClick={() => window.print()}><Printer className="size-3.5" aria-hidden /> چاپ</Button>
          </div>
        </div>
        <ol className="space-y-0">
          {[...assessment.audit].reverse().map((e, idx, arr) => (
            <li key={e.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="size-2.5 rounded-full bg-teal-strong mt-2 shrink-0" aria-hidden />
                {idx < arr.length - 1 && <span className="w-px flex-1 bg-border my-1" aria-hidden />}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium leading-6">{e.action}</p>
                <p className="text-xs text-muted-foreground leading-5">
                  {faDateTime(e.at)} • {e.actor} ({e.role}){e.detail ? ` • ${e.detail}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground mt-2">نسخه قواعد این ارزیابی: {assessment.ruleSetVersion} — تاریخ محاسبه و داده‌های مبنا در خروجی JSON حفظ می‌شود.</p>
      </div>
    </div>
  );
}

/* ---------------- داشبورد کامل نمای حرفه‌ای ---------------- */

export function ProfessionalDashboard({ assessment }: { assessment: Assessment }) {
  const flags = assessment.flags;
  const openFlags = flags.filter((f) => f.status === "open" || f.status === "reviewing" || f.status === "confirmed").length;

  return (
    <div className="space-y-5">
      <ResultCard assessment={assessment} />
      <Tabs defaultValue="flags">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="flags" className="gap-1.5">
            پرچم‌های خطر
            {openFlags > 0 && <Badge className="bg-destructive text-white h-4.5 px-1.5">{faNum(openFlags)}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="quality">کیفیت داده</TabsTrigger>
          <TabsTrigger value="referral">ارجاع و پیگیری</TabsTrigger>
          <TabsTrigger value="review">بررسی حرفه‌ای</TabsTrigger>
          <TabsTrigger value="audit">ممیزی</TabsTrigger>
        </TabsList>
        <TabsContent value="flags" className="mt-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <p className="text-xs text-muted-foreground">ثبت نشانه خطر بدون انتظار برای تکمیل فرم ممکن است؛ پرچم امتیاز افزایشی ندارد.</p>
            <FlagsDialog assessment={assessment} />
          </div>
          <FlagsList assessment={assessment} />
        </TabsContent>
        <TabsContent value="quality" className="mt-4"><QualityPanel assessment={assessment} /></TabsContent>
        <TabsContent value="referral" className="mt-4"><ReferralPanel assessment={assessment} /></TabsContent>
        <TabsContent value="review" className="mt-4"><ReviewPanel assessment={assessment} /></TabsContent>
        <TabsContent value="audit" className="mt-4"><AuditPanel assessment={assessment} /></TabsContent>
      </Tabs>
      <p className="text-xs text-muted-foreground">سقف کل: {faNum(TOTAL_CAP)} — مرز سطوح: ۰ تا کمتر از ۱۵۰ / ۱۵۰ تا کمتر از ۳۰۰ / ۳۰۰ تا کمتر از ۴۵۰ / ۴۵۰ تا کمتر از ۶۰۰ / ۶۰۰ تا ۱۰۰۰</p>
    </div>
  );
}

export { answerLabel, FLAG_DEFS };
