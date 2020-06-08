# Linux comandos parte 2

Outros comandos básicos

|Comando|O que faz|
|--|--|
|`ps`|Mostra processos que estão sendo executados pelo bash|
|`ps -e`|roda todos os processos sendo executados pelo linux, (PID=Process ID)|
|`ps -ef`|Moatra várias outras informações sobre os processos|
|`kill (numero do PID  do programa (posso botar outros PID somente com o espaço))`|mato o processo que está sendo executado|
|`kill -9 (numero do PID do programa)`|Mata de vez, só o kill se o programa der uma relutada ele não segura|
|`kill -STOP (numero PID)`|para o programa|
|`kill -CONT (numero PID)`|continua com o programa|
|grep|filtra a saída de um programa de terminal de modo a me mostrar somente as palavras seguintes como `ls| grep Desktop` onde ele filtra a saída do ls e mostra somente as que tem escrito firefox|
|`top`|Lista todos os processos sendo executados in real time, e quais tão consumindo mais cpu e memoria ram|
|`killall (nome do programa)`|Mata todos os programas daquele programa, pode se usar o -9 para garantir que aquele programa vai acabar mesmo|
|`pstree`|nos mostra todas os processos em execução mostrados em árvore, pois um processo pode gerar novos processos|
|passwd|Muda senha do usuario, sudo passwd muda senha do root (e é bom que se tenha uma senha para ele)|

Por padrão, o top atualiza a tela com novas informações sobre os processos a cada 3 segundos. Para alterar esse tempo basta pressionar `d` enquanto estiver rodando o top, inserir o valor desejado e pressionar a tecla `Enter`.

Quando abro o firefox pelo terminal com o comando `firefox` esse processo toma todo o funcionamento do bash e para rodar ele em backgound eu aperto `CTRL+Z` (isso faz parar a execução mas abre o prompt para mim naquele bash aí eu digito)

```sh
jobs (me mostra os programas que o bash está executando)
bg 1 (caso o firefox seja o programa 1 dentro do jobs)
```

Caso eu queira trazer o firefox denovo para aquele terminal eu faço `fg 1`, fg é de foreground. Não precisa colocar o número se só temos esse programa sendo executado, senão passamos nenhum parâmetro ele tira o primeiro da pilha de processos.

Para saber quais processos estão sendo executados em background e quais processos estão parados no nosso terminal, utilizamos o comando jobs.

Se eu fecho o terminal eu fecho o programa no background também.

Para rodar o firebox direto no background eu digito

```sh
firefox &
```

Pois o bash já entende o job que o bash tem que fazer.

## Permissões

Lembre as letrinha 

r->leitura

w->escrita

x->execução

d->diretório

E todo arquivo ou pasta tem um dono e um grupo então. Então quando listamos uma pasta com `ls -l` nós temos as tres primeiras letras depois do d com permissões pro dono, as próximas pro grupo e as três ultimas para outros usuarios.

Para mudar a permissão e poder executar um script sem o comando `bash` ou `sh` nós escrevemos o change mode ou chmod

```sh
chmod +x script
```

Esse comando libera a execução para todos os usuários. E para executar eu coloco o diretório onde ele está se eu já estou nele então:

```sh
./script
```

E para tirar essa permissão

```sh
chmod -x script
```

Se o proprietário e o grupo desse arquivo ou pasta é o root então eu preciso dar um sudo para fazer coisas nele.

u->user

g->group

o->others

Então para tirar a permissão de leitura e executação de outros usuários na minha pastaeu faço

```sh
chmod o-rx user/
```

## Locate

Caso a versão do seu linux não tenha o locate basta instalar-lo.

O comando locate cria um banco de dados interno dentro do seu sistema e te dá a localização de todos os arquivos com uma determinada palavra, de tempos em tempos esse banco de dados pode ficar desatualizado para isso basta fazer

```sh
sudo updatedb
```

Não confunda com `which` e `whereis` esses comandos nos mostra em que lugar do PATH tal arquivo está e por onde ele será executado.

Para colocar esse script em uma pasta dentro do PATH como usr/bin eu faço

```sh
sudo mv script /usr/bin
```

Com isso eu consigo colocar o programa e rodar o script de qualquer lugar no terminal

## Sudo e su

Com o comando `su <nome de usuario>` eu posso mudar de usuário dentro do meu sistema e com `sudo` eu consigo realizar operações que somente o usuário root teria permissão. Mas cuidado que o comando `su root` é válido eu posso fazer tudo com ele.

## Outros usuários

Para criar um usuário eu coloco `adduser <nome do usuario>` como usuário root, e ele vai me pedir a senha.

E por padrão eu que criei a máquina consigo ler a pasta de todos os usuários.
