@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or is not on PATH.
    echo Install Node.js, then run this file again.
    pause
    exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
    echo npm is not installed or is not on PATH.
    echo Reinstall Node.js with npm, then run this file again.
    pause
    exit /b 1
)

if not exist "node_modules\.bin\vite.cmd" (
    echo Installing project dependencies...
    call npm ci
    if errorlevel 1 (
        echo Dependency installation failed.
        pause
        exit /b 1
    )
)

echo Starting Nightfall Intelligence...
start "Nightfall Intelligence - Vite" cmd /k "npm run dev -- --host 127.0.0.1 --strictPort"

for /L %%i in (1,1,30) do (
    powershell -NoProfile -Command "try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5173' -TimeoutSec 1; if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) { exit 0 } } catch { exit 1 }; exit 1" >nul 2>&1
    if not errorlevel 1 goto :open_browser
    timeout /t 1 /nobreak >nul
)

echo The development server did not respond at http://127.0.0.1:5173.
echo Check the Vite window for startup errors.
pause
exit /b 1

:open_browser
start "" "http://localhost:5173"
exit /b 0
