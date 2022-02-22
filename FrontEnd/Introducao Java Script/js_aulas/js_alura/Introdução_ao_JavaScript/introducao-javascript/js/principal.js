var titulo=	document.querySelector(".titulo");
titulo.textContent ='Aparecida Nutricionista | Página de Cálculo de IMC dos Clientes';

var pacientes = document.querySelectorAll(".paciente"); //coloco o identificador em um pacientes especifico, cujo todos os dados tão na tag tr da table e chamos sua linha de código com querySelction

var minAltura=0.5;
var maxAltura =3;
var minPeso=30;
var maxPeso=200;
var minGordura=0;
var maxGordura=55;

for(let i=0;i<pacientes.length;i++){

var peso = pacientes[i].querySelector(".info-peso").textContent;// chamos o seu texto que está dentro do código na classe info-peso
// o peso é chamado dentro do for pois a cada iteração o texto do peso é atualizado
var altura =pacientes[i].querySelector(".info-altura").textContent;//chamo o texto da altura a cada iteração
var gordura =pacientes[i].querySelector(".info-gordura").textContent;
let pesoValido=true;//sempre seto os booleanos para true a cada iteração, assim tenho certeza que o mesmo procedimento é feito com segurança
let alturaValido=true;  

if(!validaPeso(peso)){//condições pro peso estar dentro
        pesoValido=false;
        pacientes[i].classList.add("paciente-invalido");//classe especificada no css
        console.log('erro peso');
    }

    if(!validaAltura(altura)){//condições normais da altura de um ser humano
        alturaValido=false;
        pacientes[i].classList.add("paciente-invalido");//classe criada no css
        console.log('erro altura');
    }
    if(!validaGordura(gordura)){
        pacientes[i].classList.add("paciente-invalido");//classe criada no css
        pacientes[i].querySelector(".info-gordura").textContent='Gordura Inválida';
        console.log('erro gordura');
    }
    
    if(alturaValido && pesoValido){
        var calculo_imc= calculaImc(peso,altura);// calculo o imc
        pacientes[i].querySelector(".info-imc").textContent = calculo_imc; 
        } else  if(!alturaValido && !pesoValido){
            pacientes[i].querySelector(".info-imc").textContent='Altura e Peso Inválidos';//se os dois dados estiverem inválidos eu digo que os dois estão inválidos
        } else {
            if(!alturaValido) pacientes[i].querySelector(".info-imc").textContent='Altura Inválida';
            if(!pesoValido) pacientes[i].querySelector(".info-imc").textContent='Peso Inválido';
    }
}


function calculaImc(peso,altura){
    var imc=0;
    imc=peso/(altura*altura);
    return imc.toFixed(2); //toFixed limita o imc para dois digítos
}

var tituloPag =document.querySelector(".titulo_pag");

tituloPag.addEventListener("click",function(){
    console.log("Koe!");
});

var botaoAdd=document.querySelector("#adicionar-paciente");

//funções de validação-- talvez eu mude para retorno mais de um valor e faça um switch case no verificaErros do forms

function validaAltura(altura){

    if(altura >= minAltura && altura < maxAltura){
        return true;
    }else{
        return false;
    }
}

function validaPeso(peso){
    if(peso >= minPeso &&  peso <= maxPeso){
        return true;
    }else {
        return false;
    }
}

function validaGordura(gordura){
    if(gordura > minGordura && gordura < maxGordura){
        return true;
    }else{
        return false;
    }
}

function validaNome(nome){
    if(nome.length==0){
        return false;
    } else {
        return true;
    }
}