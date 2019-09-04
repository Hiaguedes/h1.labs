
//reach console cd /... and when you make it node var.js
//cls to clear command prompt
//dir to see directories


/*var num = 2;
var num1 = 3;
var num2 = num + num1;
console.log(num2);*/


const num = 12.4680;
console.log('Number');
console.log('Numero Inteiro =', parseInt(num));
console.log('Numero com Duas Casas Decimais =', num.toFixed(2));
console.log('Numero Passado para String (Base 2) =', num.toString(2));
console.log('Numero Passado para String (Base 16) =', num.toString(16));

const texto = 'QWERTY';
const texto_comprimento = 'QWERTY'.length;
console.log('');
console.log('-----------------------------------------------------------------------------------------------------');
console.log('');
console.log('Texto de Base: QWERTY');
console.log('Comprimento do Texto: ', texto_comprimento);
console.log('Separar o texto de acordo com a letra R: ', 'QWERTY'.split('R'));
console.log('Trocar trecho do texto por ', 'QWERTY'.replace('QWE', 'VBN'));
console.log('Retorna um trecho de um texto [-1 eh o ultimo valor]: ', 'QWERTY'.slice(-1)); 
console.log('Retornar valor de um texto [0 a 2 do primeiro ao terceiro]:', texto.slice(0, 2));
console.log('Retornar valor de um texto [Tudo] :', texto.slice(0, texto.length)); //ou -texto.length
console.log('Retornar valor de um texto a partir de uma determinada posicao :', texto.substr(1, 4));
console.log('Separar Letras de uma String :', texto.split(''));
console.log('Inverter Letras de uma String :', texto.split('').reverse().join(''));
console.log('');
console.log('-----------------------------------------------------------------------------------------------------');
console.log('');
console.log('tipo Null - diferencas null e typeof e undefined');
console.log(null);
console.log(typeof null);
console.log(undefined);
console.log(typeof undefined);
console.log('');
console.log('-----------------------------------------------------------------------------------------------------');
console.log('');
console.log('Objetos:    ');
var user = {
    name: 'Hiago',
    idade: 24

};
console.log(user.name);
user.last_name='Riba Guedes';
console.log(user.name, user.last_name);
console.log(user);
console.log('Transforma em array somente as propriedades', Object.keys(user));
console.log('Transforma em array os atributos', Object.values(user));
console.log('Transforma em array- propriedade atributo', Object.entries(user));
//Para nao alterar as propriedades e atributos de um objeto eu faco Object.freeze(new_obj) o Object.seal(new_obj) permite so que altere a propriedade



