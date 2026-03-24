@echo off
setlocal

cd /d "%~dp0"

echo Starting Smart City backend (Spring Boot)...
start "Smart City Backend" cmd /k "cd /d ""%~dp0backend"" && mvn spring-boot:run"

echo Starting Smart City frontend (React)...
start "Smart City Frontend" cmd /k "cd /d ""%~dp0frontend"" && if not exist node_modules (npm install) && npm start"

echo.
echo Both services are launching in separate terminals.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
pause
