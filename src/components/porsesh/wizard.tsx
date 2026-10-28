"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { STEPS, groupsOfStep, QUESTION_GROUPS, REQUEST_TYPES, type Question, type QuestionGroup } from "@/lib/mpi/questions";
import type { Assessment, Member, WebServiceResult, EvidenceDoc, IndicatorId } from "@/lib/mpi/types";
import { simulateServiceFetch } from "@/lib/mpi/web-services";
import { isValidIranianNationalId, isValidPostalCode, nationalIdError, normalizeDigits } from "@/lib/mpi/national-id";
import { SectionGuideDialog, IndicatorGuideButton } from "@/components/porsesh/section-guide";
import { IndicatorCharterButton } from "@/components/porsesh/charter-modal";
import { QuestionField } from "@/components/porsesh/fields";
import { MemberAttributionCard, LegacyBadge, WeightBadge, MATRIX_CFG } from "@/components/porsesh/member-matrix";
import { MemberManager, IncomeEditor, HousingCostFields } from "@/components/porsesh/editors";
import { FlagsDialog, FlagsList } from "@/components/porsesh/flags";
import { QualityPanel, ReferralPanel, ResultCard } from "@/components/porsesh/dashboard";
import { WebServiceStatusStrip } from "@/components/porsesh/web-services";
import { PageHelpBar } from "@/components/porsesh/page-help";
import { JalaliDatePicker } from "@/components/porsesh/jalali-date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { faNum, faPct, faDateTime } from "@/lib/mpi/format";
import { CircleCheck, ChevronLeft, ChevronRight, Info, Lock, Siren, Save, CheckCircle2, Loader2, RefreshCw, Landmark, Fingerprint, MapPin, HeartPulse, Building2, BookOpenCheck, GraduationCap, ClipboardList, FileBadge2, ShieldCheck, UserCheck, Handshake, Trash2, CircleAlert, Database, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * جریان پرسشنامه — ۱۰ گام مطابق معماری پیشنهادی
 * ترتیب: هویت و واکشی ← فوریت ← اطلاعات پایه ← سلامت ← آموزش ← مسکن ← معیشت ← مراقبت ← کیفیت داده ← خلاصه
 * گام ۱: با کد ملی + کد پستی + تاریخ تولد، هویت از ثبت احوال و نشانی از پست واکشی و ملاک می‌شود؛
 * سایر مراجع متولی نیز با کد ملی استعلام و «پیش‌تکمیل» می‌شوند (تأیید خودکار نیست).
 * «درخواست خانوار» در ابتدا گرفته نمی‌شود؛ در گام آخر به‌عنوان داده خدماتی ثبت می‌شود.
 * بررسی فوریت در آغاز انجام می‌شود و در همه گام‌ها در دسترس می‌ماند.
 */

/* ---------------- محاسبه پیشرفت ---------------- */

export interface ProgressInfo {
  applicable: number;
  answered: number;
  pct: number;
  /** درصد پاسخ هر بُعد A..E */
  dims: Record<string, { pct: number; answered: number; applicable: number }>;
}

/** درصد تکمیل پاسخ‌های پرسشنامه — فقط پرسش‌های دارای پاسخ قابل‌شمارش (نه فیلدهای آزاد) */
export function computeProgress(assessment: Assessment): ProgressInfo {
  const provider = assessment.members.find((m) => m.isMainProvider);
  let applicable = 0;
  let answered = 0;
  const dims: ProgressInfo["dims"] = {};
  const bump = (d: string | undefined, ok: boolean) => {
    if (!d) return;
    const cur = dims[d] ?? { pct: 0, answered: 0, applicable: 0 };
    cur.applicable += 1;
    if (ok) cur.answered += 1;
    cur.pct = cur.answered / cur.applicable;
    dims[d] = cur;
  };
  for (const g of QUESTION_GROUPS) {
    const list: (Member | null)[] = g.loop
      ? (g.memberFilter === "schoolAge"
          ? assessment.members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18))
          : g.memberFilter === "provider" ? (provider ? [provider] : []) : assessment.members)
      : [null];
    const qs = g.questions.filter((qq) => ["single", "multi", "boolean", "number"].includes(qq.type));
    for (const m of list) {
      for (const qq of qs) {
        applicable += 1;
        const key = m ? `${qq.id}#${m.id}` : qq.id;
        const v = assessment.answers[key];
        const has = v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);
        if (has) answered += 1;
        bump(qq.dimension, has);
      }
    }
  }
  return { applicable, answered, pct: applicable ? answered / applicable : 0, dims };
}

