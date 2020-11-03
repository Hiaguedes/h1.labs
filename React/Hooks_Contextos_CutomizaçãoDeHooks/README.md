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
