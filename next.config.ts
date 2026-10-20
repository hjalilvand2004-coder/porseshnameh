import type { NextConfig } from "next";

/**
 * دو حالت ساخت:
 * - پیش‌فرض (standalone): اجرای سرور توسعه/تولید در سندباکس و پنل پیش‌نمایش
 * - STATIC_EXPORT=1: خروجی استاتیک «کاملاً قابل حمل»
 *   assetPrefix نسبی ("./") → همان یک بیلد در همه‌جا کار می‌کند:
 *   GitHub Pages زیرمسیر /porseshnameh/، هر سرور محلی با هر مسیری،
 *   و حتی باز کردن مستقیم index.html از حالت file:// (نسخه ZIP)
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        assetPrefix: "./",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
