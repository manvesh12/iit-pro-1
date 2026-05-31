@echo off
echo ========================================================
echo Starting DSR Portal...
echo ========================================================
echo.

echo [1/3] Starting Database and Storage Containers...
docker-compose up -d
echo.

echo [2/3] Starting Spring Boot Backend (in a new window)...
cd backend
start "DSR Backend" cmd /k "mvnw.cmd spring-boot:run"
cd ..
echo.

echo [3/3] Starting Node.js Frontend (in a new window)...
cd frontend
start "DSR Frontend" cmd /k "node server.js"
cd ..
echo.

echo ========================================================
echo All services have been started!
echo Frontend UI:   http://localhost:8080
echo Backend API:   http://localhost:8081
echo ========================================================
echo You can safely close this window.
pause
