# Node.js

O Node nada mais é do que uma plataforma que possibilita o desenvolvimento de aplicações no backend utilizando a linguagem mais conhecida da web: o JavaScript, que inicialmente foi criada para rodar somente no navegador.

O objetivo é executarmos uma aplicação em Javascript no backend, fazendo com que ela receba requisições do navegador e devolva respostas, tudo por meio do famoso Protocolo HTTP.

## Primeiros Passos

O primeiro passo é trivial, instalar a linguagem hahaha o curso recomenda a versão 10 mas vou usar a versão 14. O node uso o js para 'compilar' os arquivos para isso basta fazer

```node
node nomedoarquivo.js
```

Porém o node é muito mais que somente compilar e ver o resultado do console.log no terminal, o node é feito para o backend ou seja, podemos construir servidores com o node e é isso que vamos ver.

Perguntinha:

Juliana sempre gostou muito da linguagem JavaScript! Portanto, logo após assistir na primeira aula como fazer para executar o primeiro código com Node, já resolveu ir além e executar o seguinte código:

```js
// indo-alem.js

console.log('Olá mundo, Node!');
alert('O show tem que continuar!');
```

Ao ser executado o terminal irá imprimir:

```js
Olá mundo, Node!
alert('O show tem que continuar!');
^

ReferenceError: alert is not defined
```

Muito bem, aluno! Está correto! A função `alert()` está definida apenas no navegador! Portanto, como os códigos da plataforma Node rodam do lado do servidor, essa função não está definida e tal erro ocorre. alert é pro browser o node não é um browser

## Criando um servidor web

O legal do node é que ele já conta com um módulo node capaz de receber um prótocolo HTTP e de dar ao cliente uma resposta satisfatória. Entenda módulo node como uma biblioteca que contém diversas funcionalidades próprias. Pro node um arquivo js já é um módulo. A palavra chave para trazer bibliotecas é o `require`

Inicialmente utilizaremos uma biblioteca nativa do node chamada `http` e para criar um servidor inicial faremos

```js
const http = require('http');

const server = http.createServer();
});
console.log('Escutando a porta 3000');
server.listen(3000);
```

Onde no mundo node escutaremos muito a porta 3000 a ser usada, diferente da porta 8080 do java e da porta 80 do php. Porém se digitarmos no browser `localhost:3000` o borwser carregará infinitamente e não dará nenhuma resposta. Sacou? Temos que dizer qual a resposta do servidor ao acessarmos o site.

Passando o mouse por cima da função `createServer` vemos que ela aceita uma função de callback e lá colocaremos dois parâmetros chamada requisição e resposta, nossa resposta será algo como:

```js
const http = require('http');

const server = http.createServer((req, res) =>{
    res.end(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body>

        </html>
    `);
});
console.log('Escutando a porta 3000');
server.listen(3000);
```

Onde como resposta colocaremos o html inicial do site, mas esse servidor tem um problema. Se digitarmos `localhost:3000/ameixas_em_conserva` nós teremos a mesma resposta do que em `localhost:3000` ou qualquer url com esse domínio e isso não é bom, apesar de termos um servidor em andamento

### O primeiro servidor

Mariana resolveu colocar a mão na massa e de cara criar o seu primeiro servidor HTTP para testar o que foi visto em aula!

```js
// servidor.js

const ip = 'localhost';
const porta = 3000;
http.createServer(function (req, resp) {
   resp.end('<html><body><a href="http://www.alura.com.br">Site da Alura</a></body></html>');
}).listen(porta, ip);
```

O que podemos afirmar sobre o código de nossa colega?

O código não irá funcionar, pois faltou importar o módulo HTTP do Node através do trecho de código const http = require('http');.

Muito bem, aluno! Está correto! Infelizmente nossa colega acabou esquecendo que é necessário utilizar a função require() que permite importar para o nosso código algum módulo Node.

## Criando rotas

Rotas são justamente subdomínios que temos dentro da nossa aplicação e para que isso funcione no código que montamos precisamos saber qual a url da requisição para isso usaremos a `req.url` e inicialmente criarmos a lógica das rotas como em:

```js
const http = require('http');

