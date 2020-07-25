# Aplicações

Esse arquivo é só para mostrar como aplico regex nas mais variadas linguagens de programação, mesmo que eu não use agora um dia eu posso usar

Os exemplos serão com um alvo `11a22b33c` e um regex `(\d\d)(\w)` que seleciona todo esse alvo pois segue esse padrão

## javaScript

```js
let alvo='11a22b33c';
let pattern=new RegExp(/(\d{2})(\w)/,'g');
console.log(pattern.exec(alvo));
```

Comentários: o alvo deve estar escapado então coloque `/` no começo e no final dentro do primeiro parâmetro do objeto RegExp e coloque o padrão global no segundo assim ele vai repetindo o padrão para todo o input

Eu posso simplesmente testar se o padrão é válido para o alvo com o test de forma que

```js
console.log(pattern.test(alvo));
```

Ou eu posso pegar os resultados com match

```js
console.log(alvo.match(pattern));
```

Note que aqui é o contrário

### [JavaScript] Uso de expressões regulares

Olá, chegou a hora de praticarmos o que aprendemos neste curso com outras linguagens do mercado. No caso do JavaScript, podemos usar o próprio console do navegador para testar nossas expressões.

Abra o console do seu navegador favorito (eu uso Chrome, e você?) e declare a seguinte variável:

`var target = "11a22b33c";`

Declaramos a variável target que é o alvo, ou seja, o conteúdo no qual aplicaremos a expressão regular que vimos no vídeo.

Em JavaScript, podemos declarar uma expressão regular de duas maneiras. A primeira forma consiste em criarmos uma instância de RegExp:

Declare-a em seu console:

`var exp = new RegExp('(\\d\\d)(\\w)', 'g');`

Veja que RegExp recebe uma string, mas o que a torna verbosa é que precisamos escapar cada \ colocando um barra extra! Além disso, o segundo parâmetro indica que queremos todas as ocorrências encontradas da nossa expressão, não apenas a primeira que encontrar.

Podemos usar a forma literal, menos verbosa, Nela,colocamos nossa expressão entre /:

`exp = /(\d\d)(\w)/g;`

Veja que dessa forma não foi necessário colocar, por exemplo, `\\d`, apenas `\d` e nem `\\w`, apenas `\w`. E para testar nossa expressão?

`exp.test(target);`

Veja que uma expressão regular criada possui o método test que recebe o alvo no qual ela será aplicada. Ela retornará true apenas se o alvo seguir o padrão da expressão.

Ótimo, mas se quisermos obter como resultado as partes do alvo, que atendem à nossa expressão regular? Nesse caso, usamos o método exec:

`exp.exec(target);`

Ela imprimirá no console:

`["11a", "11", "a"]`

É um array, no qual o primeiro item é o match, ou seja, a parte do nosso alvo que condiz com nossa expressão. Contudo, precisamos executar mais uma vez nossa expressão para que ele encontre o próximo match. Precisamos fazer até que o resultado final seja null, ou seja, quando não houver mais match:

```js
exp.exec(target);
    ["22b", "22", "b"]
exp.exec(target);
    ["33c", "33", "c"]
exp.exec(target);
    null    
```

Excelente. Contudo, você deve estar se perguntando o que são os outros dois elementos do array. O primeiro já sabemos, que é a parte do target que atendeu nossa expressão regular. Os demais parâmetros equivalem ao padrão que colocamos para cada () da nossa expressão. Usamos dois (), se tivéssemos usando cinco, teríamos no lugar de dois itens, cinco itens.

O ultimo resultado pode ser descoberto com `lastIndex`

### [JavaScript] Alterando o formato de uma data

Temos a seguinte string em JavaScript:

`var anoMesDia = '2007-12-31';`

Nossa missão é trocar todos os hífens por uma `/`. String's em JavaScript são objetos e possuem métodos especiais que aceitam expressões regulares, como é o caso do método replace. Primeiro, vamos criar a expressão que encontra todos os hífens de uma string, inclusive vamos usar a forma literal de declaração:

`var exp = /-/g`

Agora, podemos passar para o método replace da nossa string nossa expressão. O método replace recebe uma expressão regular como primeiro parâmetro e o segundo o novo texto que deve substituir todos os lugares que condizerem com a expressão passada. Sendo assim, temos:

`anoMesDia = anoMesDia.replace(exp, '/');`

