# Indexed DB

Vcoê sabia que todo navegador possui um banco de dados próprio? Sem ter a necessidade de possuir um banco de dados em algum servidor remoto para persistir os dados? Esse é o indexed DB e é uma ferramenta muito interessante para nós desenvolvedores

Site para saber se determinado recurso é suportado por qual browser <https://kangax.github.io/compat-table/es6/>

## Onde está o indexed e a tríade de eventos

Indo no console nós iremos ver que `window.indexedDB` nos retorna uma IDBFactory, isso nos diz que o banco de dados local está no escopo global de toda aplicação

E quando queremos criar um banco de dados primeiro eu preciso requerir uma conexão com ele, e fazemos isso com `let openRequest = window.indexedDB.open('aluraframe',1);`

Onde o primeiro parâmetro é o nome do banco e o segundo é uma versão (opcional ao que parece) e depois eu preciso lidar com a tríade de eventos após a requisição (pois pode ser que essa requisição tenha dado erro ou não) e essa tríada está com os sequintes nomes

```js
openRequest.onupgradeneeded
openRequest.onsuccess
openRequest.onerror
```

E uma explicação do que cada banco faz é a seguinte

```js
openRequest.onupgradeneeded = e => {
console.log("Criando ou alterando um banco existente");
}

openRequest.onsuccess = e=> {
    console.log('Conexão obtida com sucesso');
}

openRequest.onerror = e=> {
    console.log(e.target.error);
}
```

Se não existe o banco primeiro executa a upgrade needed e depois a success

Na aba aplication no devTools vemos que na parte IndexedDb temos um banco de dados

## Comunicando com o banco usando o IDBDatabase

Para começar precisamos criar um armazenamento de objetos (object store) e para isso temos que criar no momento do upgrade ou seja:

```js
openRequest.onupgradeneeded = e => {
    console.log("Criando ou alterando um banco existente");
    let minhaConnection = e.target.result;
    minhaConnection.createObjectStore('negociacoes');
}
```

E para esse upgrade surtir efeito nós precisamos atualizar a versão do banco de dados nos deixando com:

```js
let openRequest = window.indexedDB.open('bancoDados',2);
```

Aí o browser cria o banco de dados de novo com o ObjectStore vazio

Agora vamos adicionar algum dado, mas para isso precisamos criar um objectStore que tenha uma chave auto incrementada, para isso temos que excluir o objeto anterior e criar um novo com essa propriedade para isso dentro do upgrade fazemos:

```js
    if (minhaConnection.objectStoreNames.contains('negociacoes')){
        minhaConnection.deleteObjectStore('negociacoes')
    }

    minhaConnection.createObjectStore('negociacoes',{autoIncrement: true});
```

Assim eu garanto que o object store com o nome seja excluido e criado um novo com propriedade auto incremental

Agora adicionando dados nessa tabela:

```js
const adiciona = () => {
    let transaction = connection.transaction(['negociacoes'], 'readwrite');
    let store = transaction.objectStore('negociacoes');
    let negociacao = new Negociacao(new Date(),1,200);
    let request = store.add(negociacao);
    request.onsuccess = e => {
        console.log('Negociação incluida')
    };

    request.onerror = e => {
        console.log('Negociação não incluida')
    }
}
```

Para isso criamos uma transção com o objeto de forma que podemos ler e escrever o que está nesse banco




## Perguntas

Selecione as afirmações corretas sobre IndexedDB:

É acessível através do escopo global.

Precisamos solicitar uma requisição de abertura para um banco antes de qualquer coisa.

Sobre a tríade de eventos disparados quando requisitamos uma abertura de conexão com o banco, marque as alternativas corretas.

O evento onupgradeneeded pode ou não ser disparado em determinadas situações.

O evento onupgradeneeded é sempre chamado quando o banco é criado pela primeira vez.

Vejamos o seguinte código, que obtém uma conexão com o IndexedDB:

```js
var connection;

var openRequest = window.indexedDB.open('aluraframe',1);

openRequest.onupgradeneeded = e =>  {

    console.log('Criando ou atualizando o banco');
};

openRequest.onsuccess = e => {

    console.log('Conexão realizada com sucesso');

    connection = e.result;
};

openRequest.onerror = e => {

    console.log(e.error);
};
```

A quantidade de erros de semântica acima é:

Há dois erros de sintaxe no código. O primeiro está no evento onsuccess, pois nele acessamos e.result, quando na verdade deve ser `e.target.result`. Um erro parecido acontece em onerror, pois acessamos e.error ao invés de `e.target.error`.

*** Lembre-se e.target.blabla ***

Sabemos que para realizarmos operações de persistência, como inclusão ou listagem, precisamos de uma store. Contudo, essa store precisa vir de uma transação.

