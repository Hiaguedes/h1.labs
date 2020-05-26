# Redes parte 3

O objetivo é usar o que foi visto na parte 2 e implementar um servidor com acesso somente para os gerentes dos setores e um acesso a rede internet com um provedor de serviços pelo roteador que liga a rede de todo mundo.

## Implementando um servidor

O primeiro passo é consigurar uma vlan para a comunicação própria do servidor

```cisco
enable 
configure terminal
vlan 4
name SERVIDORES
```

E configurar a porta do switch para trabalhar com a vlan do servidor

```cisco
configure terminal
interface fa 0/10
switchport access vlan 4
```

Aí eu vou no roteador e configuro o tipo de subinterface que vai trabalhar com a vlan do servidor

```cisco
enable
configure terminal
interface fa 0/0.3
encapsulation dot1Q 4
```

E depois disso configurar um ip para essa máquina

```cisco
ip address 172.16.3.1 255.255.255.128
```

No caso adotamos um IP estático e que está dentro da sub rede de vendas que tem 100 e poucas máquinas para cada rede.

Agora falta fazer com que os outros switches saibam que a vlan SERVIDORES existe e fazemos no CLI deles

```cisco
enable
configure terminal
vlan 4
name SERVIDORES
```

E aí eu consigo acessar o site dos 4 computadores

![acesso ao site](/assets/acesso.png)

código html

```html
<html>
<center><font size='+2' color='blue'>Servidor Multilidae</font></center>
<hr>Seja Bem vindo ao site
<br>
<input type="text" placeholder="Nome">
<br>
<input type="password" placeholder="Senha">
<br>
<br>
<button type="submit">Logar</button>
</html>
```

Só ir em webbrowser no Desktop em um dos pcs e acessar o IP do servidor

## Lista de Acesso

Quando me conecto via browser com um servidor que contém um site primeiro o meu computador manda um protocolo TCP para os switches, dos switches pro roteador e do roteador para o server para que o server me dê o acknowledge dizendo que ele foi reconhecido e que pode mandar o acesso daquela página para o computador que mandou o protocolo, esse protocolo volta para o computador e assim que ele é liberado começa o protocolo HTTP que vai requisitar a página de fato.

E com isso habilitamos listas de acessos necessárias no roteador, a analogia é que tem um segurança no roteador barrando e permitindo entradas de determinados IPs para uma determinada festa que está acontecendo no servidor. E é pelo protocolo TCP que conseguimos fazer isso.

Listas de acesso ou do inglês (ACL) são listas as quais contém políticas de permissão ou negação de acesso por parte de clientes. Dessa forma, conseguimos criar políticas por usuário de quais protocolos e serviços que podem ser utilizados.

Para criar isso no IP da cisco eu faço

```cisco
enable
configure terminal
ip access-list extended SERVIDOR-GERENTES
permit tcp 172.16.2.131 0.0.0.0 172.16.3.2 0.0.0.0
```

O comando `permit access` tem a seguinte sintaxe tcp (do protocolo que eu quero ver), ip da máquina que eu vou permitir o aceso, wildcards (que números eu quero que sejam exatamente iguais, 0 para exatamente igual a esse octeto e 255, para qualquer número dentro desse octeto), ip da máquina que esse acessp será permitido.

De forma que o comando `permit tcp 172.16.0.2  0.0.0.255  200.1.2.3 0.0.0.0` nos daria o endereço IP de origem serão todos que iniciarem por 172.16.0, já o endereço IP de destino será 200.1.2.3

Só que para não ocorram nenhum erro no futuro eu preciso voltar com IP estático para os gerentes, pois caso ocorra alguma troca de IP por qualquer motivo eu não precise refazer a configuração de acesso tudo de novo, então aloca os IPs dos gerentes de forma estática e excluo no dhcp os dois IPs para que esses dois ips não sejam alocados de forma dinâmica

```cisco
ip dhcp excluded-address 172.16.2.131
ip dhcp excluded-address 172.16.0.3
```

E se formos ver nos computadores dos funcionários vemos que eles ainda tem acesso ao servidor, pois falta dizer ao roteador que ele precisa mandar essa informação para as vlans nas suas subinterfaces.

```cisco
Router(config)#interface fa 0/0.1
Router(config-subif)#ip access-group SERVIDOR-GERENTES in
```

