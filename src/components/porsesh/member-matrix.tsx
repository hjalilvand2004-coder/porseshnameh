"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { faNum, faDateTime } from "@/lib/mpi/format";
import { indicatorLegacyBadge } from "@/lib/mpi/legacy-map";
import { WEIGHTS } from "@/lib/mpi/rules";
import type { IndicatorId, Assessment, AnswerValue, Member } from "@/lib/mpi/types";
import type { EvidenceKind, Option, QuestionGroup } from "@/lib/mpi/questions";
import { QUESTION_GROUPS } from "@/lib/mpi/questions";
import { History, Lock, ShieldCheck, Users2, Info, CheckCircle2 } from "lucide-react";
import { EvidenceRecorder } from "@/components/porsesh/fields";
import { IndicatorCharterButton } from "@/components/porsesh/charter-modal";
import { IndicatorGuideButton } from "@/components/porsesh/section-guide";

/**
 * ماتریس انتساب اعضا — رفع پرسش تکراری در پرسشنامه MPI (v0.9.1)
 *
 * مشکل پیشین: گروه‌های عضومحور (A1، A2، A3، A5، B1، B2، B6 و ...) به‌ازای هر عضو
 * یک کارت جداگانه رندر می‌کردند؛ خانوار دوعضوی ⇒ کارت A1 دوبار، سه‌عضوی ⇒ سه‌بار.
 *
 * الگوی جدید (مطابق خواسته مالک محصول): هر شاخص فقط «یک‌بار» پرسیده می‌شود؛
 *  ۱) یک پرسش سطح خانوار («آیا یکی از اعضای خانوار ...؟») — گیتِ شاخص؛
 *  ۲) با پاسخ «بله» بلافاصله ماتریس «کدام اعضا؟» باز می‌شود و وضعیت به عضو/اعضای
 *     مشخص مستند می‌گردد (تیک عضو + شدت/جزئیات همان عضو + مدرک مثبت)؛
 *  ۳) «خیر» به‌صورت خودکار برای همه اعضا ثبت می‌شود؛
 *  ۴) اقلام استعلام‌شده از وب‌سرویس (A5←بیمه، B1←آموزش‌وپرورش) جای و مقدار دارند،
 *     قفل و ملاک‌اند و نیازی به ثبت کاربر ندارند.
 *
 * مدل داده تغییر نمی‌کند: پاسخ‌ها همچنان با کلید `${qid}#${memberId}` ذخیره می‌شوند
 * تا موتور امتیازدهی، استعلام‌ها و بانک پرونده‌های نمونه بدون تغییر کار کنند.
 */

/* ---------------- پیکربندی ماتریس هر گروه عضومحور ---------------- */

