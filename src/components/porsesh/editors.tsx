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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MEMBER_RELATIONS } from "@/lib/mpi/questions";
import { memberRegistryType } from "@/lib/mpi/types";
import type { Assessment, Household, Member } from "@/lib/mpi/types";
import { faNum, faMoney } from "@/lib/mpi/format";
import { Plus, Pencil, Trash2, Users2, Coins, CircleAlert, Fingerprint, UserPlus, Home, Lock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
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

/** نشان «نوع عضو» — ثبت‌شده در سابقه ثبتی ثبت احوال یا همسفره (همراه ساکن، خارج از سابقه ثبتی) */
export function MemberTypeBadge({ m, className }: { m: Member; className?: string }) {
  if (memberRegistryType(m) === "registry") {
    return (
      <Badge
        variant="outline"
        className={cn("gap-1 bg-teal-soft text-teal-strong border-teal-strong/30", className)}
        title={m.fromRegistry
          ? "این عضو از واکشی سابقه ثبتی ثبت احوال آمده است (ملاک) — ترکیب جاری خانوار جداگانه تأیید می‌شود."
          : "به‌عنوان عضو خانوار ثبت‌شده در سابقه ثبتی ثبت احوال اعلام شده است."}
      >
        <Fingerprint className="size-3.5" aria-hidden />
        عضو خانوار — ثبت احوال
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className={cn("gap-1 border-violet-300 bg-violet-50 text-violet-700", className)}
      title="همسفره: همراهِ ساکن با خانوار که در سابقه ثبتی ثبت احوال به‌عنوان عضو خانوار ثبت نشده است (مهمان، هم‌سکون موقت، ...)."
    >
      <UserPlus className="size-3.5" aria-hidden />
      همسفره
    </Badge>
  );
}

export function MemberManager({ assessment, editable = true }: { assessment: Assessment; editable?: boolean }) {
  const addMember = usePorsesh((s) => s.addMember);
  const updateMember = usePorsesh((s) => s.updateMember);
  const removeMember = usePorsesh((s) => s.removeMember);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Partial<Member>>({});

  const registryCount = assessment.members.filter((m) => memberRegistryType(m) === "registry").length;
  const companionCount = assessment.members.length - registryCount;

  const startNew = () => {
    setEditing(null);
    setForm({ firstName: "", relation: "فرزند", age: undefined, nationalIdStatus: "has", memberType: "companion" });
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
    <div className="rounded-2xl border bg-card overflow-hidden">
      {/* سربرگ کارت — شمارش به تفکیک نوع عضو */}
      <div className="p-4 pb-3 flex flex-wrap items-center gap-2 border-b bg-gradient-to-l from-teal-soft/50 via-teal-soft/10 to-transparent">
        <span className="grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong shrink-0">
          <Users2 className="size-5" aria-hidden />
        </span>
        <div className="min-w-40">
          <h3 className="font-semibold text-sm">اعضای خانوار</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {faNum(assessment.members.length)} نفر — {faNum(registryCount)} عضو ثبت احوال • {faNum(companionCount)} همسفره
          </p>
        </div>
        {editable && (
          <Button size="sm" onClick={startNew} className="ms-auto">
            <Plus className="size-4" aria-hidden /> افزودن عضو
          </Button>
        )}
      </div>

      {assessment.members.length === 0 ? (
        <p className="text-sm text-muted-foreground p-4 leading-6">
          هنوز عضوی ثبت نشده است. برای پاسخ به پرسش‌های سلامت، آموزش و معیشت حداقل یک عضو (سرپرست) اضافه کنید.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>نام و نام خانوادگی</TableHead>
                <TableHead>نسبت</TableHead>
                <TableHead className="text-center">سن</TableHead>
                <TableHead>نوع عضو (سابقه ثبتی)</TableHead>
                <TableHead>وضعیت مدرک</TableHead>
                {editable && <TableHead className="text-end">عملیات</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessment.members.map((m, i) => (
                <TableRow key={m.id} className={cn(i % 2 === 1 && "bg-muted/20", "hover:bg-teal-soft/20 transition-colors")}>
                  <TableCell className="text-center text-xs text-muted-foreground align-top pt-3.5">{faNum(i + 1)}</TableCell>
                  <TableCell className="align-top">
                    <div className="font-medium leading-5">{m.firstName} {m.lastName ?? ""}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {m.isHead && <Badge className="bg-primary text-[10px] px-1.5 py-0">سرپرست</Badge>}
                      {m.isMainProvider && <Badge className="bg-teal-strong text-[10px] px-1.5 py-0">تأمین‌کننده اصلی</Badge>}
                      {m.isMainCaregiver && <Badge variant="outline" className="border-teal-strong text-teal-strong text-[10px] px-1.5 py-0">مراقب اصلی</Badge>}
                      {m.needsCare && <Badge variant="outline" className="border-amber-400 text-amber-700 text-[10px] px-1.5 py-0">نیازمند مراقبت</Badge>}
                      {m.schoolAge && <Badge variant="outline" className="text-[10px] px-1.5 py-0">سن آموزش</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <Badge variant="secondary">{m.relation}</Badge>
                  </TableCell>
                  <TableCell className="text-center align-top pt-3.5 text-sm">
                    {typeof m.age === "number" ? faNum(m.age) : "—"}
                  </TableCell>
                  <TableCell className="align-top">
                    <MemberTypeBadge m={m} />
                  </TableCell>
                  <TableCell className="align-top">
                    {m.nationalIdStatus === "missing" ? (
                      <Badge variant="outline" className="border-destructive/40 text-destructive gap-1">
                        <CircleAlert className="size-3" aria-hidden /> فاقد مدرک
                      </Badge>
                    ) : m.nationalIdStatus === "in_progress" ? (
                      <Badge variant="outline" className="text-[11px]">در جریان دریافت</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">دارد</span>
                    )}
                  </TableCell>
                  {editable && (
                    <TableCell className="align-top">
                      <div className="flex gap-1.5 justify-end">
                        <Button size="sm" variant="outline" onClick={() => startEdit(m)} aria-label={`ویرایش ${m.firstName}`}>
                          <Pencil className="size-3.5" aria-hidden />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => removeMember(assessment.id, m.id)} aria-label={`حذف ${m.firstName}`}>
                          <Trash2 className="size-3.5" aria-hidden />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="px-4 py-2.5 text-[11px] text-muted-foreground leading-5 border-t bg-muted/30 flex items-start gap-1.5">
        <Info className="size-3.5 shrink-0 mt-0.5" aria-hidden />
        <span>
          <b>نوع عضو:</b> «عضو خانوار» = ثبت‌شده در سابقه ثبتی ثبت احوال (مبنای واکشی)؛ «همسفره» = همراهِ ساکن با خانوار که در سابقه ثبتی ثبت نشده است (مهمان، هم‌سکون موقت، ...) — ترکیب جاری خانوار جداگانه تأیید می‌شود.
        </span>
      </p>

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
            {/* نوع عضو — برای اعضای واکشی‌شده ملاک و غیرقابل تغییر است */}
            <div className="space-y-1.5">
              <Label htmlFor="m-type">نوع عضو (سابقه ثبتی ثبت احوال)</Label>
              {form.fromRegistry ? (
                <div id="m-type" className="rounded-lg border border-teal-strong/30 bg-teal-soft/40 px-3 py-2.5 text-sm flex items-center gap-2" aria-readonly>
                  <Lock className="size-4 text-teal-strong" aria-hidden />
                  <span>عضو خانوار — واکشی‌شده از سابقه ثبتی ثبت احوال (ملاک؛ نوع از منبع ثبتی می‌آید)</span>
                </div>
              ) : (
                <Select value={form.memberType ?? "companion"} onValueChange={(v) => set({ memberType: v as Member["memberType"] })}>
                  <SelectTrigger id="m-type"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="companion">همسفره — همراه ساکن، خارج از سابقه ثبتی</SelectItem>
                    <SelectItem value="registry">عضو خانوار — ثبت‌شده در سابقه ثبتی</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <p className="text-[11px] text-muted-foreground leading-5">
                همسفره کسی است که با خانوار سکونت دارد اما در سابقه ثبتی ثبت احوال به‌عنوان عضو خانوار ثبت نشده است؛ برای شمارش ترکیب خانوار و پرسش‌های عضومحور ثبت می‌شود.
              </p>
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

/* ============ هزینه‌های مسکن (ورودی محاسبه C8) — در گام «مسکن» و متناسب با نوع تصرف ============ */

const TENURE_OPTIONS: { value: string; label: string }[] = [
  { value: "مستأجر", label: "مستأجر — اجاره‌نشین با قرارداد" },
  { value: "مالک", label: "مالک — واحد متعلق به خانوار" },
  { value: "رایگان سکونت دارد", label: "رایگان سکونت دارد (خویشاوند/آشنا)" },
  { value: "خدمتی", label: "مسکن خدمتی (کارفرما/نهاد)" },
  { value: "وابسته به نهاد/فرد", label: "وابسته به نهاد یا فرد دیگر" },
  { value: "بی‌خانمان / بدون مسکن پایدار", label: "بی‌خانمان / بدون مسکن پایدار" },
];

/**
 * داده‌های هزینه مسکن — از گام «اطلاعات پایه» به گام «مسکن» (شاخص C8) منتقل شد.
 * فیلدها کلی نمایش داده نمی‌شوند: متناسب با «نوع تصرف مسکن»، فقط فیلدهای مرتبط باز می‌شود؛
 * ودیعه جدا از اجاره ثبت می‌شود و در فشار هزینه مسکن (C8) لحاظ نمی‌گردد.
 */
export function HousingCostFields({ assessment }: { assessment: Assessment }) {
  const updateHousehold = usePorsesh((s) => s.updateHousehold);
  const h = assessment.household;
  const ws = assessment.webServices ?? {};

  const tenureFromService = ws.property?.status === "ok" ? ws.property.prefills?.householdPatch?.tenureType : undefined;
  const tenure = h.tenureType && h.tenureType !== "—" ? h.tenureType : undefined;
  const tenureLocked = !!tenure && !!tenureFromService && tenure === tenureFromService;

  const set = (patch: Partial<Household>) => updateHousehold(assessment.id, patch);

  const isHomeless = tenure === "بی‌خانمان / بدون مسکن پایدار" || h.noFixedAddress;
  const isRent = tenure === "مستأجر";
  const isOwn = tenure === "مالک";
  const hasTenure = !!tenure && !isHomeless;

  const money = (key: keyof Household, label: string, help?: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={`hh-${String(key)}`}>{label}</Label>
      <Input
        id={`hh-${String(key)}`}
        type="number"
        min={0}
        dir="ltr"
        value={(h[key] as number | undefined) ?? ""}
        onChange={(e) => set({ [key]: e.target.value === "" ? undefined : Number(e.target.value) } as Partial<Household>)}
      />
      {help && <p className="text-[11px] text-muted-foreground leading-5">{help}</p>}
    </div>
  );

  return (
    <div className="rounded-xl border border-teal-strong/25 bg-teal-soft/20 p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Home className="size-4.5 text-teal-strong" aria-hidden />
        <h4 className="font-semibold text-sm">داده‌های هزینه مسکن — ورودی محاسبه C8</h4>
        <Badge variant="outline" className="text-[10px] bg-teal-soft text-teal-strong border-teal-strong/30">
          متناسب با نوع تصرف
        </Badge>
      </div>

      {/* نوع تصرف مسکن — اگر از استعلام املاک آمده باشد ملاک و قفل است */}
      <div className="space-y-1.5">
        <Label htmlFor="hh-tenure">نوع تصرف مسکن</Label>
        {tenureLocked ? (
          <div id="hh-tenure" className="rounded-lg border bg-muted/50 px-3 py-2.5 text-sm min-h-9 flex items-center gap-2" aria-readonly>
            <Lock className="size-3.5 text-muted-foreground" aria-hidden />
            {tenure}
            <Badge variant="outline" className="text-[10px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30">
              استعلام املاک — ملاک، غیرقابل ویرایش
            </Badge>
          </div>
        ) : (
          <Select value={tenure ?? ""} onValueChange={(v) => set({ tenureType: v })}>
            <SelectTrigger id="hh-tenure">
              <SelectValue placeholder="انتخاب کنید تا فیلدهای مرتبط نمایش یابد" />
            </SelectTrigger>
            <SelectContent>
              {TENURE_OPTIONS.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {!tenure && (
        <p className="text-xs text-muted-foreground bg-muted/40 border rounded-lg px-3 py-2.5 leading-5">
          نوع تصرف مسکن را انتخاب کنید — فقط فیلدهای هزینه مرتبط با همان وضعیت نمایش داده می‌شود
          (مثلاً برای مستأجر: اجاره، ودیعه، شارژ و قبوض؛ برای مالک: شارژ و قبوض).
        </p>
      )}

      {isHomeless && (
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 leading-5">
          برای سکونت غیرپایدار (بی‌خانمانی / فضای غیرمسکونی) هزینه ماهانه مسکن ثبت نمی‌شود؛
          وضعیت معوقات و اثر آن در پرسش‌های همین شاخص (C8) ثبت می‌شود.
        </p>
      )}

      {hasTenure && (
        <div className="grid sm:grid-cols-2 gap-3">
          {isRent && money("monthlyRent", "اجاره ماهانه (تومان)")}
          {isRent && money("deposit", "ودیعه (تومان) — جدا از اجاره", "ودیعه در فشار هزینه مسکن (C8) لحاظ نمی‌شود؛ فقط برای پرونده ثبت می‌گردد.")}
          {money("monthlyCharge", "شارژ ماهانه (تومان)", isOwn ? "هزینه نگهداشت واحد مالکی (شارژ ساختمان)" : undefined)}
          {money("monthlyBills", "میانگین قبوض ماهانه (تومان)", "برق، آب، گاز و سایر قبوض عادی خانوار")}
          {money("arrears", "مجموع معوقه اجاره/شارژ/قبوض (تومان)", "مبلغ برای پرونده؛ شدت معوقه در پرسش «وضعیت معوقات» زیر همین کارت ثبت می‌شود.")}
        </div>
      )}

      {isOwn && (
        <p className="text-xs text-muted-foreground leading-5">
          اقساط یا وام ماهانه مسکن (در صورت وجود) در پرسش «اقساط ضروری ماهانه» زیر همین کارت ثبت می‌شود — بدون ودیعه.
        </p>
      )}
    </div>
  );
}