Se imprimirmos o valor de anoMesDia no console do browser, temos como resultado:

`'2007/12/31';`

Perfeito! Mas cuidado, se você tivesse omitido o g da expressão, ele trocaria apenas o primeiro hífen. Então sempre use o g caso queira repetir o padrão para mais termos da expressão

### [JavaScript] O poder do `split`

Recebemos de um cliente um arquivo que, segundo ele, era para ser um CSV (valores separados por vírgula). Contudo, como nada é perfeito, logo na primeira linha há evidência que foram utilizados vírgula, hífen e ponto e vírgula. Com certeza, nada foi padronizado!

Declare a seguinte string que nos dá um exemplo da situação atual:

`var arquivo = '100,200-150,200;20';`

Precisamos em JavaScript extrair todos os valores dessa string para no final somá-los. Para tarefas como essa, há o método split que todo objeto String possui. Nela, podemos passar um separador que ele se encarregará de criar um array com cada item considerando o separador utilizado. Contudo, temos um problema com essa estrutura precária. Vejamos o resultado do split:

`var valores = arquivo.split(',');`

Quando imprimimos os valores no console temos:

`["100", "200-150", "200;20"]`

Com certeza não é isso que queremos, queremos cada valor em uma posição do array. E agora? A boa notícia é que a função split aceita receber como critério uma expressão regular. Vamos criar uma que consiga o que desejamos:

`var exp = /[,;-]/;`

Agora, vamos passar nossa expressão para split:

```js
var exp = /[,;-]/;
var valores = arquivo.split(exp);
```

Quando imprimimos no console os valores temos:

`["100", "200", "150", "200", "20"]`

Excelente. Agora o desenvolvedor pode iterar pela lista, convertendo os valores de string para number e totalizar.

### [JavaScript e HTML] A praticidade do atributo pattern

O HTML5 introduziu para as tags input o atributo pattern. Ele recebe como atributo expressões regulares, inclusive, quando o formulário for submetido e o valor digitado pelo usuário não for compatível com a expressão, o próprio navegador exibirá automaticamente uma mensagem para o usuário indicando que o campo é inválido. Mas é importante que o input faça parte de um formulário, caso contrário a validação não será aplicada.

Vamos fazer com que nosso input aceite apenas números:

```html
<!doctype html>
<head>
    <meta charset="UTF-8">
    <title>Testando pattern</title>
</head>
<body>
    <form>
        <input pattern="[0-9]*">
        <input type="submit" value="Enviar dados">
    </form>
</body>
```

Veja que seu conhecimento em expressão regular também pode ser usado para validar formulários! O que é muito foda hahaha

## Ruby

Digitando `irb` no prompt temos o bash do ruby

```ruby
irb(main):001:0> regex=/(\d\d)(\w)/                                                                                     irb(main):002:0> alvo="11a22b33c"                                                                                       irb(main):003:0> resultado=regex.match(alvo)                                                                            irb(main):004:0> resultado                                                                                              => #<MatchData "11a" 1:"11" 2:"a">
```

Uma forma de mostrar todos os resultados é com o scan ou seja

```ruby
alvo.scan(regex)
```

### [Ruby] Uso de expressões regulares

Para executar o código abaixo, você deve ter instalado o Ruby na sua máquina. O instalador para Windows está disponível site do Ruby.

No mundo Ruby também existe uma sintaxe literal para declarar uma expressão regular. Dentro do terminal do Ruby digite:

`regex = /(\d\d)(\w)/`

Declaramos dois grupos, o primeiro de dois dígitos e o segundo de um word-char. Agora vamos declarar o alvo e aplicar a regex:

```ruby
alvo = "11a22b33c"
resultado = regex.match(alvo)
```

O método match aplica a regex uma vez só no alvo e devolve uma lista com os dados do primeiro match. Podemos acessar o resultado:

```ruby
puts resultado[0]
"11a"
```

E acessando cada grupo:

```ruby
puts resultado[1]
"11"
puts resultado[2]
"a"
```

Para saber os índices de cada grupo devemos utilizar os métodos begin e end passando o número do grupo, por exemplo:

```ruby
puts resultado.begin 2 #inicio do grupo a
2
puts resultado.end 2 #fim do grupo a
3
```

Segue também os índice dos outros grupos:

```ruby

> resultado.begin 0 #inicio do match inteiro 11a
0
> resultado.begin 1 #inicio do grupo 11
0
> resultado.end 0 #fim do match inteiro 11a
3
> resultado.end 1 #fim do grupo 11
2
```

