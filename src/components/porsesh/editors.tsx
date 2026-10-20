"use client";

import { useState } from "react";
import { usePorsesh } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MEMBER_RELATIONS } from "@/lib/mpi/questions";
import type { Assessment, Member } from "@/lib/mpi/types";
import { faNum, faMoney } from "@/lib/mpi/format";
import { Plus, Pencil, Trash2, Users2, Coins, CircleAlert } from "lucide-react";
import { toast } from "@/hooks/use-toast";

/**
 * مدیریت اعضای خانوار و منابع درآمد — داده پرونده‌ای، بدون امتیاز مستقل
 */

const EMPLOYMENT: { value: NonNullable<Member["employmentStatus"]>; label: string }[] = [
  { value: "employed", label: "شاغل با درآمد" },
  { value: "irregular", label: "شاغل نامنظم/فصلی" },
  { value: "unemployed_seeking", label: "بیکار جویای کار" },
  { value: "unemployed_not_seeking", label: "بیکار غیرجویا" },
  { value: "unable", label: "ناتوان از کار" },
  { value: "student", label: "دانش‌آموز/دانشجو" },
  { value: "household_care", label: "مراقبت خانگی" },
  { value: "na", label: "نامشخص/غیرمرتبط" },
];

const EDU: { value: NonNullable<Member["educationStatus"]>; label: string }[] = [
  { value: "enrolled", label: "در حال تحصیل با حضور فعال" },
  { value: "interrupted", label: "دارای وقفه تحصیلی" },
  { value: "dropped", label: "ترک تحصیل" },
  { value: "never", label: "هرگز ثبت‌نام نشده" },
  { value: "finished", label: "اتمام تحصیل" },
  { value: "na", label: "غیرمرتبط (خارج از سن)" },
];

