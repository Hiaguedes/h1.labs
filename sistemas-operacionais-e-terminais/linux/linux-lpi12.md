# Linux LPI parte 12

Essa parte fala sobre uma das coisas mais importantes no linux, que é a segurança e permissão em arquivos.

## Criando usuários e grupos

Durante a instalação da distro nós criamos um usuário com nosso nome (ou não) e também é criado o usuário `root` que tem todas as permissões administrativas do sistema e esse tal de `root` tem permissão para fazer umas catástrofes no seu sistema então para acessar ele tenha muita certeza do que esteja fazendo

E quando instalamos certos programas (ou programas que já venham instalados na distro) nós vemos que são criados outros usuários (isso pode ser visto pelo programa `cat /etc/passwd`), note que todos os usuários criados tem um número de `user id (UID)` e os criados pela distro começam com uid valendo 1000. No `cat /etc/passwd` o UID é o terceiro campo (o segundo campo com um x é uma senha só que ela está escondida pelo shadow, por motivos óbvios)

Um usuário comum de vermos é o usuário do `mysql` onde para acessar o banco de dados administrado por ele eu devo me conectar a esse usuário e aí sim poder gerir os dados armazenados por ele. E sim, somente isso é uma vulnerabilidade monstra em nosso sistema ou em nossas aplicaçõez

Podemos ver o id do usuário com o comando `id` e o id de qualquer outro usuário seria com:

```sh
id <nome do usuario>
```

Além de usuários eu posso agrupar usuários com grupos específicos. Imagine que muita gente usa um computador, uma forma de colocar apenas um grupo de pessoas para acessar um determinado numero de arquivos é agrupando esses usuários e dizendo que somente aquele grupo tem permissão de ver aquele arquivo

### Criando usuários

Para criar um usuário fazemos

```sh
sudo useradd <nome>
```

Pois somente o superusuário tem permissão para isso, para deletar o usuário usamos o `userdel`

Para me logar nesse novo usuário eu uso `su <nome do usuário>`, note que somente com o comando `su` eu entraria no root e ambos os usuários pedirão a senha

O useradd por padrão não coloca senhas nos usuários criados, nós setamos eles com `passwd` porém setamos essa senha no nosso usuário, para setar a senha desse novo usuário fazemos 

```sh
sudo passwd <usuario>
```

O superusuário pode trocar a senha das pessoas sem precisar da senha anterior (ó a solução e o problema), e mesmo que eu de a mesma senha de um usuario do sistema o shadow pode criar até 4096 variações de criptografia para a mesma palavra, isso é bom para que eu não descubra a senha de outra pessoa

Para criar o diretório na pasta home colocamos o sufixo -m, evite editar o passwd e o shadow pois se fizermos besteira é bem provável de quebrarmos o sistema

### Perguntas

De acordo com o que foi visto nesta seção, adicione o usuário paulo - ou escolha um usuário com nome de sua preferência - ao seu sistema. Solicite também a criação do diretório home para esse usuário.

Depois de criar, verifique no arquivo /etc/passwd se o novo usuário é listado.

Qual comando você utilizou para realizar a adição do usuário?

```en
$ sudo useradd -m paulo
```

Quando passamos o -m o sistema operacional copia o que está dentro da pasta `/etc/skel` ou seja ele passa o esqueleto daquela pasta para a home

Para criar um usuário, o comando utilizado é o useradd, mas é necessário executá-lo como superusuário, por esse motivo é necessário o sudo antes.

Devemos passar a opção -m para que o diretório home do usuário seja criado.

Neste momento, se você verificar a linha referente ao novo usuário criado, irá perceber que existe apenas uma exclamação onde deveria estar a senha criptografada.

Algo parecido com:

paulo:!:17054:0:99999:7:::
O caractere ! nunca será utilizado pelo algoritmo que criptografa as senhas. Por esse motivo nunca será possível acertar a senha do usuário paulo. Isso ocorre porque o usuário foi criado mas nenhuma senha definida.

Defina uma senha para o seu usuário criado.

Qual comando foi utilizado?

```en
$ sudo passwd paulo
```

O comando utilizado para trocar a senha do usuário é passwd. Nesse caso precisamos passar o nome do usuário.

Para atualizar a senha, basta executar o comando passwd passando o nome do usuário:

```en
$ sudo passwd paulo
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
```

O superusuário pode alterar a senha de todos os outros usuários do sistema. Por isso é sempre bom ter cuidado ao utilizar o superusuário.

