@echo off
cd /d %~dp0
echo 🔄  Regenerating service proxies...
nswag run service.config.nswag

if %ERRORLEVEL% NEQ 0 (
  echo NSwag failed with exit code %ERRORLEVEL%
  pause
  exit /b %ERRORLEVEL%
)

echo service-proxies.ts updated
pause