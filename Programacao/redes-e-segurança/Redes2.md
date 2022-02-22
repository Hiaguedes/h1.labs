# Redes parte 2

Intenção criar uma rede corporativa que linka diferentes setores de uma empresa e que se conectam com diferentes provedoras de internet, todas com seus protocolos de acesso. Onde somente os gerentes acessam determinandos arquivos e sites.

Hoje em dia os hubs estão cada vez mais em desuso então ignore eles, saiba mais que ele fez parte da história e que deve-se respeito a eles.

Ligação entre switches usa-se o cabo crossover (já que eles são o mesmo equipamento). E liga eles serve para que possamos fazer uma comunicação direta entre setores diferentes.

![Comunicação entre setores diferentes](assets/com-setores.png)

## VLAN

VLAN (Virtual Local Area Network), afim de não mandar broadcast para todo mundo (no caso do protocolo ARP dentro do ping) nós podemos configurar os switchs de forma a separar nossa rede em segmentos menores e assim não poluir a rede de informações desnecessárias (no caso de uma grande empresa com mais de 200 computadores todos fazendo milhares de requisições ao mesmo tempo e sobrecarregando o sistema).

As Vlans (Virtual Lans) são usadas para segmentação de redes e priorização de tráfego. Hoje em dia as redes corporativas trafegam diferentes tipos de dados em suas redes, como por exemplo, podemos ter tráfego de dados, vídeo e voz e acaba sendo necessário lidar com esses diferentes tipos de tráfego de uma maneira a priorizar um sobre o outro.

Switches são mais baratos que roteadores e podem ser configurados de maneira igual.

Para configurar uma VLAN eu uso a CLI do switch e digito:

```
enable
configure terminal
vlan 2
name FINANCAS
CTRL+Z

configure terminal
interface fastEthernet 0/1
switchport mode access
switchport access vlan 2
exit
interface fastEthernet 0/2
switchport mode access
switchport access vlan 2

CTRL+Z
show vlan brief (para ver as nossas vlan)
```
Os números vlan 1,1002,1003, 1004 e 1005 são números reservados e não se usam mais. E basicamente configuramos uma vlan para as duas portas do switch de Finanças no projeto.

![Estado das vlans com o que acabamos de fazer, note que a fast ethernet 0/1 e 0/2 estão linkadas a ela enquanto o resto tudo tá em default](assets/vlan-brief.png)

Aí vamos fazer a VLAN de vendas para isso vamos configurar a CLI do switch da máquina de vendas

```
enable
configure terminal
vlan 3 (pra não confundir mude o numero da vlan)
name FINANCAS
CTRL+Z (ou exit, exit sobe uma na casa de prioridade)

configure terminal 
interface range fastEthernet 0/1 - 2 (macetinho aqui!)
switchport mode access
switchport access vlan 3
exit

CTRL+Z
show vlan brief (para ver as nossas vlan)
```

![Mesma coisa só que para a switch com as máquinas de Vendas](assets/vlan-brief1.png)

Pingando as máquinas vemos que os computadores de mesmo setor se comunicam mas de setores diferentes não se comunicam. Como se as duas redes estivessem completamente isoladas, sendo de redes diferentes sem um uso de roteador.

![O que fizemos até agora](assets/vlans.png)

## Portas Trunk

Agora imagine que queremos trocar o computador dos gerentes, ou seja nós queremos tirar o computador do gerente de vendas que está na vlan específica de vendas e botar na sala da de finanças e vice-versa. A principio o gerente de vendas ficaria incomunicável com sua equipe, isso mesmo habilitando a vlan de vendas no switch onde toda a equipe de finanças está. Para isso que existe as portas trunk. Com elas e com a conexão entre os switches eu posso habilitar diversas vlans de operarem.

Então para habilitar a porta trunk eu preciso estar na interface da conexão entre os switchs.

```
configure terminal
interface fastEthernet(ou Giga) 0/3(ou qq conexão que voê colocou)
switchport mode trunk
```

Isso habilita a comunicação entre membros da mesma vlan mesmo estando em switches diferentes.

