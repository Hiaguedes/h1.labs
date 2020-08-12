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
