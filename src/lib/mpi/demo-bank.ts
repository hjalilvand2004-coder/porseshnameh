import type { Assessment, Answers, FlagCode, RedFlag } from "./types";
import { FLAG_DEFS, RULE_SET } from "./rules";
import { uid } from "./format";

/**
 * بانک داده نمونه — ۸ پرونده خانوار با شرایط مختلف (تماماً ساختگی)
 *
 * هدف: نمایش رفتار موتور قواعد EM-MPI روی طیف کامل سطوح ۱ تا ۵،
 * وضعیت‌های پرونده (پیش‌نویس، ثبت‌شده، در بازبینی، ارجاع‌شده، بسته)،
 * پرچم‌های خطر، ارجاع، بررسی مددکار و مسائل کیفیت داده.
 *
 * ⚠️ هیچ‌کدام از این داده‌ها واقعی نیستند؛ همه نام‌ها پسوند «(نمونه)» دارند.
 */

const DAY = 24 * 3600 * 1000;
const daysAgo = (n: number) => new Date(Date.now() - n * DAY).toISOString();

function flag(code: FlagCode, detail: string, status: RedFlag["status"], ageDays: number, source = "ثبت نمونه"): RedFlag {
  const def = FLAG_DEFS[code];
  return {
    id: uid("flg"),
    code,
    title: def.title,
    detail: `${detail} (نمونه)`,
    recordedAt: daysAgo(ageDays),
    source,
    confidentiality: def.strict ? "strict" : "restricted",
    status,
  };
}

interface DemoBuilder {
  key: string;
  title: string;
  build: () => Assessment;
}

function base(status: Assessment["status"], ageDays: number): Assessment {
  return {
    id: uid("hh"),
    createdAt: daysAgo(ageDays),
    updatedAt: daysAgo(Math.max(ageDays - 3, 0)),
    ruleSetVersion: RULE_SET.fullId,
    status,
    demo: true,
    requestTypes: [],
    household: {},
    members: [],
    answers: {},
    incomeSources: [],
    flags: [],
    qualityIssues: [],
    referrals: [],
    reviews: [],
    corrections: [],
    audit: [
      {
        id: uid("aud"), at: daysAgo(ageDays), actor: "سیستم", role: "system",
        action: "ایجاد پرونده نمونه (بانک داده نمایشی)", detail: `نسخه قواعد: ${RULE_SET.fullId}`,
      },
    ],
    changeStatements: [],
  };
}

function member(
  a: Assessment,
  m: Partial<Assessment["members"][number]> & { firstName: string; relation: string; age: number },
): string {
  const id = uid("m");
  a.members.push({ id, ...m } as Assessment["members"][number]);
  return id;
}

/* ============================================================
   ۱) خانوار کم‌امتیاز با نیاز درمانی فوری — سطح ۲
   ============================================================ */
