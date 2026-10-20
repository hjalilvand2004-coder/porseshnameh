"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { AnswerValue, Answers } from "@/lib/mpi/types";
import type { Option, Question } from "@/lib/mpi/questions";
import { CheckCircle2, CircleDashed, HelpCircle } from "lucide-react";

/**
 * رندرکننده فیلدهای پرسش — دسترس‌پذیر (برچسب، راهنما، کیبورد)، همراه متن و آیکون
 */

interface FieldProps {
  q: Question;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
  idPrefix?: string;
}

const SPECIAL_STYLE = "border-amber-300 bg-amber-50";

export function QuestionField({ q, value, onChange, idPrefix }: FieldProps) {
  const fid = `${idPrefix ?? "q"}-${q.id}`;
  const isSpecial = typeof value === "string" && value.startsWith("__");

  return (
    <fieldset className={cn("rounded-xl border p-4 transition-colors", isSpecial ? SPECIAL_STYLE : "bg-card")} id={fid}>
      <legend className="px-1 text-sm font-semibold flex items-start gap-1.5 max-w-full">
        <HelpCircle className="size-4 mt-0.5 shrink-0 text-teal-strong" aria-hidden />
        <span>{q.title}</span>
      </legend>
      {q.help && <p className="text-xs text-muted-foreground leading-5 mb-3">{q.help}</p>}

      {q.type === "single" && (
        <RadioCards q={q} value={value} onChange={onChange} fid={fid} />
      )}

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
    </fieldset>
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
