# Linux LPI parte 10

Nessa parte vamos falar sobre os diretórios do linux e como o linux salva os dados no sistema operacional

Além de como o linux executa processos

## Filesystem Hierarchy Standard (FHS)

É o padrão de hierarquia de diretórios que um sistema linux deve seguir.

O FHS (Filesystem Hierarchy Standard) é define convenções para a organização da estrutura de diretórios de um sistema Linux. É possível encontrar pequenas variações entre as distribuições, mas no geral elas seguem esse padrão

A raiz `/` é o primordial, é a base de todos os diretórios no linux, um guia razoavelmente bom pode ser visto nesse [link](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

### bin e sbin

O `/bin` é onde temos os binários necessários para o usuário poder utilizar comandos básicos e essenciais com o `cat`, o `ls` o `cp` e por aí, ou seja eles são programas de terminal, a distribuição linux se encarrega de colocar esses programas lá dentro, no boot o computador tem acesso a esses programas

O `/sbin` são binários de administração e reparo do sistema operacional e só são acessíveis por um superusuário, um exemplo é o `fdisk` que está nessa pasta

O `/usr/bin` é uma outra pasta de binário e são programas que não estarão disponíveis na hora do boot do sistema, serve para o usuário usar no dia a dia, um programa que está nessa pasta é o `zip`, e o come engana usr não vem de user ele diz que são arquivos que não mudam no sistema e são read only, pois é uma pasta de quem desenvolve programas e arquiteta o linux

E ainda temos o `/usr/sbin` e são programas não tão vitais pro sistema mas servem para o superusuário executar programas de rede e outras coisas

### boot

No `/boot` temos os arquivos minimos necessários para bootar o sistema com o kernel, o grub (que diz se queremos bootar no modo de segurança ou normal, ele é o carregador do boot da máquina) o memtest. O diretório boot contém arquivos que são necessários para que o boot possa ocorrer, como o kernel (vmlinuz e o bootloader (grub).

### dev

o `/dev` vem de device, são os dispositivos conectados no sistema, dispositivos que armazenam arquivos como os hds ou devices que nos retornam alguma mensagem como o `/dev/random` que nos retorna um número aleatório

### etc

O `/etc` apesar do nome lembrar etcetera (ou seja qualquer outra coisa que não sirva em qualquer uma das pastas) na real a pasta root etc está para guardar arquivos de configuração estatica editáveis, sendo aceita o nome Editable Text Configuration. Então nessa pasta temos arquivos de configuração editáveis, um exemplo é o fstab (que monta partições no sistema), ele está dentro da pasta etc. o diretório /etc, no geral, não deve conter arquivos binários, e sim arquivos de configuração.

O `etc/hosts` nos mostra os hosts (com o localhost),o `/etc/init.d` nos mostras os programas (scripts) de inicialização da máquina e se eu quero que meu script rode toda vez que eu inicie a máquina eu colocarei ali, o `sudo etc/shadow` nos mostra nossas senhas de forma criptografada e quanto maior a seua senha maior esse texto criptografada

### Outras pastas

O `/media` servem para montar dvds e discos moveis e o `/mnt` serve para montar discos fixos com o hd, mas isso não é via de regra, o `/home` é a pasta do usuário e é onde terá seus arquivos comuns e o `/root` é o home do usuário root

### Pastas do usr

O `/usr/bin` ou até mesmo o `/bin` podem ter a pasta lib que são as bibilotecas necessárias para rodar os programas desses binários

Enquanto o `src` contém o código fonte do programa, ou seja é o arquivo que será compilado e que será mandado para o processador

O `/local` é para eu poder colocar o que eu quiser lá dentro, pois se eu colocar um script na `/bin` eu posso perder esse script quando o linux atualizar, já se eu colocar na `/local/bin` eu não tenho esse problema e como essa pasta é de acesso de todos os usuarios da maquina então eu precisarei do sudo. Então eu posso instalar coisas lá e coisas do tipo

A pasta `local` é uma pasta que está no nosso PATH sendo então de muita importância, pois é uma pasta destinada ao usuário criar e colocar suas aplicações

#### Exercícios

Qual diretório pode conter, seguindo a estrutura do FHS, códigos-fonte de programas, como o código-fonte do kernel, por exemplo?

É nesse diretório que normalmente ficam os códigos-fonte de programas, quando disponíveis.

As bibliotecas que são essenciais para os programas presentes em /bin e /sbin, ficam em qual diretório?

/lib

É nesse diretório que ficam as bibliotecas necessárias para os binários disponíveis em /bin e /sbin

Seguindo a estrutura do FHS, qual seria um bom diretório para colocarmos um script que escrevemos e deixá-lo acessível no nosso PATH?

/usr/local/bin

É no diretório /usr/local que é recomendado por arquivos que são instalados pelo administrador do sistema.

Enquanto em diretórios como /bin, /sbin ou /usr/bin, temos binários que já vem com a distribuição, no /usr/local podemos por nossos próprios binários, por exemplo.

Nesse caso, podemos por o script no /usr/local/bin, que já está na variável de ambiente $PATH.

### proc e sys

Pastas de processos do seu sistema e dando um ls nessa pasta vemos que ele tem MUITOS arquivos, alguns interessantes são o `cpu-info` me mostra as informações da CPU, o `devices` que nos lista os dispositivos (em arquivos de bloco ou de caracter, como teclados), o `loadavg` nos diz a carga média que cada processador está realizando naquele momento, o `uptime` nos diz o quanto aquele processador está sendo utilizado em porcentagem e a quanto tempo aquele dispositivo está ligado, o `meninfo` nos dá informações a baixo nível de informações da memória Ram para ler isso de maneira humana digite no console `free -h`

E posso usar essa pasta para escrever programas usando o hardware do meu sistema, ou rodar um programa utilizando todos os cores do meu processador

O `/sys` também trás informações do sistema nos permitindo conhecer e iteragir ainda mais com o sistema

Essas duas pastas são pastas virtuais, servem para que possamos conhecer o sistema

#### Exercicio

Neste capítulo vimos mais dois diretórios que estão presentes na estrutura do FHS: /proc e /sys.

Quais das alternativas apresentam informações corretas sobre esses diretórios?

Nesses diretórios é possível encontrar algumas informações sobre o hardware conectado ao sistema.

Sim, nos diretórios /proc e /sys existem arquivos onde encontramos informações sobre o hardware.

Esses diretórios são sistemas de arquivos virtuais. Temos sistemas de arquivos especiais para isso: o procfs e o sysfs.

Os diretórios /proc e /sys não existem de fato no nosso computador. São sistemas de arquivos especiais que são montados virtualmente através do procfs e sysfs

fs vem de filesystem

Ao utilizar o cat para mostrar os valores no arquivo /proc/loadavg, obtive os seguintes resultados:

```sh
$ cat /proc/loadavg 
3.84 2.66 1.66 3/925 9137
```

É possível afirmar que:

Alternativa correta
O valor 3.84 indica que a carga média do sistema no último minuto.

Sim. Esse número representa a carga média do sistema no último minuto. O segundo e o terceiro número, representa a carga média nos últimos 5 e 15 minutos.

Eu gostaria de obter informações sobre o meu processador, como o modelo e a frequência. Existem algumas possibilidades, dentre elas, qual dos seguintes arquivos contém essas informações?

Alternativa correta
/proc/cpuinfo

É nesse arquivo que podemos encontrar informações detalhadas sobre o nosso processador. Se for um processador multicore, vamos ver as informações para cada um dos núcleos.

### Arquivos de log

Já notou que quando inicializamos o sistema aparecem uma série de mensagens para a gente? Essas mensagens são mensagens de log do sistema (lá ele verifica os drivers necessários para entender o que tem no meu sistema)

O comando no terminal para ler essas mensagens é o `dmesg` e como é muita coisa é melhor ler esse arquivo com `dmesg | less` esse programa é util para saber que problemas eu estou tendo na inicialização

Esses arquivos ficam na pasta `var` que ao contrário do usr os arquivos dessa pasta podem mudar o tempo todo, como queremos o log então eles estão em `/var/log` e essas mensagens são geradas pelo syslog que é um programa que serve para atualizar um arquivo de log o que feito naquele instante

qualquer programa daemon é um programa que roda no background, sem visualização do usuário, então se tiver um d no final é por que ele roda no background e o syslog é implementado por `rsyslogd`

## Ver processos com o ps e o top

O `ps` nos mostra os processos sendo executando no shell atual, para ver todos os processos eu uso o `ps -e` e com ele rodamos processos que estão processando algo ou estão esperando alguma mensagem, para trazer mais informações desses processos eu faço `ps -ef` e ele nos mostra o ID do processo, quem criou esse processo

PID = Processor ID

Coisas que posso fazer com o numero de PID

```sh
kill <PID>->mata o processo (na verdade não mata ele pode so trocar o numero do PID)
kill -9 <PID>-> realmente mata o processo sem dar chance de nada
ps -f <PID> -> tras mais informações daquele processo especifico
```

PPID =Pai do processor ID

É quem inicializou aquele processo, o pai dele. Então se executamos o ps no bash quem é o pai desse ps é o bash e se formos vendo quem é o pai de todos esses processos achamos o processo com PID 1 que é o `/sbin/init splash` que é quem inicializa tudo

UID= User ID

O comando `top` mostra informações do sistema em tempo real (o numero de usuarios podem ser o numero de shells abertos então calma não é um hacker) e podem ter diversos processos que estão parados. `CTRL+Z` para o programa, fg volta a rodar o programa, processo zumbi são os processos que não tem pai pois provavelmente o usuario matou o processo pai e esqueceu dos filhos, com ? ou h eu peço ajuda do `top`

Com `top -u <usuario>` eu vejo apenas os processos sendo executados pelo usuário em si

### Exercícios

Por padrão, o comando ps lista todos os processos do sistema.

Alternativa correta
Falso

Falso. Por padrão o comando ps apenas exibe os processos que foram iniciados no shell atual.

Para obter uma lista com todos os processos do sistema, com informações detalhadas, como por exemplo qual usuário iniciou o processo, devemos utilizar o comando ps com quais opções?

$ ps -ef

O comando ps -ef lista todos os processos e fornece informações detalhadas sobre eles. O -e é resposável por exibir todos os processos do sistema, já o -f fornece as informações mais detalhadas.

### Encerrando processos

Abra algum programa do seu Linux, como o navegador web firefox ou o editor gedit.

Execute o comando necessário, passando as informações que ele necessita para encerrar o processo do programa de uma forma que ele consiga decidir se será realmente encerrado.

Abra novamente o programa e agora utilize o comando necessário para encerrá-lo de forma que você tenha certeza que o programa não irá se recuperar e será de fato encerrado.

Utilizamos o comando kill para enviar um sinal para um processo. Os processos utilizam sinais para se comunicar entre si. Sinais também são utilizados pelo Linux para interferir no funcionamento dos processos.

Exemplos de sinais são o STOP e o CONT, que podem ser utilizados, respectivamente, para interromper a execução de um processo e retornar à execução do processo que foi interrompido anteriormente.

Para utilizar o comando kill, passamos o sinal que desejamos enviar ao processo seguido do identificador único do processo, o pid. Imagine que temos um processo com pid = 11163 no nosso sistema:

```sh
$ kill -STOP 11163
$ kill -CONT 11163
```

Para encerrar um processo de forma que ele possa realizar algumas tarefas antes de ser encerrado, utilizamos o sinal TERM. Quando não indicamos nenhum sinal para o comando kill, é o sinal TERM que é executado por padrão. Portanto, o comando que podemos utilizar para encerrar o processo de uma maneira mais educada é:

```sh
$ kill 11269
```

Em alguns momentos mais críticos precisamos encerrar um processo à força. Precisamos "matar" o processo. Nesse caso utilizamos o sinal KILL, que é também representado com o número -9. Então para garantir que o programa será encerrado imediatamente, fazemos:

```sh
$ kill -9 11364
```
