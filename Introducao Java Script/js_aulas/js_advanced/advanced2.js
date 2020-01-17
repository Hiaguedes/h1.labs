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