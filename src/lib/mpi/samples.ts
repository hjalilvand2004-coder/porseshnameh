import type { Assessment, Answers } from "./types";
import { uid } from "./format";

/**
 * سناریوهای نمونه برای آزمون سامانه — تماماً داده ساختگی.
 * ۱) خانوار کم‌امتیاز با نیاز درمانی فوری
 * ۲) خانوار بی‌خانمان
 * ۳) خانوار با اطلاعات ناقص و تناقض منابع
 */

export interface SampleDef {
  id: string;
  title: string;
  desc: string;
  build: () => Assessment;
}

const now = () => new Date().toISOString();

function emptyAssessment(): Assessment {
  return {
    id: uid("hh"),
    createdAt: now(),
    updatedAt: now(),
    ruleSetVersion: "EM-MPI-RF-1.0.0-demo",
    status: "draft",
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
    audit: [],
    changeStatements: [],
  };
}

function member(a: Assessment, m: Partial<Assessment["members"][number]> & { firstName: string; relation: string }): string {
  const id = uid("m");
  /* خانوارهای نمونه از منظر سابقه ثبتی «عضو خانواده ثبت‌شده»اند؛ همسفره با memberType: "companion" صریح می‌شود */
  a.members.push({ id, memberType: "registry", ...m } as Assessment["members"][number]);
  return id;
}

/* ---------- ۱) کم‌امتیاز با نیاز درمانی فوری ---------- */
const scenarioUrgent: SampleDef = {
  id: "urgent",
  title: "خانوار کم‌امتیاز با نیاز درمانی فوری",
  desc: "وضعیت معیشت نسبتاً پایدار ولی فرزند با درمان ضروری بدون دسترسی و نشانه فوریت — پیام: رسیدگی فوری مستقل از امتیاز.",
  build: () => {
    const a = emptyAssessment();
    a.requestTypes = ["کمک درمان", "رسیدگی فوری (وضعیت اضطراری)"];
    a.household = {
      responderName: "مریم احمدی (نمونه)",
      responderRelation: "همسر",
      headName: "علی محمدی (نمونه)",
      headNationalIdStatus: "has",
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
      [`A2_limit#${h}`]: "none", [`A3_treatment#${h}`]: "none",
      [`A5_cover#${h}`]: "effective",
      [`A1_disease#${w}`]: "none", [`A1_impact#${w}`]: "none",
      [`A2_limit#${w}`]: "none", [`A3_treatment#${w}`]: "none",
      [`A5_cover#${w}`]: "barriers",
      [`A1_disease#${c}`]: "uncontrolled", [`A1_impact#${c}`]: "severe",
      [`A2_limit#${c}`]: "none",
      [`A3_treatment#${c}`]: "no_access", [`A3_urgent#${c}`]: true,
      [`A3_cause#${c}`]: "هزینه جراحی و نبود تخت تخصصی در استان (داده ساختگی)",
      [`A5_cover#${c}`]: "barriers",
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
    return a;
  },
};

/* ---------- ۲) خانوار بی‌خانمان ---------- */
const scenarioHomeless: SampleDef = {
  id: "homeless",
  title: "خانوار بی‌خانمان",
  desc: "سکونت در فضای غیرمسکونی، قطع خدمات، نشانه‌های خطر R2/R7 — پیام: اولویت رسیدگی مستقل از امتیاز.",
  build: () => {
    const a = emptyAssessment();
    a.requestTypes = ["کمک مسکن و اجاره‌بها", "رسیدگی فوری (وضعیت اضطراری)"];
    a.household = {
      responderName: "زهرا کریمی (نمونه)",
      responderRelation: "سرپرست",
      headName: "زهرا کریمی (نمونه)",
      headNationalIdStatus: "missing",
      province: "خوزستان", county: "اهواز",
      dwellingType: "خودرو/فضای عمومی", tenureType: "—",
      noFixedAddress: true,
      arrears: 0,
      povertyLine: { monthlyPerCapita: 3_800_000, region: "استان خوزستان", source: "داده ساختگی برای نمایش", validAsOf: "۱۴۰۴/۰۶", status: "unverified" },
    };
    const h = member(a, { firstName: "زهرا", lastName: "کریمی (نمونه)", relation: "سرپرست", age: 34, gender: "female", isHead: true, isResponder: true, isMainProvider: true, isMainCaregiver: true, employmentStatus: "irregular" });
    const c1 = member(a, { firstName: "آیدا", relation: "فرزند", age: 9, gender: "female", schoolAge: true, educationStatus: "dropped", needsCare: false });
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
      { id: uid("flg"), code: "R2", title: "بی‌خانمانی یا اخطار تخلیه قریب‌الوقوع", detail: "سکونت در خودرو (نمونه)", recordedAt: now(), source: "بازدید میدانی", confidentiality: "normal", status: "confirmed", action: "هماهنگی مرکز نگهداری موقت" },
      { id: uid("flg"), code: "R3", title: "سوءتغذیه کودک یا نیاز تغذیه‌ای ویژه", detail: "کودک ۴ ساله با سوءتغذیه مشکوک (نمونه)", recordedAt: now(), source: "سنجش سلامت", confidentiality: "restricted", status: "reviewing" },
    ];
    return a;
  },
};

/* ---------- ۳) اطلاعات ناقص و تناقض ---------- */
const scenarioIncomplete: SampleDef = {
  id: "incomplete",
  title: "خانوار با اطلاعات ناقص و تناقض منابع",
  desc: "چند پاسخ «نمی‌دانم»، تناقض حق سکونت و اجاره، خط فقر ثبت‌نشده — پیام: نتیجه غیرنهایی/جمع جزئی، بدون امتیازدهی اجباری.",
  build: () => {
    const a = emptyAssessment();
    a.requestTypes = ["درخواست تشکیل/به‌روزرسانی پرونده حمایت"];
    a.household = {
      responderName: "حسن رضایی (نمونه)",
      responderRelation: "سرپرست",
      headName: "حسن رضایی (نمونه)",
      headNationalIdStatus: "in_progress",
      province: "کرمان", county: "سیرجان",
      dwellingType: "واحد مسکونی", tenureType: "مالک",
      monthlyRent: 2_500_000, // تناقض با «مالک»
      arrears: 4_000_000,
      // خط فقر عمداً ثبت نشده → D3 غیرنهایی
    };
    const h = member(a, { firstName: "حسن", lastName: "رضایی (نمونه)", relation: "سرپرست", age: 51, gender: "male", isHead: true, isMainProvider: true, employmentStatus: "unemployed_seeking" });
    const c = member(a, { firstName: "فاطمه", relation: "فرزند", age: 16, gender: "female", schoolAge: true, educationStatus: "interrupted" });
    const ans: Answers = {
      [`A1_disease#${h}`]: "__dontknow__",
      [`A1_impact#${h}`]: "moderate",
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
      { id: uid("iss"), type: "conflict", description: "نوع حق سکونت «مالک» است ولی اجاره ماهانه مثبت ثبت شده است.", createdAt: now(), status: "open" },
      { id: uid("iss"), type: "missing", description: "خط فقر منطقه‌ای معتبر ثبت نشده است؛ D3 غیرنهایی می‌ماند.", createdAt: now(), status: "open" },
    ];
    return a;
  },
};

export const SAMPLES: SampleDef[] = [scenarioUrgent, scenarioHomeless, scenarioIncomplete];
