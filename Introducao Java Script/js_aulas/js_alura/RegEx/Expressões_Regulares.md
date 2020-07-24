# RegEx

Aprendendo a Regex com javaScript, Uma expressão regular, ou Regex, são padrões utilizados para identificar determinadas combinações ou cadeias de caracteres em uma string. Elas são usadas em linhas de comando (para encontrar informações em arquivo ou diretórios específicos), formulários em html, buscas em editores de texto no próprio Visual Code por exemplo com CTRL + F e ver o símbolo de .* na barra.

O regex pode ser encontrado em muitas linguagens de programação com o Java o C# o PHP o C o Python enfim muitas linguagens

A linguagem que vai seer utilizada é a seguinte 

 ![Regex](./img/Regex.png)

 Então o que é um Regex-Engine?

 Uma expressão regular sozinha é apenas uma string. É preciso ter um software para interpretar a regex e aplicá-la no alvo. Esse software é o Regex Engine que existe para a maioria das plataformas de desenvolvimento, como JavaScript, C#, Python, Ruby ou PHP.

## meta char

 Existem alguns caracteres que possuem um significado especial para o regex engine. Especial significa que o regex engine não interpreta o valor literal e sim diferente. Esses caracteres são chamados de meta caracteres.

Nessa aula já vimos alguns:

- `.` o "ponto" que significa qualquer char

- `*` o asterisco que serve para definir uma quantidade de chars, zero ou mais vezes

- `{` e `}` as chaves que servem para definir uma quantidade de caracteres específicas que é desejado encontrar
Por exemplo:

 a{3} letra `a` 3 vezes. A essas chaves chamamos de quantifier

- `\d*` um digito zero ou mais vezes
Lembrando também, se quisermos procurar pelo `*` ou `.` literalmente (sem significado especial), devemos utilizar o caractere `\`, o `\` serve para escaparmos o caractere que tem significado na linguagem (tipo o terminal do linux)

Observação: Dependendo um pouco da linguagem e regex engine que você usa, também pode ser necessário escapar o char /, ou seja, usando \/

### Encontrando IP

O número do IP de um computador é gerado ao conectá-lo à internet, esse número permite que o dispositivo seja identificado e capaz de enviar/receber informações. Abaixo há alguns exemplos de IP:

```ip
126.1.112.34

128.126.12.244

