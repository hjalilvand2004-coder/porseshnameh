import type { NextConfig } from "next";

/**
 * دو حالت ساخت:
 * - پیش‌فرض (standalone): اجرای سرور توسعه/تولید در سندباکس و پنل پیش‌نمایش
 * - STATIC_EXPORT=1: خروجی استاتیک قابل حمل برای GitHub Pages با basePath /porseshnameh
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        basePath: "/porseshnameh",
        assetPrefix: "/porseshnameh/",
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
