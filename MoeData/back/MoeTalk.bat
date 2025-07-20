@echo off
setlocal
for /f "tokens=1" %%a in ('tasklist ^| findstr /i "EasyWebSvr.exe"') do taskkill /f /im "%%a"
xcopy /Y /I /E Data\back\80\EasyWebSvr.ini Data\

set "PORT=80"
set "IP=0.0.0.0:80"
for /f "tokens=2,5" %%a in ('netstat -ano') do (
    if %%a == %IP% (
        set "PID=%%b"
        goto found 已被占用
    )
)

goto exit 未被占用

:found
for /f "tokens=1" %%a in ('tasklist /nh /fi "PID eq %PID%"') do (
	set PROGRAMNAME=%%a
	xcopy /Y /I /E Data\back\40404\EasyWebSvr.ini Data\
	set "PORT=40404"
)

:exit
start Data/EasyWebSvr.exe
start http://localhost:%PORT%/

endlocal