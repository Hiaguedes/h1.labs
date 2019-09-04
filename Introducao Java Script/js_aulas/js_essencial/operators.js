//Operadores Aritméticos

console.log('Operacao resto: ', 12 % 5); //O resto da divisao de 12 por 5 , no caso 2
var x = 1;
console.log('Os operadores ++ se colacados depois na hora de atribuir nao vao ter alteracao, somente se colocados antes... assim como o --: ', x++, ++x, x--, --x);
console.log('Agrupamentos [1]: ',6 / 2 * (1 + 2));
console.log('Agrupamentos[2]: ', 6 / (2 * (1 + 2)));
console.log('Exponencial: ', 10 ** -2, ',', (-5) ** 3);

var y, x = 2;
y = x;
console.log('Atribuindo y=x=', y);
y = x + y;
console.log('y=2+2=', y);
y += y;
console.log('y=y+y=', y);
y /= x;
console.log('y=y/x=', y);
x *= y;
console.log('x=x*y=', x);
x %= y;
console.log('x=x%y=', x);
x = y / x;
console.log('Divisao por zero: ', x)

//Comparacao

console.log(12 > 3);
console.log(-5 < -3);
console.log(3 >= 3);
console.log(12 != 3);
console.log(-3 == 3);
console.log(-5 !== -5);
console.log(x > 3);

// operador ternario

var text;
x = 1;
(x > 0) ? (text = 'A',x=-1) : (text = 'B',x=1)
console.log(text);
(x > 0) ? (text = 'A', x = -1) : (text = 'B', x = 1)
console.log(text);
//Operadores Lógicos
console.log('');
console.log('-----------------------------------------------------------------------------------------------------');
console.log('');
console.log('Tabela Verdade AND');
console.log('---------------');
console.log('0 |0|',false && false);
console.log('0 |1|',false && true);
console.log('1 |0|',true && false);
console.log('1 |1|', true && true);
console.log('---------------');

console.log('Tabela Verdade OR');
console.log('---------------');
console.log('0 |0|', false || false);
console.log('0 |1|', false || true);
console.log('1 |0|', true || false);
console.log('1 |1|', true || true);
console.log('---------------');

console.log('Tabela Verdade NAND');
console.log('---------------');
console.log('0 |0|', !(false && false));
console.log('0 |1|', !(false && true));
console.log('1 |0|', !(true && false));
console.log('1 |1|', !(true && true));
console.log('---------------');

console.log('Tabela Verdade NOR');
console.log('---------------');
console.log('0 |0|', !(false || false));
console.log('0 |1|', !(false || true));
console.log('1 |0|', !(true || false));
console.log('1 |1|', !(true || true));

console.log('Tabela Verdade XOR');
console.log('---------------');
console.log('0 |0|', !!(false ^ false));
console.log('0 |1|', !!(false ^ true));
console.log('1 |0|', !!(true ^ false));
console.log('1 |1|', !!(true ^ true));

console.log('Tabela Verdade XNOR');
console.log('---------------');
console.log('0 |0|', !(false ^ false));
console.log('0 |1|', !(false ^ true));
console.log('1 |0|', !(true ^ false));
console.log('1 |1|', !(true ^ true));

//Spread (Novo no ES6)

var selecoes = ['Alemanha', 'Brasil', 'Flamengo', 'Italia'];
var times = ['Corinthians', 'Gremio', 'Vasco', 'Palmeiras'];
console.log(times);
var times = ['Corinthians', ...selecoes, 'Gremio', 'Vasco', 'Palmeiras'];
console.log(times);

//Propriedades Matemáticas
console.log('---------------');
var conv_degrau_radiano = Math.PI / 180;
console.log('Numero PI= ', Math.PI);

console.log('Seno= ', Math.sin(0 * conv_degrau_radiano), Math.sin(45 * conv_degrau_radiano), Math.sin(90 * conv_degrau_radiano), Math.sin((90 + 45) * conv_degrau_radiano),
    Math.sin(180 * conv_degrau_radiano), Math.sin((180 + 45) * conv_degrau_radiano), Math.sin(270 * conv_degrau_radiano), Math.sin((270 + 45) * conv_degrau_radiano), Math.sin(360 * conv_degrau_radiano));


console.log('Coseno= ', Math.cos(0 * conv_degrau_radiano), Math.cos(45 * conv_degrau_radiano), Math.cos(90 * conv_degrau_radiano), Math.cos((90 + 45) * conv_degrau_radiano),
    Math.cos(180 * conv_degrau_radiano), Math.cos((180 + 45) * conv_degrau_radiano), Math.cos(270 * conv_degrau_radiano), Math.cos((270 + 45) * conv_degrau_radiano), Math.cos(360 * conv_degrau_radiano));

console.log('Tangente= ', Math.tan(0 * conv_degrau_radiano), Math.tan(45 * conv_degrau_radiano), Math.tan(90 * conv_degrau_radiano), Math.tan((90 + 45) * conv_degrau_radiano),
    Math.tan(180 * conv_degrau_radiano), Math.tan((180 + 45) * conv_degrau_radiano), Math.tan(270 * conv_degrau_radiano), Math.tan((270 + 45) * conv_degrau_radiano), Math.tan(360 * conv_degrau_radiano));

//---------
console.log('--------------------');

console.log('Operador in[opera somente em indice de vetor]  :', 0 in times, 3 in times, 5 in times, 7 in times, 8 in times);
