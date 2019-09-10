//Arrow functions

var sum = (a, b) => a + b;

console.log(sum(3, 2));

var comparar=(a, b) => {
    if (a > b) { console.log(a, ' eh maior que ', b) } else
        if (b > a) { console.log(b, ' eh maior que ', a) } else
            if (b == a) { console.log('Os dois numeros sao iguais!')}
};
comparar(2, 4);

var time_ou_selecao = (text='default') => {
    
    if (text == 'flamengo' || 'Flamengo') { console.log(text, 'e selecao porra!') }else 
        if (text == 'vasco' || 'Vasco' || 'Vice da Gama' || "vice" || 'Vice') { console.log(text, 'e timinho!') }
};

time_ou_selecao('flamengo');

// Nao pode criar objetos e nem ter hoisting com arrow functions

setTimeout(() => {
    console.log('E ai! Entrei atrasado?');
}, 1000);
