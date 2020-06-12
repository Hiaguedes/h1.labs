# HTML

A finalidade do HTML é marcar o texto em uma página web

## Alguns comandos báscicos

Estrutura básica de uma página HTML

```html
<!DOCTYPE html>
<html lang="pt-br">

    <head>
    <meta charset="UTF-8">
    <title>Título da Página</title>
    </head>
    <body>

    </body>

</html>
```

Tag se começa com `<tag>` e `</tag>`

A tag DOCTYPE serve para que todos os programadores saibam que aquele arquivo é um arquivo html (assim com a extensão .html), e se somente colocarmos html depois do !DOCTYPE nós estamos dizendo para o navegador que estamos usando a última versão do html. Ela é só uma tag de informação e de estrutura.

A tag `html` serve para marcarmos na página tudo que vamos renderizar na página como html (algumas páginas até funcionam sem essas tags, mas como não se sabe como os browsers vão funcionar daqui uns meses, é sempre bom garantir que essas tags existam na página). Aqui colocamos que a página tem um língua mãe em portugês brasil, e caso uma pessoa esteja em outro país ela pode acessar um serviço externo para que possa se traduzir essa página

A tag `meta` é uma tag que passa informações pro navegador e charset (characterset) define a biblioteca de letras (dicionário) que vai ser utilizado, alguns navegadores entendem acentos e coisas do tipo. mas para garantir que todos os navegadores vão entender o que estamos dizendo vale forçar isso na tag exatamente abaixo do `<html>` e a melhor e mais comum é a UTF8, então não teremos problema de acentuação, de cedilha de crase.

As tags `head` e `body` são entendidas como, o `head` não é visto pelo usuário mas entendida pelo navegador e o `body` é tudo aquilo que é visto pelo navegador, então faz sentido o meta eo `title` dentro do `head` e todo o texto a ser exibido de informação deve estar no `body`, essa separação deixa tudo mais entendível para nós desenvolvedores.

Algumas outras tags:

|Tag|Descrição|
|--|--|
|h1,h2,h3,h4,h5..|Título, subtítulo e por aí vai|
|p|parágrafo|
|hr|linha horizontal|
|b ou strong|Texto em negrito|
|i ou em|Texto em itálico|
|title|Seta o título da página na aba da página|
|img|coloca imagem|
|a (ancora)|Você pode linkar uma página qualquer com essa tag com um href=""|
|nav|divisória criada no html 5 para tagear a barra de navegação|
|main|tag semântica que nos diz o conteudo principal de uma página, é bom por questão de sematica (ou seja deixa o codigo mais legível), é igual uma div mas com nome proprio|
|br|pula a linha break|

## Adcicionando imagem

Assim como o css, nós temos que linkar uma pasta com as imagens da seguinte forma no body

No body chamaremos:

```html
<img src="pasta">
```

Posso alterar sua largura com width e altura com height

### Ajustando imagem

As vezes as imagens que pegamos da internet são muito grandes, e mesmo que coloquemos um tamanho de largura reduzido para ela ocasionalmente deixa um espaço muito grande ao lado dela, isso é por que temos um espaço de inline que pode ser preenchido ou não

## Listas

Tags para listas listas não ordenadas (ul) e listas ordenadas (ol).

Elementos da lista (list item) -> li deixando a estrutura de uma lista não ordenada da seguinte forma

```html
<ul>
    <li> Item 1</li>
    <li>Item 2</li>
        ...
    <li> Item n</li>
</ul>
```

## div

A tag de divisão serve para separar dois tópicos do meu código podendo ter letras com tamanhos diferentes, backgrounds diferentes, outra forma de se ver o código inclusive. E por padrão a div não interfere em nada no código

## ul

Podemos dizer que o `ul` que originalmente é travado, fique do tamanho que ele foi especificado e deixe outros elementos ocuparem o espaço faltante (inline-block)

Tags do tipo block irão ocupar a largura toda de sua página por padrão, independente do conteúdo que ela tiver. Além disso vc consegue manipular largura e altura desses elementos.

Já as tags inline ocuparão apenas a largura e altura de seu conteúdo interno, de modo que vc não consegue alterar esses valores.

<https://cursos.alura.com.br/forum/topico-os-comportamentos-inline-e-block-101153>

## Cabeçalho

Por ser muito comum nós temos agora no HTML5 a tag header

## Main

Com intença de dividir o código de modo a ficar mais legível temos a tag main (que deixa o conteudo principal a mostra)

