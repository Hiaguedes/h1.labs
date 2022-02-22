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

## Mais perguntas

Aprendemos a lidar com o IndexedDB no capítulo anterior. Contudo, precisamos organizar todo aquele código que escrevemos em algo mais legível e fácil de manter. O primeiro passo é quebrar o problema em dois, ou seja, termos uma classe especializada na criação da conexão e outra especializada nas operações de persistência (inclusão, remoção, etc.). Vamos atacar o primeiro problema, o da conexão.

Qual das opções abaixo possui o esboço da classe ConnectionFactory, que não nos permite criar instâncias a partir dela e que possui o método estático getConnection, cujo retorno é uma promise? Ah, e não esqueça que precisamos usar o operador new quando formos criar uma promise!

```js
class ConnectionFactory {

    constructor() {

        throw new Error("ConnectionFactory não pode ser instanciada");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

        });
    }
}
```

Para não permitir que sejam criadas instâncias de uma classe, podemos lançar uma exceção em seu constructor. Lembre-se que só queremos fazer isso porque estipulamos que a única maneira de obter a conexão é chamando um método estático da classe ConnectionFactory. Aliás, para que um método seja chamado diretamente da classe e não de uma instância, usamos o modificador static antes do nome do método.

A obtenção de uma conexão é um processo assíncrono, sendo assim, nada mais justo do que nosso método getConnection retornar uma promise para nos ajudar com a complexidade de códigos assíncronos.

## Exportando funcionalidades de um módulo (ES5, ainda!)

Valentina criou duas funções para lidar com conversões de um número em real para número e vice-versa:

```js
// conv.js

let simboloMoeda = 'R$ ';

function numeroParaReal(numero) {

    return simboloMoeda + numero.toFixed(2).replace('.', ',');
}

function realParaNumero(texto) {

    return texto.replace(simboloMoeda, '').replace(',', '.');
}
Podemos até testar através do console do Chrome:

let real = 'R$ 100,20';
let realConvertidoEmNumero = realParaNumero(real);
alert(realConvertidoEmNumero); // exibe 100.20

let numero = 200.15;
let numeroConvertidoEmReal = numeroParaReal(numero);
alert(numeroConvertidoEmReal); // exibe R$ 200,15
```

É claro que existem várias maneiras de se resolver esse problema, essa é uma das soluções. Contudo, veja que temos a variável simboloMoeda e as duas funções no escopo global. Sendo assim, podemos alterar o símbolo da moeda a qualquer momento:

`var simboloMoeda = '$';`
Veja que agora o símbolo da moeda é dólar! Com certeza não queremos que essa mudança seja possível em nosso código. Sabemos que se declararmos variáveis (se você usar let ou var) e funções dentro de outra função, elas pertencerão ao escopo da função e não pertencerão ao escopo global. Inclusive aprendemos a utilizar uma IIFE, uma função anônima que se invoca automaticamente para criar esse escopo:

```js
// conv.js

(function() {

    let simboloMoeda = 'R$ ';

    function numeroParaReal(numero) {

        return simboloMoeda + numero.toFixed(2).replace('.', ',');
    }

    function realParaNumero(texto) {

        return texto.replace(simboloMoeda, '').replace(',', '.');
    }
})();
```

Veja que agora, quando nosso script for carregado, a IIFE será invocada e tudo que estiver dentro dela não será mais acessível globalmente. Desse jeito, ninguém poderá mais alterar simboloMoeda, mas também não conseguirá chamar as funções numeroParaReal e realParaNumero. Resolvemos um problema e criamos outro.

Você aprendeu neste capítulo sobre o padrão de projeto Module Pattern. O que fizemos até agora foi criar um módulo, uma unidade de código confinada, mas que não exporta qualquer funcionalidade.

Qual das opções abaixo altera corretamente nosso módulo para que exporte as funcionalidades numeroParaReal e realParaNumero, mas mantendo simboloMoeda inacessível através do escopo global?

```js
var formatadorDeMoedas = (function() {

    let simboloMoeda = 'R$ ';
    let modulo = {};

    modulo.numeroParaReal = numero => {

        return simboloMoeda + numero.toFixed(2).replace('.', ',');
    }

    modulo.realParaNumero = texto => {

        return texto.replace(simboloMoeda, '').replace(',', '.');
    }

    return modulo;
})();

// exemplo de uso

let real = 'R$ 100,20';
let realConvertidoEmNumero =
     formatadorDeMoedas.realParaNumero(real);

alert(realConvertidoEmNumero);

let numero = 200.15;
let numeroConvertidoEmReal = 
    formatadorDeMoedas.numeroParaReal(numero);

alert(numeroConvertidoEmReal);
```

Como uma IIFE nada mais é do que uma função, toda função pode retornar algo. Nesse caso, precisamos retornar as duas funções de conversão, mas sabemos que só podemos ter um retorno. É por isso que criamos o objeto modulo e nele adicionamos dinamicamente duas propriedades com os nomes das funções que havíamos criado, e em seguida definimos o comportamento dessas propriedades através de uma função, no caso, arrow functions por serem mais sucintas.

