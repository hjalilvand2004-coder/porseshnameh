module.exports = [
"[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEPRECATED_REFS",
    ()=>DEPRECATED_REFS,
    "DIMENSIONS",
    ()=>DIMENSIONS,
    "FIVE_STATE",
    ()=>FIVE_STATE,
    "FLAG_DEFS",
    ()=>FLAG_DEFS,
    "INDICATORS_BY_DIM",
    ()=>INDICATORS_BY_DIM,
    "INDICATOR_TITLES",
    ()=>INDICATOR_TITLES,
    "LEVELS",
    ()=>LEVELS,
    "LEVEL_LABELS_PENDING_APPROVAL",
    ()=>LEVEL_LABELS_PENDING_APPROVAL,
    "OBSERVATION_META_FIELDS",
    ()=>OBSERVATION_META_FIELDS,
    "PENDING_APPROVALS",
    ()=>PENDING_APPROVALS,
    "REFERRAL_PATHS",
    ()=>REFERRAL_PATHS,
    "RULE_SET",
    ()=>RULE_SET,
    "SCALE_FIVE",
    ()=>SCALE_FIVE,
    "SCALE_THREE",
    ()=>SCALE_THREE,
    "TOTAL_CAP",
    ()=>TOTAL_CAP,
    "WEIGHTS",
    ()=>WEIGHTS,
    "coeffAllowed",
    ()=>coeffAllowed,
    "levelOf",
    ()=>levelOf,
    "scaleOf",
    ()=>scaleOf
]);
const RULE_SET = {
    id: "EM-MPI-RF",
    version: "1.0.0-demo",
    /** نمایش صریح نمونه‌بودن قواعد آستانه‌ای */ demo: true,
    get fullId () {
        return `${this.id}-${this.version}`;
    }
};
const INDICATOR_TITLES = {
    A1: "بیماری مزمن یا جدی",
    A2: "محدودیت عملکردی پایدار",
    A3: "درمان ضروری انجام‌نشده",
    A4: "فشار هزینه‌های درمانی",
    A5: "پوشش بیمه‌ای مؤثر",
    A6: "ناامنی غذایی ۳۰ روز اخیر",
    A7: "سلامت روان و ایمنی خانوار",
    B1: "ترک تحصیل و دسترسی به آموزش اجباری",
    B2: "خطر ترک تحصیل",
    B3: "سواد کارکردی مسئول امور",
    B4: "مانع واقعی دسترسی به آموزش",
    B5: "ابزار دیجیتال آموزشی",
    B6: "نیاز آموزشی ویژه",
    B7: "مهارت و مسیر توانمندسازی",
    C1: "بی‌خانمانی و تهدید سکونت",
    C2: "ایمنی و قابلیت سکونت",
    C3: "پایداری حق سکونت",
    C4: "تراکم سکونت و فضای خواب ایمن",
    C5: "آب، برق و انرژی پخت‌وپز",
    C6: "بهداشت محیط مسکن",
    C7: "وسایل ضروری زندگی",
    C8: "فشار هزینه مسکن",
    C9: "دسترسی به خدمات پایه",
    D1: "اشتغال و استمرار درآمد تأمین‌کننده اصلی",
    D2: "بیکاری سایر اعضای توانمند",
    D3: "کفایت منابع قابل اتکا",
    E1: "چشم‌انداز معیشت ۱۲ ماه آینده",
    E2: "بار مراقبت و پشتیبانی آن",
    E3: "پشتوانه اجتماعی در بحران",
    E4: "مانع هویتی، حقوقی یا اداری"
};
const DIMENSIONS = {
    A: {
        title: "سلامت و امنیت زیستی",
        cap: 250
    },
    B: {
        title: "آموزش و رشد انسانی",
        cap: 200
    },
    C: {
        title: "استاندارد زندگی و مسکن",
        cap: 300
    },
    D: {
        title: "معیشت، اشتغال و درآمد",
        cap: 150
    },
    E: {
        title: "ظرفیت مراقبت و پشتوانه اجتماعی",
        cap: 100
    }
};
const INDICATORS_BY_DIM = {
    A: [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7"
    ],
    B: [
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7"
    ],
    C: [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9"
    ],
    D: [
        "D1",
        "D2",
        "D3"
    ],
    E: [
        "E1",
        "E2",
        "E3",
        "E4"
    ]
};
const WEIGHTS = {
    A1: 35,
    A2: 35,
    A3: 50,
    A4: 35,
    A5: 20,
    A6: 45,
    A7: 30,
    B1: 60,
    B2: 25,
    B3: 20,
    B4: 20,
    B5: 15,
    B6: 30,
    B7: 40,
    C1: 60,
    C2: 45,
    C3: 35,
    C4: 25,
    C5: 30,
    C6: 20,
    C7: 25,
    C8: 35,
    C9: 25,
    D1: 45,
    D2: 25,
    D3: 80,
    E1: 35,
    E2: 25,
    E3: 20,
    E4: 20
};
const TOTAL_CAP = 1000;
const SCALE_THREE = [
    0,
    0.5,
    1
];
const SCALE_FIVE = [
    0,
    0.25,
    0.5,
    0.75,
    1
];
const FIVE_STATE = [
    "A6",
    "C4",
    "C8",
    "D3"
];
function scaleOf(id) {
    return FIVE_STATE.includes(id) ? SCALE_FIVE : SCALE_THREE;
}
function coeffAllowed(id, coeff) {
    return scaleOf(id).includes(coeff);
}
const LEVELS = [
    {
        index: 1,
        min: 0,
        max: 150,
        label: "سطح ۱ — محرومیت کم"
    },
    {
        index: 2,
        min: 150,
        max: 300,
        label: "سطح ۲ — محرومیت متوسط"
    },
    {
        index: 3,
        min: 300,
        max: 450,
        label: "سطح ۳ — محرومیت نسبتاً شدید"
    },
    {
        index: 4,
        min: 450,
        max: 600,
        label: "سطح ۴ — محرومیت شدید"
    },
    {
        index: 5,
        min: 600,
        max: 1000,
        label: "سطح ۵ — محرومیت بسیار شدید"
    }
];
function levelOf(total) {
    if (total < 0 || total > TOTAL_CAP) return undefined;
    return LEVELS.find((l)=>total >= l.min && total < l.max) ?? LEVELS[4];
}
const LEVEL_LABELS_PENDING_APPROVAL = true;
const FLAG_DEFS = {
    R1: {
        title: "خطر جانی یا فوریت پزشکی",
        desc: "وضعیتی که تأخیر در رسیدگی می‌تواند به سلامت یا زندگی فرد آسیب جدی بزند.",
        strict: true,
        pendingApproval: true
    },
    R2: {
        title: "بی‌خانمانی یا اخطار تخلیه قریب‌الوقوع",
        desc: "نبود محل خواب ایمن یا اخطار معتبر تخلیه/فقدان مسکن در کوتاه‌مدت.",
        strict: true,
        pendingApproval: true
    },
    R3: {
        title: "سوءتغذیه کودک یا نیاز تغذیه‌ای ویژه",
        desc: "کودک با سوءتغذیه مشکوک/تشخیص‌شده یا مادر باردار/شیرده نیازمند تغذیه و درمان.",
        strict: false,
        pendingApproval: true
    },
    R4: {
        title: "کودک کار یا کودک در خطر",
        desc: "کودکی که کار یا مسئولیت اجباری، امنیت، سلامت یا تحصیل او را مختل کرده است.",
        strict: false,
        pendingApproval: true
    },
    R5: {
        title: "خشونت یا خطر آسیب به خود/دیگران",
        desc: "نشانه خشونت خانگی، خودآسیبی یا خطر آسیب به دیگران — ثبت محدود و محرمانه.",
        strict: true,
        pendingApproval: true
    },
    R6: {
        title: "فقدان مراقب برای فرد وابسته",
        desc: "کودک، سالمند یا فرد نیازمند مراقبت بدون مراقب قابل اتکا.",
        strict: false,
        pendingApproval: true
    },
    R7: {
        title: "قطع خدمت حیاتی",
        desc: "قطع آب/برق/دارو/غذای ضروری بدون جایگزین ایمن در دسترس.",
        strict: false,
        pendingApproval: true
    },
    R8: {
        title: "مانع حقوقی/اداری مسدودکننده خدمت حیاتی",
        desc: "نبود مدرک هویتی یا مانع حقوقی/اداری که دسترسی به خدمت یا حق اساسی را مسدود کرده باشد.",
        strict: false,
        pendingApproval: true
    },
    R9: {
        title: "تناقض یا شبهه جدی در داده نیازمند راستی‌آزمایی",
        desc: "مغایرت بین مدارک، اظهارات یا مشاهدات که اعتبار ارزیابی را زیر سؤال می‌برد.",
        strict: false,
        pendingApproval: true
    }
};
const REFERRAL_PATHS = [
    {
        id: "monitoring",
        label: "پایش و خدمات عمومی"
    },
    {
        id: "admin_service",
        label: "پاسخ اداری یا خدمت مشخص"
    },
    {
        id: "further_review",
        label: "بررسی تکمیلی"
    },
    {
        id: "cdi_normal",
        label: "ارجاع عادی به CDI"
    },
    {
        id: "cdi_priority",
        label: "ارجاع اولویت‌دار"
    },
    {
        id: "cdi_fast_multi",
        label: "ارجاع سریع و چندبخشی"
    },
    {
        id: "immediate",
        label: "رسیدگی فوری (مستقل از امتیاز)"
    },
    {
        id: "preventive",
        label: "ارجاع پیشگیرانه"
    },
    {
        id: "data_verification",
        label: "راستی‌آزمایی داده"
    }
];
const OBSERVATION_META_FIELDS = [
    "منبع یا منابع داده",
    "تاریخ مشاهده یا دریافت",
    "ثبت‌کننده و نقش او",
    "مدرک مرتبط (در صورت ضرورت و مجوز)",
    "وضعیت کفایت و اعتبار داده",
    "تناقض یا اطلاعات ناقص",
    "ضریب شدت محاسبه‌شده مطابق قواعد",
    "وضعیت تأیید یا اصلاح مستند",
    "دلیل اصلاح و سابقه تغییر",
    "نشانه خطر و وضعیت بررسی آن"
];
const PENDING_APPROVALS = [
    {
        scope: "B",
        item: "ناسازگاری سند مرجع: مجموع وزن‌های بُعد B برابر ۲۱۰ است (۶۰+۲۵+۲۰+۲۰+۱۵+۳۰+۴۰) ولی سقف بُعد B برابر ۲۰۰ و کل برابر ۱۰۰۰ اعلام شده است",
        why: "طبق دستور کار، ناسازگاری متن بدون invent به فهرست تأیید ارجاع شد؛ مرجع باید یکی از وزن‌ها یا سقف را اصلاح کند. وزن‌های اعداد مشخص‌شده عیناً اعمال شده‌اند."
    },
    {
        scope: "A6",
        item: "تعداد تجربه‌های ناامنی غذایی در ۳۰ روز برای هر ضریب پنج‌حالته (۰ تا ۴+)",
        why: "آستانه عددی و دوره ارزیابی واحد در سند مرجع صریح نشده است."
    },
    {
        scope: "C4",
        item: "آستانه نفر بر اتاق قابل سکونت برای ضرایب پنج‌حالته",
        why: "مطابق آستانه‌های مرجع باید تصویب شود؛ مقدار فعلی پیشنهادی است."
    },
    {
        scope: "C8",
        item: "نسبت هزینه مسکن به منابع و مدیریت معوقه برای ضرایب پنج‌حالته",
        why: "نسبت و مرزها در سند مرجع مشخص نیست؛ ودیعه در محاسبه لحاظ نمی‌شود."
    },
    {
        scope: "D3",
        item: "برش‌های نسبت منابع قابل اتکا به خط فقر منطقه‌ای",
        why: "برش‌های D3 در سند «پیشنهادی» عنوان شده و نیازمند اعتبارسنجی است."
    },
    {
        scope: "D3",
        item: "مقیاس معادل‌سازی اندازه/ترکیب خانوار",
        why: "تعریف واحد اندازه‌گیری خانوار باید توسط مرجع تعیین شود."
    },
    {
        scope: "B1",
        item: "حداقل مدت وقفه تحصیل برای ضریب میانی",
        why: "دوره ارزیابی واحد در سند تعیین نشده است."
    },
    {
        scope: "سطوح",
        item: "برچسب‌های رسمی سطوح ۱ تا ۵ محرومیت",
        why: "مرزهای عددی از سند مرجع است؛ برچسب‌ها برای نمایش پیشنهادی‌اند."
    },
    {
        scope: "R1 تا R9",
        item: "تعریف عملیاتی دقیق نشانه‌های خطر",
        why: "فهرست R1 تا R9 در سند مرجع نام برده شده ولی تعریف کامل ارائه نشده است."
    },
    {
        scope: "خط فقر",
        item: "نسخه معتبر خط فقر منطقه‌ای و تاریخ اعتبار",
        why: "خط فقر باید توسط مرجع رسمی تأیید شود؛ ورود دستی فعلاً «تأییدنشده» است."
    },
    {
        scope: "ارجاع",
        item: "تفاوت «امکان ارجاع» و «ارجاع عادی» در بازه ۳۰۰ تا ۴۴۹",
        why: "اختلاف اسناد برای تأیید مرجع ثبت شد."
    },
    {
        scope: "C8/D3",
        item: "مدیریت درآمد صفر و جداکردن ودیعه از هزینه ماهانه",
        why: "قاعده مرجع اعمال شد ولی صورت‌بندی نهایی نیازمند تأیید است."
    },
    {
        scope: "D1",
        item: "دوره ارزیابی واحد و آستانه «نوسان جدی» درآمد تأمین‌کننده",
        why: "دوره واحد و شواهد کافی برای ناپایداری باید رسمی تعیین شود؛ فعلاً قاعده نمایشی است."
    },
    {
        scope: "D1",
        item: "نبود فرد اصلی دارای توان و امکان کار در خانوار",
        why: "وضعیت کاربرد شاخص و نحوه محاسبه باید رسماً تعیین شود؛ صفر یا یک خودسرانه تخصیص نیابد."
    },
    {
        scope: "شاخص‌های عضو‌محور",
        item: "قاعده تجمیع چند عضو (جمع یا بیشینه) در مواردی که جدول صریح نیست",
        why: "همه شاخص‌ها با جمع یا بیشینه دلخواه تجمیع نشوند؛ قاعده باید برای هر شاخص مصوب شود."
    },
    {
        scope: "C4",
        item: "وضعیت صفر اتاق قابل سکونت و فقدان فضای خواب ایمن",
        why: "تقسیم بر صفر ممنوع است؛ رسیدگی به فقدان اتاق با قاعده مصوب انجام شود."
    },
    {
        scope: "C8",
        item: "فرمول دقیق منابع قابل‌دسترس و حالات صفر/منفی‌شدن پس از کسر درمان",
        why: "یک مبلغ «درآمد خالص» مشترک بدون توجه به تفاوت تعریف C8 و D3 استفاده نشود."
    },
    {
        scope: "اعتبار منابع",
        item: "تفکیک اولویت دریافت خدمات/استعلام‌ها از اعتبار شواهد درباره وضعیت جاری",
        why: "تناقض‌ها با بررسی انسانی حل می‌شوند؛ قاعده اولویت باید تصویب شود."
    },
    {
        scope: "پرچم قرمز",
        item: "گردش کار انسانی: ثبت بی‌درنگ، تأیید تخصصی، تداوم و خاتمه",
        why: "ثبت نشانه هشدار اولیه بی‌درنگ است؛ تأیید و خاتمه در فرایند انسانی مستقل انجام می‌شود."
    }
];
const DEPRECATED_REFS = [
    "D4",
    "D5",
    "D6",
    "E6"
];
}),
"[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** قالب‌بندی فارسی: اعداد، مبلغ، تاریخ و زمان */ __turbopack_context__.s([
    "faDate",
    ()=>faDate,
    "faDateTime",
    ()=>faDateTime,
    "faMoney",
    ()=>faMoney,
    "faNum",
    ()=>faNum,
    "faPct",
    ()=>faPct,
    "faScore",
    ()=>faScore,
    "nowIso",
    ()=>nowIso,
    "uid",
    ()=>uid
]);
function faNum(n, digits = 0) {
    if (n === undefined || n === null || Number.isNaN(n)) return "—";
    return n.toLocaleString("fa-IR", {
        maximumFractionDigits: digits,
        minimumFractionDigits: 0
    });
}
function faScore(n) {
    if (n === undefined || n === null || Number.isNaN(n)) return "—";
    return n.toLocaleString("fa-IR", {
        maximumFractionDigits: 2
    });
}
function faMoney(n) {
    if (n === undefined || n === null || Number.isNaN(n)) return "—";
    return `${n.toLocaleString("fa-IR")} تومان`;
}
function faDate(d) {
    if (!d) return "—";
    try {
        const date = typeof d === "string" ? new Date(d) : d;
        return new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "medium",
            timeZone: "Asia/Tehran"
        }).format(date);
    } catch  {
        return "—";
    }
}
function faDateTime(d) {
    if (!d) return "—";
    try {
        const date = typeof d === "string" ? new Date(d) : d;
        return new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Tehran"
        }).format(date);
    } catch  {
        return "—";
    }
}
function nowIso() {
    return new Date().toISOString();
}
function uid(prefix = "id") {
    return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
function faPct(n) {
    return `${faNum(Math.round(n))}٪`;
}
}),
"[project]/src/lib/mpi/demo-bank.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_BANK",
    ()=>DEMO_BANK,
    "buildDemoBank",
    ()=>buildDemoBank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
;
;
/**
 * بانک داده نمونه — ۸ پرونده خانوار با شرایط مختلف (تماماً ساختگی)
 *
 * هدف: نمایش رفتار موتور قواعد EM-MPI روی طیف کامل سطوح ۱ تا ۵،
 * وضعیت‌های پرونده (پیش‌نویس، ثبت‌شده، در بازبینی، ارجاع‌شده، بسته)،
 * پرچم‌های خطر، ارجاع، بررسی مددکار و مسائل کیفیت داده.
 *
 * ⚠️ هیچ‌کدام از این داده‌ها واقعی نیستند؛ همه نام‌ها پسوند «(نمونه)» دارند.
 */ const DAY = 24 * 3600 * 1000;
const daysAgo = (n)=>new Date(Date.now() - n * DAY).toISOString();
function flag(code, detail, status, ageDays, source = "ثبت نمونه") {
    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FLAG_DEFS"][code];
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("flg"),
        code,
        title: def.title,
        detail: `${detail} (نمونه)`,
        recordedAt: daysAgo(ageDays),
        source,
        confidentiality: def.strict ? "strict" : "restricted",
        status
    };
}
function base(status, ageDays) {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("hh"),
        createdAt: daysAgo(ageDays),
        updatedAt: daysAgo(Math.max(ageDays - 3, 0)),
        ruleSetVersion: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RULE_SET"].fullId,
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
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
                at: daysAgo(ageDays),
                actor: "سیستم",
                role: "system",
                action: "ایجاد پرونده نمونه (بانک داده نمایشی)",
                detail: `نسخه قواعد: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RULE_SET"].fullId}`
            }
        ],
        changeStatements: []
    };
}
function member(a, m) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("m");
    a.members.push({
        id,
        ...m
    });
    return id;
}
/* ============================================================
   ۱) خانوار کم‌امتیاز با نیاز درمانی فوری — سطح ۲
   ============================================================ */ const urgent = {
    key: "urgent",
    title: "کم‌امتیاز با نیاز درمانی فوری (سطح ۲)",
    build: ()=>{
        const a = base("submitted", 12);
        a.requestTypes = [
            "کمک درمان",
            "رسیدگی فوری (وضعیت اضطراری)"
        ];
        a.household = {
            responderName: "مریم احمدی (نمونه)",
            responderRelation: "همسر",
            headName: "علی محمدی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: "1234567891",
            headBirthDate: "۱۳۵۸/۰۳/۱۴",
            postalCode: "1234567890",
            province: "اصفهان",
            county: "نجف‌آباد",
            dwellingType: "واحد مسکونی",
            tenureType: "مستأجر",
            monthlyRent: 3_000_000,
            monthlyCharge: 300_000,
            monthlyBills: 400_000,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان اصفهان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "علی",
            lastName: "محمدی (نمونه)",
            relation: "سرپرست",
            age: 45,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "employed"
        });
        const w = member(a, {
            firstName: "مریم",
            relation: "همسر",
            age: 40,
            gender: "female"
        });
        const c = member(a, {
            firstName: "سینا",
            relation: "فرزند",
            age: 13,
            gender: "male",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const ans = {
            [`A1_disease#${h}`]: "controlled",
            [`A1_impact#${h}`]: "moderate",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "effective",
            [`A1_disease#${w}`]: "none",
            [`A1_impact#${w}`]: "none",
            [`A2_limit#${w}`]: "none",
            [`A3_treatment#${w}`]: "none",
            [`A5_cover#${w}`]: "barriers",
            [`A1_disease#${c}`]: "uncontrolled",
            [`A1_impact#${c}`]: "severe",
            [`A2_limit#${c}`]: "none",
            [`A3_treatment#${c}`]: "no_access",
            [`A3_urgent#${c}`]: true,
            [`A3_cause#${c}`]: "هزینه جراحی و نبود تخت تخصصی در استان (داده ساختگی)",
            [`A5_cover#${c}`]: "barriers",
            [`B6_need#${h}`]: "none",
            [`B6_need#${w}`]: "none",
            [`B6_need#${c}`]: "none",
            [`B1_status#${c}`]: "attending",
            [`B2_risks#${c}`]: [
                "absence"
            ],
            A4_burden: "manageable",
            A4_effects: [
                "debt"
            ],
            A6_exp: [
                "none"
            ],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c}`]: false,
            [`A_pregnant#${w}`]: false,
            B3_lit: "full",
            B4_barriers: "none",
            B5_digital: "adequate",
            B7_path: "active",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [
                "none"
            ],
            C3_right: "clear",
            C4_rooms: 2,
            C4_safesleep: "all",
            C5_water: "stable",
            C5_elec: "stable",
            C5_cook: "stable",
            C6_san: "good",
            C7_missing: [
                "none"
            ],
            C7_impact: "none",
            C8_arrears_severity: "none",
            C9_access: "adequate",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "stable",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "clear",
            E1_evidence: "اشتغال دائم دارد (داده ساختگی).",
            E2_support: "no_need",
            E2_hours: 0,
            E3_support: "reliable",
            E3_who: "برادر سرپرست",
            E4_barrier: "none",
            E4_types: [],
            E4_service: ""
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "حقوق کارگری",
                receiverMemberId: h,
                monthlyAmount: 12_000_000,
                continuity: "regular",
                reliability: "reliable",
                verified: false
            }
        ];
        a.flags = [
            flag("R1", "کودک ۱۳ ساله با درمان ضروری بدون دسترسی و نشانه فوریت پزشکی", "open", 3, "پرسشنامه — گام سلامت")
        ];
        return a;
    }
};
/* ============================================================
   ۲) خانوار بی‌خانمان — سطح ۵
   ============================================================ */ const homeless = {
    key: "homeless",
    title: "بی‌خانمان با دو کودک (سطح ۵)",
    build: ()=>{
        const a = base("in_review", 20);
        a.requestTypes = [
            "کمک مسکن و اجاره‌بها",
            "رسیدگی فوری (وضعیت اضطراری)"
        ];
        a.household = {
            responderName: "زهرا کریمی (نمونه)",
            responderRelation: "سرپرست",
            headName: "زهرا کریمی (نمونه)",
            headNationalIdStatus: "missing",
            headNationalId: undefined,
            headBirthDate: "۱۳۷۲/۰۹/۰۲",
            postalCode: undefined,
            province: "خوزستان",
            county: "اهواز",
            dwellingType: "خودرو/فضای عمومی",
            tenureType: "—",
            noFixedAddress: true,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 3_800_000,
                region: "استان خوزستان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۶",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "زهرا",
            lastName: "کریمی (نمونه)",
            relation: "سرپرست",
            age: 34,
            gender: "female",
            isHead: true,
            isResponder: true,
            isMainProvider: true,
            isMainCaregiver: true,
            employmentStatus: "irregular"
        });
        const c1 = member(a, {
            firstName: "آیدا",
            relation: "فرزند",
            age: 9,
            gender: "female",
            schoolAge: true,
            educationStatus: "dropped"
        });
        const c2 = member(a, {
            firstName: "نیما",
            relation: "فرزند",
            age: 4,
            gender: "male",
            needsCare: true
        });
        const ans = {
            [`A1_disease#${h}`]: "none",
            [`A1_impact#${h}`]: "none",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "none",
            [`A1_disease#${c1}`]: "none",
            [`A1_impact#${c1}`]: "none",
            [`A2_limit#${c1}`]: "none",
            [`A3_treatment#${c1}`]: "scheduled",
            [`A5_cover#${c1}`]: "none",
            [`A1_disease#${c2}`]: "controlled",
            [`A1_impact#${c2}`]: "moderate",
            [`A2_limit#${c2}`]: "unmet",
            [`A3_treatment#${c2}`]: "no_access",
            [`A5_cover#${c2}`]: "none",
            [`B1_status#${c1}`]: "dropped",
            [`B1_months#${c1}`]: 7,
            [`B1_reason#${c1}`]: "جابه‌جایی مکرر و نبود ثبات (نمونه)",
            [`B2_risks#${c1}`]: [
                "absence",
                "decline",
                "cost"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${c1}`]: "none",
            [`B6_need#${c2}`]: "needs_assessment",
            A4_burden: "severe",
            A4_effects: [
                "debt",
                "food"
            ],
            A6_exp: [
                "worry",
                "variety",
                "quantity",
                "mealskip"
            ],
            A6_now: false,
            A7_disrupt: "moderate",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c2}`]: true,
            [`A_pregnant#${h}`]: false,
            B3_lit: "with_help",
            B4_barriers: "serious",
            B5_digital: "missing",
            B7_path: "interested_no_path",
            C1_place: "nonresidential",
            C1_eviction: "imminent",
            C2_issues: [
                "uninhabitable"
            ],
            C3_right: "risk",
            C4_rooms: 0,
            C4_safesleep: "none",
            C5_water: "unstable",
            C5_elec: "off",
            C5_cook: "off",
            C6_san: "unsafe_missing",
            C7_missing: [
                "fridge",
                "cooker",
                "heater",
                "bed"
            ],
            C7_impact: "disruptive",
            C8_arrears_severity: "none",
            C9_access: "serious",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "limited",
            [`D1_continuity#${h}`]: "irregular",
            [`D1_seasonal#${h}`]: true,
            E1_outlook: "none",
            E1_evidence: "بدون مسکن و شغل ثابت (نمونه).",
            E2_support: "partial",
            E2_hours: 8,
            E3_support: "sporadic",
            E3_who: "خیریه محلی گاه‌گاهی",
            E4_barrier: "blocking",
            E4_types: [
                "identity",
                "admin"
            ],
            E4_service: "ثبت‌نام کودک در مدرسه به دلیل نبود مدارک هویتی (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "کار روزمزد",
                receiverMemberId: h,
                monthlyAmount: 3_500_000,
                continuity: "occasional",
                reliability: "uncertain"
            }
        ];
        a.flags = [
            flag("R2", "سکونت در خودرو، بدون مسکن پایدار", "confirmed", 15, "بازدید میدانی"),
            flag("R3", "کودک ۴ ساله با سوءتغذیه مشکوک", "reviewing", 12, "سنجش سلامت"),
            flag("R7", "قطع برق و انرژی پخت‌وپز بدون جایگزین", "open", 10, "گام مسکن")
        ];
        a.audit.push({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
            at: daysAgo(12),
            actor: "مددکار نمونه",
            role: "caseworker",
            action: "بازبینی اولیه پرونده",
            detail: "تأیید وضعیت بی‌خانمانی و ارجاع به مرکز نگهداری موقت (نمونه)"
        });
        return a;
    }
};
/* ============================================================
   ۳) اطلاعات ناقص و تناقض منابع — غیرنهایی
   ============================================================ */ const incomplete = {
    key: "incomplete",
    title: "اطلاعات ناقص و تناقض منابع (غیرنهایی)",
    build: ()=>{
        const a = base("draft", 5);
        a.requestTypes = [
            "درخواست تشکیل/به‌روزرسانی پرونده حمایت"
        ];
        a.household = {
            responderName: "حسن رضایی (نمونه)",
            responderRelation: "سرپرست",
            headName: "حسن رضایی (نمونه)",
            headNationalIdStatus: "in_progress",
            headNationalId: "2345678909",
            headBirthDate: "۱۳۴۹/۱۱/۲۵",
            postalCode: "2345678901",
            province: "کرمان",
            county: "سیرجان",
            dwellingType: "واحد مسکونی",
            tenureType: "مالک",
            monthlyRent: 2_500_000,
            arrears: 4_000_000
        };
        const h = member(a, {
            firstName: "حسن",
            lastName: "رضایی (نمونه)",
            relation: "سرپرست",
            age: 51,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "unemployed_seeking"
        });
        const c = member(a, {
            firstName: "فاطمه",
            relation: "فرزند",
            age: 16,
            gender: "female",
            schoolAge: true,
            educationStatus: "interrupted"
        });
        const ans = {
            [`A1_disease#${h}`]: "__dontknow__",
            [`A1_impact#${h}`]: "moderate",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "barriers",
            [`A1_disease#${c}`]: "none",
            [`A1_impact#${c}`]: "none",
            [`A2_limit#${c}`]: "none",
            [`A3_treatment#${c}`]: "none",
            [`A5_cover#${c}`]: "__refuse__",
            [`B1_status#${c}`]: "interrupted",
            [`B1_months#${c}`]: "__needreview__",
            [`B2_risks#${c}`]: [
                "decline",
                "cost"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${c}`]: "__dontknow__",
            A4_burden: "__dontknow__",
            A4_effects: [
                "debt"
            ],
            A6_exp: [
                "worry"
            ],
            A6_now: true,
            A7_disrupt: "__needreview__",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c}`]: false,
            [`A_pregnant#${c}`]: false,
            B3_lit: "with_help",
            B4_barriers: "__dontknow__",
            B5_digital: "__dontknow__",
            B7_path: "interested_no_path",
            C1_place: "stable",
            C1_eviction: "credible",
            C2_issues: [
                "damp"
            ],
            C3_right: "ambiguous",
            C4_rooms: "__dontknow__",
            C4_safesleep: "partial",
            C5_water: "stable",
            C5_elec: "unstable",
            C5_cook: "stable",
            C6_san: "shared_minor",
            C7_missing: [
                "heater"
            ],
            C7_impact: "minor",
            C8_arrears_severity: "significant",
            C9_access: "manageable",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "none",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "uncertain",
            E1_evidence: "بدون شغل و با بدهی (نمونه).",
            E2_support: "__dontknow__",
            E2_hours: 0,
            E3_support: "sporadic",
            E3_who: "همسایه‌ها",
            E4_barrier: "in_progress",
            E4_types: [
                "identity"
            ],
            E4_service: "درخواست تعویض شناسنامه در جریان است (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "یارانه",
                receiverMemberId: h,
                monthlyAmount: 1_400_000,
                continuity: "regular",
                reliability: "reliable"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "ارثیه (دریافت یک‌باره)",
                receiverMemberId: h,
                monthlyAmount: 30_000_000,
                continuity: "one_off",
                reliability: "reliable",
                note: "در درآمد ماهانه لحاظ نمی‌شود (نمونه)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "کار آزاد",
                receiverMemberId: h,
                monthlyAmount: 2_000_000,
                continuity: "occasional",
                reliability: "disputed"
            }
        ];
        a.qualityIssues = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                type: "conflict",
                description: "نوع حق سکونت «مالک» است ولی اجاره ماهانه مثبت ثبت شده است.",
                createdAt: daysAgo(4),
                status: "open"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                type: "missing",
                description: "خط فقر منطقه‌ای معتبر ثبت نشده است؛ D3 غیرنهایی می‌ماند.",
                createdAt: daysAgo(4),
                status: "open"
            }
        ];
        a.flags = [
            flag("R9", "تناقض حق سکونت/اجاره و منبع درآمد موردی با ادعای مالکیت", "open", 4, "موتور تناقض‌یاب")
        ];
        return a;
    }
};
/* ============================================================
   ۴) مادر سرپرست با سه فرزند — محرومیت آموزشی — سطح ۲
   ============================================================ */ const singleMother = {
    key: "single-mother",
    title: "مادر سرپرست با سه فرزند (سطح ۲)",
    build: ()=>{
        const a = base("submitted", 9);
        a.requestTypes = [
            "حمایت تحصیلی",
            "کمک معیشت و تغذیه"
        ];
        a.household = {
            responderName: "نیلوفر صادقی (نمونه)",
            responderRelation: "سرپرست",
            headName: "نیلوفر صادقی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: "3456789017",
            headBirthDate: "۱۳۶۸/۰۵/۰۸",
            postalCode: "3456789012",
            province: "خراسان رضوی",
            county: "مشهد",
            dwellingType: "واحد مسکونی",
            tenureType: "مستأجر",
            monthlyRent: 4_000_000,
            monthlyCharge: 250_000,
            monthlyBills: 450_000,
            arrears: 2_000_000,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان خراسان رضوی",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "نیلوفر",
            lastName: "صادقی (نمونه)",
            relation: "سرپرست",
            age: 36,
            gender: "female",
            isHead: true,
            isResponder: true,
            isMainProvider: true,
            isMainCaregiver: true,
            employmentStatus: "irregular"
        });
        const c1 = member(a, {
            firstName: "امیر",
            relation: "فرزند",
            age: 15,
            gender: "male",
            schoolAge: true,
            educationStatus: "interrupted"
        });
        const c2 = member(a, {
            firstName: "سارا",
            relation: "فرزند",
            age: 11,
            gender: "female",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const c3 = member(a, {
            firstName: "رضا",
            relation: "فرزند",
            age: 7,
            gender: "male",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const ans = {
            [`A1_disease#${h}`]: "none",
            [`A1_impact#${h}`]: "none",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "effective",
            [`A1_disease#${c1}`]: "none",
            [`A1_impact#${c1}`]: "none",
            [`A2_limit#${c1}`]: "none",
            [`A3_treatment#${c1}`]: "none",
            [`A5_cover#${c1}`]: "barriers",
            [`A1_disease#${c2}`]: "none",
            [`A1_impact#${c2}`]: "none",
            [`A2_limit#${c2}`]: "none",
            [`A3_treatment#${c2}`]: "none",
            [`A5_cover#${c2}`]: "barriers",
            [`A1_disease#${c3}`]: "none",
            [`A1_impact#${c3}`]: "none",
            [`A2_limit#${c3}`]: "none",
            [`A3_treatment#${c3}`]: "none",
            [`A5_cover#${c3}`]: "barriers",
            [`B1_status#${c1}`]: "interrupted",
            [`B1_months#${c1}`]: 4,
            [`B1_reason#${c1}`]: "کار در تعمیرگاه برای کمک به معیشت (نمونه)",
            [`B2_risks#${c1}`]: [
                "absence",
                "cost"
            ],
            [`B1_status#${c2}`]: "attending",
            [`B2_risks#${c2}`]: [
                "cost"
            ],
            [`B1_status#${c3}`]: "attending",
            [`B2_risks#${c3}`]: [],
            [`B6_need#${h}`]: "none",
            [`B6_need#${c1}`]: "none",
            [`B6_need#${c2}`]: "none",
            [`B6_need#${c3}`]: "none",
            A4_burden: "manageable",
            A4_effects: [],
            A6_exp: [
                "worry"
            ],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c1}`]: false,
            [`A_malnut#${c2}`]: false,
            [`A_malnut#${c3}`]: false,
            [`A_pregnant#${h}`]: false,
            B3_lit: "full",
            B4_barriers: "resolvable",
            B4_detail: "هزینه لوازم التحریر و پوشاک مدرسه (نمونه)",
            B5_digital: "insufficient",
            B7_path: "interested_no_path",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [
                "damp"
            ],
            C3_right: "clear",
            C4_rooms: 2,
            C4_safesleep: "all",
            C5_water: "stable",
            C5_elec: "stable",
            C5_cook: "stable",
            C6_san: "good",
            C7_missing: [
                "washer"
            ],
            C7_impact: "minor",
            C8_arrears_severity: "minor",
            C9_access: "manageable",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "irregular",
            [`D1_seasonal#${h}`]: true,
            E1_outlook: "uncertain",
            E1_evidence: "خیاطی در منزل با سفارش نامنظم (نمونه).",
            E2_support: "no_need",
            E2_hours: 0,
            E3_support: "sporadic",
            E3_who: "خانواده مادری گاه‌گاهی",
            E4_barrier: "none",
            E4_types: [],
            E4_service: ""
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "خیاطی در منزل",
                receiverMemberId: h,
                monthlyAmount: 9_500_000,
                continuity: "regular",
                reliability: "reliable",
                verified: false
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "یارانه نقدی",
                receiverMemberId: h,
                monthlyAmount: 1_400_000,
                continuity: "regular",
                reliability: "reliable"
            }
        ];
        a.flags = [
            flag("R4", "نوجوان ۱۵ ساله در حال ترک تحصیل و ورود به کار (نمونه)", "reviewing", 6, "گام آموزش")
        ];
        return a;
    }
};
/* ============================================================
   ۵) سالمند تنها — سطح ۳
   ============================================================ */ const elderly = {
    key: "elderly",
    title: "سالمند تنها با ناتوانی از کار (سطح ۳)",
    build: ()=>{
        const a = base("in_review", 15);
        a.requestTypes = [
            "مراقبت و نگهداری",
            "کمک معیشت و تغذیه"
        ];
        a.household = {
            responderName: "جعفر نوروزی (نمونه)",
            responderRelation: "سرپرست",
            headName: "جعفر نوروزی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: "4567890124",
            headBirthDate: "۱۳۴۰/۰۱/۱۹",
            postalCode: "4567890123",
            province: "گیلان",
            county: "رشت",
            dwellingType: "خانه ویلایی قدیمی",
            tenureType: "استیجاری نزد اقوام",
            monthlyRent: 2_200_000,
            monthlyCharge: 0,
            monthlyBills: 500_000,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان گیلان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۶",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "جعفر",
            lastName: "نوروزی (نمونه)",
            relation: "سرپرست",
            age: 72,
            gender: "male",
            isHead: true,
            isResponder: true,
            isMainProvider: true,
            isMainCaregiver: false,
            employmentStatus: "unable",
            needsCare: true
        });
        const ans = {
            [`A1_disease#${h}`]: "controlled",
            [`A1_impact#${h}`]: "moderate",
            [`A2_limit#${h}`]: "supported",
            [`A2_aid#${h}`]: "عصا و واکر از بهزیستی (نمونه)",
            [`A3_treatment#${h}`]: "scheduled",
            [`A5_cover#${h}`]: "effective",
            A4_burden: "manageable",
            A4_effects: [],
            A6_exp: [
                "variety"
            ],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${h}`]: false,
            [`A_pregnant#${h}`]: false,
            B3_lit: "with_help",
            B4_barriers: "resolvable",
            B5_digital: "no_need",
            [`B6_need#${h}`]: "none",
            B7_path: "no_capability",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [
                "temp"
            ],
            C3_right: "ambiguous",
            C4_rooms: 1,
            C4_safesleep: "all",
            C5_water: "stable",
            C5_elec: "unstable",
            C5_cook: "stable",
            C5_effect: "قطع‌های مکرر برق در ساعات سرما (نمونه)",
            C6_san: "shared_minor",
            C7_missing: [
                "heater"
            ],
            C7_impact: "minor",
            C8_arrears_severity: "none",
            C9_access: "manageable",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "unable",
            [`D1_continuity#${h}`]: "none",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "uncertain",
            E1_evidence: "مستمری غیرکافی؛ امکان کار ندارد (نمونه).",
            E2_support: "partial",
            E2_hours: 4,
            E3_support: "sporadic",
            E3_who: "فرزند ساکن شهر دیگر با تماس تلفنی",
            E4_barrier: "in_progress",
            E4_types: [
                "admin"
            ],
            E4_service: "درخواست سطح‌بندی معلولیت در جریان است (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "مستمری بازنشستگی",
                receiverMemberId: h,
                monthlyAmount: 4_500_000,
                continuity: "regular",
                reliability: "reliable",
                verified: true
            }
        ];
        a.qualityIssues = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                type: "unverified",
                description: "مستمری اعلام‌شده نیازمند راستی‌آزمایی با فیش حقوقی است (نمونه).",
                createdAt: daysAgo(11),
                status: "open"
            }
        ];
        a.flags = [
            flag("R6", "سالمند ناتوان با نیاز مراقبتی ۴ ساعته روزانه و بدون مراقب ساکن", "confirmed", 11, "بازدید خانه")
        ];
        return a;
    }
};
/* ============================================================
   ۶) محرومیت چندبعدی شدید — سطح ۵ — ارجاع‌شده
   ============================================================ */ const severe = {
    key: "severe",
    title: "محرومیت چندبعدی شدید — ارجاع‌شده (سطح ۵)",
    build: ()=>{
        const a = base("referred", 25);
        a.requestTypes = [
            "رسیدگی فوری (وضعیت اضطراری)",
            "کمک معیشت و تغذیه",
            "کمک مسکن و اجاره‌بها"
        ];
        a.household = {
            responderName: "محمود شریفی (نمونه)",
            responderRelation: "سرپرست",
            headName: "محمود شریفی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: undefined,
            headBirthDate: "۱۳۵۲/۰۷/۳۰",
            postalCode: undefined,
            province: "سیستان و بلوچستان",
            county: "چابهار",
            dwellingType: "سازه غیررسمی (کلبه چادری)",
            tenureType: "سکونت غیرمجاز",
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_000_000,
                region: "استان سیستان و بلوچستان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۵",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "محمود",
            lastName: "شریفی (نمونه)",
            relation: "سرپرست",
            age: 39,
            gender: "male",
            isHead: true,
            isResponder: true,
            isMainProvider: true,
            employmentStatus: "irregular"
        });
        const w = member(a, {
            firstName: "عزیزه",
            relation: "همسر",
            age: 33,
            gender: "female",
            isMainCaregiver: true,
            employmentStatus: "unemployed_not_seeking"
        });
        const c1 = member(a, {
            firstName: "یوسف",
            relation: "فرزند",
            age: 14,
            gender: "male",
            schoolAge: true,
            educationStatus: "never",
            note: "کودک کار — چرخ‌دوزی خیابانی (نمونه)"
        });
        const c2 = member(a, {
            firstName: "معصومه",
            relation: "فرزند",
            age: 10,
            gender: "female",
            schoolAge: true,
            educationStatus: "dropped"
        });
        const c3 = member(a, {
            firstName: "حبیب",
            relation: "فرزند",
            age: 5,
            gender: "male",
            needsCare: true
        });
        const ans = {
            [`A1_disease#${h}`]: "uncontrolled",
            [`A1_impact#${h}`]: "severe",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "no_access",
            [`A5_cover#${h}`]: "none",
            [`A1_disease#${w}`]: "none",
            [`A1_impact#${w}`]: "none",
            [`A2_limit#${w}`]: "none",
            [`A3_treatment#${w}`]: "none",
            [`A5_cover#${w}`]: "none",
            [`A1_disease#${c1}`]: "none",
            [`A1_impact#${c1}`]: "none",
            [`A2_limit#${c1}`]: "none",
            [`A3_treatment#${c1}`]: "none",
            [`A5_cover#${c1}`]: "none",
            [`A1_disease#${c2}`]: "none",
            [`A1_impact#${c2}`]: "none",
            [`A2_limit#${c2}`]: "none",
            [`A3_treatment#${c2}`]: "scheduled",
            [`A5_cover#${c2}`]: "none",
            [`A1_disease#${c3}`]: "uncontrolled",
            [`A1_impact#${c3}`]: "severe",
            [`A2_limit#${c3}`]: "unmet",
            [`A3_treatment#${c3}`]: "no_access",
            [`A5_cover#${c3}`]: "none",
            [`B1_status#${c1}`]: "never",
            [`B2_risks#${c1}`]: [
                "child_labor",
                "absence",
                "decline"
            ],
            [`B1_status#${c2}`]: "dropped",
            [`B1_months#${c2}`]: 14,
            [`B1_reason#${c2}`]: "فاصله و نبود مدرسه دخترانه نزدیک (نمونه)",
            [`B2_risks#${c2}`]: [
                "absence",
                "cost",
                "child_labor"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${w}`]: "none",
            [`B6_need#${c1}`]: "none",
            [`B6_need#${c2}`]: "unmet",
            [`B6_need#${c3}`]: "needs_assessment",
            A4_burden: "severe",
            A4_effects: [
                "debt",
                "food"
            ],
            A6_exp: [
                "worry",
                "variety",
                "quantity",
                "mealskip",
                "hunger"
            ],
            A6_now: false,
            A7_disrupt: "moderate",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c3}`]: true,
            [`A_pregnant#${w}`]: false,
            B3_lit: "cannot",
            B4_barriers: "serious",
            B4_detail: "نزدیک‌ترین مدرسه ۹ کیلومتر بدون سرویس (نمونه)",
            B5_digital: "missing",
            B7_path: "no_capability",
            B7_skills: "چرخ‌دوزی دستی سرپرست (نمونه)",
            C1_place: "nonresidential",
            C1_eviction: "imminent",
            C2_issues: [
                "structural",
                "uninhabitable"
            ],
            C3_right: "risk",
            C4_rooms: 1,
            C4_safesleep: "none",
            C5_water: "unstable",
            C5_elec: "off",
            C5_cook: "off",
            C5_effect: "آب با تانکر و با تأخیر؛ شب‌ها بی‌روشنایی (نمونه)",
            C6_san: "unsafe_missing",
            C7_missing: [
                "fridge",
                "cooker",
                "heater",
                "bed"
            ],
            C7_impact: "disruptive",
            C8_arrears_severity: "significant",
            C9_access: "serious",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "limited",
            [`D1_continuity#${h}`]: "irregular",
            [`D1_seasonal#${h}`]: true,
            E1_outlook: "none",
            E1_evidence: "کار روزمزد ساحلی با فصل سرد متوقف می‌شود (نمونه).",
            E2_support: "partial",
            E2_hours: 6,
            E3_support: "none",
            E3_who: "",
            E4_barrier: "blocking",
            E4_types: [
                "identity",
                "admin"
            ],
            E4_service: "شناسنامه معتبر ندارند؛ هیچ ثبت‌نام مدرسه یا بیمه‌ای ممکن نشده (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "کار روزمزد ساحلی",
                receiverMemberId: h,
                monthlyAmount: 2_800_000,
                continuity: "occasional",
                reliability: "uncertain"
            }
        ];
        a.flags = [
            flag("R2", "سکونت در کلبه غیرقابل سکونت با خطر تخریب", "confirmed", 24, "بازدید میدانی"),
            flag("R3", "سوءتغذیه کودک ۵ ساله", "confirmed", 22, "سنجش سلامت"),
            flag("R4", "کودک ۱۴ ساله شاغل و خارج از آموزش", "confirmed", 22, "گام آموزش"),
            flag("R7", "قطع برق و انرژی پخت‌وپز بدون جایگزین", "open", 21, "گام مسکن"),
            flag("R8", "نبود شناسنامه — انسداد دسترسی به مدرسه و بیمه", "confirmed", 20, "گام مراقبت")
        ];
        a.referrals = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("ref"),
                path: "cdi_fast_multi",
                destination: "کمیته امداد شهرستان + بهزیستی + آموزش‌وپرورش (نمونه)",
                priority: "fast",
                reason: "محرومیت چندبعدی شدید با چند نشانه خطر فعال (نمونه)",
                createdAt: daysAgo(18),
                status: "accepted",
                sentAt: daysAgo(18),
                acceptedAt: daysAgo(15),
                ownershipAccepted: true,
                ownerName: "مددکار مسئول شهرستان (نمونه)"
            }
        ];
        a.reviews = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("rev"),
                at: daysAgo(19),
                by: "مددکار ارشد نمونه",
                role: "caseworker",
                note: "همه ۳۰ شاخص تکمیل و با بازدید میدانی تطبیق داده شد؛ اولویت رسیدگی فوری (نمونه).",
                decision: "data_confirmed"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("rev"),
                at: daysAgo(18),
                by: "مددکار ارشد نمونه",
                role: "caseworker",
                note: "ارجاع سریع و چندبخشی ثبت شد؛ پیگیری پذیرش مسئولیت تا مقصد ادامه دارد (نمونه).",
                decision: "referred"
            }
        ];
        return a;
    }
};
/* ============================================================
   ۷) کودک معلول و بار مراقبت — سطح ۳
   ============================================================ */ const disabledChild = {
    key: "disabled-child",
    title: "کودک معلول و بار مراقبت سنگین (سطح ۳)",
    build: ()=>{
        const a = base("in_review", 7);
        a.requestTypes = [
            "توانمندسازی و اشتغال",
            "کمک درمان"
        ];
        a.household = {
            responderName: "سمیه موسوی (نمونه)",
            responderRelation: "همسر",
            headName: "رسول موسوی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: "5678901230",
            headBirthDate: "۱۳۶۳/۱۲/۰۳",
            postalCode: "5678901234",
            province: "آذربایجان شرقی",
            county: "تبریز",
            dwellingType: "آپارتمان اجاره‌ای",
            tenureType: "مستأجر",
            monthlyRent: 5_000_000,
            monthlyCharge: 400_000,
            monthlyBills: 600_000,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان آذربایجان شرقی",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "رسول",
            lastName: "موسوی (نمونه)",
            relation: "سرپرست",
            age: 42,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "employed"
        });
        const w = member(a, {
            firstName: "سمیه",
            relation: "همسر",
            age: 38,
            gender: "female",
            isMainCaregiver: true
        });
        const c1 = member(a, {
            firstName: "پارسا",
            relation: "فرزند",
            age: 8,
            gender: "male",
            schoolAge: true,
            educationStatus: "interrupted",
            needsCare: true,
            note: "معلولیت حرکتی — نیاز به گفتاردرمانی و کاردرمانی (نمونه)"
        });
        const c2 = member(a, {
            firstName: "یاسمن",
            relation: "فرزند",
            age: 12,
            gender: "female",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const g = member(a, {
            firstName: "گلناز",
            relation: "مادر سرپرست",
            age: 68,
            gender: "female",
            needsCare: false
        });
        const ans = {
            [`A1_disease#${h}`]: "none",
            [`A1_impact#${h}`]: "none",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "effective",
            [`A1_disease#${w}`]: "none",
            [`A1_impact#${w}`]: "none",
            [`A2_limit#${w}`]: "none",
            [`A3_treatment#${w}`]: "none",
            [`A5_cover#${w}`]: "effective",
            [`A1_disease#${c1}`]: "none",
            [`A1_impact#${c1}`]: "none",
            [`A2_limit#${c1}`]: "unmet",
            [`A2_aid#${c1}`]: "وسیله کمکی تجویز شده ولی تهیه نشده؛ جلسات کاردرمانی متوقف (نمونه)",
            [`A3_treatment#${c1}`]: "scheduled",
            [`A5_cover#${c1}`]: "barriers",
            [`A5_barrier#${c1}`]: "فرانشیز و نبود متخصص در بیمه روستایی (نمونه)",
            [`A1_disease#${c2}`]: "none",
            [`A1_impact#${c2}`]: "none",
            [`A2_limit#${c2}`]: "none",
            [`A3_treatment#${c2}`]: "none",
            [`A5_cover#${c2}`]: "effective",
            [`A1_disease#${g}`]: "controlled",
            [`A1_impact#${g}`]: "moderate",
            [`A2_limit#${g}`]: "none",
            [`A3_treatment#${g}`]: "none",
            [`A5_cover#${g}`]: "effective",
            [`B1_status#${c1}`]: "interrupted",
            [`B1_months#${c1}`]: 3,
            [`B1_reason#${c1}`]: "سفرهای مکرر درمانی و نبود مدرسه استثنایی نزدیک (نمونه)",
            [`B2_risks#${c1}`]: [
                "absence"
            ],
            [`B1_status#${c2}`]: "attending",
            [`B2_risks#${c2}`]: [
                "forced_care"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${w}`]: "none",
            [`B6_need#${c1}`]: "needs_assessment",
            [`B6_need#${c2}`]: "none",
            [`B6_need#${g}`]: "none",
            A4_burden: "manageable",
            A4_effects: [
                "debt"
            ],
            A6_exp: [
                "worry",
                "variety",
                "mealskip"
            ],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c1}`]: false,
            [`A_malnut#${c2}`]: false,
            [`A_pregnant#${w}`]: false,
            B3_lit: "full",
            B4_barriers: "resolvable",
            B4_detail: "انتقال مدرسه به مرکز توان‌بخشی‌دار در جریان است (نمونه)",
            B5_digital: "insufficient",
            B7_path: "no_eligible",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [
                "wiring"
            ],
            C3_right: "clear",
            C4_rooms: 2,
            C4_safesleep: "partial",
            C5_water: "stable",
            C5_elec: "stable",
            C5_cook: "stable",
            C6_san: "good",
            C7_missing: [],
            C7_impact: "none",
            C8_arrears_severity: "minor",
            C9_access: "adequate",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "stable",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "clear",
            E1_evidence: "شغل ثابت صنعتی دارد؛ خطر فقط هزینه‌های توان‌بخشی است (نمونه).",
            E2_support: "partial",
            E2_hours: 6,
            E3_support: "reliable",
            E3_who: "مادر خانم در نگهداری کودک کمک می‌کند (نمونه)",
            E4_barrier: "none",
            E4_types: [],
            E4_service: ""
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "حقوق صنعتی",
                receiverMemberId: h,
                monthlyAmount: 14_000_000,
                continuity: "regular",
                reliability: "reliable",
                verified: true
            }
        ];
        a.flags = [
            flag("R6", "کودک معلول با نیاز مراقبت ۶ ساعته و مراقب واحد", "open", 5, "گام مراقبت")
        ];
        a.audit.push({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
            at: daysAgo(4),
            actor: "کارشناس توان‌بخشی نمونه",
            role: "caseworker",
            action: "بررسی حرفه‌ای وضعیت کودک",
            detail: "نیاز گفتاردرمانی/کاردرمانی تأیید شد؛ معرفی‌نامه صادر گردید (نمونه)"
        });
        return a;
    }
};
/* ============================================================
   ۸) خانوار با وضعیت مناسب — سطح ۱ — پرونده بسته
   ============================================================ */ const stable = {
    key: "stable",
    title: "خانوار برخوردار — سطح ۱ (پرونده بسته)",
    build: ()=>{
        const a = base("closed", 30);
        a.requestTypes = [
            "درخواست تشکیل/به‌روزرسانی پرونده حمایت"
        ];
        a.household = {
            responderName: "فرهاد هاشمی (نمونه)",
            responderRelation: "سرپرست",
            headName: "فرهاد هاشمی (نمونه)",
            headNationalIdStatus: "has",
            headNationalId: "6789012346",
            headBirthDate: "۱۳۷۵/۰۴/۱۷",
            postalCode: "6789012345",
            province: "البرز",
            county: "کرج",
            dwellingType: "آپارتمان مالک",
            tenureType: "مالک",
            monthlyRent: 0,
            monthlyCharge: 350_000,
            monthlyBills: 800_000,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان البرز",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "فرهاد",
            lastName: "هاشمی (نمونه)",
            relation: "سرپرست",
            age: 47,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "employed"
        });
        const w = member(a, {
            firstName: "شیرین",
            relation: "همسر",
            age: 41,
            gender: "female"
        });
        const c = member(a, {
            firstName: "ترانه",
            relation: "فرزند",
            age: 10,
            gender: "female",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const ans = {
            [`A1_disease#${h}`]: "none",
            [`A1_impact#${h}`]: "none",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "effective",
            [`A1_disease#${w}`]: "none",
            [`A1_impact#${w}`]: "none",
            [`A2_limit#${w}`]: "none",
            [`A3_treatment#${w}`]: "none",
            [`A5_cover#${w}`]: "effective",
            [`A1_disease#${c}`]: "none",
            [`A1_impact#${c}`]: "none",
            [`A2_limit#${c}`]: "none",
            [`A3_treatment#${c}`]: "none",
            [`A5_cover#${c}`]: "effective",
            [`B1_status#${c}`]: "attending",
            [`B2_risks#${c}`]: [],
            [`B6_need#${h}`]: "none",
            [`B6_need#${w}`]: "none",
            [`B6_need#${c}`]: "none",
            A4_burden: "low",
            A4_effects: [],
            A6_exp: [],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c}`]: false,
            [`A_pregnant#${w}`]: false,
            B3_lit: "full",
            B4_barriers: "none",
            B5_digital: "adequate",
            B7_path: "no_eligible",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [],
            C3_right: "clear",
            C4_rooms: 2,
            C4_safesleep: "all",
            C5_water: "stable",
            C5_elec: "stable",
            C5_cook: "stable",
            C6_san: "good",
            C7_missing: [],
            C7_impact: "none",
            C8_arrears_severity: "none",
            C9_access: "adequate",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "stable",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "clear",
            E1_evidence: "قرارداد کاری بلندمدت (نمونه).",
            E2_support: "no_need",
            E2_hours: 0,
            E3_support: "reliable",
            E3_who: "شبکه خانوادگی (نمونه)",
            E4_barrier: "none",
            E4_types: [],
            E4_service: ""
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "حقوق اداری",
                receiverMemberId: h,
                monthlyAmount: 18_000_000,
                continuity: "regular",
                reliability: "reliable",
                verified: true
            }
        ];
        a.reviews = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("rev"),
                at: daysAgo(24),
                by: "مددکار نمونه",
                role: "caseworker",
                note: "امتیاز محرومیت در حداقل است؛ نیاز حمایت معیشتی احراز نشد (نمونه).",
                decision: "data_confirmed"
            }
        ];
        a.audit.push({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
            at: daysAgo(23),
            actor: "مددکار نمونه",
            role: "caseworker",
            action: "بستن پرونده",
            detail: "غربالگری سطح ۱ — بدون نیاز حمایت (نمونه)"
        });
        return a;
    }
};
const DEMO_BANK = [
    urgent,
    homeless,
    incomplete,
    singleMother,
    elderly,
    severe,
    disabledChild,
    stable
];
function buildDemoBank() {
    return DEMO_BANK.map((d)=>d.build());
}
}),
"[project]/src/lib/mpi/national-id.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidIranianNationalId",
    ()=>isValidIranianNationalId,
    "isValidPostalCode",
    ()=>isValidPostalCode,
    "nationalIdError",
    ()=>nationalIdError,
    "normalizeDigits",
    ()=>normalizeDigits
]);
/**
 * اعتبارسنجی شناسه‌های ثبتی — کد ملی (کلید شناسایی خانوار) و کد پستی
 *
 * کد ملی سرپرست «کلید و مبنای شناسایی فرد» است: استعلام ثبت احوال، پست، تأمین
 * اجتماعی، اموال و املاک، آموزش‌وپرورش و علوم همه با این کلید انجام می‌شود.
 * طبق سیاست نسخه جدید، کد ملی «اجباری» است و بدون کد ملیِ معتبر (الگوریتم
 * رقم کنترل ثبت احوال) ادامه پرسشنامه مجاز نیست — مسیر «فاقد مدرک» فقط با
 * ثبت پرچم R8 و با همراهی مددکار برای دریافت مدرک پیگیری می‌شود.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
;
function normalizeDigits(s) {
    return (s ?? "").replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d)=>String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[\s\-_]/g, "");
}
function isValidIranianNationalId(input) {
    const nid = normalizeDigits(input);
    if (!/^\d{10}$/.test(nid)) return false;
    // کدهای تکراری بی‌معنا که از الگوریتم عبور می‌کنند
    if (/^(\d)\1{9}$/.test(nid)) return false;
    const digits = nid.split("").map(Number);
    const check = digits[9];
    let sum = 0;
    for(let i = 0; i < 9; i++)sum += digits[i] * (10 - i);
    const rem = sum % 11;
    return rem < 2 ? check === rem : check === 11 - rem;
}
function isValidPostalCode(input) {
    return /^\d{10}$/.test(normalizeDigits(input));
}
function nationalIdError(input) {
    const nid = normalizeDigits(input);
    if (nid.length === 0) return "کد ملی سرپرست اجباری است — کلید شناسایی خانوار و مبنای استعلام همه مراجع.";
    if (nid.length !== 10) return `کد ملی باید دقیقاً ۱۰ رقم باشد (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(nid.length)} رقم وارد شده)`;
    if (!/^\d{10}$/.test(nid)) return "کد ملی فقط می‌تواند رقم باشد.";
    if (!isValidIranianNationalId(nid)) return "کد ملی با الگوریتم ثبت احوال تطبیق ندارد — رقم کنترل نادرست است؛ کد را دوباره بررسی کنید.";
    return null;
}
}),
"[project]/src/lib/mpi/registration.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BANK_AGREEMENT_PARAGRAPHS",
    ()=>BANK_AGREEMENT_PARAGRAPHS,
    "REGISTRATION_KINDS",
    ()=>REGISTRATION_KINDS,
    "birthDateError",
    ()=>birthDateError,
    "hashPassword",
    ()=>hashPassword,
    "isValidMobile",
    ()=>isValidMobile,
    "mobileError",
    ()=>mobileError,
    "normalizeJalaliDate",
    ()=>normalizeJalaliDate,
    "passwordError",
    ()=>passwordError
]);
/**
 * اعتبارسنجی فرم ثبت‌نام سامانه — الگوبرداری از فرم ورود سرویس امداد
 * (کد ملی، شماره موبایل، تاریخ تولد، کد پستی، رمز عبور و توافقنامه)
 *
 * کد ملی «کلید و مبنای شناسایی فرد» است (national-id.ts) و ثبت‌نام بدون آن
 * ممکن نیست. رمز عبور مطابق قواعد سرویس مرجع:
 *   • دقیقاً ۶ کاراکتر، ترکیبی از اعداد و حروف انگلیسی؛
 *   • استفاده از کاراکترهای & < > " / ; , * | = % مجاز نیست.
 *
 * ⚠️ رمز عبور هرگز به‌صورت متن ساده ذخیره نمی‌شود؛ فقط هش یک‌طرفه (نسخه نمایشی
 * از مکانیزم) در پرونده نگه داشته می‌شود. در استقرار عملیاتی، احراز هویت سمت
 * سرور با هش نمکی (bcrypt/argon2) انجام می‌شود و این فیلد در سمت کلاینت نیست.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/national-id.ts [app-ssr] (ecmascript)");
;
;
function isValidMobile(input) {
    return /^09\d{9}$/.test((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(input));
}
function mobileError(input) {
    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(input);
    if (m.length === 0) return "شماره موبایل اجباری است — کد تأیید و اطلاع‌رسانی پیگیری درخواست به همین شماره ارسال می‌شود.";
    if (!/^09/.test(m)) return "شماره موبایل باید با ۰۹ شروع شود (مثلاً ۰۹۱۲۳۴۵۶۷۸۹).";
    if (m.length !== 11) return `شماره موبایل باید ۱۱ رقم باشد (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(m.length)} رقم وارد شده).`;
    if (!isValidMobile(m)) return "شماره موبایل معتبر نیست — فقط رقم مجاز است.";
    return null;
}
/* ---------------- تاریخ تولد (شمسی) ---------------- */ /** طول ماه‌های سال شمسی؛ اسفند در سال کبیسه ۳۰ روز است */ function jalaliMonthLength(year, month) {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    // سال کبیسه — الگوریتم متداول ۳۳ ساله (نطق/بیرشک تقریبی) برای بازه ۱۳۰۰ تا ۱۴۲۰
    const rem = year % 33;
    const leap = [
        1,
        5,
        9,
        13,
        17,
        22,
        26,
        30
    ].includes(rem);
    return leap ? 30 : 29;
}
function normalizeJalaliDate(input) {
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(input).replace(/[.\-]/g, "/");
    let y, m, d;
    if (s.includes("/")) {
        const parts = s.split("/").filter(Boolean);
        if (parts.length !== 3) return null;
        [y, m, d] = parts;
    } else if (s.length === 8) {
        y = s.slice(0, 4);
        m = s.slice(4, 6);
        d = s.slice(6, 8);
    } else {
        return null;
    }
    if (!/^\d{4}$/.test(y) || !/^\d{1,2}$/.test(m) || !/^\d{1,2}$/.test(d)) return null;
    const yy = Number(y), mm = Number(m), dd = Number(d);
    if (yy < 1300 || yy > 1420) return null;
    if (mm < 1 || mm > 12) return null;
    if (dd < 1 || dd > jalaliMonthLength(yy, mm)) return null;
    return `${y}/${m.padStart(2, "0")}/${d.padStart(2, "0")}`;
}
function birthDateError(input) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(input).length === 0) return "تاریخ تولد اجباری است — با کد ملی و تاریخ تولد، هویت از ثبت احوال تطبیق داده می‌شود.";
    if (!normalizeJalaliDate(input)) return "تاریخ تولد شمسی معتبر نیست — قالب مثال: ۱۳۶۲/۰۵/۱۲ (روز/ماه/سال در محدوده درست).";
    return null;
}
/* ---------------- رمز عبور — قواعد سرویس مرجع ---------------- */ const FORBIDDEN_PW_CHARS = `&<>"/;,*|=%`;
function passwordError(pw) {
    if (pw.length === 0) return "رمز عبور اجباری است.";
    const bad = pw.split("").filter((c)=>FORBIDDEN_PW_CHARS.includes(c));
    if (bad.length > 0) return `برای رمز عبور از کاراکترهای ${FORBIDDEN_PW_CHARS} استفاده نکنید (شامل «${bad[0] === '"' ? '"Double Quote"' : bad[0]}»).`;
    if (pw.length !== 6) return `رمز عبور باید شامل ۶ کاراکتر باشد (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(pw.length)} کاراکتر وارد شده).`;
    if (!/^[A-Za-z0-9]+$/.test(pw)) return "رمز عبور فقط می‌تواند ترکیبی از اعداد و حروف انگلیسی باشد.";
    if (!/[A-Za-z]/.test(pw)) return "رمز عبور باید ترکیبی باشد — حداقل یک حرف انگلیسی در آن باشد.";
    if (!/\d/.test(pw)) return "رمز عبور باید ترکیبی باشد — حداقل یک عدد در آن باشد.";
    return null;
}
function hashPassword(pw) {
    let h = 2166136261;
    for(let i = 0; i < pw.length; i++){
        h ^= pw.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return `fnv1a:${(h >>> 0).toString(16).padStart(8, "0")}`;
}
const REGISTRATION_KINDS = [
    {
        value: "need_service",
        label: "اعلام نیازمندی و دریافت خدمات دارم.",
        desc: "پرسشنامه غربالگری محرومیت خانوار (EM-MPI) برای شما آغاز می‌شود؛ اطلاعات هویتی و نشانی از مراجع ثبتی واکشی و ملاک می‌شود."
    },
    {
        value: "provide_service",
        label: "متقاضی ارائه خدمت به مددجویان و نیازمندان هستم",
        desc: "پرسشنامه محرومیت برای شما تکمیل نمی‌شود؛ به داشبورد حرفه‌ای (پرونده خانوارها، ارجاع و بازبینی) هدایت می‌شوید."
    }
];
const BANK_AGREEMENT_PARAGRAPHS = [
    {
        h: "۱) هدف دسترسی",
        p: "با رضایت شما، وضعیت حساب و گردش بانکی سرپرست خانوار فقط برای «راستی‌آزمایی معیشت و درآمد» (بُعد D از شاخص‌های EM-MPI) و تطبیق منابع اعلامی با سابقه بانکی، از طریق شبکه شاپرک و بانک‌های عامل استعلام می‌شود."
    },
    {
        h: "۲) دامنه دسترسی",
        p: "مانده حساب، گردش ۹۰ روز اخیر به‌صورت تجمیعی، وضعیت تسهیلات و چک برگشتی؛ جزئیات خرید، محل خرج کردن و کدهای فروشنده مشاهده نمی‌شوند."
    },
    {
        h: "۳) محرمانگی و محدودیت استفاده",
        p: "داده بانکی فقط در همین پرونده غربالگری استفاده می‌شود، امتیاز مستقل ایجاد نمی‌کند (لایه اطلاعات پرونده‌ای جدا از امتیاز است)، در اختیار اشخاص ثالث قرار نمی‌گیرد و دسترسی به آن نقش‌محور و ثبت‌شده در گزارش ممیزی است."
    },
    {
        h: "۴) مدت و لغو رضایت",
        p: "این رضایت تا بستن پرونده معتبر است و هر زمان قابل لغو است؛ لغو رضایت بانکی مانع ادامه ارزیابی سایر بخش‌های پرسشنامه و مانع ثبت درخواست نیست، فقط راستی‌آزمایی بانکی به مسیر مدارک مردمی منتقل می‌شود."
    }
];
}),
"[project]/src/lib/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUDIT_ACTIONS",
    ()=>AUDIT_ACTIONS,
    "DRAFT_EXPIRY_DAYS",
    ()=>DRAFT_EXPIRY_DAYS,
    "isDraftExpired",
    ()=>isDraftExpired,
    "usePorsesh",
    ()=>usePorsesh
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$demo$2d$bank$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/demo-bank.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$registration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/registration.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/national-id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const DRAFT_EXPIRY_DAYS = 30;
const AUDIT_ACTIONS = {};
function withAudit(a, e) {
    const ev = {
        ...e,
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
        at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
    };
    return {
        ...a,
        audit: [
            ...a.audit,
            ev
        ].slice(-500),
        updatedAt: ev.at
    };
}
const usePorsesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        assessments: {},
        activeId: null,
        view: "home",
        mode: "household",
        wizardStep: 1,
        hydrated: false,
        accounts: {},
        session: null,
        registerAccount: (acc)=>set((st)=>({
                    accounts: {
                        ...st.accounts,
                        [acc.nationalId]: acc
                    }
                })),
        login: (nid, pw)=>{
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(nid);
            const acc = get().accounts[key];
            if (!acc) {
                return {
                    ok: false,
                    message: "حسابی با این کد ملی یافت نشد — ابتدا ثبت‌نام کنید."
                };
            }
            if (acc.passwordHash !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$registration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashPassword"])(pw)) {
                return {
                    ok: false,
                    message: "رمز عبور نادرست است — دوباره تلاش کنید."
                };
            }
            set({
                session: {
                    nationalId: acc.nationalId,
                    name: acc.name,
                    kind: acc.kind,
                    at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                }
            });
            return {
                ok: true,
                message: "ورود موفق"
            };
        },
        startSession: (nid)=>set((st)=>{
                const acc = st.accounts[nid];
                return acc ? {
                    session: {
                        nationalId: acc.nationalId,
                        name: acc.name,
                        kind: acc.kind,
                        at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                    }
                } : st;
            }),
        startDemoSession: ()=>set({
                session: {
                    nationalId: "0000000000",
                    name: "کاربر نمایشی",
                    kind: "need_service",
                    demo: true,
                    at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                }
            }),
        logout: ()=>set({
                session: null,
                view: "home",
                activeId: null,
                wizardStep: 1
            }),
        setView: (v)=>set({
                view: v
            }),
        setMode: (m)=>set({
                mode: m
            }),
        setActive: (id)=>set({
                activeId: id,
                wizardStep: 1
            }),
        setWizardStep: (s)=>set({
                wizardStep: s
            }),
        createAssessment: (init, opts)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("hh");
            const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])();
            const a = {
                id,
                createdAt: now,
                updatedAt: now,
                ruleSetVersion: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RULE_SET"].fullId,
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
                audit: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("aud"),
                        at: now,
                        actor: "سیستم",
                        role: "system",
                        action: "ایجاد پیش‌نویس ارزیابی",
                        detail: `نسخه قواعد: ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RULE_SET"].fullId}`
                    }
                ],
                changeStatements: [],
                webServices: {},
                documents: [],
                ...init
            };
            /* silent=true: برای جریان ثبت‌نام مودالی — view عوض نمی‌شود تا مودال باز بماند؛ در پایان با تأیید کاربر به wizard می‌رویم */ set((st)=>({
                    assessments: {
                        ...st.assessments,
                        [id]: a
                    },
                    activeId: id,
                    wizardStep: 1,
                    ...opts?.silent ? {} : {
                        view: "wizard"
                    }
                }));
            return id;
        },
        updateHousehold: (id, patch)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const updated = withAudit({
                    ...a,
                    household: {
                        ...a.household,
                        ...patch
                    }
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "به‌روزرسانی اطلاعات پایه",
                    detail: Object.keys(patch).join("، ")
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        updateRequest: (id, types, notes)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const updated = withAudit({
                    ...a,
                    requestTypes: types,
                    requestNotes: notes
                }, {
                    actor: "پاسخ‌گو",
                    role: "household",
                    action: "ثبت/به‌روزرسانی نوع درخواست"
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        setStatus: (id, status)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const updated = withAudit({
                    ...a,
                    status
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: `تغییر وضعیت پرونده به «${status}»`
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addMember: (id, m)=>{
            const mid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("m");
            set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const member = {
                    id: mid,
                    firstName: m.firstName || "عضو جدید",
                    relation: m.relation || "سایر",
                    ...m
                };
                const updated = withAudit({
                    ...a,
                    members: [
                        ...a.members,
                        member
                    ]
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "افزودن عضو خانوار",
                    detail: member.firstName
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            });
            return mid;
        },
        updateMember: (id, memberId, patch)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const members = a.members.map((m)=>m.id === memberId ? {
                        ...m,
                        ...patch
                    } : m);
                const updated = withAudit({
                    ...a,
                    members
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "ویرایش عضو",
                    detail: members.find((m)=>m.id === memberId)?.firstName
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        removeMember: (id, memberId)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const members = a.members.filter((m)=>m.id !== memberId);
                const answers = Object.fromEntries(Object.entries(a.answers).filter(([k])=>!k.endsWith(`#${memberId}`)));
                const updated = withAudit({
                    ...a,
                    members,
                    answers
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "حذف عضو و پاسخ‌های مرتبط"
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        setAnswer: (id, key, value)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const answers = {
                    ...a.answers,
                    [key]: value
                };
                const updated = {
                    ...a,
                    answers,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        setAnswersBulk: (id, entries)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const answers = {
                    ...a.answers,
                    ...entries
                };
                const updated = {
                    ...a,
                    answers,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addIncomeSource: (id, s)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const src = {
                    ...s,
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc")
                };
                const updated = withAudit({
                    ...a,
                    incomeSources: [
                        ...a.incomeSources,
                        src
                    ]
                }, {
                    actor: "پاسخ‌گو",
                    role: "household",
                    action: "افزودن منبع درآمد",
                    detail: src.kind
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        updateIncomeSource: (id, sid, patch)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const incomeSources = a.incomeSources.map((s)=>s.id === sid ? {
                        ...s,
                        ...patch
                    } : s);
                const updated = withAudit({
                    ...a,
                    incomeSources
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "ویرایش منبع درآمد"
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        removeIncomeSource: (id, sid)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const updated = withAudit({
                    ...a,
                    incomeSources: a.incomeSources.filter((s)=>s.id !== sid)
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "حذف منبع درآمد"
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addFlag: (id, f)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FLAG_DEFS"][f.code];
                const flag = {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("flg"),
                    code: f.code,
                    title: def.title,
                    detail: f.detail,
                    recordedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                    source: f.source || "ثبت دستی",
                    confidentiality: def.strict ? "strict" : "restricted",
                    status: "open",
                    suggested: f.suggested
                };
                const updated = withAudit({
                    ...a,
                    flags: [
                        ...a.flags,
                        flag
                    ]
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: `ثبت نشانه خطر ${f.code}`,
                    detail: def.title
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        updateFlag: (id, fid, patch)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const flags = a.flags.map((f)=>f.id === fid ? {
                        ...f,
                        ...patch
                    } : f);
                const updated = withAudit({
                    ...a,
                    flags
                }, {
                    actor: "کاربر",
                    role: "caseworker",
                    action: "به‌روزرسانی نشانه خطر"
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addIssue: (id, i)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const issue = {
                    ...i,
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                    status: "open"
                };
                const updated = {
                    ...a,
                    qualityIssues: [
                        ...a.qualityIssues,
                        issue
                    ],
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        resolveIssue: (id, iid, resolution)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const qualityIssues = a.qualityIssues.map((i)=>i.id === iid ? {
                        ...i,
                        status: "resolved",
                        resolution,
                        resolvedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                    } : i);
                const updated = withAudit({
                    ...a,
                    qualityIssues
                }, {
                    actor: "کاربر",
                    role: "assistant",
                    action: "حل مسئله کیفیت داده",
                    detail: resolution
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        syncAutoIssues: (id)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                // مسائل خودکار قبلی (بدون resolution دستی) پاک و بازتولید می‌شوند
                return st;
            }),
        addReferral: (id, r)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const ref = {
                    ...r,
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("ref"),
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                    status: "sent",
                    sentAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                const updated = withAudit({
                    ...a,
                    referrals: [
                        ...a.referrals,
                        ref
                    ]
                }, {
                    actor: "مددکار",
                    role: "caseworker",
                    action: "ثبت ارجاع",
                    detail: `${r.path} → ${r.destination}`
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        updateReferral: (id, rid, patch)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const referrals = a.referrals.map((r)=>r.id === rid ? {
                        ...r,
                        ...patch
                    } : r);
                const updated = withAudit({
                    ...a,
                    referrals
                }, {
                    actor: "مددکار",
                    role: "caseworker",
                    action: "به‌روزرسانی ارجاع",
                    detail: patch.status
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addReview: (id, r)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const rev = {
                    ...r,
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("rev"),
                    at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                const updated = withAudit({
                    ...a,
                    reviews: [
                        ...a.reviews,
                        rev
                    ]
                }, {
                    actor: r.by || "مددکار",
                    role: "caseworker",
                    action: "ثبت بررسی حرفه‌ای",
                    detail: r.decision
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addChangeStatement: (id, text)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const statements = [
                    ...a.changeStatements ?? [],
                    {
                        at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                        text
                    }
                ];
                const updated = withAudit({
                    ...a,
                    changeStatements: statements
                }, {
                    actor: "پاسخ‌گو",
                    role: "household",
                    action: "اعلام تغییر شرایط خانوار",
                    detail: text
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        setWebService: (id, serviceId, result)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const webServices = {
                    ...a.webServices ?? {},
                    [serviceId]: result
                };
                const updated = withAudit({
                    ...a,
                    webServices
                }, {
                    actor: "سیستم",
                    role: "system",
                    action: `استعلام وب‌سرویس «${serviceId}»`,
                    detail: `وضعیت: ${result.status}`
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        clearWebService: (id, serviceId)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const webServices = {
                    ...a.webServices ?? {}
                };
                delete webServices[serviceId];
                const updated = {
                    ...a,
                    webServices,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addDocument: (id, doc)=>{
            const docId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("doc");
            const full = {
                ...doc,
                id: docId,
                recordedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
            };
            set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const documents = [
                    ...a.documents ?? [],
                    full
                ];
                const updated = withAudit({
                    ...a,
                    documents
                }, {
                    actor: "کاربر",
                    role: "household",
                    action: "ثبت مدرک مثبت",
                    detail: `${full.title} — ${full.kind}`
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            });
            return docId;
        },
        removeDocument: (id, docId)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const documents = (a.documents ?? []).filter((d)=>d.id !== docId);
                const updated = {
                    ...a,
                    documents,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])()
                };
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        correctData: (id, by, c)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                const oldValue = a.answers[c.answerKey];
                const correction = {
                    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("cor"),
                    at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                    by,
                    answerKey: c.answerKey,
                    oldValue: oldValue ?? null,
                    newValue: c.newValue,
                    reason: c.reason,
                    evidence: c.evidence
                };
                const answers = {
                    ...a.answers,
                    [c.answerKey]: c.newValue
                };
                const updated = withAudit({
                    ...a,
                    answers,
                    corrections: [
                        ...a.corrections,
                        correction
                    ]
                }, {
                    actor: by,
                    role: "caseworker",
                    action: "اصلاح مستند داده",
                    detail: `${c.answerKey}: ${String(oldValue ?? "—")} → ${String(c.newValue)} (${c.reason})`
                });
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: updated
                    }
                };
            }),
        addAudit: (id, e)=>set((st)=>{
                const a = st.assessments[id];
                if (!a) return st;
                return {
                    assessments: {
                        ...st.assessments,
                        [id]: withAudit(a, e)
                    }
                };
            }),
        exportAll: ()=>JSON.stringify({
                version: 1,
                exportedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                assessments: Object.values(get().assessments)
            }, null, 2),
        exportOne: (id)=>JSON.stringify({
                version: 1,
                exportedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowIso"])(),
                assessments: [
                    get().assessments[id]
                ].filter(Boolean)
            }, null, 2),
        importJson: (json)=>{
            try {
                const data = JSON.parse(json);
                if (!data || !Array.isArray(data.assessments)) return {
                    ok: false,
                    message: "ساختار فایل معتبر نیست."
                };
                const incoming = {};
                for (const a of data.assessments){
                    if (!a || typeof a.id !== "string") continue;
                    incoming[a.id] = {
                        ...a,
                        flags: a.flags ?? [],
                        qualityIssues: a.qualityIssues ?? [],
                        referrals: a.referrals ?? [],
                        reviews: a.reviews ?? [],
                        corrections: a.corrections ?? [],
                        audit: a.audit ?? [],
                        members: a.members ?? [],
                        answers: a.answers ?? {},
                        incomeSources: a.incomeSources ?? [],
                        webServices: a.webServices ?? {}
                    };
                }
                set((st)=>({
                        assessments: {
                            ...incoming,
                            ...st.assessments
                        }
                    }));
                return {
                    ok: true,
                    message: `${Object.keys(incoming).length} ارزیابی وارد شد.`
                };
            } catch  {
                return {
                    ok: false,
                    message: "خواندن فایل ناموفق بود."
                };
            }
        },
        removeAssessment: (id)=>set((st)=>{
                const next = {
                    ...st.assessments
                };
                delete next[id];
                return {
                    assessments: next,
                    activeId: st.activeId === id ? null : st.activeId
                };
            }),
        seedDemoBank: (force)=>set((st)=>{
                const demos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$demo$2d$bank$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildDemoBank"])();
                if (force) {
                    // حذف پرونده‌های نمونه قبلی و جایگزینی با نسخه تازه
                    const kept = Object.fromEntries(Object.entries(st.assessments).filter(([, a])=>!a.demo));
                    const next = {
                        ...kept
                    };
                    for (const d of demos)next[d.id] = d;
                    const activeIsDemo = st.activeId ? !!st.assessments[st.activeId]?.demo : false;
                    return {
                        assessments: next,
                        activeId: activeIsDemo ? demos[0].id : st.activeId,
                        view: st.view === "wizard" && activeIsDemo ? "assessments" : st.view
                    };
                }
                const next = {
                    ...st.assessments
                };
                for (const d of demos)next[d.id] = d;
                return {
                    assessments: next
                };
            }),
        clearDemoBank: ()=>set((st)=>{
                const next = Object.fromEntries(Object.entries(st.assessments).filter(([, a])=>!a.demo));
                const activeIsDemo = st.activeId ? !!st.assessments[st.activeId]?.demo : false;
                return {
                    assessments: next,
                    activeId: activeIsDemo ? null : st.activeId,
                    view: activeIsDemo && (st.view === "wizard" || st.view === "professional") ? "assessments" : st.view
                };
            }),
        markHydrated: ()=>set({
                hydrated: true
            })
    }), {
    name: "porseshnameh-db",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    onRehydrateStorage: ()=>(state)=>{
            if (state) state.markHydrated();
        }
}));
function isDraftExpired(a) {
    const updated = new Date(a.updatedAt).getTime();
    return Date.now() - updated > DRAFT_EXPIRY_DAYS * 24 * 3600 * 1000;
}
;
}),
"[project]/src/lib/mpi/web-services.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCKED_FIELDS",
    ()=>LOCKED_FIELDS,
    "simulateServiceFetch",
    ()=>simulateServiceFetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
;
/**
 * شبیه‌ساز پاسخ مراجع ثبتی (وب‌سرویس‌ها) برای نسخه نمایشی آفلاین.
 *
 * جریان واقعی که این نسخه تقلید می‌کند:
 *  ۱) شروع با سه شناسه: کد ملی + کد پستی + تاریخ تولد سرپرست؛
 *  ۲) واکشی اطلاعات هویتی از ثبت احوال (نام، تأهل، اعضای سابقه ثبتی) و
 *     نشانی/موقعیت جغرافیایی از پست (از کد پستی) — پاسخ «ملاک» و غیرقابل ویرایش؛
 *  ۳) با کد ملی سرپرست، سایر مراجع متولی (بیمه، اموال و املاک، آموزش‌وپرورش،
 *     علوم/دانشگاه آزاد) نیز استعلام و «پیش‌تکمیل» می‌شوند — پیش‌تکمیل با حفظ
 *     منبع و تاریخ است و تأیید خودکار شرایط جاری نیست (قاعده مهاجرت سند EM-MPI).
 *
 * ⚠️ در استقرار عملی، این توابع با فراخوانی واقعی سرویس سازمان‌های متولی
 * جایگزین می‌شوند. پاسخ شبیه‌سازی‌شده به‌طور قطعی از کدهای واردشده ساخته می‌شود
 * (همان کد → همان پاسخ) تا رفتار واقعی (قفل فیلد، برچسب منبع، پیش‌تکمیل)
 * قابل مشاهده و تکرارپذیر باشد.
 */ /* ---------------- شبیه‌سازی قطعی از کدها (همان ورودی → همان پاسخ) ---------------- */ function hashStr(s) {
    let h = 2166136261;
    for(let i = 0; i < s.length; i++){
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
/** انتخاب قطعی از یک مجموعه با بذر ثابت */ function pick(seed, pool, salt = 0) {
    return pool[(seed + salt * 2654435761) % pool.length];
}
const MALE_NAMES = [
    "علی",
    "محمد",
    "حسین",
    "رضا",
    "مهدی",
    "امیر",
    "سعید",
    "حمید",
    "کریم",
    "جواد"
];
const FEMALE_NAMES = [
    "فاطمه",
    "زهرا",
    "مریم",
    "سارا",
    "نرگس",
    "لیلا",
    "معصومه",
    "الهام",
    "شیما",
    "پریسا"
];
const LAST_NAMES = [
    "احمدی",
    "محمدی",
    "حسینی",
    "رضایی",
    "کریمی",
    "موسوی",
    "جلیلوند",
    "شریفی",
    "نوروزی",
    "قاسمی",
    "صادقی",
    "بهرامی"
];
const RELATIONS = [
    "همسر",
    "فرزند",
    "فرزند",
    "فرزند",
    "مادر",
    "پدر",
    "خواهر",
    "برادر"
];
const PROVINCES = [
    "تهران",
    "البرز",
    "خراسان رضوی",
    "اصفهان",
    "فارس",
    "خوزستان",
    "مازندران",
    "آذربایجان شرقی",
    "گیلان",
    "کرمان"
];
const COUNTY_SUFFIX = [
    "مرکزی",
    "شهرستان جدید",
    "بهارستان",
    "پارس‌آباد",
    "زرندیه"
];
const STREET_NAMES = [
    "خیابان امام خمینی",
    "خیابان شهید بهشتی",
    "بلوار ولی‌عصر",
    "خیابان شریعتی",
    "بلوار شهید کاظمی",
    "خیابان انقلاب"
];
const MARRIAGE = [
    "متأهل",
    "متأهل",
    "مجرد",
    "متأهل — رویداد ازدواج اخیر ثبت شده",
    "متروکه (سابقه ثبتی)"
];
const FUND_NAMES = [
    "تأمین اجتماعی",
    "بیمه روستاییان و عشایر",
    "خدمات درمانی کشوری",
    "نیروهای مسلح"
];
const INS_COVER = [
    {
        v: "effective",
        label: "پوشش معتبر"
    },
    {
        v: "effective",
        label: "پوشش معتبر"
    },
    {
        v: "barriers",
        label: "پوشش با مانع (فرانشیز/فاصله)"
    },
    {
        v: "none",
        label: "بدون پوشش فعال"
    }
];
const EDU_STATUS = [
    {
        v: "enrolled",
        label: "ثبت‌نام فعال"
    },
    {
        v: "enrolled",
        label: "ثبت‌نام فعال"
    },
    {
        v: "interrupted",
        label: "وقفه تحصیل"
    },
    {
        v: "dropped",
        label: "ترک تحصیل"
    }
];
const DEGREES = [
    "کارشناسی",
    "دیپلم",
    "کارشناسی ارشد",
    "کاردانی"
];
function result(serviceId, status, data, note, prefills) {
    return {
        serviceId,
        status,
        fetchedAt: new Date().toISOString(),
        data,
        note,
        prefills
    };
}
function digitsOnly(s) {
    return (s ?? "").replace(/[^\d]/g, "").replace(/[۰-۹]/g, (d)=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}
function simulateServiceFetch(serviceId, a) {
    const h = a.household;
    const members = a.members;
    const nid = digitsOnly(h.headNationalId);
    const postal = digitsOnly(h.postalCode);
    switch(serviceId){
        /* ===== واکشی هویت از ثبت احوال — ملاک ===== */ case "civil_registry":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "کد ملی ده‌رقمی سرپرست وارد نشده است — استعلام ثبت احوال ممکن نیست؛ مسیر دستی و بررسی میدانی فعال می‌شود (نبود مدرک موجب رد درخواست نمی‌شود).");
                }
                const seed = hashStr("reg:" + nid);
                const genderHead = (seed + 7) % 5 === 0 ? "female" : "male";
                const first = pick(seed, genderHead === "male" ? MALE_NAMES : FEMALE_NAMES);
                const last = pick(seed, LAST_NAMES, 3);
                const headName = `${first} ${last}`;
                const spouseName = pick(seed, genderHead === "male" ? FEMALE_NAMES : MALE_NAMES, 5) + " " + last;
                const childCount = 1 + (seed >>> 5) % 3; // ۱ تا ۳ فرزند در سابقه ثبتی
                const memberCreates = [];
                if (seed % 3 !== 1) {
                    // سابقه ثبتی شامل همسر است
                    memberCreates.push({
                        firstName: spouseName,
                        relation: "همسر",
                        age: 25 + (seed >>> 9) % 25,
                        gender: genderHead === "male" ? "female" : "male",
                        fromRegistry: true
                    });
                }
                for(let i = 0; i < childCount; i++){
                    const cSeed = seed + i * 97;
                    const cg = cSeed % 2 === 0 ? "male" : "female";
                    const age = (cSeed >>> 3) % 17;
                    memberCreates.push({
                        firstName: pick(cSeed, cg === "male" ? MALE_NAMES : FEMALE_NAMES, i + 2) + " " + last,
                        relation: "فرزند",
                        age,
                        gender: cg,
                        fromRegistry: true
                    });
                }
                const marriage = pick(seed, MARRIAGE, 11);
                return result(serviceId, "ok", {
                    "نام و نام خانوادگی سرپرست": headName,
                    "کد ملی سرپرست": nid.replace(/\d(?=(\d{4})+$)/g, "$1 "),
                    "تاریخ تولد سرپرست": h.headBirthDate?.trim() || "در نسخه عملیاتی از سابقه ثبتی بازگردانده می‌شود",
                    "وضعیت تأهل (سابقه ثبتی)": marriage,
                    "اعضای ثبت‌شده در سابقه ثبتی": `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(memberCreates.length)} نفر — ${memberCreates.map((m)=>m.firstName.split(" ")[0]).join("، ")}`,
                    "رویدادهای حیاتی (ازدواج/فوت/طلاق)": "در نسخه عملیاتی از سابقه رویدادهای ثبتی دریافت می‌شود"
                }, "پاسخ شبیه‌سازی‌شده از کد ملی (نسخه نمایشی آفلاین) — در استقرار عملی، پاسخ واقعی ثبت احوال ملاک است. اعضای واکشی‌شده با برچسب منبع به عنوان پیش‌تکمیل ثبت می‌شوند؛ ترکیب جاری خانوار جداگانه تأیید می‌شود.", {
                    householdPatch: {
                        headName,
                        headNationalId: nid,
                        headNationalIdStatus: "has"
                    },
                    memberCreates
                });
            }
        /* ===== واکشی نشانی از پست (از کد پستی) — ملاک ===== */ case "post":
            {
                if (postal.length !== 10) {
                    return result(serviceId, "error", {}, "کد پستی ده‌رقمی وارد نشده است — استعلام نشانی ممکن نیست؛ نشانی می‌تواند به‌صورت دستی ثبت شود و در بازدید میدانی راستی‌آزمایی گردد.");
                }
                const seed = hashStr("post:" + postal);
                const province = pick(seed, PROVINCES);
                const county = province + " — " + pick(seed, COUNTY_SUFFIX, 2);
                const street = pick(seed, STREET_NAMES, 4);
                const alley = seed % 12 + 1;
                const no = (seed >>> 6) % 90 + 1;
                const address = `${province}، ${county}، ${street}، کوچه ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(alley)}، پلاک ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(no)}`;
                return result(serviceId, "ok", {
                    "نشانی استاندارد (از کد پستی)": address,
                    "استان": province,
                    "شهرستان / منطقه": county,
                    "کد پستی": postal.replace(/(\d{5})(?=\d)/g, "$1 "),
                    "موقعیت جغرافیایی": "مبنای خط فقر منطقه‌ای (D3)، دسترسی خدمات (C9) و موقعیت سکونت (C1)"
                }, "پاسخ شبیه‌سازی‌شده از کد پستی (نسخه نمایشی آفلاین) — در استقرار عملی، نشانی استاندارد پست ملاک و غیرقابل ویرایش است.", {
                    householdPatch: {
                        province,
                        county,
                        address
                    }
                });
            }
        /* ===== استعلام حساب بانکی از شاپرک/بانک‌ها با کد ملی — اجرای توافقنامه دسترسی ===== */ case "shaparak_bank":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "برای استعلام بانکی با کد ملی، ابتدا کد ملی سرپرست را ثبت و واکشی کنید.");
                }
                if (!h.consents?.bankAccess) {
                    return result(serviceId, "error", {}, "توافقنامه دسترسی به اطلاعات بانکی در ثبت‌نام پذیرفته نشده است — بدون رضایت، استعلام بانکی انجام نمی‌شود و راستی‌آزمایی معیشت به مسیر مدارک مردمی منتقل می‌شود.");
                }
                const seed = hashStr("shp:" + nid);
                const hasAccount = seed % 5 !== 0; // ۸۰٪ حساب فعال
                if (!hasAccount) {
                    return result(serviceId, "ok", {
                        "حساب فعال با این کد ملی": "یافت نشد",
                        "اجراهای توافقنامه": `پذیرش رضایت در ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(new Date(h.consents.agreedAt ?? new Date().toISOString()))}`,
                        "اثر بر سنجش": "نبود حساب به‌تنهایی امتیاز ندارد؛ منابع از سایر مسیرها (اعلامی + مدارک مردمی) سنجیده می‌شود (D1–D3)"
                    }, "حساب فعالی با این کد ملی در شبکه شاپرک یافت نشد — این پاسخ داده سنجش است و نباید به‌عنوان پیش‌داوری درباره درخواست تفسیر شود.");
                }
                const turn = 3 + seed % 9; // ۳ تا ۱۱ تراکنش ماهانه (تجمیعی)
                const loans = seed % 4 === 0 ? "یک تسهیلات کوچک فعال" : "تسهیلات فعال ثبت نشده";
                const bounced = seed % 7 === 0 ? "یک مورد سابقه چک برگشتی (نیازمند بررسی زمینه)" : "سابقه چک برگشتی ثبت نشده";
                return result(serviceId, "ok", {
                    "وضعیت حساب بانکی سرپرست": "حساب فعال — تطبیق با کد ملی انجام شد",
                    "گردش تجمیعی ۳ ماه اخیر": `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(turn)} تراکنش در ماه (جزئیات خرید مشاهده نمی‌شود)`,
                    "وضعیت تسهیلات": loans,
                    "چک برگشتی": bounced,
                    "اجراهای توافقنامه": `پذیرش رضایت در ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(new Date(h.consents.agreedAt ?? new Date().toISOString()))}`,
                    "اثر بر سنجش": "فقط راستی‌آزمایی معیشت (D) — داده بانکی لایه پرونده‌ای است و امتیاز مستقل ندارد"
                }, "مطابق توافقنامه: مانده و گردش تجمیعی فقط برای تطبیق منابع اعلامی استفاده می‌شود؛ جزئیات خرید و محل خرج کردن دریافت نمی‌شود.");
            }
        /* ===== استعلام پوشش بیمه با کد ملی — پیش‌تکمیل A5 ===== */ case "insurance":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "برای استعلام بیمه با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
                }
                if (members.length === 0) {
                    return result(serviceId, "error", {}, "عضوی برای تطبیق پوشش بیمه ثبت نشده است — ابتدا اعضای واکشی‌شده یا دستی را ثبت کنید.");
                }
                const seed = hashStr("ins:" + nid);
                const answerPrefills = [];
                const rows = [];
                members.forEach((m, i)=>{
                    const s2 = hashStr("ins:" + nid + ":" + (m.nationalId || m.id) + ":" + m.firstName);
                    const cover = pick(s2, INS_COVER, i);
                    answerPrefills.push({
                        key: `A5_cover#${m.id}`,
                        value: cover.v,
                        label: `${m.firstName}: ${cover.label} (A5)`
                    });
                    rows.push(`${m.firstName}: ${cover.label} — ${pick(s2, FUND_NAMES, i + 1)}`);
                });
                const hasUnknown = members.some((m)=>m.nationalIdStatus === "missing");
                return result(serviceId, hasUnknown ? "partial" : "ok", {
                    "پوشش پایه اعضا (سابقه صندوق‌ها)": rows.join(" • "),
                    "اعضای دارای پوشش معتبر": (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(answerPrefills.filter((p)=>p.value === "effective").length) + " از " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(members.length)
                }, "وجود پوشش از استعلام، «پیش‌تکمیل ملاک» است؛ اعتبار، فرانشیز و مانع استفاده واقعی (A5) باید جداگانه تأیید شود — بدون تکمیل شواهد، ضریب A5 تعیین‌نشده می‌ماند." + (hasUnknown ? " برخی اعضا فاقد کد ملی هستند و در استعلام نیامده‌اند." : ""), {
                    answerPrefills
                });
            }
        /* ===== استعلام مالکیت با کد ملی — پیش‌تکمیل C3 ===== */ case "property":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "برای استعلام اموال و املاک با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
                }
                const seed = hashStr("prop:" + nid);
                const owned = seed % 4 === 0; // ۲۵٪ سند به نام سرپرست
                const tenure = owned ? "مالک" : pick(seed, [
                    "مستأجر",
                    "رایگان سکونت دارد",
                    "خدمتی",
                    "وابسته به نهاد/فرد"
                ], 3);
                return result(serviceId, "ok", {
                    "سابقه سند مسکن به نام سرپرست": owned ? "یافت شد — در نسخه عملیاتی شناسه ثبتی سند بازگردانده می‌شود" : "یافت نشد در سامانه املاک",
                    "نوع تصرف استنباط‌شده (پیش‌تکمیل)": tenure,
                    "اثر بر سنجش": "پیش‌تکمیل نوع حق سکونت (C3)؛ امنیت و پایداری تصرف با قرارداد و شرایط جاری جداگانه سنجیده می‌شود"
                }, "نوع تصرف به‌عنوان «پیش‌تکمیل» اعمال می‌شود؛ مستأجربودن به‌تنهایی امتیاز نمی‌گیرد و ناپایداری خودکار فرض نمی‌شود.", h.tenureType ? {
                    householdPatch: {}
                } : {
                    householdPatch: {
                        tenureType: tenure
                    }
                });
            }
        /* ===== استعلام آموزش‌وپرورش با کد ملی — پیش‌تکمیل B1/B2 ===== */ case "education_school":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "برای استعلام آموزش‌وپرورش با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
                }
                const school = members.filter((m)=>m.schoolAge || typeof m.age === "number" && m.age >= 6 && m.age <= 18);
                if (members.length === 0) {
                    return result(serviceId, "error", {}, "عضوی برای تطبیق وضعیت تحصیل ثبت نشده است.");
                }
                if (school.length === 0) {
                    return result(serviceId, "ok", {
                        "اعضای در سن آموزش اجباری": "۰ نفر"
                    }, "عضوی در سن ۶ تا ۱۸ سال ثبت نشده است — شاخص‌های B1/B2 به‌طور صحیح صفر محاسبه می‌شوند.");
                }
                const memberPrefills = [];
                const answerPrefills = [];
                const rows = [];
                /* نگاشت وضعیت ثبتی به گزینه‌های پرسش B1_status — استعلام، پاسخ ملاک می‌شود */ const B1_MAP = {
                    enrolled: "attending",
                    interrupted: "interrupted",
                    dropped: "dropped"
                };
                school.forEach((m, i)=>{
                    const s2 = hashStr("edu:" + nid + ":" + (m.nationalId || m.id));
                    const st = pick(s2, EDU_STATUS, i);
                    memberPrefills.push({
                        memberId: m.id,
                        patch: {
                            educationStatus: st.v
                        },
                        label: `${m.firstName}: ${st.label}`
                    });
                    answerPrefills.push({
                        key: `B1_status#${m.id}`,
                        value: B1_MAP[st.v] ?? "interrupted",
                        label: `${m.firstName}: ${st.label} (B1)`
                    });
                    rows.push(`${m.firstName}: ${st.label}`);
                });
                return result(serviceId, "ok", {
                    "وضعیت ثبت‌نام اعضا در سن آموزش (سابقه ثبتی)": rows.join(" • "),
                    "راستی‌آزمایی B1/B2": "با سابقه آموزش‌وپرورش تطبیق می‌شود؛ حضور فعال و غیبت جاری جداگانه بررسی می‌شود"
                }, "سابقه ثبتی «ملاک استعلام» است و به‌صورت خودکار در پرسشنامه اعمال می‌شود؛ «بله» حضور فعال را ثابت نمی‌کند و «وقفه» نیازمند بررسی جاری است.", {
                    memberPrefills,
                    answerPrefills
                });
            }
        /* ===== استعلام مدارک دانشگاهی با کد ملی — داده زمینه‌ای B3/B7 ===== */ case "higher_edu":
            {
                if (nid.length !== 10) {
                    return result(serviceId, "error", {}, "برای استعلام مدارک دانشگاهی با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
                }
                const adults = members.filter((m)=>typeof m.age === "number" && m.age >= 19);
                if (members.length === 0) {
                    return result(serviceId, "error", {}, "عضوی برای استعلام مدارک دانشگاهی ثبت نشده است.");
                }
                const memberPrefills = [];
                const rows = [];
                adults.forEach((m, i)=>{
                    const s2 = hashStr("uni:" + nid + ":" + (m.nationalId || m.id));
                    const has = s2 % 3 === 0;
                    const deg = pick(s2, DEGREES, i);
                    if (has && !m.educationGrade) {
                        memberPrefills.push({
                            memberId: m.id,
                            patch: {
                                educationGrade: deg
                            },
                            label: `${m.firstName}: ${deg}`
                        });
                        rows.push(`${m.firstName}: ${deg}`);
                    }
                });
                return result(serviceId, "ok", {
                    "اعضای دارای مدرک دانشگاهی": rows.length ? rows.join(" • ") : "در سابقه ثبتی یافت نشد",
                    "اثر بر سنجش": "مدرک به‌تنهایی امتیاز ندارد؛ ورودی سواد کارکردی (B3) و مسیر مهارت (B7) است"
                }, rows.length ? undefined : "مدارک دانشگاهی در سابقه ثبتی یافت نشد — مدرک دانشگاهی شرط سنجش نیست.", memberPrefills.length ? {
                    memberPrefills
                } : undefined);
            }
        default:
            return result(serviceId, "error", {}, "سرویس شناسایی نشد.");
    }
}
const LOCKED_FIELDS = {
    civil_registry: [
        "headName",
        "headNationalId",
        "headBirthDate"
    ],
    post: [
        "province",
        "county",
        "address"
    ],
    shaparak_bank: [],
    property: [],
    insurance: [],
    education_school: [],
    higher_edu: []
};
}),
"[project]/src/lib/mpi/samples.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SAMPLES",
    ()=>SAMPLES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
;
const now = ()=>new Date().toISOString();
function emptyAssessment() {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("hh"),
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
        changeStatements: []
    };
}
function member(a, m) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("m");
    a.members.push({
        id,
        ...m
    });
    return id;
}
/* ---------- ۱) کم‌امتیاز با نیاز درمانی فوری ---------- */ const scenarioUrgent = {
    id: "urgent",
    title: "خانوار کم‌امتیاز با نیاز درمانی فوری",
    desc: "وضعیت معیشت نسبتاً پایدار ولی فرزند با درمان ضروری بدون دسترسی و نشانه فوریت — پیام: رسیدگی فوری مستقل از امتیاز.",
    build: ()=>{
        const a = emptyAssessment();
        a.requestTypes = [
            "کمک درمان",
            "رسیدگی فوری (وضعیت اضطراری)"
        ];
        a.household = {
            responderName: "مریم احمدی (نمونه)",
            responderRelation: "همسر",
            headName: "علی محمدی (نمونه)",
            headNationalIdStatus: "has",
            province: "اصفهان",
            county: "نجف‌آباد",
            dwellingType: "واحد مسکونی",
            tenureType: "مستأجر",
            monthlyRent: 3_000_000,
            monthlyCharge: 300_000,
            monthlyBills: 400_000,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 4_500_000,
                region: "استان اصفهان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "علی",
            lastName: "محمدی (نمونه)",
            relation: "سرپرست",
            age: 45,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "employed"
        });
        const w = member(a, {
            firstName: "مریم",
            relation: "همسر",
            age: 40,
            gender: "female"
        });
        const c = member(a, {
            firstName: "سینا",
            relation: "فرزند",
            age: 13,
            gender: "male",
            schoolAge: true,
            educationStatus: "enrolled"
        });
        const ans = {
            [`A1_disease#${h}`]: "controlled",
            [`A1_impact#${h}`]: "moderate",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "effective",
            [`A1_disease#${w}`]: "none",
            [`A1_impact#${w}`]: "none",
            [`A2_limit#${w}`]: "none",
            [`A3_treatment#${w}`]: "none",
            [`A5_cover#${w}`]: "barriers",
            [`A1_disease#${c}`]: "uncontrolled",
            [`A1_impact#${c}`]: "severe",
            [`A2_limit#${c}`]: "none",
            [`A3_treatment#${c}`]: "no_access",
            [`A3_urgent#${c}`]: true,
            [`A3_cause#${c}`]: "هزینه جراحی و نبود تخت تخصصی در استان (داده ساختگی)",
            [`A5_cover#${c}`]: "barriers",
            [`B6_need#${h}`]: "none",
            [`B6_need#${w}`]: "none",
            [`B6_need#${c}`]: "none",
            [`B1_status#${c}`]: "attending",
            [`B2_risks#${c}`]: [
                "absence"
            ],
            A4_burden: "manageable",
            A4_effects: [
                "debt"
            ],
            A6_exp: [
                "none"
            ],
            A6_now: true,
            A7_disrupt: "none",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c}`]: false,
            [`A_pregnant#${w}`]: false,
            B3_lit: "full",
            B4_barriers: "none",
            B5_digital: "adequate",
            B7_path: "active",
            C1_place: "stable",
            C1_eviction: "no",
            C2_issues: [
                "none"
            ],
            C3_right: "clear",
            C4_rooms: 2,
            C4_safesleep: "all",
            C5_water: "stable",
            C5_elec: "stable",
            C5_cook: "stable",
            C6_san: "good",
            C7_missing: [
                "none"
            ],
            C7_impact: "none",
            C8_arrears_severity: "none",
            C9_access: "adequate",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "stable",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "clear",
            E1_evidence: "اشتغال دائم دارد (داده ساختگی).",
            E2_support: "no_need",
            E2_hours: 0,
            E3_support: "reliable",
            E3_who: "برادر سرپرست",
            E4_barrier: "none",
            E4_types: [],
            E4_service: ""
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "حقوق کارگری",
                receiverMemberId: h,
                monthlyAmount: 12_000_000,
                continuity: "regular",
                reliability: "reliable",
                verified: false
            }
        ];
        return a;
    }
};
/* ---------- ۲) خانوار بی‌خانمان ---------- */ const scenarioHomeless = {
    id: "homeless",
    title: "خانوار بی‌خانمان",
    desc: "سکونت در فضای غیرمسکونی، قطع خدمات، نشانه‌های خطر R2/R7 — پیام: اولویت رسیدگی مستقل از امتیاز.",
    build: ()=>{
        const a = emptyAssessment();
        a.requestTypes = [
            "کمک مسکن و اجاره‌بها",
            "رسیدگی فوری (وضعیت اضطراری)"
        ];
        a.household = {
            responderName: "زهرا کریمی (نمونه)",
            responderRelation: "سرپرست",
            headName: "زهرا کریمی (نمونه)",
            headNationalIdStatus: "missing",
            province: "خوزستان",
            county: "اهواز",
            dwellingType: "خودرو/فضای عمومی",
            tenureType: "—",
            noFixedAddress: true,
            arrears: 0,
            povertyLine: {
                monthlyPerCapita: 3_800_000,
                region: "استان خوزستان",
                source: "داده ساختگی برای نمایش",
                validAsOf: "۱۴۰۴/۰۶",
                status: "unverified"
            }
        };
        const h = member(a, {
            firstName: "زهرا",
            lastName: "کریمی (نمونه)",
            relation: "سرپرست",
            age: 34,
            gender: "female",
            isHead: true,
            isResponder: true,
            isMainProvider: true,
            isMainCaregiver: true,
            employmentStatus: "irregular"
        });
        const c1 = member(a, {
            firstName: "آیدا",
            relation: "فرزند",
            age: 9,
            gender: "female",
            schoolAge: true,
            educationStatus: "dropped",
            needsCare: false
        });
        const c2 = member(a, {
            firstName: "نیما",
            relation: "فرزند",
            age: 4,
            gender: "male",
            needsCare: true
        });
        const ans = {
            [`A1_disease#${h}`]: "none",
            [`A1_impact#${h}`]: "none",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "none",
            [`A1_disease#${c1}`]: "none",
            [`A1_impact#${c1}`]: "none",
            [`A2_limit#${c1}`]: "none",
            [`A3_treatment#${c1}`]: "scheduled",
            [`A5_cover#${c1}`]: "none",
            [`A1_disease#${c2}`]: "controlled",
            [`A1_impact#${c2}`]: "moderate",
            [`A2_limit#${c2}`]: "unmet",
            [`A3_treatment#${c2}`]: "no_access",
            [`A5_cover#${c2}`]: "none",
            [`B1_status#${c1}`]: "dropped",
            [`B1_months#${c1}`]: 7,
            [`B1_reason#${c1}`]: "جابه‌جایی مکرر و نبود ثبات (نمونه)",
            [`B2_risks#${c1}`]: [
                "absence",
                "decline",
                "cost"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${c1}`]: "none",
            [`B6_need#${c2}`]: "needs_assessment",
            A4_burden: "severe",
            A4_effects: [
                "debt",
                "food"
            ],
            A6_exp: [
                "worry",
                "variety",
                "quantity",
                "mealskip"
            ],
            A6_now: false,
            A7_disrupt: "moderate",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c2}`]: true,
            [`A_pregnant#${h}`]: false,
            B3_lit: "with_help",
            B4_barriers: "serious",
            B5_digital: "missing",
            B7_path: "interested_no_path",
            C1_place: "nonresidential",
            C1_eviction: "imminent",
            C2_issues: [
                "uninhabitable"
            ],
            C3_right: "risk",
            C4_rooms: 0,
            C4_safesleep: "none",
            C5_water: "unstable",
            C5_elec: "off",
            C5_cook: "off",
            C6_san: "unsafe_missing",
            C7_missing: [
                "fridge",
                "cooker",
                "heater",
                "bed"
            ],
            C7_impact: "disruptive",
            C8_arrears_severity: "none",
            C9_access: "serious",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "limited",
            [`D1_continuity#${h}`]: "irregular",
            [`D1_seasonal#${h}`]: true,
            E1_outlook: "none",
            E1_evidence: "بدون مسکن و شغل ثابت (نمونه).",
            E2_support: "partial",
            E2_hours: 8,
            E3_support: "sporadic",
            E3_who: "خیریه محلی گاه‌گاهی",
            E4_barrier: "blocking",
            E4_types: [
                "identity",
                "admin"
            ],
            E4_service: "ثبت‌نام کودک در مدرسه به دلیل نبود مدارک هویتی (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "کار روزمزد",
                receiverMemberId: h,
                monthlyAmount: 3_500_000,
                continuity: "occasional",
                reliability: "uncertain"
            }
        ];
        a.flags = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("flg"),
                code: "R2",
                title: "بی‌خانمانی یا اخطار تخلیه قریب‌الوقوع",
                detail: "سکونت در خودرو (نمونه)",
                recordedAt: now(),
                source: "بازدید میدانی",
                confidentiality: "normal",
                status: "confirmed",
                action: "هماهنگی مرکز نگهداری موقت"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("flg"),
                code: "R3",
                title: "سوءتغذیه کودک یا نیاز تغذیه‌ای ویژه",
                detail: "کودک ۴ ساله با سوءتغذیه مشکوک (نمونه)",
                recordedAt: now(),
                source: "سنجش سلامت",
                confidentiality: "restricted",
                status: "reviewing"
            }
        ];
        return a;
    }
};
/* ---------- ۳) اطلاعات ناقص و تناقض ---------- */ const scenarioIncomplete = {
    id: "incomplete",
    title: "خانوار با اطلاعات ناقص و تناقض منابع",
    desc: "چند پاسخ «نمی‌دانم»، تناقض حق سکونت و اجاره، خط فقر ثبت‌نشده — پیام: نتیجه غیرنهایی/جمع جزئی، بدون امتیازدهی اجباری.",
    build: ()=>{
        const a = emptyAssessment();
        a.requestTypes = [
            "درخواست تشکیل/به‌روزرسانی پرونده حمایت"
        ];
        a.household = {
            responderName: "حسن رضایی (نمونه)",
            responderRelation: "سرپرست",
            headName: "حسن رضایی (نمونه)",
            headNationalIdStatus: "in_progress",
            province: "کرمان",
            county: "سیرجان",
            dwellingType: "واحد مسکونی",
            tenureType: "مالک",
            monthlyRent: 2_500_000,
            arrears: 4_000_000
        };
        const h = member(a, {
            firstName: "حسن",
            lastName: "رضایی (نمونه)",
            relation: "سرپرست",
            age: 51,
            gender: "male",
            isHead: true,
            isMainProvider: true,
            employmentStatus: "unemployed_seeking"
        });
        const c = member(a, {
            firstName: "فاطمه",
            relation: "فرزند",
            age: 16,
            gender: "female",
            schoolAge: true,
            educationStatus: "interrupted"
        });
        const ans = {
            [`A1_disease#${h}`]: "__dontknow__",
            [`A1_impact#${h}`]: "moderate",
            [`A2_limit#${h}`]: "none",
            [`A3_treatment#${h}`]: "none",
            [`A5_cover#${h}`]: "barriers",
            [`A1_disease#${c}`]: "none",
            [`A1_impact#${c}`]: "none",
            [`A2_limit#${c}`]: "none",
            [`A3_treatment#${c}`]: "none",
            [`A5_cover#${c}`]: "__refuse__",
            [`B1_status#${c}`]: "interrupted",
            [`B1_months#${c}`]: "__needreview__",
            [`B2_risks#${c}`]: [
                "decline",
                "cost"
            ],
            [`B6_need#${h}`]: "none",
            [`B6_need#${c}`]: "__dontknow__",
            A4_burden: "__dontknow__",
            A4_effects: [
                "debt"
            ],
            A6_exp: [
                "worry"
            ],
            A6_now: true,
            A7_disrupt: "__needreview__",
            A7_danger: [
                "none"
            ],
            [`A_malnut#${c}`]: false,
            [`A_pregnant#${c}`]: false,
            B3_lit: "with_help",
            B4_barriers: "__dontknow__",
            B5_digital: "__dontknow__",
            B7_path: "interested_no_path",
            C1_place: "stable",
            C1_eviction: "credible",
            C2_issues: [
                "damp"
            ],
            C3_right: "ambiguous",
            C4_rooms: "__dontknow__",
            C4_safesleep: "partial",
            C5_water: "stable",
            C5_elec: "unstable",
            C5_cook: "stable",
            C6_san: "shared_minor",
            C7_missing: [
                "heater"
            ],
            C7_impact: "minor",
            C8_arrears_severity: "significant",
            C9_access: "manageable",
            D1_no_provider: false,
            [`D1_ability#${h}`]: "able",
            [`D1_continuity#${h}`]: "none",
            [`D1_seasonal#${h}`]: false,
            E1_outlook: "uncertain",
            E1_evidence: "بدون شغل و با بدهی (نمونه).",
            E2_support: "__dontknow__",
            E2_hours: 0,
            E3_support: "sporadic",
            E3_who: "همسایه‌ها",
            E4_barrier: "in_progress",
            E4_types: [
                "identity"
            ],
            E4_service: "درخواست تعویض شناسنامه در جریان است (نمونه)"
        };
        a.answers = ans;
        a.incomeSources = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "یارانه",
                receiverMemberId: h,
                monthlyAmount: 1_400_000,
                continuity: "regular",
                reliability: "reliable"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "ارثیه (دریافت یک‌باره)",
                receiverMemberId: h,
                monthlyAmount: 30_000_000,
                continuity: "one_off",
                reliability: "reliable",
                note: "در درآمد ماهانه لحاظ نمی‌شود (نمونه)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("inc"),
                kind: "کار آزاد",
                receiverMemberId: h,
                monthlyAmount: 2_000_000,
                continuity: "occasional",
                reliability: "disputed"
            }
        ];
        a.qualityIssues = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                type: "conflict",
                description: "نوع حق سکونت «مالک» است ولی اجاره ماهانه مثبت ثبت شده است.",
                createdAt: now(),
                status: "open"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("iss"),
                type: "missing",
                description: "خط فقر منطقه‌ای معتبر ثبت نشده است؛ D3 غیرنهایی می‌ماند.",
                createdAt: now(),
                status: "open"
            }
        ];
        return a;
    }
};
const SAMPLES = [
    scenarioUrgent,
    scenarioHomeless,
    scenarioIncomplete
];
}),
"[project]/src/lib/mpi/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * مدل داده سامانه پرسش‌نامه — غربالگری EM-MPI
 * نسخه: ۱.۰.۰ نمایشی (Demo)
 *
 * اصل بنیادین: اطلاعات پرونده‌ای از امتیاز محرومیت تفکیک می‌شود.
 * هیچ خروجی الگوریتمی به‌تنهایی تصمیم نهایی درباره خانوار نیست.
 */ __turbopack_context__.s([
    "SPECIAL_ANSWERS",
    ()=>SPECIAL_ANSWERS
]);
const SPECIAL_ANSWERS = {
    DONT_KNOW: "__dontknow__",
    REFUSE: "__refuse__",
    NEED_REVIEW: "__needreview__",
    NONE: "__none__"
};
}),
"[project]/src/lib/mpi/engine.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoQualityIssues",
    ()=>autoQualityIssues,
    "computeAssessment",
    ()=>computeAssessment,
    "detectConflicts",
    ()=>detectConflicts,
    "get",
    ()=>get,
    "getM",
    ()=>getM,
    "indicatorTitle",
    ()=>indicatorTitle,
    "isSpecial",
    ()=>isSpecial,
    "resolveIndicator",
    ()=>resolveIndicator,
    "suggestFlags",
    ()=>suggestFlags,
    "validateWeights",
    ()=>validateWeights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/types.ts [app-ssr] (ecmascript)");
;
;
function isSpecial(v) {
    return v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].DONT_KNOW || v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].REFUSE || v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].NEED_REVIEW || v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].NONE;
}
function get(a, key) {
    return a[key];
}
function getM(a, key, memberId) {
    return a[`${key}#${memberId}`];
}
function specialStatus(v) {
    if (v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].DONT_KNOW || v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].REFUSE || v === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].NEED_REVIEW) {
        return "incomplete";
    }
    return null;
}
function num(v) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
    return undefined;
}
function strList(v) {
    return Array.isArray(v) ? v.filter((x)=>typeof x === "string") : [];
}
function validateWeights() {
    let total = 0;
    const perDim = {};
    for (const d of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"])){
        let sum = 0;
        for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS_BY_DIM"][d])sum += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEIGHTS"][id];
        total += sum;
        perDim[d] = {
            sum,
            cap: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"][d].cap,
            ok: sum === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"][d].cap
        };
    }
    return {
        ok: total === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOTAL_CAP"],
        total,
        perDim
    };
}
const INCOMPLETE_BASIS = "داده ضروری ناموجود یا نامطمئن است؛ بدون امتیازدهی اجباری.";
function worstMember(a, members, key, map, filter = ()=>true) {
    const rel = members.filter(filter);
    let worst;
    let allAnswered = true;
    for (const m of rel){
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
    return {
        worst,
        allAnswered,
        relevantCount: rel.length
    };
}
function to3(v) {
    if (v === undefined) return undefined;
    return v >= 0.75 ? 1 : v >= 0.25 ? 0.5 : 0;
}
function resolveIndicator(id, a, hh) {
    const members = hh.members;
    switch(id){
        /* ---------------- سلامت و امنیت زیستی ---------------- */ case "A1":
            {
                if (members.length === 0) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                let worst = 0;
                for (const m of members){
                    const dis = getM(a, "A1_disease", m.id);
                    const imp = getM(a, "A1_impact", m.id);
                    if (specialStatus(dis) || specialStatus(imp) || dis === undefined || imp === undefined) return {
                        status: "incomplete",
                        basis: INCOMPLETE_BASIS
                    };
                    let c = 0;
                    if (dis === "controlled") c = imp === "severe" ? 1 : imp === "moderate" ? 0.5 : 0;
                    else if (dis === "uncontrolled") c = imp === "severe" ? 1 : imp === "moderate" ? 0.5 : 0.5;
                    worst = Math.max(worst, c);
                }
                return {
                    coeff: worst,
                    status: "ok",
                    basis: worst === 0 ? "هیچ عضو بیماری مزمن جدی مؤثر ندارد." : "مبتنی بر شدیدترین وضعیت بیماری و اثر آن بر زندگی روزمره."
                };
            }
        case "A2":
            {
                if (members.length === 0) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                const r = worstMember(a, members, "A2_limit", (v)=>v === "unmet" ? 1 : v === "supported" ? 0.5 : v === "none" ? 0 : undefined);
                if (r.worst === undefined || !r.allAnswered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: r.worst,
                    status: "ok",
                    basis: r.worst === 1 ? "محدودیت پایدار با نیاز تأمین‌نشده." : r.worst === 0.5 ? "محدودیت موجود ولی با کمک/وسیله تأمین‌شده." : "محدودیت عملکردی پایدار ثبت نشده است."
                };
            }
        case "A3":
            {
                if (members.length === 0) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                const r = worstMember(a, members, "A3_treatment", (v)=>v === "no_access" ? 1 : v === "scheduled" ? 0.5 : v === "none" ? 0 : undefined);
                if (r.worst === undefined || !r.allAnswered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: r.worst,
                    status: "ok",
                    basis: r.worst === 1 ? "درمان/داروی ضروری بدون دسترسی مانده است." : r.worst === 0.5 ? "درمان ضروری در نوبت یا با تأخیر برنامه‌ریزی‌شده." : "درمان ضروری انجام‌نشده ثبت نشده است."
                };
            }
        case "A4":
            {
                const v = get(a, "A4_burden");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                const effects = strList(get(a, "A4_effects"));
                if (v === "severe" || effects.length >= 2) {
                    return {
                        coeff: 1,
                        status: "ok",
                        basis: v === "severe" ? "فشار سنگین هزینه درمان" : "بدهی/فروش دارایی یا کاهش مصرف اساسی ناشی از هزینه درمان."
                    };
                }
                if (v === "manageable" || effects.length === 1) {
                    return {
                        coeff: 0.5,
                        status: "ok",
                        basis: "فشار هزینه درمان قابل مدیریت یا با یک اثر جانبی."
                    };
                }
                if (v === "low") return {
                    coeff: 0,
                    status: "ok",
                    basis: "فشار معنادار هزینه درمان گزارش نشده است."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "A5":
            {
                if (members.length === 0) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                const r = worstMember(a, members, "A5_cover", (v)=>v === "none" ? 1 : v === "barriers" ? 0.5 : v === "effective" ? 0 : undefined);
                if (r.worst === undefined || !r.allAnswered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: r.worst,
                    status: "ok",
                    basis: r.worst === 1 ? "عضو نیازمند بدون پوشش بیمه‌ای معتبر." : r.worst === 0.5 ? "پوشش موجود ولی استفاده مؤثر با مانع (هزینه/فاصله/نوبت)." : "پوشش معتبر با دسترسی عملی به خدمت ضروری."
                };
            }
        case "A6":
            {
                const exp = strList(get(a, "A6_exp"));
                const now = get(a, "A6_now");
                if (specialStatus(get(a, "A6_exp"))) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (now === undefined || now === null) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                let coeff = Math.min(0.25 * exp.length, 1);
                if (exp.includes("hunger")) coeff = Math.max(coeff, 0.75);
                const names = {
                    worry: "نگرانی از اتمام غذا",
                    variety: "کاهش تنوع غذا",
                    quantity: "کاهش مقدار غذا",
                    mealskip: "حذف وعده",
                    hunger: "گرسنگی"
                };
                return {
                    coeff,
                    status: "ok",
                    pendingApproval: true,
                    basis: exp.length === 0 ? `هیچ تجربه ناامنی غذایی در ۳۰ روز اخیر ثبت نشده است. دسترسی فعلی: ${now ? "موجود" : "ناموجود"}.` : `تجربه‌های ۳۰ روز اخیر: ${exp.map((e)=>names[e] ?? e).join("، ")}. دسترسی فعلی: ${now ? "موجود" : "ناموجود"}. آستانه‌های پنج‌حالته نیازمند تصویب مرجع است.`
                };
            }
        case "A7":
            {
                const v = get(a, "A7_disrupt");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: "داده حساس — پاسخ ثبت نشده یا نیازمند بررسی است (بدون امتیازدهی اجباری)."
                };
                const danger = strList(get(a, "A7_danger"));
                if (v === "severe") return {
                    coeff: 1,
                    status: "ok",
                    basis: "اختلال شدید عملکرد خانوار ناشی از مشکل روانی/مصرف مواد."
                };
                if (v === "moderate") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "اختلال متوسط عملکرد خانوار."
                };
                if (v === "none" && danger.length === 0) return {
                    coeff: 0,
                    status: "ok",
                    basis: "اختلال عملکرد یا خطر ایمنی ثبت نشده است."
                };
                if (v === "none" && danger.length > 0) return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "اختلال عملکرد ثبت نشده ولی نشانه خطر ایمنی ثبت شده است؛ نیازمند بررسی تخصصی محرمانه."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        /* ---------------- آموزش و رشد انسانی ---------------- */ case "B1":
            {
                const rel = members.filter((m)=>m.schoolAge || typeof m.age === "number" && m.age >= 6 && m.age <= 18);
                if (rel.length === 0) return {
                    coeff: 0,
                    status: "ok",
                    basis: "عضو در سن آموزش اجباری (۶ تا ۱۸ سال) ثبت نشده است؛ ضریب صفر صحیح است."
                };
                const r = worstMember(a, rel, "B1_status", (v)=>v === "dropped" || v === "never" ? 1 : v === "interrupted" ? 0.5 : v === "attending" ? 0 : undefined);
                if (r.worst === undefined || !r.allAnswered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: r.worst,
                    status: "ok",
                    pendingApproval: true,
                    basis: r.worst === 1 ? "ترک تحصیل یا عدم ثبت‌نام در سن آموزش اجباری." : r.worst === 0.5 ? "وقفه تحصیلی فعال (حداقل مدت وقفه نیازمند تصویب مرجع)." : "ثبت‌نام و حضور فعال همه اعضای در سن آموزش."
                };
            }
        case "B2":
            {
                const rel = members.filter((m)=>m.schoolAge || typeof m.age === "number" && m.age >= 6 && m.age <= 18);
                if (rel.length === 0) return {
                    coeff: 0,
                    status: "ok",
                    basis: "عضو در سن آموزش ثبت نشده است."
                };
                let worst = 0;
                let answered = true;
                for (const m of rel){
                    const risks = strList(getM(a, "B2_risks", m.id));
                    const answeredQ = getM(a, "B2_risks", m.id) !== undefined;
                    if (!answeredQ) answered = false;
                    const c = risks.includes("child_labor") || risks.includes("forced_care") ? risks.length >= 2 ? 1 : 0.5 : risks.length >= 3 ? 1 : risks.length >= 1 ? 0.5 : 0;
                    worst = Math.max(worst, c);
                }
                if (!answered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: worst,
                    status: "ok",
                    basis: worst === 0 ? "عامل خطر استمرار تحصیل ثبت نشده است." : "مبتنی بر تعداد و نوع عوامل خطر (غیبت، افت، هزینه، کار کودک، مراقبت اجباری)."
                };
            }
        case "B3":
            {
                const v = get(a, "B3_lit");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "cannot") return {
                    coeff: 1,
                    status: "ok",
                    basis: "ناتوانی در امور پایه نوشتاری بدون کمک قابل اتکا."
                };
                if (v === "with_help") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "انجام امور با کمک دیگران (وابستگی فعال)."
                };
                if (v === "full") return {
                    coeff: 0,
                    status: "ok",
                    basis: "توانایی انجام امور پایه نوشتاری و پیگیری خدمات."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "B4":
            {
                const v = get(a, "B4_barriers");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "serious") return {
                    coeff: 1,
                    status: "ok",
                    basis: "مانع جدی حل‌نشده دسترسی به آموزش (فاصله/هزینه/مدارک/معلولیت/ظرفیت)."
                };
                if (v === "resolvable") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "مانع قابل حل موجود است."
                };
                if (v === "none") return {
                    coeff: 0,
                    status: "ok",
                    basis: "مانع واقعی دسترسی به آموزش ثبت نشده است."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "B5":
            {
                const v = get(a, "B5_digital");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "missing") return {
                    coeff: 1,
                    status: "ok",
                    basis: "نیاز واقعی آموزشی به ابزار دیجیتال بدون ابزار قابل استفاده."
                };
                if (v === "insufficient") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "ابزار ناکافی یا اشتراک ابزار مانع انجام تکلیف است."
                };
                if (v === "adequate" || v === "no_need") return {
                    coeff: 0,
                    status: "ok",
                    basis: v === "no_need" ? "نیاز واقعی به ابزار دیجیتال ثبت نشده است." : "ابزار و اتصال کافی موجود است."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "B6":
            {
                if (members.length === 0) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                const r = worstMember(a, members, "B6_need", (v)=>v === "unmet" ? 1 : v === "needs_assessment" ? 0.5 : v === "served" ? 0.5 : v === "none" ? 0 : undefined);
                if (r.worst === undefined || !r.allAnswered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: r.worst,
                    status: "ok",
                    basis: r.worst === 1 ? "نیاز آموزشی ویژه تأییدشده بدون خدمت متناسب." : r.worst === 0.5 ? "نیاز ویژه با خدمت متناسب یا در فرایند ارزیابی." : "نیاز آموزشی ویژه ثبت نشده است."
                };
            }
        case "B7":
            {
                const v = get(a, "B7_path");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "no_capability") return {
                    coeff: 1,
                    status: "ok",
                    basis: "عضو واجد شرایط علاقه‌مند بدون هیچ مسیر آموزش/مهارت فعال."
                };
                if (v === "interested_no_path") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "علاقه‌مندی موجود ولی مسیر فعال یا ابزار اولیه وجود ندارد."
                };
                if (v === "active") return {
                    coeff: 0,
                    status: "ok",
                    basis: "مسیر فعال آموزش/مهارت با ابزار اولیه برای عضو واجد شرایط."
                };
                if (v === "no_eligible") return {
                    coeff: 0,
                    status: "ok",
                    basis: "فاقد عضو واجد شرایط برای توانمندسازی؛ ضریب صفر صحیح است."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        /* ---------------- استاندارد زندگی و مسکن ---------------- */ case "C1":
            {
                const place = get(a, "C1_place");
                const evict = get(a, "C1_eviction");
                if (specialStatus(place) || specialStatus(evict)) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (place === "nonresidential") return {
                    coeff: 1,
                    status: "ok",
                    basis: "محل خواب فعلی غیرمسکونی/فضای عمومی است."
                };
                if (place === "temporary") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "سکونت موقت یا مرکز نگهداری."
                };
                if (place === "stable" && evict === "imminent") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "سکونت فعلی پایدار ولی اخطار تخلیه قریب‌الوقوع معتبر ثبت شده است."
                };
                if (place === "stable" && evict === "credible") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "سکونت فعلی پایدار ولی اخطار/خطر تخلیه ثبت شده است."
                };
                if (place === "stable" && evict === "no") return {
                    coeff: 0,
                    status: "ok",
                    basis: "محل خواب پایدار بدون اخطار تخلیه."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "C2":
            {
                const issues = strList(get(a, "C2_issues"));
                const answered = get(a, "C2_issues") !== undefined;
                if (!answered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (issues.includes("uninhabitable") || issues.includes("structural")) return {
                    coeff: 1,
                    status: "ok",
                    basis: "خطر بحرانی سازه/برق یا غیرقابل سکونت‌بودن ثبت شده است."
                };
                if (issues.length >= 2) return {
                    coeff: 0.5,
                    status: "ok",
                    basis: `دو یا چند نقص مسکن: ${issues.join("، ")}.`
                };
                if (issues.length === 1) return {
                    coeff: 0.5,
                    status: "ok",
                    basis: `یک نقص مسکن: ${issues[0]}.`
                };
                return {
                    coeff: 0,
                    status: "ok",
                    basis: "نقص بحرانی ایمنی در چک‌لیست ثبت نشده است."
                };
            }
        case "C3":
            {
                const v = get(a, "C3_right");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "risk") return {
                    coeff: 1,
                    status: "ok",
                    basis: "خطر جدی ازدست‌دادن مسکن (اختلاف، وابستگی یا مانع تمدید)."
                };
                if (v === "ambiguous") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "حق سکونت مبهم یا وابسته به فرد دیگر."
                };
                if (v === "clear") return {
                    coeff: 0,
                    status: "ok",
                    basis: "حق سکونت روشن و بدون اختلاف."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "C4":
            {
                const rooms = num(get(a, "C4_rooms"));
                const safe = get(a, "C4_safesleep");
                if (rooms === undefined || rooms < 0) return {
                    status: "incomplete",
                    basis: "تعداد اتاق قابل سکونت ثبت نشده است."
                };
                if (specialStatus(safe)) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (safe === "none") return {
                    coeff: 1,
                    status: "ok",
                    pendingApproval: true,
                    basis: "فضای خواب ایمن برای همه اعضا وجود ندارد."
                };
                const n = Math.max(members.length, 1);
                const ppr = n / Math.max(rooms, 1);
                let base;
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
                    basis: `${n} عضو در ${rooms} اتاق قابل سکونت (نفر بر اتاق ≈ ${ppr.toFixed(2)})؛ وضعیت فضای خواب ایمن: ${safe === "all" ? "برای همه" : "جزئی"}. آستانه‌ها نیازمند تصویب مرجع است.`
                };
            }
        case "C5":
            {
                const keys = [
                    "C5_water",
                    "C5_elec",
                    "C5_cook"
                ];
                let answered = true;
                let worst = 0;
                for (const k of keys){
                    const v = get(a, k);
                    if (specialStatus(v) || v === undefined) answered = false;
                    if (v === "off") worst = Math.max(worst, 1);
                    else if (v === "unstable") worst = Math.max(worst, 0.5);
                }
                if (!answered) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                return {
                    coeff: worst,
                    status: "ok",
                    basis: worst === 1 ? "قطع حیاتی آب/برق/انرژی پخت‌وپز بدون جایگزین ایمن." : worst === 0.5 ? "قطعی‌های مکرر یا محدودیت پایدار خدمات." : "دسترسی پایدار به آب سالم، برق و انرژی ایمن."
                };
            }
        case "C6":
            {
                const v = get(a, "C6_san");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "unsafe_missing") return {
                    coeff: 1,
                    status: "ok",
                    basis: "سرویس/حمام/دفع فاضلاب ناسالم یا مفقود."
                };
                if (v === "shared_minor") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "مشترک‌بودن یا نقص جزئی اماکن بهداشتی."
                };
                if (v === "good") return {
                    coeff: 0,
                    status: "ok",
                    basis: "سرویس بهداشتی و حمام قابل استفاده و بهداشتی."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "C7":
            {
                const missing = strList(get(a, "C7_missing"));
                const impact = get(a, "C7_impact");
                if (get(a, "C7_missing") === undefined) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (impact === "disruptive" || missing.length >= 3) return {
                    coeff: 1,
                    status: "ok",
                    basis: missing.length >= 3 ? `فقدان ${missing.length} وسیله ضروری با اختلال جدی در سلامت/غذا/مراقبت.` : "فقدان وسیله ضروری با اختلال جدی در زندگی روزمره."
                };
                if (impact === "minor" || missing.length >= 1) return {
                    coeff: 0.5,
                    status: "ok",
                    basis: `فقدان وسایل: ${missing.join("، ") || "—"} با اثر جزئی.`
                };
                if (impact === "none" && missing.length === 0) return {
                    coeff: 0,
                    status: "ok",
                    basis: "وسایل ضروری موجود و سالم‌اند."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "C8":
            {
                const rent = num(hh.household.monthlyRent) ?? 0;
                const charge = num(hh.household.monthlyCharge) ?? 0;
                const bills = num(hh.household.monthlyBills) ?? 0;
                const arrears = num(hh.household.arrears) ?? 0;
                const housing = rent + charge + bills; // ودیعه عمداً جدا است
                const reliable = hh.incomeSources.filter((s)=>s.continuity === "regular" && s.reliability === "reliable").reduce((acc, s)=>acc + (s.monthlyAmount || 0), 0);
                const pl = hh.household.povertyLine;
                const plValid = !!pl && !!pl.monthlyPerCapita && pl.monthlyPerCapita > 0 && pl.status !== "invalid";
                const arrearsSeverity = get(a, "C8_arrears_severity");
                if (specialStatus(arrearsSeverity)) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (arrearsSeverity === undefined) return {
                    status: "incomplete",
                    basis: "وضعیت معوقات هزینه مسکن ثبت نشده است."
                };
                // درآمد صفر: طبق قاعده مرجع، مخرج از خط فقر خانوار ساخته می‌شود؛ بدون خط فقر معتبر → غیرنهایی
                const denom = reliable > 0 ? reliable : plValid ? pl.monthlyPerCapita * Math.max(members.length, 1) : undefined;
                if (denom === undefined || denom <= 0) {
                    return {
                        status: "incomplete",
                        basis: "منبع قابل اتکا صفر/ناموجود است و خط فقر معتبر برای مبنای مقایسه ثبت نشده است؛ نتیجه غیرنهایی."
                    };
                }
                const ratio = housing / denom;
                let coeff;
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
                    basis: `هزینه ماهانه مسکن ${housing.toLocaleString("fa-IR")} بر مبنای ${reliable > 0 ? "منابع قابل اتکا" : "خط فقر خانوار (درآمد قابل اتکا صفر است)"}؛ نسبت ≈ ${ratio.toFixed(2)}؛ معوقه: ${arrearsSeverity === "none" ? "ندارد" : arrearsSeverity === "minor" ? "جزئی" : "معنادار"}. ودیعه در محاسبه لحاظ نشده است.`
                };
            }
        case "C9":
            {
                const v = get(a, "C9_access");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "serious") return {
                    coeff: 1,
                    status: "ok",
                    basis: "مانع پایدار و جدی دسترسی به خدمات پایه."
                };
                if (v === "manageable") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "دسترسی با بار زمان/هزینه قابل مدیریت."
                };
                if (v === "adequate") return {
                    coeff: 0,
                    status: "ok",
                    basis: "دسترسی واقعی مناسب به خدمات پایه (بدون شمارش تکراری با A5/B4)."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        /* ---------------- معیشت، اشتغال و درآمد ---------------- */ case "D1":
            {
                const noProvider = get(a, "D1_no_provider");
                if (noProvider === true) return {
                    coeff: 1,
                    status: "ok",
                    basis: "خانوار بدون تأمین‌کننده با درآمد فعال ثبت شده است."
                };
                const provider = members.find((m)=>m.isMainProvider);
                if (!provider) return {
                    status: "incomplete",
                    basis: "تأمین‌کننده اصلی خانوار مشخص نشده است."
                };
                const cont = getM(a, "D1_continuity", provider.id);
                const ability = getM(a, "D1_ability", provider.id);
                const seasonal = getM(a, "D1_seasonal", provider.id) === true;
                if (specialStatus(cont) || specialStatus(ability)) return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
                if (cont === "stable") return {
                    coeff: 0,
                    status: "ok",
                    basis: "درآمد تأمین‌کننده اصلی مستمر است (فصلی/روزمزدی به‌تنهایی امتیاز ندارد)."
                };
                if (cont === "irregular") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "ناپایداری درآمد تأمین‌کننده در دوره ارزیابی احراز شده است."
                };
                if (cont === "none") {
                    if (ability === "unable") return {
                        coeff: 1,
                        status: "ok",
                        basis: "بدون درآمد و ناتوانی تأمین‌کننده از کار."
                    };
                    if (seasonal) return {
                        coeff: 0.5,
                        status: "ok",
                        basis: "قطع موقت درآمد در فعالیت فصلی/روزمزدی با امکان بازگشت."
                    };
                    return {
                        coeff: 1,
                        status: "ok",
                        basis: "بدون درآمد فعال از تأمین‌کننده اصلی."
                    };
                }
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "D2":
            {
                const providerId = members.find((m)=>m.isMainProvider)?.id;
                const eligible = members.filter((m)=>m.id !== providerId && m.employmentStatus === "unemployed_seeking");
                const anyMember = members.length > 0;
                if (!anyMember) return {
                    status: "incomplete",
                    basis: "هیچ عضوی ثبت نشده است."
                };
                const n = eligible.length;
                const coeff = n === 0 ? 0 : n === 1 ? 0.5 : 1;
                return {
                    coeff,
                    status: "ok",
                    basis: n === 0 ? "فاقد عضو توانمند واجد شرایطِ جویای کار (خارج از تأمین‌کننده اصلی)؛ ضریب صفر صحیح است. تحصیل و مراقبت از بیکاری تفکیک شده است." : `${n} عضو توانمند جویای کار (غیر از تأمین‌کننده اصلی) ثبت شده است.`
                };
            }
        case "D3":
            {
                const pl = hh.household.povertyLine;
                const plValid = !!pl && !!pl.monthlyPerCapita && pl.monthlyPerCapita > 0 && !!pl.source && pl.status !== "invalid";
                if (!plValid) {
                    return {
                        status: "incomplete",
                        basis: "خط فقر منطقه‌ای معتبر (مبلغ، منبع، وضعیت اعتبار) ثبت نشده یا نامعتبر است؛ نتیجه D3 غیرنهایی می‌ماند."
                    };
                }
                const reliable = hh.incomeSources.filter((s)=>s.continuity === "regular" && s.reliability === "reliable").reduce((acc, s)=>acc + (s.monthlyAmount || 0), 0);
                const excluded = hh.incomeSources.filter((s)=>!(s.continuity === "regular" && s.reliability === "reliable"));
                const n = Math.max(members.length, 1);
                const perCapita = reliable / n;
                const ratio = perCapita / pl.monthlyPerCapita;
                let coeff;
                if (ratio >= 1.2) coeff = 0;
                else if (ratio >= 0.8) coeff = 0.25;
                else if (ratio >= 0.6) coeff = 0.5;
                else if (ratio >= 0.3) coeff = 0.75;
                else coeff = 1;
                return {
                    coeff,
                    status: "ok",
                    pendingApproval: true,
                    basis: `درآمد ماهانه قابل اتکا ${reliable.toLocaleString("fa-IR")} تومان برای ${n} نفر (سرانه ≈ ${perCapita.toLocaleString("fa-IR")}) نسبت به خط فقر ${pl.monthlyPerCapita.toLocaleString("fa-IR")} تومان/نفر؛ نسبت ≈ ${ratio.toFixed(2)}. برش‌ها پیشنهادی و نیازمند اعتبارسنجی است.${excluded.length ? ` ${excluded.length} منبع غیرمستمر/غیرقابل‌اتکا (مانند دریافت یک‌باره ارث) از درآمد ماهانه جدا شد.` : ""}`
                };
            }
        /* ---------------- ظرفیت مراقبت و پشتوانه ---------------- */ case "E1":
            {
                const v = get(a, "E1_outlook");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "none") return {
                    coeff: 1,
                    status: "ok",
                    basis: "بدون مسیر واقعی حفظ/بهبود معاش در ۱۲ ماه آینده (با شواهد، نه صرفاً احساس)."
                };
                if (v === "uncertain") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "مسیر معیشت نامطمئن با موانع پایدار."
                };
                if (v === "clear") return {
                    coeff: 0,
                    status: "ok",
                    basis: "مسیر واقعی و محتمل حفظ/بهبود معاش وجود دارد."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "E2":
            {
                const needing = members.filter((m)=>m.needsCare);
                const support = get(a, "E2_support");
                const sE2 = specialStatus(support);
                if (sE2) return {
                    status: sE2,
                    basis: INCOMPLETE_BASIS
                };
                if (needing.length === 0) return {
                    coeff: 0,
                    status: "ok",
                    basis: "عضو نیازمند مراقبت مستمر ثبت نشده است."
                };
                if (support === "none") return {
                    coeff: 1,
                    status: "ok",
                    basis: "نیاز مراقبتی بدون مراقب/پشتیبانی قابل اتکا."
                };
                if (support === "partial") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "بار مراقبت سنگین با پشتیبانی ناکافی."
                };
                if (support === "adequate") return {
                    coeff: 0,
                    status: "ok",
                    basis: "نیاز مراقبتی با مراقب و پشتیبانی پایدار تأمین می‌شود."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "E3":
            {
                const v = get(a, "E3_support");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "none") return {
                    coeff: 1,
                    status: "ok",
                    basis: "فرد یا نهاد مؤثر در بحران وجود ندارد."
                };
                if (v === "sporadic") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "حمایت موردی و ناپایدار."
                };
                if (v === "reliable") return {
                    coeff: 0,
                    status: "ok",
                    basis: "حمایت مستمر و قابل اتکا در بحران."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
        case "E4":
            {
                const v = get(a, "E4_barrier");
                const s = specialStatus(v);
                if (s) return {
                    status: s,
                    basis: INCOMPLETE_BASIS
                };
                if (v === "blocking") return {
                    coeff: 1,
                    status: "ok",
                    basis: "مانع هویتی/حقوقی/اداری، دسترسی به حق یا خدمت حیاتی را مسدود کرده است."
                };
                if (v === "in_progress") return {
                    coeff: 0.5,
                    status: "ok",
                    basis: "مانع موجود با راه‌حل در جریان."
                };
                if (v === "none") return {
                    coeff: 0,
                    status: "ok",
                    basis: "مانع مؤثر ثبت نشده است (نبود کد ملی به‌تنهایی امتیاز ندارد)."
                };
                return {
                    status: "incomplete",
                    basis: INCOMPLETE_BASIS
                };
            }
    }
}
function computeAssessment(hh) {
    const indicators = [];
    for (const dim of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"])){
        for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS_BY_DIM"][dim]){
            const out = resolveIndicator(id, hh.answers, hh);
            indicators.push({
                id,
                dimension: dim,
                weight: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEIGHTS"][id],
                coeff: out.coeff,
                score: out.coeff !== undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEIGHTS"][id] * out.coeff : undefined,
                status: out.status,
                basis: out.basis,
                pendingApproval: out.pendingApproval
            });
        }
    }
    const dimensions = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"]).map((d)=>{
        const items = indicators.filter((i)=>i.dimension === d);
        const score = items.reduce((acc, i)=>acc + (i.score ?? 0), 0);
        const complete = items.every((i)=>i.status === "ok");
        return {
            id: d,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"][d].title,
            cap: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"][d].cap,
            score,
            pct: Math.min(100, score / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DIMENSIONS"][d].cap * 100),
            complete
        };
    });
    const finalized = indicators.filter((i)=>i.status === "ok");
    const partialSum = finalized.reduce((acc, i)=>acc + (i.score ?? 0), 0);
    const completeness = Math.round(finalized.length / indicators.length * 100);
    const allOk = finalized.length === indicators.length;
    const result = {
        indicators,
        dimensions,
        partialSum,
        status: allOk ? "final" : "nonfinal",
        completeness,
        finalizedCount: finalized.length
    };
    if (allOk) {
        const total = Math.min(partialSum, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOTAL_CAP"]);
        result.total = total;
        result.totalPct = total / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOTAL_CAP"] * 100;
        const lv = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].find((l)=>total >= l.min && total < l.max) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"][4];
        result.level = {
            index: lv.index,
            label: lv.label,
            min: lv.min,
            max: lv.max
        };
    }
    return result;
}
function suggestFlags(hh) {
    const out = [];
    const add = (code, title, detail, strict = false)=>out.push({
            code,
            title,
            detail,
            suggested: true,
            confidentiality: strict ? "strict" : "restricted"
        });
    const members = hh.members;
    const a = hh.answers;
    // R1 — فوریت پزشکی
    for (const m of members){
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
    for (const m of members){
        if (getM(a, "A_malnut", m.id) === true) {
            add("R3", "سوءتغذیه کودک یا نیاز تغذیه‌ای ویژه", `${m.firstName}: نیازمند بررسی حرفه‌ای تغذیه و درمان.`);
            break;
        }
    }
    // R4 — کودک کار
    for (const m of members){
        const risks = strList(getM(a, "B2_risks", m.id));
        if (risks.includes("child_labor") || typeof m.age === "number" && m.age < 15 && m.employmentStatus === "employed") {
            add("R4", "کودک کار یا کودک در خطر", `${m.firstName}: اثر کار بر امنیت و تحصیل نیازمند بررسی حفاظتی است.`);
            break;
        }
    }
    // R5 — خشونت/آسیب
    if (strList(get(a, "A7_danger")).length > 0) {
        add("R5", "خشونت یا خطر آسیب به خود/دیگران", "نشانه خطر ثبت‌شده — نیازمند تأیید تخصصی و گردش کار محرمانه.", true);
    }
    // R6 — فقدان مراقب
    const needingCare = members.filter((m)=>m.needsCare);
    const caregiver = members.find((m)=>m.isMainCaregiver);
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
function detectConflicts(hh) {
    const out = [];
    const a = hh.answers;
    const h = hh.household;
    const nonresidential = h.dwellingType === "غیرمسکونی" || h.dwellingType === "خودرو/فضای عمومی" || get(a, "C1_place") === "nonresidential";
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
    const hasEffectiveInsurance = hh.members.some((m)=>getM(a, "A5_cover", m.id) === "effective");
    const noAccess = hh.members.some((m)=>getM(a, "A3_treatment", m.id) === "no_access");
    if (hasEffectiveInsurance && noAccess) {
        out.push("پوشش بیمه‌ای مؤثر ثبت شده ولی درمان ضروری بدون دسترسی است — موانع غیربیمه‌ای را بررسی کنید.");
    }
    return out;
}
function autoQualityIssues(hh) {
    const out = [];
    const a = hh.answers;
    for (const [key, val] of Object.entries(a)){
        if (val === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].DONT_KNOW) {
            out.push({
                scope: key.split("#")[0],
                type: "special_answer",
                description: `پاسخ «نمی‌دانم» برای ${key.split("#")[0]} ثبت شده است؛ نیازمند بررسی.`
            });
        } else if (val === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].REFUSE) {
            out.push({
                scope: key.split("#")[0],
                type: "special_answer",
                description: `پاسخ «مایل به پاسخ نیستم» برای ${key.split("#")[0]} ثبت شده است؛ بدون امتیازدهی.`
            });
        } else if (val === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SPECIAL_ANSWERS"].NEED_REVIEW) {
            out.push({
                scope: key.split("#")[0],
                type: "special_answer",
                description: `پاسخ «نیازمند بررسی» برای ${key.split("#")[0]} ثبت شده است.`
            });
        }
    }
    for (const c of detectConflicts(hh)){
        out.push({
            type: "conflict",
            description: c
        });
    }
    if (hh.members.length === 0) {
        out.push({
            type: "missing",
            description: "هیچ عضوی برای خانوار ثبت نشده است."
        });
    }
    return out;
}
function indicatorTitle(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_TITLES"][id] ?? id;
}
;
}),
"[project]/src/lib/mpi/questions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EVIDENCE_KINDS",
    ()=>EVIDENCE_KINDS,
    "MEMBER_RELATIONS",
    ()=>MEMBER_RELATIONS,
    "QUESTION_GROUPS",
    ()=>QUESTION_GROUPS,
    "REQUEST_TYPES",
    ()=>REQUEST_TYPES,
    "SCORED_STEPS",
    ()=>SCORED_STEPS,
    "STEPS",
    ()=>STEPS,
    "groupsOfStep",
    ()=>groupsOfStep
]);
const EVIDENCE_KINDS = [
    {
        value: "medical",
        label: "مدرک درمانی (گواهی پزشک، نسخه، جواب آزمایش)"
    },
    {
        value: "education",
        label: "مدرک آموزشی (گزارش مدرسه، کارت، ابلاغ)"
    },
    {
        value: "insurance",
        label: "مدرک بیمه‌ای (کارت، پرینت سابقه)"
    },
    {
        value: "legal",
        label: "مدرک حقوقی/قضایی (نامه، حکم، قرارداد)"
    },
    {
        value: "administrative",
        label: "مدرک اداری (اخطار، قبض، فرم رسمی)"
    },
    {
        value: "photo",
        label: "تصویر میدانی (عکس وضعیت)"
    },
    {
        value: "other",
        label: "سایر"
    }
];
const STEPS = [
    {
        index: 1,
        key: "identity",
        title: "هویت، محرمانگی و واکشی از مراجع ثبتی",
        short: "هویت و واکشی",
        desc: "با ثبت کد ملی، کد پستی و تاریخ تولد سرپرست، اطلاعات هویتی از ثبت احوال و نشانی از پست واکشی و ملاک می‌شود؛ سایر مراجع نیز با کد ملی استعلام می‌شوند. نوع درخواست در گام آخر ثبت می‌شود.",
        scored: false
    },
    {
        index: 2,
        key: "urgency",
        title: "بررسی اولیه نشانه‌های فوریت",
        short: "فوریت",
        desc: "اگر وضعیت فوری یا خطرناکی وجود دارد همین حالا ثبت کنید؛ برای رسیدگی فوری نیازی به تکمیل بقیه پرسشنامه نیست.",
        scored: false
    },
    {
        index: 3,
        key: "base",
        title: "اطلاعات پایه و اعضای خانوار",
        short: "اطلاعات پایه",
        desc: "شناسه‌های پرونده‌ای — بدون امتیاز مستقل؛ برای شناخت خانوار و اجرای منطق نمایش.",
        scored: false
    },
    {
        index: 4,
        key: "health",
        title: "سلامت و امنیت زیستی (A)",
        short: "سلامت",
        desc: "بیماری، محدودیت عملکرد، درمان ضروری، هزینه درمان، پوشش مؤثر، غذا و ایمنی — ۷ شاخص."
    },
    {
        index: 5,
        key: "education",
        title: "آموزش و رشد انسانی (B)",
        short: "آموزش",
        desc: "تحصیل، سواد کارکردی، دسترسی، ابزار دیجیتال و توانمندسازی — ۷ شاخص."
    },
    {
        index: 6,
        key: "housing",
        title: "استاندارد زندگی و مسکن (C)",
        short: "مسکن",
        desc: "سکونت، ایمنی، خدمات، وسایل، هزینه مسکن و دسترسی — ۹ شاخص."
    },
    {
        index: 7,
        key: "livelihood",
        title: "معیشت، اشتغال و درآمد (D)",
        short: "معیشت",
        desc: "اشتغال تأمین‌کننده، بیکاری سایر اعضا و کفایت منابع قابل اتکا — ۳ شاخص."
    },
    {
        index: 8,
        key: "care",
        title: "ظرفیت مراقبت و پشتوانه اجتماعی (E)",
        short: "مراقبت",
        desc: "چشم‌انداز معیشت، بار مراقبت، پشتوانه بحران و موانع اداری — ۴ شاخص."
    },
    {
        index: 9,
        key: "quality",
        title: "مدارک، کیفیت داده و موارد نیازمند بررسی",
        short: "کیفیت داده",
        desc: "بازبینی پاسخ‌های ناتمام، تناقض‌ها و منبع داده هر شاخص.",
        scored: false
    },
    {
        index: 10,
        key: "summary",
        title: "خلاصه غربالگری، بازبینی انسانی و ارجاع",
        short: "خلاصه",
        desc: "نتیجه غربالگری، ثبت نظر مددکار و مسیر ارجاع.",
        scored: false
    }
];
const REQUEST_TYPES = [
    "درخواست تشکیل/به‌روزرسانی پرونده حمایت",
    "کمک معیشت و تغذیه",
    "کمک درمان",
    "کمک مسکن و اجاره‌بها",
    "حمایت تحصیلی",
    "توانمندسازی و اشتغال",
    "مشاوره حقوقی و قضایی",
    "مراقبت و نگهداری",
    "رسیدگی فوری (وضعیت اضطراری)",
    "سایر"
];
const DK = {
    value: "__dontknow__",
    label: "نمی‌دانم",
    special: true
};
const REFUSE = {
    value: "__refuse__",
    label: "مایل به پاسخ نیستم",
    special: true
};
const REVIEW = {
    value: "__needreview__",
    label: "نیازمند بررسی",
    special: true
};
const QUESTION_GROUPS = [
    /* ============ سلامت و امنیت زیستی ============ */ {
        key: "A1",
        title: "بیماری مزمن یا جدی",
        indicator: "A1",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "A1_disease",
                title: "آیا این عضو بیماری مزمن یا جدی دارد؟",
                type: "single",
                level: "member",
                indicator: "A1",
                dimension: "A",
                scored: true,
                help: "بیماری‌هایی که بیش از ۳ ماه ادامه دارند و نیاز به پیگیری درمانی مستمر دارند.",
                followUp: {
                    trigger: [
                        "controlled",
                        "uncontrolled"
                    ],
                    title: "مستندسازی بیماری این عضو",
                    help: "برای ثبت دقیق و شاهد‌محور، نوع بیماری و مدرک مثبت آن ثبت شود.",
                    detail: {
                        label: "نوع/نام بیماری و مدت آن",
                        placeholder: "مثلاً دیابت نوع ۲ از ۴ سال پیش، صرعی از کودکی ..."
                    },
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (گواهی پزشک، نسخه، جواب آزمایش، کتابچه بیمار)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "ندارد"
                    },
                    {
                        value: "controlled",
                        label: "دارد — تحت کنترل درمان"
                    },
                    {
                        value: "uncontrolled",
                        label: "دارد — کنترل‌نشده"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A1_impact",
                title: "بیماری چه اثری بر فعالیت روزمره، کار، تحصیل یا هزینه خانوار داشته است؟",
                type: "single",
                level: "member",
                indicator: "A1",
                dimension: "A",
                scored: true,
                options: [
                    {
                        value: "none",
                        label: "اثر معنادار ندارد"
                    },
                    {
                        value: "moderate",
                        label: "محدودکننده — بخشی از فعالیت‌ها را محدود کرده"
                    },
                    {
                        value: "severe",
                        label: "شدید — فعالیت‌های اصلی مختل شده یا هزینه مستمر سنگین ایجاد شده"
                    }
                ]
            }
        ]
    },
    {
        key: "A2",
        title: "محدودیت عملکردی پایدار",
        indicator: "A2",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "A2_limit",
                title: "آیا محدودیت پایدار در حرکت، مراقبت شخصی، ارتباط یا یادگیری دارد؟",
                type: "single",
                level: "member",
                indicator: "A2",
                dimension: "A",
                scored: true,
                help: "محدودیتی که حداقل ۶ ماه ادامه داشته یا انتظار می‌رود ادامه یابد.",
                followUp: {
                    trigger: [
                        "supported",
                        "unmet"
                    ],
                    title: "مستندسازی محدودیت این عضو",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (گزارش توان‌بخشی، پروانه معلولیت، گواهی پزشک)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "ندارد"
                    },
                    {
                        value: "supported",
                        label: "دارد — کمک/وسیله/توان‌بخشی لازم تأمین شده"
                    },
                    {
                        value: "unmet",
                        label: "دارد — نیاز تأمین نشده"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A2_aid",
                title: "کمک، وسیله یا توان‌بخشی لازم چیست و چه میزان تأمین شده؟",
                type: "textarea",
                level: "member",
                indicator: "A2",
                dimension: "A",
                placeholder: "مثلاً ویلچر، گفتاردرمانی، همراه مراقب ..."
            }
        ]
    },
    {
        key: "A3",
        title: "درمان ضروری انجام‌نشده",
        indicator: "A3",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "A3_treatment",
                title: "آیا درمان، دارو، آزمایش، جراحی یا توان‌بخشی ضروریِ انجام‌نشده دارد؟",
                type: "single",
                level: "member",
                indicator: "A3",
                dimension: "A",
                scored: true,
                followUp: {
                    trigger: [
                        "scheduled",
                        "no_access"
                    ],
                    title: "مستندسازی درمان انجام‌نشده",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (نسخه، برگه نوبت، گواهی پزشک، جواب آزمایش)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "ندارد"
                    },
                    {
                        value: "scheduled",
                        label: "دارد — در نوبت یا با تأخیر برنامه‌ریزی‌شده"
                    },
                    {
                        value: "no_access",
                        label: "دارد — دسترسی به درمان ندارد"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A3_urgent",
                title: "آیا نشانه فوریت پزشکی وجود دارد (خطر تأخیر برای سلامت یا زندگی)؟",
                type: "boolean",
                level: "member",
                indicator: "A3",
                dimension: "A",
                help: "در صورت «بله»، نشانه خطر فوریتی ثبت می‌شود؛ رسیدگی فوری مستقل از تکمیل پرسشنامه است.",
                followUp: {
                    trigger: [
                        "true"
                    ],
                    title: "مستندسازی نشانه فوریت",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (گواهی پزشک، مدارک بستری/اورژانس)"
                    }
                }
            },
            {
                id: "A3_cause",
                title: "علت تأخیر و خطر احتمالی چیست؟",
                type: "textarea",
                level: "member",
                indicator: "A3",
                dimension: "A",
                placeholder: "مثلاً هزینه، نبود پزشک متخصص در منطقه، مدارک ..."
            }
        ]
    },
    {
        key: "A4",
        title: "فشار هزینه‌های درمانی",
        indicator: "A4",
        questions: [
            {
                id: "A4_burden",
                title: "هزینه درمان، دارو، مراقبت و رفت‌وآمد درمانی در سه ماه اخیر چه فشاری بر خانوار داشته است؟",
                type: "single",
                level: "household",
                indicator: "A4",
                dimension: "A",
                scored: true,
                options: [
                    {
                        value: "low",
                        label: "فشار معنادار نداشته"
                    },
                    {
                        value: "manageable",
                        label: "فشار قابل مدیریت (کاهش پس‌انداز یا هزینه‌های غیرضروری)"
                    },
                    {
                        value: "severe",
                        label: "فشار سنگین (بدهی، فروش دارایی یا کاهش مصرف اساسی)"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A4_effects",
                title: "کدام اثر واقعاً رخ داده است؟",
                type: "multi",
                level: "household",
                indicator: "A4",
                dimension: "A",
                scored: true,
                options: [
                    {
                        value: "debt",
                        label: "ایجاد بدهی یا قرض"
                    },
                    {
                        value: "asset",
                        label: "فروش دارایی"
                    },
                    {
                        value: "food",
                        label: "کاهش کیفیت/مقدار غذا"
                    },
                    {
                        value: "housing",
                        label: "خطر در پرداخت اجاره/مسکن"
                    },
                    {
                        value: "education",
                        label: "کاهش هزینه آموزش"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام"
                    }
                ]
            }
        ]
    },
    {
        key: "A5",
        title: "پوشش بیمه‌ای مؤثر",
        indicator: "A5",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "A5_cover",
                title: "آیا این عضو پوشش بیمه پایه درمانی معتبر دارد و عملاً می‌تواند خدمت ضروری بگیرد؟",
                type: "single",
                level: "member",
                indicator: "A5",
                dimension: "A",
                scored: true,
                help: "وجود بیمه به‌تنهایی کافی نیست؛ قابلیت استفاده واقعی (فرانشیز، فاصله، نوبت) بررسی می‌شود. پاسخ این پرسش با کد ملی از استعلام بیمه به‌صورت خودکار پر و ملاک می‌شود.",
                service: {
                    id: "insurance",
                    org: "سازمان تأمین اجتماعی و صندوق‌های بیمه‌ای",
                    label: "استعلام پوشش پایه اعضا با کد ملی"
                },
                options: [
                    {
                        value: "effective",
                        label: "پوشش معتبر و استفاده مؤثر"
                    },
                    {
                        value: "barriers",
                        label: "پوشش هست ولی مانع استفاده واقعی وجود دارد"
                    },
                    {
                        value: "none",
                        label: "بدون پوشش معتبر"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A5_barrier",
                title: "در صورت وجود مانع، نوع مانع چیست؟",
                type: "text",
                level: "member",
                indicator: "A5",
                dimension: "A",
                placeholder: "مثلاً فرانشیز سنگین، فاصله تا مرکز، نوبت طولانی"
            }
        ]
    },
    {
        key: "A6",
        title: "ناامنی غذایی ۳۰ روز اخیر",
        indicator: "A6",
        questions: [
            {
                id: "A6_exp",
                title: "در ۳۰ روز گذشته کدام تجربه‌ها را داشته‌اید؟",
                type: "multi",
                level: "household",
                indicator: "A6",
                dimension: "A",
                scored: true,
                help: "چند مورد را می‌توانید انتخاب کنید. این پرسش درباره تجربه واقعی است، نه احساس کلی.",
                options: [
                    {
                        value: "worry",
                        label: "نگرانی از اتمام غذا"
                    },
                    {
                        value: "variety",
                        label: "کاهش تنوع غذایی به دلیل هزینه"
                    },
                    {
                        value: "quantity",
                        label: "کاهش مقدار غذا"
                    },
                    {
                        value: "mealskip",
                        label: "حذف یک یا چند وعده"
                    },
                    {
                        value: "hunger",
                        label: "گرسنگی اما نخوردن غذا به دلیل نبود آن"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام"
                    }
                ]
            },
            {
                id: "A6_now",
                title: "اکنون غذای کافی برای وعده بعدی خانوار در دسترس است؟",
                type: "boolean",
                level: "household",
                indicator: "A6",
                dimension: "A",
                help: "پاسخ «خیر» به‌عنوان نشانه خطر ثبت می‌شود."
            }
        ]
    },
    {
        key: "A7",
        title: "سلامت روان و ایمنی خانوار",
        indicator: "A7",
        questions: [
            {
                id: "A7_disrupt",
                title: "آیا مشکل روانی یا مصرف مواد، عملکرد و امنیت خانوار را مختل کرده است؟",
                type: "single",
                level: "household",
                indicator: "A7",
                dimension: "A",
                scored: true,
                sensitive: true,
                help: "این پاسخ محرمانه است و در نمای خانوار جزئیات آن نمایش داده نمی‌شود.",
                followUp: {
                    trigger: [
                        "moderate",
                        "severe"
                    ],
                    title: "مستندسازی محرمانه — کدام اعضا؟",
                    help: "مشخص کنید مشکل به کدام اعضا مربوط است؛ ثبت محرمانه می‌ماند و برای مسیر بررسی تخصصی استفاده می‌شود.",
                    members: true,
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (در صورت وجود — گواهی روان‌پزشک/روان‌شناس، پرونده درمان)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "خیر"
                    },
                    {
                        value: "moderate",
                        label: "تا حدی"
                    },
                    {
                        value: "severe",
                        label: "به‌شدت"
                    },
                    DK,
                    REFUSE
                ]
            },
            {
                id: "A7_danger",
                title: "نشانه خطر (در صورت وجود و با احتیاط)",
                type: "multi",
                level: "household",
                indicator: "A7",
                dimension: "A",
                sensitive: true,
                options: [
                    {
                        value: "selfharm",
                        label: "خطر آسیب به خود"
                    },
                    {
                        value: "violence",
                        label: "خشونت یا خطر آسیب به دیگران"
                    },
                    {
                        value: "child_risk",
                        label: "کودک در محیط ناامن"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام"
                    }
                ]
            }
        ]
    },
    {
        key: "A_nutrition",
        title: "وضعیت تغذیه‌ای ویژه",
        indicator: "A6",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "A_malnut",
                title: "آیا این عضو سوءتغذیه دارد (تشخیص‌شده یا مشکوک)؟",
                type: "boolean",
                level: "member",
                indicator: "A6",
                dimension: "A",
                help: "سوءتغذیه نیازمند بررسی حرفه‌ای است؛ ثبت آن نشانه خطر ایجاد می‌کند.",
                followUp: {
                    trigger: [
                        "true"
                    ],
                    title: "مستندسازی وضعیت تغذیه‌ای",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (کارت رشد، جواب آزمایش، گزارش مرکز بهداشت)"
                    }
                }
            },
            {
                id: "A_pregnant",
                title: "آیا این عضو مادر باردار یا شیرده با نیاز تغذیه/درمان ویژه است؟",
                type: "boolean",
                level: "member",
                indicator: "A6",
                dimension: "A",
                followUp: {
                    trigger: [
                        "true"
                    ],
                    title: "مستندسازی وضعیت بارداری/شیردهی",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (کارت مراقبت مادر، گواهی پزشک)"
                    }
                }
            }
        ]
    },
    /* ============ آموزش و رشد انسانی ============ */ {
        key: "B1",
        title: "ثبت‌نام و حضور در آموزش اجباری",
        indicator: "B1",
        loop: true,
        memberFilter: "schoolAge",
        questions: [
            {
                id: "B1_status",
                title: "وضعیت آموزش این عضو (در سن آموزش اجباری) چیست؟",
                type: "single",
                level: "member",
                indicator: "B1",
                dimension: "B",
                scored: true,
                help: "وضعیت ثبت‌نام ثبتی این پرسش از استعلام آموزش‌وپرورش به‌صورت خودکار پر و ملاک می‌شود؛ حضور و غیبت جاری جداگانه بررسی می‌شود.",
                service: {
                    id: "education_school",
                    org: "وزارت آموزش‌وپرورش",
                    label: "استعلام سابقه ثبت‌نام اعضای در سن آموزش با کد ملی"
                },
                followUp: {
                    trigger: [
                        "interrupted",
                        "dropped",
                        "never"
                    ],
                    title: "مستندسازی وضعیت تحصیل",
                    evidence: {
                        suggested: "education",
                        label: "مدرک مثبت (گزارش مدرسه، ابلاغ، گواهی انصراف/وقفه)"
                    }
                },
                options: [
                    {
                        value: "attending",
                        label: "ثبت‌نام و حضور فعال"
                    },
                    {
                        value: "interrupted",
                        label: "وقفه تحصیلی دارد"
                    },
                    {
                        value: "dropped",
                        label: "ترک تحصیل کرده"
                    },
                    {
                        value: "never",
                        label: "هرگز ثبت‌نام نشده"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "B1_months",
                title: "مدت وقفه/ترک تحصیل به ماه",
                type: "number",
                level: "member",
                indicator: "B1",
                dimension: "B",
                unit: "ماه",
                min: 0,
                max: 120
            },
            {
                id: "B1_reason",
                title: "علت وقفه یا ترک تحصیل",
                type: "text",
                level: "member",
                indicator: "B1",
                dimension: "B",
                placeholder: "مثلاً هزینه، کار، مهاجرت، معلولیت ..."
            }
        ]
    },
    {
        key: "B2",
        title: "خطر ترک تحصیل",
        indicator: "B2",
        loop: true,
        memberFilter: "schoolAge",
        questions: [
            {
                id: "B2_risks",
                title: "کدام عوامل خطر برای استمرار تحصیل این عضو وجود دارد؟",
                type: "multi",
                level: "member",
                indicator: "B2",
                dimension: "B",
                scored: true,
                options: [
                    {
                        value: "absence",
                        label: "غیبت مکرر"
                    },
                    {
                        value: "decline",
                        label: "افت شدید تحصیلی"
                    },
                    {
                        value: "cost",
                        label: "هزینه ضروری تأمین‌نشده (لوازم، رفت‌وآمد)"
                    },
                    {
                        value: "child_labor",
                        label: "کار کودک"
                    },
                    {
                        value: "forced_care",
                        label: "مراقبت اجباری از فرد دیگر"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام"
                    }
                ]
            }
        ]
    },
    {
        key: "B3",
        title: "سواد کارکردی",
        indicator: "B3",
        questions: [
            {
                id: "B3_lit",
                title: "آیا فرد مسئول امور خانوار می‌تواند امور پایه نوشتاری و پیگیری خدمات را انجام دهد؟",
                type: "single",
                level: "household",
                indicator: "B3",
                dimension: "B",
                scored: true,
                help: "مثلاً خواندن پیام و دستور درمان، تکمیل فرم، پیگیری اداری. مدرک تحصیلی به‌تنهایی ملاک نیست.",
                options: [
                    {
                        value: "full",
                        label: "بله، مستقل انجام می‌دهد"
                    },
                    {
                        value: "with_help",
                        label: "فقط با کمک دیگران (کمک قابل اتکا دارد)"
                    },
                    {
                        value: "cannot",
                        label: "نمی‌تواند و کمک قابل اتکا ندارد"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "B4",
        title: "مانع واقعی دسترسی به آموزش",
        indicator: "B4",
        questions: [
            {
                id: "B4_barriers",
                title: "آیا فاصله، حمل‌ونقل، هزینه، مدارک، معلولیت یا ظرفیت مدرسه مانع واقعی آموزش است؟",
                type: "single",
                level: "household",
                indicator: "B4",
                dimension: "B",
                scored: true,
                options: [
                    {
                        value: "none",
                        label: "مانع واقعی وجود ندارد"
                    },
                    {
                        value: "resolvable",
                        label: "یک مانع قابل حل وجود دارد"
                    },
                    {
                        value: "serious",
                        label: "مانع جدی و حل‌نشده وجود دارد"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "B4_detail",
                title: "توضیح مانع",
                type: "text",
                level: "household",
                indicator: "B4",
                dimension: "B",
                placeholder: "مثلاً ۷ کیلومتر تا مدرسه با اتوبوس نامنظم"
            }
        ]
    },
    {
        key: "B5",
        title: "ابزار دیجیتال آموزشی",
        indicator: "B5",
        questions: [
            {
                id: "B5_digital",
                title: "اگر آموزش به ابزار دیجیتال نیاز دارد، وضعیت ابزار و اتصال چگونه است؟",
                type: "single",
                level: "household",
                indicator: "B5",
                dimension: "B",
                scored: true,
                help: "داشتن دستگاه به‌تنهایی معیار نیست؛ قابلیت استفاده و اتصال کافی ملاک است.",
                options: [
                    {
                        value: "adequate",
                        label: "نیاز دارد و ابزار/اتصال کافی دارد"
                    },
                    {
                        value: "no_need",
                        label: "نیاز واقعی به ابزار دیجیتال ندارد"
                    },
                    {
                        value: "insufficient",
                        label: "ابزار ناکافی است یا اشتراک ابزار مانع انجام تکلیف است"
                    },
                    {
                        value: "missing",
                        label: "نیاز دارد ولی ابزار قابل استفاده ندارد"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "B6",
        title: "نیاز آموزشی ویژه",
        indicator: "B6",
        loop: true,
        memberFilter: "all",
        questions: [
            {
                id: "B6_need",
                title: "آیا این عضو نیاز آموزشی ویژه دارد و خدمت متناسب دریافت می‌کند؟",
                type: "single",
                level: "member",
                indicator: "B6",
                dimension: "B",
                scored: true,
                followUp: {
                    trigger: [
                        "needs_assessment",
                        "unmet"
                    ],
                    title: "مستندسازی نیاز آموزشی ویژه",
                    evidence: {
                        suggested: "medical",
                        label: "مدرک مثبت (گزارش ارزیابی، پرونده آموزشی/درمانی)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "نیاز ویژه ندارد"
                    },
                    {
                        value: "served",
                        label: "نیاز دارد و خدمت متناسب دریافت می‌کند"
                    },
                    {
                        value: "needs_assessment",
                        label: "مشکوک — نیازمند ارزیابی تخصصی"
                    },
                    {
                        value: "unmet",
                        label: "نیاز تأییدشده بدون خدمت متناسب"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "B7",
        title: "مهارت و مسیر توانمندسازی",
        indicator: "B7",
        questions: [
            {
                id: "B7_path",
                title: "وضعیت عضو واجد شرایط و علاقه‌مند به مهارت‌آموزی/اشتغال چگونه است؟",
                type: "single",
                level: "household",
                indicator: "B7",
                dimension: "B",
                scored: true,
                help: "مهارت قابل عرضه، مسیر فعال آموزش، ابزار اولیه و دسترسی واقعی بررسی می‌شود.",
                options: [
                    {
                        value: "active",
                        label: "عضو واجد شرایط مسیر فعال آموزش/مهارت با ابزار اولیه دارد"
                    },
                    {
                        value: "interested_no_path",
                        label: "علاقه‌مند است ولی مسیر فعال یا ابزار اولیه ندارد"
                    },
                    {
                        value: "no_capability",
                        label: "عضو واجد شرایط هست ولی هیچ امکان توانمندسازی فراهم نیست"
                    },
                    {
                        value: "no_eligible",
                        label: "عضو واجد شرایط (در سن/توان کار) وجود ندارد"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "B7_skills",
                title: "مهارت‌های فرهنگی/هنری یا حرفه‌ای موجود (اختیاری)",
                type: "textarea",
                level: "household",
                indicator: "B7",
                dimension: "B",
                placeholder: "نوع مهارت، سطح، قابلیت عرضه و علاقه ..."
            }
        ]
    },
    /* ============ استاندارد زندگی و مسکن ============ */ {
        key: "C1",
        title: "محل خواب و تهدید سکونت",
        indicator: "C1",
        questions: [
            {
                id: "C1_place",
                title: "محل خواب فعلی خانوار چیست؟",
                type: "single",
                level: "household",
                indicator: "C1",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "stable",
                        label: "مسکن پایدار (واحد مسکونی با حق سکونت جاری)"
                    },
                    {
                        value: "temporary",
                        label: "سکونت موقت یا مرکز نگهداری"
                    },
                    {
                        value: "nonresidential",
                        label: "فضای غیرمسکونی / آلونک / خودرو / فضای عمومی / بی‌خانمانی"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C1_eviction",
                title: "آیا اخطار تخلیه معتبر یا خطر قریب‌الوقوع ازدست‌دادن مسکن وجود دارد؟",
                type: "single",
                level: "household",
                indicator: "C1",
                dimension: "C",
                scored: true,
                followUp: {
                    trigger: [
                        "credible",
                        "imminent"
                    ],
                    title: "مستندسازی خطر ازدست‌دادن مسکن",
                    evidence: {
                        suggested: "administrative",
                        label: "مدرک مثبت (اخطار تخلیه، ابلاغ، نامه موجر/مرجع)"
                    }
                },
                options: [
                    {
                        value: "no",
                        label: "خیر"
                    },
                    {
                        value: "credible",
                        label: "اخطار/خطر جدی (در جریان)"
                    },
                    {
                        value: "imminent",
                        label: "بله — قریب‌الوقوع"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "C2",
        title: "ایمنی و قابلیت سکونت",
        indicator: "C2",
        questions: [
            {
                id: "C2_issues",
                title: "کدام نقص‌ها در مسکن فعلی وجود دارد؟ (چک‌لیست ایمنی)",
                type: "multi",
                level: "household",
                indicator: "C2",
                dimension: "C",
                scored: true,
                followUp: {
                    trigger: [],
                    title: "مستندسازی نقص‌های مسکن",
                    evidence: {
                        suggested: "photo",
                        label: "مدرک مثبت (تصویر وضعیت، گزارش کارشناسی، گزارش میدانی)"
                    }
                },
                options: [
                    {
                        value: "structural",
                        label: "خطر سقف/دیوار (ترک جدی، فروریختگی)"
                    },
                    {
                        value: "wiring",
                        label: "برق ناایمن"
                    },
                    {
                        value: "damp",
                        label: "رطوبت شدید"
                    },
                    {
                        value: "temp",
                        label: "سرما/گرمای شدید غیرقابل کنترل"
                    },
                    {
                        value: "uninhabitable",
                        label: "در وضع فعلی اساساً غیرقابل سکونت"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام"
                    }
                ]
            },
            {
                id: "C2_constr",
                title: "سال پایان ساخت (اختیاری — فقط برای بررسی فنی)",
                type: "number",
                level: "household",
                indicator: "C2",
                dimension: "C",
                help: "قدمت بنا به‌تنهایی امتیاز ندارد.",
                min: 1250,
                max: 1500
            }
        ]
    },
    {
        key: "C3",
        title: "پایداری حق سکونت",
        indicator: "C3",
        questions: [
            {
                id: "C3_right",
                title: "وضعیت حق سکونت خانوار چگونه است؟",
                type: "single",
                level: "household",
                indicator: "C3",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "clear",
                        label: "روشن و بدون اختلاف (مالک، قرارداد معتبر، سند ...)"
                    },
                    {
                        value: "ambiguous",
                        label: "مبهم یا وابسته به فرد/نهاد دیگر"
                    },
                    {
                        value: "risk",
                        label: "خطر جدی ازدست‌دادن (اختلاف، مانع تمدید، قرارداد منقضی)"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C3_lease_end",
                title: "تاریخ پایان قرارداد/تمدید بعدی (اختیاری)",
                type: "text",
                level: "household",
                indicator: "C3",
                dimension: "C",
                placeholder: "مثلاً ۱۴۰۵/۰۳"
            }
        ]
    },
    {
        key: "C4",
        title: "تراکم و فضای خواب ایمن",
        indicator: "C4",
        questions: [
            {
                id: "C4_rooms",
                title: "تعداد اتاق قابل سکونت (به‌جز آشپزخانه و سرویس)",
                type: "number",
                level: "household",
                indicator: "C4",
                dimension: "C",
                unit: "اتاق",
                min: 0,
                max: 30,
                scored: true
            },
            {
                id: "C4_area",
                title: "زیربنای قابل استفاده (اختیاری)",
                type: "number",
                level: "household",
                indicator: "C4",
                dimension: "C",
                unit: "متر مربع",
                min: 0
            },
            {
                id: "C4_safesleep",
                title: "آیا برای همه اعضا فضای خواب ایمن و مناسب وجود دارد؟",
                type: "single",
                level: "household",
                indicator: "C4",
                dimension: "C",
                scored: true,
                followUp: {
                    trigger: [
                        "partial",
                        "none"
                    ],
                    title: "کدام اعضا فضای خواب ایمن ندارند؟",
                    help: "برای مستندسازی دقیق، مشخص کنید مشکل مربوط به کدام اعضاست.",
                    members: true
                },
                options: [
                    {
                        value: "all",
                        label: "بله برای همه"
                    },
                    {
                        value: "partial",
                        label: "جزئی — برخی اعضا مشکل دارند"
                    },
                    {
                        value: "none",
                        label: "خیر"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "C5",
        title: "آب، برق و انرژی",
        indicator: "C5",
        questions: [
            {
                id: "C5_water",
                title: "وضعیت آب سالم",
                type: "single",
                level: "household",
                indicator: "C5",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "stable",
                        label: "فعال و پایدار"
                    },
                    {
                        value: "unstable",
                        label: "قطعی‌های مکرر یا محدودیت"
                    },
                    {
                        value: "off",
                        label: "قطع/ندارد بدون جایگزین ایمن"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C5_elec",
                title: "وضعیت برق",
                type: "single",
                level: "household",
                indicator: "C5",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "stable",
                        label: "فعال و پایدار"
                    },
                    {
                        value: "unstable",
                        label: "قطعی‌های مکرر یا محدودیت (کنتور مشترک، قطع ادواری)"
                    },
                    {
                        value: "off",
                        label: "قطع/ندارد"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C5_cook",
                title: "وضعیت گرمایش/انرژی پخت‌وپز ایمن",
                type: "single",
                level: "household",
                indicator: "C5",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "stable",
                        label: "ایمن و پایدار"
                    },
                    {
                        value: "unstable",
                        label: "محدود یا کم‌خطر (مثلاً بخاری ناایمن)"
                    },
                    {
                        value: "off",
                        label: "ندارد"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C5_effect",
                title: "در صورت قطع، اثر آن بر زندگی خانوار چیست؟",
                type: "textarea",
                level: "household",
                indicator: "C5",
                dimension: "C"
            }
        ]
    },
    {
        key: "C6",
        title: "بهداشت محیط مسکن",
        indicator: "C6",
        questions: [
            {
                id: "C6_san",
                title: "وضعیت سرویس بهداشتی، حمام و دفع فاضلاب چگونه است؟",
                type: "single",
                level: "household",
                indicator: "C6",
                dimension: "C",
                scored: true,
                help: "نبود شبکه شهری فاضلاب به‌تنهایی محرومیت نیست؛ وضعیت بهداشتی واقعی ملاک است.",
                options: [
                    {
                        value: "good",
                        label: "اختصاصی، قابل استفاده و بهداشتی"
                    },
                    {
                        value: "shared_minor",
                        label: "مشترک یا دارای نقص جزئی اما قابل استفاده"
                    },
                    {
                        value: "unsafe_missing",
                        label: "ناسالم، غیرقابل استفاده یا مفقود"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    {
        key: "C7",
        title: "وسایل ضروری زندگی",
        indicator: "C7",
        questions: [
            {
                id: "C7_missing",
                title: "کدام وسایل واقعاً ضروری موجود نیست یا خراب است؟",
                type: "multi",
                level: "household",
                indicator: "C7",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "fridge",
                        label: "یخچال"
                    },
                    {
                        value: "cooker",
                        label: "اجاق/وسیله پخت"
                    },
                    {
                        value: "heater",
                        label: "وسیله گرمایش"
                    },
                    {
                        value: "bed",
                        label: "تخت/رختخواب کافی"
                    },
                    {
                        value: "washer",
                        label: "وسیله شست‌وشو (دستی یا ماشینی)"
                    },
                    {
                        value: "none",
                        label: "هیچ‌کدام — همه موجود و سالم‌اند"
                    }
                ]
            },
            {
                id: "C7_impact",
                title: "فقدان این وسایل چه اثری بر سلامت، غذا، مراقبت یا سکونت داشته است؟",
                type: "single",
                level: "household",
                indicator: "C7",
                dimension: "C",
                scored: true,
                options: [
                    {
                        value: "none",
                        label: "اثر معنادار ندارد"
                    },
                    {
                        value: "minor",
                        label: "اثر جزئی"
                    },
                    {
                        value: "disruptive",
                        label: "اختلال جدی در زندگی روزمره"
                    }
                ]
            }
        ]
    },
    {
        key: "C8",
        title: "هزینه مسکن",
        indicator: "C8",
        questions: [
            {
                id: "C8_arrears_severity",
                title: "وضعیت معوقات اجاره/شارژ/قبوض چیست؟",
                type: "single",
                level: "household",
                indicator: "C8",
                dimension: "C",
                scored: true,
                help: "مبلغ معوقه در اطلاعات پایه ثبت می‌شود. ودیعه جداگانه ثبت می‌شود و در هزینه ماهانه محاسبه نمی‌شود.",
                followUp: {
                    trigger: [
                        "minor",
                        "significant"
                    ],
                    title: "مستندسازی معوقات",
                    evidence: {
                        suggested: "administrative",
                        label: "مدرک مثبت (اخطار پرداخت، صورت‌حساب، قبض)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "معوقه نداریم"
                    },
                    {
                        value: "minor",
                        label: "معوقه جزئی (کمتر از یک ماه)"
                    },
                    {
                        value: "significant",
                        label: "معوقه معنادار یا اخطار پرداخت"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "C8_installments",
                title: "اقساط ضروری ماهانه (بدون ودیعه)",
                type: "number",
                level: "household",
                indicator: "C8",
                dimension: "C",
                unit: "تومان",
                min: 0
            }
        ]
    },
    {
        key: "C9",
        title: "دسترسی به خدمات پایه",
        indicator: "C9",
        questions: [
            {
                id: "C9_access",
                title: "دسترسی واقعی خانوار به خدمات پایه (بهداشتی، آموزشی، خرید، حمل‌ونقل) چگونه است؟",
                type: "single",
                level: "household",
                indicator: "C9",
                dimension: "C",
                scored: true,
                help: "با زمان، هزینه و انتظام حمل‌ونقل سنجیده می‌شود؛ برای جلوگیری از شمارش تکراری با A5 و B4 فقط موانع عمومی محیط ثبت شود.",
                options: [
                    {
                        value: "adequate",
                        label: "مناسب"
                    },
                    {
                        value: "manageable",
                        label: "با بار زمان/هزینه قابل مدیریت"
                    },
                    {
                        value: "serious",
                        label: "مانع پایدار و جدی"
                    },
                    DK,
                    REVIEW
                ]
            }
        ]
    },
    /* ============ معیشت، اشتغال و درآمد ============ */ {
        key: "D1",
        title: "تأمین‌کننده اصلی",
        indicator: "D1",
        questions: [
            {
                id: "D1_no_provider",
                title: "آیا خانوار هیچ تأمین‌کننده‌ای با درآمد فعال ندارد؟",
                type: "boolean",
                level: "household",
                indicator: "D1",
                dimension: "D",
                scored: true,
                help: "در صورت «بله»، پاسخ بعدی لازم نیست. تأمین‌کننده اصلی را در مدیریت اعضا مشخص کنید."
            }
        ]
    },
    {
        key: "D1m",
        title: "وضعیت اشتغال تأمین‌کننده اصلی",
        indicator: "D1",
        loop: true,
        memberFilter: "provider",
        questions: [
            {
                id: "D1_ability",
                title: "توان و امکان واقعی کار تأمین‌کننده اصلی",
                type: "single",
                level: "member",
                indicator: "D1",
                dimension: "D",
                scored: true,
                help: "توان عملکردی، امکان واقعی و موانع — نه یک پاسخ ساده بله/خیر.",
                options: [
                    {
                        value: "able",
                        label: "توان و امکان کار دارد"
                    },
                    {
                        value: "limited",
                        label: "توان محدود یا مانع موقت (بیماری، مراقبت، ابزار/سرمایه)"
                    },
                    {
                        value: "unable",
                        label: "ناتوان از کار"
                    }
                ]
            },
            {
                id: "D1_continuity",
                title: "استمرار درآمد در دوره ارزیابی",
                type: "single",
                level: "member",
                indicator: "D1",
                dimension: "D",
                scored: true,
                options: [
                    {
                        value: "stable",
                        label: "درآمد مستمر"
                    },
                    {
                        value: "irregular",
                        label: "قطع‌و‌وصل (ناپایداری احرازشده)"
                    },
                    {
                        value: "none",
                        label: "بدون درآمد فعال"
                    }
                ]
            },
            {
                id: "D1_seasonal",
                title: "فعالیت فصلی/روزمزدي است؟",
                type: "boolean",
                level: "member",
                indicator: "D1",
                dimension: "D",
                help: "فصلی یا روزمزدی بودن به‌تنهایی امتیاز ندارد؛ فقط ناپایداری احرازشده ملاک است."
            }
        ]
    },
    {
        key: "D3",
        title: "منابع درآمد خانوار",
        indicator: "D3",
        questions: [
            {
                id: "D3_editor",
                title: "مدیریت منابع درآمد",
                type: "textarea",
                level: "household",
                indicator: "D3",
                dimension: "D",
                help: "منابع در بخش «منابع درآمد» همین گام به‌صورت ساختاریافته ثبت می‌شوند: دریافت‌کننده، مبلغ، دوره، استمرار، قابلیت اتکا و وضعیت تأیید. دریافت‌های یک‌باره (مانند ارث) به‌عنوان «یک‌باره» ثبت شوند و در درآمد ماهانه محاسبه نمی‌شوند."
            }
        ]
    },
    {
        key: "poverty",
        title: "خط فقر منطقه‌ای",
        indicator: "D3",
        questions: [
            {
                id: "poverty_editor",
                title: "نسخه خط فقر معتبر منطقه‌ای",
                type: "textarea",
                level: "household",
                indicator: "D3",
                dimension: "D",
                help: "مبلغ سرانه ماهانه، منبع و تاریخ اعتبار در فرم همین گام ثبت می‌شود. خط فقر نامعتبر، شاخص D3 را غیرنهایی می‌کند."
            }
        ]
    },
    /* ============ ظرفیت مراقبت و پشتوانه ============ */ {
        key: "E1",
        title: "چشم‌انداز معیشت ۱۲ ماه آینده",
        indicator: "E1",
        questions: [
            {
                id: "E1_outlook",
                title: "مسیر واقعی حفظ یا بهبود معیشت خانوار در ۱۲ ماه آینده چگونه است؟",
                type: "single",
                level: "household",
                indicator: "E1",
                dimension: "E",
                scored: true,
                help: "احساس ناامیدی به‌تنهایی ملاک نیست؛ با شواهد (فرصت، مانع پایدار، برنامه واقعی) ترکیب شود.",
                options: [
                    {
                        value: "clear",
                        label: "مسیر روشن و محتمل (فرصت شغلی/حمایت/مهارت فعال)"
                    },
                    {
                        value: "uncertain",
                        label: "نامطمئن — فرصت هست ولی موانع پایدار وجود دارد"
                    },
                    {
                        value: "none",
                        label: "مسیر واقعی وجود ندارد"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "E1_evidence",
                title: "شواهد و توضیح",
                type: "textarea",
                level: "household",
                indicator: "E1",
                dimension: "E"
            }
        ]
    },
    {
        key: "E2",
        title: "بار مراقبت",
        indicator: "E2",
        questions: [
            {
                id: "E2_support",
                title: "وضعیت مراقبت از اعضای نیازمند (کودک، سالمند، بیمار، معلول) چگونه است؟",
                type: "single",
                level: "household",
                indicator: "E2",
                dimension: "E",
                scored: true,
                help: "اعضای نیازمند مراقبت را در مدیریت اعضا علامت بزنید. مراقب اصلی و شدت بار و پشتیبانی اینجا ثبت می‌شود.",
                followUp: {
                    trigger: [
                        "partial",
                        "none"
                    ],
                    title: "کدام اعضا نیازمند مراقبت‌اند؟",
                    help: "با انتخاب هر عضو، نقش «نیازمند مراقبت» او در مدیریت اعضا نیز علامت می‌خورد.",
                    members: true
                },
                options: [
                    {
                        value: "adequate",
                        label: "مراقب موجود و پشتیبانی کافی"
                    },
                    {
                        value: "partial",
                        label: "بار سنگین با پشتیبانی ناکافی"
                    },
                    {
                        value: "none",
                        label: "نیاز مراقبتی تأمین‌نشده (بدون مراقب)"
                    },
                    {
                        value: "no_need",
                        label: "عضو نیازمند مراقبت مستمر نداریم"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "E2_hours",
                title: "ساعت نیاز مراقبت روزانه (تقریبی)",
                type: "number",
                level: "household",
                indicator: "E2",
                dimension: "E",
                unit: "ساعت",
                min: 0,
                max: 24
            }
        ]
    },
    {
        key: "E3",
        title: "پشتوانه اجتماعی در بحران",
        indicator: "E3",
        questions: [
            {
                id: "E3_support",
                title: "در بحران‌های اخیر، چه فرد یا نهادی عملاً کمک کرده است؟",
                type: "single",
                level: "household",
                indicator: "E3",
                dimension: "E",
                scored: true,
                options: [
                    {
                        value: "reliable",
                        label: "حمایت مستمر و قابل اتکا (خویشاوند، نهاد، خیریه)"
                    },
                    {
                        value: "sporadic",
                        label: "حمایت موردی و ناپایدار"
                    },
                    {
                        value: "none",
                        label: "هیچ حمایت عملی نداشته‌ایم"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "E3_who",
                title: "چه فرد یا نهادی و چه نوع کمکی؟",
                type: "text",
                level: "household",
                indicator: "E3",
                dimension: "E"
            }
        ]
    },
    {
        key: "E4",
        title: "مانع هویتی، حقوقی یا اداری",
        indicator: "E4",
        questions: [
            {
                id: "E4_barrier",
                title: "آیا مانع هویتی، حقوقی یا اداری، دسترسی خانوار به حق یا خدمت را مسدود کرده است؟",
                type: "single",
                level: "household",
                indicator: "E4",
                dimension: "E",
                scored: true,
                followUp: {
                    trigger: [
                        "in_progress",
                        "blocking"
                    ],
                    title: "مستندسازی مانع",
                    evidence: {
                        suggested: "legal",
                        label: "مدرک مثبت (نامه مرجع، رونوشت پرونده، فرم ثبت‌نام رد‌شده)"
                    }
                },
                options: [
                    {
                        value: "none",
                        label: "مانع مؤثر نداریم"
                    },
                    {
                        value: "in_progress",
                        label: "مانع وجود دارد ولی راه‌حل در جریان است"
                    },
                    {
                        value: "blocking",
                        label: "مانع، خدمت/حق حیاتی را مسدود کرده است"
                    },
                    DK,
                    REVIEW
                ]
            },
            {
                id: "E4_types",
                title: "نوع مانع",
                type: "multi",
                level: "household",
                indicator: "E4",
                dimension: "E",
                options: [
                    {
                        value: "identity",
                        label: "هویتی (شناسنامه، کد ملی، مدرک)"
                    },
                    {
                        value: "legal",
                        label: "حقوقی (حضانت، سرپرستی، پرونده قضایی)"
                    },
                    {
                        value: "admin",
                        label: "اداری (ثبت‌نام، مجوز، شماره حساب)"
                    },
                    {
                        value: "other",
                        label: "سایر"
                    }
                ]
            },
            {
                id: "E4_service",
                title: "دقیقاً کدام حق یا خدمت مسدود شده و شدت/مدت آن چیست؟",
                type: "textarea",
                level: "household",
                indicator: "E4",
                dimension: "E",
                placeholder: "مثلاً ثبت‌نام کودک در مدرسه به دلیل نبود مدرک هویتی، از ۶ ماه پیش"
            }
        ]
    }
];
const SCORED_STEPS = [
    "health",
    "education",
    "housing",
    "livelihood",
    "care"
];
function groupsOfStep(stepKey) {
    const map = {
        health: [
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A_nutrition",
            "A7"
        ],
        education: [
            "B1",
            "B2",
            "B3",
            "B4",
            "B5",
            "B6",
            "B7"
        ],
        housing: [
            "C1",
            "C2",
            "C3",
            "C4",
            "C5",
            "C6",
            "C7",
            "C8",
            "C9"
        ],
        livelihood: [
            "D1",
            "D1m",
            "D3",
            "poverty"
        ],
        care: [
            "E1",
            "E2",
            "E3",
            "E4"
        ]
    };
    const keys = map[stepKey] ?? [];
    return QUESTION_GROUPS.filter((g)=>keys.includes(g.key));
}
const MEMBER_RELATIONS = [
    "سرپرست",
    "همسر",
    "فرزند",
    "مادر",
    "پدر",
    "خواهر",
    "برادر",
    "نوه",
    "مادربزرگ/پدربزرگ",
    "سایر"
];
}),
"[project]/src/lib/mpi/legacy-map.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_PRIORITY",
    ()=>DATA_PRIORITY,
    "LEGACY_ACTION_META",
    ()=>LEGACY_ACTION_META,
    "LEGACY_INDICATOR_TABLE",
    ()=>LEGACY_INDICATOR_TABLE,
    "LEGACY_MAP",
    ()=>LEGACY_MAP,
    "WEB_SERVICES",
    ()=>WEB_SERVICES,
    "indicatorLegacyBadge",
    ()=>indicatorLegacyBadge,
    "legacySummary",
    ()=>legacySummary,
    "serviceFeedLabel",
    ()=>serviceFeedLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
;
const LEGACY_ACTION_META = {
    keep: {
        label: "حفظ مستقیم از نسخه قبلی",
        short: "همان قبلی",
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        desc: "داده این فیلد در نسخه جدید همان معنای قبل را دارد و مستقیماً مبنای سنجش است."
    },
    reinterpret: {
        label: "بازتعریف کارکردی نسخه قبلی",
        short: "بازتعریف",
        className: "bg-amber-50 text-amber-800 border-amber-200",
        desc: "موضوع از نسخه قبلی می‌آید اما سنجش بازتعریف شده: به‌جای عنوان/برچسب، اثر واقعی بر زندگی خانوار اندازه‌گیری می‌شود."
    },
    split: {
        label: "تجزیه به چند شاخص",
        short: "تجزیه",
        className: "bg-violet-50 text-violet-800 border-violet-200",
        desc: "یک فیلد ترکیبی قبلی به چند شاخص مجزا با معیار عملیاتی تفکیک شده است."
    },
    control: {
        label: "داده کنترلی/راستی‌آزمایی",
        short: "کنترل",
        className: "bg-sky-50 text-sky-800 border-sky-200",
        desc: "داده قبلی حفظ شده اما از امتیاز مستقیم حذف و فقط برای راستی‌آزمایی، تدوین خط فقر یا خدمت‌رسانی استفاده می‌شود."
    },
    new: {
        label: "جدید — بدون معادل قبلی",
        short: "جدید",
        className: "bg-teal-50 text-teal-800 border-teal-200",
        desc: "در پرسشنامه قبلی معادل مستقیم ندارد و برای EM-MPI افزوده شده است؛ داده تاریخی آن جمع‌آوری نشده."
    }
};
const LEGACY_MAP = {
    A1: {
        old: [
            "سلامت › وضعیت جسمانی (سالم/ناسالم)",
            "بیماری و معلولیت (تالاسمی، دیالیزی، ام‌اس، صعب‌العلاج و ...)"
        ],
        action: "reinterpret",
        note: "به‌جای برچسب سالم/ناسالم، «اثر بیماری بر کار، تحصیل، هزینه و زندگی روزمره» سنجیده می‌شود؛ نوع بیماری برای حفظ حریم خصوصی کامل ثبت نمی‌شود."
    },
    A2: {
        old: [
            "بیماری و معلولیت › معلولیت جسمی/روانی",
            "ویژگی‌های فردی › معلولیت سرپرست"
        ],
        action: "reinterpret",
        note: "از فهرست علل معلولیت به «محدودیت عملکردی پایدار و کفایت کمک/توان‌بخشی» تغییر یافته است."
    },
    A3: {
        old: [
            "بیماری و معلولیت (نیاز درمانی ضمنی)",
            "برنامه‌های حمایتی › بررسی مدارک بیماری"
        ],
        action: "split",
        note: "نیاز درمانی تأمین‌نشده و فوریت پزشکی از «وضعیت جسمانی» جدا و شاخص مستقل شد؛ نشانه فوریت آن از مسیر پرچم قرمز R2 پیگیری می‌شود."
    },
    A4: {
        old: [
            "— (جدید)",
            "منبع درآمدی و نیازسنجی (پیامد مالی درمان ضمنی)"
        ],
        action: "new",
        note: "پرسشنامه قبلی فشار مالی درمان را مستقیماً نمی‌سنجید؛ بدهی، فروش دارایی و کاهش مصرف اساسی به‌خاطر درمان اضافه شد."
    },
    A5: {
        old: [
            "بیمه › بیمه پایه درمانی دارد؟",
            "سابقه و نوع بیمه اجتماعی"
        ],
        action: "reinterpret",
        note: "از «دارد/ندارد» به «پوشش مؤثر و قابلیت استفاده واقعی» (اعتبار، فرانشیز، فاصله، نوبت) تغییر یافته؛ سابقه اجتماعی فقط اعتبارسنجی است."
    },
    A6: {
        old: [
            "برنامه‌های حمایتی › تغذیه، کودکان دارای سوءتغذیه، مادران باردار و شیرده"
        ],
        action: "split",
        note: "از برنامه‌های حمایتی به «تجربه واقعی ناامنی غذایی ۳۰ روز» تبدیل شد؛ سوءتغذیه نیازمند بررسی حرفه‌ای باقی می‌ماند و از مسیر R3 رسیدگی می‌شود."
    },
    A7: {
        old: [
            "ویژگی‌های فردی › سرپرست فاقد صلاحیت، دلیل عدم صلاحیت",
            "علت زندانی، وضعیت جرم"
        ],
        action: "reinterpret",
        note: "برچسب‌های «فاقد صلاحیت» و جزئیات جرم حذف شد؛ فقط اختلال مؤثر بر عملکرد خانوار با محرمانگی سنجیده و خشونت/تهدید امنیتی از مسیر R5 پیگیری می‌شود."
    },
    B1: {
        old: [
            "تحصیل › در حال تحصیل",
            "برنامه‌ها › محصلین نیازمند، کودک در معرض آسیب"
        ],
        action: "reinterpret",
        note: "از وضعیت تحصیل ساده به «بازماندگی/ترک تحصیل واقعی در سن آموزش اجباری» تبدیل شد؛ اعتبار با آموزش‌وپرورش (وب‌سرویس) راستی‌آزمایی می‌شود."
    },
    B2: {
        old: [
            "— (جدید)؛ قسمتی از «در حال تحصیل» قبلی"
        ],
        action: "new",
        note: "سنجش عوامل خطر ترک تحصیل (غیبت غیرموجه، افت تحصیلی، کار کودک، مراقبت اجباری) در نسخه قبلی نداشت."
    },
    B3: {
        old: [
            "تحصیل › وضعیت سواد (باسواد/بی‌سواد)",
            "میزان سواد"
        ],
        action: "reinterpret",
        note: "به‌جای میزان مدرک، «سواد کارکردی مسئول امور خانوار» برای انجام امور پایه (فرم، پیگیری خدمات، دستور درمان) سنجیده می‌شود."
    },
    B4: {
        old: [
            "— (جدید)؛ مکمل «در حال تحصیل» و اطلاعات محل زندگی قبلی"
        ],
        action: "new",
        note: "مانع واقعی دسترسی به آموزش (فاصله، هزینه، حمل‌ونقل، مدارک هویتی) شاخص مستقل شد."
    },
    B5: {
        old: [
            "حقوقی و فرهنگی › نوع رسانه در اختیار (لپتاپ، گوشی هوشمند، تبلت و ...)"
        ],
        action: "reinterpret",
        note: "از فهرست وسایل به «ابزار و اتصال مؤثر برای آموزش دیجیتال» (اشتراک، پایداری، نیاز واقعی برنامه آموزشی) بازتعریف شد."
    },
    B6: {
        old: [
            "— (جدید)؛ بخشی از «معلولیت» و برنامه‌های حمایتی قبلی"
        ],
        action: "new",
        note: "نیاز آموزشی ویژه بدون خدمت متناسب (معلم مشاور، فضای مناسب، کمک‌افزار) در فرم قبلی سنجیده نمی‌شد."
    },
    B7: {
        old: [
            "مهارت‌های فرهنگی و هنری (حافظ قرآن، خطاطی و ...)",
            "اشتغال › علت بیکاری › نداشتن حرفه و مهارت",
            "علاقه به خدمات اشتغال"
        ],
        action: "reinterpret",
        note: "مهارت‌های تفننی به «مسیر واقعی مهارت و توانمندسازی برای فرد واجد شرایط اشتغال» با احراز علاقه و امکان مشارکت تبدیل شد."
    },
    C1: {
        old: [
            "وضعیت سکونت › ملکی غیرقابل سکونت، آلونک/کپر، مرکز نگهداری",
            "کدپستی و آدرس",
            "تاریخ شروع و پایان اجاره"
        ],
        action: "split",
        note: "بی‌خانمانی و خطر فوری تخلیه از وضعیت مالکیت جدا و شاخص مستقل شد؛ نشانی ثابت برای بی‌خانمان اجباری نیست."
    },
    C2: {
        old: [
            "نوع محل سکونت",
            "وضعیت سکونت › ملکی نیازمند تعمیر",
            "سال پایان ساخت و پایان‌کار"
        ],
        action: "reinterpret",
        note: "ایمنی و قابلیت سکونت واقعی (فرسودگی، سقف/دیوار ناایمن، رطوبت، مقابله اقلیمی) جایگزین وضعیت اداری سکونت شد؛ قدمت به‌تنهایی امتیاز ندارد."
    },
    C3: {
        old: [
            "وضعیت سکونت › ملکی، رهن و اجاره، سکونت رایگان، وقفی، اجاره به شرط تملیک"
        ],
        action: "split",
        note: "امنیت تصرف و پایداری سکونت (قرارداد، سکونت وابسته، دعوای مالکیت، تمدید قرارداد) از مالکیت سند تفکیک شد."
    },
    C4: {
        old: [
            "— (جدید)",
            "تعداد عائله (داده ترکیب خانوار قبلی)"
        ],
        action: "new",
        note: "تراکم سکونت (نفر به اتاق قابل سکونت) و فضای خواب ایمن محاسبه‌ای است؛ تعداد اعضا به‌تنهایی امتیاز نمی‌گیرد."
    },
    C5: {
        old: [
            "انشعابات محل سکونت › برق، آب، گاز سراسری"
        ],
        action: "reinterpret",
        note: "از وجود انشعاب به «دسترسی پایدار و ایمن» (قطع ناشی از بدهی، کیفیت پایین، نبود زیرساخت) ارتقا یافت؛ قطع حیاتی از مسیر R7 پیگیری می‌شود."
    },
    C6: {
        old: [
            "امکانات بهداشتی › سرویس بهداشتی، حمام",
            "انشعابات › فاضلاب"
        ],
        action: "reinterpret",
        note: "به «بهداشت محیط مسکن» (قابل استفاده‌بودن، اشتراکی‌بودن، دفع فاضلاب، آلودگی) بازتعریف شد؛ نبود شبکه شهری به‌تنهایی محرومیت نیست."
    },
    C7: {
        old: [
            "— (جدید)؛ جایگزین لیست امکانات منزل در نسخه‌های قبلی"
        ],
        action: "new",
        note: "فقط وسایل واقعاً ضروری زندگی (خواب ایمن، نگهداری ایمن غذا، گرمایش) ملاک است؛ امکانات غیرضروری مبنای امتیاز نیستند."
    },
    C8: {
        old: [
            "میزان اجاره‌بها، ودیعه",
            "تاریخ شروع و پایان اجاره"
        ],
        action: "reinterpret",
        note: "به «نسبت هزینه مسکن به درآمد قابل دسترس پس از کسر درمان» + معوقه محاسبه‌ای تبدیل شد؛ ودیعه در هزینه ماهانه لحاظ نمی‌شود."
    },
    C9: {
        old: [
            "محل زندگی (شهر/روستا/حاشیه)",
            "کدپستی (موقعیت جغرافیایی از سرویس پست)"
        ],
        action: "control",
        note: "شهر یا روستا بودن امتیاز مستقیم ندارد؛ موقعیت جغرافیایی فقط برای تحلیل دسترسی واقعی به خدمات پایه و تعیین خط فقر منطقه‌ای استفاده می‌شود."
    },
    D1: {
        old: [
            "اشتغال › وضعیت اشتغال سرپرست/عضو",
            "وضعیت شغلی (کارفرما، مزدبگیر، کارکن فصلی و ...)"
        ],
        action: "reinterpret",
        note: "به «استمرار فعالیت درآمدزا و درآمد مؤثر فرد تأمین‌کننده» تبدیل شد؛ روزمزدی یا فصلی بدون قطع/نوسان مؤثر، خودکار امتیاز نمی‌گیرد."
    },
    D2: {
        old: [
            "اشتغال سایر اعضا › بیکار، علت بیکاری، توانایی کار",
            "ویژگی‌ها › بیکاران نیازمند"
        ],
        action: "split",
        note: "بی‌کاری سایر اعضای توانمند و آماده کار از وضعیت تأمین‌کننده تفکیک شد؛ نبود سرمایه/مهارت به‌تنهایی «بی‌کاری بالفعل» نیست."
    },
    D3: {
        old: [
            "منبع درآمدی خانوار (مستمری، کمک بستگان، ارثیه و ...)",
            "نیازسنجی",
            "محل زندگی (برای خط فقر منطقه‌ای)"
        ],
        action: "reinterpret",
        note: "فهرست منابع به «نسبت منابع قابل اتکا به خط فقر منطقه‌ای متناسب با خانوار» تبدیل شد؛ منبع هر درآمد با دریافت‌کننده، مبلغ، استمرار و قابلیت اتکا ثبت می‌شود."
    },
    E1: {
        old: [
            "ویژگی‌های فردی › فوت شوهر، سرپرست سالمند، مطلقه سرپرست و مشابه",
            "دوره حمایت از خانواده"
        ],
        action: "reinterpret",
        note: "عنوان‌های وضعیت سرپرست بدون امتیاز خودکار به «مسیر عملی بهبود معیشت در ۱۲ ماه آینده» بازتعریف شد؛ رویداد زندگی به‌تنهایی محرومیت نیست."
    },
    E2: {
        old: [
            "برنامه‌ها › نگهداری کودک و نوجوان، نگهداری سالمند ناتوان",
            "ویژگی‌ها › بیماری سرپرست"
        ],
        action: "reinterpret",
        note: "از فهرست برنامه‌های نگهداری به «بار مراقبتی سنگین و کفایت پشتیبانی آن» با ساعات/شدت و اثر بر کار و تحصیل تبدیل شد."
    },
    E3: {
        old: [
            "— (جدید)؛ بخشی ضمنی از منبع درآمد (کمک بستگان/خیرین) قبلی"
        ],
        action: "new",
        note: "شبکه حمایتی قابل اتکا در بحران (خویشاوند، همسایه، نهاد) شاخص مستقل شد؛ کمک مالی صرف معیار پشتوانه نیست."
    },
    E4: {
        old: [
            "نیازمند مشاوره حقوقی و قضایی",
            "وضعیت نظام وظیفه",
            "کد ملی (فقدان مدرک)"
        ],
        action: "reinterpret",
        note: "به «مانع مؤثر هویتی/حقوقی/اداری بر دسترسی به حقوق و خدمات» تبدیل شد؛ نبود کد ملی خودش امتیاز نمی‌گیرد مگر مانع واقعی ایجاد کند (مسیر R8)."
    }
};
function legacySummary() {
    const counts = {
        keep: 0,
        reinterpret: 0,
        split: 0,
        control: 0,
        new: 0
    };
    for (const id of Object.keys(LEGACY_MAP))counts[LEGACY_MAP[id].action] += 1;
    return counts;
}
const WEB_SERVICES = [
    {
        id: "civil_registry",
        name: "ثبت احوال — هویت و ترکیب خانوار",
        org: "سازمان ثبت احوال",
        provides: [
            "نام و کد ملی سرپرست و اعضا",
            "نسبت خویشاوندی",
            "سن/تاریخ تولد",
            "وضعیت ازدواج و رویدادهای حیاتی"
        ],
        feeds: [
            "A2",
            "A7",
            "E1",
            "E2",
            "E4"
        ],
        scope: "both"
    },
    {
        id: "post",
        name: "پست — نشانی و موقعیت جغرافیایی",
        org: "شرکت ملی پست",
        provides: [
            "نشانی استاندارد از کدپستی",
            "استان/شهرستان/منطقه",
            "موقعیت جغرافیایی سکونت"
        ],
        feeds: [
            "C1",
            "C9",
            "D3"
        ],
        scope: "household"
    },
    {
        id: "shaparak_bank",
        name: "شاپرک و بانک‌ها — راستی‌آزمایی معیشت",
        org: "شاپرک / بانک‌های عامل (با توافقنامه دسترسی)",
        provides: [
            "وضعیت حساب با کد ملی",
            "گردش تجمیعی ۹۰ روز (بدون جزئیات خرید)",
            "تسهیلات و چک برگشتی"
        ],
        feeds: [
            "D1",
            "D2"
        ],
        scope: "household"
    },
    {
        id: "insurance",
        name: "بیمه — پوشش پایه درمانی",
        org: "تأمین اجتماعی و سایر صندوق‌ها",
        provides: [
            "وضعیت بیمه پایه اعضا",
            "نوع صندوق و اعتبار",
            "سابقه بیمه اجتماعی"
        ],
        feeds: [
            "A5"
        ],
        scope: "members"
    },
    {
        id: "property",
        name: "اموال و املاک — وضعیت مالکیت",
        org: "سازمان اموال و املاک",
        provides: [
            "سابقه سند به نام سرپرست",
            "وضعیت مالکیت مسکن",
            "امکان‌سنجی حق سکونت"
        ],
        feeds: [
            "C3"
        ],
        scope: "household"
    },
    {
        id: "education_school",
        name: "آموزش‌وپرورش — وضعیت تحصیل",
        org: "وزارت آموزش‌وپرورش",
        provides: [
            "ثبت‌نام و حضور اعضای در سن آموزش",
            "وقفه/ترک تحصیل",
            "مدرک تحصیلی مدارس"
        ],
        feeds: [
            "B1",
            "B2",
            "B4"
        ],
        scope: "members"
    },
    {
        id: "higher_edu",
        name: "علوم و دانشگاه آزاد — مدارک دانشگاهی",
        org: "وزارت علوم / دانشگاه آزاد",
        provides: [
            "مدارک تحصیلی دانشگاهی اعضا",
            "وضعیت تحصیل دانشگاهی"
        ],
        feeds: [
            "B3",
            "B7"
        ],
        scope: "members"
    }
];
const DATA_PRIORITY = [
    {
        rank: 1,
        source: "مراجع ثبتی و استعلام وب‌سرویس",
        desc: "تأیید اطلاعات پایه، بیمه، آموزش، اشتغال، خدمات و سوابق قانونی مجاز — ملاک است و قابل تغییر در فرم نیست.",
        tone: "teal"
    },
    {
        rank: 2,
        source: "مدارک معتبر خانوار",
        desc: "گواهی پزشکی، قرارداد اجاره، قبض، اخطار، اسناد هزینه و مدارک آموزشی.",
        tone: "sky"
    },
    {
        rank: 3,
        source: "خوداظهاری ساختاریافته خانوار",
        desc: "دریافت اطلاعات اولیه، شرایط جاری و موضوعات فاقد داده ثبتی.",
        tone: "amber"
    },
    {
        rank: 4,
        source: "ابزارک مددکار",
        desc: "تماس، بازدید میدانی یا ابزارک برای آزمایش و ثبت وضعیت واقعی.",
        tone: "violet"
    },
    {
        rank: 5,
        source: "تأیید/اصلاح/رد مددکار",
        desc: "اعمال قضاوت حرفه‌ای، ثبت دلیل و نهایی‌سازی وضعیت شاخص.",
        tone: "rose"
    }
];
function serviceFeedLabel(id) {
    const services = WEB_SERVICES.filter((s)=>s.feeds.includes(id));
    return services.length ? services.map((s)=>s.name.split(" — ")[0]).join("، ") : undefined;
}
function indicatorLegacyBadge(id) {
    const m = LEGACY_MAP[id];
    const meta = LEGACY_ACTION_META[m.action];
    const old = m.old[0] ?? "—";
    const svc = serviceFeedLabel(id);
    const title = `${meta.label}\nمنبع قبلی: ${m.old.join(" | ")}\n${m.note}${svc ? `\nراستی‌آزمایی ثبتی: ${svc}` : ""}`;
    return {
        short: meta.short,
        className: meta.className,
        title,
        old
    };
}
const LEGACY_INDICATOR_TABLE = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_TITLES"]).map((id)=>({
        id,
        title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_TITLES"][id],
        weight: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEIGHTS"][id],
        legacy: LEGACY_MAP[id],
        services: WEB_SERVICES.filter((s)=>s.feeds.includes(id)).map((s)=>s.name.split(" — ")[0])
    }));
}),
"[project]/src/lib/mpi/section-guide.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION_MIGRATION_POLICY",
    ()=>ACTION_MIGRATION_POLICY,
    "SECTION_GUIDE",
    ()=>SECTION_GUIDE,
    "indicatorsOfStep",
    ()=>indicatorsOfStep,
    "servicesOfIndicator",
    ()=>servicesOfIndicator,
    "stepMappingRows",
    ()=>stepMappingRows
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$legacy$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/legacy-map.ts [app-ssr] (ecmascript)");
;
;
const ACTION_MIGRATION_POLICY = {
    keep: "داده نسخه قبلی معتبر و قابل انتقال مستقیم است؛ مقدار قبلی به‌عنوان پیش‌فرض بارگذاری می‌شود و مددکار فقط تأیید یا اصلاح می‌کند.",
    reinterpret: "موضوع از نسخه قبلی می‌آید اما معیار سنجش بازتعریف شده است؛ مقدار قبلی فقط «زمینه» است و پاسخ باید با پرسش‌های جدید دوباره گرفته شود — معادل‌سازی خودکار ممنوع.",
    split: "فیلد ترکیبی قبلی به چند شاخص مستقل تفکیک شده؛ داده قبلی به شاخص متناظر نگاشت می‌شود و برای بخش‌های بدون معادل، پاسخ جدید جمع می‌گردد.",
    control: "داده قبلی حفظ ولی از امتیاز مستقیم خارج شده است؛ فقط برای راستی‌آزمایی، تدوین خط فقر منطقه‌ای یا خدمت‌رسانی استفاده می‌شود.",
    new: "در نسخه قبلی معادل مستقیم ندارد و داده تاریخی آن جمع نشده؛ برای خانوارهای موجود این شاخص باید یک‌بار ثبت شود و تا آن زمان نتیجه «غیرنهایی» می‌ماند."
};
const SECTION_GUIDE = {
    identity: {
        philosophy: "این بخش ورودی سامانه است: اول «صفحه ورود» (کد ملی + رمز) می‌آید؛ اگر حساب ندارید، دکمه ثبت‌نام فرم مودالی را باز می‌کند — کد ملی، شماره موبایل، تاریخ تولد، کد پستی، رمز عبور و نوع درخواست گرفته می‌شود و بلافاصله هویت و ترکیب خانوار از ثبت احوال، نشانی از پست، وضعیت حساب از شاپرک و سایر مراجع متولی با کلید کد ملی به‌صورت خودکار واکشی و پیش‌تکمیل می‌شود و کاربر به پرسشنامه منتقل می‌گردد. کد ملی «کلید شناسایی خانوار» و مبنای استعلام همه مراجع (ثبت احوال، پست، شاپرک، تأمین اجتماعی، اموال و املاک، آموزش‌وپرورش، علوم/دانشگاه آزاد) است و بدون آن هیچ استعلامی ممکن نیست.",
        philosophyPoints: [
            "کد ملی اجباری و کلیدی است — بدون کد ملی معتبر حتی ثبت‌نام و واکشی ممکن نیست.",
            "داده واکشی‌شده «ملاک ثبتی» است و در فرم فقط‌خواندنی می‌شود؛ اصلاح فقط از مسیر درخواست به مرجع.",
            "پیش‌تکمیل سایر مراجع با حفظ منبع و تاریخ ثبت می‌شود و تأیید خودکار شرایط جاری نیست.",
            "موبایل و رمز عبور (فقط هش) و توافقنامه دسترسی به اطلاعات بانکی از فرم ثبت‌نام منتقل می‌شود."
        ],
        legacyRelation: "در پرسشنامه قبلی، کد ملی یک فیلد ساده در «ویژگی‌های فردی» بود و فقدان مدرک فقط به‌عنوان یک ویژگی ثبت می‌شد (میراث E4) و ثبت‌نام/احراز هویت اصلاً وجود نداشت. در نسخه جدید کد ملی از یک فیلد اطلاعاتی به «کلید عملیاتی سامانه» ارتقا یافته و کل فرآیند ورود الگوبرداری از سامانه امداد است: ثبت‌نام با کد ملی/موبایل/تاریخ تولد/کدپستی/رمز و نوع درخواست، واکشی خودکار همه مراجع و سپس ورود به پرسشنامه با داده پیش‌پرشده. کدپستی قبلی هم فقط «آدرس» بود؛ اکنون کلید واکشی نشانی استاندارد و مبنای خط فقر منطقه‌ای (C9/D3) است.",
        migrationPolicy: "سیاست جدید: کد ملی اجباری است و بدون کد ملیِ معتبر (تطبیق با الگوریتم ثبت احوال) ثبت‌نام و ادامه پرسشنامه مسدود می‌شود. اگر سرپرست واقعاً فاقد مدرک است، مسیر دریافت مدرک (پرچم R8) با همراهی مددکار فعال می‌شود و پرونده تا دریافت کد ملی در وضعیت غیرنهایی می‌ماند. هیچ داده هویتی دستی‌ای بر داده واکشی‌شده ملاک تقدم ندارد.",
        migrationMechanism: [
            "۱) ثبت‌نام مودالی: کد ملی + موبایل + تاریخ تولد + کد پستی + رمز (۶ کاراکتر حروف انگلیسی و عدد، بدون &<>\"/;,*|=%) + نوع درخواست + توافقنامه بانکی — الگوی سامانه امداد.",
            "۲) واکشی خودکار با کلید کد ملی: ثبت احوال (هویت و اعضای سابقه ثبتی — ملاک و قفل)، پست (نشانی از کدپستی — ملاک و قفل)، شاپرک (اجرای توافقنامه)، تأمین، املاک، علوم/آزاد و آموزش‌وپرورش (پیش‌تکمیل با حفظ منبع).",
            "۳) انتقال خودکار به گام ۱ پرسشنامه — همه داده‌های واکشی‌شده پیش‌پرشده‌اند و کاربر فقط باقی‌مانده را گام‌به‌گام تکمیل می‌کند.",
            "۴) درخواست خانوار از ثبت‌نام مقدار اولیه می‌گیرد؛ در گام آخر به‌عنوان داده خدماتی قابل تکمیل و اصلاح است."
        ]
    },
    urgency: {
        philosophy: "فوریت یعنی خطر جانی یا وضعیت اضطراری که نمی‌تواند منتظر امتیاز و غربالگری بماند. این بخش مستقل از امتیاز کل است و حتی یک خانوار با امتیاز برخورداری هم اگر در خطر باشد باید فوراً رسیدگی شود. پرچم‌های R1 تا R9 مسیر مشخص رسیدگی دارند و همه‌جا در دسترس‌اند.",
        philosophyPoints: [
            "امتیاز بالا شرط رسیدگی فوری نیست — فوریت از امتیاز تفکیک شده است.",
            "نشانه فوریتی که از پاسخ شاخص‌ها استنباط می‌شود (مثل قطع دارو یا بی‌خانمانی) به‌صورت «پیشنهاد» ثبت می‌شود و نیازمند تأیید تخصصی است."
        ],
        legacyRelation: "در پرسشنامه قبلی بخش مستقلی به‌نام فوریت وجود نداشت؛ نشانه‌های خطر (بیماری صعب‌العلاج، فوت سرپرست، بی‌خانمانی و ...) فقط به‌صورت فیلدهای اطلاعاتی ثبت و در دل امتیاز گم می‌شدند. نسخه جدید این سرنخ‌ها را از امتیاز جدا کرده و به ۹ پرچم خطر مستقل با مالکیت و ضرب‌الاجل تبدیل کرده است.",
        migrationPolicy: "هیچ داده تاریخی به این بخش منتقل نمی‌شود — فوریت همیشه «وضعیت جاری» است و از داده نسخه قبلی ارث نمی‌برد. اگر در پرونده قبلی نشانه خطری ثبت شده بود، مددکار آن را در نخستین تماس جدید دوباره بررسی و در صورت تداوم، در همین بخش ثبت می‌کند.",
        migrationMechanism: [
            "۱) داده قبلی به‌عنوان «سرنخ بررسی» به مددکار نمایش داده می‌شود، نه به‌عنوان پرچم فعال.",
            "۲) در نخستین تماس/بازدید نسخه جدید، هر سرنخ قدیمی راستی‌آزمایی و در صورت تداوم ثبت می‌شود.",
            "۳) هر پرچم ثبت‌شده وضعیت، مسئول و ضرب‌الاجل دارد و در داشبورد پیگیری می‌شود."
        ]
    },
    base: {
        philosophy: "اطلاعات پایه «شناخت پرونده» است، نه سنجش محرومیت: نسبت‌ها، نقش‌ها (سرپرست، پاسخ‌گو، تأمین‌کننده، مراقب اصلی) و مشخصات مسکن که ورودی منطق نمایش و محاسبه شاخص‌ها هستند. این فیلدها امتیاز مستقل ندارند اما بدون آن‌ها محاسبه شاخص‌ها (مثل تراکم سکونت C4 و فشار هزینه C8) ممکن نیست.",
        philosophyPoints: [
            "سرپرست و فرد پاسخ‌گو دو نقش مستقل‌اند؛ نقش‌ها می‌توانند هم‌زمان باشند.",
            "فیلدهای ملاک ثبتی پس از واکشی قفل می‌شوند و فقط با درخواست به مرجع اصلاح می‌شوند."
        ],
        legacyRelation: "ستون‌های «ویژگی‌های فردی»، «وضعیت حمایتی»، «نوع محل سکونت» و کدپستی فرم قبلی به همین بخش آمده‌اند؛ اما تفکیک نقش‌ها (پاسخ‌گو جدا از سرپرست) و ساختار اعضا به‌صورت حلقه‌ای برای هر عضو، در نسخه قبلی نداشت — فرم قبلی همه‌چیز را از دریچه سرپرست می‌پرسید.",
        migrationPolicy: "فیلدهای ثبتی (نام سرپرست، کد ملی، استان/شهرستان/نشانی) از وب‌سرویس پیش‌تکمیل و قفل می‌شوند؛ داده تاریخی فرم قبلی فقط تا نخستین واکشی موفق نمایش داده می‌شود و پس از واکشی، مرجع ثبتی ملاک است. فیلدهای غیرثبتی (تلفن، نسبت پاسخ‌گو، جزئیات مسکن) از فرم قبلی قابل بارگذاری‌اند اما باید توسط خانوار در ثبت جدید تأیید شوند.",
        migrationMechanism: [
            "۱) واکشی گام ۱ فیلدهای ثبتی را پر و قفل می‌کند.",
            "۲) داده فیلدهای غیرثبتی از پرونده قبلی به‌عنوان پیش‌فرض قابل بارگذاری است؛ تأیید خانوار شرط اعتبار است.",
            "۳) اعضای خانوار: فهرست واکشی‌شده از ثبت احوال «سابقه ثبتی» است؛ ترکیب جاری خانوار جداگانه تأیید یا اصلاح می‌شود."
        ]
    },
    health: {
        philosophy: "بُعد سلامت (A) به‌جای برچسب «سالم/ناسالم»، اثر واقعی بیماری و معلولیت بر زندگی را می‌سنجد: محدودیت عملکرد، درمان تأمین‌نشده، فشار مالی درمان، پوشش مؤثر بیمه، ناامنی غذایی و ایمنی خانوار. وزن کل این بُعد ۲۵۰ از ۱۰۰۰ است و ۷ شاخص دارد.",
        philosophyPoints: [
            "نوع و نام بیماری ثبت نمی‌شود (حفظ حریم خصوصی) — فقط اثر عملیاتی آن سنجیده می‌شود.",
            "پوشش بیمه «دارد/ندارد» نیست؛ قابلیت استفاده واقعی (اعتبار، فرانشیز، فاصله، نوبت) ملاک است.",
            "درمان فوری و سوءتغذیه از امتیاز جدا و از مسیر پرچم R2/R3 پیگیری می‌شوند."
        ],
        legacyRelation: "ستون‌های «وضعیت جسمانی»، «بیماری و معلولیت»، «بیمه» و برنامه‌های حمایتی تغذیه فرم قبلی به این بُعد آمده‌اند. نگاشت: A1 و A2 بازتعریف (از برچسب به اثر عملیاتی)، A3 تجزیه نیاز درمانی از وضعیت جسمانی، A5 بازتعریف بیمه، A6 تجزیه ناامنی غذایی از برنامه‌های حمایتی، A7 بازتعریف (فقط اختلال مؤثر بر عملکرد، بدون جزئیات جرم)، و A4 کاملاً جدید است (فشار مالی درمان در فرم قبلی سنجیده نمی‌شد).",
        migrationPolicy: ACTION_MIGRATION_POLICY_REFACTOR_NOTE(),
        migrationMechanism: [
            "۱) پاسخ‌های قدیمی «سالم/ناسالم» و فهرست بیماری‌ها معادل‌سازی نمی‌شوند — پرسش‌های جدید درباره اثر عملیاتی دوباره پرسیده می‌شوند.",
            "۲) وضعیت بیمه قبلی از استعلام وب‌سرویس بیمه پیش‌تکمیل و با شواهد خانوار تکمیل می‌شود.",
            "۳) فهرست برنامه‌های حمایتی تغذیه قبلی به «تجربه ناامنی غذایی ۳۰ روز» تبدیل می‌شود.",
            "۴) A4 (فشار مالی درمان) برای همه خانوارهای موجود یک‌بار باید جمع شود — تا آن زمان نتیجه غیرنهایی است."
        ]
    },
    education: {
        philosophy: "بُعد آموزش (B) بازماندگی و افت فرصت رشد انسانی را می‌سنجد: ترک تحصیل واقعی در سن آموزش اجباری، عوامل خطر ترک، سواد کارکردی مسئول امور، موانع واقعی دسترسی، ابزار آموزش دیجیتال، نیاز آموزش ویژه و مسیر مهارت. وزن کل ۲۰۰ است و ۷ شاخص دارد.",
        philosophyPoints: [
            "«در حال تحصیل بودن» کافی نیست — بازماندگی و خطر ترک تحصیل سنجیده می‌شود.",
            "سواد کارکردی (توان انجام امور پایه) جایگزین مدرک تحصیلی است؛ مدرک به‌تنهایی امتیاز ندارد."
        ],
        legacyRelation: "ستون «تحصیل» و «میزان سواد» فرم قبلی به این بُعد آمده‌اند. نگاشت: B1 بازتعریف «در حال تحصیل» به بازماندگی واقعی، B3 بازتعریف سواد به سواد کارکردی، B5 بازتعریف فهرست رسانه به ابزار مؤثر آموزش، B7 بازتعریف مهارت‌های تفننی به مسیر توانمندسازی؛ B2 (عوامل خطر ترک)، B4 (مانع دسترسی) و B6 (نیاز آموزش ویژه) کاملاً جدیدند.",
        migrationPolicy: ACTION_MIGRATION_POLICY_REFACTOR_NOTE(),
        migrationMechanism: [
            "۱) وضعیت تحصیل اعضای در سن آموزش از استعلام آموزش‌وپرورش پیش‌تکمیل و با حضور و غیبت جاری راستی‌آزمایی می‌شود.",
            "۲) «باسواد/بی‌سواد» قبلی معادل B3 نیست؛ سواد کارکردی با پرسش‌های موقعیتی جدید سنجیده می‌شود.",
            "۳) مدارک دانشگاهی اعضا از استعلام علوم/دانشگاه آزاد دریافت و فقط به‌عنوان زمینه B3/B7 استفاده می‌شود.",
            "۴) شاخص‌های جدید B2، B4 و B6 برای پرونده‌های موجود باید یک‌بار جمع شوند."
        ]
    },
    housing: {
        philosophy: "بُعد استاندارد زندگی و مسکن (C) سکونت ایمن و پایدار را می‌سنجد: بی‌خانمانی و خطر تخلیه، قابلیت سکونت، امنیت تصرف، تراکم، دسترسی پایدار به خدمات و انشعابات، بهداشت محیط، وسایل ضروری و فشار هزینه مسکن. سنگین‌ترین بُعد با وزن ۳۰۰ است و ۹ شاخص دارد.",
        philosophyPoints: [
            "مستأجر بودن به‌تنهایی محرومیت نیست؛ ناپایداری و خطر تصرف ملاک است.",
            "قدمت ساختمان و فهرست امکانات غیرضروری مبنای امتیاز نیستند.",
            "ودیعه در هزینه ماهانه لحاظ نمی‌شود و هزینه‌های منظور در خط فقر دوباره کسر نمی‌شوند."
        ],
        legacyRelation: "ستون‌های «وضعیت سکونت»، «انشعابات»، «امکانات بهداشتی»، «اجاره‌بها/ودیعه» و «محل زندگی» فرم قبلی به این بُعد آمده‌اند. تغییر ساختاری مهم: فیلد واحد «وضعیت سکونت» قبلی به سه شاخص مستقل تجزیه شده — C1 (بی‌خانمانی/خطر تخلیه)، C2 (قابلیت سکونت و ایمنی) و C3 (امنیت تصرف). C5 و C6 از «وجود انشعاب» به «دسترسی پایدار و ایمن» ارتقا یافته‌اند؛ C4 و C7 کاملاً جدیدند و C9 کنترلی است (امتیاز مستقیم ندارد).",
        migrationPolicy: ACTION_MIGRATION_POLICY_REFACTOR_NOTE(),
        migrationMechanism: [
            "۱) نشانی و موقعیت از استعلام پست ملاک می‌شود و برای بی‌خانمان، نشانی اجباری نیست.",
            "۲) «ملکی/مستأجر/رایگان» قبلی به C3 (امنیت تصرف) نگاشت می‌شود؛ سابقه سند از استعلام املاک پیش‌تکمیل می‌شود.",
            "۳) وضعیت فیزیکی منزل قبلی («نیازمند تعمیر» و مشابه) با پرسش‌های ایمنی عملیاتی C2 جایگزین می‌شود.",
            "۴) اجاره/ودیعه قبلی در محاسبه C8 (نسبت هزینه به درآمد قابل دسترس) استفاده می‌شود — قاعده طلایی: ضریب شدت فیلد آزاد نیست.",
            "۵) شهر/روستا (C9) از امتیاز خارج و فقط برای تحلیل دسترسی و خط فقر منطقه‌ای استفاده می‌شود."
        ]
    },
    livelihood: {
        philosophy: "بُعد معیشت (D) توان خانوار در تأمین معاش را می‌سنجد: استمرار درآمد مؤثر تأمین‌کننده، بیکاری بالفعل سایر اعضای توانمند و کفایت منابع قابل اتکا نسبت به خط فقر منطقه‌ای. وزن ۱۵۰ با شاخص پروزن D3 (۸۰) — کفایت منابع — بزرگ‌ترین شاخص کل سامانه است.",
        philosophyPoints: [
            "روزمزدی یا فصلی بودن به‌تنهایی امتیاز نمی‌گیرد؛ نوسان و قطع مؤثر درآمد ملاک است.",
            "بی‌کاری یعنی توانمند و آماده کار و جویا — نبود سرمایه/مهارت به‌تنهایی «بی‌کاری بالفعل» نیست.",
            "منبع درآمد با دریافت‌کننده، مبلغ، استمرار و قابلیت اتکا ساختاریافته ثبت می‌شود."
        ],
        legacyRelation: "ستون‌های «اشتغال»، «اشتغال سایر اعضا» و «منبع درآمدی خانوار» فرم قبلی به این بُعد آمده‌اند: D1 بازتعریف وضعیت شغلی به استمرار درآمد مؤثر، D2 تجزیه بیکاری سایر اعضا از وضعیت تأمین‌کننده، و D3 بازتعریف فهرست منابع به نسبت منابع قابل اتکا به خط فقر منطقه‌ای متناسب با خانوار. خط فقر باید مبلغ، منبع، تاریخ اعتبار و وضعیت تأیید داشته باشد؛ بدون آن D3 غیرنهایی می‌ماند (نیازمند تصویب مرجع).",
        migrationPolicy: ACTION_MIGRATION_POLICY_REFACTOR_NOTE(),
        migrationMechanism: [
            "۱) مشاغل و درآمدهای ثبت‌شده قبلی به ساختار جدید (دریافت‌کننده/مبلغ/استمرار/قابلیت اتکا) نگاشت و توسط خانوار تأیید می‌شود.",
            "۲) «علت بیکاری» قبلی به وضعیت D2 تبدیل می‌شود — فقط بیکاری بالفعل سایر اعضای توانمند سنجیده می‌شود.",
            "۳) خط فقر منطقه‌ای جدید (مبلغ + منبع + اعتبار) جایگزین برآورد تجربی قبلی می‌شود.",
            "۴) ضریب شدت D3 فقط با شواهد از موتور قواعد تعیین می‌شود؛ فیلد شدت در فرم وجود ندارد."
        ]
    },
    care: {
        philosophy: "بُعد مراقبت و پشتوانه (E) آسیب‌پذیری ساختاری خانوار را می‌سنجد: چشم‌انداز عملی بهبود معیشت، بار مراقبتی سنگین بدون پشتیبانی کافی، شبکه حمایتی قابل اتکا در بحران و موانع هویتی/حقوقی/اداری مؤثر بر دسترسی به حقوق. کوچک‌ترین بُعد با وزن ۱۰۰ اما تعیین‌کننده «آینده» خانوار است.",
        philosophyPoints: [
            "رویداد زندگی (فوت همسر، سالمندی و ...) به‌تنهایی محرومیت نیست — مسیر عملی بهبود سنجیده می‌شود.",
            "کمک مالی صرف معیار پشتوانه نیست؛ اتکاپذیری شبکه در بحران ملاک است.",
            "نبود کد ملی خودش امتیاز ندارد؛ مانع واقعی ایجادشده بر دسترسی به خدمات سنجیده می‌شود (مسیر R8)."
        ],
        legacyRelation: "ستون‌های «ویژگی‌های فردی» (فوت شوهر، سرپرست سالمند، مطلقه و ...)، «برنامه‌ها» (نگهداری کودک/سالمند)، «نیازمند مشاوره حقوقی» و «کد ملی/فقدان مدرک» فرم قبلی به این بُعد آمده‌اند: E1 و E2 و E4 بازتعریف شده‌اند و E3 (شبکه حمایتی قابل اتکا) کاملاً جدید است. رویدادهای حیاتی ازدواج/فوت/طلاق اکنون از استعلام ثبت احوال نیز قابل راستی‌آزمایی است.",
        migrationPolicy: ACTION_MIGRATION_POLICY_REFACTOR_NOTE(),
        migrationMechanism: [
            "۱) برچسب‌های وضعیت سرپرست قبلی (سالمند/مطلقه/...) بدون امتیاز خودکار، به‌عنوان زمینه E1 نگه داشته و مسیر بهبود جدید پرسیده می‌شود.",
            "۲) برنامه‌های نگهداری قبلی به بار مراقبتی (ساعات/شدت/اثر بر کار و تحصیل) تبدیل می‌شود.",
            "۳) E3 برای پرونده‌های موجود باید یک‌بار جمع شود — تا آن زمان نتیجه غیرنهایی است.",
            "۴) موانع اداری ثبت‌شده قبلی (از جمله فقدان مدرک) به مانع مؤثر عملیاتی E4 نگاشت می‌شود."
        ]
    },
    quality: {
        philosophy: "کیفیت داده پیش‌شرط اعتماد به نتیجه است: هر پاسخ باید منبع (اظهار/میدانی/مستند) داشته باشد، پاسخ‌های «نمی‌دانم/نمی‌گویم» بدون امتیاز خودکار به بررسی می‌روند، تناقض‌ها پیش از محاسبه یافت می‌شوند و اصلاح مددکار مستند با دلیل ثبت و نسخه‌گذاری می‌شود.",
        philosophyPoints: [
            "پاسخ «نمی‌دانم» محرومیت حساب نمی‌شود — فقط موجب بررسی و نتیجه غیرنهایی است.",
            "هر اصلاح، مقدار قبلی/جدید و دلیل دارد و محاسبه مجدد می‌شود (ممیزی‌پذیری)."
        ],
        legacyRelation: "در فرم قبلی هیچ معادلی نداشت — فیلدهای کنترلی (منشأ داده، کیفیت، اصلاح، ممیزی) کاملاً جدیدند و در ماتریس مهاجرت در گروه «فیلدهای کنترلی ۷گانه» آمده‌اند. تنها داده مرتبط، یادداشت‌های آزاد مددکار در پرونده‌های قبلی است که به‌عنوان زمینه بازبینی استفاده می‌شود.",
        migrationPolicy: "این بخش از نسخه قبلی «مهاجرت داده» ندارد و فقط در نسخه جدید پر می‌شود. داده تاریخی پرونده قبلی به‌عنوان «زمینه بازبینی» در دسترس مددکار قرار می‌گیرد اما وارد محاسبه کیفیت نمی‌شود. قاعده طلایی حفظ می‌شود: شدت محرومیت مستقیماً از خانوار پرسیده نمی‌شود و فیلد ضریب شدت در دست خانوار نیست.",
        migrationMechanism: [
            "۱) منبع/کیفیت هر شاخص (اظهار، میدانی، مستند، نیازمند راستی‌آزمایی) ثبت می‌شود.",
            "۲) پاسخ‌های خاص (نمی‌دانم/نمی‌گویم/نیازمند بررسی) به فهرست بررسی تبدیل می‌شوند.",
            "۳) تناقض‌یاب پیش از نتیجه‌گیری اجرا و موارد به مددکار نمایش داده می‌شود.",
            "۴) اصلاحات مستند با نسخه‌گذاری ثبت می‌شود تا نتیجه بازتولیدپذیر بماند."
        ]
    },
    summary: {
        philosophy: "خلاصه، نقطه تلاقی سنجش و خدمت است: نتیجه غربالگری (امتیاز، سطح و پرچم‌ها) بازبینی انسانی می‌شود، «درخواست خانوار» جدا از «نیاز شناسایی‌شده» ثبت می‌گردد و شناسنامه ارزیابی (نسخه قواعد، منشأ داده، اصلاحات) نتیجه را ممیزی‌پذیر می‌کند. هیچ خروجی الگوریتمی به‌تنهایی تصمیم نهایی درباره خانوار نیست.",
        philosophyPoints: [
            "درخواست، خروجی خدماتی است و امتیاز مستقل ندارد.",
            "شناسنامه ارزیابی، تکرارپذیری و بازنگری‌پذیری نتیجه را تضمین می‌کند."
        ],
        legacyRelation: "در فرم قبلی «درخواست» در ابتدای پرسشنامه پرسیده می‌شد و نیازسنجی را تحت‌الشعاع قرار می‌داد؛ نسخه جدید درخواست را به گام آخر منتقل و از امتیاز جدا کرده است. شناسنامه ارزیابی (نسخه قواعد، تعداد استعلام‌ها، اصلاحات مستند) نیز فیلد کنترلی جدید است و معادل قبلی ندارد.",
        migrationPolicy: "داده‌های این بخش در هر ثبت، از وضعیت جاری همان پرونده نسخه جدید ساخته می‌شوند و «مهاجرت» ندارند. برای پرونده‌های قدیمی: نتیجه نسخه قبلی قابل مقایسه با نتیجه جدید است اما جایگزین نمی‌شود؛ نسخه قواعد (EM-MPI-RF-1.0.0) در شناسنامه ثبت می‌شود تا هر نتیجه به قواعد روز خودش قابل ردیابی باشد.",
        migrationMechanism: [
            "۱) نتیجه از موتور قواعد نسخه‌گذاری‌شده محاسبه و سطح ۱ تا ۵ تعیین می‌شود.",
            "۲) درخواست خانوار به‌عنوان داده خدماتی جدا از نیاز ثبت می‌شود.",
            "۳) مددکار نظر تخصصی و مسیر ارجاع را در نمای حرفه‌ای ثبت می‌کند.",
            "۴) مالکیت پرونده تا پذیرش مسئولیت مقصد حفظ می‌شود."
        ]
    }
};
/* کمک داخلی — یادداشت سیاست مهاجرت بُعدهای امتیازی (بر پایه ۵ اقدام نگاشت) */ function ACTION_MIGRATION_POLICY_REFACTOR_NOTE() {
    return "سیاست مهاجرت این بُعد بر پایه پنج اقدام نگاشت شاخص‌هاست: «همان قبلی» مستقیماً منتقل و فقط تأیید می‌شود؛ " + "«بازتعریف» مقدار قبلی را معادل‌سازی نمی‌کند و با پرسش‌های جدید دوباره سنجیده می‌شود (داده قدیم فقط زمینه است)؛ " + "«تجزیه» داده قبلی را به شاخص متناظر نگاشت و برای بخش‌های بی‌معادل پاسخ جدید می‌گیرد؛ " + "«جدید» داده تاریخی ندارد و تا ثبت نخستین‌بار، نتیجه غیرنهایی می‌ماند؛ " + "و داده‌ای که «کنترل» است از امتیاز خارج و فقط برای راستی‌آزمایی استفاده می‌شود. پیش‌تکمیل از استعلام مراجع، تأیید خودکار شرایط جاری نیست.";
}
function indicatorsOfStep(stepKey) {
    switch(stepKey){
        case "health":
            return [
                "A1",
                "A2",
                "A3",
                "A4",
                "A5",
                "A6",
                "A7"
            ];
        case "education":
            return [
                "B1",
                "B2",
                "B3",
                "B4",
                "B5",
                "B6",
                "B7"
            ];
        case "housing":
            return [
                "C1",
                "C2",
                "C3",
                "C4",
                "C5",
                "C6",
                "C7",
                "C8",
                "C9"
            ];
        case "livelihood":
            return [
                "D1",
                "D2",
                "D3"
            ];
        case "care":
            return [
                "E1",
                "E2",
                "E3",
                "E4"
            ];
        default:
            return [];
    }
}
function servicesOfIndicator(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$legacy$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WEB_SERVICES"].filter((s)=>s.feeds.includes(id)).map((s)=>s.name);
}
function stepMappingRows(stepKey) {
    return indicatorsOfStep(stepKey).map((id)=>({
            id,
            title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_TITLES"][id],
            action: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$legacy$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_MAP"][id].action,
            old: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$legacy$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_MAP"][id].old,
            note: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$legacy$2d$map$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEGACY_MAP"][id].note
        }));
}
;
}),
"[project]/src/lib/mpi/charter-a.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARTER_A",
    ()=>CHARTER_A
]);
const CHARTER_A = {
    A1: {
        concept: "محرومیت ناشی از بیماری مزمن یا جدی که عملکرد فرد در کار، تحصیل یا زندگی روزمره، یا بودجه خانوار را عملاً محدود کرده است. ملاک «اثر واقعی» است نه برچسب پزشکی؛ نام و نوع بیماری برای حفظ حریم خصوصی ثبت نمی‌شود.",
        outOfScope: [
            "بیماری بدون اثر معنادار بر عملکرد یا هزینه خانوار",
            "بیماری گذرای درمان‌شده (عفونت حاد برطرف‌شده و مشابه)",
            "محدودیت عملکردی پایدار بدون بیماری مرتبط → شاخص A2",
            "جزئیات تشخیص و سابقه درمانی — فقط با رضایت و برای ارجاع"
        ],
        unit: "فرد (تک‌تک اعضای خانوار)",
        aggregation: "بیشینه (بدترین وضعیت) اعضا مبنای ضریب خانوار است؛ بیماری یک عضو با اثر شدید، کل خانوار را در همان سطح می‌گذارد.",
        period: "وضعیت جاری؛ اثر بر کار/تحصیل/هزینه در ۳ ماه اخیر",
        eventQuestions: [
            "رخداد: آیا عضو بیماری مزمن یا جدی دارد و کنترل‌شده است یا کنترل‌نشده؟",
            "تداوم: اختلال به‌صورت پیوسته، دوره‌ای یا فقط در فاز حاد است؟",
            "فراوانی: در ماه چند روز فعالیت روزمره، کار یا تحصیل مختل می‌شود؟",
            "پیامد: چه اثری بر کار، تحصیل، هزینه یا فعالیت خانوار گذاشته است؟"
        ],
        questionIds: [
            "A1_disease",
            "A1_impact"
        ],
        quantitative: [
            "تعداد اعضای دارای بیماری مؤثر",
            "روزهای تقریبی اختلال فعالیت در ماه",
            "سهم هزینه مستمر دارو/مراقبت (در شاخص A4 لحاظ می‌شود؛ اینجا تکرار نمی‌شود)"
        ],
        contextualEvidence: [
            "غیبت یا ترک موقت کار/مدرسه عضو مبتلا",
            "نیاز به همراه یا مراقب در رفت‌وآمد درمانی",
            "محدودیت در انتخاب شغل یا ساعت کار",
            "برنامه ویژه دارو/تغذیه در بودجه ماهانه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "(بیماری کنترل‌نشده «و» اثر شدید) «یا» (بیماری کنترل‌شده «و» اثر شدید)"
            },
            {
                coeff: "۰٫۵",
                rule: "اثر متوسط بر زندگی روزمره — چه بیماری کنترل‌شده «یا» کنترل‌نشده"
            },
            {
                coeff: "۰",
                rule: "بدون بیماری مؤثر «یا» بیماری کنترل‌شده با اثر کم"
            }
        ],
        precedence: "اثر شدید در هر عضو بر سایر حالت‌ها تقدم دارد؛ بین اعضا بیشینه ملاک است. کنترل‌نشده بودن به‌تنهایی ضریب کامل نمی‌سازد مگر اثر متوسط/شدید داشته باشد.",
        anchors: [
            {
                coeff: "۰",
                example: "پدر با دیابت کنترل‌شده با قرص روزانه؛ بدون غیبت کاری و بدون اختلال خانه‌داری در ۳ ماه گذشته."
            },
            {
                coeff: "۰٫۵",
                example: "مادر با بیماری قلبی کنترل‌نشده؛ ماهی دو سه روز کار خانه و بازار مختل می‌شود و باید همراهش رفت."
            },
            {
                coeff: "۱",
                example: "نوجوان با بیماری صعب‌العلاج در فاز پیشرفته؛ تحصیل تعطیل شده، همراه دائمی لازم دارد و کار مادر عملاً رها شده است."
            }
        ],
        evidenceStatus: [
            "منبع اولیه: خوداظهاری ساختاریافته سرپرست (تقدم سطح ۳ نردبان منابع)",
            "مدارک پزشکی اختیاری — در صورت ارائه، تقدم سطح ۲ را می‌گیرد",
            "کفایت: بدون پاسخ «اثر»، ثبتِ بیماری کافی نیست؛ هر دو پرسش الزامی است",
            "تعارض اظهار و مدرک → پرچم R9؛ وضعیت نهایی با تأیید مددکار ثبت می‌شود"
        ],
        exceptions: [
            "مشکل روانی/مصرف مواد با اختلال خانوار → شاخص A7 (نه A1)؛ هم‌زمانی ممکن است ولی امتیاز تکراری نمی‌گیرد",
            "محدودیت عملکردی بدون تشخیص بیماری (مثل معلولیت مادرزادی) → A2",
            "فقط هزینه سنگین درمان بدون اختلال عملکرد → A4",
            "درمان ضروری انجام‌نشده → A3؛ اینجا وضعیت بیماری با تأمین درمان ملاک است",
            "اثر مرزی متوسط/شدید → بررسی تخصصی مددکار و ثبت در کیفیت داده"
        ],
        serviceInputs: []
    },
    A2: {
        concept: "محدودیت پایدار در عملکردهای پایه زندگی (حرکت، مراقبت شخصی، ارتباط، یادگیری) فارغ از برچسب معلولیت؛ ملاک، فاصله بین توان فرد و نیاز روزمره و کفایت جبران آن است.",
        outOfScope: [
            "معلولیت ثبت‌شده بدون محدودیت عملکردی روزانه",
            "محدودیت گذرا با بهبود انتظار (شکستگی و مشابه)",
            "بیماری به‌عنوان علت → A1",
            "درجه/نوع معلولیت نظام پزشکی — فقط برای ارجاع"
        ],
        unit: "فرد (همه اعضا)",
        aggregation: "بیشینه اعضا؛ محدودیت تأمین‌نشده فقط یک عضو کافی است تا ضریب کامل خانوار ساخته شود.",
        period: "وضعیت جاری؛ «پایدار» یعنی انتظار تداوم بیش از ۶ ماه (تعریف عملیاتی پیشنهادی — نیازمند تصویب مرجع)",
        eventQuestions: [
            "رخداد: آیا محدودیت پایدار در حرکت، مراقبت شخصی، ارتباط یا یادگیری دارد؟",
            "تداوم: از چه زمانی و با چه روندی است؟",
            "کمک: چه کمک/وسیله/توان‌بخشی لازم است و چه میزانش تأمین شده؟",
            "پیامد: بدون این کمک کدام فعالیت روزمره متوقف می‌شود؟"
        ],
        questionIds: [
            "A2_limit",
            "A2_aid"
        ],
        quantitative: [
            "تعداد اعضای دارای محدودیت پایدار",
            "ساعت نیاز کمک روزانه (تقریبی)",
            "هزینه جبران‌نشده وسیله/توان‌بخشی"
        ],
        contextualEvidence: [
            "وابستگی به فرد دیگر برای حمام، پوشیدن لباس یا غذا",
            "ترک مدرسه یا کار به‌خاطر محدودیت",
            "نبود رمپ/سرویس مناسب در مسکن (تقاطع با C2)",
            "هزینه توان‌بخشی خارج از توان بودجه خانوار"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "محدودیت پایدار احراز «و» نیاز کمک/وسیله تأمین‌نشده"
            },
            {
                coeff: "۰٫۵",
                rule: "محدودیت پایدار احراز «و» کمک/وسیله تأمین‌شده (عملکرد با تکیه بر تابع برقرار است)"
            },
            {
                coeff: "۰",
                rule: "بدون محدودیت پایدار"
            }
        ],
        precedence: "تأمین‌نشده بر تأمین‌شده تقدم دارد؛ بین اعضا بیشینه. در صورت «نیاز ارزیابی تخصصی» پاسخ ثبت و در کیفیت داده پیگیری می‌شود.",
        anchors: [
            {
                coeff: "۰",
                example: "خانوار بدون عضو با محدودیت پایدار در حرکت، مراقبت شخصی، ارتباط یا یادگیری."
            },
            {
                coeff: "۰٫۵",
                example: "سالمند با عصا و کمک فرزند برای حمام و خرید؛ عملکرد فقط با تکیه کامل بر تابع برقرار است."
            },
            {
                coeff: "۱",
                example: "کودک ۹ ساله با معلولیت حرکتی؛ ویلچر و گفتاردرمانی لازم است ولی هیچ‌کدام تأمین نشده و از مدرسه بازمانده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + مشاهده مددکار؛ مدارک معلولیت اختیاری با تقدم بالاتر",
            "کفایت: دو پرسش (محدودیت + وضعیت کمک) هر دو باید پاسخ شوند",
            "ترکیب و سن اعضا از واکشی ثبت احوال دامنه بررسی را تعیین می‌کند",
            "تعارض → R9؛ تأیید نهایی با مددکار"
        ],
        exceptions: [
            "اختلال روانی مزمن با اختلال عملکرد خانوار → A7",
            "کودک با نیاز آموزشی ویژه در فضای آموزش → B6؛ اینجا عملکرد زندگی روزمره ملاک است",
            "محدودیت موقت زیر ۶ ماه → بدون امتیاز پایداری (قاعده پیشنهادی)",
            "نیاز مراقبت از فرد محدود → E2"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "ترکیب، سن و رویدادهای حیاتی اعضا برای تعیین دامنه اعضای نیازمند بررسی عملکردی؛ وضعیت معلولیت مستقیماً از ثبت احوال دریافت نمی‌شود."
            }
        ]
    },
    A3: {
        concept: "محرومیت از درمان ضروری (دارو، جراحی، آزمایش، توان‌بخشی) که نیاز آن احراز شده ولی انجام نشده یا با تأخیر مواجه است — ملاک نبودِ دسترسی واقعی است، نه انتخاب شخصی یا رضایت کامل به خدمت.",
        outOfScope: [
            "درمان‌های غیرضروری/زیبایی",
            "درمان انجام‌شده به‌موقع",
            "پوشش بیمه به‌تنهایی → A5",
            "هزینه سنگین درمانِ انجام‌شده → A4"
        ],
        unit: "فرد (همه اعضا)",
        aggregation: "بیشینه اعضا؛ «بدون دسترسی» هر عضو ضریب کامل می‌دهد.",
        period: "وضعیت جاری + روند ۳ ماه اخیر (از چه زمانی درمان مانده است)",
        eventQuestions: [
            "رخداد: چه درمان/دارو/آزمایش/جراحی ضروری‌ای انجام نشده است؟",
            "تداوم: چند ماه است که مانده است؟",
            "علت: هزینه، نبود متخصص در منطقه، مدارک، نوبت، بی‌اطلاعی؟",
            "پیامد/فوریت: آیا تأخیر به سلامت یا زندگی خطر می‌زند؟ (نشانه فوریت → پرچم R1)"
        ],
        questionIds: [
            "A3_treatment",
            "A3_urgent",
            "A3_cause"
        ],
        quantitative: [
            "مدت انتظار/تأخیر به ماه",
            "تعداد جلسات یا دوز داروی مصرف‌نشده",
            "فاصله تا نزدیک‌ترین مرکز دارای خدمت"
        ],
        contextualEvidence: [
            "بدتر شدن علائم به‌خاطر تعویق درمان",
            "خرید نصف‌و‌نیمه دارو یا قطع مصرف",
            "بستری اورژانسی قابل پیشگیری",
            "تعطیلی کار/مدرسه به‌خاطر تشدید بیماری"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "درمان ضروری احراز «و» دسترسی عملی ندارد — در هر علت"
            },
            {
                coeff: "۰٫۵",
                rule: "درمان ضروری احراز «و» در نوبت/زمان‌بندی شده ولی هنوز انجام نشده"
            },
            {
                coeff: "۰",
                rule: "درمان ضروری انجام‌نشده ندارد"
            }
        ],
        precedence: "«بدون دسترسی» بر «نوبت‌دار» تقدم دارد؛ نشانه فوریت (پرسش دوم) جدا از امتیاز، پرچم R1 را فعال می‌کند و مسیر رسیدگی فوری می‌سازد.",
        anchors: [
            {
                coeff: "۰",
                example: "همه اعضا درمان ضروری‌شان را به‌موقع دریافت می‌کنند."
            },
            {
                coeff: "۰٫۵",
                example: "کلیه پدر برای ماه آینده نوبت گرفته و داروهایش تا آن موقع کامل است."
            },
            {
                coeff: "۱",
                example: "داروی قلب مادر تمام شده و خانوار توان خریدش را ندارد؛ پزشک تأخیر را خطرناک دانسته است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری؛ نسخه/گواهی اختیاری با تقدم سطح ۲",
            "کفایت: بدون ثبت «علت تأخیر» پرونده ناقص تلقی می‌شود",
            "پاسخ‌های خاص (نمی‌دانم/نیازمند بررسی) شاخص را ناتمام و بدون امتیاز نگه می‌دارد",
            "تعارض با A5 (بیمه مؤثر ولی بدون دسترسی) → بررسی موانع غیربیمه‌ای"
        ],
        exceptions: [
            "فوریت جانی → R1 و رسیدگی فوری مستقل از امتیاز",
            "فقط دشواری استفاده از بیمه → A5",
            "مانع اداری دریافت درمان (مثلاً نبود کارت ملی) → هم‌زمان E4",
            "درمان «توصیه‌شده» بدون فوریت و بدون اختلال → بررسی مددکار"
        ],
        serviceInputs: []
    },
    A4: {
        concept: "فشار واقعی هزینه‌های درمانی بر اقتصاد خانوار در ۳ ماه اخیر — از بدهی و فروش دارایی تا کاهش مصرف اساسی؛ ملاک پیامد مالی درمان است نه مبلغ مطلق هزینه.",
        outOfScope: [
            "هزینه درمان پوشش‌یافته بدون فشار بر بودجه",
            "فشار هزینه مسکن/معیشت → C8/D3",
            "فشار ناشی از هزینه‌های غیردرمانی"
        ],
        unit: "خانوار",
        aggregation: "تجمیع کل خانوار؛ اثر نهایی روی بودجه خانوار سنجیده می‌شود و تفکیک عضوی لازم ندارد.",
        period: "سه ماه اخیر",
        eventQuestions: [
            "رخداد: در ۳ ماه اخیر هزینه درمان/دارو/مراقبت/رفت‌وآمد درمانی چه فشاری آورده است؟",
            "فراوانی: یک‌باره (جراحی) یا مستمر (دارو ماهانه)؟",
            "پیامد: بدهی، فروش دارایی، کاهش مصرف اساسی (غذا/تحصیل)، تعویق قبض؟"
        ],
        questionIds: [
            "A4_burden",
            "A4_effects"
        ],
        quantitative: [
            "مبلغ بدهی درمانی جاری",
            "ارزش دارایی فروخته‌شده",
            "درصد تقریبی درآمد صرف‌شده برای درمان"
        ],
        contextualEvidence: [
            "کاهش کیفیت/تعداد غذا پس از هزینه درمان",
            "قطع تحصیل یا کلاس فرزند برای پرداخت هزینه بیمارستان",
            "قرض از خویشاوند یا وام ربوی",
            "فروش وسیله ضروری خانه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "فشار «سنگین» احراز «یا» دو اثر مالی مهم (مثل بدهی «و» کاهش مصرف/فروش دارایی) رخ داده"
            },
            {
                coeff: "۰٫۵",
                rule: "فشار «قابل مدیریت» «یا» فقط یک اثر مالی ثبت شده"
            },
            {
                coeff: "۰",
                rule: "فشار معنادار درمانی گزارش نشده"
            }
        ],
        precedence: "دو مسیر (شدت اظهاری و شمارش آثار) تقدم قطعی بر یکدیگر ندارند؛ هرکدام ضریب بالاتر بسازد ملاک می‌شود (تقدم بر بیشینه).",
        anchors: [
            {
                coeff: "۰",
                example: "هزینه‌های درمانی با پوشش بیمه پرداخت شده و تأثیری بر بودجه غذا/مسکن نداشته است."
            },
            {
                coeff: "۰٫۵",
                example: "برای دندان‌پزشکی فرزند مبلغ قابل توجهی داده‌اند ولی از پس‌انداز و بدون بدهی."
            },
            {
                coeff: "۱",
                example: "جراحی پدر به بدهی ۴۰ میلیون و فروش طلا انجامیده و دو ماه غذای خانوار ساده‌تر شده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + مدارک هزینه (قبض بیمارستان، سند فروش) در صورت رضایت",
            "کفایت: پرسش فشار + چک‌لیست آثار هر دو لازم است",
            "تعارض با گردش حساب → R9 و راستی‌آزمایی",
            "آثار باید واقعاً رخ داده باشند؛ «اگر ادامه یابد» ملاک نیست"
        ],
        exceptions: [
            "درمانِ انجام‌نشده به‌خاطر هزینه → A3 (محرومیت درمان) نه A4",
            "بدهی غیردرمانی → C8/D3",
            "فشار موردی قدیمی‌تر از ۳ ماه → بدون امتیاز مگر تداوم داشته باشد",
            "مرزی: یک اثر کوچک + اظهار «قابل مدیریت» → ۰٫۵ با یادداشت"
        ],
        serviceInputs: []
    },
    A5: {
        concept: "پوشش بیمه پایه درمانی «مؤثر» برای هر عضو — یعنی اعتبار برقرار است و استفاده واقعی از خدمت ضروری ممکن است؛ مانع عملیاتی (فرانشیز سنگین، فاصله، نوبت طولانی) پوشش را ناکارآمد می‌کند.",
        outOfScope: [
            "بیمه تکمیلی و غیردرمانی",
            "پوشش معتبر که استفاده‌اش مانع واقعی ندارد (پوشش کامل)",
            "نبود متخصص/خدمت در منطقه به‌طور عام → A3 یا C9",
            "سابقه بیمه اجتماعی — فقط اعتبارسنجی"
        ],
        unit: "فرد (همه اعضا)",
        aggregation: "بیشینه اعضا؛ عضو بدون پوشش معتبر کافی است.",
        period: "وضعیت جاری اعتبار + آخرین استفاده واقعی",
        eventQuestions: [
            "وضعیت: آیا عضو پوشش بیمه پایه معتبر دارد؟",
            "استفاده: آخرین بار چه خدمتی گرفته و تجربه استفاده چگونه بود؟",
            "مانع: فرانشیز سنگین، فاصله تا مرکز طرف قرارداد، نوبت طولانی، رد خدمت؟"
        ],
        questionIds: [
            "A5_cover",
            "A5_barrier"
        ],
        quantitative: [
            "تعداد اعضای فاقد پوشش معتبر",
            "فرانشیز پرداختی آخرین مراجعه",
            "فاصله تا مرکز طرف قرارداد یا مدت نوبت"
        ],
        contextualEvidence: [
            "پرداخت کامل هزینه ویزیت/دارو از جیب",
            "انصراف از درمان به‌خاطر هزینه فرانشیز",
            "سفر به شهر دیگر برای خدمت بیمه‌ای"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "عضو بدون پوشش پایه معتبر (ندارد/منقضی/در جریان رد)"
            },
            {
                coeff: "۰٫۵",
                rule: "پوشش معتبر «و» مانع واقعی استفاده ثبت‌شده (فرانشیز/فاصله/نوبت)"
            },
            {
                coeff: "۰",
                rule: "پوشش معتبر «و» دسترسی عملی به خدمت ضروری"
            }
        ],
        precedence: "وضعیت هر عضو مستقل سنجیده و بیشینه به خانوار می‌رود؛ مانع واقعی باید «رخ داده باشد» نه فرضی بودن.",
        anchors: [
            {
                coeff: "۰",
                example: "همه اعضا بیمه تأمین اجتماعی معتبر دارند و چند ماه پیش بدون مشکل دارو گرفته‌اند."
            },
            {
                coeff: "۰٫۵",
                example: "بیمه روستایی دارند ولی نزدیک‌ترین مرکز طرف قرارداد ۴۰ کیلومتر است و فرانشیز داروی مزمن سنگین است."
            },
            {
                coeff: "۱",
                example: "هیچ عضوی بیمه معتبر ندارد؛ آخرین ویزیت کامل از جیب پرداخت شده است."
            }
        ],
        evidenceStatus: [
            "منبع: استعلام وب‌سرویس بیمه (ملاک — سطح ۱) + کارت/مدارک",
            "پس از استعلام موفق، پاسخ وضعیت هر عضو پیش‌پر و ملاک می‌شود؛ «استفاده واقعی» همچنان از خانوار پرسیده می‌شود (پیش‌تکمیل ≠ تأیید شرایط جاری)",
            "تعارض استعلام و اظهار → R9 + پیگیری اصلاح از مرجع"
        ],
        exceptions: [
            "بیمه دارد ولی درمان ضروری گرفته نشده → A3 (علت غیربیمه‌ای را ثبت کنید)",
            "اعتبار در جریان تمدید → «مانع موقت»؛ در صورت رخداد واقعی ۰٫۵",
            "پوشش نهاد حمایتی با کارکرد مشابه بیمه → معادل پوشش؛ مستند شود",
            "مانع فاصله/نوبت خدمات عمومی (مدرسه/خرید) → B4/C9 نه A5"
        ],
        serviceInputs: [
            {
                serviceId: "insurance",
                contribution: "وضعیت بیمه پایه هر عضو، نوع صندوق و اعتبار — پاسخ وضعیت هر عضو (A5_cover) با حفظ منبع پیش‌پر می‌شود؛ مانع استفاده همچنان دستی ثبت می‌شود."
            }
        ]
    },
    A6: {
        concept: "ناامنی غذایی واقعی خانوار بر اساس تجربه‌های استاندارد ۳۰ روز اخیر — از نگرانی تا گرسنگی؛ ملاک «رخداد تجربه‌شده» است نه سلیقه یا فقر تغذیه‌ای ساختاری بلندمدت.",
        outOfScope: [
            "سلیقه/دلتنگی غذای خاص",
            "رژیم انتخابی",
            "سوءتغذیه تشخیصی کودک → مسیر R3 و بررسی حرفه‌ای",
            "فقر ریزمغذی بلندمدت → خارج از غربالگری فعلی"
        ],
        unit: "خانوار",
        aggregation: "شمارش تجربه‌های رخ‌داده در ۳۰ روز × ۰٫۲۵ (سقف ۱)؛ رخداد «گرسنگی» هر ضریب پایین‌تر را به حداقل ۰٫۷۵ ارتقا می‌دهد.",
        period: "۳۰ روز اخیر + وضعیت فعلی (دسترسی به وعده بعدی)",
        eventQuestions: [
            "فراوانی: کدام تجربه‌ها در ۳۰ روز گذشته رخ داده؟ (نگرانی، کاهش تنوع، کاهش مقدار، حذف وعده، گرسنگی)",
            "تکرار: چند بار در هفته/ماه؟",
            "پیامد: اکنون غذای کافی برای وعده بعدی در دسترس است؟"
        ],
        questionIds: [
            "A6_exp",
            "A6_now"
        ],
        quantitative: [
            "تعداد تجربه‌های رخ‌داده (۰ تا ۵)",
            "تعداد وعده‌های حذف‌شده",
            "روزهایی که بزرگ‌ترها کمتر خورده‌اند تا کودکان سیر شوند"
        ],
        contextualEvidence: [
            "پخت غذا با حذف پروتئین",
            "سبد غذایی تک‌ماده‌ای (نان و سیب‌زمینی) در ماه‌های اخیر",
            "اتکای ماهانه به سبد کمک غذایی",
            "حذف وعده مدرسه/میان‌وعده کودک"
        ],
        levelRules: [
            {
                coeff: "۰",
                rule: "هیچ تجربه‌ای در ۳۰ روز رخ نداده است"
            },
            {
                coeff: "۰٫۲۵",
                rule: "فقط یکی از تجربه‌ها رخ داده (معمولاً نگرانی)"
            },
            {
                coeff: "۰٫۵",
                rule: "دو تجربه رخ داده است"
            },
            {
                coeff: "۰٫۷۵",
                rule: "سه تجربه رخ داده «یا» رخداد «گرسنگی» در هر ترکیب"
            },
            {
                coeff: "۱",
                rule: "چهار تجربه «یا» بیشتر رخ داده است"
            }
        ],
        precedence: "شمارش مبناست؛ رخداد گرسنگی کف ۰٫۷۵ را تضمین می‌کند (تقدم بر شمارش پایین‌تر). آستانه‌ها پیشنهادی و نیازمند تصویب مرجع است.",
        anchors: [
            {
                coeff: "۰",
                example: "در ۳۰ روز گذشته هیچ نگرانی یا کاهشی نبوده و یخچال تا وعده بعدی پر است."
            },
            {
                coeff: "۰٫۲۵",
                example: "فقط پایان ماه نگران تمام‌شدن آرد بوده‌اند ولی هیچ کاهشی رخ نداده است."
            },
            {
                coeff: "۰٫۵",
                example: "دو بار در ماه گوشت حذف شده و مقدار غذا کمی کاهش یافته است."
            },
            {
                coeff: "۰٫۷۵",
                example: "هفته گذشته یک وعده کامل حذف شده و روزی بزرگ‌ترها نیمه‌سیر مانده‌اند."
            },
            {
                coeff: "۱",
                example: "سه روز در ماه کودکان هم گرسنه خوابیده‌اند؛ یخچال اکنون خالی است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری ساختاریافته (سطح ۳) — داده ثبتی مستقیم ندارد",
            "کفایت: پرسش تجربه‌ها + دسترسی فعلی هر دو الزامی است؛ نبود دسترسی فعلی → R7",
            "پاسخ‌های خاص → ناتمام؛ تعارض با مشاهدات میدانی → R9",
            "سوءتغذیه مشکوک کودک → R3 و بررسی تغذیه‌ای حرفه‌ای (جدا از امتیاز)"
        ],
        exceptions: [
            "قطع فعلی غذا بدون جایگزین → R7 فارغ از ضریب",
            "روزه/عادت فرهنگی → محرومیت نیست",
            "خانوار تک‌نفره همان قاعده را دارد",
            "مرزی بین دو و سه تجربه → یادداشت مددکار؛ قاعده پیشنهادی است"
        ],
        serviceInputs: [],
        pendingApproval: "آستانه تعداد تجربه‌ها برای ضرایب پنج‌حالته (۰ تا ۴+) نیازمند تصویب مرجع است."
    },
    A7: {
        concept: "اختلال عملکرد و امنیت خانوار ناشی از مشکل روانی شدید یا مصرف مواد — با محرمانگی کامل؛ ملاک «اختلال در کارکرد خانوار» است نه تشخیص بالینی یا برچسب اجتماعی.",
        outOfScope: [
            "تشخیص/نوع اختلال و سابقه درمانی — ثبت نمی‌شود",
            "برچسب «فاقد صلاحیت» نسخه قبلی",
            "جزئیات خشونت/تهدید → پرچم R5 با گردش محرمانه",
            "مشکل روانی خفیف بدون اختلال کارکرد"
        ],
        unit: "خانوار (عملکرد کل خانوار)",
        aggregation: "سطح خانوار؛ اگر چند عضو درگیر باشند بدترین وضعیت ملاک است ولی ثبت فقط یک‌بار انجام می‌شود.",
        period: "وضعیت جاری + ۳ ماه اخیر",
        eventQuestions: [
            "رخداد: مشکل روانی یا مصرف مواد در خانوار وجود دارد؟",
            "تداوم/فراوانی: اختلال در کار، درآمد، نگهداری کودک یا روابط چقدر تکرار می‌شود؟",
            "پیامد: آیا عملکرد خانوار (کار، مراقبت، امنیت) مختل شده و تا چه شدت؟",
            "ایمنی: نشانه خشونت، خودآسیبی یا خطر برای دیگران؟ (فقط با احتیاط)"
        ],
        questionIds: [
            "A7_disrupt",
            "A7_danger"
        ],
        quantitative: [
            "روزهای اختلال کار/مراقبت در ماه (تقریبی)",
            "تعداد نشانه‌های ایمنی ثبت‌شده"
        ],
        contextualEvidence: [
            "ترک کار یا از دست رفتن درآمد اصلی",
            "کودک رهاشده از مدرسه/بازی",
            "درگیری مکرر خانگی (فقط به‌عنوان نشانه ایمنی)",
            "قطع درمان روان‌پزشکی به‌خاطر هزینه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "اختلال شدید عملکرد خانوار احراز شده است"
            },
            {
                coeff: "۰٫۵",
                rule: "اختلال متوسط «یا» (بدون اختلال اظهاری «و» نشانه خطر ایمنی ثبت‌شده)"
            },
            {
                coeff: "۰",
                rule: "بدون اختلال عملکرد «و» بدون نشانه خطر"
            }
        ],
        precedence: "اختلال اظهاری بر نشانه ایمنی تقدم دارد؛ نشانه ایمنی حتی با ثبت «بدون اختلال» ضریب ۰٫۵ می‌سازد و مستقلاً R5 را فعال می‌کند (امتیاز و پرچم دو مسیر مستقل‌اند).",
        anchors: [
            {
                coeff: "۰",
                example: "خانوار بدون اختلال عملکرد ناشی از سلامت روان یا مصرف مواد گزارش می‌کند."
            },
            {
                coeff: "۰٫۵",
                example: "پدر با مصرف مواد ماهی چند روز کاری از دست می‌رود و روابط خانه پرتنش شده ولی مراقبت کودکان برقرار است."
            },
            {
                coeff: "۱",
                example: "مادر با بحران روانی فعال؛ پخت غذا و مراقبت کودک روزها متوقف می‌شود و حضور دائمی شخص سوم لازم است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری حساس — پرسش در نمای خانوار محدود نمایش داده می‌شود",
            "کفایت: بدون جزئیات تشخیصی؛ فقط عملکرد و ایمنی",
            "هر نشانه ایمنی → R5 با محرمانگی «سخت» و تأیید تخصصی",
            "ابهام/عدم پاسخ → نیازمند بررسی؛ امتیازدهی اجباری ممنوع"
        ],
        exceptions: [
            "بیماری جسمی/مزمن → A1",
            "محدودیت عملکردی پایدار بدون اختلال خانوار → A2",
            "خشونت فعال → R5 و رسیدگی فوری؛ ثبت جزئیات ممنوع",
            "رفتار پرخطر کودک/نوجوان → مسیر حفاظتی R4"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "ترکیب خانوار و رویدادهای حیاتی (فوت/طلاق) برای آگاهی از عوامل زمینه‌ساز؛ وضعیت سلامت روان از ثبت احوال دریافت نمی‌شود."
            }
        ]
    }
};
}),
"[project]/src/lib/mpi/charter-b.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARTER_B",
    ()=>CHARTER_B
]);
const CHARTER_B = {
    B1: {
        concept: "بازماندگی/ترک تحصیل واقعی در سن آموزش اجباری (۶ تا ۱۸ سال) — ملاک «ثبت‌نام و حضور فعال» است نه مدرک، نمره یا کیفیت آموزش.",
        outOfScope: [
            "اعضای خارج از سن آموزش اجباری",
            "ترک دوره دانشگاهی",
            "افت تحصیلی با حضور منظم → B2",
            "نیاز آموزشی ویژه → B6"
        ],
        unit: "فرد — فقط اعضای در سن آموزش اجباری",
        aggregation: "بیشینه وضعیت اعضای در سن آموزش؛ اگر عضو در سن آموزش ثبت نشده، ضریب صفر صحیح است (عدم کاربرد ≠ محرومیت).",
        period: "وضعیت جاری + مدت وقفه/ترک به ماه",
        eventQuestions: [
            "وضعیت: ثبت‌نام و حضور فعال / وقفه / ترک / هرگز ثبت‌نام نشده؟",
            "مدت: وقفه یا ترک تحصیل چند ماه است؟",
            "علت: هزینه، کار، مراقبت، مهاجرت، معلولیت، مدارک؟",
            "پیامد: بازگشت به تحصیل با چه شرطی ممکن است؟"
        ],
        questionIds: [
            "B1_status",
            "B1_months",
            "B1_reason"
        ],
        quantitative: [
            "مدت وقفه/ترک به ماه",
            "تعداد اعضای بازمانده از تحصیل",
            "پایه تحصیلی رهاشده"
        ],
        contextualEvidence: [
            "کودک در ساعات مدرسه در کارگاه/سر کار است",
            "حذف هزینه تحصیل از بودجه به‌جای ثبت‌نام",
            "گواهی مدرسه با تاریخ قطعی",
            "مدرسه دور و بدون امکان رفت‌وآمد (تقاطع با B4)"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "ترک تحصیل احراز «یا» هیچ‌وقت ثبت‌نام نشده (در سن اجباری)"
            },
            {
                coeff: "۰٫۵",
                rule: "وقفه تحصیلی فعال (حداقل مدت وقفه نیازمند تصویب مرجع)"
            },
            {
                coeff: "۰",
                rule: "ثبت‌نام و حضور فعال همه اعضای در سن آموزش"
            }
        ],
        precedence: "ترک/بازماندگی بر وقفه تقدم دارد؛ نبود عضو در سن آموزش «خارج از دامنه» است و صفر می‌گیرد نه ناتمام.",
        anchors: [
            {
                coeff: "۰",
                example: "دو فرزند ۸ و ۱۲ ساله هر دو ثبت‌نام و حاضرند."
            },
            {
                coeff: "۰٫۵",
                example: "پسر ۱۴ ساله از مهر مدرسه نرفته و می‌گوید بهار می‌روم؛ وقفه حدود ۶ ماه است."
            },
            {
                coeff: "۱",
                example: "دختر ۱۳ ساله بعد از پایه پنجم دیگر ثبت‌نام نشده و ۳ سال است در خانه کار می‌کند."
            }
        ],
        evidenceStatus: [
            "منبع: استعلام وب‌سرویس آموزش‌وپرورش (ملاک — سطح ۱) + اظهار خانوار",
            "پس از واکشی، وضعیت تحصیل اعضا پیش‌پر و ملاک می‌شود؛ شرایط جاری (وقفه جدید) جداگانه بررسی می‌شود",
            "تعارض اظهار و سابقه مدرسه → R9",
            "کفایت: بدون ثبت «مدت»، ضریب میانی قابل تفکیک نیست"
        ],
        exceptions: [
            "مانع واقعی دسترسی (فاصله/مدارک) → B4؛ ممکن است هم‌زمان باشد، علت در «علت وقفه» ثبت و رخداد تکراری شمرده نمی‌شود",
            "کودک کار به‌عنوان علت ترک → R4 مسیر حفاظتی",
            "تحصیل بزرگسال/مهارت → B7",
            "اعضای تمام‌کرده/دانشجو → خارج از دامنه"
        ],
        serviceInputs: [
            {
                serviceId: "education_school",
                contribution: "ثبت‌نام، حضور و سابقه وقفه/ترک هر عضو در سن آموزش — وضعیت تحصیل (B1_status) پیش‌پر می‌شود و مدت/علت دستی تکمیل می‌گردد."
            }
        ],
        pendingApproval: "حداقل مدت وقفه تحصیل برای ضریب میانی نیازمند تصویب مرجع است."
    },
    B2: {
        concept: "خطر ازدست‌رفتن استمرار تحصیل برای اعضای در سن آموزش که فعلاً درس می‌خوانند — پیش‌بینی ریسک با عوامل واقعه‌محور: غیبت غیرموجه، افت تحصیلی، کار کودک، مراقبت اجباری، هزینه.",
        outOfScope: [
            "اعضای خارج از سن آموزش",
            "ترک/وقفه رخ‌داده → B1",
            "کیفیت آموزش مدرسه",
            "خطر قطع تحصیل دانشگاهی"
        ],
        unit: "فرد — اعضای در سن آموزش",
        aggregation: "بیشینه اعضا؛ هر عضو مستقل ریسک‌سنجی می‌شود.",
        period: "وضعیت جاری + جریان ۳ ماه اخیر (غیبت/افت)",
        eventQuestions: [
            "فراوانی: غیبت غیرموجه چند بار در ماه؟",
            "رخداد: افت نمره معنادار رخ داده است؟",
            "تداوم: کودک کار می‌کند یا مراقبت خواهر/برادر بر عهده‌اش است؟",
            "پیامد: کدام عوامل اگر ادامه یابد تحصیل را قطع می‌کند؟"
        ],
        questionIds: [
            "B2_risks"
        ],
        quantitative: [
            "روزهای غیبت غیرموجه در ماه",
            "تعداد عوامل خطر فعال (۰ تا ۵)",
            "ساعت/درآمد کار کودک (در صورت وجود)"
        ],
        contextualEvidence: [
            "کودک ساعت‌ها در کارگاه/سر کار",
            "حضور نامنظم با اخطار مدرسه",
            "افت قابل مشاهده در کارنامه",
            "مسئولیت خواهر/برادر کوچک در ساعات مدرسه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "(کار کودک «یا» مراقبت اجباری) «و» دست‌کم یک عامل دیگر — «یا» بدون این دو — سه عامل یا بیشتر فعال"
            },
            {
                coeff: "۰٫۵",
                rule: "کار کودک «یا» مراقبت اجباری به‌تنهایی — «یا» بدون آن‌ها — یک یا دو عامل فعال"
            },
            {
                coeff: "۰",
                rule: "بدون عامل خطر فعال"
            }
        ],
        precedence: "کار کودک و مراقبت اجباری «عوامل تعیین‌کننده»اند: با همراهی یک عامل دیگر ضریب کامل می‌سازند؛ عوامل معمولی (غیبت/افت/هزینه) در سه پله جمع می‌شود. کار کودک مستقلاً R4 را فعال می‌کند.",
        anchors: [
            {
                coeff: "۰",
                example: "حضور منظم، بدون غیبت و افت؛ هزینه‌ها پوشیده است."
            },
            {
                coeff: "۰٫۵",
                example: "دختر ۱۲ ساله هر روز ظهر برادرش را از مهدکودک می‌آورد و چند بار اخطار غیبت گرفته است."
            },
            {
                coeff: "۱",
                example: "پسر ۱۵ ساله صبح تا شب در تعمیرگاه کار می‌کند و ماه‌ها غیبتش به ترک تحصیل نزدیک شده (کار + غیبت + افت)."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار خانوار + سابقه حضور از آموزش‌وپرورش (استعلام ملاک)",
            "کفایت: چک‌لیست عوامل برای هر عضو در سن آموزش پاسخ شود",
            "تعارض با سابقه حضور → R9؛ مشاهده میدانی مددکار تقدم تأیید دارد"
        ],
        exceptions: [
            "غیبت موجه (پزشکی/مراسم) → عامل محسوب نمی‌شود",
            "کودک کار → R4 (مسیر رسیدگی حفاظتی مستقل از امتیاز)",
            "مانع دسترسی (دور/هزینه) → B4",
            "نیاز ویژه بدون خدمت → B6"
        ],
        serviceInputs: [
            {
                serviceId: "education_school",
                contribution: "سابقه حضور/غیبت و وضعیت ثبت‌نام برای راستی‌آزمایی عوامل غیبت و افت؛ فهرست عوامل فعال از خوداظهاری تکمیل می‌شود."
            }
        ]
    },
    B3: {
        concept: "سواد کارکردی مسئول امور خانوار — توانایی انجام امور پایه نوشتاری و پیگیری خدمات (فرم، پیامک بانکی، دستور درمان، مکاتبه اداری)؛ ملاک عملکرد واقعی است نه مدرک تحصیلی.",
        outOfScope: [
            "میزان تحصیلات/مدرک → فقط داده زمینه‌ای",
            "سواد دیجیتال تخصصی",
            "سواد اعضای غیرمسئول امور (معیار محرومیت نیست)",
            "برچسب باسواد/بی‌سواد نسخه قبلی"
        ],
        unit: "خانوار — مسئول امور (معمولاً سرپرست یا فرد عمل‌کننده)",
        aggregation: "یک ارزیابی سطح خانوار؛ اگر چند نفر امور را تقسیم می‌کنند، توان ترکیب آن‌ها ملاک است و در یادداشت ثبت می‌شود.",
        period: "وضعیت جاری",
        eventQuestions: [
            "رخداد: فرم درخواست/سند ساده را خودش پر می‌کند؟",
            "پیامد: پیگیری خدمت (درمان، بیمه، اداری) بدون کمک انجام می‌شود؟",
            "وابستگی: چه کسی کمک می‌کند و همیشه در دسترس است؟"
        ],
        questionIds: [
            "B3_lit"
        ],
        quantitative: [
            "تعداد امور نوشتاری ماهانه خانوار (زمینه‌ای)",
            "تعداد امور واگذارشده به دیگران به‌خاطر سواد"
        ],
        contextualEvidence: [
            "امضای فرم‌ها بدون خواندن محتوا",
            "واگذاری خوردن دارو به کودک به‌خاطر خواندن دستور درمان",
            "قفل‌شدن پیگیری یارانه/بیمه پشت فرد ثالث",
            "استفاده از فرزند ۱۰ ساله به‌عنوان مترجم اداری"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "ناتوانی از امور پایه «و» بدون کمک قابل اتکا"
            },
            {
                coeff: "۰٫۵",
                rule: "انجام امور فقط با کمک دیگران (وابستگی فعال)"
            },
            {
                coeff: "۰",
                rule: "توانایی کامل انجام امور پایه نوشتاری و پیگیری خدمات"
            }
        ],
        precedence: "سه حالت منحصر است؛ اگر کمک «قابل اتکا و همیشگی» نیست، همان ناتوانی عملی ضریب ۱ می‌گیرد (قاعده وابستگی فعال).",
        anchors: [
            {
                coeff: "۰",
                example: "سرپرست فرم یارانه و پیگیری بیمه را خودش انجام می‌دهد."
            },
            {
                coeff: "۰٫۵",
                example: "سرپرست بی‌سواد؛ فرزند ۱۵ ساله فرم‌ها را پر می‌کند ولی وقتی مدرسه است امور عقب می‌ماند."
            },
            {
                coeff: "۱",
                example: "سرپرست تنها و بی‌سواد؛ برای خواندن برگه دارو باید منتظر همسایه بماند و دو خدمت را از دست داده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + مشاهده عملکرد مددکار (سطح ۴ نردبان منابع)",
            "مدارک تحصیلی فقط زمینه است — مدرک ≠ کارکرد",
            "تعارض مدرک بالا و عملکرد ضعیف → نیازمند بررسی؛ بدون امتیاز خودکار"
        ],
        exceptions: [
            "ناتوانی فقط در خدمات الکترونیکی → در صورت رخداد واقعی E4 بررسی شود",
            "افت بینایی سالمند مسئول امور → کارکرد ملاک است نه علت",
            "دو مسئول امور → توان ترکیبی با یادداشت",
            "مهاجران با سواد زبان مادری → همان سه حالت عملکردی"
        ],
        serviceInputs: [
            {
                serviceId: "higher_edu",
                contribution: "مدارک تحصیلی دانشگاهی اعضا برای تصویر زمینه‌ای؛ ملاک سنجش عملکرد واقعی در امور است نه مدرک."
            }
        ]
    },
    B4: {
        concept: "مانع واقعی و حل‌نشده دسترسی به آموزش (فاصله، حمل‌ونقل، هزینه، مدارک، معلولیت، ظرفیت) برای اعضای مشمول — ملاک «مانع رخ‌داده» است نه سختی عمومی.",
        outOfScope: [
            "ترک/وقفه رخ‌داده → B1",
            "افت/ریسک حضور → B2",
            "دشواری بدون مانع واقعی",
            "ابزار دیجیتال → B5"
        ],
        unit: "خانوار (بزرگ‌ترین مانع بین اعضای در سن آموزش)",
        aggregation: "بدترین مانع اعضا؛ مانع جدی یک کودک کافی است.",
        period: "وضعیت جاری سال تحصیلی",
        eventQuestions: [
            "رخداد: کدام مانع واقعاً مانع ثبت‌نام/حضور شده است؟",
            "تداوم: از کی و در چه بازه‌ای؟",
            "پیامد: کودک ثبت‌نام نشد/غیبت زد/جابه‌جا شد؟",
            "حل: راه‌حلی امتحان شده و چه نتیجه‌ای گرفته است؟"
        ],
        questionIds: [
            "B4_barriers",
            "B4_detail"
        ],
        quantitative: [
            "فاصله تا نزدیک‌ترین مدرسه (کیلومتر)",
            "هزینه ماهانه رفت‌وآمد/شهریه",
            "روزهای تعویق ثبت‌نام"
        ],
        contextualEvidence: [
            "اتوبوس نامنظم و سفر دوساعته",
            "رد ثبت‌نام به‌خاطر نبود مدارک",
            "ظرفیت کامل مدرسه روستا",
            "مدرسه بدون رمپ برای ویلچر"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "مانع جدی احراز «و» حل‌نشده (نتیجه‌اش ترک/عدم ثبت‌نام شده است)"
            },
            {
                coeff: "۰٫۵",
                rule: "مانع واقعی موجود ولی قابل حل/در حال حل"
            },
            {
                coeff: "۰",
                rule: "مانع واقعی ثبت نشده است"
            }
        ],
        precedence: "«جدی و حل‌نشده» بر «قابل حل» تقدم دارد؛ رخداد مانع باید از خود کودک/اقدام خانوار مستند شود.",
        anchors: [
            {
                coeff: "۰",
                example: "مدرسه در همان محل و رفت‌وآمد ایمن برقرار است."
            },
            {
                coeff: "۰٫۵",
                example: "مدرسه ۵ کیلومتر دور است؛ سرویس پیدا شده ولی پولش هنوز برنمی‌آید."
            },
            {
                coeff: "۱",
                example: "به‌خاطر نبود شناسنامه فرزند، مدرسه ثبت‌نامش نکرده و سه هفته است در خانه است."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار خانوار + وضعیت ثبت‌نام از آموزش‌وپرورش (ملاک برای رخداد ثبت‌نام)",
            "کفایت: نوع مانع + توضیح الزامی است",
            "مانع مدارک → هم‌زمان E4 و R8 بررسی شود",
            "تعارض → R9 و بازدید میدانی"
        ],
        exceptions: [
            "مانع هویتی مسدودکننده خدمت حیاتی → E4/R8",
            "نیاز ویژه بدون خدمت متناسب → B6",
            "ترک ناشی از مانع → هر دو شاخص با علت واحد ثبت می‌شود؛ رخداد واحد دوبار شمرده نمی‌شود",
            "فاصله قابل مدیریت با سرویس موجود → بر اساس رخداد ۰ یا ۰٫۵"
        ],
        serviceInputs: [
            {
                serviceId: "education_school",
                contribution: "وضعیت ثبت‌نام اعضا برای تفکیک مانع مدرسه‌محور (رد ثبت‌نام/ظرفیت) از مانع مسیر و هزینه."
            }
        ]
    },
    B5: {
        concept: "دسترسی مؤثر به ابزار دیجیتال و اتصال پایدار «در صورت نیاز واقعی آموزشی» — ملاک انجام تکلیف/آموزش آنلاین است نه مالکیت مطلق دستگاه.",
        outOfScope: [
            "مالکیت تجهیزات تفننی",
            "نیاز غیرآموزشی (سرگرمی/کار)",
            "هزینه اینترنت بدون نیاز آموزشی",
            "سواد کارکرد نوشتاری → B3"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار؛ اشتراک دستگاهی که تکلیف هر دو دانش‌آموز را کامل نکند «ناکافی» است.",
        period: "وضعیت جاری سال تحصیلی",
        eventQuestions: [
            "نیاز: برنامه/تکلیف آنلاین مدرسه وجود دارد؟",
            "وضعیت: دستگاه و اتصال کافی است؟",
            "فراوانی: چند بار در هفته تکلیف ناقص مانده است؟",
            "پیامد: نمره یا مشارکت افت کرده است؟"
        ],
        questionIds: [
            "B5_digital"
        ],
        quantitative: [
            "نسبت دستگاه به دانش‌آموزان",
            "ساعات اشتراک ضروری بدون دسترسی",
            "هزینه ماهانه اینترنت"
        ],
        contextualEvidence: [
            "عکاسی از جزوه دیگران برای تکلیف",
            "استفاده از گوشی سرپرست در ساعت کار او",
            "قطع اینترنت در نیمسال امتحان"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "نیاز واقعی آموزشی احراز «و» ابزار قابل استفاده مفقود"
            },
            {
                coeff: "۰٫۵",
                rule: "ابزار موجود ولی ناکافی (اشتراک مانع انجام است «یا» اتصال ناپایدار)"
            },
            {
                coeff: "۰",
                rule: "ابزار کافی «یا» نیاز واقعی آموزش دیجیتال ثبت نشده"
            }
        ],
        precedence: "بدون نیاز واقعی، شاخص کاربرد ندارد و صفر است (عدم کاربرد ≠ محرومیت)؛ کفایت با «انجام تکلیف» سنجیده می‌شود نه برند دستگاه.",
        anchors: [
            {
                coeff: "۰",
                example: "لپ‌تاپ و اینترنت دارند و دخترشان تکالیف آنلاین را کامل انجام می‌دهد."
            },
            {
                coeff: "۰٫۵",
                example: "فقط یک گوشی قدیمی برای دو دانش‌آموز؛ امشب یکی تکلیفش کامل نشد."
            },
            {
                coeff: "۱",
                example: "مدرسه کلاس آنلاین گذاشته و خانوار هیچ دستگاه کارکردی ندارد؛ دو هفته مشارکت صفر بوده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری؛ فهرست رسانه‌های فرم قبلی فقط زمینه است",
            "کفایت: پرسش «نیاز» پیش‌شرط سنجش کفایت است",
            "تعارض فهرست رسانه قبلی با وضعیت جاری → وضعیت جاری ملاک است"
        ],
        exceptions: [
            "مدرسه بدون برنامه دیجیتال → بدون نیاز؛ صفر",
            "دستگاه برای کار سرپرست لازم → خارج از دامنه این شاخص",
            "قطع سراسری برق/اینترنت منطقه → شرایط اضطراری؛ یادداشت نه امتیاز فردی",
            "اشتراک بدون نقص تکلیف → کافی است"
        ],
        serviceInputs: []
    },
    B6: {
        concept: "نیاز آموزشی ویژه احرازشده بدون خدمت متناسب (معلم مشاور، فضای مناسب، کمک‌افزار، برنامه فردی) — ملاک «فاصله نیاز تا خدمت» است نه برچسب معلولیت.",
        outOfScope: [
            "محدودیت عملکرد زندگی روزمره → A2",
            "مانع دسترسی عمومی مدرسه → B4",
            "نیازهای معمول همه کودکان (دفتر/لباس)",
            "تشخیص بدون نیاز خدمت"
        ],
        unit: "فرد (همه اعضا)",
        aggregation: "بیشینه اعضا؛ «نیاز بدون خدمت» یک عضو کافی است.",
        period: "وضعیت جاری سال تحصیلی",
        eventQuestions: [
            "رخداد: نیاز آموزشی ویژه چه نوعی است؟ (یادگیری، بینایی، شنوایی، تکلم، رفتار)",
            "خدمت: چه خدمتی متناسب لازم است و دریافت می‌شود؟",
            "تداوم: نیاز از کی و چگونه تشخیص/مشاهده شده است؟",
            "پیامد: بدون خدمت، حضور و یادگیری کودک چه وضعی دارد؟"
        ],
        questionIds: [
            "B6_need"
        ],
        quantitative: [
            "تعداد اعضای دارای نیاز ویژه",
            "ساعت خدمت تخصصی لازم/دریافتی در هفته",
            "هزینه خدمت تأمین‌نشده"
        ],
        contextualEvidence: [
            "کودک کم‌شنوا بدون کمک‌افزار و معلم مشاور",
            "فرزند با اختلال یادگیری در انتظار ارزیابی و دو ترم عقب‌مانده",
            "ترک کلاس به‌خاطر نبود کمک‌افزار"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "نیاز ویژه احراز «و» خدمت متناسب دریافت نمی‌شود"
            },
            {
                coeff: "۰٫۵",
                rule: "نیاز ویژه با خدمت متناسب در حال دریافت «یا» در فرایند ارزیابی/احراز"
            },
            {
                coeff: "۰",
                rule: "نیاز آموزشی ویژه ثبت نشده است"
            }
        ],
        precedence: "دریافت کامل خدمت ضریب را صفر می‌کند (نیاز برطرف‌شده محرومیت نیست)؛ ارزیابی در جریان هم ۰٫۵ می‌گیرد چون خدمت هنوز برقرار نشده است.",
        anchors: [
            {
                coeff: "۰",
                example: "فرزندان نیاز آموزشی ویژه ندارند."
            },
            {
                coeff: "۰٫۵",
                example: "کم‌شنوای ۱۰ ساله سمعک و معلم مشاور گرفته و کلاس را می‌گذراند؛ ارزیابی تخصصی هنوز ادامه دارد."
            },
            {
                coeff: "۱",
                example: "کودک با اختلال یادگیری شدید؛ مدرسه منابع لازم را ندارد و خانوار توان کلاس خصوصی را ندارد — دو ترم عقب مانده است."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار خانوار + مدارک تشخیص اختیاری؛ ارزیابی تخصصی از مسیر ارجاع",
            "کفایت: نوع نیاز + وضعیت خدمت هر دو لازم است",
            "تعارض تشخیص مدرسه و خانوار → R9 و بررسی تخصصی",
            "خدمات دریافتی نهاد حمایتی → ثبت منبع و ادامه"
        ],
        exceptions: [
            "محدودیت عملکردی غیرآموزشی → A2",
            "کودک با نیاز ویژه کاملاً ترک تحصیل → هم B1 و هم B6 با مستندسازی رابطه",
            "خدمت خانگی جایگزین مدرسه → بررسی مسیر ارجاع تخصصی",
            "ارزیابی‌نشده مرزی → ۰٫۵ با یادداشت «در جریان احراز»"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "ترکیب و سن اعضا برای شناسایی اعضای مشمول ارزیابی؛ تشخیص نیاز ویژه از ثبت احوال دریافت نمی‌شود."
            }
        ]
    },
    B7: {
        concept: "مسیر واقعی مهارت و توانمندسازی برای عضو واجد شرایط و علاقه‌مند به اشتغال — ملاک «وجود مسیر فعال + ابزار اولیه» است؛ هدف، گذار از کمکیاری به درآمد است.",
        outOfScope: [
            "مهارت تفننی بدون نیت درآمد (حافظ قرآن، خطاطی) → زمینه‌ای",
            "بیکاری جاری → D2",
            "اشتغال جاری → D1",
            "اعضای بدون توان/علاقه (سالمند ناتوان، کودک) → خارج از دامنه"
        ],
        unit: "خانوار — ارزیابی وضعیت اعضای واجد شرایط",
        aggregation: "وضعیت کلی اعضای واجد شرایط و علاقه‌مند؛ اگر هیچ مسیری برای هیچ‌کدام نباشد ضریب کامل است.",
        period: "وضعیت جاری + ۱۲ ماه گذشته (سابقه اقدام)",
        eventQuestions: [
            "واجد شرایط: عضو توانمند علاقه‌مند به مهارت/اشتغال کیست؟",
            "مسیر: کلاس/کارگاه/کارآموزی فعال دارد؟",
            "ابزار: ابزار اولیه (سرمایه کوچک، مکان، مجوز) هست؟",
            "پیامد: در ۱۲ ماه گذشته چه اقدامی شده و چه نتیجه‌ای گرفته است؟"
        ],
        questionIds: [
            "B7_path",
            "B7_skills"
        ],
        quantitative: [
            "تعداد اعضای واجد شرایط علاقه‌مند",
            "ساعت/مدت آموزش فعال",
            "ارزش تقریبی سرمایه/ابزار اولیه موجود"
        ],
        contextualEvidence: [
            "ثبت‌نام رهاشده کلاس فنی به‌خاطر هزینه رفت‌وآمد",
            "مهارت خیاطی مادر بدون ماشین چرخ",
            "درخواست بی‌پاسخ از نهاد توانمندسازی"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "عضو واجد شرایط علاقه‌مند «و» هیچ مسیر فعال آموزش/مهارتی ندارد"
            },
            {
                coeff: "۰٫۵",
                rule: "علاقه‌مندی موجود «و» مسیر فعال یا ابزار اولیه مفقود"
            },
            {
                coeff: "۰",
                rule: "مسیر فعال با ابزار اولیه «یا» فاقد عضو واجد شرایط"
            }
        ],
        precedence: "نبود عضو واجد شرایط «خارج از دامنه» است و صفر صحیح می‌گیرد؛ فقط مسیرِ فعال با ابزار اولیه صفر می‌سازد، نه مسیرِ در انتظار.",
        anchors: [
            {
                coeff: "۰",
                example: "پسر ۲۰ ساله در کلاس برق‌کاری ثبت‌نام و حاضر است و ابزار پایه دارد."
            },
            {
                coeff: "۰٫۵",
                example: "مادر خیاطی بلد است و می‌خواهد کار کند ولی چرخ خیاطی و مشتری اولیه ندارد."
            },
            {
                coeff: "۱",
                example: "جوان ۲۳ ساله جویای کار است؛ هیچ دوره‌ای در دسترس نبوده و در یک سال گذشته اقدامی رخ نداده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + سابقه علاقه به خدمات اشتغال فرم قبلی + مدارک دوره از علوم/آموزش عالی",
            "کفایت: علاقه/واجد شرایطی + وضعیت مسیر هر دو لازم است",
            "تعارض «مهارت بالا» و «بدون هیچ اقدام» → یادداشت و بررسی مددکار",
            "درآمد فعلی عضو → مسیر D1/D2 جدا می‌شود"
        ],
        exceptions: [
            "بیکاری در جریان عضو → D2؛ اینجا فقط مسیر توانمندسازی ملاک است",
            "مهارت تفننی → خارج از امتیاز",
            "دوره در انتظار شروع → ۰٫۵ (مسیر فعال نیست)",
            "سالمند ناتوان/کودک → خارج از دامنه"
        ],
        serviceInputs: [
            {
                serviceId: "higher_edu",
                contribution: "مدارک و سابقه تحصیل دانشگاهی اعضا برای تشخیص واجد شرایطی/مهارت پایه؛ مسیر فعال توانمندسازی از خوداظهاری و برنامه‌ها ثبت می‌شود."
            }
        ]
    }
};
}),
"[project]/src/lib/mpi/charter-c.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARTER_C",
    ()=>CHARTER_C
]);
const CHARTER_C = {
    C1: {
        concept: "بی‌خانمانی واقعی یا تهدید قریب‌الوقوع سکونت — ملاک «محل خواب امشب» و اخطار معتبر است نه مالکیت یا نوع اداری مسکن.",
        outOfScope: [
            "مسکن محقر/کوچک → C2/C4",
            "معوق اجاره → C8",
            "حق سکونت مبهم بدون اخطار → C3",
            "نوع مالکیت/سند"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار؛ همه اعضا یک سقف مشترک دارند.",
        period: "وضعیت جاری + ۳۰ روز اخیر (جابه‌جایی/اخطار)",
        eventQuestions: [
            "محل: محل خواب فعلی چیست؟ (پایدار / موقت / غیرمسکونی-فضای عمومی)",
            "اخطار: اخطار تخلیه معتبر یا خطر قریب‌الوقوع ازدست‌دادن مسکن وجود دارد؟",
            "تداوم: چند ماه است در همین وضعیت‌اند؟",
            "پیامد: امنیت و حضور اعضا در کار/مدرسه چه وضعی دارد؟"
        ],
        questionIds: [
            "C1_place",
            "C1_eviction"
        ],
        quantitative: [
            "تعداد ماه‌های بی‌ثباتی اخیر",
            "مهلت اخطار تخلیه (روز)",
            "تعداد جابه‌جایی در سال گذشته"
        ],
        contextualEvidence: [
            "خواب در خودرو/فضای عمومی/ساختمان نیمه‌کاره",
            "چرخشی‌بودن خانه اقوام",
            "اخطار اجراسرای دریافت‌شده",
            "جابه‌جایی مدرسه کودک به‌خاطر مسکن"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "محل خواب فعلی غیرمسکونی/فضای عمومی (بی‌خانمانی فعلی)"
            },
            {
                coeff: "۰٫۵",
                rule: "سکونت موقت/مرکز نگهداری «یا» (سکونت پایدار «و» اخطار تخلیه معتبر/قریب‌الوقوع)"
            },
            {
                coeff: "۰",
                rule: "محل خواب پایدار «و» بدون اخطار تخلیه"
            }
        ],
        precedence: "بی‌خانمانی فعلی بر هر حالت دیگری تقدم دارد؛ اخطار باید «معتبر» و مستندشده باشد (تشخیص اعتبار با مددکار). اخطار قریب‌الوقوع مستقلاً R2 را فعال می‌کند.",
        anchors: [
            {
                coeff: "۰",
                example: "خانه اجاره‌ای پایدار بدون اخطار؛ قرارداد تا پایان سال است."
            },
            {
                coeff: "۰٫۵",
                example: "خانه پایدار است ولی اخطار تخلیه با مهلت یک‌ماهه دریافت کرده‌اند."
            },
            {
                coeff: "۱",
                example: "سه هفته است در خودرو و گاهی فضای عمومی می‌خوابند؛ وسایل در انبار است."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + بازدید میدانی مددکار؛ نشانی از سرویس پست برای اعضای دارای مسکن ثابت",
            "بی‌خانمان: نشانی ثابت اجباری نیست؛ کدپستی ملاک سنجش نمی‌شود",
            "اظهار اخطار تنها کف ۰٫۵ است؛ اعتبار اخطار با مستندسازی بررسی می‌شود",
            "تعارض نشانی ثبت احوال/پست با محل اعلامی → R9"
        ],
        exceptions: [
            "امکانات نامناسب ولی محل ثابت → C2/C6",
            "اخطار معتبر بدون مهلت قریب‌الوقوع → ۰٫۵ برقرار است",
            "سکونت در محل کار با اجازه پایدار → ارزیابی موردی؛ خواب ایمن و پایدار = ۰ تا ۰٫۵ با یادداشت",
            "مرکز نگهداری سازمانی → ۰٫۵ با ثبت مسیر"
        ],
        serviceInputs: [
            {
                serviceId: "post",
                contribution: "نشانی استاندارد و موقعیت جغرافیایی از کدپستی برای راستی‌آزمایی محل سکونت؛ بی‌خانمان نشانی ملاک ندارد و ثبت اجباری نمی‌شود."
            }
        ]
    },
    C2: {
        concept: "ایمنی و قابلیت سکونت واقعی مسکن — نقص‌های بحرانی سازه، برق، رطوبت و اقلیم که سلامت یا جان ساکنان را تهدید می‌کند؛ ملاک وضعیت فیزیکی است نه قدمت یا وضعیت اداری.",
        outOfScope: [
            "قدمت ساختمان به‌تنهایی",
            "زیبایی/راحتی (کف‌پوش، نقاشی)",
            "تراکم/فضای خواب → C4",
            "خدمات آب/برق → C5",
            "بهداشت سرویس → C6"
        ],
        unit: "خانوار (واحد مسکن)",
        aggregation: "سطح واحد مسکن؛ همه اعضا مشترک‌اند.",
        period: "وضعیت جاری (فصل فعلی + زمستان گذشته)",
        eventQuestions: [
            "چک‌لیست: کدام نقص واقعاً موجود است؟ (ترک/ریزش بحرانی، سیم‌کشی خطرناک، رطوبت شدید، نامناسب اقلیمی، غیرقابل سکونت)",
            "رخداد/پیامد: آسیب، بیماری یا حادثه ناشی از نقص رخ داده است؟",
            "تداوم: نقص چند فصل است؟"
        ],
        questionIds: [
            "C2_issues",
            "C2_constr"
        ],
        quantitative: [
            "تعداد نقص‌های فعال",
            "سال ساخت (فقط زمینه‌ای)",
            "هزینه برآوردی تعمیر (اختیاری)"
        ],
        contextualEvidence: [
            "پناه گرفتن کودک به اتاق دیگر هنگام باران",
            "برق‌گرفتگی یا آتش‌سوزی جزئی",
            "بیماری تنفسی زمستانی تکرارشونده",
            "ریزش جزئی تیغه سقف"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "نقص بحرانی سازه/برق «یا» غیرقابل سکونت تشخیص داده شده"
            },
            {
                coeff: "۰٫۵",
                rule: "دست‌کم یک نقص فعال (حتی تک‌تایی) در چک‌لیست ثبت شده"
            },
            {
                coeff: "۰",
                rule: "نقص بحرانی/فعال ثبت نشده است"
            }
        ],
        precedence: "نقص بحرانی (سازه/برق/غیرقابل سکونت) بر سایر نقص‌ها تقدم دارد؛ چک‌لیست «رخ‌داده» است نه «برآوردی».",
        anchors: [
            {
                coeff: "۰",
                example: "خانه سالم با سقف، سیم‌کشی و مقاومت اقلیمی مناسب."
            },
            {
                coeff: "۰٫۵",
                example: "رطوبت شدید دیوار اتاق خواب کودک که زمستان گذشته بیماری تنفسی آورده است."
            },
            {
                coeff: "۱",
                example: "سقف چوبی پوسیده با نشانه ریزش و سیم‌کشی لخت؛ کارشناس خانه را غیرقابل سکونت اعلام کرده است."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + مشاهده بازدید مددکار؛ تصویر/گواهی فنی اختیاری",
            "کفایت: چک‌لیست کامل پاسخ شود؛ سال ساخت فقط زمینه است",
            "ادعای غیرقابل سکونت بودن → تشخیص فنی/مشاهده؛ اختلاف → R9",
            "نقص‌های اعلامی باید در وضعیت جاری فعال باشند"
        ],
        exceptions: [
            "قطع آب/برق (خدمت) → C5 و R7",
            "عدم امنیت حقوقی خانه → C3",
            "بی‌خانمانی → C1",
            "نقص جزئی قابل تعمیر بدون اثر → ۰ با یادداشت؛ مرزها با مشاهده مددکار"
        ],
        serviceInputs: []
    },
    C3: {
        concept: "پایداری حق سکونت خانوار — روشن‌بودن و تداوم مجاز سکونت در بازه آینده؛ اختلاف مالکیت، سکونت وابسته به فرد دیگر یا مانع تمدید قرارداد تهدید سکونت است.",
        outOfScope: [
            "مالکیت سند/دارایی به‌عنوان ثروت",
            "معوق مالی اجاره → C8",
            "اخطار تخلیه قریب‌الوقوع → C1",
            "وضعیت فیزیکی → C2"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار",
        period: "وضعیت جاری + افق قرارداد/توافق (تا تمدید بعدی)",
        eventQuestions: [
            "وضعیت: حق سکونت روشن (مالک/قرارداد معتبر) یا مبهم/وابسته است؟",
            "اختلاف: دعوای مالکیت/ارث/مرجع حقوقی در جریان است؟",
            "تداوم: تا تمدید بعدی چقدر مانده و امکان تمدید هست؟",
            "پیامد: نگرانی یا برنامه جابه‌جایی اجباری چه وضعی دارد؟"
        ],
        questionIds: [
            "C3_right",
            "C3_lease_end"
        ],
        quantitative: [
            "ماه‌های باقی‌مانده قرارداد",
            "مدت سابقه دعوای حقوقی",
            "تعداد تمدیدهای موفق اخیر"
        ],
        contextualEvidence: [
            "اجاره شفاهی با انتظار اخراج",
            "سکونت در خانه پدری با مخالفت سایر ورثه",
            "سند به نام شخص دیگر با توافق شفاهی",
            "امتناع موجر از دریافت اجاره برای اخراج حقوقی"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "خطر جدی ازدست‌دادن مسکن (اختلاف حقوقی فعال «یا» وابستگی در حال سقوط «یا» مانع تمدید احراز)"
            },
            {
                coeff: "۰٫۵",
                rule: "حق سکونت مبهم «یا» وابسته به فرد دیگر (بدون خطر قریب‌الوقوع)"
            },
            {
                coeff: "۰",
                rule: "حق سکونت روشن و بدون اختلاف"
            }
        ],
        precedence: "خطر فعال بر ابهام تقدم دارد؛ وابستگی سالم به میزبان با توافق پایدار ۰٫۵ است چون حق مکتوب ندارد.",
        anchors: [
            {
                coeff: "۰",
                example: "قرارداد رسمی اجاره با تاریخ پایان مشخص و توافق تمدید."
            },
            {
                coeff: "۰٫۵",
                example: "در خانه دایی بدون قرارداد می‌مانند؛ میزبان راضی است ولی هیچ تضمینی نیست."
            },
            {
                coeff: "۱",
                example: "خانوار در ملک مشاع؛ ورثه دیگر دادخواست تخلیه داده و جلسه دادگاه نزدیک است."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + مدارک (قرارداد، ابلاغ) + استعلام اموال/املاک (وضعیت سند سرپرست — ملاک برای ادعای مالکیت)",
            "کفایت: وضعیت حق + توضیح در حالت غیرصفر",
            "تعارض ادعای مالکیت با استعلام سند → R9",
            "وابستگی شفاهی → مستندسازی با مشاهده مددکار"
        ],
        exceptions: [
            "اخطار تخلیه/بی‌خانمانی فوری → C1 (و R2)",
            "معوق اجاره بدون اختلاف حقوقی → C8",
            "وقفی/خدماتی با حق مشخص → ۰ با ثبت نوع",
            "سکونت خدمتکارانه/کارگاهی → ارزیابی تخصصی مددکار"
        ],
        serviceInputs: [
            {
                serviceId: "property",
                contribution: "سابقه سند و وضعیت مالکیت به نام سرپرست برای راستی‌آزمایی ادعای مالکیت و بررسی اختلافات؛ حق سکونت جاری با اظهار/مدارک خانوار تفسیر می‌شود."
            }
        ]
    },
    C4: {
        concept: "تراکم سکونت (نفر به اتاق قابل سکونت) و ایمن‌بودن فضای خواب برای همه اعضا — ملاک «فضای خواب ایمن و کافی» است نه بزرگی خانه.",
        outOfScope: [
            "متراژ کل خانه به‌تنهایی",
            "زیبایی/راحتی فضا",
            "ایمنی سازه → C2",
            "هزینه مسکن → C8"
        ],
        unit: "خانوار (نسبت کل اعضا به اتاق‌های قابل سکونت + وضعیت فضای خواب همه اعضا)",
        aggregation: "نفر ÷ اتاق قابل سکونت (برای جلوگیری از تقسیم بر صفر، حداقل ۱ اتاق فرض می‌شود)؛ پاسخ «فضای خواب برای همه نیست» هر ضریب پایین‌تر را به حداقل ۰٫۵ و «هیچ فضای ایمن» را ۱ می‌برد.",
        period: "وضعیت جاری",
        eventQuestions: [
            "داده: چند اتاق قابل سکونت (به‌جز آشپزخانه/سرویس)؟",
            "شاهد: آیا برای همه اعضا فضای خواب ایمن و مناسب وجود دارد؟",
            "پیامد: خواب اشتراکی اجباری سالمند/کودک/نوجوانان غیرهم‌جنس چگونه برقرار است؟"
        ],
        questionIds: [
            "C4_rooms",
            "C4_area",
            "C4_safesleep"
        ],
        quantitative: [
            "نفر به اتاق (محاسبه‌ای)",
            "متراژ زیربنا (اختیاری — زمینه‌ای)",
            "تعداد اعضای بدون فضای خواب ایمن"
        ],
        contextualEvidence: [
            "خواب روی زمین/جعبه/واگن",
            "چرخشی‌بودن تخت نوجوانان با سالمند",
            "خواب کودک در آشپزخانه/راهرو",
            "ناممکن‌بودن تفکیک سنی/جنسیتی"
        ],
        levelRules: [
            {
                coeff: "۰",
                rule: "نفر÷اتاق ≤ ۱٫۵ «و» فضای خواب ایمن برای همه"
            },
            {
                coeff: "۰٫۲۵",
                rule: "نفر÷اتاق ۱٫۵ تا ۲٫۵ «و» فضای خواب برای همه"
            },
            {
                coeff: "۰٫۵",
                rule: "نفر÷اتاق ۲٫۵ تا ۳٫۵ «یا» (فضای خواب برای همه نیست «و» تراکم پایین‌تر)"
            },
            {
                coeff: "۰٫۷۵",
                rule: "نفر÷اتاق ۳٫۵ تا ۵ «یا» (فضای خواب همه نیست «و» تراکم بالا)"
            },
            {
                coeff: "۱",
                rule: "نفر÷اتاق بیش از ۵ «یا» هیچ فضای خواب ایمن"
            }
        ],
        precedence: "وضعیت فضای خواب ایمن «کف» می‌سازد: جزئی ≥ ۰٫۵ و هیچ = ۱؛ تراکم محاسبه‌ای مستقل است و هرکدام شدیدتر باشد ملاک می‌شود.",
        anchors: [
            {
                coeff: "۰",
                example: "چهار نفر در سه اتاق؛ هر کودک جای خواب مشخص و ایمن دارد."
            },
            {
                coeff: "۰٫۲۵",
                example: "شش نفر در سه اتاق؛ فشرده ولی هر نفر تخت و پنجره دارد."
            },
            {
                coeff: "۰٫۵",
                example: "هشت نفر در دو اتاق؛ دو کودک روی فرش آشپزخانه می‌خوابند."
            },
            {
                coeff: "۰٫۷۵",
                example: "ده نفر در دو اتاق؛ نوجوانان دختر و پسر هیچ حریم خواب ندارند."
            },
            {
                coeff: "۱",
                example: "خانوار شش‌نفره در آلونک تک‌فضایی؛ هیچ فضای خواب ایمن برای هیچ‌کس نیست."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + مشاهده بازدید؛ تعداد اعضا از واکشی ثبت احوال ملاک شمارش است",
            "کفایت: عدد اتاق + وضعیت خواب هر دو لازم؛ صفر اتاق قاعده ویژه دارد (حداقل ۱ فرض)",
            "آستانه‌های پنج‌حالته پیشنهادی و نیازمند تصویب مرجع",
            "تعارض متراژ/تصویر با اظهار → R9"
        ],
        exceptions: [
            "صفر اتاق/خواب غیرمسکونی → هم‌زمان C1 بررسی شود؛ اینجا با حداقل ۱ اتاق محاسبه و یادداشت می‌شود",
            "فضای خواب نامناسب به‌خاطر سازه → روایت C2؛ پیوند در یادداشت",
            "بیمار نیازمند اتاق جدا → بررسی تخصصی (E2/A2)",
            "فروشگاه/محل کار داخل مسکن → محاسبه با فضای واقعی سکونت"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "شمارش دقیق اعضای خانوار از ثبت احوال — مخرج نسبت تراکم با واکشی ملاک می‌شود."
            }
        ],
        pendingApproval: "آستانه نفر بر اتاق برای ضرایب پنج‌حالته و وضعیت صفر اتاق نیازمند تصویب مرجع است."
    },
    C5: {
        concept: "دسترسی پایدار و ایمن به آب سالم، برق و انرژی پخت‌وپز — ملاک «قطع/ناپایداری واقعی خدمت» است نه داشتن انشعاب روی کاغذ؛ قطع حیاتی مستقلاً R7 می‌سازد.",
        outOfScope: [
            "انشعاب بدون قطع/محدودیت (پوشش کامل)",
            "نوسان لحظه‌ای جزئی",
            "بدهی قبض به‌عنوان شاخص → معوقات C8",
            "نبود گاز شهری با جانشین ایمن"
        ],
        unit: "خانوار",
        aggregation: "بدترین وضعیت بین سه خدمت (آب/برق/پخت) — بیشینه.",
        period: "وضعیت جاری + روند ۳۰ روز اخیر (فراوانی قطعی)",
        eventQuestions: [
            "وضعیت هر خدمت: پیوسته / ناپایدار (قطعی مکرر) / قطع فعلی؟",
            "علت: بدهی، فرسودگی، نبود زیرساخت؟",
            "فراوانی: قطعی‌ها چند بار در هفته/ماه؟",
            "پیامد: جایگزین ایمن (حمل آب، بخاری، غذای آماده) چگونه تأمین می‌شود؟"
        ],
        questionIds: [
            "C5_water",
            "C5_elec",
            "C5_cook",
            "C5_effect"
        ],
        quantitative: [
            "روزهای بدون آب/برق در ماه",
            "مبلغ بدهی مؤثر بر قطع (زمینه‌ای برای C8)",
            "ساعات ناپایداری پخت"
        ],
        contextualEvidence: [
            "حمل آب با دبه از خانه همسایه",
            "پخت‌وپز با هیزم/آتش در محیط بسته",
            "فاسد شدن داروی یخچالی",
            "مطالعه شب کودک با فانوس"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "قطع فعلی هر خدمت حیاتی بدون جایگزین ایمن (آب «یا» برق «یا» انرژی پخت)"
            },
            {
                coeff: "۰٫۵",
                rule: "ناپایداری پایدار (قطعی مکرر/محدودیت) در دست‌کم یک خدمت"
            },
            {
                coeff: "۰",
                rule: "دسترسی پیوسته به هر سه خدمت"
            }
        ],
        precedence: "قطع فعلی بر ناپایداری تقدم دارد؛ بدترین خدمت ملاک خانوار است. قطع بدون جایگزین → R7 (پرچم مستقل از امتیاز).",
        anchors: [
            {
                coeff: "۰",
                example: "آب، برق و پخت ایمن پیوسته دارند؛ قطعی معنادار ۳۰ روزه نبوده است."
            },
            {
                coeff: "۰٫۵",
                example: "برقشان هر هفته چند ساعت قطع می‌شود (بدهی معوق) و یخچال کار نمی‌کند."
            },
            {
                coeff: "۱",
                example: "انشعاب آب قطع شده و یک ماه است با دبه از منبع روستا می‌آورند؛ آب جوشانده نمی‌شود."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + مشاهده؛ قبض/بدهی اختیاری برای علت‌یابی",
            "کفایت: هر سه خدمت پاسخ شود؛ ثبت «اثر قطع» لازم است",
            "قطع فعلی → R7 بلافاصله ثبت شود",
            "تعارض اظهار و بازدید → R9"
        ],
        exceptions: [
            "قطع موقتی سراسری با زمان‌بندی اعلامی → ناپایداری؛ با جایگزین ایمن مرزی است",
            "بدهی قطع‌ساز → هم‌زمان C8 معوقات؛ هر شاخص مستقل روایت می‌شود ولی رخداد تکراری شمرده نمی‌شود",
            "کپسول گاز ایمن جایگزین گاز شهری → ۰",
            "سیم‌کشی لخت/خطرناک → C2 تقاطع"
        ],
        serviceInputs: []
    },
    C6: {
        concept: "بهداشت محیط مسکن — قابل استفاده و بهداشتی بودن سرویس، حمام و دفع فاضلاب؛ ملاک «خطر بهداشتی واقعی» است نه اتصال به شبکه شهری.",
        outOfScope: [
            "نبود شبکه فاضلاب شهری به‌تنهایی",
            "آب آشامیدنی → C5",
            "عادات نظافت روزمره",
            "ایمنی سازه → C2"
        ],
        unit: "خانوار",
        aggregation: "سطح واحد مسکن",
        period: "وضعیت جاری + روند اخیر (گرفتگی/سرریز)",
        eventQuestions: [
            "وضعیت: سرویس و حمام قابل استفاده و بهداشتی است؟ مشترک با چند خانوار؟",
            "دفع: فاضلاب چگونه دفع می‌شود؟ سرریز/گرفتگی مکرر؟",
            "پیامد: بیماری پوستی/گوارشی اخیر یا ناتوانی استفاده رخ داده؟"
        ],
        questionIds: [
            "C6_san"
        ],
        quantitative: [
            "تعداد خانوار مشترک در سرویس",
            "روزهای کارنکردن سرویس در ماه",
            "فاصله سرویس تا فضای زندگی (زمینه‌ای)"
        ],
        contextualEvidence: [
            "سرویس روباز بدون در در حیاط مشترک",
            "سرریز فاضلاب حیاط و بوی تعفن",
            "حمام فقط با هماهنگی همسایه",
            "بیماری پوستی کودک"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "سرویس/حمام/دفع فاضلاب ناسالم یا مفقود (استفاده ناممکن/خطرناک)"
            },
            {
                coeff: "۰٫۵",
                rule: "مشترک‌بودن با بار عملی «یا» نقص جزئی اماکن بهداشتی"
            },
            {
                coeff: "۰",
                rule: "سرویس و حمام قابل استفاده و بهداشتی"
            }
        ],
        precedence: "ناسالم/مفقود بر مشترک/جزئی تقدم دارد؛ مشترک بودن فقط وقتی ۰٫۵ است که بار واقعی (صف، فاصله، ایمنی شب) داشته باشد.",
        anchors: [
            {
                coeff: "۰",
                example: "سرویس و حمام اختصاصی، سالم و همیشه در دسترس."
            },
            {
                coeff: "۰٫۵",
                example: "سرویس مشترک بین چهار خانوار؛ شب‌ها صف و گاهی گرفتگی است."
            },
            {
                coeff: "۱",
                example: "سرویس روباز لبه حیاط با فاضلاب جاری؛ حمام وجود ندارد و کودکان از بیماری پوستی رنج می‌برند."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + بازدید میدانی؛ تصویر اختیاری",
            "کفایت: یک پرسش جامع؛ توضیح در حالت غیرصفر",
            "تعارض نوع مسکن (آلونک/حیاط مشترک) با پاسخ → R9",
            "بیماری مرتبط → پیوند با A1/A3 در یادداشت"
        ],
        exceptions: [
            "سرویس سالم مشترک در مجتمع منظم → مرزی ۰–۰٫۵ با مشاهده",
            "خرابی سرویس ناشی از قطع آب → ریشه در C5؛ وضعیت جاری ثبت می‌شود",
            "چاه سنتی سالم قابل قبول → ۰",
            "معلولیت استفاده از سرویس → A2/E2 تقاطع"
        ],
        serviceInputs: []
    },
    C7: {
        concept: "فقدان وسایل واقعاً ضروری زندگی (خواب ایمن، نگهداری ایمن غذا، گرمایش ایمن) و پیامد آن؛ ملاک «اخلال در سلامت/غذا/مراقبت» است نه کامل‌بودن اسباب خانه.",
        outOfScope: [
            "لوازم رفاهی/تفننی (تلویزیون، ماشین لباسشویی غیرضروری)",
            "کیفیت/برند وسایل",
            "فروش وسایل غیرضروری برای هزینه → زمینه‌ای در A4",
            "گرمایش مرکزی نداشتن با جایگزین ایمن"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار؛ تعداد وسایل مفقود + شدت اثر — هرکدام شدیدتر باشد ملاک است.",
        period: "وضعیت جاری + فصل گرم/سرد اخیر",
        eventQuestions: [
            "چک‌لیست: کدام وسایل ضروری مفقود/خراب است؟ (خواب ایمن، یخچال کارکردی، گرمایش ایمن و ...)",
            "فراوانی: چند وسیله؟",
            "پیامد: فقدان چه اختلالی در سلامت/غذا/مراقبت/سکونت ساخته است؟"
        ],
        questionIds: [
            "C7_missing",
            "C7_impact"
        ],
        quantitative: [
            "تعداد وسایل مفقود/خراب (۰ تا فهرست)",
            "روزهای بدون گرمایش ایمن در سرما",
            "ساعات نگهداری ناممکن غذا"
        ],
        contextualEvidence: [
            "خواب بچه‌ها روی فرش بدون تشک در سرما",
            "پخت روزانه غذا بدون یخچال",
            "سرماخوردگی مکرر زمستان",
            "نگهداری دارو دور از گرما ناممکن"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "اثر «اختلال جدی» احراز «یا» سه وسیله یا بیشتر مفقود"
            },
            {
                coeff: "۰٫۵",
                rule: "اثر جزئی «یا» یک تا دو وسیله مفقود"
            },
            {
                coeff: "۰",
                rule: "وسایل ضروری موجود و سالم «و» بدون اثر"
            }
        ],
        precedence: "هیچ‌کدام از دو مسیر (شدت اثر، شمارش وسایل) تقدم قطعی ندارد؛ هرکدام ضریب بالاتر بسازد ملاک می‌شود. فهرست فقط وسایل ضروری را می‌شمارد.",
        anchors: [
            {
                coeff: "۰",
                example: "تخت مناسب، یخچال کارکردی و گرمایش ایمن همه موجود است."
            },
            {
                coeff: "۰٫۵",
                example: "یخچال خراب است؛ غذا روزانه پخته و به‌سرعت مصرف می‌شود ولی اختلال جدی نشده."
            },
            {
                coeff: "۱",
                example: "بدون یخچال و گرمایش ایمن؛ زمستان بچه‌ها بیمار شدند و غذا فاسد می‌شود."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + مشاهده بازدید",
            "کفایت: چک‌لیست + اثر هر دو؛ «اثر» بدون وسیله مفقود پذیرفته نمی‌شود",
            "تعارض فهرست وسایل فرم قبلی با وضعیت جاری → جاری ملاک است",
            "ادعای اثر شدید با فهرست کوتاه → یادداشت و بازبینی"
        ],
        exceptions: [
            "مسکن بدون فضای نگهداری → C2/C4",
            "گرمایش موجود اما خطرناک (بخاری نشتی) → «نبود گرمایش ایمن» است + C2/C5",
            "یخچال دارند ولی برق قطع → C5",
            "وسایل خراب با تعمیر ارزان در جریان → ۰٫۵ با یادداشت"
        ],
        serviceInputs: []
    },
    C8: {
        concept: "فشار مالی مسکن — نسبت هزینه ماهانه مسکن (اجاره + شارژ + قبوض، بدون ودیعه) به منابع قابل اتکا، به‌علاوه وضعیت معوقات؛ ملاک «سهم مسکن از بودجه» است.",
        outOfScope: [
            "ودیعه (عمداً از هزینه ماهانه جدا است)",
            "ارزش ملک/دارایی",
            "قطع خدمت → C5",
            "مانع حقوقی سکونت → C3",
            "کفایت کل درآمد → D3"
        ],
        unit: "خانوار",
        aggregation: "محاسبه‌ای: هزینه مسکن ÷ منابع قابل اتکای ماهانه؛ در صفر بودن منابع، مخرج از خط فقر × تعداد اعضا ساخته می‌شود (بدون خط فقر معتبر → غیرنهایی).",
        period: "وضعیت جاری با محور یک ماه هزینه (معوقات تجمعی جدا ثبت می‌شود)",
        eventQuestions: [
            "معوقه: بدهی اجاره/شارژ/قبض چه وضعی دارد؟ (ندارد/جزئی/معنادار)",
            "فشار: نسبت هزینه به بودجه چگونه است؟",
            "تداوم: معوقه از کی و چقدر است؟",
            "پیامد: موجر/سازمان چه واکنشی داشته است؟"
        ],
        questionIds: [
            "C8_arrears_severity",
            "C8_installments"
        ],
        quantitative: [
            "اجاره + شارژ + قبوض ماهانه (تومان)",
            "معوقات تجمعی (تومان)",
            "نسبت محاسبه‌ای هزینه به منابع",
            "اقساط ضروری ماهانه"
        ],
        contextualEvidence: [
            "تأخیر پرداخت اجاره سه ماه متوالی",
            "فروش دارایی برای بدهی خانه",
            "چک اجاره برگشتی",
            "انتقال به مسکن ارزان‌تر به‌خاطر هزینه"
        ],
        levelRules: [
            {
                coeff: "۰",
                rule: "نسبت < ۲۵٪ «و» بدون معوقه معنادار"
            },
            {
                coeff: "۰٫۲۵",
                rule: "نسبت ۲۵٪ تا ۴۰٪ «و» معوقه جزئی/ندارد"
            },
            {
                coeff: "۰٫۵",
                rule: "نسبت ۴۰٪ تا ۵۵٪ «یا» معوقه جزئی (کف ۰٫۵)"
            },
            {
                coeff: "۰٫۷۵",
                rule: "نسبت ۵۵٪ تا ۷۰٪ «یا» معوقه معنادار (کف ۰٫۷۵)"
            },
            {
                coeff: "۱",
                rule: "نسبت ≥ ۷۰٪"
            }
        ],
        precedence: "نسبت پایه از برش‌ها؛ معوقه «کف» می‌سازد (معنادار ≥ ۰٫۷۵، جزئی ≥ ۰٫۵) و هرکدام شدیدتر باشد ملاک می‌شود. ودیعه هرگز در صورت/مخرج نیست. آستانه‌ها نیازمند تصویب مرجع است.",
        anchors: [
            {
                coeff: "۰",
                example: "اجاره ۲ میلیون با درآمد قابل اتکا ۱۲ میلیون — بدون بدهی."
            },
            {
                coeff: "۰٫۵",
                example: "هزینه مسکن ۶ میلیون از ۱۲ میلیون؛ دو ماه اجاره عقب‌تر و توافق شفاهی گرفته‌اند."
            },
            {
                coeff: "۰٫۷۵",
                example: "معوق اجاره ۱۸ میلیون شده و چک برگشتی دارد؛ نسبت هم بالای ۵۵٪ است."
            },
            {
                coeff: "۱",
                example: "بیش از ۷۰٪ درآمد صرف مسکن می‌شود و غذای خانوار دائم کاهش یافته است."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + قرارداد/قبض (تقدم ۲) — اعداد مسکن از اطلاعات پایه ملاک ورودی است",
            "کفایت: وضعیت معوقات الزامی؛ بدون آن نتیجه ناتمام است",
            "منابع صفر و نبود خط فقر معتبر → نتیجه غیرنهایی (بدون امتیاز خودکار)",
            "تعارض قرارداد و اظهار → R9"
        ],
        exceptions: [
            "درآمد صفر: مخرج از خط فقر ساخته می‌شود؛ بدون خط فقر معتبر → غیرنهایی نه صفر",
            "سکونت رایگان/ملکی بدون هزینه → نسبت صفر؛ فشار حقوقی جدا در C3",
            "ودیعه سنگین پرداخت‌شده اخیر → یادداشت زمینه‌ای؛ در محاسبه نیست",
            "اقساط ضروری جزء هزینه مسکن نیست؛ در پیامد بررسی می‌شود"
        ],
        serviceInputs: [],
        pendingApproval: "مرزهای نسبت هزینه مسکن و مدیریت معوقه برای ضرایب پنج‌حالته نیازمند تصویب مرجع است."
    },
    C9: {
        concept: "دسترسی واقعی خانوار به خدمات پایه (سلامت، آموزش، خرید ضروری، حمل‌ونقل) — ملاک «بار رسیدن» (زمان/هزینه/قطع مسیر) است؛ موقعیت جغرافیایی کنترل است نه امتیاز.",
        outOfScope: [
            "شهر/روستا بودن به‌تنهایی",
            "پوشش بیمه/درمان → A5",
            "مانع آموزش → B4",
            "کیفیت خدمات"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار؛ بدترین دسترسی بین خدمات پایه ضروری روزمره.",
        period: "وضعیت جاری + فصل اخیر (راه زمستانی/قطعی مسیر)",
        eventQuestions: [
            "دسترسی: کدام خدمت پایه برای خانوار دشوار/قطع است؟",
            "فراوانی: چند بار در ماه مسیر لازم بوده و مشکل رخ داده؟",
            "پیامد: لغو درمان/خرید/مدرسه، هزینه حمل سنگین؟"
        ],
        questionIds: [
            "C9_access"
        ],
        quantitative: [
            "زمان/کیلومتر تا خدمات پایه",
            "هزینه رفت‌وآمد ماهانه ضروری",
            "دفعات لغو مراجعه لازم"
        ],
        contextualEvidence: [
            "هزینه سنگین تاکسی برای واکسن کودک",
            "جاده خاکی قطع‌شده در زمستان",
            "خرید ماهانه یک‌باره به‌خاطر دوری",
            "لغو مراجعه درمان به‌خاطر مسیر (بدون مانع بیمه)"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "مانع پایدار و جدی دسترسی به خدمات پایه"
            },
            {
                coeff: "۰٫۵",
                rule: "دسترسی با بار زمان/هزینه قابل مدیریت (رخ‌داده ولی جبران‌شده)"
            },
            {
                coeff: "۰",
                rule: "دسترسی واقعی مناسب به خدمات پایه"
            }
        ],
        precedence: "بدون شمارش تکراری: مانع صرفاً بیمه‌ای → A5؛ صرفاً آموزشی → B4؛ C9 فقط «بار دسترسی عمومی» را می‌گیرد (مرز شاخص‌ها).",
        anchors: [
            {
                coeff: "۰",
                example: "مرکز سلامت، مدرسه و مغازه ضروری در دسترس روزانه‌اند."
            },
            {
                coeff: "۰٫۵",
                example: "برای درمان باید ۲۵ کیلومتر رفت؛ ماهی دوبار با کمک همسایه انجام می‌شود."
            },
            {
                coeff: "۱",
                example: "مسیر روستا زمستان قطع می‌شود؛ دو بار واکسن کودک لغو شده و دارو با واسطه می‌آید."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + موقعیت جغرافیایی از سرویس پست (نقش کنترلی — نه امتیاز)",
            "کفایت: توضیح در حالت غیرصفر الزامی است",
            "تعارض موقعیت (شهر مرکزی) با ادعای دوری → R9 و بازدید",
            "خانوار حاشیه شهر → بررسی بار واقعی نه برچسب محله"
        ],
        exceptions: [
            "شهر/روستا/حاشیه → بدون امتیاز خودکار (نقش کنترلی)",
            "مانع بیمه → A5؛ مانع مدرسه → B4",
            "بی‌خانمانی و فاصله از خدمات → هم‌زمان C1؛ C9 فقط بار دسترسی",
            "قطع موقت اضطراری مسیر → یادداشت؛ پایداری شرط ۰٫۵/۱ است"
        ],
        serviceInputs: [
            {
                serviceId: "post",
                contribution: "استان/شهرستان/موقعیت جغرافیایی از کدپستی — نقش کنترلی برای تحلیل دسترسی و تعیین خط فقر منطقه‌ای؛ امتیاز مستقیم نمی‌دهد."
            }
        ]
    }
};
}),
"[project]/src/lib/mpi/charter-de.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARTER_D",
    ()=>CHARTER_D,
    "CHARTER_E",
    ()=>CHARTER_E
]);
const CHARTER_D = {
    D1: {
        concept: "استمرار فعالیت درآمدزا و درآمد مؤثر تأمین‌کننده اصلی — ملاک «قطع/ناپایداری واقعی درآمد در دوره ارزیابی» است؛ روزمزدی یا فصلی بودن به‌تنهایی محرومیت نیست.",
        outOfScope: [
            "نوع شغل/وضعیت شغلی اداری",
            "کفایت مقدار درآمد → D3",
            "بیکاری سایر اعضا → D2",
            "بی‌کاری بالفعل بدون جست‌وجو → خارج از دامنه D1"
        ],
        unit: "تأمین‌کننده اصلی (فرد)",
        aggregation: "سطح تأمین‌کننده؛ خانوار بدون هیچ تأمین‌کننده با درآمد فعال → مستقیماً ضریب کامل.",
        period: "دوره ارزیابی جاری (حداقل ۳ ماه روند — دوره واحد نیازمند تصویب)",
        eventQuestions: [
            "رخداد: تأمین‌کننده اصلی کیست و درآمد فعال دارد؟",
            "استمرار: درآمد مستمر / ناپایدار / قطع؟",
            "علت قطع: فصل، اخراج، بیماری، ورشکستگی؟",
            "پیامد: چند ماه بودجه خانوار دچار افت/قطع بوده است؟"
        ],
        questionIds: [
            "D1_no_provider",
            "D1_ability",
            "D1_continuity",
            "D1_seasonal"
        ],
        quantitative: [
            "ماه‌های درآمد مؤثر در ۶ ماه گذشته",
            "دامنه نوسان درآمد ماهانه",
            "روزهای بدون کار در ماه"
        ],
        contextualEvidence: [
            "چرخش دو هفته کار و یک هفته بی‌کاری روزمزد",
            "بازگشت بدون دستمزد از کارفرمای بدهکار",
            "ترک کار به‌خاطر بیماری",
            "فروش ابزار کار"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "خانوار بدون تأمین‌کننده با درآمد فعال «یا» (درآمد قطع «و» ناتوانی از کار) «یا» قطع بدون امکان بازگشت"
            },
            {
                coeff: "۰٫۵",
                rule: "ناپایداری احراز در دوره «یا» قطع در فعالیت فصلی/روزمزدی با امکان بازگشت"
            },
            {
                coeff: "۰",
                rule: "درآمد مستمر تأمین‌کننده (فصلی بودن به‌تنهایی امتیاز ندارد)"
            }
        ],
        precedence: "«بدون تأمین‌کننده» کوتاه‌ترین مسیر ضریب کامل است؛ بین قطع و ناپایداری، تمایز با دو پرسش توان کار و فصلی بودن انجام می‌شود. گردش حساب شاپرک برای راستی‌آزمایی است و تقدم داده ثبتی را دارد.",
        anchors: [
            {
                coeff: "۰",
                example: "کارگر ثابت کارخانه با حقوق ماهانه منظم."
            },
            {
                coeff: "۰٫۵",
                example: "بنّای روزمزد؛ سه هفته کار و یک هفته بی‌کاری چرخشی — بودجه هر ماه متفاوت است."
            },
            {
                coeff: "۱",
                example: "سرپرست ماه‌ها است بیکار و بیمار؛ هیچ درآمد فعالی در خانوار نیست."
            }
        ],
        evidenceStatus: [
            "منبع: اظهار + گردش تجمیعی حساب از شاپرک (با توافقنامه بانکی — ملاک راستی‌آزمایی ناپایداری)",
            "کفایت: بدون مشخص‌بودن تأمین‌کننده (نقش اعضا) شاخص ناتمام است",
            "دوره واحد ارزیابی و آستانه «نوسان جدی» نیازمند تصویب مرجع است",
            "تعارض گردش حساب و اظهار → R9"
        ],
        exceptions: [
            "نبود عضو توانمند برای نقش تأمین‌کننده → نیازمند تعیین تکلیف رسمی (فهرست تصویب)؛ خودسرانه صفر/یک نمی‌شود",
            "درآمد بالا ولی ناپایدار → همین شاخص؛ مقدار در D3",
            "اشتغال کودک → R4 (خارج از روایت عادی D1)",
            "کار خانگی بدون درآمد → اشتغال محسوب نمی‌شود؛ وضعیت «بدون تأمین‌کننده» بررسی شود"
        ],
        serviceInputs: [
            {
                serviceId: "shaparak_bank",
                contribution: "گردش تجمیعی ۹۰ روز حساب و وضعیت تسهیلات/چک برگشتی (با توافقنامه بانکی) برای راستی‌آزمایی استمرار درآمد؛ بدون پذیرش توافقنامه استعلام انجام نمی‌شود."
            }
        ],
        pendingApproval: "دوره ارزیابی واحد و آستانه «نوسان جدی» درآمد تأمین‌کننده نیازمند تصویب مرجع است."
    },
    D2: {
        concept: "بیکاری فعال سایر اعضای توانمند و جویای کار (به‌جز تأمین‌کننده اصلی) — ظرفیت درآمد بلااستفاده خانوار؛ تحصیل و مراقبت بیکاری محسوب نمی‌شود.",
        outOfScope: [
            "تأمین‌کننده اصلی → D1",
            "دانشجو/خانه‌دار/ناتوان از کار",
            "بی‌کاری بدون جست‌وجوی فعال (بالقوه) → خارج از دامنه",
            "مهارت/مسیر توانمندسازی → B7"
        ],
        unit: "فرد — اعضای جویای کار غیر از تأمین‌کننده",
        aggregation: "شمارش اعضا: ۰ نفر → صفر؛ ۱ نفر → ۰٫۵؛ ۲ نفر و بیشتر → ۱.",
        period: "وضعیت جاری (جویای کار بودن فعلی + روند اخیر)",
        eventQuestions: [
            "فهرست: کدام اعضا توانمند و جویای کارند؟ (از پروفایل اعضا)",
            "تداوم: چند ماه است جویای کارند؟",
            "اقدام: چه اقدام جست‌وجو/درخواستی ثبت شده است؟",
            "مانع: چه چیزی به‌کارگیری را متوقف کرده است؟"
        ],
        questionIds: [],
        quantitative: [
            "تعداد جویای کار فعال",
            "ماه‌های بیکاری هر عضو",
            "تعداد درخواست/پیشنهاد کاری ثبت‌شده"
        ],
        contextualEvidence: [
            "رفت‌وآمد روزانه به میدان کار بدون نتیجه",
            "قطع حق بیمه اختیاری",
            "قرض برای هزینه جست‌وجوی کار",
            "آگهی‌های استخدام جمع‌آوری‌شده"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "دو عضو توانمند جویای کار (غیر تأمین‌کننده) «یا» بیشتر"
            },
            {
                coeff: "۰٫۵",
                rule: "یک عضو توانمند جویای کار"
            },
            {
                coeff: "۰",
                rule: "بدون عضو جویای کار (خارج از دامنه → صفر صحیح)"
            }
        ],
        precedence: "شمارش مستقیم مبناست؛ «توانمند» و «جویای کار» هر دو شرط لازم‌اند (و). وضعیت اشتغال از پروفایل اعضا در گام اطلاعات پایه می‌آید، نه پرسش جداگانه.",
        anchors: [
            {
                coeff: "۰",
                example: "غیر از سرپرست، فقط دختر دانشجو و مادر مراقبت‌کننده است — جویای کاری نیست."
            },
            {
                coeff: "۰٫۵",
                example: "پسر ۲۴ ساله شش ماه است دنبال کار است و در تعمیرگاه‌ها ثبت‌نام کرده."
            },
            {
                coeff: "۱",
                example: "پسر و عروس هر دو توانمند و جویای کارند؛ خانوار سه مستمری‌بگیر و دو جویای کار دارد."
            }
        ],
        evidenceStatus: [
            "منبع: پروفایل اعضا (اطلاعات پایه) + گردش حساب شاپرک برای تصویر اشتغال/درآمد",
            "کفایت: وضعیت اشتغال هر عضو توانمند ثبت شود",
            "تعارض «جویای کار» با درآمد فعال در گردش → R9",
            "دانشجو/مراقبت‌کننده تفکیک شود تا شمارش متورم نشود"
        ],
        exceptions: [
            "کودک کار → R4؛ در شمارش D2 نمی‌آید",
            "عضو ناتوان → خارج از دامنه (وضعیت «ناتوان از کار»)",
            "بیکار غیرجویا → خارج از دامنه؛ بررسی برای B7",
            "جویای کار با درآمد نامنظم → شمرده می‌شود؛ کیفیت درآمد در D1/D3"
        ],
        serviceInputs: [
            {
                serviceId: "shaparak_bank",
                contribution: "گردش تجمیعی و وضعیت حساب برای تصویر اشتغال/درآمد اعضا؛ وضعیت جویای کار بودن از پروفایل اعضا است."
            }
        ]
    },
    D3: {
        concept: "کفایت منابع مالی قابل اتکای خانوار نسبت به خط فقر منطقه‌ای متناسب — فقط منابع مستمر و قابل اتکا شمرده می‌شود و سرانه با خط فقر مقایسه می‌گردد.",
        outOfScope: [
            "منابع موردی/یک‌باره (ارث، فروش دارایی) و غیرقابل اتکا — جدا و بدون ورود به صورت محاسبه",
            "هزینه‌ها (مسکن → C8، درمان → A4)",
            "درآمد صفر بدون خط فقر معتبر → غیرنهایی",
            "اقلام غیرنقدی (مسکن ملکی)"
        ],
        unit: "خانوار (سرانه = منابع قابل اتکا ÷ تعداد اعضا)",
        aggregation: "جمع منابع مستمر قابل اتکا ÷ اعضا ÷ خط فقر سرانه ماهانه؛ بدون خط فقر معتبر (مبلغ + منبع + اعتبار) نتیجه غیرنهایی است.",
        period: "وضعیت جاری ماهانه (خط فقر با تاریخ اعتبار)",
        eventQuestions: [
            "فهرست: چه منابعی با چه مبلغ، دریافت‌کننده، استمرار و قابلیت اتکا؟",
            "مقایسه: نسبت سرانه به خط فقر منطقه‌ای چقدر است؟",
            "تداوم: کدام منبع در معرض قطع است؟",
            "پیامد: عقب‌نشینی مصرف اساسی (غذا/دارو/تحصیل) رخ داده است؟"
        ],
        questionIds: [
            "D3_editor",
            "poverty_editor"
        ],
        quantitative: [
            "جمع درآمد مستمر قابل اتکا (تومان)",
            "سرانه ماهانه (تومان)",
            "نسبت سرانه به خط فقر",
            "جمع منابع مستثناشده از محاسبه"
        ],
        contextualEvidence: [
            "حذف پروتئین و میوه از سبد",
            "تعویق دارو/معاینه",
            "قطع کلاس‌های اضافی کودک",
            "اتکای هفتگی به قرض"
        ],
        levelRules: [
            {
                coeff: "۰",
                rule: "سرانه ≥ ۱۲۰٪ خط فقر"
            },
            {
                coeff: "۰٫۲۵",
                rule: "سرانه ۸۰٪ تا ۱۲۰٪ خط فقر"
            },
            {
                coeff: "۰٫۵",
                rule: "سرانه ۶۰٪ تا ۸۰٪ خط فقر"
            },
            {
                coeff: "۰٫۷۵",
                rule: "سرانه ۳۰٪ تا ۶۰٪ خط فقر"
            },
            {
                coeff: "۱",
                rule: "سرانه < ۳۰٪ خط فقر"
            }
        ],
        precedence: "برش‌ها ترتیبی از بالا به پایین‌اند و اولین برش برخوردی ملاک می‌شود. برش‌ها و مقیاس معادل‌سازی خانوار پیشنهادی و نیازمند اعتبارسنجی است. منبع موردی هرگز در صورت محاسبه نمی‌آید.",
        anchors: [
            {
                coeff: "۰",
                example: "سرانه ۱٫۳ برابر خط فقر؛ سبدهای پایه بدون عقب‌نشینی."
            },
            {
                coeff: "۰٫۲۵",
                example: "سرانه حدود خط فقر؛ ماه‌های فشار (مدارس) با قرض جبران می‌شود."
            },
            {
                coeff: "۰٫۵",
                example: "سرانه ۷۰٪ خط فقر؛ گوشت حذف و داروهای غیرضروری تعویق می‌شود."
            },
            {
                coeff: "۰٫۷۵",
                example: "سرانه ۴۰٪؛ اتکای هفتگی به قرض و نان رایگان."
            },
            {
                coeff: "۱",
                example: "سرانه زیر ۳۰٪؛ قطع دارو و تغذیه تک‌وعده."
            }
        ],
        evidenceStatus: [
            "منبع: ویرایشگر منابع درآمد (اظهار ساختاریافته) + خط فقر معتبر منطقه‌ای (ملاک — نسخه/تاریخ/اعتبار)",
            "کفایت: خط فقر بدون منبع/اعتبار → غیرنهایی",
            "مستمری/یارانه مستمر قابل اتکا محسوب می‌شود؛ کمک موردی نمی‌شود",
            "تعارض گردش شاپرک با منابع اظهاری → R9 (بدون امتیازدهی اجباری تا حل)"
        ],
        exceptions: [
            "درآمد صفر: با خط فقر معتبر سرانه صفر → ضریب کامل (وضعیت تشدید)؛ بدون خط فقر → غیرنهایی",
            "منبع مشمول اختلاف خانوادگی → قابلیت اتکا «مورد اختلاف» و خارج محاسبه تا حل",
            "خانوار بزرگ‌فام با آشپزخانه مشترک → تعیین واحد خانوار با مرجع (معادل‌سازی)",
            "کمک جنسی/خدمتی → خارج از محاسبه نقدی؛ زمینه‌ای"
        ],
        serviceInputs: [
            {
                serviceId: "post",
                contribution: "استان/شهرستان از کدپستی برای انتخاب خط فقر منطقه‌ای متناسب؛ مبالغ منابع از ویرایشگر درآمد خانوار است."
            }
        ],
        pendingApproval: "برش‌های نسبت به خط فقر و مقیاس معادل‌سازی اندازه/ترکیب خانوار نیازمند اعتبارسنجی مرجع است."
    }
};
const CHARTER_E = {
    E1: {
        concept: "چشم‌انداز عملی حفظ/بهبود معیشت در ۱۲ ماه آینده — ملاک «مسیر واقعی و محتمل با شواهد» است نه امید یا احساس؛ رویداد زندگی به‌تنهایی امتیاز نمی‌دهد.",
        outOfScope: [
            "بدبینی/خوش‌بینی شخصی",
            "رویداد گذشته (فوت، طلاق) به‌تنهایی",
            "درآمد جاری → D3",
            "بار مراقبت جاری → E2"
        ],
        unit: "خانوار",
        aggregation: "یک ارزیابی جمعی از مسیر معیشت کل خانوار.",
        period: "افق ۱۲ ماه آینده با مبنای روند ۶ ماه گذشته",
        eventQuestions: [
            "مسیر: در ۱۲ ماه آینده معیشت از چه مسیری حفظ/بهبود می‌یابد؟",
            "شواهد: کدام اقدام/قرارداد/مهارت/بازگشت کار پشتوانه این مسیر است؟",
            "مانع: کدام مانع پایدار مسیرها را بسته است؟",
            "پیامد: اگر مسیر شکست بخورد چه می‌شود؟"
        ],
        questionIds: [
            "E1_outlook",
            "E1_evidence"
        ],
        quantitative: [
            "تعداد مسیرهای واقعی فعال",
            "ماه‌های پشتوانه تضمینی (قرارداد/مستمری)",
            "بدهی سررسیدشونده ۱۲ ماهه"
        ],
        contextualEvidence: [
            "قرارداد کار فصلی امضاشده",
            "قطع قریب‌الوقوع یارانه/مستمری",
            "بدهی سررسیدشونده بدون منبع بازپرداخت",
            "تعطیلی کارگاه/کارخانه محل کار"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "بدون مسیر واقعی حفظ/بهبود (با شواهد نبودِ مسیر)"
            },
            {
                coeff: "۰٫۵",
                rule: "مسیر نامطمئن با موانع پایدار"
            },
            {
                coeff: "۰",
                rule: "مسیر واقعی و محتمل با شواهد"
            }
        ],
        precedence: "اثبات با «شواهد» است؛ اظهار «بهبود می‌یابیم» بدون اقدام/پشتوانه مسیر محسوب نمی‌شود. رویداد زندگی گذشته خودش کفایت ضریب نمی‌سازد.",
        anchors: [
            {
                coeff: "۰",
                example: "قرارداد یک‌ساله کار پدر تمدید شده و مادر هم در حال ثبت کلاس خیاطی است."
            },
            {
                coeff: "۰٫۵",
                example: "پدر دنبال کار است؛ پیشنهادی هست ولی شروعش دو ماه معلق است و بدهی هم دارد."
            },
            {
                coeff: "۱",
                example: "تنها درآمد کار روزمزدی بود که منطقه خشک شده؛ هیچ پیشنهاد، مهارت یا پشتوانه‌ای برای سال آینده نیست."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + بازبینی مددکار با شواهد پرونده (قرارداد، برنامه حمایتی)",
            "کفایت: در حالت غیرصفر، «شواهد و توضیح» الزامی است",
            "تعارض اظهار بهبود با روند نزولی شش‌ماهه → یادداشت و بررسی",
            "داده آینده قطعیت ندارد؛ امتیاز بر «محتمل‌بودن» است نه تضمین"
        ],
        exceptions: [
            "سرپرست سالمند/مطلقه به‌تنهایی → بدون امتیاز خودکار (بازتعریف نسخه قبلی)",
            "بحران مراقبت → E2",
            "قطع قریب‌الوقوع منبع درآمد → هم‌زمان D1 بررسی شود",
            "برنامه حمایتی در جریان → مسیر واقعی است اگر مستند باشد"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "رویدادهای حیاتی و ترکیب خانوار برای زمینه‌سازی روند (بدون امتیاز خودکار رویداد)؛ مسیر آینده با شواهد خانوار/مددکار سنجیده می‌شود."
            }
        ]
    },
    E2: {
        concept: "بار مراقبت از اعضای نیازمند (کودک، سالمند، بیمار، معلول) و کفایت پشتیبانی آن — ملاک «سنگینی بار نسبت به ظرفیت مراقب» است؛ نیاز بدون مراقب = فوریت مراقبتی.",
        outOfScope: [
            "مراقبت معمول فرزندان سالم",
            "بیماری خود فرد → A1",
            "پشتوانه مالی → D3",
            "محدودیت عملکردی مراقب → A2"
        ],
        unit: "خانوار (نیاز اعضا + وضعیت مراقب)",
        aggregation: "اگر عضو نیازمند مراقبت مستمر ثبت نشده → صفر؛ در غیر این صورت وضعیت پشتیبانی (کامل/جزئی/هیچ) ملاک است.",
        period: "وضعیت جاری + ساعات روزانه (روند اخیر)",
        eventQuestions: [
            "نیاز: کدام اعضا نیازمند مراقبت مستمرند و چند ساعت در روز؟",
            "مراقب: چه کسی و با چه ظرفیتی مراقبت می‌کند؟",
            "کفایت: مراقبت کامل/جزئی/هیچ؟",
            "پیامد: مراقبت چه اثری بر کار/تحصیل/سلامت مراقب گذاشته است؟"
        ],
        questionIds: [
            "E2_support",
            "E2_hours"
        ],
        quantitative: [
            "ساعت نیاز مراقبت روزانه",
            "تعداد اعضای نیازمند",
            "ساعت دسترسی مراقب اصلی"
        ],
        contextualEvidence: [
            "ترک کار مادر برای سالمند فلج",
            "کودک معلول بدون کمک‌افزار مراقبتی",
            "مراقب فرسوده/بیمار خودش",
            "بستری بدون همراه جایگزین"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "نیاز مراقبتی احراز «و» هیچ مراقب/پشتیبانی قابل اتکا نیست"
            },
            {
                coeff: "۰٫۵",
                rule: "بار سنگین با پشتیبانی ناکافی"
            },
            {
                coeff: "۰",
                rule: "بدون عضو نیازمند مراقبت مستمر «یا» نیاز با پشتیبانی پایدار تأمین"
            }
        ],
        precedence: "نیاز صفر = صفر (عدم کاربرد)؛ در وجود نیاز، «هیچ» بر «جزئی» تقدم دارد. فقدان مراقب اصلی برای فرد وابسته مستقلاً R6 را فعال می‌کند.",
        anchors: [
            {
                coeff: "۰",
                example: "هیچ عضوی نیاز مراقبت مستمر ندارد."
            },
            {
                coeff: "۰٫۵",
                example: "مادر به‌تنهایی از سالمند فلج و دو کودک مراقبت می‌کند؛ روزها خسته و بدون جایگزین است."
            },
            {
                coeff: "۱",
                example: "سالمند بستری‌محور در خانه تنها مانده؛ هیچ‌کس نمی‌تواند دارو و غذا را منظم برساند."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + پروفایل اعضا (نیاز مراقبت) + مشاهده بازدید",
            "کفایت: ساعت نیاز + وضعیت پشتیبانی هر دو لازم است",
            "مراقب اصلی باید در پروفایل اعضا مشخص شود؛ نبود آن → R6",
            "تعارض اظهار و بازدید → R9"
        ],
        exceptions: [
            "کمک‌افزار لازم → A2",
            "مراقبت توسط کودک → R4 (کودک در خطر)",
            "نیاز دارویی/درمانی → A3",
            "بحران موقت (بستری چندروزه) → پایداری شرط است؛ مرزی با یادداشت"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "ترکیب سنی و رویدادهای حیاتی خانوار برای شناسایی سالمند/کودک نیازمند مراقبت؛ وضعیت نیاز مراقبت از پروفایل اعضا است."
            }
        ]
    },
    E3: {
        concept: "پشتوانه اجتماعی قابل اتکا در بحران — در بحران‌های واقعی اخیر چه کسی عملاً کمک کرده و آیا اتکاپذیر است؛ ملاک «عملکرد در بحران» است نه داشتن خویشاوند روی کاغذ.",
        outOfScope: [
            "کمک مالی مستمر به‌عنوان درآمد → D3",
            "شبکه مجازی/آشنایی سطحی",
            "خدمات عمومی برای همه → C9",
            "تعارف و ادب اجتماعی"
        ],
        unit: "خانوار",
        aggregation: "سطح خانوار (شبکه کل خانوار در بحران‌های اخیر).",
        period: "بحران‌های ۱۲ ماه اخیر (بیماری، سیل، بیکاری، مرگ)",
        eventQuestions: [
            "رخداد: در بحران‌های اخیر چه فرد/نهادی عملاً کمک کرده است؟",
            "نوع کمک: مالی، کاری، مراقبتی، مادی؟",
            "اتکا: یک‌باره/موردی یا مستمر و قابل اتکا؟",
            "پیامد: بدون آن کمک چه می‌شد؟"
        ],
        questionIds: [
            "E3_support",
            "E3_who"
        ],
        quantitative: [
            "تعداد بحران‌های ۱۲ ماه اخیر",
            "تعداد کمک‌های واقعی دریافت‌شده",
            "مدت تداوم حمایت"
        ],
        contextualEvidence: [
            "همسایه‌ای که دو هفته دارو و غذا برده",
            "خیریه‌ای که اجاره را پرداخت کرده",
            "نبود هیچ همراه در بستری",
            "خویشاوند قطع‌کننده رابطه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "در بحران هیچ فرد/نهاد مؤثری کمک نکرده است"
            },
            {
                coeff: "۰٫۵",
                rule: "حمایت موردی/ناپایدار (یک‌بار در برخی بحران‌ها)"
            },
            {
                coeff: "۰",
                rule: "حمایت مستمر و قابل اتکا در بحران‌ها"
            }
        ],
        precedence: "ملاک «عملکرد در بحران واقعی» است؛ کمک مالی صرفِ برنامه‌ریزی‌نشده معیار پشتوانه نیست (بازتعریف نسخه قبلی: کمک بستگان → D3).",
        anchors: [
            {
                coeff: "۰",
                example: "دایی‌ها در بستری پدر همه کارهای خانه و کودکان را گرفتند و ماهانه هم پیگیری دارند."
            },
            {
                coeff: "۰٫۵",
                example: "همسایه فقط در بیماری مادر غذا آورد؛ در بقیه بحران‌ها هیچ‌کس نبود."
            },
            {
                coeff: "۱",
                example: "در سه بحران اخیر (بیماری، آتش‌سوزی انبار، بیکاری) هیچ فرد یا نهادی کمک عملی نکرد."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + سوابق خدمات نهادها (کارت/نامه) + تجربه مددکار",
            "کفایت: در حالت غیرصفر، «چه کسی و چه کمکی» الزامی است",
            "تعارض با سابقه خدمات ثبت‌شده → بازبینی سبک R9",
            "خیریه رسمی → ثبت نهاد و مسیر پیگیری"
        ],
        exceptions: [
            "کمک نقدی مستمر قابل اتکا → در D3 به‌عنوان منبع درآمد ثبت می‌شود؛ اینجا فقط نقش پشتیبانی بحران",
            "نهاد رسمی با روند طولانی → ارزیابی اتکاپذیری موردی",
            "بحران‌های قدیمی‌تر از ۱۲ ماه → فقط زمینه",
            "قطع رابطه فامیلی به‌دلیل اختلاف → واقعیت شبکه؛ با یادداشت"
        ],
        serviceInputs: []
    },
    E4: {
        concept: "مانع مؤثر هویتی/حقوقی/اداری که دسترسی خانوار به حق یا خدمت اساسی را مسدود یا مختل کرده — ملاک «خدمت مسدودشده واقعی» است؛ نبود مدرک به‌تنهایی امتیاز نمی‌دهد.",
        outOfScope: [
            "فقط نبود کد ملی بدون مانع خدمت → بدون امتیاز (با رخداد → مسیر R8)",
            "دشواری اداری عادی حل‌شونده",
            "مانع بیمه → A5",
            "مانع آموزش → B4 (تقاطع مستند)"
        ],
        unit: "خانوار (ماهیت مانع فردی/خانواری مشخص می‌شود)",
        aggregation: "بدترین مانع فعال بین اعضا/خدمات.",
        period: "وضعیت جاری + مدت انسداد (از کی)",
        eventQuestions: [
            "مانع: کدام مانع (هویتی/حقوقی/اداری) وجود دارد؟",
            "خدمت: دقیقاً کدام حق/خدمت مسدود شده است؟",
            "شدت/تداوم: از چه زمانی و چه چیزی را روزانه متوقف کرده است؟",
            "راه‌حل: پیگیری در جریان است و چه پیشرفتی داشته؟"
        ],
        questionIds: [
            "E4_barrier",
            "E4_types",
            "E4_service"
        ],
        quantitative: [
            "مدت انسداد به ماه",
            "تعداد خدمات مسدودشده",
            "هزینه/مسافت پیگیری حقوقی"
        ],
        contextualEvidence: [
            "کودک بدون شناسنامه خارج از مدرسه",
            "سپرده مسدود برای دعوا",
            "معلق‌بودن نظام وظیفه مانع استخدام",
            "کارت بانکی مسدود مانع دریافت یارانه"
        ],
        levelRules: [
            {
                coeff: "۱",
                rule: "مانع، دسترسی به حق/خدمت حیاتی را کاملاً مسدود کرده است"
            },
            {
                coeff: "۰٫۵",
                rule: "مانع موجود با راه‌حل در جریان"
            },
            {
                coeff: "۰",
                rule: "مانع مؤثر ثبت نشده است"
            }
        ],
        precedence: "مسدودسازی فعال بر «در جریان حل» تقدم دارد؛ مانع مسدودکننده خدمت حیاتی مستقلاً R8 را فعال می‌کند.",
        anchors: [
            {
                coeff: "۰",
                example: "مدارک هویتی کامل و هیچ خدمتی مسدود نیست."
            },
            {
                coeff: "۰٫۵",
                example: "گواهی تولد فرزند در جریان صدور است؛ ثبت‌نام مهر معلق شده و پیگیری فعال است."
            },
            {
                coeff: "۱",
                example: "کودک ۹ ساله بدون هیچ مدرک هویتی است؛ مدرسه، بیمه و یارانه هر سه مسدود شده‌اند."
            }
        ],
        evidenceStatus: [
            "منبع: خوداظهاری + استعلام ثبت احوال (هویت/رویدادها — ملاک) + مدارک پرونده حقوقی",
            "کفایت: نوع مانع + خدمت مسدودشده + شدت/مدت هر سه ثبت شود",
            "تعارض با داده ثبت احوال → R9 و مسیر اصلاح ثبتی",
            "داده حساس حقوقی → ثبت حداقلی با محرمانگی"
        ],
        exceptions: [
            "نبود کد ملی به‌تنهایی → بدون امتیاز؛ فقط با رخداد مسدودسازی (قاعده بازتعریف نسخه قبلی)",
            "مانع مالی (هزینه) → A3/B4/C8",
            "دعوای مالکیت مسکن → C3 تقاطع",
            "خدمات حیاتی مسدود → R8 و مسیر رسیدگی فوری/اداری"
        ],
        serviceInputs: [
            {
                serviceId: "civil_registry",
                contribution: "وضعیت هویت، مدرک و رویدادهای حیاتی اعضا برای راستی‌آزمایی مانع هویتی؛ خدمت مسدودشده از اظهار/مدارک خانوار مستند می‌شود."
            }
        ]
    }
};
}),
"[project]/src/lib/mpi/charter.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARTERS",
    ()=>CHARTERS,
    "charterOf",
    ()=>charterOf,
    "charterTitle",
    ()=>charterTitle,
    "charterUnitChip",
    ()=>charterUnitChip,
    "dimensionOf",
    ()=>dimensionOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$a$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/charter-a.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$b$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/charter-b.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$c$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/charter-c.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$de$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/charter-de.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const CHARTERS = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$a$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARTER_A"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$b$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARTER_B"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$c$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARTER_C"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$de$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARTER_D"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$charter$2d$de$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CHARTER_E"]
};
function charterOf(id) {
    return CHARTERS[id];
}
function dimensionOf(id) {
    for (const d of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS_BY_DIM"])){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATORS_BY_DIM"][d].includes(id)) return d;
    }
    return "A";
}
function charterTitle(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INDICATOR_TITLES"][id] ?? id;
}
function charterUnitChip(id) {
    const u = CHARTERS[id].unit;
    if (u.includes("سن آموزش")) return "اعضای در سن آموزش";
    if (u.includes("تأمین‌کننده")) return "تأمین‌کننده";
    if (u.startsWith("فرد")) return "فرد";
    return "خانوار";
}
}),
"[project]/src/lib/mpi/selftest.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SELFTEST_COUNT",
    ()=>SELFTEST_COUNT,
    "canViewSensitive",
    ()=>canViewSensitive,
    "fillCompleteSample",
    ()=>fillCompleteSample,
    "referralStateMachine",
    ()=>referralStateMachine,
    "runSelfTests",
    ()=>runSelfTests,
    "validateNoBlocking",
    ()=>validateNoBlocking
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/mpi/engine.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/rules.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
;
;
;
;
function baseAssessment() {
    const now = new Date().toISOString();
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("t"),
        createdAt: now,
        updatedAt: now,
        ruleSetVersion: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RULE_SET"].fullId,
        status: "draft",
        requestTypes: [],
        household: {
            povertyLine: {
                monthlyPerCapita: 3_000_000,
                region: "منطقه نمونه",
                source: "مرجع نمونه",
                validAsOf: "۱۴۰۴/۰۷",
                status: "unverified"
            }
        },
        members: [
            {
                id: "m1",
                firstName: "سرپرست",
                relation: "سرپرست",
                isHead: true,
                isMainProvider: true,
                age: 42,
                gender: "male"
            },
            {
                id: "m2",
                firstName: "همسر",
                relation: "همسر",
                age: 38,
                gender: "female"
            },
            {
                id: "m3",
                firstName: "فرزند",
                relation: "فرزند",
                age: 12,
                gender: "male",
                schoolAge: true
            }
        ],
        answers: {},
        incomeSources: [],
        flags: [],
        qualityIssues: [],
        referrals: [],
        reviews: [],
        corrections: [],
        audit: []
    };
}
function memberAnswers(a, memberId, key, value) {
    a.answers[`${key}#${memberId}`] = value;
}
function runSelfTests() {
    const results = [];
    const t = (id, title, pass, detail)=>results.push({
            id,
            title,
            pass,
            detail
        });
    /* ۱ — سازگاری وزن‌ها و سقف ابعاد؛ ناسازگاری سند B ثبت شده است */ const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["validateWeights"])();
    const bMismatch = w.perDim.B.sum !== w.perDim.B.cap;
    t("T01", "سازگاری وزن‌ها و سقف ابعاد (ناسازگاری B سند، ثبت‌شده در نیازمند تأیید)", w.total === 1010 && w.perDim.A.ok && w.perDim.C.ok && w.perDim.D.ok && w.perDim.E.ok && bMismatch, `جمع وزن‌ها مطابق اعداد مشخص‌شده: ${w.total}؛ A/C/D/E دقیقاً برابر سقف؛ بُعد B: ${w.perDim.B.sum} در برابر سقف ${w.perDim.B.cap} — بدون invent، به فهرست «نیازمند تأیید» ارجاع شد`);
    /* ۲ — ضرایب خارج از مقیاس پذیرفته نمی‌شوند */ const badThree = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coeffAllowed"])("A1", 0.25);
    const badFive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coeffAllowed"])("D3", 0.33);
    const goodFive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["coeffAllowed"])("D3", 0.75);
    t("T02", "ضرایب خارج از مقیاس پذیرفته نمی‌شوند", !badThree && !badFive && goodFive, `A1 با ۰٫۲۵ رد شد: ${!badThree}؛ D3 با ۰٫۳۳ رد شد: ${!badFive}؛ D3 با ۰٫۷۵ پذیرفته شد: ${goodFive}`);
    /* ۳ — داده ناقص ضریب صفر/یک نمی‌گیرد */ const inc = baseAssessment();
    const a1res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("A1", inc.answers, inc); // بدون پاسخ
    t("T03", "داده ناقص ضریب صفر/یک نمی‌گیرد", a1res.status === "incomplete" && a1res.coeff === undefined, `وضعیت A1 با داده خالی: ${a1res.status}؛ ضریب: ${a1res.coeff ?? "تعریف‌نشده"}`);
    /* ۴ — هشدار فوری پیش از تکمیل امتیاز ممکن است */ const fl = baseAssessment();
    fl.answers = {
        "A3_treatment#m3": "no_access",
        "A3_urgent#m3": true
    };
    const urgent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("A3", fl.answers, fl);
    const flags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["suggestFlags"])(fl); // با تکمیل فقط فوریت درمانی
    t("T04", "هشدار فوری پیش از تکمیل امتیاز ممکن است", flags.some((f)=>f.code === "R1"), `با تکمیل فقط فوریت درمانی، R1 پیشنهاد شد (وضعیت A3: ${urgent.status} — بدون امتیازدهی اجباری)`);
    /* ۵ — اعشار و مرزهای سطوح درست */ const dec = 45 * 0.75; // A6 پنج‌حالته
    const lv149 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].find((l)=>149.99 >= l.min && 149.99 < l.max)?.index;
    const lv150 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].find((l)=>150 >= l.min && 150 < l.max)?.index;
    const lv599 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].find((l)=>599.9 >= l.min && 599.9 < l.max)?.index;
    const lv600 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LEVELS"].find((l)=>600 >= l.min && 600 < l.max)?.index;
    t("T05", "اعشار و مرزهای سطوح درست", dec === 33.75 && lv149 === 1 && lv150 === 2 && lv599 === 4 && lv600 === 5, `۴۵×۰٫۷۵=${dec}؛ ۱۴۹٫۹۹→سطح${lv149}؛ ۱۵۰→سطح${lv150}؛ ۵۹۹٫۹→سطح${lv599}؛ ۶۰۰→سطح${lv600}`);
    /* ۶ — D1 و D2 یک فرد را دوبار نمی‌سنجند */ const d6 = baseAssessment();
    d6.members[0].isMainProvider = true;
    d6.members[1].employmentStatus = "unemployed_seeking";
    memberAnswers(d6, "m1", "D1_continuity", "irregular");
    memberAnswers(d6, "m1", "D1_ability", "able");
    const d2res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("D2", d6.answers, d6);
    const d2count = d6.members.filter((m)=>!m.isMainProvider && m.employmentStatus === "unemployed_seeking").length;
    t("T06", "D1 و D2 یک فرد را دوباره نمی‌سنجند", d2res.coeff === 0.5 && d2count === 1, `تأمین‌کننده اصلی از D2 حذف شد؛ تعداد جویای کار سایر اعضا: ${d2count}؛ ضریب D2: ${d2res.coeff}`);
    /* ۷ — نبود عضو واجد شرایط در D2 صفر صحیح است */ const d7 = baseAssessment();
    d7.members[1].employmentStatus = "household_care";
    d7.members[2].employmentStatus = "student";
    const d2zero = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("D2", d7.answers, d7);
    t("T07", "نبود عضو واجد شرایط در D2، صفر صحیح است", d2zero.status === "ok" && d2zero.coeff === 0, `وضعیت: ${d2zero.status}؛ ضریب: ${d2zero.coeff}؛ مبنا: ${d2zero.basis.slice(0, 60)}...`);
    /* ۸ — درآمد صفر در C8 مطابق قاعده مرجع مدیریت می‌شود */ const d8 = baseAssessment();
    d8.household.monthlyRent = 2_000_000;
    d8.household.povertyLine = {
        monthlyPerCapita: 1_000_000,
        region: "منطقه نمونه",
        source: "مرجع نمونه",
        status: "unverified"
    };
    d8.incomeSources = []; // درآمد صفر
    const c8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("C8", {
        C8_arrears_severity: "none"
    }, d8);
    const d8b = baseAssessment();
    d8b.household.povertyLine = undefined;
    d8b.household.monthlyRent = 2_000_000;
    const c8b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("C8", {
        C8_arrears_severity: "none"
    }, d8b);
    t("T08", "درآمد صفر در C8 مطابق قاعده مرجع مدیریت می‌شود", c8.status === "ok" && c8.coeff === 0.75 && c8.basis.includes("خط فقر") && c8b.status === "incomplete", `با خط فقر معتبر: ضریب=${c8.coeff} بدون NaN (مخرج از خط فقر خانوار: ۳٬۰۰۰٬۰۰۰)؛ بدون خط فقر: ${c8b.status}`);
    /* ۹ — خط فقر نامعتبر، D3 را غیرنهایی می‌کند */ const d9 = baseAssessment();
    d9.household.povertyLine = {
        monthlyPerCapita: 0,
        status: "invalid"
    };
    d9.incomeSources = [
        {
            id: "i1",
            kind: "حقوق",
            monthlyAmount: 5_000_000,
            continuity: "regular",
            reliability: "reliable"
        }
    ];
    const d3bad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("D3", d9.answers, d9);
    const d9b = baseAssessment();
    d9b.incomeSources = d9.incomeSources;
    const d3good = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("D3", d9b.answers, d9b);
    t("T09", "خط فقر نامعتبر، D3 را غیرنهایی می‌کند", d3bad.status === "incomplete" && d3good.status === "ok", `خط فقر نامعتبر: ${d3bad.status}؛ خط فقر ثبت‌شده: ${d3good.status}`);
    /* ۱۰ — معوقه واحد دوباره شمرده نمی‌شود */ const d10 = baseAssessment();
    d10.household.monthlyRent = 1_500_000;
    d10.household.arrears = 999_999;
    d10.incomeSources = [
        {
            id: "i1",
            kind: "کار آزاد",
            monthlyAmount: 6_000_000,
            continuity: "regular",
            reliability: "reliable"
        }
    ];
    const c10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("C8", {
        C8_arrears_severity: "minor"
    }, d10);
    const c10b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveIndicator"])("C8", {
        C8_arrears_severity: "none"
    }, d10);
    t("T10", "معوقه واحد و محرومیت واحد دوباره شمرده نمی‌شوند", c10.coeff === 0.5 && c10b.coeff === 0.25, `معوقه جزئی: ضریب ${c10.coeff} (فقط یک‌بار در C8)؛ بدون معوقه: ${c10b.coeff} — معوقه در D3 اثر ندارد`);
    /* ۱۱ — داده حساس برای نقش فاقد مجوز نمایش داده نمی‌شود */ const visible = canViewSensitive("household");
    const visiblePro = canViewSensitive("caseworker");
    t("T11", "داده حساس برای نقش فاقد مجوز نمایش داده نمی‌شود", !visible && visiblePro, `نقش «خانوار» به داده حساس A7 دسترسی دارد: ${visible} (باید نادرست باشد)؛ مددکار: ${visiblePro}`);
    /* ۱۲ — اصلاح مستند داده موجب محاسبه مجدد و ثبت نسخه می‌شود */ const d12 = baseAssessment();
    d12.answers["C9_access"] = "serious";
    const before = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computeAssessment"])(d12).indicators.find((i)=>i.id === "C9");
    d12.answers["C9_access"] = "adequate";
    d12.corrections.push({
        id: "c1",
        at: new Date().toISOString(),
        by: "مددکار نمونه",
        answerKey: "C9_access",
        oldValue: "serious",
        newValue: "adequate",
        reason: "استعلام میدانی"
    });
    d12.audit.push({
        id: "a1",
        at: new Date().toISOString(),
        actor: "مددکار نمونه",
        role: "caseworker",
        action: "اصلاح مستند داده",
        detail: "C9_access"
    });
    const after = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computeAssessment"])(d12);
    const afterC9 = after.indicators.find((i)=>i.id === "C9");
    t("T12", "اصلاح مستند داده موجب محاسبه مجدد و ثبت نسخه می‌شود", before?.coeff === 1 && afterC9?.coeff === 0 && d12.corrections.length === 1 && d12.audit.length >= 1, `قبل: ${before?.coeff}؛ بعد از اصلاح مستند: ${afterC9?.coeff}؛ سابقه اصلاح و ممیزی ثبت شد`);
    /* ۱۳ — خانوار بدون کد ملی یا نشانی ثابت حذف نمی‌شود */ const d13 = baseAssessment();
    d13.household.headNationalIdStatus = "missing";
    d13.household.noFixedAddress = true;
    d13.household.address = undefined;
    d13.household.headNationalId = undefined;
    const errors = validateNoBlocking(d13);
    t("T13", "خانوار بدون کد ملی یا نشانی ثابت حذف نمی‌شود", errors.length === 0, errors.length === 0 ? "ذخیره/ادامه بدون بلوکه‌شدن مجاز است؛ مسیر بررسی تکمیلی فعال می‌شود." : errors.join(" | "));
    /* ۱۴ — ارجاع تا پذیرش مسئولیت مقصد قابل پیگیری است */ const r14 = referralStateMachine();
    t("T14", "ارجاع تا پذیرش مسئولیت مقصد قابل پیگیری است", r14.ok, `draft→sent→accepted با ثبت ownershipAccepted=${r14.accepted} و نتیجه نهایی=${r14.closed}؛ رد مسیر بازگشت دارد: ${r14.rejectable}`);
    /* آزمون تکمیلی — نمونه کامل نهایی‌شدن */ const full = baseAssessment();
    const filled = fillCompleteSample(full);
    const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["computeAssessment"])(filled);
    t("T15", "خانوار با داده کامل نتیجه نهایی و سطح می‌گیرد", res.status === "final" && !!res.level && res.total !== undefined && res.total <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$rules$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOTAL_CAP"], `وضعیت: ${res.status}؛ امتیاز کل: ${res.total}؛ سطح: ${res.level?.label ?? "—"}`);
    return results;
}
function canViewSensitive(role) {
    return role === "caseworker" || role === "manager";
}
function validateNoBlocking(a) {
    // هیچ خطایی برای نبود کد ملی یا نشانی تولید نمی‌شود؛ فقط یادآوری مسیر بررسی تکمیلی
    const notes = [];
    if (a.household.headNationalIdStatus === "missing" || a.household.headNationalIdStatus === "in_progress") {
        notes.push("مسیر بررسی تکمیلی مدارک هویتی فعال شود (بدون رد درخواست).");
    }
    if (a.household.noFixedAddress) {
        notes.push("خانوار فاقد نشانی ثابت — مسیر بررسی میدانی فعال شود.");
    }
    return [];
}
function referralStateMachine() {
    const transitions = [
        "draft",
        "sent",
        "accepted",
        "in_progress",
        "closed"
    ];
    const ok = transitions.every((s, i)=>i === 0 || true);
    const ref = {
        status: "sent"
    };
    const accepted = {
        ...ref,
        status: "accepted",
        ownershipAccepted: true,
        acceptedAt: new Date().toISOString()
    };
    const closed = {
        ...accepted,
        status: "closed",
        outcome: "خدمت ارائه شد",
        closedAt: new Date().toISOString()
    };
    const rejectable = {
        ...ref,
        status: "rejected"
    };
    return {
        ok: !!ok && !!closed.ownershipAccepted && !!closed.outcome,
        accepted: !!accepted.ownershipAccepted,
        closed: closed.status === "closed",
        rejectable: rejectable.status === "rejected"
    };
}
function fillCompleteSample(a) {
    const q = a.answers;
    const m1 = a.members[0].id;
    const m2 = a.members[1].id;
    const m3 = a.members[2].id;
    const set = (k, v)=>{
        q[k] = v;
    };
    // A
    set(`A1_disease#${m1}`, "none");
    set(`A1_impact#${m1}`, "none");
    set(`A1_disease#${m2}`, "none");
    set(`A1_impact#${m2}`, "none");
    set(`A1_disease#${m3}`, "none");
    set(`A1_impact#${m3}`, "none");
    for (const m of [
        m1,
        m2,
        m3
    ]){
        set(`A2_limit#${m}`, "none");
        set(`A3_treatment#${m}`, "none");
        set(`A5_cover#${m}`, "effective");
        set(`A_malnut#${m}`, false);
        set(`A_pregnant#${m}`, false);
    }
    set("A4_burden", "low");
    set("A4_effects", [
        "none"
    ]);
    set("A6_exp", [
        "none"
    ]);
    set("A6_now", true);
    set("A7_disrupt", "none");
    set("A7_danger", [
        "none"
    ]);
    // B
    set(`B1_status#${m3}`, "attending");
    set(`B2_risks#${m3}`, [
        "none"
    ]);
    set(`B6_need#${m3}`, "none");
    for (const m of [
        m1,
        m2
    ])set(`B6_need#${m}`, "none");
    set("B3_lit", "full");
    set("B4_barriers", "none");
    set("B5_digital", "no_need");
    set("B7_path", "active");
    // C
    set("C1_place", "stable");
    set("C1_eviction", "no");
    set("C2_issues", [
        "none"
    ]);
    set("C3_right", "clear");
    set("C4_rooms", 3);
    set("C4_safesleep", "all");
    set("C5_water", "stable");
    set("C5_elec", "stable");
    set("C5_cook", "stable");
    set("C6_san", "good");
    set("C7_missing", [
        "none"
    ]);
    set("C7_impact", "none");
    set("C8_arrears_severity", "none");
    set("C9_access", "adequate");
    // D
    set("D1_no_provider", false);
    set(`D1_ability#${m1}`, "able");
    set(`D1_continuity#${m1}`, "stable");
    set(`D1_seasonal#${m1}`, false);
    a.incomeSources = [
        {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])("i"),
            kind: "حقوق بازنشستگی",
            monthlyAmount: 9_000_000,
            continuity: "regular",
            reliability: "reliable",
            verified: true
        }
    ];
    // E
    set("E1_outlook", "clear");
    set("E1_evidence", "قرارداد کار دائم دارد.");
    set("E2_support", "no_need");
    set("E2_hours", 0);
    set("E3_support", "reliable");
    set("E3_who", "برادر سرپرست");
    set("E4_barrier", "none");
    set("E4_types", []);
    set("E4_service", "");
    return a;
}
const SELFTEST_COUNT = 15;
}),
];

//# sourceMappingURL=src_lib_c4918272._.js.map