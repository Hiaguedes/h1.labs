//Arrow functions

var sum = (a, b) => a + b;

console.log(sum(3, 2));

var comparar=(a, b) => {
    if (a > b) { console.log(a, ' eh maior que ', b) } else
        if (b > a) { console.log(b, ' eh maior que ', a) } else
            if (b == a) { console.log('Os dois numeros sao iguais!')}
};
comparar(2, 4);

var time_ou_selecao = text => {
    
(text==('flamengo' || 'Flamengo')) ? (console.log('flamengo é seleção porraaaa')) : (console.log(text,'é timinho'))
};

time_ou_selecao('vasco');

console.log(' ');
// Nao pode construir objetos e nem ter hoisting com arrow functions

setTimeout(() => {
    console.log('E ai! Entrei atrasado?');
}, 1000);