### [Ruby] Escaneando a string

Para pegar todos os grupos e fazer um match global (na string inteira), devemos utilizar o método scan, da classe String:

```ruby
> regex = /(\d\d)(\w)/ #dois grupos
> alvo = "12a34b56c"
> resultados = alvo.scan regex
=> [["12", "a"], ["34", "b"], ["56", "c"]]
```

Repare que cada posição possui agora dois elementos, que podemos testar:

```ruby
> resultados[2][1]
=> "c"
```

### [Ruby] Gsub, sub e outros

A classe String possui alguns método que se "dão muito bem" com regexes.

A partir de um objeto String podemos aplicar uma regex para procurar caracteres e substituir por outra string.

Veja o exemplo:

```ruby
cpfLimpo = "111.222.333-96".gsub(/[.-]/,"")
puts cpfLimpo
11122233396
```

O primeiro parâmetro do método gsub (global substitution) é a regex, o segundo é a substituição. O retorno é uma nova string.

Existe um irmão desse método, o método gsub!, que possui os mesmos parâmetros mas manipula a mesma string:

```ruby
cpf = "111.222.333-96"
cpf.gsub!(/[.-]/,"")
puts cpf
"11122233396"
```

Caso queira aplicar a regex apenas uma vez na string alvo existe o método sub:

```ruby
cpfQuaseLimpo = "111.222.333-96".sub(/[.-]/,"")
puts cpfQuaseLimpo
"111222.333-96"
```

E sub!:

```ruby
cpf = "111.222.333-96"
cpf.sub!(/[.-]/,"")
puts cpf
"111222.333-96"
```

## PHP

```php
php > $regexp = '~(\d\d)(\w)~';
php > $alvo = '12a34b56c';
php > $achou = preg_match($regexp, $alvo, $match);
php > echo $achou;

php > print_r($match) ;
Array
(
    [0] => 12a
    [1] => 12
    [2] => a
)
```

Porém podemos fazer com:

```php
php > $achou = preg_match_all($regexp, $alvo, $match);
php > print_r($match) ;
Array
(
    [0] => Array
        (
            [0] => 12a
            [1] => 34b
            [2] => 56c
        )

    [1] => Array
        (
            [0] => 12
            [1] => 34
            [2] => 56
        )

    [2] => Array
        (
            [0] => a
            [1] => b
            [2] => c
        )

)
```

O php não agrupa, para agrupar poderíamos fazer

```php
$achou = preg_match($regexp, $alvo, $match, PREG_OFFSET_CAPTURE);
```

### [PHP] Alterando o formato de uma data

Temos a seguinte string:

`$string = '2007-12-31';`

Queremos trocar o formato da data para 31-12-2007. No PHP, temos a função preg_replace, que recebe uma expressão regular como primeiro parâmetro, o segundo é o novo texto que deve substituir todos os lugares que condizem com a expressão passada, e o terceiro parâmetro é a string alvo. Por exemplo:

```php
$string = 'Setembro 21';
$regex = '~(\w+)\s(\d+)~';
$novoTexto = '$2 de $1';

$resultado = preg_replace($regex, $novoTexto, $string);
echo $resultado; // 21 de Setembro
```

Repare que nós podemos nos referenciar aos grupos através da sua ordem, o primeiro grupo da regex pode ser referenciado por $1, o segundo por $2 e assim por diante.

Tendo isso em vista, como faríamos para trocar o formato da data de 2007-12-31 para 31-12-2007?

Definimos a string e a regex:

```php
$string = '2007-12-31';
$regex = '~(\d{4})-(\d{2})-(\d{2})~';
Depois é só inverter a ordem dos grupos:

$novoTexto = '$3-$2-$1';
```

E chamar a função preg_replace:

`$resultado =  preg_replace($regex, $novoTexto, $string);`

O código todo ficaria assim:

```php
$string = '2007-12-31';
$regex = '~(\d{4})-(\d{2})-(\d{2})~';
$novoTexto = '$3-$2-$1';
$resultado =  preg_replace($regex, $novoTexto, $string);

echo $resultado;
```

### [PHP] Alterando o separador de uma data

Temos a seguinte string:

`$string = '31-12-2007';`

Como faríamos para trocar todos os hífens por /?

Podemos utilizar novamente a função preg_replace, passando uma regex que selecione os hífens e um novo texto, que é a /:

```php
$string = '31-12-2007';
$regex = '~-~';
$novoTexto = '/';
$resultado =  preg_replace($regex, $novoTexto, $string);
echo $resultado; // 31/12/2007
```

## Python

```py
>>> regexp= r'(\d\d)(\w)'
>>> alvo= '11a22b33c'
>>> import re
>>> resultado = re.search(regexp,alvo)
>>> resultado.group(0)
'11a'
```

Para imprimir todos os grupos

```py
>>> resultados = re.finditer(regexp,alvo)
>>> resultados = re.finditer(r'(\d\d)\w','11a22b33c')
>>> for resultado in resultados:
...     print "%s com grupo %s [%s,%s]" % (resultado.group(), resultado.group(1),resultado.start(), resultado.end())
... 
```

### [Python] O método findall

Como vimos no capítulo, para utilizar regex no Python, o primeiro passo é importar o módulo re, responsável pelas expressões regulares:

`>>> import re`
Vamos definir a regex e o alvo, como feito no capítulo:

`>>> regex = re.compile(r'(\d\d)(\w)')`

`>>> alvo = '11a22b33c'`

Mas dessa vez utilizaremos o método re.findall, ele recebe por parâmetro a regex e a string alvo, que já foram definidas:

`>>> resultado = re.findall(regex, alvo)`
O método re.findall retornará todos os matches, como uma lista de strings:

`>>> print resultado`
[('11', 'a'), ('22', 'b'), ('33', 'c')]
Repare que temos os três grupos que foram achados: ('11', 'a'), ('22', 'b') e ('33', 'c').

Podemos imprimir os grupos separadamente chamando seus índices:

```py
>>> resultado[0]
('11', 'a')
>>> resultado[1]
('22', 'b')
>>> resultado[2]
('33', 'c')
```

Ou fazendo um for:

```py
>>> for grupo in resultado:
...     print grupo
... 
('11', 'a')
('22', 'b')
('33', 'c')
```

E para concatenar os elementos, podemos fazer:

```py
>>> for grupo in resultado:
...     print grupo[0] + grupo[1]
... 
11a
22b
33c
```

### [Python] Alterando o separador de uma data
PRÓXIMA ATIVIDADE

Temos a seguinte string em Python:

`>>> alvo = '2007-12-31'`

Queremos trocar todos os hífens por uma /. E mais uma vez o módulo re possui um método que nos auxilia nessa troca. O método re.sub recebe uma expressão regular como primeiro parâmetro, o segundo é o novo texto que deve substituir todos os lugares que condizerem com a expressão passada e o terceiro parâmetro é a string alvo. Por exemplo:

```py
>>> import re
>>> regex = '\s-\s'
>>> novotexto = ': '
>>> alura = 'Alura - Regex'
>>> resultado = re.sub(regex, novotexto, alura)
Se imprimirmos o valor de resultado, temos:

>>> print resultado
Alura: Regex
```

Como podemos fazer para trocar todos os hífens por uma /?

Se queremos trocar todos os hífens por uma /, podemos fazer:

```py
>>> import re
>>> regex = '-'
>>> novotexto = '/'
>>> alvo = '2007-12-31'
>>> resultado = re.sub(regex, novotexto, alvo)
```

Para conferir, podemos imprimir o valor de resultado:

```py
>>> print resultado
2007/12/31
```

## C#

Importar Regex com

```c#
using System.Text.RegularExpressions;
```

Dentro do main fazer

```c#
string alvo ="11a22b33c";
string exp = @"(\d\d)(\w)";

Regex regex = new Regex(exp);

Match match = regex.Match(alvo);

Console.writeLine(match.Value);// printa o primeiro valor
Console.writeLine(match.Index);
Console.writeLine(match.Length);
Console.writeLine(match.Groups);
```

Para pegar todos os matches podemos fazer

```c#
MatchCollection resultados = regexp.Matches(alvo);
```

O objeto do tipo MatchCollection possui todas as informações sobre cada match, basta iterar:

```c#
foreach(Match resultado in resultados) {
    Console.WriteLine(resultado.Value);//imprime 12a,34b,56c
    Console.WriteLine(resultado.Groups[1]); //imprime 12, 34, 56 
    Console.WriteLine(resultado.Groups[2]); //imprime a, b, c
    Console.WriteLine(resultado.Index); //imprime 0, 3, 6
    Console.WriteLine(resultado.Length)); //imprime 3, 3, 3
}
```