192.168.0.34
```

Cada grupo pode ter de um a três algarismos. Considerando somente essa regra, como podemos encontrar o padrão desses números?

Resposta:

```r
\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}
```

Um IP tem quatro grupos de no mínimo um e máximo três números. Repare que estamos escapando o ponto (.) entre os números, que são blocos de dígitos \d entre 1 e 3 caracteres {1,3}

### Mão na massa - Buscando o telefone

Usando o que aprendemos até então, qual padrão podemos utilizar para encontrar o número telefônico? Por exemplo: (21) 3216-2345

Lembre-se que os telefones podem ser também no formato novo: (21) 93216-2345. Seu padrão deve considerar esta modificação.

Dica: Os parênteses são meta-chars e precisam ser utilizados para capturar o valor literal: `\(e \)`

O que eu fiz:

```regex
\(\d{2,3}\)\d{4,5}-\d{4}
```

Pois um número pode começar com (21) ou (021) e vir seguida de 99978 ou 9978

### Para que servem as regex?

Na aula e nos últimos exercícios já vimos alguns exemplos de expressões regulares. Com isso, avalie as seguintes opções:

A) Extraindo seções específicas de um arquivo de texto
B) Validação de formatação de, por exemplo, e-mail ou telefone
C) Análise de arquivos de texto e extração de dados para, por exemplo, gravar no banco de dados
D) Substituindo os valores de um texto para limpar, reformatar ou alterar o conteúdo
Dentre essas opções, quais alternativas correspondem às possibilidades utilizando RegEx?

Resposta: Todas as afirmativas

Todas as alternativas estão corretas e representam exemplos clássicos para utilizar expressões regulares.

No entanto, é importante lembrar que uma expressão regular faz a análise de um determinado padrão de caracteres em uma string. Podemos usar esse padrão para por exemplo validar um email ou telefone. Para saber se o email realmente existe e validar a autenticidade do email uma regex não serve.

## Caracteres opcionais

Note que um cpf pode ser escrito de várias formas, como

```cpf
147.420.797-95
14742079795
147420797-95
```

Todas essas formas são formas válidas de se escrever um CPF, ou seja a pontuação aqui é opcional, é legal que tenha por conta de legibilidade mas não precisa ter ou não e seria legal o regex identificar isso, e para isso ser o ? que serve justamente como um caractere opcional, o que nos deixa com um pattern

```regex
\d{3}\.?\d{3}\.?\d{3}-?\d{2}
```

Pois o ponto é escapado mas é opcional, o ? pode ser entendido como {0,1}, ou seja temos 0 ou 1 uma vez e eu posso incrementar esse regex para mais símbolos como - em tudo

```regex
\d{3}\.?-?\d{3}\.?-?\d{3}-?\.?\d{2}
```

Para deixar isso mais organizado eu uso o colchetes de modo que fica:

```regex
\d{3}[.-]?\d{3}[.-]?\d{3}[-.]?\d{2}
```

E dentro do colchetes eu não preciso escapar o caractere `.`, como o colchete eu posso definir um dígito por [0-9] invés de \d e aos colchetes dizemos que temos uma classe de caracteres

### Ajudando a Alura

Os textos e exercícios no Alura usam uma formatação para deixar uma parte em negrito, itálico ou para mostrar que se trata de código. Na primeira versão da Alura era necessário usar tags HTML no texto para essa formatação. Por exemplo, veja uma de um exercício antigo:

```en
No <code> for </code>, o valor de <code>i</code> começa de zero e é incrementado a cada volta enquanto <code>i < 10</code>, portando o bloco de código do for é executado 10 vezes.
```

A sua tarefa agora é criar uma regex que procurará o `<code>` ou `</code>` dentro do alvo acima. Mãos à obra!

A regex utilizada é: `</?code>`

Repare que usamos o meta-char `?` para sinalizar que o `/` é opcional.

### Qual é a classe?

Veja as alternativas abaixo.

Qual é a classe correta para definir os números entre 1 e 3 E 6 e 9?

Resposta: `[1-36-9]`

Definimos uma classe com os números de 1-3 e 6-9!

## Mais meta-chars especiais

O que define um espaço ou um simples Tab, ou vários espaços como em

```pt-br
olá tudo bem
olá     tudo bem
olá         tudo bem
```

Como eu defino esses espaços em regex, bem em programação chamamos esses espaços de `white-espace` e em regex o padrão para esse espaço é usado com `\s`

E como eu posso ter um ou mais espaços em branco eu posso colocar `\s{1,}` ou `\s+` os dois significam a mesma coisa e significam justamente ter um ou mais espaços em branco

- `?` zero ou uma vez, um caractere opcional
- `*` zero ou mais vezes
- `{n}` exatamente n vezes
- `{n,}` no mínimo n vezes
- `{n,m}` no mínimo n+1 vezes, no máximo m vezes

Vamos para algo mais difícil, vamos fazer um regex para uma data como

02 de Abril de 2015

Não se assuste a resposta é

```regex
[0-3]?\d\s+de\s+[JFMASOND][a-zç]{3,8}\s+de\s+[12]\d{3}
```

Meu deus, calma, vamos por partes

- O dia `[0-3]?\d` o começo pode ser representado por 01 ou 1, e o primeiro dia só vai de 0 até 3 e de forma opcional enquanto o segundo dia pode ser qualquer dígito, isso pode dar como resultado válido 39 o que não é uma data válida. Mas note que o regex não é um validador e sim uma forma de pegar padrões de resposta. Podemos forçar via html a data certa

- O espaço em branco representado por `\s+`

- O mais complicadinho o mês que é representado por `[JFMASOND][a-zç]{3,8}` cuja primeira letra empre é maiúscula e por ser J (de janeiro,junho e julho), F de fevereiro, M de março e maio, A de Agosto e Abril, S de setembro, O de Outubro, N de novembro e D de dezembro. E depois de 3 até oito letras minusculas (3 de maio e 8 de fevereiro) contando o ç de março que não é contemplado no padrão Ascii de a até z.

- O espaço em branco representado por `\s+`

- E o ano que é começado por 1 ou por 2 como é dito em `[12]` e três dígitos logo em seguida

Trabalheira né, mas é uma boa forma de representar o padrão dessa data

### Mão na massa: Reconhecendo a placa de um veículo

Fomos contratados para desenvolver um sistema para cadastros de veículos em um estacionamento. Para isso, precisaremos cadastrar as placas dos veículos no sistema e para fazer a validação usaremos expressão regular.

Como seria a expressão regular que devemos usar para validarmos a placa de um carro?

Exemplo de placa: `KMG-8089`

Primeiro deve definir as 3 letras maiúsculas: `[A-Z]{3}`

Agora só falta o hífen e os 4 dígitos, a regex completa fica:

`[A-Z]{3}-\d{4}`

o atalho de classe `\w` que pega qualquer dígito, seja ele letra ou número:

### Mão na massa: Separando joio do trigo

Temos a seguinte linha:

```pt-br
BALEIRO GARROTE SERROTE GOLEIRO ROTEIRO
```

Escreva uma expressão regular que faça match apenas com as palavras GARROTE, SERROTE e ROTEIRO. Não esqueça de usar nossa ferramenta para testar nossas expressões regulares.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Uma solução possível é:

`[A-Z]*ROT[A-Z]+`

Veja que usamos a classe de caracteres `[A-Z]` porque queremos lidar apenas com todos as letras em maiúsculo. Além disso, na primeira parte da expressão temos `[A-Z]*,` usamos o quantifier * que indica zero ou mais vezes. Por fim temos `[A-Z]*ROT[A-Z]+`.

### Tudo o que está dentro do colchetes deixa de ser um meta char

Sabendo disso e dado o seguinte alvo: `?classes+poderosas*`

Qual regex abaixo seleciona o alvo inteiro (um match apenas)?

Resposta: `[a-z?*+]+`

Como falamos, a grande maioria de meta-chars são valores literais na definição da classe (dentro de []). Por exemplo, a classe abaixo define apenas valores literais:

`[.?+*{}]`

Apenas os caracteres \ (barra invertida), - (hífen) e ^ (circunflexo) realmente são meta-chars dentro de uma classe. O hífen e a barra invertida já vimos na aula, por exemplo na classe:

`[a-z\d]`

### Opcional: Validando o usuário no serviço Rest

Você é um desenvolvedor back-end de uma startup que possui uma aplicação web de anúncios de restaurantes e lanchonetes. A aplicação que foi desenvolvida usando AngularJS no client-side consumindo serviços Rest desenvolvidos em Jersey/JAX-RS, precisa fazer um cadastro dos seus usuários que possuem um username.

Esse username possui regras de quais caracteres ele pode compor e nós queremos que ele seja válido antes de consultarmos no banco de dados as informações sobre ele.

Vamos ver abaixo a action que receberá o usuário para ser cadastrado:

```en
@POST
@Path("/user")
@Consumes(MediaType.APPLICATION_JSON)
public Response listaDeRestaurantes(@Valid User user) { 
    // codigo omitido
}
```

O projeto utiliza a especificação Bean Validation que permite realizar validações de modelos através de anotações. Para validar um campo usando expressões regulares, podemos usar a anotação @Pattern(regexp="...")

```
// User.java
public class User {
    @Pattern(regexp = "???")
    @NotEmpty
    private String username;

}
```

O username precisa ser da seguinte forma:

O limite é de 10 caracteres;
O primeiro caractere deve ser uma letra do alfabeto, não pode ser um número;
A partir do segundo caractere podemos ter letras maiúsculas, minúsculas e números;
Como deve ficar a anotação @Pattern com uma expressão regular com essas características?

RESPONDA
Opinião do instrutor

A resposta é: `[a-zA-Z][a-zA-Z0-9]{0,9}`.

Também é possível usar expressões regulares na anotação @Path do JAX-RS. Por exemplo: `@Path("/username/{username:[a-zA-Z][a-zA-Z0-9]{9}")`

Se você quiser conhecer um pouco mais sobre Jersey e AngularJS (1 e 2) temos alguns treinamentos específicos sobre esses temas:

Webservices rest com Jaxrs e Jersey

Angular Js - MVC

Angular2 parte1

### Para saber mais: Melhorando a legibilidade

Na aula criamos um pequeno "monstro" para definir a expressão da data:

`[0123]?\d\s+de\s+[A-Z][a-zç]{1,8}\s+de\s+[12]\d{3}`

Como poderíamos deixar a expressão mais fácil de entender?

Uma forma fácil de melhorar a legibilidade seria usar algumas variáveis auxiliares, que deixam claro o que estamos definindo, por exemplo no JavaScript podemos criar 4 variáveis:

```js
var DIA  = "[0123]?\d"; 
var _DE_ = "\s+de\s+";
var MES  = "[A-Za-z][a-zç]{1,8}";
var ANO  = "[12]\d{3}";
```

Repare que cada variável representa uma parte da regex. Depois disso é só concatenar esses variáveis para ter a expressão final:

`var stringRegex = DIA + _DE_ +  MES + _DE_ + ANO;`

Essa string passamos para a regex engine do JavaScript:

var objetoRegex  = new RegExp(stringRegex, 'g');

Uma regex é algo muito compacto e aquilo que escrevemos hoje, amanhã já pode ser difícil de se entender. Criar variáveis auxiliares pode ajudar muito para deixar claro o que a regex representa, mesmo para desenvolvedores que não são especialistas de expressões regulares.

O objeto `RegEx` é a engine de RegEx do javaScript

O que aprendemos?
Podemos definir facilmente a classe de qualquer caractere com o [A-Z].

Conhecemos todos os quantifiers como `?`, `+`, `*` e `{n}`.

\s significa whitespace e é um atalho para `[ \t\r\n\f]`.

\w significa word char e é uma atalho para `[A-Za-z0-9_]`.
