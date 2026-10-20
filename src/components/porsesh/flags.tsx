"use client";

import { useMemo, useState } from "react";
import { usePorsesh } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FLAG_DEFS } from "@/lib/mpi/rules";
import type { Assessment, FlagCode } from "@/lib/mpi/types";
import { faDateTime } from "@/lib/mpi/format";
import { Siren, TriangleAlert, CircleCheck, CircleX, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * ثبت نشانه فوریت — همیشه در دسترس، مستقل از تکمیل پرسشنامه
 * پرچم قرمز امتیاز افزایشی ندارد؛ فقط مسیر رسیدگی فعال می‌کند.
 */

const STATUS_LABEL: Record<string, string> = {
  open: "باز", reviewing: "در حال بررسی", confirmed: "تأیید تخصصی", resolved: "برطرف", dismissed: "منتفی",
};

const STATUS_STYLE: Record<string, string> = {
  open: "bg-red-50 text-red-800 border-red-200",
  reviewing: "bg-amber-50 text-amber-800 border-amber-200",
  confirmed: "bg-red-100 text-red-900 border-red-300 font-semibold",
  resolved: "bg-emerald-50 text-emerald-800 border-emerald-200",
  dismissed: "bg-muted text-muted-foreground border-border",
};

export function FlagsDialog({ assessment, trigger }: { assessment: Assessment; trigger?: React.ReactNode }) {
  const addFlag = usePorsesh((s) => s.addFlag);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<FlagCode>("R1");
  const [detail, setDetail] = useState("");
  const [source, setSource] = useState("");

  const save = () => {
    addFlag(assessment.id, { code, detail: detail || undefined, source: source || "ثبت دستی" });
    toast({ title: `نشانه خطر ${code} ثبت شد`, description: "برای رسیدگی فوری نیازی به تکمیل پرسشنامه نیست." });
    setDetail("");
    setSource("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="bg-destructive hover:bg-destructive/90 text-white gap-1.5 shadow-sm">
            <Siren className="size-4" aria-hidden /> ثبت فوریت
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert className="size-5 text-destructive" aria-hidden />
            ثبت نشانه فوریت / خطر
          </DialogTitle>
          <DialogDescription>
            ثبت نشانه خطر بدون انتظار برای تکمیل فرم ممکن است. پرچم قرمز امتیاز افزایشی ندارد و تأیید تخصصی و تصمیم مداخله، گردش کار انسانی جداگانه دارد.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="f-code">نوع نشانه</Label>
            <Select value={code} onValueChange={(v) => setCode(v as FlagCode)}>
              <SelectTrigger id="f-code"><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(FLAG_DEFS) as FlagCode[]).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c} — {FLAG_DEFS[c].title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground leading-5">{FLAG_DEFS[code].desc}</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-detail">توضیح</Label>
            <Input id="f-detail" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="شرح کوتاه وضعیت ..." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-source">منبع اطلاع</Label>
            <Input id="f-source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="مثلاً تماس تلفنی، بازدید میدانی ..." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>انصراف</Button>
          <Button variant="destructive" onClick={save}>ثبت نشانه خطر</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FlagsList({ assessment, editable = true }: { assessment: Assessment; editable?: boolean }) {
  const updateFlag = usePorsesh((s) => s.updateFlag);
  const canSeeAll = usePorsesh((s) => s.mode) === "pro";

  const flags = useMemo(
    () => assessment.flags.filter((f) => canSeeAll || f.confidentiality !== "strict"),
    [assessment.flags, canSeeAll],
  );

  return (
    <div className="space-y-2.5">
      {flags.length === 0 && (
        <p className="text-sm text-muted-foreground border rounded-xl p-4 bg-muted/40">نشانه خطر ثبت نشده است.</p>
      )}
      {flags.map((f) => (
        <div key={f.id} className="rounded-xl border border-red-200 bg-red-50/50 p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-destructive text-white">{f.code}</Badge>
            <span className="font-semibold text-sm">{f.title}</span>
            <span className={cn("text-xs rounded-md border px-2 py-0.5", STATUS_STYLE[f.status])}>{STATUS_LABEL[f.status]}</span>
            {f.confidentiality === "strict" && (
              <Badge variant="outline" className="gap-1"><EyeOff className="size-3" aria-hidden /> محرمانه</Badge>
            )}
            {f.suggested && <Badge variant="outline" className="text-amber-700 border-amber-300">پیشنهاد سیستم — نیازمند تأیید تخصصی</Badge>}
          </div>
          {f.detail && <p className="text-sm mt-1.5 leading-6">{f.detail}</p>}
          <p className="text-xs text-muted-foreground mt-1.5">
            زمان ثبت: {faDateTime(f.recordedAt)} • منبع: {f.source ?? "—"}
            {f.action && <> • اقدام: {f.action}</>}
            {f.closeReason && <> • دلیل خاتمه: {f.closeReason}</>}
          </p>
          {editable && f.status !== "resolved" && f.status !== "dismissed" && (
            <div className="flex gap-2 mt-2.5 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => updateFlag(assessment.id, f.id, { status: "reviewing" })}>شروع بررسی</Button>
              <Button size="sm" variant="outline" className="border-red-300 text-red-800" onClick={() => updateFlag(assessment.id, f.id, { status: "confirmed", responseAt: new Date().toISOString() })}>
                <CircleCheck className="size-3.5" aria-hidden /> تأیید تخصصی خطر
              </Button>
              <Button size="sm" variant="ghost" onClick={() => updateFlag(assessment.id, f.id, { status: "resolved", closeReason: "برطرف شد" })}>برطرف شد</Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => updateFlag(assessment.id, f.id, { status: "dismissed", closeReason: "پس از بررسی منتفی شد" })}>
                <CircleX className="size-3.5" aria-hidden /> منتفی
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
