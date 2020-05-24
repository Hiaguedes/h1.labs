# CMD do windows

Comandos báscios da linguagem shell, linguagem que rege o prompt do linux e do shell.

```sh
$echo blabla (escreve blabla no prompt de comando)

$ cd (change directory), muda o diretório ou pasta onde você está

$ cd .. (vai para a pasta acima da sua)

$ dir (lista todos os diretórios da pasta onde você está)

$ mkdir (make directory ) cria um novo diretório na pasta onde você está. Se a pasta já existe ele simplesmente ignora o comando.

$ move arquivo.txt Pasta_onde_você_quer_transferir_o_arquivo (comando para mover arquivo para outro lugar)

$ type arquivo.txt (diz o que tem dentro do arquivo), 

o comando more pode ser melhor que o type pois ele mostra pouco a pouco um arquivo o que é melhor para arquivos maiores, espaço para passar uma página e enter para passar uma linha. q para sair do arquivo

echo blabla > dicas.txt (cria arquivo dicas.txt e coloca o texto do echo no arquivo criado)

$ copy blabla.png pasta (copia o arquivo para a pasta especificada)

$ rename blabla.txt blabla1.txt (renomeia o nome do arquivo que temos para outro)

$ copy blabla.txt blabla1.txt (copia o arquivo que a gente quer na mesma pasta porém muda o nome dessa copia)

$ del blabla.txt (deleta arquivo na pasta)

cls (clear screen- limpa todo o terminal)

help qqcomando (mostra o que aquele comando faz)

tree (aparece as pasras e subbastas de um diretório organizado em uma árvore de informaçoes)
```

Significado dos carascteres:

- '>' tem o significado de prompt ou redirecionar a saída do comando que você vai escrever (escrever um comando e direcionar para o arquivo que você selecionou)

- ':' partição, como C: (arquivo está na partição C) 

- '\' ou '/' são separadores de pastas, o '/' funciona no Unix e os dois funcionam no windows (apesar de '\' aparecer no nosso prompt o Windows aceita os dois) 

Apertando Tab temos um auto complete.

Se o arquivo blabla.tx ja existe então podemos adicionar novos dados com >> da seguinte forma

```
echo Dados bons para gravar >> dicas.txt
```

# Outras opçoes de terminal

O prompt do windows é um pouco limitado, sendo ruim para ações triviais como copiar e colar arquivos dispostos no próprio  prompt, para isso existem outras opções de prompt como o cmder e o Widnows Power SHell. Além do cmder e do PowerShell terem uma aparência mais agradável (com cores e mais funcionalidades), o PS por exemplo tem mais funcionalidades ainda e já vem instalado no Windows, bom para administradores de redes e talz.

## Arquivos .bat e batch script

Caso você queira fazer um arquivo de script que automatiza certas funções que você faz todo dia na sua vida o arquvivo .bat pode facilitar sua vida. Mesmo sabendo que são scripts com uma funcionalidade um pouco limitada. (como abrir e fechar arquivos, copiar, mover e criar simples arquivos, ou executar diversos comandos em sequência).

No cmder podemos ter múltiplos terminais abertos criando abas (que nem no navegador), para isso apertamos CTRL+T para criar uma aba e apertar Enter para confirmar e navegando com CTRL+TAB'além de poder exportar e importar as configurações do terminal caso você precisa formatar o PC.

```
Comandos para bat 

echo (continua printando na tela)

pause (pausa a execução do script para que o usuário interaja com o código), para abortar o programa pressionae CTRL+C
```

O comando xcopy (copia a pasta) mas para copiar tudo mesmo (pastas e subpastas) dentro dessa pasta temos que escrever /e e também /y para ele aceitar todas as perguntas que eventualmente o comando faça. 

Deixando o comando da seguinte forma:

```
xcopy /e /y Caminho/da/pasta/origem Caminho/da/pasta/onde/queremos/copiar 
```
O arquivo data.bat na pasta foi criado usando

```
echo %date% >data.bat
```

Esse programa printa no meu prompt a data atual, não esqueça que o prompt é limitado ele vai abrir e fechar o prompt muito rápido, abra pelo cmder.

## Path

Se digitarmos echo %PATH% no nosso terminal nós encontraremos diversos diretórios de diversos programas diferentes. Nessas pastas temos arquivos e programas que podem ser acessadas de qualquer diretório que você esteja, então para você adicionar um diretório qq nessa pasta basta digitar.

```
echo %PATH%=%PATH%;Caminho/da/pasta
```

Temos que colocar %PATH%; por que senão alteraremos a pasta PATH de forma a ficar apenas a pasta que queremos colocar eliminando todas as pastas anteriores.

