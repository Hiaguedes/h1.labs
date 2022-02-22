# TypeScript

Aqui vamos evoluir um pouco mais o javaScript, ao usar a tipagem estática e com isso conseguir

O javaScript é uma linguagem fracamente tipada e diferente de linguagens como java, python, C# ela não exige a declaração de variáveis como tipo int,double,String,Array e coisas do tipo, você só inicializa a varáivel da forma que quiser e essa variável pode mudar sua forma do jeito que você achar necessário, isso é muito interessante pois você não precisa brigar com a linguagem o tempo todo para poder fazer seus programas, mas em problemas mais complexos você se deparar com um `undefined` locão que tem que ser executado em uma soma. E pra caçar onde deu esse undefined? Um tanto chato né? Esse é um dos benefícios da linguagem estática, já que o javaScript sempre acha que está fazendo a coisa correta mesmo se tem `undefineds` e `nulls` no meio do caminho

Outra desvantagem do javaScript é que se estivermos fazendo uma aplicação web o erro somente será disparado pelo browser no momento do run time e ás vezes não é vantajoso jogarmos erros em produção, para isso os erros terão que ser avisados em momento de desenvolvimento (ou de compilação) e o TypeScript oferece essa opção de compilação para a gente

## Instalando e configurando o compilador

Muitos frameworks como angular e ionic oferecem o typeScript já instalado e configurado por isso é importante que saibamos como configurar o mesmo na mão para entender por baixo dos panos seu funcionamento

Primeiro ter o node instalado, entrar na pasta do projeto e usar o node package manager

```cmd
npm init
npm i typescript
```

E aí dentro da pasta node_modules vemos dentro de bin o compilador do typescript chamado tsc

A próxima mudança é mudar tudo com a extensão js (ate pastas) para a extensão ts

O próximo passo é configurar o package.json para dizer onde estão os arquivos que vão ser compilados e se eles serão compilados para qual ecmascript, o mínimo de configuração é o objeto json abaixo

```json
{
    "compilerOptions":{
        "target": "es6",
        "outDir": "app/js"
    },
    "include":[
        "app/ts/**/*"
    ]
}
```

No include temos a entrada e no outDir a saída, simples assim

Que diz as opções do compilador além de incluir a pasta de onde estão os arquivos ts, outras opções podem ser vistas no site

E para compilar esse código typescript eu posso ir no package json e escrever um script que chama o tsc, como em `"compile": "tsc"` (onde se eu não colocar nenhuma pasta o node entende que esse arqivo está em node_modules) e rodo esse script com `npm run compile`

Lembre-se o browser não entende typescript, ele é compilador para javaScript para que aí sim esse arquivo javaScript seja útil no site

E uma coisa importante também, resete o visual code para que ele passa a usar o `tsconfig.json` onde deverão ficar as configurações do typescript, para que o editro entenda o que deve ser usado

Coloque o arquivo tsconfig.json dentro da pasta do projeto (e nunca fora, de preferencia do lado do package.json)

## A semântica do typeScript

Uma outra configuração importante para se ter nas opções do compilador é a `"noEmitOnError": true` que não vai deixar emitir o js no caminho especificado caso tenha um erro

Uma diferença básica quando temos uma classe no typescript é que temos que declarar suas variáveis do construtor antes do construtor, além de podermos declarar esses atributos como privados como em:

```ts
export class Negociacao {
   private _data;
   private _quantidade;
   private _valor;

    constructor(data,quantidade,valor){
        this._data=data;
        this._quantidade=quantidade;
        this._valor=valor;
    }
}
```

Então se eu alterar o atributo fora da classe eu terei um erro e o código não será compilado, o que é daora

O TypeScript é um superset da ES2015, ou seja, além de suportar os recurso da linguagem desta versão, adiciona outros. Um exemplo é o suporte ao modificador private.

Marque a opção na qual há um erro de compilação do TypeScript de acesso indevido a uma propriedade privada.