![O computador do gerente de finanças se comunicando com o funcionário de finanças](assets/porta-trunk.png)

As portas trunk são portas configuradas para realizar o transporte de múltiplas Vlans entre Switches ou entre Switches e roteadores. Se você tentar comunicar os dois computadores sem habilitar a porta trunk você não vai conseguir comunicar com ninguém na real.

Agora o problema está em comunicar as duas VLANS, pois mesmo estando na mesma switch o gerente de finanças não consegue conversar com o funcionários de vendas.

## Comunicando VLANS

E como VLANS diferentes são de certa forma redes diferentes então eu preciso rotear essas redes, então precisaremos de um roteador para ajudar a conversar com essas redes.

E para isso preciso habilitar subinterfaces com as portas do roteador, para isso habilitamos as portas

Isso é obtido com equipamentos Switches Layer 3 ou no nosso caso através da criação de sub-interfaces no roteador. Essa configuração realizada no roteador é conhecida como Router on a Stick


Configuramos o DHCP das VLANS e fazemos:

```
ip dhcp pool VLAN2
network 192.168.2.0
exit
ip dhcp pool VLAN3
network 192.168.3.0
```

```
interface fastEthernet 0/0.1 (isso cria uma subinterface)
encapsulation dot1Q (numero da vlan no caso 2)

ip address 192.168.2.1 (aqui tem que ter a inteligicencia de configuar o dhcp da vlan 2 com 192.168.2.0)
```

Falta habilitar o switch para se comunicar com o roteador, e para ver todas as ligações do switch basta digitar o código

```
show running-config (sem estar no modo de configuração)
```
Então eu tenho que habilitar a interface do switch com o roteador de modo a trabalhar com o modo trunk, para isso basta fazer no CLI do switch

```
interface fastEthernet (ligação do switch com o roteador, no caso 0/5)

switchport mode trunk
```

Com isso conseguirei um IP DHCP para cada VLAN isso é útil para caso queira escalar o número de máquinas para cada setor. Porém ainda não me comunico com alguém do meu switch ou da minha sala, pois falta habilitar o default gateway. Então vamos fazer:

```
configure terminal
ip dhcp pool VLAN2
DEFAULT-ROUTER 192.168.2.1
exit
ip dhcp pool VLAN3
DEFAULT-ROUTER 192.168.3.1
```

![Habilitado a comunicação entre diferentes vlans](assets/com-entre-vlans.png)

Com isso consigo pingar entre todas as máquinas. Essa é a inportância de habilitar subinterfaces no roteador para poder trabalhar com diversas VLANS.

## Redundâncias

Shit happens! Nem sempre as pessoas tem o devido cuidado com os cabos que passam na sua empresa (e nem nos cabos que chegam a sua empresa também), então precisamos habilitar algumas redundâncias que ligam diferentes setores na sua rede.

Supondo que alguém desconecte o cabo que liga os switchs entre os setores e acabe desconectando uma sala importante da sua empresa com o roteador, isso causará prejuízos a toda a empresa então devemos fazer a seguinte ligação no sistema

![Redundância na rede](assets/redundancia.png)

Assim eu garanto que se uma das linhas do triângulo for cortada eu ainda tenho um caminho pro nosso dado seguir. Isso quebre a nossa transmissão um pouco, mas é só habilitar o modo trunk em todas as linhas do novo switch. Porém note que há um ponto laranja em um switch, isso quer dizer que o dado do switch novo com esse não será transmido.

Não esquecer de configurar a porta trunk para todas as ligações

## STP

Quando estabelecemos a comunicação com sucesso com uma máquina e o TTL não se zera é capaz de termos um looping da informação rodando entre os nossos switchs, e como temos uma redundância é capaz de termos essa informação para sempre guardada no looping formada entre elas, e é aí que temos o protocolo STP que quebra a informação de um desses links entre os switches, fazendo com que nosso sistema não se sobrecarregue quando vem uma nova requisição do nosso sistema.

Por isso que temos um switch desconectado do loop que criamos, mas por que exatamente esse? Por ele ter o maior endereço MAC de todos os três e ter um maior custo de mandar uma informação, então ele foi eleito pelo STP.

