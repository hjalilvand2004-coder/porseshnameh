"use client";

import { useState } from "react";
import type { Assessment } from "@/lib/mpi/types";
import { WEB_SERVICES, DATA_PRIORITY } from "@/lib/mpi/legacy-map";
import { simulateServiceFetch } from "@/lib/mpi/web-services";
import { usePorsesh } from "@/lib/store";
import { faDateTime, faNum } from "@/lib/mpi/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Fingerprint, MapPin, HeartPulse, Building2, GraduationCap, BookOpenCheck,
  Landmark, Lock, RefreshCw, Loader2, CircleCheck, CircleAlert, CircleMinus, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

/**
 * پنل استعلام از مراجع ثبتی (وب‌سرویس‌های سازمان‌های متولی).
 *
 * طبق قاعده تقدم منابع سند EM-MPI، داده مرجع ثبتی «ملاک» است:
 * پس از دریافت موفق، فیلد مرتبط در فرم قفل و فقط‌خواندنی می‌شود و
 * اصلاح آن فقط با درخواست به مرجع ثبتی امکان‌پذیر است.
 * در نسخه نمایشی آفلاین، پاسخ شبیه‌سازی‌شده از داده واردشده ساخته می‌شود.
 */

const SERVICE_ICON: Record<string, React.ElementType> = {
  civil_registry: Fingerprint,
  post: MapPin,
  shaparak_bank: Landmark,
  insurance: HeartPulse,
  property: Building2,
  education_school: BookOpenCheck,
  higher_edu: GraduationCap,
};

const PRIORITY_TONE: Record<string, string> = {
  teal: "bg-teal-50 text-teal-800 border-teal-200",
  sky: "bg-sky-50 text-sky-800 border-sky-200",
  amber: "bg-amber-50 text-amber-800 border-amber-200",
  violet: "bg-violet-50 text-violet-800 border-violet-200",
  rose: "bg-rose-50 text-rose-800 border-rose-200",
};

