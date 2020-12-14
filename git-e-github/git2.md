# Github 2

Aqui vamos ver coisas importantes do github para poder contribuir em projetos open source, como issues, pull requests, controle de versões, busca avançada de commits, encontrar modificações, estratégia de branchs, gerenciamento de conflitos, git hooks e ferramentas visuais que auxiliam nosso trabalho

## O fantástico mundo do open source

O github é muito utilizado para a galera de open source, o editor em que eu estou nesse momento (vs code) tem a sua versão em código livre e nela podemos sugerir melhorias e features novas, sendo isso parte do dia a dia de um ecossistema open source, o npm é open source também

### Issues

As issues ou problemas é uma guia que se tem em todos os repositórios do github que podem ser usadas para sugerir melhorias de código, ou até mesmo organizar eventos acerca daquela repo (que pode representar uma comunidade)

Vimos no último vídeo uma funcionalidade interessante do GitHub: as issues. Com esta funcionalidade, podemos atingir alguns resultados interessantes na organização de um projeto.

Sobre o que podemos fazer com issues, avalie as afirmativas abaixo:

1) Podemos reportar problemas

2) Podemos sugerir melhorias no código

3) Podemos organizar quaisquer coisas que façam sentido para o projeto

As afirmativas 1, 2 e 3 estão corretas

Alternativa correta! Todas as afirmativas estão corretas, já que o propósito inicial das issues, como o nome já diz, era reportar e controlar os problemas e bugs de um projeto (afirmativa 1). Além disso, com o tempo, passaram a perceber que havia mais possibilidades nas issues, e elas foram utilizadas para sugestão de melhorias no projeto e pedidos de novas funcionalidades (afirmativa 2). Por fim, ótimos exemplos de usos das issues no GitHub são das comunidades PHPSP e PHPRio, que as utilizam para organizar os palestrantes e sugestões de palestras (afirmativa 3).

## Forks e pull requests

Uma forma de trabalhar em projetos com mais de uma pessoa é criando forks do repositório no seu perfil, e com isso adicionamos no repositório original apenas aquilo que foi modificado pelo nosso repositório (isso garante com que não tenhamos coisas maliciosas entrando no nosso projeto), para isso fazemos pull requests pelo próprio github mesmo.

Já vimos como sugerir melhorias ou reportar problemas utilizando issues, mas o nosso trabalho no mundo Open Source pode ser mais ativo. Através de pull requests, nós podemos enviar melhorias e correções para projetos.

Por que utilizar pull requests e não editar o projeto original?

Para garantir a qualidade do projeto pelos seus líderes e organizadores

Alternativa correta! Através de pull requests, os principais mantenedores de um projeto podem analisar todas as alterações, aprová-las ou reprová-las, dar feedback e interagir de uma forma geral. Pull requests não são utilizados apenas para projetos Open Source. Muitas equipes utilizam pull requests em seu dia-a-dia, para enviar as alterações de código para revisão de algum supervisor.

### Juntando commits para não dar tanto trabalho pro cara que vai analisar o nosso PR

Com `git log` vemos os últimos commits feitos pelas pessoas do projeto, com isso podemos juntas os três ultimos commits com:

```git
git rebase -i HEAD~3
git rebase -i <hash do commit anterior aos commits que eu quero juntar>
```

E assim aparece uma nova tela complexa com o vim onde temos pick para todos os commits, se eu quero juntar eu coloco s de squash (juntar) e salvamos a alteração e assim estaremos criando uma nova mensagem para essa junção de commits, aí so commitar fazer o PR e ser feliz

Tendo entendido o que são issues e pull requests, nada mais justo do que enviar um pull request para resolver uma issue, certo? Mas quando desenvolvemos, podemos realizar vários commits, o que pode não ser tão interessante para quem for revisar o pull request.

Por que é interessante unir os commits em um único para enviar um pull request?

Para que o responsável pela revisão do projeto tenha um único commit a revisar, com todas as alterações necessárias

Alternativa correta! Revisar um único commit é bem mais fácil e rápido do que analisar diversos commits que resolvem um problema em comum. Por isso, nestes casos, é interessante utilizar o `git rebase -i`.

## Outras ferramentas legais para o open source

E elas são:

- BitBucket (pode ter repositórios privados para equipes, acho que o github mudou isso em 2020 mas sla)

- GitLab (um github com mais superpoderes que o github para equipes, servidores de CI e CD de maneira muito mais simples, ela é mais robusta só isso)

O GitHub lançou recentemente a opção de ter repositórios privados para projetos com até 3 colaboradores.

## Cherry picking 

