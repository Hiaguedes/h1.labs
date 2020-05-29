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
