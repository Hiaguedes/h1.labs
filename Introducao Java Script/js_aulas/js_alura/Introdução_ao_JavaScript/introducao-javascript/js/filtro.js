var filtro = document.querySelector("#filtro");//exporto todas as caracteristicas do campo que vem antes da tabela

filtro.addEventListener("input",function (){
   // console.log(this.value); //função que mostra tudo que estou digitando no filtro
   var paciente = document.querySelectorAll(".paciente"); //crio internamente um paciente para que não ocorra problema caso eu tire do principal.js

   if(this.value.length>0){ //se existe algo escrito no campo de busca comece a pesquisar
    for(let i=0; i<paciente.length;i++){//para cada paciente presente na lista
        var tdNome = paciente[i].querySelector(".info-nome");//pega o código td do campo de nome de cada tr de paciente
        var nome= tdNome.textContent;//extraia o valor do nome
        var exp = new RegExp(this.value,"i"); //busca tanto maiusculo quanto minusculo com i, aqui que ocorre a magia do filtro

        if(exp.test(nome)){ //testa de esse nome digitado é igual a algum nome presente na tabela
            paciente[i].classList.remove("esconde");//se sim tira a classe em css que esconde o campo
        }else {
            paciente[i].classList.add("esconde");//se não for igual então esconde ela, para que foquemos somente no que estamos pesquisando
        }
    }
   }else{//se não existe algo escrito no campo de busca
    for(let i=0; i<paciente.length;i++){
        paciente[i].classList.remove("esconde");//faça questão que não há classe de esconder o campo senão não conseguimos ver todos as linhas da tabela para sempre
    }
   }

});