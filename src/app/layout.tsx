import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "پرسش‌نامه | سامانه غربالگری EM-MPI خانوار",
  description:
    "سامانه مدرن ثبت و غربالگری پرسشنامه خانوار بر پایه شاخص چندبعدی محرومیت EM-MPI با ۳۰ شاخص در پنج بُعد، تفکیک اطلاعات پرونده‌ای از امتیاز محرومیت، ثبت نشانه‌های فوریت و پشتیبانی از بازبینی انسانی مددکار.",
  keywords: ["EM-MPI", "پرسشنامه", "غربالگری", "محرومیت", "خانوار", "کمیته امداد"],
  authors: [{ name: "سامانه پرسش‌نامه" }],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d3d63",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
