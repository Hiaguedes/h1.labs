# Redes 5

Essa parte é exclusicamente focada na rede Wi-Fi, pois a rede wifi para usuários finais significa uma liberdade de locomoção para usuários que estão dentro de uma rede, não sendo limitadas pelos cabos e dando voz a smartphones e coisas do tipo. Mas aí vem uma série de coisas novas que devemos saber.

Tais como `SSID` -> O `SSID` (Service Set Identifier) é um texto de até 32 caracteres que identifica as redes sem fio. É esse nome que os dispositivos utilizam para se conectar (é o nome da rede)

Ponto de acesso -> é um ponto conectado no switch que se comunica com o roteador e esse nos dá um endereço IP pelo DHCP e conecta outros dispositivos (laptops e celulares) pelo ar. Para conectar com a rede wifi no Packet Tracer nós devemos trocar a placa de rede padrão por uma wifi

## SSID, BSSID e ESSID

Para alterar o nome que aparece para os dispositivos, fomos até a opção `SSID` do ponto de acesso.

O `SSID` é o nome do ponto de acesso, os dispositivos, como notebooks, celulares, entre outros, utilizam esse nome para se conectarem.

Cada ponto de acesso tem seu `SSID` que o identifica na rede. Em alguns casos, podemos ter na mesma rede vários pontos de acesso com o mesmo `SSID`. Neste caso, é comum ouvir o termo `ESSID` (Extended Service Set ID).

Mas se o `SSID` identifica cada ponto de acesso na rede, como o dispositivo consegue saber qual o access point que ele está conectado?

No primeiro curso de redes, vimos que existem os endereços IPs que s os computadores utilizam para se comunicar e além dos endereços IPs, existem os endereços MAC. Esses endereços são fixos e associados a placa de rede do dispositivo.

Quando utilizamos vários `SSID` na mesma rede, as máquinas utilizam o endereço MAC para saber qual o access point que estão conectadas. Em redes sem fio, isso é chamado de `BSSID` (Basic Service Set ID).

O `BSSID` nada mais é do que o endereço MAC do ponto de acesso. Mesmo sem ter mais de um access point com o mesmo nome, os dispositivos sempre utilizam o `BSSID` para realizar a comunicação com o ponto de acesso.

Ou seja,

- O `SSID` identifica o ponto de acesso na rede;
- O `BSSID` é o endereço MAC do ponto de acesso
- O `ESSID` é o conjunto de pontos de acesso com o mesmo nome, isto é, o mesmo `SSID`

## SSID oculto

Os dispositivos "enxergam" o SSID e escolhem em qual rede desejam se conectar. Isso acontece pois, por padrão a maioria dos pontos de acesso fica emitindo o nome da rede todo o tempo, ou seja, ele fica fazendo um broadcast do SSID.

Todos os dispositivos que chegam ao alcance do sinal do ponto de acesso recebem essa mensagem de broadcast. Contudo, nós podemos configurar um access point para não realizar o SSID broadcast.

Essa configuração é chamada de SSID oculto e alguns a consideram uma medida para aumentar a segurança. Como o nome da rede não fica visível, teoricamente, é possível evitar alguns tipos de ataque.

Porém, devemos lembrar que o SSID não é uma senha. Ele apenas é o nome que identifica o ponto de acesso, por isso, ocultar o SSID e não implementar outras medidas de segurança, como definir uma senha para rede, um algoritmo de criptografia, entre outras coisas, é uma falha de segurança. Além disso, mesmo com o SSID oculto, existem meios de conseguir descobrir o nome da rede.

Também, ocultar o SSID pode dificultar um pouco a usabilidade da rede, já que os usuários precisarão informar ao dispositivo qual o SSID (mesmo oculto, o dispositivo precisa conhecê-lo, já que é o SSID que identifica a rede sem fio), qual o protocolo de segurança, criptografia, entre outras configurações para poder se conectar.

## Padrões de redes Wi-Fi

Vimos que existem diferentes padrões de redes sem fio.