function DimensionChips({ dims }: { dims: ProgressInfo["dims"] }) {
  const D: { id: string; label: string }[] = [
    { id: "A", label: "سلامت" }, { id: "B", label: "آموزش" }, { id: "C", label: "مسکن" },
    { id: "D", label: "معیشت" }, { id: "E", label: "مراقبت" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {D.map((d) => {
        const st = dims[d.id];
        const p = st ? Math.round(st.pct * 100) : 0;
        return (
          <span key={d.id} title={`تکمیل بُعد ${d.label}: ${faNum(p)}٪`} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2 py-0.5 text-[10px] whitespace-nowrap">
            <b className="text-teal-strong">{d.id}</b> {d.label}
            <span className="inline-block w-8 h-1 rounded-full bg-muted overflow-hidden align-middle">
              <span className="block h-full bg-teal-strong rounded-full transition-all" style={{ width: `${p}%` }} />
            </span>
            {faNum(p)}٪
          </span>
        );
      })}
    </div>
  );
}

export function Wizard({ assessment }: { assessment: Assessment }) {
  const step = usePorsesh((s) => s.wizardStep);
  const setStep = usePorsesh((s) => s.setWizardStep);
  const mode = usePorsesh((s) => s.mode);
  const stepDef = STEPS[step - 1];
  const progress = useMemo(() => computeProgress(assessment), [assessment]);

  /* گیت کد ملی — کلید شناسایی خانوار اجباری است: بدون کد ملی معتبر نمی‌توان از گام ۱ گذشت */
  const nidValid = isValidIranianNationalId(assessment.household.headNationalId ?? "");
  const nidGateBlocked = step === 1 && !nidValid;
  const guardLeaveStep1 = (target: number) => {
    if (nidGateBlocked && target !== 1) {
      toast({
        title: "کد ملی اجباری است",
        description: "کد ملی سرپرست کلید شناسایی خانوار و مبنای استعلام همه مراجع است — برای ادامه، کد ملی معتبر (۱۰ رقم با تطبیق الگوریتم ثبت احوال) وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    setStep(target);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      {/* نوار پیشرفت چسبان — تصویر کامل پیشرفت پرکردن پرسشنامه */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-2.5 bg-background/95 backdrop-blur border-b no-print" role="status" aria-label="پیشرفت تکمیل پرسشنامه">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-1.5">
          <span className="text-xs font-semibold whitespace-nowrap">
            گام {faNum(step)} از {faNum(10)} — {stepDef.short}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            تکمیل پاسخ‌های سنجش: <b className="text-teal-strong">{faPct(progress.pct)}</b>
            <span className="text-[10px]"> ({faNum(progress.answered)} از {faNum(progress.applicable)})</span>
          </span>
          <div className="ms-auto hidden md:block">
            <DimensionChips dims={progress.dims} />
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-l from-teal-strong to-emerald-400 transition-all duration-500" style={{ width: `${Math.round(progress.pct * 100)}%` }} />
        </div>
      </div>

      {/* نوار گام‌ها */}
      <div className="mt-4 mb-4 overflow-x-auto thin-scroll">
        <ol className="flex gap-1.5 min-w-max" aria-label="مراحل پرسشنامه">
          {STEPS.map((s) => (
            <li key={s.key}>
              <button
                onClick={() => guardLeaveStep1(s.index)}
                aria-current={s.index === step ? "step" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors min-h-9",
                  s.index === step ? "bg-primary text-primary-foreground border-primary font-semibold" : "bg-card hover:border-ring/60",
                )}
              >
                <span className={cn("grid place-items-center size-5 rounded-full text-[10px]", s.index === step ? "bg-white/20" : "bg-muted")}>
                  {faNum(s.index)}
                </span>
                {s.short}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong text-sm font-bold">{faNum(stepDef.index)}</span>
            {stepDef.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 leading-6 max-w-3xl">{stepDef.desc}</p>
        </div>
        {/* دکمه راهنمای بخش — فلسفه، ارتباط با نسخه قبلی و سیاست مهاجرت */}
        <SectionGuideDialog stepKey={stepDef.key} />
      </div>

      <StepBody step={step} assessment={assessment} />

      {/* ناوبری پایین */}
      <div className="sticky bottom-0 mt-6 -mx-4 px-4 py-3 bg-background/95 backdrop-blur border-t flex items-center gap-2 z-20 no-print">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
          <ChevronRight className="size-4" aria-hidden /> قبلی
        </Button>
        <p className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground ms-2">
          <Save className="size-3.5" aria-hidden /> پاسخ‌ها به‌صورت خودکار ذخیره می‌شوند (پیش‌نویس)
        </p>
        <div className="ms-auto flex items-center gap-2">
          <FlagsDialog assessment={assessment} trigger={
            <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-red-50">
              <Siren className="size-4" aria-hidden /> فوریت
            </Button>
          } />
          {step < 10 ? (
            <Button onClick={() => guardLeaveStep1(step + 1)} disabled={nidGateBlocked}>
              بعدی <ChevronLeft className="size-4" aria-hidden />
            </Button>
          ) : (
            <FinishButton assessment={assessment} />
          )}
        </div>
      </div>
      {nidGateBlocked && (
        <p className="text-xs text-destructive mt-1.5 no-print" role="alert">
          ادامه پرسشنامه بدون کد ملی معتبر سرپرست ممکن نیست — کد ملی کلید شناسایی خانوار و مبنای استعلام همه مراجع است.
        </p>
      )}
      {mode === "pro" && step >= 4 && step <= 8 && (
        <p className="text-xs text-muted-foreground mt-2">نمای حرفه‌ای: مبانی محاسبه در گام ۱۰ و در داشبورد قابل مشاهده است.</p>
      )}
    </div>
  );
}

function FinishButton({ assessment }: { assessment: Assessment }) {
  const setStatus = usePorsesh((s) => s.setStatus);
  const setView = usePorsesh((s) => s.setView);
  const [done, setDone] = useState(false);
  return done ? (
    <Button variant="outline" className="border-teal-strong text-teal-strong" onClick={() => setView("assessments")}>
      <CheckCircle2 className="size-4" aria-hidden /> ثبت شد — مشاهده پرونده‌ها
    </Button>
  ) : (
    <Button onClick={() => {
      setStatus(assessment.id, "submitted");
      setDone(true);
      toast({ title: "پرسشنامه ثبت شد", description: "خلاصه غربالگری برای بازبینی انسانی آماده است. ثبت پرسشنامه شرط رسیدگی فوری نیست." });
    }}>
      <CircleCheck className="size-4" aria-hidden /> ثبت نهایی پرسشنامه
    </Button>
  );
}

/* ---------------- بدنه هر گام ---------------- */

function StepBody({ step, assessment }: { step: number; assessment: Assessment }) {
  switch (step) {
    case 1: return <IdentityStep assessment={assessment} />;
    case 2: return <UrgencyStep assessment={assessment} />;
    case 3: return <BaseStep assessment={assessment} />;
    case 4: return <ScoredStep stepKey="health" assessment={assessment} />;
    case 5: return <ScoredStep stepKey="education" assessment={assessment} />;
    case 6: return <ScoredStep stepKey="housing" assessment={assessment} />;
    case 7: return <ScoredStep stepKey="livelihood" assessment={assessment} />;
    case 8: return <ScoredStep stepKey="care" assessment={assessment} />;
    case 9: return <QualityStep assessment={assessment} />;
    case 10: return <SummaryStep assessment={assessment} />;
  }
}

/* ---------------- ابزار گام هویت ---------------- */

function delay(ms: number) { return new Promise<void>((res) => setTimeout(res, ms)); }

/** نمایش کارت داده واکشی‌شده ملاک (قفل) */
function FetchedCard({ title, icon: Icon, res }: { title: string; icon: React.ElementType; res: WebServiceResult }) {
  return (
    <div className="rounded-2xl border border-teal-strong/30 bg-teal-soft/30 p-4 space-y-2.5">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong"><Icon className="size-4.5" aria-hidden /></span>
        <h4 className="text-sm font-semibold">{title}</h4>
        <Badge className="ms-auto gap-1 bg-teal-strong text-white"><Lock className="size-3" aria-hidden /> ملاک ثبتی</Badge>
      </div>
      <dl className="rounded-xl border bg-background/70 p-3 space-y-1.5 text-xs">
        {Object.entries(res.data).map(([k, v]) => (
          <div key={k} className="flex flex-wrap gap-x-2 leading-5">
            <dt className="text-muted-foreground">{k}:</dt>
            <dd className="font-medium flex items-center gap-1">{v}<Lock className="inline size-3 text-muted-foreground" aria-hidden /></dd>
          </div>
        ))}
      </dl>
      <p className="text-[11px] text-muted-foreground leading-5">
        دریافت شد در {faDateTime(res.fetchedAt)} — اصلاح فقط از مسیر درخواست به مرجع ثبتی.
      </p>
    </div>
  );
}

const OTHER_SERVICES: { id: string; name: string; org: string; icon: React.ElementType; label: string }[] = [
  { id: "shaparak_bank", name: "شاپرک / بانک‌ها", org: "شاپرک و بانک‌های عامل", icon: Landmark, label: "راستی‌آزمایی معیشت با توافقنامه (D1/D2)" },
  { id: "insurance", name: "بیمه", org: "تأمین اجتماعی و صندوق‌ها", icon: HeartPulse, label: "پوشش پایه اعضا (A5)" },
  { id: "property", name: "اموال و املاک", org: "سازمان اموال و املاک", icon: Building2, label: "سابقه سند مسکن (C3)" },
  { id: "education_school", name: "آموزش‌وپرورش", org: "وزارت آموزش‌وپرورش", icon: BookOpenCheck, label: "ثبت‌نام اعضای در سن آموزش (B1/B2)" },
  { id: "higher_edu", name: "علوم / دانشگاه آزاد", org: "وزارت علوم", icon: GraduationCap, label: "مدارک دانشگاهی (B3/B7)" },
];

/* گام ۱ — هویت، محرمانگی و واکشی از مراجع ثبتی */
function IdentityStep({ assessment }: { assessment: Assessment }) {
  const updateHousehold = usePorsesh((s) => s.updateHousehold);
  const updateMember = usePorsesh((s) => s.updateMember);
  const addMember = usePorsesh((s) => s.addMember);
  const setAnswersBulk = usePorsesh((s) => s.setAnswersBulk);
  const setWebService = usePorsesh((s) => s.setWebService);
  const clearWebService = usePorsesh((s) => s.clearWebService);
  const allAssessments = usePorsesh((s) => s.assessments);

  const h = assessment.household;
  const ws = assessment.webServices ?? {};
  const civil = ws.civil_registry;
  const post = ws.post;
  const fetched = civil?.status === "ok" || post?.status === "ok";

  const [nid, setNid] = useState(h.headNationalId ?? "");
  const [birth, setBirth] = useState(h.headBirthDate ?? "");
  const [postal, setPostal] = useState(h.postalCode ?? "");
  const [busy, setBusy] = useState<string | null>(null);
  const [pendingFetch, setPendingFetch] = useState(false);

  const nidOk = isValidIranianNationalId(nid);
  const nidErr = nationalIdError(nid);
  const postalOk = isValidPostalCode(postal);

  const saveInputs = (patch?: Partial<Assessment["household"]>) => {
    updateHousehold(assessment.id, {
      headNationalId: nid.trim(),
      headBirthDate: birth.trim(),
      postalCode: postal.trim(),
      headNationalIdStatus: nid.trim() ? "has" : "missing",
      ...patch,
    });
  };

  /** نتیجه استعلام روی نسخه تازه ارزیابی با شناسه‌های فعلی اجرا می‌شود (بدون بستگی به prop کهنه) */
  const freshAssessment = (): Assessment => ({
    ...assessment,
    household: { ...h, headNationalId: nid.trim(), headBirthDate: birth.trim(), postalCode: postal.trim() },
  });

  const fetchIdentity = async () => {
    saveInputs();
    /* کد ملی کلید شناسایی است — بدون کد ملی معتبر واکشی ممنوع */
    if (!isValidIranianNationalId(nid)) {
      toast({
        title: "کد ملی معتبر وارد نشده است",
        description: "کد ملی سرپرست اجباری و کلید استعلام همه مراجع است؛ با تطبیق الگوریتم ثبت احوال بررسی و دوباره تلاش کنید.",
        variant: "destructive",
      });
      return;
    }
    /* هشدار پرونده تکراری — کد ملی مبنای شناسایی است؛ ثبت هم‌کدملی باید آگاهانه باشد */
    const nidNorm = normalizeDigits(nid);
    const dups = Object.values(allAssessments).filter(
      (x) => x.id !== assessment.id && !x.demo && normalizeDigits(x.household.headNationalId ?? "") === nidNorm,
    );
    if (dups.length > 0) {
      toast({
        title: `پرونده دیگری با همین کد ملی وجود دارد (${new Intl.NumberFormat("fa-IR").format(dups.length)} پرونده)`,
        description: "اگر ادامه همان پرونده است، از «بانک پرونده‌ها» بازش کنید؛ ثبت جدید با کد ملی مشترک فقط به‌عنوان بررسی جدید و با آگاهی از تکرار درج می‌شود.",
        variant: "destructive",
      });
    }
    setPendingFetch(true);
    try {
      const fa = freshAssessment();
      setBusy("استعلام هویت و اعضای خانوار از ثبت احوال ...");
      await delay(1100);
      const r1 = simulateServiceFetch("civil_registry", fa);
      setWebService(assessment.id, "civil_registry", r1);
      if (r1.prefills?.householdPatch) updateHousehold(assessment.id, r1.prefills.householdPatch);

      setBusy("استعلام نشانی و موقعیت جغرافیایی از پست (از کد پستی) ...");
      await delay(950);
      const r2 = simulateServiceFetch("post", fa);
      setWebService(assessment.id, "post", r2);
      if (r2.prefills?.householdPatch) updateHousehold(assessment.id, r2.prefills.householdPatch);

      if (r1.status === "ok" && r2.status === "ok") {
        toast({ title: "واکشی هویتی انجام شد", description: "نام سرپرست، اعضای سابقه ثبتی و نشانی از ثبت احوال و پست دریافت و ملاک شد." });
      } else {
        toast({ title: "واکشی با نقص انجام شد", description: r1.note ?? r2.note ?? "برخی داده‌ها دریافت نشد — مسیر دستی فعال است.", variant: "destructive" });
      }
    } finally {
      setBusy(null);
      setPendingFetch(false);
    }
  };

  /** پیش‌تکمیل با تأیید کاربر — با حفظ منبع و تاریخ؛ تأیید خودکار شرایط جاری نیست */
  const applyPrefills = (r: WebServiceResult) => {
    if (r.prefills?.householdPatch) updateHousehold(assessment.id, r.prefills.householdPatch);
    if (r.prefills?.answerPrefills?.length) {
      setAnswersBulk(assessment.id, Object.fromEntries(r.prefills.answerPrefills.map((p) => [p.key, p.value])));
    }
    if (r.prefills?.memberPrefills?.length) {
      for (const mp of r.prefills.memberPrefills) updateMember(assessment.id, mp.memberId, mp.patch);
    }
    toast({ title: "پیش‌تکمیل اعمال شد", description: "داده با حفظ منبع و تاریخ استعلام ثبت شد؛ شرایط جاری جداگانه بررسی می‌شود و تأیید خودکار نیست." });
  };
  void applyPrefills; /* نگهداری برای بازآزمایی دستی — اعمال پیش‌فرض اکنون خودکار است */

  const registryMembersAdded = assessment.members.some((m) => m.fromRegistry);
  const registryCreates = civil?.prefills?.memberCreates ?? [];

  const addRegistryMembers = () => {
    for (const mc of registryCreates) {
      addMember(assessment.id, { ...mc, isHead: false });
    }
    toast({ title: `${faNum(registryCreates.length)} عضو واکشی‌شده ثبت شد`, description: "با برچسب «واکشی از ثبت احوال» — ترکیب جاری خانوار را تأیید یا اصلاح کنید." });
  };

  const fetchOther = async (s: (typeof OTHER_SERVICES)[number]) => {
    saveInputs();
    setBusy(`استعلام از ${s.name} با کد ملی ...`);
    try {
      await delay(850);
      const r = simulateServiceFetch(s.id, freshAssessment());
      setWebService(assessment.id, s.id, r);
      /* اعمال خودکار پیش‌تکمیل — سرویس متولی ملاک است؛ جایگاه و مقدار پرسش‌ها حفظ می‌شود و ثبت دستی لازم نیست */
      let applied = 0;
      if (r.status !== "error" && r.prefills) {
        if (r.prefills.householdPatch && Object.keys(r.prefills.householdPatch).length > 0) {
          updateHousehold(assessment.id, r.prefills.householdPatch);
          applied += 1;
        }
        if (r.prefills.answerPrefills?.length) {
          setAnswersBulk(assessment.id, Object.fromEntries(r.prefills.answerPrefills.map((p) => [p.key, p.value])));
          applied += r.prefills.answerPrefills.length;
        }
        if (r.prefills.memberPrefills?.length) {
          for (const mp of r.prefills.memberPrefills) updateMember(assessment.id, mp.memberId, mp.patch);
          applied += r.prefills.memberPrefills.length;
        }
      }
      toast({
        title: r.status === "error" ? `استعلام ${s.name} ناموفق` : `استعلام ${s.name} انجام شد`,
        description: r.status === "error"
          ? (r.note ?? "نتیجه‌ای دریافت نشد — مسیر دستی فعال است.")
          : `${r.note ?? "نتیجه مرجع ثبت شد."}${applied > 0 ? ` ${faNum(applied)} مقدار به‌صورت خودکار در پرسش‌های مرتبط ثبت و ملاک شد.` : ""}`,
        variant: r.status === "error" ? "destructive" : "default",
      });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* راهنمای صفحه — توضیحات کامل در مودال */}
      <PageHelpBar
        stepKey="identity"
        icon={ShieldCheck}
        title="به پرسش‌نامه خانوار خوش آمدید"
        hint="سنجش عملیاتی محرومیت — نه رد یا پذیرش درخواست؛ پاسخ‌ها محرمانه است — جزئیات در راهنمای این صفحه."
      />

      {/* شناسه‌های واکشی */}
      <div className="rounded-2xl border border-teal-strong/30 bg-teal-soft/30 p-4.5 space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><Fingerprint className="size-5 text-teal-strong" aria-hidden /> شروع با واکشی — سه شناسه</h3>
        <p className="text-xs text-muted-foreground leading-5">
          <b>کد ملی کلید استعلام همه مراجع است؛</b> هویت از ثبت احوال و نشانی از پست واکشی و <b>ملاک</b> می‌شود — شرح کامل در راهنمای این صفحه.
        </p>
        {fetched ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[
              { label: "کد ملی سرپرست", value: h.headNationalId },
              { label: "موبایل سرپرست (از ثبت‌نام)", value: h.headMobile },
              { label: "تاریخ تولد سرپرست", value: h.headBirthDate },
              { label: "کد پستی", value: h.postalCode },
            ].map((f) => (
              <div key={f.label} className="space-y-1">
                <Label className="text-xs">{f.label}</Label>
                <div className="rounded-lg border bg-muted/50 px-3 py-2.5 text-sm flex items-center gap-1.5" aria-readonly>
                  <Lock className="size-3.5 text-muted-foreground shrink-0" aria-hidden />
                  <span dir="ltr" className="truncate">{f.value || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-3 gap-2.5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Label htmlFor="id-nid">کد ملی سرپرست (۱۰ رقم)</Label>
                <Badge className="text-[10px] bg-red-100 text-destructive border border-destructive/30 hover:bg-red-100 gap-1">
                  <Fingerprint className="size-3" aria-hidden /> اجباری — کلید شناسایی
                </Badge>
              </div>
              <Input id="id-nid" dir="ltr" inputMode="numeric" value={nid} onChange={(e) => setNid(e.target.value)} placeholder="۱۰ رقم — بدون خط تیره" aria-required="true" aria-invalid={!nidOk && nid.length > 0} className={cn(nid.length > 0 && !nidOk && "border-destructive focus-visible:ring-destructive/30")} />
              {nid.length > 0 && nidErr && <p className="text-[11px] text-destructive leading-4" role="alert">{nidErr}</p>}
              {nidOk && <p className="text-[11px] text-emerald-700 flex items-center gap-1"><CircleCheck className="size-3.5" aria-hidden /> کد ملی معتبر است — کلید استعلام مراجع آماده است.</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="id-birth">تاریخ تولد سرپرست</Label>
              <JalaliDatePicker
                id="id-birth"
                value={birth}
                onChange={(v) => setBirth(v)}
                placeholder="انتخاب تاریخ تولد (شمسی)"
                ariaLabel="انتخاب تاریخ تولد سرپرست از تقویم شمسی"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="id-postal">کد پستی محل سکونت (۱۰ رقم)</Label>
              <Input id="id-postal" dir="ltr" inputMode="numeric" value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="۱۰ رقم — برای واکشی نشانی" />
              {postal.length > 0 && !postalOk && <p className="text-[11px] text-amber-700">کد پستی باید ۱۰ رقم باشد؛ بی‌خانمان‌ها بدون کد پستی ثبت می‌شوند.</p>}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          {fetched ? (
            <>
              <Button variant="outline" onClick={() => { clearWebService(assessment.id, "civil_registry"); clearWebService(assessment.id, "post"); toast({ title: "نتیجه واکشی حذف شد", description: "می‌توانید شناسه‌ها را اصلاح و دوباره واکشی کنید." }); }}>
                <RefreshCw className="size-4" aria-hidden /> اصلاح شناسه‌ها و واکشی مجدد
              </Button>
              <span className="text-xs text-muted-foreground">داده هویتی و نشانی از مرجع ثبتی دریافت شده است.</span>
            </>
          ) : (
            <Button onClick={fetchIdentity} disabled={pendingFetch || !nidOk} title={!nidOk ? "برای واکشی، ابتدا کد ملی معتبر سرپرست را وارد کنید" : undefined}>
              {pendingFetch ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Fingerprint className="size-4" aria-hidden />}
              واکشی اطلاعات هویتی از ثبت احوال و پست
            </Button>
          )}
          {!nidOk && !fetched && <span className="text-xs text-muted-foreground">واکشی پس از ثبت کد ملی معتبر فعال می‌شود.</span>}
          {busy && <span className="text-xs text-teal-strong flex items-center gap-1.5"><Loader2 className="size-3.5 animate-spin" aria-hidden /> {busy}</span>}
        </div>
      </div>

      {/* وضعیت ثبت‌نام — نوع درخواست، توافقنامه بانکی و زمان ثبت‌نام از فرم ثبت‌نام */}
      {assessment.registrationKind && (
        <div className="rounded-2xl border bg-card p-4 flex flex-wrap items-center gap-3">
          <span className="grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong shrink-0"><UserCheck className="size-5" aria-hidden /></span>
          <div className="min-w-56 flex-1 space-y-0.5">
            <h4 className="text-sm font-semibold">وضعیت ثبت‌نام — منتقل‌شده از فرم ثبت‌نام</h4>
            <p className="text-xs text-muted-foreground leading-5">
              نوع درخواست: <b className="text-foreground">{assessment.registrationKind === "need_service" ? "اعلام نیازمندی و دریافت خدمات" : "متقاضی ارائه خدمت به مددجویان و نیازمندان"}</b>
              {assessment.household.consents?.bankAccess && (
                <> • توافقنامه دسترسی به اطلاعات بانکی: <b className="text-foreground">پذیرفته شد</b> {assessment.household.consents.agreedAt ? `در ${faDateTime(assessment.household.consents.agreedAt)}` : ""}
                  {ws.shaparak_bank ? " — استعلام شاپرک اجرا شد" : " — استعلام شاپرک از پنل مراجع قابل اجراست"}
                </>
              )}
              {assessment.household.registeredAt && <> • زمان ثبت‌نام: {faDateTime(assessment.household.registeredAt)}</>}
            </p>
          </div>
          <Badge variant="outline" className="bg-teal-soft text-teal-strong border-teal-strong/30 gap-1">
            <Handshake className="size-3.5" aria-hidden /> ثبت‌نام انجام شد
          </Badge>
        </div>
      )}

      {/* نتایج واکشی ملاک */}
      {civil?.status === "ok" && <FetchedCard title="ثبت احوال — هویت سرپرست و سابقه اعضای خانوار" icon={Fingerprint} res={civil} />}
      {civil && civil.status === "error" && (
        <p className="text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6">{civil.note}</p>
      )}
      {post?.status === "ok" && <FetchedCard title="پست — نشانی استاندارد و موقعیت جغرافیایی" icon={MapPin} res={post} />}
      {post && post.status === "error" && (
        <p className="text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6">{post.note}</p>
      )}

      {/* ثبت اعضای واکشی‌شده */}
      {registryCreates.length > 0 && (
        <div className="rounded-2xl border bg-card p-4.5 flex flex-wrap items-center gap-3">
          <span className="grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong"><Fingerprint className="size-5" aria-hidden /></span>
          <div className="min-w-56 flex-1">
            <h4 className="text-sm font-semibold">اعضای واکشی‌شده از سابقه ثبتی — {faNum(registryCreates.length)} نفر</h4>
            <p className="text-xs text-muted-foreground leading-5 mt-0.5">
              {registryCreates.map((m) => `${m.firstName.split(" ")[0]} (${m.relation})`).join("، ")} — با برچسب منبع ثبت می‌شوند و ترکیب جاری خانوار جداگانه تأیید می‌شود.
            </p>
          </div>
          {registryMembersAdded ? (
            <Badge variant="outline" className="bg-teal-soft text-teal-strong border-teal-strong/30 gap-1"><CircleCheck className="size-3.5" aria-hidden /> ثبت شده‌اند</Badge>
          ) : (
            <Button variant="outline" onClick={addRegistryMembers}>ثبت اعضای واکشی‌شده</Button>
          )}
        </div>
      )}

      {/* استعلام سایر مراجع با کد ملی */}
      <div className="rounded-2xl border bg-card p-4.5 space-y-3">
        <h3 className="font-semibold flex items-center gap-2"><Landmark className="size-5 text-teal-strong" aria-hidden /> استعلام سایر مراجع متولی با کد ملی</h3>
        <p className="text-xs text-muted-foreground leading-5">
          نتیجه به‌صورت <b>«پیش‌تکمیل»</b> با حفظ منبع و تاریخ اعمال می‌شود — تأیید خودکار شرایط جاری نیست (شرح کامل در راهنمای این صفحه).
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {OTHER_SERVICES.map((s) => {
            const r = ws[s.id];
            const prefillCount = (r?.prefills?.answerPrefills?.length ?? 0) + (r?.prefills?.memberPrefills?.length ?? 0) + (Object.keys(r?.prefills?.householdPatch ?? {}).length > 0 ? 1 : 0);
            return (
              <div key={s.id} className="rounded-xl border p-3.5 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong"><s.icon className="size-4" aria-hidden /></span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-5">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.org}</div>
                  </div>
                  {r?.status === "ok" && <Badge className="ms-auto bg-emerald-600 text-white gap-1"><CircleCheck className="size-3" aria-hidden /> دریافت شد</Badge>}
                  {r?.status === "error" && <Badge variant="outline" className="ms-auto text-destructive border-destructive/40">ناموفق</Badge>}
                </div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
                {r && r.status !== "error" && (
                  <dl className="rounded-lg border bg-muted/30 p-2.5 space-y-1 text-[11px] leading-4">
                    {Object.entries(r.data).slice(0, 3).map(([k, v]) => (
                      <div key={k} className="flex flex-wrap gap-x-1.5">
                        <dt className="text-muted-foreground">{k}:</dt><dd className="font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {r?.note && <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-4">{r.note}</p>}
                <div className="flex gap-1.5 flex-wrap">
                  <Button size="sm" variant="outline" onClick={() => fetchOther(s)} disabled={!!busy || pendingFetch || !nidOk} title={!nidOk ? "کد ملی معتبر سرپرست کلید استعلام است" : undefined}>
                    {busy?.startsWith(`استعلام از ${s.name}`) ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <RefreshCw className="size-3.5" aria-hidden />}
                    {r ? "استعلام مجدد" : "استعلام با کد ملی"}
                  </Button>
                  {r && r.status !== "error" && !!r.prefills && prefillCount > 0 && (
                    <Badge variant="outline" className="bg-teal-soft text-teal-strong border-teal-strong/30 gap-1 text-[10px]">
                      <CircleCheck className="size-3" aria-hidden /> اعمال خودکار در پرسشنامه ({faNum(prefillCount)})
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!nidOk && <p className="text-[11px] text-muted-foreground">استعلام سایر مراجع با کلید کد ملی انجام می‌شود — ابتدا کد ملی ده‌رقمی معتبر سرپرست را وارد و واکشی کنید.</p>}
      </div>
    </div>
  );
}

/* گام ۲ — فوریت */
function UrgencyStep({ assessment }: { assessment: Assessment }) {
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5 flex gap-3">
        <Siren className="size-6 text-destructive shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm leading-7">
          <h3 className="font-bold">بررسی اولیه نشانه‌های فوریت</h3>
          <p className="mt-1">
            اگر خطر جانی، بی‌خانمانی، فقدان مراقب یا وضعیت اضطراری دیگری وجود دارد، همین حالا ثبت کنید.
            <b> رسیدگی فوری مستقل از امتیاز و مستقل از تکمیل پرسشنامه است.</b> این گام در تمام مراحل از دکمه «فوریت» در پایین صفحه در دسترس است.
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <FlagsDialog assessment={assessment} trigger={
          <Button className="bg-destructive hover:bg-destructive/90 text-white">
            <Siren className="size-4" aria-hidden /> ثبت نشانه فوریت جدید
          </Button>
        } />
      </div>
      <FlagsList assessment={assessment} />
    </div>
  );
}

/* گام ۳ — اطلاعات پایه */
function BaseStep({ assessment }: { assessment: Assessment }) {
  const updateHousehold = usePorsesh((s) => s.updateHousehold);
  const setWebService = usePorsesh((s) => s.setWebService);
  const [samPending, setSamPending] = useState(false);
  const h = assessment.household;
  const set = (patch: Partial<Assessment["household"]>) => updateHousehold(assessment.id, patch);

  // قفل فیلدهای ملاک ثبتی: پس از استعلام موفق، مقدار مرجع غیرقابل ویرایش است
  const ws = assessment.webServices ?? {};
  const civilOk = ws.civil_registry?.status === "ok";
  const postAny = ws.post?.status === "ok" || ws.post?.status === "partial";
  const postFull = ws.post?.status === "ok";

  /* زمینه پرونده و سابقه خدمات — فقط از واکشی بانک سامانه؛ ورود دستی مجاز نیست */
  const samaneh = ws.samaneh_bank;
  const samanehOk = samaneh?.status === "ok";
  const samanehData = samanehOk && !!(h.supportSince || h.priorServices);
  const samPlaceholder = !samaneh
    ? "صرفاً از واکشی بانک سامانه تکمیل می‌شود"
    : samaneh.status === "error"
      ? "پس از اصلاح شناسه‌ها، استعلام را تکرار کنید"
      : "سابقه‌ای در بانک سامانه ثبت نشده است";

  const fetchSamaneh = () => {
    setSamPending(true);
    setTimeout(() => {
      const r = simulateServiceFetch("samaneh_bank", assessment);
      setWebService(assessment.id, "samaneh_bank", r);
      if (r.status !== "error" && r.prefills?.householdPatch && Object.keys(r.prefills.householdPatch).length > 0) {
        updateHousehold(assessment.id, r.prefills.householdPatch);
      }
      setSamPending(false);
      toast({
        title: r.status === "error" ? "استعلام بانک سامانه ناموفق" : "استعلام بانک سامانه انجام شد",
        description: r.note ?? "داده ملاک ثبت شد؛ فیلدهای زمینه‌ای فقط‌خواندنی شدند.",
        variant: r.status === "error" ? "destructive" : "default",
      });
    }, 900);
  };

  const field = (key: keyof Assessment["household"], label: string, opts?: { dir?: "ltr" | "rtl"; type?: "text" | "number"; placeholder?: string; locked?: string }) => {
    const val = (h[key] as string | number | undefined) ?? "";
    if (opts?.locked) {
      return (
        <div key={`hh-${String(key)}`} className="space-y-1.5">
          <Label htmlFor={`hh-${String(key)}`} className="flex items-center gap-1.5">
            {label}
            <Badge variant="outline" className="text-[10px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30">
              <Lock className="size-3" aria-hidden /> {opts.locked} — ملاک، غیرقابل ویرایش
            </Badge>
          </Label>
          <div className="rounded-lg border bg-muted/50 px-3 py-2.5 text-sm min-h-9 text-foreground/90" aria-readonly>
            {String(val || "—")}
          </div>
        </div>
      );
    }
    return (
      <div key={`hh-${String(key)}`} className="space-y-1.5">
        <Label htmlFor={`hh-${String(key)}`}>{label}</Label>
        <Input
          id={`hh-${String(key)}`}
          dir={opts?.dir}
          type={opts?.type ?? "text"}
          value={val}
          onChange={(e) => set({ [key]: opts?.type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value } as Partial<Assessment["household"]>)}
          placeholder={opts?.placeholder}
        />
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* راهنمای صفحه — توضیحات کامل (شامل ملاک‌های وب‌سرویس) در مودال */}
      <PageHelpBar
        stepKey="base"
        icon={Info}
        title="اطلاعات پایه و پرونده‌ای"
        hint="شناخت خانوار بدون امتیاز مستقل — قواعد قفل ملاک وب‌سرویس‌ها در راهنمای این صفحه؛ هزینه‌های مسکن در گام «مسکن» (C8) گرفته می‌شود."
      />

      {/* استعلام مراجع ثبتی — پنل کامل در مودال «آخرین وضعیت واکشی سرویس‌ها» */}
      <WebServiceStatusStrip assessment={assessment} />

      <div className="rounded-2xl border bg-card p-4">
        <h3 className="font-semibold mb-1 flex items-center gap-2"><Info className="size-5 text-teal-strong" aria-hidden /> اطلاعات پایه و پرونده‌ای</h3>
        <p className="text-xs text-muted-foreground mb-4 leading-5">
          شناخت خانوار بدون امتیاز مستقل؛ سرپرست و پاسخ‌گو دو نقش مستقل‌اند — فیلدهای ملاک پس از واکشی قفل می‌شوند.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {field("responderName", "نام فرد پاسخ‌گو / مسئول پیگیری خانوار")}
          {field("responderRelation", "نسبت پاسخ‌گو با سرپرست", { placeholder: "مثلاً خود سرپرست، همسر، فرزند ..." })}
          {field("headName", "نام سرپرست خانوار", { locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined })}
          {field("headNationalId", "کد ملی سرپرست", { dir: "ltr", locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined })}
          {field("headBirthDate", "تاریخ تولد سرپرست", { dir: "ltr", placeholder: "مثلاً ۱۳۶۲/۰۵/۱۲", locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined })}
          {field("postalCode", "کد پستی (کلید واکشی نشانی از پست)", { dir: "ltr", locked: postAny ? "وب‌سرویس پست" : undefined })}
          {field("contactPhone", "تلفن تماس خانوار", { dir: "ltr" })}
          {h.headMobile && field("headMobile", "موبایل سرپرست (از فرم ثبت‌نام)", { dir: "ltr", locked: "فرم ثبت‌نام" })}
          <div className="space-y-1.5">
            <Label htmlFor="hh-nidstatus">وضعیت مدرک هویتی سرپرست</Label>
            <Select value={h.headNationalIdStatus ?? "has"} onValueChange={(v) => set({ headNationalIdStatus: v as Assessment["household"]["headNationalIdStatus"] })}>
              <SelectTrigger id="hh-nidstatus"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="has">دارد</SelectItem>
                <SelectItem value="missing">فاقد مدرک / نیازمند بررسی</SelectItem>
                <SelectItem value="in_progress">در جریان دریافت</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">کد ملی سرپرست کلید پرونده و اجباری است؛ اگر مدرک ندارد، مسیر دریافت مدرک (R8) با مددکار پیگیری می‌شود.</p>
          </div>
          {field("province", "استان", { locked: postAny ? "وب‌سرویس پست" : undefined })}
          {field("county", "شهرستان", { locked: postAny ? "وب‌سرویس پست" : undefined })}
        </div>
        <div className="mt-3 space-y-2">
          {field("address", "نشانی قابل مراجعه (در صورت وجود)", { placeholder: "برای فرد بی‌خانمان اجباری نیست", locked: postFull ? "وب‌سرویس پست" : undefined })}
          <label className="flex items-center gap-2.5 text-sm cursor-pointer rounded-lg border bg-amber-50/50 border-amber-200 p-3">
            <Checkbox checked={!!h.noFixedAddress} onCheckedChange={(c) => set({ noFixedAddress: !!c })} aria-label="فاقد نشانی ثابت" />
            <span>خانوار <b>فاقد نشانی ثابت</b> است — مسیر بررسی میدانی فعال شود</span>
          </label>
        </div>
      </div>

      <MemberManager assessment={assessment} />

      {/* زمینه پرونده و سابقه خدمات — صرفاً از واکشی بانک سامانه؛ ورود دستی مجاز نیست */}
      <div className="rounded-2xl border bg-card p-4">
        <h3 className="font-semibold mb-1 flex items-center gap-2"><Database className="size-5 text-teal-strong" aria-hidden /> زمینه پرونده و سابقه خدمات</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-5">
          این داده‌ها <b>صرفاً از واکشی بانک سامانه</b> ثبت می‌شود و ورود دستی مجاز نیست — داده زمینه‌ای برای پیگیری مددکاری و خارج از امتیاز. هزینه‌های ماهانه مسکن (اجاره، ودیعه، شارژ، قبوض، معوقه) به گام «مسکن» (C8) منتقل شده و متناسب با نوع تصرف گرفته می‌شود.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {samanehData ? (
            <div className="space-y-1.5">
              <Label className="flex items-center flex-wrap gap-1.5">
                شروع دوره حمایت
                <Badge variant="outline" className="text-[10px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30">
                  <Lock className="size-3" aria-hidden /> بانک سامانه — ملاک، غیرقابل ویرایش
                </Badge>
              </Label>
              <div className="rounded-lg border bg-muted/50 px-3 py-2.5 text-sm min-h-9 text-foreground/90" aria-readonly>{h.supportSince || "—"}</div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="hh-supportSince">شروع دوره حمایت</Label>
              <Input id="hh-supportSince" disabled value={h.supportSince ?? ""} placeholder={samPlaceholder} />
            </div>
          )}
          {samanehData ? (
            <div className="space-y-1.5">
              <Label className="flex items-center flex-wrap gap-1.5">
                خدمات/برنامه‌های حمایتی قبلی
                <Badge variant="outline" className="text-[10px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30">
                  <Lock className="size-3" aria-hidden /> بانک سامانه — ملاک، غیرقابل ویرایش
                </Badge>
              </Label>
              <div className="rounded-lg border bg-muted/50 px-3 py-2.5 text-sm min-h-9 text-foreground/90 leading-6" aria-readonly>{h.priorServices || "—"}</div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="hh-priorServices">خدمات/برنامه‌های حمایتی قبلی</Label>
              <Input id="hh-priorServices" disabled value={h.priorServices ?? ""} placeholder={samPlaceholder} />
            </div>
          )}
        </div>
        {/* وضعیت استعلام + عملیات واکشی */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {!samaneh ? (
            <Badge variant="outline" className="gap-1 text-muted-foreground"><Ban className="size-3.5" aria-hidden /> ورود دستی غیرمجاز — صرفاً از واکشی بانک سامانه</Badge>
          ) : samaneh.status === "error" ? (
            <Badge variant="outline" className="gap-1 text-destructive border-destructive/40"><CircleAlert className="size-3.5" aria-hidden /> استعلام ناموفق</Badge>
          ) : (
            <Badge className="gap-1 bg-emerald-600 text-white"><CircleCheck className="size-3.5" aria-hidden /> {samanehData ? "دریافت شد — ملاک" : "دریافت شد — بدون سابقه حمایتی"}</Badge>
          )}
          {samaneh && <span className="text-[11px] text-muted-foreground">آخرین استعلام: {faDateTime(samaneh.fetchedAt)}</span>}
          <Button size="sm" variant={samanehOk ? "outline" : "default"} onClick={fetchSamaneh} disabled={samPending} className="ms-auto">
            {samPending ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <RefreshCw className="size-3.5" aria-hidden />}
            {samaneh ? "استعلام مجدد از بانک سامانه" : "استعلام از بانک سامانه"}
          </Button>
        </div>
        {samaneh?.status === "error" && (
          <p className="mt-2 text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5 leading-5">{samaneh.note}</p>
        )}
      </div>
    </div>
  );
}

/* گام‌های ۴ تا ۸ — شاخص‌ها */

/** گروه‌های عضومحور که با «ماتریس انتساب اعضا» رندر می‌شوند — هر شاخص فقط یک‌بار پرسیده می‌شود (رفع پرسش تکراری) */
const MEMBER_MATRIX_KEYS = new Set(["A1", "A2", "A3", "A5", "A_nutrition", "B1", "B2", "B6"]);

function ScoredStep({ stepKey, assessment }: { stepKey: string; assessment: Assessment }) {
  const groups = groupsOfStep(stepKey);
  const setAnswer = usePorsesh((s) => s.setAnswer);
  const provider = assessment.members.find((m) => m.isMainProvider);
  const ws = assessment.webServices ?? {};
  const h = assessment.household;

  /** آیا پرسش با استعلام سرویس متولی پاسخ داده شده؟ → قفل ملاک */
  const serviceLockFor = (q: Question, answerKey: string) => {
    if (!q.service) return undefined;
    const r = ws[q.service.id];
    if (!r || r.status === "error") return undefined;
    const prefill = r.prefills?.answerPrefills?.find((p) => p.key === answerKey);
    if (!prefill) return undefined;
    return { org: q.service.org, at: r.fetchedAt };
  };

  const membersFor = (g: QuestionGroup): Member[] => {
    if (!g.loop) return [];
    if (g.memberFilter === "schoolAge") {
      const rel = assessment.members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
      return rel;
    }
    if (g.memberFilter === "provider") return provider ? [provider] : [];
    return assessment.members;
  };

  return (
    <div className="space-y-4">
      {assessment.members.length === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6">
          برای پاسخ به پرسش‌های این بخش، ابتدا در گام «اطلاعات پایه» اعضای خانوار را ثبت کنید.
        </div>
      )}

      {groups.map((g) => {
        /* گروه‌های عضومحور: یک کارت به‌ازای شاخص + ماتریس «کدام اعضا؟» — به‌جای کارت تکراری به‌ازای هر عضو */
        if (g.loop && MEMBER_MATRIX_KEYS.has(g.key)) {
          return <MemberAttributionCard key={g.key} g={g} assessment={assessment} cfg={MATRIX_CFG[g.key]} />;
        }
        const rel = membersFor(g);
        return (
          <div key={g.key} className="space-y-3">
            {g.key === "D3" && <IncomeEditor assessment={assessment} />}
            {g.key === "poverty" && <PovertyEditor assessment={assessment} />}
            {g.key === "D1m" && !provider && assessment.members.length > 0 && (
              <p className="text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6">
                تأمین‌کننده اصلی در مدیریت اعضا مشخص نشده است؛ برای ثبت وضعیت اشتغال (D1)، در گام اطلاعات پایه نقش «تأمین‌کننده اصلی» را به عضو مناسب بدهید.
              </p>
            )}
            {rel.length === 0 && g.loop && g.memberFilter === "schoolAge" && (
              <p className="text-sm rounded-xl border bg-muted/40 p-3.5 leading-6">
                <b>{g.title}:</b> عضو در سن آموزش اجباری ثبت نشده است — این شاخص به‌طور صحیح صفر محاسبه می‌شود.
              </p>
            )}

            {rel.map((m) => (
              <div key={`${g.key}-${m.id}`} className="rounded-2xl border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 border-b pb-2.5">
                  <h3 className="font-semibold">{g.title}</h3>
                  <Badge variant="outline" className="font-mono">{g.indicator}</Badge>
                  <LegacyBadge id={g.indicator} />
                  <IndicatorCharterButton id={g.indicator} assessment={assessment} />
                  <IndicatorGuideButton id={g.indicator} />
                  <WeightBadge id={g.indicator} />
                  <span className="text-sm text-muted-foreground">— {m.firstName} {m.lastName ?? ""}</span>
                  {m.isMainProvider && <Badge className="bg-teal-strong">تأمین‌کننده اصلی</Badge>}
                </div>
                {g.questions.filter((q) => q.level === "member").map((q) => (
                  <QuestionField
                    key={q.id}
                    q={q}
                    idPrefix={m.id}
                    value={assessment.answers[`${q.id}#${m.id}`] ?? null}
                    onChange={(v) => setAnswer(assessment.id, `${q.id}#${m.id}`, v)}
                    members={assessment.members}
                    assessmentId={assessment.id}
                    onKeyChange={(key, v) => setAnswer(assessment.id, key, v)}
                    serviceLock={serviceLockFor(q, `${q.id}#${m.id}`)}
                  />
                ))}
              </div>
            ))}

            {!g.loop && (
              <div className="rounded-2xl border bg-card p-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2 border-b pb-2.5">
                  <h3 className="font-semibold">{g.title}</h3>
                  <Badge variant="outline" className="font-mono">{g.indicator}</Badge>
                  <LegacyBadge id={g.indicator} />
                  <IndicatorCharterButton id={g.indicator} assessment={assessment} />
                  <IndicatorGuideButton id={g.indicator} />
                  <WeightBadge id={g.indicator} />
                  <span className="text-xs text-muted-foreground">سطح خانوار</span>
                </div>
                {/* داده ثبتی سکونت — از اطلاعات پایه/استعلام املاک؛ برای جلوگیری از پرسش تکراری فقط نمایش داده می‌شود */}
                {g.indicator === "C1" && h.dwellingType && (
                  <p className="text-[11px] text-muted-foreground bg-muted/40 border rounded-lg px-3 py-2 leading-5">
                    نوع محل سکونت ثبت‌شده (اطلاعات پایه): <b className="text-foreground">{h.dwellingType}</b> — این شاخص فقط پایداری و تهدید محل خواب را می‌سنجد و پرسش جداگانه‌ای درباره نوع سکونت ندارد.
                  </p>
                )}
                {/* هزینه‌های مسکن — فیلدهای C8 متناسب با نوع تصرف (از اطلاعات پایه به این گام منتقل شد) */}
                {g.indicator === "C8" && <HousingCostFields assessment={assessment} />}
                {g.indicator === "C3" && h.tenureType && (
                  <p className="text-[11px] text-muted-foreground bg-muted/40 border rounded-lg px-3 py-2 leading-5">
                    نوع تصرف ثبت‌شده: <b className="text-foreground">{h.tenureType}</b>
                    {ws.property?.status === "ok" && ws.property.prefills?.householdPatch?.tenureType ? " — از استعلام املاک (ملاک ثبتی)" : ""} — این شاخص پایداری و خطر حق سکونت را می‌سنجد.
                  </p>
                )}
                {g.questions.filter((q) => q.level === "household").map((q) => (
                  <QuestionField
                    key={q.id}
                    q={q}
                    value={assessment.answers[q.id] ?? null}
                    onChange={(v) => setAnswer(assessment.id, q.id, v)}
                    members={assessment.members}
                    assessmentId={assessment.id}
                    onKeyChange={(key, v) => setAnswer(assessment.id, key, v)}
                    serviceLock={serviceLockFor(q, q.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PovertyEditor({ assessment }: { assessment: Assessment }) {
  const updateHousehold = usePorsesh((s) => s.updateHousehold);
  const pl = assessment.household.povertyLine ?? { status: "unverified" as const };
  const set = (patch: Partial<typeof pl>) => updateHousehold(assessment.id, { povertyLine: { ...pl, ...patch } });

  return (
    <div className="rounded-2xl border bg-card p-5 space-y-3.5">
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        <h3 className="font-semibold">خط فقر منطقه‌ای</h3>
        <Badge variant="outline" className="font-mono">D3</Badge>
        <Badge variant="outline" className="text-amber-700 border-amber-300">نیازمند تصویب مرجع</Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-5">
        کفایت منابع (D3) با خط فقر معتبر منطقه‌ای سنجیده می‌شود. بدون مبلغ، منبع و وضعیت اعتبار، نتیجه D3 «غیرنهایی» می‌ماند.
        هزینه‌های منظورشده در خط فقر دوباره از D3 کسر نمی‌شود و ودیعه اجاره ماهانه محسوب نمی‌شود.
      </p>
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <Label htmlFor="pl-amount">خط فقر سرانه ماهانه (تومان)</Label>
          <Input id="pl-amount" type="number" min={0} dir="ltr" value={pl.monthlyPerCapita ?? ""} onChange={(e) => set({ monthlyPerCapita: e.target.value === "" ? undefined : Number(e.target.value) })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pl-region">منطقه</Label>
          <Input id="pl-region" value={pl.region ?? ""} onChange={(e) => set({ region: e.target.value })} placeholder="مثلاً استان تهران — مناطق شهری" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pl-source">منبع</Label>
          <Input id="pl-source" value={pl.source ?? ""} onChange={(e) => set({ source: e.target.value })} placeholder="مثلاً گزارش رسمی مرجع — نسخه ۱۴۰۴" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pl-date">تاریخ اعتبار</Label>
          <Input id="pl-date" value={pl.validAsOf ?? ""} onChange={(e) => set({ validAsOf: e.target.value })} placeholder="مثلاً ۱۴۰۴/۰۶" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pl-status">وضعیت اعتبارسنجی</Label>
          <Select value={pl.status} onValueChange={(v) => set({ status: v as typeof pl.status })}>
            <SelectTrigger id="pl-status"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="unverified">تأییدنشده (نیازمند بررسی مرجع)</SelectItem>
              <SelectItem value="verified">تأییدشده توسط مرجع</SelectItem>
              <SelectItem value="invalid">نامعتبر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

/* گام ۹ — کیفیت داده */
function QualityStep({ assessment }: { assessment: Assessment }) {
  return (
    <div className="space-y-4">
      <QualityPanel assessment={assessment} />
      <EvidenceGrid assessment={assessment} />
      <DocumentsSummary assessment={assessment} />
    </div>
  );
}

/* خلاصه مدارک مثبت ثبت‌شده روی پرسش‌ها — شاهد‌محوری سنجش */
function DocumentsSummary({ assessment }: { assessment: Assessment }) {
  const documents = assessment.documents ?? [];
  const removeDocument = usePorsesh((s) => s.removeDocument);
  const memberName = (key: string) => {
    const mid = key.split("#")[1];
    const m = assessment.members.find((x) => x.id === mid);
    return m ? `${m.firstName} ${m.lastName ?? ""}` : undefined;
  };
  const qTitle = (key: string) => {
    const qid = key.split("#")[0].split("__")[0];
    /* کلید مدرک می‌تواند کلید گروه شاخص (مثلاً A1) یا شناسه پرسش (مثلاً A1_disease) باشد */
    const grp = QUESTION_GROUPS.find((g) => g.key === qid);
    if (grp) return grp.title;
    for (const g of QUESTION_GROUPS) {
      const q = g.questions.find((x) => x.id === qid);
      if (q) return q.title;
    }
    return qid;
  };

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="font-semibold mb-1.5 flex items-center gap-2"><FileBadge2 className="size-5 text-teal-strong" aria-hidden /> مدارک مثبت ثبت‌شده ({faNum(documents.length)} مورد)</h3>
      <p className="text-xs text-muted-foreground mb-3.5 leading-5">
        مدارکی که در طول پرسشنامه روی پرسش‌های شاخص‌ها ثبت شده‌اند — هر مدرک به پرسش مبدا (و در سطح عضو، به عضو مشخص) متصل است و در بازبینی انسانی استفاده می‌شود.
      </p>
      {documents.length === 0 ? (
        <p className="text-xs text-muted-foreground rounded-xl border bg-muted/30 p-3.5">هنوز مدرکی ثبت نشده است — در پرسش‌های دارای شرط، پس از پاسخ مثبت، کنترل «ثبت مدرک مثبت» باز می‌شود.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((d) => {
            const who = memberName(d.forKey);
            return (
              <li key={d.id} className="rounded-xl border p-3 flex flex-wrap items-center gap-2 text-sm">
                <FileBadge2 className="size-4 text-teal-strong shrink-0" aria-hidden />
                <span className="font-medium">{d.title}</span>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap">{evidenceKindShort(d.kind)}</Badge>
                <span className="text-[11px] text-muted-foreground truncate">برای پرسش: «{qTitle(d.forKey)}»{who ? ` — عضو: ${who}` : ""}</span>
                {d.reference && <span className="text-[11px] text-muted-foreground">مرجع: {d.reference}</span>}
                {d.fileName && (
                  d.dataUrl ? <a href={d.dataUrl} target="_blank" rel="noreferrer" className="text-xs text-teal-strong underline underline-offset-2">فایل مدرک</a> : <span className="text-[11px] text-muted-foreground">{d.fileName}</span>
                )}
                <span className="text-[10px] text-muted-foreground ms-auto whitespace-nowrap">{faDateTime(d.recordedAt)}</span>
                <button type="button" onClick={() => removeDocument(assessment.id, d.id)} className="text-destructive/70 hover:text-destructive" aria-label={`حذف مدرک ${d.title}`}>
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function evidenceKindShort(k: EvidenceDoc["kind"]): string {
  const map: Record<string, string> = {
    medical: "درمانی", education: "آموزشی", insurance: "بیمه‌ای", legal: "حقوقی",
    administrative: "اداری", photo: "تصویر", other: "سایر",
  };
  return map[k] ?? "سایر";
}

const EVIDENCE_OPTIONS = [
  { value: "declared", label: "اظهار خانوار" },
  { value: "field", label: "گزارش میدانی" },
  { value: "document", label: "مستند / استعلام" },
  { value: "needs_verification", label: "نیازمند راستی‌آزمایی" },
];

function EvidenceGrid({ assessment }: { assessment: Assessment }) {
  const setAnswer = usePorsesh((s) => s.setAnswer);
  const groups = useMemo(() => groupsOfStep("health").concat(groupsOfStep("education"), groupsOfStep("housing"), groupsOfStep("livelihood"), groupsOfStep("care")), []);
  const indicators = useMemo(() => {
    const map = new Map<string, string>();
    for (const g of groups) if (!map.has(g.indicator)) map.set(g.indicator, g.title);
    return [...map.entries()];
  }, [groups]);

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="font-semibold mb-1.5">منبع/کیفیت شواهد هر شاخص</h3>
      <p className="text-xs text-muted-foreground mb-3.5 leading-5">
        این فیلدهای مشترک پشت هر شاخص عمدتاً برای کاربر سازمانی نمایش داده می‌شوند، نه الزام خانوار. منبع داده، کفایت و نیاز راستی‌آزمایی را ثبت کنید.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {indicators.map(([id, title]) => {
          const v = assessment.answers[`evidence_${id}`];
          return (
            <div key={id} className="rounded-xl border p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <Badge variant="outline" className="font-mono">{id}</Badge>
                <span className="truncate">{title}</span>
              </div>
              <Select value={typeof v === "string" ? v : "declared"} onValueChange={(val) => setAnswer(assessment.id, `evidence_${id}`, val)}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{EVIDENCE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* گام ۱۰ — خلاصه و ارجاع */
function SummaryStep({ assessment }: { assessment: Assessment }) {
  const setView = usePorsesh((s) => s.setView);
  const addChangeStatement = usePorsesh((s) => s.addChangeStatement);
  const updateRequest = usePorsesh((s) => s.updateRequest);
  const mode = usePorsesh((s) => s.mode);
  const [changeText, setChangeText] = useState("");
  const [types, setTypes] = useState<string[]>(assessment.requestTypes ?? []);
  const toggleReq = (t: string) => setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  // شناسنامه ارزیابی — فیلدهای کنترلی گروه «هویت ارزیابی و منشأ داده» (پشت پرسشنامه)
  const ws = assessment.webServices ?? {};
  const fetchedServices = Object.values(ws).filter((r) => r && r.status !== "error").length;
  const openIssues = assessment.qualityIssues.filter((i) => i.status === "open").length;
  const prefillAnswers = Object.values(ws).filter((r) => r?.prefills?.answerPrefills?.length).length;

  return (
    <div className="space-y-5">
      <ResultCard assessment={assessment} compact />

      {/* درخواست خانوار — در ثبت‌نام مقدار اولیه گرفته شد؛ خروجی خدماتی جدا از نیاز شناسایی‌شده */}
      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1 flex items-center gap-2"><ClipboardList className="size-5 text-teal-strong" aria-hidden /> درخواست خانوار (خدماتی — خارج از امتیاز)</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-5">
          نوع درخواست در ثبت‌نام انتخاب شده و به‌عنوان مقدار اولیه درج شده است؛ می‌توانید آن را تکمیل یا اصلاح کنید.
          درخواست خروجی خدماتی و مسیر ارجاع است و امتیاز مستقل ندارد. درخواست‌های قبلی پرونده با تاریخ و وضعیت حفظ می‌شوند.
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {REQUEST_TYPES.map((t) => (
            <label key={t} className={cn("flex items-center gap-2.5 rounded-lg border p-3 text-sm cursor-pointer min-h-11 transition-colors", types.includes(t) ? "border-teal-strong bg-teal-soft" : "bg-background hover:border-ring/50")}>
              <Checkbox checked={types.includes(t)} onCheckedChange={() => toggleReq(t)} aria-label={t} />
              {t}
            </label>
          ))}
        </div>
        <Button className="mt-4" variant="outline" onClick={() => { updateRequest(assessment.id, types); toast({ title: "درخواست خانوار ذخیره شد", description: "به‌عنوان داده خدماتی ثبت شد و در امتیاز اثری ندارد." }); }}>
          ذخیره درخواست
        </Button>
      </div>

      {/* شناسنامه ارزیابی — فیلدهای کنترلی پشت پرسشنامه */}
      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1.5 flex items-center gap-2"><FileBadge2 className="size-5 text-teal-strong" aria-hidden /> شناسنامه ارزیابی (فیلدهای کنترلی)</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-5">
          این فیلدها سؤال از خانوار نیستند؛ سامانه و کاربر سازمانی ثبت می‌کنند تا هر نتیجه قابل ممیزی، تکرارپذیر و بازنگری‌پذیر باشد.
        </p>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm">
          {[
            { k: "کد ملی سرپرست (کلید پرونده)", v: assessment.household.headNationalId || "—" },
            { k: "شماره موبایل سرپرست", v: assessment.household.headMobile || "—" },
            { k: "ثبت‌نام در سامانه", v: assessment.household.registeredAt ? faDateTime(assessment.household.registeredAt) : "بدون ثبت‌نام (ورود مددکار)" },
            { k: "شناسه ارزیابی", v: assessment.id },
            { k: "نسخه قواعد", v: assessment.ruleSetVersion },
            { k: "وضعیت پرونده", v: assessment.status === "draft" ? "پیش‌نویس" : assessment.status === "submitted" ? "ثبت‌شده" : assessment.status },
            { k: "تاریخ ایجاد", v: faDateTime(assessment.createdAt) },
            { k: "آخرین به‌روزرسانی", v: faDateTime(assessment.updatedAt) },
            { k: "منشأ داده — استعلام‌های ثبتی", v: `${faNum(fetchedServices)} سرویس دریافت شده` },
            { k: "پیش‌تکمیل از استعلام (شاخص‌ها)", v: prefillAnswers > 0 ? `${faNum(prefillAnswers)} سرویس اعمال شده` : "—"},
            { k: "موارد باز کیفیت داده", v: openIssues > 0 ? `${faNum(openIssues)} مورد` : "—"},
            { k: "اصلاحات مستند", v: `${faNum(assessment.corrections.length)} مورد` },
          ].map((r) => (
            <div key={r.k} className="rounded-xl border bg-muted/20 px-3 py-2">
              <dt className="text-[11px] text-muted-foreground">{r.k}</dt>
              <dd className="font-medium leading-5 truncate" dir="auto">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1.5">اعلام تغییر شرایط توسط خانوار</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-5">هر زمان که وضعیت خانوار تغییر کرد، می‌توانید اینجا ثبت کنید؛ ثبت، داده پیش‌تکمیل‌شده را باطل نمی‌کند و در بازبینی انسانی بررسی می‌شود.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input value={changeText} onChange={(e) => setChangeText(e.target.value)} placeholder="مثلاً سرپرست خانوار بستری شد ..." className="max-w-xl" />
          <Button variant="outline" onClick={() => {
            if (!changeText.trim()) return;
            addChangeStatement(assessment.id, changeText);
            setChangeText("");
            toast({ title: "تغییر شرایط ثبت شد" });
          }}>ثبت</Button>
        </div>
        {(assessment.changeStatements?.length ?? 0) > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm">
            {assessment.changeStatements!.map((c, i) => (
              <li key={i} className="rounded-lg bg-muted/40 border px-3 py-2">{c.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border bg-teal-soft/50 border-teal-strong/30 p-5">
        <h3 className="font-semibold mb-1.5">بازبینی انسانی و ارجاع</h3>
        <p className="text-sm leading-6 mb-3">
          ثبت نهایی پرسشنامه، درخواست را برای بازبینی مددکار خانواده آماده می‌کند. تصمیم‌های تخصصی، مسیر خدمت و ارجاع در نمای حرفه‌ای
          مدیریت می‌شود. پیشنهاد همیار جایگزین تصمیم تخصصی مددکار نیست و مالکیت حرفه‌ای پرونده تا پذیرش مسئولیت مقصد حفظ می‌شود.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setView("professional")}>مشاهده داشبورد حرفه‌ای و ارجاع</Button>
        </div>
      </div>

      {mode === "pro" && <ReferralPanel assessment={assessment} />}
    </div>
  );
}