A velocidade da minha internet determina um custo para o meu switch poder se comunicar, e quanto maior a minha internet menor esse custo

![Custo](assets/stp-cost.png)

E as portas ligadas a meu switch root são chamadas de **portas root**, por terem o menor custo para o switch root. E as portas do switch root que estão ligadas aos outros switches são chamadas de **portas designadas**. E o switch principal (o que tem o menor endereço MAC) é o **switch root**

![STP e suas eleições](assets/stp-root.png)

O menor é que manda e esse protocolo é bem complexo. Pois imagine que uma rede corporativa tem diversos switches interligados e ele tem que escolher um switch que seja o mais importante da nossa rede e se ele escolher um que tenha baixo processamento de dados nossa rede se sobrecarregará muito, então a complexidade do nosso STP aumenta muito.

A análise que o protocolo STP realiza para eleger o Switch Root seria através dos valores de prioridade e endereço MAC presentes dentro do protocolo BPDU. Esse conjunto de valores de prioridade e endereço MAC é conhecido como Bridge-ID.

O primeiro critério que o STP irá analisar será o valor de prioridade, o Switch que apresentar menor prioridade será eleito como Root. Caso ocorra um empate entre as prioridades, o Switch irá analisar os endereços MAC e o que apresentar o menor endereço MAC é que será eleito como Root.

Então se uma dessas linhas cair a linha que está laranja (linha de backup) que é uma linha que está como modo alternativo (nem designado e nem root) passa a atuar e a ajudar a nossa rede.

Para verificar o estado de nossa STP nos switches nós temos o comando:

```cisco
show spanning-tree (filtro de vlan- no caso pode ser vlan 2)
```

Para alterar o switch root, basta entrar no CLI do switch que queremos que seja o root e digitarmos.

```cisco
enable
configure terminal
spanning-tree vlan 2 priority 0
spanning-tree vlan 3 priority 0 (o menor que manda)
```

No software da cisco fica um pequeno bug mostrando que todas as portas estão ligadas, mas se formos no CLI de um desses switches vemos que uma das portas está em modo alternativo (portanto desligada/bloqueada) pelo STP.

## Endereços B e C

Beleza, temos nossos IPs setados certinhos no DHCP do roteador da nossa empresa, mas e se quisermos alocar 300 máquinas para um setor da nossa empresa? O endereço de classe C por ter uma rede igual a 192.168.x.1 até 192.168.x.254 só podemos alocar 254 máquinas para a nossa rede. Isso é um problema que pode ser resolvido alocando outros tipos de endereço para as nossas máquinas. O endereço privado da classe B tem forma de:

```

172.16.x.x
Máscara de Rede: 255.255.0.0

Endereço de Rede 172.16.0.0
Endereço de Broadcast 172.16.255.255
```

Fazendo a transformação em binário da máscara de rede da classe B (que fica 11111111.11111111.00000000.0000000) nós temos que o número de redes disponível será de 2^(16)-2=65534 redes (número de zeros nos hosts elevado a dois, lembrando que temos que descontar os IPs de rede e de broadcast).

Tem muita rede disponível mas não é muito eficiente (pois abre muita brecha para comunicação externa).

Por ventura a classe A teria 2^(24)-2=16777214 endereços, e justamente por esses tipos terem um diferença tão grande de endereços disponíveis que elas sao chamadas de **Classful**, então uma empresa que quisesse 2000 endereços IP, teria que comprar endereço de uma classe B e enfiar todas as restantes no lugar nenhum. E para isso você alterará os bits da máscara de rede para que uma classe atenda melhor ao que queremos.

Supondo que queremos 300 máquinas com endereços IP, para isso temos que usar endereços de classe B, porém nossa máscara de rede ficará da seguinte maneira

```bin
300 = ‭0001 0010 1100‬ (9 bits)
Como precisamos de 9 bits então a nova máscara de rede fica 1111111.11111111.11111110.0000000

O que em decimal nos dá:
255.255.254.0
Isso nos dá um número de endereços IP iguais a 2^9 -2 = 510
```

