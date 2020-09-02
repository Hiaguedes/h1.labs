# Usando o Fetch API

Aprenda a criar e usar suas APIs no seu projeto :)

## Criando um objeto que representa dados a serem inseridos em uma tabela

Essa é a base de um objeto JSON, mas para isso é que consigamos criar esse objeto por nós mesmo. Caso tenhamos uma tabela com cpf e nome da pessoa uma forma de criar esse objeto é com:

```js
const Clientes =[
    {
        cpf: 66809433023,
        nome: "Jairo"
    },
    {
        cpf: 18875539081,
        nome: "Elena"
    },    {
        cpf: 14742079795,
        nome: "Hiago"
    }
];
```

## Agora colocando esse objeto na tabela

Primeiro de tudo precisamos colocar o conteúdo no corpo da tabela, de modo a termos um seletor do tipo data- no corpo como em

```html
    <tbody data-conteudo-tabela>

      
    </tbody>
```

Aí chamamos no js como:

```js
const tabela = document.querySelector('[data-conteudo-tabela]');
```

Assim chamamos a tabela, agora colocamos os dados na tabela com:

```js
const conteudo = (n) =>
{
return `     
<tr>
<td>${Clientes[n].cpf}</td>
<td>${Clientes[n].nome}</td>
</tr>
`
    
}

const adicionaTabela = () => {
    for(let i=0; i<Clientes.length;i++){
        tabela.innerHTML += conteudo(i);
    }
}
```

Porém os dados que são dados sensíveis (como o cpf da pessoa) está visivel no projeto e isso não é legal

E para isso temos a interação cliente-servidor onde o cliente manda uma requisição e o servidor nos dá uma resposta seguindos verbos do protocolo HTTP (como get, post, delete e put)

Para continuar a partir daqui teremos que ter o node instalado (a partir da versão 10) e o postman (pois ele nos dará a API do projeto)

## Usando dados do backend

No servidor colocado aqui nesse projeto temos o servidor escutando na porta 4000 (usei o node na versão 12 para funcionar), e dentro da url `localhost:4000/clientes` vemos uma api para ser consumida com os dados a serem inseridas na tabela.

Então o que faremos? Excluiremos todo o objeto cliente criado anteriormente e substituiremos da seguinte forma:

```js
const Clientes = fetch('http://localhost:4000/clientes');
```

O resultado obtido é agora que temos uma promise sendo feita

```console
Promise {<pending>}
__proto__: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Response
```

E a promisse é a forma assíncrona de mandar dados pelo javaScript, para isso eu acesso uma propriedade de uma promisse que se chama `then` que é o resultado de uma promisse bem sucedida e com isso acessarmos a resposta em um documento json da seguinte forma:

```js
const Clientes = fetch('http://localhost:4000/clientes')
.then(response => response.json());
```

Aí vem a paarte de ter o arquivo json para se usar, mas primeiro vamos criar uma pasta de api que terá essa parte de comunicação de forma que:

```js
export const Clientes =() =>{ 
return fetch('http://localhost:4000/clientes')
    .then(response => response.json())
    .then(json => json)
};
```

Assim é a parte de resposta por parte do fetch (não esqueça do return do fetch sem ele isso não funciona), então importaremos esse cliente na listagem com `import {Clientes} from './api/cliente.js';` e não esqueça de dizer que o arquivo é do tipo modulo, ou seja

```html
<script type="module" src="./js/listagem-cliente.js"></script>
```

### Respostas

Nessa aula implementamos o método global fetch() da API Fetch:

```js
listarClientes = () => {
return fetch("http://localhost:4000/clientes")
  .then( resposta => {
     return resposta.json()
  })
 .then( json => {  
    return json
  })
}
```

Qual o retorno da função listarClientes()?

```json
Alternativa correta
[{"id":1,"nome":"Jairo","cpf":"18875539081"},
{"id":2,"nome":"Maria ","cpf":"34657163027"}]
```

Perfeito A função listarClientes() nos devolve uma promise que depois de resolvida nos retorna os dados dos clientes.

E para postar o conteúdo? Não tão simples mas a resposta é:

```js
export const cadastroCliente = (nome,cpf) => {
    return fetch('http://localhost:4000/clientes/cliente', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            cpf: cpf
        })
    })
    .then(response => response.body);
}
```

Onde primeiro passamos o link de onde está o json e depois os cabeçalhos da requisição, com o nome do método, os headers e o que será publicado no corpo dela
