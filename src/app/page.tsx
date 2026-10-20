"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePorsesh } from "@/lib/store";
import { Shell } from "@/components/porsesh/shell";
import { HomeView, AssessmentsView } from "@/components/porsesh/home";
import { Wizard } from "@/components/porsesh/wizard";
import { ProfessionalDashboard } from "@/components/porsesh/dashboard";
import { RulesView } from "@/components/porsesh/rules-page";
import { MigrationView } from "@/components/porsesh/migration-page";
import { Loader2 } from "lucide-react";

const subscribeNoop = () => () => {};

/**
 * مسیریاب نمای داخلی — تک‌صفحه‌ای برای سازگاری با استقرار استاتیک و پنل پیش‌نمایش
 */

function Router() {
  const view = usePorsesh((s) => s.view);
  const activeId = usePorsesh((s) => s.activeId);
  const assessments = usePorsesh((s) => s.assessments);
  const active = activeId ? assessments[activeId] : undefined;

  switch (view) {
    case "home":
      return <HomeView />;
    case "assessments":
      return <AssessmentsView />;
    case "wizard":
      if (!active) return <HomeView />;
      return <Wizard assessment={active} />;
    case "professional":
      if (!active) return <AssessmentsView />;
      return (
        <div className="mx-auto max-w-6xl px-4 py-8">
          <ProfessionalDashboard assessment={active} />
        </div>
      );
    case "rules":
      return <RulesView />;
    case "migration":
      return <MigrationView />;
    default:
      return <HomeView />;
  }
}

export default function Page() {
  const hydrated = usePorsesh((s) => s.hydrated);
  // تشخیص نصب‌شدگی سمت کلاینت بدون setState در اثر
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  // ضامن اطمینان: اگر بازآوری ذخیره‌سازی (مثلاً file:// یا حافظه مسدود) به
  // onRehydrateStorage نرسد، صفحه در حالت بارگذاری گیر نمی‌کند.
  useEffect(() => {
    const t = setTimeout(() => usePorsesh.getState().markHydrated(), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || !hydrated) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" aria-hidden />
          <span>در حال بارگذاری سامانه پرسش‌نامه ...</span>
        </div>
      </div>
    );
  }

  return (
    <Shell>
      <Router />
    </Shell>
  );
}
