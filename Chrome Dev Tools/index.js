var corpo = document.querySelector("body");
var paleta=document.querySelector("#paleta");
corpo.style.color=paleta.value;
paleta.addEventListener("input",function(){
    corpo.style.color=paleta.value;
});

console.groupCollapsed("Grupo de mensagens");

console.warn("Warn 1");
console.error("Erro 1 ");
console.log("Mesnsagem");

console.groupEnd();

console.table([
    [10,20,30],
    [45,55,65]
]);

console.table([
    {Aluno:"Hiago" ,curso: "Introdução JS"},
    {Aluno:"Aline" ,curso: "Node.js"},
    {Aluno:"Fabio" ,curso: "Lógica de Programação"}
])