const server = http.createServer((req, res) =>{
    let html ='<h1>404 página não encontrada</h1>';
    if (req.url == '/'){
     html = `
     <!DOCTYPE html>
     <html lang="pt-br">
     <head>
         <meta charset="UTF-8">
     </head>
     <body>
         <h1> Casa do Código </h1>
     </body>

     </html>
 `
    }else if (req.url == '/livros'){
        html = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Livros da Casa do Código </h1>
        </body> 
        </html>
        `
    }

    res.end(html);
});
```

Veremos depois que essa não é a melhor abordagem mas é um bom caminho, onde nela dizemos quais são as rotas raiz `\` e a rota `\livros` além de termos um html padrão para uma página não encontrada ou a famosa 404. Pois essa abordagem gera uma complexidade ciclomática e quanto mais caminhos pior será de dar manutenção nesse código, e pra isso o ideal é diminuirmos os ifs.

Sem contar que o método HTTP tem métodos do tipo GET, POST, DELETE e por aí vai. O ideal é utilizarmos esses métodos para trabalharmos no backend e para isso vamos usar o módulo node express mas antes vamos dizer que nossa aplicação é uma aplicação node para isso dentro da pasta do projeto daremos um `npm init` o npm nada mais é que o gerenciador de pacotes do node (node package manager), que já vem instalado no node e ao responder as perguntas necessárias (onde o ponto de entrada é o server.js) nós teremos um arquivo package.json que realmente trata nosso arquivo como um projeto node e com ele podemos instalar o express, porém cuidado por que o mundo javaScript muda muito rápido então nem sempre a versão mais atualizada tem a mesma semântica que tinha anteriormente e para garantir a instalação de uma determinada versão usaremos:

```cmd
npm install pacote-node@numero-da-versao
```

Só que instalando dessa forma eu estarei instalando o pacote na minha máquina e se outra pessoa quiser utilizar-la? Vai ficar difícil né, para isso temos duas extensões o --save que salva uma depêndencia de produção e o --save-dev que salva uma depência de desenvolvimento, caso queiramos exatamente aquela versão escrevemos --save-exact

### Resumo sobre o node

O Node é uma plataforma que permite a utilização da linguagem JavaScript para desenvolvimento de aplicações server side.

Muito bem, aluno! Está correto! O Node.js é uma plataforma, (ou um ambiente de execução para códigos javascript) escrita sobre a engine de Javascript do Chrome, a V8. Ele é todo baseado em eventos e suas operações são não-bloqueantes, o que lhe confere bastante eficiência e leveza.

O npm é o gerenciador de pacotes do Node.

Muito bem, aluno! Está correto! Ele tem a função de gerenciar os projetos e pacotes JavaScript externos que precisemos utilizar em cada aplicação. Quando o Node é instalado, o npm também é (em grande parte dos sistemas operacionais), e com certeza será muito útil em qualquer projeto desenvolvido sobre o Node, visto que é muito comum que se precise de libs externas para facilitar o desenvolvimento de certas funcionalidades.

A pasta node_modules contém todas as depêndencias que aquele projeto precisa para funcionar no seu sistema operacional, por isso qu quando comitamos essa pasta essa pasta tende a ser ignorada pois não precisamos dessa mesma pasta para outro sistema e sim de outra, o package.json que prexisa ser compartilhado com outra pessoa e aí o node faz o download dessas dependências, por isso sempre que nos depararmos com um projeto node devemos dar um `npm install`

## Utilizando o express

A biblioteca express que fica no nosso node_modules nos retorna uma função então uma utilização básica dessa biblioteca externa seria da seguinte forma:

```js
const express = require('express');
const app =express();

app.listen(3000, () => {
    console.log('Servidor Rodando na porta 3000');
});
```

Dessa forma no nosso browser teremos a seguinte resposta:

Cannot GET /

Para isso o código de rotas básico usando o express seria:

```js
const express = require('express');
const { response } = require('express');
const app =express();

app.listen(3000, () => {
    console.log('Servidor Rodando na porta 3000');
});

app.get('/', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body>

        </html>
 `
    );
});

app.get('/livros', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Livros da Casa do Código </h1>
        </body>

        </html>
 `
    );
});
```

Onde com o atributo get conseguimos criar as rotas devidas para nossa aplicação

## Isolando responsabilidades

Existe um príncipio na programação que nos diz que cada arquivo deve ter apenas uma única responsabilidade então dar conta de diversas rotas em um único arquivo não é a melhor escolha, por mais que dê certo, então a sacada na parte do server é criarmos uma pasta `src` e dentro dela duas pastas uma chamada `config` onde ficarão os arquivos de configuração de biblioteca e outra de `app` onde podem ficar nossas rotas, e para a pasta de configuração do express vamos criar um arquivo js chamado `custom-express` que contém toda a parte de utilização da biblioteca e para isso precisarmos exportar essa nova biblioteca da seguinte forma

```js
const express = require('express');
const app = express();

module.exports = app;
```

Perfeito dessa forma exportamos uma variável do módulo chamado app e para utilizarmos essa biblioteca no ponto de entrada nós faremos no ponto de entrada

```js
const app = require('./src/config/custom-express');
```

Onde eu preciso apontar pro caminho exato dentro do meu projeto

Isolando o Express

Após a aula, Clara fez o seguinte código para tentar isolar a configuração do Express:

```js
// server.js

const app = require('./src/config/custom-express');

app.listen(3000, function() {
   console.log(`Servidor rodando na porta 3000`);
});
// custom-express.js

const express = require('express');
const app = express();
```

Sobre o código, podemos afirmar corretamente:

Alternativa correta
O código não funcionará corretamente, pois a constante app não foi exportada pelo módulo custom-express.

Muito bem, aluno! Está correto! Nossa colega esqueceu de adicionar a linha module.exports = app ao arquivo custom-express.js.

## Agora para a parte de rotas

Dentro da pasta app criaremos uma pasta chamada routes onde colocaremos todas as nossas rotas, então dessa forma dentro do arquivo `custom-express` faremos o chamamento das rotas da seguinte forma

```js
const routes = require('../app/routes/routes');
routes(app);
```

Onde dizemos exatamente onde está o módulo das rotas e invocamos a função rota com um parâmetro chamados app (que na verdade já foi chamada antes) e a função rotas é tal que

```js
module.exports = (app) => {

app.get('/', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body>

        </html>
 `
    );
});

app.get('/livros', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Livros da Casa do Código </h1>
        </body>

        </html>
 `
    );
});

};
```

Onde ele recebe a variável app e retorna por meio de callback o html para ser colocada na tela

## Live reloading para não precisar parar o servidor, rodar o comando e testar

Toda que vez que salvamos o arquivo com o live server do vscode nós já temos o programa atualizado (só que no desenvolvimento front end) seria legal colocarmos isso no nosso server para que a nossa vida fique mais livre, leve e solta. Uma forma bem famosa de fazer isso é com o Nodemon, e na hora que for instalar instaleo como depência de desenvolvedor pois não precisamos do nodemon para fazer o projeto rodar, somente para ajudar no desenvolvimento

E podemos instalar esse pacote de maneira global com -g, dessa forma ele instala no sistema operacional a biblioteca, podendo ser usada em qualquer projeto e agora para rodar o programa usaremos o comando nodemon invés de somente node, para isso bastar atualizar a página

## Views estáticas e dinâmicas com o marko

O marko consegue operar com o express para isso só precisamos dentro da custom express importar duas bibliotecas que são

```js
require("marko/node-require");
var markoExpress = require("marko/express");
```

E dessa forma criaremos uma pasta chamada views e criaremos um arquivo marko com o html necessário e então dentro das rotas colocaremos algo como

```js
app.get('/livros', (req, res) => {
    res.marko(
        require('../views/livros/listagem/listagem.marko')
    );
});
```

E assim na url /livros conseguimos uma view da forma como queremos, mas até aí nada demais né? Mas e se eu te dissesse que podemos alterar a página dinamicamente? Pois é, é isso que iremos

### Pergunta sobre o marko

Aprofundando no MarkoJS
PRÓXIMA ATIVIDADE

MarkoJS é uma biblioteca que nos permite diversas possibilidades quando o assunto é criação de templates!

Por isso, para testar algumas dessas possibilidades, João fez o seguinte código:

```marko
<!-- home.marko -->

