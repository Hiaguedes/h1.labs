# Linux 1

## Comandos básicos

|Comando|Descrição|
|--|--|
|`pwd`|Me informa o diretório atual|
|`ls`|lista os arquivos naquele diretório|
|`echo tanan`|printo tanan no terminal|
|`echo "tananan tananan" > tanan1.txt`|coloca tananan tananan em um arquivo tanan1.txt na pasta onde você está no terminal|
|`echo "blabla" >> tanan1.txt`|adiciona a linha com conteúdo blabla no arquivo tanan1.txt|
|`cat tanan1.txt`|Lê o que está dentro de tanan1.txt que é tananan tananan, se escrever somente o começo e pressionar TAB ele já auto completa|
|`cat tanan*.txt`|Lê qualquer arquivo txt com nome que começa com tanan (entenda o * como tudo que tem)|
|`ls -l`|Mostra caracterísiticas desses arquivos (lembra o dir do Windows), o que começa com d é um diretório|
|`ls -la` ou `ls -al` ou `ls -l -a`|Mostra os arquivos invisiveis, os que começam com .|
|`ls *`|Lista todos os arquivos dentro do diretório|
|`clear`|limpa a tela|
|`man ls`|Me insina sobre o comando ls, nos mostra a documentação de qualquer comando|
|`whoami`|Dá o nome do usuário|
|`cd <Nome da Pasta>`|Vai para a pasta com o nome que você quiser (e que exista), cd=change directory|
|`cd ..`|Volta uma pasta na hierarquia de pastas|
|`cd .`|Fica na pasta atual (mas a título de curiosidade mesmo)|
|`mkdir <nome da pasta>`|Cria um diretório com o nome que você quiser|
|`cd`|Volta pro diretório origem|
|`rmdir <nome de pasta que existe no seu diretório>`|Remove pasta no seu diretório e que esteja vazio|
|`rm -r <nome da pasta>`|Exclue recursivamente tudo que tem naquela pasta|
|`cp <nome de arquivo> <nome de outro aqruivo>`|copia um arquivo para um outro dentro da mesma pasta|
|`cp -r <nome da pasta>/ <nome de outra pasta>/`|Copia todo o primeiro diretório diretório para dentro do segundo|
|`mv <nome de arquivo> <nome de outro aqruivo>`|move um arquivo de um nome para para outro, renomeia|
|`mv <nome de arquivo> \<nome de pasta>`|move o arquivo de lugar, de um pasta para outra|

O caractere `*` e `?` se não estiverem dentro de aspas são caracteres coringa e o `?` serve para apenas um caracter enquanto o `*` serve para todos os caracteres.

Variações disso dê um `man cat` por exemplo e veja sua documentação

## Compactação

### ZIP

|Comando|Descrição|
|--|--|
|`zip -r <nome do arquivo>.zip <nome da pasta que eu quero compactar>/`|Compacta toda uma pasta, lembre de fazer isso recursivamente|
|`unzip <nome do arquivo>.zip`|Descompacta o arquivo|
|`unzip -l <nome do arquivo>.zip`|Lista todos os arquivos que estão compactados no arquivo .zip|

O unzip pode jogar muitas informações para a gente para isso basta fazer `unzip -q <nome do arquivo>.zip`, assim como o zip também, podendo usar o `-rq`

O `-q` de maneira geral deixa tudo quieto sem poluir o terminal.

Se eu quiser compactar todos os arquivos txt da pasta sabendo que eu estou nessa pasta o que eu faço é:

```sh
zip  <nome do aqruivo zip>.zip *.txt
```

### tar

o tar não compacta, apenas empacota os arquivos e podemos usar em conjunto com vários compactadores

|Comando|Descrição|
|--|--|
|`tar -cz <nome da pasta que quero compactar> > <nome do arquivo compactado>.tar.gz`|Compacta toda uma pasta, o tar já é recurssivo|
|`tar -xz  < <nome do arquivo compactado>.tar.gz`|Descompacta o arquivo tar|

Ou

|Comando|Descrição|
|--|--|
|`tar -czf <nome da pasta que quero compactar>  <nome do arquivo compactado>.tar.gz`|Compacta toda uma pasta, o tar já é recurssivo|
|`tar -xzf  <nome do arquivo compactado>.tar.gz`|Descompacta o arquivo tar|

A ordem dos fatores nao altera o produto, mas se nao usar o f redirecione corretamente.

O c é de crate e z é de zip (nota-se pela extensão tar e gzip) e x de extract e f de arquivo (sem redirecionamento > ou <), ou seja ele compacta mais que o zip.

O tar por padrão nao coloca nada na tela, então para mandar ele falar eu coloco v de verbose. 


Um outro formato de compactação que podemos utilizar junto com o tar é o formato .bzip2. Esse formato é mais eficiente na compactação, conseguindo criar arquivos menores. Porém o tempo que o .bzip2 leva para criar o arquivo compactado é maior do que o tempo do gzip.

Para criar um arquivo .tar compactado com o bzip2, substituímos o -z (de gzip) por um -j. O formato que utilizamos é o .tar.bz2.

Aproveite e faça um teste, compactando seu diretório workspace:

```sh
tar -cjf work.tar.bz2 workspace/
```

Você pode obter mais informações sobre o bzip2 na página do projeto: <http://www.bzip.org/>. Existe também um artigo na Wikipédia sobre o bzip2: <https://pt.wikipedia.org/wiki/Bzip2>.

## Tempo

Um arquivo que não sei a finalidade é o `touch <nome do arquivo>` ele somente toca no seu arquivo, fazendo com que a data e a hora da última modificação seja a atual, ele não modifica nada no arquivo, mas atualiza a ultima modificação.

Para saber a data pelo terminal eu faço

```sh
date
```

Mas eu quero saber, somente a data, o mes e o ano.

```sh
date "+%d/%m/%Y"
```

Vimos que podemos mostrar o dia com %d e o ano com %Y. Para mostrar o nome completo do mês, utilizamos %B. O nome do mês pode estar em um idioma diferente, dependendo da sua configuração de local. letra minuscula é abreviado e maiuscula é o completo

## Vendo um arquivo grande

|Comando|Descrição|
|--|--|
|`head <nome do arquivo>`|printa as 10 primeiras linhas|
|`head -[NUM] <nome do arquivo>`|printa as [NUM] primeiras linhas, como head -5 printa as 5 primeiras linhas|
|`tail <nome do arquivo>`|printa as 10 ultimas linhas|
|`tail -[NUM] <nome do arquivo>`|printa as [NUM] ultimas linhas, como tail -5 printa as 5 ultimas linhas|
|`less <nome do arquivo>`|eu vejo de pouco em pouco (q pra sair)|`

## Editor VI, um editor de texto no terminal

Navegação com as setas direcionais do teclado

tecla i para inserir coisas onde meu cursor esta apontado, a insere na posição seguinte, x remove caracteres, 11 x para remover 11 caracteres (pode ser qualquer numero), dd para excluir linha inteira, A para adicionar no final da linha, G (pode ser gg também) vai para a ultima linha, 1G vai para a primeira linha, $ vai para a ultima letra da linha atual e 0 vai pro começo da linha atual

Esc para sair

: para abrir um espaço de códigos, w salva, q para sair, pode escrever :wq para salvar e sair, para sair sem alvar :q!

/ para pesquisar coisas no texto, enter para confirmar, n para ir para as proximas, N para voltar, / de novo para sair do modo de pesquisa dessa palavra.

### Copiar e colar

yy copia a linha, p cola

3yy copia as tres linhas abaixo, 10p cola nas dez linhas abaixo, y de yanked e p de printed