Perceba que simboloMoeda não está presente em nenhuma propriedade de modulo. Isso faz sentido, porque nossa função retornará o objeto modulo com as funções, mas não será exportado com simboloMoeda. No final da nossa IIFE, retornamos (exportamos) o objeto modulo. O retorno da IIFE é armazenada na variável formatadorDeMoedas, essa sim no escopo global e acessível em qualquer lugar da nossa aplicação.

Se tentarmos sobrescrever simboloMoeda, não conseguiremos. Mas Flávio, eu posso sobrescrever a variável formatadorDeMoedas que está no escopo global, certo? Sim, mas veja que agora temos apenas uma variável no escopo global e não três como tínhamos antes, que era a variável que guarda o símbolo da moeda e as funções.

Quando o método formatadorMoeda.numeroParaReal for chamado, ele se lembrará do contexto no qual foi declarado (ou seja, o escopo da IIFE) e terá acesso à variável simboloMoeda.

Esse pattern é muito usado no ES5 para resolver problemas desse tipo, entre outros. No entanto, o ES6 possui um sistema de módulos nativos. Curioso para ver como ele funciona? Isso ficará para o quarto módulo do curso avançado, pois migrar para o sistema de módulos do ES6 exige outros conhecimentos, sem falar que será uma mudança trabalhosa. Fique antenado para os próximos módulos, pois um assunto quente como esse será apresentado, aguarde!

## O método getConnection

Aurélia, com base no que aprendeu neste capítulo, criou o método getConnection, que por enquanto lida com a criação da store negociacoes. Vejamos seu código:

```js
class ConnectionFactory {

    constructor() {

        throw new Error("ConnectionFactory não pode ser instanciada");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open('aluraframe',4);

            openRequest.onupgradeneeded = e => {

                    if(e.target.result.objectStoreNames.contains('negociacoes')) e.target.result.deleteObjectStore('negociacoes');
                    e.target.result.createObjectStore('negociacoes', { autoIncrement: true });

            };

        });
    }
}
```

Contudo, ela lembrou que durante o vídeo foi criado um método para isolar a criação de uma ou mais stores, para melhorar a legibilidade do seu código.

Qual das opções abaixo possui a classe ConnectionFactory alterada para separar a responsabilidade de criação de stores em um método em separado?

```js
class ConnectionFactory {

    constructor() {

        throw new Error("ConnectionFactory não pode ser instanciada");
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open('aluraframe',4);

            openRequest.onupgradeneeded = e => {

                    ConnectionFactory._createStores(e.target.result);

            };

        });
    }

    static  _createStores(connection) {

        if(connection.objectStoreNames.contains('negociacoes')) connection.deleteObjectStore('negociacoes');
        connection.createObjectStore('negociacoes', { autoIncrement: true });


    }
}
```

Como não podemos criar instâncias de ConnectionFactory, só podemos chamar método estáticos. Sendo assim, o método auxiliar `_createStores` precisa ser estático. Além disso, esse método só faz sentido ser chamado pelo próprio método getConnection, dessa maneira, usamos a convenção de torná-lo privado usando `_` antes do nome do método.

## Monkey Patch

Herculano criou a simples classe Pessoa, que recebe em seu construtor um nome e sobrenome. Inclusive, ele criou o método obterNomeCompleto, que retorna a junção do nome com o sobrenome, separados por um espaço.

```js
class Pessoa {

    constructor(nome, sobrenome) {

        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    obterNomeCompleto() {

        return `${this.nome} ${this.sobrenome}`;
    }
}

let pessoa1 = new Pessoa('Flávio', 'Almeida');
pessoa1.obterNomeCompleto();

let pessoa2 = new Pessoa('Almeida', 'Flávio');
pessoa2.obterNomeCompleto();
```

Contudo, em determinada parte do seu código, ele viu a necessidade de que o método obterNomeCompleto retornasse o nome e o complemento separados por um hífen. Ele lembrou das aulas de Proxy, mas achou que naquela situação teria muito trabalho em implementar algo como nosso ProxyFactory.

Ele lembrou que seu amigo Hugo costumava resolver esse problema através de monkey patch, que consiste em mudar o método ou função dinamicamente. Ele tem interesse em mudar o método de uma instância e não de todas.

Qual das opções abaixo Herculano realiza monkey patch do método obterNomeCompleto de pessoa2?

```js

let pessoa2 = new Pessoa('Almeida', 'Flávio');

pessoa2.obterNomeCompleto = function() {

  return `${this.nome} - ${this.sobrenome}`;
}
console.log(pessoa2.obterNomeCompleto());
```

Estamos modificando dinamicamente obterNomeCompleto apenas na instância pessoa2. Veja que usamos function e não arrow function. Foi necessário usar function devido ao seu escopo dinâmico, isto é, this deve variar de acordo com a instância no qual obterNomeCompleto é chamado. Se usarmos arrow function, seu escopo léxico fará com que o this seja sempre do contexto no qual a função é declarada, no caso window, o escopo global.

Inclusive é possível alterar a definição do método diretamente na própria classe, dessa maneira, todas as instâncias de Pessoa, criadas antes ou depois da modificação, automaticamente "herdarão" a modificação:

```js
Pessoa.prototype.obterNomeCompleto = function() {

  return `${this.nome} - ${this.sobrenome}`;
}
```

O monkey patch deve ser usado com parcimônia, até mesmo como último recurso, quando propõe uma modificação direta na definição da classe. Isto porque modificações usadas globalmente podem ocasionar bugs em diversas partes do nosso código, tendo assim, um resultado imprevisível.

## Michele estava verificando um código em seu webapp quando notou o seguinte trecho:

```js
...
var nome = "Aurélio Siciliano Oxford";
var CPF  = "134.567.890-12";
...
```

Quando notou que algumas de suas variáveis nunca seriam reatribuídas, como o nome e CPF. Ela sendo uma programadora Javascript antenada as últimas novidades, resolveu utilizar um recurso do Ecma2015(ES6) para garantir que suas variáveis não possam ter seus valores alterados.

Qual das opções abaixo torna as variáveis que Michele criou incapazes de serem reatribuídas?

```js
...
const  nome = "Aurélio Siciliano Oxford";
const  CPF  = "134.567.890-12";
...
```

O Ecma2015 trouxe a palavrinha const como um novo modo de declarar variáveis. Quando declaramos uma const não conseguimos reatribuir um valor a um constante já criada, então caso tentássemos fazer:

```js
const nome  = "Douglas";
E logo em seguida :

nome = "Daniel";
```

O console imediatamente nos retonaria o erro `Uncaught TypeError: Assignment to constant variable` pois estamos tentando atribuir um valor a uma constante previamente declarada. É bem útil utilizá-la quando estamos criando variáveis que não irão e nem devem ter seus valores alterados.

## Para saber mais: variáveis declaradas com const são realmente imutáveis?

Michele já havia usado o modificador const na declaração de suas variáveis para evitar que novos valores fossem atribuídos a elas. Inclusive ela deu um novo exemplo para seu amigo Gerônimo:

```js
const hoje = new Date();
hoje = new Date();  // dá erro!
Gerônimo, muito calmo, a alertou que neste caso a variável hoje, apesar de não permitir a atribuição de novos valores ainda é passível de mudança. Ele fez o seguinte:

const hoje = new Date();
hoje.setDate(5);
console.log(hoje.getDate()) ; // alterou o dia para 5!
```

Ele explicou para Michele que neste caso não estamos atribuindo um novo valor a variável usando o operador =, mas estamos alterando as propriedades do objeto Date por meio de seus métodos. Sendo assim, const não garante a imutabilidade, apenas a atribuição de um novo valor para a variável.

## O padrão DAO

Vamos filosofar? Quais as vantagens de se usar classes com o padrão DAO?

Pense sobre a responsabilidade dessa classe, o que ela faz e para que serve! Depois de ter meditado sobre o assunto, clique em "Ver opinião do instrutor".

A vantagem está ligada com a capacidade de isolar todo o código que acessa seu repositório de dados em um único lugar. Assim, toda vez que o desenvolvedor precisar realizar operações de persistência ele verá que existe um único local para isso, seus DAO's.

Falando um pouco mais técnico e nem por isso menos bonito, o DAO faz parte da camada de persistência, funciona como uma fachada para a API do IndexedDB. Repare que para usar o DAO não é preciso saber os detalhes do store ou cursor.

## Método que devolve uma promise

Vejamos nossa classe NegociacaoDao. O método adiciona que devolve uma promise:

```js
class NegociacaoDao {

    constructor(connection) {

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .add(negociacao);

        });
    }

   listaTodos() {
        // ainda não implementado
  }

}
```

Veja que o método está incompleto, porque em nenhum momento chama a função resolve ou reject, fundamentais para que a promise retorne seu valor ou uma exceção.

```js
    adiciona(negociacao) {

        return new Promise((resolve, reject) => {

            let request = this
                ._connection
                .transaction([this._store],"readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => resolve();
            request.onerror = e => reject(e.target.error.name);

        });
    }
```

Qual das opções abaixo completa o método adiciona?

Lembre-se que só temos certeza que a negociação foi adicionada apenas se o evento onsuccess da requisição de inclusão for disparado. Por isso é nele que chamamos o resolve da nossa promise. Por fim, no evento onerror chamamos o reject, aquela função de toda promise que recebe como parâmetro a razão da falha de sua execução.

Qual das opções abaixo combina corretamente as classes ConnectionFactory e NegociacaoDao. Lembre-se que NegociacaoDao depende de uma connection e ConnectionFactory é a classe que possui a responsabilidade de devolver conexões.

```js
ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 200.13)))
    .then(() => console.log('adicionado com sucesso'))
    .catch(() => console.log('não foi possível adicionar'));
```

Tudo começa invocando o método getConnection da nossa ConnectionFactory. Como o método retorna uma promise, quando encadeamos uma chamada à função then temos acesso à conexão. Veja, não queremos trabalhar com uma conexão diretamente, queremos um dao, é por isso que no mesmo then em que obtemos a conexão retornamos implicitamente (arrow function sem block) uma instância de NegociacaoDao.