Pois na nossa topologia todas as formas de comunicação primeiro entram no roteador para aí mandar pro servidor.

Aí tenho que fazer para a outra subinterface

```cisco
Router(config)#interface fa 0/0.2
Router(config-subif)#ip access-group SERVIDOR-GERENTES in
```

E dessa forma tenho o acesso somente para os gerentes. E quando temos um IP inválido requisitando por HTTP a entrada no servidor o roteador mata a requisição ali e dará um `request time out` nesse PC.

Só que se requisitarmos a comunicação de um pc de um para o outro do lado nós temos

![Comunicação passou a não ser mais estabelecida](/assets/unreachable.png)

## Como habilitar outros tráfegos de rede

Uma vez que você abre a lista de acesso o roteador somente olha a lista de acesso para os protocolos que você mandou e nada mais.

E pra isso primeiro vamos mudar o que fizemos

```cisco
Router(config)#ip access-list extended SERVIDOR-GERENTES

Router(config-ext-nacl)#permit tcp 172.16.2.131 0.0.0.0 172.16.3.2 0.0.0.0

Router(config-ext-nacl)#permit tcp 172.16.0.3 0.0.0.0 172.16.3.2 0.0.0.0

Router(config-ext-nacl)#deny tcp 172.16.2.128 0.0.0.255 172.16.3.2 0.0.0.0

Router(config-ext-nacl)#deny tcp 172.16.0.0 0.0.0.255 172.16.3.2 0.0.0.0

Router(config-ext-nacl)#permit ip any any 
```

Basicamente refazemos a access-list anterior mas negamos a comunicação de qualquer rede de ip 172.16.0.x e 172.16.3.x pra se comunicar com o servidor e se não tiver nada em relação a isso eu libero a comunicação com o ip any any.

Uma vez que estamos colocando any, isso indica que qualquer endereço IP de origem assim como qualquer endereço IP de destino será aceito. Essa configuração é comumente utilizada nas listas de acesso para permitir que todo tráfego que esteja fora do nosso foco da lista de acesso continue funcionando normalmente.

A política de acessos é feita de maneira sequencial, então o que você quer que seja aceito ou negado tem que ser colocado em primeiro na lista, mas não se esqueça de colocar o ip any any pois isso negaria todos os outros

## Conectando a INTERNET

Conseguimos muitos avançamos internos, com as VLANS, os servidores e políticas de acesso com os servidores, porém a empresa precisa de internet para poder avançar e desenvolver seus projetos. Ai contratamos uma net, vivo whatever, como que conecto isso na minha rede interna?

Quando contratamos um serviço, ele liga com cabo de um poste de energia e liga com a nossa casa em um ponto de demarcação, onde a área externa é responsabilidade da empresa e do ponto de demarcação para nossa empresa é responsabilidade nossa de manter. E desse ponto atualmente eu ligo de um rj45 para o meu roteador, mas antigamente era comum ligar do WallJack para um CSUDSU em um cabo do tipo serial .

Então precisamos salvar a configuração do roteador interno com `wr` instalar uma placa chamada WIC-1T nos dois roteadores e conectar-los com um cabo Serial DCE

Então primeiro eu ligo a porta com:

```cisco
enable
cpnfigure terminal
interface serial 0/1/0
no shutdown
```

Agora eu preciso de um IP público para meu roteador interno

Os endereços IP privados são usados somente para comunicação em uma rede interna, diferentemente dos endereços IP públicos que são usados para comunicação na internet

A conexão desse ponto demarcador era realizada com um equipamento chamado de CSU/DSU (Channel Service Unit/Data Service Unit). Tal equipamento era responsável por converter o sinal fornecido pelo provedor de serviços para uma transmissão serial, atuando como um modem. Dessa forma, utilizava-se um cabo serial, sendo o mais comum um cabo chamado de V.35 para conexão com uma placa serial presente no roteador.

Hoje em dia, essa conexão serial foi substituída pela conexão com o cabo de rede que estamos acostumados uma vez que o equipamento CSU/DSU já está presente nas placas de redes dos roteadores empresariais mais modernos, não sendo necessário mais o uso dos cabos seriais. Embora, os cabos seriais hoje em dia não sejam mais utilizados, sua representação é comum em diagramas de rede como referência a conexão a rede de uma outra empresa.
