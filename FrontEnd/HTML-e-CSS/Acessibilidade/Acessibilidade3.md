# Acessibilidade 3

Invés de usar subtítulos h3 ou h4 use parágrafos ou a tag `<span>`, eles podem não ser tão importantes

Pegar feedback com o usuário é extremamente importante

Colocar botões com caracterísiticas mais descritíveis onde somente cegos conseguem ler é muito bom como em:

```html
            Assinar plano 
            <span class="escondeVisualmente">Mega por 1000 R$</span>
```

Onde escondemos a informação Mega por 1000 R$, pois atrapalharia o design da página mas é descritivel pro cego. Uma dica de css é colocando `position:absolute` e depois `z-index-1` isso esconde visualmente mas deixa o html lá pro leitor de tela

As bolinhas já são um costume pro pessoal cego então pode deixar de boa.

Qual importância em recrutar uma deficiente visual para testar a página quanto a acessibilidade, além dos testes realizados pelo desenvolvedor?

Ter insights .

Muitas vezes os usuários podem nos dar “estalos de idéias” interessantes sobre algo que não pensamos previamente.

Medir problemas de acessibilidade e usabilidade.

Interessante mensurar de alguma forma para que a gente consiga ver se está acertando. E se estiver errando, tentar corrigir para virar isso.

Colocar os tipos de nossas entradas também é bastante desejável

## Lidando com dialog ou modal

Dialog ou modal são 'janelas' que abrem em cima da tela da nossa aplicação com a finalidade de chamar a atenção do usuário e assim interagir com ele de alguma forma. (é tipo um popup só que fazemos ela dentro do site)

![Um exemplo de modal](https://s3.amazonaws.com/caelum-online-public/823-acessibilidade-web-front-end-2/exemplo-modal.PNG)

O modal se mal feito ele não avisa ao leitor de tela que entrou um popup e ainda deixa os campos atrás dela selecionáveis o que é horrível

Para lidar com o tab indo para campos que estão embaixo da dialog nós precisaremos de uma biblioteca externa chamada inert que pode ser baixada com `npm i wicg-inert` e depois exportamos a biblioteca externa `inert.min.js` em nosso projeto que irá lidar com esse tab e depois selecionarmos todas a página que está fora desse dialog e colocar `insert=true` isso bloqueará a seleção quando a dialog estiver ativa, quando sair dê um `insert=false`

Caso tenhamos algum elemento que ainda esteja focando nós podemos ir no inert.min.js e editar `Element.prototype.msMatchesSelector,i=[` e colocar `"video"` ou simplesmente remover os controles do vídeo (que utilizam o shadow DOM que driblam o DOM) e posso remover e habilitar com `setAttribute(controls,true)` e `removeAttribute('controls')`

Vimos em aula que é interessante colocar o atributo role=’dialog’ em janelas desse tipo.

Por qual razão isso é recomendado?

Para o leitor de tela anunciar que foi aberta uma janela do tipo dialog/modal.

Lembre-se que o cego precisa de contextualização sempre que aparece alguma janela do tipo.

Como podemos fazer para que uma modal seja rotulada por outro elemento?

aria-labelledby na modal, com o valor sendo o ID do elemento que será lido como rótulo

O atributo aria-labelledby é usado para indicar os IDs de elementos que são os rótulos para o objeto. Para saber mais, veja a documentação do aria-labelledby.

Lembre que qualquer coisa escrita via css é lido pelo interpretador

## Interações de teclado são bem vindas tanto para cegos quanto para usuários quaisquer

Para fechar a dialog o normal é fecharmos com o ESC e sabendo que sua keyCode no javaScript é 27 então um possível código para ela é:

```js
document.addEventListener('keydown',(event)=>{
  if(event.keyCode==27){ fechandoDialog()};
});
```

## Carrosel

O melhor exemplo de carrossel é o adotado pela W3C e que pode ser visto [aqui](https://www.w3.org/WAI/tutorials/carousels/working-example/), nele podemos colocar diversos elementos que deixam nosso carrossel e botões de controle o mais inclusivos possível, tal como numero dos botões e texto para indicar que o slide atual está naquele botão

Alguns efeitos são melhores serem colocados via javascript

## Formularios

No NVDA temos a tecla f para pular de formulário para formulário. Em parte de html coloque as tags semânticas fieldset e a legend do fieldset isso ajuda

Não coloque nada dentro de uma content com checkbox, use imagem ou crie um check com css

Quando temos um input marcado como required e não digitamos algo no form nós recebemos uma mensagem que pode ser formal demais e isso pode ser ruim, para mudar essa mensagem poderíamos pegar um desses campos e fazer simplesmente

```js
var cep = document.querySelector('#cep');

cep.oninvalid =function(){
    this.setCustomValidity('');

    if(!this.validity.valid){
        this.setCustomValidity('Ops! Tem algo ruim aqui :(');
    }
}
```

Personalizando erros

Pensando em acessibilidade com praticidade, o mais eficiente para nossos projetos seria usar o próprio HTML5, com o required e os type específicos de situação como email, tel, etc.

Se há um erro no campo, uma mensagem padrão aparece e é lida pelo leitor de tela.

Qual o método no JavaScript que devemos mexer para customizar essa mensagem?


setCustomValidity


Documentação do setCustomValidity. Lembrando que fazer isso pode ser perigoso pois não sabemos o idioma do browser do usuário.

Validação de formulário em js é sempre bem vindo para dar sugestões de erro (uma legal é o validyemail.js no github)

[Acessibilidade e SEO](http://blog.handtalk.me/acessibilidade-ranking-google/)

Uma forma de fazer um atributo adicionado por javaScript ser indexado pelo tab é com

```js
elemento.setAttribute('tabindex',0);
```

Assim ele é reconhecivel pelo tab sem atrapalhar o movimento do tab

Sempre que fazemos uma mensagem de erro em um formulário, devemos ter certos cuidados.

Entre eles podemos citar o cuidado de não tentar passar a informação sobre o erro somente pela cor (deixando apenas a borda do campo vermelha por exemplo), e pontuar exatamente qual o problema que foi encontrado no preenchimento do campo.

Pensando em um usuário cego, devemos nos preocupar que essa mensagem de erro tenha…

O atributo role com o valor alert.


Esse atributo é importante para que o leitor de tela pause o que estiver lendo para ler o conteúdo da mensagem de erro.

## Links legais

Sites legais para ver se está tudo bacana com o seu site <https://wave.webaim.org/> e o <https://achecker.ca/checker/index.php>

Sobre menu dropdown <https://achecker.ca/checker/index.php>

Atalhos interessantes para inputs na tela <https://webaim.org/techniques/keyboard/#testing>

Projeto final do curso <https://github.com/designernatan/acessibilidade-web-front-end-2/archive/7322e9ea918a0a4a4abe7f4a87a1c1eb5974b0a4.zip>