<include('./layout.marko')>
   <@cabecalho>
       <h1>Casa do Código - Home</h1>
   </@cabecalho>
</include>

$ var livrosPromise = new Promise((resolve, reject) => {
   setTimeout(function() {
       resolve([
           {
               titulo: 'Cangaceiro Node'
           },
           {
               titulo: 'Node na prática'
           }
       ]);
   }, 1000);
});

<await(livros from livrosPromise)>
   <div for (livro in livros)>Título: ${livro.titulo}</div>
</await>
<!-- layout.marko -->
<html>
   <body>
       <include(input.cabecalho)/>
   </body>
</html>
```

Sobre o código, podemos afirmar corretamente:

DICA: Para saber mais sobre as possibilidades que o MarkoJS disponibiliza, dê uma olhada na documentação do Marko! <https://markojs.com/docs/getting-started/>

Alternativa correta
O código não funcionará, pois o MarkoJS não disponibiliza a sintaxe <@cabecalho>.

Incorreto! O MarkoJS disponibiliza essa sintaxe para possibilitar a introdução de conteúdo externo em templates, bastando para isso utilizarmos o símbolo @ seguido do nome da seçao que desejamos criar. No código de nosso colega, o nome utilizado foi @cabecalho, mas poderia ter sido um outro nome qualquer que fosse iniciado por @! Para saber mais: https://markojs.com/docs/core-tags/#layouts-with-nested-attributes

Alternativa correta
O código não funcionará, pois o MarkoJS não disponibiliza um componente `<await>`.

Incorreto! O MarkoJS disponibiliza um componente `<await>` que pode ser utilizado, como no exemplo, para carregamento de dados assíncronos! Para saber mais: <https://markojs.com/docs/core-tags/#async-content>

Alternativa correta
O código funcionará corretamente.

Muito bem, aluno! Está correto! O código criará uma página com um cabeçalho de título "Casa do Código - Home", e exibirá uma listagem de livros 1 segundo após o carregamento da página.

Alternativa correta
O código não funcionará, pois o MarkoJS não disponibiliza um componente `<include>`.

Incorreto! O MarkoJS disponibiliza um componente `<include>` que é ser utilizado, como no exemplo, para incluir um trecho de template definido em outro arquivo! Facilitando, assim, a reutilização de determinados trechos de código em diferentes páginas! Para saber mais: <https://markojs.com/docs/core-tags/#reusable-content>

## Persistência de dados

Pedro fez a seguinte implementação da funcionalidade de listagem de livros:

```js
// rotas.js

