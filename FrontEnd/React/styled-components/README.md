# Abstraindo seu CSS com Styled Components

Esse curso vai falar sobre os benefícios de utilizar essa poderosíssima biblioteca que componetiza os módulos CSS da sua aplicação.

Quando colocamos arquivos css tudo em um arquivao só, ou até mais compactado, isso nos gera uma aplicação que não é muito escalar e que daqui a um tempo pode nos gerar muitas dores de cabeça, pois são muitas linhas de código em milhões de outros arquivos. E aproveitando a ideia do react de criar um arquivo para cada componente da aplicação então unificar o css daquele componente naquele arquivo é uma boa sacada.

Uma lista das principais motivações dessa biblioteca pode ser vista [aqui](https://styled-components.com/docs/basics#motivation) e nela podemos destacar como característica uma menor dor na hora de dar manutenção no site, já que sabemos exatamente onde estamos mechendo e o que está alterando pois não precisamos ficar caçando o que está alterando o quê

## Migrando componentes

Alice está criando migrando uma aplicação em React para utilizar a biblioteca de styled components. Em seu projeto ela tem o seguinte componente declarado:

```js
const Botao = ({children})=>{
  return(<button className="botao-geral">children</button>)}
  ```

E o estilo css desse botão é

```css
.botao-geral{
    background-color: #3f51b5;
    color: white;
    padding: 10px;
    border: none;
}
```

Ao transformar esse elemento em um Styled Component como ficará o código de Alice?

```js
const Botao = styled.buttonbackground-color: #3f51b5; color: white; padding: 10px; border: none;
```

Exatamente! Essa biblioteca nos ajuda a ter menos código quanto temos componentes muito simples além de evitar os conflitos com nomes de classes.

## Componetizando estilo global

O styled components oferece uma tag para que você possa colocar o estilo global (normalmente sendo o reset css) como em:

```js
import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: grey;
}
```

E dentro de createGlobalStyle podemos colocar os seletores que quisermos e aí podemos utilizar ele (tanto em index.js quando em app.js) como:

```js
import React from "react";

import Cabecalho from "./Components/Cabecalho";
import Container from "./Components/Container";
import { Global } from './Components/global';

function App() {
  return (
    <>
      <Global/>
      <Cabecalho />
      <Container />
    </>
  );
}

export default App;
```

Tranqulinho assim!

Em praticamente toda aplicação que vamos criar é necessário sobrescrever as configurações de estilos do navegador. Dessa forma garantimos uma experiência padronizada em todos os navegadores onde as pessoas podem acessar nossa aplicação.

Dentro do Styled Componenets utilizamos o método createGlobalStyle para conseguirmos aplicar esse reset CSS. O que essa função nos retorna quando chamamos ela?

Recebemos como retorno um novo componente estilizado que não possui as restrições de escopo para o CSS que aplicamos nele.

Isso mesmo! Normalmente quando criamos um componente estilizado as regras de CSS que aplicamos nele estão guardadas dentro do escopo daquele componente, dessa forma sabemos que elas não irão interferir com CSS de outros componentes. No caso do createGlobalStyle essa proteção é retirada e assim o CSS dele tem acesso global.

Rodrigo está muito acostumado a trabalhar com o React e durante o trabalho dele ele costuma passar pelas propriedades do componente partes do conteúdo que deve ser renderizado ou mesmo funções de manipulação de eventos.

Rodrigo precisa agora criar um componente de formulário que lide com o evento de submit dentro do componente, esse é o código q ele fez:

```js
const Form = styled.form`
   width: 100%;    
   onSubmit:${(props)=> props.aoEnviar} 
`;


<Form aoEnviar={**Função que quer chamar**}>
...
</Form>
```

Apesar de funcionar dessa maneira, a equipe de trabalho dele diz que essa não é uma boa prática. Qual o problema desse código?

Não precisamos dessa propriedade aoEnviar já que o componente que estamos criando será uma tag form do html, então poderíamos passar diretamente a propriedade onSubmit na hora de usarmos o componente e não na declaração dele.

<Form onSubmit={**Função que quer chamar**}>
...
</Form>

Sim, dessa maneira fica mais claro para quem usa esse componente o que ele fará quando o evento de formulário for enviado.

Podemos fazer isso já que o Styled Components passa todas as props de um elemento HTML para o DOM na hora de renderizar.

Alternativa correta
Os componentes criados com Styled Components devem se preocupar apenas com a definição do estilo daquele componente e não de como ele deve se comportar.

Sim, ao adicionarmos código de comportamento dentro da definição do componente estilizado estamos quebrando o princípio da única responsabilidade.

## Heranças de Estilos

Existem certos componentes que tem uma estilização externa, como um display flex, uma margin e coisas do tipo e para isso podemos herdar estilos de outros componentes como em:

```js
const Wrapper = styled(OutroWrapper)`
    margin: 1rem;
`
```

Com isso o componente wrapper herda o estilo de OutroWrapper e adiciona a margin, isso é bem útil.

A ideia do styled components é enxugarmos o css dentro de componentes e fazendo isso da maneira mais performática possível

## Utilizando media queries

Para fazer a media query de um elemento css nós fazemos

```js
const Conteudo = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
}
`;
```

Simples assim

## Problema de Performance

Sempre que possível devemos evitar colocarmos a declaração de componentes dentro do método render dentro de componente baseados em classes e no caso de componentes funcionais não devemos declarar um componente dentro do outro.

Isso porque, caso um componente seja declarado dentro do método render ou dentro de um outro componente funcional ele será re-declarado a cada nova renderização e o React não conseguirá fazer cache desse componente, o que pode atrasar e muito a renderização da página.

Por isso, lembre-se de declarar seus componentes e styled components fora dos métodos de renderização do React.
