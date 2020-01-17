//Arrow functions

var sum = (a, b) => a + b;

console.log(sum(3, 2));

var comparar=(a, b) => {
    if (a > b) { console.log(a, ' é maior que ', b) } else
        if (b > a) { console.log(b, ' é maior que ', a) } else
            if (b == a) { console.log('Os dois números são iguais!')}
};
comparar(2, 4);
comparar(3,3);

var time_ou_selecao = text => {
    
(text==('flamengo' || 'Flamengo')) ? (console.log('Flamengo é seleção porraaaa')) : (console.log(text,'é timinho'))
};

time_ou_selecao('vasco');

console.log(' ');
// Nao pode construir objetos e nem ter hoisting com arrow functions

setTimeout(() => {
    console.log('E ai! Entrei atrasado?');
}, 1000);

//Default Function Arguments

var multiplicação=(a,b=1)=>{
console.log(a*b);
};

multiplicação(3,2);
multiplicação(4);

//Enhanced Object Literals

function realizar_função_tal(){
console.log('realizou tal função');
}

var objeto_qualquer={
realizar_função_tal
};

objeto_qualquer.realizar_função_tal(); 

var obj={
subtração(a,b){
     return a-b;}
};

console.log(obj);

console.log(obj.subtração(9,4));

var nome='teste';

var obj1={
    [nome + 'concat']: 'valor'
};

console.log(obj1);

var obj3 = {
    sleep: function() {
      setTimeout(() => {
        console.log(this);
      }, 1000);
    }
  }
  
  obj3.sleep();