export function DataPriorityLegend({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border bg-card p-5", className)}>
      <h3 className="font-semibold mb-1 flex items-center gap-2">
        <Landmark className="size-5 text-teal-strong" aria-hidden /> تقدم منابع داده (قاعده اعتبارسنجی)
      </h3>
      <p className="text-xs text-muted-foreground leading-5 mb-3">
        در صورت تناقض بین منابع، داده با تقدم بالاتر ملاک است و سامانه «هشدار کیفیت داده» صادر می‌کند؛
        امتیاز یا پیشنهاد نهایی تا بررسی تناقض قطعی تلقی نمی‌شود.
      </p>
      <ol className="space-y-2">
        {DATA_PRIORITY.map((p) => (
          <li key={p.rank} className="flex gap-2.5 items-start">
            <span className={cn("grid place-items-center size-6 rounded-full border text-xs font-bold shrink-0 mt-0.5", PRIORITY_TONE[p.tone])}>
              {faNum(p.rank)}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium leading-5">{p.source}</div>
              <div className="text-xs text-muted-foreground leading-5">{p.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StatusBadge({ status }: { status: "ok" | "partial" | "error" | "pending" }) {
  if (status === "ok") return <Badge className="gap-1 bg-emerald-600 text-white"><CircleCheck className="size-3.5" aria-hidden /> دریافت شد — ملاک</Badge>;
  if (status === "partial") return <Badge className="gap-1 bg-amber-500 text-white"><CircleMinus className="size-3.5" aria-hidden /> دریافت جزئی</Badge>;
  if (status === "pending") return <Badge variant="outline" className="gap-1"><Loader2 className="size-3.5 animate-spin" aria-hidden /> در حال استعلام ...</Badge>;
  return <Badge variant="outline" className="gap-1 text-destructive border-destructive/40"><CircleAlert className="size-3.5" aria-hidden /> استعلام ناموفق</Badge>;
}

function ServiceCard({ service, assessment }: { service: (typeof WEB_SERVICES)[number]; assessment: Assessment }) {
  const setWebService = usePorsesh((s) => s.setWebService);
  const clearWebService = usePorsesh((s) => s.clearWebService);
  const res = assessment.webServices?.[service.id];
  const [pending, setPending] = useState(false);
  const Icon = SERVICE_ICON[service.id] ?? Landmark;

  const fetchNow = () => {
    setPending(true);
    // شبیه‌سازی تأخیر شبکه در نسخه نمایشی آفلاین
    setTimeout(() => {
      const r = simulateServiceFetch(service.id, assessment);
      setWebService(assessment.id, service.id, r);
      setPending(false);
      toast({
        title: r.status === "error" ? "استعلام ناموفق" : r.status === "partial" ? "استعلام جزئی" : "استعلام موفق",
        description: r.note ?? `${service.name}: داده ملاک ثبت شد و فیلد مرتبط فقط‌خواندنی است.`,
        variant: r.status === "error" ? "destructive" : "default",
      });
    }, 900);
  };

  return (
    <div className="rounded-2xl border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <span className="grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong shrink-0">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-5">{service.name}</h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">{service.org}</p>
        </div>
        <Badge variant="outline" className="ms-auto shrink-0 text-[10px] bg-teal-soft text-teal-strong border-teal-strong/30">
          ملاک ثبتی
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-5">
        ارائه می‌دهد: {service.provides.join("، ")}
      </p>

      {res ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={res.status} />
            <span className="text-[11px] text-muted-foreground">{faDateTime(res.fetchedAt)}</span>
          </div>
          <dl className="rounded-xl border bg-muted/30 p-3 space-y-1.5 text-xs">
            {Object.entries(res.data).map(([k, v]) => (
              <div key={k} className="flex flex-wrap gap-x-2 leading-5">
                <dt className="text-muted-foreground">{k}:</dt>
                <dd className="font-medium flex items-center gap-1">
                  {v}
                  <Lock className="inline size-3 text-muted-foreground" aria-hidden />
                </dd>
              </div>
            ))}
          </dl>
          {res.note && <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-5">{res.note}</p>}
          <div className="flex gap-1.5">
            <Button size="sm" variant="outline" onClick={fetchNow} disabled={pending}>
              {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <RefreshCw className="size-3.5" aria-hidden />}
              استعلام مجدد
            </Button>
            <Button size="sm" variant="ghost" onClick={() => clearWebService(assessment.id, service.id)} disabled={pending}>
              بازگرداندن به حالت دستی
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <StatusBadge status={pending ? "pending" : "error"} />
          <Button size="sm" onClick={fetchNow} disabled={pending}>
            {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <RefreshCw className="size-3.5" aria-hidden />}
            استعلام از سامانه متولی
          </Button>
          <p className="text-[11px] text-muted-foreground leading-5">
            شاخص‌های مرتبط: {service.feeds.join("، ")}
          </p>
        </div>
      )}
    </div>
  );
}

export function WebServicePanel({ assessment }: { assessment: Assessment }) {
  return (
    <section className="space-y-3">
      <div className="rounded-2xl border border-teal-strong/30 bg-teal-soft/40 p-5 flex gap-3">
        <Landmark className="size-6 text-teal-strong shrink-0 mt-0.5" aria-hidden />
        <div className="text-sm leading-6">
          <h3 className="font-bold">استعلام از مراجع ثبتی — داده‌ای که در فرم قابل تغییر نیست</h3>
          <p className="mt-1 text-[13px]">
            بخشی از اطلاعات پرسشنامه از <b>وب‌سرویس سازمان‌های متولی</b> (ثبت احوال، پست، بیمه‌ها، اموال و املاک،
            علوم و دانشگاه آزاد، آموزش‌وپرورش) دریافت می‌شود. طبق قاعده تقدم منابع، این داده <b>ملاک است</b>؛
            پس از دریافت، فیلد مرتبط فقط‌خواندنی می‌شود و اصلاح آن فقط از مسیر درخواست به مرجع ثبتی امکان‌پذیر است.
          </p>
          <p className="mt-1.5 text-[12px] text-muted-foreground flex items-center gap-1.5">
            <Info className="size-3.5 shrink-0" aria-hidden />
            نسخه نمایشی آفلاین است؛ پاسخ استعلام <b>شبیه‌سازی‌شده</b> از همان اطلاعاتی که در فرم وارد شده ساخته می‌شود.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {WEB_SERVICES.map((s) => <ServiceCard key={s.id} service={s} assessment={assessment} />)}
      </div>
    </section>
  );
}
