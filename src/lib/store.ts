"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type Assessment,
  type AuditEvent,
  type DataCorrection,
  type DataQualityIssue,
  type FlagCode,
  type IncomeSource,
  type Member,
  type RedFlag,
  type Referral,
  type ReferralStatus,
  type ProfessionalReview,
  type Answers,
  type AnswerValue,
} from "@/lib/mpi/types";
import { FLAG_DEFS, RULE_SET } from "@/lib/mpi/rules";
import { buildDemoBank } from "@/lib/mpi/demo-bank";
import { nowIso, uid } from "@/lib/mpi/format";

/**
 * Store سامانه — نمونه نمایشی
 * ذخیره‌سازی: مرورگر (localStorage) با سیاست حداقل داده و انقضای پیش‌نویس.
 * ⚠️ این نسخه نمایشی است؛ ذخیره مرورگر جایگزین سرور امن با رمزنگاری و
 * کنترل دسترسی سمت سرور نیست. داده حساس واقعی در آن نگهداری نشود.
 */

export const DRAFT_EXPIRY_DAYS = 30;

export interface PorseshState {
  assessments: Record<string, Assessment>;
  activeId: string | null;
  view: View;
  /** نمای کاربری: خانوار یا حرفه‌ای */
  mode: "household" | "pro";
  wizardStep: number;
  hydrated: boolean;

  setView: (v: View) => void;
  setMode: (m: "household" | "pro") => void;
  setActive: (id: string | null) => void;
  setWizardStep: (s: number) => void;

  createAssessment: (init?: Partial<Assessment>) => string;
  updateHousehold: (id: string, patch: Partial<Assessment["household"]>) => void;
  updateRequest: (id: string, types: string[], notes?: string) => void;
  setStatus: (id: string, status: Assessment["status"]) => void;

  addMember: (id: string, m: Partial<Member>) => string;
  updateMember: (id: string, memberId: string, patch: Partial<Member>) => void;
  removeMember: (id: string, memberId: string) => void;

  setAnswer: (id: string, key: string, value: AnswerValue, actor?: AuditEvent["actor"]) => void;
  setAnswersBulk: (id: string, entries: Record<string, AnswerValue>) => void;

  addIncomeSource: (id: string, s: Omit<IncomeSource, "id">) => void;
  updateIncomeSource: (id: string, sid: string, patch: Partial<IncomeSource>) => void;
  removeIncomeSource: (id: string, sid: string) => void;

  addFlag: (id: string, f: { code: FlagCode; detail?: string; source?: string; suggested?: boolean }) => void;
  updateFlag: (id: string, fid: string, patch: Partial<RedFlag>) => void;

  addIssue: (id: string, i: Omit<DataQualityIssue, "id" | "createdAt" | "status">) => void;
  resolveIssue: (id: string, iid: string, resolution: string) => void;
  syncAutoIssues: (id: string) => void;

  addReferral: (id: string, r: Omit<Referral, "id" | "createdAt" | "status">) => void;
  updateReferral: (id: string, rid: string, patch: Partial<Referral>) => void;

  addReview: (id: string, r: Omit<ProfessionalReview, "id" | "at">) => void;

  /** اعلام تغییر شرایط توسط خانوار */
  addChangeStatement: (id: string, text: string) => void;

  /** اصلاح مستند داده توسط مددکار — محاسبه مجدد و ثبت نسخه */
  correctData: (id: string, by: string, c: { answerKey: string; newValue: AnswerValue; reason: string; evidence?: string }) => void;

  addAudit: (id: string, e: Omit<AuditEvent, "id" | "at">) => void;

  exportAll: () => string;
  exportOne: (id: string) => string;
  importJson: (json: string) => { ok: boolean; message: string };
  removeAssessment: (id: string) => void;
  /** بارگذاری بانک داده نمونه (۸ پرونده ساختگی) — force=true پرونده‌های نمونه قبلی را جایگزین می‌کند */
  seedDemoBank: (force?: boolean) => void;
  /** حذف همه پرونده‌های نمونه */
  clearDemoBank: () => void;
  markHydrated: () => void;
}

