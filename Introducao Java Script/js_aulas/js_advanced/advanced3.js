//Symbols e Interators

let ID= Symbol('Eae');

console.log(ID);

console.log();

var obj={
    [ID]:'Eae'
}

console.log(obj);
console.log(Object.getOwnPropertySymbols(obj));

const arr=[10,20,30,40,50];

const it =arr[Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

//Generators- funçao com pausa (yield)

function* flamengo(){
console.log('O');
yield;

console.log('flamengo');
yield 2;

console.log('é');
yield 3;

console.log('seleção');
yield 4;

console.log('POOORRAAAAAAA');
}

const it1= flamengo();

console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
console.log(it1.next());
