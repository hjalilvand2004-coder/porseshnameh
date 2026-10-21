import type { Assessment, WebServiceResult, PrefillPayload } from "./types";
import { faNum, faDateTime } from "./format";

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
 */

/* ---------------- شبیه‌سازی قطعی از کدها (همان ورودی → همان پاسخ) ---------------- */

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** انتخاب قطعی از یک مجموعه با بذر ثابت */
function pick<T>(seed: number, pool: readonly T[], salt = 0): T {
  return pool[(seed + salt * 2654435761) % pool.length];
}

const MALE_NAMES = ["علی", "محمد", "حسین", "رضا", "مهدی", "امیر", "سعید", "حمید", "کریم", "جواد"] as const;
const FEMALE_NAMES = ["فاطمه", "زهرا", "مریم", "سارا", "نرگس", "لیلا", "معصومه", "الهام", "شیما", "پریسا"] as const;
const LAST_NAMES = ["احمدی", "محمدی", "حسینی", "رضایی", "کریمی", "موسوی", "جلیلوند", "شریفی", "نوروزی", "قاسمی", "صادقی", "بهرامی"] as const;
const RELATIONS = ["همسر", "فرزند", "فرزند", "فرزند", "مادر", "پدر", "خواهر", "برادر"] as const;
const PROVINCES = ["تهران", "البرز", "خراسان رضوی", "اصفهان", "فارس", "خوزستان", "مازندران", "آذربایجان شرقی", "گیلان", "کرمان"] as const;
const COUNTY_SUFFIX = ["مرکزی", "شهرستان جدید", "بهارستان", "پارس‌آباد", "زرندیه"] as const;
const STREET_NAMES = ["خیابان امام خمینی", "خیابان شهید بهشتی", "بلوار ولی‌عصر", "خیابان شریعتی", "بلوار شهید کاظمی", "خیابان انقلاب"] as const;
const MARRIAGE = ["متأهل", "متأهل", "مجرد", "متأهل — رویداد ازدواج اخیر ثبت شده", "متروکه (سابقه ثبتی)"] as const;
const FUND_NAMES = ["تأمین اجتماعی", "بیمه روستاییان و عشایر", "خدمات درمانی کشوری", "نیروهای مسلح"] as const;
const INS_COVER: { v: string; label: string }[] = [
  { v: "effective", label: "پوشش معتبر" },
  { v: "effective", label: "پوشش معتبر" },
  { v: "barriers", label: "پوشش با مانع (فرانشیز/فاصله)" },
  { v: "none", label: "بدون پوشش فعال" },
];
const EDU_STATUS: { v: string; label: string }[] = [
  { v: "enrolled", label: "ثبت‌نام فعال" },
  { v: "enrolled", label: "ثبت‌نام فعال" },
  { v: "interrupted", label: "وقفه تحصیل" },
  { v: "dropped", label: "ترک تحصیل" },
];
const DEGREES = ["کارشناسی", "دیپلم", "کارشناسی ارشد", "کاردانی"] as const;

function result(
  serviceId: string,
  status: WebServiceResult["status"],
  data: Record<string, string>,
  note?: string,
  prefills?: PrefillPayload,
): WebServiceResult {
  return { serviceId, status, fetchedAt: new Date().toISOString(), data, note, prefills };
}

