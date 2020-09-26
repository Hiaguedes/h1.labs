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

Imagina que sua aplicação vai crescendo e tudo que é de estado fica dentro do state em `App.js` quando um componente mudar, todo o objeto é reescrito e por isso mais e mais recursos da máquina vão reescritos sem necessidade. Isso acarreta em um custo de performance
