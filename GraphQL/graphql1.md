# GraphQl

Para começarmos, por favor baixe o repositório inicial e faça a instalação do projeto com o comando npm install. Por enquanto, só temos duas dependências para instalar: json-server e nodemon.

Para começarmos já focando no GraphQL, sem nos preocuparmos com a base de dados, vamos utilizar os dados do json que está na pasta .api/data.

Navegue pelo terminal até a pasta raiz do projeto (depois de instalar com npm install) e rode o comando: npx json-server --watch api/data/dados.json. O json-server vai “mocar” esses dados e disponibilizar dois endpoints:

```path
Resources
http://localhost:3000/users
http://localhost:3000/roles
```

/users e /roles foram gerados a partir das propriedades-raiz do json que está na pasta. O json-server utiliza a porta 3000 por padrão, então certifique-se que não tenha nada rodando nessa porta.

A outra dependência que estamos instalando agora é o Nodemon, que vai ouvir automaticamente as alterações nos arquivos sem precisarmos derrubar e subir nosso servidor local a cada alteração. Mas a API ainda não tem nada (por enquanto!), então vamos em frente.

O graphQL é uma especificação de apis que tem a sua própria linguagem de query e ele nao está ligado a nenhuma base de dados, o graphQL tem um ambiente que executa queries

Os schemas são baseados em como os dados são usados e nao como eles estao armazenados, importante para o front

O graphql resolve alguns problemas do rest que é o underfetching ou overfetching que é o fato do endpoint nos informar alguns dados que não vamos usar ou não nos retorna alguns dados que queremos usar e com o graphql nós conseguimos obter exatamente as informações que quisermos com uma requisição apenas, entao ele otimiza a relacao front e back.

O graph ajuda o front e o back pois o seu desenvolvimento é mais ágil, pois não precisa de inúmeros endpoints

## Usando o graphql para construir o servidor de graphQL

Instale as dependencias

```cmd
npm i graphql;
npm i apollo-server;
```

Conceitos importantes: 

O GraphQL faz uma separação clara entre estrutura e comportamento.

A estrutura do GraphQL está no schema, no qual especifica-se o que o servidor GraphQL está estruturado para fazer, com seus tipos e objetos.

Essa estrutura precisa ser implementada de alguma forma para que possa funcionar. No GraphQL, isso se dá através do que chamamos de funções resolver, ou só resolvers. É nos resolvers que implementamos o comportamento. Cada campo em um schema GraphQL é implementado através de um resolver.

É aqui que entram ferramentas como Apollo, que vamos utilizar no curso. Elas servem para nos ajudar a implementar a especificação GraphQL em nossa aplicação.

Documentação do apollo <https://www.apollographql.com/docs/apollo-server/>

### typeDefs (definições de tipos)

Uma forma básica de escrever uma definição de tipo é a que está abaixo

```js
const { ApolloServer, gql } = require('apollo-server');

const users = [
    { 
        nome: 'Ana',
        ativo: true,
    },
    { 
        nome: 'Xoão',
        ativo: false,
    },
];

const typeDefs = gql`
    type Users {
        nome: String!
        ativo: Boolean!
        email: String
    }

`;


const server = new ApolloServer({typeDefs, resolvers});
```

Onde o typedef é a definição dos tipos de users (escrito em js)

## Para saber mais: Tipos básicos do GraphQL

O GraphQL tem sua própria linguagem, chamada de SDL, ou Schema Definition Language, linguagem de definição de schema. Isso porque é possível implementar o GraphQL em conjunto com qualquer outra linguagem, então a SDL serve para fazer essa integração de forma agnóstica.

Para entender como essa linguagem funciona, sempre temos que ter em mente que o GraphQL trabalha com tipos, e saber quais tipos são esses.

SCALAR TYPES
São tipos que refletem alguns dos tipos de dados que já conhecemos. Para o GraphQL, são os tipos que se resolvem em dados concretos (ao contrário de objetos, por exemplo, que são conjuntos de dados). São eles:

Int - inteiro de 32 bits
Float - tipo ponto flutuante
String - sequência de caracteres no formato UTF-8
Boolean - true ou false
ID - identificador único, usado normalmente para localizar dados É possível criar tipos scalar customizados, estudaremos mais adiante neste curso.
OBJECT TYPE
Quando trabalhamos com GraphQL, o ideal é pensarmos no uso dos dados, mais do que na forma em que estão armazenados. Pensando nisso, nem sempre queremos retornar um dado concreto, mas sim um conjunto de dados com propriedades específicas — ou seja, um objeto.

Um exemplo de tipo Objeto (Object type) em GraphQL:

type Livro {
    id: ID!
    titulo: String!
    autoria: String!
    paginas: Int!
    colecoes: [Colecao!]!
}COPIAR CÓDIGO
No exemplo acima, estamos definindo o tipo Objeto Livro.

As propriedades — que no GraphQL são chamadas de campos — retornam tipos scalar, como strings e inteiros, e também podem retornar arrays compostas de outros objetos, como no caso de colecoes: [Colecao!]!.

Note que na definição do objeto não está especificado de qual base de dados virão esses dados, apenas quais dados o GraphQL espera receber, e de que tipos.

Os campos marcados com exclamação ! são campos que não podem ser nulos. Ou seja, qualquer query que envolva estes campos sempre devem ter algum valor do tipo esperado. No caso de colecoes: [Colecao!]! a exclamação após o fechamento da array significa que o campo colecoes sempre vai receber uma array (tendo ou não elementos dentro dela); a exclamação em Colecao! significa que qualquer elemento dentro da array sempre vai ser um objeto Colecao.

QUERY TYPE
Os tipos Query definem os pontos de entrada (entry points) da API; indicam quais dados o cliente pode receber e de que forma — de certa forma, são como queries do tipo GET quando trabalhamos com REST, a diferença aqui é que o cliente tem mais liberdade para montar as queries para receber apenas os dados que precisa — lembrando que, para o GraphQL e também para o cliente, não importa a origem desses dados. os dados podem vir de diversas fontes: endpoints REST, bancos SQL e NoSQL, outro servidor GraphQL.

Um exemplo de tipo Query:

type Query {
    livros: [Livro!]!
    livro(id: ID!): Livro!
}COPIAR CÓDIGO
Aqui definimos a query livros, que retorna uma array composta por tipos objeto Livro, e a query livros, que recebe um número de ID por parâmetro e retorna um objeto Livro referente ao ID informado.

Uma vez que as queries são os pontos de entrada de uma API GraphQL, toda aplicação vai ter pelo menos uma Query em seu schema.

MUTATION TYPE
Mutations são os tipos GraphQL utilizados para adicionar, alterar e deletar dados, de forma similar às operações de POST, PUT e DELETE nos CRUDs desenvolvidos em REST.

Os tipos Query são obrigatórios em qualquer serviço GraphQL, porém Mutations são opcionais. Um exemplo de tipo Mutation para adicionar um novo livro:

type Mutation {
    adicionaLivro(titulo: String!, autoria: String!, paginas: Int!, colecoes: Colecao!): Livro!
}COPIAR CÓDIGO
Neste exemplo temos somente uma Mutation, que chamamos de adicionaLivro e recebe por parâmetro os dados necessários. Confira os parâmetros com o tipo Livro definido anteriormente!

Além dos tipos acima, o GraphQL ainda tem mais tipos básicos que trabalharemos com mais detalhes durante o curso:

Enum,
Input,
Interface,
Union.

## Usar mais de um squema

É possível que você queira trabalhar com mais de um schema durante seu projeto. Nesse caso, como é possível passar mais de um schema para o ApolloServer, com a variável typeDefs?

No caso dos resolvers, exportando cada objeto como módulo, importando e passando para a variável resolvers como variável já é o suficiente. No arquivo de entrada da API (api/index.js), vamos fazer um exemplo com uma aplicação que envolve schemas de usuários e produtos:

const userResolvers = require('./user/resolvers/userResolvers')
const produtoResolvers = require('./produtos/resolvers/produtoResolvers')

const resolvers = [userResolvers, produtoResolvers]COPIAR CÓDIGO
Ao contrário dos resolvers, quando é necessário trabalhar com mais de um schema no mesmo servidor GraphQL, é preciso “fundir” (merge) os schemas em uma única string, para ser passada ao servidor com a variável typeDefs.

Para isso, precisamos instalar uma biblioteca auxiliar:

npm install graphql-toolsCOPIAR CÓDIGO
Após a instalação, vamos utilizar um módulo de graphql-tools chamado mergeTypeDefs para fazer o “merge” dos schemas, passando o resultado para a variável typeDefs.

Primeiro importamos o módulo para api/index.js:

const { mergeTypeDefs } = require('graphql-tools')COPIAR CÓDIGO
Após importarmos o módulo necessário, importamos para api/index.js os arquivos de schema que serão utilizados:

const userSchema = require('./user/schema/user.graphql')
const produtoSchema = require('./produto/schema/produto.graphql')COPIAR CÓDIGO
Por fim, passamos como parâmetro do módulo mergeTypeDefs uma array com os schemas que serão utilizados:

const typeDefs = mergeTypeDefs([userSchema, produtoSchema]);COPIAR CÓDIGO
A variável typeDefs já deve fazer parte das propriedades que passamos para ApolloServer:

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // restante das propriedades
})COPIAR CÓDIGO
O trecho de código com a importação e declaração de typeDefs e resolvers fica da seguinte forma:

const { mergeTypeDefs } = require('graphql-tools')

const userResolvers = require('./user/resolvers/userResolvers')
const produtoResolvers = require('./produtos/resolvers/produtoResolvers')

const userSchema = require('./user/schema/user.graphql')
const produtoSchema = require('./produto/schema/produto.graphql')

const resolvers = [userResolvers, produtoResolvers]
const typeDefs = mergeTypeDefs([userSchema, produtoSchema]);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // restante das propriedades
})COPIAR CÓDIGO
Caso tenha qualquer dúvida, pode mandar no fórum!

## Para saber mais: Introspecção

Quando desenvolvemos uma API, é sempre bom disponibilizar documentação sobre ela, para que clientes (por exemplo, quem for fazer o front-end do produto) saibam quais dados podem ser trabalhados e de que forma.

O GraphQL tem uma ferramenta que nos permite visualizar os tipos e queries disponíveis em uma API, o que facilita muito a vida de quem vai trabalhar com ela. É chamada de introspecção, ou introspection.

Podemos fazer um teste com a API do GitHub que vimos anteriormente: o GitHub's GraphQL Explorer. No playground, digite:

{
    __schema {
        types {
            name
        }
    }
}COPIAR CÓDIGO
E você terá acesso a todos os types definidos na API do GitHub. Ou, como se trata de uma API pública, a todos os tipos que estão disponíveis:

Scalars, como “Boolean”,
Tipos definidos na construção da API, como “Users” e tipos relacionados a “User”;
Tipos iniciados com __, que são parte do sistema de introspecção.
Outro teste interessante que podemos fazer é verificar qual é o ponto de entrada da API:

{
    __schema {
        queryType {
            name
        }
    }
}COPIAR CÓDIGO
Fazendo o teste no playground do GitHub, o retorno é "name": "Query". O que significa que a API tem um type Query, onde estão definidos os pontos de entrada para consulta à API… Vale notar aqui que poderia ser adotado qualquer nome para o tipo, mas utilizar Query é uma convenção, então vamos utilizá-lo.

Podemos passar mais subcampos para ter mais informações ainda sobre os tipos disponíveis nessa API:

query {
    __schema {
        types {
            name
            kind
            fields {
                name
            }
        }
    }
}COPIAR CÓDIGO
Essa query vai nos retornar informações mais completas sobre cada tipo: nome, se é objeto, scalar, input; no caso de objetos, quais campos estão associados, e muito mais.