function digitsOnly(s: string | undefined): string {
  return (s ?? "").replace(/[^\d]/g, "").replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

/* ---------------- شبیه‌ساز استعلام ---------------- */

export function simulateServiceFetch(serviceId: string, a: Assessment): WebServiceResult {
  const h = a.household;
  const members = a.members;
  const nid = digitsOnly(h.headNationalId);
  const postal = digitsOnly(h.postalCode);

  switch (serviceId) {
    /* ===== واکشی هویت از ثبت احوال — ملاک ===== */
    case "civil_registry": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "کد ملی ده‌رقمی سرپرست وارد نشده است — استعلام ثبت احوال ممکن نیست؛ مسیر دستی و بررسی میدانی فعال می‌شود (نبود مدرک موجب رد درخواست نمی‌شود).");
      }
      const seed = hashStr("reg:" + nid);
      const genderHead: "male" | "female" = (seed + 7) % 5 === 0 ? "female" : "male";
      const first = pick(seed, genderHead === "male" ? MALE_NAMES : FEMALE_NAMES);
      const last = pick(seed, LAST_NAMES, 3);
      const headName = `${first} ${last}`;
      const spouseName = pick(seed, genderHead === "male" ? FEMALE_NAMES : MALE_NAMES, 5) + " " + last;
      const childCount = 1 + ((seed >>> 5) % 3); // ۱ تا ۳ فرزند در سابقه ثبتی
      const memberCreates: PrefillPayload["memberCreates"] = [];
      if ((seed % 3) !== 1) {
        // سابقه ثبتی شامل همسر است
        memberCreates.push({ firstName: spouseName, relation: "همسر", age: 25 + ((seed >>> 9) % 25), gender: genderHead === "male" ? "female" : "male", fromRegistry: true });
      }
      for (let i = 0; i < childCount; i++) {
        const cSeed = seed + i * 97;
        const cg: "male" | "female" = cSeed % 2 === 0 ? "male" : "female";
        const age = (cSeed >>> 3) % 17;
        memberCreates.push({
          firstName: pick(cSeed, cg === "male" ? MALE_NAMES : FEMALE_NAMES, i + 2) + " " + last,
          relation: "فرزند", age, gender: cg, fromRegistry: true,
        });
      }
      const marriage = pick(seed, MARRIAGE, 11);
      return result(serviceId, "ok", {
        "نام و نام خانوادگی سرپرست": headName,
        "کد ملی سرپرست": nid.replace(/\d(?=(\d{4})+$)/g, "$1 "),
        "تاریخ تولد سرپرست": h.headBirthDate?.trim() || "در نسخه عملیاتی از سابقه ثبتی بازگردانده می‌شود",
        "وضعیت تأهل (سابقه ثبتی)": marriage,
        "اعضای ثبت‌شده در سابقه ثبتی": `${faNum(memberCreates.length)} نفر — ${memberCreates.map((m) => m.firstName.split(" ")[0]).join("، ")}`,
        "رویدادهای حیاتی (ازدواج/فوت/طلاق)": "در نسخه عملیاتی از سابقه رویدادهای ثبتی دریافت می‌شود",
      },
      "پاسخ شبیه‌سازی‌شده از کد ملی (نسخه نمایشی آفلاین) — در استقرار عملی، پاسخ واقعی ثبت احوال ملاک است. اعضای واکشی‌شده با برچسب منبع به عنوان پیش‌تکمیل ثبت می‌شوند؛ ترکیب جاری خانوار جداگانه تأیید می‌شود.",
      {
        householdPatch: { headName, headNationalId: nid, headNationalIdStatus: "has" },
        memberCreates,
      });
    }

    /* ===== واکشی نشانی از پست (از کد پستی) — ملاک ===== */
    case "post": {
      if (postal.length !== 10) {
        return result(serviceId, "error", {},
          "کد پستی ده‌رقمی وارد نشده است — استعلام نشانی ممکن نیست؛ نشانی می‌تواند به‌صورت دستی ثبت شود و در بازدید میدانی راستی‌آزمایی گردد.");
      }
      const seed = hashStr("post:" + postal);
      const province = pick(seed, PROVINCES);
      const county = province + " — " + pick(seed, COUNTY_SUFFIX, 2);
      const street = pick(seed, STREET_NAMES, 4);
      const alley = (seed % 12) + 1;
      const no = (seed >>> 6) % 90 + 1;
      const address = `${province}، ${county}، ${street}، کوچه ${faNum(alley)}، پلاک ${faNum(no)}`;
      return result(serviceId, "ok", {
        "نشانی استاندارد (از کد پستی)": address,
        "استان": province,
        "شهرستان / منطقه": county,
        "کد پستی": postal.replace(/(\d{5})(?=\d)/g, "$1 "),
        "موقعیت جغرافیایی": "مبنای خط فقر منطقه‌ای (D3)، دسترسی خدمات (C9) و موقعیت سکونت (C1)",
      },
      "پاسخ شبیه‌سازی‌شده از کد پستی (نسخه نمایشی آفلاین) — در استقرار عملی، نشانی استاندارد پست ملاک و غیرقابل ویرایش است.",
      {
        householdPatch: { province, county, address },
      });
    }

    /* ===== استعلام حساب بانکی از شاپرک/بانک‌ها با کد ملی — اجرای توافقنامه دسترسی ===== */
    case "shaparak_bank": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "برای استعلام بانکی با کد ملی، ابتدا کد ملی سرپرست را ثبت و واکشی کنید.");
      }
      if (!h.consents?.bankAccess) {
        return result(serviceId, "error", {},
          "توافقنامه دسترسی به اطلاعات بانکی در ثبت‌نام پذیرفته نشده است — بدون رضایت، استعلام بانکی انجام نمی‌شود و راستی‌آزمایی معیشت به مسیر مدارک مردمی منتقل می‌شود.");
      }
      const seed = hashStr("shp:" + nid);
      const hasAccount = seed % 5 !== 0; // ۸۰٪ حساب فعال
      if (!hasAccount) {
        return result(serviceId, "ok", {
          "حساب فعال با این کد ملی": "یافت نشد",
          "اجراهای توافقنامه": `پذیرش رضایت در ${faDateTime(new Date(h.consents.agreedAt ?? new Date().toISOString()))}`,
          "اثر بر سنجش": "نبود حساب به‌تنهایی امتیاز ندارد؛ منابع از سایر مسیرها (اعلامی + مدارک مردمی) سنجیده می‌شود (D1–D3)",
        },
        "حساب فعالی با این کد ملی در شبکه شاپرک یافت نشد — این پاسخ داده سنجش است و نباید به‌عنوان پیش‌داوری درباره درخواست تفسیر شود.");
      }
      const turn = 3 + (seed % 9); // ۳ تا ۱۱ تراکنش ماهانه (تجمیعی)
      const loans = seed % 4 === 0 ? "یک تسهیلات کوچک فعال" : "تسهیلات فعال ثبت نشده";
      const bounced = seed % 7 === 0 ? "یک مورد سابقه چک برگشتی (نیازمند بررسی زمینه)" : "سابقه چک برگشتی ثبت نشده";
      return result(serviceId, "ok", {
        "وضعیت حساب بانکی سرپرست": "حساب فعال — تطبیق با کد ملی انجام شد",
        "گردش تجمیعی ۳ ماه اخیر": `${faNum(turn)} تراکنش در ماه (جزئیات خرید مشاهده نمی‌شود)`,
        "وضعیت تسهیلات": loans,
        "چک برگشتی": bounced,
        "اجراهای توافقنامه": `پذیرش رضایت در ${faDateTime(new Date(h.consents.agreedAt ?? new Date().toISOString()))}`,
        "اثر بر سنجش": "فقط راستی‌آزمایی معیشت (D) — داده بانکی لایه پرونده‌ای است و امتیاز مستقل ندارد",
      },
      "مطابق توافقنامه: مانده و گردش تجمیعی فقط برای تطبیق منابع اعلامی استفاده می‌شود؛ جزئیات خرید و محل خرج کردن دریافت نمی‌شود.");
    }

    /* ===== استعلام پوشش بیمه با کد ملی — پیش‌تکمیل A5 ===== */
    case "insurance": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "برای استعلام بیمه با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
      }
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای تطبیق پوشش بیمه ثبت نشده است — ابتدا اعضای واکشی‌شده یا دستی را ثبت کنید.");
      }
      const seed = hashStr("ins:" + nid);
      const answerPrefills: PrefillPayload["answerPrefills"] = [];
      const rows: string[] = [];
      members.forEach((m, i) => {
        const s2 = hashStr("ins:" + nid + ":" + (m.nationalId || m.id) + ":" + m.firstName);
        const cover = pick(s2, INS_COVER, i);
        answerPrefills.push({ key: `A5_cover#${m.id}`, value: cover.v, label: `${m.firstName}: ${cover.label} (A5)` });
        rows.push(`${m.firstName}: ${cover.label} — ${pick(s2, FUND_NAMES, i + 1)}`);
      });
      const hasUnknown = members.some((m) => m.nationalIdStatus === "missing");
      return result(serviceId, hasUnknown ? "partial" : "ok", {
        "پوشش پایه اعضا (سابقه صندوق‌ها)": rows.join(" • "),
        "اعضای دارای پوشش معتبر": faNum(answerPrefills.filter((p) => p.value === "effective").length) + " از " + faNum(members.length),
      },
      "وجود پوشش از استعلام، «پیش‌تکمیل ملاک» است؛ اعتبار، فرانشیز و مانع استفاده واقعی (A5) باید جداگانه تأیید شود — بدون تکمیل شواهد، ضریب A5 تعیین‌نشده می‌ماند." + (hasUnknown ? " برخی اعضا فاقد کد ملی هستند و در استعلام نیامده‌اند." : ""),
      { answerPrefills });
    }

    /* ===== استعلام مالکیت با کد ملی — پیش‌تکمیل C3 ===== */
    case "property": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "برای استعلام اموال و املاک با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
      }
      const seed = hashStr("prop:" + nid);
      const owned = seed % 4 === 0; // ۲۵٪ سند به نام سرپرست
      const tenure = owned ? "مالک" : pick(seed, ["مستأجر", "رایگان سکونت دارد", "خدمتی", "وابسته به نهاد/فرد"] as const, 3);
      return result(serviceId, "ok", {
        "سابقه سند مسکن به نام سرپرست": owned ? "یافت شد — در نسخه عملیاتی شناسه ثبتی سند بازگردانده می‌شود" : "یافت نشد در سامانه املاک",
        "نوع تصرف استنباط‌شده (پیش‌تکمیل)": tenure,
        "اثر بر سنجش": "پیش‌تکمیل نوع حق سکونت (C3)؛ امنیت و پایداری تصرف با قرارداد و شرایط جاری جداگانه سنجیده می‌شود",
      },
      "نوع تصرف به‌عنوان «پیش‌تکمیل» اعمال می‌شود؛ مستأجربودن به‌تنهایی امتیاز نمی‌گیرد و ناپایداری خودکار فرض نمی‌شود.",
      h.tenureType ? { householdPatch: {} } : { householdPatch: { tenureType: tenure } });
    }

    /* ===== استعلام آموزش‌وپرورش با کد ملی — پیش‌تکمیل B1/B2 ===== */
    case "education_school": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "برای استعلام آموزش‌وپرورش با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
      }
      const school = members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای تطبیق وضعیت تحصیل ثبت نشده است.");
      }
      if (school.length === 0) {
        return result(serviceId, "ok", { "اعضای در سن آموزش اجباری": "۰ نفر" },
          "عضوی در سن ۶ تا ۱۸ سال ثبت نشده است — شاخص‌های B1/B2 به‌طور صحیح صفر محاسبه می‌شوند.");
      }
      const memberPrefills: PrefillPayload["memberPrefills"] = [];
      const rows: string[] = [];
      school.forEach((m, i) => {
        const s2 = hashStr("edu:" + nid + ":" + (m.nationalId || m.id));
        const st = pick(s2, EDU_STATUS, i);
        memberPrefills.push({ memberId: m.id, patch: { educationStatus: st.v as NonNullable<Assessment["members"][number]["educationStatus"]> }, label: `${m.firstName}: ${st.label}` });
        rows.push(`${m.firstName}: ${st.label}`);
      });
      return result(serviceId, "ok", {
        "وضعیت ثبت‌نام اعضا در سن آموزش (سابقه ثبتی)": rows.join(" • "),
        "راستی‌آزمایی B1/B2": "با سابقه آموزش‌وپرورش تطبیق می‌شود؛ حضور فعال و غیبت جاری جداگانه بررسی می‌شود",
      },
      "سابقه ثبتی «پیش‌تکمیل» است؛ «بله» حضور فعال را ثابت نمی‌کند و «وقفه» نیازمند بررسی جاری است.",
      { memberPrefills });
    }

    /* ===== استعلام مدارک دانشگاهی با کد ملی — داده زمینه‌ای B3/B7 ===== */
    case "higher_edu": {
      if (nid.length !== 10) {
        return result(serviceId, "error", {},
          "برای استعلام مدارک دانشگاهی با کد ملی، ابتدا کد ملی سرپرست را در گام هویت ثبت و واکشی کنید.");
      }
      const adults = members.filter((m) => typeof m.age === "number" && m.age >= 19);
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای استعلام مدارک دانشگاهی ثبت نشده است.");
      }
      const memberPrefills: PrefillPayload["memberPrefills"] = [];
      const rows: string[] = [];
      adults.forEach((m, i) => {
        const s2 = hashStr("uni:" + nid + ":" + (m.nationalId || m.id));
        const has = s2 % 3 === 0;
        const deg = pick(s2, DEGREES, i);
        if (has && !m.educationGrade) {
          memberPrefills.push({ memberId: m.id, patch: { educationGrade: deg }, label: `${m.firstName}: ${deg}` });
          rows.push(`${m.firstName}: ${deg}`);
        }
      });
      return result(serviceId, "ok", {
        "اعضای دارای مدرک دانشگاهی": rows.length ? rows.join(" • ") : "در سابقه ثبتی یافت نشد",
        "اثر بر سنجش": "مدرک به‌تنهایی امتیاز ندارد؛ ورودی سواد کارکردی (B3) و مسیر مهارت (B7) است",
      },
      rows.length ? undefined : "مدارک دانشگاهی در سابقه ثبتی یافت نشد — مدرک دانشگاهی شرط سنجش نیست.",
      memberPrefills.length ? { memberPrefills } : undefined);
    }

    default:
      return result(serviceId, "error", {}, "سرویس شناسایی نشد.");
  }
}

/** آیا استعلام این سرویس فیلد مشخصی را قفل می‌کند؟ (داده ملاک ثبتی) */
export const LOCKED_FIELDS: Record<string, string[]> = {
  civil_registry: ["headName", "headNationalId", "headBirthDate"],
  post: ["province", "county", "address"],
  shaparak_bank: [],
  property: [],
  insurance: [],
  education_school: [],
  higher_edu: [],
};
