//console.log(pacientes); //já tenho o html dos pacientes pelo principal.js

var tabela= document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick",function(event){ //evento de duplo clique

    //console.log(event.target);//não confunda, this nos dá o responsável pelo evento
    //o target é o elemento interno dentro do this, pois a tendencia do eventListener é ir subindo
    
    var alvoEvento =event.target;//com o evento de clique eu garanto que pego
    //todo mundo que está na tabela naquele momento do clique
    var paiDoAlvo=alvoEvento.parentNode;// na verdade eu não quero o elemento em si e sim no pai dele, pois quero excluir a linha não o elemento
    
    paiDoAlvo.classList.add("fade-out"); // adiciono a classe do css no elemento que quero deletar

    setTimeout(function(){ //setTimeout, coloco um tempo para a função acontecer
        paiDoAlvo.remove();
    },500); // tempo em ms
});

/*
pacientes.forEach(function(paciente) {
    paciente.addEventListener("dblclick",function(){
        //console.log(this);//mensagem de debug
        this.remove(); //o this é uma palavra propria do js que nos diz qual o elemento
        //que chamou aquela função

        //essa função tem um problema pois toda vez que eu adiciono uma pessoa nova
        // essa pessoa não está dentro do EventListener, pois ela foi adicionada depois
        //do html ter sido finalizada
    });
}); 

*/