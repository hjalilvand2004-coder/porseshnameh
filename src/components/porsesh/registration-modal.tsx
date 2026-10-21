"use client";

import { useState } from "react";
import { usePorsesh } from "@/lib/store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  isValidIranianNationalId, isValidPostalCode, nationalIdError, normalizeDigits,
} from "@/lib/mpi/national-id";
import {
  REGISTRATION_KINDS, BANK_AGREEMENT_PARAGRAPHS, hashPassword,
  mobileError, birthDateError, passwordError, normalizeJalaliDate,
  type RegistrationKind,
} from "@/lib/mpi/registration";
import { simulateServiceFetch } from "@/lib/mpi/web-services";
import { uid, nowIso } from "@/lib/mpi/format";
import type { Assessment, Member, WebServiceResult } from "@/lib/mpi/types";
import {
  Fingerprint, MapPin, ShieldCheck, Loader2,
  CircleCheck, XCircle, Clock, Lock, Landmark, UserCheck, Banknote,
  HeartPulse, Building2, BookOpenCheck, GraduationCap, ChevronLeft,
  Handshake, Eye, EyeOff, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * فرم ثبت‌نام مودالی — الگوبرداری از فرم ورود سامانه امداد
 *
 * سه فاز:
 *  ۱) فرم: کد ملی، شماره موبایل، تاریخ تولد، کد پستی، رمز عبور (۶ کاراکتر
 *     حروف انگلیسی + عدد، بدون &<>"/;,*|=%)، تکرار رمز، نوع درخواست
 *     (اعلام نیازمندی / متقاضی ارائه خدمت) و توافقنامه دسترسی به اطلاعات بانکی؛
 *  ۲) واکشی خودکار: ثبت احوال ← پست ← شاپرک/بانکی ← تأمین اجتماعی ←
 *     اموال و املاک ← علوم/آزاد ← آموزش‌وپرورش (همه با کلید کد ملی)؛
 *  ۳) خلاصه هویت: داده ملاک قفل‌شده + ورود به پرسشنامه (گام ۱) یا داشبورد حرفه‌ای.
 */

type Phase = "form" | "fetching" | "done";

interface FetchStepState {
  id: string;
  name: string;
  org: string;
  icon: React.ElementType;
  status: "pending" | "running" | "ok" | "error";
  note?: string;
}

const SERVICE_SEQUENCE: { id: string; name: string; org: string; icon: React.ElementType }[] = [
  { id: "civil_registry", name: "ثبت احوال", org: "هویت سرپرست و اعضای سابقه ثبتی", icon: Fingerprint },
  { id: "post", name: "پست", org: "نشانی استاندارد از کد پستی", icon: MapPin },
  { id: "shaparak_bank", name: "شاپرک / بانک‌ها", org: "اجرای توافقنامه دسترسی به اطلاعات بانکی", icon: Banknote },
  { id: "insurance", name: "تأمین اجتماعی و صندوق‌ها", org: "پوشش بیمه پایه اعضا", icon: HeartPulse },
  { id: "property", name: "اموال و املاک", org: "سابقه سند مسکن سرپرست", icon: Building2 },
  { id: "higher_edu", name: "وزارت علوم / دانشگاه آزاد", org: "مدارک دانشگاهی اعضا", icon: GraduationCap },
  { id: "education_school", name: "آموزش‌وپرورش", org: "وضعیت تحصیل اعضای در سن آموزش", icon: BookOpenCheck },
];

function delay(ms: number) { return new Promise<void>((res) => setTimeout(res, ms)); }

