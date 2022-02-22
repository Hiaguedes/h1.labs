# Linux LPI parte 9

Aqui vamos falar do tema mais legal da computação, ao menos para mim, o hardware :D

Afinal como que um sistema operacional roda em cima de processador, placa mãe, memória ram, hds e coisas do tipo e nós nem vemos isso? Não é magia é tecnologia, afinal esse é o papel do sistema operacional, interligar o software (os comandos os programas e afins) com o hardware, qualquer hardware, e para isso precisamos conhecer um pouco mais a fundo coisas como BIOS, papel de processadores e e tipo de partição das memórias

## Revisando alguns coneitos

GUI-> Programa com interface gráfico

CLI-> mesmo programa só que em modo texto

Kernel pode ser visto em <kernel.org> e tem a versão estável, a de long term support, a release candidate (rc) e a end of life (EOC) é a parte que lida com o sistema operacional de fato, linkando códigos com execução de hardware.

## Diferença entre software e hardware

Já dizia o sábio, hardware é o que você chuta e software o que você xinga. O hardware está ligado a coisas que são físicas, como o que é dito de um computador, laptop e celulares e os softwares estão ligados a programas, aplicativos e serviços, ou seja o que torna essa coisa física algo útil para o dia a dia. E um computador é composto de outras partes físicas como processadores, memórias e coisas do tipo e juntas elas formam uma arquitetura que formam o computador.

Softwares são maleáveis e mais fáceis de utilizar uma vez que ele depende apenas do sistema operacional para poder se comunicar com tudo (mesmo que os hardwares tenham uma maleabilidade de conexão com outros hardwares)

## Processadores (CPU)

Processadores são um hardware capaz de realizar uma tarefa por vez (processador binários como os que temos atualmente), porém se uma processador tiver uma alta velocidade de processamento (alta frequência) ele faz essas operações de forma tão rápida que parece que é ao mesmo tempo.

É papel do processador realizar operações matemáticas e executar os programas de fato

O processador é encaixado na placa mãe (onde todas os componentes são encaixados) por meio de um socket e cada tipo de socket abriga alguns tipos de processadores, como socket LGA 1151, LGA 1155, AM3, AM4.

Fazendo analogia com o corpo humano o CPU se associa ao cerébro

Com o comando `top` eu vejo o processamento total.

### Cores

Se o processador realiza uma tarefa por vez, então dois processadores realizam duas tarefas por vez, e separando fisicamente dois processadores dentro de um quadrado de processador eu possua dois núcleos de processamento ou dois cores. E hoje um processador pode ter até 16 cores, conseguindo processar muito mais coisas ao mesmo tempo.

Os threads são um artifício para dizer que o processador tem mais cores do que realmente tem, são "cores virtuais" para dizer dessa forma, e aí ter um ganho razoável de perfomance.

Não confundir conexão de internet com processamento, se a página de um site demora para carregar pode ser mais problema de conexão de internet do que do processador em si (que pode sim renderizar uma página mais devagar, mas só no estágio que a conexão esteja chegando na sua máquina), muita das vezes o problema está no servidor web da empresa que hospeda o site.

Quando baixamos um sistema operacional temos que baixar a versão para a arquitetura de processamento correta. Para que esse sistema operacional consiga conversar direito com o processador, no caso de processador da AMD o usual hoje é o amd64 e para a Intel o usual é o x86

Processadores multicore de fato são capazes de executar mais de uma tarefa ao mesmo tempo, pois temos praticamente mais de um processador no mesmo chip.

A frequência, a geração, e os níveis de memória (L3,L2 e L1), o número de cores, e a litografia (distância entre trilhas) nos indicam o quão bom um processador é.

## BIOS

Quando ligo o computador eu preciso deixar esse computador operacional de certa forma, preciso que ele reconheça as peças que eu tenha instaladas na placa mãe, que consiga ler o teclado e mouse ou um pen drive para que eu possa colocar um sistema operacional novo.

