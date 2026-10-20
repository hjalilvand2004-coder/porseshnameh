#!/usr/bin/env bash
# ساخت نسخه استاتیک قابل حمل برای GitHub Pages (basePath: /porseshnameh)
# استفاده: bash scripts/build-static.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▶ ساخت خروجی استاتیک..."
STATIC_EXPORT=1 npx next build

echo "▶ خروجی در پوشه out/ آماده است."
echo "  پیش‌نمایش محلی:  npx serve out"
echo "  مسیر انتظارشده:  /porseshnameh/"
