import type { DimensionId, IndicatorId } from "./types";

/**
 * کاتالوگ پرسش‌ها — فرهنگ داده سامانه
 * هر پرسش: شناسه پایدار، عنوان فارسی، راهنما، سطح (خانوار/عضو)، شاخص مرتبط،
 * نوع داده، گزینه‌های مجاز، شرط نمایش و حساسیت.
 *
 * اصل مهم: شدت محرومیت مستقیماً از خانوار پرسیده نمی‌شود؛
 * ابتدا شواهد عملیاتی جمع می‌شود و موتور قواعد ضریب مجاز را تعیین می‌کند.
 */

export type QuestionType = "single" | "multi" | "number" | "text" | "textarea" | "boolean";

export type EvidenceKind = "medical" | "education" | "insurance" | "legal" | "administrative" | "photo" | "other";

export const EVIDENCE_KINDS: { value: EvidenceKind; label: string }[] = [
  { value: "medical", label: "مدرک درمانی (گواهی پزشک، نسخه، جواب آزمایش)" },
  { value: "education", label: "مدرک آموزشی (گزارش مدرسه، کارت، ابلاغ)" },
  { value: "insurance", label: "مدرک بیمه‌ای (کارت، پرینت سابقه)" },
  { value: "legal", label: "مدرک حقوقی/قضایی (نامه، حکم، قرارداد)" },
  { value: "administrative", label: "مدرک اداری (اخطار، قبض، فرم رسمی)" },
  { value: "photo", label: "تصویر میدانی (عکس وضعیت)" },
  { value: "other", label: "سایر" },
];

export interface Option {
  value: string;
  label: string;
  desc?: string;
  /** پاسخ خاص — بدون امتیازدهی خودکار */
  special?: boolean;
}

export interface Question {
  id: string;
  title: string;
  help?: string;
  type: QuestionType;
  level: "household" | "member";
  /** فیلتر عضو برای پرسش‌های سطح عضو */
  memberFilter?: "all" | "schoolAge" | "provider";
  indicator?: IndicatorId;
  dimension?: DimensionId;
  options?: Option[];
  unit?: string;
  min?: number;
  max?: number;
  /** شاخص‌های حساس — نمایش محدود در نمای خانوار */
  sensitive?: boolean;
  /** آیا در محاسبه اثر دارد (اطلاع‌رسانی برای شفافیت) */
  scored?: boolean;
  placeholder?: string;
  /**
   * فالوآپ شرطی — بلافاصله پس از پاسخ شرطی/مثبت نمایش داده می‌شود تا مصداق عضو‌محور و
   * شاهد/مدرک ثبت شود (یکسان‌سازی تفسیر ارزیابان — شاهد‌محور به‌جای برچسب‌محور).
   */
  followUp?: {
    /** برای single: مقادیر محرک؛ برای boolean: ["true"]؛ برای multi: هر انتخاب غیر «none» */
    trigger: string[];
    /** عنوان بخش فالوآپ */
    title: string;
    help?: string;
    /** انتخاب «کدام اعضا؟» — مستندسازی انتساب وضعیت به عضو */
    members?: boolean;
    /** فیلد توضیح تکمیلی (نوع بیماری، شرح مدرک و ...) */
    detail?: { label: string; placeholder?: string };
    /** کنترل ثبت مدرک مثبت */
    evidence?: { suggested?: EvidenceKind; label?: string };
  };
  /** سرویس متولی که پاسخ این پرسش را با کد ملی استعلام می‌کند — پس از واکشی، پاسخ ملاک و غیرقابل ویرایش می‌شود */
  service?: { id: string; org: string; label: string };
}

export interface QuestionGroup {
  /** کلید منطقی گروه */
  key: string;
  title: string;
  indicator: IndicatorId;
  /** گروه سطح عضو حلقه می‌خورد */
  loop?: boolean;
  memberFilter?: "all" | "schoolAge" | "provider";
  questions: Question[];
}

export interface StepDef {
  index: number;
  key: string;
  title: string;
  short: string;
  desc: string;
  /** گام‌های بدون امتیاز */
  scored?: boolean;
}

export const STEPS: StepDef[] = [
  { index: 1, key: "identity", title: "هویت، محرمانگی و واکشی از مراجع ثبتی", short: "هویت و واکشی", desc: "با ثبت کد ملی، کد پستی و تاریخ تولد سرپرست، اطلاعات هویتی از ثبت احوال و نشانی از پست واکشی و ملاک می‌شود؛ سایر مراجع نیز با کد ملی استعلام می‌شوند. نوع درخواست در گام آخر ثبت می‌شود.", scored: false },
  { index: 2, key: "urgency", title: "بررسی اولیه نشانه‌های فوریت", short: "فوریت", desc: "اگر وضعیت فوری یا خطرناکی وجود دارد همین حالا ثبت کنید؛ برای رسیدگی فوری نیازی به تکمیل بقیه پرسشنامه نیست.", scored: false },
  { index: 3, key: "base", title: "اطلاعات پایه و اعضای خانوار", short: "اطلاعات پایه", desc: "شناسه‌های پرونده‌ای — بدون امتیاز مستقل؛ برای شناخت خانوار و اجرای منطق نمایش.", scored: false },
  { index: 4, key: "health", title: "سلامت و امنیت زیستی (A)", short: "سلامت", desc: "بیماری، محدودیت عملکرد، درمان ضروری، هزینه درمان، پوشش مؤثر، غذا و ایمنی — ۷ شاخص." },
  { index: 5, key: "education", title: "آموزش و رشد انسانی (B)", short: "آموزش", desc: "تحصیل، سواد کارکردی، دسترسی، ابزار دیجیتال و توانمندسازی — ۷ شاخص." },
  { index: 6, key: "housing", title: "استاندارد زندگی و مسکن (C)", short: "مسکن", desc: "سکونت، ایمنی، خدمات، وسایل، هزینه مسکن و دسترسی — ۹ شاخص." },
  { index: 7, key: "livelihood", title: "معیشت، اشتغال و درآمد (D)", short: "معیشت", desc: "اشتغال تأمین‌کننده، بیکاری سایر اعضا و کفایت منابع قابل اتکا — ۳ شاخص." },
  { index: 8, key: "care", title: "ظرفیت مراقبت و پشتوانه اجتماعی (E)", short: "مراقبت", desc: "چشم‌انداز معیشت، بار مراقبت، پشتوانه بحران و موانع اداری — ۴ شاخص." },
  { index: 9, key: "quality", title: "مدارک، کیفیت داده و موارد نیازمند بررسی", short: "کیفیت داده", desc: "بازبینی پاسخ‌های ناتمام، تناقض‌ها و منبع داده هر شاخص.", scored: false },
  { index: 10, key: "summary", title: "خلاصه غربالگری، بازبینی انسانی و ارجاع", short: "خلاصه", desc: "نتیجه غربالگری، ثبت نظر مددکار و مسیر ارجاع.", scored: false },
];