```ts
class Pessoa {

    private nome;
    _idade;

    constructor(nome, idade) {

        this._nome = nome;
        this._idade;
    }
}

let pessoa = new Pessoa('Barney', 18);
pessoa.nome = 'Martin';
```

Correto! Há um erro de compilação. A propriedade nome é declarada com o modificador private, dessa forma, apenas métodos da própria classe podem acessá-la. Não somos obrigados a utilizar o underline no nome de propriedades em TypeScript, salvo algumas situações peculiares que você ainda verá em outros exercícios ao longo do curso.

## Adicionando um watcher para não precisar compilar toda santa vez

Para isso adicionamos um simples watcher no script com

`"start": "tsc -w"`

E por se tratar do start podemos escrever direto no terminal com `npm start` e assim ele começa a compilação em modo watch, e a cada vez que atualizarmos um ts temos a compilação automática

## Os tipos do tiposcript ou typescript

Quando não definimos um tipo para a variável implicitamente é definido o tipo `any`

Como se ele fizesse isso aqui

```ts
private _inputValor: any;
```

Note que o tipo é feito depois da variável e não antes e que tem os dois pontos, uma característica um tanto diferente, isso ajuda para quando tivermos migrando um projeto já inteiramente pronto e eu preciso ir fazendo as alterações de forma gradativa, aí não preciso tipar ele por completo

Para forçar a tipagem do projeto eu coloco nas opções do compilador `"noImplicitAny": true`

Quando estamos começando um projeto do zero, a boa prática é desabilitarmos o tipo implícito any e usarmos os tipos corretos em nosso projeto. Contudo, se estamos em um projeto legado que estamos migrando de JavaScript para TypeScript, adotar o tipo implícito any nos ajudará no processo de migração, pois não precisaremos sair tipando todas as variáveis de uma só vez.

Durante nossas aulas, é provável que vocês tenham reparado que o Visual Studio Code, durante o processo de autocomplete, nos permite escolhermos além dos tipos string e number, os tipos String e Number. Há diferença?

Os tipos que começam em minúsculo equivalem a declaração literal. Vejamos um exemplo:

```js
let nome = 'Flávio';
let idade = 20;
```

O TypeScript infere o tipo, sendo assim, a sintaxe é a mesma coisa que:

```js
let nome: string = 'Flávio';
let idade: number = 20;
```

Se fizermos `typeof` nas duas variáveis temos como resultado string e number respectivamente:

```js
let nome: string = 'Flávio';
console.log(typeof(nome));  // string
let idade: number = 20; 
console.log(typeof(idade));// number
```

Contudo, JavaScript permite criar strings e números não como literais, mas como objetos:

```js
let nome = new String('Flávio');
console.log(typeof(nome)); // Object
let idade = new Number(20);
console.log(typeof(idade)); // Object
```

Qual a diferença?

Os tipos string e number são literais e guardam um valor primitivo. Contudo, se tentarmos chamar algum método em variáveis declaradas com esses tipos, eles são empacotados automaticamente (auto-boxing) para String e Number respectivamente.

É por isso que esse código funciona:

```js
let nome = 'Flávio';
nome.replace('/vio/', 'vião'); // faz auto-boxing
```

Dessa forma, TypeScript permite distinguir entre o tipo literal e o tipo objeto. Contudo, a boa prática é usarmos os tipos literais number e string, porque em JavaScript new String() e new Number() são raramente usados.

## Casting explícito

Em TypeScript, podemos referenciar um dado de um tipo mais especializado através de um tipo mais genérico. Por exemplo:

```js
let x: Element;
let y: HTMLInputElement;
x = y; // funciona!
```

O código acima é possível, porque todo HTMLInputElement é um Element. O que ocorre é um casting implícito, no qual o desenvolvedor não precisa atuar. Contudo, nem todo Element é um HTMLInputElement.

Por isso não podemos fazer:

```js
let x: Element;
let y: HTMLInputElement;
y = x; // erro
```

Temos o erro:

Type 'Element' is not assignable to type 'HTMLInputElement'.
  Property 'accept' is missing in type 'Element'.
Contudo, quando usarmos document.querySelector() o TypeScript considera que o retorno será sempre do tipo Element. Justo, pois document.querySelector pode retornar um HTMLInputElement, HTMLTableElement, HTMLAnchorElement, etc. O que todos eles possuem em comum, são elementos do DOM, por isso podem ser tratados como Element.

Contudo, Element não expõe propriedades e métodos de cada um dos tipos específicos que listamos no parágrafo anterior e isso pode nos causar problemas em nosso código, por exemplo, para pegar o value de um HTMLInputElement.

Aprendemos que podemos realizar um casting explícito de um tipo mais genérico para um tipo mais específico.

Marque a opção abaixo que realiza corretamente um casting explícito:

`let tabela = <HTMLTableElement> document.querySelector('table');`

Correto! Realizamos o casting explícito de Element para HTMLTableElement. Inclusive, devido ao casting, o TypeScript infere que o tipo de tabela será HTMLTableElement.

O tipo element é o tipo mais geral, enquanto outros elementos do DOM como input, ancora e afins são 'filhos' da classe elemento e definir seus tipos ajuda muito o visual code a identificar as funções que podemos usar para esse elemento

## Extensão de classes com TS

Mônica decidiu criar um jogo em JavaScript, mas optou por utilizar TypeScript devido aos recursos extras da linguagem. Ela criou três classes:

Humanoide
Humano
Alienigena
Em termos de design, tanto Humano quanto Alienigena são humanóides, por isso herdam dessa classe:

```ts
class Humanoide {

    private _energia: number = 100;
    private _nome: string = '';

    get energia() {

        return this._energia;
    }

    get nome() {

        return this._nome;
    }

    set nome(nome) {

        this._nome = nome;
    }

}

class Humano extends Humanoide {

    private _idade: number = 0;

    get idade() {

        return this._idade;
    }

    set idade(idade) {

        this._idade = idade;
    }
}

class Alienigena extends Humanoide {

    private _energiaExtra: number = 100;

    get energia() {

        return this._energia + this._energiaExtra;
    }
}
```

A classe Alienigena não compila

Correto. Ela tenta acessar no através do seu getter get energia() uma propriedade privada da classe pai.

Para reaproveitar variáveis que estão no pai e usar na filha usamos o tipo `protected` invés de `private`

### Tipos genéricos para a classe pai

Fernando utiliza muito o IndexedDB, um banco de dados que vive no próprio navegador. Com forte influência de padrões de projeto, decidiu criar um GenericDAO:

```ts
class GenericDAO {

    adiciona(objeto: Negociacao): number {

        /* implementação do método omitida */
    }

    apaga(objeto: Negociacao): void {

        /* implementação do método omitida */
    }

    buscaPorId(id: number): Negociacao {

        /* implementação do método omitida */
    }

    atualiza(objeto: Negociacao): void {

        /* implementação do método omitida */
    }

    listaTodos(): Negociacao[] {

        /* implementação do método omitida */
    }
}

// exemplo de uso
let dao = new GenericDao();
let negociacao = new Negociacao(new Date(), 1, 200);
// recebe o ID da negociação gerada
let id = dao.adiciona(negociacao);
let negociacaoBuscada = dao.buscaPorId(id);
```

O código escrito por Fernando não é genérico, pois esta amarrado ao tipo Negociacao. Além disso, o ID do elemento no IndexedDB pode ser um número ou uma string, e esse tipo esta fixo na definição da classe.

Marque a opção que torna a classe realmente genérica, permitindo persistir outros tipos, inclusive a definir um outro tipo de ID.

```ts
class GenericDAO<T, K> {

    adiciona(objeto: T): K {

        /* implementação do método omitida */
    }

    apaga(objeto: T): void {

        /* implementação do método omitida */
    }

    buscaPorId(id: K): T {

        /* implementação do método omitida */
    }

    atualiza(objeto: T): void {

        /* implementação do método omitida */
    }

    listaTodos(): T[] {

        /* implementação do método omitida */
    }
}
```