Padrões como o 802.11a, 802.11b/g/n. Além desses, existem outros padrões. Um padrão que começou a ser muito utilizado recentemente é o 802.11ac.

Apesar desse padrão não ter sido lançado ainda, o lançamento está previsto para 2020. Alguns dispositivos, como celulares, notebooks, e até pontos de acesso, já implementam esse padrão.

Esse padrão é compatível com o 802.11a e 802.11n. Da mesma forma que o padrão 802.11n, ele também utiliza o conceito múltiplas entradas e múltiplas saídas para ampliar e manter o sinal estável.

Além desses, existem outros padrões de redes sem fio. Cada um deles especifica algo nas redes sem fio. Como a segurança, por exemplo.

Cada padrão tem uma velocidade e uma frequência específica, o padrão a foi o primeiro e ele tinha 5 GHz e transmitia 56Mb/s, com o passar do tempo as frequências de rede wifi passaram a ser de 2.4 Ghz pois essa frequência era muito próxima de frequências em aparelhos domésticos, o tempo foi passando e foram surgindo padrões diferentens de mesma frequência (2.4 GHz) e que puderam transmitir mais informação, chegando no padrão n que transmite 300 Mb/s , todas menos o padrão a conseguem se comunicar entre si (justamente por causa da frequência). Os ultimos padrões tem conseguido essa taxa de transmissão pela tecnologia MiMo que acopla um processador em seu hardware que consegue ter um balanceamento de carga melhor na transmissão e recepção de dados, tendo mais antenas e uma performance legal.

Um site legal é que fala sobre esses padrões é esse aqui esse aqui <https://www.lifewire.com/wireless-standards-802-11a-802-11b-g-n-and-802-11ac-816553>

## Botando tudo isso no Packet Tracer

ãos à obra!
PRÓXIMA ATIVIDADE

Vamos começar a configurar a rede sem fio. Precisamos de um dispositivo que emita sinais wi-fi. Por isso, vamos adicionar um ponto de acesso (access point, em inglês):

Ponto de acesso

Temos que conectar esse ponto de acesso no switch:

Ponto de acesso conectado ao switch

Bacana! Agora precisamos testar para ver se tudo está funcionando de acordo. Portanto, vamos colocar um laptop na rede

No Packet Tracer, por padrão, os laptops não vem com uma placa de rede sem fio. Ou seja, para nos conectar ao ponto de acesso precisamos trocar essa placa.

Para isso, clicamos no notebook e vamos até a aba physical. Desligamos o laptop e retiramos a placa que vem com ele e colocamos a placa de rede que o próprio Packet Tracer sugere:

Adicionando interface sem fio

Após um tempo, o laptop conectará com o ponto de acesso. Vamos checar para ver se o notebook está se comunicando com a rede. Para isso, vamos até a aba Desktop e acessar o prompt de comando e fazer um ping para o roteador:

Pingando o roteador

O notebook está conseguindo se conectar com o roteador, mas como ele se conectou na rede? Isto é, como a conexão com o ponto de acesso foi feita?

Por padrão no Packet Tracer, os dispositivos sem fio já vem com um nome padrão (Default) configurado. Esse nome é aquele que procuramos quando nos conectamos nas redes sem fio, o SSID. O SSID define o nome do ponto de acesso na rede. Ele é o nome da rede sem fio. O nome Default não tem muito significado semântico para nós, podemos alterá-lo para que fique fácil indicar qual esse ponto de acesso. Para isso, temos que alterar a opção SSID no ponto de acesso:

Alterando o SSID

### Adicionando outro ponto de acesso na rede

Chegou outra desenvolvedora na empresa. Portanto vamos colocar outro notebook na rede e, como fizemos antes, temos que colocar uma placa de rede sem fio:

Adicionando a placa de rede ao novo notebook

A placa de rede que colocamos nesse notebook não permite que acessemos a interface gráfica para conectar, por isso, vamos utilizar a aba Config e ir até a opção Wireless0:

Configurando a rede no segundo laptop

Como vimos em vídeo, o laptop não consegue se conectar nesse ponto de acesso, o padrão é diferente.

Enquanto a placa de rede que colocamos no laptop segue o padrão 802.11a, o ponto de acesso trabalha nos padrões 802.11b/g. Logo, eles são incompatíveis entre si.

Temos algumas soluções possíveis para isso:

Podemos trocar a placa de rede do laptop;
Colocar mais um ponto de acesso na rede que funcione no outro padrão;
Trocar para um ponto de acesso que funcione com os todos os padrões.
Todas essas opções podem ser viáveis, tudo depende de como a empresa enxerga cada estratégia. No nosso caso, vamos adicionar outro ponto de acesso na rede:

Adicionando o segundo ponto de acesso na rede

Como os access points trabalham em padrões diferentes eles podem ter o mesmo SSID. Porém, uma abordagem comum também é colocar como sufixo no SSID a letra do padrão. Ficando, por exemplo, DesenvolvimentoA

Alterando o SSID do laptop para DesenvolvimentoA

Agora, basta alterar o SSID do segundo ponto de acesso:

Alterando o SSID do ponto de acesso para DesenvolvimentoA

Pronto, temos os dois notebooks conectados

## Fatores que atrapalham o sinal do Wi-fi

- Distância física do ponto de acesso, afinal quanto mais me afasto do ponto de acesso mais fraco o sinal fica até um ponto que já era o sinal

- Barreiras Físicas, quanto mais paredes e obstáculos físicos eu tenho mais atenuado fica o sinal (isso pode ser aumentado com repetidores de sinal).

- Eletrodomésticos que trabalham perto da frequência do sinal do roteador podem se misturar com o sinal do wi-fi, como microondas, celulares e até outros pontos de acesso hahaha

### Como corrigir isso?

App legal para ver a interferência de outros sinais wi-fi `<Wi-Fi Analyser>`

Mudando os canais do wifi, isso é invés de dizer que a rede trabalha a 2.4 GHz, dizer que trabalha a 2.412 GHz, isso já é o suficiente para fazer com que naquela região teremos um wifi único, e por isso muita gente opta pelos canais 1 , 6 e 11. Alguns países como o Brasil podem ter 13 canais, outros s;o podem ter 11, alguns até o 14 como o Japão. Os de padrão A costumam ter canais mais altos para não interferir o canal de ninguém.

#### Alterando ponto de acesso

Vamos começar adicionando o switch que fará parte do departamento que estamos inseridos. Esse switch precisa estar conectado ao roteador, portanto, podemos conectar outro switch central, este se conecta ao roteador e aos outros dois switches:

Adicionando o switch na rede

Como essa nova rede também será uma rede sem fio, portando, também vamos adicionar um ponto de acesso nessa rede. Como já conhecemos os padrões de wi-fi, que tal adicionar um ponto de acesso no padrão 802.11n?

Adicionando o ponto de acesso na rede

Agora, precisamos configurar seu SSID, de uma forma análoga como fizemos com o access point de desenvolvimento, só que neste caso, vamos colocar o nome da rede como Comercial:

Alterando SSID

Já temos tudo configurado. Agora, podemos adicionar os laptops do comercial. Lembrando, que precisamos alterar a placa de rede sem fio. Vamos colocar a placa WPC300N:

Trocando placa de rede

O que precisamos fazer agora é conectar o laptop na rede:

Conectando laptop na rede

Alterando o canal dos pontos de acesso
Uma forma de evitar interferências no sinal das redes sem fio é alterar o canal em que elas trabalham. vimos que redes que trabalham no mesmo canal causam interferências umas as outras. Logo, modificar o canal do ponto de acesso, é uma forma de poder melhorar o sinal na rede.

Como temos duas redes que trabalham na mesma frequência, a de desenvolvimento e a do comercial, vamos alterar seus canais. No caso da rede de desenvolvimento colocaremos ela no canal 1, enquanto o ponto de acesso do comercial configuramos para o canal 2.

