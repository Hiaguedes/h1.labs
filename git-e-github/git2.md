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
