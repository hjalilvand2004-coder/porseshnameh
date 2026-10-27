"use client";

import { useRef, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AnswerValue, Answers, EvidenceDoc, Member } from "@/lib/mpi/types";
import type { EvidenceKind, Option, Question } from "@/lib/mpi/questions";
import { EVIDENCE_KINDS } from "@/lib/mpi/questions";
import { faDateTime, faNum } from "@/lib/mpi/format";
import { toast } from "@/hooks/use-toast";
import {
  CheckCircle2, CircleDashed, HelpCircle, Lock, FileBadge2, Paperclip, Plus, Trash2, Users2, ShieldCheck,
} from "lucide-react";

/**
 * رندرکننده فیلدهای پرسش — دسترس‌پذیر (برچسب، راهنما، کیبورد)، همراه متن و آیکون.
 *
 * v0.9.0 — سه قابلیت جدید:
 *  ۱) ملاک استعلام: پرسش‌هایی که سرویس متولی با کد ملی پاسخ می‌دهد (A5 ← بیمه، B1 ← آموزش‌وپرورش)
 *     پس از استعلام، به‌صورت خودکار پر و قفل می‌شوند — جایگاه و مقدار حفظ می‌شود و ثبت دستی لازم نیست.
 *  ۲) فالوآپ شرطی عضو‌محور: پس از پاسخ مثبت/شرطی، بلافاصله بخش «کدام اعضا؟» + توضیح تکمیلی باز می‌شود
 *     تا مصداق به عضو مستند شود (مثلاً بیماری مزمن ← کدام عضو؟).
 *  ۳) ثبت مدرک مثبت: هر فالوآپِ نیازمند شاهد، کنترل ثبت مدرک (نوع، عنوان، مرجع، فایل) دارد.
 */

/** سقف ذخیره محتوای فایل در پرونده (فراتر از آن فقط مشخصات ثبت می‌شود) */
const MAX_INLINE_BYTES = 400 * 1024;

interface FieldProps {
  q: Question;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
  idPrefix?: string;
  /** اعضای خانوار — برای فالوآپ «کدام اعضا؟» */
  members?: Member[];
  /** شناسه پرونده — برای ثبت مدارک مثبت و کلیدهای فالوآپ */
  assessmentId?: string;
  /** تغییر کلیدهای جانبی فالوآپ (انتساب اعضا / توضیح تکمیلی) */
  onKeyChange?: (key: string, v: AnswerValue) => void;
  /** ملاک استعلام — سرویس متولی پاسخ داده و فیلد قفل است */
  serviceLock?: { org: string; at: string };
}

const SPECIAL_STYLE = "border-amber-300 bg-amber-50";

/** مرجع پایدار برای سلکتورهای zustand — ساخت آرایه جدید در هر فراخوانی مجاز نیست */
const NO_DOCS: EvidenceDoc[] = [];

/** آیا فالوآپ این پرسش با پاسخ فعلی فعال می‌شود؟ */
export function followUpActive(q: Question, value: AnswerValue): boolean {
  const fu = q.followUp;
  if (!fu) return false;
  if (q.type === "boolean") return value === true;
  if (q.type === "multi") {
    const list = Array.isArray(value) ? value : [];
    return list.length > 0 && !list.every((v) => v === "none");
  }
  if (q.type === "single") return typeof value === "string" && fu.trigger.includes(value);
  return false;
}

