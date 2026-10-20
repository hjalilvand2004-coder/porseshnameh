"use client";

import { usePorsesh } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  LayoutDashboard,
  Home,
  ScrollText,
  GitCompareArrows,
  ShieldCheck,
  TriangleAlert,
  BookOpenCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * پوسته سامانه — هدر، ناوبری، بنر نمونه‌بودن و فوتر چسبان
 */

export function Shell({ children }: { children: React.ReactNode }) {
  const view = usePorsesh((s) => s.view);
  const setView = usePorsesh((s) => s.setView);
  const mode = usePorsesh((s) => s.mode);
  const setMode = usePorsesh((s) => s.setMode);

  const nav: { key: Parameters<typeof setView>[0]; label: string; icon: React.ElementType }[] = [
    { key: "home", label: "خانه", icon: Home },
    { key: "assessments", label: "پرونده‌ها", icon: ClipboardList },
    { key: "rules", label: "قواعد و ممیزی", icon: ScrollText },
    { key: "migration", label: "نقشه مهاجرت", icon: GitCompareArrows },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-[13px] no-print">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center gap-2 leading-5">
          <TriangleAlert className="size-4 shrink-0" aria-hidden />
          <span>
            <b>نسخه نمایشی:</b> داده‌ها فقط در مرورگر شما (ذخیره‌سازی محلی) نگهداری می‌شود و پس از پاک‌کردن حافظه از بین می‌رود.
            هیچ داده واقعی خانوار در این نمونه ثبت یا ارسال نکنید. موتور قواعد از UI و هرگونه مدل زبانی مستقل و قطعی است.
          </span>
        </div>
      </div>

      <header className="bg-primary text-primary-foreground no-print">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setView("home")}
            className="flex items-center gap-3 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-lg"
            aria-label="رفتن به صفحه اصلی"
          >
            <span className="grid place-items-center size-10 rounded-xl bg-white/10 border border-white/20 shrink-0">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <span>
              <span className="block font-bold text-lg leading-6">پرسش‌نامه</span>
              <span className="block text-xs text-primary-foreground/75 leading-4">
                سامانه غربالگری EM-MPI خانوار — نمای سنجش محرومیت چندبعدی
              </span>
            </span>
          </button>

          <nav className="ms-auto flex items-center gap-1 flex-wrap" aria-label="ناوبری اصلی">
            {nav.map((n) => (
              <Button
                key={n.key}
                variant={view === n.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView(n.key)}
                className={cn(
                  "text-primary-foreground hover:text-primary",
                  view === n.key && "text-primary hover:text-primary",
                )}
              >
                <n.icon className="size-4" aria-hidden />
                {n.label}
              </Button>
            ))}
            {/* راهنمای سامانه — صفحه مستقل HTML با گرافیک و انیمیشن */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:text-primary"
            >
              <a href="help.html" target="_blank" rel="noopener" title="راهنمای تصویری سامانه — در تب جدید باز می‌شود">
                <BookOpenCheck className="size-4" aria-hidden />
                راهنما
              </a>
            </Button>
            <div className="ms-2 flex rounded-lg bg-white/10 p-0.5 border border-white/15" role="group" aria-label="انتخاب نمای کاربری">
              <button
                onClick={() => setMode("household")}
                aria-pressed={mode === "household"}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md transition-colors",
                  mode === "household" ? "bg-white text-primary font-semibold" : "text-primary-foreground/80 hover:text-primary-foreground",
                )}
              >
                نمای خانوار
              </button>
              <button
                onClick={() => setMode("pro")}
                aria-pressed={mode === "pro"}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md transition-colors",
                  mode === "pro" ? "bg-white text-primary font-semibold" : "text-primary-foreground/80 hover:text-primary-foreground",
                )}
              >
                <LayoutDashboard className="inline size-3.5 me-1" aria-hidden />
                نمای حرفه‌ای
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto bg-card border-t no-print">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-1.5 leading-5">
          <span>پرسش‌نامه — نمونه رابط غربالگری EM-MPI (۳۰ شاخص، ۵ بُعد، سقف ۱۰۰۰)</span>
          <span>EM-MPI ابزار سطح‌بندی اولیه است؛ نه تصمیم‌گیرنده پذیرش یا میزان حمایت.</span>
          <span className="ms-auto">تصمیم نهایی و مالی فقط در اختیار مرجع انسانی مجاز است.</span>
        </div>
      </footer>
    </div>
  );
}
