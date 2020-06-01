# Linux 3

Aqui a gente vai falar sobre as linhas de comando básicas, sobre o shell a sintaxe geral da linha de comando, variáveis, comentários e alguns termos e utilitários

## Terminais e shell

Terminais rodam um console e que os consoles se conectam a um teclado e o console me liga com a saída que é a janela e os terminais linux rodam um shell, e esse shell me dá comportamentos. Eu digo a ele para listar os arquivos dentro de uma pasta com `ls` e ele me manda o comportamento disso na tela e ele fez o que foi pedido, vai para a próxima e cada shell vem com uma dezena de comandos (a maioria segue um padrão)

O shell é um interpretador de comandos que traduz os comandos digitados em tarefas que o sistema Linux deve realizar. Ele pode devolver alguma resposta para nós.

O bash é o tipo mais comum de shell, que geralmente vem nas distribuições Linux.

O terminal é um programa que nos permite interagir com o shell. No caso do Ubuntu, esse programa é o GNOME Terminal. Se estivéssemos utilizando o Kde, por exemplo, seria provável encontrarmos outro programa para interagir com o shell, como o konsole.

## Bash (bourne-again shell)

O bash é um shell e uma linha de comando feita para rodar diversos. E o nome vem de acordo com a história que o shell foi tendo a partir do unix.

Sua história pode ser vista em <https://developer.ibm.com/technologies/linux/tutorials/l-linux-shells/> e ele está presente no MAC OSX também, o bash é a mais popular entre as distros do Linux.

E com isso vemos com o comando `type` quais comandos são construídos internamente com o shell ou não, como o `echo` que se ditarmos `type echo` nós temos como resultado `echo is a shell builtin`.

Enquanto o `ls` é na verdade um apelido (alias) de `ls --color=auto` (que deixa tudo coloridinho para a gente) o que nos diz que temos como criar apelido para comandos no shell.

E sabemos que o comando `zip` é um programa pertencente em `/usr/bin/zip` e não é nativo do shell. E quando executamos um comando o bash é espertinho e coloca o endereço desse programa no cache então ele aparece como hashed quando damos o type para esse programa.

### Sintaxe

Com man ou help eu consigo ver as diferentes formas de se escrever o código com aquela função no caso do type mesmo, ele não tem manual mas seu help nos dá na primeira linha que:

```sh
type: type [-afptP] name [name ...]
```

Isso é o type aceita argumentos opcionais (opcionais são marcados por colchetes) os argumentos a, f, p, t e P. 

E vemos que o argumento -a é:

```
-a        display all locations containing an executable named NAME;
                includes aliases, builtins, and functions, if and only if
                the `-p' option is not also used

```

Isso é ele nos mostra outros programas que tem o comando type portanto podemos encontrar ls por `type -a ls`

Que nos dá a resposta:

```
type -a ls
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

Portanto podemos executar ls por /bin/ls (isso no Kali Linux) que nós teremos a mesma reposta que o ls só que sem as cores, e a normalmente siginifica all.

Então um comando pode ser interpretado como:

Comando [-opçoes] argumentos

Normalmente as opções vem antes dos argumentos. e opções são opcionais, e se meu help dá que o comando aceita as opções -l e -a nós podemos escrever as opções com -la, e caso aceite uma opção com -- então tenho que escrever essa opção em separado como `ls -la --color`

## Variáveis

Para criar uma variável e printar o valor dela nós fazemos

```sh
var=10
echo $var
```

Isso é o cifrão nos diz que temos uma variável com aquele nome, e temos que atribuir valores a variáveis assim sem espaços, então temos que ter `<nome da variavel>=valor`, sem espaços nem a direita e nem a esquerda do =

Essas variáveis só ficam armazenadas dentro daquele shell não levando isso para quando abro um novo terminal por exemplo ou crio um script.

Posso executar um script com o comando `bash`, e para criar um arquivo no terminal eu posso usar o `vi`.

Para fazer com que eu tenha essas variáveis no meu script eu coloco `export var` para ele ser uma variável de ambiente para aquele bash específico, se eu fecho o terminal e abro um outro eu não terei mais essas variáveis

A função export coloca para o bash o nome das variaveis e seus valores, essas variaveis não podem começar com numero e eu posso fazer `export nome=Hiago nome1=Julia` isso cria duas variaveis já setadas. Se eu não coloco nada como `export nome nome1` eu so crio duas variáveis.

Assim como no Windows eu tenho acesso a todas as variáveis de ambiente com o `env`, assim como o meu PATH. Mas o PATH tá setado em todos os terminais que eu abrir o nome não.

O comando env pode ser interessante pois posso passar variáveis de ambiente por ele com:

```sh
env nome=Julio bash l
```

Ou seja eu crio um novo ambiente e eu passo variáveis que tem dentro do script de nome l, mesmo a variável nome no meu ambiente atual seja outro. Só que o env só aceita variáveis com valor, mas se tiver alguma variavel já setada no script ele prioriza o script.

As variaveis de ambiente só são herdadas para os filhos do ambiente. O script não afeta as variáveis de ambiente do pai (que é o sistema todo, então isso é uma segurança)

Não consigo criar variáveis com números pois elas são variáveis especiais.
