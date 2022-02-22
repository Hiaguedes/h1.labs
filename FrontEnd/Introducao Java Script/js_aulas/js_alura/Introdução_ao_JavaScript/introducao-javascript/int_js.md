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

Sabemos que quebrar uma grande função complexa é uma boa prática por causa de diversos fatores, mas podemos citar como os principais deles:

Dar manutenção ao código fica muito mais fácil, visto que agora podemos examinar vários pequenos blocos , que são muito mais fáceis de compreender do que um grande bloco de texto
Ao quebrar uma grande função, também estamos deixando ela com menos responsabilidades, com a meta de atingir o ideal de que cada função tenha apenas uma única responsabilidade.
O código também fica muito mais fácil de testar, pois se temos diversas funções pequenas conseguimos ir testando uma a uma em busca de erros ou bugs do código.
E por último, a legibilidade do código aumenta muito, pois dando nomes semânticos a cada uma das funções menores conseguimos deixar bem claro o que aquela parte do código deve fazer e facilita o entendimento do todo como um geral.

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

Para remover uma classe use `pacientes[i].classList.remove("paciente-invalido");`

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

## forEach

O forEach é uma maneira diferente e mais simples de iterar um array, onde não preciso criar uma variável `i` para varrer todo meu array, sua sintaxe se dá da seguinte forma

```js
var nomes = ["Douglas", "Flávio", "Nico", "Rômulo", "Leonardo"];

nomes.forEach(function(nome) {
    console.log(nome + " é instrutor da Alura");
})
```

Onde cada array tem um forEach em sua composição pelo javaScript e dentro da função anonima eu tenho que criar uma variável qualquer para ir iterando, somente isso

## innerHTML

Com a propriedade ``innerHTML``, podemos editar obter o conteúdo HTML (HTML interno) de um elemento.

Para editar o HTML interno, como o `innerHTML` é uma propriedade, utilizamos um sinal de igual `(=)`. Fazemos:

```js
ObjetoDeUmElementoHTML.innerHTML = "Novo conteúdo"
```

E para obter o HTML interno, fazemos:

```js
ObjetoDeUmElementoHTML.innerHTML
```

O seu retorno será todo o conteúdo HTML, tanto tags, atributos, classes, etc, no formato de uma String.

## this

Todo evento disparado em JavaScript possui um contexto que é acessível através da função executada quando o evento for disparado.Na função, acessamos o contexto através do objeto implícito this. Ele é uma referência para o elemento do DOM que esta recebendo o evento, logo, sua natureza é dinâmica, ou seja, se clicarmos no primeiro elemento da lista o this será o primeiro elemento, se clicarmos no último ele será o último. É a natureza dinâmica do this que nos permite utilizar a mesma função em diferentes contextos.

```js
    paciente.addEventListener("dblclick",function(){
        //console.log(this);//mensagem de debug
        this.remove(); //o this é uma palavra propria do js que nos diz qual o elemento
        //que chamou aquela função

        //essa função tem um problema pois toda vez que eu adiciono uma pessoa nova
        // essa pessoa não está dentro do EventListener, pois ela foi adicionada depois
        //do html ter sido finalizada
    });
}); 
```

Como paciente pega todas as tr's da tabela, então o this.remove aqui elinaria apenas a linha

```js
var tabela= document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick",function(event){

    console.log(event.target);//não confunda, this nos dá o responsável pelo evento
    //o target é o elemento interno dentro do this, pois a tendencia do eventListener é ir subindo

    var alvoEvento =event.target;//com o evento de clique eu garanto que pego
    //todo mundo que está na tabela naquele momento do clique
    var paiDoAlvo=alvoEvento.parentNode;
    paiDoAlvo.remove();
});
```

Se dermos uma this.remove() aqui eliminaremos a tabela então cuidado.

## RegExp

Ou expressÕes regulares, com ele conseguimos capturar texto tal como o comando `F3` que busca palavras em qualquer lugar do texto sem precisar programar a função na mão (o que seria extremamente chato)

O primeiro parâmetro que devemos passar para o construtor é o padrão (o texto da expressão regular, o que deve ser buscado) e o segundo parâmetro são uma ou mais flags (representando como queremos que a expressão regular busque). Por exemplo, podemos definir que não queremos que haja distinção entre letras maiúsculas e minúsculas, através da flag i.

