var array = [1, 2, 3];
var array1 = new Array(1, 2, 3);
var array2 = Array.of(1,2,3)
console.log('Formas de se criar um Array: ', array, array1, array2)

array = ['João', 'Carlos', 'Clarisse']
array1 = Array.of('Emilia', 'Jonas', 'Gabriel')
array2 = Array('Caio', 'Daniela', 'Jorge')
console.log('aceita qualquer coisa: ', array, array1, array2)

console.log();
const array3 = new Array(3);
console.log('array(x) cria x elementos vazios em um array de uma linha: ', array3, '| Tres undefineds :', array3[0]);
console.log();

var i= array3.push(4);
console.log('Comando push adiciona um elemento no final do array: ', array3, 'Tamanho do novo array: ', i);
console.log();

i = array1.pop();
console.log('O camando pop retira o ultimo elemento do array e ele retorna o seu valor', array1, '| Valor Retornado: ', i);
console.log();

i = array.unshift(10);
console.log('Unshift coloca no comeco do vetor: ', array, 'Retorna o tamanho do novo vetor: ', i);
console.log();

i = array2.shift();
console.log('Shift retira o primeiro elemento do vetor: ',array2,'E retorna o valor Retirado: ',i);
console.log();

var array4 = array.concat(array2);
console.log('Concatenando dois vetores formando um novo: ', array4);
console.log();

console.log('Fatiar um Array: ', array4.slice(1, 5));
console.log();

//splice
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
arr.splice(8);
console.log('Splice determina quais indexes eu quero que fiquem: ',arr);
arr.splice(1, 1, 'foo');
console.log('Ou posso adicionar um novo elemento e excluir n elementos apos a posicao desse elemento: ', arr) //Retorna os elementos retirados
console.log();

arr.forEach((value, index) => {
    console.log(value,index);
});
console.log();
console.log('O comando map altera o valor inteiro de um array seguindo uma regra: ', arr.map(value => value + 2));
console.log();

var arr1 = [1, 2, [2, 4, 5], [1, 9]];
console.log('[Flat] Vetor a ser niverlado: ', arr1, 'Profundidade 1: ', arr1.flat());
 arr1 = [1, 2, [2, 4, 5, [1, 9]]];
console.log('[Flat] Vetor a ser niverlado: ', arr1, 'Profundidade 1: ', arr1.flat(),'Profundidade 2: ',arr1.flat(2));

arr1 = arr1.flat(2);

console.log('flatMap junta as caracteristicas do flat e do Map: ', arr1.flatMap(value => value * 2), 'Ainda pode fazer isso: ', arr1.flatMap(value => [[value * 2]]));

console.log('Funcao largura podendo ser chamada: ',arr1.length);
arr1 = arr1.keys();
console.log('.keys() faz com que o vetor se torne um array interavel, sabendo onde se está onde termina ele: ',arr1);
console.log('Abrindo a possibilidade de se avancar nele e acompanhar seu progresso[valores dos indices]: ', arr1.next(), arr1.next(), arr1.next());
console.log('Funcao largura nao podendo mais ser chamada: ', arr1.length);

arr1 = [1, 2, 2, 4, 5, 1, 9];
arr1=arr1.values();
console.log('Valores dos atributos: ', arr1.next(), arr1.next(), arr1.next());

arr1 = [1, 2, 2, 4, 5, 1, 9];
var x = arr1.find(value => value>5);
console.log('Achar o primeiro valor no array que satisfaz alguma condicao: ',x); 
var x = arr1.findIndex(value => value > 5);
console.log('Achar o primeiro index no array que satisfaz alguma condicao: ', x); 
console.log('Caso queira todos os valores que satisfazem a condicao:', arr1.filter(value => value > 4));
console.log('Primeiro index que encontro o conteudo [2]: ', arr1.indexOf(2), 'Ultimo Index: ', arr1.lastIndexOf(2));
console.log('Determinado conteudo encontra-se no array? :', arr1.includes(4), arr1.includes(6));
console.log('Retorna em booleaono um valor condicional: ', arr1.some(value => value % 2 ==0), arr1.some(value => value>10));

var student = [{ nome: 'Caio', nota: 7 }, {nome:'Andre',nota:3}, {nome:'Andressa',nota:6.2}, {nome:'Flavio',nota:8.5}];
console.log('Exemmplo de Estudantes que tiveram nota para ser aprovado: ', student.filter(student => student.nota >= 7));
console.log('Todos os valores satisfazem uma condicao? :', arr1.every(value => value % 2 == 0), arr1.every(value => value < 10));
console.log('Ordenacao: ', student.sort((current, next) => current.nota - next.nota));
console.log('Outra Ordenacao: ', student.sort((current, next) => next.nota - current.nota));
console.log('Inverter Valores de um vetor:', arr1.reverse());
console.log('Se cquiser concatenar os valores de um array em um unico elemento so: ', arr1.join(), ' | ', arr1.join('-'));
console.log('Somar todos os valores de um array: ', arr1.reduce((total, value) => total += value, 0));
console.log('Media dos alunos: ',student.reduce((total,student) => total += student.nota,0)/student.length);