E para isso eu preciso de um código primordial e que para PCs ela é chamada de BIOS (basic input/output system) ou a firmware do pc, ele é o código que mapeia o hardware daquele computador pro sistema operacional, além de testar essas saídas e entradas de componente e aí sim poder bootar a máquina e deixar ela lindinha para podermos usar.

O BIOS é um tipo de firmware, responsável por inicializar e fazer algumas checagens dos componentes de hardware quando iniciamos o computador.

Precisamos dessa pequena quantidade de código até mesmo para que seja possível até mesmo instalar ou carregar o sistema operacional a partir de um pen drive ou HD, por exemplo.

## Memória RAM

Dados e processos precisam vir de algum lugar, nós precisamos saber fazer uma multiplicação para responder quanto é 5x5, pois a tia lá do ensino fundamental ensinou como, esse código e essa técnica são coisas que a memória sabe onde estão e como usar-las. E essa é uma sacada genial do pessoal de matemática e computação nos primórdios da computação e que são tão vitais nos dias de hoje.

random-access memory (RAM) é uma forma de memória que eu posso acessar e colocar informações ali de forma aleatória, ela acessa dados e coloca dados de forma muito rápida e eficiente, mas ela precisa ter acesso constante a energia, se desligamos a máquina já era etudo foi perdido. Ela serve para o processador poder acessar tarefas e operações diretamente dela, pois o tansporte da Ram para o processaodr é extremamente rápido. O modo de suspensão é um modo de baixíssima energia suficiente para que eu não perca informações presentes na RAM e perca informações vindas de lá.

A capacidade e a frequência da memória RAM são indicativos de uma boa memória. Porém não menospreze o efeito de temperatura de nenhum componente

A memória RAM não é para armazenar arquivos, fotos, vídeos e coisas do tipo. Primeiro por ter custo elevado. Segundo, pelo fato de que perdemos as informações quando desligamos o computador (retiramos a fonte de energia).

A memória RAM possui acesso aleatório, o que significa que podemos acessar uma determinada área diretamente, sem ter que percorrer tudo desde um determinado ponto, como no acesso sequencial.

## HD e SSD

A memória RAM é um tipo de memória do tipo não volátil, ou seja tudo que está ali é perdido quando a energia é desligada, porém precisamos de um tipo de memória que não se perca quando a energia é desligada, afinal queremos que nossos arquivos não se percam e para isso temos os hard disks (HD) e ela funciona de maneira magnética onde de maneira magnética guardamos informações em um disco de metal e com um cabeçote nós conseguimos escrever,ler e 'apagar' informações nesse disco

Discos desse tipo se sofrerem danos físicos (como sofrerem quedas) podem bater o cabeçote com o discos e assim danificar o arquivo naquela parte do disco, e compremeter arquivos.

Num HD é importante o armazenamento dele (que pode ser em GB ou TB) e a velocidade de rotação desse disco, pois quanto mais rápido melhor

O SSD (solid state drive) é uma maneira moderna e mais rápida de armazenar esses dados, o solid state significa estado sólido ou seja ele tem componentes eletrônicos como transistores, registradores, e afins e que guardam essa informação. A memória de estado sólido são mais caras e teoricamente o numero de leituras e escritas são menores em um SSD do que no HD.

Quando suspendemos a máquina a memória RAM pega toda a memória presente nela e joga pro HD e quando ela volta o caminho o que tava no HD vai para a RAM e isso salva um tempo de inicialização da máquina (a esse método chamamos de swap)

### Partições de memória

Se eu quiser conectar mais um tipo de hd ou quiser separar 1 hd para coisas distintas, eu posso simplesmente particionar (dividir) ele em pedaços menores de memória. E para particionar um hd ele precisa não estar funcionando (ou não formatado)

Com o comando `lsblk` (liste blocos) eu tenho os discos presentes na minha máquina e o normal é vermos sda (para o primeiro hd), sdb (para o segundo hd) e por aí vai.

