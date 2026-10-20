import type { Assessment, WebServiceResult } from "./types";
import { faNum } from "./format";

/**
 * شبیه‌ساز پاسخ مراجع ثبتی (وب‌سرویس‌ها) برای نسخه نمایشی آفلاین.
 *
 * ⚠️ در استقرار عملی، این تابع با فراخوانی واقعی سرویس سازمان‌های متولی
 * (ثبت احوال، پست، بیمه‌ها، اموال و املاک، علوم، آموزش‌وپرورش) جایگزین می‌شود
 * و پاسخ همان «ملاک» غیرقابل ویرایش در غربالگری خواهد بود.
 * پاسخ شبیه‌سازی‌شده به‌طور قطعی از همان داده‌هایی که کاربر وارد کرده است ساخته
 * می‌شود تا رفتار واقعی (قفل‌شدن فیلد، برچسب منبع، تقدم داده) قابل مشاهده باشد.
 */

function result(
  serviceId: string,
  status: WebServiceResult["status"],
  data: Record<string, string>,
  note?: string,
): WebServiceResult {
  return { serviceId, status, fetchedAt: new Date().toISOString(), data, note };
}

export function simulateServiceFetch(serviceId: string, a: Assessment): WebServiceResult {
  const h = a.household;
  const members = a.members;
  const withNid = members.filter((m) => m.nationalId && m.nationalId.trim()).length;
  const headName = h.headName?.trim() ?? "";

  switch (serviceId) {
    case "civil_registry": {
      if (!headName && members.length === 0) {
        return result(serviceId, "error", {},
          "نام سرپرست یا اعضای خانوار برای استعلام ثبت نشده است — ابتدا اطلاعات پایه را وارد کنید.");
      }
      return result(serviceId, "ok", {
        "نام سرپرست": headName || "—",
        "کد ملی سرپرست": h.headNationalId?.trim() || "فاقد کد ملی در استعلام",
        "اعضای شناسایی‌شده در سابقه ثبتی": `${faNum(members.length)} نفر`,
        "اعضای دارای کد ملی": `${faNum(withNid)} از ${faNum(members.length)} نفر`,
        "رویدادهای ثبتی (ازدواج/فوت/طلاق)": "در نسخه عملیاتی از سابقه ثبتی دریافت می‌شود",
      });
    }

    case "post": {
      if (!h.province && !h.address && !h.county) {
        return result(serviceId, "error", {},
          "استان، شهرستان یا نشانی برای استعلام کدپستی و موقعیت جغرافیایی وارد نشده است.");
      }
      return result(serviceId, h.address ? "ok" : "partial", {
        "استان / شهرستان": [h.province, h.county].filter(Boolean).join(" / ") || "—",
        "نشانی استاندارد": h.address || "نشانی وارد نشده",
        "موقعیت جغرافیایی": "مبنای خط فقر منطقه‌ای (D3) و تحلیل دسترسی خدمات (C9)",
        "منطقه سنجش فقر": h.province ? `${h.province}${h.county ? " — " + h.county : ""}` : "نیازمند تعیین منطقه",
      }, h.address ? undefined : "نشانی کامل استعلام نشد — وضعیت استعلام جزئی.");
    }

    case "insurance": {
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای استعلام پوشش بیمه ثبت نشده است.");
      }
      const cover = { effective: 0, barriers: 0, none: 0, unknown: 0 };
      for (const m of members) {
        const v = a.answers[`A5_cover#${m.id}`];
        if (v === "effective") cover.effective++;
        else if (v === "barriers") cover.barriers++;
        else if (v === "none") cover.none++;
        else cover.unknown++;
      }
      return result(serviceId, cover.unknown === 0 ? "ok" : "partial", {
        "اعضای دارای پوشش معتبر": `${faNum(cover.effective)} از ${faNum(members.length)} نفر`,
        "پوشش با مانع استفاده": `${faNum(cover.barriers)} نفر`,
        "بدون پوشش پایه": `${faNum(cover.none)} نفر`,
        "در انتظار اتصال به صندوق": cover.unknown > 0 ? `${faNum(cover.unknown)} نفر (پاسخ ثبت نشده)` : "—",
      }, cover.unknown > 0 ? "برای استعلام کامل، پوشش بیمه همه اعضا (A5) را ثبت کنید." : undefined);
    }

    case "property": {
      const tenure = h.tenureType;
      if (!tenure || tenure === "—") {
        return result(serviceId, "error", {}, "نوع حق سکونت برای استعلام سابقه مالکیت مشخص نشده است.");
      }
      const owner = tenure === "مالک";
      return result(serviceId, "ok", {
        "نوع حق سکونت ثبت‌شده": tenure,
        "سابقه سند به نام سرپرست": owner ? "یافت شد — در نسخه عملیاتی شناسه ثبتی بازگردانده می‌شود" : "یافت نشد (مطابق وضعیت اظهاری)",
        "اثر بر سنجش": "امنیت تصرف و پایداری سکونت (C3) با این استعلام راستی‌آزمایی می‌شود",
      });
    }

    case "education_school": {
      const school = members.filter((m) => m.schoolAge || (typeof m.age === "number" && m.age >= 6 && m.age <= 18));
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای استعلام وضعیت تحصیل ثبت نشده است.");
      }
      if (school.length === 0) {
        return result(serviceId, "ok", {
          "اعضای در سن آموزش اجباری": "۰ نفر",
        }, "عضوی در سن ۶ تا ۱۸ سال ثبت نشده است — شاخص‌های B1/B2 صحیح صفر محاسبه می‌شوند.");
      }
      const st = { enrolled: 0, interrupted: 0, dropped: 0, never: 0, finished: 0, na: 0, unknown: 0 };
      for (const m of school) {
        const v = m.educationStatus;
        if (v && v in st) (st as Record<string, number>)[v]++;
        else st.unknown++;
      }
      const labels: Record<string, string> = {
        enrolled: "ثبت‌نام فعال", interrupted: "وقفه تحصیل", dropped: "ترک تحصیل",
        never: "هرگز ثبت‌نام نشده", finished: "اتمام تحصیل", na: "غیرمرتبط", unknown: "بدون پاسخ",
      };
      const parts = Object.entries(st)
        .filter(([k, n]) => n > 0 && k !== "unknown")
        .map(([k, n]) => `${labels[k]}: ${faNum(n)}`);
      return result(serviceId, st.unknown === 0 ? "ok" : "partial", {
        "اعضای در سن آموزش": `${faNum(school.length)} نفر`,
        "وضعیت ثبت‌نام (سابقه ثبتی)": parts.length ? parts.join(" • ") : "—",
        "راستی‌آزمایی B1/B2": "با سابقه آموزش‌وپرورش مقایسه می‌شود",
      }, st.unknown > 0 ? "وضعیت تحصیل برخی اعضا ثبت نشده — تکمیل کنید." : undefined);
    }

    case "higher_edu": {
      if (members.length === 0) {
        return result(serviceId, "error", {}, "عضوی برای استعلام مدارک دانشگاهی ثبت نشده است.");
      }
      const uni = members.filter((m) => {
        const g = (m.educationGrade ?? "") + " " + (m.note ?? "");
        return /کارشناسی|فوق|دکتری|دکترا/.test(g);
      });
      return result(serviceId, "ok", {
        "اعضای دارای مدرک دانشگاهی": uni.length
          ? `${faNum(uni.length)} نفر — ${uni.map((m) => `${m.firstName} ${m.lastName ?? ""}`).join("، ")}`
          : "یافت نشد",
        "اثر بر سنجش": "مدرک به‌تنهایی امتیاز ندارد؛ ورودی سواد کارکردی (B3) و مسیر مهارت (B7) است",
      });
    }

    default:
      return result(serviceId, "error", {}, "سرویس شناسایی نشد.");
  }
}

/** آیا استعلام این سرویس فیلد مشخصی را قفل می‌کند؟ */
export const LOCKED_FIELDS: Record<string, string[]> = {
  civil_registry: ["headName", "headNationalId"],
  post: ["province", "county", "address"],
  property: [],
  insurance: [],
  education_school: [],
  higher_edu: [],
};
