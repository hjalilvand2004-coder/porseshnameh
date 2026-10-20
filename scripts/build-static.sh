#!/usr/bin/env bash
# ساخت نسخه استاتیک «کاملاً قابل حمل»
# خروجی با مسیرهای نسبی ساخته می‌شود و همه‌جا کار می‌کند:
#   - GitHub Pages زیرمسیر /porseshnameh/
#   - هر سرور محلی (npx serve out) با هر مسیری
#   - باز کردن مستقیم index.html از حالت file:// (نسخه ZIP)
# استفاده: bash scripts/build-static.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▶ ساخت خروجی استاتیک (assetPrefix نسبی)..."
STATIC_EXPORT=1 npx next build

echo "▶ پس‌پردازش: مسیر فونت‌های داخل CSS باید نسبت به عمق فایل CSS نسبی شود..."
python3 scripts/postprocess-static.py

echo "▶ افزودن راهنمای فارسی به خروجی..."
cp scripts/PORTABLE-README.txt out/README.txt 2>/dev/null || true

echo "▶ ممیزی قابلیت حمل..."
bash scripts/audit-portable.sh

echo "✓ خروجی در پوشه out/ آماده است."
echo "  تست محلی:            npx serve out"
echo "  تست file://:         باز کردن out/index.html در مرورگر"
echo "  استقرار gh-pages:    bash scripts/deploy-ghpages.sh"
