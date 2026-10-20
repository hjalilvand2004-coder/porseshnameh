#!/usr/bin/env bash
# استقرار خروجی out/ روی شاخه gh-pages
# استفاده: bash scripts/deploy-ghpages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f out/index.html ] || { echo "✗ خروجی استاتیک نیست — ابتدا bash scripts/build-static.sh"; exit 1; }

echo "▶ آماده‌سازی کار درختی برای gh-pages..."
git worktree add -f .zscripts/ghpages gh-pages 2>/dev/null || git worktree add -f .zscripts/ghpages -b gh-pages 2>/dev/null || true

# خالی کردن شاخه و کپی خروجی تازه
find .zscripts/ghpages -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -r out/. .zscripts/ghpages/

cd .zscripts/ghpages
touch .nojekyll
if git diff --quiet HEAD 2>/dev/null && [ -n "$(git status --porcelain)" -o "$(git ls-remote origin gh-pages | cut -f1)" = "$(git rev-parse HEAD 2>/dev/null)" ]; then
  echo "▪ هیچ تغییر جدیدی برای انتشار نیست."
fi
git add -A
git -c user.name="porseshnameh-bot" -c user.email="bot@porseshnameh.local" \
  commit -m "deploy: نسخه قابل حمل با مسیرهای نسبی — سازگار با file:// و هر زیرمسیر" --quiet
git push origin gh-pages --force
cd ../..
git worktree remove --force .zscripts/ghpages
echo "✓ gh-pages به‌روزرسانی شد."