Para saber mais sobre expressões regulares, há um curso bem interessante aqui na Alura, o curso Expressões regulares: Capturando textos de forma mágica.

Mas há um modo de fazer essa comparação sem a necessidade de utilizar expressões regulares! Podemos utilizar a função substring, que recebe dois parâmetros, fazendo com que ela devolva parte da string, com o tamanho definido nos parâmetros. O primeiro parâmetro é o início, começando do 0 (que representa o primeiro caractere). O segundo parâmetro define o fim (exclusivo, mostramos até o penúltimo caractere). Por exemplo:

```js
var string = "Alura";
var resultado = string.substring(1, 4);
```

Extraímos uma string que começa no segundo caractere (número 1) e termina no quarto caractere (número 3, índice anterior ao número 4). O valor da variável resultado é:

```en
lur
```

Conhecendo essa função, pense em um modo de comparar o valor digitado com parte do nome, sem utilizar expressões regulares. Veja em seguida a resposta do instrutor.

***VER OPINIÃO DO INSTRUTOR***

Como o primeiro parâmetro é o inicio, e queremos comparar desde o início da string nome, vamos utilizar como início o valor 0, ou seja, sempre a partir do primeiro caractere. Mas qual é o fim? O fim é justamente o tamanho do valor digitado:

`nome.substr(0, this.value.length);`

Podemos guardar essa string em uma variável, e compará-la com o que está sendo digitado. Caso seja falso, adicionamos a classe invisivel, se não for, removemos-a:

```js
var comparavel = nome.substr(0, this.value.length);
if (!(this.value == comparavel)) {
    paciente.classList.add("invisivel");
} else{
    paciente.classList.remove("invisivel");
}
```

Mas e a distinção entre letras maiúsculas e minúsculas? Nesse caso não temos distinção entre letras maiúsculas e minúsculas, mas para contornar isso, antes de compará-las, podemos colocar as duas strings em letras minúsculas, para efetuar a comparação entre elas em seguida:

```js
var comparavel = nome.substr(0, this.value.length);
var comparavelMinusculo = comparavel.toLowerCase();
var valorDigitadoMinusculo = this.value.toLowerCase();

if (!(valorDigitadoMinusculo == comparavelMinusculo)) {
    paciente.classList.add("invisivel");
} else{
    paciente.classList.remove("invisivel");
}
```

Esta é uma alternativa de implementar a mesma funcionalidade sem expressão regular, porém temos que escrever mais e nos preocupar com mais detalhes! Fica ai esta opção para você guardar nos seus conhecimentos.

## XML HTTP REQUEST

Supondo que queremos acessar dados de um servidor web para o nosso sistema, pra colocar dados na tabela por exemplo, uma forma de pegar esses dados é com XMLHTTPRequest

O objeto XMLHttpRequest é quem é responsável por fazer requisições HTTP assíncronas com Javascript. Apesar de ter o XML no nome hoje em dia este objeto pode trafegar diversos outros tipos de dados além do XML, este nome só se manteve devido a um legado histórico.

E para instanciar um novo Objeto XMLHttpRequest devemos utilizar a sintaxe com a palavrinha new :

```js
var xhr = new XMLHttpRequest();
```

Lembre o método GET pega dados de um servidor e o POST manda

Dado que temos um XMLHttpRequest, precisamos configurar nossa requisição para dizer para qual servidor queremos enviá-la e também qual método HTTP devemos usar.

Fazemos isto através do método `.open()` , passando o método e a url :

```js
xhr.open("POST","www.xyz.com.br/compras");
```

método AJAX, metodo assincrono para requisição de dados sem travar o js e nem o navegador

O XMLHtttpRequest é objeto responsável por fazer requisições HTTP com o Javascript.

Olhando as afirmativas, sabemos sim que ele deve ser configurado anteriormente com a função .open(), que ele pode trafegar diversos tipos de dados e não somente o XML ( ele tem esse nome graças a um vestígio histórico), e a requisição só é enviada mesmo após chamarmos o método .send().

O conteúdo inteiro do programa feito pela alura pode ser visto em <https://s3.amazonaws.com/caelum-online-public/introducao-javascript/stages/introducao-javascript-final.zip>
