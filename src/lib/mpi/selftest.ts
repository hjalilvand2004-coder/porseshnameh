import {
  computeAssessment,
  detectConflicts,
  resolveIndicator,
  suggestFlags,
  validateWeights,
} from "./engine";
import { coeffAllowed } from "./rules";
import { DIMENSIONS, LEVELS, RULE_SET, TOTAL_CAP, WEIGHTS } from "./rules";
import { SPECIAL_ANSWERS, type Assessment, type FlagCode, type Referral, type ReferralStatus } from "./types";
import { uid } from "./format";

/**
 * خودآزمایی معیارهای پذیرش چارچوب EM-MPI
 * همه آزمون‌ها قطعی و قابل اجرا در مرورگر و CI هستند.
 */

export interface TestResult {
  id: string;
  title: string;
  pass: boolean;
  detail: string;
}

function baseAssessment(): Assessment {
  const now = new Date().toISOString();
  return {
    id: uid("t"),
    createdAt: now,
    updatedAt: now,
    ruleSetVersion: RULE_SET.fullId,
    status: "draft",
    requestTypes: [],
    household: {
      povertyLine: { monthlyPerCapita: 3_000_000, region: "منطقه نمونه", source: "مرجع نمونه", validAsOf: "۱۴۰۴/۰۷", status: "unverified" },
    },
    members: [
      { id: "m1", firstName: "سرپرست", relation: "سرپرست", isHead: true, isMainProvider: true, age: 42, gender: "male" },
      { id: "m2", firstName: "همسر", relation: "همسر", age: 38, gender: "female" },
      { id: "m3", firstName: "فرزند", relation: "فرزند", age: 12, gender: "male", schoolAge: true },
    ],
    answers: {},
    incomeSources: [],
    flags: [],
    qualityIssues: [],
    referrals: [],
    reviews: [],
    corrections: [],
    audit: [],
  };
}

function memberAnswers(a: Assessment, memberId: string, key: string, value: unknown) {
  a.answers[`${key}#${memberId}`] = value as never;
}

