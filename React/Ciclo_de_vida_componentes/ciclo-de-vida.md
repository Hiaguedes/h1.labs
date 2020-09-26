# Continuando o curso de react

## Importando imagens

Posso importar imagens no react pelo html com:

```js
import deleteSVG from "../../assets/img/delete_forever.svg";
```

E aí no html do jsx podemos fazer

```jsx
<img src={deleteSVG} alt="Botão de delete, usado pra deletar o card"/>
```

Ou eu posso tratar como um componente do react como em

```js
import {ReactComponent as DeleteSVG} from "../../assets/img/delete_forever.svg";
```

E aí colocaremos no jsx como

```jsx
<DeleteSVG/>
```

Lindo né, mas se atente pois precisamos colocar com letras maiúsculas

Vimos que é muito comum precisarmos passar propriedades de um componente para ou outro e dessa maneira podemos passar referências para comportamentos que componentes mais abaixo de uma hierarquia precisam devem executar.

Sobre as propriedades marque a alternativa correta:

Ao recebermos uma propriedade dentro de um objeto não podemos alterar ela pois ela é imutável.

Exatamente, propriedades são imutáveis e isso nos garante que ao passarmos um valor para um objeto ele não será alterado.

## Elemento que não receb estilização

Como o JSX nos obriga a retornar uma tag html apenas (podendo ter vários aninhados) podemos retornar uma tag fragmentada como:

```jsx
    render() { 
        return ( 
            <>
            <ul>
                <li>Categoria</li>
            </ul>
            <input placeholder='olá' type="text"/>
            </>
         );
    }
```

Onde essa tag `<>` vazia, serve para dizer que não teremos nenhum estilo aplicado nela

Ao trabalharmos com React é muito comum termos uma grande quantidade de componentes para criarmos o site que planejamos. Podemos separar nossos componentes em duas grandes categorias, os statefull components e os stateless components.

O que diferencia essas duas categorias de componentes e quais devemos priorizar na hora de criarmos nossa aplicação?

Enquanto o stateless não guarda nenhum estado interno e tem sua renderização definida apenas pelas propriedades que recebe, um componente statefull gerencia e distribui estado entres diferentes partes do nosso sistema. Por isso, devemos sempre priorizar componentes stateless

Exatamente, o gerenciamento de estado é algo naturalmente complexo porém precisamos dele, mas precisamos trabalhar ativamente para manter esse gerenciamento organizado e de fácil manutenção.

No decorrer do projeto, utilizamos state e props para compor a lógica da nossa aplicação.

Props são propriedades que passamos de um componente para outro quando o componente filho precisa de uma informação que o componente pai possui.

Já o state é uma forma de salvar informações que serão observadas pelo Virtual Dom.

Qual é um bom exemplo de uso do State?

```js
        this.state = {
            nomes: [],
        };
```

Um array de nomes que será preenchido pelos dados que vierem de uma API.

É isso mesmo! Como o estado serve para guardar valores que podem vir a mudar com a interação do usuário com o componente (por exemplo, ao consumir e alterar os dados que existem na API) e que tem efeito na renderização do mesmo (para que o Virtual DOM possa se encarregar de recarregar esse componente se necessário), esse é um ótimo uso!

Dentro dos componentes temos um atributo especial que é o state normalmente usamos ele para guardar informações mutáveis do nosso elemento ao invés de usarmos atributos "comuns" de classes do JS.

Porque preferimos guardar informações mutáveis dentro do state e não fora dele?

Preferimos guardar informações mutáveis dentro do state porque ao fazermos isso o React cuida de fazer uma nova renderização do componente, e vemos as informações serem atualizadas no DOM

Isso mesmo! Ao renderizar um elemento o React também renderiza novamente os elementos filhos daquele o qual o state foi alterado.

## Probelmas de guardar tudo no state

Imagina que sua aplicação vai crescendo e tudo que é de estado fica dentro do state em `App.js` quando um componente mudar, todo o objeto é reescrito e por isso mais e mais recursos da máquina vão reescritos sem necessidade. Isso acarreta em um custo de performance. Então o interessante é termos uma forma de atualizarmos somente aquilo que é necessário para não comprometer a aplicação toda

### O padrão Observable (e as notificações do seu facebook)

Então o certo a se fazer é capar o state do app.js e chamar classes (que são chamadas de fonte de dados) que vão cuidar da view para a gente, mas como fazer isso se o state é responsável por atualizar a tela para a gente?

O padrão observable consiste em mudanças de acontecimentos de uma determinada fonte de dados, se essas mudanças forem feitas e eventos estiverem inscritas a receber essas mudanças então elas serão notificadas para isso, e dependendo do fluxo de dados o objeto pode se desinscrever ou não daquela fonte. Esse método simples e muito útil é chamado de Observable

Ações como o de se inscrever são ações que causam efeitos no código, pois se eu me inscrevo automaticamente eu tenho que ser capaz de me desinscrever e por isso eu não inscrevo uma elemento no construtor e sim no `ComponentDidMount` que é relacionado com como o React renderiza as coisas por trás dos panos

Todos componentes que criamos para uma aplicação React são gerenciados pelo próprio React, porém ele nos da acesso para colocarmos a execução de código em determinados momentos do ciclo de vida do React. Um desses pontos de acesso é o método componentDidMount.

Quando o componentDidMount é chamado e o que podemos fazer dentro desse método?

Esse método é chamado assim que o componente é criado e está pronto, é dentro desse método que devemos iniciar chamadas para API ou executar código que tem efeito colateral.

Sim, nesse momento do ciclo de vida o React já nos deixar chamar a função setState e dessa maneira podemos atualizar o componente com o retorno de uma chamada para APIs por exemplo.

Para desisncrever temos o component will Unmount, e ele é usado no processo de desmontagem

O conteúdo completo pode ser visto [aqui](https://github.com/alura-cursos/1841-react-observable/tree/aula5)
