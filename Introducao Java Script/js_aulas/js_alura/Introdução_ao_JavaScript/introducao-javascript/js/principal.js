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

var tituloPag =document.querySelector(".titulo_pag");

tituloPag.addEventListener("click",function(){
    console.log("Koe!");
});

var botaoAdd=document.querySelector("#adicionar-paciente");

botaoAdd.addEventListener("click",function(event){
    event.preventDefault();//previne o comportamento padrão do botão que é de zerar os campos da página e recarregar a página
    var form=document.querySelector("#form-adiciona");//pega toda o codigo do form
    
    
    var nome=form.nome.value;//pega os valores dentro de todos os input (supondo que os valores foram escritos, se certique de ter o required no html)
    var altura=form.altura.value;
    var peso=form.peso.value;
    var gordura=form.gordura.value;

    //console.log(nome,altura,peso,gordura);

    var pacienteTr = document.createElement("tr");//cria uma tag tr em paciente
    pacienteTr.classList.add("paciente");// coloca a class css pra tag

    var pesoTd=document.createElement("td"); //cria uma tag td para peso
    pesoTd.classList.add("info-peso");

    var nomeTd=document.createElement("td");   //cria as tags td para as outras
    nomeTd.classList.add("info-nome");

    var alturaTd=document.createElement("td");    
    alturaTd.classList.add("info-altura");

    var gorduraTd=document.createElement("td");    
    gorduraTd.classList.add("info-gordura");

    var imcTd=document.createElement("td");    
    imcTd.classList.add("info-imc");
   
    nomeTd.textContent=nome; //diz quanto vale
    alturaTd.textContent=altura;
    gorduraTd.textContent=gordura;
    pesoTd.textContent=peso;

    pacienteTr.appendChild(nomeTd);//coloca as tags td dentro da tag tr, ou seja td são filhos de tr
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);

    console.log(pacienteTr); // apenas mostra o código html bonitinho no console

    var tabela=document.querySelector("#tabela-pacientes");// pega todo o código html da tabela
    tabela.appendChild(pacienteTr);//o tr de paciente é filho da tabela

    form.nome.value='';//zera os valores no final de tudo
    form.altura.value='';
    form.peso.value='';
    form.gordura.value='';
});