const urgent: DemoBuilder = {
  key: "urgent",
  title: "کم‌امتیاز با نیاز درمانی فوری (سطح ۲)",
  build: () => {
    const a = base("submitted", 12);
    a.requestTypes = ["کمک درمان", "رسیدگی فوری (وضعیت اضطراری)"];
    a.household = {
      responderName: "مریم احمدی (نمونه)", responderRelation: "همسر",
      headName: "علی محمدی (نمونه)", headNationalIdStatus: "has",
      headNationalId: "1234567891", headBirthDate: "۱۳۵۸/۰۳/۱۴", postalCode: "1234567890",
      province: "اصفهان", county: "نجف‌آباد",
      dwellingType: "واحد مسکونی", tenureType: "مستأجر",
      monthlyRent: 3_000_000, monthlyCharge: 300_000, monthlyBills: 400_000, arrears: 0,
      povertyLine: { monthlyPerCapita: 4_500_000, region: "استان اصفهان", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۷", status: "unverified" },
    };
    const h = member(a, { firstName: "علی", lastName: "محمدی (نمونه)", relation: "سرپرست", age: 45, gender: "male", isHead: true, isMainProvider: true, employmentStatus: "employed" });
    const w = member(a, { firstName: "مریم", relation: "همسر", age: 40, gender: "female" });
    const c = member(a, { firstName: "سینا", relation: "فرزند", age: 13, gender: "male", schoolAge: true, educationStatus: "enrolled" });
    const ans: Answers = {
      [`A1_disease#${h}`]: "controlled", [`A1_impact#${h}`]: "moderate",
      [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "effective",
      [`A1_disease#${w}`]: "none", [`A1_impact#${w}`]: "none", [`A2_limit#${w}`]: "none", [`A3_treatment#${w}`]: "none", [`A5_cover#${w}`]: "barriers",
      [`A1_disease#${c}`]: "uncontrolled", [`A1_impact#${c}`]: "severe", [`A2_limit#${c}`]: "none",
      [`A3_treatment#${c}`]: "no_access", [`A3_urgent#${c}`]: true,
      [`A3_cause#${c}`]: "هزینه جراحی و نبود تخت تخصصی در استان (داده ساختگی)", [`A5_cover#${c}`]: "barriers",
      [`B6_need#${h}`]: "none", [`B6_need#${w}`]: "none", [`B6_need#${c}`]: "none",
      [`B1_status#${c}`]: "attending", [`B2_risks#${c}`]: ["absence"],
      A4_burden: "manageable", A4_effects: ["debt"],
      A6_exp: ["none"], A6_now: true,
      A7_disrupt: "none", A7_danger: ["none"],
      [`A_malnut#${c}`]: false, [`A_pregnant#${w}`]: false,
      B3_lit: "full", B4_barriers: "none", B5_digital: "adequate", B7_path: "active",
      C1_place: "stable", C1_eviction: "no",
      C2_issues: ["none"], C3_right: "clear",
      C4_rooms: 2, C4_safesleep: "all",
      C5_water: "stable", C5_elec: "stable", C5_cook: "stable",
      C6_san: "good", C7_missing: ["none"], C7_impact: "none",
      C8_arrears_severity: "none", C9_access: "adequate",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "able", [`D1_continuity#${h}`]: "stable", [`D1_seasonal#${h}`]: false,
      E1_outlook: "clear", E1_evidence: "اشتغال دائم دارد (داده ساختگی).",
      E2_support: "no_need", E2_hours: 0,
      E3_support: "reliable", E3_who: "برادر سرپرست",
      E4_barrier: "none", E4_types: [], E4_service: "",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "حقوق کارگری", receiverMemberId: h, monthlyAmount: 12_000_000, continuity: "regular", reliability: "reliable", verified: false },
    ];
    a.flags = [flag("R1", "کودک ۱۳ ساله با درمان ضروری بدون دسترسی و نشانه فوریت پزشکی", "open", 3, "پرسشنامه — گام سلامت")];
    return a;
  },
};

/* ============================================================
   ۲) خانوار بی‌خانمان — سطح ۵
   ============================================================ */
const homeless: DemoBuilder = {
  key: "homeless",
  title: "بی‌خانمان با دو کودک (سطح ۵)",
  build: () => {
    const a = base("in_review", 20);
    a.requestTypes = ["کمک مسکن و اجاره‌بها", "رسیدگی فوری (وضعیت اضطراری)"];
    a.household = {
      responderName: "زهرا کریمی (نمونه)", responderRelation: "سرپرست",
      headName: "زهرا کریمی (نمونه)", headNationalIdStatus: "missing",
      headNationalId: undefined, headBirthDate: "۱۳۷۲/۰۹/۰۲", postalCode: undefined,
      province: "خوزستان", county: "اهواز",
      dwellingType: "خودرو/فضای عمومی", tenureType: "—",
      noFixedAddress: true, arrears: 0,
      povertyLine: { monthlyPerCapita: 3_800_000, region: "استان خوزستان", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۶", status: "unverified" },
    };
    const h = member(a, { firstName: "زهرا", lastName: "کریمی (نمونه)", relation: "سرپرست", age: 34, gender: "female", isHead: true, isResponder: true, isMainProvider: true, isMainCaregiver: true, employmentStatus: "irregular" });
    const c1 = member(a, { firstName: "آیدا", relation: "فرزند", age: 9, gender: "female", schoolAge: true, educationStatus: "dropped" });
    const c2 = member(a, { firstName: "نیما", relation: "فرزند", age: 4, gender: "male", needsCare: true });
    const ans: Answers = {
      [`A1_disease#${h}`]: "none", [`A1_impact#${h}`]: "none", [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "none",
      [`A1_disease#${c1}`]: "none", [`A1_impact#${c1}`]: "none", [`A2_limit#${c1}`]: "none", [`A3_treatment#${c1}`]: "scheduled", [`A5_cover#${c1}`]: "none",
      [`A1_disease#${c2}`]: "controlled", [`A1_impact#${c2}`]: "moderate", [`A2_limit#${c2}`]: "unmet", [`A3_treatment#${c2}`]: "no_access", [`A5_cover#${c2}`]: "none",
      [`B1_status#${c1}`]: "dropped", [`B1_months#${c1}`]: 7, [`B1_reason#${c1}`]: "جابه‌جایی مکرر و نبود ثبات (نمونه)", [`B2_risks#${c1}`]: ["absence", "decline", "cost"],
      [`B6_need#${h}`]: "none", [`B6_need#${c1}`]: "none", [`B6_need#${c2}`]: "needs_assessment",
      A4_burden: "severe", A4_effects: ["debt", "food"],
      A6_exp: ["worry", "variety", "quantity", "mealskip"], A6_now: false,
      A7_disrupt: "moderate", A7_danger: ["none"],
      [`A_malnut#${c2}`]: true, [`A_pregnant#${h}`]: false,
      B3_lit: "with_help", B4_barriers: "serious", B5_digital: "missing", B7_path: "interested_no_path",
      C1_place: "nonresidential", C1_eviction: "imminent",
      C2_issues: ["uninhabitable"], C3_right: "risk",
      C4_rooms: 0, C4_safesleep: "none",
      C5_water: "unstable", C5_elec: "off", C5_cook: "off",
      C6_san: "unsafe_missing",
      C7_missing: ["fridge", "cooker", "heater", "bed"], C7_impact: "disruptive",
      C8_arrears_severity: "none", C9_access: "serious",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "limited", [`D1_continuity#${h}`]: "irregular", [`D1_seasonal#${h}`]: true,
      E1_outlook: "none", E1_evidence: "بدون مسکن و شغل ثابت (نمونه).",
      E2_support: "partial", E2_hours: 8,
      E3_support: "sporadic", E3_who: "خیریه محلی گاه‌گاهی",
      E4_barrier: "blocking", E4_types: ["identity", "admin"], E4_service: "ثبت‌نام کودک در مدرسه به دلیل نبود مدارک هویتی (نمونه)",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "کار روزمزد", receiverMemberId: h, monthlyAmount: 3_500_000, continuity: "occasional", reliability: "uncertain" },
    ];
    a.flags = [
      flag("R2", "سکونت در خودرو، بدون مسکن پایدار", "confirmed", 15, "بازدید میدانی"),
      flag("R3", "کودک ۴ ساله با سوءتغذیه مشکوک", "reviewing", 12, "سنجش سلامت"),
      flag("R7", "قطع برق و انرژی پخت‌وپز بدون جایگزین", "open", 10, "گام مسکن"),
    ];
    a.audit.push({
      id: uid("aud"), at: daysAgo(12), actor: "مددکار نمونه", role: "caseworker",
      action: "بازبینی اولیه پرونده", detail: "تأیید وضعیت بی‌خانمانی و ارجاع به مرکز نگهداری موقت (نمونه)",
    });
    return a;
  },
};

/* ============================================================
   ۳) اطلاعات ناقص و تناقض منابع — غیرنهایی
   ============================================================ */
const incomplete: DemoBuilder = {
  key: "incomplete",
  title: "اطلاعات ناقص و تناقض منابع (غیرنهایی)",
  build: () => {
    const a = base("draft", 5);
    a.requestTypes = ["درخواست تشکیل/به‌روزرسانی پرونده حمایت"];
    a.household = {
      responderName: "حسن رضایی (نمونه)", responderRelation: "سرپرست",
      headName: "حسن رضایی (نمونه)", headNationalIdStatus: "in_progress",
      headNationalId: "2345678909", headBirthDate: "۱۳۴۹/۱۱/۲۵", postalCode: "2345678901",
      province: "کرمان", county: "سیرجان",
      dwellingType: "واحد مسکونی", tenureType: "مالک",
      monthlyRent: 2_500_000, // تناقض با «مالک»
      arrears: 4_000_000,
      // خط فقر عمداً ثبت نشده → D3 غیرنهایی
    };
    const h = member(a, { firstName: "حسن", lastName: "رضایی (نمونه)", relation: "سرپرست", age: 51, gender: "male", isHead: true, isMainProvider: true, employmentStatus: "unemployed_seeking" });
    const c = member(a, { firstName: "فاطمه", relation: "فرزند", age: 16, gender: "female", schoolAge: true, educationStatus: "interrupted" });
    const ans: Answers = {
      [`A1_disease#${h}`]: "__dontknow__", [`A1_impact#${h}`]: "moderate",
      [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "barriers",
      [`A1_disease#${c}`]: "none", [`A1_impact#${c}`]: "none",
      [`A2_limit#${c}`]: "none", [`A3_treatment#${c}`]: "none", [`A5_cover#${c}`]: "__refuse__",
      [`B1_status#${c}`]: "interrupted", [`B1_months#${c}`]: "__needreview__", [`B2_risks#${c}`]: ["decline", "cost"],
      [`B6_need#${h}`]: "none", [`B6_need#${c}`]: "__dontknow__",
      A4_burden: "__dontknow__", A4_effects: ["debt"],
      A6_exp: ["worry"], A6_now: true,
      A7_disrupt: "__needreview__", A7_danger: ["none"],
      [`A_malnut#${c}`]: false, [`A_pregnant#${c}`]: false,
      B3_lit: "with_help", B4_barriers: "__dontknow__", B5_digital: "__dontknow__", B7_path: "interested_no_path",
      C1_place: "stable", C1_eviction: "credible",
      C2_issues: ["damp"], C3_right: "ambiguous",
      C4_rooms: "__dontknow__" as never, C4_safesleep: "partial",
      C5_water: "stable", C5_elec: "unstable", C5_cook: "stable",
      C6_san: "shared_minor",
      C7_missing: ["heater"], C7_impact: "minor",
      C8_arrears_severity: "significant", C9_access: "manageable",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "able", [`D1_continuity#${h}`]: "none", [`D1_seasonal#${h}`]: false,
      E1_outlook: "uncertain", E1_evidence: "بدون شغل و با بدهی (نمونه).",
      E2_support: "__dontknow__", E2_hours: 0,
      E3_support: "sporadic", E3_who: "همسایه‌ها",
      E4_barrier: "in_progress", E4_types: ["identity"], E4_service: "درخواست تعویض شناسنامه در جریان است (نمونه)",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "یارانه", receiverMemberId: h, monthlyAmount: 1_400_000, continuity: "regular", reliability: "reliable" },
      { id: uid("inc"), kind: "ارثیه (دریافت یک‌باره)", receiverMemberId: h, monthlyAmount: 30_000_000, continuity: "one_off", reliability: "reliable", note: "در درآمد ماهانه لحاظ نمی‌شود (نمونه)" },
      { id: uid("inc"), kind: "کار آزاد", receiverMemberId: h, monthlyAmount: 2_000_000, continuity: "occasional", reliability: "disputed" },
    ];
    a.qualityIssues = [
      { id: uid("iss"), type: "conflict", description: "نوع حق سکونت «مالک» است ولی اجاره ماهانه مثبت ثبت شده است.", createdAt: daysAgo(4), status: "open" },
      { id: uid("iss"), type: "missing", description: "خط فقر منطقه‌ای معتبر ثبت نشده است؛ D3 غیرنهایی می‌ماند.", createdAt: daysAgo(4), status: "open" },
    ];
    a.flags = [flag("R9", "تناقض حق سکونت/اجاره و منبع درآمد موردی با ادعای مالکیت", "open", 4, "موتور تناقض‌یاب")];
    return a;
  },
};

/* ============================================================
   ۴) مادر سرپرست با سه فرزند — محرومیت آموزشی — سطح ۲
   ============================================================ */
const singleMother: DemoBuilder = {
  key: "single-mother",
  title: "مادر سرپرست با سه فرزند (سطح ۲)",
  build: () => {
    const a = base("submitted", 9);
    a.requestTypes = ["حمایت تحصیلی", "کمک معیشت و تغذیه"];
    a.household = {
      responderName: "نیلوفر صادقی (نمونه)", responderRelation: "سرپرست",
      headName: "نیلوفر صادقی (نمونه)", headNationalIdStatus: "has",
      headNationalId: "3456789017", headBirthDate: "۱۳۶۸/۰۵/۰۸", postalCode: "3456789012",
      province: "خراسان رضوی", county: "مشهد",
      dwellingType: "واحد مسکونی", tenureType: "مستأجر",
      monthlyRent: 4_000_000, monthlyCharge: 250_000, monthlyBills: 450_000, arrears: 2_000_000,
      povertyLine: { monthlyPerCapita: 4_500_000, region: "استان خراسان رضوی", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۷", status: "unverified" },
    };
    const h = member(a, { firstName: "نیلوفر", lastName: "صادقی (نمونه)", relation: "سرپرست", age: 36, gender: "female", isHead: true, isResponder: true, isMainProvider: true, isMainCaregiver: true, employmentStatus: "irregular" });
    const c1 = member(a, { firstName: "امیر", relation: "فرزند", age: 15, gender: "male", schoolAge: true, educationStatus: "interrupted" });
    const c2 = member(a, { firstName: "سارا", relation: "فرزند", age: 11, gender: "female", schoolAge: true, educationStatus: "enrolled" });
    const c3 = member(a, { firstName: "رضا", relation: "فرزند", age: 7, gender: "male", schoolAge: true, educationStatus: "enrolled" });
    const ans: Answers = {
      [`A1_disease#${h}`]: "none", [`A1_impact#${h}`]: "none", [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "effective",
      [`A1_disease#${c1}`]: "none", [`A1_impact#${c1}`]: "none", [`A2_limit#${c1}`]: "none", [`A3_treatment#${c1}`]: "none", [`A5_cover#${c1}`]: "barriers",
      [`A1_disease#${c2}`]: "none", [`A1_impact#${c2}`]: "none", [`A2_limit#${c2}`]: "none", [`A3_treatment#${c2}`]: "none", [`A5_cover#${c2}`]: "barriers",
      [`A1_disease#${c3}`]: "none", [`A1_impact#${c3}`]: "none", [`A2_limit#${c3}`]: "none", [`A3_treatment#${c3}`]: "none", [`A5_cover#${c3}`]: "barriers",
      [`B1_status#${c1}`]: "interrupted", [`B1_months#${c1}`]: 4, [`B1_reason#${c1}`]: "کار در تعمیرگاه برای کمک به معیشت (نمونه)", [`B2_risks#${c1}`]: ["absence", "cost"],
      [`B1_status#${c2}`]: "attending", [`B2_risks#${c2}`]: ["cost"],
      [`B1_status#${c3}`]: "attending", [`B2_risks#${c3}`]: [],
      [`B6_need#${h}`]: "none", [`B6_need#${c1}`]: "none", [`B6_need#${c2}`]: "none", [`B6_need#${c3}`]: "none",
      A4_burden: "manageable", A4_effects: [],
      A6_exp: ["worry"], A6_now: true,
      A7_disrupt: "none", A7_danger: ["none"],
      [`A_malnut#${c1}`]: false, [`A_malnut#${c2}`]: false, [`A_malnut#${c3}`]: false, [`A_pregnant#${h}`]: false,
      B3_lit: "full", B4_barriers: "resolvable", B4_detail: "هزینه لوازم التحریر و پوشاک مدرسه (نمونه)", B5_digital: "insufficient", B7_path: "interested_no_path",
      C1_place: "stable", C1_eviction: "no",
      C2_issues: ["damp"], C3_right: "clear",
      C4_rooms: 2, C4_safesleep: "all",
      C5_water: "stable", C5_elec: "stable", C5_cook: "stable",
      C6_san: "good",
      C7_missing: ["washer"], C7_impact: "minor",
      C8_arrears_severity: "minor", C9_access: "manageable",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "able", [`D1_continuity#${h}`]: "irregular", [`D1_seasonal#${h}`]: true,
      E1_outlook: "uncertain", E1_evidence: "خیاطی در منزل با سفارش نامنظم (نمونه).",
      E2_support: "no_need", E2_hours: 0,
      E3_support: "sporadic", E3_who: "خانواده مادری گاه‌گاهی",
      E4_barrier: "none", E4_types: [], E4_service: "",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "خیاطی در منزل", receiverMemberId: h, monthlyAmount: 9_500_000, continuity: "regular", reliability: "reliable", verified: false },
      { id: uid("inc"), kind: "یارانه نقدی", receiverMemberId: h, monthlyAmount: 1_400_000, continuity: "regular", reliability: "reliable" },
    ];
    a.flags = [flag("R4", "نوجوان ۱۵ ساله در حال ترک تحصیل و ورود به کار (نمونه)", "reviewing", 6, "گام آموزش")];
    return a;
  },
};

/* ============================================================
   ۵) سالمند تنها — سطح ۳
   ============================================================ */
const elderly: DemoBuilder = {
  key: "elderly",
  title: "سالمند تنها با ناتوانی از کار (سطح ۳)",
  build: () => {
    const a = base("in_review", 15);
    a.requestTypes = ["مراقبت و نگهداری", "کمک معیشت و تغذیه"];
    a.household = {
      responderName: "جعفر نوروزی (نمونه)", responderRelation: "سرپرست",
      headName: "جعفر نوروزی (نمونه)", headNationalIdStatus: "has",
      headNationalId: "4567890124", headBirthDate: "۱۳۴۰/۰۱/۱۹", postalCode: "4567890123",
      province: "گیلان", county: "رشت",
      dwellingType: "خانه ویلایی قدیمی", tenureType: "استیجاری نزد اقوام",
      monthlyRent: 2_200_000, monthlyCharge: 0, monthlyBills: 500_000, arrears: 0,
      povertyLine: { monthlyPerCapita: 4_500_000, region: "استان گیلان", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۶", status: "unverified" },
    };
    const h = member(a, { firstName: "جعفر", lastName: "نوروزی (نمونه)", relation: "سرپرست", age: 72, gender: "male", isHead: true, isResponder: true, isMainProvider: true, isMainCaregiver: false, employmentStatus: "unable", needsCare: true });
    const ans: Answers = {
      [`A1_disease#${h}`]: "controlled", [`A1_impact#${h}`]: "moderate",
      [`A2_limit#${h}`]: "supported", [`A2_aid#${h}`]: "عصا و واکر از بهزیستی (نمونه)",
      [`A3_treatment#${h}`]: "scheduled", [`A5_cover#${h}`]: "effective",
      A4_burden: "manageable", A4_effects: [],
      A6_exp: ["variety"], A6_now: true,
      A7_disrupt: "none", A7_danger: ["none"],
      [`A_malnut#${h}`]: false, [`A_pregnant#${h}`]: false,
      B3_lit: "with_help", B4_barriers: "resolvable", B5_digital: "no_need",
      [`B6_need#${h}`]: "none",
      B7_path: "no_capability",
      C1_place: "stable", C1_eviction: "no",
      C2_issues: ["temp"], C3_right: "ambiguous",
      C4_rooms: 1, C4_safesleep: "all",
      C5_water: "stable", C5_elec: "unstable", C5_cook: "stable",
      C5_effect: "قطع‌های مکرر برق در ساعات سرما (نمونه)",
      C6_san: "shared_minor",
      C7_missing: ["heater"], C7_impact: "minor",
      C8_arrears_severity: "none", C9_access: "manageable",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "unable", [`D1_continuity#${h}`]: "none", [`D1_seasonal#${h}`]: false,
      E1_outlook: "uncertain", E1_evidence: "مستمری غیرکافی؛ امکان کار ندارد (نمونه).",
      E2_support: "partial", E2_hours: 4,
      E3_support: "sporadic", E3_who: "فرزند ساکن شهر دیگر با تماس تلفنی",
      E4_barrier: "in_progress", E4_types: ["admin"], E4_service: "درخواست سطح‌بندی معلولیت در جریان است (نمونه)",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "مستمری بازنشستگی", receiverMemberId: h, monthlyAmount: 4_500_000, continuity: "regular", reliability: "reliable", verified: true },
    ];
    a.qualityIssues = [
      { id: uid("iss"), type: "unverified", description: "مستمری اعلام‌شده نیازمند راستی‌آزمایی با فیش حقوقی است (نمونه).", createdAt: daysAgo(11), status: "open" },
    ];
    a.flags = [flag("R6", "سالمند ناتوان با نیاز مراقبتی ۴ ساعته روزانه و بدون مراقب ساکن", "confirmed", 11, "بازدید خانه")];
    return a;
  },
};

/* ============================================================
   ۶) محرومیت چندبعدی شدید — سطح ۵ — ارجاع‌شده
   ============================================================ */
const severe: DemoBuilder = {
  key: "severe",
  title: "محرومیت چندبعدی شدید — ارجاع‌شده (سطح ۵)",
  build: () => {
    const a = base("referred", 25);
    a.requestTypes = ["رسیدگی فوری (وضعیت اضطراری)", "کمک معیشت و تغذیه", "کمک مسکن و اجاره‌بها"];
    a.household = {
      responderName: "محمود شریفی (نمونه)", responderRelation: "سرپرست",
      headName: "محمود شریفی (نمونه)", headNationalIdStatus: "has",
      headNationalId: undefined, headBirthDate: "۱۳۵۲/۰۷/۳۰", postalCode: undefined,
      province: "سیستان و بلوچستان", county: "چابهار",
      dwellingType: "سازه غیررسمی (کلبه چادری)", tenureType: "سکونت غیرمجاز",
      arrears: 0,
      povertyLine: { monthlyPerCapita: 4_000_000, region: "استان سیستان و بلوچستان", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۵", status: "unverified" },
    };
    const h = member(a, { firstName: "محمود", lastName: "شریفی (نمونه)", relation: "سرپرست", age: 39, gender: "male", isHead: true, isResponder: true, isMainProvider: true, employmentStatus: "irregular" });
    const w = member(a, { firstName: "عزیزه", relation: "همسر", age: 33, gender: "female", isMainCaregiver: true, employmentStatus: "unemployed_not_seeking" });
    const c1 = member(a, { firstName: "یوسف", relation: "فرزند", age: 14, gender: "male", schoolAge: true, educationStatus: "never", note: "کودک کار — چرخ‌دوزی خیابانی (نمونه)" });
    const c2 = member(a, { firstName: "معصومه", relation: "فرزند", age: 10, gender: "female", schoolAge: true, educationStatus: "dropped" });
    const c3 = member(a, { firstName: "حبیب", relation: "فرزند", age: 5, gender: "male", needsCare: true });
    const ans: Answers = {
      [`A1_disease#${h}`]: "uncontrolled", [`A1_impact#${h}`]: "severe",
      [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "no_access", [`A5_cover#${h}`]: "none",
      [`A1_disease#${w}`]: "none", [`A1_impact#${w}`]: "none", [`A2_limit#${w}`]: "none", [`A3_treatment#${w}`]: "none", [`A5_cover#${w}`]: "none",
      [`A1_disease#${c1}`]: "none", [`A1_impact#${c1}`]: "none", [`A2_limit#${c1}`]: "none", [`A3_treatment#${c1}`]: "none", [`A5_cover#${c1}`]: "none",
      [`A1_disease#${c2}`]: "none", [`A1_impact#${c2}`]: "none", [`A2_limit#${c2}`]: "none", [`A3_treatment#${c2}`]: "scheduled", [`A5_cover#${c2}`]: "none",
      [`A1_disease#${c3}`]: "uncontrolled", [`A1_impact#${c3}`]: "severe", [`A2_limit#${c3}`]: "unmet", [`A3_treatment#${c3}`]: "no_access", [`A5_cover#${c3}`]: "none",
      [`B1_status#${c1}`]: "never", [`B2_risks#${c1}`]: ["child_labor", "absence", "decline"],
      [`B1_status#${c2}`]: "dropped", [`B1_months#${c2}`]: 14, [`B1_reason#${c2}`]: "فاصله و نبود مدرسه دخترانه نزدیک (نمونه)", [`B2_risks#${c2}`]: ["absence", "cost", "child_labor"],
      [`B6_need#${h}`]: "none", [`B6_need#${w}`]: "none", [`B6_need#${c1}`]: "none", [`B6_need#${c2}`]: "unmet", [`B6_need#${c3}`]: "needs_assessment",
      A4_burden: "severe", A4_effects: ["debt", "food"],
      A6_exp: ["worry", "variety", "quantity", "mealskip", "hunger"], A6_now: false,
      A7_disrupt: "moderate", A7_danger: ["none"],
      [`A_malnut#${c3}`]: true, [`A_pregnant#${w}`]: false,
      B3_lit: "cannot", B4_barriers: "serious", B4_detail: "نزدیک‌ترین مدرسه ۹ کیلومتر بدون سرویس (نمونه)", B5_digital: "missing",
      B7_path: "no_capability", B7_skills: "چرخ‌دوزی دستی سرپرست (نمونه)",
      C1_place: "nonresidential", C1_eviction: "imminent",
      C2_issues: ["structural", "uninhabitable"], C3_right: "risk",
      C4_rooms: 1, C4_safesleep: "none",
      C5_water: "unstable", C5_elec: "off", C5_cook: "off",
      C5_effect: "آب با تانکر و با تأخیر؛ شب‌ها بی‌روشنایی (نمونه)",
      C6_san: "unsafe_missing",
      C7_missing: ["fridge", "cooker", "heater", "bed"], C7_impact: "disruptive",
      C8_arrears_severity: "significant", C9_access: "serious",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "limited", [`D1_continuity#${h}`]: "irregular", [`D1_seasonal#${h}`]: true,
      E1_outlook: "none", E1_evidence: "کار روزمزد ساحلی با فصل سرد متوقف می‌شود (نمونه).",
      E2_support: "partial", E2_hours: 6,
      E3_support: "none", E3_who: "",
      E4_barrier: "blocking", E4_types: ["identity", "admin"], E4_service: "شناسنامه معتبر ندارند؛ هیچ ثبت‌نام مدرسه یا بیمه‌ای ممکن نشده (نمونه)",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "کار روزمزد ساحلی", receiverMemberId: h, monthlyAmount: 2_800_000, continuity: "occasional", reliability: "uncertain" },
    ];
    a.flags = [
      flag("R2", "سکونت در کلبه غیرقابل سکونت با خطر تخریب", "confirmed", 24, "بازدید میدانی"),
      flag("R3", "سوءتغذیه کودک ۵ ساله", "confirmed", 22, "سنجش سلامت"),
      flag("R4", "کودک ۱۴ ساله شاغل و خارج از آموزش", "confirmed", 22, "گام آموزش"),
      flag("R7", "قطع برق و انرژی پخت‌وپز بدون جایگزین", "open", 21, "گام مسکن"),
      flag("R8", "نبود شناسنامه — انسداد دسترسی به مدرسه و بیمه", "confirmed", 20, "گام مراقبت"),
    ];
    a.referrals = [
      {
        id: uid("ref"), path: "cdi_fast_multi", destination: "کمیته امداد شهرستان + بهزیستی + آموزش‌وپرورش (نمونه)",
        priority: "fast", reason: "محرومیت چندبعدی شدید با چند نشانه خطر فعال (نمونه)",
        createdAt: daysAgo(18), status: "accepted", sentAt: daysAgo(18), acceptedAt: daysAgo(15),
        ownershipAccepted: true, ownerName: "مددکار مسئول شهرستان (نمونه)",
      },
    ];
    a.reviews = [
      { id: uid("rev"), at: daysAgo(19), by: "مددکار ارشد نمونه", role: "caseworker", note: "همه ۳۰ شاخص تکمیل و با بازدید میدانی تطبیق داده شد؛ اولویت رسیدگی فوری (نمونه).", decision: "data_confirmed" },
      { id: uid("rev"), at: daysAgo(18), by: "مددکار ارشد نمونه", role: "caseworker", note: "ارجاع سریع و چندبخشی ثبت شد؛ پیگیری پذیرش مسئولیت تا مقصد ادامه دارد (نمونه).", decision: "referred" },
    ];
    return a;
  },
};

/* ============================================================
   ۷) کودک معلول و بار مراقبت — سطح ۳
   ============================================================ */
const disabledChild: DemoBuilder = {
  key: "disabled-child",
  title: "کودک معلول و بار مراقبت سنگین (سطح ۳)",
  build: () => {
    const a = base("in_review", 7);
    a.requestTypes = ["توانمندسازی و اشتغال", "کمک درمان"];
    a.household = {
      responderName: "سمیه موسوی (نمونه)", responderRelation: "همسر",
      headName: "رسول موسوی (نمونه)", headNationalIdStatus: "has",
      headNationalId: "5678901230", headBirthDate: "۱۳۶۳/۱۲/۰۳", postalCode: "5678901234",
      province: "آذربایجان شرقی", county: "تبریز",
      dwellingType: "آپارتمان اجاره‌ای", tenureType: "مستأجر",
      monthlyRent: 5_000_000, monthlyCharge: 400_000, monthlyBills: 600_000, arrears: 0,
      povertyLine: { monthlyPerCapita: 4_500_000, region: "استان آذربایجان شرقی", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۷", status: "unverified" },
    };
    const h = member(a, { firstName: "رسول", lastName: "موسوی (نمونه)", relation: "سرپرست", age: 42, gender: "male", isHead: true, isMainProvider: true, employmentStatus: "employed" });
    const w = member(a, { firstName: "سمیه", relation: "همسر", age: 38, gender: "female", isMainCaregiver: true });
    const c1 = member(a, { firstName: "پارسا", relation: "فرزند", age: 8, gender: "male", schoolAge: true, educationStatus: "interrupted", needsCare: true, note: "معلولیت حرکتی — نیاز به گفتاردرمانی و کاردرمانی (نمونه)" });
    const c2 = member(a, { firstName: "یاسمن", relation: "فرزند", age: 12, gender: "female", schoolAge: true, educationStatus: "enrolled" });
    const g = member(a, { firstName: "گلناز", relation: "مادر سرپرست", age: 68, gender: "female", needsCare: false });
    const ans: Answers = {
      [`A1_disease#${h}`]: "none", [`A1_impact#${h}`]: "none", [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "effective",
      [`A1_disease#${w}`]: "none", [`A1_impact#${w}`]: "none", [`A2_limit#${w}`]: "none", [`A3_treatment#${w}`]: "none", [`A5_cover#${w}`]: "effective",
      [`A1_disease#${c1}`]: "none", [`A1_impact#${c1}`]: "none", [`A2_limit#${c1}`]: "unmet", [`A2_aid#${c1}`]: "وسیله کمکی تجویز شده ولی تهیه نشده؛ جلسات کاردرمانی متوقف (نمونه)", [`A3_treatment#${c1}`]: "scheduled", [`A5_cover#${c1}`]: "barriers", [`A5_barrier#${c1}`]: "فرانشیز و نبود متخصص در بیمه روستایی (نمونه)",
      [`A1_disease#${c2}`]: "none", [`A1_impact#${c2}`]: "none", [`A2_limit#${c2}`]: "none", [`A3_treatment#${c2}`]: "none", [`A5_cover#${c2}`]: "effective",
      [`A1_disease#${g}`]: "controlled", [`A1_impact#${g}`]: "moderate", [`A2_limit#${g}`]: "none", [`A3_treatment#${g}`]: "none", [`A5_cover#${g}`]: "effective",
      [`B1_status#${c1}`]: "interrupted", [`B1_months#${c1}`]: 3, [`B1_reason#${c1}`]: "سفرهای مکرر درمانی و نبود مدرسه استثنایی نزدیک (نمونه)", [`B2_risks#${c1}`]: ["absence"],
      [`B1_status#${c2}`]: "attending", [`B2_risks#${c2}`]: ["forced_care"],
      [`B6_need#${h}`]: "none", [`B6_need#${w}`]: "none", [`B6_need#${c1}`]: "needs_assessment", [`B6_need#${c2}`]: "none", [`B6_need#${g}`]: "none",
      A4_burden: "manageable", A4_effects: ["debt"],
      A6_exp: ["worry", "variety", "mealskip"], A6_now: true,
      A7_disrupt: "none", A7_danger: ["none"],
      [`A_malnut#${c1}`]: false, [`A_malnut#${c2}`]: false, [`A_pregnant#${w}`]: false,
      B3_lit: "full", B4_barriers: "resolvable", B4_detail: "انتقال مدرسه به مرکز توان‌بخشی‌دار در جریان است (نمونه)", B5_digital: "insufficient", B7_path: "no_eligible",
      C1_place: "stable", C1_eviction: "no",
      C2_issues: ["wiring"], C3_right: "clear",
      C4_rooms: 2, C4_safesleep: "partial",
      C5_water: "stable", C5_elec: "stable", C5_cook: "stable",
      C6_san: "good", C7_missing: [], C7_impact: "none",
      C8_arrears_severity: "minor", C9_access: "adequate",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "able", [`D1_continuity#${h}`]: "stable", [`D1_seasonal#${h}`]: false,
      E1_outlook: "clear", E1_evidence: "شغل ثابت صنعتی دارد؛ خطر فقط هزینه‌های توان‌بخشی است (نمونه).",
      E2_support: "partial", E2_hours: 6,
      E3_support: "reliable", E3_who: "مادر خانم در نگهداری کودک کمک می‌کند (نمونه)",
      E4_barrier: "none", E4_types: [], E4_service: "",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "حقوق صنعتی", receiverMemberId: h, monthlyAmount: 14_000_000, continuity: "regular", reliability: "reliable", verified: true },
    ];
    a.flags = [
      flag("R6", "کودک معلول با نیاز مراقبت ۶ ساعته و مراقب واحد", "open", 5, "گام مراقبت"),
    ];
    a.audit.push({
      id: uid("aud"), at: daysAgo(4), actor: "کارشناس توان‌بخشی نمونه", role: "caseworker",
      action: "بررسی حرفه‌ای وضعیت کودک", detail: "نیاز گفتاردرمانی/کاردرمانی تأیید شد؛ معرفی‌نامه صادر گردید (نمونه)",
    });
    return a;
  },
};

/* ============================================================
   ۸) خانوار با وضعیت مناسب — سطح ۱ — پرونده بسته
   ============================================================ */
const stable: DemoBuilder = {
  key: "stable",
  title: "خانوار برخوردار — سطح ۱ (پرونده بسته)",
  build: () => {
    const a = base("closed", 30);
    a.requestTypes = ["درخواست تشکیل/به‌روزرسانی پرونده حمایت"];
    a.household = {
      responderName: "فرهاد هاشمی (نمونه)", responderRelation: "سرپرست",
      headName: "فرهاد هاشمی (نمونه)", headNationalIdStatus: "has",
      headNationalId: "6789012346", headBirthDate: "۱۳۷۵/۰۴/۱۷", postalCode: "6789012345",
      province: "البرز", county: "کرج",
      dwellingType: "آپارتمان مالک", tenureType: "مالک",
      monthlyRent: 0, monthlyCharge: 350_000, monthlyBills: 800_000, arrears: 0,
      povertyLine: { monthlyPerCapita: 4_500_000, region: "استان البرز", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۷", status: "unverified" },
    };
    const h = member(a, { firstName: "فرهاد", lastName: "هاشمی (نمونه)", relation: "سرپرست", age: 47, gender: "male", isHead: true, isMainProvider: true, employmentStatus: "employed" });
    const w = member(a, { firstName: "شیرین", relation: "همسر", age: 41, gender: "female" });
    const c = member(a, { firstName: "ترانه", relation: "فرزند", age: 10, gender: "female", schoolAge: true, educationStatus: "enrolled" });
    const ans: Answers = {
      [`A1_disease#${h}`]: "none", [`A1_impact#${h}`]: "none", [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none", [`A5_cover#${h}`]: "effective",
      [`A1_disease#${w}`]: "none", [`A1_impact#${w}`]: "none", [`A2_limit#${w}`]: "none", [`A3_treatment#${w}`]: "none", [`A5_cover#${w}`]: "effective",
      [`A1_disease#${c}`]: "none", [`A1_impact#${c}`]: "none", [`A2_limit#${c}`]: "none", [`A3_treatment#${c}`]: "none", [`A5_cover#${c}`]: "effective",
      [`B1_status#${c}`]: "attending", [`B2_risks#${c}`]: [],
      [`B6_need#${h}`]: "none", [`B6_need#${w}`]: "none", [`B6_need#${c}`]: "none",
      A4_burden: "low", A4_effects: [],
      A6_exp: [], A6_now: true,
      A7_disrupt: "none", A7_danger: ["none"],
      [`A_malnut#${c}`]: false, [`A_pregnant#${w}`]: false,
      B3_lit: "full", B4_barriers: "none", B5_digital: "adequate", B7_path: "no_eligible",
      C1_place: "stable", C1_eviction: "no",
      C2_issues: [], C3_right: "clear",
      C4_rooms: 2, C4_safesleep: "all",
      C5_water: "stable", C5_elec: "stable", C5_cook: "stable",
      C6_san: "good", C7_missing: [], C7_impact: "none",
      C8_arrears_severity: "none", C9_access: "adequate",
      D1_no_provider: false,
      [`D1_ability#${h}`]: "able", [`D1_continuity#${h}`]: "stable", [`D1_seasonal#${h}`]: false,
      E1_outlook: "clear", E1_evidence: "قرارداد کاری بلندمدت (نمونه).",
      E2_support: "no_need", E2_hours: 0,
      E3_support: "reliable", E3_who: "شبکه خانوادگی (نمونه)",
      E4_barrier: "none", E4_types: [], E4_service: "",
    };
    a.answers = ans;
    a.incomeSources = [
      { id: uid("inc"), kind: "حقوق اداری", receiverMemberId: h, monthlyAmount: 18_000_000, continuity: "regular", reliability: "reliable", verified: true },
    ];
    a.reviews = [
      { id: uid("rev"), at: daysAgo(24), by: "مددکار نمونه", role: "caseworker", note: "امتیاز محرومیت در حداقل است؛ نیاز حمایت معیشتی احراز نشد (نمونه).", decision: "data_confirmed" },
    ];
    a.audit.push({
      id: uid("aud"), at: daysAgo(23), actor: "مددکار نمونه", role: "caseworker",
      action: "بستن پرونده", detail: "غربالگری سطح ۱ — بدون نیاز حمایت (نمونه)",
    });
    return a;
  },
};

export const DEMO_BANK: DemoBuilder[] = [urgent, homeless, incomplete, singleMother, elderly, severe, disabledChild, stable];

/** ساخت هر ۸ پرونده نمونه با شناسه‌های تازه */
export function buildDemoBank(): Assessment[] {
  return DEMO_BANK.map((d) => d.build());
}
