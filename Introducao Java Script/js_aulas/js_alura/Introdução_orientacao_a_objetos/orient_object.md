# Orientação a Objetos Js

Aqui vamos apenas nos preocupar em fazer um programa que utiliza orientação a objeto no java script sem aplicar isso na web, apenas para resolver um problema de um cliente gerente de um banco e para isso precisaremos de um interpretador como o Node para testar essa função para a gente, o recomendado é uma versão acima do 13.

Podemos ver todo o conteúdo do professor no link <https://github.com/alura-cursos/js-orientacao-objetos> e ver aulas na branch, no total são 5

## Evitar repetição de código

Imagina que um banco precisa do nome, do CPF, do numero da Agência e do Saldo. Para isso eu teria que ter uma estrutura de código mais ou menos assim

```js
const clienteNome ="Ricardo";
const clienteCPF =  11122233309;
const clienteAgencia =1001;
const clienteSaldo= 0;
```

E isso para n clientes ai imagina algo como

```js
const cliente1Nome ="Alícia";
const cliente1CPF =  22222233309;
const cliente1Agencia =1001;
const cliente1Saldo= 0;

const cliente2Nome ="João";
const cliente2CPF =  33322233309;
const cliente2Agencia =1001;
const cliente2Saldo= 0;
```

Imagine a trabalheira né. Isso aqui não é tornearia para ficarmos repetindo tarefas a vida toda. E para isso crio um molde e esse molde nos dá uma mesma estrutura do cliente (isso é elas tem um contexto), onde posso pintar o que sai desse molde por fora. E esse molde é a classe e como todos se referem a um cliente então podemos criar uma classe chamada Cliente da seguinte forma

```js
class Cliente {
    nome;
    CPF;
    agencia;
    saldo;
}
```

E criar um novo cliente como

```js
const cliente = new Cliente();
```

E usar suas propriedades com:

```js
 cliente1.nome ="Ricardo";
 cliente1.CPF =  11122233309;
 cliente1.agencia =1001;
 cliente1.saldo= 0;
```

Super daora e muito bom para organizar códigos

## Comportamentos em classes

As vezes dentro de uma classe eu preciso realizar uma certa função como depositar dinheiro em uma conta e eu posso fazer isso com

```js
class contaCorrente(){
    agencia;
    saldo;

        depositar(valor){
        if(valor>0){//se eu depositar um valor negativo a função não deixa
            this.saldo += valor;
        }

}
```

Onde pensa comigo, um cliente não tem uma agencia e um saldo fica melhor em outro lugar, como em uma conta corrente, então eu posso dizer que se o valor passado para a função depositar for positivo eu deposito um valor na conta dele.

E aí eu posso usar essa classe da seguinte forma

```js
const conta = new contaCorrente;
conta.agencia=1001;
conta.saldo=0;
conta.depositar(100);
```

No final eu terei um saldo de 100 no banco

Mas isso cria um empecilho pois nada impede de eu fazer `conta.saldo=1000000000000;`

Pois eu posso alterar a hora que quiser

### Atributo privado

Ainda não existe como declarar uma variável privada no javaScript mas existe uma proposta e ela pode ser vista aqui <https://github.com/tc39/proposal-class-fields#private-fields> e basicamente nos diz que devemos colocar # na frente da variável que não pode ser edidata externamente deixando nossa classe como:

```js
class contaCorrente(){
    agencia;
    #saldo=0;

        depositar(valor){
        if(valor>0){//se eu depositar um valor negativo a função não deixa
            this.#saldo += valor;
        }

}
```

Onde agora setaremos o saldo inicial na própria função, e aí começaremos a trabalhar com saldo normalmente, porém sabendo que não poderemos ver o saldo estando fora da função sendo necessária uma função para mostrar esse saldo como em:

```js
class contaCorrente {
    agencia;
    #saldo = 0; //a cerquilha diz que a propriedade é privada

    sacar(valor){
        if(this.#saldo >= valor && valor>0){//o this é uma palavra propria do js que nos diz qual o elemento
            //que chamou aquela função, no caso qual a conta corrente que eu estou vendo
            this.#saldo -=valor;//a convenção é que se use o _saldo mas o _ não deixa a variável privada de fato, é só uma convenção que se tiver _ você não a altere externamente
        }
    }

    depositar(valor){
        if(valor>0){//se eu depositar um valor negativo a função não deixa
            this.#saldo += valor;
        }
    }

    mostraSaldo(){
        console.log("O saldo é de: "+ this.#saldo);
    }
};
```