Confira, por exemplo, os types Boolean e User e verifique as informações de cada um (é possível fazer buscas com “ctrl + f” / “cmd + f”).

Um último teste: Como saber de que se trata certo tipo, por exemplo “Actor”, que aparece na lista de tipos disponíveis na API:

{
    __type(name: "Actor") {
        name
        kind
    }
}COPIAR CÓDIGO
O retorno aqui é:

{
    "data": {
        "__type": {
            "name": "Actor",
            "kind": "INTERFACE"
        }
    }
}COPIAR CÓDIGO
Ou seja, Actor é um tipo Interface. Vamos ver o que é esse tipo mais para a frente neste curso.

Por definição, tanto o playground quanto a introspecção não devem ficar disponíveis na versão da API que está em produção, como uma boa prática. Porém, caso queira disponibilizar — por exemplo, se for desenvolver uma API pública, é possível declarar isso explicitamente na instância de ApolloServer:

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,  
    playground: true,
});COPIAR CÓDIGO
Há muito mais coisa que podemos fazer com a introspecção! À medida em que desenvolvemos nossa API durante o curso, você pode testar com ela tudo o que foi feito aqui com a API do GitHub.

Uma vez que o GraphQL é somente uma especificação, utilizamos algumas ferramentas para implementar essa especificação. Existem várias disponíveis, para o nosso projeto estamos usando o Apollo e GraphQL-Tools.


Alternativa correta! Estamos usando Apollo para subir um servidor GraphQL e GraphQL-Tools para carregar os arquivos de schema e resolvers, e convertê-los para um formato de string que o ApolloServer espera receber.

Alternativa correta
É possível definir os schemas tanto utilizando o módulo gql dentro de um objeto JavaScript, quanto separando em arquivos .graphql.


Alternativa correta! Embora seja possível utilizar o gql para escrever os schemas dentro de uma string, é uma boa prática separar em arquivos .graphql para que o código fique mais bem organizado e prevendo o desenvolvimento futuro da API.

Alternativa correta
A implementação do schema vai depender da linguagem escolhida para o backend e da lib de ferramentas utilizada.


Alternativa incorreta. Ao utilizarmos a SDL (linguagem de definição de schema) do GraphQL, é possível definir os schemas da API de forma independente do restante da aplicação. A linguagem escolhida é utilizada nos resolvers e nas camadas de manipulação de dados, mas não para escrever os tipos que compõem o schema.

Alternativa correta
Da mesma forma que utilizamos uma array “hardcoded” com alguns dados, o mesmo schema vai funcionar para dados vindos de outras fontes.


Alternativa correta! Aqui usamos uma variável, mas o GraphQL pode ser utilizado independente da origem dos dados: um banco SQL, endpoints REST, outro servidor GraphQL. A camada do schema não “sabe” e nem precisa saber de onde estes dados virão.

Alternativa correta
O GraphQL trabalha com três conceitos principais: schemas, resolvers e tipos.


Alternativa correta! É nos schemas (usando a linguagem de query do GraphQL) que definimos os tipos que precisamos para que a API retorne os dados esperados. Nos resolvers (implementados na própria linguagem da aplicação, no caso JS) é implementada a lógica necessária para retornar estes dados.

## GraphQL e dados

O GraphQL pode ser usado em combinação com qualquer base de dados e até mesmo utilizar várias ao mesmo tempo.

Existem diversas plataformas para conectar sua API a determinadas bases de dados, e como já vimos, existem algumas libs que oferecem ferramentas para isso. Neste curso usamos Apollo, que no momento deste curso é uma das mais utilizadas.

Além de módulos para uso com REST (o caso do projeto deste curso), existem também libs para utilizar outras fontes de dados em conjunto com as ferramentas da Apollo, de forma similar à que estamos fazendo:

SQL DataSource: para bancos SQL
Mongo DataSource: para MongoDB
GraphQL DataSource: para utilizar outra API GraphQL como fonte de dados.
Se você quiser testar outras bases em seu projeto, este [artigo](https://www.apollographql.com/blog/a-deep-dive-on-apollo-data-sources/) do blog da Apollo dá maiores detalhes de implementação para as três libs acima.

Uma outra opção para utilizar o GraphQL com SQL é a Prisma, que integra bancos SQL (Postgres, MySQL ou SQLite) ao GraphQL, abstraindo as conexões com o banco e as queries.

Além dessas, no momento em que escrevemos este texto, temos mais algumas opções como:

Hasura para Postgres, outros serviços GraphQL e APIs REST;
AWS AppSync para DynamoDB, Elasticsearch e Aurora;
Stitch para MongoDB.
Aproveite para testar outras ferramentas!

## Para saber mais: Parâmetro info

Já conferimos quatro parâmetros do resolver e qual tipo de dado cada um deles carrega:

root (ou parent): o resultado da chamada no “nível” anterior da query;
args: os argumentos que o resolver pode receber da query, por exemplo os dados para um novo User ou um ID;
context: um objeto com o contexto para o GraphQL, como dados sobre a conexão, permissões de usuário, etc;
info: a representação em árvore da query ou da mutation.
Na maior parte dos casos podemos trabalhar sem prestar muita atenção ao parâmetro info ou ao que ele faz. Mas é importante sabermos um pouco mais sobre o que ele faz e como funciona.

Podemos alterar um pouco o resolver users e incluir uma chamada no console que nos mostre o que o resolver está recebendo em info:

```js
users: (root, args, { dataSources }, info) => {
    console.log(info)
    return dataSources.usersAPI.getUsers()
},COPIAR CÓDIGO
```

Fazendo a chamada da query users no playground:

```graphql
query {
    users {
        nome
    }
}COPIAR CÓDIGO
```

Além da lista de nomes no playground, agora deve mostrar no console um objeto com várias propriedades, algumas com nomes que a gente reconhece, por exemplo fieldName: 'users', returnType: [User!]! e algumas propriedades iniciando com __, como __Schema: __Schema.

Então, podemos afirmar que info é um objeto que contém a estrutura em árvore da query solicitada. Com essas informações, o resolver sabe quais campos deve retornar, os tipos de dados destes campos, quais são os níveis acima na query e etc.

Para informações detalhadas sobre cada uma das propriedades recebidas através do parâmetro info, você pode consultar este artigo no blog da Prisma que está bem completo.

## Para saber mais: Campos nulos

Já vimos que, quando queremos que o valor de um campo nunca seja nulo, utilizamos exclamação ( ! ). Como no campo nome no tipo User:

type User {
    nome: String!
    .
    .
    .
}COPIAR CÓDIGO
Aqui deixamos explícito que o valor de nome sempre deve retornar algum valor; ou seja, nunca pode ser null. O contrário fará com que o GraphQL lance um erro.

E quando trabalhamos com listas de dados? Nesse caso, existe uma diferença na parte do código onde declaramos !.

Primeiro caso: uma query que pede uma lista de usuários. O ponto de exclamação está somente depois dos colchetes []. Ou seja, a query users em si não pode retornar null, mas pode conter null entre os itens retornados na lista.

type Query {
    users: [User]!
}COPIAR CÓDIGO
Exemplos de retorno:

users: [{user}, null, {user}] //retorno válido
users: null //retorna erroCOPIAR CÓDIGO
Segundo caso: o ponto de exclamação está dentro dos colchetes da lista, junto ao tipo que queremos retornar na lista. Ou seja, a lista em si pode ser nula, mas não pode retornar itens nulos.

type Query {
    users: [User!]
}COPIAR CÓDIGO
Exemplos de retorno:

users: null //retorno válido
users: [{user}, {user}] //retorno válido
users: [{user}, null, {user}] //retorna erroCOPIAR CÓDIGO
Terceiro caso: o ponto de exclamação aparece junto ao tipo de retorno e também junto ao fechamento dos colchetes da lista. Ou seja, deve retornar obrigatoriamente uma lista que não contenha null entre seus itens.

Atenção: uma lista vazia é um retorno válido!

type Query {
    users: [User!]!
}COPIAR CÓDIGO
Exemplos de retorno:

users: [] //retorno válido
users: null //retorna erro
users: [{user}, {user}] //retorno válido
users: [{user}, null, {user}] //retorna erroCOPIAR CÓDIGO
No GraphQL, todos os campos são definidos como “anuláveis” por padrão. Ao definir os campos de um tipo como obrigatórios (não-nulos), devemos pensar em como os dados serão utilizados e também em como estão definidos na base de dados. Por exemplo, definir como obrigatório um campo cuja origem dos dados seja uma coluna SQL sem a restrição NOT NULL pode nos trazer erros.

Pode parecer uma boa ideia sempre declarar todos os campos possíveis como não-nulos, mas isso pode fazer com que fique difícil evoluir o schema, especialmente quando trabalhamos com diversas fontes de dados.

No projeto que estamos implementando, a camada dataSource é responsável por se conectar aos endpoints REST através de seus métodos, como .get().


Alternativa correta! O módulo RESTDataSource traz métodos para fazermos o CRUD e definir como os dados serão retornados de acordo com o que é pedido no schema.

Alternativa correta
Os tipos que indicam os possíveis pontos de entrada de uma API GraphQL são Query Types ou também chamados de root types.


Alternativa correta! O tipo Query, com seus campos (no caso do projeto do curso, users e user) é o ponto de entrada e o tipo que sempre está no top level de um servidor GraphQL.

Alternativa correta! O objeto passado no argumento context pode receber, por exemplo, uma instância ou método para se conectar a uma base de dados, informações sobre permissões do usuário logado, etc.

## Para saber mais: Práticas e patterns

O GraphQL tem algumas práticas comuns e patterns próprios, diferentes do REST. Vamos ver uma lista com algumas delas.

Lembrando que, como todas as convenções e práticas, não estão escritas em pedra e você pode fazer adaptações e tomar decisões diferentes, conforme a necessidade de seu projeto no momento.

Bons cenários para o GraphQL
Quando o desenvolvimento precisa ser flexível o bastante para produtos que mudam muito rápido, estão em fase de desenvolvimento e com muitas features diferentes para serem testadas. Se a sua API só tem um endpoint (ou poucos) ou o produto não está nessa fase, o REST continua sendo uma boa opção.

GraphQL é sobre otimizar requisições e queries, diminuindo a quantidade de requisições e evitando os problemas do over-fetching ou under-fetching que são comuns em REST, quando uma só requisição ou traz muitos dados que não são necessários, ou não traz os dados suficientes;

GraphQL é uma especificação e você pode utilizar as bibliotecas ou plataformas que quiser para ajudar na implementação; porém o GraphQL também funcionaria sem elas. O Apollo é uma dessas plataformas para desenvolver em GraphQL com NodeJS, mas existem várias outras voltadas para outras linguagens, como o Graphene para Python.

GraphQL torna o desenvolvimento mais ágil evitando ajustes na API por parte do back-end para cada nova funcionalidade que vai ser implementada; por exemplo, diminui a necessidade da criação de endpoints específicos para uma determinada feature.

O schema torna o monitoramento de recursos mais fácil e a partir dele a documentação é gerada automaticamente, o que torna o trabalho em times mais fácil.

Vale a pena notar outros pontos da criação de uma API GraphQL:

O schema reduz bastante a complexidade de adicionar novos tipos e campos da API (mais sobre isso no tópico “versionamento” mais abaixo). Porém, não se recomenda mudanças que possam quebrar as requisições, como:
renomear um campo;
modificar os argumentos de um campo, ou torná-los obrigatórios;
tornar um campo não nulo (como marcador ! — mais sobre isso abaixo);
Porém é possível depreciar esses campos.

É perfeitamente OK criar tipos que não reflitam exatamente a estrutura do banco de dados (embora a tendência é que a API tenha uma estrutura de dados diferentes da estrutura do banco à medida em que evolui). Cada tipo deve representar um objeto com dados que clientes possam consumir.

IDs são “anti-patterns” em GraphQL; deve-se sempre trabalhar com o objeto de referência.

Em campos com valores específicos — por exemplo, no projeto deste curso onde role pode ser somente “estudante”, “docente” ou “coordenação’, a melhor prática é utilizar um tipo ENUM. Enum é conhecido e utilizado em diversas linguagens, porém não no JavaScript. Falaremos sobre esse tipo mais adiante neste curso.

É aconselhável que Mutations tenha um tratamento de erros que passe informações claras ao cliente.

Boas práticas
A seguir, um resumo de práticas comuns em GraphQL.

HTTP: O GraphQL normalmente utiliza o protocolo HTTP para expor todos os recursos da API através de um único endpoint e todas as requisições utilizam POST - inclusive as de consulta. Ao contrário do REST, que é composto de uma série de endpoints, cada um deles expondo um único recurso da API. É possível utilizar o GraphQL para expor recursos em mais de um endpoint, porém essa não é uma prática comum, além de dificultar o uso de ferramentas como o playground — que apesar do nome é muito importante para acessar a documentação da API.
JSON: Com GraphQL, os dados normalmente são retornados no formato JSON, embora isso não seja obrigatório segundo a especificação do GraphQL. JSON é uma notação bastante familiar em desenvolvimento web, tanto para quem desenvolve APIs quanto para clientes, e é de fácil leitura. Para questões de performance, é recomendado o uso da compressão com GZIP e o envio das requisições com o header accept-encoding: gzip. Para saber mais sobre HTTP, header e GZIP, caso você precise, o curso de fundamentos do HTTP da Alura vai te dar a base.

Versionamento: Embora nada impeça o versionamento de uma API GraphQL, de forma similar ao versionamento das APIs REST, essa não é uma prática recomendada. Ao invés disso, encoraja-se uma evolução contínua do schema.

O versionamento de APIs acaba sendo necessário pois no modelo REST qualquer mudança nos dados retornados pela API podem ser considerada uma mudança considerável, e mudanças consideráveis requerem uma nova versão. Então, uma vez que se torna necessária uma nova versão toda vez que se adicionam novas features na API, temos um contraponto entre lançar novas versões com modificações incrementais frequentes versus a legibilidade e a manutenção da API. É importante frisar aqui que a comparação está sendo feita entre GraphQL e APIs REST voltadas somente para operações CRUD, sem considerar APIs RESTful mais complexas.
No caso do GraphQL, como só são retornados dados que são explicitamente requisitados, é possível adicionar novos tipos e campos no schema, inclusive novos campos em tipos já existentes, sem que isso “quebre” a API. Por esse motivo, foi estabelecida a prática de não-versionamento de APIs GraphQL. Além disso, é possivel fazer um monitoramento para saber quando um atributo não está sendo mais usado pelo front-end e quando pode ser retirado do schema.
tipo NULL: Por padrão, em GraphQL todos os campos de um tipo podem ser nulos, a não ser quando explicitamente indicado. Isso porque em um serviço como uma API GraphQL há várias pontas que podem falhar: a conexão com o banco, uma ação assíncrona que falhou, entre outros fatores.

Dessa forma, para o GraphQL é preferível que um campo possa retornar nulo do que a requisição falhar. Em vez disso, usa-se o modificador ! para marcar um campo como “não nulo”.
Quando criamos o schema, é importante ter em mente quando um campo pode retornar nulo em caso de falha, e quando obrigatoriamente deve retornar um erro.
Mais sobre campos nulos e não nulos neste link da documentação do GraphQL.
Ainda há mais práticas listadas na documentação, relacionadas a temas que não estamos abordando neste curso.

Caso queira ver cada uma com mais detalhes, pode conferir a parte de práticas na documentação oficial e este artigo sobre boas práticas e design patterns em GraphQL<https://graphql.org/learn/best-practices/>.