/** تبدیل ارقام لاتین به فارسی برای نمایش */
const toFa = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export function RegistrationModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");

  /* فیلدهای فرم */
  const [nid, setNid] = useState("");
  const [mobile, setMobile] = useState("");
  const [birth, setBirth] = useState("");
  const [postal, setPostal] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [kind, setKind] = useState<RegistrationKind | "none">("none");
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [attempted, setAttempted] = useState(false);

  /* فاز واکشی */
  const [steps, setSteps] = useState<FetchStepState[]>([]);
  /* فاز خلاصه */
  const [summary, setSummary] = useState<{
    aid: string; name: string; address: string; kind: RegistrationKind;
    results: { name: string; status: string }[];
  } | null>(null);

  const showErr = (v: string, valid: boolean) => attempted && !valid;

  /* کد ملی نرمال‌شده — برای نمایش در فاز خلاصه و استفاده در ثبت */
  const nidNorm = normalizeDigits(nid);

  /* اعتبارسنجی زنده */
  const nidErr = nationalIdError(nid);
  const mobErr = mobileError(mobile);
  const birthErr = birthDateError(birth);
  const postalOk = isValidPostalCode(postal);
  const pwErr = passwordError(pw);
  const pw2Err = pw2.length > 0 && pw2 !== pw ? "تکرار رمز عبور با رمز عبور یکسان نیست." : pw2.length === 0 ? "تکرار رمز عبور اجباری است." : null;
  const kindOk = kind !== "none";
  const formValid = !nidErr && !mobErr && !birthErr && postalOk && !pwErr && !pw2Err && kindOk && agreed;

  const reset = () => {
    setPhase("form"); setNid(""); setMobile(""); setBirth(""); setPostal("");
    setPw(""); setPw2(""); setShowPw(false); setKind("none"); setAgreed(false);
    setShowAgreement(false); setAttempted(false); setSteps([]); setSummary(null);
  };

  /** اعمال خودکار پیش‌تکمیل‌های نتیجه استعلام — با حفظ منبع و تاریخ */
  const applyPrefillsAuto = (aid: string, r: WebServiceResult) => {
    const st = usePorsesh.getState();
    if (r.prefills?.householdPatch) st.updateHousehold(aid, r.prefills.householdPatch);
    if (r.prefills?.answerPrefills?.length) {
      st.setAnswersBulk(aid, Object.fromEntries(r.prefills.answerPrefills.map((p) => [p.key, p.value])));
    }
    if (r.prefills?.memberPrefills?.length) {
      for (const mp of r.prefills.memberPrefills) st.updateMember(aid, mp.memberId, mp.patch);
    }
  };

  const submit = async () => {
    setAttempted(true);
    if (!formValid) return;

    /* هشدار پرونده تکراری — کد ملی کلید شناسایی است */
    const nidNorm = normalizeDigits(nid);
    const dup = Object.values(usePorsesh.getState().assessments)
      .find((x) => !x.demo && normalizeDigits(x.household.headNationalId ?? "") === nidNorm);
    if (dup) {
      toast({
        title: "پرونده‌ای با همین کد ملی وجود دارد",
        description: "ثبت‌نام جدید با کد ملی مشترک فقط به‌عنوان بررسی جدید درج می‌شود؛ اگر ادامه همان پرونده است، از «بانک پرونده‌ها» بازش کنید.",
        variant: "destructive",
      });
    }

    setPhase("fetching");
    setSteps(SERVICE_SEQUENCE.map((s) => ({ ...s, status: "pending" as const })));
    const st = usePorsesh.getState();

    /* مسیر متقاضی ارائه خدمت: پرسشنامه محرومیت و واکشی مراجع ندارد — ثبت‌نام و هدایت به داشبورد حرفه‌ای */
    if (kind === "provide_service") {
      await delay(900);
      setSummary({ aid: "", name: "", address: "", kind: "provide_service", results: [] });
      setPhase("done");
      return;
    }

    const baseHousehold: Assessment["household"] = {
      headNationalId: nidNorm,
      headBirthDate: normalizeJalaliDate(birth) ?? birth.trim(),
      postalCode: normalizeDigits(postal),
      headNationalIdStatus: "has",
    };
    const probe = { ...({ household: baseHousehold, members: [] } as unknown as Assessment) };

    try {
      /* ۱) ثبت احوال — هویت و اعضای سابقه ثبتی */
      setSteps((prev) => prev.map((p, i) => (i === 0 ? { ...p, status: "running" } : p)));
      await delay(1100);
      const r1 = simulateServiceFetch("civil_registry", probe);
      const memberCreates = r1.prefills?.memberCreates ?? [];
      const civilPatch = r1.prefills?.householdPatch ?? {};

      /* ۲) ایجاد پرونده با اعضای واکشی‌شده + داده ثبت‌نام */
      const members: Member[] = memberCreates.map((mc) => ({
        id: uid("m"),
        firstName: mc.firstName,
        relation: mc.relation,
        age: mc.age,
        gender: mc.gender,
        fromRegistry: true,
      }));
      const aid = st.createAssessment({
        household: {
          ...baseHousehold,
          ...civilPatch,
          headMobile: normalizeDigits(mobile),
          registeredAt: nowIso(),
          headPasswordHash: hashPassword(pw),
          consents: { bankAccess: agreed, agreedAt: nowIso() },
        },
        members,
        registrationKind: kind as RegistrationKind,
        requestTypes: kind === "need_service" ? ["درخواست تشکیل/به‌روزرسانی پرونده حمایت"] : [],
      }, { silent: true }); /* view دست‌نخورده می‌ماند تا مودال بسته شود */
      if (r1.status === "ok") st.setWebService(aid, "civil_registry", r1);
      setSteps((prev) => prev.map((p, i) => (i === 0 ? { ...p, status: r1.status === "ok" ? "ok" : "error", note: r1.note } : p)));

      /* ۳) سایر مراجع — استعلام خودکار با کلید کد ملی + اعمال پیش‌تکمیل */
      const results: { name: string; status: string }[] = [
        { name: "ثبت احوال", status: r1.status },
      ];
      let lastAddress = "";
      for (let i = 1; i < SERVICE_SEQUENCE.length; i++) {
        const svc = SERVICE_SEQUENCE[i];
        setSteps((prev) => prev.map((p, j) => (j === i ? { ...p, status: "running" } : p)));
        await delay(650 + (i % 3) * 150);
        const fresh = usePorsesh.getState().assessments[aid];
        if (!fresh) break;
        const r = simulateServiceFetch(svc.id, fresh);
        st.setWebService(aid, svc.id, r);
        if (r.status !== "error") applyPrefillsAuto(aid, r);
        if (svc.id === "post" && r.prefills?.householdPatch?.address) lastAddress = r.prefills.householdPatch.address;
        setSteps((prev) => prev.map((p, j) => (j === i ? { ...p, status: r.status === "error" ? "error" : "ok", note: r.note } : p)));
        results.push({ name: svc.name, status: r.status });
      }

      st.addAudit(aid, {
        actor: "سامانه", role: "system",
        action: "ثبت‌نام و واکشی خودکار وب‌سرویس‌ها",
        detail: "ثبت احوال، پست، شاپرک/بانکی، تأمین اجتماعی، املاک، علوم/آزاد، آموزش‌وپرورش — همه با کلید کد ملی",
      });

      const civilName = r1.data?.["نام و نام خانوادگی سرپرست"] ?? "";
      setSummary({ aid, name: civilName, address: lastAddress, kind: kind as RegistrationKind, results });
      setPhase("done");
    } catch {
      setPhase("form");
      toast({ title: "خطا در ثبت‌نام", description: "دوباره تلاش کنید.", variant: "destructive" });
    }
  };

  const finishNeed = () => {
    if (summary) {
      usePorsesh.getState().setActive(summary.aid);
      usePorsesh.getState().setView("wizard");
      usePorsesh.getState().setWizardStep(1);
    }
    setOpen(false);
    toast({
      title: "به پرسشنامه خوش آمدید",
      description: "داده هویتی و نشانی واکشی و ملاک شده است؛ اطلاعات را گام‌به‌گام تکمیل و تأیید کنید.",
    });
  };

  const finishProvider = () => {
    usePorsesh.getState().setMode("pro");
    usePorsesh.getState().setView("professional");
    setOpen(false);
    toast({
      title: "ثبت‌نام به‌عنوان متقاضی ارائه خدمت ثبت شد",
      description: "پرسشنامه محرومیت برای شما تکمیل نمی‌شود — داشبورد حرفه‌ای برای پرونده خانوارها فعال است.",
    });
  };
  const closeBlocked = phase === "fetching";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o && closeBlocked) return; /* حین واکشی بستن ممنوع */
        if (!o) reset();
        setOpen(o);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-2xl max-h-[92vh] overflow-y-auto"
        onPointerDownOutside={(e) => { if (closeBlocked) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (closeBlocked) e.preventDefault(); }}
      >
        {phase === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base leading-6">
                <UserCheck className="size-5 text-teal-strong shrink-0" aria-hidden />
                ثبت‌نام در سامانه پرسش‌نامه خانوار
              </DialogTitle>
              <DialogDescription className="text-xs leading-5">
                پس از ثبت‌نام، اطلاعات اولیه و هویتی شما به‌صورت خودکار از وب‌سرویس‌های
                شاپرک، ثبت احوال، پست و سایر مراجع متولی (همه با کلید کد ملی) واکشی و
                پیش‌تکمیل می‌شود و سپس به پرسشنامه منتقل می‌شوید.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* شناسه‌های هویتی */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-nid" className="flex items-center gap-1.5">
                    کد ملی
                    <Badge className="text-[10px] bg-red-100 text-destructive border border-destructive/30 hover:bg-red-100 gap-1">
                      <Fingerprint className="size-3" aria-hidden /> اجباری — کلید شناسایی
                    </Badge>
                  </Label>
                  <Input
                    id="reg-nid" dir="ltr" inputMode="numeric" value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    placeholder="۱۰ رقم — مبنای استعلام همه سرویس‌ها"
                    aria-required="true" aria-invalid={showErr(nid, !nidErr)}
                    className={cn(showErr(nid, !nidErr) && "border-destructive focus-visible:ring-destructive/30")}
                  />
                  {(attempted || nid.length > 0) && nidErr && <p className="text-[11px] text-destructive leading-4" role="alert">{nidErr}</p>}
                  {isValidIranianNationalId(nid) && <p className="text-[11px] text-emerald-700 flex items-center gap-1"><CircleCheck className="size-3.5" aria-hidden /> کد ملی معتبر است.</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-mobile">شماره موبایل</Label>
                  <Input
                    id="reg-mobile" dir="ltr" inputMode="numeric" value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    aria-required="true" aria-invalid={showErr(mobile, !!mobErr)}
                    className={cn(showErr(mobile, !!mobErr) && "border-destructive focus-visible:ring-destructive/30")}
                  />
                  {(attempted || mobile.length > 0) && mobErr && <p className="text-[11px] text-destructive leading-4" role="alert">{mobErr}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-birth">تاریخ تولد</Label>
                  <Input
                    id="reg-birth" dir="ltr" value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    placeholder="۱۳۶۲/۰۵/۱۲ (شمسی)"
                    aria-required="true" aria-invalid={showErr(birth, !!birthErr)}
                    className={cn(showErr(birth, !!birthErr) && "border-destructive focus-visible:ring-destructive/30")}
                  />
                  {(attempted || birth.length > 0) && birthErr && <p className="text-[11px] text-destructive leading-4" role="alert">{birthErr}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-postal">کد پستی</Label>
                  <Input
                    id="reg-postal" dir="ltr" inputMode="numeric" value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    placeholder="۱۰ رقم — برای واکشی نشانی از پست"
                    aria-required="true" aria-invalid={showErr(postal, !postalOk)}
                    className={cn(showErr(postal, !postalOk) && "border-destructive focus-visible:ring-destructive/30")}
                  />
                  {postal.length > 0 && !postalOk && <p className="text-[11px] text-destructive leading-4" role="alert">کد پستی باید ۱۰ رقم باشد.</p>}
                </div>
              </div>

              {/* رمز عبور */}
              <div className="rounded-xl border bg-muted/30 p-3.5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-pw">رمز عبور جدید</Label>
                    <div className="relative">
                      <Input
                        id="reg-pw" dir="ltr" type={showPw ? "text" : "password"} value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="۶ کاراکتر — حروف انگلیسی و عدد"
                        aria-required="true" aria-invalid={showErr(pw, !!pwErr)}
                        className={cn("pe-9", showErr(pw, !!pwErr) && "border-destructive focus-visible:ring-destructive/30")}
                      />
                      <button
                        type="button" onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "پنهان‌کردن رمز" : "نمایش رمز"}
                        className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPw ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                      </button>
                    </div>
                    {(attempted || pw.length > 0) && pwErr && <p className="text-[11px] text-destructive leading-4" role="alert">{pwErr}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="reg-pw2">تکرار رمز عبور</Label>
                    <Input
                      id="reg-pw2" dir="ltr" type={showPw ? "text" : "password"} value={pw2}
                      onChange={(e) => setPw2(e.target.value)}
                      placeholder="تکرار همان رمز"
                      aria-required="true" aria-invalid={showErr(pw2, !!pw2Err)}
                      className={cn(showErr(pw2, !!pw2Err) && "border-destructive focus-visible:ring-destructive/30")}
                    />
                    {(attempted || pw2.length > 0) && pw2Err && <p className="text-[11px] text-destructive leading-4" role="alert">{pw2Err}</p>}
                    {pw2.length > 0 && pw2 === pw && <p className="text-[11px] text-emerald-700 flex items-center gap-1"><CircleCheck className="size-3.5" aria-hidden /> تکرار درست است.</p>}
                  </div>
                </div>
                <ul className="text-[11px] text-muted-foreground leading-5 list-disc ps-5">
                  <li>رمز عبور باید شامل ۶ کاراکتر (ترکیبی از اعداد و حروف انگلیسی) باشد.</li>
                  <li>برای رمز عبور از کاراکترهای <b dir="ltr" className="font-mono">&amp;&lt;&gt;&quot;/;,*|=%</b> استفاده نکنید.</li>
                  <li>رمز عبور هرگز به‌صورت متن ساده ذخیره نمی‌شود — فقط هش یک‌طرفه در پرونده نگه داشته می‌شود.</li>
                </ul>
              </div>

              {/* نوع درخواست */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">نوع درخواست</Label>
                <RadioGroup value={kind} onValueChange={(v) => setKind(v as RegistrationKind)} className="gap-2.5" aria-required="true">
                  {REGISTRATION_KINDS.map((k) => (
                    <div key={k.value} className="space-y-1.5">
                      <Label
                        htmlFor={`reg-kind-${k.value}`}
                        className={cn(
                          "flex items-start gap-2.5 rounded-xl border p-3.5 cursor-pointer transition-colors min-h-11",
                          kind === k.value ? "border-teal-strong/50 bg-teal-soft/40" : "bg-background hover:border-ring/60",
                        )}
                      >
                        <RadioGroupItem id={`reg-kind-${k.value}`} value={k.value} className="mt-0.5" />
                        <span className="text-sm font-medium leading-6">{k.label}</span>
                      </Label>
                      {kind === k.value && (
                        <p className="text-[11px] text-muted-foreground leading-5 ps-8">{k.desc}</p>
                      )}
                    </div>
                  ))}
                </RadioGroup>
                {attempted && !kindOk && <p className="text-[11px] text-destructive leading-4" role="alert">نوع درخواست را انتخاب کنید.</p>}
              </div>

              {/* توافقنامه دسترسی به اطلاعات بانکی */}
              <div className="rounded-xl border bg-card p-3.5 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="reg-agree" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)}
                    aria-required="true" className="mt-0.5"
                  />
                  <div className="space-y-1.5 flex-1">
                    <Label htmlFor="reg-agree" className="text-sm leading-6 cursor-pointer font-medium">
                      «توافقنامه دسترسی به اطلاعات بانکی» را مطالعه کردم و با آن موافقم.
                    </Label>
                    <button
                      type="button" onClick={() => setShowAgreement((v) => !v)}
                      className="text-xs text-teal-strong flex items-center gap-1 hover:underline"
                      aria-expanded={showAgreement}
                    >
                      <Handshake className="size-3.5" aria-hidden /> {showAgreement ? "بستن متن توافقنامه" : "مطالعه متن توافقنامه"}
                    </button>
                    {attempted && !agreed && <p className="text-[11px] text-destructive leading-4" role="alert">پذیرش توافقنامه برای اجرای استعلام بانکی لازم است؛ لغو رضایت در هر زمان ممکن است.</p>}
                  </div>
                </div>
                {showAgreement && (
                  <div className="rounded-lg border bg-muted/30 p-3.5 space-y-2.5 text-xs leading-6">
                    {BANK_AGREEMENT_PARAGRAPHS.map((s) => (
                      <p key={s.h}><b className="text-foreground">{s.h}</b> — {s.p}</p>
                    ))}
                  </div>
                )}
              </div>

              {attempted && !formValid && (
                <p className="text-xs text-destructive rounded-lg border border-destructive/30 bg-red-50 px-3 py-2 leading-5" role="alert">
                  ثبت‌نام تا رفع موارد قرمز بالا انجام نمی‌شود — کد ملی کلید اجباری سامانه است.
                </p>
              )}

              <Button className="w-full min-h-11" onClick={submit}>
                <ShieldCheck className="size-4" aria-hidden /> ثبت‌نام و واکشی اطلاعات از مراجع
              </Button>
              <p className="text-[11px] text-muted-foreground leading-5 text-center">
                این نسخه نمایشی است؛ پاسخ وب‌سرویس‌ها شبیه‌سازی‌شده و قطعی از کدهای واردشده ساخته می‌شود — داده فقط در مرورگر شما می‌ماند.
              </p>
            </div>
          </>
        )}

        {phase === "fetching" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <Loader2 className="size-5 text-teal-strong animate-spin" aria-hidden />
                در حال واکشی اطلاعات از مراجع متولی ...
              </DialogTitle>
              <DialogDescription className="text-xs leading-5">
                استعلام خودکار با کلید کد ملی — داده واکشی‌شده ملاک ثبتی می‌شود و با حفظ منبع و تاریخ پیش‌تکمیل می‌گردد.
              </DialogDescription>
            </DialogHeader>
            <ol className="space-y-2 py-1" aria-live="polite">
              {steps.map((s) => (
                <li key={s.id} className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 transition-colors",
                  s.status === "running" && "border-teal-strong/40 bg-teal-soft/30",
                  s.status === "ok" && "border-emerald-200 bg-emerald-50/50",
                  s.status === "error" && "border-amber-200 bg-amber-50/60",
                  s.status === "pending" && "opacity-60",
                )}>
                  <span className={cn("grid place-items-center size-8 rounded-lg shrink-0",
                    s.status === "pending" ? "bg-muted text-muted-foreground" : "bg-teal-soft text-teal-strong")}>
                    {s.status === "running" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <s.icon className="size-4" aria-hidden />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold leading-5">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.org}</div>
                  </div>
                  {s.status === "ok" && <Badge className="bg-emerald-600 text-white gap-1"><CircleCheck className="size-3" aria-hidden /> دریافت شد</Badge>}
                  {s.status === "error" && <Badge variant="outline" className="text-amber-700 border-amber-300">ناموفق</Badge>}
                  {s.status === "running" && <span className="text-[11px] text-teal-strong">در حال استعلام ...</span>}
                  {s.status === "pending" && <Clock className="size-4 text-muted-foreground" aria-hidden />}
                </li>
              ))}
            </ol>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1.5" role="status">
              <Lock className="size-3.5" aria-hidden /> لطفاً این پنجره را نبندید — واکشی در جریان است.
            </p>
          </>
        )}

        {phase === "done" && summary && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <CircleCheck className="size-5 text-emerald-600" aria-hidden />
                {summary.kind === "need_service" ? "ثبت‌نام و واکشی خودکار انجام شد" : "ثبت‌نام شما انجام شد"}
              </DialogTitle>
              <DialogDescription className="text-xs leading-5">
                {summary.kind === "need_service"
                  ? <>اطلاعات هویتی و نشانی از مراجع ثبتی دریافت و <b>ملاک</b> شد؛ پیش‌تکمیل‌ها با حفظ منبع و تاریخ اعمال شده‌اند.</>
                  : "ثبت‌نام به‌عنوان ارائه‌دهنده خدمت بدون پرونده پرسشنامه انجام شد."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3.5">
              {summary.kind === "need_service" && (
                <>
              {/* هویت ملاک */}
              <div className="rounded-2xl border border-teal-strong/30 bg-teal-soft/30 p-4 space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong"><Fingerprint className="size-4.5" aria-hidden /></span>
                  <h4 className="text-sm font-semibold">هویت واکشی‌شده از ثبت احوال — ملاک</h4>
                  <Badge className="ms-auto gap-1 bg-teal-strong text-white"><Lock className="size-3" aria-hidden /> غیرقابل ویرایش</Badge>
                </div>
                <dl className="rounded-xl border bg-background/70 p-3 space-y-1.5 text-xs">
                  {[
                    ["نام سرپرست", summary.name],
                    ["کد ملی", toFa(nidNorm)],
                    ["موبایل", toFa(normalizeDigits(mobile))],
                    ["تاریخ تولد", toFa(normalizeJalaliDate(birth) ?? birth)],
                    ["کد پستی", toFa(normalizeDigits(postal))],
                    ["نشانی (از پست)", summary.address || "—"],
                    ["اعضای سابقه ثبتی", "پیش‌تکمیل شده — در گام ۳ تأیید/اصلاح می‌شود"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-wrap gap-x-2 leading-5">
                      <dt className="text-muted-foreground">{k}:</dt>
                      <dd className="font-medium flex items-center gap-1">{v}<Lock className="inline size-3 text-muted-foreground" aria-hidden /></dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* نتایج استعلام */}
              <div className="grid sm:grid-cols-2 gap-2">
                {summary.results.map((r) => (
                  <div key={r.name} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs">
                    {r.status === "error"
                      ? <XCircle className="size-4 text-amber-600 shrink-0" aria-hidden />
                      : <CircleCheck className="size-4 text-emerald-600 shrink-0" aria-hidden />}
                    <span className="font-medium">{r.name}</span>
                    <span className="ms-auto text-[10px] text-muted-foreground">{r.status === "error" ? "نیازمند تکمیل در پرسشنامه" : "دریافت شد"}</span>
                  </div>
                ))}
              </div>
                </>
              )}

              {summary.kind === "need_service" ? (
                <>
                  <div className="rounded-xl border bg-card p-3.5 text-xs leading-6 flex gap-2.5">
                    <Info className="size-4 text-teal-strong shrink-0 mt-0.5" aria-hidden />
                    <span>
                      نوع درخواست «اعلام نیازمندی و دریافت خدمات» ثبت شد؛ با ورود به پرسشنامه، اطلاعات واکشی‌شده
                      پیش‌پرشده است و فقط بخش‌های باقی‌مانده را مرحله‌به‌مرحله تکمیل می‌کنید. رمز عبور فقط به‌صورت هش ذخیره شد.
                    </span>
                  </div>
                  <Button className="w-full min-h-11" onClick={finishNeed}>
                    ورود به پرسشنامه — گام ۱ <ChevronLeft className="size-4" aria-hidden />
                  </Button>
                </>
              ) : (
                <>
                  <div className="rounded-xl border bg-card p-3.5 text-xs leading-6 flex gap-2.5">
                    <Landmark className="size-4 text-teal-strong shrink-0 mt-0.5" aria-hidden />
                    <span>
                      ثبت‌نام شما به‌عنوان «متقاضی ارائه خدمت به مددجویان و نیازمندان» ثبت شد؛ پرسشنامه محرومیت مخصوص
                      خانوارهاست. از داشبورد حرفه‌ای می‌توانید پرونده‌ها، پرچم‌های فوریت و مسیر ارجاع را دنبال کنید.
                    </span>
                  </div>
                  <Button className="w-full min-h-11" onClick={finishProvider}>
                    ورود به داشبورد حرفه‌ای <ChevronLeft className="size-4" aria-hidden />
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