Correto! Pode indicar mais de um tipo genérico. No caso T, será o tipo da classe e K, o tipo do ID.

## classe abstrata para deixar os códigos mais bonitos

Quando eu não implemento a classe pai com um `new Pai()` então eu posso escrever as classes pais e seus métodos que serão sobrescritos com `abstract` como em:

```ts
export abstract class View<T> {
    private _elemento: Element;

    constructor(seletor: string){
        this._elemento = document.querySelector(seletor);
    }

    update(model: T):void{
        this._elemento.innerHTML = this.template(model);
    }
    
    abstract template(model: T):string;

}
```

Deixando o código muito mais limpo e organizado

Eduardo tem que lidar com a geração de boleto bancário para diversos bancos. Contudo, apesar dos boletos serem muito parecidos, cada banco possui um cabeçalho diferente.

Ele decidiu então escrever o seguinte código:

```ts
class Boleto {

    geraLinhaDigitavel(): string {

        /* lógica comum dos bancos */
    }

    geraCabecalho(): string {

        throw new Error('Você precisa implementar a cabeçalho');
    }
}

class BoletoBancoA extends Boleto {

    geraCabecalho(): string {

        /* lógica de geração do cabeçalho do banco A */
    }

}

class BoletoBancoB extends Boleto {

    geraCabecalho(): string {

        /* lógica de geração do cabeçalho do banco B */
    }

}
```

Marque a afirmativa verdadeira a respeito do código de Eduardo.

Não faz sentido haver instâncias de Boleto, pois a classe não define a implementação de geraCabecalho(). Essa responsabilidade é das classes filhas, mas nada obriga o desenvolvedor a implementá-las em tempo de desenvolvimento e só será avisado caso tenha esquecido de implementá-lo em tempo de execução, no runtime da aplicação.

## E se eu quiser usar jQuery com typescript

O simples document.querySelector da massa troca para $, mas o $ no jQuery fica no escopo global e o ts sabe disso? não, então o que posso fazer? Declarar essa variável é uma opção, aí faremos

```ts
declare var $
```

E assim o código passa, mas e o textContent que troca para text, o innerHtml que troca para html(), muita coisa e dessa forma estaremos corrompendo o compilador e fazendo com que o visual studio não identifique mais os métodos daquela função, a solução mais simples é o type script definitions ou tsd, que são arquivos que mapeiam os tipos que o typescript deve suportar para cada biblioteca

Esse tsd pode ser escrito pelos autores do typescript ou de terceiros, pelo proprio npm tem types para o jquery no typescript

O tsd é nada mais que um de/para

E para usar você fala que é o tipo `jQuery` invés de `Element` e por aí vai

## Readonly para enxugar uma classe que só tem getOuterSizes

Podemos enxugar uma boa parte do código que está abaixo a

```ts
export class Negociacao {

    constructor(private _data:Date,private _quantidade: number,private _valor: number){

    }

    get data(){
        return this._data;
    }
    get quantidade(){
        return this._quantidade;
    }
    get valor(){
        return this._valor;
    }
    get volume(){
        return this._quantidade * this._valor;
    }
}
```

De modo a ter apenas um tipo readonly em todas as variáveis do constructor

```ts
export class Negociacao {

    constructor(readonly data:Date,readonly quantidade: number,readonly valor: number){

    }
    get volume(){
        return this.quantidade * this.valor;
    }
}
```

Dessa forma podemos tirar os _ de antes da variáveis

Temos a seguinte classe que define duas propriedades `readonly`.

```ts
class Conta {

    constructor(readonly titular: string, readonly numero: string) {}
}

let conta = new Conta('Almeida', '171');
console.log(conta.titular);
conta.titular = 'Ted'; // erro de compilação, a propriedade é readonly.
```

Marque a opção que define a mesma classe, mas que usa o modificador de acesso privateem vez de readonly. Ela deve permitir a leitura das propriedades.