Remova o usuário que foi criado nos exercícios anteriores, de forma que o diretório home desse usuário também seja removido.

Qual comando foi necessário utilizar?

```en
$ sudo userdel -r paulo
```

O comando userdel com a opção -r remove o usuário e seu diretório home

## Um pequeno adendo o comando who e o w

Com o comando `who` e `who -b` eu vejo quem bootou o sistema e o horário que o sistema foi bootado

O comando w por sua vez quais usuários estão logados e o que estão fazendo, ou seja que processo eles estão realizando naquele momento

## O sudo

Por padrão o usuário root vem sem senha (pelo menos no ubuntu), entao podemos setar essa senha com um comando que já vimos

```sh
sudo passwd
```

Onde o root aqui é opcional, mas mesmo sem senha conseguimos acesso com `sudo -i`

Para me logar em outro usuário com as mesmas permissões e visibilidade que esse usuário teria eu faço `su - <usuario>`, o comando `su` somente acessaria como aquele usuario

Quando eu booto o sistema operacional e o usuário cria o seu usuário apenas o usuario inicial tem permissão de acessar os comandos do root, os usuários criados por esse usuário não tem, então para esse usuário inicial damos o nome de `sudoer`

Um comando bacana para ver os acessos de usuário no sistema é com o comando `last`

### Perguntas

Quais das alternativas contém informações corretas sobre o usuário root? (Escolha duas)

Não é recomendado logar-se com o usuário root. Quando for preciso, o usuário pode utilizar o comando sudo, desde que ele seja um usuário administrador.

Isso mesmo. O ideal é sempre deixar explícito através do sudo que uma determinada tarefa deve ser feita como root.

Utilizar o usuário root diretamente pode acabar levando o usuário a errar em algo e bagunçar o sistema.

Em algumas distribuições, não é definido senha para o usuário root

No Ubuntu, por exemplo, não temos uma senha definida para o usuário root. Porém é possível definir essa senha.

Qual dos comandos roda um shell para o usuário root, mesmo que a senha do root não tenha sido definida?

$ sudo -i

Quando utilizamos o sudo com a opção -i, fornece um shell no qual podemos executar comandos como superusuário.

Ao utilizar a opção -i e digitar a senha do usuário administrador, entramos em um shell do usuário root.

```sh
$ sudo -i
[sudo] password for lucas: 
root@lucas-VirtualBox:~#
```

Essa é uma prática perigosa, e no geral, você não deve executar comandos como root, para evitar fazer alguma besteira no sistema. O ideal é que sempre que precisar executar comandos que requerem poderes administrativos, você utilize explicitamente o sudo antes do comando.

Qual comando utilizamos para ver quais os usuários que estão logados no sistema e qual comando eles estão executando?

$ w

O comando w exibe quem está logado no sistema e quais processos está executando.

## Sistema de permissões no linux e o chmod

No linux temos o conceito de dono do arquivo, e esse dono seta permissões de leitura, escrita e execução de um arquivo ou diretório dele. Dando o comando `ls -l` para listar todos os arquivos de um diretório vemos a seguinte informação

![permissões de um arquivo](img/perm.png)

A primeira letra nos diz se é um diretório ou não, as três primeiras letras são permissões de proprietário (o dono, owner) na seguinte ordem (leitura-> read, escrita->write e execução-> xcecute), as proximas tres são permissões de grupo e as outras 3 são permissões para outros usuários.

Para mudar esses modos de uso de arquivos e diretórios eu uso o comando `chmod` aí eu digo qual o grupo eu quero dar esse uso, se for o usuário uso o `u`, para um grupo uso `g` e para outros usuários uso o `o` e para dar permissão uso o + e tirar o -

Então supondo que eu quero dar permissão de escrita a outros usuários em um arquivo escrita.txt o comando seria

```sh
chmod o+w escrita.txt
```

Para tirar essa permissão eu faria

```sh
chmod o-w escrita.txt
```

Caso eu não informa o grupo como em 

```sh
chmod +w escrita.txt
```

Eu estaria fazendo o mesmo que dar permissão de leitura ao meu usuário ou seja seria o mesmo que

```sh
chmod u+w escrita.txt
```

O escrever em um diretório seria criar novos arquivos e diretórios dentro da pasta, e o ler seria conhecer o que tem lá dentro