Essa seria a máscara de rede que nos daria uma melhor eficiência na hora de distribuir 300 IPs. E para essa mudança na máscara dew rede nós dizemos que ela segue um padrão **Classless**

### Classless Inter-Domain Routing

No exemplo anterior se contássemos os números de 1's da mascara de rede nós encontraríamos 23 e como o IP de rede é 172.16.0.0, então o Classlesse Inter-Domain Routing é dado por

```
CIDR: 172.16.0.0/23 
```

A representação /x refere-se a x números 1 que temos na máscara de rede para x<32 >, o restante seria 0 (32-x zeros, a direita dos 1s), então uma máscara de rede /19 seria

```
11111111.11111111.11100000.00000000
255.255.224.0
```

Aí para encontrar os valores das sub-redes seguintes eu teria que encontrar o valor em decimal de onde tem a transição de 0 para 1, exemplos:

```
1111111.11111111.11111110.0000000->transição no bit 1 do terceiro octeto, portanto o número decimal 2 no terceiro octeto


11111111.11111111.11100000.00000000->transição no bit 5 do terceiro octeto, então 32 no terceiro octeto
```

O que nos deixa com os seguintes valores de subredes:

Endereço IP de rede 172.16.0.0
Endereço IP de broadcast 172.16.255.255

Para a máscara de rede 1111111.11111111.11111110.0000000
|número da sub rede|Sub-rede|sub-rede de broadcast
|---|---|---|
|Sub rede 1|172.16.0.0|172.16.1.255|
|Sub rede 2|172.16.2.0|172.16.3.255|
|Sub rede 3|172.16.4.0|172.16.5.255|

Para a máscara de rede 11111111.11111111.11100000.00000000
|número da sub rede|Sub-rede|sub-rede de broadcast
|---|---|---|
|Sub rede 1|172.16.0.0|172.16.31.255|
|Sub rede 2|172.16.32.0|172.16.63.255|
|sub rede 3|172.16.64.0|172.16.95.255|

E por aí vai. Desde que o octeto não passe de 255. O endereço de broadcast da subrede atual é sempre 1 endereço antes do endereço de rede posterior. Um site que faz essa conta automaticamente para gente é o 

Online IP subnet calculator https://wintelguy.com/subnetcalc.pl
, por exemplo para o com máscara de rede 11111111.11111111.11100000.00000000 ou /19

![Cálculo das subnets](assets/subnetting.png)

Só que nesse exemplo aqui nós passamos de 172.16.x.x, o que já deixa de ser uma rede privada. Mas pra exemplo didático tá de boa.

Alocando no endereço de classe B 172.16.2.0, queremos alocar IP em 100 computadores e nisso nós teríamos nós teríamos:

```
100 = 110 0100
Máscara de rede: 11111111.11111111.1111111.1000000=255.255.255.128

transição no bit 7 do quarto octeto
```

Para um ip 172.16.2.0

|número da sub rede|Sub-rede|sub-rede de broadcast
|---|---|---|
|Sub rede 1|172.16.2.0|172.16.2.127|
|Sub rede 2|172.16.2.128|172.16.2.255|
|sub rede 3|172.16.3.0|172.16.3.127|

### Configuração das sub-redes no Packet Tracer

No roteador a gente faz:

```
enable
configure terminal
ip dhcp pool VLAN2
network 172.16.0.0 255.255.254.0
default-router 172.16.0.1
exit

ip dhcp pool VLAN3
network 172.16.2.128 255.255.255.128
default-router 172.16.2.129
CTRL+Z
```

Só que falta habilitar as portas de modo a trabalhar de acordo com o default-router que especificamos

subinterface 0/0.1->finanças

0/0.2->vendas

```
interface fa 0/0.1
ip address 172.16.0.1 255.255.254.0
exit
interface fa 0/0.2
ip address 172.16.2.129 255.255.255.128
```
E dessa forma tenho comunicação com todo mundo

![Comunicação das máquinas com nova IP otimizada](assets/subnet-com.png)
