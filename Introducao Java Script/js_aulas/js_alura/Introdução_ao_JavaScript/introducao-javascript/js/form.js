botaoAdd.addEventListener("click",function(event){
    event.preventDefault();//previne o comportamento padrão do botão que é de zerar os campos da página e recarregar a página
    var form=document.querySelector("#form-adiciona");//pega toda o codigo do form
    
    var paciente =obtemPaciente(form);//retira as propriedades de um paciente no form
    var pacienteTr = setaPacienteTr(paciente);//coloca tudo dentro de uma Tr para mim
    var tabela =adicionaNaTabela(pacienteTr);//adiciona na tabela
    form.reset(); //reseta os inputs
});

function obtemPaciente(form){

    var paciente= {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.altura.value,
        imc : calculaImc(form.peso.value,form.altura.value)
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
    var td = document.createElement("td");
    td.textContent = valor;
    td.classList.add(nomeClasse);

    return td;
}