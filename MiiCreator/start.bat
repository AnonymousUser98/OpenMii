@echo off
rem Start Mii Creator locally. Extra flags are passed through, e.g. start.bat --watch
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js 18+ is required: https://nodejs.org & pause & exit /b 1)
node server.js %*