```
set (lista diversas pastas importantes e caracterísitcas de hardware e do sistema operacional, podemos usar ele para definir pastas importantes, conhecidas como variáveis de ambiente)

Se digitar

set pasta_projetos=Caminho/da/pasta

cd %pasta_projetos%

ele cai justo na pasta h1.labs/h1.labs
```

Porém se fecharmos o cmder e apagarmos denovo notaremos que o Path e o set estarão sem as modificações, isso acontece por que ele altera temporariamente o PATH. Para alterar definitivamente deveremos usar o prompt em modo de administrador mesmo porém com setx da seguinte forma:

```sh

setx PATH "%PATH%;Caminho/da/pasta" /M

/M para dizer que é definitiva essa mudança (NÃO ESQUECER DO /M :) ) 

setx pasta_projetos "Caminho/da/pasta"

cd %pasta_projetos%

ele cai justo na pasta h1.labs/h1.labs
```

Outros endereços úteis registrados no set

```sh
cd %USERPROFILE% cai na home
cd %ProgramFiles%- Meio óbvio essea hahah
cd %HOMEDRIVE%- Pasta C

a só vasculhar o comando set
```

Podemos alterar as variáveis de ambiente (como o PATH) pela interface gráfica do Windows. Vou mostrar como:

- Clique no ícone Pesquisar e digite Painel de Controle

- Clique em -> Painel de Controle -> Sistema de Segurança -> Sistema-> Configurações Avançadas

- Na aba Avançado das Propriedades do sistema clique em Variáveis de Ambiente,

- Em Variáveis do Sistema localize PATH e clique nele.

- Na janela Editar você pode modificar o PATH adicionando a localização da classe para o valor de PATH.

Para ver as alterações feitas no PATH é preciso reabrir o mesmo (não precisa reiniciar).

Fique de olho também no comando wmic. Pois ele te dá mais variáveis do sistema e é bastante utilizada pela galera de infra.

## Gerenciador de Pacotes Chocolatey

Se você sente falta do Linux de dar um sudo apt-get install, saiba que você tem um gerenciador de pacotes com o Chocolatey, basta ir no site abrir o PS e ver como se instala o gerenciador.

Para instalar o VLC por exemplo basta digitar:

```chocolatey
choco install -y vlc
```

A diretiva -y simplesmente resposnde com sim todas as perguntas que o instalador nos pergunta.

Outros dois comandos com cholatey que podem te ajudar são:

```chocolatey
choco list
choco search
```

Para ver quais você já instalou basta digitar:

```chocolatey
choco list -l
```

O mundo Windows demorou muito para usar um gerenciador de pacote mas hoje em dia até existe um gerenciador nativo. Nativo significa que vem configurado com o Windows, mas apenas com Windows 10. O Gerenciador se chama OneGet e deve ser utilizado no PowerShell do Windows.

Mais informações sobre o OneGet na página do projeto:

https://github.com/OneGet/oneget/wiki/cmdlets

## Comandos de Linux vs Windows

O cmder tem diversos comandos nativos de linux

|Windows|Linux|significado|
|---|---|---|
|dir|ls ou ls-al|lista pastas e arquivos|
|cd %USERPROFILE%|cd ~|vai para a pasta home|
|cls ou clear|cls|limpa a tela|
|copy arquivo.txt pasta|cp arquivo.txt pasta|copia arquivo|
|move|mv|move arquivo|
|del|rm|deleta (remove) arquivo|
|type arquivo.txt|cat arquivo.txt|Mostra o que tem no arquivo|

rmdir e mkdir são iguais nos dois mundos.

Um comando muito importante que não tem no mundo Windows é o grep que é um procurador tipo quando colocamos o código abaixo

```sh
ls -al | grep Resp
```

Ele passa o texto Resp e usa como filtro no comando ls. O | é o pipe e serve para linkar dois comandos. Como se ligasse a saída de um e liga com o outro. É um filtro e ele te mostra somente as pastas que tem Resp no nome (se tiver).

Comando find, ele lista todas as pastas abaixo da pasta de onde você está.

```sh
find . (lista todas as pastas abaixo)
```

Adicionais:

Por exemplo, podemos listar e ordenar pela data de modificação:

```sh
ls -lt
```

Podemos mostrar o tamanho dos arquivos e kB e MB:

```sh
ls -lth
```

E ordenar pelo tamanho:

```sh
ls -lSh
```

Para listar todos os arquivos do diretório atual, devemos utilizar a flag -al ("a" de all e "l" de list) , assim todos os arquivos serão exibidos em formato de lista. (inclusive os ocultos)

Por curiosidade:

A flag -hl transforma as unidades de tamanho em um formato mais amigável, por exemplo 4K em vez de 4096.

A flag -rl lista os arquivos em ordem reversa a normal.

A flag -sl lista os arquivos por ordem de tamanho.

São muitas as opções, e você pode ver todas elas usando:

```sh
ls --help
```