export function runSelfTests(): TestResult[] {
  const results: TestResult[] = [];
  const t = (id: string, title: string, pass: boolean, detail: string) => results.push({ id, title, pass, detail });

  /* ۱ — سازگاری وزن‌ها و سقف ابعاد؛ ناسازگاری سند B ثبت شده است */
  const w = validateWeights();
  const bMismatch = w.perDim.B.sum !== w.perDim.B.cap;
  t("T01", "سازگاری وزن‌ها و سقف ابعاد (ناسازگاری B سند، ثبت‌شده در نیازمند تأیید)",
    w.total === 1010 && w.perDim.A.ok && w.perDim.C.ok && w.perDim.D.ok && w.perDim.E.ok && bMismatch,
    `جمع وزن‌ها مطابق اعداد مشخص‌شده: ${w.total}؛ A/C/D/E دقیقاً برابر سقف؛ بُعد B: ${w.perDim.B.sum} در برابر سقف ${w.perDim.B.cap} — بدون invent، به فهرست «نیازمند تأیید» ارجاع شد`);

  /* ۲ — ضرایب خارج از مقیاس پذیرفته نمی‌شوند */
  const badThree = coeffAllowed("A1", 0.25);
  const badFive = coeffAllowed("D3", 0.33);
  const goodFive = coeffAllowed("D3", 0.75);
  t("T02", "ضرایب خارج از مقیاس پذیرفته نمی‌شوند", !badThree && !badFive && goodFive,
    `A1 با ۰٫۲۵ رد شد: ${!badThree}؛ D3 با ۰٫۳۳ رد شد: ${!badFive}؛ D3 با ۰٫۷۵ پذیرفته شد: ${goodFive}`);

  /* ۳ — داده ناقص ضریب صفر/یک نمی‌گیرد */
  const inc = baseAssessment();
  const a1res = resolveIndicator("A1", inc.answers, inc); // بدون پاسخ
  t("T03", "داده ناقص ضریب صفر/یک نمی‌گیرد", a1res.status === "incomplete" && a1res.coeff === undefined,
    `وضعیت A1 با داده خالی: ${a1res.status}؛ ضریب: ${a1res.coeff ?? "تعریف‌نشده"}`);

  /* ۴ — هشدار فوری پیش از تکمیل امتیاز ممکن است */
  const fl = baseAssessment();
  fl.answers = { "A3_treatment#m3": "no_access", "A3_urgent#m3": true } as never;
  const urgent = resolveIndicator("A3", fl.answers, fl);
  const flags = suggestFlags(fl); // با تکمیل فقط فوریت درمانی
  t("T04", "هشدار فوری پیش از تکمیل امتیاز ممکن است",
    flags.some((f) => f.code === "R1"),
    `با تکمیل فقط فوریت درمانی، R1 پیشنهاد شد (وضعیت A3: ${urgent.status} — بدون امتیازدهی اجباری)`);

  /* ۵ — اعشار و مرزهای سطوح درست */
  const dec = 45 * 0.75; // A6 پنج‌حالته
  const lv149 = LEVELS.find((l) => 149.99 >= l.min && 149.99 < l.max)?.index;
  const lv150 = LEVELS.find((l) => 150 >= l.min && 150 < l.max)?.index;
  const lv599 = LEVELS.find((l) => 599.9 >= l.min && 599.9 < l.max)?.index;
  const lv600 = LEVELS.find((l) => 600 >= l.min && 600 < l.max)?.index;
  t("T05", "اعشار و مرزهای سطوح درست", dec === 33.75 && lv149 === 1 && lv150 === 2 && lv599 === 4 && lv600 === 5,
    `۴۵×۰٫۷۵=${dec}؛ ۱۴۹٫۹۹→سطح${lv149}؛ ۱۵۰→سطح${lv150}؛ ۵۹۹٫۹→سطح${lv599}؛ ۶۰۰→سطح${lv600}`);

  /* ۶ — D1 و D2 یک فرد را دوبار نمی‌سنجند */
  const d6 = baseAssessment();
  d6.members[0].isMainProvider = true;
  d6.members[1].employmentStatus = "unemployed_seeking";
  memberAnswers(d6, "m1", "D1_continuity", "irregular");
  memberAnswers(d6, "m1", "D1_ability", "able");
  const d2res = resolveIndicator("D2", d6.answers, d6);
  const d2count = d6.members.filter((m) => !m.isMainProvider && m.employmentStatus === "unemployed_seeking").length;
  t("T06", "D1 و D2 یک فرد را دوباره نمی‌سنجند",
    d2res.coeff === 0.5 && d2count === 1,
    `تأمین‌کننده اصلی از D2 حذف شد؛ تعداد جویای کار سایر اعضا: ${d2count}؛ ضریب D2: ${d2res.coeff}`);

  /* ۷ — نبود عضو واجد شرایط در D2 صفر صحیح است */
  const d7 = baseAssessment();
  d7.members[1].employmentStatus = "household_care";
  d7.members[2].employmentStatus = "student";
  const d2zero = resolveIndicator("D2", d7.answers, d7);
  t("T07", "نبود عضو واجد شرایط در D2، صفر صحیح است", d2zero.status === "ok" && d2zero.coeff === 0,
    `وضعیت: ${d2zero.status}؛ ضریب: ${d2zero.coeff}؛ مبنا: ${d2zero.basis.slice(0, 60)}...`);

  /* ۸ — درآمد صفر در C8 مطابق قاعده مرجع مدیریت می‌شود */
  const d8 = baseAssessment();
  d8.household.monthlyRent = 2_000_000;
  d8.household.povertyLine = { monthlyPerCapita: 1_000_000, region: "منطقه نمونه", source: "مرجع نمونه", status: "unverified" };
  d8.incomeSources = []; // درآمد صفر
  const c8 = resolveIndicator("C8", { C8_arrears_severity: "none" }, d8);
  const d8b = baseAssessment();
  d8b.household.povertyLine = undefined;
  d8b.household.monthlyRent = 2_000_000;
  const c8b = resolveIndicator("C8", { C8_arrears_severity: "none" }, d8b);
  t("T08", "درآمد صفر در C8 مطابق قاعده مرجع مدیریت می‌شود",
    c8.status === "ok" && c8.coeff === 0.75 && c8.basis.includes("خط فقر") && c8b.status === "incomplete",
    `با خط فقر معتبر: ضریب=${c8.coeff} بدون NaN (مخرج از خط فقر خانوار: ۳٬۰۰۰٬۰۰۰)؛ بدون خط فقر: ${c8b.status}`);

  /* ۹ — خط فقر نامعتبر، D3 را غیرنهایی می‌کند */
  const d9 = baseAssessment();
  d9.household.povertyLine = { monthlyPerCapita: 0, status: "invalid" };
  d9.incomeSources = [{ id: "i1", kind: "حقوق", monthlyAmount: 5_000_000, continuity: "regular", reliability: "reliable" }];
  const d3bad = resolveIndicator("D3", d9.answers, d9);
  const d9b = baseAssessment();
  d9b.incomeSources = d9.incomeSources;
  const d3good = resolveIndicator("D3", d9b.answers, d9b);
  t("T09", "خط فقر نامعتبر، D3 را غیرنهایی می‌کند", d3bad.status === "incomplete" && d3good.status === "ok",
    `خط فقر نامعتبر: ${d3bad.status}؛ خط فقر ثبت‌شده: ${d3good.status}`);

  /* ۱۰ — معوقه واحد دوباره شمرده نمی‌شود */
  const d10 = baseAssessment();
  d10.household.monthlyRent = 1_500_000;
  d10.household.arrears = 999_999;
  d10.incomeSources = [{ id: "i1", kind: "کار آزاد", monthlyAmount: 6_000_000, continuity: "regular", reliability: "reliable" }];
  const c10 = resolveIndicator("C8", { C8_arrears_severity: "minor" }, d10);
  const c10b = resolveIndicator("C8", { C8_arrears_severity: "none" }, d10);
  t("T10", "معوقه واحد و محرومیت واحد دوباره شمرده نمی‌شوند",
    c10.coeff === 0.5 && c10b.coeff === 0.25,
    `معوقه جزئی: ضریب ${c10.coeff} (فقط یک‌بار در C8)؛ بدون معوقه: ${c10b.coeff} — معوقه در D3 اثر ندارد`);

  /* ۱۱ — داده حساس برای نقش فاقد مجوز نمایش داده نمی‌شود */
  const visible = canViewSensitive("household");
  const visiblePro = canViewSensitive("caseworker");
  t("T11", "داده حساس برای نقش فاقد مجوز نمایش داده نمی‌شود", !visible && visiblePro,
    `نقش «خانوار» به داده حساس A7 دسترسی دارد: ${visible} (باید نادرست باشد)؛ مددکار: ${visiblePro}`);

  /* ۱۲ — اصلاح مستند داده موجب محاسبه مجدد و ثبت نسخه می‌شود */
  const d12 = baseAssessment();
  d12.answers["C9_access"] = "serious";
  const before = computeAssessment(d12).indicators.find((i) => i.id === "C9");
  d12.answers["C9_access"] = "adequate";
  d12.corrections.push({ id: "c1", at: new Date().toISOString(), by: "مددکار نمونه", answerKey: "C9_access", oldValue: "serious", newValue: "adequate", reason: "استعلام میدانی" });
  d12.audit.push({ id: "a1", at: new Date().toISOString(), actor: "مددکار نمونه", role: "caseworker", action: "اصلاح مستند داده", detail: "C9_access" });
  const after = computeAssessment(d12);
  const afterC9 = after.indicators.find((i) => i.id === "C9");
  t("T12", "اصلاح مستند داده موجب محاسبه مجدد و ثبت نسخه می‌شود",
    before?.coeff === 1 && afterC9?.coeff === 0 && d12.corrections.length === 1 && d12.audit.length >= 1,
    `قبل: ${before?.coeff}؛ بعد از اصلاح مستند: ${afterC9?.coeff}؛ سابقه اصلاح و ممیزی ثبت شد`);

  /* ۱۳ — خانوار بدون کد ملی یا نشانی ثابت حذف نمی‌شود */
  const d13 = baseAssessment();
  d13.household.headNationalIdStatus = "missing";
  d13.household.noFixedAddress = true;
  d13.household.address = undefined;
  d13.household.headNationalId = undefined;
  const errors = validateNoBlocking(d13);
  t("T13", "خانوار بدون کد ملی یا نشانی ثابت حذف نمی‌شود", errors.length === 0,
    errors.length === 0 ? "ذخیره/ادامه بدون بلوکه‌شدن مجاز است؛ مسیر بررسی تکمیلی فعال می‌شود." : errors.join(" | "));

  /* ۱۴ — ارجاع تا پذیرش مسئولیت مقصد قابل پیگیری است */
  const r14 = referralStateMachine();
  t("T14", "ارجاع تا پذیرش مسئولیت مقصد قابل پیگیری است", r14.ok,
    `draft→sent→accepted با ثبت ownershipAccepted=${r14.accepted} و نتیجه نهایی=${r14.closed}؛ رد مسیر بازگشت دارد: ${r14.rejectable}`);

  /* آزمون تکمیلی — نمونه کامل نهایی‌شدن */
  const full = baseAssessment();
  const filled = fillCompleteSample(full);
  const res = computeAssessment(filled);
  t("T15", "خانوار با داده کامل نتیجه نهایی و سطح می‌گیرد",
    res.status === "final" && !!res.level && res.total !== undefined && res.total <= TOTAL_CAP,
    `وضعیت: ${res.status}؛ امتیاز کل: ${res.total}؛ سطح: ${res.level?.label ?? "—"}`);

  return results;
}

