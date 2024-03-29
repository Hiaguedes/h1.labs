# Introdução ao react

Aqui vamos entender como que a biblioteca funciona e no que ela pode facilitar sua vida na hora de desenvolver uma aplicação. E a entender o jsx que meio que parece um html mas por trás parece que tem um js nele.

Para criar uma aplicação react nós podemos ver que é simples e pode ser vista [aqui](https://reactjs.org/docs/create-a-new-react-app.html)  e basta rodarmos o seguinte código

```cmd
npx create-react-app my-app
cd my-app
npm start
```

É importante que você use a versão do node e do npm especificada no site para cima.

Onde o `npx` que é um comando não muito visto por aí é somente um instalador de biblitoecas do npm, o npm te dá a dependencia porém a dependencia fica na sua máquina o npx é um comando que deixa o resultado final na sua máquina mas não deixa a biblioteca na sua máquina

Esse programa vai baixar uma penca de dependencias (para cacete mesmo) e vai deixar sua app com um formato meio estranho e que não conhecemos, com duas pastas chamadas `src` e `public`, vamos focar na pasta `src`. Dentro dela temos dois scripts que nos chamam a atenção a App.js e a index.js, a index.js é o nosso ponto de entrada da aplicação e lá onde importamos o css, o ReactDom, o React e também o App.js, lá inicialmente apenas pegamos o que está no app e jogamos para renderização então o que importa de verdade é o que está dentro do App.js e lá vemos que existe um html incluso. Então lá que mecheremos para criar a aplicação.

**A finalidade do react é criar interfaces para o usuário (UI)**

Podemos ver a aplicação com `npm start`

## Limpando a casa

Muito normal que quando estivermos criando o app que ele nos dê (até para nos impressionar no começo) códigos a mais desnecessários e que não farão parte da aplicação final, então podemos apagar o html dentro do app.js, arquivos de teste, service worker e coisa do tipo

De modo que a pasta source fique apenas com o App.js, index.css (serve como um reset apesar de não estar completo) e o index.js

A, e tire também qualquer import desnecessário desses arquivos js

## O JSX

O react usa o JSX e com ela é possível usar html sem precisar usar template string, então pelo próprio site do react vemos

```jsx
const element = <h1>Hello, world!</h1>;
```

This funny tag syntax is neither a string nor HTML.

It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX produces React “elements”. We will explore rendering them to the DOM in the next section. Below, you can find the basics of JSX necessary to get you started.

Por padrão o jsx não compila dois elementos irmãos no html como

```html
<section>
</section>
<ul>
</ul>
```

Para fazer com que isso funcione em tenho que encapsular os dois dentro de uma tag só como:

```html
<div>
    <section>
    </section>
    <ul>
    </ul>
</div>
```

### React e react

Funny fact! react é a lib que o facebook criou e que usamos nas aplicações enquanto React é todo o ecossistema por trás do mesmo. Por hora estaremos tratando apenas da lib.

## Por debaixo dos panos

Ao criarmos nosso projeto com o create-reat-app podemos ver que o arquivo public/index.html não contém nada em seu `<body>`, além de uma div="root", mas quando executamos o projeto, sem alterarmos nada de dentro dele, vemos um projeto padrão criado pela aplicação do npx.

Baseando-se nessa informação, marque abaixo a alternativa correta.

O React usa a `div="root"` no arquivo `index.js`, inserindo os elementos declarados em JSX do arquivo App.js.

Exatamente! O React utiliza esse arquivo `index.js` para inserir todo o conteúdo JSX do App.js no index.html, tornando possível que esse template seja exibido no navegador.

Ele faz isso através de um método interno do ReactDOM chamado `render()` (que também utiliza JSX ao passar `< App />` como parâmetro).

Se formos ver o código veremos:

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

óia o seletor lá.

## Criando uma component, alias o que é component?

Se formos ver o app.js é nada mais que uma generalização de um pequeno código html para dentro de um elemento JSX

E podemos dividir uma componente usando componentes menores como em:

```js
import React, {Component} from 'react';

class ListaNotas extends Component {
 render(){
     return(    
     <header>
        <h3>Título</h3>
        <p>Escreva a nota</p>
      </header>)
 }
}

export default ListaNotas;
```

E importando isso para dentro de apps com:

```js
import ListaNotas from './components/ListaNotas'
```

E aplicando dentro de app com:

```js
function App() {
  return (
    <section>
    <form>
      <input type="text" placeholder="Título"/>
      <textarea cols="50" rows="5" placeholder="Escreva a sua nota..."></textarea>
      <button>Criar a Nota</button>
    </form>
    <ListaNotas/>
    </section>
  );
}
```

Note que o arquivo pode estar escrito como js ou como jsx, tanto faz.

Com a tag `<ListaNotas/>` que é o nome da classe e que dentro dela tem a função `render`

Quando estamos criando uma página web é comum termo partes dessa aplicação que precisem ser repetidas para que o layout final fique como o esperado.

Pensando nisso o React tem uma abordagem diferente em relação a como ele gera o HTML final para o navegador. Quais as vantagens da utilização de componentes para criação de interfaces?

Ao usarmos componentes podemos reutilizar as diferentes partes do Layout de maneira mais simples do que se tivéssemos que reescrever a árvore de HTML novamente

Isso mesmo, com essa abordagem temos menos duplicação de código dentro do nosso sistema.

Essa abordagem permite a composição de diversos componentes para a criação de um comportamento complexo, isso facilita a compreensão do código

Exatamente, a criação de componentes pequenos facilita na compreensão do código como um todo.

Como cada componente tem um nome que a equipe desenvolvendo o sistema definiu é possível abstrairmos partes do código para que a comunicação entre o time melhore

Sim, em projetos com equipes é muito normal usarmos termos que fazem sentido apenas dentro do contexto do projeto e isso ajuda a equipe a ter uma comunicação mais eficiente.

Nesse sentido, nomes de classes, funções e variáveis que usamos no projeto são muito importantes

## Dica de ouro!

Instale no visual code a extensão Simple React Snippets ele facilita muito a criação de um component, basta digitar im ou imrc para importar o react ou importar o react com o component e cc para criar o resto.

Temos a function componentes e a class componentes, a function é mais nova e você querer ela ou não

## Colocando js na aplicação

Dentro do JSX conseguimos colocar código javaScript dentro de chaves

Então uma forma de termos uma função js para gerar uma função com js é com

```jsx
 render(){
     return(    
        <ul>
         {this.Array.map( categoria => {
        return(
            <section>
                <h3>{categoria}</h3>
                <p>Escreva a nota</p>
            </section>
        )}
        )}
         
      </ul>
      );
 }
```

Com `this.Array` sendo declarado no construtor da classe com

```js
    constructor(){
        super();
        this.Array= ['Estudo', 'Trabalho', 'Lazer'];
    }
```

Para usarmos algumas coisas de uma classe o react pede para termos o `super()`

## Só que nossos componentes tão muito feios

Dá para aplicar um css nisso ai? Dá e de maneira muito maneira pois assim como componetizamos os pedaços da nossa página nós também podemos importar css específicos para isso podemos colocar os componentes dentro de pastas e colocarmos um import do css com:

```js
import './estilos.css';
```

Com a parte que uma classe css é melhor sendo declarada com `className` já que definimos a classe do componente com essa mesma palavra, então para não haver esse choque de palavras colocamos className

## Perdemos contexto ao tratar o html dentro de uma classe?

Quando tinhamos as coisas separadas em js,css e html era comum termos uma classe js que podia ser chamado ou não no html com um evento em

```js
onchange="negCtrl.add(event)"
```

Onde declaramos a classe negociação controller em

```js
const negCtrl = new negociacaoController();
```

E esse negCtrl é a instancia da classe e que será passada para dentro de qualquer função que essa classe tenha, pois ela é uma instância da classe. Perfeito, quando temos esse html dentro da classe, a atribuição da classe pode ser feita com o `this` e isso não é novidade para ninguém que conheça um pouco de js.

Ok, vamos fazer o que fazemos no html ao passar um evento como o `onchange` para nos mostrat o que está sendo digitado no input em um campo como em

```js
    handleTitle(e){
        this.titulo = e.target.value;
        console.log(this.titulo)
    }
```

Onde `this.titulo` foi declarado no construtor como uma string vazia e o nosso render encontra-se como

```jsx
    render(){
        return(    
        <form className="form">
            <input type="text" placeholder="Título" className="form__titulo" onChange={this.handleTitle}/>
            <textarea cols="50" rows="15" placeholder="Escreva a sua nota..." className="form__text-area"></textarea>
            <button className="form__button">Criar a Nota</button>
        </form>
          );
    }
```

Note que o `onchange` é o evento que capta qualquer mudança nesse input, porém ao executarmos esse código nós teremos um erro mas porque?

Quando passamos a referência a função `handleTitle`, com mais precisão o `this` de `this.handleTitle` está sendo chamado em outro contexto no caso dentro da função `render()` de forma que o this fica indefinido, para associar esse this ao objeto que o criou eu precio fazer o `bind` como em:

```jsx
<input type="text" placeholder="Título" className="form__titulo" onChange={this.handleTitle.bind(this)}/>
```

Assim dessa forma eu garanto que o objeto a ser instanciado é a própria classe, isso é um erro bem comum no react e que o dev deve (hue) ficar de olho

## Passando dados de uma classe filha para a mãe

Como o react costuma componetizar componentes menores e linkando esse componentes em um sistema mãe e filha é normal querermos passar componentes que estão nessas classes filhas para as mães sem nenhum problema, e para isso temos as `props` que são declaradas na classe filha da seguinte forma

```jsx
    constructor(props){
        super(props);
        this.titulo="";
        this.nota="";
    }
```

Com isso "habilitamos" a transferencia de propriedades da classe filha agora para capturar esses dados fazemos:

```js
    criarNota(e){
        e.preventDefault();
        e.stopPropagation();
        console.log('criando nota');
        this.props.criarNota(this.titulo,this.nota)
    }
```

Dessa forma colocamos no objetos props um método chamado criarNota que vai ser usado na classe mãe e que envelopa o `this.titulo` e `this.nota` definido no construtor dessa classe. Agora vamos para a classe mãe receber a transferencia desses valores.

Na classe mãe criamos um método com o mesmo nome que será:

```js
  criarNota(titulo,nota){
    console.log(titulo, nota)
  }
```

Onde apenas colocaremos o que está sendo transferido na filha dentro do console

E no onde criamos a instância da classe mãe fazemos

```jsx
<FormCadastro className="form-cadastro" criarNota={this.criarNota}/>
```

Onde chamamos a função dessa instância dessa forma a cada vez que formos chamar essa função.

Nesse [link](https://stackoverflow.com/questions/30571875/whats-the-difference-between-super-and-superprops-in-react-when-using-e) vemos pq passar o `props` no constructor

## States

No decorrer do projeto, utilizamos state e props para compor a lógica da nossa aplicação, marque abaixo a alternativa que descreve a diferença entre esses dois objetos.

State: Serve para guardar valores/estado que podem vir a mudar com a interação do usuário com o componente, tendo efeito na renderização do mesmo, o state pode ser passado como props!

Props: Valores para a configuração de um componente, essas props são passadas pelo elemento acima (que utiliza o componente que irá receber) e são imutáveis, utilizado para a comunicação de componentes.

Alternativa correta! Esse é justamente o uso desses dois objetos, Props para configuração de componentes e State armazenando estado/valores!

Entenda o state como uma forma de atualizar a tela do usuário sem precisar renderizar toda a tela (pois isso demandaria muitos recursos do computador do usuário, render mesmo é só uma vez), o state quando atualizado atualiza a tela do usuário

Os arquivos do curso podem ser vistos [aqui](https://github.com/alura-cursos/1817-react-classes/tree/aula5)

Lembrando esse é o primeiro curso
