var titulo=	document.querySelector(".titulo");
titulo.textContent ='Aparecida Nutricionista | Página de Cálculo de IMC dos Clientes';

var pacientes = document.querySelectorAll(".paciente"); //coloco o identificador em um pacientes especifico, cujo todos os dados tão na tag tr da table e chamos sua linha de código com querySelction

for(let i=0;i<pacientes.length;i++){

var peso = pacientes[i].querySelector(".info-peso").textContent;// chamos o seu texto que está dentro do código na classe info-peso
// o peso é chamado dentro do for pois a cada iteração o texto do peso é atualizado
var altura =pacientes[i].querySelector(".info-altura").textContent;//chamo o texto da altura a cada iteração
let pesoValido=true;//sempre seto os booleanos para true a cada iteração, assim tenho certeza que o mesmo procedimento é feito com segurança
let alturaValido=true;  

if(peso <= 0 || peso >= 700){//condições pro peso estar dentro
        pesoValido=false;
        pacientes[i].classList.add("paciente-invalido");//classe especificada no css
    }

    if(altura<=0.5 || altura >3){//condições normais da altura de um ser humano
        alturaValido=false;
        pacientes[i].classList.add("paciente-invalido");//classe criada no css
    }

    if(alturaValido && pesoValido){
    var calculo_imc=peso/(altura*altura);// calculo o imc
    pacientes[i].querySelector(".info-imc").textContent=calculo_imc.toFixed(2); //toFixed limita o imc para dois digítos
    } else  if(!alturaValido && !pesoValido){
        pacientes[i].querySelector(".info-imc").textContent='Altura e Peso Inválidos';//se os dois dados estiverem inválidos eu digo que os dois estão inválidos
    } else {
        if(!alturaValido) pacientes[i].querySelector(".info-imc").textContent='Altura Inválida';
        if(!pesoValido) pacientes[i].querySelector(".info-imc").textContent='Peso Inválido';
    }
}