Como criador do arquivo eu posso modificar os bits de modo de uso de qualquer arquivo o quanto quiser (até mesmo tirar minhas permissões)

O superusuário tem acesso a todos os arquivos e a todas as modificações de uso de um arquivo

Posso usar o globbing para mudar o modo de uso de arquivos como em

```sh
chmod o+w *
```

Tanto diretórios quanto arquivos tem permissões distintas e se eu digo que uma pasta tem permissão de escrita, somente a pasta tem essa permissão os arquivos lá dentro não especificamente, para fazer de modo recursivo eu faço

```sh
chmod -R o+w <nome da pasta>
```

Cuidado quando se tem permissão de escrita em uma pasta para outros usuários, outros usuarios poderão criar arquivos dentro da pasta e apagar arquivos de outras pessoas, então tenha cuidado com isso

Posso dar permissão a todo mundo da seguinte forma

```sh
chmod ugo+r <arquivo>
```

ou

```sh
chmod a+r <arquivo>
```

Ou eu posso setar os bits de modo de uso de forma direta com

```sh
chmod o=r <arquivo>
```

Dessa forma para outros usuarios eu seto que eles só podem ler aquele arquivo mas não podem escrever e nem executar. E se eu fizer 

```sh
chmod o=w <arquivo>
```

Os outros usuarios ja não podem mais ler e nem executar só escrever nele. Inclusive posso fazer mais consfigurações da seguinte forma

```sh
chmod u=rwx,g=rw,o=r <arquivo>
```

Isso sobrescreve todas as permissões daquele arquivo

É bem comum usar numeros para setar esses bits pois pense se o usuario tem read,write e execute para setar eu posso colocar um número em binário e o comando se seta sozinho então um comando como

```sh
chmod 777 <arquivo>
```

Setaria os três bits de todos os grupos para 1 ou seja em um grupo eu teria a seguinte situação

|numero|permissão|
|--|--|
|0|---|
|1|--x|
|2|-w-|
|3|-wx|
|4|r--|
|5|r-x|
|6|rw-|
|7|rwx|

Então o chmod 777 faria com que aquele arquivo tivesse o modo de uso setado em `rwxrwxrwx`

Penso que o r tem peso 4, w tem peso 2 e x peso 1, para escolher algo misto so fazer a soma entre eles, essa forma é mais interessante é menos verborrágica mas é menos entendível também

### Alterando o dono

O dono de um arquivo é o owner do arquivo e para mudar o dono do arquivo eu faço

```sh
sudo chown <nome do novo usuario> <nome do arquivo>
```

Apenas o usuário root pode utilizar o chwon. Pois pense só, eu que sou o dono do arquivo estou tirando minha permissão e dando para outro, isso pode? Só o adm poderia fazer isso

## Os grupos

Alguns arquivos foram feitos para serem compartilhados com um grupo de pessoas e não necessariamente com todos e não necessariamente com nenhum deles, então para isso existe a classe no meio do `ls -l` e o segundo nomezinho desse comando

Todo usuário tem um grupo primário de mesmo nome que o nome do usuário e com um group id (gid) com o mesmo numero que o uid e o usuario que instalou a maquina pertencem a outros grupos também como o grupo que pode dar sudo

Para mudar um grupo de uma pasta ou arquivo para o root fariamos

```sh
sudo chown :root <arquivo>
```

Então para mudar nome e grupo desse arquivo

```sh
sudo chown root:root <arquivo>
```

Lembrando que os bits do grupo são os 3 do meio

### Criando grupos

Para saber o número do grupo principal de um usuários eu faço

```sh
id -g usuario
```

De todos os grupos do usuário

```sh
id -G usuario
```

E se eu quiser o nome desses grupos

```sh
id -ng usuario
id -nG usuario
```

Posso fazer o mesmo com o id do usuário substitundo g por u e note que você está dentro de muitos grupos já. O comando `groups <nome do usuario>` é equivalente a `id -nG <nome do usuario>` e o primeiro grupo com seu nome é o principal

E assim como para criar usuários eu tenho o comando `groupadd` para adicionar grupos e para adicionar um usuário em um grupo eu faço

```sh
sudo groupadd aluno
sudo usermod -a -G aluno hiago
```

O comando -a é de apende e -G de todos os grupos, isso é esse comando adiciona o grupo na lista de todos os grupos

E não se esquenta se você der o comando `groups` e ele não aparecer, é que já estamos logados e como isso não é uma ação que se faz frequentemente entao eu teria que restartar a máquina para que ele aparecesse

