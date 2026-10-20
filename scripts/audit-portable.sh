#!/usr/bin/env bash
# ممیزی نهایی قابلیت حمل خروجی out/
set -euo pipefail
cd "$(dirname "$0")/.."

FAIL=0

echo "  — بررسی نبود مسیر مطلق /porseshnameh در خروجی..."
if grep -rl "/porseshnameh" out --include="*.html" --include="*.css" --include="*.js" >/dev/null 2>&1; then
  echo "    ✗ ارجاع به /porseshnameh باقی مانده:"
  grep -rl "/porseshnameh" out --include="*.html" --include="*.css" --include="*.js" | head -5
  FAIL=1
else
  echo "    ✓ تمیز"
fi

echo "  — بررسی نبود ارجاع مطلق /_next/ در HTML..."
if grep -rlE '(src|href)="/_next/' out --include="*.html" >/dev/null 2>&1; then
  echo "    ✗ ارجاع مطلق /_next/ در HTML یافت شد:"
  grep -rlE '(src|href)="/_next/' out --include="*.html" | head -5
  FAIL=1
else
  echo "    ✓ تمیز"
fi

echo "  — بررسی وجود index.html و .nojekyll..."
[ -f out/index.html ] && echo "    ✓ index.html" || { echo "    ✗ index.html نیست"; FAIL=1; }
touch out/.nojekyll
echo "    ✓ .nojekyll"

echo "  — بررسی فونت‌ها..."
FCOUNT=$(find out/fonts -type f 2>/dev/null | wc -l)
[ "$FCOUNT" -gt 0 ] && echo "    ✓ ${FCOUNT} فایل فونت" || { echo "    ✗ فونتی در out/fonts نیست"; FAIL=1; }

if [ "$FAIL" -ne 0 ]; then
  echo "✗ ممیزی قابلیت حمل ناموفق بود."
  exit 1
fi
echo "✓ ممیزی قابلیت حمل موفق بود."