Como essa propriedade não existe ainda então o usual de vermos como variável privada é utilizarmos o `_` como em `_saldo` o `_` não é uma variável privada de fato mas é uma convenção e editar ela externamente pode ser um muito rude, aiaiai não pode. Mas se quiser pode saca? Mas por ser uma proposta colocar o # pode ser ruim ao colocar ela para produção.

Note que poderíamos fazer nossa função depositar de uma forma diferente com early return ou seja

```js
    depositar(valor){
        if(valor<=0) return;

            this.#saldo += valor;

    }
```

Pois caso seja menor que ou igual a zero saia da função e como só temos uma linha após isso não há problema em simplesmente deixar assim sem abrir e fechar chaves, caso não seja não passa pelo if e afeta o valor de saldo dentro da função.

#### Comentários

Por padrão no JS utilizamos o "_" para indicar que um atributo é privado e não deveria ser alterado.

Isso mesmo! Apesar de ainda ser possível alterar essa propriedade isso é considerado uma má prática e estamos quebrando o encapsulamento da classe.

Alternativa correta
Atualmente no Js nenhum atributo ou método é realmente privado

Sim, o JS é uma linguagem de escopo aberto e por isso é possível visualizar qualquer atributo ou propriedade de nossa classe.

### Sobre métodos e funções

Função e método são termos sinônimos e que nós ajudam a criar um vocabulário mais rico dentro do nosso sistema

 Usamos métodos para dar nomes aos comportamentos que nossa classe possui e isso facilita a comunicação dentro da equipe

Um método pode receber qualquer quantidade de parâmetros.

um método pode ter nenhum, um ou mais parâmetros. Essa é a maneira de passarmos informações para podermos reutilizar métodos em diferentes cenários

Um método define o comportamento ou a maneira de fazer algo.

esse é o objetivo de métodos, definir o que um objeto sabe fazer. O comportamento é implementado dentro do método.

## Modularizando o código

A medida que o arquivo js vai crescendo a boa prática é eu ter arquivos diferentes para classes e depois eu ir ligando essas classes. Isso torna a manutenção desse código mais fácil e melhor de ser feita. O interessante inicialmente pode ser ter uma classe por arquivo mas isso é algo que varia de projeto para projeto. E eu deixo apenas um arquivo js para executar as classes que estamos criando.

Mas eu preciso linkar esse arquivo com os outros e fazemos isso com os módulos (que é uma tecnologia bem recente e somente possível a partir com o Node da versão 13)

E para isso eu crio um arquivo Cliente.js e faço um export desse módulo

```js
export class Cliente {
    nome;
    CPF;
}
```

E dentro do arquivo que eu quero executar essa classe eu faço

```js
import {Cliente} from "./Cliente.js"
```

Porém o node não conseguirá interpretar essas classes como módulos e para que isso aconteça eu preciso dar um `npm init` e iniciar um `package.json` e com ele podemos dizer o tipo de projeto que estamos tocando ali e o proprio erro que o node nos informa é que precisamos colocar nesse package um `"type": "module"`

Essa modulariação de código em js é algo novo e ainda não oficializado mas será a partir de pouco tempo a forma de produzir e escrever códigos daqui para frente, uma vez que os scripts em js eram somente usados para web e os scripts ajeitavam apenas pequenas coisas dentro do html de uma página mas isso vem mudando e estar antenado com as mudanças é a essência da programação.

### O package.json

Para melhorarmos a organização do nosso código e podermos separar as classes em diversos arquivos, precisamos usar módulos de Javascript e, para isso, criamos um arquivo chamado package.json. Mas o que é esse arquivo?

O package.json é um arquivo muito utilizado em aplicações JS modernas que guarda vários dados de nossa aplicação. O arquivo gerado para este curso tem apenas algumas informações.