const db = require('../../config/database');

module.exports = (app) => {

   app.get('/livros', function(req, resp) {
       db.all('SELECT * FROM livros', function(erro, resultados) {
           resp.marko(
               require('../views/livros/lista/lista.marko')
           );
       });
   });
};
```

Sobre o código, podemos afirmar corretamente:

O código não está correto pois faltou passar ao template os dados obtidos do banco de dados da seguinte forma:

```js
// rotas.js

const db = require('../../config/database');

module.exports = (app) => {

   app.get('/livros', function(req, resp) {
       db.all('SELECT * FROM livros', function(erro, resultados) {
           resp.marko(
               require('../views/livros/lista/lista.marko'),

               // faltou adicionar as 3 linhas a seguir.
               {
                   livros: resultados
               }
           );
       });
   });
};
```

Muito bem, aluno! Está correto! Realmente nosso colega acabou esquecendo de passar ao template os livros que pegou no banco de dados.

### Padrão DAO (Data access object)

Seguindo em frente, agora para implementar o padrão DAO com Promises, nosso colega Pedro fez o seguinte:

```js
// rotas.js

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
   app.get('/livros', function (req, resp) {
      livroDao.lista()
         .then(livros => resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
               livros
            }
         ))
         .catch(erro => console.log(erro));
   });
};
```

```js
// livro-dao.js