Para fazer com que esse novo grupo criado seja o principal tem o comando `newgrp`, esse comando só troca de um grupo para outro (enquanto o shell está ativo)

Além desses comandos existem o `groupdel` e `groupmod`

## sticky bit

Eu ainda posso forçar guela a baixo que eu tenho uma pasta onde as pessoas criam arquivos a vontade ali dentro mas eu não quero de hipotese nenhuma que aquele arquivo seja apagado por outros então eu faço um

```sh
chmod +t <pasta>
```

Assim eu garanto que nenhum outro usuário apague meus arquivos (no terminal são as pastas cujo nome tem um fundo verde, bem normal ver essas pastas na pasta / mas em pastas temporárias que só podem ser apagadas pelo usuário ou pelo boot) mesmo que outros usuarios tenham permissão de escrita no diretório (o sticky é válido apenas para diretórios)

Por padrão arquivos são criados com `rw-rw-r--` e pastas com `rwxrwxr-x`

As permissões do arquivo programa.c aqui estão as seguinte:

```en
$ ls -l programa.c 
-rw-rw-r-- 1 lucas lucas 68 Ago  8 08:40 programa.c
```

Qual opção do chmod pode ser utilizada para replicar as mesmas permissões do arquivo programa.c para o arquivo post-do-blog.txt?

```en
$ chmod --reference=programa.c post-do-blog.txt
```

A opção --reference faz com que as permissões do arquivo fornecido sejam utilizadas como referência para o arquivo que se deseja alterar as permissões.

Por esse motivo o post-do-blog.txt ficará com as mesmas permissões do programa.c

Se quisermos fazer com que, ao criar um arquivo em um diretório chamado temp, apenas o usuário dono possa apagá-lo, mesmo que os outros usuários possuam permissões de escrita no diretório, qual comando pode ser utilizado?

Podemos utilizar o +t para definir o stick bit em um diretório, e dessa forma apenas o usuário que criou o arquivo naquele diretório poderá apagar o arquivo.

## s bit

Já notou que algo tão sinistro como mudar senha pode ser feito normalmente?

Digite `ls -l /usr/bin/passwd`, além do fundo vermelho no nome da pasta note que existe um atributo s na permissão de execução por parte do usuário, isso significa que temos permissão de root para rodar aquele script (não que você seja um root mas tem as permissões para tal)

Comandos desse tipo são o sudo e o su

## Links simbólicos e hardlinks

É uma forma de criar um atalho para um arquivo para uma outra pasta (como um pasta que está dentro da PATH), e para fazer isso eu crio um script na pasta que eu quiser e crio esse link (ln) com

```sh
sudo ln <caminho atual>/scrip <caminho que eu quero colocar como /usr/bin>
```

Com o comando `ls -i` vemos que eles pertencem ao mesmo nó

Se apagarmos os dois arquivos não há o link, mas o arquivo não é excluido (somente inacessível)

Um link simbólico seria apenas

```sh
sudo ln -s <caminho atual>/scrip <caminho que eu quero colocar como /usr/bin>
```

E ele é apenas um link que aponta para o local original de onde está o arquivo, sem copiar o arquivo para lá. Se o arquivo tiver permissão de execução pelo usuário eu posso executar ele direto pelo seu nome (desde que esse link esteja em uma pasta dentro do PATH)

Esse link simbólico é um link mais fraco, que os nós não são iguais entre as duas pastas, por que o nós presente na pasta que está no PATH aponta para o arquivo e não para o nó desse arquivo. Se eu mover o arquivo na minha pasta ou excluir o link simbólico simplesmente não funciona

Isso é muito útil para instalar novas versões de um programa, pois basta apontar qual o link do programa que eu preciso estar nesse momento para que o programa atualizado funcione sem precisar mudar o link de acesso

### Exercício

Sobre os links, quais alternativas estão corretas? (Escolha duas)

Para criar um link simbólico, utilizamos o ln com a opção -s.

Verdade. Com a opção -s criamos um link simbólico.

O links padrões criados pelo ln (ou hardlinks) são uma forma de referenciar diretamente o inode do arquivo, portanto só perdemos o acesso ao arquivo quando deletamos o último link.

Verdade. O ln por padrão cria links que apontam para o inode referente ao arquivo. Só perdemos a referência para o arquivo e podemos considerá-lo como removido depois que não existe nenhum hardlink apontando para o inode.
