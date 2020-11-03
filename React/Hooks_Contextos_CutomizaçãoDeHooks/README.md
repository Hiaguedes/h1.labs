# Hooks, Contextos, boas práticas e hooks customizados

## Sobre Boa prática

Quando der evite usar switch case, procure renderizar um elemento de forma condicional colocando os jsx dentro de um array ou de um objeto chave valor com em:

```js
  const [etapaAtual,setEtapaAtual] = useState(0);

  function proximo(){
    setEtapaAtual(etapaAtual + 1)
  }
  const formularios = [
                        <DadosUsuario aoEnviar={proximo}/>,
                        <DadosPessoais aoEnviar={proximo} validarCPF={validarCPF}/>,
                        <DadosEntrega aoEnviar={aoEnviar}/>
                      ]

  return (
    <>
    {
      formularios[etapaAtual]
    }
    </>
  );
```

Onde a função próximo é executada dentro das funções como em:

```js
    <form
      onSubmit={(event) => {
        event.preventDefault();
        aoEnviar();
      }}
    >
```

A esse técnica nós chamamos de injeção de dependências do react.

## Assincronicidade no setState

Dado o código abaixo:

```js
function Pessoa(){
    const [idade, setIdade] = useState(25);

    function aniversario(){
        setIdade(idade+1);
        console.log(idade);
    }

    return(<>....</>);

}
```

Qual o valor esperado de vermos no console ao chamarmos a função aniversario?

Veremos o valor 25, já que a função setIdade é assíncrona e o componente não irá esperar a execução dela antes de ir para a próxima linha

Isso mesmo, o valor esperado é o valor da variável idade antes dela ser alterada.

## O useEffect para resolver problemas de assincronicidade do state

Quando trabalhávamos com classes no react nós usávamos o ComponentDidMount para saber se o componente era montado e assim poder realizar operações sobre ele, quando falamos de funções no react isso não existe mas existe algo mais poderoso que é o useEffect que faz o componentDidMount, componentDidUpdate e o componentWillUnmount (sendo uma boa para depurar o código com o console.log)

O useEfect aceita dois parâmatros, uma função e um array esse array é usado como atualização dos dados caso algum dos elementos que estejam dentro desse array se atualizem, reescrevendo os setters que estejam dentro da função

## Aquecendo para o context

Da maneira que temos nosso componente FormularoCadastro até esse momento ele recebe algumas propriedades que ele não faz nada com elas, o único que ele faz é repassar essas propriedades para os componentes filhos dele.

Essa maneira de trabalhar com propriedades é chamada de prop drilling e é considerada uma má prática. Reflita sobre o problema e assinale a alternativa que mostra o problema com essa abordagem.

Quando um componente recebe uma propriedade que ele não irá utilizar isso aumenta a complexidade dele sem gerar nenhum benefício. Além disso essa abordagem gera um acoplamento muito grande entre os componentes da aplicação.

Correto! Esse acoplamento muito forte entre os componentes dificulta a reutilização deles.

### Context para utilizar dados vindos do pai e que se usa no neto sem precisar sem que o filho saiba

Para usar um contexto primeiramente eu tenho que criar um contexto dentro de um arquivo em separado da seguinte forma

```jsx
import React from 'react';

const validacoesCadastro = React.createContext();

export default validacoesCadastro;
```

Aí tiraremos qualquer passagem de bastão de informação como em ser

```jsx
                        <DadosUsuario aoEnviar={coletarDados} validacoes={validacoes}/>,
                        <DadosPessoais aoEnviar={coletarDados} validacoes={validacoes} />,
                        <DadosEntrega aoEnviar={coletarDados} validacoes={validacoes}/>,
```

Aqui apenas estamos passando as validacoes e não necessariamente a usando, então capa essa parte `validacoes={validacoes}`

E aí no pai onde se cria a informação nós englobamos o elemento onde queremos contextualizar da seguinte format

```jsx
        <validacoesCadastro.Provider value={{cpf:validarCPF, senha:validarSenha}}>

            <FormularioCadastro aoEnviar={aoEnviarForm}/>
        </validacoesCadastro.Provider>
```

E aí não importa quem for filho de FormularioCadastro, ele vai subir a hierarquia para pegar o valor que no caso é {cpf:validarCPF, senha:validarSenha}

E para utilizarmos esse contexto nós faremos com

```jsx
import validacoesCadastro from "../../contexts/validacoes";
import React, { useState, useContext } from "react";

function ... {
     const validacoes = useContext(validacoesCadastro)
}
```

Caso você não queira passar o provider por que isso coloca mais complexidade no código você pode passar as informações dentro do createContext como email

```jsx
const MyContext = React.createContext(defaultValue);
```

Olhe a documentação do react [aqui](https://reactjs.org/docs/context.html#reactcreatecontext)

Você pode fazer dessa forma já que você está importando o contexto de qualquer forma

## Aquecendo para hooks customizados

Vimos que muito da lógica entre os componentes do formulário estava duplicada e precisávamos fazer uma refatoração para extrair essa lógica. Para isso criamos um hook customizado dentro do nosso projeto. Por que precisamos de um hook e não podemos usar uma função JS padrão para isso?

Precisamos de um hook customizado porque precisávamos utilizar outros o useState e isso só é possível dentro de componentes React ou hooks customizados.

Exatamente, se não fizéssemos isso a abstração criada teria que receber tudo a partir de parâmetros e o código ficaria mais complicado do que usando essa abordagem.

### Agora sobre os hooks customizados

Por padrão todo hook customizado tem que começar com use alguma coisa, e os hooks customizados estão aí para combatermos repetição de código por parte de estados repetidos, hooks repetidos e retornos e funções parecidas, sendo uma ótima para se organizar o código e deixar-lo mais suscinto

Os arquivos da aula podem ser vistos [aqui](https://github.com/alura-cursos/1898-react-multpartForm/tree/aula5)
