%------------------------------------------------
%            Trabalho Circuitos II
%         Hiago Riba Guedes 11620104
%
%------------------------------------------------
clear all;
clc;

f=input('Informe a frequencia [Hz]\n');
w=2*pi*f;
op=input('Fonte de corrente ou de tensao?\n');

if (op == 'corrente' || op == 'c' || op == 'CORRENTE')
Mod=input('Insira o modulo da corrente\n');
Ang=input('Insira o angulo de fase [em graus]\n');
Ang=(pi/180)*Ang;
a=Mod*cos(Ang);
b=Mod*sin(Ang);
I= a + b*i
else if (op=='tensao' || op=='t' || op=='TENSAO')
Mod=input('Insira o modulo da tensao\n');
Ang=input('Insira o angulo de fase [em graus]\n');
Ang=(pi/180)*Ang;
a=Mod*cos(Ang);
b=Mod*sin(Ang);
V= a + b*i
else if (op=='amperagem' || op=='voltagem') 
printf('ESSA PORRA NAO EXISTE\n ');
else 
printf('Incorreto\n');
endif


%Selecionando resistores
n=0;
t=input('Tera resistores? S ou N\n');
if (t=='N' ||t=='n')
R(n)=0;
else if (t=='S'||t=='s')
n=n+1;
R(n)=input('Qual o valor?');
endif