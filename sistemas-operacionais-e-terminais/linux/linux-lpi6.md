# Linux LPI parte 6

Aqui falaremos muito sobre os comandos de compressão e empacotamento no linux, como o tar,zip, gzip e bzip

E também falar um pouco sobre o find como alternativa ao locate

## Diferença entre arquivar e comprimir

Um arquivo pode ser qualquer documento que contenha informações, e o processo de arquivar é juntar todos os arquivos e documentos que quero empacotar em um unico documento, enviar para uma pessoa e quando esse arquivo chegar nessa pessoa eu posso desjuntar para ele. É isso que o tar (tape arquive, por que esse comando foi feito na época da fita magnética) faz, eu junto, por exemplo, três arquivos html em um super arquivo só de modo que eu sei separar o que é o título e o seu conteúdo e aí eu tenho a capacidade de desjuntar ele depois (pois adicionei coisas dentro desse arquivo para poder identificar conteúdo e titulo). E isso independente do tipo de documentos que tem dentro dele.

Compressão é uma forma de apertar meu arquivo de modo a termos um tamanho de informação razoavelmente menor, mas que não perca nenhuma informação ou que perca pouca informação (como os arquivos .mp3 que não tem uma qualidade tão boa se comparada a um .flac mas é razoável para serem transportadas e baixadas por aí), o mp3 tenta otimizar quais são os pedaços de arquivo que podem ser retiradas sem que nós percebamos (nós no caso de que não temos ouvido absoluto).

Diferença para a Alura- Normalmente o termo arquivar é utilizado para representar o processo de unir vários arquivos em um só. Isso facilita enviar os arquivos por email por exemplo, pois bastaria anexarmos um arquivo em vez de vários menores.

Já comprimir significa que aplicamos algoritmos que de alguma forma conseguem diminuir o tamanho do arquivo. Aqui, pode haver perda de dados, como conversões para o formato MP3; ou podemos ter compressão sem perda de dados. o tipo que estamos interessados nesse momento é a compressão sem perda de dados.

É comum unirmos esses dois processos. No Windows por exemplo, quando utilizamos programas como winzip, além de realizar a compressão para diminuir o tamanho dos arquivos, também arquivamos e acabamos com um único arquivo, que devido a compressão pode ser menor que a soma dos arquivos que foram arquivados.

## tar para arquivação

Para criar um arquivo tar nós simplesmente fazemos

```sh
tar -cf <nome do arquivo>.tar <arquivos que quero empacotar, aqui se usa muito o globbing>
```

Para ver o que tem dentro desse conteúdo digitamos

```sh
tar -tf <nome do arquivo>.tar
```

Para extrair

```sh
tar -xf <nome do arquivo>.tar
```

Entenda o f como arquivo (file).

O problema do tar é que ele pode subir muito o tamanho do arquivo total, e ter um tamanho além da soma de todos os arquivos dentro dele, uma vez que ele adiciona diversas permissões e informações a esse arquivo .tar.

O comum não é criarmos o arquivo tar no diretório que nós estamos, o comum de darmos o tar é estarmos no diretório anterior a pasta que queremos arquivar. De modo que um exemplo seria

```sh
tar -cf work.tar workspace/*
```

O * ignora todos os arquivos invisíveis, então nem sempre queremos usar o globbing, pois os arquivos invisíveis são importantes também para muitos projetos.

O -v mostra de forma verborrágica o que está sendo feito principalmente no processo de criação e de extração (que são funções silenciosas).

O comando tar decide tirar a barra no seu caminho, então se formos empacotar uma pasta `/home/hiago/loja` quando formos extrair teremos no arquivo uma pasta home, depois uma pasta hiago para aí sim vermos os arquivos da pasta loja.

Existe um comando update com -u , mas ele não sobrescreve o arquivo que foi atualizado, ele so cria um novo com o mesmo nome, pois lembre ele é do tempo da fita magnética e você não apaga arquivos na fita, você simplesmente cria um vetor de informações. Na prática você cria um novo arquivo tar mesmo.

## Usando o tar para arquivar e compactar

Com o sufixo z conseguimos comprimir esse arquivo

```sh
tar -czf <nome>.tar.gz <arquivos que quero compactar>
```

Para descompactar invés do c usa o z.

```sh
tar -xzf <nome>.tar.gz
```

Esse tipo de compactação usa o gzip.

Agora para compactar com o bzip

```sh
tar -cjf <nome>.tar.bz2 <arquivos que quero compactar>
```

Puta j nada a ver mas é isso aí. Como o gzip comprime mais e tem uma semântica melhor então prefiro usar o gzip.

E para extrair um bzip com tar

```sh
tar -xjf <nome>.tar.bz2
```

## Compactando com gzip e bzip sem usar o tar

### gzip e gunzip

O gzip compacta um arquivo de cada vez, e com isso ele destroi o arquivo orginal criando o arquivo compactado. Então perfeitamente podemos fazer:

```sh
gzip arquivo.txt
```

Criando um arquivo arquivo.txt.gz, para descompactar esse arquivo fazemos:

```sh
gunzip arquivo.txt.gz
```

![Comprimindo e descomprimindo com gzip](img/gzip.png)

E o gunzip apaga o arquivo .gz.

Assim como posso descompactar o arquivo.gz com

```sh
gzip -d arquivo.txt
```

Posso colocar o nível de compactação pro arquivo sabendo que o nível 6 é o padrão, nível 1 é menos compactado (só que mais rápido) e 9 é compactar mais.

```sh
gzip -9 arquivo.txt
```

