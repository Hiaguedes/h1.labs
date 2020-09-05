# Gráficos na web com google charts

Estaremos utilizando aqui o google charts para gerar gráficos em nossos sites e essa biblioteca é feito todo em javaScript.

## Estrutura básica

O site do google charts já ajuda e muito no processo de aprendizagem, mas vamos os poucos de como usar essa biblioteca

Primeiro vamos importar o loader no js com:

`<script src="https://www.gstatic.com/charts/loader.js"></script>`

Aí dentro do script que vamos escrever o gráfico de pizza vamos fazer:

`google.charts.load('current', {'packages':['corechart']});`

Isso vai carregar todos os pacotes necessários para escrever os gráficos, agora vamos escrever a função que conterão os dados na tabela

```js
const desenharPizza = () => {

const tabela = new google.visualization.DataTable();
tabela.addColumn('string','Categoria');
tabela.addColumn('number','Valores');

tabela.addRows(
    [
        ['Educação',2000],
        ['Transporte',500],
        ['Lazer',230],
        ['Saúde',50],
        ['Cartão de Crédito',920],
        ['Alimentação',310]
    ]
);

const grafico = new google.visualization.PieChart(document.querySelector('.grafico-pizza'));
grafico.draw(tabela);

}
```

Primeiro criamos a tabela instanciando a visualização do google, depois adicionamos colunas com o seu tipo de dado, as linhas com as informações de fato, depois selecionamos onde desenharemos esse gráfico (selecionando um lugar no html), para depois desenhar mesmo.

Passado isso fazemos o callback da função com:

`google.charts.setOnLoadCallback(desenharPizza);`

E temos o primeiro gráfico que ficou com a seguinte cara:

![Primeiro Gráfico](./img/primeiroGrafico.png)

Agora vamos estilizar esse gráfico

## options

Podemos colocar titulo, aumentar e diminuir tamanho dentro de uma variável options da seguinte forma:

```js
const options = {
    'title': 'Gastos do Mês',
    'height': 350,
    'width': 450
};
```

E desenhar esse gráfico com:

```js
grafico.draw(tabela,options);
```

Se formos incluir o título Categorias de gastos em 2018 dentro do objeto opções do gráfico, qual a sintaxe correta?


`'title': 'Categorias de gastos em 2018'.`

Correto! O nome title pode ser usado com ou sem aspas simples, o google chart permite os dois. Mas a string do título precisa estar entre aspas simples.

`title: 'Categorias de gastos em 2018'.`

Correto! Podemos usar o title com ou sem aspas simples, o Google Charts permite os dois. O que precisamos manter são as aspas simples no valor, que é o nome do título.

Dentro de um projeto, pediram para que trocássemos um gráfico de pizza para um gráfico de donut.

Qual a maneira de fazermos isso no Google Charts?

Adicionando a opção `pieHole`.

Correto! Nessa opção, podemos setar um valor de 0.0 até 1.0 para o raio do círculo que criará o buraco do donut na pizza.

Para outros tipos de gráfico veja a documentação, a aba guides tem muita coisa

Em um gráfico de pizza é interessante deixar a legenda das seções como em `legend: 'labeled'` e talvez mudar o que está escrito na seção com `pieSliceText: 'value'` onde coloco o valor e não o percentual (que é o default)

## Para saber mais

Algo que devemos fazer ao criar os gráficos é prestar atenção em quais estão contidos no pacote que importamos, até para entendermos se é necessário adicionar mais pacotes ou não.

Para sabermos quais gráficos estão no pacote corechart que estamos usando, basta acessarmos a parte de [Referência](https://developers.google.com/chart/glossary) da documentação.

E podemos procurar por corechart ("Crtl + F"). E então iremos encontrar uma lista completa de gráficos que estão no pacote:

Caso usemos algum gráfico que não está contido na lista, basta voltarmos para a opção Guias na barra que fica acima do texto e clicar no gráfico correspondente em Chart Types.

Ao fazermos isso, teremos um pouco mais de informações sobre o gráfico, e muito provavelmente exemplos que estão importando o pacote usado para desenhá-lo. Sabendo qual o pacote, podemos inclusive pesquisar, dessa vez na própria barra de Search do site para encontrar mais detalhes e usos.

Procure sempre ir se familiarizando com a documentação, é a melhor fonte que temos.

## Alterando cores

Com o opção `colors` nós alteramos as cores do nosso gráfico em ordem (ou de modo intercalado caso coloquemos menos cores que linhas)

Porém a propriedade `colors` não permite a edição de cores individualmente para isso podemos usar a propriedade `slices` da seguinte forma:

```js
    slices: {
        0:{},
        1:{color:'grey'},
        2:{color:'#a6a6a6'},
        3:{color: 'grey'},
        4:{color: 'orange'},
        5:{color:'#a6a6a6'}
    }
```

Onde 0,1,2,... são as posições das linhas na tabela que criamos

Para destacar ainda mais aquela seção podemos destacar o setor do gráfico com offset dentro do slice

Estamos fazendo uma visualização inspirada no jogo Pac Man e iremos deixar um gráfico de pizza com 3 pedaços inteiramente amarelos.

Para fazermos isso com facilidade, o que podemos customizar nas opções do gráfico?

`colors: ['yellow'].`

Correto! Quando usamos o array de cores, se colocarmos apenas uma cor, ela já colore todas as fatias da pizza.

## Para saber mais

Quando usamos uma biblioteca como o Google Charts, é sempre bom criarmos o hábito de consultar a sua documentação para entendermos tudo o que podemos fazer com o gráfico.

Por exemplo, o fato de conseguirmos fazer um gráfico de pizza 3D, mas não um donut em 3D, já que a biblioteca não suporta a propriedade que gera o donut com a 3D juntas.

Fica [aqui](https://developers.google.com/chart/interactive/docs/gallery/piechart#donut) a parte da documentação (em inglês) com esse detalhe.

Somos informados de que não podemos combinar as opções pieHole e is3D; caso contrário, pieHole será ignorada ("You can't combine the pieHole and is3D options; if you do, pieHole will be ignored").

Assim, podemos entender o motivo das duas propriedades não serem compatíveis: o pieHole será ignorado. Isso significa que, se usarmos as duas dentro das opções, sempre teremos um gráfico de pizza 3D ao invés de um donut.

## O pulo do gato

Se quisermos colocar mais tipos de gráficos, organização vai ser a chave do sucesso, aí coloque de uma forma minimamente organizada tal como está nesse projeto, com o arquivo de grafico em arquivo separado e chamando tabela, opções de estilo e grafico, e em um arquivo mais geral carregar os gráficos e fazer o callback da função

Para mudar a linguagem dos gráficos para português nós fazemos:

`google.charts.load('current', {'packages':['corechart'],'language':'pt-br'});`

Criamos um novo gráfico de linha para um projeto de investimentos.

Fizemos a tabela e customizamos suas opções, mas ao atualizarmos o navegador, vemos que as alterações não foram aplicadas, e o gráfico continua do mesmo jeito.

O que pode ter acontecido?

Esquecemos de passar as opções para o método chart.draw().

Correto! É muito comum que, ao escrevermos as opções do gráfico, fiquemos empolgados e esqueçamos de adicioná-las ao método chart.draw(), o que irá deixar um de nossos gráficos sem a customização.

## Gráfico de Linha

Fizemos um gráfico de linha e vamos partir para a customização.

Seguindo as boas práticas de visualização de dados, queremos fazer com que as linhas de grade não interfiram na visualização da nossa linha principal.

Quais são as maneiras de fazermos isso?

Usando `gridlines: { count: 0 }`.

Correto! Ao usarmos o count, não só iremos remover as linhas de grade, como não exibiremos dados no eixo vertical.

Alternativa correta
Usando `gridlines: {color:'transparent'}`.

Correto! Desse modo, não removemos os números do eixo vertical, mas escondemos as linhas, pois elas se tornam transparentes.

Veja a documentação <https://developers.google.com/chart/interactive/docs/gallery/linechart>

## Gráfico de colunas

Vamos integrar mais visualizações à uma interface já existente do ByteBank. Eles fizeram divulgações do banco nas redes sociais e iremos colocar os resultados em um novo gráfico.

Precisamos adicionar mais uma coluna chamada Número de acessos na tabela de dados abaixo.

```js
data.addColumn('string', 'plataforma');
data.addColumn('number','quantidade de usuários' );

data.addRows([
    ['Facebook', 1.650.000],
    ['Whatsapp', 1.000.000],
    ['Messenger', 900.000],
    ['Instagram', 500.000],
    ['Pinterest', 100.000],
    ['Twitter', 310.000]
]);
```

Como podemos fazer isso?

`data.addColumn('number', 'número de acessos');`

Correto! Quando temos uma DataTable, para adicionar uma coluna, usamos `data.addColumn();` e passamos o tipo e nome da coluna entre os parênteses.

Em outro exercício, já tínhamos adicionado uma coluna chamada Número de acessos em uma tabela.

Nesse exercício, o nosso tipo de tabela era uma `dataTable`, mas agora, temos um gráfico que usa `arrayToDataTable` para facilitar a inclusão dos dados.

Qual a diferença de adicionarmos uma coluna quando temos um `arrayToDataTable` ?

Não precisamos definir o tipo de dado naquela coluna, a biblioteca definirá qual é.

Correto! Uma das vantagens de usarmos o arrayToDataTable é que não precisamos definir o tipo, colocamos apenas um array inicial com o nome de cada coluna.

Quando falamos sobre gráficos, é comum usarmos as nomenclaturas de eixo x e eixo y.

Para facilitar, no Google Charts esses eixos têm outros nomes considerados mais diretos.

Que nomes são esses?

`hAxis` e `vAxis`, de eixo horizontal e eixo vertical.

Correto! Como o eixo x é horizontal e o eixo y é vertical, a biblioteca achou melhor já nomeá-los assim.

O conteúdo total da aula pode ser visto [aqui](https://github.com/alura-cursos/google-charts-1)

## Gráfico de barras

A grande diferença do gráfico de colunas pro de barras é que na hora de chamar o gráfico apenas trocamos:

```js
const grafico = new google.visualization.BarChart(divColuna);
```

Invés de column é bar hahahah e isso poupa muito esforço

Para ordenar uma tabela de acordo com os valores de uma coluna nós fazemos

`tabela.sort({column:1, desc:true})`

Ou seja pegamos o index 1 (começando do zero) da coluna e arrumamos de maneira decrescente (do maior para o menor)

O gerente de projeto do banco para o qual estamos trabalhando pediu um gráfico de barras que deixasse claro na própria tabela que os valores poupados são em reais.

Como podemos incluir essa informação na tabela abaixo?

```js
tabela.addColumn('string','meses');
    tabela.addColumn('number', 'valores');
        tabela.addRows([
            ['Jan',100],
            ['Fev',1500],
            ['Mar',230],
            ['Abr',580],
            ['Maio',900],
            ['Jun',1260],
            ['Jul',840],
            ['Ago',500],
            ['Set',463],
            ['Out',910],
            ['Nov',751],
            ['Dez',165]
        ]);
```

`tabela.addColumn({type: 'string', role: 'annotation'});`

Correto! Para exibirmos os nossos dados com R$, precisamos adicionar uma nova coluna que tenha o papel de ser uma anotação. Desse modo, anotamos os R$ no gráfico.

## Usando arquivos json para fazer gráficos

Para popular a tabela usando o json o arquivo deverá estar na notação que está no exemplo do link da documentação e que pode ser vista [aqui](https://developers.google.com/chart/interactive/docs/php_example)

Siginificados dentro do json (id e pattern são opcionais mas o type é obrigatório),c é a célula, v é o valor da cédula se estiver vazio a célula é nula, f é o formato string dessa célula e p o estilo

Em exercícios anteriores, adicionamos uma coluna na tabela de dados do tipo DataTable, e também vimos como faríamos isso em uma tabela do tipo ArrayToDataTable().

Neste exercício, vamos trabalhar com um arquivo JSON. Temos o arquivo abaixo com o mês e o valor na conta dos usuários de um banco e precisamos adicionar uma nova coluna com o nome de cada um desses usuários. Como faríamos isso?

```json
{
    "cols":[
                {    
                    "label": "Mês",
                    "type":"string"
                },
                {    
                    "label": "Valor",
                    "type":"number",

                }
    ],
    "rows":[
                {"c": [
                        { "v": "Jan", "f": null},
                        { "v": 5.810, "f": null}
                        ]
                },

                {"c": [
                        { "v": "Fev", "f": null},
                        { "v": 1.283, "f": null}
                        ]
                }
    ]
}
```

`{"label": "Nome","type":"string"}`

Correto! Para incluir mais uma coluna no JSON, precisamos adicionar mais um objeto que contenha o nome da coluna e qual será o tipo de dado contido nela

O que é jQuery?
O jQuery é uma biblioteca bem leve que também é escrita em JavaScript, assim como o Google Charts. Seu foco é oferecer funções prontas para uso, simplificando a programação e o número de linhas de código em JavaScript.

Então, ao invés de escrevemos uma função para trocar a cor de fundo de uma página em JavaScript em 3 linhas, como em:

```html
<script>
function mudarCorDeFundo(cor) {
        document.body.style.background = cor;
}
</script>
<body onload="mudarCorDeFundo('red');">
Fazemos o mesmo com jQuery usando apenas uma linha de código:

<script>
$("body").css("background", "red");
</script>
```

Essa é uma das maiores vantagens dessa biblioteca.

O que é o AJAX do jQuery?
AJAX é um acrônimo de Asynchronous JavaScript And XML, ou, em português, "JavaScript e XML Assíncronos".

O AJAX é uma junção feita com JavaScript de algumas tecnologias da web para fazer com que as páginas fossem recarregadas em partes, sem a necessidade de atualizar a página inteira. Isso acontece pois o AJAX permite que as partes das páginas se atualizem sem travar o navegador, ou de modo assíncrono, ao trocar informações com um servidor.

De acordo com Jesse James Garrett, que foi o criador do termo AJAX, temos 6 tecnologias unidas pelo JavaScript (e, se contarmos com ele, 7); são elas o HTML (ou XHTML) e CSS para mostrar adequadamente os dados na página, o Modelo de Documento de Objetos (DOM) para gerar interações dinâmicas com os dados, mais o JSON ou XML para a troca ou transporte de dados, junto com XSLT para a manipulação dos dados, e o objeto XMLHttpRequest para possibilitar a comunicação assíncrona.

Com o AJAX dentro da biblioteca do jQuery, como fizemos no curso, podemos acessar arquivos e passar essas informações sem a necessidade de uma atualização da página inteira na qual os nossos gráficos são exibidos.

Ao fazermos isso, seguimos a documentação do Google Charts e passamos apenas 3 parâmetros, mas, se consultarmos a documentação oficial do AJAX, percebemos que podemos especificar em torno de 34 parâmetros ao realizarmos essa comunicação.

Exemplo do uso de outros parâmetros
Por estamos trabalhando com um .json, podemos encontrar um erro de exibição dos nossos gráficos em alguns navegadores. Este erro é o XML Parsing Error: not well-formed. , que acontece porque o nosso navegador não entende que é um arquivo do tipo JSON que está esperando um XML, então ele acha que tem algum erro no arquivo.

Segundo a documentação, podemos usar um parâmetro chamado tipo de conteúdo, ou contentType, e especificar que esse conteúdo é um .json com application/json, logo, a nossa chamada ficaria assim:

```js
var dadosJson = $.ajax({
    url: 'dados.json',
    contentType: 'application-json',
    dataType: 'json',
    async: false,
    }).responseText;
```

Mas ao fazermos isso, não só continuamos com o mesmo erro como temos ainda outro de pré voos, ou, em inglês, preflight, e o nosso gráfico nem é exibido. O que aconteceu?

O navegador não entende esse tipo de conteúdo, apenas application/x-www-form-urlencoded, multipart/form-data, ou text/plain, e quando tentamos enviar um application/json, ele não deixa a página "decolar", ficando em pré voo.

Então vamos tentar outra propriedade, que customize o tipo de arquivo que estamos enviando. Precisamos dizer para o navegador aceitar este arquivo novo. Logo, vamos escrever o que ele aceita com accepts, e então passar o application/json como um tipo customizado, ou mycustomtype.

```js
var dadosJson = $.ajax({
    url: 'dados.json',
    accepts: {
            mycustomtype: 'application/json'
      },
    dataType: 'json',
    async: false,
}).responseText;
```

Beleza, desse modo daremos um jeito de incluir um .json, será que funciona agora?

Ainda não, continuamos com o mesmo erro, o nosso navegador ainda não entende o arquivo. Mas ainda temos outra propriedade para testar.

Como dito anteriormente, uma das partes do AJAX é o objeto XMLHttpRequest, em que são definidos os tipos de arquivos de que falamos até então. Outros formatos além dos "tradicionais" são entendidos por algo conhecido como MIME (de Multipurpose Internet Mail Extensions em inglês, ou Extensões Multiproposta de Email de Internet). O MIME foi criado para emails, mas é usado em nossas chamadas e protocolos da web.

Inclusive, é no MIME que temos o contentType que acabamos de tentar explicitar. Mas, se isso não funcionou, o que iremos fazer é dar uma novo valor para esse MIME, que será o de um JSON.

Então vamos dizer que o tipo do MIME, ou mimeType, é o de application/json.

E agora, iremos conseguir?

```js
var dadosJson = $.ajax({
    url: 'dados.json',
    mimeType: 'application-json',
    dataType: 'json',
    async: false,
    }).responseText;
```

E veja só, o erro sumiu. Ao sobrescrevermos os tipos suportados pelo protocolo, conseguimos dizer para ele qual o tipo do nosso arquivo corretamente.

Repare que para isso usamos diversas propriedades existentes no AJAX do jQuery.

No projeto que fazemos com o banco, nossos clientes mudaram de ideia sobre deixar seus dados dentro do arquivo JavaScript. Por causa disso, optamos por deixá-los no formato JSON.

Mas agora que temos gráficos carregados com dados vindos de arquivos .json, como iremos fazer para adicionar customizações neles?

Seguimos apenas colocando as customizações nas opções, como fizemos para todos os outros gráficos.

Correto! Para customizarmos um gráfico, não importa de onde seus dados estão sendo carregados, ainda conseguimos determinar as mudanças usando o mesmo objeto.

Alguns browsers podem não aceitar o carregamento do json na pasta local, mas não tem problema pois no gist podemos colocar o arquivo json ali sem problema e utilizar o link Raw desse arquivo na nossa aplicação

Dadas as necessidades do projeto em que estamos trabalhando, precisamos separar os dados dos gráficos do nosso arquivo .js em um .json, porém, além de fazermos isso, temos que obtê-los a partir de um link externo.

O que iremos alterar para "puxar" esses dados do link?

A url dentro da chamada AJAX do jQuery para incluir o link.

Correto! Basta alterarmos uma linha de código. Isso é o suficiente para mudarmos a fonte dos nossos dados.

## Uma maneria mais fácil de escrever o json

Quando criamos a tabela na mão com o addColumn e o addRow, podemos dar `console.log(tabela.toJSON())` e no console temos o resultado json da tabela, mas se atente pois esse json estará minificado caso queiramos editar esse arquivo pode atrapalhar, então procure por um validador de json que irá realizar essa deembelezar o arquivo
