# Guia de estilos

Aqui vamos criar componentes de estilo seguindo uma guia de estilo para um site mobile, usando arquitetura css e toda a estilização que será utilizada durante todo o projeto

O a guia de estilos pode ser vista [aqui](https://www.figma.com/file/WRr5HpVOiI8rDTHcUKXBl4/Aula1-Styleguides?node-id=111%3A0)

## Primeiros passos

Quando recebemos um projeto como esse que a equipe de design mandou para nós, podemos colocá-lo em prática de algumas maneiras diferentes. Mas a prática mais segura é a de planejar e avaliar antes de tomar decisões.

Qual alternativa expressa melhor a maneira mais segura de desenvolvimento?

Antes de começar o desenvolvimento, recolher o máximo de informação e recursos.

Alternativa correta. Planejar é o passo mais seguro quando vamos começar um novo projeto. Tomar decisões com calma ajuda a ter um processo de desenvolvimento mais consistente.

## Emmet e Intellisense

Se escrevermos no visual code button.botao no index o vscode entende que você está querendo escrever algo como `<button class="butao"></button>` então basta dar TAB e ver a magia acontecer

Algo um pouco mais complexo como `section.container>p.texto+button.butao>a.link` seria

```html
        <section class="container">
            <p class="texto"></p>
            <button class="butao"><a href="" class="link"></a></button>
        </section>
```

Ou seja pro emmet o > indica elementos que estão dentro de um outro elemento, muito produtivo isso, se perder o TAB aperte CTRL+espaço, note que o código já vem identado bonitinho

Agora se não lembramos o nome das classes css que temos no projeto no vscode temos a extensão HTML CSS support que faz esse cache de todas as classes para a gente

Quais as vantagens de usar essas ferramentas?

vitar tarefas repetidas.

Alternativa correta! O EMMET possui a facilidade de fazer tarefas repetidas como fechar tags automaticamente, criar blocos de repetição com poucas instruções (por exemplo, ul>li*6 vai gerar uma tag ul com 6 li dentro) e até mesmo estruturas super complexas.

Melhores sugestões.

Alternativa correta! O CSS Intellisense (neste caso: HTML CSS Support) dá sugestões para nós quando vamos colocar alguma classe dentro de uma tag, assim não precisamos lembrar EXATAMENTE o nome de uma classe. Isso evita problemas quando precisamos trabalhar com inúmeras classes CSS.

Temos códigos devidamente indentados.

Alternativa correta! O EMMET já faz as indentações automaticamente, deixando a visualização do nosso código melhor e mais fácil para manutenções.

## Variáveis no css

Não é só no sass que temos variáveis, no css também temos para fazer isso podemos criar um arquivo css novo e criar um

```css
:root{
    --amarelo: #FFCB47;
}
```

E para usar-la fazemos:

```css
.botao{
    background-color: var(--amarelo);
}
```

E importar essa folha de estilo no html

Trabalhar com variáveis CSS traz vantagens para nós, pessoas desenvolvedoras, como não precisar decorar valores complexos de cores.

Qual outra vantagem de usar variáveis CSS?

Facilidade de manutenção.

Alternativa correta! Com as variáveis devidamente criadas, valores como famílias de fontes, cores e tamanhos estão em um lugar só, facilitando mudanças na estilização.

E assim como no sass eu posso fazer imports entre os css para isso faremos

```css
@import url();
```

Porém coloque _ no começo do nome dos arquivos que forem importados dentro de outros

## Nem sempre os componentes se repetem

A montagem de componentes é legal e útil para componentes que se repetem na tela e assim serem utilizadas no decorrer do projeto. Então não adianta componetizarmos o elemento card se esse card não se repete no decorrer da guia de estilo.

Porém se sei lá, o título é parecido então vale mais a pena componetizarmos o título e não o card inteiro. Essa é a sacada

Durante o processo de desenvolvimento de uma página e quando vamos componentizar algo, precisamos entender e diferenciar componentes.

Alguns dos passos para diferenciar componentes é isolar partes diferentes do que queremos componentizar e ver se são usadas em outros lugares. Se sim, quer dizer que dentro do componente existem outros possíveis componentes, e o que queremos extrair na verdade é apenas a "casca". Se não, então o conjunto inteiro forma um componente, tanto o conteúdo quanto o que contém essas informações.

### Variações de componentes

No curso nós montamos um botão com a seguinte estrutura e estilização:

HTML

```html
<button class="botao">Assinar newsletter</button>
```

CSS

```css
.botao {
    background-color: var(--amarelo);


    text-align: center;
    font-family: inherit;
    font-weight: var(--peso-botao);
    color: var(--branco);


    width: 100%;
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;


    box-shadow: 10px 10px 30px var(--amarelo-transparente);


    border: none;
}
```

![Imagem do primeiro botão](https://caelum-online-public.s3.amazonaws.com/1808-guia-de-estilos/03/Aula3-img1.jpg)

Depois tivemos que montar um outro botão com estilização diferente.

![Imagem do segundo botão](https://caelum-online-public.s3.amazonaws.com/1808-guia-de-estilos/03/Aula3-img2.jpg)

Qual seria a melhor maneira de fazer esse botão?

Criar uma classe nova contendo as diferenças e depois usar em conjunto com a classe .botao já existente.

Alternativa correta! Essa nova estilização é apenas uma variação do botão que já existe, então podemos reaproveitar a estilização que já existe e apenas criar uma nova classe contendo a nova estilização. Para o nome de classe, podemos usar o padrão BEM CSS e chamar de .botao--alternativo, por exemplo.

## Perguntas

Durante o desenvolvimento do componente de vídeo, tivemos uma discussão sobre o título do vídeo e se devemos componentizá-lo ou não. No final, optamos por não componentizar o título.

Escolha as alternativas que melhor representam o porquê.

A estilização do título do vídeo não se repete em nenhum outro lugar do conteúdo principal (tag `<main>`).

Alternativa correta! O título do cartão de vídeo é algo muito específico para um componente, diferente do título composto que fizemos antes, que pode ser utilizado em diversas situações e em conjunto com outros componentes.

Então já que se repete o bom é colocarmos variáveis com nome mais genéricos para que possamos associar-los a outros componentes da página

A estilização do título do vídeo se repete no rodapé, mas ambos têm representações de conteúdo diferentes.

Alternativa correta! Por mais que a estilização seja a mesma nos dois elementos, a representação de conteúdo é diferente. Isso cria uma grande dificuldade em dar nomes para as classes, já que os nomes devem representar o conteúdo. Um é título de vídeo, e outro é nome de unidade.

## O bom de montar a página de componentes

É bom não excluir a página onde você tem todos os componentes pois ela serve como uma espécie de documentação de como se usar cada componente estilizado que você criou, e assim fazemos o index html apenas criando e as seções e copiando e colando o que for interessante para a página

Depois que terminamos a fase de criar cada um dos componentes que serão utilizados na página Home, nós renomeamos o arquivo que contém os componentes e criamos uma nova página index.html, fazendo uma espécie de documentação.

Por que a criação dessa documentação é importante para o processo de desenvolvimento do projeto? Escolha a alternativa que melhor representa a justificativa.

A documentação ajuda no desenvolvimento porque ela contém todas as instruções de como usar os componentes que criamos.

Alternativa correta! Da mesma maneira que é complicado de lembrar todas as classes, valores e nomes, lembrar com precisão as estruturas de diversos componentes também pode ser uma tarefa complicada. Ter algum lugar para consultar como são montados os componentes é super importante para o desenvolvimento do projeto.

## Mais com emmet

- O `$` faz um contador

- Com `{}` nós podemos colocar os textos que acompanham um h1 ou h2 por exemplo

- Com `[]` colocamos um atributo como o atributo `src` da imagem

Um exemplo seria `img[src={rrr}]` que daria

```html
<img src="rrr" alt="">
```

- Com `()` podemos agrupar mais códigos emmet

- Usamos `\` para escapar caracteres que não devem ser interpretados pelo EMMET

Mais dicas como essa [aqui](https://docs.emmet.io/cheat-sheet/)

 ***O projeto presente nessa página está somente para a versão mobile***

 Conteúdo total do curso
