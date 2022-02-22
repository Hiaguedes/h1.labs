# Linux LPI parte 11

Essa parte fala sobre o seu computador na rede, rede essa sendo a internet ou a rede local da sua casa ou uma grande intranet.

O curso de redes ajuda aqui, mas inicialmente somente precisamos diferenciar o IP (que é o numero da máquina) e o DNS (que é o nome de uma máquina registrada em algum lugar). E como é mais fácil decorarmos um nome de uma pessoa que o número dela então usamos o serviço DNS para nos comunicar com a rede

## Ferramentas no linux para redes

```sh
dig <nome do site>
```

Nos trás informações de acesso para um nome de um site qualquer, como o ipv4 de onde esse site está hospedado

```sh
ping <endereco de IP>
```

Nos mostra o tempo de conecção de ida e volta para um endereço qualquer, se você não consegue saber o ping de um site é por que um dos computadores em algum lugar bloqueou essa informação, como se quisessemos saber o ping de <https://www.naver.com/> que é um google coreano

Para pingar em um endereço ipv6 usamos o `ping6` o ping foi feito pro ipv4

O ipv6 veio a aumentar o numero de endereços disponiveis na rede e tem 4 numeros hexadecimais em 8 octetos, então ffff em decimal significa 65535

Base hexadecimal, espaço de endereço muito maior, o envios de pacotes.

O IPV6 é feito com base hexadecimal e suporta mais endereços IP do que o IPV4. Além disso, o envio de pacotes dele é mais rápido.

Para descobrir o ip da minha maquina é o

```sh
ifconfig
```

O `ipconfig` é do windows não confunda, o comando `ifconfig` tras configurações de quantas placas de rede você tiver mais o do endereço de loopback (que seria uma comunicação consigo mesmo, de nome lo)

Outro comando legal de se saber é o `host`

```sh
host <nome do site>
```

Ele te dá o ip daquele site especifico e diz o nome desse site é um apelido para outro site

O localhost é padrão e vale `127.0.0.1` e para verificar se temos problema de conexão com essa máquina nós fazemos

```sh
ping localhost
```

E a esse endereço damos o nome de endereço de loopback e se formos ver a pasta `/etc/hosts` vemos outros apelidos além de que o endereço `::1` pode ser usado para hosts ipv6 (no windows basta dar um cat em C:Windows/System32/drivers/etc/hosts) que veremos um arquivo parecido. Nesse arquivo conseguimos dar nomes para máquinas diferentes

Podemos ver as rotas determinadas pelo seu computador pelo comando

```sh
route
```

Com esse comando vemos quais os caminhos que o seu computador irá redirecionar suas requisições

A pasta `/etc/resolv.conf` resolve quais são os endereços DNS do nosso host

O comando `ip route show` nos mostra as rotas possíveis de uma forma mais condensada que o `route`, o comando `ip` nos permite mudar diversas configurações de ip da minha máquina

### Pergunta

Otávio entrou no setor de infraestrutura de redes em uma empresa financeira. Foi pedido a Otávio para fazer um levantamento dos IPs da empresa. Ao acabar de fazer o levantamento, ele ficou curioso para saber quais seriam os comandos alternativos para ifconfig e route.

Quais são os comandos alternativos para ifconfig e route conforme foi mostrado na aula?

O ip route show e o ip addr show são comandos alternativos,o route mostra as rotas e o addr mostra os IPs já configurados.

O comando Ifconfig -a mostra todos os IPs

O comando ping6 para pingar IPs que estão utilizando IPV6(Caso você esteja utilizando IPV4 este comando não vai funcionar)

O comando ip route show para mostrar todas as rotas já configuradas

O comando ip addr show para mostrar todos os IPS que estão configurados

## O netstat

O netstat nos mostra a quantidade de portas conectadas e que podem se conectar com nossa máquina, assim como para acessar um site eu me conecto a porta 80 um servidor pode se conectar com seu sistema por uma porta de numero qualquer.

`netstat -l` mostra as portas que estão escutando

`netstat -t` nos mostra com quem eu me comunico com o protocolo TCP

`netstat -n` nos mostra o numero da porta que tem comunicação aberta

`netstat -s` nos mostra estatísticas de conexões de rede

Listar os processos de uma porta específica através do comando netstat -tlnp | grep “número da porta”