export function MemberManager({ assessment, editable = true }: { assessment: Assessment; editable?: boolean }) {
  const addMember = usePorsesh((s) => s.addMember);
  const updateMember = usePorsesh((s) => s.updateMember);
  const removeMember = usePorsesh((s) => s.removeMember);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Partial<Member>>({});

  const startNew = () => {
    setEditing(null);
    setForm({ firstName: "", relation: "فرزند", age: undefined, nationalIdStatus: "has" });
    setOpen(true);
  };
  const startEdit = (m: Member) => {
    setEditing(m);
    setForm({ ...m });
    setOpen(true);
  };
  const save = () => {
    if (!form.firstName?.trim()) {
      toast({ title: "نام عضو الزامی است", variant: "destructive" });
      return;
    }
    if (editing) updateMember(assessment.id, editing.id, form);
    else addMember(assessment.id, form);
    setOpen(false);
  };

  const set = (patch: Partial<Member>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-semibold flex items-center gap-2">
          <Users2 className="size-5 text-teal-strong" aria-hidden />
          اعضای خانوار ({faNum(assessment.members.length)} نفر)
        </h3>
        {editable && (
          <Button size="sm" onClick={startNew} className="ms-auto">
            <Plus className="size-4" aria-hidden /> افزودن عضو
          </Button>
        )}
      </div>

      {assessment.members.length === 0 && (
        <p className="text-sm text-muted-foreground border rounded-xl p-4 bg-muted/40 leading-6">
          هنوز عضوی ثبت نشده است. برای پاسخ به پرسش‌های سلامت، آموزش و معیشت حداقل یک عضو (سرپرست) اضافه کنید.
        </p>
      )}

      <div className="grid gap-2.5">
        {assessment.members.map((m) => (
          <div key={m.id} className="rounded-xl border bg-card p-3.5 flex flex-wrap items-center gap-2.5">
            <div className="font-medium">{m.firstName} {m.lastName ?? ""}</div>
            <Badge variant="secondary">{m.relation}</Badge>
            {typeof m.age === "number" && <Badge variant="outline">{faNum(m.age)} سال</Badge>}
            {m.isHead && <Badge className="bg-primary">سرپرست</Badge>}
            {m.isMainProvider && <Badge className="bg-teal-strong">تأمین‌کننده اصلی</Badge>}
            {m.isMainCaregiver && <Badge variant="outline" className="border-teal-strong text-teal-strong">مراقب اصلی</Badge>}
            {m.needsCare && <Badge variant="outline" className="border-amber-400 text-amber-700">نیازمند مراقبت</Badge>}
            {m.schoolAge && <Badge variant="outline">سن آموزش</Badge>}
            {m.nationalIdStatus === "missing" && (
              <Badge variant="outline" className="border-destructive/40 text-destructive gap-1">
                <CircleAlert className="size-3" aria-hidden /> فاقد مدرک — بدون رد درخواست
              </Badge>
            )}
            {editable && (
              <div className="ms-auto flex gap-1.5">
                <Button size="sm" variant="outline" onClick={() => startEdit(m)}>
                  <Pencil className="size-3.5" aria-hidden /> ویرایش
                </Button>
                <Button size="sm" variant="outline" onClick={() => removeMember(assessment.id, m.id)} aria-label={`حذف ${m.firstName}`}>
                  <Trash2 className="size-3.5" aria-hidden />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto thin-scroll sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "ویرایش عضو" : "افزودن عضو خانوار"}</DialogTitle>
            <DialogDescription>
              اطلاعات پرونده‌ای عضو است و مستقیماً وارد امتیاز محرومیت نمی‌شود؛ فقط پرسش‌های مرتبط را فعال می‌کند.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-first">نام *</Label>
                <Input id="m-first" value={form.firstName ?? ""} onChange={(e) => set({ firstName: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-last">نام خانوادگی</Label>
                <Input id="m-last" value={form.lastName ?? ""} onChange={(e) => set({ lastName: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-rel">نسبت با سرپرست</Label>
                <Select value={form.relation ?? "فرزند"} onValueChange={(v) => set({ relation: v })}>
                  <SelectTrigger id="m-rel"><SelectValue /></SelectTrigger>
                  <SelectContent>{MEMBER_RELATIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-age">سن (سال کامل)</Label>
                <Input id="m-age" type="number" min={0} max={120} value={form.age ?? ""} onChange={(e) => set({ age: e.target.value === "" ? undefined : Number(e.target.value), schoolAge: Number(e.target.value) >= 6 && Number(e.target.value) <= 18 })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-nid">کد ملی (اختیاری)</Label>
                <Input id="m-nid" dir="ltr" inputMode="numeric" value={form.nationalId ?? ""} onChange={(e) => set({ nationalId: e.target.value, nationalIdStatus: e.target.value ? "has" : form.nationalIdStatus })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-nids">وضعیت مدرک هویتی</Label>
                <Select value={form.nationalIdStatus ?? "has"} onValueChange={(v) => set({ nationalIdStatus: v as Member["nationalIdStatus"] })}>
                  <SelectTrigger id="m-nids"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="has">دارد</SelectItem>
                    <SelectItem value="missing">فاقد مدرک/نیازمند بررسی</SelectItem>
                    <SelectItem value="in_progress">در جریان دریافت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="m-emp">وضعیت اشتغال</Label>
              <Select value={form.employmentStatus ?? "na"} onValueChange={(v) => set({ employmentStatus: v as Member["employmentStatus"] })}>
                <SelectTrigger id="m-emp"><SelectValue /></SelectTrigger>
                <SelectContent>{EMPLOYMENT.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="m-edu">وضعیت تحصیل</Label>
              <Select value={form.educationStatus ?? "na"} onValueChange={(v) => set({ educationStatus: v as Member["educationStatus"] })}>
                <SelectTrigger id="m-edu"><SelectValue /></SelectTrigger>
                <SelectContent>{EDU.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5 rounded-lg border p-3.5 bg-muted/30">
              {([
                ["isHead", "سرپرست خانوار است"],
                ["isResponder", "فرد پاسخ‌گو/مسئول پیگیری است"],
                ["isMainProvider", "تأمین‌کننده اصلی است"],
                ["isMainCaregiver", "مراقب اصلی است"],
                ["needsCare", "نیازمند مراقبت مستمر است"],
              ] as const).map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox checked={!!form[k]} onCheckedChange={(c) => set({ [k]: !!c } as Partial<Member>)} aria-label={label} />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>انصراف</Button>
            <Button onClick={save}>{editing ? "ذخیره تغییرات" : "افزودن عضو"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const INCOME_KINDS = ["حقوق/دستمزد", "یارانه نقدي", "کار آزاد/روزمزد", "کسب‌وکار", "حمایت نهاد/خیریه", "اجاره املاک", "ارثیه (دریافت یک‌باره)", "سایر"];

export function IncomeEditor({ assessment, editable = true }: { assessment: Assessment; editable?: boolean }) {
  const add = usePorsesh((s) => s.addIncomeSource);
  const update = usePorsesh((s) => s.updateIncomeSource);
  const remove = usePorsesh((s) => s.removeIncomeSource);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ kind: INCOME_KINDS[0], receiverMemberId: "", monthlyAmount: 0, continuity: "regular" as "regular" | "occasional" | "one_off", reliability: "reliable" as "reliable" | "uncertain" | "disputed", note: "" });

  const openNew = () => {
    setEditingId(null);
    setForm({ kind: INCOME_KINDS[0], receiverMemberId: "", monthlyAmount: 0, continuity: "regular", reliability: "reliable", note: "" });
    setOpen(true);
  };
  const openEdit = (sid: string) => {
    const s = assessment.incomeSources.find((x) => x.id === sid);
    if (!s) return;
    setEditingId(sid);
    setForm({ kind: s.kind, receiverMemberId: s.receiverMemberId ?? "", monthlyAmount: s.monthlyAmount, continuity: s.continuity, reliability: s.reliability, note: s.note ?? "" });
    setOpen(true);
  };
  const save = () => {
    const payload = { kind: form.kind, receiverMemberId: form.receiverMemberId || undefined, monthlyAmount: Number(form.monthlyAmount) || 0, continuity: form.continuity, reliability: form.reliability, note: form.note || undefined };
    if (editingId) update(assessment.id, editingId, payload);
    else add(assessment.id, payload);
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-semibold flex items-center gap-2">
          <Coins className="size-5 text-teal-strong" aria-hidden />
          منابع درآمد خانوار
        </h3>
        {editable && (
          <Button size="sm" onClick={openNew} className="ms-auto">
            <Plus className="size-4" aria-hidden /> افزودن منبع
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-5">
        برای هر منبع: دریافت‌کننده، مبلغ، دوره، استمرار، قابلیت اتکا ثبت می‌شود. دریافت‌های یک‌باره (مانند ارث) در درآمد ماهانه محاسبه نمی‌شوند.
      </p>
      {assessment.incomeSources.length === 0 && (
        <p className="text-sm text-muted-foreground border rounded-xl p-4 bg-muted/40">منبعی ثبت نشده است. برای محاسبه D3 و C8 حداقل منابع اصلی را ثبت کنید.</p>
      )}
      <div className="grid gap-2.5">
        {assessment.incomeSources.map((s) => {
          const receiver = assessment.members.find((m) => m.id === s.receiverMemberId);
          return (
            <div key={s.id} className="rounded-xl border bg-card p-3.5 flex flex-wrap items-center gap-2.5">
              <span className="font-medium">{s.kind}</span>
              {receiver && <Badge variant="secondary">{receiver.firstName}</Badge>}
              <span className="text-sm">{faMoney(s.monthlyAmount)}</span>
              <Badge variant="outline">{s.continuity === "regular" ? "مستمر" : s.continuity === "occasional" ? "موردی" : "یک‌باره"}</Badge>
              <Badge variant={s.reliability === "reliable" ? "default" : s.reliability === "uncertain" ? "secondary" : "destructive"} className={s.reliability === "reliable" ? "bg-teal-strong" : ""}>
                {s.reliability === "reliable" ? "قابل اتکا" : s.reliability === "uncertain" ? "مشکوک" : "مورد اختلاف"}
              </Badge>
              {editable && (
                <div className="ms-auto flex gap-1.5">
                  <Button size="sm" variant="outline" onClick={() => openEdit(s.id)}><Pencil className="size-3.5" aria-hidden /> ویرایش</Button>
                  <Button size="sm" variant="outline" onClick={() => remove(assessment.id, s.id)} aria-label="حذف منبع"><Trash2 className="size-3.5" aria-hidden /></Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "ویرایش منبع درآمد" : "افزودن منبع درآمد"}</DialogTitle>
            <DialogDescription>مبلغ را به تومان و برای دوره ماهانه وارد کنید (در صورت موردی بودن، میانگین ماهانه).</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="i-kind">نوع منبع</Label>
              <Select value={form.kind} onValueChange={(v) => setForm((f) => ({ ...f, kind: v }))}>
                <SelectTrigger id="i-kind"><SelectValue /></SelectTrigger>
                <SelectContent>{INCOME_KINDS.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="i-amount">مبلغ ماهانه (تومان)</Label>
                <Input id="i-amount" type="number" min={0} dir="ltr" value={form.monthlyAmount || ""} onChange={(e) => setForm((f) => ({ ...f, monthlyAmount: Number(e.target.value) }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="i-recv">دریافت‌کننده</Label>
                <Select value={form.receiverMemberId || "none"} onValueChange={(v) => setForm((f) => ({ ...f, receiverMemberId: v === "none" ? "" : v }))}>
                  <SelectTrigger id="i-recv"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">کل خانوار / نامشخص</SelectItem>
                    {assessment.members.map((m) => <SelectItem key={m.id} value={m.id}>{m.firstName} {m.lastName ?? ""}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="i-cont">استمرار</Label>
                <Select value={form.continuity} onValueChange={(v) => setForm((f) => ({ ...f, continuity: v as typeof form.continuity }))}>
                  <SelectTrigger id="i-cont"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">مستمر (هر ماه)</SelectItem>
                    <SelectItem value="occasional">موردی</SelectItem>
                    <SelectItem value="one_off">یک‌باره (مانند ارث)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="i-rel">قابلیت اتکا</Label>
                <Select value={form.reliability} onValueChange={(v) => setForm((f) => ({ ...f, reliability: v as typeof form.reliability }))}>
                  <SelectTrigger id="i-rel"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reliable">قابل اتکا</SelectItem>
                    <SelectItem value="uncertain">مشکوک/متغیر</SelectItem>
                    <SelectItem value="disputed">مورد اختلاف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="i-note">یادداشت</Label>
              <Input id="i-note" value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>انصراف</Button>
            <Button onClick={save}>ذخیره</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
