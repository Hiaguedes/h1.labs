# Linux

Sistema operacional (SO) ou operating system (OS) é uma ponte entre minha aplicação e todos os hardwares conectados a ela, a aplicação não tem precisa se preocupar com isso, o SO que se resolva pra imprimir um arquivo que a aplicação quer que imprima. O sistema operacional do windows por exemplo suporta as aplicações que são destinadas a ela.

É papel do SO gerenciar o que vai estar rodando em que tempo no processador. Por isso que você consegue "rodar" diversos aplicativos ao mesmo tempo mesmo o processador atuando somente de maneira sequencial, pois tem alguém chamado sistema operacional gerenciando e dando prioridades para as aplicações que estão sendo rodadas ali. Assim como o gerenciamento de memória e permissões que um usuário tem ou não ao mecher com certas variáveis do sistema.

Tipos de sistemas operacionais: Linux, Windows e Mac

Sobre o sistema operacional, nós temos que ele:

- permite a comunicação entre máquinas distintas via placas de rede

- facilita o trabalho dos desenvolvedores, permitindo que escrevam um código mais genérico

- controla as permissões de acesso ao disco

- faz o papel de ponte entre uma aplicação e o hardware

- permite o acesso aos recursos compartilhados como memória do HD, memória RAM e CPU

Uma máquina é definida pelo hardware que ela possui. Se a arquitetura dela é i386, ela pode rodar qualquer sistema operacional compatível com o mesmo. Se ela fosse de outra arquitetura (por exemplo power pc, ppc) suportaria qualquer sistema operacional compatível com ppc.

## Componentes do Linux

Kernel -> é o core do sistema, é o mínimo que faz um sistema ser ativo e funcional e pode ser vista www.kernel.org e lá eles mostram as versões estáveis e instáveis do kernel do sistema operacional.

Libraries-> São as bibliotecas que são adicionadas para que os hardwares conectados a ela possam ser funcionais

utilities-> são os gerenciadores de aplicaçÕes, com ela posso encerrar uma aplicação e coisas do tipo

user interface-> interface de comunicação do usuário com o sistema, seja por texto via terminal ou gráfica (GUI) via aplicação. Com o github texto via terminal ou github desktop que tem uma interface gráfica com o usuário.

O coração do linux é o seu kernel, e podemos dizer que em geral ele é acompanhado de bibliotecas para acessar periféricos, utilitários para configurarmos e utilizarmos no dia a dia, além de uma interface de comunicação (UI) que pode ser gráfica ou não

### História

Na década de 80 você tinha 3 sistemas operacionais dominantes o DOS , o MAC OS (que são pagos) e o UNIX (com código aberto para a comunidade acadêmica), só que com o tempo o UNIX foi perdendo força e cessou aí o Andrew Tanenbaum com objetivo educacional criou o minix (baseado no UNIX) para que pudesse educar seus alunos e estes pudessem entender como um sistema operacional se comportava na prática (assim como um mecânico precisa ver como um carro funciona os cientistas de computação precisam ver na prático o funcionamento de um computador também).

O tempo passou e um de seus alunos o Linus Torvalds se interessou no trabalho do Tanenbaum e escreveu o seu próprio Unix, somente com o mínimo necessário para ter um sistema a primeira ferramenta é o bash (ou o terminal, só com as linhas de comando) e isso viria a se tornar o Linux que temos hoje. A segunda ferramenta era um update (onde todo os dados dos arquivos fossem salvos em disco), um gcc (criado pelo richard stallman) que é um compilador para criar novos programas.

E a sacada é que o Linus compartilhou digitalmente com os programas do sistema operacional com todo mundo que quisesse contribuir. O tanenbaum fez isso pelo livro dele. Esse compartilhamento digital é a base do viria a ser o git e a toda filosofia open source.

## Licenças

GNU general public license -> Criada por richard stallman com a intenção de compartilhar a fonte do código da minha aplicação com outras pessoas poderem contribuir. E uma vez que eu tenha compasrtilhado ele com gpl então esse código será distribuído com gpl para quem eu quiser. Posso alterar o código de outra pessoa o quanto eu quiser, posso recompilar ele, rodar em diversas máquinas sem nenhum problema, posso versionar esse código a vontade também. E essa idéia permitiu com que empresas e pessoas fisessem sua própria distribuição linux com propósitos diferentes, seja para servidor web, para usuário final para hackeamento de sistemas, tanto faz. O windows não tem isso, é tudo a microsoft que faz e se der problema a microsoft resolve para isso dizemos que ***ss licenças de uso tradicionais são fechadas e proprietárias*** e eu não posso ver o seu código fonte e nem utilizar-las e nem fazer engenharia reversa para poder descobrir.