## Rodapé

Ao rodapé da-se o nome de footer

## Caracteres especiais

Existem símbolos especiais que de vez em quando devemos colocar em nossos sites, um deles é o simbolo de copyright &copy; e o mais normal em nossas aplicações é vermos uma tabela de unicodes e pegar o nome da entidade no caso do simbolo de copyright o seu símbolo de unidade é `&copy;`

Um site bom para nos dar os códigos para isso é o <https://unicode-table.com/en/>

## Formulários

Um formulário é uma série de campos onde eu quero que o usuário digite o que ele quer (dentro do especificado) e com isso que eu mande esses dados para uma outra página, ou para um servidor que faça determinada ação. Note que quando digitamos uma busca com o google a URL da próxima página passa uma query com a palavra que pesquisamos mais uma série de informações de sistema.

Para decidir quando devemos usar um formulário nas nossas páginas, alguns motivos podem ser analisados:

1) Quando queremos enviar os dados para um servidor

2) Quando queremos capturar informações que o usuário digitar

3) Quando queremos enviar os dados para uma outra página

E assim como o main, o header e o footer eu tenho uma tag de formulário que siginifica `<form>`

Entrada de dados -> `<input>`, com `<input placeholder="">` nós conseguimos colocar uma mensagem nessa barra de digitação.
Etiqueta-> `<label>` serve como se fosse um índice para a entrada do dado
Butão -> `<button></button>`

Com `<input type="submit" value="Enviar">` eu consigo criar um botão que manda informações para onde eu quiser.

Para ter uma área de texto maior e mais maleável use `textarea` e nela você definir o tamanho inicial dessa área de texto colocando o numero de linhas (rows) e de colunas.

Para selecionar uma opção dentre algumas, coloque no `type` do input o valor `radio` e para selecionar uma e automaticamente descelecionar outra coloque o mesmo `name` para essas opções.

Para fazer um imput de checkbox coloque no `type` desse input coloque `checkbox` e para facilitar e não precisar colocar uma id pro tipo de input e linkar com for no label, coloque o input dentro da label.

Com select e colocando as opções criamos um dropdown para que seja possível escolher uma opção.

O type é bem importante para o mundo mobile por que o teclado pode mudar de modo a ajudar o usuário a digitar com mais rapidez os dados.

### Campos de mensagem obrigatória

Basta na tag de input colocarmos `required`

Quando temos uma marcação com radio o usual é já deixarmos uma marcada e fazemos isso com `checked`

### Tgas semanticas de formulário

É comum utilizarmos a tag `<fieldset>` invés de uma div e separarmos darmos um título a esses fieldsets com `<legend>` e isso pode substituir a tag `form p` no css.

## Tabelas

Para criar tabelas usamos a tag table e para estruturar direitinho uma tabela usamos

```html
<table>
    <thead>
        <tr>
            <th>Dia</th>
            <th>Horário</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <td>Segunda a Sexta</td>
            <td>8:00-20:00</td>
        </tr>

        <tr>
            <td>Fim de Semana</td>
            <td>8:00 - 16:00</td>
        </tr>

        <tr>
            <td>Feriado</td>
            <td>8:00-12:00</td>
        </tr>
    </tbody>
</table>
```

As tags `<thead>`, `<tbody>` e `<tfoot>` ajudam a deixar o conteúdo da tabela mais bem dividido e mais semântico.

As tabelas também nos oferecem a possibilidade de juntar células e montar um visual diferente. Por exemplo, quando uma linha, que deveria ter 5 células, passa a mostrar só "uma célula".

Esse efeito é conseguido através da propriedade colspan=X, onde X é o número de células que você quer agrupar.

Portanto, em uma tabela de 5 colunas, para ter uma célula única na linha, usamos um código assim:

```html
<tr>
    <td colspan="5">Rio de Janeiro</td> 
</tr>
```

Resumo de criação de tabelas:

- A criar uma tabela HTML

    A tag `table`, que representa a tabela

    A tag `tr`, que representa a linha da tabela

    A tag `td`, que representa a célula da tabela

    A tag `thead`, que representa o cabeçalho da tabela

    A tag `tbody`, que representa o corpo da tabela

    A tag `th`, que representa a célula do cabeçalho da tabela

    A tag `tfoot`, que representa o rodapé da tabela

Então para 1 linha representada por `tr` temos n células `td`, para mesclar células em uma mesma linha colocamos `colspan` na linha.

E assim nosso trabalho de edição no css fica muito facilitado.
