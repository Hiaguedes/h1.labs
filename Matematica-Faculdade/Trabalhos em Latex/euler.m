function [vetx,vety] = Euler(funcao,a,b,N,y0);


%parametros de entrada: funcao,a,b,m,y0 -> funcao,limites inferior, superior, num. de

%intervalos e valor inicial

%parametros de saida: vetx, vety -> abcissas e solucao do PVI


Fxy = eval(funcao);

vetx(1) = x;

vety(1) = y;

disp('     i      x     y     Fxy  ');

disp([0  x    y    Fxy]);

for i=1:N

    x = x+i*h;

    y = y+h*Fxy;

    Fxy = eval(funcao);  

    disp([i  x    y    Fxy]);

    vetx(i+1) = x;

    vety(i+1) = y;

end

end
