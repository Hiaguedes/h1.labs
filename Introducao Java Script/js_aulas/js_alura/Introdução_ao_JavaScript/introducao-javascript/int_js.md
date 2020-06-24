# Introdução

O javaScript (na web) servepara manipularmos páginas estáticas (que tem o css e o html prontos) e deixar-la mais funcional ou até mais animada.

## Boas práticas

Sempre abrir uma tag `<script>` para começar a escrever seus códigos em js, de preferência no final da página (seja depois do main, depois do body ou até mesmo depois da html) e fazer seu source para uma pasta js dentro dessa tag como em

```html
<script src="js/principal.js"></script>
```

Dessa forma conseguimos separar os mundos html do js e editar o conteúdo da página com uma maior limpeza

Para chamar uma tag de html e começar a editar suas propriedades podemos chamar a `querySelector`, `getElementById` ou `getElementByClassName`, prefira sempre classes e use querySelector (para passar um elemento em css) ou somento o nome com ClassName

Sempre que der separe funções diferentes em arquivos js diferentes, para que não fique difícil de encontrar coisas no código, pois o js acaba sendo bastante verborrágico então seus arquivos acabam tendo muitas linhas de código.

Comentário ALURA:

A vantagem de declararmos todas as funções em um único arquivo é favorecer sua importação em nossas páginas, pois se fossem vários arquivos precisaríamos importar um a um.

Uma desvantagem dessa abordagem é que fica complicado para mais de um desenvolvedor trabalhar com o mesmo arquivo ao mesmo tempo. Se o desenvolvedor A precisa alterar a função X e o desenvolvedor B a função Y o risco do trabalho ser perdido quando o arquivo for atualizado é grande. Mesmo com ferramentas de versionamento de código o desenvolvedor terá que resolver conflitos que são bastantes comuns nessa abordagem.

Outro ponto é o seguinte. Se das 100 funções declaradas no arquivo apenas um necessitar manutenção, caso o desenvolvedor cometa algum erro de sintaxe, isso comprometerá todas as funções, pois nada será mais carregado. Sendo assim, as chances de introduzir problemas quando for resolver um são bem maiores.

Quando temos arquivos separados, cada arquivo possui uma responsabilidade e uma ou mais funções que fazem sentido naquela responsabilidade. Por exemplo, podemos ter um arquivo chamado conversao.js e nele termos funções que convertem valores monetários com R$ para números, e números para o formato com R$. Além disso, se separamos outras funcionalidades por arquivo, quando alterarmos esses arquivos, se cometermos algum erro, apenas uma ou mais funções do arquivo serão comprometidas e o restante dos outros arquivos poderão ser carregados sem problema (a não ser que um arquivo dependa do outro).

Por fim, assim como na vida real geralmente guardamos peças de roupas por categorizações que julgamos satisfazerem nossa organização, separar arquivos por grupos comuns também nos ajuda a encontrar e dar manutenção em nosso código.

## O document

O document é um elemento editável pro java script que contém todas as tags, classes e ids do html e com ele eu consigo manipular a página.

## Validação de formulários

Bem, é bom se previnir contra alguns erros de desenvolvedor, tipo não existe peso e altura negativa e nem alguém que pese 1000 kg e nem ninguém que mede 3 m (ao menos por enquanto que o recorde é 2.67 m) então uma forma de prevenir esses erros é com if e else da seguinte forma

```js
let pesoValido=true;
let alturaValido=true;
var calculo_imc=0;

if(peso <= 0 || peso >= 700){
    pesoValido=false;
}

if(altura<=0.5 || altura >3){
    alturaValido=false;
}

if(alturaValido && pesoValido){
var calculo_imc=peso/(altura*altura);// calculo o imc
paciente.querySelector(".info-imc").textContent=calculo_imc;
} else  if(!alturaValido && !pesoValido){
    paciente.querySelector(".info-imc").textContent='Altura e Peso Inválidos';
} else {
    if(!alturaValido) paciente.querySelector(".info-imc").textContent='Altura Inválida';
    if(!pesoValido) paciente.querySelector(".info-imc").textContent='Peso Inválido';
}

```

Atenção que o query selector só retorno um elemento e para mais elementos?

## Replicando validação

Seria muito chato e infeliz se cada usuário na tabela tivesse que receber um código extremamente igual ao anterior só mudando um pouquinho as variáveis, seria mais interessante fazer um loop onde eu pudesse olhar todas os pacientes de uma vez só. Para selecionar mais de um elemento com a mesma classe eu uso o `querySelectorAll`

## E se eu quero mudar um estilo no js?

Estilo é problema de css né? Então resolva pelo css e chame no js, para isso existe a `ClassList` onde se eu chegar numa determinada condição para chamar uma classe no css eu a chamo como em 

```js
pacientes[i].classList.add("paciente-invalido");//classe criada no css
```

Onde eu pinto a linha toda de vermelho, mas se tiver que ser via js dá para você alterar com `.style.backgroundColor` (nomes compostos estão com camelCase, tal como border-radius é borderRadius)

