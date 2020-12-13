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