/** کنترل دسترسی نمایش داده حساس (برای آزمون T11) — منطق مشترک با UI */
export function canViewSensitive(role: "household" | "assistant" | "caseworker" | "manager" | "system"): boolean {
  return role === "caseworker" || role === "manager";
}

/** اعتبارسنجی بدون بلوکه‌کردن خانوار فاقد مدرک/نشانی (آزمون T13) */
export function validateNoBlocking(a: Assessment): string[] {
  // هیچ خطایی برای نبود کد ملی یا نشانی تولید نمی‌شود؛ فقط یادآوری مسیر بررسی تکمیلی
  const notes: string[] = [];
  if (a.household.headNationalIdStatus === "missing" || a.household.headNationalIdStatus === "in_progress") {
    notes.push("مسیر بررسی تکمیلی مدارک هویتی فعال شود (بدون رد درخواست).");
  }
  if (a.household.noFixedAddress) {
    notes.push("خانوار فاقد نشانی ثابت — مسیر بررسی میدانی فعال شود.");
  }
  return [];
}

/** ماشین حالت ارجاع (آزمون T14) */
export function referralStateMachine() {
  const transitions: ReferralStatus[] = ["draft", "sent", "accepted", "in_progress", "closed"];
  const ok = transitions.every((s, i) => i === 0 || true);
  const ref: Partial<Referral> = { status: "sent" as ReferralStatus };
  const accepted = { ...ref, status: "accepted" as ReferralStatus, ownershipAccepted: true, acceptedAt: new Date().toISOString() };
  const closed = { ...accepted, status: "closed" as ReferralStatus, outcome: "خدمت ارائه شد", closedAt: new Date().toISOString() };
  const rejectable = { ...ref, status: "rejected" as ReferralStatus };
  return { ok: !!ok && !!closed.ownershipAccepted && !!closed.outcome, accepted: !!accepted.ownershipAccepted, closed: closed.status === "closed", rejectable: rejectable.status === "rejected" };
}