export const REQUEST_TYPES = [
  "درخواست تشکیل/به‌روزرسانی پرونده حمایت",
  "کمک معیشت و تغذیه",
  "کمک درمان",
  "کمک مسکن و اجاره‌بها",
  "حمایت تحصیلی",
  "توانمندسازی و اشتغال",
  "مشاوره حقوقی و قضایی",
  "مراقبت و نگهداری",
  "رسیدگی فوری (وضعیت اضطراری)",
  "سایر",
];

const DK: Option = { value: "__dontknow__", label: "نمی‌دانم", special: true };
const REFUSE: Option = { value: "__refuse__", label: "مایل به پاسخ نیستم", special: true };
const REVIEW: Option = { value: "__needreview__", label: "نیازمند بررسی", special: true };

export const QUESTION_GROUPS: QuestionGroup[] = [
  /* ============ سلامت و امنیت زیستی ============ */
  {
    key: "A1", title: "بیماری مزمن یا جدی", indicator: "A1",
    loop: true, memberFilter: "all",
    questions: [
      { id: "A1_disease", title: "آیا این عضو بیماری مزمن یا جدی دارد؟", type: "single", level: "member", indicator: "A1", dimension: "A", scored: true,
        help: "بیماری‌هایی که بیش از ۳ ماه ادامه دارند و نیاز به پیگیری درمانی مستمر دارند.",
        followUp: { trigger: ["controlled", "uncontrolled"], title: "مستندسازی بیماری این عضو", help: "برای ثبت دقیق و شاهد‌محور، نوع بیماری و مدرک مثبت آن ثبت شود.",
          detail: { label: "نوع/نام بیماری و مدت آن", placeholder: "مثلاً دیابت نوع ۲ از ۴ سال پیش، صرعی از کودکی ..." },
          evidence: { suggested: "medical", label: "مدرک مثبت (گواهی پزشک، نسخه، جواب آزمایش، کتابچه بیمار)" } },
        options: [
          { value: "none", label: "ندارد" },
          { value: "controlled", label: "دارد — تحت کنترل درمان" },
          { value: "uncontrolled", label: "دارد — کنترل‌نشده" },
          DK, REFUSE,
        ] },
      { id: "A1_impact", title: "بیماری چه اثری بر فعالیت روزمره، کار، تحصیل یا هزینه خانوار داشته است؟", type: "single", level: "member", indicator: "A1", dimension: "A", scored: true,
        options: [
          { value: "none", label: "اثر معنادار ندارد" },
          { value: "moderate", label: "محدودکننده — بخشی از فعالیت‌ها را محدود کرده" },
          { value: "severe", label: "شدید — فعالیت‌های اصلی مختل شده یا هزینه مستمر سنگین ایجاد شده" },
        ] },
    ],
  },
  {
    key: "A2", title: "محدودیت عملکردی پایدار", indicator: "A2",
    loop: true, memberFilter: "all",
    questions: [
      { id: "A2_limit", title: "آیا محدودیت پایدار در حرکت، مراقبت شخصی، ارتباط یا یادگیری دارد؟", type: "single", level: "member", indicator: "A2", dimension: "A", scored: true,
        help: "محدودیتی که حداقل ۶ ماه ادامه داشته یا انتظار می‌رود ادامه یابد.",
        followUp: { trigger: ["supported", "unmet"], title: "مستندسازی محدودیت این عضو", evidence: { suggested: "medical", label: "مدرک مثبت (گزارش توان‌بخشی، پروانه معلولیت، گواهی پزشک)" } },
        options: [
          { value: "none", label: "ندارد" },
          { value: "supported", label: "دارد — کمک/وسیله/توان‌بخشی لازم تأمین شده" },
          { value: "unmet", label: "دارد — نیاز تأمین نشده" },
          DK, REFUSE,
        ] },
      { id: "A2_aid", title: "کمک، وسیله یا توان‌بخشی لازم چیست و چه میزان تأمین شده؟", type: "textarea", level: "member", indicator: "A2", dimension: "A", placeholder: "مثلاً ویلچر، گفتاردرمانی، همراه مراقب ..." },
    ],
  },
  {
    key: "A3", title: "درمان ضروری انجام‌نشده", indicator: "A3",
    loop: true, memberFilter: "all",
    questions: [
      { id: "A3_treatment", title: "آیا درمان، دارو، آزمایش، جراحی یا توان‌بخشی ضروریِ انجام‌نشده دارد؟", type: "single", level: "member", indicator: "A3", dimension: "A", scored: true,
        followUp: { trigger: ["scheduled", "no_access"], title: "مستندسازی درمان انجام‌نشده", evidence: { suggested: "medical", label: "مدرک مثبت (نسخه، برگه نوبت، گواهی پزشک، جواب آزمایش)" } },
        options: [
          { value: "none", label: "ندارد" },
          { value: "scheduled", label: "دارد — در نوبت یا با تأخیر برنامه‌ریزی‌شده" },
          { value: "no_access", label: "دارد — دسترسی به درمان ندارد" },
          DK, REFUSE,
        ] },
      { id: "A3_urgent", title: "آیا نشانه فوریت پزشکی وجود دارد (خطر تأخیر برای سلامت یا زندگی)؟", type: "boolean", level: "member", indicator: "A3", dimension: "A",
        help: "در صورت «بله»، نشانه خطر فوریتی ثبت می‌شود؛ رسیدگی فوری مستقل از تکمیل پرسشنامه است.",
        followUp: { trigger: ["true"], title: "مستندسازی نشانه فوریت", evidence: { suggested: "medical", label: "مدرک مثبت (گواهی پزشک، مدارک بستری/اورژانس)" } } },
      { id: "A3_cause", title: "علت تأخیر و خطر احتمالی چیست؟", type: "textarea", level: "member", indicator: "A3", dimension: "A", placeholder: "مثلاً هزینه، نبود پزشک متخصص در منطقه، مدارک ..." },
    ],
  },
  {
    key: "A4", title: "فشار هزینه‌های درمانی", indicator: "A4",
    questions: [
      { id: "A4_burden", title: "هزینه درمان، دارو، مراقبت و رفت‌وآمد درمانی در سه ماه اخیر چه فشاری بر خانوار داشته است؟", type: "single", level: "household", indicator: "A4", dimension: "A", scored: true,
        options: [
          { value: "low", label: "فشار معنادار نداشته" },
          { value: "manageable", label: "فشار قابل مدیریت (کاهش پس‌انداز یا هزینه‌های غیرضروری)" },
          { value: "severe", label: "فشار سنگین (بدهی، فروش دارایی یا کاهش مصرف اساسی)" },
          DK, REFUSE,
        ] },
      { id: "A4_effects", title: "کدام اثر واقعاً رخ داده است؟", type: "multi", level: "household", indicator: "A4", dimension: "A", scored: true,
        options: [
          { value: "debt", label: "ایجاد بدهی یا قرض" },
          { value: "asset", label: "فروش دارایی" },
          { value: "food", label: "کاهش کیفیت/مقدار غذا" },
          { value: "housing", label: "خطر در پرداخت اجاره/مسکن" },
          { value: "education", label: "کاهش هزینه آموزش" },
          { value: "none", label: "هیچ‌کدام" },
        ] },
    ],
  },
  {
    key: "A5", title: "پوشش بیمه‌ای مؤثر", indicator: "A5",
    loop: true, memberFilter: "all",
    questions: [
      { id: "A5_cover", title: "آیا این عضو پوشش بیمه پایه درمانی معتبر دارد و عملاً می‌تواند خدمت ضروری بگیرد؟", type: "single", level: "member", indicator: "A5", dimension: "A", scored: true,
        help: "وجود بیمه به‌تنهایی کافی نیست؛ قابلیت استفاده واقعی (فرانشیز، فاصله، نوبت) بررسی می‌شود. پاسخ این پرسش با کد ملی از استعلام بیمه به‌صورت خودکار پر و ملاک می‌شود.",
        service: { id: "insurance", org: "سازمان تأمین اجتماعی و صندوق‌های بیمه‌ای", label: "استعلام پوشش پایه اعضا با کد ملی" },
        options: [
          { value: "effective", label: "پوشش معتبر و استفاده مؤثر" },
          { value: "barriers", label: "پوشش هست ولی مانع استفاده واقعی وجود دارد" },
          { value: "none", label: "بدون پوشش معتبر" },
          DK, REFUSE,
        ] },
      { id: "A5_barrier", title: "در صورت وجود مانع، نوع مانع چیست؟", type: "text", level: "member", indicator: "A5", dimension: "A", placeholder: "مثلاً فرانشیز سنگین، فاصله تا مرکز، نوبت طولانی" },
    ],
  },
  {
    key: "A6", title: "ناامنی غذایی ۳۰ روز اخیر", indicator: "A6",
    questions: [
      { id: "A6_exp", title: "در ۳۰ روز گذشته کدام تجربه‌ها را داشته‌اید؟", type: "multi", level: "household", indicator: "A6", dimension: "A", scored: true,
        help: "چند مورد را می‌توانید انتخاب کنید. این پرسش درباره تجربه واقعی است، نه احساس کلی.",
        options: [
          { value: "worry", label: "نگرانی از اتمام غذا" },
          { value: "variety", label: "کاهش تنوع غذایی به دلیل هزینه" },
          { value: "quantity", label: "کاهش مقدار غذا" },
          { value: "mealskip", label: "حذف یک یا چند وعده" },
          { value: "hunger", label: "گرسنگی اما نخوردن غذا به دلیل نبود آن" },
          { value: "none", label: "هیچ‌کدام" },
        ] },
      { id: "A6_now", title: "اکنون غذای کافی برای وعده بعدی خانوار در دسترس است؟", type: "boolean", level: "household", indicator: "A6", dimension: "A",
        help: "پاسخ «خیر» به‌عنوان نشانه خطر ثبت می‌شود." },
    ],
  },
  {
    key: "A7", title: "سلامت روان و ایمنی خانوار", indicator: "A7",
    questions: [
      { id: "A7_disrupt", title: "آیا مشکل روانی یا مصرف مواد، عملکرد و امنیت خانوار را مختل کرده است؟", type: "single", level: "household", indicator: "A7", dimension: "A", scored: true, sensitive: true,
        help: "این پاسخ محرمانه است و در نمای خانوار جزئیات آن نمایش داده نمی‌شود.",
        followUp: { trigger: ["moderate", "severe"], title: "مستندسازی محرمانه — کدام اعضا؟", help: "مشخص کنید مشکل به کدام اعضا مربوط است؛ ثبت محرمانه می‌ماند و برای مسیر بررسی تخصصی استفاده می‌شود.",
          members: true, evidence: { suggested: "medical", label: "مدرک مثبت (در صورت وجود — گواهی روان‌پزشک/روان‌شناس، پرونده درمان)" } },
        options: [
          { value: "none", label: "خیر" },
          { value: "moderate", label: "تا حدی" },
          { value: "severe", label: "به‌شدت" },
          DK, REFUSE,
        ] },
      { id: "A7_danger", title: "نشانه خطر (در صورت وجود و با احتیاط)", type: "multi", level: "household", indicator: "A7", dimension: "A", sensitive: true,
        options: [
          { value: "selfharm", label: "خطر آسیب به خود" },
          { value: "violence", label: "خشونت یا خطر آسیب به دیگران" },
          { value: "child_risk", label: "کودک در محیط ناامن" },
          { value: "none", label: "هیچ‌کدام" },
        ] },
    ],
  },
  {
    key: "A_nutrition", title: "وضعیت تغذیه‌ای ویژه", indicator: "A6",
    loop: true, memberFilter: "all",
    questions: [
      { id: "A_malnut", title: "آیا این عضو سوءتغذیه دارد (تشخیص‌شده یا مشکوک)؟", type: "boolean", level: "member", indicator: "A6", dimension: "A",
        help: "سوءتغذیه نیازمند بررسی حرفه‌ای است؛ ثبت آن نشانه خطر ایجاد می‌کند.",
        followUp: { trigger: ["true"], title: "مستندسازی وضعیت تغذیه‌ای", evidence: { suggested: "medical", label: "مدرک مثبت (کارت رشد، جواب آزمایش، گزارش مرکز بهداشت)" } } },
      { id: "A_pregnant", title: "آیا این عضو مادر باردار یا شیرده با نیاز تغذیه/درمان ویژه است؟", type: "boolean", level: "member", indicator: "A6", dimension: "A",
        followUp: { trigger: ["true"], title: "مستندسازی وضعیت بارداری/شیردهی", evidence: { suggested: "medical", label: "مدرک مثبت (کارت مراقبت مادر، گواهی پزشک)" } } },
    ],
  },

  /* ============ آموزش و رشد انسانی ============ */
  {
    key: "B1", title: "ثبت‌نام و حضور در آموزش اجباری", indicator: "B1",
    loop: true, memberFilter: "schoolAge",
    questions: [
      { id: "B1_status", title: "وضعیت آموزش این عضو (در سن آموزش اجباری) چیست؟", type: "single", level: "member", indicator: "B1", dimension: "B", scored: true,
        help: "وضعیت ثبت‌نام ثبتی این پرسش از استعلام آموزش‌وپرورش به‌صورت خودکار پر و ملاک می‌شود؛ حضور و غیبت جاری جداگانه بررسی می‌شود.",
        service: { id: "education_school", org: "وزارت آموزش‌وپرورش", label: "استعلام سابقه ثبت‌نام اعضای در سن آموزش با کد ملی" },
        followUp: { trigger: ["interrupted", "dropped", "never"], title: "مستندسازی وضعیت تحصیل", evidence: { suggested: "education", label: "مدرک مثبت (گزارش مدرسه، ابلاغ، گواهی انصراف/وقفه)" } },
        options: [
          { value: "attending", label: "ثبت‌نام و حضور فعال" },
          { value: "interrupted", label: "وقفه تحصیلی دارد" },
          { value: "dropped", label: "ترک تحصیل کرده" },
          { value: "never", label: "هرگز ثبت‌نام نشده" },
          DK, REVIEW,
        ] },
      { id: "B1_months", title: "مدت وقفه/ترک تحصیل به ماه", type: "number", level: "member", indicator: "B1", dimension: "B", unit: "ماه", min: 0, max: 120 },
      { id: "B1_reason", title: "علت وقفه یا ترک تحصیل", type: "text", level: "member", indicator: "B1", dimension: "B", placeholder: "مثلاً هزینه، کار، مهاجرت، معلولیت ..." },
    ],
  },
  {
    key: "B2", title: "خطر ترک تحصیل", indicator: "B2",
    loop: true, memberFilter: "schoolAge",
    questions: [
      { id: "B2_risks", title: "کدام عوامل خطر برای استمرار تحصیل این عضو وجود دارد؟", type: "multi", level: "member", indicator: "B2", dimension: "B", scored: true,
        options: [
          { value: "absence", label: "غیبت مکرر" },
          { value: "decline", label: "افت شدید تحصیلی" },
          { value: "cost", label: "هزینه ضروری تأمین‌نشده (لوازم، رفت‌وآمد)" },
          { value: "child_labor", label: "کار کودک" },
          { value: "forced_care", label: "مراقبت اجباری از فرد دیگر" },
          { value: "none", label: "هیچ‌کدام" },
        ] },
    ],
  },
  {
    key: "B3", title: "سواد کارکردی", indicator: "B3",
    questions: [
      { id: "B3_lit", title: "آیا فرد مسئول امور خانوار می‌تواند امور پایه نوشتاری و پیگیری خدمات را انجام دهد؟", type: "single", level: "household", indicator: "B3", dimension: "B", scored: true,
        help: "مثلاً خواندن پیام و دستور درمان، تکمیل فرم، پیگیری اداری. مدرک تحصیلی به‌تنهایی ملاک نیست.",
        options: [
          { value: "full", label: "بله، مستقل انجام می‌دهد" },
          { value: "with_help", label: "فقط با کمک دیگران (کمک قابل اتکا دارد)" },
          { value: "cannot", label: "نمی‌تواند و کمک قابل اتکا ندارد" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "B4", title: "مانع واقعی دسترسی به آموزش", indicator: "B4",
    questions: [
      { id: "B4_barriers", title: "آیا فاصله، حمل‌ونقل، هزینه، مدارک، معلولیت یا ظرفیت مدرسه مانع واقعی آموزش است؟", type: "single", level: "household", indicator: "B4", dimension: "B", scored: true,
        options: [
          { value: "none", label: "مانع واقعی وجود ندارد" },
          { value: "resolvable", label: "یک مانع قابل حل وجود دارد" },
          { value: "serious", label: "مانع جدی و حل‌نشده وجود دارد" },
          DK, REVIEW,
        ] },
      { id: "B4_detail", title: "توضیح مانع", type: "text", level: "household", indicator: "B4", dimension: "B", placeholder: "مثلاً ۷ کیلومتر تا مدرسه با اتوبوس نامنظم" },
    ],
  },
  {
    key: "B5", title: "ابزار دیجیتال آموزشی", indicator: "B5",
    questions: [
      { id: "B5_digital", title: "اگر آموزش به ابزار دیجیتال نیاز دارد، وضعیت ابزار و اتصال چگونه است؟", type: "single", level: "household", indicator: "B5", dimension: "B", scored: true,
        help: "داشتن دستگاه به‌تنهایی معیار نیست؛ قابلیت استفاده و اتصال کافی ملاک است.",
        options: [
          { value: "adequate", label: "نیاز دارد و ابزار/اتصال کافی دارد" },
          { value: "no_need", label: "نیاز واقعی به ابزار دیجیتال ندارد" },
          { value: "insufficient", label: "ابزار ناکافی است یا اشتراک ابزار مانع انجام تکلیف است" },
          { value: "missing", label: "نیاز دارد ولی ابزار قابل استفاده ندارد" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "B6", title: "نیاز آموزشی ویژه", indicator: "B6",
    loop: true, memberFilter: "all",
    questions: [
      { id: "B6_need", title: "آیا این عضو نیاز آموزشی ویژه دارد و خدمت متناسب دریافت می‌کند؟", type: "single", level: "member", indicator: "B6", dimension: "B", scored: true,
        followUp: { trigger: ["needs_assessment", "unmet"], title: "مستندسازی نیاز آموزشی ویژه", evidence: { suggested: "medical", label: "مدرک مثبت (گزارش ارزیابی، پرونده آموزشی/درمانی)" } },
        options: [
          { value: "none", label: "نیاز ویژه ندارد" },
          { value: "served", label: "نیاز دارد و خدمت متناسب دریافت می‌کند" },
          { value: "needs_assessment", label: "مشکوک — نیازمند ارزیابی تخصصی" },
          { value: "unmet", label: "نیاز تأییدشده بدون خدمت متناسب" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "B7", title: "مهارت و مسیر توانمندسازی", indicator: "B7",
    questions: [
      { id: "B7_path", title: "وضعیت عضو واجد شرایط و علاقه‌مند به مهارت‌آموزی/اشتغال چگونه است؟", type: "single", level: "household", indicator: "B7", dimension: "B", scored: true,
        help: "مهارت قابل عرضه، مسیر فعال آموزش، ابزار اولیه و دسترسی واقعی بررسی می‌شود.",
        options: [
          { value: "active", label: "عضو واجد شرایط مسیر فعال آموزش/مهارت با ابزار اولیه دارد" },
          { value: "interested_no_path", label: "علاقه‌مند است ولی مسیر فعال یا ابزار اولیه ندارد" },
          { value: "no_capability", label: "عضو واجد شرایط هست ولی هیچ امکان توانمندسازی فراهم نیست" },
          { value: "no_eligible", label: "عضو واجد شرایط (در سن/توان کار) وجود ندارد" },
          DK, REVIEW,
        ] },
      { id: "B7_skills", title: "مهارت‌های فرهنگی/هنری یا حرفه‌ای موجود (اختیاری)", type: "textarea", level: "household", indicator: "B7", dimension: "B", placeholder: "نوع مهارت، سطح، قابلیت عرضه و علاقه ..." },
    ],
  },

  /* ============ استاندارد زندگی و مسکن ============ */
  {
    key: "C1", title: "محل خواب و تهدید سکونت", indicator: "C1",
    questions: [
      { id: "C1_place", title: "محل خواب فعلی خانوار چیست؟", type: "single", level: "household", indicator: "C1", dimension: "C", scored: true,
        options: [
          { value: "stable", label: "مسکن پایدار (واحد مسکونی با حق سکونت جاری)" },
          { value: "temporary", label: "سکونت موقت یا مرکز نگهداری" },
          { value: "nonresidential", label: "فضای غیرمسکونی / آلونک / خودرو / فضای عمومی / بی‌خانمانی" },
          DK, REVIEW,
        ] },
      { id: "C1_eviction", title: "آیا اخطار تخلیه معتبر یا خطر قریب‌الوقوع ازدست‌دادن مسکن وجود دارد؟", type: "single", level: "household", indicator: "C1", dimension: "C", scored: true,
        followUp: { trigger: ["credible", "imminent"], title: "مستندسازی خطر ازدست‌دادن مسکن", evidence: { suggested: "administrative", label: "مدرک مثبت (اخطار تخلیه، ابلاغ، نامه موجر/مرجع)" } },
        options: [
          { value: "no", label: "خیر" },
          { value: "credible", label: "اخطار/خطر جدی (در جریان)" },
          { value: "imminent", label: "بله — قریب‌الوقوع" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "C2", title: "ایمنی و قابلیت سکونت", indicator: "C2",
    questions: [
      { id: "C2_issues", title: "کدام نقص‌ها در مسکن فعلی وجود دارد؟ (چک‌لیست ایمنی)", type: "multi", level: "household", indicator: "C2", dimension: "C", scored: true,
        followUp: { trigger: [], title: "مستندسازی نقص‌های مسکن", evidence: { suggested: "photo", label: "مدرک مثبت (تصویر وضعیت، گزارش کارشناسی، گزارش میدانی)" } },
        options: [
          { value: "structural", label: "خطر سقف/دیوار (ترک جدی، فروریختگی)" },
          { value: "wiring", label: "برق ناایمن" },
          { value: "damp", label: "رطوبت شدید" },
          { value: "temp", label: "سرما/گرمای شدید غیرقابل کنترل" },
          { value: "uninhabitable", label: "در وضع فعلی اساساً غیرقابل سکونت" },
          { value: "none", label: "هیچ‌کدام" },
        ] },
      { id: "C2_constr", title: "سال پایان ساخت (اختیاری — فقط برای بررسی فنی)", type: "number", level: "household", indicator: "C2", dimension: "C",
        help: "قدمت بنا به‌تنهایی امتیاز ندارد.", min: 1250, max: 1500 },
    ],
  },
  {
    key: "C3", title: "پایداری حق سکونت", indicator: "C3",
    questions: [
      { id: "C3_right", title: "وضعیت حق سکونت خانوار چگونه است؟", type: "single", level: "household", indicator: "C3", dimension: "C", scored: true,
        options: [
          { value: "clear", label: "روشن و بدون اختلاف (مالک، قرارداد معتبر، سند ...)" },
          { value: "ambiguous", label: "مبهم یا وابسته به فرد/نهاد دیگر" },
          { value: "risk", label: "خطر جدی ازدست‌دادن (اختلاف، مانع تمدید، قرارداد منقضی)" },
          DK, REVIEW,
        ] },
      { id: "C3_lease_end", title: "تاریخ پایان قرارداد/تمدید بعدی (اختیاری)", type: "text", level: "household", indicator: "C3", dimension: "C", placeholder: "مثلاً ۱۴۰۵/۰۳" },
    ],
  },
  {
    key: "C4", title: "تراکم و فضای خواب ایمن", indicator: "C4",
    questions: [
      { id: "C4_rooms", title: "تعداد اتاق قابل سکونت (به‌جز آشپزخانه و سرویس)", type: "number", level: "household", indicator: "C4", dimension: "C", unit: "اتاق", min: 0, max: 30, scored: true },
      { id: "C4_area", title: "زیربنای قابل استفاده (اختیاری)", type: "number", level: "household", indicator: "C4", dimension: "C", unit: "متر مربع", min: 0 },
      { id: "C4_safesleep", title: "آیا برای همه اعضا فضای خواب ایمن و مناسب وجود دارد؟", type: "single", level: "household", indicator: "C4", dimension: "C", scored: true,
        followUp: { trigger: ["partial", "none"], title: "کدام اعضا فضای خواب ایمن ندارند؟", help: "برای مستندسازی دقیق، مشخص کنید مشکل مربوط به کدام اعضاست.", members: true },
        options: [
          { value: "all", label: "بله برای همه" },
          { value: "partial", label: "جزئی — برخی اعضا مشکل دارند" },
          { value: "none", label: "خیر" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "C5", title: "آب، برق و انرژی", indicator: "C5",
    questions: [
      { id: "C5_water", title: "وضعیت آب سالم", type: "single", level: "household", indicator: "C5", dimension: "C", scored: true,
        options: [
          { value: "stable", label: "فعال و پایدار" },
          { value: "unstable", label: "قطعی‌های مکرر یا محدودیت" },
          { value: "off", label: "قطع/ندارد بدون جایگزین ایمن" },
          DK, REVIEW,
        ] },
      { id: "C5_elec", title: "وضعیت برق", type: "single", level: "household", indicator: "C5", dimension: "C", scored: true,
        options: [
          { value: "stable", label: "فعال و پایدار" },
          { value: "unstable", label: "قطعی‌های مکرر یا محدودیت (کنتور مشترک، قطع ادواری)" },
          { value: "off", label: "قطع/ندارد" },
          DK, REVIEW,
        ] },
      { id: "C5_cook", title: "وضعیت گرمایش/انرژی پخت‌وپز ایمن", type: "single", level: "household", indicator: "C5", dimension: "C", scored: true,
        options: [
          { value: "stable", label: "ایمن و پایدار" },
          { value: "unstable", label: "محدود یا کم‌خطر (مثلاً بخاری ناایمن)" },
          { value: "off", label: "ندارد" },
          DK, REVIEW,
        ] },
      { id: "C5_effect", title: "در صورت قطع، اثر آن بر زندگی خانوار چیست؟", type: "textarea", level: "household", indicator: "C5", dimension: "C" },
    ],
  },
  {
    key: "C6", title: "بهداشت محیط مسکن", indicator: "C6",
    questions: [
      { id: "C6_san", title: "وضعیت سرویس بهداشتی، حمام و دفع فاضلاب چگونه است؟", type: "single", level: "household", indicator: "C6", dimension: "C", scored: true,
        help: "نبود شبکه شهری فاضلاب به‌تنهایی محرومیت نیست؛ وضعیت بهداشتی واقعی ملاک است.",
        options: [
          { value: "good", label: "اختصاصی، قابل استفاده و بهداشتی" },
          { value: "shared_minor", label: "مشترک یا دارای نقص جزئی اما قابل استفاده" },
          { value: "unsafe_missing", label: "ناسالم، غیرقابل استفاده یا مفقود" },
          DK, REVIEW,
        ] },
    ],
  },
  {
    key: "C7", title: "وسایل ضروری زندگی", indicator: "C7",
    questions: [
      { id: "C7_missing", title: "کدام وسایل واقعاً ضروری موجود نیست یا خراب است؟", type: "multi", level: "household", indicator: "C7", dimension: "C", scored: true,
        options: [
          { value: "fridge", label: "یخچال" },
          { value: "cooker", label: "اجاق/وسیله پخت" },
          { value: "heater", label: "وسیله گرمایش" },
          { value: "bed", label: "تخت/رختخواب کافی" },
          { value: "washer", label: "وسیله شست‌وشو (دستی یا ماشینی)" },
          { value: "none", label: "هیچ‌کدام — همه موجود و سالم‌اند" },
        ] },
      { id: "C7_impact", title: "فقدان این وسایل چه اثری بر سلامت، غذا، مراقبت یا سکونت داشته است؟", type: "single", level: "household", indicator: "C7", dimension: "C", scored: true,
        options: [
          { value: "none", label: "اثر معنادار ندارد" },
          { value: "minor", label: "اثر جزئی" },
          { value: "disruptive", label: "اختلال جدی در زندگی روزمره" },
        ] },
    ],
  },
  {
    key: "C8", title: "هزینه مسکن", indicator: "C8",
    questions: [
      { id: "C8_arrears_severity", title: "وضعیت معوقات اجاره/شارژ/قبوض چیست؟", type: "single", level: "household", indicator: "C8", dimension: "C", scored: true,
        help: "مبلغ معوقه در اطلاعات پایه ثبت می‌شود. ودیعه جداگانه ثبت می‌شود و در هزینه ماهانه محاسبه نمی‌شود.",
        followUp: { trigger: ["minor", "significant"], title: "مستندسازی معوقات", evidence: { suggested: "administrative", label: "مدرک مثبت (اخطار پرداخت، صورت‌حساب، قبض)" } },
        options: [
          { value: "none", label: "معوقه نداریم" },
          { value: "minor", label: "معوقه جزئی (کمتر از یک ماه)" },
          { value: "significant", label: "معوقه معنادار یا اخطار پرداخت" },
          DK, REVIEW,
        ] },
      { id: "C8_installments", title: "اقساط ضروری ماهانه (بدون ودیعه)", type: "number", level: "household", indicator: "C8", dimension: "C", unit: "تومان", min: 0 },
    ],
  },
  {
    key: "C9", title: "دسترسی به خدمات پایه", indicator: "C9",
    questions: [
      { id: "C9_access", title: "دسترسی واقعی خانوار به خدمات پایه (بهداشتی، آموزشی، خرید، حمل‌ونقل) چگونه است؟", type: "single", level: "household", indicator: "C9", dimension: "C", scored: true,
        help: "با زمان، هزینه و انتظام حمل‌ونقل سنجیده می‌شود؛ برای جلوگیری از شمارش تکراری با A5 و B4 فقط موانع عمومی محیط ثبت شود.",
        options: [
          { value: "adequate", label: "مناسب" },
          { value: "manageable", label: "با بار زمان/هزینه قابل مدیریت" },
          { value: "serious", label: "مانع پایدار و جدی" },
          DK, REVIEW,
        ] },
    ],
  },

  /* ============ معیشت، اشتغال و درآمد ============ */
  {
    key: "D1", title: "تأمین‌کننده اصلی", indicator: "D1",
    questions: [
      { id: "D1_no_provider", title: "آیا خانوار هیچ تأمین‌کننده‌ای با درآمد فعال ندارد؟", type: "boolean", level: "household", indicator: "D1", dimension: "D", scored: true,
        help: "در صورت «بله»، پاسخ بعدی لازم نیست. تأمین‌کننده اصلی را در مدیریت اعضا مشخص کنید." },
    ],
  },
  {
    key: "D1m", title: "وضعیت اشتغال تأمین‌کننده اصلی", indicator: "D1",
    loop: true, memberFilter: "provider",
    questions: [
      { id: "D1_ability", title: "توان و امکان واقعی کار تأمین‌کننده اصلی", type: "single", level: "member", indicator: "D1", dimension: "D", scored: true,
        help: "توان عملکردی، امکان واقعی و موانع — نه یک پاسخ ساده بله/خیر.",
        options: [
          { value: "able", label: "توان و امکان کار دارد" },
          { value: "limited", label: "توان محدود یا مانع موقت (بیماری، مراقبت، ابزار/سرمایه)" },
          { value: "unable", label: "ناتوان از کار" },
        ] },
      { id: "D1_continuity", title: "استمرار درآمد در دوره ارزیابی", type: "single", level: "member", indicator: "D1", dimension: "D", scored: true,
        options: [
          { value: "stable", label: "درآمد مستمر" },
          { value: "irregular", label: "قطع‌و‌وصل (ناپایداری احرازشده)" },
          { value: "none", label: "بدون درآمد فعال" },
        ] },
      { id: "D1_seasonal", title: "فعالیت فصلی/روزمزدي است؟", type: "boolean", level: "member", indicator: "D1", dimension: "D",
        help: "فصلی یا روزمزدی بودن به‌تنهایی امتیاز ندارد؛ فقط ناپایداری احرازشده ملاک است." },
    ],
  },
  {
    key: "D3", title: "منابع درآمد خانوار", indicator: "D3",
    questions: [
      { id: "D3_editor", title: "مدیریت منابع درآمد", type: "textarea", level: "household", indicator: "D3", dimension: "D",
        help: "منابع در بخش «منابع درآمد» همین گام به‌صورت ساختاریافته ثبت می‌شوند: دریافت‌کننده، مبلغ، دوره، استمرار، قابلیت اتکا و وضعیت تأیید. دریافت‌های یک‌باره (مانند ارث) به‌عنوان «یک‌باره» ثبت شوند و در درآمد ماهانه محاسبه نمی‌شوند." },
    ],
  },
  {
    key: "poverty", title: "خط فقر منطقه‌ای", indicator: "D3",
    questions: [
      { id: "poverty_editor", title: "نسخه خط فقر معتبر منطقه‌ای", type: "textarea", level: "household", indicator: "D3", dimension: "D",
        help: "مبلغ سرانه ماهانه، منبع و تاریخ اعتبار در فرم همین گام ثبت می‌شود. خط فقر نامعتبر، شاخص D3 را غیرنهایی می‌کند." },
    ],
  },

  /* ============ ظرفیت مراقبت و پشتوانه ============ */
  {
    key: "E1", title: "چشم‌انداز معیشت ۱۲ ماه آینده", indicator: "E1",
    questions: [
      { id: "E1_outlook", title: "مسیر واقعی حفظ یا بهبود معیشت خانوار در ۱۲ ماه آینده چگونه است؟", type: "single", level: "household", indicator: "E1", dimension: "E", scored: true,
        help: "احساس ناامیدی به‌تنهایی ملاک نیست؛ با شواهد (فرصت، مانع پایدار، برنامه واقعی) ترکیب شود.",
        options: [
          { value: "clear", label: "مسیر روشن و محتمل (فرصت شغلی/حمایت/مهارت فعال)" },
          { value: "uncertain", label: "نامطمئن — فرصت هست ولی موانع پایدار وجود دارد" },
          { value: "none", label: "مسیر واقعی وجود ندارد" },
          DK, REVIEW,
        ] },
      { id: "E1_evidence", title: "شواهد و توضیح", type: "textarea", level: "household", indicator: "E1", dimension: "E" },
    ],
  },
  {
    key: "E2", title: "بار مراقبت", indicator: "E2",
    questions: [
      { id: "E2_support", title: "وضعیت مراقبت از اعضای نیازمند (کودک، سالمند، بیمار، معلول) چگونه است؟", type: "single", level: "household", indicator: "E2", dimension: "E", scored: true,
        help: "اعضای نیازمند مراقبت را در مدیریت اعضا علامت بزنید. مراقب اصلی و شدت بار و پشتیبانی اینجا ثبت می‌شود.",
        followUp: { trigger: ["partial", "none"], title: "کدام اعضا نیازمند مراقبت‌اند؟", help: "با انتخاب هر عضو، نقش «نیازمند مراقبت» او در مدیریت اعضا نیز علامت می‌خورد.", members: true },
        options: [
          { value: "adequate", label: "مراقب موجود و پشتیبانی کافی" },
          { value: "partial", label: "بار سنگین با پشتیبانی ناکافی" },
          { value: "none", label: "نیاز مراقبتی تأمین‌نشده (بدون مراقب)" },
          { value: "no_need", label: "عضو نیازمند مراقبت مستمر نداریم" },
          DK, REVIEW,
        ] },
      { id: "E2_hours", title: "ساعت نیاز مراقبت روزانه (تقریبی)", type: "number", level: "household", indicator: "E2", dimension: "E", unit: "ساعت", min: 0, max: 24 },
    ],
  },
  {
    key: "E3", title: "پشتوانه اجتماعی در بحران", indicator: "E3",
    questions: [
      { id: "E3_support", title: "در بحران‌های اخیر، چه فرد یا نهادی عملاً کمک کرده است؟", type: "single", level: "household", indicator: "E3", dimension: "E", scored: true,
        options: [
          { value: "reliable", label: "حمایت مستمر و قابل اتکا (خویشاوند، نهاد، خیریه)" },
          { value: "sporadic", label: "حمایت موردی و ناپایدار" },
          { value: "none", label: "هیچ حمایت عملی نداشته‌ایم" },
          DK, REVIEW,
        ] },
      { id: "E3_who", title: "چه فرد یا نهادی و چه نوع کمکی؟", type: "text", level: "household", indicator: "E3", dimension: "E" },
    ],
  },
  {
    key: "E4", title: "مانع هویتی، حقوقی یا اداری", indicator: "E4",
    questions: [
      { id: "E4_barrier", title: "آیا مانع هویتی، حقوقی یا اداری، دسترسی خانوار به حق یا خدمت را مسدود کرده است؟", type: "single", level: "household", indicator: "E4", dimension: "E", scored: true,
        followUp: { trigger: ["in_progress", "blocking"], title: "مستندسازی مانع", evidence: { suggested: "legal", label: "مدرک مثبت (نامه مرجع، رونوشت پرونده، فرم ثبت‌نام رد‌شده)" } },
        options: [
          { value: "none", label: "مانع مؤثر نداریم" },
          { value: "in_progress", label: "مانع وجود دارد ولی راه‌حل در جریان است" },
          { value: "blocking", label: "مانع، خدمت/حق حیاتی را مسدود کرده است" },
          DK, REVIEW,
        ] },
      { id: "E4_types", title: "نوع مانع", type: "multi", level: "household", indicator: "E4", dimension: "E",
        options: [
          { value: "identity", label: "هویتی (شناسنامه، کد ملی، مدرک)" },
          { value: "legal", label: "حقوقی (حضانت، سرپرستی، پرونده قضایی)" },
          { value: "admin", label: "اداری (ثبت‌نام، مجوز، شماره حساب)" },
          { value: "other", label: "سایر" },
        ] },
      { id: "E4_service", title: "دقیقاً کدام حق یا خدمت مسدود شده و شدت/مدت آن چیست؟", type: "textarea", level: "household", indicator: "E4", dimension: "E", placeholder: "مثلاً ثبت‌نام کودک در مدرسه به دلیل نبود مدرک هویتی، از ۶ ماه پیش" },
    ],
  },
];

/** گام‌های دارای شاخص امتیازپذیر */
export const SCORED_STEPS = ["health", "education", "housing", "livelihood", "care"];

export function groupsOfStep(stepKey: string): QuestionGroup[] {
  const map: Record<string, string[]> = {
    health: ["A1", "A2", "A3", "A4", "A5", "A6", "A_nutrition", "A7"],
    education: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
    housing: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
    livelihood: ["D1", "D1m", "D3", "poverty"],
    care: ["E1", "E2", "E3", "E4"],
  };
  const keys = map[stepKey] ?? [];
  return QUESTION_GROUPS.filter((g) => keys.includes(g.key));
}

export const MEMBER_RELATIONS = [
  "سرپرست", "همسر", "فرزند", "مادر", "پدر", "خواهر", "برادر", "نوه", "مادربزرگ/پدربزرگ", "سایر",
];
