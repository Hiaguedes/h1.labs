# Python

Versão usada a 3.8.3 e executar um arquivo python com o comando `python <caminho do carquivo>`, o python é uma linguagem dinamicamente tipada (como o js)

## Coisas básicas

Print da mensagem no terminal com a função `print` e um help com `help()` então vendo a documentação do help para o comando print podemos ler

```cmd
print(...)
    print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)

    Prints the values to a stream, or to sys.stdout by default.
    Optional keyword arguments:
    file:  a file-like object (stream); defaults to the current sys.stdout.
    sep:   string inserted between values, default a space.
    end:   string appended after the last value, default a newline.
    flush: whether to forcibly flush the stream.
```

Onde os três pontinhos significam que podemos passar n valores para serem printados no terminal (saida padrão do python visto pela variável opcional file), podendo então criar um comando como:

```py
print(1+1, 2+2, 3*5, sep=' . ')
```

Onde queremos o valor printado no console das expressões `1+1, 2+2, 3*5` e um separador com . o que nos dará uma saída no console como a de baixo:

```cmd
2 . 4 . 15
```

### Tipos no python

Podemos usar a função tipo como em:

```py
pais = 'Brasil'
qtde = 4
print(type(qtde))
```

O que nos dá:

`<class 'int'>`

Para printar variáveis fazemos :

```py
pais = 'Brasil'
qtde = 4

print(pais,'ganhou de', qtde, 'da Argentina')
```

O que nos dá de resultado : `Brasil ganhou de 4 da Argentina`

## Padrão snake_case

O Python utiliza por convenção o padrão Snake_Case para nomes de variáveis (ou identificadores).

Um exemplo de variáveis em Snake_Case são:

```py
idade_esposa = 20
perfil_vip = 'Flávio Almeida'
recibos_em_atraso = 30
```

Em outras linguagens também se usa o padrão CamelCase. O mesmo exemplo com CamelCase (que não é o padrão do Python):

```py
idadeEsposa = 20
perfilVip = 'Flávio Almeida'
recibosEmAtraso = 30
```

Vamos seguir o padrão do Python nesse curso, que é o Snake_Case! Já é a primeira diferença pro js onde o padrão é o camelCase

## Condicionais no python

Um exemplo pode ser visto abaixo

```py
print('---------------| Jogo da Adivinhação |---------------')
print('*****************************************************', end="\n\n")

numero_secreto = 31

numero_escrito = int(input('Digite o numero: '))


if(numero_secreto == numero_escrito):
    print('Você acertou!')
elif(numero_secreto > numero_escrito):
    print('Você errou, o número correto é maior que o escrito')
elif(numero_secreto < numero_escrito):
    print('Você errou, o número correto é menor que o escrito')
```

Um contexto no python é dado por : ao invés de abre e fecha chaves ({}) e obrigatoriamente temos que ter um tab para o corpo do contexto como se ve nos prints na função acima. O input é como o prompt do js e que nos retorna um string

Temos o seguinte código:

```py
idade1 = 10
idade2 = "20"
print(idade1 + idade2)
```

Qual das opções abaixo possui o resultado do código? Fique à vontade de testar esse código no console do Python.

Correto!

O código na verdade não funciona, e exibe a seguinte mensagem de erro no console:

unsupported operand type(s) for +: 'int' and 'str'COPIAR CÓDIGO
Isso acontece porque não podemos realizar uma operação de soma envolvendo uma string. Para resolvermos o problema, podemos apelar para a função int(), que converte uma string que contém um número, em um número inteiro:

```py
idade1 = 10
idade2 = int("20")
print(idade1 + idade2)
```

ao somar duas strings temos o mesmo do jjs que é de concatenar strings

### já que eu trampo com js em 2021 entao vai uma comparação

Para saber mais: JavaScript vs Python
PRÓXIMA ATIVIDADE

Muito pode se falar na comparação das duas linguagens, mas para esse exercício vamos focar nas operações de adição e multiplicação. Vimos que o Python apenas soma valores de tipos numéricos, ou seja, o exemplo seguir não funciona por causa do tipo str:

numero1 = 10
numero2 = "20"
soma = numero1 + numero2
TypeError: unsupported operand type(s) for +: 'int' and 'str'COPIAR CÓDIGO
Agora, o que acontece com o mesmo código no mundo JavaScript? Você pode testar isso facilmente dentro do seu navegador, apertando F12 para abrir o seu console. Nele, digite o mesmo código:

Soma JavaScript

Repare que o JavaScript concatena os valores, criando a string: "1020"

Você pode pensar que isso faz sentido, já que a variável numero2 é do tipo string, no entanto o que o JavaScript faz é uma conversão implícita. O JavaScript converte a variável numero1 automaticamente para string, e isso pode ser perigoso.

Vou tentar dar mais um exemplo com JavaScript. Agora vamos multiplicar numero1 com numero2:

numero1 = 10
numero2 = "20"
produto = numero1 * numero2COPIAR CÓDIGO
Soma JavaScript

