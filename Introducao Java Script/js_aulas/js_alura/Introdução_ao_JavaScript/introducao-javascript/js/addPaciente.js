function adicionaPaciente(nome,peso,altura,gordura){ // objetivo de criar aleatoriamente usuários em js para testar a tabela mesmo

    var paciente = Paciente(nome,peso,altura,gordura);//retira as propriedades de um paciente no for
    var pacienteTr = setaPacienteTr(paciente);//coloca tudo dentro de uma Tr para mim de forma já estruturada, código no principal.js
    adicionaNaTabela(pacienteTr);//adiciona na tabela

}

function Paciente(nome,peso,altura,gordura){ //inves de usar os dados do input eu crio um informando os dados
    var paciente= {
        nome: nome,
        peso: peso,
        altura: altura,
        gordura: gordura,
        imc : calculaImc(peso,altura)//aqui
    };

    return paciente;
}

adicionaPaciente('Zé',65,1.77,15); // assim seria a criação de um paciente via js, mas criar na mão seria anti-produtivo e repetitivo

function createPaciente(){ // então eu crio a partir de uma lista de nomes
    var nomes=['Sérgio','Luis Maurício', 'Maria Vitória', 'Lucia', 'Carlos', 'Kazuma Kiryu' , 'Ana Carolina', 'Hiago', 'Alex', 'Lucas Silva','Julia Silva']; //não sei se tem como pegar de 
    //lista pronta da internet

    nomes.forEach(function(nome){//para cada nome crie um cliente com dados aleatorios a cada F5 na página
        adicionaPaciente(nome,randomPeso(),randomAltura(),randomGordura());
    });
    
}

function randomAltura(){ // funções que criam altura, peso e gordura randomicamente
    return (Math.random() *(maxAltura-minAltura) +minAltura).toFixed(2);
}
function randomPeso(){
    return (Math.random() *(maxPeso-minPeso) +minPeso).toFixed(2);
}
function randomGordura(){
    return (Math.random() *(maxGordura-minGordura) +minGordura).toFixed(0);
}

createPaciente(); // cria todos os pacientes na tabela