class LivroDao {

   constructor(db) {
       this._db = db;
   }

   lista() {
       return new Promise((resolve, reject) => {
           this._db.all(
               'SELECT * FROM livros',
               (erro, resultados) => {
                   if (erro) return reject('Não foi possível listar os livros!');

                   return resolve(resultados);
               }
           )
       });
   }
}

module.exports = LivroDao;
```

Sobre o código, podemos afirmar corretamente:

O código não está correto, pois faltou criar uma instância da classe LivroDao definida no módulo livro-dao passando a ela um objeto representando o banco de dados utilizado. Portanto, o correto seria fazer:

```js
// rotas.js

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {
   app.get('/livros', function (req, resp) {
      const livroDao = new LivroDao(db); // Criar a instância da classe LivroDao.
      livroDao.lista()
         .then(livros => resp.marko(
            require('../views/livros/lista/lista.marko'),
            {
               livros
            }
         ))
         .catch(erro => console.log(erro));
   });
};
```

Muito bem, aluno! Está correto! Realmente nosso colega acabou esquecendo desses detalhes o que acarretaria num erro ao executar a aplicação.

### Vantagens do DAO

Você entendeu as vantagens do padrão de projeto DAO? Vamos verificar isso marcando as respostas corretas!

O padrão de projeto DAO permite dar maior semântica aos nossos códigos, como foi o caso do que ocorreu no módulo de rotas da nossa aplicação.

Muito bem, aluno! Está correto! Essa é uma das utilidades do padrão DAO, e também da grande maioria dos padrões de projetos existentes.

Quando implementamos o padrão DAO, como convenção, sempre criamos uma estrutura com um nome que se inicia pelo tipo de dados acessado (no nosso caso livro) e termina com a palavra DAO. Por isso, no nosso caso, criamos uma classe com o nome LivroDao. Isso é feito para facilitar o entendimento de que aquela classe se refere ao acesso de dados do tipo livro.

Muito bem, aluno! Está correto! O objetivo das convenções é justamente facilitar a vida dos desenvolvedores e estabelecer um padrão comum a todos.
a
O padrão DAO permite que façamos acesso aos dados sem nos preocuparmos em como esse acesso é feito ou onde os dados estão armazenados.

Muito bem, aluno! Está correto! Como visto em aula, o padrão DAO é para acesso a dados! Portanto, independentemente se dados estão armazenados num banco de dados, num arquivo xml ou numa planilha, esse padrão é muito bem vindo!

## Cadastrando livros com middlewares

Para se aprofundar um pouco mais nas possibilidades que os middlewares nos oferecem, João pesquisou um pouco sobre o assunto e descobriu que o método use() do Express pode receber dois parâmetros, sendo o primeiro uma string que define as URLs que serão atendidas pelo middleware e como segundo parâmetro uma função. É essa função que irá definir o que o middleware deverá fazer e, por sua vez, recebe três parâmetros, a requisição, a resposta e uma função (normalmente chamada de next) que deve ser invocada para que o Express avance para o próximo middleware existente e caso não exista mais nenhum, passa a execução para a rota ativada. Sendo assim, a ordem em que os middlewares são definidos é de extrema importância! Além disso, um detalhe a ser observado, é que tudo que estiver antes da chamada da função next será executado antes da rota ativada e o que estiver após a chamada da função next será executado somente ao término da rota ativada!

Para saber mais: <http://expressjs.com/pt-br/guide/using-middleware.html>

Desse modo, para treinar o que aprendeu, nosso colega escreveu o seguinte código:

```js
// custom-express.js