Repare que o JavaScript multiplicou e imprimiu 200! Agora também aconteceu uma conversão automática, mas dessa vez a variável numero2 foi convertida para int. Novamente, o JavaScript é tolerante nesse aspecto e converte quando julga necessário. O Python é mais rígido nesse sentido e não faz essas conversões implícitas.

Ótimo, então vamos testar a multiplicação com Python:

numero1 = 10
numero2 = "20"
produto = numero1 * numero2
print(produto)COPIAR CÓDIGO
O resultado nos surpreende:

20202020202020202020COPIAR CÓDIGO
Não deu erro e sim imprimiu 10 vezes 20! Mas eu não acabei de falar que o Python é rígido e não converte automaticamente?

Falei e na verdade não aconteceu uma conversão automática/implícita. Trata-se apenas de um syntax sugar do mundo Python. Um syntax sugar, açúcar sintático da linguagem, apenas simplifica algo que seria trabalhoso, mas não muda a característica da linguagem. Então, ao invés de escrever dez vezes o número 20, podemos simplificar e escrever 10 * "20". Tudo bem?

## Laços de iteração

Sem muito mistério, só lembre de colocar 1 tab em todo o contexto dentro de um for ou while

```py
print('---------------| Jogo da Adivinhação |---------------')
print('*****************************************************', end="\n\n")

correct =  False
numero_secreto = 31
tentativas = 0

while(correct != True):
    numero_escrito = int(input('Digite o numero: '))
    if(numero_secreto == numero_escrito):
        print('Você acertou!', end="\n\n")
        tentativas = tentativas + 1
        correct = True
    elif(numero_secreto > numero_escrito):
        print('Você errou, o número correto é maior que o escrito', end="\n\n")
        tentativas = tentativas + 1
    elif(numero_secreto < numero_escrito):
        print('Você errou, o número correto é menor que o escrito', end="\n\n")
        tentativas = tentativas + 1

print('numero de tentativas', tentativas, end="\n\n")
```

## Formatação de string

Em js podemos fazer o seguinte código

```js
diaIni = 24
diaFim = 28
mes = "fevereiro"
ano = 2017

console.log(`Em ${ano} o Carnaval acontece em ${mes} do dia ${diaIni} até o dia ${diaFim}`)

"Em 2017 o Carnaval acontece em fevereiro do dia 24 até o dia 28"
```

Em python temos uma forma parecida que seria

```py
dia_ini = 24
dia_fim = 28
mes = "fevereiro"
ano = 2017

print("Em {} o Carnaval acontece em {} do dia {} até o dia {}".format(ano, mes, dia_ini, dia_fim))
```

### o laço for

O laço for no python é um pouco diferente das outras linguagens, pois ele não possui o ;, isso é crime no python, então uma forma de fazer-lo é com o range como em:

```py
for i in range(0,10):
    if(i%2 == 0):
        continue
    print(i)
```

Onde eu defino i dentro de um raanage de 0 a 10 e caso ele seja um número par ele pula esse i e printa apenas os numeros impares dentro do range

O ultimo numero é exclusivo, ou seja não entra no for

um códgo como o de baixo

```py
for contador in range(1,11,3):
    print(contador)
```

faz o iterador pular de três em três e esse step é opcional

## Formaatação de strings - float

Veja o exemplo:

```py
print('O saldo é de R$ {:.2f}'.format(123.9))
```

Esse .2f nos dá uma formatação de 2 digitos decimais

Você pode colocar quantos numerais você quer e 0 nos numerais, como em:

```py
print('Data: {:02d}/{:02d}'.format(9,12))
```

Onde se coloca um 0 quando não tenho dois dígitos (no primeiro número) e d representa numeros inteiros

Um desenvolvedor Python está tendo que adaptar um sistema americano de cadastro de clientes americanos para os clientes brasileiros. Ele está esbarrando em um problema, pois lá as pessoas têm o costume de se referir pelo sobrenome antes do primeiro nome, por exemplo: Smith, John .

Ele deseja adaptar as mensagens do sistema para o padrão brasileiro, mas sem alterar a estrutura de dados que ele recebe do banco de dados.

Digamos que ele queira exibir a seguinte mensagem: "Ola Sr. Leonardo Cordeiro", como ele pode formatar a string para obter o resultado desejado?

Alternativa correta
print("Ola Sr.{-1} {1}".format("Cordeiro","Leonardo"))

Com o .format(), podemos especificar a ordem em que os parâmetros aparecem na string, basta apenas colocar entre as chaves ({}) da string formatada qual parâmetro você quer exibir. É válido lembrar também, que o primeiro parâmetro é o zero, pois tradicionalmente na computação começamos contando de zero, ou seja, no nosso caso:

print("Ola Sr.{1} {0}".format("Cordeiro","Leonardo"))COPIAR CÓDIGO
O primeiro parâmetro, representado pelo 0** é Cordeiro, e o segundo, que é o **1, é o Leonardo. Assim, formatando a string, na hora de imprimir será exibido:

"Ola Sr. Leonardo Cordeiro"

### A partir do python 3.6+