Como houve um retorno, o dao está disponível na próxima chamada à função then. Nele, chamamos dao.adiciona passando uma negociação como parâmetro.

Como adiciona devolve uma promise e há um retorno implícito da nossa arrow function, encadeando mais uma vez a chamada da função then podemos executar um código com a certeza de que a negociação foi adicionada com sucesso. Caso algum erro ocorra, o código passado para o catch será executado.

## Para saber mais: IndexedDB e transações

Se você já trabalhou com algum banco de dados relacional deve ter reparado que em nenhum momento chamamos métodos como commit ou rollback para consolidar a transação ou abortá-la. Por mais que isso possa lhe causar certo espanto, o IndexedDB trabalha um pouquinho diferente.

Transações do IndexedDB são auto commited
É por meio de uma transação que temos acesso a uma store e dela podemos realizar operações como a inclusão de um objeto. Quando essa operação é realizada com sucesso, ou seja, quando o evento onsuccess é chamado a transação é fechada, ou seja, as transações do IndexedDB são auto commited. É por isso que cada método do nosso NegociacaoDao solicita uma transação toda vez que é chamado.

Podemos cancelar uma transação através do método abort
Ótimo, já sabemos quando uma transação é efetivada e que este é um processo automático, no entanto nem sempre queremos efetivá-la, ou seja, queremos abortá-la. Fazendo uma alusão aos bancos de dados relacionais, queremos ser capazes de realizar um rollback.

Para cancelarmos (rollback) uma transação podemos chamar o método abort:

```js
ConnectionFactory.
    .getConnection()
    .then(connection => {

            let transaction = connection.transaction(['negociacoes'], 'readwrite');

            let store = transaction.objectStore('negociacoes');

            let negociacao = new Negociacao(new Date(), 1, 200);

            let request = store.add(negociacao);

            // #### VAI CANCELAR A TRANSAÇÃO. O evento onerror será chamado.
            transaction.abort(); 

            request.onsuccess = e => {

                console.log('Negociação incluida com sucesso');
            };

            request.onerror = e => {

                console.log('Não foi possível incluir a negociação');
            };


    })
```

Ao executar o código a seguinte mensagem de erro será exibida no console:

DOMException: The transaction was aborted, so the request cannot be fulfilled.
Não foi possível incluir a negociação
Trate o cancelamento de uma transação no evento onabort de transaction
Contudo, podemos tratar os erros de uma transação abortada no evento onabort da transação, ao invés de lidarmos com ele em onerror.

```js
ConnectionFactory.
    .getConnection()
    .then(connection => {

            let transaction = connection.transaction(['negociacoes'], 'readwrite');

            let store = transaction.objectStore('negociacoes');

            let negociacao = new Negociacao(new Date(), 1, 200);

            let request = store.add(negociacao);

            // #### VAI CANCELAR A TRANSAÇÃO. O evento onabort será chamado.

            transaction.abort(); 
            transaction.onabort = e => {
                console.log(e);
                console.log('Transação abortada');
            };

            request.onsuccess = e => {

                console.log('Negociação incluida com sucesso');
            };

            request.onerror = e => {

                console.log('Não foi possível incluir a negociação');
            };


    })
```

Apesar do que aprendemos aqui não ser útil dentro do cenário da aplicação Aluraframe, informações extras como essa são sempre bem-vindas!

Criamos nossa própria solução de persistência aplicando padrões de projeto e combinando um pouco de tudo que vimos nos módulos anteriores, Procuramos esconder a complexidade de se lidar com o IndexedDB através das classes ConnectionFactory e NegociacaoDao. Contudo, repare que isso é um problema que todos aqueles que utilizaram o IndexedDB terão que lidar em algum ponto da aplicação.

Para lidar também com o o IndexedDB outros desenvolvedores tornaram públicas suas bibliotecas. Por exemplo, há o Dexie e o Db.js, este último utiliza promises assim como fizemos.

Como a ideia deste treinamento é que você se torne cangaceiro em JavaScript, não usamos nenhum biblioteca externa e fizemos tudo na mão!

## Comparação entre objetos

Temos a seguinte classe que define o retângulo:

```js
class Retangulo {

    constructor(base, altura) {

        this.base = base;
        this.altura = altura;
    }

    areaCalculada() {
        return this.base * this.altura;
    }
}
```

Em seguida, temos duas instâncias com valores iguais de base e altura:

```js
let r1 = new Retangulo(10,5);
let r2 = new Retangulo(10,5);
```

Quais das opções abaixo retorna true ao compararmos um objeto com outro?

`console.log(r1.base == r2.base && r1.altura == r2.altura);`

Existem tipos primitivos em JavaScript chamado de literais que podem ser acessados como objetos quanto invocamos algum método. O encapsulamento de um primitivo por um objeto automaticamente pelo interpretador é chamado de autoboxing. Por mais que tenhamos um objeto representando um número, a comparação será pelo valor literal (primitivo) e não pela referência. Números são encapsulados pela função construtora Number.

`console.log(JSON.stringify(r1) == JSON.stringify(r2));`