Para realizar essa alteração, basta clicarmos no ponto de acesso e ir na opção de configuração. Lá avistamos a opção 2.4 GHz Channel:

Alterando canal do ponto de acesso do desenvolvimento

Vamos fazer o mesmo para o ponto de acesso do comercial, com a diferença que colocaremos seu canal como 11:

Alterando canal do ponto de acesso do comercial

Bacana! Alteramos os canais dos dois pontos de acesso que trabalham na mesma frequência, mas e o ponto de acesso que está no padrão 802.11a, não precisamos alterar seu canal?

Como esse ponto de acesso trabalha em uma frequência diferente, o sinal que ele emite não atrapalha o sinal dos outros wi-fi. Apenas dispositivos que trabalham na mesma frequência, ou em frequências próximas, distorcem o sinal.

Alterar os canais de uma rede sem fio pode ocasionar em uma boa melhora de seu sinal. Como este não sofre, ou sofrerá menos, interferência, ele ficará mais integro.

## Segurança no Wi-Fi

Como o ponto de acesso utiliza o ar para mandar as informações então todo mundo que se conecta a ele recebe as informações que todas as pessoas estão mandando, pois o ponto de acesso não é inteligente o suficiente para mandar a informação para uma pessoa somente (isso explica muito por que wifi de shopping é um cocô), pois um ponto de acesso lembra muito um hub.

Então alguém mal intencionado pode interceptar suas informações se não houver uma criptografia nesse sinal né. E é isso que realmente tem, vamos conhecer o wpa e o wpa2.

Isso sem falar nas senhas né, pois uma rede que todo mundo usa (até pessoas indesejadas) é uma rede que ninguém usa.

### WEP

Uma das primeiras criptografias a serem criadas e ela foi criada com a intenção de ser uma rede que dispõe do mesmo privilégio de redes cabeadas.

Criar uma senha para ela é somente para digitos que tenham equivalentes aos digitos em hexadecimal. Ou seja as senhas só aceitam digitios que vão de 0 até 9 ou a até f.

Problemas: Todos os usuários detinham uma mesma chave para receber e enviar arquivos, então como todo mundo tinha a mesma chave, quebrar a informação de outra pessoa ainda continua sendo fácil.

Um man in the middle poderia descobrir a senha do wifi durante o período de autenticação de um dispositivo final com a rede. (autenticação é a capacidade de descriptar um arquivo antes de se conectar com a rede principal) e esse cara no meio conseguia o arquivo que o roteador mandava e a resposta pelo vetor de inicialização e com isso por meio de algoritmos ele conseguia a senha da rede.

Por isso essa criptografia não se usa mais.

## WPA

O wpa e o wpa 2 trabalham com chaves publicas e privadas para a criptografia, e com chaves de maior tamanho. Além do mais ele usa um vetor de inicialização maior (48 bits) e sua senha não precisa ficar restrita a numeros hexadecimais, pode ser qualquer coisa.

Algumas distribuições com foco em segurança, como o Kali Linux, possuem ferramentas que permitem realizar testes de penetração em redes sem fio. Essas ferramentas possuem modos que conseguimos capturar pacotes de redes em fio mesmo sem estar conectado.

Porém o wpa permite um ataque do tipo dicionário, então se selecionarmos uma senha fraca, meio que já era. O wpa2 aumenta tudo (tamanhos de chaves, vetor de inicialização) e mais criptografia. Tornando muito dificil o hackeamento de senhas, sendo mais provavel usar a engenharia social para isso.

### maos a obra

As mensagens que o ponto de acesso enviam sempre vão para todos os dispositivos que estão no alcance do Wi-Fi.

Deixar essas mensagens desprotegidas causa uma insegurança na rede, já que, qualquer um que está no alcance do sinal do ponto de acesso consegue capturar os pacotes. Uma forma de proteger essas mensagens é por meio da criptografia.