Partições primárias no linux são as partições onde se situam o sistema operacional e partições extendidas são para uso de swap entre o hd e a memoria RAM.

#### Formatação

Posso formatar HDs com o `fdisk` e esse programa tem a capacidade de fuder seu HD para sempre então muito cuidado. E para usar o fdisk em um segundo disco na máquina eu posso rodar

```sh
sudo fdisk /dev/sdb
```

Pois para poder fuder um HD eu preciso da permissão necessária, clico m para ajuda e faço o que quiser ali.

Depois de particionado eu preciso criar o sistema de arquivos daquela partição e para isso eu tenho o programa `mkfs` (make fyle system) e o comando para criar um sistema de arquivos comum para o linux (ext -  extended file system) é o:

```sh
sudo mkfs -t ext4 /dev/sdb1
```

***Verifique se esse é o hd que você quer formatar mesmo***

O ext2 é um tipo de arquivo que o Windows não reconhece, o do windows é do tipo ntfs (New Technology File System), para ficar num mundo onde os dois se entendam use o fat32 mas o ext é melhor para o linux assim como o ntfs é melhor para o windows

Agora vamos montar essa partição

```sh
sudo mkdir /qualquer diretório
sudo mount /dev/sdb1 /qualquer diretório
```

Para desmontar uma partição use o `umount`

Esses mounts são feitos de forma temporária então se desligarmos a máquina a coisa se perde mas com o `fstab` vejo como fazer isso de forma definitiva mas não é tópico para agora

## Outros componentes

### Discos ópticos

Cdrom e dvd são drivers ópticos e precisam ser montados como discos rígidos quaiquer, e normalmente são montados na pasta `media` enquanto os hard disks são montados no `mnt`. Os disquetes etam montados no `media`

Fonte de alimentação de computador (power suply for pc) aparelho que converte energia da tomada para o computador com a tensão e a corrente necessária para cada tipo de peça. De fontes eu preciso saber a potência e os selos de qualidade que essa fonte tem, pois não adianta nada termos um mega pc com uma fonte que não aguenta tudo isso, uma boa fonte de alimentação protege componentes mais caros dentro do computador

Periféricos (mouse, teclado, câmera, microfone, impressora e qualquer coisa que se comunica com as entradas do pc) e no geral esses periféricos tem padrões de comunicação com o pc e para haver essa comunicação eu preciso de um driver e o driver é encontrado no site da fabricante. E no terminal do ubuntu vemos os drivers com `ubuntu-drivers`. Um periférico é um dispositivo auxiliar usado para entrar com informação e obter informação fora do computador"

Em geral, periféricos são dispositivos externos que ficam conectados ao computador, como mouse, teclado, impressora, microfone, câmera, leitor de código de barras, etc.

Placa de vídeo, é uma placa dedicada a renderizar objetos e componentes gráficos de maneira muito mais otimizada (como um jogo ou um projeto que estamos fazendo), essa contendo chips e memórias dedicadas para essa operação, sendo muito útil para jogos e projetos em 3D e que não toma espaço do processador e da memória RAM do sistema, antes era comum ver chips gráficos dentro do processador mas a necessidade de gráficos é tão necessária hoje em dia que isso tem sumido aos poucos sendo necessário placas dedicadas a isso. Os CPUs normalmente vem com uma placa gráfica integrada, capaz de executar coisas mais básicas e que utiliza da memória RAM como sua memória.

Mas existem também placas de vídeo dedicadas, para trabalhos e jogos mais exigentes. Essas placas vem com processador próprio e memória própria.

Monitores (do crt ao oled), resolução de tela e qualidade de imagem e frequência de resolução e tempo de resposta são coisas importantes para escolher um monitor e um monitor para mostrar um movimento contínuo ao apagar e desenhar um corpo muito rapidamente e esse processo pode ser otimizado com placas de vídeo dedicadas
