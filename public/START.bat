@echo off
title Porseshnameh - EM-MPI Screening System (Portable)
rem ============================================================
rem  Porseshnameh - Portable launcher (NO installation needed)
rem  Double-click this file to start the system in your browser.
rem  No Python, no Node.js, no internet, no setup required.
rem ============================================================

set "PAGE=%~dp0index.html"

if not exist "%PAGE%" (
  echo.
  echo  [!] index.html not found next to this launcher.
  echo      Please extract the FULL zip before running.
  echo.
  pause
  exit /b 1
)

echo.
echo  Starting Porseshnameh in your default browser...
echo  (If nothing opens, open index.html manually.)
echo.

start "" "%PAGE%"
exit /b 0
