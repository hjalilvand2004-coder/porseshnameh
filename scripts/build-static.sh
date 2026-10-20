#!/usr/bin/env bash
# ساخت نسخه استاتیک قابل حمل برای GitHub Pages (basePath: /porseshnameh)
# استفاده: bash scripts/build-static.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▶ ساخت خروجی استاتیک..."
STATIC_EXPORT=1 npx next build

# Next.js مسیر فونت‌های داخل CSS را با basePath بازنویسی نمی‌کند — اصلاح می‌شود:
echo "▶ پس‌پردازش مسیر فونت‌ها..."
find out -name "*.css" -exec sed -i 's|url(/fonts/|url(/porseshnameh/fonts/|g' {} +

echo "▶ خروجی در پوشه out/ آماده است."
echo "  پیش‌نمایش محلی:  npx serve out"
echo "  مسیر انتظارشده:  /porseshnameh/"