Quando selecionamos um elemento com as funções de querySelector, elas nos devolvem um objeto que tem algumas propriedades especiais, que falam sobre as características do HTML selecionado. Uma dessas propriedades é a .classList, que como o nome indica nos mostras classes que aquele HTML tem. e adicionamos a classe do css e não precisa de . antes do nome tal como no querySelector

## Event Listener

Uma maneira de eu interagir com o usuário é no caso de eu esperar um evento, e com esse evento (que pode ser apertar um botão, ou até mesmo descer a página) eu posso mostrar ao usuário coisas bem legais, uma forma simples de colocar um evento é com:

```js
var tituloPag =document.querySelector(".titulo_pag");

function falaQueEuTeEscuto(){
    console.log("Koe!!");
}

tituloPag.addEventListener("click",falaQueEuTeEscuto);
```

Com função anonima eu posso fazer:

```js
var tituloPag =document.querySelector(".titulo_pag");

tituloPag.addEventListener("click",function(){
    console.log("Koe!");
});
```

### Funções anônimas

O Javascript possuí dois tipos de funções, as funções anônimas e as funções nomeadas.

As funções nomeadas, como o próprio nome diz, são as funções que levam um nome em sua criação e que podem ser invocadas posteriormente, como a função mostraMensagem:

```js
function mostraMensagem(){
    console.log("Fui clicado");
}
```

Já as funções anônimas, são funções que não tem nome e só são chamadas no contexto aonde foram declaradas. Elas são muito usadas em conjunto com a função addEventListener(), onde normalmente a ação que desejamos chamar só deve ser chamada naquele local.

```js
titulo.addEventListener("click", function(){
    console.log("Fui clicado");
});
```

Ela é do tipo anonima poe que não ha nenhum nome atrelado a ela, ela é útil pois ela só é chamada nesse contexto não tendo uma necessidade de replicar ela.

## Botões dentro de um form

Por padrão os botões dentro de uma tag form zeram todas as inputs e recarregam a página (independente de terem a tag submit ou não).

O comportamento padrão de um form, quando clicamos em um button ou em um input submit, que está dentro dele, é enviar os dados e recarregar a página. Por isso, a página de Jéssica sempre recarrega quando o usuário clica no botão.

Para evitarmos este comportamento, devemos chamar a função do Javascript que previne o comportamento padrão de certos elementos: `event.preventDefault`.

Adicionaremos `event.preventDefault` dentro da função anônima chamada pelo evento click da função:

```js
botao.addEventListener("click", function(event){
    event.preventDefault();

    console.log(form.tarefa.value);
    //Código para adicionar na lista de tarefas
});
```

Observe que passamos `event` como parâmetro da função. Com isso, incluímos um parâmetro que está sempre presente nas funções executadas quando ocorre um evento.

Como nem sempre `event` é usado, às vezes, é desnecessário passá-lo para a função. Mas neste caso, é ele quem contém a função `.preventDefault()`, na qual estamos interessados, logo, precisaremos passá-lo como parâmetro.

Um detalhe interessante é que em certos navegadores, mesmo sem receber o event como parâmetro, a função `event.preventDefault()` continua funcionando. Isto é uma peculiaridade de certos navegadores modernos, e pode ser que navegadores mais antigos funcionem de forma diferente.

Se nosso objetivo é escrever um código seguindo as boas práticas do mercado, devemos sempre usar event como parâmetro e as funções que são chamadas pelos eventos.

### Extraindo dados de um input

Primeiro temos que extrair todo o código forms do html e depois guardar o valor de cada input com o value como em:

```js
    var form=document.querySelector("#form-adiciona");//pega toda o codigo do form

    var nome=form.nome.value;//pega os valores dentro de todos os input (supondo que os valores foram escritos, se certique de ter o required no html)
    var altura=form.altura.value;
    var peso=form.peso.value;
    var gordura=form.gordura.value;
```

Não esqueça de adicionar no html os arquivos externos js que você for usar

Sempre crie funções que você for reutilzar em outras partes de código

## Criando elementos html em js

Primeiro temos que criar o elmento tr que dá toda a linha do html com uma classe embutida e para isso fazemos

```js
    var pacienteTr = document.createElement("tr");//cria uma tag tr em paciente
    pacienteTr.classList.add("paciente");// coloca a class css pra tag
```

Além de todas as colunas

```js
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
```

E aí passo o valor do input para elas

```js
    nomeTd.textContent=nome; //diz quanto vale
    alturaTd.textContent=altura;
    gorduraTd.textContent=gordura;
    pesoTd.textContent=peso;
```

E aí eu digo que todas as tags td estão dentro de tr, ou seja que são filhas de tr

```js
    pacienteTr.appendChild(nomeTd);//coloca as tags td dentro da tag tr, ou seja td são filhos de tr
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);

```

Para depois dizer que toda a tag tr pertence a tabela de pacientes (que eu preciso ter todo o código dela, lembre-se que tenho o código do forms mas da tabela propriamente dita ainda não)

```js
    var tabela=document.querySelector("#tabela-pacientes");// pega todo o código html da tabela
    tabela.appendChild(pacienteTr);//o tr de paciente é filho da tabela
```