Alternativa correta

```ts
class Conta {

    constructor(private _titular: string, private _numero: string) {}

    get titular() {

        return this._titular;
    }

    get numero() {

        return this._numero;
    }
}
```

## Parâmetros opcionais

Basicamente é o ? que você coloca depois da variável

Sobre parâmetros opcionais, marque a única opção que não compila.

```ts
function(a?: number, b?:number, c:number): void {

}
```

Perfeito, esse código não compila. Parâmetros opcionais devem ser sempre os últimos parâmetros.

O compilador do TypeScript possui uma série de configurações e uma delas é a strictNullChecks. Neste modo, null e undefined não fazem parte do domínio dos tipos e só podem ser atribuídos a eles mesmos. Com a exceção de undefined que pode ser atribuído a void. Isso pode ser interessante para evitarmos valores nulos e indefinidos em nosso projeto.

Que tal vermos mais um exemplo no qual ele pode nos ajudar a detectar erros em nosso código?

Vamos buscar em um HTML hipotético um elemento com ID cartao_1e a partir dele acessar seu elemento pai através de parentNode:

```ts
const elCartao: HTMLDivElement = <HTMLDivElement> document.querySelector('#cartao_1');`
let elPai = elCartao.parentElement;
```

Excelente. Mas o mesmo código não compilará com strictNullChecks com a seguinte alteração:

```ts
const elCartao: HTMLDivElement = <HTMLDivElement> document.querySelector('#cartao_1');
let elPaiDoPai = elCartao.parentElement.parentElement; // [ts] Object is possibly 'null'
```
Veja que o aviso do compilador TypeScript faz todo sentido, porque pode ser que o elemento pai do pai do elemento elCartao não exista e, se não existir, o valor de parentNode será null.

Dessa forma, o programador terá que lidar antecipadamente com essa situação em seu código:

```ts
const elCartao: HTMLDivElement = <HTMLDivElement> document.querySelector('#cartao_1');
let elPaiDoPai;
if(elCartao.parentElement) {
    elPaiDoPai = elCartao.parentElement.parentElement;
}
console.log(elPaiDoPai);
```

Temos a seguinte função:

```ts
function minhaFuncao(flag: boolean) {

    let valor = null;
    if(flag) return null;
    return true;
}

let x = minhaFuncao(false);
```

O código compila, pois minhaFuncao pode retornar `null` ou um `boolean` dependendo do valor do parâmetro flag passado. O TypeScript também consegue inferir os dois tipos retornados pela função.

Mas se quisermos tipar o retorno de minhaFuncao como boolean? Teremos um erro de compilação:

```ts
function minhaFuncao(flag: boolean): boolean {

    let valor = null;

    // erro aqui! 
    // Type 'null' is not assignable to type 'boolean'.

    if(flag) return null;
    return true;
}

let x = minhaFuncao(false);
```

Com strictNullChecks ativado não podemos retornar `null` para uma função que explicitamente indicamos que retorna ``boolean``. Se a opção do compilador não estivesse ativa, funcionaria pois null pode ser atribuído a qualquer tipo do TypeScript. Mas será que conseguimos fazer esse código compilar sem termos que desativar esta `strictNullChecks` no compilador?

Podemos indicar que a função pode devolver mais de um tipo, no caso ela devolverá `boolean` ou `null`:

```ts
// deixarmos explícitos que a função pode retornar boolean ou null
function minhaFuncao(flag: boolean): boolean | null{

    let valor = null;
    if(flag) return null;
    return true;
}

