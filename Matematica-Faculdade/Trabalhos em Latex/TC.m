%------------------------------------------------
%            Trabalho Circuitos II
%                   Grupo 6
%         Hiago Riba Guedes 11620104
%
%------------------------------------------------
clear all;
clc;
f=input("Informe a frequencia [Hz]\n");
w=2*pi*f;
if(f<=0)
endif
%Selecionando fontes-----------------------------------------------
printf('---------------------------------------');
printf("\nSerao selecionados agora as fontes\n");
printf('---------------------------------------\n');
op=input("Fonte de corrente ou de tensao? t ou c \n Aperte s pra sair da seleçao \n",'s');
nI=0;
nV=0;
while (op == ('corrente') || op == ('c') || op ==('CORRENTE')||op==('tensao') || op==("t") || op==('TENSAO'))
if (op == ('corrente') || op == ('c') || op ==('CORRENTE'))
Mod=input("Insira o modulo da corrente\n");
Ang=input("Insira o angulo de fase [em graus]\n");
Ang=(pi/180)*Ang;
a=Mod*cos(Ang);
b=Mod*sin(Ang);
nI=nI+1;
kI(nI)=input("Insira o menor ponto de no pra essa fonte: \n");
lI(nI)=input("Insira o maior ponto de no pra essa fonte: \n");
MI=[kI;lI]';
%MI=[min(MI);max(MI)]';
I(nI)= a + b*i;
op=input("Fonte de corrente ou de tensao? t ou c \n Aperte s pra sair da seleçao \n",'s');
elseif (op==('tensao') || op==("t") || op==('TENSAO'))
Mod=input("Insira o modulo da tensao\n");
Ang=input("Insira o angulo de fase [em graus]\n");
Ang=(pi/180)*Ang;
a=Mod*cos(Ang);
b=Mod*sin(Ang);
nV=nV+1;
kV(nV)=input("Insira o menor ponto de no pra essa fonte: \n");
lV(nV)=input("Insira o maior ponto de no pra essa fonte: \n");
MV=[kV;lV]'
%MV=[min(MV);max(MV)]';
V(nV)= a + b*i;
op=input("Fonte de corrente ou de tensao? t ou c \n Aperte s pra sair da seleçao \n",'s');
elseif(op==('s'))
printf('Saindo da seleçao das fontes');
else 
printf("Incorreto\n");
endif
endwhile 
%-------------------------------------------------------------------
%Selecionando resistores--------------------------------------------
printf('---------------------------------------');
printf("\nSerao selecionados agora os resistores\n");
printf('---------------------------------------\n');
t=input("Tera resistores? S ou N\n",'s');
nR=0;
if (t==('N') ||t==('n'))
printf("nao serao colocados mais resistores \n");
endif 
while(t==('S')||t==('s'))
nR=nR+1;
R(nR)=input("Qual o valor?\n");
kR(nR)=input("Insira o menor ponto de no pra esse resistor: \n");
lR(nR)=input("Insira o maior ponto de no pra esse resistor: \n");
MR=[kR;lR]';
%MR=[min(MR);max(MR)]';
t=input("Tera mais resistores? S ou N\n",'s');
endwhile 
%--------------------------------------------------------------------
%Selecionando capacitores--------------------------------------------
printf('---------------------------------------');
printf("\nSerao selecionados agora os capacitores\n");
printf('---------------------------------------\n');
t1=input("Tera capacitores? S ou N\n",'s');
nC=0;
if (t1==('N') ||t1==('n'))
printf("nao serao colocados mais capacitores \n");
endif 
while(t1==('S')||t1==('s'))
nC=nC+1;
C(nC)=input("Qual o valor?\n");
kC(nC)=input("Insira o menor ponto de no pra esse capacitor: \n");
lC(nC)=input("Insira o maior ponto de no pra esse capacitor: \n");
MC=[kC;lC]';
%MC=[min(MC);max(MC)]';
t1=input("Tera mais capacitores? S ou N\n",'s');
endwhile

for(x=1:nC) 
XC(x)=-i/(w.*C(x));
endfor 
%--------------------------------------------------------------------
%Selecionando indutores----------------------------------------------
printf('---------------------------------------');
printf("\nSerao selecionados agora os indutores\n");
printf('---------------------------------------\n');
t2=input("Tera indutores? S ou N\n",'s');
nL=0;
if (t2==('N') ||t2==('n'))
printf("nao serao colocados mais indutores \n");
endif 
while(t2==('S')||t2==('s'))
nL=nL+1;
L(nL)=input("Qual o valor?\n");
kL(nL)=input("Insira o menor ponto de no pra esse indutor: \n");
lL(nL)=input("Insira o maior ponto de no pra esse indutor: \n");
ML=[kL;lL]';
%ML=[min(ML);max(ML)]';
t2=input("Tera mais indutores? S ou N\n",'s');
endwhile
for(y=1:nL) 
XL(y)=i*w.*L(y);
endfor 
%Componentes Selecionados---------------------------------------------
printf("Voce selecionou %i resistores,%i capacitores e %i indutores\n",nR,nC,nL);
printf('\n');
for(x=1:nV)
printf(" V(%i)=%.3f + %.3fi V |",x,real(V(x)),imag(V(x)));
endfor
printf('\n');
for(x=1:nI)
printf(" I(%i)=%.3f +%.3fi A |",x,real(I(x)),imag(I(x)));
endfor 
printf('\n');
for(x=1:nR)
printf("  R(%i)=%.2f ohms |",x,R(x));
endfor
printf('\n');
for(x=1:nC)
printf(" C(%i)=%.2f F |",x,C(x));
endfor
printf('\n');
for(x=1:nL)
printf(" L(%i)=%.2f H |",x,L(x));
endfor
%---------------------------------------------------------------------
%CALCULO DAS MALHAS---------------------------------------------------
% o numero total de nos -1(terra) e o numero total de malhas
I=F*inv(K);
