# Usando js puro para SPA

A ideia aqui é transformar um programa já pronto (com server e cliente) para a forma de um framework do mercado, tudo com js puro, com isso vamos usar o webpack

Para esse projeto é bom que se tenha a versão do node do 10 para cima (de preferencia versões LTS)

## Primeira coisa modularizar os arquivos js

Aquela coisa, dar export nas funções que for usar (isso tira as funções do escopo global), importar as funçoes nos arquivos que forem executar a função e não esquecer do `type="module"` no html.

E podemos exportar de duas maneiras

```js

const listarClientes = () => {
    return fetch('http://localhost:4000/clientes')
    .then( resposta => {
      return resposta.json()
    })
    .then( json => {
      return json
    })
}

export { listarClientes }
```

E

```js

export const listarClientes = () => {
      return fetch('http://localhost:4000/clientes')
       .then( resposta => {
           return resposta.json()
        })
        .then( json => {
           return json
      })
}
```

Se tiver problema com o cors use o live-server que é sem ko

## Modularizando componentes com o webpack

O webpack se faz muito presente em todos os frameworks modernos

Fica o convite para a aula de webpack que eu já fiz e um resumo do que precisa no arquivo webpack.config.js na pasta do cliente aqui nesse repositório

Aprendemos que por padrão o webpack só entende arquivos JavaScript. O que devemos fazer para que ele possa "entender" outras extensões de arquivos como .css e imagens.

Devemos instalar e configurar os loaders, são eles que irão converter os arquivos em módulos válidos.

Exatamente!!, são os loaders que fazem essa conversão de arquivos.

Nessa aula vimos como funciona a refatoração na prática. Quais as vantagens que essa prática traz no nosso dia a dia como desenvolvedoras e desenvolvedores?

A refatoração auxilia na manutenção, legibilidade do código e facilita a adição de novas funcionalidades na aplicação

Correto! refatoração é um processo contínuo visando manter a saúde da nossa aplicação.

### Informação importante

Nesse projeto também colocamos a tabela de forma modularizada no webpack

## Criando rotas