As licenças tradicionais não permitem acesso ao código fonte de nenhuma maneira, nem para visualização, nem para contribuição. Mesmo que a engenharia reversa seja possível, tais licenças costumam citar explicitamente que é ilegal executar esse processo.

## Distribuições mais famosas

O debian é uma distro que existe desde 93 e ela (pela praticidade dela) formou uma comunidade poderosa e que formou diversos colaboradores que fundaram suas distros em cima dela, hoje inevitavelmente a Ubuntu é a distro mais amigável quando se fala do universo linux e ela é popular tanto no seu servidor quanto para seu desktop. E as versões LTS  (long term support) são versões com 5 anos de contribuição (as lançadas em anos pares) de forma a deixar o SO mais seguro e com updates, e as de ano ímpar são as que recebem features novas porém só nove meses de contribuição (tempos esses que podem mudar com o tempo).

Red Hat -> Lá atrás o Red Hat era uma empresa que desenvolvia para Linux, hoje ela tem sua própria distribuição para usuários finais e ela tem sua distribuição específica para empresas e ela dá suporte a empresas na utilização do Linux, a resolver problemas em servers e computadores que tem linux dentro de uma empresa além de oferecem aplicações a mais em quesitos de monitoramento e segurança em suas distribuições. Então eles ganham dinheiro com o seu suporte caso você queira claro.

Fedora -> Lugar onde a red hat testa seus recursos para serem operados em seu proncipal negócio. Ela não tem suporte mas pode ser interessante por ter muito que tem na red hat distro enterprise.

CentOs -> Muito parecido com a red hat, só que sem as coisas da red hat. A red hat dá suporte a máquinas que contenham o centOs.

Só nisso aí temos duas famílias, uma que se origina do debian como o Ubuntu e outra família que se origina da RedHat

Scientific Linux -> Versão do linux mantida pel comunidade científica e que tem diversos pacotes para produção de pesquisa científica. E tem diversos pacotes já prontos desse mundo e uma porrada de pacotes de usuário final que não estão presentes.

Linux Mint-> Distribuição para desktop assim como o desktop

openSuse -> distro para usuario final aberta tudo ok e linux suse-> Distro linux onde pode se comprar suporte 

Para ver mais: https://en.wikipedia.org/wiki/Comparison_of_Linux_distributions
https://en.wikipedia.org/wiki/List_of_Linux_distributions

O android é um sistema operacional que tem muitas características de linux, porém ele é feito para rodar em smartphones, que precisam de um modo de funcionar muito característico e além disso ele pegou um jeito de rodar códigos em java.

### Características de todos os Linuxes

Filesystem hierarchy standard -> Estrutura de diretórios, tipo o / é o root o /home o diretório de usuário, /bin os binários de um aplicativo poder rodar de qq local e onde tão comandos como o bin e o ls.

Linux standard base (lsb)->definição de como minhas bibliotecas e como os arquivos serão instalados no sistema. E para isso você tem que sustentar a instalação pelo RPM, isso não é um fato, até por que nem todo sistema é baseado no RPM (como o openSuse o Fedora e outros), mas tem algumas caracterísitcas que tem que se encaixar. E esses comandos que farão certos arquivos e programas serem instalados para todos os sistemas. É uma base comum para que tudo fique mais fácil de fazer um programa comum para todos os sistemas.

#### Softwares já instalados

Navegador firefox (podendo instalar o chromium no ubuntu software center por exemplo), para instalar qualquer coisa eu preciso estar como super usuário (sudo).

Thunderbird->gerenciador ou cliente de emails no linux assim como temos o aplicativo email no windows 10. O Thunderbird é um cliente de emails para linux. Por mais que o Firefox e o Chromium possam acessar sites como www.gmail.com, eles não são necessariamente um cliente de emails, mas sim um cliente HTTP.