Uma maneira de comparamos um objeto com outro é converter ambos os objetos envolvidos na comparação para String, com o auxílio de JSON.stringify, que está preparado para converter um objeto JavaScript para uma string. Essa solução é interessante quando o objeto possui muitas propriedades.

## "Some"body help me!

Gisele está desenvolvendo um sistema de controle de passageiros. Ela criou a simples classe que representa um passageiro, que pode ser de avião, ônibus, não importa:

```js
class Passageiro {

    constructor(nome, profissao) {

        this.nome = nome;
        this.profissao = profissao;
    }
}
```

Em seguida, ela criou uma lista de passageiros:

```js
let passageiros = []

passageiros.push(new Passageiro('Orlando', 'Dentista'));
passageiros.push(new Passageiro('Suzada', 'Advogada'));
passageiros.push(new Passageiro('Hélio', 'Médico'));
passageiros.push(new Passageiro('Salen', 'Programador'));
passageiros.push(new Passageiro('Francisca', 'Médica'));
```

A ideia de Gisele é poder acelerar a busca por médicos ou profissionais que sejam necessários em casos de emergência.

Qual das opções abaixo utiliza corretamente a função some para encontrar um médico ou uma médica?

```js
let achou = passageiros.some(passageiro => /médic/i.test(passageiro.profissao));

alert(achou);
```

A função some itera sobre o array, assim como forEach, filter e map. No entanto, seu retorno é true ou false. Ela retorna true logo assim que encontrar o primeiro elemento que for condizente com o critério de comparação utilizado. Quando dizemos, "logo assim", significa que a função parará de iterar nos elementos da lista, porque já encontrou pelo menos algum (some) que atenda ao critério.

Veja que o critério de comparação usa a expressão regular criada literalmente com //. Nela, procuramos pela parte médic, sem levar em consideração se o caractere é maiúsculo ou minúsculo, com o modificador i.

## Promise mais elegante

Wittgenstein implementou as classes ConnectionFactory e NegociacaoDao como ensinado neste capítulo. Inclusive, ele teve certeza que seu código funcionava a partir do seguinte teste:

```js
ConnectionFactory
    .getConnection()
    .then(conexao => {

        let dao = new NegociacaoDao(conexao);
        dao.adiciona(new Negociacao(new Date(), 1, 100))
            .then(() => {
                alert('Negociação adicionada com sucesso');            
            });

    })
    .catch(erro => console.log(erro));
```

Apesar de funcional, veja que se tivéssemos mais chamadas à then, cairíamos em algo parecido com o Callback Hell, assunto que tocamos no primeiro módulo de uma sequência de treinamentos avançados.

Qual das opções abaixo reescreve elegantemente o código de Wittgenstein, evitando assim o aninhamento de chamadas à then?

```js
ConnectionFactory
    .getConnection()
    .then(conexao => new NegociacaoDao(conexao))
    .then(dao => dao.adiciona(new Negociacao(new Date(), 1, 100)))
    .then(() => alert('Negociação adicionada com sucesso'))
    .catch(erro => console.log(erro));
```

Podemos escrever um código mais elegante com promises.

## Experimento com promise

Clóvis, desejando compreender melhor o efeito do encadeamento de promises (promise chainning) e o tratamento de erro, criou três funções que retornam promises. Ele simulou um processamento assíncrono usando setTimeout, ou seja, a chamada de resolve de cada promise será chamada depois de alguns segundos. Veja que cada função tem um tempo de espera diferente da outra:

```html
<!-- teste promise -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <script>

        function a(falhar) {

            return new Promise((resolve, reject) => {

                setTimeout(() => {

                    if(falhar) {

                        reject('PROMISE A FALHOU');
                    } else {

                        console.log('PROMISE A RESOLVIDA');
                        resolve('DADO A');
                    }

                }, 2000);
            });
        }

        function b(falhar) {

            return new Promise((resolve, reject) => {

                setTimeout(() => {

                    if(falhar) {

                        reject('PROMISE B FALHOU');
                    } else {

                        console.log('PROMISE B RESOLVIDA')
                        resolve('DADO B');
                    }

                }, 1000);
            });
        }

        function c(falhar) {

            return new Promise((resolve, reject) => {

                setTimeout(() => {

                    if(falhar) {

                        reject('PROMISE C FALHOU');
                    } else {

                        console.log('PROMISE C RESOLVIDA')
                        resolve('DADO C');
                    }

                }, 500);
            });
        }

    </script>
</body>
```

Clóvis, espertamente, fez com que cada função recebesse um parâmetro. Se o valor passado for true, a promise será rejeitada. Uma maneira de simular um erro durante seu processamento.

Ele fez o seguinte teste:

```html
<!-- teste promise -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <script>

        // código das funções omitido 

        // teste, fazendo a promise c ser rejeitada

            a()
            .then(dado => {
                console.log(dado);
                // O RETORNO DA PROMISE B ESTARÁ DISPONÍVEL NO PRÓXIMO THEN
                return b(); 
            })
            .then(dado => {
                console.log(dado);

                /* FORÇANDO A REJEIÇÃO DA PROMISE. TEM QUE IR DIRETO PARA O CATCH. 
                SE NÃO TIVESSE REJEITADO, O RETORNO DE C ESTARIA DISPONÍVEL NO PRÓXIMO THEN */
                return c(true);  
            })
            .then(dado => {
                console.log(dado);
            })
            .catch(erro => console.log(erro));

    </script>
</body>
```