Os pontos de acesso têm alguns padrões de criptografia, WEP, WPA, WPA2. Por recomendação, devemos utilizar o WPA2, já que ele garante uma melhor segurança.

Vamos começar colocando a autenticação para o ponto de acesso do comercial. Portanto, neste ponto de acesso, na aba Config, vamos até a opção Authentication e selecionamos a opção WPA2-PSK.

O ponto de acesso pedirá uma palavra passe, ou seja, a senha do ponto de acesso. No meu caso, vou colocar como comercial123:

Colocando uma senha no ponto de acesso do comercial

Note também, que deixamos o tipo de criptografia como AES, que também é o recomendado.

Bacana, configuramos o ponto de acesso. Porém, agora todos os laptops que estavam conectados nele perderam o acesso. Isso porque agora é necessário uma senha para se conectar na rede. Logo, vamos colocar essa senha quando pedirmos para o notebook se conectar:

Conectando notebook na rede do comercial

Vamos fazer isso para os demais laptops também. Além disso, precisamos alterar a configuração dos pontos de acesso do departamento de desenvolvimento também:

Nos dois pontos de acesso vamos escolher a WPA2-PSK também e colocar a senha como desenvolvimento123:

Colocando uma senha no ponto de acesso do desenvolvimento

Depois de configurar os dois pontos de acesso, basta conectar novamente os laptops na rede. :D

## Roteador wifi

Na vida real temos o roteador wifi que permite a edição de componentes importantes da rede pelo navegador, bastando digitar o endereço IP dele normalmente `192.168.0.1` e alterar as configurações da minha rede. Mas é meio dificil ver pontos de acesso e switches imensos por ai né.

O roteador wifi é o mais provavel de se ter em uma rede doméstica e em empresas pequenas, muito por conta do roteador doméstico ter um switch, um roteador e um ponto de acesso tudo incluso em um dispositivo só.

PSK vem de personal key.

O roteador wifi não é muito usado em redes de grande porte pois ele pode tornar a configuração da rede um tanto caótica, pois como sua configuração é via interface gráfica a configuração do dhcp e dos ips das máquinas pode ser feita de modo a dar conflito na rede em algum momento. e as vezes o ip do roteador wifi pode ser o mesmo do endereço ip de outra máquina e nem nos tocarmos.

Podemos fazer muitas configurações no roteador sem fio. Por isso, se tivermos muitos pontos de acesso, algumas das configurações podem conflitar. Com pontos de acesso, a configuração fica centralizada.

Na autenticação Enterprise, temos um servidor de autenticação (RADIUS) que gera as chaves criptográficas, enquanto na Personal as chaves são geradas no ponto de acesso.

A única diferença desses tipos de autenticação é quem gera as chaves na rede. No caso da autenticação enterprise um servidor é encarregado para isso. Porém a forma de criptografia são as mesmos.

### Conhecendo o roteador wi-fi

Vamos até o Packet Tracer e selecionar o roteador sem fio, para fazer um teste, vamos colocá-lo junto ao switch do central:

Colocando o roteador wireless na rede

Quando clicamos nele, podemos ir até a opção GUI para ter acesso a interface gráfica de configuração:

Acessando a GUI

Nessa interface temos acesso a todas as configurações do roteador. Podemos configurar seu DHCP, o SSID, a forma de autenticação.

Vamos começar configurando as o SSID da rede. Para isso, podemos ir até a aba Wireless na interface gráfica, lá aparecerão as configurações básicas:

Configurando SSID

Depois de configurar o SSID, temos que salvar as configurações. O botão para isso, está na parte inferior da interface:

Salvando as configurações

Também podemos configurar uma forma de autenticação. Portanto, vamos na aba Wireless na opção Wireless Security. Vamos escolher o modo de segurança como WPA2 Personal e a encriptação como AES.

Configurando seguranca

Não podemos nos esquecer de salvar essas configurações.

Agora é só pegar um laptop e se conectar a esse roteador sem fio. :D