conforme vamos trabalhando, acabamos nos deparando com um cenário que possui uma linha de desenvolvimento master (principal), com vários commits, uma correção de bug, com merge para o master. Porém, temos um release, com a qual estamos trabalhando, cujos commits ainda não trouxemos ao master por não estarem prontos.

Então, não poderemos simplesmente aplicar um merge ou um rebase destes commits; queremos pegar apenas as alterações feitas no segundo commit, pois precisaremos deles para algo no master. Poderemos, então, copiar o hash do commit desejado, e trazer manualmente para onde queremos, que seria o branch atual. Para fazermos isto, usaremos `git cherry-pick 8f7c801` no Visualizing Git, sendo 8f7c801 o hash.

O cherry pick é uma solução de conflito onde ele traz um único commit para a branch que eu quiser

No último vídeo, vimos como podemos trazer um único commit específico de outra branch para a branch em que estamos trabalhando.

Em que caso faz sentido trazer um commit específico para a branch atual?

Quando um bug que afeta a branch atual já foi solucionado em outra branch

Alternativa correta! Se uma implementação é necessária em sua branch e já foi feita em outra branch, pode fazer sentido trazer um commit específico, utilizando o git cherry-pick.

## Bisect

No último vídeo, nós utilizamos o git bisect para encontrar determinado ponto na história do código em que alguma alteração foi introduzida. Fizemos isso, informando os estados do commit (se estava "bom" ou "ruim").

Para que o git bisect pode ser útil?

Para encontrar o commit em que um bug foi introduzido

Alternativa correta! Encontrando o exato commit em que determinado bug foi introduzido, podemos revertê-lo ou até mesmo tentar entender o motivo daquele bug ter sido introduzido.

## Blame

Com o comando `git blame` eu consigo ver quem foi o responsável por alterar cada linha do projeto (ou culpar fulano pelo erro introduzido), mas não use ele para dar uma bronca em alguém por algo e sim pra ensinar ou até mesmo aprender caso você encontra a irregularidade

Com o git blame, podemos ver quem é o responsável por cada linha no código.

Para que isso pode ser útil?

Alternativa correta
Para saber para quem perguntar sobre determinado bloco de código que não entendemos

Alternativa correta! Com o git blame, nós podemos saber quem é o responsável por determinada linha ou bloco de código que nós não entendemos, e com isso sabemos com quem tirar a dúvida!

## Resumo

Que o comando git cherry-pick pode trazer um commit específico para a branch atual;
Como encontrar o commit em que determinada alteração foi aplicada, utilizando o git bisect;
Como encontrar o responsável por determinada linha ou bloco de código, utilizando o git blame;
Que jamais devemos apontar um culpado por determinado bug. Uma equipe deve ser unida e se ajudar;
Que o comando git show {hash} mostra todas as alterações aplicadas pelo commit com o hash informado.

## Estratégias de ramificação

A master (ou main agora) é a branch onde vai o código final, para produção. Então não devemos programar nada nela, somente garantir que o que vai lá é o código que está 100% correto e testado, sem falhas, então por isso eu devo ter outras estratégias de ramificação para trabalhar em meus projetos com outras pessoas.

Para remover uma branch eu uso `git branch -d <nome da branch>` ou -D caso essa branch esteja a frente da master (com commits a mais)

## Git flow

Aprendemos de forma bem resumida sobre a estratégia de organização de branches, chamada Git Flow.

Quais as branches presentes nesta estratégia?

Master, Develop, Branches de feature, Branches de Hotfix e Branches de release

Alternativa correta! Cada uma das branches tem um propósito bem definido e nos ajudam a manter o nosso controle de versões bem organizado.

Que é uma convenção bem seguida que a branch master tenha apenas os commits prontos para ir para produção;
Que não é interessante realizar trabalho e commitar diretamente na branch master;
Como remover uma branch:
git branch -d {nome_branch} remove uma branch que já tem seu trabalho unido à branch atual;
git branch -D {nome_branch} remove uma branch mesmo que os commits desta branch ainda não estejam na branch atual, ou seja, força a remoção;
Um pouco do processo chamado de Git Flow:
Entendemos que o estado do código representado pela branch master deve ser o mesmo que estará em produção
Vimos que deve haver uma branch de desenvolvimento (comumente chamado de develop), onde todas as funcionalidades e correções devem ser muito bem testadas antes de ir para produção (master)
Vimos que cada funcionalidade deve ser feita em uma branch separada, e que é comum que esta branch tenha feature/ como prefixo
Aprendemos também que bugs normalmente são corrigidos em branches separadas, com o prefixo hotfix/
Além disso, branches específicas para cada release são criadas para realizar os testes e correções de bugs específicos

