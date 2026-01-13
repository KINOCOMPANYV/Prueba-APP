@echo off
set "GIT_PATH=C:\Program Files\Git\cmd\git.exe"

echo ==========================================
echo   Iniciando subida a GitHub - Kino Company
echo ==========================================
echo.

:: Verificar si git existe en la ruta detectada
if not exist "%GIT_PATH%" (
    echo [ERROR] No se encontro Git en: %GIT_PATH%
    echo Intentando comando global 'git'...
    set "GIT_PATH=git"
)

echo [1/6] Inicializando repositorio...
"%GIT_PATH%" init

echo [2/6] Agregando archivos...
"%GIT_PATH%" add .

echo [3/6] Creando commit...
"%GIT_PATH%" commit -m "Lanzamiento Estrategia Digital 2025 - Kino Company"

echo [4/6] Renombrando rama a main...
"%GIT_PATH%" branch -M main

echo [5/6] Conectando con el repositorio remoto...
:: Remover origen si ya existe para evitar errores
"%GIT_PATH%" remote remove origin 2>nul
"%GIT_PATH%" remote add origin https://github.com/KINOCOMPANYV/Prueba-APP

echo [6/6] Subiendo archivos...
echo.
echo [IMPORTANTE] GitHub te pedira iniciar sesion en la ventana emergente.
echo.
"%GIT_PATH%" push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Hubo un problema al subir.
    echo Posibles causas:
    echo 1. No tienes permiso en el repositorio.
    echo 2. El repositorio no esta vacio (necesitas hacer pull primero).
    echo 3. Cancelaste el inicio de sesion.
) else (
    echo.
    echo [EXITO] Proyecto subido correctamente a:
    echo https://github.com/KINOCOMPANYV/Prueba-APP
)

pause
