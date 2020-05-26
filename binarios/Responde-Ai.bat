title Responde Ai
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)
:start 
@echo off
cls
cd C:\Users\Hiago\Documents\Responde Ai\
echo ==================================================================
call :ColorText 0E "                     Menu Responde Ai"
echo(
echo.
echo  1- Menu para as planilhas do mes
echo  2- Abrir  pasta de livros e solucionarios
echo  3- Abrir pasta do Gadwin
echo  4- Abrir pasta de questoes
echo.
echo ==================================================================
echo.
echo.
set /p x= Digite o valor :


if "%x%" equ "1" (goto:num_1)
if "%x%" equ "2" (goto:num_2)
if "%x%" equ "3" (goto:num_3)
if "%x%" equ "4" (goto:num_4)

:num_1
cls
echo ==================================================================
call :ColorText 0A "                     Escolha o Ano"
echo.
echo 1- 2019
echo 2- 2020
echo q- Volte para o menu anterior
echo.
echo ==================================================================
set /p x= Digite o valor :

if "%x%" equ "1" (goto:ano_1)
if "%x%" equ "2" (goto:ano_2)
if "%x%" equ "q" (goto:start)

:ano_1
cls
echo ==================================================================
call :ColorText 0A "                     Escolha o Mes"
echo.
echo.
echo 1- Mes 1
echo 2- Mes 2
echo 3- Mes 3
echo 4- Mes 4
echo 5- Mes 5
echo 6- Mes 6
echo *- Planilha geral de 2019
echo.
echo.
echo q-Voltar para o menu anterior
echo.
echo ==================================================================

set /p x= Digite o valor : 

if "%x%" equ "1" (goto:mes_1)
if "%x%" equ "2" (goto:mes_2)
if "%x%" equ "3" (goto:mes_3)
if "%x%" equ "4" (goto:mes_4)
if "%x%" equ "5" (goto:mes_5)
if "%x%" equ "6" (goto:mes_6)
if "%x%" equ "*" (goto:2019)
if "%x%" equ "q" (goto:num_1)

:ano_2
cls
echo ==================================================================
call :ColorText 0A "                     Escolha o Mes"
echo.
echo.
echo 1- Mes 1
echo 2- Mes 2
echo 3- Mes 3
echo 4- Mes 4
echo 5- Mes 5
echo 6- Mes 6
echo *- Planilha geral de 2020
echo.
echo.
echo q-Voltar para o menu anterior
echo.
echo ==================================================================

set /p x= Digite o valor : 

if "%x%" equ "1" (goto:2020_1)
if "%x%" equ "2" (goto:2020_2)
if "%x%" equ "3" (goto:2020_3)
if "%x%" equ "4" (goto:2020_4)
if "%x%" equ "5" (goto:2020_5)
if "%x%" equ "6" (goto:2020_6)
if "%x%" equ "*" (goto:2020)
if "%x%" equ "q" (goto:num_1)

:num_2  
start Livro_e_Solucionario
goto:start

:num_3
start C:\Users\Hiago\Pictures\Screenshots_Gadwin
goto:start

:num_4
start Questoes\
start Questoes\_modelo
goto:start


:mes_1
start excel.exe /r "Demanda Vigente\2019\mes 1.xlsx" 
goto:start

:mes_2
start excel.exe /r "Demanda Vigente\2019\mes 2.xlsx"
goto:start

:mes_3
start excel.exe /r "Demanda Vigente\2019\mes3.xlsx"
goto:start


:mes_4
start excel.exe /r "Demanda Vigente\2019\mes 4.xlsx"
goto:start


:mes_5
start excel.exe /r "Demanda Vigente\2019\mes 5.xlsx"
goto:start

:mes_6
start excel.exe /r "Demanda Vigente\2019\mes 6.xlsx"
goto:start

:2019
start excel.exe /r "Demanda Vigente\2019\2019.xlsx"
goto:start

:2020_1
start excel.exe /r "Demanda Vigente\2020\2020-mes 1.xlsx"
goto:start

:2020_2
start excel.exe /r "Demanda Vigente\2020\2020-mes 2.xlsx"
goto:start

:2020_3
start excel.exe /r "Demanda Vigente\2020\2020-mes 3.xlsx"
goto:start

:2020_4
start excel.exe /r "Demanda Vigente\2020\2020-mes 4.xlsx"
goto:start

:2020_5
start excel.exe /r "Demanda Vigente\2020\2020-mes 5.xlsx"
goto:start

:2020_6
start excel.exe /r "Demanda Vigente\2020\2020-mes 6.xlsx"
goto:start

:ColorText
echo off
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof