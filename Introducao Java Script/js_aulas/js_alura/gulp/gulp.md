# Gulp

Como visto nas aulas de performance web o gulp é uma ferramenta poderosíssima, com ele nós podemos fazer diversos tipos de melhorias em nossos arquivos front end.

Para essa aula precisamos ter o node na nossa máquina

 A situação aqui é, tenho o front end pronto do jeito que eu quero (ou que o cliente quer) e estou para upar ele na web, eu devo jogar ele da forma que está? Não, eu tenho que fazer diversas melhorias nesse arquivo antes, mas só para jogar na web, para dar manutenção não precisamos e isso que é legal.

## Usar o gulp

 Para usar o gulp eu preciso criar um package.json e para isso eu dou um `npm init`, e ele me fará umas perguntas de como esse npm init estará na pasta projeto

 Pois é nele que iremos trabalhar para colocar as dependencias que o gulp usará, depois disso eu preciso rodar no terminal (na pasta do projeto) e rodar um `npm install gulp --save-dev` o save-dev salvará o gulp no package json como uma depêndencia, ou seja será adicionado no arquivo `package.json` algo como

 ```json
  "devDependencies": {
    "gulp": "^4.0.2"
  }
 ```

Note que ele criou a versão mais nova, para colocar uma que você achar melhor coloque algo como `npm install gulp@3.9.0 --save-dev`

 Além de criar um arquivo chamado `package-lock.json` e uma pasta oculta chamada node_modules que tem todas as dependencias que eu instalei e ela não nos interessa pois se eu estiver em outra máquina essas bibliotecas não vão funcionar, para isso eu devo colocar no arquivo package.json

 Agora como vamos rodar o gulp? No package.json eu tenho uma chave chamada script e para fazer lo rodar eu posso escrever

 ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "gulp": "gulp"
  }
 ```

 E assim eu posso rodar o código `npm run gulp` caso eu coloque da seguinte forma

  ```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "gulp-build": "gulp"
  }
 ```

 O comando seria `npm run gulp-build` entendeu? Ele busca por esse atalho dentro da pasta node_modules/gulp/bin

 Mas se dermos esse comando teremos um erro chamado `No gulpfile found` e dentro desse gulpfile que temos o script que o gulp roda dentro da pasta do projeto entende? Lá onde fica todas as automatizações.

 Então dentro da raiz do projeto (e não no src) nós criaremos um arquivo chamado gulpfile.js

 E nesse arquivo teremos que importar essa biblioteca, para fazer isso com node eu coloco na primeira linha `let gulp = require('gulp');`, essa é a forma dentro do node que temos para importar uma biblioteca

 Sobre o Gulp
PRÓXIMA ATIVIDADE

Vejamos as seguintes declarações sobre o Gulp:

a) O Gulp nada mais é do que um módulo do Node.js e como qualquer módulo desta plataforma é instalado pelo npm, o gerenciador de pacotes do Node.js.

b) O Gulp é uma solução completa para automação de tarefas.

c) O Gulp nada mais é do que um módulo do Node.js e já vem por padrão nesta plataforma.

d) O Gulp não depende do Node.js, apesar de usar o npm para funcionar.

Das declarações acima, podemos afirmar que:

b,c e d são falsas

O Gulp nada mais é do que um módulo do Node.js e como qualquer módulo desta plataforma é instalado pelo npm, o gerenciador de pacotes do Node.js. Longe de ser uma solução completa, ele permite combinar outros módulos para conseguir as mais diversas funcionalidades.

Lembre-se que --save-dev é o tipo de dependência que só diz respeito ao desenvolvedor. Se por acaso, a dependência fosse uma dependência da aplicação (que deveria estar disponível quando a aplicação fosse para o ar) usaríamos --save e a dependência seria adicionada em dependencies e não em devDependencies. Como nossa aplicação não é feita em Node.js e usamos o Node.js apenas para o Gulp, usamos --save-dev.

## Primeiras otimizações

 A primeira otimização é nas imagens pois pelo http archive ele representa 2/3 de um projeto front end, então para isso precisamos colocar uma dependencia chamada gupl-imagemin que como o nome diz ele minifica as imagens, para isso rode o comando `npm install gulp-imagemin --save-dev`

 E para se trabalhar com o gulp precisamos ter a noção de que temos uma pasta de saída e essa pasta linkará com uma entrada, e esse meio é ligado por pipes de forma que uma simples minificação de imagem é feita com:

```js
gulp.task('build-img',()=>{

    gulp.src('./projeto/src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./projeto/src/img'));

});
```

Ou seja criamos uma task e dentro dessa task temos o source (onde **/* é o globing para todas as pastas e arquivos dentro da pasta e dentro dessas pastas pegue todos os arquivos) do gulp, demos o pipe com o imagemin e linkamos com a saída. Entenda dest como saída

### Exercício

Fluxo de leitura e fluxo de destino

Vejamos o seguinte gulpfile.js:

```gulp
var gulp = require('gulp');

gulp.src('src/img/**/*');
gulp.dest('dist/img');
```

Neste exemplo incompleto, a variável gulp armazena um objeto retornado pela função `require` que recebe como parâmetro o módulo do Gulp. Este objeto possui alguns métodos entre eles o que cria um fluxo de leitura e o que cria um fluxo de escrita. Perceba que estamos lendo de src/img/**/* e estamos gravando em dist/img. Porém, o código não funciona, porque não ligamos o fluxo de leitura ao fluxo de escrita.

Qual das opções abaixo liga os dois fluxo resultando na cópia de todas as imagens dentro da pasta src/img para dentro da nova pasta dist/img. Atenção: neste exemplo não estamos preocupados com a minficação de imagens, apenas copiar as imagens de uma pasta para outra):

```gulp
var gulp = require('gulp');
gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
```

Vejamos a resposta correta:

```gulp
var gulp = require('gulp');
gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
```

No exemplo acima, usamos a função pipe(tubo) que liga o fluxo de leitura ao fluxo de escrita. Um detalhe é importante: ela recebe como parâmetro outro fluxo, em nosso caso o fluxo de escrita. No final, o Gulp lerá todos os arquivos da pasta src/img gravando-os no fluxo de escrita dist/img. Veja que com estas configurações conseguimos realizar uma cópia de todas as imagens do projeto.

## Diferença entre dist e src

Imagina que eu estou rodando uma simplificação da imagem do tipo lossless, eu coloco a imagem otimizada para a web na mesma pasta que ela estava antes. O designer pega a imagem retoca e coloca na mesma pasta, eu vou lá com o build e otimizo ela, aí o design vai e retoca de novo, e nisso a imagem perdendo qualidade. Para resolver isso o ideal é jogar a saída para uma outra pasta.

E fazemos isso apenas com:

```js
gulp.task('copy',()=>{
  gulp.src('./projeto/src/**/*')
        .pipe(gulp.dest('./projeto/dist'));
})
```

Somente com o comando pipe eu copio a entrada de um diretório para uma outra

### Copiando arquivos certos no local correto

Qual das opções abaixo copia o conteúdo da pasta A para dentro da pasta B?

`gulp.src('A/**/*').pipe(gulp.dest('B'));`

A resposta correta é:

`gulp.src('A/**/*').pipe(gulp.dest('B'));`

Em nossa origem, nosso fluxo de leitura, usamos o glob pattern 'A/**/*'. Ele significa que não estamos dentro a pasta A, mas que estamos lendo são todos os arquivo, representado por * dentro de todos os diretórios, este último representado por **.

Por exemplo, a seguinte opção, apesar de não dar erro, não atende o que precisamos:

`gulp.src('A').pipe(gulp.dest('B'));`

Nela, a pasta A será copiada com todos os seus arquivos para dentro da pasta B. Lembre-se que nosso interesse era copiar todos os arquivos da pasta A para dentro de B e não a pasta A. O que lembra a recursividade do bash

## Por padrão o gulp processa em paralelo

Então supondo que queremos limpar a pasta dist por que eu errei alguma coisa eu devo sinalizar que a pasta foi limpa e para isso eu faço

```js
gulp.task('clean',()=>{
   return gulp.src('./projeto/dist')
        .pipe(gulpClean());
});
```

O clena limpa a pasta de forma recursiva, por isso ela está aqui

Eu simplesmente retorno essa 'função' e coloco ela para ser processada em série (no GULP 4 apenas, pois maior parte dos foruns está no gulp 3) da seguinte forma

```js
gulp.task('copy',gulp.series('clean',()=>{
  return gulp.src('./projeto/src/**/*')
        .pipe(gulp.dest('./projeto/dist'));
}));
```

No código exibido, a tarefa clean é dependência de copy, mas isso não garante que ela executará primeiro e no seu término seja executada a tarefa copy. O que acontecerá é a limpeza e código de arquivos ao mesmo tempo resultando em um erro no terminal. Isso acontece porque Gulp executa tarefas assincronamente para conseguir máxima performance, mas nem sempre isso é desejado como neste exemplo. Para que a tarefa copy espere a tarefa clean terminar, a tarefa clean precisa retornar seu stream. Quando uma tarefa retorna um stream ela sinaliza para o Gulp que a tarefa na qual ela é dependência tem que esperar seu processamento

Ou seja a função copy só execute quando a função clean acaba e aí sim copia tudo que está na pasta src para a dist

## Como muita coisa morreu com o HTTP2, muita coisa eu não vou anotar aqui por que tem no curso de performance

é isso

## Browser Sync

Ele é tipo o live server do visual code, porém com a adição de um visualizador no celular. Pois é um servidor de fato.

Para usarmos o BrowserSync precisamos instalá-lo como qualquer outro módulo do Node.js e importá-lo em nosso gulpfile.js. Quando formos configurar sua tarefa, precisamos passar um objeto como parâmetro para a função browserSync.init(). Qual das opções configura corretamente para servir todos os arquivos de projeto/src?

** Lembre-se que o seu gulpfile.js fica na pasta projeto. (não no meu caso, por que dei mole mesmo)

A resposta correta é:

```js
var browserSync = require('browser-sync');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});
```

A função init do BrowserSync recebe um objeto com a chave server. É no atributo baseDir deste objeto que indicamos a pasta que o BrowserSync considerará como raiz quando acessarmos o endereço padrão localhost:3000. Isso significa que se houver o arquivo projeto/src/index.html podemos acessa-lo como localhost:3000/index.html, porque a pasta raiz é src da pasta projetos. É importante lembrar que essa configuração ainda não é suficiente para o livereloading funcionar.

Configurar o BrowserSync apenas indica qual pasta será servida através do navegador pelo pequeno servidor criado por esta ferramenta. Só essa configuração não realiza a mágica do livereloading. Precisamos chamar o método reload() do objeto BrowserSync sempre que quisermos que ele atualize a página no navegador. Para essa tarefa usamos watchers do Gulp que ao detectarem qualquer mudança nesse ou naquele arquivo, chamará o reload() do BrowserSync.

Qual das configurações abaixo configura corretamente um watcher para recarregar o BrowserSync na mudança de qualquer arquivo?

```js
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});
```

A função gulp.watch recebe como primeiro parâmetro o evento que desejamos observar, em nosso caso, estamos interessados apenas nos arquivos que mudaram, por isso passamos change. Por fim, o útlimo parâmetro é a função que desejamos executar, nesse caso, passamos diretamente BrowserSync.reload. Como passamos a função e não a invocamos, será o watcher que a chamará toda vez que um arquivo for alterado.

É por isso que não podemos fazer:

` gulp.watch('src/**/*').on('change', browserSync.reload());`

Neste exemplo, já estamos pedindo para o BrowserSync executar seu reload. Como esta função não retorna nada, nosso watcher não terá função alguma para executar. É por isso que devemos passar a função como browserSync.reload. Em JavaScript funções podem ser passadas como parâmetro. Uma alternativa mais verbosa é a seguinte:

```js
 gulp.watch('src/**/*').on('change', function() {
      browserSync.reload();
    });
```

Veja que não passamos mais diretamente a função browserSync.reload como parâmetro, em seu lugar, passamos uma função anônima e quando ela for executada pelo nosso watcher do Gulp ela chamará browserSync.reload(), recarregando assim nossa página. A primeira é menos verbosa que a segunda, mas ambas são válidas.

## Antencipando erros

Uma biblioteca boa para mostrar direto se eu errei no js ou não sem precisar ficar abrindo o console é o gulp-jshint e ele trabalha dentro do browser sync, o legal é que ele diz erros de maneira não tão verbosa basta configurarmos

Pro css temos o gulp-csslint. Na computação, existe um termo para esse procedimento que procura alguma estrutura suspeita ou não conformante com determinada sintaxe, esse procedimento se chama lint.

Descobrir erros antes que entrem em produção é importante, porque são mais baratos de se resolverem, isto é, imagine realizar todo o deploy de uma aplicação porque havia um erro de sintaxe em um de nossos scripts?

Qual das opções abaixo configura um watcher do Gulp para corretamente executar o jshint quando um arquivo JS for modificado, e exibir as mensagens no terminal?

Resposta

```js
var gulp = require('gulp'),
    ,jshint = require('gulp-jshint');

gulp.watch('src/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
       .pipe(jshint())
       .pipe(jshint.reporter());
    });
