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
