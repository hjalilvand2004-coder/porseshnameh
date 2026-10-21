"use client";

import { useState } from "react";
import { usePorsesh } from "@/lib/store";
import { RegistrationModal } from "@/components/porsesh/registration-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  isValidIranianNationalId, nationalIdError,
} from "@/lib/mpi/national-id";
import {
  ShieldCheck, Fingerprint, KeyRound, Eye, EyeOff, Loader2,
  CircleCheck, XCircle, UserPlus, BookOpenCheck, Sparkles,
  Layers, TriangleAlert, Compass, Lock, LogIn, FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * صفحه ورود (لاگین) — الگوبرداری جذاب‌شده از صفحه ورود سامانه امداد
 *
 * • ورود با کد ملی + رمز عبور (اعتبارسنجی هش محلی — نسخه نمایشی)
 * • دکمه «ثبت‌نام» → مودال ثبت‌نام سه‌فازی (الگوی امداد) و ادامه مسیر
 * • پس‌زمینه آورورا + گلس‌مورفیسم + انیمیشن CSS — بدون وابستگی جدید
 * • ورود نمایشی برای دسترسی سریع به بانک نمونه‌ها
 */

export function AuthPage() {
  const login = usePorsesh((s) => s.login);
  const startDemoSession = usePorsesh((s) => s.startDemoSession);

  const [nid, setNid] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const nidErr = nationalIdError(nid);
  const nidOk = isValidIranianNationalId(nid);

  const doLogin = async () => {
    setErr(null);
    if (!nidOk) {
      setErr(nidErr ?? "کد ملی را وارد کنید.");
      return;
    }
    if (!pw) {
      setErr("رمز عبور را وارد کنید.");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800)); /* شبیه‌سازی تأخیر احراز هویت */
    const r = login(nid, pw);
    setBusy(false);
    if (!r.ok) {
      setErr(r.message);
      return;
    }
    setOk(true);
    /* ادامه مسیر بر اساس نوع حساب */
    const st = usePorsesh.getState();
    const sess = st.session;
    if (sess?.kind === "provide_service") {
      st.setMode("pro");
      st.setView("professional");
      toast({ title: "خوش آمدید", description: "داشبورد حرفه‌ای برای پیگیری پرونده خانوارها فعال است." });
      return;
    }
    /* خانوار: اگر پرونده‌ای با همین کد ملی وجود دارد، ادامه می‌دهد */
    const own = Object.values(st.assessments)
      .filter((a) => !a.demo && a.household.headNationalId === sess?.nationalId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    if (own) {
      st.setActive(own.id);
      st.setView("wizard");
      toast({ title: "خوش آمدید", description: "پرونده شما باز شد — از همان‌جا ادامه دهید." });
    } else {
      st.setView("home");
      toast({ title: "خوش آمدید", description: "از «ثبت‌نام و شروع پرسشنامه» می‌توانید پرونده جدید بسازید." });
    }
  };

  const demoEnter = () => {
    startDemoSession();
    usePorsesh.getState().setView("home");
    toast({ title: "ورود نمایشی انجام شد", description: "بانک ۸ پرونده نمونه در دسترس است — برای جریان واقعی، ثبت‌نام کنید." });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950" dir="rtl">
      {/* پس‌زمینه آورورا */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 -start-40 size-[34rem] rounded-full bg-teal-500/25 blur-3xl auth-float-1" />
        <div className="absolute top-1/3 -end-48 size-[30rem] rounded-full bg-emerald-400/20 blur-3xl auth-float-2" />
        <div className="absolute -bottom-48 start-1/4 size-[32rem] rounded-full bg-cyan-500/15 blur-3xl auth-float-3" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <svg className="absolute inset-x-0 top-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M 42 0 L 0 0 0 42" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-4 py-10 lg:flex-row lg:items-stretch lg:gap-14">
        {/* پنل برند */}
        <section className="flex flex-1 flex-col justify-center text-white space-y-7 order-2 lg:order-1">
          <div className="flex items-center gap-3.5">
            <span className="grid place-items-center size-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur auth-glow">
              <ShieldCheck className="size-8" aria-hidden />
            </span>
            <div>
              <h1 className="text-2xl font-bold leading-8">سامانه پرسش‌نامه خانوار</h1>
              <p className="text-sm text-white/70 leading-5">غربالگری محرومیت چندبعدی EM-MPI</p>
            </div>
          </div>

          <p className="text-[15px] leading-8 text-white/85 max-w-lg">
            ورود امن با کد ملی و رمز عبور؛ پس از ثبت‌نام، اطلاعات هویتی و نشانی شما به‌صورت
            خودکار از مراجع متولی (ثبت احوال، پست، شاپرک و...) واکشی می‌شود و پرسشنامه
            با داده پیش‌پرشده ادامه می‌یابد.
          </p>

          <ul className="space-y-3.5 max-w-lg">
            {[
              { icon: Fingerprint, t: "کد ملی، کلید و مبنای شناسایی در همه سرویس‌ها", d: "ثبت‌نام بدون کد ملی معتبر ممکن نیست — الگوریتم رقم کنترل ثبت احوال" },
              { icon: Layers, t: "سه لایه سنجش: پرونده‌ای، ۳۰ شاخص در ۵ بُعد، بررسی حرفه‌ای", d: "موتور قواعد قطعی، نوار پیشرفت زنده و شجره‌نامه نسخه‌ها" },
              { icon: TriangleAlert, t: "فوریت بدون شرط — پرچم‌های R1 تا R9", d: "ثبت نشانه خطر مستقل از تکمیل فرم و مستقل از امتیاز" },
            ].map((f) => (
              <li key={f.t} className="flex gap-3.5 items-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
                <span className="grid place-items-center size-10 rounded-xl bg-teal-400/20 text-teal-200 shrink-0 border border-teal-300/20">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-6">{f.t}</div>
                  <div className="text-xs text-white/65 leading-5 mt-0.5">{f.d}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Badge variant="outline" className="bg-white/10 text-white border-white/20 gap-1">
              <Sparkles className="size-3" aria-hidden /> نسخه ۰.۷.۰
            </Badge>
            <span>۳۰ شاخص • ۵ بُعد • سقف ۱۰۰۰ امتیاز • ۷ مرجع متولی</span>
          </div>
        </section>

        {/* کارت ورود */}
        <section className="w-full max-w-md order-1 lg:order-2 self-center">
          <div className="rounded-3xl border border-white/15 bg-white/[0.08] backdrop-blur-xl p-7 sm:p-8 shadow-2xl shadow-teal-950/40 auth-card">
            <div className="text-center space-y-1.5 mb-6">
              <span className="mx-auto grid place-items-center size-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-lg auth-glow">
                <Lock className="size-6" aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-white mt-2">ورود به سامانه</h2>
              <p className="text-xs text-white/60 leading-5">با کد ملی و رمز عبور ثبت‌نام‌شده وارد شوید</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="auth-nid" className="text-white/85 flex items-center gap-1.5 text-xs">
                  <Fingerprint className="size-3.5 text-teal-300" aria-hidden /> کد ملی
                </Label>
                <Input
                  id="auth-nid" dir="ltr" inputMode="numeric" value={nid}
                  onChange={(e) => { setNid(e.target.value); setErr(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter") doLogin(); }}
                  placeholder="۱۰ رقم — مثلاً ۱۲۳۴۵۶۷۸۹۱"
                  aria-required="true" aria-invalid={!!err && !nidOk}
                  className={cn(
                    "bg-white/10 border-white/20 text-white placeholder:text-white/35 h-11 focus-visible:ring-teal-400/50 focus-visible:border-teal-300/50",
                    nidOk && "border-emerald-400/50",
                  )}
                />
                {nid.length > 0 && nidErr && !nidOk && <p className="text-[11px] text-rose-300 leading-4" role="alert">{nidErr}</p>}
                {nidOk && <p className="text-[11px] text-emerald-300 flex items-center gap-1"><CircleCheck className="size-3.5" aria-hidden /> کد ملی معتبر است.</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="auth-pw" className="text-white/85 flex items-center gap-1.5 text-xs">
                  <KeyRound className="size-3.5 text-teal-300" aria-hidden /> رمز عبور
                </Label>
                <div className="relative">
                  <Input
                    id="auth-pw" dir="ltr" type={showPw ? "text" : "password"} value={pw}
                    onChange={(e) => { setPw(e.target.value); setErr(null); }}
                    onKeyDown={(e) => { if (e.key === "Enter") doLogin(); }}
                    placeholder="رمز ثبت‌نام — ۶ کاراکتر"
                    aria-required="true"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/35 h-11 pe-10 focus-visible:ring-teal-400/50 focus-visible:border-teal-300/50"
                  />
                  <button
                    type="button" onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "پنهان‌کردن رمز" : "نمایش رمز"}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPw ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                  </button>
                </div>
              </div>

              {err && (
                <p className="flex items-start gap-2 text-xs text-rose-200 bg-rose-500/15 border border-rose-400/30 rounded-xl px-3.5 py-2.5 leading-5" role="alert">
                  <XCircle className="size-4 shrink-0 mt-0.5" aria-hidden /> {err}
                </p>
              )}
              {ok && (
                <p className="flex items-center gap-2 text-xs text-emerald-200 bg-emerald-500/15 border border-emerald-400/30 rounded-xl px-3.5 py-2.5 leading-5" role="status">
                  <CircleCheck className="size-4" aria-hidden /> ورود موفق — در حال انتقال ...
                </p>
              )}

              <Button
                onClick={doLogin} disabled={busy || ok}
                className="w-full h-11 text-sm font-bold bg-gradient-to-l from-teal-400 to-emerald-500 text-slate-950 hover:from-teal-300 hover:to-emerald-400 shadow-lg shadow-teal-500/25 border-0"
              >
                {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <LogIn className="size-4" aria-hidden />}
                {busy ? "در حال بررسی ..." : "ورود به سامانه"}
              </Button>

              <div className="flex items-center gap-3" role="separator" aria-label="یا">
                <span className="h-px flex-1 bg-white/15" />
                <span className="text-[11px] text-white/50">حساب ندارید؟</span>
                <span className="h-px flex-1 bg-white/15" />
              </div>

              {/* ثبت‌نام — مودال سه‌فازی الگوی امداد و ادامه مسیر */}
              <RegistrationModal>
                <Button
                  variant="outline"
                  className="w-full h-11 text-sm font-semibold bg-transparent border-teal-300/40 text-teal-200 hover:bg-teal-400/10 hover:text-teal-100"
                >
                  <UserPlus className="size-4" aria-hidden /> ثبت‌نام — ساخت حساب و شروع پرسشنامه
                </Button>
              </RegistrationModal>

              <p className="text-[11px] text-white/45 leading-5 text-center">
                رمز عبور باید ۶ کاراکتر (ترکیبی از اعداد و حروف انگلیسی) باشد و از کاراکترهای
                <b dir="ltr" className="font-mono mx-1">&amp;&lt;&gt;&quot;/;,*|=%</b> استفاده نکنید.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <a
                href="help.html" target="_blank" rel="noopener"
                className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <BookOpenCheck className="size-3.5" aria-hidden /> راهنمای سامانه
              </a>
              <button
                type="button" onClick={demoEnter}
                className="text-xs text-white/50 hover:text-white/85 flex items-center gap-1.5 transition-colors"
                title="دسترسی سریع نمایشی به بانک نمونه‌ها — بدون احراز هویت"
              >
                <FlaskConical className="size-3.5" aria-hidden /> ورود نمایشی (نسخه نمونه)
              </button>
            </div>
          </div>

          <p className="text-[11px] text-white/40 leading-5 text-center mt-4 flex items-center justify-center gap-1.5">
            <Compass className="size-3.5 shrink-0" aria-hidden />
            نسخه نمایشی: احراز هویت محلی است و داده‌ها فقط در مرورگر شما نگهداری می‌شود — جایگزین سرور امن نیست.
          </p>
        </section>
      </div>
    </div>
  );
}