Partindo do ponto que a variável connection possui uma conexão para o banco aluraframe e que este banco possui a store negociacoes, qual das opções abaixo obtém corretamente a store negociacoes?

```js

let transaction = connection.transaction(['negociacoes'],'readwrite');

let store = transaction.objectStore('negociacoes');
```

Veja que da connection, obtemos uma transação através do método transaction. Ele recebe como primeiro parâmetro um array com a object store que desejamos criar uma transação, e como segundo o tipo de acesso à store. No caso, queremos ter acesso de leitura e escrita.

Com a transação em mãos, agora sim podemos ter acesso a uma store transacional, através da chamada do método objectStore, que recebe como parâmetro o nome da store. É através da store que podemos realizar operações de persistência.

Vejamos o seguinte trecho de código que opera com uma conexão para um banco no IndexedDB:

```js
let transaction = connection.transaction(['negociacoes'],'readwrite');

let store = transaction.objectStore('negociacoes');

let negociacao = new Negociacao(new Date(), 200, 1);

store.add(negociacao);
```

Sobre a chamada de store.add, podemos dizer que:

Chamar simplesmente store.add pode ou não adicionar efetivamente um objeto dentro de uma store, mas sempre ficaremos na dúvida se a operação foi realizada com sucesso. É por isso que o método add retorna uma requisição de abertura e no callback passado para seu evento onsuccess, quando ele for chamado, temos certeza de que o objeto foi adicionado. Caso um erro aconteça, o callback passado para onerror será chamado.

```js
let transaction = connection.transaction(['negociacoes'],'readwrite');

let store = transaction.objectStore('negociacoes');

let negociacao = new Negociacao(new Date(), 200, 1);

let request = store.add(negociacao);

request.onsuccess = e => {
  alert('Adicionado com sucesso!');
};

request.onerror = e => {
  alert('Não foi possível adicionar');
};
```

Para listarmos os dados armazenados em uma store, percorremos um caminho idêntico ao caminho percorrido para adicionar novas negociações:

```js
let transaction = connection.transaction(['negociacoes'],'readwrite');
let store = transaction.objectStore('negociacoes');

let negociacoesDaStore = []; // vazia, precisa receber todas as negociações gravadas na store "negociacoes"
```

Contudo, não queremos chamar `store.add`, pelo contrário, queremos obter cada negociação cadastrada do banco e não adicionar novas.

Qual das opções abaixo possui o código sintaticamente correto que varre a store negociacoes ao mesmo tempo em que preenche o array negociacoesDaStore?

```js

let cursor = store.openCursor();

    cursor.onsuccess = e => {

    let atual = e.target.result;

    if(atual) {

        let dado = atual.value;

        negociacoesDaStore.push(new Negociacao(dado._data, dado._quantidade, dado._valor));

        atual.continue();

    } else { 

        console.log(negociacoesDaStore);
    }
};
```

É através de um cursor que podemos iterar em uma store. O cursor possui um ponteiro para o primeiro objeto do banco. Veja, é um "ponteiro", não é o dado em si. Através do ponteiro podemos ter acesso ao primeiro, segundo, terceiro objeto e assim por diante. Assim que acessarmos um elemento do ponteiro, precisamos chamar `cursor.continue()` para que o ponteiro avance para o próximo elemento. Quando não houver mais elementos, o retorno de `cursor.continue()` será null.

Tadeu, após assistir o primeiro capítulo deste treinamento, foi colocar em prática aquilo que aprendeu. Ele conseguiu criar a store negociacoes. Contudo, ele achou interessante criar a store siglas para guardar diversas siglas usadas pela sua aplicação.

O aluno estava bem seguro, mas ficou aturdido pois não conseguiu criar a nova store. Ele recarregava sua aplicação e o evento onupgradeneeded não era mais chamado. Ele aprendeu que é neste evento o local adequado para se criar novas stores ou atualizar as já existentes.

Partindo do pressuposto que o código de Tadeu esta 100% correto em termos de sintaxe, qual opção abaixo pode explicar a causa da store siglas não ter sido criada?

Ele não atualizou a versão do banco no momento da abertura.

O problema é que ele não atualizou a versão do banco. Quando um banco é criado pela primeira vez, ele guarda um número de versão. O evento onupgradeneeded só será disparado se a nova versão do banco, indicada para a função open, for superior à versão do banco no IndexedDB. Vejamos a linha que permite explicitar uma nova versão:

`var openRequest = window.indexedDB.open("aluraframe",1);`

Se o banco atual estiver na versão 1, nenhuma atualização será feita. Contudo, se alterar a versão para 2, o onupgradeneeded será disparado, porque a versão é superior à que está no IndexedDB:

`var openRequest = window.indexedDB.open("aluraframe",2);`

Temos que estar atentos para esses detalhes.