O objetivo de Clóvis é saber se a função catch será chamada se a promise retornada por c for rejeitada, inclusive mostrando no console a mensagem de erro * PROMISE C FALHOU **. Dessa forma, ele terá certeza que durante o encadeamento das *promises, qualquer erro será capturado em um único lugar, no caso em .catch.

Sobre o código acima, marque as alternativas que julgar verdadeira:

A promise C demorará mais de 1 segundo para ser chamada, apesar do valor de setTimeout ser meio segundo (500ms).


Cada promise só é executada depois que a anterior é resolvida. Sendo assim, por mais que a função c esteja com um valor de setTimeout de 500 ela só será executada depois da função a e b serem concluídas.

Alternativa correta
É exibida no console a mensagem "PROMISE C FALHOU".

Sim, porque como passamos true para a função c, ela chamará reject. Isso fará com que a promise rejeitada passe sua mensagem de erro para a função .catch, local centralizado para tratar qualquer erro disparado por uma das promises encadeadas.

Você deve estar se perguntando qual a diferença dessa estratégia para o uso de Promise.all, que usamos no módulo anterior. Promise.all resolve as promises em paralelo, ou seja, uma promise não aguarda a outra terminar para ser executada. Promise.all é interessante quando uma promise não depende do resultado da promise anterior. Nos casos onde há dependência, o encadeamento de promises é o caminho mais indicado.

Faça um teste usando Promise.all. Você verá que as promises serão resolvidas fora da ordem em que foram passadas para Promise.all:

```js
Promise
    .all([a(), b(), c()])
    .then(arrayComResultadoDasPromises => console.log(arrayComResultadoDasPromises))
    .catch(erroDeAlgumaDasPromises => console.log(erroDeAlgumaDasPromises));
```

## Para saber mais: Igualdade de objetos

Vamos lembrar rapidamente como criamos o nosso filtro para saber se já existe uma negociação dentro da nossa lista de negociações.

Segue o esboço de código do filtro, lembrando que o filtro recebe o critério de inclusão. Se o critério devolve true a negociação deve fazer parte da lista:

```js
//classe NegociacaoService no método importa


negociacoes.filter(negociacao =>
    !this._listaNegociacoes.negociacoes.some(negociacaoExistente => 
        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente) //criterio
    )
)
```

Para os amantes do paradigma OO, usarmos a comparação com `JSON.stringify(..)` pode representar uma quebra de um princípio importante: o Encapsulamento.

A pergunta que devemos sempre fazer quando pensamos no mundo OO é: Quem possui essa responsabilidade? Nesse caso especifico, quem deve saber quando uma negociação é igual a uma outra negociação?

Imagine que você precisa verificar a igualdade entre negociações em uma outra classe. Devemos realmente repetir JSON.stringify(..)? A resposta é não, pois devemos colocar esse comportamento em um único lugar, dentro da nossa classe Negociação! Em outras palavras, a classe Negociacao sabe quando uma negociação é igual a outra, essa regra fica encapsulada dentro da classe.

No mundo JavaScript, não existe um nome padrão para esse tipo de método - o mais utilizado é equals ou isEquals. Vamos implementar esse método na classe Negociacao:

```js
class Negociacao {

    //construtor e métodos omitidos

    isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}
```

Repare que usamos `JSON.stringify(..)` dentro do método isEquals. Assim poderemos aproveitar esse método em qualquer lugar e melhorar no código do nosso filtro:

```js
class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    // código anterior omitido 

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente => 
                        negociacao.isEquals(negociacaoExistente)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível buscar negociações para importar');
            })
    }
}
```

Mais elegante e principalmente encapsulado!

## Para saber mais: Outro critério de igualdade

Agora já sabemos que é boa prática encapsular o critério de igualdade dentro de um método da classe do modelo. Na classe Negociacao criamos:

```js
class Negociacao {

    //construtor e outros métodos omitidos

    isEquals(outraNegociacao) {        
            return JSON.stringify(this) == JSON.stringify(outraNegociacao)
    }
}
```

Assim podemos testar:

```js
var hoje = new Date();
var n1 = new Negociacao(hoje, 1, 100);
var n2 = new Negociacao(hoje, 1, 100);

n1.isEquals(n2); //true
```

Agora imagine que o atributo quantidade não pudesse ser considerado na hora de comparar duas negociações. Ou seja, uma negociação deve ser igual a outra quando apenas a data e o valor são iguais:

```js
var hoje = new Date();
var n1 = new Negociacao(hoje, 1, 100);
var n2 = new Negociacao(hoje, 5, 100);

n1.isEquals(n2); //retorna false, mas queremos true
```

Como encapsulamos o nosso código, já sabemos onde mexer. Mas não podemos mais usar o `JSON.stringify(..)` para testar a igualdade. Lembrando `JSON.stringify(..)` se baseia em todos os atributos! Usaremos cada atributo separadamente:

```js
class Negociacao {

    //construtor e outros métodos omitidos

    isEquals(outraNegociacao) {        
        return this._data.getTime() == outraNegociacao.data.getTime()
            && this._valor == outraNegociacao.valor;
    }
}
```

Agora podemos testar, mesmo com quantidades diferente os dois objetos são considerados iguais pelo método isEquals:

```js
var hoje = new Date();
var n1 = new Negociacao(hoje, 1, 100);
var n2 = new Negociacao(hoje, 5, 100);

n1.isEquals(n2); //true
```

Repare na beleza do encapsulamento! Sempre chamaremos o método isEquals, indepentemente de qual seja o critério de igualdade concreto.

## Marque todas as alternativas verdadeiras sobre a Fetch API.

Alternativa correta
A Fetch API usa o padrão de projeto promise.

Podemos encadear chamadas do .then, inclusive tratar erros com .catch.

Alternativa correta
Existem polyfis disponíveis na internet que garantem a presença da Fetch API em navegadores que não a suportam, mas é importante que o navegador suporte no mínimo a API de promise.

Programadores front-end têm ficado cada vez mais interessados nessa API, ao ponto de utilizá-la em seus projetos, tudo com auxílio de um polyfill.

Alternativa correta
Por mais que seja utilizada por muitos desenvolvedores, a Fetch API ainda está sujeita a mudanças, pois é experimental ainda (pelo menos até agosto/2016).

O fato de ser experimental não afastou os desenvolvedores e muitos deles usam um polyfill para suportar esse recurso em navegadores que não o suportam. Mas é importante estar atento que o browser precisa suportar promises.

Laércio reescreveu a classe HttpService utilizando a Fetch API:

```js
class HttpService {


    _handleErrors(res) {

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res;
    }

    get(url) {

        fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, dado) {

        fetch(url, { 
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res)); 
    }

}
```

Contudo, quando os métodos get ou post são chamados, a seguinte mensagem de erro é exibida no console:

Cannot read property 'then' of undefined
Tente descobrir primeiro o erro do código e só depois continue para ver a resposta do instrutor.

Veja que os dois métodos esqueceram de retornar uma promise, isso porque a função fetch retorna uma promise. Sem retorná-la, não é possível encadear uma chamada à then.

## Dando suporte a js em navegadores mais antigos com Babel

O babel é um transpiler opensource

Que tal reforçar ainda mais o que aprendeu sobre transpiler? Vem comigo!

Revisão
Durante todo o treinamento usufruímos como desenvolvedores dos recursos do ES2015 visando a escrita de um código mais elegante e mais fácil de manter. Contudo, não é raro o próprio desenvolvedor se questionar sobre a compatibilidade do seu código em relação aos seus usuários ou visitantes do site.

Normalmente é realizado um estudo (métricas do Google Analytics, por exemplo) para saber a predominância de determinados browsers para então deixar de suportar aqueles com uso mais tímido. Ainda assim, se algum browser com baixo suporte ao ES2015 for um dos mais usados alguma atitude deve ser tomada.

Dentro desse contexto, o desenvolvedor tem que se equilibrar na balança que ora pesa para o lado do que há de mais moderno da linguagem e ora para a questão de compatibilidade, esta última, vencedora justa a maior parte do tempo.

Para solucionar os problemas de compatibilidade e ainda permitir que o desenvolvedor utilize o que há de mais moderno da linguagem JavaScript foram criados compiladores de código fonte para código fonte comumente chamados de transcompiladores (transpilers). Com eles, é possível, por exemplo, converter um código fonte de Ruby para JavaScript e vice-versa. No entanto, no universo JavaScript a ideia é compilarmos um código-fonte escrito em ES2015 para ES5, garantindo assim a compatibilidade do nosso código em diferentes tipos de browsers.

O resultado da transcompilação pode variar de transpiler para transpiler, mas o resultado final deve ser idêntico à funcionalidade original do código em ES2015. Inclusive não é raro o resultado da transcompilação para ES5 resulte em um código muito mais verboso.

Vejamos a seguinte hierarquia de projeto:

```fs
app
    js
        es6 
            a.js
    css
        a.css
    img
        logo.png
index.html
```

Nessa estrutura, temos o arquivo `app/js/es6/a.js`. Sabemos que o index.html não pode importar diretamente o arquivo, pois se estivermos executando nosso código no IE 9, por exemplo, não teremos suporte para vários recursos do ES6. A ideia é converter o código escrito em ES6 para ES5, por exemplo, resultando na seguinte estrutura:

```fs
app
    js
        es6 
            a.js <-- será transcompilado por um transpiler
    css
        a.css
    img
        logo.png
index.html
```

Resultado da transcompilação:

```fs
app
    js
        es5
            a.js <-- resultado da transcompilação
        es6 
            a.js 
    css
        a.css
    img
        logo.png
index.html
```

Veja que é o arquivo `app/js/es5/a.js` que deve ser importado em index.html. Além disso, qualquer mudança deve ser empreendida no arquivo app/js/es6/a.js. Depois de efetuada a alteração, o arquivo precisa ser transcompilado para que `app/js/es5/a.js` reflita a transcompilação da versão mais nova do código.

