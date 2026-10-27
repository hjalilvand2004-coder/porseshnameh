import type { DimensionId, IndicatorId } from "./types";
import { INDICATORS_BY_DIM, INDICATOR_TITLES } from "./rules";
import type { IndicatorCharter } from "./charter-types";
import { CHARTER_A } from "./charter-a";
import { CHARTER_B } from "./charter-b";
import { CHARTER_C } from "./charter-c";
import { CHARTER_D, CHARTER_E } from "./charter-de";

/**
 * شناسنامه عملیاتی سنجش ۳۰ شاخص EM-MPI
 * مرجع واحد برای مودال «شناسنامه سنجش» در فرم‌های پرسشنامه.
 * قواعد با موتور حل قطعی هم‌راستا است؛ مصداق‌ها لنگر تفسیری ارزیاب‌اند.
 */
export const CHARTERS: Record<IndicatorId, IndicatorCharter> = {
  ...CHARTER_A,
  ...CHARTER_B,
  ...CHARTER_C,
  ...CHARTER_D,
  ...CHARTER_E,
} as Record<IndicatorId, IndicatorCharter>;

export function charterOf(id: IndicatorId): IndicatorCharter {
  return CHARTERS[id];
}

/** بُعد شاخص از روی فهرست رسمی ابعاد */
export function dimensionOf(id: IndicatorId): DimensionId {
  for (const d of Object.keys(INDICATORS_BY_DIM) as DimensionId[]) {
    if (INDICATORS_BY_DIM[d].includes(id)) return d;
  }
  return "A";
}

/** عنوان رسمی شاخص */
export function charterTitle(id: IndicatorId): string {
  return INDICATOR_TITLES[id] ?? id;
}

/** برچسب واحد سنجش کوتاه برای چیپ‌های هدر */
export function charterUnitChip(id: IndicatorId): "فرد" | "اعضای در سن آموزش" | "تأمین‌کننده" | "خانوار" {
  const u = CHARTERS[id].unit;
  if (u.includes("سن آموزش")) return "اعضای در سن آموزش";
  if (u.includes("تأمین‌کننده")) return "تأمین‌کننده";
  if (u.startsWith("فرد")) return "فرد";
  return "خانوار";
}