```

Precisamos ouvir o evento change e obter na função de callback, passada como segundo parâmetro para a função on, o objeto que tem informações sobre o evento. Demos o nome event para ele, mas como já sabemos, em JavaScript este parâmetro poderia ter qualquer nome. É através dele que acessamos o caminho do arquivo (path). Precisamos também indicar qual reporter usar, caso contrário não teremos nenhuma informação no terminal sobre o estado do nosso arquivo. É por isso que usamos jshint.reporter. Sem ele, nosso código não dá erro, mas também não temos qualquer informação

## Prefixação de elementos css

Como visto em aulas de css, certas estilizações somente são suportadas por alguns browsers enquanto para outros não, para isso temos que colocar prefixos como -webkit-, -ms, -o, -moz. E lembrar de colocar isso para todos os efeitos é bastante chato e repetitivo (principalmente se queremos dar suporte para browsers mais velhos), para isso existe uma biblioteca no node chamada `gulp-autoprefixer`, sua instalação e uso é bem parecido com qualquer outra biblioteca já instalada anteriormente, seu uso pode ser visto na documentação do npm o legal dele é que podemos criar uma chave valor no package.josn para dizer quais browsers iremos suportar no projeto como no exemplo

```json
  "browserslist": ["last 40 versions"]
```

Botar muitas versões para trás pode deixar o arquivo css criado um tanto maior, porém seu uso pode variar de forma a abrangermos o maior numero possível de browsers

Sobre o arquivo browserslist:

a) É nele que centralizamos as configurações de quais versões do browser serão suportadas pelo gulp-autoprefixer. Inclusive podemos dizer que queremos suportar as últimas 20 versões! O impacto disso, é que haverá mais prefixação no arquivo gerado, suportando assim esses navegadores e suas versões.

b) Quando não é criado, o gulp-autoprefixer prefixará o arquivo CSS suportando todos os browsers do mercado, inclusive aqueles pré-históricos.

c) Seu uso é opcional.

Podemos afirmar que:

Apenas a B é falsa

O uso do arquivo browserslit é opcional, porém, sua ausência não faz com que o gulp-autoprefixer considere todos os navegadores desde de o seu lançamento, isto é, navegadores pré-históricos, versões antigas. Sua criação é necessária se quisermos ampliar ou restringir o leque de navegadores/versões suportados. Se quiser saber mais sobre esse arquivo e outras possíveis configurações acesse https://github.com/ai/browserslist.

Parabéns, você acertou!

## Podemos usar o compilador de css less

Com o `gulp-less` conseguimos compilar arquivos css para isso fazemos a importação da biblioteca

`less = require('gulp-less');`

```js
    gulp.watch('src/less/**/*.less').on('change', function(event) {
       var stream = gulp.src(event.path)
            .pipe(less().on('error', function(erro) {
              console.log('LESS, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
            .pipe(gulp.dest('src/css'));
    });
```

## watch

Podemos criar uma observação no exemplo de function que colocamos com

```js
// Watch files
function watchFiles() {
  gulp.watch("./assets/scss/**/*", css);
  gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*"
    ],
    gulp.series(jekyll, browserSyncReload)
  );
  gulp.watch("./assets/img/**/*", images);
}
```

Projeto final do curso: <https://s3.amazonaws.com/caelum-online-public/gulp/stages/projeto-final.zip>
