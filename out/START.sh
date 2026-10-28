#!/usr/bin/env sh
# ============================================================
#  Porseshnameh — Portable launcher (NO installation needed)
#  Run:  sh START.sh   (or make executable and double-click)
#  No Python, no Node.js, no internet, no setup required.
# ============================================================
DIR="$(cd "$(dirname "$0")" && pwd)"
PAGE="$DIR/index.html"

if [ ! -f "$PAGE" ]; then
  echo "[!] index.html not found next to this launcher."
  echo "    Please extract the FULL archive before running."
  exit 1
fi

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$PAGE"
elif command -v open >/dev/null 2>&1; then
  open "$PAGE"
else
  echo "Open this file manually in your browser:"
  echo "  $PAGE"
fi