### [C#] Alterando o formato de uma data

Como podemos, através de regex, alterar o formato de uma data 2007-12-31 para 31/12/2007?

Dica: use os grupos para formar uma nova String com a data correta.

1) Podemos separar a data em três grupos:

Regex regexp = new Regex(@"(\d{4})(-)(\d{2})(-)(\d{2})");

2) E formar uma nova String com esses grupos.

```c#
MatchCollection resultados = regexp.Matches(alvo);
            foreach(Match resultado in resultados)
            {

                string ano = resultado.Groups[1].Value;
                string mes = resultado.Groups[3].Value;
                string dia = resultado.Groups[5].Value;

                string separador1 = resultado.Groups[2].Value;
                string separador2 = resultado.Groups[4].Value;

                Console.WriteLine(string.Format("{0}/{1}/{2}", dia, mes, ano));
}
```

O código completo abaixo:

```c#
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
           string alvo = "2007-12-31";
           Regex regexp = new Regex(@"(\d{4})(-)(\d{2})(-)(\d{2})");

            MatchCollection resultados = regexp.Matches(alvo);
            foreach(Match resultado in resultados)
            {

                string ano = resultado.Groups[1].Value;
                string mes = resultado.Groups[3].Value;
                string dia = resultado.Groups[5].Value;

                string separador1 = resultado.Groups[2].Value;
                string separador2 = resultado.Groups[4].Value;

                Console.WriteLine(string.Format("{0}/{1}/{2}", dia, mes, ano));
            }
        }
    }
}
```

### [C#] Alterando o separador

Agora que já montamos uma nova string com o novo formato da data, precisamos trocar o caractere separador dessa data. Para isso, a classe String nos oferece um método chamado Replace que recebe uma expressão regular e uma outra String. Em todo lugar onde ele encontrar o padrão definido pela expressão regular, ele irá trocar pelo valor do segundo parâmetro!

Por exemplo:

```c#
"Alura".replaceAll("[Aa]", "*") //*lur*
```

Como podemos fazer para trocar o separador - por /?

O código completo:

```c#
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
           string alvo = "2007-12-31";
           Regex regexp = new Regex(@"(\d{4})(-)(\d{2})(-)(\d{2})");

            MatchCollection resultados = regexp.Matches(alvo);
            foreach(Match resultado in resultados)
            {

                string ano = resultado.Groups[1].Value;
                string mes = resultado.Groups[3].Value;
                string dia = resultado.Groups[5].Value;

                string separador1 = resultado.Groups[2].Value;
                string separador2 = resultado.Groups[4].Value;

                string novaData = string.Format("{0}{1}{2}{3}{4}", dia, separador1, mes, separador2, ano).Replace("-", "/");
                Console.WriteLine(novaData);
            }
        }
    }
}
```

## java

No mundo Java, a classe principal para trabalhar com expressões regulares se chama Pattern e faz parte do pacote `java.util.regex`.

Para criar uma regex, devemos usar o método estático compile(regexString), da classe Pattern, por exemplo:

`Pattern pattern = Pattern.compile("(\\d\\d)(\\w)");`

Repare que foi necessário escapar o símbolo `\`. Outra coisa para notar é que o Java não possui uma sintaxe literal para a definição de regex.

Uma vez declarado o pattern, devemos criar um objeto Matcher, baseado na string de entrada:

`Matcher matcher = pattern.matcher("11a22b33c");`

Esse matcher possui, por sua vez, os métodos para acessar o match, o grupo, index, etc, mas antes de tudo devemos chamar o método find, que verifica se realmente há um match devolvendo true ou false:

```java
boolean encontrou = matcher.find();
A partir daí podemos pegar os valores do match:

if(encontrou) {
    String match = matcher.group();
    String group1 = matcher.group(1);
    String group2 = matcher.group(2);

    int start = matcher.start();
    int end = matcher.end();

    System.out.printf("%s | %s |  %s [%d,%d] %n", match, group1, group2, start, end);
}
```

Sabendo disso, podemos colocar o nosso código dentro de um laço while para mostrar todos os resultados:

```java
public class TesteRegex {

    private static Pattern pattern = Pattern.compile("(\\d\\d)(\\w)");

