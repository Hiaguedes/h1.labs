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

## .bashrc

Toda vez que o bash é aberto ele executa o mesmo programa oculto chamado .bashrc, lá nós podemos alterar o PATH para que ele adicione no PATH sempre a mesma pasta.

## wc

Mostra o numero de linhas, o numero de palavras e o numero de letras de um documento. E pelo manual desse comando vemos

```sh
-c (numero de bytes)
-m numero de caracteres
-l numero de linhas
-w numero de palavras
```

O comando `ps -e | wc -l`

## APT

o apt é o gerenciador de instalaçoes de algumas distribuições do linux, os comandos para buscar aplicativos é com `apt-cache search` e para instalar e remover arquivos temos o `apt-get install` e o `apt-get remove` ou `apt-get purge`

### instalando arquivos .deb

Instalar

```sh
sudo dpkg -i arquivo.deb
```

Remover:

```sh
sudo dpkg -r arquivo.deb
```

Caso tenha problemas de dependencia

```sh
sudo apt-get -f install arquivo
```

## Serviços

Para parar um serviço

```sh
sudo service vsftpd stop
```

O vsftpd é um nome de um servidor e posso rodar na minha máquina pelo localhost, para voltar a funcionar somente damos um `sudo service <servico> start`.

Para veriticar o status do service usamos `sudo service <servico> status`

Os diretório `/etc/init.d` nos dá todos os serviços que são inicializados com o start da máquina. E eu posso estar jogando programas ai dentro com o root.

## Instalação pelo código fonte

Para instalar pelo código fonte primeiro eu procuro um script chamado `configure` pois ai ele me diz se tem alguma dependencia. Se tiver ok eu faço `make` nessa pasta, se ele reclamar de algo, procure com `apt-cache search` e depois de `make` dentro da pasa de novo e depois para instalar `sudo make install`

## SSH acessando servidores remotos

### Realizando conexão via ssh


Instale o pacote ssh, que instalará tanto um cliente, para que consigamos nos conectar, quanto um servidor, para que possamos receber conexões.

```sh
sudo apt-get install ssh
```

Caso ainda não tenha criado um usuário, você precisará fazer isso agora. Crie um usuário chamado jose.

Se conecte no usuário jose através do ssh. Após realizar a conexão, utilize o comando whoami para garantir que você está logado com outro usuário.

Para realizar uma conexão ssh, basta indicar para o comando o nome do usuário e o ip da máquina que desejamos nos conectar. No nosso caso, utilizaremos localhost, pois a conexão será na nossa própria máquina:

```sh
$ ssh jose@localhost
jose@localhost's password:
```

Ao executar o comando whoami, podemos perceber que estamos logados com o usuário jose:

```sh
$ whoami
jose
```

Para desconectar, basta usar o comando exit:

```sh
$ exit
logout
Connection to localhost closed.
```

### Transferindo arquivos com scp

Agora nós iremos transferir um arquivo para uma máquina remota utilizando o comando scp.

Você pode escolher um arquivo de sua preferência para transferir. Caso queira, pode transferir o diretório workspace, criado anteriormente, ou o diretório scripts (não se esqueça de utilizar a opção -r caso escolha transferir um diretório). Para transferir um arquivo, vamos compactar um dos diretórios (lembre-se de alterar o nome do diretório caso seja necessário):

```sh
$ zip -r work.zip workspace/
```

Utilize o comando scp para copiar o arquivo para a pasta do usuário jose, que é um usuário de sua máquina. Se logue com o usuário jose e verifique se o arquivo foi copiado.

Para realizar a cópia, informamos o nome do arquivo para o comando scp junto com o nome do usuário, ip e local onde copiaremos o arquivo na máquina remota:

$ scp work.zip jose@localhost:~/
O ~ representa o diretório do usuário, que nesse caso é /home/jose/.

Vamos nos conectar no usuário jose via ssh e verificar se o arquivo work.zip se encontra no diretório do usuário:

```sh
$ ssh jose@localhost
jose@localhost's password:
```

```sh
$ whoami
jose
```

```sh
$ ls
examples.desktop  work.zip
```

Como podemos ver, o arquivo foi copiado.

Lembre-se que o comando scp suporta a opção -r para realizar cópia de diretórios.
