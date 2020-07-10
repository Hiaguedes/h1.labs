## Copyright (C) 2017 hiago
## 
## This program is free software; you can redistribute it and/or modify it
## under the terms of the GNU General Public License as published by
## the Free Software Foundation; either version 3 of the License, or
## (at your option) any later version.
## 
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
## 
## You should have received a copy of the GNU General Public License
## along with this program.  If not, see <http://www.gnu.org/licenses/>.

##

## Author: hiago <hiago@Hiago>
## Created: 2017-05-20
z=1:100000;
function [retval] = desenho(R,m,n)
%n e m são pontos de no 
if(n=m)
printf("Erro,pontos de no nao podem ser iguais");
endif
if(n<0 || m<0)
printf("Erro:ponto de no deve ser maior que 0. 0 e´ o no de referencia");
endif

for(x=1:nC)
C(x)=XC(x);
endfor
for(x=1:nL)
L(x)=XL(x);
endfor

endfunction
