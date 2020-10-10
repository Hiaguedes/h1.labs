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