export type View = "home" | "wizard" | "assessments" | "professional" | "rules" | "migration";

const AUDIT_ACTIONS: Record<string, string> = {};

function withAudit(a: Assessment, e: Omit<AuditEvent, "id" | "at">): Assessment {
  const ev: AuditEvent = { ...e, id: uid("aud"), at: nowIso() };
  return { ...a, audit: [...a.audit, ev].slice(-500), updatedAt: ev.at };
}

export const usePorsesh = create<PorseshState>()(
  persist(
    (set, get) => ({
      assessments: {},
      activeId: null,
      view: "home",
      mode: "household",
      wizardStep: 1,
      hydrated: false,

      setView: (v) => set({ view: v }),
      setMode: (m) => set({ mode: m }),
      setActive: (id) => set({ activeId: id, wizardStep: 1 }),
      setWizardStep: (s) => set({ wizardStep: s }),

      createAssessment: (init) => {
        const id = uid("hh");
        const now = nowIso();
        const a: Assessment = {
          id,
          createdAt: now,
          updatedAt: now,
          ruleSetVersion: RULE_SET.fullId,
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
            { id: uid("aud"), at: now, actor: "سیستم", role: "system", action: "ایجاد پیش‌نویس ارزیابی", detail: `نسخه قواعد: ${RULE_SET.fullId}` },
          ],
          changeStatements: [],
          ...init,
        };
        set((st) => ({ assessments: { ...st.assessments, [id]: a }, activeId: id, view: "wizard", wizardStep: 1 }));
        return id;
      },

      updateHousehold: (id, patch) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const updated = withAudit({ ...a, household: { ...a.household, ...patch } }, {
            actor: "کاربر", role: "assistant", action: "به‌روزرسانی اطلاعات پایه", detail: Object.keys(patch).join("، "),
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      updateRequest: (id, types, notes) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const updated = withAudit({ ...a, requestTypes: types, requestNotes: notes }, {
            actor: "پاسخ‌گو", role: "household", action: "ثبت/به‌روزرسانی نوع درخواست",
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      setStatus: (id, status) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const updated = withAudit({ ...a, status }, {
            actor: "کاربر", role: "assistant", action: `تغییر وضعیت پرونده به «${status}»`,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addMember: (id, m) => {
        const mid = uid("m");
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const member: Member = {
            id: mid,
            firstName: m.firstName || "عضو جدید",
            relation: m.relation || "سایر",
            ...m,
          };
          const updated = withAudit({ ...a, members: [...a.members, member] }, {
            actor: "کاربر", role: "assistant", action: "افزودن عضو خانوار", detail: member.firstName,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        });
        return mid;
      },

      updateMember: (id, memberId, patch) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const members = a.members.map((m) => (m.id === memberId ? { ...m, ...patch } : m));
          const updated = withAudit({ ...a, members }, {
            actor: "کاربر", role: "assistant", action: "ویرایش عضو", detail: members.find((m) => m.id === memberId)?.firstName,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      removeMember: (id, memberId) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const members = a.members.filter((m) => m.id !== memberId);
          const answers = Object.fromEntries(Object.entries(a.answers).filter(([k]) => !k.endsWith(`#${memberId}`)));
          const updated = withAudit({ ...a, members, answers }, {
            actor: "کاربر", role: "assistant", action: "حذف عضو و پاسخ‌های مرتبط",
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      setAnswer: (id, key, value) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const answers: Answers = { ...a.answers, [key]: value };
          const updated = { ...a, answers, updatedAt: nowIso() };
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      setAnswersBulk: (id, entries) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const answers: Answers = { ...a.answers, ...entries };
          const updated = { ...a, answers, updatedAt: nowIso() };
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addIncomeSource: (id, s) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const src: IncomeSource = { ...s, id: uid("inc") };
          const updated = withAudit({ ...a, incomeSources: [...a.incomeSources, src] }, {
            actor: "پاسخ‌گو", role: "household", action: "افزودن منبع درآمد", detail: src.kind,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      updateIncomeSource: (id, sid, patch) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const incomeSources = a.incomeSources.map((s) => (s.id === sid ? { ...s, ...patch } : s));
          const updated = withAudit({ ...a, incomeSources }, { actor: "کاربر", role: "assistant", action: "ویرایش منبع درآمد" });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      removeIncomeSource: (id, sid) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const updated = withAudit({ ...a, incomeSources: a.incomeSources.filter((s) => s.id !== sid) }, {
            actor: "کاربر", role: "assistant", action: "حذف منبع درآمد",
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addFlag: (id, f) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const def = FLAG_DEFS[f.code];
          const flag: RedFlag = {
            id: uid("flg"),
            code: f.code,
            title: def.title,
            detail: f.detail,
            recordedAt: nowIso(),
            source: f.source || "ثبت دستی",
            confidentiality: def.strict ? "strict" : "restricted",
            status: "open",
            suggested: f.suggested,
          };
          const updated = withAudit({ ...a, flags: [...a.flags, flag] }, {
            actor: "کاربر", role: "assistant", action: `ثبت نشانه خطر ${f.code}`, detail: def.title,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      updateFlag: (id, fid, patch) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const flags = a.flags.map((f) => (f.id === fid ? { ...f, ...patch } : f));
          const updated = withAudit({ ...a, flags }, { actor: "کاربر", role: "caseworker", action: "به‌روزرسانی نشانه خطر" });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addIssue: (id, i) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const issue: DataQualityIssue = { ...i, id: uid("iss"), createdAt: nowIso(), status: "open" };
          const updated = { ...a, qualityIssues: [...a.qualityIssues, issue], updatedAt: nowIso() };
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      resolveIssue: (id, iid, resolution) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const qualityIssues = a.qualityIssues.map((i) =>
            i.id === iid ? { ...i, status: "resolved" as const, resolution, resolvedAt: nowIso() } : i,
          );
          const updated = withAudit({ ...a, qualityIssues }, { actor: "کاربر", role: "assistant", action: "حل مسئله کیفیت داده", detail: resolution });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      syncAutoIssues: (id) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          // مسائل خودکار قبلی (بدون resolution دستی) پاک و بازتولید می‌شوند
          return st;
        }),

      addReferral: (id, r) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const ref: Referral = { ...r, id: uid("ref"), createdAt: nowIso(), status: "sent", sentAt: nowIso() };
          const updated = withAudit({ ...a, referrals: [...a.referrals, ref] }, {
            actor: "مددکار", role: "caseworker", action: "ثبت ارجاع", detail: `${r.path} → ${r.destination}`,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      updateReferral: (id, rid, patch) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const referrals = a.referrals.map((r) => (r.id === rid ? { ...r, ...patch } : r));
          const updated = withAudit({ ...a, referrals }, {
            actor: "مددکار", role: "caseworker", action: "به‌روزرسانی ارجاع", detail: patch.status,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addReview: (id, r) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const rev: ProfessionalReview = { ...r, id: uid("rev"), at: nowIso() };
          const updated = withAudit({ ...a, reviews: [...a.reviews, rev] }, {
            actor: r.by || "مددکار", role: "caseworker", action: "ثبت بررسی حرفه‌ای", detail: r.decision,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addChangeStatement: (id, text) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const statements = [...(a.changeStatements ?? []), { at: nowIso(), text }];
          const updated = withAudit({ ...a, changeStatements: statements }, {
            actor: "پاسخ‌گو", role: "household", action: "اعلام تغییر شرایط خانوار", detail: text,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      correctData: (id, by, c) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          const oldValue = a.answers[c.answerKey];
          const correction: DataCorrection = {
            id: uid("cor"), at: nowIso(), by, answerKey: c.answerKey,
            oldValue: oldValue ?? null, newValue: c.newValue, reason: c.reason, evidence: c.evidence,
          };
          const answers: Answers = { ...a.answers, [c.answerKey]: c.newValue };
          const updated = withAudit({ ...a, answers, corrections: [...a.corrections, correction] }, {
            actor: by, role: "caseworker", action: "اصلاح مستند داده", detail: `${c.answerKey}: ${String(oldValue ?? "—")} → ${String(c.newValue)} (${c.reason})`,
          });
          return { assessments: { ...st.assessments, [id]: updated } };
        }),

      addAudit: (id, e) =>
        set((st) => {
          const a = st.assessments[id];
          if (!a) return st;
          return { assessments: { ...st.assessments, [id]: withAudit(a, e) } };
        }),

      exportAll: () => JSON.stringify({ version: 1, exportedAt: nowIso(), assessments: Object.values(get().assessments) }, null, 2),
      exportOne: (id) => JSON.stringify({ version: 1, exportedAt: nowIso(), assessments: [get().assessments[id]].filter(Boolean) }, null, 2),

      importJson: (json) => {
        try {
          const data = JSON.parse(json);
          if (!data || !Array.isArray(data.assessments)) return { ok: false, message: "ساختار فایل معتبر نیست." };
          const incoming: Record<string, Assessment> = {};
          for (const a of data.assessments) {
            if (!a || typeof a.id !== "string") continue;
            incoming[a.id] = {
              ...a,
              flags: a.flags ?? [], qualityIssues: a.qualityIssues ?? [], referrals: a.referrals ?? [],
              reviews: a.reviews ?? [], corrections: a.corrections ?? [], audit: a.audit ?? [],
              members: a.members ?? [], answers: a.answers ?? {}, incomeSources: a.incomeSources ?? [],
            };
          }
          set((st) => ({ assessments: { ...incoming, ...st.assessments } }));
          return { ok: true, message: `${Object.keys(incoming).length} ارزیابی وارد شد.` };
        } catch {
          return { ok: false, message: "خواندن فایل ناموفق بود." };
        }
      },

      removeAssessment: (id) =>
        set((st) => {
          const next = { ...st.assessments };
          delete next[id];
          return { assessments: next, activeId: st.activeId === id ? null : st.activeId };
        }),

      seedDemoBank: (force) =>
        set((st) => {
          const demos = buildDemoBank();
          if (force) {
            // حذف پرونده‌های نمونه قبلی و جایگزینی با نسخه تازه
            const kept = Object.fromEntries(
              Object.entries(st.assessments).filter(([, a]) => !a.demo),
            );
            const next: Record<string, Assessment> = { ...kept };
            for (const d of demos) next[d.id] = d;
            const activeIsDemo = st.activeId ? !!st.assessments[st.activeId]?.demo : false;
            return {
              assessments: next,
              activeId: activeIsDemo ? demos[0].id : st.activeId,
              view: st.view === "wizard" && activeIsDemo ? "assessments" : st.view,
            };
          }
          const next: Record<string, Assessment> = { ...st.assessments };
          for (const d of demos) next[d.id] = d;
          return { assessments: next };
        }),

      clearDemoBank: () =>
        set((st) => {
          const next = Object.fromEntries(
            Object.entries(st.assessments).filter(([, a]) => !a.demo),
          );
          const activeIsDemo = st.activeId ? !!st.assessments[st.activeId]?.demo : false;
          return {
            assessments: next,
            activeId: activeIsDemo ? null : st.activeId,
            view: activeIsDemo && (st.view === "wizard" || st.view === "professional") ? "assessments" : st.view,
          };
        }),

      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "porseshnameh-db",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.markHydrated();
      },
    },
  ),
);

/** وضعیت پیش‌نویس منقضی؟ */
export function isDraftExpired(a: Assessment): boolean {
  const updated = new Date(a.updatedAt).getTime();
  return Date.now() - updated > DRAFT_EXPIRY_DAYS * 24 * 3600 * 1000;
}

export { AUDIT_ACTIONS };