A partir da versão 3.6 do Python, foi adicionado um novo recurso para realizar a interpolação de strings. Esse recurso é chamado de f-strings ou formatted string literals.

Esse recurso funciona da seguinte forma. Vamos imaginar que temos uma variável nome:

```cmd
>>> nome = 'Matheus'
>>> print(f'Meu nome é {nome}')

Meu nome é Matheus
```

Quando colocamos a letra f antes das aspas, informamos ao Python que estamos utilizando uma f-string. Dessa forma o Python consegue, em tempo de execução, captar a expressão que está entre chaves ({ }) e avaliá-la.

Além de variáveis, podemos passar também de funções e métodos:

```py
>>> nome = 'Matheus'
>>> print(f'Meu nome é {nome.lower()}')
Meu nome é matheus
```

Já vimos algumas funções built-in nesse curso!

O que sabemos sobre essas funções built-in? Assinale a afirmação correta!

Estão automaticamente disponíveis e podem ser chamadas em todo lugar do nosso código.

As funções built-in podem ser chamadas a qualquer momento, em todos os lugares. Exemplo de funções são type(..), abs(), input(..) ou int.

Segue também o link da documentação (em inglês): <https://docs.python.org/3/library/functions.html>

## Definindo funções

Pouco vimos sobre funções, mas não se preocupe. Na medida em que você avança nos cursos sobre Python 3, vamos introduzir mais recursos.

Para declarar uma função, devemos usar a palavra chave def do mundo Python, seguida pelo nome da função. Lembrando que é consenso usar a nomenclatura snake_case:

```py
def nome_da_funcao():
    # todo o código identado faz parte da função
    print("aprendendo funções")
```
Repare que uma função pode chamar uma outra função. print também é uma função e usamos ela dentro da nossa própria função.

Executando funções
Para chamar a nossa própria função, usamos o nome dela seguido pelos parênteses, por exemplo:

```py
nome_da_funcao()
```

Podemos chamar uma função quantas vezes quisermos

Isso é a principal vantagem de funções, reaproveitar o código escrito nela!

Parâmetros e retorno
Uma função também pode receber parâmetros e retornar algum valor, por exemplo:

```py
def soma(a, b):
     return a + b
```

A função soma recebe dois parâmetros (a e b) e retorna a soma. Ao chamar a função, podemos capturar o retorno:

```py
s = soma(3,4)
```

Isso foi apenas uma pequena introdução, mas novamente, ainda vamos utilizar muito as funções e praticar para fixar o conteúdo.

## Importação de módulos

Marlon criou dois arquivos chamados a.py e b.py. Segue conteúdo de cada um:

 arquivo a.py

```py
print('executando a')
```

 arquivo b.py

```py
print('executando b')
```

Ele ainda criou um terceiro arquivo chamado principal.py. Para testar se aprendeu corretamente a importar um módulo criado por ele mesmo, ele fez o seguinte em principal.py

 principal.py

```py
import a
import b
```

O que acontecerá quando Marlon executar através do terminal o programa principal.py?

Será exibido os textos:

executando a
executando b

Correto!

Quando importamos um módulo em Python, a primeira coisa que a nossa linguagem favorita fará é executar o conteúdo de cada módulo importado.

### Importando um pouco diferente

Fernanda, assim como seu amigo Marlon, criou dois arquivos chamados a.py e b.py. Segue o conteúdo de cada um:

 arquivo a.py

```py
def executa():
    print("Executando a")
```

arquivo b.py

```py
def executa():
    print("Executando b")
```

Ela criou também aquele terceiro arquivo chamado principal.py. Para testar se aprendeu corretamente a importar um módulo criado por ela mesmo, ela fez o seguinte em principal.py

 principal.py

```py
import a
import b
```

Agora qual é a saída ao executar o arquivo principal.py?

Nada será exibido.


Correto!

Como os códigos dos arquivo a.py e b.by foram definidos dentro de uma função, sendo assim, a importação de a e b por principal não executa automaticamente o código contido neles. Para isso, precisamos explicitar que queremos executar esses código em principal. Vejamos:

 principal.py

```py
import a
import b

a.executa()
b.executa()
```

## Módulo que pode ser chamado pelo seu arquivo ou por outros

Kellen criou o seguinte módulo no arquivo a.py:

# arquivo a.py
def executa():
    print("Executando a")COPIAR CÓDIGO
Aprendemos a importar um módulo, inclusive a chamar uma função específica desse módulo. No entanto, Kellen deseja usar a.py independente de outros módulos, ou seja, quer ser capaz de chamá-lo através do console, como:

python a.pyCOPIAR CÓDIGO
Qual das opções abaixo possui a modificação correta de a.py para que seja possível chamar o arquivo diretamente do terminal?

```py
def executa():
    print("Executando a")

if(__name__ == "__main__"):
    executa()
```

Mesmo um módulo solitário pode executar alguma funcionalidade quando executado isoladamente, basta adicionar um if no final do código para verificar a variável `__name__`:

```py
def executa():
    print("Executando a")

if(__name__ == "__main__"):
    executa()
```
