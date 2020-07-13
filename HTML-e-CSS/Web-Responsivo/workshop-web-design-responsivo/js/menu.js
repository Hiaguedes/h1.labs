document.querySelector(".menu-abrir").addEventListener("click",function(){
    document.documentElement.classList.add("menu-ativo"); //adiciona um classe na tag html, poderia alterar o body sem problema
});

document.querySelector(".menu-fechar").addEventListener("click",function(){
    document.documentElement.classList.remove("menu-ativo"); 
})

document.documentElement.onclick = function(event) { // para ser possível clicar fora do menu e fechar o menu
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('menu-ativo');
    }
};