let arr = [3, 5, 7];
console.log('Array: [3,5,7]');
arr.foo = "hello";

for (let i in arr) {
    console.log('Indice: ',i);

};
console.log();
for (let i of arr) {
    console.log('Valor: ',i);

};
console.log();
console.log('continue tem poder de pular iteracoes no laco de repeticao: ');
let arr1 = [0, 1, 2, 3, 4, 5, 6];
for (let i = 0; i < arr1.length;i++) {
    const x = arr1[i];
    if (i == 2) { continue; }

    console.log(x);
};
console.log('break tem poder de sair do laco de repeticao');
i = 0;
while (1) {
    i++;
    console.log(i);
    if (i == 10) { break };
    
};
console.log();
console.log('--------------------------------------');
console.log();
console.log('Currying -> consegue usar o valor retorno de uma funcao como uma funcao assim como seus valores armazenados');

function soma(a) {
    return function (b) {
        return a + b;
    }
}

const soma2=soma(2);
console.log(soma2(2));
console.log(soma2(3));
console.log(soma2(4));
console.log(soma2(78));
console.log(soma2(Math.PI));

console.log();
console.log('--------------------------------------');
console.log();

console.log('Hoisting ou Levantamento -> Levanta variaveis e funcoes');

function foo() {
    console.log(text,'Note que ele nao da erro!');
    var text = 'Olá!';
    console.log(text);
}

foo();

var x = 1;
console.log(typeof(x));