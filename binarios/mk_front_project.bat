cls
@echo off

if "%~1" equ "" (goto:set_name)

md %1\assets %1\assets\js %1\assets\css %1\assets\img
cd %1
make_indexHTML
cd ..

:set_name
set /p _x= De o nome do projeto : 
md %_x%\assets %_x%\assets\js %_x%\assets\css %_x%\assets\img
cd %_x%
make_indexHTML
cd ..