    public static void main(String[] args) {

        Matcher matcher = pattern.matcher("11a22b33c");
        while(matcher.find()) {
            String match = matcher.group();
            String group1 = matcher.group(1);
            String group2 = matcher.group(2);

            int start = matcher.start();
            int end = matcher.end();

            System.out.printf("%s | %s |  %s [%d,%d] %n", match, group1, group2, start, end);
        }
    }
}
```

As linguagens funcionam bem parecidas trabalhando com expressões regulares e o Java não é diferente.

### [Java] Alterando o formato de uma data

Como podemos, através de regex alterar o formato de uma data 2007-12-31 para 31-12-2007?

Dica: use os grupos para formar uma nova String com a data correta.

Podemos separar a data em alguns grupos:

`Pattern pattern = Pattern.compile("(\\d{4})(-)(\\d{2})(-)(\\d{2})");`

E formar uma nova String com esses grupos.

```java
if (matcher.matches()) {

    String ano = matcher.group(1);
    String mes = matcher.group(3);
    String dia = matcher.group(5);

    String separador1 = matcher.group(2);
    String separador2 = matcher.group(4);

    System.out.println(dia + separador1 + mes + separador2 + ano);
}
```

O código abaixo:

```java
public class TestandoRegex {

    public static void main(String[] args) {

        String data = "2007-12-31";
        Pattern pattern = Pattern.compile("(\\d{4})(-)(\\d{2})(-)(\\d{2})");
        Matcher matcher = pattern.matcher(data);

        if (matcher.matches()) {

            String ano = matcher.group(1);
            String mes = matcher.group(3);
            String dia = matcher.group(5);

            String separador1 = matcher.group(2);
            String separador2 = matcher.group(4);

            System.out.println(dia + separador1 + mes + separador2 + ano);
        }
    }
}
```
### [Java] Alterando o separador

Agora que já montamos uma nova string com o novo formato da data, precisamos trocar o caractere separador dessa data. Para isso, a classe String nos oferece um método chamado replaceAll(regex, replacement) que recebe uma expressão regular e uma outra String. Em todo lugar onde ele encontrar o padrão definido pela expressão regular, ele irá trocar pelo valor do segundo parâmetro!

Por exemplo:

`"Caelum".replaceAll("[Cm]", "*") //*aelu*`

Como podemos fazer para trocar o separador `-` por `/`?

Se queremos trocar o separador - por /, podemos fazer:

`novaData.replaceAll("-", "/");`

Mas como String é imutável, precisamos atribuir o resultado do replaceAll (que é uma nova string) para a novaData:

`novaData = novaData.replaceAll("-", "/");`

Com isso, a String ficará: 31/12/2007.

## Bash

[Bash] RegEx em Bash

Desde a terceira versão, o Bash passou a ter um comparador de expressões regulares "built-in", representado pelo operador =~

Muitos truques em scripts que utilizavam grep ou sed podem agora ser executados através de expressões regulares, tornando seu código mais fácil de ler e manter.

Como outros operadores de comparação, o Bash te retornará 0 se uma expressão como `$DIGITO =~ "[[0-9]]"` mostrar que a variável do lado esquerdo atende os critérios de comparação do lado direito, caso contrário, retornará 1

Nesse exemplo testamos se o valor de `$DIGITO` coincide com algum digito único de 0 até 9.

Seguindo essa ideia, podemos brincar com nossas expressões, colocando em `ifs e até em for

Veja os exemplos abaixo.

Usando no if

```sh
if [[ $DIGITO =~ [0-9] ]]; then
    echo "$DIGITO é um numero entre 0 e 9"
else
    echo "$DIGITO não é um numero entre 0 e 9"
fi
```

Usando no for

```sh
for numero in {1..100}
do
    echo $numero
done
```

(Esse exemplo nos dará todos os numeros de 1 até 100, muito mais simples né?!)

podemos também apenas escrever:

`echo {1..100}`

para termos todos os números de 1 até 100

Seguindo essa lógica, responda abaixo qual conjunto de operação e saída está correta.

```sh
echo {1..-1}
saída:

1 0 -1
```

Correto! A saída começará no 1 e terminará no -1 (decrescente), se mudarmos a ordem e colocarmos {-1..1} teremos uma sequencia crescente!

## Referências de site

<https://regex101.com> e o <https://regexr.com>

O conteúdo completo do curso <https://github.com/andrechavesg/Express-es-regulares-Capturando-textos-de-forma-m-gica/archive/capitulo6.zip>