interface FieldSpec {
  qid: string;
  /** برچسب کوتاه در ردیف عضو */
  label: string;
  control: "select" | "multi" | "boolean" | "number" | "text";
  /** گزینه‌های ردیف — پیش‌فرض از کاتالوگ همان پرسش؛ برای ردیف‌های تیک‌خورده گزینه «ندارد» حذف می‌شود */
  rowOptions?: Option[];
  /** سرویس متولی — مقدار قفل ملاک استعلام */
  service?: string;
  serviceOrg?: string;
  /** نمایش شرطی فیلد بر اساس مقادیر همین ردیف */
  showIf?: (row: Record<string, AnswerValue>) => boolean;
  unit?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface MatrixCfg {
  key: string;
  /** پرسش گیت سطح خانوار — فقط یک‌بار پرسیده می‌شود */
  gateId: string;
  gateTitle: string;
  gateHelp?: string;
  mode: "gated" | "always";
  /** نگاشت «ندارد» — برای تیک‌نخورده‌ها و پاسخ «خیر» */
  noneMap: Record<string, AnswerValue>;
  /** نگاشت پاسخ‌های خاص (نمی‌دانم/مایل به پاسخ نیستم) */
  specialMap?: Record<string, AnswerValue>;
  dk?: boolean;
  refuse?: boolean;
  /** فیلدهای هر عضوِ تیک‌خورده (یا همه ردیف‌ها در حالت always) */
  fields: FieldSpec[];
  /** فیلد توضیح تکمیلیِ هر عضو تیک‌خورده */
  memberDetail?: { key: string; label: string; placeholder?: string };
  /** ثبت مدرک مثبت — یک کنترل برای کل شاخص، متصل به پرسش مبدا */
  evidence?: { suggested: EvidenceKind; label: string };
  evidenceFor?: string;
  memberFilter?: "all" | "schoolAge";
  primaryQid: string;
}

const SPECIALS = ["__dontknow__", "__refuse__", "__needreview__"];

function isPositiveVal(v: AnswerValue): boolean {
  if (v === undefined || v === null || v === false || v === "none") return false;
  if (Array.isArray(v)) return v.length > 0 && !v.every((x) => x === "none");
  if (typeof v === "string") return !v.startsWith("__");
  return true; // true / عدد
}

function optionsOf(qid: string): Option[] {
  for (const g of QUESTION_GROUPS) {
    const q = g.questions.find((x) => x.id === qid);
    if (q?.options) return q.options;
  }
  return [];
}

export const MATRIX_CFG: Record<string, MatrixCfg> = {
  A1: {
    key: "A1", gateId: "A1_gate", mode: "gated", primaryQid: "A1_disease",
    gateTitle: "آیا یکی از اعضای خانوار بیماری مزمن یا جدی دارد؟",
    gateHelp: "بیماری‌هایی که بیش از ۳ ماه ادامه دارند و پیگیری درمانی مستمر می‌خواهند. با «بله»، در همان‌جا مشخص می‌کنید وضعیت به کدام اعضا مربوط است.",
    noneMap: { A1_disease: "none", A1_impact: "none" },
    specialMap: { A1_disease: "__dontknow__", A1_impact: "__dontknow__" },
    dk: true, refuse: true,
    fields: [
      { qid: "A1_disease", label: "وضعیت بیماری این عضو", control: "select", rowOptions: optionsOf("A1_disease").filter((o) => o.value !== "none") },
      { qid: "A1_impact", label: "اثر بیماری بر زندگی", control: "select" },
    ],
    memberDetail: { key: "A1_disease__detail", label: "نوع/نام بیماری و مدت آن", placeholder: "مثلاً دیابت نوع ۲ از ۴ سال پیش، صرعی از کودکی ..." },
    evidence: { suggested: "medical", label: "مدرک مثبت بیماری (گواهی پزشک، نسخه، جواب آزمایش، کتابچه بیمار)" },
    evidenceFor: "A1",
  },
  A2: {
    key: "A2", gateId: "A2_gate", mode: "gated", primaryQid: "A2_limit",
    gateTitle: "آیا یکی از اعضای خانوار محدودیت پایدار در حرکت، مراقبت شخصی، ارتباط یا یادگیری دارد؟",
    gateHelp: "محدودیتی که حداقل ۶ ماه ادامه داشته یا انتظار می‌رود ادامه یابد. با «بله»، اعضای دارای محدودیت و میزان تأمین کمک‌ها ثبت می‌شود.",
    noneMap: { A2_limit: "none" },
    specialMap: { A2_limit: "__dontknow__" },
    dk: true, refuse: true,
    fields: [
      { qid: "A2_limit", label: "وضعیت محدودیت و تأمین کمک", control: "select", rowOptions: optionsOf("A2_limit").filter((o) => o.value !== "none") },
      { qid: "A2_aid", label: "کمک/وسیله/توان‌بخشی لازم", control: "text", placeholder: "مثلاً ویلچر، گفتاردرمانی، همراه مراقب ..." },
    ],
    evidence: { suggested: "medical", label: "مدرک مثبت محدودیت (گزارش توان‌بخشی، پروانه معلولیت، گواهی پزشک)" },
    evidenceFor: "A2",
  },
  A3: {
    key: "A3", gateId: "A3_gate", mode: "gated", primaryQid: "A3_treatment",
    gateTitle: "آیا یکی از اعضای خانوار درمان، دارو، آزمایش، جراحی یا توان‌بخشیِ ضروریِ انجام‌نشده دارد؟",
    gateHelp: "با «بله»، اعضای دارای درمان انجام‌نشده و وضعیت دسترسی آن‌ها ثبت می‌شود؛ نشانه فوریت پزشکی نیز در همان ردیف گرفته می‌شود.",
    noneMap: { A3_treatment: "none", A3_urgent: false },
    specialMap: { A3_treatment: "__dontknow__" },
    dk: true, refuse: true,
    fields: [
      { qid: "A3_treatment", label: "وضعیت درمان ضروری", control: "select", rowOptions: optionsOf("A3_treatment").filter((o) => o.value !== "none") },
      { qid: "A3_urgent", label: "نشانه فوریت پزشکی (خطر تأخیر برای سلامت یا زندگی)", control: "boolean" },
      { qid: "A3_cause", label: "علت تأخیر و خطر احتمالی", control: "text", placeholder: "مثلاً هزینه، نبود پزشک متخصص در منطقه، مدارک ..." },
    ],
    evidence: { suggested: "medical", label: "مدرک مثبت (نسخه، برگه نوبت، گواهی پزشک، جواب آزمایش)" },
    evidenceFor: "A3",
  },
  A5: {
    key: "A5", gateId: "A5_gate", mode: "always", primaryQid: "A5_cover",
    gateTitle: "پوشش بیمه پایه اعضا",
    gateHelp: "پوشش هر عضو با کد ملی از استعلام بیمه به‌صورت خودکار پر و ملاک می‌شود؛ فقط اعضایی که استعلام ندارند دستی ثبت می‌شوند.",
    noneMap: {},
    fields: [
      { qid: "A5_cover", label: "پوشش بیمه پایه و امکان استفاده مؤثر", control: "select", service: "insurance", serviceOrg: "سازمان تأمین اجتماعی و صندوق‌های بیمه‌ای" },
      { qid: "A5_barrier", label: "نوع مانع استفاده (در صورت وجود مانع)", control: "text", placeholder: "مثلاً فرانشیز سنگین، فاصله تا مرکز، نوبت طولانی", showIf: (row) => row.A5_cover === "barriers" },
    ],
  },
  A_nutrition: {
    key: "A_nutrition", gateId: "A_nutrition_gate", mode: "gated", primaryQid: "A_malnut",
    gateTitle: "آیا سوءتغذیه (تشخیص‌شده یا مشکوک) یا بارداری/شیردهی با نیاز تغذیه‌ای ویژه در خانوار وجود دارد؟",
    gateHelp: "با «بله»، مشخص می‌کنید کدام عضو سوءتغذیه دارد و کدام عضو مادر باردار/شیرده با نیاز ویژه است.",
    noneMap: { A_malnut: false, A_pregnant: false },
    dk: false, refuse: false,
    fields: [
      { qid: "A_malnut", label: "سوءتغذیه دارد (تشخیص‌شده یا مشکوک)", control: "boolean" },
      { qid: "A_pregnant", label: "مادر باردار/شیرده با نیاز تغذیه/درمان ویژه", control: "boolean" },
    ],
    evidence: { suggested: "medical", label: "مدرک مثبت (کارت رشد، جواب آزمایش، گزارش مرکز بهداشت، کارت مراقبت مادر)" },
    evidenceFor: "A_nutrition",
  },
  B1: {
    key: "B1", gateId: "B1_gate", mode: "always", primaryQid: "B1_status", memberFilter: "schoolAge",
    gateTitle: "وضعیت تحصیل اعضای در سن آموزش اجباری",
    gateHelp: "وضعیت ثبت‌نام ثبتی هر عضو از استعلام آموزش‌وپرورش با کد ملی خودکار پر و ملاک می‌شود؛ مدت و علت وقفه جداگانه تکمیل می‌گردد.",
    noneMap: {},
    fields: [
      { qid: "B1_status", label: "وضعیت آموزش این عضو", control: "select", service: "education_school", serviceOrg: "وزارت آموزش‌وپرورش" },
      { qid: "B1_months", label: "مدت وقفه/ترک تحصیل (ماه)", control: "number", unit: "ماه", min: 0, max: 120, showIf: (row) => ["interrupted", "dropped", "never"].includes(String(row.B1_status)) },
      { qid: "B1_reason", label: "علت وقفه یا ترک تحصیل", control: "text", placeholder: "مثلاً هزینه، کار، مهاجرت، معلولیت ...", showIf: (row) => ["interrupted", "dropped", "never"].includes(String(row.B1_status)) },
    ],
  },
  B2: {
    key: "B2", gateId: "B2_gate", mode: "gated", primaryQid: "B2_risks", memberFilter: "schoolAge",
    gateTitle: "آیا برای اعضای در سن تحصیل، عوامل خطر ترک تحصیل وجود دارد؟",
    gateHelp: "با «بله»، عوامل خطر هر عضو (غیبت، افت، هزینه، کار کودک، مراقبت اجباری) جداگانه ثبت می‌شود.",
    noneMap: { B2_risks: ["none"] },
    dk: false, refuse: false,
    fields: [{ qid: "B2_risks", label: "عوامل خطر استمرار تحصیل این عضو", control: "multi" }],
  },
  B6: {
    key: "B6", gateId: "B6_gate", mode: "gated", primaryQid: "B6_need",
    gateTitle: "آیا یکی از اعضای خانوار نیاز آموزشی ویژه دارد؟",
    gateHelp: "با «بله»، وضعیت هر عضو (خدمت متناسب، نیازمند ارزیابی، بدون خدمت) و مدرک آن ثبت می‌شود.",
    noneMap: { B6_need: "none" },
    specialMap: { B6_need: "__dontknow__" },
    dk: true, refuse: true,
    fields: [{ qid: "B6_need", label: "وضعیت نیاز آموزشی ویژه این عضو", control: "select", rowOptions: optionsOf("B6_need").filter((o) => o.value !== "none") }],
    evidence: { suggested: "medical", label: "مدرک مثبت (گزارش ارزیابی، پرونده آموزشی/درمانی)" },
    evidenceFor: "B6",
  },
};

/* ---------------- برچسب‌های مشترک ---------------- */

export function LegacyBadge({ id }: { id: IndicatorId }) {
  const lg = indicatorLegacyBadge(id);
  return (
    <span
      title={lg.title}
      aria-label={`منبع نسخه قبلی: ${lg.old}`}
      className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] cursor-help select-none whitespace-nowrap", lg.className)}
    >
      <History className="size-3" aria-hidden /> {lg.short}
    </span>
  );
}

