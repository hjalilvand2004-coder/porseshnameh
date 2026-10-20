import { NextResponse } from "next/server";

// سازگار با حالت خروجی استاتیک (STATIC_EXPORT=1)
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    message: "پرسش‌نامه — سامانه غربالگری EM-MPI (نسخه نمایشی)",
    ruleSet: "EM-MPI-RF-1.0.0-demo",
    demo: true,
  });
}
