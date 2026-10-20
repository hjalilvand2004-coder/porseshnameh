/**
 * مدل داده سامانه پرسش‌نامه — غربالگری EM-MPI
 * نسخه: ۱.۰.۰ نمایشی (Demo)
 *
 * اصل بنیادین: اطلاعات پرونده‌ای از امتیاز محرومیت تفکیک می‌شود.
 * هیچ خروجی الگوریتمی به‌تنهایی تصمیم نهایی درباره خانوار نیست.
 */

export type DimensionId = "A" | "B" | "C" | "D" | "E";

export type IndicatorId =
  | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7"
  | "B1" | "B2" | "B3" | "B4" | "B5" | "B6" | "B7"
  | "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7" | "C8" | "C9"
  | "D1" | "D2" | "D3"
  | "E1" | "E2" | "E3" | "E4";

/** پاسخ‌های خاص: بدون تبدیل خودکار به امتیاز */
export const SPECIAL_ANSWERS = {
  DONT_KNOW: "__dontknow__",
  REFUSE: "__refuse__",
  NEED_REVIEW: "__needreview__",
  NONE: "__none__",
} as const;

export type AnswerValue = string | string[] | number | boolean | null | undefined;
export type Answers = Record<string, AnswerValue>;
/** کلید پاسخ سطح عضو: `${questionId}#${memberId}` */

export interface Member {
  id: string;
  firstName: string;
  lastName?: string;
  /** اختیاری — نبود مدرک موجب رد درخواست نمی‌شود */
  nationalId?: string;
  nationalIdStatus?: "has" | "missing" | "in_progress";
  /** نسبت با سرپرست */
  relation: string;
  /** سن به سال کامل */
  age?: number;
  gender?: "male" | "female" | "other";
  /** نقش‌ها (می‌توانند هم‌زمان باشند) */
  isHead?: boolean;
  isResponder?: boolean;
  isMainProvider?: boolean;
  isMainCaregiver?: boolean;
  /** وضعیت تحصیل (برای اعضای در سن آموزش) */
  educationStatus?: "enrolled" | "interrupted" | "dropped" | "finished" | "never" | "na";
  educationGrade?: string;
  /** وضعیت اشتغال */
  employmentStatus?: "employed" | "irregular" | "unemployed_seeking" | "unemployed_not_seeking" | "unable" | "student" | "household_care" | "na";
  /** نیازمند مراقبت است */
  needsCare?: boolean;
  /** در سن آموزش اجباری (۶ تا ۱۸ سال) */
  schoolAge?: boolean;
  note?: string;
}

export interface IncomeSource {
  id: string;
  kind: string; // حقوق، یارانه، کار آزاد، ارثیه، ...)
  receiverMemberId?: string;
  /** مبلغ ماهانه به تومان */
  monthlyAmount: number;
  /** استمرار: مستمر یا موردی/یک‌باره */
  continuity: "regular" | "occasional" | "one_off";
  /** قابلیت اتکا */
  reliability: "reliable" | "uncertain" | "disputed";
  verified?: boolean;
  note?: string;
}

export interface PovertyLine {
  /** مبلغ ماهانه خط فقر برای هر نفر (تومان) */
  monthlyPerCapita?: number;
  region?: string;
  source?: string;
  /** تاریخ اعتبار (رشته آزاد، مثلاً ۱۴۰۴/۰۷) */
  validAsOf?: string;
  /** وضعیت اعتبارسنجی مرجع */
  status: "invalid" | "unverified" | "verified";
}

/** نشانه خطر (R1 تا R9) — امتیاز افزایشی ندارد؛ فقط هشدار و مسیر رسیدگی */
export type FlagCode = "R1" | "R2" | "R3" | "R4" | "R5" | "R6" | "R7" | "R8" | "R9";

export interface RedFlag {
  id: string;
  code: FlagCode;
  title: string;
  detail?: string;
  recordedAt: string;
  source?: string;
  /** سطح محرمانگی */
  confidentiality: "normal" | "restricted" | "strict";
  ownerRole?: string;
  status: "open" | "reviewing" | "confirmed" | "resolved" | "dismissed";
  action?: string;
  dueAt?: string;
  responseAt?: string;
  closeReason?: string;
  /** آیا توسط سیستم پیشنهاد شده (نیازمند تأیید تخصصی) */
  suggested?: boolean;
}

export type IssueType = "missing" | "conflict" | "unverified" | "special_answer" | "manual";

export interface DataQualityIssue {
  id: string;
  /** شاخص یا دامنه مرتبط */
  scope?: IndicatorId | string;
  type: IssueType;
  description: string;
  createdAt: string;
  status: "open" | "resolved";
  resolution?: string;
  resolvedAt?: string;
}

export type ReferralStatus = "draft" | "sent" | "accepted" | "rejected" | "in_progress" | "closed";