const express = require('express');
const app = express();

app.use('*', (req, res, next) => {
   console.log('1.1');
   next();
   console.log('1.2');
});

app.use('*', (req, res, next) => {
   console.log('2.1');
   next();
   console.log('2.2');
});
// rotas.js

module.exports = (app) => {

   app.get('/livros', function(req, resp) {
       console.log('listagem livros')
       const livroDao = new LivroDao(db);
       livroDao.lista()
               .then(livros => resp.marko(
                   require('../views/livros/lista/lista.marko'),
                   {
                       livros: livros
                   }
               ))
               .catch(erro => console.log(erro));
   });
};
```

A saída que nosso colega terá em seu terminal ao acessar a URL <http://localhost:3000/livros> será:

1.1
2.1
listagem livros
2.2
1.2

Muito bem, aluno! Está correto! É exatamente essa a saída que nosso colega irá obter!

### Sobre middlewares, podemos afirmar corretamente:

Como o próprio nome indica, são trechos intermediários de código que são executados entre o envio da requisição e seu tratamento pela rota ativada!

Muito bem, aluno! Está correto! Essa é exatamente a definição de um middleware.

Alternativa correta
O middleware, de modo geral, é composto por um padrão de URLs que são usadas para o ativar e um callback que recebe a requisição, a resposta e uma função, normalmente chamada de next, que deve ser invocada para que o processamento da requisição siga em frente.


Muito bem, aluno! Está correto! De modo geral, o padrão de um middleware é:

```js
const express = require('express');
const app = express();

app.use('*', (req, res, next) => {

   // código do middleware.
});
```

Alternativa correta
Uma aplicação possível de um middleware seria a contagem de tempo gasto ao executar uma rota.


Muito bem, aluno! Está correto! Dado que dentro do middleware tudo que está antes da chamada da função next é executado antes da rota ativada e o que estiver após a chamada de next é executado após a rota, então poderíamos fazer a contagem do tempo da seguinte forma:

```js
const express = require('express');
const app = express();

app.use('*', (req, res, next) => {
   const inicio = new Date().getTime();
   next();
   const final = new Date().getTime();

   const milissegundosDecorridos = final - inicio;
});
```

### Implementando o cadastro

Cristina fez o seguinte código para o cadastro de livros:

```js
// rotas.js

const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

   // demais rotas criadas.

   app.get('/livros/form', function(req, resp) {
       resp.marko(require('../views/livros/form/form.marko'));
   });

   app.post('/livros', function(req, resp) {

       const livroDao = new LivroDao(db);

       livroDao.adiciona(req.body)
               .then(resp.redirect('/livros'))
               .catch(erro => console.log(erro));
   });
};
```

```marko
<!-- form.marko -->

<html>
   <body>
       <h1>Cadastro de livros</h1>

       <form action="/livros" method="post">

           <input type="hidden" name="id" />

           <div>
               <label for="titulo">Titulo:</label>
               <input type="text" id="titulo" name="titulo" />
           </div>

           <div>
               <label for="preco">Preço:</label>
               <input type="text" id="preco" name="preco" placeholder="150.25" />
           </div>
           <div>
               <label for="descricao">Descrição:</label>
               <textarea cols="20" rows="10"  id="descricao" name="descricao" placeholder="fale sobre o livro"></textarea>
           </div>

           <input type="submit" value="Salvar"/>
       </form>
   </body>
</html>
```

```js
// livro-dao.js

class LivroDao {

   constructor(db) {
       this._db = db;
   }

   adiciona({titulo, preco, descricao}) {
       return new Promise((resolve, reject) => {
           this._db.run(`
                   INSERT INTO livros (
                       titulo,
                       preco,
                       descricao
                   ) values (?,?,?)
               `,
               [
                   titulo,
                   preco,
                   descricao
               ],
               erro => {
                   if (erro) {
                       return reject('Não foi possível adicionar o livro!');
                   }

                   resolve();
               });
       });
   }