```js
{
  "name": "bytebank",
  "version": "1.0.0",
  "description": "Projeto do Bytebank para seus clientes",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

Algumas delas são simples de entender, como nome, versão, descrição e autor. Outras, como o campo script, já são mais difíceis de entender sem uma explicação mais detalhada.

Como desenvolvedores é normal queremos reaproveitar código de outras pessoas e bibliotecas que estão disponíveis para nosso time. Dessa forma, agilizamos o desenvolvimento de nossas aplicações. Mas onde podemos encontrar essas bibliotecas e código feitos pela comunidade?

Achamos essas bibliotecas dentro de gerenciadores de pacote – pense neles como um lugar centralizado onde toda a comunidade pode subir e compartilhar códigos para que outros desenvolvedores usem. E é justamente para organizar essa série de pacotes e bibliotecas que o package.json foi criado. Com ele é fácil de saber qual a versão do pacote, o nome dele, quem fez aquele código etc.

No caso do Javascript o gerenciador de pacotes mais utilizado é o NPM – Node package manager.

"Ok, mas e essa tag de script?"

Até este momento no curso não fizemos muitas operações complicadas, pois só estamos usando o terminal para chamar o interpretador do NodeJS e pedindo para ele executar o arquivo que queremos. Mas conforme nosso projeto cresce ou usamos outras bibliotecas para desenvolver a aplicação, é comum que o comando que precisamos rodar no terminal fique longo ou que ele precise de alguns parâmetros especiais. Como normalmente estamos trabalhando em equipe, não queremos que alguém na nossa equipe precise ficar perguntando o tempo todo qual o comando precisa escrever para o programa rodar. É nesse momento que usamos os scripts do package.json.

Podemos escrever um script com o comando que colocaríamos no terminal, por exemplo:

"scripts": {
    "start": "node index.js"
}
E ao invés de escrever esse comando podemos chamar o script com o comando npm start. Dessa forma não precisamos lembrar de todo o comando sempre que vamos executar o programa. Se você quiser saber mais, veja na documentação do NPM os tipos de scripts e os casos de uso.

"E por que eu preciso disso no meu programa agora?"

Como esse arquivo de configurações está presente em praticamente todo projeto de Javascript moderno, algumas ferramentas usam-no para colocar informações de configuração que elas precisam. No caso do NodeJS eles escolheram adicionar uma propriedade chamada "type" dentro desse arquivo e, sempre que vão executar algum código JS, eles leem essa propriedade e configuram o interpretador do JS de acordo com o valor lido.

Como os módulos JS são uma coisa nova e experimental, dentro desse interpretador do Node não é interessante deixá-lo configurado para tratar todo arquivo como um módulo, pois muitos projetos antigos teriam problemas ao atualizar a versão do Node que estão usando.

Então, esta é a opção que eles encontraram para deixar quem quisesse usar os módulos JS conseguir configurar a ferramenta para fazer os testes, e quem não quisesse não teria problemas e não precisaria mudar nenhuma configuração.

Se você quiser saber mais sobre as propriedades que esse arquivo suportam você pode encontrá-las nesta página da documentação. <https://docs.npmjs.com/files/package.json>

## Gerenciamento de memória

Ao criarmos um programa em qualquer linguagem de programação precisamos utilizar variáveis para guarda valores durante a execução de nossos programas. Cada uma dessas variáveis é armazenada em um lugar da memória do computador.

Porém, vimos que dependendo dos valores que uma variável guarda o JS trata ela de forma diferente. Passando ela como uma cópia de seu valor ou como uma referência ao espaço de memória onde ela está guardada. Ele faz isso baseado justamente nos valores que a variável guarda. Tipos primitivos são sempre passados como um valor, enquanto que tipos não primitivos sempre são passados por referência.

"Mas o que são tipos primitivos?"

Tipos primitivos são os valores mais simples que a linguagem consegue trabalhar e geralmente são implementados no nível mais baixo da linguagem. Isso significa que eles não são representados como um objeto e por isso não possuem métodos ou atributos.

Um tipo primitivo é simplesmente um valor em sua forma mais simples de representação. Eles também são imutáveis, uma vez declarados seu valor nunca muda.

Em Javascript os tipos primitivos são:

```en
String (texto)
Number (número)
Boolean
Null
undefined
Symbol
```

Qualquer outro tipo que encontramos em nossas aplicações, como Objetos, Arrays, etc... não são tipos primitivos e por isso o JS trata eles de forma diferente. Variáveis que não são primitivas são mutáveis por natureza e podem conter uma estrutura de dados grande e complexa o que tornaria a operação de cópia desses valores ineficiente.

"Mas se ele não copia, como ele faz?"

Quando criamos um objeto dentro do JS ele reserva um espaço de memória no local que chamamos de Heap, ao fazer isso o que ele guarda na variável que criamos não é o valor do Objeto que criamos e sim o endereço de memória onde os valores estão salvos.

Dessa forma ao passarmos uma variável que "guarda" um objeto para um método dentro do JS o que estamos passando é apenas o endereço de memória que aquela função deve usar para acessar os valores do objeto. Isso torna a operação muito mais eficiente mas causa um problema. Qualquer alteração feita naquele endereço de memória afeta todas as variáveis que referenciam ele.

Como essas variáveis apenas guardam um endereço para o espaço de memória falamos que elas guardam uma referência para onde aquele objeto está guardado e por isso falamos que são um "tipo de referência" enquanto que os primitivos são "um tipo de valor".

Caso você queira ver em detalhes como essa operação de alocação de memória é feita pode ler esse artigo sobe o modelo de gerenciamento de memória do JS. <https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239>

A verdade com esse papo é que uma instância de um objeto como o obj em `const obj = new Object();` não é um objeto propriamente dito, e sim somente um espaço alocado na memória RAM, onde ele pode ser alterado com parametros que nem tem no molde original

## null e undefined

Basciamente os dois são a mesma coisa, mas o null é explícito, isso é alguém colocou esse valor de propósito e o undefined alguém não escreveu o valor de um parâmetro na classe. No caso de:

```js
export class contaCorrente {
    agencia;
    cliente;
}
```

Com cliente tendo nome e cpf e eu diga que cliente é null então eu não consigo setar o nome desse cliente entendeu?

## getters e setters e encapsulamento em js

Seria legal sempre passar um cliente para a variável cliente e não passar um número, pra isso eu uso o acessor set da seguinte forma

```js
    set cliente(param){//para garantir que tooo cliente seja um cliente de fato
        if(param instanceof cliente){
            this.#cliente=param;
        }
    }
