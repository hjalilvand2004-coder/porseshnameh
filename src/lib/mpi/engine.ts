import {
  DIMENSIONS,
  INDICATORS_BY_DIM,
  INDICATOR_TITLES,
  LEVELS,
  TOTAL_CAP,
  WEIGHTS,
  scaleOf,
} from "./rules";
import {
  SPECIAL_ANSWERS,
  type Assessment,
  type Answers,
  type DataQualityIssue,
  type FlagCode,
  type IndicatorId,
  type IndicatorResult,
  type Member,
  type MpiResult,
  type RedFlag,
} from "./types";

/* ------------------------------------------------------------------ */
/* ابزارهای پایه                                                       */
/* ------------------------------------------------------------------ */

export function isSpecial(v: unknown): boolean {
  return (
    v === SPECIAL_ANSWERS.DONT_KNOW ||
    v === SPECIAL_ANSWERS.REFUSE ||
    v === SPECIAL_ANSWERS.NEED_REVIEW ||
    v === SPECIAL_ANSWERS.NONE
  );
}

export function get(a: Answers, key: string): unknown {
  return a[key];
}

export function getM(a: Answers, key: string, memberId: string): unknown {
  return a[`${key}#${memberId}`];
}

function specialStatus(v: unknown): IndicatorResult["status"] | null {
  if (v === SPECIAL_ANSWERS.DONT_KNOW || v === SPECIAL_ANSWERS.REFUSE || v === SPECIAL_ANSWERS.NEED_REVIEW) {
    return "incomplete";
  }
  return null;
}

function num(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return undefined;
}

function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

/** جمع وزن‌ها باید دقیقاً ۱۰۰۰ و برابر سقف ابعاد باشد (آزمون پذیرش) */
export function validateWeights(): { ok: boolean; total: number; perDim: Record<string, { sum: number; cap: number; ok: boolean }> } {
  let total = 0;
  const perDim: Record<string, { sum: number; cap: number; ok: boolean }> = {};
  for (const d of Object.keys(DIMENSIONS) as (keyof typeof DIMENSIONS)[]) {
    let sum = 0;
    for (const id of INDICATORS_BY_DIM[d]) sum += WEIGHTS[id];
    total += sum;
    perDim[d] = { sum, cap: DIMENSIONS[d].cap, ok: sum === DIMENSIONS[d].cap };
  }
  return { ok: total === TOTAL_CAP, total, perDim };
}

/* ------------------------------------------------------------------ */
/* حل‌کننده هر شاخص — کاملاً قطعی و آزمون‌پذیر                          */
/* ------------------------------------------------------------------ */

type ResolveOut = {
  coeff?: number;
  status: IndicatorResult["status"];
  basis: string;
  pendingApproval?: boolean;
};

const INCOMPLETE_BASIS = "داده ضروری ناموجود یا نامطمئن است؛ بدون امتیازدهی اجباری.";

function worstMember(
  a: Answers,
  members: Member[],
  key: string,
  map: (v: unknown) => number | undefined,
  filter: (m: Member) => boolean = () => true,
): { worst?: number; allAnswered: boolean; relevantCount: number } {
  const rel = members.filter(filter);
  let worst: number | undefined;
  let allAnswered = true;
  for (const m of rel) {
    const v = getM(a, key, m.id);
    const s = specialStatus(v);
    if (s) {
      allAnswered = false;
      continue;
    }
    const c = map(v);
    if (c === undefined) {
      allAnswered = false;
      continue;
    }
    worst = worst === undefined ? c : Math.max(worst, c);
  }
  return { worst, allAnswered, relevantCount: rel.length };
}

function to3(v: number | undefined): 0 | 0.5 | 1 | undefined {
  if (v === undefined) return undefined;
  return v >= 0.75 ? 1 : v >= 0.25 ? 0.5 : 0;
}