Open Office/ Libre Office -> Uma office de graça e com suporte a arquivos da microsoft. Calc-> Excel, Empress->Power ponint, writer-> Word, Draw-> Fazer desenhos, Math-> Criar fórmulas matemáticas (para fins científicos), o problema é que o libre office ele tenta suportar o office mas existe alguns problemas de compatibilidade entre um e outro tal como fontes, equações e coisas do tipo. O LibreOffice e o OpenOffice são o pacotes equivalentes ao pacote Microsoft Office. Note que após a aquisição da Oracle, o OpenOffice tem um desenvolvimento separado do LibreOffice. Esse último passou a ser o novo padrão utilizado pela maior parte das distribuições Linux Desktop.

E essas três coisas são a maior parte das aplicações de um usuário final.

#### Variações de outros produtos versão open source

Gimp -> editor de imagem muito melhor que o paint, mas um pouco pior que o photoshop, porém ele é de graça

KDEnlive e OpenShot, cinelerra-> editor de vídeos

VLC -> excelente reprodutor de vídeos com vários codecs podendo ser reproduzidos. O VLC é um player de mídias muito conhecido e utilizado, conseguindo reproduzir suporte a muitos formatos. Além de ser conhecido e utilizado no mundo Linux, está também disponível para outros sistemas operacionais desktop, como Windows e Mac OS, e para sistemas móveis, como Android e IOS.

Inkscape->desenhos vetoriais, parecido com o ilustrator

Audacity -> edição de audio

Blender -> modelagem 3D e animação.A suíte para criação 3D open source e bastante utilizada no Linux é o Blender. O Blender é uma suíte completa para modelagens, animações, simulações, etc. Pode ser utilizado até mesmo para a criação de jogos.

Na prova não será exigido que você saiba utilizar o Blender. Para a prova é importante apenas saber que ele existe e sua utilidade.

### Linguagens já instaladas

Algumas linguagens de programação já vem instaladas no SO para nossa alegria :) As versões podem mudar e algumas linguagens também e para ver se termos ou nao o compilador de certas linguagens nós digitamos no terminal

```sh
gcc (compilador C)
java
perl
python
php
```

Além do shell que é a linguagem do próprio terminal

## Linux para servidor

Apache HTTPD -> Servidor famoso do mundo apache para o serviço HTTP, o apache é uma fundação de gente espalhada pelo mundo inteiro que fazem códigos open source. Posso baixar ele via ubuntu software ou via terminal e ele estará no meu localhost (127.0.0.1)

NGINX -> Outra bem poular

Essas duas dominam o mercado no servidor HTTP e aceitam as mais variadas linguagens e os mais variados tipos de site.

### LAMP

O LAMP é um pacote(bundle), com um conjunto de softwares que formam uma solução para o desenvolvimento Web. ***L***inux ***A***pache ***M***ySQL ***P***hp, esses que são muito utilizados no mundo Linux tem um nome especial e servem para lembrar o quão importantes essas aplicações são para quem desenvolve sites e sistemas no mundo Linux. Onde mysql é um banco de dados muito famoso e comunitário dentro da comunidade que usa o linux. E dentro do mysql surgiu outro banco de dados famoso que é o MariaDB.

### NFS

O NFS é um sistema de arquivos que funciona na rede. Dessa forma podemos compartilhar arquivos em um servidor e montar um diretório virtual em um computador. O usuário acessa o diretório como se fosse um diretório da máquina real, mas na verdade o diretório se encontra de fato no servidor.

Network File System-> sistema de arquivos distríbuidos criado com objetivo de compartilhar arquivos e diretórios entre computadores conectados em rede. Você tem acesso a eles na sua máquina mas fisicamente eles estão em um servidor, remotamente. Todo mundo pode acessar e você pode configurar listas de acessos a esses arquivos (como pode remover, pode modificar, pode upar tanto faz).

No windows é um tanto diferente (até tem aplicações para tal mas é um tanto restritivo) mas é que o windows tem seu próprio protocolo para compartilhamento de arquivos que é o samba servidor. E esse samba por ser bem aceito tanto no linux quanto no windows acaba sendo o mais utilizado para esse fim, de ser um servidor de arquivos em rede local

O Samba é o software que geralmente é utilizado para compartilhamento de arquivos quando possuímos clientes Windows na rede. Apesar de ser possível utilizar NFS com clientes Windows, no geral utiliza-se o Samba nesses casos.

#### Servidor de impressão

CUPS-> sistema de impressão modular, ele pode rodar na rede local ou em modo remoto.

