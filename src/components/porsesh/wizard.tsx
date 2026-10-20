"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { STEPS, groupsOfStep, REQUEST_TYPES, type Question, type QuestionGroup } from "@/lib/mpi/questions";
import type { Assessment, Member } from "@/lib/mpi/types";
import { QuestionField } from "@/components/porsesh/fields";
import { MemberManager, IncomeEditor } from "@/components/porsesh/editors";
import { FlagsDialog, FlagsList } from "@/components/porsesh/flags";
import { QualityPanel, ReferralPanel, ResultCard } from "@/components/porsesh/dashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { faNum } from "@/lib/mpi/format";
import { CircleCheck, ChevronLeft, ChevronRight, Info, Siren, Save, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * جریان پرسشنامه — ۱۰ گام مطابق معماری پیشنهادی
 * ترتیب: معرفی ← فوریت ← اطلاعات پایه ← سلامت ← آموزش ← مسکن ← معیشت ← مراقبت ← کیفیت داده ← خلاصه
 * بررسی فوریت در آغاز انجام می‌شود و در همه گام‌ها در دسترس می‌ماند.
 */

export function Wizard({ assessment }: { assessment: Assessment }) {
  const step = usePorsesh((s) => s.wizardStep);
  const setStep = usePorsesh((s) => s.setWizardStep);
  const mode = usePorsesh((s) => s.mode);
  const stepDef = STEPS[step - 1];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* نوار گام‌ها */}
      <div className="mb-5 overflow-x-auto thin-scroll">
        <ol className="flex gap-1.5 min-w-max" aria-label="مراحل پرسشنامه">
          {STEPS.map((s) => (
            <li key={s.key}>
              <button
                onClick={() => setStep(s.index)}
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

      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong text-sm font-bold">{faNum(stepDef.index)}</span>
          {stepDef.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-6 max-w-3xl">{stepDef.desc}</p>
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
            <Button onClick={() => setStep(step + 1)}>
              بعدی <ChevronLeft className="size-4" aria-hidden />
            </Button>
          ) : (
            <FinishButton assessment={assessment} />
          )}
        </div>
      </div>
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
    case 1: return <IntroStep assessment={assessment} />;
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

/* گام ۱ — معرفی، محرمانگی، درخواست */
function IntroStep({ assessment }: { assessment: Assessment }) {
  const updateRequest = usePorsesh((s) => s.updateRequest);
  const [types, setTypes] = useState<string[]>(assessment.requestTypes);

  const toggle = (t: string) => setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="rounded-2xl border bg-card p-5 space-y-3 leading-7 text-sm">
        <h3 className="font-bold text-base">به پرسش‌نامه خانوار خوش آمدید</h3>
        <p>
          این پرسش‌نامه برای <b>شناخت نیازها و سطح‌بندی اولیه محرومیت</b> خانوار طراحی شده است، نه رد یا پذیرش درخواست شما.
          پاسخ‌ها به<strong> محرمانگی کامل</strong> پردازش می‌شوند و فقط در اختیار کارشناسان مجاز قرار می‌گیرد. اطلاعات جمع‌آوری‌شده دو نقش دارد:
          بخشی «اطلاعات پرونده‌ای» برای تشکیل پرونده است و بخشی «سنجش محرومیت» برای تصمیم‌گیری کارشناسان کمک می‌کند.
        </p>
        <ul className="list-disc ps-5 space-y-1 text-muted-foreground text-[13px]">
          <li>پاسخ دادن به همه پرسش‌ها اجباری نیست؛ می‌توانید «نمی‌دانم» یا «مایل به پاسخ نیستم» را انتخاب کنید.</li>
          <li>نبود کد ملی یا نشانی ثابت موجب رد درخواست نمی‌شود؛ مسیر بررسی تکمیلی فعال خواهد شد.</li>
          <li>اگر وضعیت فوری یا خطرناکی دارید، همین حالا از دکمه «فوریت» استفاده کنید — نیازی به تکمیل بقیه فرم نیست.</li>
          <li>در هر زمان می‌توانید تغییر شرایط خانوار را اعلام کنید و پیش‌نویس را بعداً ادامه دهید.</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1.5">نوع درخواست شما چیست؟ (چندانتخابی)</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-5">«درخواست» با «نیاز شناسایی‌شده» متفاوت است؛ نیازها در گام‌های بعدی ثبت می‌شوند.</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {REQUEST_TYPES.map((t) => (
            <label key={t} className={cn("flex items-center gap-2.5 rounded-lg border p-3 text-sm cursor-pointer min-h-11 transition-colors", types.includes(t) ? "border-teal-strong bg-teal-soft" : "bg-background hover:border-ring/50")}>
              <Checkbox checked={types.includes(t)} onCheckedChange={() => toggle(t)} aria-label={t} />
              {t}
            </label>
          ))}
        </div>
        <Button className="mt-4" variant="outline" onClick={() => { updateRequest(assessment.id, types); toast({ title: "نوع درخواست ذخیره شد" }); }}>
          ذخیره درخواست
        </Button>
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
  const h = assessment.household;
  const set = (patch: Partial<Assessment["household"]>) => updateHousehold(assessment.id, patch);

  const field = (key: keyof Assessment["household"], label: string, opts?: { dir?: "ltr" | "rtl"; type?: "text" | "number"; placeholder?: string }) => (
    <div className="space-y-1.5">
      <Label htmlFor={`hh-${key}`}>{label}</Label>
      <Input
        id={`hh-${key}`}
        dir={opts?.dir}
        type={opts?.type ?? "text"}
        value={(h[key] as string | number | undefined) ?? ""}
        onChange={(e) => set({ [key]: opts?.type === "number" ? (e.target.value === "" ? undefined : Number(e.target.value)) : e.target.value } as Partial<Assessment["household"]>)}
        placeholder={opts?.placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1.5 flex items-center gap-2"><Info className="size-5 text-teal-strong" aria-hidden /> اطلاعات پایه و پرونده‌ای</h3>
        <p className="text-xs text-muted-foreground mb-4 leading-5">
          این اطلاعات «شناخت خانوار» است و <b>بدون امتیاز مستقل</b>؛ فقط برای اجرای منطق نمایش و مراجعه. سرپرست و فرد پاسخ‌گو دو نقش مستقل‌اند.
        </p>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {field("responderName", "نام فرد پاسخ‌گو / مسئول پیگیری خانوار")}
          {field("responderRelation", "نسبت پاسخ‌گو با سرپرست", { placeholder: "مثلاً خود سرپرست، همسر، فرزند ..." })}
          {field("headName", "نام سرپرست خانوار")}
          {field("headNationalId", "کد ملی سرپرست (اختیاری)", { dir: "ltr" })}
          {field("contactPhone", "تلفن تماس", { dir: "ltr" })}
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
            <p className="text-[11px] text-muted-foreground">نبود کد ملی موجب رد درخواست نمی‌شود.</p>
          </div>
          {field("province", "استان")}
          {field("county", "شهرستان")}
          <div className="space-y-1.5">
            <Label htmlFor="hh-dwell">نوع محل سکونت</Label>
            <Select value={h.dwellingType ?? "none"} onValueChange={(v) => set({ dwellingType: v === "none" ? undefined : v })}>
              <SelectTrigger id="hh-dwell"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["واحد مسکونی", "سکونت موقت", "مرکز نگهداری", "فضای غیرمسکونی", "آلونک/کپر", "خودرو/فضای عمومی", "سایر"].map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hh-tenure">نوع حق سکونت</Label>
            <Select value={h.tenureType ?? "none"} onValueChange={(v) => set({ tenureType: v === "none" ? undefined : v })}>
              <SelectTrigger id="hh-tenure"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["مالک", "مستأجر", "رایگان سکونت دارد", "خدمتی", "وابسته به نهاد/فرد", "—"].map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">مستأجر بودن به‌تنهایی معیار محرومیت مسکن نیست.</p>
          </div>
        </div>
        <div className="mt-3.5 space-y-2.5">
          {field("address", "نشانی قابل مراجعه (در صورت وجود)", { placeholder: "برای فرد بی‌خانمان اجباری نیست" })}
          <label className="flex items-center gap-2.5 text-sm cursor-pointer rounded-lg border bg-amber-50/50 border-amber-200 p-3">
            <Checkbox checked={!!h.noFixedAddress} onCheckedChange={(c) => set({ noFixedAddress: !!c })} aria-label="فاقد نشانی ثابت" />
            <span>خانوار <b>فاقد نشانی ثابت</b> است — مسیر بررسی میدانی فعال شود</span>
          </label>
        </div>
      </div>

      <MemberManager assessment={assessment} />

      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-semibold mb-1.5">مشخصات مسکن و هزینه‌ها (داده‌های محاسبه C4 و C8)</h3>
        <p className="text-xs text-muted-foreground mb-4 leading-5">وديعه جدا از هزینه ماهانه ثبت می‌شود و در محاسبه فشار هزینه مسکن لحاظ نمی‌گردد.</p>
        <div className="grid sm:grid-cols-3 gap-3.5">
          {field("usableRooms", "تعداد اتاق قابل سکونت", { type: "number" })}
          {field("usableArea", "زیربنای قابل استفاده (متر)", { type: "number" })}
          {field("monthlyRent", "اجاره ماهانه (تومان)", { type: "number" })}
          {field("deposit", "ودیعه (تومان) — جدا از اجاره", { type: "number" })}
          {field("monthlyCharge", "شارژ ماهانه (تومان)", { type: "number" })}
          {field("monthlyBills", "میانگین قبوض ماهانه (تومان)", { type: "number" })}
          {field("arrears", "مجموع معوقه (تومان)", { type: "number" })}
          {field("supportSince", "شروع دوره حمایت (اختیاری)", { placeholder: "مثلاً ۱۴۰۲" })}
          {field("priorServices", "خدمات/برنامه‌های حمایتی قبلی", { placeholder: "مثلاً اکرام، تغذیه، شهریه ..." })}
        </div>
      </div>
    </div>
  );
}

/* گام‌های ۴ تا ۸ — شاخص‌ها */
function ScoredStep({ stepKey, assessment }: { stepKey: string; assessment: Assessment }) {
  const groups = groupsOfStep(stepKey);
  const setAnswer = usePorsesh((s) => s.setAnswer);
  const provider = assessment.members.find((m) => m.isMainProvider);

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
            {rel.length === 0 && g.loop && (!g.memberFilter || g.memberFilter === "all") && assessment.members.length > 0 && (
              <p className="text-sm rounded-xl border bg-muted/40 p-3.5 leading-6">—</p>
            )}

            {rel.map((m) => (
              <div key={`${g.key}-${m.id}`} className="rounded-2xl border bg-card p-5 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2 border-b pb-3">
                  <h3 className="font-semibold">{g.title}</h3>
                  <Badge variant="outline" className="font-mono">{g.indicator}</Badge>
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
                  />
                ))}
              </div>
            ))}

            {!g.loop && (
              <div className="rounded-2xl border bg-card p-5 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2 border-b pb-3">
                  <h3 className="font-semibold">{g.title}</h3>
                  <Badge variant="outline" className="font-mono">{g.indicator}</Badge>
                  <span className="text-xs text-muted-foreground">سطح خانوار</span>
                </div>
                {g.questions.filter((q) => q.level === "household").map((q) => (
                  <QuestionField
                    key={q.id}
                    q={q}
                    value={assessment.answers[q.id] ?? null}
                    onChange={(v) => setAnswer(assessment.id, q.id, v)}
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
    </div>
  );
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
  const mode = usePorsesh((s) => s.mode);
  const [changeText, setChangeText] = useState("");

  return (
    <div className="space-y-5">
      <ResultCard assessment={assessment} compact />

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