O processo de transcompilação normalmente não é feito manualmente, mas por meio de ferramentas que tornam transparentes esse processo para o desenvolvedor, evitando assim erros oriundos do esquecimento da compilação deste ou daquele arquivo que foi atualizado.

Babel é um transcompilador muito famoso no cenário open source. Marque as opções verdadeiras sobre esta ferramenta:`

Babel possui recursos nativos que permitem o monitoramento e compilação de scripts de maneira automática, sem a intervenção do desenvolvedor.

O binário do Babel possui o modo watch que monitora mudanças de arquivo e quando configurado corretamente permite compilar nossos script sem que o desenvolvedor assuma essa responsabilidade.

Alternativa correta
Babel é um módulo do Node.js e depende dele para funcionar.

Babel é um módulo do Node.js. Ele é baixado através do npm, o gerenciador de pacotes da plataforma Node.js.

Babel é uma ferramenta que pode ser facilmente incluída em seu workflow de desenvolvimento. Mas como qualquer ferramenta, precisa ser configurada.

Marcelo criou arquivo aluraframe/client/.babelrc configurando-o desta maneira:

```json
{
  'presets': ['es2015']
}
```

Contudo, a configuração não funciona. Antes de continuar e ver a explicação do instrutor tente descobrir o motivo dela não funcionar.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

O arquivo .babelrc deve estar no formato JSON e uma das exigências desse formato é usarmos aspas duplas para representar suas chaves, inclusive strings.

```json
{
  "presets": ["es2015"]
}
```

## Evitando Babel no escopo global

Muitos tutoriais da internet instalam Babel e outros módulos do Node.js globalmente por uma questão de brevidade, mas que não é uma boa prática.

Se você precisa da nova versão do Babel porque seu projeto A depende de um novo recurso, a atualização da instalação global será aplicada em todos os projetos. Ela pode funcionar perfeitamente em A, mas pode quebrar o projeto B que até então funcionava se algum BUG foi introduzido, um BUG que só afeta um recurso utilizado por B.

Sendo assim, instalamos Babel local ao projeto, contudo não é nada elegante a forma com que chamaremos manualmente o binário do babel em nosso terminal. Para contornar esse problema e ainda termos o babel instalado localmente para cada um dos nosso projetos, podemos criar um script em package.json que chamará o Babel para nós.

Qual das opções abaixo possui a chave script configurada corretamente para chamar Babel e compilar todos os nossos arquivos dentro da pasta aluraframe/client/js/app-es6 resultando na pasta aluraframe/client/js/app:

```js
{

  // código omitido

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel js/app-es6 -d js/app "
  },

  // código omitido
}
```

Dentro da pasta aluraframe/client, com o terminal aberto, se executarmos o comando npm run build o npm executará o comando definido para a chave build, aquele executa o Babel para nós passando seus parâmetros.

### Sourcemap

Marque a alternativa correta à respeito do arquivo sourcemap.

Bônus: assim que você responder essa questão o instrutor explicará com mais detalhes o que acontece por debaixo dos panos quando usamos um sourcemap!

São arquivos usados em ambiente de desenvolvimento que visam fazer um "de para" do arquivo transcompilado com o arquivo original, para que erros sejam apontados no arquivo original.

ATENÇÃO: o carregamento do sourcemap no OSX usando Chrome está com problema. Ainda não há um fix. Verifique a cada atualização do Chrome.

Veja que é possível debugar um código transpilado mais facilmente através do uso de sourcemaps.

Mas como ele funciona por baixo dos panos? O arquivo sourcemap possui a estrutura do arquivo original, aliás, o arquivo original nem precisa existir em produção para que o sourcemap funcione.

Se abrirmos o arquivo aluraframe/client/js/app/controllers/NegociacaoController.js, nosso arquivo transcompilador, no final dele temos o seguinte comentário especial:

//# sourceMappingURL=NegociacaoController.js.map
Veja que esse comentário indica para o browser qual sourcemap deve ser carregado.

Outro ponto que você deve estar se perguntando é quando os arquivos sourcemaps serão baixados e se interferem no tempo de carregamento do site. Bem, sourcemaps são baixados apenas quando você abre a ferramenta de desenvolvimento do seu browse, ou seja, seu console ou dev tools. Claro, os arquivo só serão baixados se existirem. Veja que dessa maneira não há prejuízo do carregamento inicial do site.

Vimos que o processo de transcompilação realizado pelo Babel convertendo nosso código em ES2015 (ES6) para ES5 o torna mais compatível, pois navegadores que não suportarem os recursos do ES2015 conseguirão interpretar nosso código. Contudo, nem tudo é resolvido por um transcompilador.

Por exemplo, se usarmos promises, o código transcompilado continuará a não funcionar caso o navegador não suporte esse recurso, a mesma coisa da Fetch API que vimos. Nesses casos, é comum misturar o processo de transcompilação com o uso de um ou outro polyfill para tapar aquelas lacunas que o transpiler não consegue.

O projeto finalizado pode ser visto [aqui]
