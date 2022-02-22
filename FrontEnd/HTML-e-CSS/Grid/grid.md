# Grid

Assim como o `display:flex` que vimos na aula de flexbox temos também o `display:grid` que facilita a criação de grids (grades) na nossa tela

A ideia aqui é definirmos no elemento pai dos elementos o grid e o nome das áreas que esses grids terão da seguinte forma:

```css
.app {
    background: #f1f1f1;
    display: grid;  
    grid-template-areas: "cabecalho" "conteudo" "rodape";
}
```

Atenção é importante que o nome das áreas esteja na ordem que elas serão exibidas na tela como no caso de:

```css
.cabecalho {
    grid-area: cabecalho;
}
 
.conteudo {
    grid-area: conteudo;
}

.rodape {
    grid-area: rodape;
}
```

Com isso conseguimos definir o tamanho delas de forma que:

```css
.app {
    background: #f1f1f1;
    display: grid;  
    font-family: Arial, Helvetica, sans-serif;
    grid-template-areas: "cabecalho" "conteudo" "rodape";
    grid-template-columns: auto;
    grid-template-rows: 50px auto auto;
}
```

Cujo o row define a altura dessa área e column a largura (meio estranho mas faz um sentido) pois rows seria a distância de uma linha para a outra e columns a diferença de uma coluna para outra

As unidades de medida podem ser as que conhecemos, seja proporcional ou não e desde que seja definido o tamanho de todas elas (no caso do row definimos três linhas de alturas diferentes)

Então podemos definir o espaçamento entre colunas de `grid-template-rows: 10% 20px 50vh 10%;`

## Ajeitando elementos dentro do grid

Sabemos que através do CSS Grid Layout é possível dizer para os elementos onde eles devem começar e terminar, essa definição pode ser feita da utilizando o:

```css
grid-column-start
grid-column-end
grid-row-start
grid-row-end
```

Assim conseguimos dizer para o elemento em qual coluna ele deve começar e em qual deve terminar, o mesmo também pode ser feito para as linhas.

Como podemos dizer para um elemento ocupar toda as colunas e linhas, sendo que o nosso layout possui 3 colunas e 2 linhas?

Resposta

```css
grid-column-start: 1;
grid-column-end: 4;
grid-row-start: 1;
grid-row-end: 3;
```

Correto, estamos preenchendo as três colunas e duas linhas, informamos 4 para as colunas e 3 para as linhas pois ambos são exclusivos. É como se o elemento chegasse na linha tal mas não a ocupa inteiramente

No exercício anterior, precisamos informar onde os elementos devem começar e terminar, mas, fizemos utilizando a propriedade de forma longa, para o mesmo exemplo, possuímos um atalho (shorthand), sendo:

```css
grid-column 
grid-row
```

Lembrando que temos um layout de 3 colunas e duas linhas, precisamos fazer com que nosso elemento ocupe todo o grid.

Como podemos realizar o mesmo posicionamento referente ao exemplo anterior?

```css
grid-column: 1/4;
grid-row: 1/3;
```

Correto, estamos preenchendo as três colunas e duas linhas, informamos 4 para as colunas e 3 para as linhas pois ambos são exclusivos.

Outras estilizações podem ser feitas com flex sem problema algum, isso evita criações de divs desnecessárias

Nada impede de você criar um grid dentro de um grid também mas veja bem o que você está fazendo

Um site bom para treinar o css grid é no <https://cssgridgarden.com/>