export function resolveIndicator(
  id: IndicatorId,
  a: Answers,
  hh: Assessment,
): ResolveOut {
  const members = hh.members;

  switch (id) {
    /* ---------------- سلامت و امنیت زیستی ---------------- */
    case "A1": {
      if (members.length === 0) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      let worst = 0;
      for (const m of members) {
        const dis = getM(a, "A1_disease", m.id);
        const imp = getM(a, "A1_impact", m.id);
        if (specialStatus(dis) || specialStatus(imp) || dis === undefined || imp === undefined)
          return { status: "incomplete", basis: INCOMPLETE_BASIS };
        let c = 0;
        if (dis === "controlled") c = imp === "severe" ? 1 : imp === "moderate" ? 0.5 : 0;
        else if (dis === "uncontrolled") c = imp === "severe" ? 1 : imp === "moderate" ? 0.5 : 0.5;
        worst = Math.max(worst, c);
      }
      return {
        coeff: worst,
        status: "ok",
        basis: worst === 0 ? "هیچ عضو بیماری مزمن جدی مؤثر ندارد." : "مبتنی بر شدیدترین وضعیت بیماری و اثر آن بر زندگی روزمره.",
      };
    }
    case "A2": {
      if (members.length === 0) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      const r = worstMember(a, members, "A2_limit", (v) =>
        v === "unmet" ? 1 : v === "supported" ? 0.5 : v === "none" ? 0 : undefined,
      );
      if (r.worst === undefined || !r.allAnswered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: r.worst,
        status: "ok",
        basis: r.worst === 1 ? "محدودیت پایدار با نیاز تأمین‌نشده." : r.worst === 0.5 ? "محدودیت موجود ولی با کمک/وسیله تأمین‌شده." : "محدودیت عملکردی پایدار ثبت نشده است.",
      };
    }
    case "A3": {
      if (members.length === 0) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      const r = worstMember(a, members, "A3_treatment", (v) =>
        v === "no_access" ? 1 : v === "scheduled" ? 0.5 : v === "none" ? 0 : undefined,
      );
      if (r.worst === undefined || !r.allAnswered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: r.worst,
        status: "ok",
        basis: r.worst === 1 ? "درمان/داروی ضروری بدون دسترسی مانده است." : r.worst === 0.5 ? "درمان ضروری در نوبت یا با تأخیر برنامه‌ریزی‌شده." : "درمان ضروری انجام‌نشده ثبت نشده است.",
      };
    }
    case "A4": {
      const v = get(a, "A4_burden");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      const effects = strList(get(a, "A4_effects"));
      if (v === "severe" || effects.length >= 2) {
        return { coeff: 1, status: "ok", basis: v === "severe" ? "فشار سنگین هزینه درمان" : "بدهی/فروش دارایی یا کاهش مصرف اساسی ناشی از هزینه درمان." };
      }
      if (v === "manageable" || effects.length === 1) {
        return { coeff: 0.5, status: "ok", basis: "فشار هزینه درمان قابل مدیریت یا با یک اثر جانبی." };
      }
      if (v === "low") return { coeff: 0, status: "ok", basis: "فشار معنادار هزینه درمان گزارش نشده است." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "A5": {
      if (members.length === 0) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      const r = worstMember(a, members, "A5_cover", (v) =>
        v === "none" ? 1 : v === "barriers" ? 0.5 : v === "effective" ? 0 : undefined,
      );
      if (r.worst === undefined || !r.allAnswered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: r.worst,
        status: "ok",
        basis: r.worst === 1 ? "عضو نیازمند بدون پوشش بیمه‌ای معتبر." : r.worst === 0.5 ? "پوشش موجود ولی استفاده مؤثر با مانع (هزینه/فاصله/نوبت)." : "پوشش معتبر با دسترسی عملی به خدمت ضروری.",
      };
    }
    case "A6": {
      const exp = strList(get(a, "A6_exp"));
      const now = get(a, "A6_now");
      if (specialStatus(get(a, "A6_exp"))) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (now === undefined || now === null) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      let coeff = Math.min(0.25 * exp.length, 1);
      if (exp.includes("hunger")) coeff = Math.max(coeff, 0.75);
      const names: Record<string, string> = {
        worry: "نگرانی از اتمام غذا",
        variety: "کاهش تنوع غذا",
        quantity: "کاهش مقدار غذا",
        mealskip: "حذف وعده",
        hunger: "گرسنگی",
      };
      return {
        coeff,
        status: "ok",
        pendingApproval: true,
        basis:
          exp.length === 0
            ? `هیچ تجربه ناامنی غذایی در ۳۰ روز اخیر ثبت نشده است. دسترسی فعلی: ${now ? "موجود" : "ناموجود"}.`
            : `تجربه‌های ۳۰ روز اخیر: ${exp.map((e) => names[e] ?? e).join("، ")}. دسترسی فعلی: ${now ? "موجود" : "ناموجود"}. آستانه‌های پنج‌حالته نیازمند تصویب مرجع است.`,
      };
    }
    case "A7": {
      const v = get(a, "A7_disrupt");
      const s = specialStatus(v);
      if (s) return { status: s, basis: "داده حساس — پاسخ ثبت نشده یا نیازمند بررسی است (بدون امتیازدهی اجباری)." };
      const danger = strList(get(a, "A7_danger"));
      if (v === "severe") return { coeff: 1, status: "ok", basis: "اختلال شدید عملکرد خانوار ناشی از مشکل روانی/مصرف مواد." };
      if (v === "moderate") return { coeff: 0.5, status: "ok", basis: "اختلال متوسط عملکرد خانوار." };
      if (v === "none" && danger.length === 0) return { coeff: 0, status: "ok", basis: "اختلال عملکرد یا خطر ایمنی ثبت نشده است." };
      if (v === "none" && danger.length > 0) return { coeff: 0.5, status: "ok", basis: "اختلال عملکرد ثبت نشده ولی نشانه خطر ایمنی ثبت شده است؛ نیازمند بررسی تخصصی محرمانه." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }

    /* ---------------- آموزش و رشد انسانی ---------------- */
    case "B1": {
      const rel = members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
      if (rel.length === 0) return { coeff: 0, status: "ok", basis: "عضو در سن آموزش اجباری (۶ تا ۱۸ سال) ثبت نشده است؛ ضریب صفر صحیح است." };
      const r = worstMember(a, rel, "B1_status", (v) =>
        v === "dropped" || v === "never" ? 1 : v === "interrupted" ? 0.5 : v === "attending" ? 0 : undefined,
      );
      if (r.worst === undefined || !r.allAnswered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: r.worst,
        status: "ok",
        pendingApproval: true,
        basis: r.worst === 1 ? "ترک تحصیل یا عدم ثبت‌نام در سن آموزش اجباری." : r.worst === 0.5 ? "وقفه تحصیلی فعال (حداقل مدت وقفه نیازمند تصویب مرجع)." : "ثبت‌نام و حضور فعال همه اعضای در سن آموزش.",
      };
    }
    case "B2": {
      const rel = members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
      if (rel.length === 0) return { coeff: 0, status: "ok", basis: "عضو در سن آموزش ثبت نشده است." };
      let worst = 0;
      let answered = true;
      for (const m of rel) {
        const risks = strList(getM(a, "B2_risks", m.id));
        const answeredQ = getM(a, "B2_risks", m.id) !== undefined;
        if (!answeredQ) answered = false;
        const c = risks.includes("child_labor") || risks.includes("forced_care") ? risks.length >= 2 ? 1 : 0.5 : risks.length >= 3 ? 1 : risks.length >= 1 ? 0.5 : 0;
        worst = Math.max(worst, c);
      }
      if (!answered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: worst,
        status: "ok",
        basis: worst === 0 ? "عامل خطر استمرار تحصیل ثبت نشده است." : "مبتنی بر تعداد و نوع عوامل خطر (غیبت، افت، هزینه، کار کودک، مراقبت اجباری).",
      };
    }
    case "B3": {
      const v = get(a, "B3_lit");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "cannot") return { coeff: 1, status: "ok", basis: "ناتوانی در امور پایه نوشتاری بدون کمک قابل اتکا." };
      if (v === "with_help") return { coeff: 0.5, status: "ok", basis: "انجام امور با کمک دیگران (وابستگی فعال)." };
      if (v === "full") return { coeff: 0, status: "ok", basis: "توانایی انجام امور پایه نوشتاری و پیگیری خدمات." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "B4": {
      const v = get(a, "B4_barriers");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "serious") return { coeff: 1, status: "ok", basis: "مانع جدی حل‌نشده دسترسی به آموزش (فاصله/هزینه/مدارک/معلولیت/ظرفیت)." };
      if (v === "resolvable") return { coeff: 0.5, status: "ok", basis: "مانع قابل حل موجود است." };
      if (v === "none") return { coeff: 0, status: "ok", basis: "مانع واقعی دسترسی به آموزش ثبت نشده است." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "B5": {
      const v = get(a, "B5_digital");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "missing") return { coeff: 1, status: "ok", basis: "نیاز واقعی آموزشی به ابزار دیجیتال بدون ابزار قابل استفاده." };
      if (v === "insufficient") return { coeff: 0.5, status: "ok", basis: "ابزار ناکافی یا اشتراک ابزار مانع انجام تکلیف است." };
      if (v === "adequate" || v === "no_need") return { coeff: 0, status: "ok", basis: v === "no_need" ? "نیاز واقعی به ابزار دیجیتال ثبت نشده است." : "ابزار و اتصال کافی موجود است." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "B6": {
      if (members.length === 0) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      const r = worstMember(a, members, "B6_need", (v) =>
        v === "unmet" ? 1 : v === "needs_assessment" ? 0.5 : v === "served" ? 0.5 : v === "none" ? 0 : undefined,
      );
      if (r.worst === undefined || !r.allAnswered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: r.worst,
        status: "ok",
        basis: r.worst === 1 ? "نیاز آموزشی ویژه تأییدشده بدون خدمت متناسب." : r.worst === 0.5 ? "نیاز ویژه با خدمت متناسب یا در فرایند ارزیابی." : "نیاز آموزشی ویژه ثبت نشده است.",
      };
    }
    case "B7": {
      const v = get(a, "B7_path");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "no_capability") return { coeff: 1, status: "ok", basis: "عضو واجد شرایط علاقه‌مند بدون هیچ مسیر آموزش/مهارت فعال." };
      if (v === "interested_no_path") return { coeff: 0.5, status: "ok", basis: "علاقه‌مندی موجود ولی مسیر فعال یا ابزار اولیه وجود ندارد." };
      if (v === "active") return { coeff: 0, status: "ok", basis: "مسیر فعال آموزش/مهارت با ابزار اولیه برای عضو واجد شرایط." };
      if (v === "no_eligible") return { coeff: 0, status: "ok", basis: "فاقد عضو واجد شرایط برای توانمندسازی؛ ضریب صفر صحیح است." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }

    /* ---------------- استاندارد زندگی و مسکن ---------------- */
    case "C1": {
      const place = get(a, "C1_place");
      const evict = get(a, "C1_eviction");
      if (specialStatus(place) || specialStatus(evict)) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (place === "nonresidential") return { coeff: 1, status: "ok", basis: "محل خواب فعلی غیرمسکونی/فضای عمومی است." };
      if (place === "temporary") return { coeff: 0.5, status: "ok", basis: "سکونت موقت یا مرکز نگهداری." };
      if (place === "stable" && evict === "imminent") return { coeff: 0.5, status: "ok", basis: "سکونت فعلی پایدار ولی اخطار تخلیه قریب‌الوقوع معتبر ثبت شده است." };
      if (place === "stable" && evict === "credible") return { coeff: 0.5, status: "ok", basis: "سکونت فعلی پایدار ولی اخطار/خطر تخلیه ثبت شده است." };
      if (place === "stable" && evict === "no") return { coeff: 0, status: "ok", basis: "محل خواب پایدار بدون اخطار تخلیه." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "C2": {
      const issues = strList(get(a, "C2_issues"));
      const answered = get(a, "C2_issues") !== undefined;
      if (!answered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (issues.includes("uninhabitable") || issues.includes("structural")) return { coeff: 1, status: "ok", basis: "خطر بحرانی سازه/برق یا غیرقابل سکونت‌بودن ثبت شده است." };
      if (issues.length >= 2) return { coeff: 0.5, status: "ok", basis: `دو یا چند نقص مسکن: ${issues.join("، ")}.` };
      if (issues.length === 1) return { coeff: 0.5, status: "ok", basis: `یک نقص مسکن: ${issues[0]}.` };
      return { coeff: 0, status: "ok", basis: "نقص بحرانی ایمنی در چک‌لیست ثبت نشده است." };
    }
    case "C3": {
      const v = get(a, "C3_right");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "risk") return { coeff: 1, status: "ok", basis: "خطر جدی ازدست‌دادن مسکن (اختلاف، وابستگی یا مانع تمدید)." };
      if (v === "ambiguous") return { coeff: 0.5, status: "ok", basis: "حق سکونت مبهم یا وابسته به فرد دیگر." };
      if (v === "clear") return { coeff: 0, status: "ok", basis: "حق سکونت روشن و بدون اختلاف." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "C4": {
      const rooms = num(get(a, "C4_rooms"));
      const safe = get(a, "C4_safesleep");
      if (rooms === undefined || rooms < 0) return { status: "incomplete", basis: "تعداد اتاق قابل سکونت ثبت نشده است." };
      if (specialStatus(safe)) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (safe === "none") return { coeff: 1, status: "ok", pendingApproval: true, basis: "فضای خواب ایمن برای همه اعضا وجود ندارد." };
      const n = Math.max(members.length, 1);
      const ppr = n / Math.max(rooms, 1);
      let base: number;
      if (ppr <= 1.5) base = 0;
      else if (ppr <= 2.5) base = 0.25;
      else if (ppr <= 3.5) base = 0.5;
      else if (ppr <= 5) base = 0.75;
      else base = 1;
      const coeff = safe === "partial" ? Math.max(base, 0.5) : base;
      return {
        coeff,
        status: "ok",
        pendingApproval: true,
        basis: `${n} عضو در ${rooms} اتاق قابل سکونت (نفر بر اتاق ≈ ${ppr.toFixed(2)})؛ وضعیت فضای خواب ایمن: ${safe === "all" ? "برای همه" : "جزئی"}. آستانه‌ها نیازمند تصویب مرجع است.`,
      };
    }
    case "C5": {
      const keys = ["C5_water", "C5_elec", "C5_cook"] as const;
      let answered = true;
      let worst = 0;
      for (const k of keys) {
        const v = get(a, k);
        if (specialStatus(v) || v === undefined) answered = false;
        if (v === "off") worst = Math.max(worst, 1);
        else if (v === "unstable") worst = Math.max(worst, 0.5);
      }
      if (!answered) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      return {
        coeff: worst,
        status: "ok",
        basis: worst === 1 ? "قطع حیاتی آب/برق/انرژی پخت‌وپز بدون جایگزین ایمن." : worst === 0.5 ? "قطعی‌های مکرر یا محدودیت پایدار خدمات." : "دسترسی پایدار به آب سالم، برق و انرژی ایمن.",
      };
    }
    case "C6": {
      const v = get(a, "C6_san");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "unsafe_missing") return { coeff: 1, status: "ok", basis: "سرویس/حمام/دفع فاضلاب ناسالم یا مفقود." };
      if (v === "shared_minor") return { coeff: 0.5, status: "ok", basis: "مشترک‌بودن یا نقص جزئی اماکن بهداشتی." };
      if (v === "good") return { coeff: 0, status: "ok", basis: "سرویس بهداشتی و حمام قابل استفاده و بهداشتی." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "C7": {
      const missing = strList(get(a, "C7_missing"));
      const impact = get(a, "C7_impact");
      if (get(a, "C7_missing") === undefined) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (impact === "disruptive" || missing.length >= 3) return { coeff: 1, status: "ok", basis: missing.length >= 3 ? `فقدان ${missing.length} وسیله ضروری با اختلال جدی در سلامت/غذا/مراقبت.` : "فقدان وسیله ضروری با اختلال جدی در زندگی روزمره." };
      if (impact === "minor" || missing.length >= 1) return { coeff: 0.5, status: "ok", basis: `فقدان وسایل: ${missing.join("، ") || "—"} با اثر جزئی.` };
      if (impact === "none" && missing.length === 0) return { coeff: 0, status: "ok", basis: "وسایل ضروری موجود و سالم‌اند." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "C8": {
      const rent = num(hh.household.monthlyRent) ?? 0;
      const charge = num(hh.household.monthlyCharge) ?? 0;
      const bills = num(hh.household.monthlyBills) ?? 0;
      const arrears = num(hh.household.arrears) ?? 0;
      const housing = rent + charge + bills; // ودیعه عمداً جدا است
      const reliable = hh.incomeSources
        .filter((s) => s.continuity === "regular" && s.reliability === "reliable")
        .reduce((acc, s) => acc + (s.monthlyAmount || 0), 0);
      const pl = hh.household.povertyLine;
      const plValid = !!pl && !!pl.monthlyPerCapita && pl.monthlyPerCapita > 0 && pl.status !== "invalid";
      const arrearsSeverity = get(a, "C8_arrears_severity");
      if (specialStatus(arrearsSeverity)) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (arrearsSeverity === undefined) return { status: "incomplete", basis: "وضعیت معوقات هزینه مسکن ثبت نشده است." };
      // درآمد صفر: طبق قاعده مرجع، مخرج از خط فقر خانوار ساخته می‌شود؛ بدون خط فقر معتبر → غیرنهایی
      const denom = reliable > 0 ? reliable : plValid ? pl!.monthlyPerCapita! * Math.max(members.length, 1) : undefined;
      if (denom === undefined || denom <= 0) {
        return { status: "incomplete", basis: "منبع قابل اتکا صفر/ناموجود است و خط فقر معتبر برای مبنای مقایسه ثبت نشده است؛ نتیجه غیرنهایی." };
      }
      const ratio = housing / denom;
      let coeff: number;
      if (ratio < 0.25) coeff = 0;
      else if (ratio < 0.4) coeff = 0.25;
      else if (ratio < 0.55) coeff = 0.5;
      else if (ratio < 0.7) coeff = 0.75;
      else coeff = 1;
      // معوقه فقط یک‌بار در همین شاخص لحاظ می‌شود (بدون شمارش تکراری در D3)
      if (arrearsSeverity === "significant") coeff = Math.max(coeff, 0.75);
      else if (arrearsSeverity === "minor") coeff = Math.max(coeff, 0.5);
      return {
        coeff,
        status: "ok",
        pendingApproval: true,
        basis: `هزینه ماهانه مسکن ${(housing).toLocaleString("fa-IR")} بر مبنای ${reliable > 0 ? "منابع قابل اتکا" : "خط فقر خانوار (درآمد قابل اتکا صفر است)"}؛ نسبت ≈ ${ratio.toFixed(2)}؛ معوقه: ${arrearsSeverity === "none" ? "ندارد" : arrearsSeverity === "minor" ? "جزئی" : "معنادار"}. ودیعه در محاسبه لحاظ نشده است.`,
      };
    }
    case "C9": {
      const v = get(a, "C9_access");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "serious") return { coeff: 1, status: "ok", basis: "مانع پایدار و جدی دسترسی به خدمات پایه." };
      if (v === "manageable") return { coeff: 0.5, status: "ok", basis: "دسترسی با بار زمان/هزینه قابل مدیریت." };
      if (v === "adequate") return { coeff: 0, status: "ok", basis: "دسترسی واقعی مناسب به خدمات پایه (بدون شمارش تکراری با A5/B4)." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }

    /* ---------------- معیشت، اشتغال و درآمد ---------------- */
    case "D1": {
      const noProvider = get(a, "D1_no_provider");
      if (noProvider === true) return { coeff: 1, status: "ok", basis: "خانوار بدون تأمین‌کننده با درآمد فعال ثبت شده است." };
      const provider = members.find((m) => m.isMainProvider);
      if (!provider) return { status: "incomplete", basis: "تأمین‌کننده اصلی خانوار مشخص نشده است." };
      const cont = getM(a, "D1_continuity", provider.id);
      const ability = getM(a, "D1_ability", provider.id);
      const seasonal = getM(a, "D1_seasonal", provider.id) === true;
      if (specialStatus(cont) || specialStatus(ability)) return { status: "incomplete", basis: INCOMPLETE_BASIS };
      if (cont === "stable") return { coeff: 0, status: "ok", basis: "درآمد تأمین‌کننده اصلی مستمر است (فصلی/روزمزدی به‌تنهایی امتیاز ندارد)." };
      if (cont === "irregular") return { coeff: 0.5, status: "ok", basis: "ناپایداری درآمد تأمین‌کننده در دوره ارزیابی احراز شده است." };
      if (cont === "none") {
        if (ability === "unable") return { coeff: 1, status: "ok", basis: "بدون درآمد و ناتوانی تأمین‌کننده از کار." };
        if (seasonal) return { coeff: 0.5, status: "ok", basis: "قطع موقت درآمد در فعالیت فصلی/روزمزدی با امکان بازگشت." };
        return { coeff: 1, status: "ok", basis: "بدون درآمد فعال از تأمین‌کننده اصلی." };
      }
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "D2": {
      const providerId = members.find((m) => m.isMainProvider)?.id;
      const eligible = members.filter(
        (m) => m.id !== providerId && m.employmentStatus === "unemployed_seeking",
      );
      const anyMember = members.length > 0;
      if (!anyMember) return { status: "incomplete", basis: "هیچ عضوی ثبت نشده است." };
      const n = eligible.length;
      const coeff = n === 0 ? 0 : n === 1 ? 0.5 : 1;
      return {
        coeff,
        status: "ok",
        basis:
          n === 0
            ? "فاقد عضو توانمند واجد شرایطِ جویای کار (خارج از تأمین‌کننده اصلی)؛ ضریب صفر صحیح است. تحصیل و مراقبت از بیکاری تفکیک شده است."
            : `${n} عضو توانمند جویای کار (غیر از تأمین‌کننده اصلی) ثبت شده است.`,
      };
    }
    case "D3": {
      const pl = hh.household.povertyLine;
      const plValid =
        !!pl && !!pl.monthlyPerCapita && pl.monthlyPerCapita > 0 && !!pl.source && pl.status !== "invalid";
      if (!plValid) {
        return {
          status: "incomplete",
          basis: "خط فقر منطقه‌ای معتبر (مبلغ، منبع، وضعیت اعتبار) ثبت نشده یا نامعتبر است؛ نتیجه D3 غیرنهایی می‌ماند.",
        };
      }
      const reliable = hh.incomeSources
        .filter((s) => s.continuity === "regular" && s.reliability === "reliable")
        .reduce((acc, s) => acc + (s.monthlyAmount || 0), 0);
      const excluded = hh.incomeSources.filter((s) => !(s.continuity === "regular" && s.reliability === "reliable"));
      const n = Math.max(members.length, 1);
      const perCapita = reliable / n;
      const ratio = perCapita / pl!.monthlyPerCapita!;
      let coeff: number;
      if (ratio >= 1.2) coeff = 0;
      else if (ratio >= 0.8) coeff = 0.25;
      else if (ratio >= 0.6) coeff = 0.5;
      else if (ratio >= 0.3) coeff = 0.75;
      else coeff = 1;
      return {
        coeff,
        status: "ok",
        pendingApproval: true,
        basis: `درآمد ماهانه قابل اتکا ${reliable.toLocaleString("fa-IR")} تومان برای ${n} نفر (سرانه ≈ ${perCapita.toLocaleString("fa-IR")}) نسبت به خط فقر ${pl!.monthlyPerCapita!.toLocaleString("fa-IR")} تومان/نفر؛ نسبت ≈ ${ratio.toFixed(2)}. برش‌ها پیشنهادی و نیازمند اعتبارسنجی است.${excluded.length ? ` ${excluded.length} منبع غیرمستمر/غیرقابل‌اتکا (مانند دریافت یک‌باره ارث) از درآمد ماهانه جدا شد.` : ""}`,
      };
    }

    /* ---------------- ظرفیت مراقبت و پشتوانه ---------------- */
    case "E1": {
      const v = get(a, "E1_outlook");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "none") return { coeff: 1, status: "ok", basis: "بدون مسیر واقعی حفظ/بهبود معاش در ۱۲ ماه آینده (با شواهد، نه صرفاً احساس)." };
      if (v === "uncertain") return { coeff: 0.5, status: "ok", basis: "مسیر معیشت نامطمئن با موانع پایدار." };
      if (v === "clear") return { coeff: 0, status: "ok", basis: "مسیر واقعی و محتمل حفظ/بهبود معاش وجود دارد." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "E2": {
      const needing = members.filter((m) => m.needsCare);
      const support = get(a, "E2_support");
      const sE2 = specialStatus(support);
      if (sE2) return { status: sE2, basis: INCOMPLETE_BASIS };
      if (needing.length === 0) return { coeff: 0, status: "ok", basis: "عضو نیازمند مراقبت مستمر ثبت نشده است." };
      if (support === "none") return { coeff: 1, status: "ok", basis: "نیاز مراقبتی بدون مراقب/پشتیبانی قابل اتکا." };
      if (support === "partial") return { coeff: 0.5, status: "ok", basis: "بار مراقبت سنگین با پشتیبانی ناکافی." };
      if (support === "adequate") return { coeff: 0, status: "ok", basis: "نیاز مراقبتی با مراقب و پشتیبانی پایدار تأمین می‌شود." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "E3": {
      const v = get(a, "E3_support");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "none") return { coeff: 1, status: "ok", basis: "فرد یا نهاد مؤثر در بحران وجود ندارد." };
      if (v === "sporadic") return { coeff: 0.5, status: "ok", basis: "حمایت موردی و ناپایدار." };
      if (v === "reliable") return { coeff: 0, status: "ok", basis: "حمایت مستمر و قابل اتکا در بحران." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
    case "E4": {
      const v = get(a, "E4_barrier");
      const s = specialStatus(v);
      if (s) return { status: s, basis: INCOMPLETE_BASIS };
      if (v === "blocking") return { coeff: 1, status: "ok", basis: "مانع هویتی/حقوقی/اداری، دسترسی به حق یا خدمت حیاتی را مسدود کرده است." };
      if (v === "in_progress") return { coeff: 0.5, status: "ok", basis: "مانع موجود با راه‌حل در جریان." };
      if (v === "none") return { coeff: 0, status: "ok", basis: "مانع مؤثر ثبت نشده است (نبود کد ملی به‌تنهایی امتیاز ندارد)." };
      return { status: "incomplete", basis: INCOMPLETE_BASIS };
    }
  }
}

/* ------------------------------------------------------------------ */
/* محاسبه کل ارزیابی                                                   */
/* ------------------------------------------------------------------ */

export function computeAssessment(hh: Assessment): MpiResult {
  const indicators: IndicatorResult[] = [];
  for (const dim of Object.keys(DIMENSIONS) as (keyof typeof DIMENSIONS)[]) {
    for (const id of INDICATORS_BY_DIM[dim]) {
      const out = resolveIndicator(id, hh.answers, hh);
      indicators.push({
        id,
        dimension: dim,
        weight: WEIGHTS[id],
        coeff: out.coeff,
        score: out.coeff !== undefined ? WEIGHTS[id] * out.coeff : undefined,
        status: out.status,
        basis: out.basis,
        pendingApproval: out.pendingApproval,
      });
    }
  }

  const dimensions = (Object.keys(DIMENSIONS) as (keyof typeof DIMENSIONS)[]).map((d) => {
    const items = indicators.filter((i) => i.dimension === d);
    const score = items.reduce((acc, i) => acc + (i.score ?? 0), 0);
    const complete = items.every((i) => i.status === "ok");
    return {
      id: d,
      title: DIMENSIONS[d].title,
      cap: DIMENSIONS[d].cap,
      score,
      pct: Math.min(100, (score / DIMENSIONS[d].cap) * 100),
      complete,
    };
  });

  const finalized = indicators.filter((i) => i.status === "ok");
  const partialSum = finalized.reduce((acc, i) => acc + (i.score ?? 0), 0);
  const completeness = Math.round((finalized.length / indicators.length) * 100);
  const allOk = finalized.length === indicators.length;

  const result: MpiResult = {
    indicators,
    dimensions,
    partialSum,
    status: allOk ? "final" : "nonfinal",
    completeness,
    finalizedCount: finalized.length,
  };
  if (allOk) {
    const total = Math.min(partialSum, TOTAL_CAP);
    result.total = total;
    result.totalPct = (total / TOTAL_CAP) * 100;
    const lv = LEVELS.find((l) => total >= l.min && total < l.max) ?? LEVELS[4];
    result.level = { index: lv.index, label: lv.label, min: lv.min, max: lv.max };
  }
  return result;
}

/* ------------------------------------------------------------------ */
/* پیشنهاد خودکار نشانه خطر و مسئله کیفیت داده                          */
/* ------------------------------------------------------------------ */

export type FlagSuggestion = Pick<RedFlag, "code" | "title" | "detail" | "suggested" | "confidentiality">;

export function suggestFlags(hh: Assessment): FlagSuggestion[] {
  const out: FlagSuggestion[] = [];
  const add = (code: FlagCode, title: string, detail: string, strict = false) =>
    out.push({ code, title, detail, suggested: true, confidentiality: strict ? "strict" : "restricted" });

  const members = hh.members;
  const a = hh.answers;

  // R1 — فوریت پزشکی
  for (const m of members) {
    if (getM(a, "A3_treatment", m.id) === "no_access" && getM(a, "A3_urgent", m.id) === true) {
      add("R1", "خطر جانی یا فوریت پزشکی", `${m.firstName}: درمان ضروری بدون دسترسی با نشانه فوریت.`);
      break;
    }
  }
  // R2 — بی‌خانمانی/تخلیه
  if (get(a, "C1_place") === "nonresidential" || get(a, "C1_eviction") === "imminent") {
    add("R2", "بی‌خانمانی یا اخطار تخلیه قریب‌الوقوع", "بر اساس پاسخ‌های بخش مسکن.");
  }
  // R3 — سوءتغذیه/بارداری
  for (const m of members) {
    if (getM(a, "A_malnut", m.id) === true) {
      add("R3", "سوءتغذیه کودک یا نیاز تغذیه‌ای ویژه", `${m.firstName}: نیازمند بررسی حرفه‌ای تغذیه و درمان.`);
      break;
    }
  }
  // R4 — کودک کار
  for (const m of members) {
    const risks = strList(getM(a, "B2_risks", m.id));
    if (risks.includes("child_labor") || (typeof m.age === "number" && m.age < 15 && m.employmentStatus === "employed")) {
      add("R4", "کودک کار یا کودک در خطر", `${m.firstName}: اثر کار بر امنیت و تحصیل نیازمند بررسی حفاظتی است.`);
      break;
    }
  }
  // R5 — خشونت/آسیب
  if (strList(get(a, "A7_danger")).length > 0) {
    add("R5", "خشونت یا خطر آسیب به خود/دیگران", "نشانه خطر ثبت‌شده — نیازمند تأیید تخصصی و گردش کار محرمانه.", true);
  }
  // R6 — فقدان مراقب
  const needingCare = members.filter((m) => m.needsCare);
  const caregiver = members.find((m) => m.isMainCaregiver);
  if (needingCare.length > 0 && !caregiver) {
    add("R6", "فقدان مراقب برای فرد وابسته", `${needingCare.length} عضو نیازمند مراقبت بدون مراقب اصلی ثبت‌شده.`);
  }
  // R7 — قطع خدمت حیاتی
  if (get(a, "A6_now") === false || get(a, "C5_water") === "off" || get(a, "C5_elec") === "off" || get(a, "C5_cook") === "off") {
    add("R7", "قطع خدمت حیاتی", "قطع دسترسی به غذا/آب/برق/انرژی بدون جایگزین گزارش شده است.");
  }
  // R8 — مانع حقوقی/اداری
  if (get(a, "E4_barrier") === "blocking") {
    add("R8", "مانع حقوقی/اداری مسدودکننده خدمت حیاتی", String(get(a, "E4_service") || "نیازمند بررسی تکمیلی مانع."));
  }
  // R9 — تناقض داده
  if (detectConflicts(hh).length > 0) {
    add("R9", "تناقض یا شبهه جدی در داده", "مغایرت بین پاسخ‌ها نیازمند راستی‌آزمایی میدانی است.");
  }
  return out;
}

/** بررسی تناقض‌های ساده بین پاسخ‌ها و اطلاعات پایه */
export function detectConflicts(hh: Assessment): string[] {
  const out: string[] = [];
  const a = hh.answers;
  const h = hh.household;
  const nonresidential =
    h.dwellingType === "غیرمسکونی" || h.dwellingType === "خودرو/فضای عمومی" ||
    get(a, "C1_place") === "nonresidential";
  if (nonresidential && get(a, "C1_place") === "stable") {
    out.push("نوع محل سکونت «غیرمسکونی» ثبت شده ولی وضعیت محل خواب «پایدار» است.");
  }
  if (h.tenureType === "مالک" && (h.monthlyRent ?? 0) > 0) {
    out.push("نوع حق سکونت «مالک» است ولی اجاره ماهانه مثبت ثبت شده است.");
  }
  const pl = h.povertyLine;
  if (pl && pl.status === "verified" && !pl.source) {
    out.push("خط فقر «تأییدشده» ثبت شده ولی منبع آن ثبت نشده است.");
  }
  const hasEffectiveInsurance = hh.members.some((m) => getM(a, "A5_cover", m.id) === "effective");
  const noAccess = hh.members.some((m) => getM(a, "A3_treatment", m.id) === "no_access");
  if (hasEffectiveInsurance && noAccess) {
    out.push("پوشش بیمه‌ای مؤثر ثبت شده ولی درمان ضروری بدون دسترسی است — موانع غیربیمه‌ای را بررسی کنید.");
  }
  return out;
}

/** مسائل کیفیت داده خودکار: پاسخ خاص، تناقض، نقص */
export function autoQualityIssues(hh: Assessment): Pick<DataQualityIssue, "scope" | "type" | "description">[] {
  const out: Pick<DataQualityIssue, "scope" | "type" | "description">[] = [];
  const a = hh.answers;
  for (const [key, val] of Object.entries(a)) {
    if (val === SPECIAL_ANSWERS.DONT_KNOW) {
      out.push({ scope: key.split("#")[0], type: "special_answer", description: `پاسخ «نمی‌دانم» برای ${key.split("#")[0]} ثبت شده است؛ نیازمند بررسی.` });
    } else if (val === SPECIAL_ANSWERS.REFUSE) {
      out.push({ scope: key.split("#")[0], type: "special_answer", description: `پاسخ «مایل به پاسخ نیستم» برای ${key.split("#")[0]} ثبت شده است؛ بدون امتیازدهی.` });
    } else if (val === SPECIAL_ANSWERS.NEED_REVIEW) {
      out.push({ scope: key.split("#")[0], type: "special_answer", description: `پاسخ «نیازمند بررسی» برای ${key.split("#")[0]} ثبت شده است.` });
    }
  }
  for (const c of detectConflicts(hh)) {
    out.push({ type: "conflict", description: c });
  }
  if (hh.members.length === 0) {
    out.push({ type: "missing", description: "هیچ عضوی برای خانوار ثبت نشده است." });
  }
  return out;
}

export function indicatorTitle(id: IndicatorId): string {
  return INDICATOR_TITLES[id] ?? id;
}

export { LEVELS, TOTAL_CAP };