export interface Referral {
  id: string;
  /** مسیر خروجی (از REFERRAL_PATHS) */
  path: string;
  destination: string;
  priority: "normal" | "priority" | "fast" | "immediate";
  reason?: string;
  createdAt: string;
  status: ReferralStatus;
  sentAt?: string;
  acceptedAt?: string;
  /** پذیرش مسئولیت مقصد — تا پذیرش، ارجاع قابل پیگیری است */
  ownershipAccepted?: boolean;
  ownerName?: string;
  outcome?: string;
  closedAt?: string;
}

export interface ProfessionalReview {
  id: string;
  at: string;
  by: string;
  role: string;
  note: string;
  decision: "data_confirmed" | "field_review" | "correction" | "referred" | "other";
  linkedReferralId?: string;
}

/** اصلاح مستند داده توسط مددکار — موجب محاسبه مجدد و ثبت نسخه می‌شود */
export interface DataCorrection {
  id: string;
  at: string;
  by: string;
  answerKey: string;
  oldValue: AnswerValue;
  newValue: AnswerValue;
  reason: string;
  evidence?: string;
}

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  role: "household" | "assistant" | "caseworker" | "manager" | "system";
  action: string;
  detail?: string;
}

export interface Household {
  responderName?: string;
  responderRelation?: string;
  headName?: string;
  headNationalId?: string;
  headNationalIdStatus?: "has" | "missing" | "in_progress";
  contactPhone?: string;
  province?: string;
  county?: string;
  /** نوع محل سکونت */
  dwellingType?: string;
  /** نوع حق سکونت */
  tenureType?: string;
  address?: string;
  noFixedAddress?: boolean;
  /** فیلدهای مسکن */
  usableRooms?: number;
  usableArea?: number;
  monthlyRent?: number;
  deposit?: number;
  monthlyCharge?: number;
  monthlyBills?: number;
  arrears?: number;
  /** خط فقر منطقه‌ای */
  povertyLine?: PovertyLine;
  /** دوره حمایت / سابقه خدمات */
  supportSince?: string;
  supportStatus?: string;
  priorServices?: string;
}

export type AssessmentStatus = "draft" | "submitted" | "in_review" | "referred" | "closed";

/**
 * نتیجه استعلام از مراجع ثبتی (وب‌سرویس سازمان‌های متولی).
 * طبق قاعده تقدم منابع، داده مرجع ثبتی «ملاک» است و در فرم غربالگری قابل ویرایش نیست.
 * در نسخه نمایشی آفلاین، پاسخ به‌شکل شبیه‌سازی‌شده از داده واردشده ساخته می‌شود.
 */
export interface WebServiceResult {
  serviceId: string;
  status: "ok" | "partial" | "error";
  fetchedAt: string;
  /** داده دریافتی (کلید → مقدار نمایشی) */
  data: Record<string, string>;
  /** یادداشت وضعیت (مثلاً اطلاعات کافی برای استعلام وجود ندارد) */
  note?: string;
}

export interface Assessment {
  id: string;
  createdAt: string;
  updatedAt: string;
  /** نسخه قواعد مورد استفاده در محاسبه */
  ruleSetVersion: string;
  status: AssessmentStatus;
  /** پرونده نمونه آزمایشی (بانک داده نمایشی) — در گزارش‌ها برچسب می‌گیرد */
  demo?: boolean;
  /** نوع درخواست (چندانتخابی) — تفکیک از «نیاز شناسایی‌شده» */
  requestTypes: string[];
  requestNotes?: string;
  household: Household;
  members: Member[];
  answers: Answers;
  incomeSources: IncomeSource[];
  flags: RedFlag[];
  qualityIssues: DataQualityIssue[];
  referrals: Referral[];
  reviews: ProfessionalReview[];
  corrections: DataCorrection[];
  audit: AuditEvent[];
  /** سهم خانوار: بیانیه تغییر شرایط */
  changeStatements?: { at: string; text: string }[];
  /** نتایج استعلام مراجع ثبتی (وب‌سرویس‌ها) — کلید = شناسه خدمت */
  webServices?: Record<string, WebServiceResult>;
}

/** وضعیت هر شاخص پس از حل */
export type IndicatorStatus = "ok" | "incomplete" | "conflict";

export interface IndicatorResult {
  id: IndicatorId;
  dimension: DimensionId;
  weight: number;
  /** ضریب شدت — فقط در وضعیت ok مقدار دارد */
  coeff?: number;
  score?: number;
  status: IndicatorStatus;
  /** توضیح مبنا (توضیح‌پذیری) */
  basis: string;
  /** آیا مقدار غیرقطعی است (مثلاً خط فقر نامعتبر) */
  pendingApproval?: boolean;
}

export interface DimensionResult {
  id: DimensionId;
  title: string;
  cap: number;
  score: number;
  pct: number;
  complete: boolean;
}

export type ResultStatus = "final" | "nonfinal";

export interface MpiResult {
  indicators: IndicatorResult[];
  dimensions: DimensionResult[];
  /** جمع جزئی — فقط وقتی داده کامل نیست */
  partialSum: number;
  total?: number;
  totalPct?: number;
  level?: { index: number; label: string; min: number; max: number };
  status: ResultStatus;
  /** درصد تکمیل داده ۳۰ شاخص */
  completeness: number;
  finalizedCount: number;
}