   // demais métodos do dao.
}

module.exports = LivroDao;

```

No entanto, nossa colega não tem certeza se o código dela está correto e se os dados do livro serão efetivamente inseridos no banco de dados.

Sobre isso, podemos afirmar como sendo correto:

O código não irá funcionar, uma vez que o método adiciona() da classe LivroDao deveria receber um livro quando no código de nossa colega recebe de maneira incorreta {titulo, preco, descricao}.

Incorreto! A sintaxe utilizada por nossa colega é permitida a partir do ES6 e se chama destructuring assignment ou object destructuring! Para saber mais: <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Atribuicao_via_desestruturacao>

Alternativa correta
As informações não serão cadastradas como esperado, pois é necessário utilizar um middleware para obter as informações enviadas no corpo da requisição POST.

Muito bem, aluno! Está correto! Nossa colega esqueceu de configurar o middleware body-parser da seguinte forma:

```js
// custom-express.js

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
   extended: true
}));
```

Joana fez o seguinte código para implementar a funcionalidade de remoção de livros:

```html
<!-- lista.marko -->

<html>
   <head>
       <meta charset="utf-8">
   </head>
   <body>
       <h1> Listagem de livros </h1>

       <table id="livros">
           <tr>
               <td>ID</td>
               <td>Título</td>
               <td>Preço</td>
               <td>Editar</td>
               <td>Remover</td>
           </tr>
           <tr id="livro_${livro.id}" for (livro in data.livros)>
               <td>${livro.id}</td>
               <td>${livro.titulo}</td>
               <td>${livro.preco}</td>
               <td><a href="#">Editar</a></td>
               <td><a href="#" data-ref="${livro.id}" data-type="remocao">Remover</a></td>
           </tr>
       </table>

       <script src="/estatico/js/remove-livro.js">
       </script>
   </body>
</html>
```

```js
// rotas.js

module.exports = (app) => {

   // demais rotas.

   app.delete('/livros/:id', function(req, resp) {
       const id = req.params.id;

       const livroDao = new LivroDao(db);
       livroDao.remove(id)
               .then(() => resp.status(200).end())
               .catch(erro => console.log(erro));
   });
};
```

Sobre o código de nossa colega, e considerando que, assim como na aula, o arquivo remove-livro.js está na pasta src/app/public/js e implementado da forma correta, marque as alternativas que indicam afirmativas corretas.

O código não está completo, pois faltou configurar o middleware do Express para acesso a arquivos estáticos do projeto.

Muito bem, aluno! Está correto! Foi exatamente isso que nossa colega deixou escapar! O código que ficou faltando foi:

```js
// custom-express.js

const express = require('express');
const app = express();

app.use('/estatico', express.static('src/app/public'));
```

Seguindo em frente, Joana agora fez o seguinte código para implementar a última funcionalidade, a de edição de livros:

```marko
<!-- lista.marko -->

<html>
   <head>
       <meta charset="utf-8">
   </head>
   <body>
       <h1> Listagem de livros </h1>

       <table id="livros">
           <tr>
               <td>ID</td>
               <td>Título</td>
               <td>Preço</td>
               <td>Editar</td>
               <td>Remover</td>
           </tr>
           <tr id="livro_${livro.id}" for (livro in data.livros)>
               <td>${livro.id}</td>
               <td>${livro.titulo}</td>
               <td>${livro.preco}</td>
               <td><a href="/livros/form/${livro.id}">Editar</a></td>
               <td><a href="#" data-ref="${livro.id}" data-type="remocao">Remover</a></td>
           </tr>
       </table>

       <script src="/estatico/js/remove-livro.js">
       </script>
   </body>
</html>
<!-- form.marko -->
```

```marko

