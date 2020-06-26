//Buscar pacientes que estão em um servidor externo e que tem o endereço
//https://api-pacientes.herokuapp.com/pacientes e ele está em um pacote json

var buscar =document.querySelector("#buscar-paciente");

buscar.addEventListener("click", function(){
    
    var xhr =new XMLHttpRequest();// crio um novo objeto capaz de fazer requisições http de um arquivo xml ou outros como o json

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //abre requisição GET para o link
    xhr.addEventListener("load",function(){ //se o arquivo estiver carregado
        //console.log(xhr.responseText);// coloca no console todo o texto presente no link
        var erro = document.querySelector('.erro-servidor'); // exporto as propriedades do span que eu coloquei em cima do botão no html para mostrar na tela algum erro de conexão

        if(xhr.status==200){//se o status da comunicação for ok (codigo 200) faça toda a adição de conteúdo na tabela

            var resposta =xhr.responseText;
            //console.log(typeof resposta); // diz que o que recebemos é uma string, o nome é JSON (javaScript Object Notation) e é uma forma de transportar dados pela web
            //console.log(resposta);
            var pacientes = JSON.parse(resposta); // por ser um json nós conseguimos facilmente traduzir, converter, parsear para algo que o js entenda
            //console.log(pacientes);
            //console.log(typeof pacientes); // diz que a tradução desse texto nos deu um objeto.
    
            pacientes.forEach(function(paciente){
                //console.log(paciente);
                var pacienteTr = setaPacienteTr(paciente); // transformo cada um dos objetos em uma tr
                adicionaNaTabela(pacienteTr); // adicionamos na tabela
            });
            erro.classList.add("esconde"); //tira a classe de esconder no span caso tenha dado algum erro antes

        }else { // senão printa no console e na tela uma mensagem de erro, como o erro 404
            console.log('Status da requisição HTTP: '+xhr.status); // printa no console qual o erro dado
            erro.classList.remove("esconde"); // não esconde a mensagem
            erro.classList.add("mensagem-erro");//mostra que deu erro com a letra vermelha
            erro.textContent=`Erro com a comunicação com o servidor Erro: ${xhr.status}`; // diz qual a mensagem desse erro com o código dado
        }

    });
    xhr.send(); // envia a requsição
});