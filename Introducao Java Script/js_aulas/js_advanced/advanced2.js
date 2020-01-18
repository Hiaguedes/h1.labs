//Utilizando o Operator ...

function soma(...args){
  return args.reduce((acc,value)=> acc+value,0);
 }

 console.log(soma(3,6,7,9,11.3,7));
 console.log(soma(1,2,4,-5));

 function multiplica_e_soma(a,b,...rest){
     return a*b+ rest.reduce((acc,value)=> acc+value,0);
 }

 console.log(multiplica_e_soma(2,6,7,8,2,-1,-Math.PI));

 arr=[1,2,3,4];
 console.log(arr,' , ',...arr);

 arr1=[0,1,1,0,1];

 arr2=[...arr,...arr1];

 console.log(arr2);

 //Destructuring

 console.log('');

[var1,var2,var3]=['Apple','Banana','Orange'];

//Válido para n dimensoes

 console.log(var1,var2,var3);

 var Pessoa={
   nome: 'Hiago',
   Rg: '123456789-0'
 }

 var {nome}=Pessoa;
 var {Rg}=Pessoa;

 var {nome: nome2}=Pessoa; //outra forma 

 //declarar que é var

 console.log(nome, Rg);
 console.log(nome2);

 var Pessoa1={
nome: 'Lauro',
Rg: 124356789-0,

props:{
  idade: 25,
  peso: 85,
  notas: [77,62,89,51,70]
}

 }

 var {props:{idade}}=Pessoa1;
 var{props:{notas:[Matemática,Física,Química,Português,Geografia]}}=Pessoa1;

 console.log(idade);
 console.log(Matemática,Português); 

 let [one, two, three, four] = ['Digital', 'Innovation', 'One'];
 console.log(four);