export function WeightBadge({ id }: { id: IndicatorId }) {
  const w = WEIGHTS[id];
  return <Badge variant="outline" className="text-[10px] whitespace-nowrap" title="وزن رسمی این شاخص در امتیاز کل ۱۰۰۰">وزن {faNum(w)}</Badge>;
}

function optLabel(opts: Option[], v: AnswerValue): string {
  return opts.find((o) => o.value === v)?.label ?? String(v ?? "—");
}

/* ---------------- کارت شاخص با ماتریس انتساب اعضا ---------------- */

export function MemberAttributionCard({ g, assessment, cfg }: { g: QuestionGroup; assessment: Assessment; cfg: MatrixCfg }) {
  const setAnswer = usePorsesh((s) => s.setAnswer);
  const setAnswersBulk = usePorsesh((s) => s.setAnswersBulk);
  const ws = assessment.webServices ?? {};
  const a = assessment.answers;
  /* تیک‌های دستی نشسته — تا تیک‌زدن بدون نوشتن داده، ردیف را باز نگه دارد (داده با پر‌کردن فیلدها ثبت می‌شود) */
  const [manualTicks, setManualTicks] = useState<Set<string>>(() => new Set());

  const members = useMemo(() => {
    if (cfg.memberFilter === "schoolAge") {
      return assessment.members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
    }
    return assessment.members;
  }, [assessment.members, cfg.memberFilter]);

  /* استنتاج گیت از داده موجود — سازگاری با پرونده‌های نمونه و داده پیش از v0.9.1 */
  const inferredGate = useMemo(() => {
    if (cfg.mode !== "gated" || members.length === 0) return undefined;
    const qids = [cfg.primaryQid, ...cfg.fields.map((f) => f.qid)];
    let anyAnswered = false;
    for (const m of members) {
      for (const qid of qids) {
        const v = a[`${qid}#${m.id}`];
        if (v === undefined) continue;
        anyAnswered = true;
        if (v === "__dontknow__") return "__dontknow__";
        if (v === "__refuse__") return "__refuse__";
        if (isPositiveVal(v)) return "yes";
      }
    }
    return anyAnswered ? "no" : undefined;
  }, [a, cfg, members]);

  const gateRaw = a[cfg.gateId];
  const gate = gateRaw !== undefined ? gateRaw : inferredGate;
  const inferred = gateRaw === undefined && gate !== undefined;

  /* ردیف‌ها — وضعیت تیک و مقادیر هر عضو */
  const rowState = (m: Member) => {
    const row: Record<string, AnswerValue> = {};
    for (const f of cfg.fields) row[f.qid] = a[`${f.qid}#${m.id}`];
    const checked = cfg.mode === "always"
      ? true
      : manualTicks.has(m.id) || cfg.fields.some((f) => isPositiveVal(row[f.qid]));
    const answered = cfg.fields.some((f) => row[f.qid] !== undefined);
    return { row, checked, answered };
  };

  const applyMapFor = (m: Member, map: Record<string, AnswerValue>) => {
    const entries: Record<string, AnswerValue> = {};
    for (const [qid, v] of Object.entries(map)) entries[`${qid}#${m.id}`] = v;
    setAnswersBulk(assessment.id, entries);
  };

  const applyGateMap = (map: Record<string, AnswerValue>, only?: Set<string>) => {
    const entries: Record<string, AnswerValue> = {};
    for (const m of members) {
      if (only && !only.has(m.id)) continue;
      for (const [qid, v] of Object.entries(map)) entries[`${qid}#${m.id}`] = v;
    }
    if (Object.keys(entries).length > 0) setAnswersBulk(assessment.id, entries);
  };

  const setGate = (v: AnswerValue) => {
    setAnswer(assessment.id, cfg.gateId, v);
    if (v === "no") applyGateMap(cfg.noneMap);
    else if (v === "__dontknow__" || v === "__refuse__") {
      if (cfg.specialMap) applyGateMap(cfg.specialMap);
    } else if (v === "yes") applyGateMap(cfg.noneMap); /* خط پایه «ندارد» برای همه — سپس اعضای دارای وضعیت تیک و ثبت می‌شوند */
  };

  /* پوشش اعضای جدید — عضوی که پس از پاسخ گیت اضافه شده است */
  const missing = members.filter((m) => cfg.fields.every((f) => a[`${f.qid}#${m.id}`] === undefined));
  const gateResolved = cfg.mode === "always" || gate !== undefined;
  const needsCoverage = gateResolved && missing.length > 0 && cfg.mode === "gated" && (gate === "no" || gate === "__dontknow__" || gate === "__refuse__");
  const needsYesCoverage = cfg.mode === "gated" && gate === "yes" && missing.length > 0;
  const needsNewMemberEntry = cfg.mode === "always" && missing.length > 0;

  const serviceLockFor = (f: FieldSpec, m: Member) => {
    if (!f.service) return undefined;
    const r = ws[f.service];
    if (!r || r.status === "error") return undefined;
    const prefill = r.prefills?.answerPrefills?.find((p) => p.key === `${f.qid}#${m.id}`);
    if (!prefill) return undefined;
    return { org: f.serviceOrg ?? "مرجع متولی", at: r.fetchedAt, label: optLabel(f.rowOptions ?? optionsOf(f.qid), prefill.value) };
  };

  const docsKey = cfg.evidenceFor ?? cfg.key;
  const schoolAgeEmpty = cfg.memberFilter === "schoolAge" && members.length === 0;

  return (
    <div className="rounded-2xl border bg-card p-4 space-y-3">
      {/* سربرگ شاخص — یک‌بار به‌ازای شاخص، نه به‌ازای هر عضو */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-2.5">
        <h3 className="font-semibold">{g.title}</h3>
        <Badge variant="outline" className="font-mono">{g.indicator}</Badge>
        <LegacyBadge id={g.indicator} />
        <IndicatorCharterButton id={g.indicator} assessment={assessment} />
        <IndicatorGuideButton id={g.indicator} />
        <WeightBadge id={g.indicator} />
        <Badge variant="outline" className="bg-teal-soft text-teal-strong border-teal-strong/30 gap-1 text-[10px]">
          <Users2 className="size-3" aria-hidden /> سطح خانوار با انتساب اعضا — بدون پرسش تکراری
        </Badge>
      </div>

      {schoolAgeEmpty ? (
        <p className="text-sm rounded-xl border bg-muted/40 p-3.5 leading-6">
          <b>{g.title}:</b> عضو در سن آموزش اجباری (۶ تا ۱۸ سال) ثبت نشده است — این شاخص به‌طور صحیح صفر محاسبه می‌شود.
        </p>
      ) : members.length === 0 ? (
        <p className="text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6">
          برای پاسخ به این شاخص، ابتدا در گام «اطلاعات پایه» اعضای خانوار را ثبت کنید.
        </p>
      ) : (
        <>
          {/* گیت سطح خانوار — فقط یک پرسش */}
          {cfg.mode === "gated" && (
            <fieldset className="rounded-xl border p-4 bg-card">
              <legend className="px-1 text-sm font-semibold">{cfg.gateTitle}</legend>
              {cfg.gateHelp && <p className="text-xs text-muted-foreground leading-5 mb-3">{cfg.gateHelp}</p>}
              {inferred && (
                <p className="text-[11px] text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Info className="size-3.5 shrink-0" aria-hidden />
                  وضعیت از داده ثبت‌شده پرونده بازخوانی شد — در صورت نیاز تغییر دهید.
                </p>
              )}
              <div role="radiogroup" aria-label={cfg.gateTitle} className="grid gap-2">
                {[
                  { v: "no", label: "خیر — هیچ عضوی ندارد" },
                  { v: "yes", label: "بله — ثبت اعضا و جزئیات" },
                  ...(cfg.dk ? [{ v: "__dontknow__", label: "نمی‌دانم" }] : []),
                  ...(cfg.refuse ? [{ v: "__refuse__", label: "مایل به پاسخ نیستم" }] : []),
                ].map((o) => {
                  const selected = gate === o.v;
                  return (
                    <button
                      key={o.v}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setGate(o.v)}
                      className={cn(
                        "text-start rounded-lg border px-3.5 py-2.5 text-sm transition-colors min-h-11 flex items-center gap-2.5",
                        selected ? "border-teal-strong bg-teal-soft font-medium" : "bg-background hover:border-ring/50",
                        o.v.startsWith("__") && !selected && "text-amber-800 border-amber-200",
                      )}
                    >
                      <span aria-hidden className={cn("size-4 rounded-full border-2 shrink-0 grid place-items-center", selected ? "border-teal-strong" : "border-muted-foreground/50")}>
                        {selected && <span className="size-2 rounded-full bg-teal-strong" />}
                      </span>
                      {o.label}
                    </button>
                  );
                })}
              </div>
              {gate === "no" && (
                <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mt-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                  «ندارد» برای همه {faNum(members.length)} عضو ثبت شد — پرسش دیگری برای این شاخص لازم نیست.
                </p>
              )}
              {(gate === "__dontknow__" || gate === "__refuse__") && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2.5">
                  پاسخ خاص برای همه اعضا ثبت شد؛ این شاخص در بازبینی انسانی و راستی‌آزمایی پیگیری می‌شود.
                </p>
              )}
            </fieldset>
          )}

          {/* ماتریس اعضا — فقط با پاسخ «بله» یا در حالت always */}
          {(cfg.mode === "always" || gate === "yes") && (
            <div className="rounded-xl border border-teal-strong/25 bg-teal-soft/30 p-3.5 space-y-3" data-matrix={cfg.key}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="grid place-items-center size-7 rounded-lg bg-teal-strong text-white shrink-0"><Users2 className="size-4" aria-hidden /></span>
                <h5 className="text-sm font-bold text-teal-strong">
                  {cfg.mode === "always" ? "وضعیت هر عضو — یک‌جا و بدون تکرار" : "کدام اعضا دارای این وضعیت هستند؟"}
                </h5>
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground whitespace-nowrap">انتساب وضعیت به عضو</span>
              </div>
              {cfg.mode === "gated" && (
                <p className="text-xs text-muted-foreground leading-5">
                  برای هر عضوِ دارای این وضعیت تیک بزنید و جزئیات همان عضو را ثبت کنید؛ اعضای بدون تیک به‌صورت «ندارد» ثبت می‌شوند.
                </p>
              )}

              <div className="space-y-2.5">
                {members.map((m) => (
                  <MemberRow
                    key={m.id}
                    m={m}
                    cfg={cfg}
                    assessment={assessment}
                    rowState={rowState(m)}
                    serviceLockFor={serviceLockFor}
                    onToggle={(on) => {
                      if (on) {
                        /* تیک‌زدن فقط ردیف را باز می‌کند؛ مقدار واقعی با پر کردن فیلدهای همان ردیف ثبت می‌شود */
                        setManualTicks((prev) => new Set(prev).add(m.id));
                      } else {
                        setManualTicks((prev) => {
                          const next = new Set(prev);
                          next.delete(m.id);
                          return next;
                        });
                        /* برداشتن تیک = ثبت «ندارد» برای همه فیلدهای این عضو */
                        applyMapFor(m, cfg.noneMap);
                      }
                    }}
                  />
                ))}
              </div>

              {cfg.mode === "gated" && members.every((m) => !rowState(m).checked) && (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  هیچ عضوی تیک نخورده است — اگر واقعاً عضوی این وضعیت را دارد تیک بزنید؛ در غیر این صورت گزینه «خیر» را انتخاب کنید.
                </p>
              )}

              {/* ثبت مدرک مثبت شاخص — متصل به پرسش مبدا */}
              {cfg.evidence && (
                <EvidenceRecorderSlot assessmentId={assessment.id} docsKey={docsKey} cfg={cfg} assessment={assessment} />
              )}
            </div>
          )}

          {/* پوشش اعضای افزوده‌شده بعد از پاسخ */}
          {needsCoverage && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 space-y-2">
              <p className="text-sm leading-6">
                {faNum(missing.length)} عضو (اعضای جدید) برای این شاخص پاسخ ثبت‌شده ندارد — برای یکپارچگی امتیازدهی، پاسخ فعلی شاخص برای آن‌ها نیز اعمال شود.
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => applyGateMap(gate === "no" ? cfg.noneMap : cfg.specialMap ?? cfg.noneMap, new Set(missing.map((m) => m.id)))}
              >
                اعمال برای اعضای جدید
              </Button>
            </div>
          )}
          {needsYesCoverage && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 space-y-2">
              <p className="text-sm leading-6">
                {faNum(missing.length)} عضو پاسخ ثبت‌شده ندارد — اگر این وضعیت را دارند در ماتریس بالا تیک بزنید؛ در غیر این صورت پاسخ «ندارد» برایشان اعمال شود.
              </p>
              <Button size="sm" variant="outline" onClick={() => applyGateMap(cfg.noneMap, new Set(missing.map((m) => m.id)))}>
                اعمال «ندارد» برای اعضای بدون پاسخ
              </Button>
            </div>
          )}
          {needsNewMemberEntry && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              برای {faNum(missing.length)} عضوِ فاقد پاسخ، وضعیت را در ردیف همان عضو ثبت کنید.
            </p>
          )}
        </>
      )}
    </div>
  );
}