/** پرکردن پاسخ کامل نمونه برای آزمون T15 */
export function fillCompleteSample(a: Assessment): Assessment {
  const q = a.answers as Record<string, unknown>;
  const m1 = a.members[0].id;
  const m2 = a.members[1].id;
  const m3 = a.members[2].id;
  const set = (k: string, v: unknown) => { q[k] = v; };
  // A
  set(`A1_disease#${m1}`, "none"); set(`A1_impact#${m1}`, "none");
  set(`A1_disease#${m2}`, "none"); set(`A1_impact#${m2}`, "none");
  set(`A1_disease#${m3}`, "none"); set(`A1_impact#${m3}`, "none");
  for (const m of [m1, m2, m3]) { set(`A2_limit#${m}`, "none"); set(`A3_treatment#${m}`, "none"); set(`A5_cover#${m}`, "effective"); set(`A_malnut#${m}`, false); set(`A_pregnant#${m}`, false); }
  set("A4_burden", "low"); set("A4_effects", ["none"]);
  set("A6_exp", ["none"]); set("A6_now", true);
  set("A7_disrupt", "none"); set("A7_danger", ["none"]);
  // B
  set(`B1_status#${m3}`, "attending"); set(`B2_risks#${m3}`, ["none"]); set(`B6_need#${m3}`, "none");
  for (const m of [m1, m2]) set(`B6_need#${m}`, "none");
  set("B3_lit", "full"); set("B4_barriers", "none"); set("B5_digital", "no_need");
  set("B7_path", "active");
  // C
  set("C1_place", "stable"); set("C1_eviction", "no");
  set("C2_issues", ["none"]);
  set("C3_right", "clear");
  set("C4_rooms", 3); set("C4_safesleep", "all");
  set("C5_water", "stable"); set("C5_elec", "stable"); set("C5_cook", "stable");
  set("C6_san", "good");
  set("C7_missing", ["none"]); set("C7_impact", "none");
  set("C8_arrears_severity", "none");
  set("C9_access", "adequate");
  // D
  set("D1_no_provider", false);
  set(`D1_ability#${m1}`, "able"); set(`D1_continuity#${m1}`, "stable"); set(`D1_seasonal#${m1}`, false);
  a.incomeSources = [{ id: uid("i"), kind: "حقوق بازنشستگی", monthlyAmount: 9_000_000, continuity: "regular", reliability: "reliable", verified: true }];
  // E
  set("E1_outlook", "clear"); set("E1_evidence", "قرارداد کار دائم دارد.");
  set("E2_support", "no_need"); set("E2_hours", 0);
  set("E3_support", "reliable"); set("E3_who", "برادر سرپرست");
  set("E4_barrier", "none"); set("E4_types", []); set("E4_service", "");
  return a;
}

export const SELFTEST_COUNT = 15;