```

No visual code isso cria um import para o arquivo da classe

Dessa forma eu consigo dizer que toda variável setada em cliente é uma instancia do objeto cliente e com o get eu consigo retornar o valor declarado de forma privado para fora da minha função com

```js
    get saldo(){
        return this.#saldo;
    }
```

Então dessa forma eu posso ver o saldo de uma conta corrente no lado de fora da classe e sem correr risco de alguém setar o saldo de uma conta em outro script, pois não podemos setar quando o atributo tem somente o getter e não o setter. Então podemos usar o _saldo para representar o saldo sem problemas desde que se tenha o getter.

### Exercícios

Sobre os assessores do tipo get e set marque as alternativas corretas:

Usando assessores do tipo set podemos alterar a regra de como um atributo pode ou não ser modificado sem precisar alterar isso em diversos pontos do código

Excelente! Essa é a ideia mesmo, assim se qualquer regra de atribuição mudar só precisamos modificar um único lugar.

Usar assessores do tipo set é uma boa prática para garantirmos que a atribuição de propriedades está sempre segura

Sim! Chamamos essa ideia de proteger atributos de nossas classes de encapsulamento e devemos sempre manter o máximo de encapsulamento possível.

## Construtores

Construtores são utilizados para inicializar os atributos.

Correta! A inicialização de atributos é a principal responsabilidade do construtor.

Ela ajuda a deixar o código mais legível e inicializar objetos. E eles são feitos como

```js
class x{
    constructor(param){
        this.foo1=param;
    }
}
```

E eu inicializo essa classe com:

```js
const var=new x(param);
```

E eu posso setar atributos privados com o getter dentro do construtor

## Atributos estáticos

Eu somente crio uma variável do tipo `static` quando eu quero saber quantas vezes aquela classe foi chamada ou qq coisa relacionada a algo interente a classe

Como em quantas contas eu tenho criadas, para isso eu chamo a variável em todas as vezes que meu construtor foi chamado como em

```js
class contaCorrente{
    static numContas=0;
    constructor(params){
        contaCorrente.numContas++;//e para isso eu conto em quantas vezes o construtor foi chamado chamando a propria classe
    }
}
```

E depois eu chamo ela em 

```js
console.log(contaCorrente.numContas);// vejo quantas vezes a função foi chamada
```