<html>
   <body>
       <h1>Cadastro de livros</h1>

       <form action="/livros" method="post">

           <input type="hidden" name="id" value="${data.livro.id}">
           <div>
               <label for="titulo">Titulo:</label>
               <input type="text" id="titulo" name="titulo" value="${data.livro.titulo}"/>
           </div>
           <div>
               <label for="capa">Capa:</label>
               <input type="file" id="capa" name="capa" placeholder="imagem de capa"/>
           </div>
           <div>
               <label for="preco">Preço:</label>
               <input type="text" id="preco" name="preco" placeholder="150.25" value="${data.livro.preco}"/>
           </div>
           <div>
               <label for="descricao">Descrição:</label>
               <textarea cols="20" rows="10"  id="descricao" name="descricao" placeholder="fale sobre o livro">${data.livro.descricao}</textarea>
           </div>

           <input type="submit" value="Salvar"/>
       </form>
   </body>
</html>
```

```js
// rotas.js

module.exports = (app) => {

   // demais rotas.

   app.get('/livros/form/:id', function(req, resp) {
       const { id } = req.params;
       const livroDao = new LivroDao(db);

       livroDao.buscaPorId(id)
               .then(livro => resp.marko(require('../views/livros/form/form.marko'), { livro }))
               .catch(erro => console.log(erro));
   });
};
```

No entanto, ela está em dúvida sobre o resultado disso! Portanto, marque as alternativas que apresentam afirmações verdadeiras!

Alternativa correta
O código da forma que está irá inserir um novo livro em vez de editar o livro selecionado.

Muito bem, aluno! Está correto! Foi exatamente esse o comportamento visto durante a aula e também será esse o comportamento do código de nossa colega! Esse enigma só será resolvido mais pra frente! Então siga em frente e vá correndo pra próxima aula!

Assistindo a última aula, nossa colega Joana descobriu o motivo e a solução do nosso pequeno enigma sobre a misteriosa inclusão de um novo livro quando na verdade ele deveria ser alterado. E aí ela fez o seguinte código:

```js
// custom-express.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'));

app.use(methodOverride((req, res) => {

    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;

        return method;
    }
}));

app.use(bodyParser.urlencoded({
    extended: true
}));`
```

```marko
<!-- form.marko -->

<html>
    <body>
        <h1>Cadastro de livros</h1>

        <form action="/livros" method="post">

            <div if(data.livro.id)>
                <input type="hidden" name="_method" value="PUT">
                <input type="hidden" name="id" value="${data.livro.id}">
            </div>

            <div>
                <label for="titulo">Titulo:</label>
                <input type="text" id="titulo" name="titulo" value="${data.livro.titulo}"/>
            </div>
            <div>
                <label for="capa">Capa:</label>
                <input type="file" id="capa" name="capa" placeholder="imagem de capa"/>
            </div>
            <div>
                <label for="preco">Preço:</label>
                <input type="text" id="preco" name="preco" placeholder="150.25" value="${data.livro.preco}"/>
            </div>
            <div>
                <label for="descricao">Descrição:</label>
                <textarea cols="20" rows="10"  id="descricao" name="descricao" placeholder="fale sobre o livro">${data.livro.descricao}</textarea>
            </div>

            <input type="submit" value="Salvar"/>
        </form>
    </body>
</html>
```

```js
// rotas.js

module.exports = (app) => {

    // demais rotas.

    app.put('/livros', function(req, resp) {

        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });
};

```

Desse modo, avaliando uma última vez e dando uma mãozinha pra nossa colega, podemos afirmar:

Alternativa correta
O código não irá funcionar como esperado, pois, como visto durante o curso, a ordem da definição dos middlewares é importante e altera o resultado. E nossa colega Joana incorretamente definiu o middleware do method-override antes do middleware do body-parser, fazendo exatamente o oposto ao que é dito na documentação do method-override.


Muito bem, aluno! Está correto! Foi exatamente isso que aconteceu! Dessa forma, como o middleware do body-parser foi definido apenas depois, todo o corpo da requisição estará com o valor undefined fazendo com que o method-override não funcione da maneira como nossa colega esperava.