![Níveis de compactação](img/niveis-gzip.png)

Onde essas porcentagens são os níveis de compactação, ou seja, quanto do arquivo original ele tirou. E nem sempre conseguimos tirar acima de um determinado limite.

O mais comum é usarmos com o tar pois não excluiremos arquivos fonte e o tar protege contra isso.

Uma forma de não apagar o arquivo que está dentro da pasta é com o redirecionamento e a função -c, ou seja

```sh
gzip -c arquivo.html > arquivo.html.gz
```

O -c cospe o que seria a resposta da compactação com o gzip e o > redireciona esse conteúdo para um arquivo qualquer. Essa compactação normalmente nos mostra uns caracteres bem estranhos

### bzip2

Funciona da mesma forma que o gzip onde temos o comando `bzip2` para compactar e o `bunzip2` para descompactar, onde o bunzip apaga o arquivo original para criar um arquivo com extensão .bz2.

Invés de descompactar o arquivo com `bunzip2` aqui eu tbm posso usar o `bzip2 -d` e também temos os níveis de 1 até 9 para a compactação, só que o -1 usa menos memória para compactar o arquivo enquanto o -9 usa mais memória. Aqui é legal termos em conta o alvo dessa descompactação, se o -9 é usado em um microprocessador talvez não seja legal usar mais memória RAM para essa operação.

O bzip não permite o -c

### zip e unzip

Esses são os que ficaram mais famosos (em tempos mais antigos) e que botaram na nossa mente que compactação é com zip, mesmo tendo rar e outros compactadores, mas esses não são mais usados pois o gzip é mais eficente que o zip em qualquer aspecto.

São mais usados quando quero transferir arquivos para um windows

Com o zip posso compactar vários arquivos ao mesmo tempo com

```sh
zip <NOME>.zip <arquivo 1> <arquivo 2>  ... <arquivo n>
```

Escrever .zip no final é opcional aqui.

Com `unzip -l` vemos que com o zip não compactamos os arquivos e sim a pasta toda com esses arquivos. O que não é uma compactação tão boa assim se comparado com as outras.

O zip para compactar pastas precisa ser feito com -r (recurssivamente)

O problema surge quando o arquivo surge no windows e é descompactado no linux, pois posso ter scripts ali que não possuem permissão de execução, aí eu terei que alterar essas permissões manualmente.

O unzip descompacta tudo no diretório atual para descompactar em outro diretório fazemos:

```sh
unzip <arquivo>.zip -d <caminho da pasta>
```

Eu posso tbm descompactar arquivos que eu sei que estão dentro do zipado.Com:

```sh
unzip <caminho do arquivo>.zip <nome do caminho até o arquivo dentro do zip>
```

## Comando find para buscar arquivos

Lembra quando falamos do locate? Que ele tinha uma espécie de banco de dados dentro do sistema operacional e que esse banco de dados é atualizado de tempos em tempos pelo meu proprio sistema.

O find é mais simples e não precisa de nada disso. Dando um simples `find` ele me lista todos os ***caminhos*** dos arquivos dentro da pasta onde eu estou.

Com isso eu posso dizer a partir de onde quero pesquisar com

```sh
find /home/hiago
```

Posso filtrar a busca pelo nome com:

```sh
find -name "*nome*"
```

O comando find com o glob foge a interpretação do shell e econtra arquivos ocultos

Para encontrar somente diretórios com aquele nome fazemos

```sh
find -type d -name "*nome*"
```

E para arquivos o tipo é f, l seria para link simbólico para mais só dar um `man find` e procurar pelo `-type`

Posso procurar pastas e arquivos criados por um usuário com

```sh
find /bin -user root
```

Eu procuro na pasta bin tudo que foi criado pelo root

Para procurar pelo grupo

```sh
find /bin -group root
```

Procurar pelo tamanho

```sh
find -sise +10k
```

Ou seja ele procura arquivos que tem pelo menos 10 KB.

As unidades eu posso ver pelo man e encontro c para bytes, M para megabytes e G para gigabytes. E posso usar -10k para procurar arquivos menores que 10 kB.

Para acessar um arquivo que foi ***acessado*** nos ultimos 7 dias nós digitamos

```sh
find -atime -7
```

O comando atime vem de acess time.

Para ver o arquivo que foi ***modificado*** na última semana:

```sh
find -mtime -7
```

Agora o tempo de mudança de um arquivo, ou seja eu posso ter mudado a permissão desse arquivo ou qualquer outra coisa:

```sh
find -ctime -7
```

Posso encontrar o arquivo pelo número de nó dele com (válidos somente para a pasta onde estou atualmente)

```sh
find -inum <numero do nó>
```

Para dar find numa pasta root eu terei que dar um sudo

Com dois filtros de pesquisa (nome e tamanho) eu tenho uma condição e, para ter um ou eu coloco -o entre as duas como

```sh
find -name "*nome*" -o -name "*2020*"
```

Aí eu tenho arquivos com ou nome no seu nome ou 2020, um and seria -a. Para botar mais condições coloque parenteses escapado ou `\(`, a negação é com !, para ignorar se eu tenho maiusculo ou minusculo eu coloco -i.

Tem um que é legal que é como dar `ls -l` para cada resultado que eu encontrar para isso faço

```sh
find -name "*name*" -exec ls -l "{}" \;
```

O `{}` escapado serve para dizer a pasta daquela busca atual e o exec é como se fosse um linha de script então precisamos do ;, só que tanto ; e {} são caracteres especiais então preciso obrigatoriamente escapar-los