let x = minhaFuncao(false);
```

Agora, como explicitamos que seu retorno pode ser também `null`, nosso código passará pelo strictNullChecks. Curiosamente, linguagens como a Golang permitem uma função ou método ter mais de um tipo de retorno.

### Curiosidade: o tipo never

TypeScript possui um tipo curioso, o tipo `never`. Este tipo é aplicável à métodos ou funções que por algum motivo, planejado ou não, podem não terminar sua execução de seu bloco.

Exemplos clássicos são os de métodos que caem em um loop infinito ou de métodos que sempre retornam exceções. Exceções fazem com que o método não execute até o fim.

Não confundir o tipo `never` com o tipo void. O segundo, apesar de indicar que a função ou método nada retorna, indica que a função ou método executará até o fim, mesmo que não retorne nada.

Geralmente não usamos esse tipo em nosso código, mas ele pode aparecer como aviso do compilador. Quando aparecer, você já saberá que a execução do seu método nunca chegará até o fim, sendo um forte indicativo de um bug em seu código.

## Enum para melhorar visibilidade do código

A função getDay() retorna 0 para domingo, 1 para segunda e por aí vai, até o 6 que é sabado e se quisermos fazer uma regra de negócio que utiliza esses números nós teríamos que fazer algo como

`data.getDay() ===0 || data.getDay() ===6`

O que pode deixar o código menos fácil de ser lido, para isso o typescript tem o enum que pode ser usado como

```ts
enum DiaSemana {
    Domingo,
    Segunda,
    Terça,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}

        if(data.getDay() === DiaSemana.Domingo || data.getDay() === DiaSemana.Sabado){
            ...
        }
```

Já que dessa forma Domingo=0, Segunda=1 e por aí vai

Temos a seguinte enum:

```ts
enum MinhaEnum {
    A,
    B = 3,
    C,
    D,
    F
}
```

Qual o valor de MinhaEnum.D?

5


Correto! As enum começam de 0, porém, se modificarmos o valor de alguma das enum, os próximos valores passarão a contar a partir do novo valor.

Vejamos o seguinte exemplo de enum:

```ts
enum Tipo {

    ESPECIAL,
    PADRAO
}
```

Sabemos que o valor de Tipo.ESPECIAL e Tipo.PADRAO serão 0 e 1 respectivamente.

Agora, em nosso código fazemos:

`let tipo: Tipo = Tipo.ESPECIAL;`
É uma sintaxe totalmente válida. E agora?

`let tipo: Tipo = 4;`
O código anterior compila? Compila! Se você vem de outra linguagem como Java ou C#, este código não compilaria, porque só poderíamos utilizar os tipos Tipo.ESPECIAL e Tipo.PADRAO.

A questão é que a enum tem como subtipo number, por isso pode receber qualquer outro número que não esteja dentro do escopo da Enum.

Há até uma issue sobre esta situação

<https://github.com/Microsoft/TypeScript/issues/11772>

Não é bem um erro, mas um comportamento esperado de como o TypeScript lida com Enum.

## decorators

Os decorators são experimentais mas é uma boa coisa pois o javaScript pretende utilizar eles em breve (isso se já não utiliza)

Para usar no tsconfig eu coloco `"experimentalDecorators": true`, a ideia do decorator é chamar um pedaço de código antes e depois de um método ser chamado, podendo ser util para rodar um código de performance

## Interfaces

```ts
function executaAssincrono(cb: Function) {

    setTimeout(() => cb('terminou'), 0);
}

let callback1 = ((resultado: any) => alert(resultado));
let callback2 = ((resultado: any) => alert(`**${resultado}**`));

executaAssincrono(callback1);
executaAssincrono(callback2);
```

O problema é que ele não sabe como criar agora a inteface MeuCallback que substitua o Function adotado por executaAssincrono.

Marque a opção que cria e utiliza corretamente a interface:

```ts
interface MeuCallback {

    (mensagem: string): void;
}


function executaAssincrono(cb: MeuCallback) {

    setTimeout(() => cb('terminou'), 0);
}

let callback1: MeuCallback = resultado => alert(resultado);
let callback2: MeuCallback = resultado => alert(`**${resultado}**`);

executaAssincrono(callback1);
executaAssincrono(callback2);
```

Conteúdo completo do curso <https://s3.amazonaws.com/caelum-online-public/typescript/11-final-alurabank.zip>
