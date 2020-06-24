botaoAdd.addEventListener("click",function(event){
    event.preventDefault();//previne o comportamento padrão do botão que é de zerar os campos da página e recarregar a página
    var form=document.querySelector("#form-adiciona");//pega toda o codigo do form
    
    var paciente = obtemPaciente(form);//retira as propriedades de um paciente no form

    var mensagens= verificaErros(paciente);//faz a verificação dos dados no input
    console.log(mensagens);

    if(mensagens.length>0){
        exibeErros(mensagens);//se tiver alguma mensagem de erro, printe ela
        return false;
    }
    document.querySelector(".mensagem-erro").innerHTML="";
    
    var pacienteTr = setaPacienteTr(paciente);//coloca tudo dentro de uma Tr para mim
    var tabela = adicionaNaTabela(pacienteTr);//adiciona na tabela
    form.reset(); //reseta os inputs
});

function obtemPaciente(form){//pega os elementos da tabela (o imc é calculado aqui)

    var paciente= {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc : calculaImc(form.peso.value,form.altura.value)//aqui
    };

    return paciente;
}

function setaPacienteTr(paciente){
    var pacienteTr = document.createElement("tr");//cria uma tag tr em paciente
    pacienteTr.classList.add("paciente");// coloca a class css pra tag

    pacienteTr.appendChild(setaTd(paciente.nome,"info-nome"));//coloca as tags td dentro da tag tr, ou seja td são filhos de tr
    pacienteTr.appendChild(setaTd(paciente.peso,"info-peso"));//tem que ser na ordem da tabela aqui
    pacienteTr.appendChild(setaTd(paciente.altura,"info-altura"));
    pacienteTr.appendChild(setaTd(paciente.gordura,"info-gordura"));
    pacienteTr.appendChild(setaTd(paciente.imc,"info-imc"));

    //console.log(pacienteTr); // apenas mostra o código html bonitinho no console
    return pacienteTr;
}

function adicionaNaTabela(pacienteTr){
    var tabela=document.querySelector("#tabela-pacientes");// pega todo o código html da tabela
    tabela.appendChild(pacienteTr);//o tr de paciente é filho da tabela
    return tabela;
}

function setaTd (valor,nomeClasse){
    var td = document.createElement("td"); //crio elemento td na tabela
    td.textContent = valor;//seta seu valor
    td.classList.add(nomeClasse);//atribuo a classe pertencente a ela

    return td;
}

function verificaErros(paciente){
    var erros=[];

    if(!validaAltura(paciente.altura)) erros.push('Altura Inválida');//se tiver erro de altura, addiciona ela na matriz de erro
    if(!validaPeso(paciente.peso)) erros.push('Peso Inválido');
    if(!validaGordura(paciente.gordura)) erros.push('Gordura Inválida');
    if(!validaNome(paciente.nome)) erros.push('Nome em Branco');

    return erros;
}

function exibeErros(err){ //como exibir erros, a melhor forma é criando li's na posição no html
    var ul = document.querySelector(".mensagem-erro");//seleciono a ul do elemento no html pela sua classe
    ul.innerHTML="";// se tiver alguma coisa lá dentro apague
    err.forEach(function(error){ //para cada erro passado pelo array err
        var li =document.createElement("li");//crie um li
        li.textContent=error;// adicione seu valor
        ul.appendChild(li);//e coloque dentro da ul
    });
}