Imagina que na sua empresa um cara atolou o sistema de impressoras por que ele precisa imprimir 10000 panfletos para serem distribuidos na cidade, você que só tem 1 folha de relatório precisa esperar isso acabar por conta desse cara? Não! Com um servidor de impressão eu posso ter esse trabalho dividido, não precisando esperar esse tempo todo para ter a impressão pronta. E esse servidor pode estar dentro do servidor do Samba.

### Servidor de Email

Um muito famoso é o postfix

Não confunda o app de usuário final (ou de cliente no caso), o thunderbird que está só preocupado em gerenciar seus emails. Assim como temos a diferença servidor de http que é o apache do cliente http que é o firefox.

### DNS e DHCP

DNS (Domain Name Server)-> Traduz o nome de um domínio para um endereço IP específico e manda e um servidor famoso em linux para esse fim é o BIND que centraliza muitos IPs. Dependendo da máquina se ele estiver em outra rede que for pedir ele me dá um outro IP pro mesmo site. Mas na mesma rede o normal é que ele armazene esse endereço pra não ter que ir lá o tempo todo pedir essa informação. 

DHCP server -> é um serviço que me dá endereços IP automaticamente, um famoso é o dnsmasq.

### Ubuntu Server

Um dos servers mais utilizados é o ubuntu server e nele você pode ter os mais variados tipos de serviço mas o especial nele é que diferente da versão desktop é que não há interface gráfica, como num windows server. é tudo via terminal, afinal para que interface se somente vamos rodar códigos nele não é? Isso é bom por que deixa o mesmo mais leve e prático para quem sabe. 

Então não espere um libre office da vida, sendo que não tem como ver isso aqui.

## O APT

Como você instala algo no linux somente com o terminal (como no caso do server?). Com um gerenciador de pacotes, lógico. E para buscar um determinado nome eu digito no terminal

```sh
apt-cache search nome
```

Achei algo interessante eu instalo com

```sh
sudo apt-install nome
```

O apt é um gerenciador de pacotes, isso é ele busca, baixa e instala pra mim o que eu encontrar com o nome que eu quero. Só que para isso eu preciso ser um superusuário, é uma das seguranças que o linux me impõe, de não baixar nada sem ter a certeza que eu sou o usuário. Ou seja `su` de superusuário e `do` de faça a instalação de `nome`. Aí ele vai pedir a senha e te informar o que tem com nome, se você fizer o comando sem o sudo ele simplesmente vai fazer nada.

E para remover algo:

```sh
sudo apt-get remove nome
```

Para ver o manual de uso do apt-get basta digitar

```sh
man apt-get
```

### Como que o terminal sabe os programas no apt-get?

E outra, como ele sabe que o programa, como um gcc, tem dependências (ou seja, ele depende de outros programas para fazer a instalação completa)? Como ele sabe versões do programa que eu estou instalando? 

O apt-get é só um serviço cliente, ele te manda as informações que são disponibilizadas por alguém de algum lugar desse mundo. E é daí que vem os repositórios (pastas de arquivos) e as dependências são bibliotecas.

Existem pacotes que são obrigatórios (depêndencias), uns que são recomendados, outros que são sugestões e outros que são aprimoramentos de pacotes que existem, o apt é uma central de aplicativos, bibliotecas e coisas a mais que o algumas SOs do linux usam para baixar coisas.

Para ver onde é essa central eu digito

```sh
cat /etc/apt/sources.list
```

E nele vemos diversos http e cada versão do SO tem um repositório específico e que pode ser atualizado constantemente e para estar integrado com isso nós damos sempre antes de instalar algo um:

```sh
sudo apt-get update
```

Para ver o que tem de novo nos repositórios e esses repositórios minha máquina sabe quais são e está em `/etc/apt/sources.list`. E apt vem de aptitude e é um gerenciador que veio do debian então não se surpreenda se ver um deb nesse arquivo sources.list e alguns links vem com br na frente por que quando baixa muita das vezes se baixa de um mirror situado no brasil, e isso agiliza o download.

Na versão 18 o link é `http://br.archive.ubuntu.com/ubuntu/bionic-backports`

O ubuntu software center é apenas um software front end que realiza todo esse back end sem se preocupar com terminal e digitar comandos certinhos. assim como o desktop todo é somente um front end que funciona em cima do terminal todo, uma coisa de ver isso é que no ubuntu temos o softwares & updates oferecendo uma interface gráfica toda para a gente.

Supondo que queremos apenas atualizar um programa, nós digitamos:

```sh
sudo apt-get install --only-upgrade nome
```

### Como instalo pacotes .deb ?

O .deb é a extensão de um pacote feito para debian, como estamos no ubuntu então digitamos

```sh
sudo dpkg -i pacote.deb 
```

Se der erro é por que ele depende de uma dependencia hahah só que as vezes é muita dependencia e aí você se fufu hahaha por que o dpkg só instala um por vez, por isso se usa o apt-get no dia a dia e se temos um pacote instalado e o resto não está eu posso escrever

```sh
sudo apt-get -f install
```

O -f apenas corrige a árvore de dependencias para mim

Para listar todos os pacotes instalados no meu sistema eu escrevo

```sh
dpkg --list
```

Isso é bom por que pode ter muito programa que já foi desinstalado mas ainda está no meu computador, tudo isso você pode ver com o `man`

O comando utilizado é `$ sudo apt-get -f install`. O `-f` é uma atalho para `--fix-broken` e tenta corrigir os pacotes que estão "quebrados", com dependências faltando.

Quando rodamos o comando, ele busca as dependências que estão faltando e configura o programa que estávamos querendo instalar inicialmente. Caso ele seja incapaz de encontrar todas elas, ele removerá o pacote instalado. De toda forma ele irá corrigir! :)

Você será informado sobre o que o comando irá fazer: se instalará novos pacotes, ou removerá o pacote inicial, instalado com o dpkg.

Por fim, como precisamos instalar ou remover pacotes, será necessário realizar a operação como superusuário.

## O RPM

Nem todos os SOs derivados do linux derivam do debian, os da red hat por exemplo são uma família própria. Isso faz com que nem sempre o gerenciador de aplicação seja baseado no dpkg, nessa leva existe os rpm e o yum. O rpm é um que existe no SO Fedora.

Para instalar o Fedora o preferível é a versão workstation, que é similar ao desktop do ubuntu.

Para listar todos os pacotes instalados eu digito:

```sh
rpm --query --all
rpm -q -a
rpm -qa
```

O linux tem um padrão de --nomedaaçao e simplificar isso para -n, ou seja de -- nome de tudo para - primeira letra do nome dessa ação

Você pode baixar um arquivo rpm de um site qualquer e depois instalar

```sh
rpm -i nome.rpm
```

E é normal ele não falar nada quando instala e dá certo. Dica de software: LYNX ver sites pelo terminal, muito foda.

Para remover o pacote eu escrevo

```sh
rpm -e nome
```

Você não precisa saber o nome do arquivo, basta digitar o nome do programa

Para gerenciar pacotes rpm podemos utilizar o Yum, que é equivalente ao apt no Ubuntu. O Yum contém um gerenciamento mais complexo de pacotes, conseguindo instalar a partir de um repositório remoto, resolver dependências, verificar por atuailizações, etc.

Atualmente as versões recentes do Fedora utilizam o dnf, um novo projeto que iniciou como um fork do yum, mas na prova seremos de fato cobrados pelo uso do yum. O fedora já acusa que o yum está velho e já roda por baixo dos panos o dnf(aceitando o yum como script válido) e vai partir pro dnf, que é mais novo mas a prova infelizmente ainda cobra o yum.

### Yum/dnf

Um SO que não chama o yum de velho e roda ele ok é o CentOs, para instalar coisas com ele eu faço:

```sh
sudo yum install nome
```

A primeira mensagem que você ve no CentOs é `Loaded Mirror Plugin` então ele ja detecta qual mirror é mais rápido de baixar coisas no SO. Inicialmente o CentOs parece que nao vai conseguir baixar nada mas aí pode ser problema de rede e que é corrigido como

```sh
nmclid d
nmtui
vai para edit e automaticamente conectar
systemctl restart network
```

Ai sim pode instalar com o yum no CentOs, o comando `nm` significa network manager.

Para procurar um arquivo

```sh
yum search nome
```

Ele detecta os mirrors mais próximos e te dá tudo com o nome nos repsoitórios remotos, e não necessariamente os nomes que tem para um SO tem no outro, a diferença é que no terminal ele me mostra as versões para processador.

Saber informações de um pacote

```sh
yum info nome
```

Remover pacote

```sh
yum remove nome
```

Atualizar os repositórios e atualizar o sistema

```sh
yum makecache
sudo yum update
```

A primeira vez que se roda o yum ele faz o makecahe