A branch de hotfix tem que solucionar um problema de versão e mandar a resposta para a master e para a develop

## Ferramentas visuais

Git Cola -> Primeira interface gráfica multiplataforma para o git, o git cola te mostra separado todas as branchs do projeto e as diffs de forma bem mais amigável do que se fosse em um terminal, ela só não é muito bonita e não abarcar tudo o que o git pode fazer

GitHub Desktop -> é um aplicativo feito pelo próprio pessoal do github, o que é bem legal. nele você pode ver PRs, criar branches e outras coisitas mas, esse é um pouco mais interessante que o git cola

GitKraken -> Uma ferramenta que nos ajuda muito a implementar o git flow em nossos projetos, além de ter visualizações bem mais anteriores que os softwares anteriores

Na última aula, nós conhecemos algumas ferramentas que podem nos auxiliar com o controle de versões do nosso código utilizando Git. Isso pode levar ao questionamento: "Será que preciso mesmo aprender os comandos, se há ferramentas visuais que fazem o mesmo trabalho?"

Bom, é verdade que você conseguiria fazer quase todo o trabalho utilizando estas ferramentas, mas também é verdade que nem sempre elas estarão disponíveis.

Em algum momento da sua vida, você precisará acessar um servidor que não possui interface gráfica, ou manter o código de uma máquina que não é sua, logo, não tem suas ferramentas instaladas.

A questão é: em algum momento, você precisará saber como executar o trabalho direto pela linha de comando.

Aprenda a utilizar ferramentas que possam agilizar seu trabalho, mas aprenda a fazer o trabalho sem elas também! ;-)

Que há ferramentas visuais que podem nos auxiliar com o trabalho com o Git;
O Git Cola foi uma das primeiras ferramentas visuais multiplataforma. Embora não seja a mais complexa ou visualmente atraente, é bem completa e pode nos ajudar bastante;
O GitHub Desktop pode ser interessante para gerenciar os projetos do GitHub de forma mais ágil e facilitada, sem a necessidade de acessar o site;
O GitKraken é uma ferramenta extremamente completa, que nos auxilia inclusive com a implementação do Git Flow.

## Hooks e deploy com o git

Os hooks ficam dentro de uma pasta .git de todo o projeto que segue o git e são arquivos que são executados sempre antes ou depois de algum evento (como commit, push e afins), dentro dessa pasta temos arquivos .sample e aí colocamos os mesmo nomes que tem lá, criar um novo arquivo shell e só ser feliz.

Um hook bastante feito é antes de commitar fazer os testes para o projeto, ou linter, ou executar o deploy no hook do pre commit.

Vimos no último vídeo que o Git nos permite, através dos hooks, executar algum código quando determinado evento acontece.

Como podemos escrever um código que será executado em algum evento?

Criando um arquivo Shell Script, onde seu nome representa o evento, dentro da pasta .git/hooks

Alternativa correta! Para ver com mais detalhes os possíveis hooks (eventos), confira este site: <https://githooks.com/>.

### O deploy com o github

Nos hooks do servidor que a aplicação tem temos um hook chamos pre-receive, agora temos que criar um chamado post-receive e nela colocarmos o comando git com a work tree do prjeto e o diretório do servidor com o comando

```git
git --git-dir="<caminho>"  --work-tree="<caminho> checkout -f"
```

Essa é a forma mais rudimentar de fazer o deploy contínuo de uma aplicação, fica a dica dos cursos de entrega contínua, integração contínua, docker e gitlab CI e jenkins para processos mais legais

Na última aula, vimos de forma bem rudimentar como configurar um processo de entrega contínua do nosso código.

Por que chamamos o resultado que alcançamos de entrega contínua?

Porque a cada commit (a cada mudança significativa na base de código), podemos fazer um push e entregar o sistema em produção

Alternativa correta! Entrega contínua é uma série de práticas que permitem que o código esteja de forma rápida e simples em produção. Tão rápido e simples quanto rodar um git push. Para saber mais sobre o assunto, confira o curso Integração Contínua: Maturidade e Produtividade no Desenvolvimento de Software aqui na Alura.

Que o Git trabalha com eventos e os chama de hooks;
Que podemos definir códigos a serem executados quando determinado evento (hook) ocorrer;
A criar hooks dentro da pasta .git/hooks, utilizando Shell Script;
Que o nome do arquivo indica em qual hook (evento) ele será executado;
Que, com hooks, podemos executar os testes automatizados do nosso código, ou até mesmo colocar uma aplicação em produção.