/* ---------------- ردیف یک عضو در ماتریس ---------------- */

function MemberRow({ m, cfg, assessment, rowState, serviceLockFor, onToggle }: {
  m: Member;
  cfg: MatrixCfg;
  assessment: Assessment;
  rowState: { row: Record<string, AnswerValue>; checked: boolean; answered: boolean };
  serviceLockFor: (f: FieldSpec, m: Member) => { org: string; at: string; label: string } | undefined;
  onToggle: (on: boolean) => void;
}) {
  const setAnswer = usePorsesh((s) => s.setAnswer);
  const { row, checked, answered } = rowState;
  const showFields = cfg.mode === "always" || checked;
  const unansweredChecked = (cfg.mode === "gated" && checked && !answered) || (cfg.mode === "always" && !answered);

  return (
    <div
      className={cn(
        "rounded-xl border bg-background p-3 space-y-2.5",
        unansweredChecked ? "border-amber-300" : "border-border",
      )}
      data-row={`${cfg.key}#${m.id}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {cfg.mode === "gated" && (
          <Checkbox
            checked={checked}
            onCheckedChange={(c) => onToggle(!!c)}
            aria-label={`${m.firstName} ${m.lastName ?? ""} — دارای این وضعیت`}
            className="shrink-0"
          />
        )}
        <span className={cn("text-sm", checked && cfg.mode === "gated" && "font-semibold")}>
          {m.firstName} {m.lastName ?? ""}
        </span>
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{m.relation}{typeof m.age === "number" ? ` • ${faNum(m.age)} ساله` : ""}</span>
        {m.isMainProvider && <Badge className="bg-teal-strong text-white text-[10px]">تأمین‌کننده اصلی</Badge>}
        {cfg.mode === "gated" && (
          <span className="text-[10px] text-muted-foreground ms-auto whitespace-nowrap">
            {checked ? "دارای وضعیت — جزئیات پایین" : answered ? "ندارد (ثبت خودکار)" : "بدون پاسخ"}
          </span>
        )}
      </div>

      {showFields && (
        <div className="grid gap-2.5 sm:grid-cols-2 border-t pt-2.5">
          {cfg.fields.filter((f) => !f.showIf || f.showIf(row)).map((f) => {
            const key = `${f.qid}#${m.id}`;
            const v = row[f.qid];
            const lock = serviceLockFor(f, m);
            const opts = f.rowOptions ?? optionsOf(f.qid);
            return (
              <div key={f.qid} className="space-y-1.5">
                <Label className="text-[11px] leading-4 flex items-start gap-1">
                  {f.label}
                  {f.service && !lock && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-teal-strong/30 bg-teal-soft/60 px-1.5 py-0.5 text-[9px] text-teal-strong font-normal whitespace-nowrap">
                      <ShieldCheck className="size-2.5" aria-hidden /> استعلام خودکار
                    </span>
                  )}
                </Label>
                {lock ? (
                  <div className="rounded-lg border border-teal-strong/30 bg-teal-soft/40 px-3 py-2 space-y-1" aria-readonly>
                    <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-muted-foreground">
                      <Badge className="bg-teal-strong text-white gap-1 text-[9px] px-1.5 py-0"><Lock className="size-2.5" aria-hidden /> ملاک استعلام</Badge>
                      <span>{lock.org} • {faDateTime(lock.at)}</span>
                    </div>
                    <p className="text-xs font-semibold flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-teal-strong" aria-hidden /> {lock.label}</p>
                  </div>
                ) : f.control === "select" ? (
                  <Select value={typeof v === "string" && v !== "" ? v : undefined} onValueChange={(val) => setAnswer(assessment.id, key, val)}>
                    <SelectTrigger className="h-9 text-xs bg-background"><SelectValue placeholder="انتخاب کنید ..." /></SelectTrigger>
                    <SelectContent>
                      {opts.map((o) => (
                        <SelectItem key={o.value} value={o.value} className={cn("text-xs", o.special && "text-amber-700")}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.control === "multi" ? (
                  <div className="grid gap-1.5">
                    {opts.map((o) => {
                      const list = Array.isArray(v) ? v : [];
                      const on = list.includes(o.value);
                      return (
                        <label key={o.value} className={cn("flex items-start gap-2 rounded-lg border px-2.5 py-1.5 text-xs cursor-pointer transition-colors", on ? "border-teal-strong bg-teal-soft" : "bg-background hover:border-ring/50")}>
                          <Checkbox
                            checked={on}
                            onCheckedChange={(c) => {
                              if (o.value === "none" && c) { setAnswer(assessment.id, key, ["none"]); return; }
                              let next = list.filter((x) => x !== "none");
                              if (c) next = [...next, o.value];
                              else next = next.filter((x) => x !== o.value);
                              setAnswer(assessment.id, key, next);
                            }}
                            aria-label={o.label}
                            className="mt-0.5"
                          />
                          <span className="leading-4">{o.label}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : f.control === "boolean" ? (
                  <div className="flex gap-1.5">
                    {[true, false].map((b) => (
                      <button
                        key={String(b)}
                        type="button"
                        onClick={() => setAnswer(assessment.id, key, b)}
                        aria-pressed={v === b}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-xs min-h-9 flex items-center gap-1.5 transition-colors",
                          v === b ? "border-teal-strong bg-teal-soft font-semibold" : "bg-background hover:border-ring/50",
                        )}
                      >
                        {v === b ? <CheckCircle2 className="size-3.5 text-teal-strong" aria-hidden /> : null}
                        {b ? "بله" : "خیر"}
                      </button>
                    ))}
                  </div>
                ) : f.control === "number" ? (
                  <div className="flex items-center gap-1.5 max-w-[12rem]">
                    <Input
                      type="number"
                      inputMode="numeric"
                      dir="ltr"
                      value={v === undefined || v === null || v === "" ? "" : String(v)}
                      onChange={(e) => setAnswer(assessment.id, key, e.target.value === "" ? undefined : Number(e.target.value))}
                      min={f.min}
                      max={f.max}
                      className="h-9 text-start text-xs"
                    />
                    {f.unit && <span className="text-[10px] text-muted-foreground whitespace-nowrap">{f.unit}</span>}
                  </div>
                ) : (
                  <Input
                    value={typeof v === "string" ? v : ""}
                    onChange={(e) => setAnswer(assessment.id, key, e.target.value)}
                    placeholder={f.placeholder}
                    className="h-9 text-xs bg-background"
                  />
                )}
              </div>
            );
          })}

          {/* توضیح تکمیلیِ همین عضو */}
          {cfg.memberDetail && (cfg.mode === "always" || checked) && (
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-[11px]">{cfg.memberDetail.label} — {m.firstName}</Label>
              <Textarea
                value={typeof row[cfg.memberDetail.key] === "string" ? String(row[cfg.memberDetail.key]) : ""}
                onChange={(e) => setAnswer(assessment.id, `${cfg.memberDetail!.key}#${m.id}`, e.target.value)}
                placeholder={cfg.memberDetail.placeholder}
                rows={2}
                className="max-w-2xl bg-background text-xs"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- ثبت مدرک مثبت شاخص (متصل به پرسش مبدا) ---------------- */

function EvidenceRecorderSlot({ assessmentId, docsKey, cfg, assessment }: {
  assessmentId: string;
  docsKey: string;
  cfg: MatrixCfg;
  assessment: Assessment;
}) {
  const documents = assessment.documents ?? [];
  const docs = documents.filter((d) => d.forKey === docsKey);
  return (
    <EvidenceRecorder
      forKey={docsKey}
      suggested={cfg.evidence!.suggested}
      label={cfg.evidence!.label}
      docs={docs}
      assessmentId={assessmentId}
    />
  );
}