export function QuestionField({ q, value, onChange, idPrefix, members, assessmentId, onKeyChange, serviceLock }: FieldProps) {
  const fid = `${idPrefix ?? "q"}-${q.id}`;
  const isSpecial = typeof value === "string" && value.startsWith("__");
  const locked = !!serviceLock;
  const showFollowUp = followUpActive(q, value);

  return (
    <fieldset className={cn("rounded-xl border p-4 transition-colors", isSpecial ? SPECIAL_STYLE : "bg-card")} id={fid}>
      <legend className="px-1 text-sm font-semibold flex items-start gap-1.5 max-w-full">
        <HelpCircle className="size-4 mt-0.5 shrink-0 text-teal-strong" aria-hidden />
        <span>{q.title}</span>
        {q.service && (
          <span className="inline-flex items-center gap-1 rounded-full border border-teal-strong/30 bg-teal-soft/60 px-2 py-0.5 text-[10px] text-teal-strong font-normal whitespace-nowrap" title={q.service.label}>
            <ShieldCheck className="size-3" aria-hidden /> استعلام خودکار — {q.service.org}
          </span>
        )}
      </legend>
      {q.help && <p className="text-xs text-muted-foreground leading-5 mb-3">{q.help}</p>}

      {/* ملاک استعلام — مقدار از سرویس متولی، غیرقابل ویرایش */}
      {locked ? (
        <div className="rounded-lg border border-teal-strong/30 bg-teal-soft/40 p-3.5 space-y-1.5" aria-readonly>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <Badge className="bg-teal-strong text-white gap-1"><Lock className="size-3" aria-hidden /> ملاک استعلام — غیرقابل ویرایش</Badge>
            <span className="text-muted-foreground">{serviceLock!.org} • {faDateTime(serviceLock!.at)}</span>
          </div>
          <p className="text-sm font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="size-4 text-teal-strong" aria-hidden /> {answerLabel(q, value)}
          </p>
          <p className="text-[11px] text-muted-foreground leading-4">
            این مقدار با کد ملی از مرجع متولی واکشی و به‌صورت خودکار ثبت شده است — اصلاح فقط از مسیر درخواست اصلاح داده به مرجع ثبتی.
          </p>
        </div>
      ) : (
        <>
          {q.type === "single" && <RadioCards q={q} value={value} onChange={onChange} fid={fid} />}

          {q.type === "multi" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {(q.options ?? []).map((o) => {
                const list = Array.isArray(value) ? value : [];
                const checked = list.includes(o.value);
                return (
                  <label
                    key={o.value}
                    className={cn(
                      "flex items-start gap-2.5 rounded-lg border p-3 text-sm cursor-pointer transition-colors hover:border-ring/50",
                      checked ? "border-teal-strong bg-teal-soft" : "bg-background",
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(c) => {
                        if (o.value === "none" && c) {
                          onChange(["none"]);
                          return;
                        }
                        let next = list.filter((v) => v !== "none");
                        if (c) next = [...next, o.value];
                        else next = next.filter((v) => v !== o.value);
                        onChange(next);
                      }}
                      className="mt-0.5"
                      aria-label={o.label}
                    />
                    <span className="leading-5">{o.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {q.type === "boolean" && (
            <div className="flex gap-2 flex-wrap">
              {[true, false].map((b) => (
                <button
                  key={String(b)}
                  type="button"
                  onClick={() => onChange(b)}
                  aria-pressed={value === b}
                  className={cn(
                    "rounded-lg border px-4 py-2.5 text-sm min-h-11 flex items-center gap-2 transition-colors",
                    value === b ? "border-teal-strong bg-teal-soft font-semibold" : "bg-background hover:border-ring/50",
                  )}
                >
                  {value === b ? <CheckCircle2 className="size-4 text-teal-strong" aria-hidden /> : <CircleDashed className="size-4 text-muted-foreground" aria-hidden />}
                  {b ? "بله" : "خیر"}
                </button>
              ))}
            </div>
          )}

          {q.type === "number" && (
            <div className="flex items-center gap-2 max-w-xs">
              <Input
                type="number"
                inputMode="numeric"
                dir="ltr"
                value={value === null || value === undefined || value === "" ? "" : String(value)}
                onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
                min={q.min}
                max={q.max}
                aria-describedby={q.unit ? `${fid}-unit` : undefined}
                className="text-start"
              />
              {q.unit && (
                <span id={`${fid}-unit`} className="text-xs text-muted-foreground whitespace-nowrap">
                  {q.unit}
                </span>
              )}
            </div>
          )}

          {q.type === "text" && (
            <Input value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={q.placeholder} className="max-w-xl" />
          )}

          {q.type === "textarea" && (
            <Textarea value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} placeholder={q.placeholder} rows={3} className="max-w-2xl" />
          )}
        </>
      )}

      {/* فالوآپ شرطی — مستندسازی عضو‌محور و مدرک مثبت */}
      {showFollowUp && q.followUp && (
        <FollowUpBox
          q={q}
          idPrefix={idPrefix}
          members={members ?? []}
          assessmentId={assessmentId}
          onKeyChange={onKeyChange}
        />
      )}
    </fieldset>
  );
}

/* ---------------- فالوآپ شرطی: کدام اعضا؟ + توضیح + مدرک مثبت ---------------- */

function FollowUpBox({ q, idPrefix, members, assessmentId, onKeyChange }: {
  q: Question;
  idPrefix?: string;
  members: Member[];
  assessmentId?: string;
  onKeyChange?: (key: string, v: AnswerValue) => void;
}) {
  const fu = q.followUp!;
  const isMemberLevel = !!idPrefix;
  const membersKey = `${q.id}__members`;
  const detailKey = isMemberLevel ? `${q.id}__detail#${idPrefix}` : `${q.id}__detail`;
  const docForKey = isMemberLevel ? `${q.id}#${idPrefix}` : q.id;

  const selected = usePorsesh((s) => assessmentId ? s.assessments[assessmentId]?.answers[membersKey] : undefined);
  const detailVal = usePorsesh((s) => assessmentId ? s.assessments[assessmentId]?.answers[detailKey] : undefined);
  const documents = usePorsesh((s) => assessmentId ? (s.assessments[assessmentId]?.documents ?? NO_DOCS) : NO_DOCS);
  const updateMember = usePorsesh((s) => s.updateMember);

  const picked = Array.isArray(selected) ? selected : [];
  const docs = documents.filter((d) => d.forKey === docForKey);

  const setMembers = (next: string[]) => {
    onKeyChange?.(membersKey, next);
    /* همگام‌سازی نقش مراقبت — برای پرسش بار مراقبت (E2) */
    if (q.id === "E2_support" && assessmentId) {
      for (const m of members) {
        if (next.includes(m.id) && !m.needsCare) updateMember(assessmentId, m.id, { needsCare: true });
      }
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-teal-strong/25 bg-teal-soft/30 p-3.5 space-y-3" data-followup={q.id}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="grid place-items-center size-7 rounded-lg bg-teal-strong text-white shrink-0"><Users2 className="size-4" aria-hidden /></span>
        <h5 className="text-sm font-bold text-teal-strong">{fu.title}</h5>
        <BadgeOutline>فالوآپ خودکار پرسش</BadgeOutline>
      </div>
      {fu.help && <p className="text-xs text-muted-foreground leading-5">{fu.help}</p>}

      {fu.members && (
        <div className="space-y-2">
          <p className="text-xs font-semibold">کدام اعضا؟ <span className="text-muted-foreground font-normal">(انتخاب همه موارد مرتبط)</span></p>
          {members.length === 0 ? (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">هنوز عضوی ثبت نشده است — در گام «اطلاعات پایه» اعضا را ثبت کنید.</p>
          ) : (
            <div className="grid gap-1.5 sm:grid-cols-2">
              {members.map((m) => {
                const on = picked.includes(m.id);
                return (
                  <label key={m.id} className={cn("flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors", on ? "border-teal-strong bg-background" : "bg-background hover:border-ring/50")}>
                    <Checkbox
                      checked={on}
                      onCheckedChange={(c) => setMembers(c ? [...picked, m.id] : picked.filter((x) => x !== m.id))}
                      aria-label={`${m.firstName} ${m.lastName ?? ""} — ${m.relation}`}
                    />
                    <span className="truncate">{m.firstName} {m.lastName ?? ""}</span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ms-auto">{m.relation}{typeof m.age === "number" ? ` • ${faNum(m.age)} ساله` : ""}</span>
                  </label>
                );
              })}
            </div>
          )}
          {picked.length > 0 && (
            <p className="text-[11px] text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="size-3.5" aria-hidden /> مستند شد: {faNum(picked.length)} عضو منوط به این پاسخ ثبت شد
            </p>
          )}
        </div>
      )}

      {fu.detail && (
        <div className="space-y-1.5">
          <Label className="text-xs">{fu.detail.label}</Label>
          <Textarea
            value={typeof detailVal === "string" ? detailVal : ""}
            onChange={(e) => onKeyChange?.(detailKey, e.target.value)}
            placeholder={fu.detail.placeholder}
            rows={2}
            className="max-w-2xl bg-background"
          />
        </div>
      )}

      {fu.evidence && assessmentId && (
        <EvidenceRecorder forKey={docForKey} suggested={fu.evidence.suggested ?? "other"} label={fu.evidence.label ?? "ثبت مدرک مثبت این پاسخ"} docs={docs} assessmentId={assessmentId} />
      )}
      {fu.evidence && !assessmentId && (
        <p className="text-[11px] text-muted-foreground">ثبت مدرک در این نما در دسترس نیست.</p>
      )}
    </div>
  );
}

function BadgeOutline({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground whitespace-nowrap">{children}</span>;
}

/* ---------------- ثبت مدرک مثبت ---------------- */

const KIND_ICONS: Record<EvidenceKind, React.ElementType> = {
  medical: FileBadge2,
  education: FileBadge2,
  insurance: FileBadge2,
  legal: FileBadge2,
  administrative: FileBadge2,
  photo: Paperclip,
  other: Paperclip,
};

function EvidenceRecorder({ forKey, suggested, label, docs, assessmentId }: {
  forKey: string;
  suggested: EvidenceKind;
  label: string;
  docs: EvidenceDoc[];
  assessmentId: string;
}) {
  const addDocument = usePorsesh((s) => s.addDocument);
  const removeDocument = usePorsesh((s) => s.removeDocument);
  const [kind, setKind] = useState<EvidenceKind>(suggested);
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<{ name: string; type: string; size: number; dataUrl?: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = (f: File | null) => {
    if (!f) { setFile(null); return; }
    const meta = { name: f.name, type: f.type || "application/octet-stream", size: f.size };
    if (f.size <= MAX_INLINE_BYTES) {
      const reader = new FileReader();
      reader.onload = () => setFile({ ...meta, dataUrl: String(reader.result) });
      reader.onerror = () => setFile(meta);
      reader.readAsDataURL(f);
    } else {
      setFile(meta);
      toast({ title: "فایل بزرگ است", description: "محتوای فایل ذخیره نمی‌شود؛ فقط مشخصات مدرک ثبت می‌گردد (سقف نگهداری درون‌پرونده‌ای: ۴۰۰ کیلوبایت)." });
    }
  };

  const submit = () => {
    if (!title.trim() && !file) {
      toast({ title: "مشخصات مدرک ناقص است", description: "عنوان مدرک را بنویسید یا فایل آن را انتخاب کنید.", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      addDocument(assessmentId, {
        forKey,
        title: title.trim() || file!.name,
        kind,
        reference: reference.trim() || undefined,
        fileName: file?.name,
        fileType: file?.type,
        fileSize: file?.size,
        dataUrl: file?.dataUrl,
        note: label,
      });
      setTitle(""); setReference(""); setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      toast({ title: "مدرک مثبت ثبت شد", description: "مستندسازی شاهد روی همین پرسش در پرونده درج شد." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold flex items-center gap-1.5"><Paperclip className="size-3.5" aria-hidden /> {label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-[11px]">نوع مدرک</Label>
          <Select value={kind} onValueChange={(v) => setKind(v as EvidenceKind)}>
            <SelectTrigger className="h-9 text-xs bg-background"><SelectValue /></SelectTrigger>
            <SelectContent>{EVIDENCE_KINDS.map((k) => <SelectItem key={k.value} value={k.value}>{k.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-[11px]">عنوان مدرک</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً گواهی پزشک معالج" className="h-9 bg-background text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-[11px]">شماره/مرجع مدرک (اختیاری)</Label>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="مثلاً شماره نامه یا کد پیگیری" className="h-9 bg-background text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-[11px]">فایل مدرک (تصویر یا PDF — اختیاری)</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            className="h-9 w-full text-[11px] file:me-2 file:rounded-md file:border-0 file:bg-teal-soft file:px-2.5 file:py-1.5 file:text-xs file:text-teal-strong bg-background rounded-md border px-2 cursor-pointer"
            aria-label="انتخاب فایل مدرک"
          />
          {file && <p className="text-[10px] text-muted-foreground truncate">{file.name} • {faNum(Math.round(file.size / 1024))} کیلوبایت{!file.dataUrl ? " • فقط مشخصات ثبت می‌شود" : ""}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button size="sm" variant="outline" onClick={submit} disabled={busy} className="border-teal-strong/40 text-teal-strong hover:bg-teal-soft gap-1.5">
          <Plus className="size-3.5" aria-hidden /> ثبت مدرک مثبت
        </Button>
      </div>

      {docs.length > 0 && (
        <ul className="space-y-1.5">
          {docs.map((d) => {
            const Icon = KIND_ICONS[d.kind] ?? Paperclip;
            return (
              <li key={d.id} className="flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-xs">
                <Icon className="size-3.5 text-teal-strong shrink-0" aria-hidden />
                <span className="font-medium truncate">{d.title}</span>
                {d.reference && <span className="text-muted-foreground truncate hidden sm:inline">— {d.reference}</span>}
                {d.fileName && (
                  d.dataUrl ? (
                    <a href={d.dataUrl} target="_blank" rel="noreferrer" className="text-teal-strong underline underline-offset-2 whitespace-nowrap ms-auto">{d.fileName}</a>
                  ) : (
                    <span className="text-muted-foreground whitespace-nowrap ms-auto">{d.fileName}</span>
                  )
                )}
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{faDateTime(d.recordedAt)}</span>
                <button
                  type="button"
                  onClick={() => { removeDocument(assessmentId, d.id); toast({ title: "مدرک حذف شد" }); }}
                  className="ms-auto text-destructive/70 hover:text-destructive shrink-0"
                  aria-label={`حذف مدرک ${d.title}`}
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function RadioCards({ q, value, onChange, fid }: { q: Question; value: AnswerValue; onChange: (v: AnswerValue) => void; fid: string }) {
  return (
    <div role="radiogroup" aria-label={q.title} className="grid gap-2">
      {(q.options ?? []).map((o: Option, i) => {
        const selected = value === o.value;
        const isSpecialOpt = !!o.special;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const opts = Array.from(document.querySelectorAll<HTMLButtonElement>(`#${fid} [role="radio"]`));
                const idx = opts.indexOf(e.currentTarget);
                const next = e.key === "ArrowDown" ? (idx + 1) % opts.length : (idx - 1 + opts.length) % opts.length;
                opts[next]?.focus();
                opts[next]?.click();
              }
            }}
            className={cn(
              "text-start rounded-lg border px-3.5 py-2.5 text-sm transition-colors min-h-11 flex items-center gap-2.5",
              selected ? "border-teal-strong bg-teal-soft font-medium" : "bg-background hover:border-ring/50",
              isSpecialOpt && !selected && "text-amber-800 border-amber-200",
            )}
          >
            <span
              aria-hidden
              className={cn("size-4 rounded-full border-2 shrink-0 grid place-items-center", selected ? "border-teal-strong" : "border-muted-foreground/50")}
            >
              {selected && <span className="size-2 rounded-full bg-teal-strong" />}
            </span>
            <span>
              {o.label}
              {o.desc && <span className="block text-xs text-muted-foreground font-normal mt-0.5">{o.desc}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** نمایش مقدار پاسخ به‌صورت خوانا */
export function answerLabel(q: Question | undefined, v: AnswerValue): string {
  if (v === undefined || v === null || v === "") return "—";
  if (v === true) return "بله";
  if (v === false) return "خیر";
  if (Array.isArray(v)) {
    const labels = v.map((x) => q?.options?.find((o) => o.value === x)?.label ?? String(x));
    return labels.length ? labels.join("، ") : "—";
  }
  const opt = q?.options?.find((o) => o.value === v);
  if (opt) return opt.label;
  const s = String(v);
  return s.startsWith("__") ? "(پاسخ خاص)" : s;
}

/** آیا پرسش پاسخ داده شده است */
export function isAnswered(q: Question, answers: Answers, memberId?: string): boolean {
  const v = memberId ? answers[`${q.id}#${memberId}`] : answers[q.id];
  if (v === undefined || v === null || v === "") return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
}
