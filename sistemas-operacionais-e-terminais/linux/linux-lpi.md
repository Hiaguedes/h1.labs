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
