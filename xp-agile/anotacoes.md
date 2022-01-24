# Extreme Programming: Metodologia de desenvolvimento ágil de software

Curso da alura

## Por que projetos falham?

- cliente distante
- cereja do bolo (colocar aquele pedacinho q deixa o projeto especial)
- testes no final (as vezes somente teste manual)
- trabalho empurrado (ter que fazer coisas muito rapido)
- dividas tecnicas

### Cliente distante 

A equipe de dev recebe uma especificacao e percebe que algum detalhe passou despercebido

e por nao saber tudo do que o cliente precisa se entra num processo de tentativa e erro e ruido de comunicacao entre dev e negocio

### Cereja do bolo

Tanto a equipe de desenvolvimento quanto o cliente possuem expectativas.

Se o cliente solicita um relatorio com colunas A,B e C isso e o que deve ser entregue, esse algo o mais o cliente pede, as expectativas tem que ser resolvidas no menor tempo possivel

### Testes no final

Ta pronto so falta testar

Por que testar, e necessario? se sobrar tempo a gente testa

Testes nao sao uma etapa a parte do desenvolvimento, os processos de desenvolvimento e teste devem ser vistos como um so

### Trabalho empurrado

Acabamos de fechar um novo contrato e o sistem que estar pronto semana que vem

a equipe de dev ate pode tirar uma solucao a toque de caixa mas ela trara grandes problemas no futuro

### Dividas tecnicas

Esse sistema e legado, faz de qualquer jeito

Dividas tecnicas deterioram a produtividade ao longo do tempo, quanto menos se liga para a qualidade de software mais se fere a produtividade com o tempo

Dividas tecnicas sao 

São os detalhes técnicos, geralmente de código, que "deixamos para lá".

Alternativa correta! Um método muito grande, uma classe muito acoplada… Estes detalhes (dívidas) vão se somando e podem gerar um enorme problema.

## O que e XP??

Programacao extrema e considerada uma metodologias agil pois se ajuda bem a pequenas e medias equipes em desenvolvimento de software com requisitos vagos e em constante mudanca

Agil (se adaptar a mudancas mas sem seguir a um plano)

A grande ideia aqui e desenvolver software com qualidade porem se adaptando a mudancas

Na pratica e um conjunto de valores, principios e principalmente paraticas que tornam o processe de desenvolvimento mais efetivo e eficaz

Ela surgiu de kent beck, ron jeffries, ward cunningham e martin fowler participaram de um projeto de alta complexidade e risco para garantir que tudo correria bem e seguiram uma serie de praticas e sugestoes e a partir desse projeto formalizaram a metodologia

Uma das praticas era de fazer os testes antes de desenvolver

### Tamanho de uma equipe xp

A metodologia era pensada para equipes pequenas de ate 12 pessoas em media, mas ai em 2004 cynthia andres e kent beck lancaram uma segunda edicao do livro de xp, tornando a ideia mais inclusiva, abrangente e flexivel, possibilitando a adocao por times de quaisquer tamanhos

XP possui 5 valores, alguns principios e varias praticas

### Valores

- Comunicacao
- Simplicidade 
- Feedback
- Coragem 
- Respeito

Sao valores que sao pensados para uma equipe de desenvolvimento, nao necessariamente a vida pessoal ta 

### Principios

- Humanidade
- Economia (aproveitar melhor dos recursos e fazer de forma economica)
- Beneficio mutuo
- Auto semelhanca (se algo ja funcionou entao reimplementa)
- Melhoria (melhoria constante)
- Diversidade (diversidade de pensamento e trazer solucoes de formas diferentes)
- Reflexao
- Fluxo (fluxo bem definido)
- Oportunidade (qualquer adversidade e uma nova oportunidade)
- Redundancia (estar pronto para um novo ripo de problema)
- Falha (falahs vao acontecer e estaremos pronto para receber uma feedback sobre)
- Qualidade (a principal palavra que importa pro xp)
- Passos pequenos (passos pequenos para novas funcionalidades e melhorias)
- Aceitacao (o erro nao e de um e sim da equipe)

### Os papeis no xp e pq e importante ter-los

O objetivo nao e fazer com que as pessoas preencham papeis abstratos, mas sim fazer com que cada membro da equipe contribua com o melhor de si para o projeto

- Desenvolvedor
- Cliente (PO aqui)
- Coach (os rituais estao sendo cumpridas e boas praticas de agile estao sendo cumpridas)
- Testador (e a pessoa q ira extrair os testes que serao escritos dos clientes)
- Cleaner (o cara focado na qualidade e forcar as boas praticas de codificacao)
- Tracker (o que extrai as metricas de qualidade)
- Gerente (nao e o lider e somente a pessoa q facilita a comunicacao entre o cliente e a equipe)
- Outros

http://www.desenvolvimentoagil.com.br/xp/papeis/

Nao necessariamente uma pessoa tem apenas uma funcao

mas o coach e o gerente vao ter conflitos e e bom essas pessoas serem diferentes, mas um cleaner e um dev podem ser a mesma pessoa

Cada pessoa pode oferecer o melhor de um papel do xp

## Falando de valores

Praticas serao conversados mais a frente

### Comunicacao 

Embora existam inumeras formas de se comunicar ideias, algumas sao mais eficazes que outras

A Comunicacao deve ser a mais clara e eficaz possivel, as metodologias ageis dizem q a comunicacao face a face e a melhor possivel por que extrapola a fala, priorize chamada de videos 

Quanto maior a capacidade de compreensao, maiores as chances de evitar problemas como ambiguidades, entendimento equivocado e outros

Aqui temos que focar em focar em melhorar a nossa comunicacao e melhorar nossa absorcao de ideias

### Simplicidade

Muitos times estao acostumados com a partica de futurologia, sofrendo da sindrome de nostradamus

A parte de simplicidade e a arte de maximizar a quantidade de trabalho nao realizado, ou seja evitar trabalho que nao e necessario

A simplicidade se da tanto na codificacao quanto na comunicacao e na quaalidade, pois preza pela sofisticacao 

Coisas explicitas sao mais importantes do que implicitas

Ao manter um projeto simples, garantimos que o mais importante vai ser desenvolvido.


Alternativa correta! A simplicidade nos força a focar no que realmente importa e agregar mais valor. Ainda vamos falar especificamente sobre "Projeto Simples" como uma prática.

### Feedback

Mudancos nos requisitos sao bem vindas, mesmo tardiamente no desenvolvimento

Quanto mais cedo obtivermos um feedback mais cedo podemos agir e corrigir possiveis falhas, na adocao das praticas 
o feedback  e constante seja em relacao aos requisitos do cliente ou ao codigo em si

Feedback de se o que foi feito era realmente o esperado, feedback da qualidade do software, feedback dos testes, integracao continua
o feedback permeia todo o desenvolvimento de uma equipe extrema

Com comunicacao e simplicidade nos daremos bons feedbacks, feedbacks positivos devem ser incentivados

### Coragem

Uma pessoa junior deve refatorar o codigo escrito por uma pessoa senior?

Diversas praticas do XP fornecem os meios para que sim. As praticas devem dar a seguranca para que apenas a coragem seja necessaria
para realizar melhorias no sistema

A coragem se faz ainda mais necessaria nos momentos de crise, coragem e atitude de implementar oq se tem que implementar

Precisa-se de coragem para assumir certas mudancas, para se implemntar mudancas necessarias, de se comunicar e dar feedbacks e afins


É necessário ter coragem para admitir os erros e pedir ajuda quando necessário.


Alternativa correta! Ninguém sabe tudo. É normal errar e pedir ajuda em determinadas ocasiões.

Alternativa correta
É necessário ter coragem para se permitir errar e testar novas possibilidades de solução.


Alternativa correta! No mundo do desenvolvimento é comum precisarmos nos aventurar no desconhecido. Isso não deve ser um problema para uma equipe.

### Respeito

Pessoas que sao respeitadas sentem-se mais valorizadas

Alguns dos principios do XP sao humanidade e diversidade. O respeito deve prevalecer sempre entre a equipe e pelo cliente. Isso possibilita que todos os demais principios sejam implementados atraves das praticas

O respeito e a grande cola entre todas os valores profissionais, o reconhecimento de um profissional e impagavel. Quando respeitamos as pessoas a comunicacao fica mais facil.

## Xp e agilidade

Xp por ser um conjunto de praticas ela se abstem de sugerir determinadas cerimonias, e completamente comum e possivel unir XP com outras tecnologias, o xp prefere se omitir sobre ferramentas e rituais q vc deve adotar no agil pra isso ferramentas de agil como scrum e kanban servem para gestao. A intencao aqui e sobre como o dev deve (kkk) deve praticar boas praticas de trabalho em equipe para se adequar no agil e melhorar seu time para que se tenha boa produtividade e sanidade na hora de desenvolver seus projetos

## Gestao e projeto

### Cliente presente 

Clientes nao esperam que voce seja perfeito, eles esperam que voce resolva coisas que eles fizeram errado

Escrever especificacoes leva um tempo muito longo e elas nao comunicam efetivam vem, tantos que poucas pessoas realmente as leem por completo

Isso e de responsabilidade do trabalho dele e de outras pessoas ligadas ao negocio e podera acontecer de qualquer forma, com ou sem a sua presenca

Clientes sabem as dores que eles sentem e cabe a pessoa de negocio priorizar coisas que sao mais importantes para eles do que devs

o ideal e ter pessoas que vao realmente utilizar o sistema proximo, as vezes ate mesmo na equipe de desenvolvimento, as vezes nem sempre e possivel, mas nem sempre isso e possivel, entao o ideal e que tenha alguem de negocio proximo para essa funcao

Nesses casos e necessario maximizar a comunicacao buscando outras alternativas de tecnologia e de processo de desenvolviemnto, utilize ao maximo a comunicacao por telefone ou reunioes virtuais o trabalho por reunioes remotas e uma boa alternativa

Entendemos neste vídeo que é uma boa prática manter o cliente sempre presente, o mais próximo possível da equipe de desenvolvimento.

Que vantagem real temos ao mantermos o cliente presente?

Alternativa correta
Menos falhas na comunicação e implementações incorretas.

Alternativa correta! Quando o cliente está próximo, conseguimos validar de forma muito rápida se o entendimento de uma funcionalidade está correto ou não, por exemplo.

### Time coeso

Individuos e interacoes mais que processos e ferramentas

O time e uma unidade, e nao e atoa pois como foi dito anteriormente, o time erra, o time e culpado e o time concerta o problema, um grupo coeso tem todas as competencias e valores de um negocio e tecnicas

Um grupo tem todas as competencias para obter requisitos e recursos para realizar tarefas, planejar as tarefas, desenvolver, testar, jogar em producao, o time extremo deve ser capaz de fazer isso tudo sozinho, sem depender de times externos, de empresas externas, de permissoes

Quantas pessoas faltantes sao necessarias para travar cadeias de desenvolvimento, se o numero for pequeno isso e um problema, um time coeso e multidisciplinar e nao depende de uma unica pessoa

Um time coeso

possui maior comunicacao por estar integrado
busca continuamente a simplicidade
constroi confianca por ter coragem
gera feedback
por meio do respeito mutuo

#### Caracteristicas de um time coeso

- Multidisciplinar
- Auto organizavel (o time e responsavel por ele mesmo)
- Fisicamente proximo
- Busca melhoria continua

### Posse coletiva

Com a posse coletiva qualquer membro ou par do time pode implementar uma funcionalidade, arrumar um bug ou refatorar em qualquer parte do codigo a qualquer momento

No XP todos tem a responsabilidade pelo sistema, isso encoraja cada membro do time a sentir-se responsavel pela qualidade do todo

O termo original no livre do eXtreme Programming e collective ownership e nao apenas code ownership porque todos os artefatos no desenvolvimento sao de posse coletiva do time, nao so o codigo

Nao existe responsavel pelo CI/CD, ou do teste, todos sao parte daquilo e sao agentes de mudanca para melhor dessas coisas

Quando a posse nao e coletiva somente uma pessoa e dona do codigo e os programadores devem submete-la para revisao e aprovacao

Code review excessivo pode ser uma desconfianca do time e tem ferramentas melhores do que essa propostas pelo xp

Desenvolvimento de software e uma maratona e nao uma corrida de 100m, ou seja ela leva um ritmo sustentavel de desenvolvimento

Produtividade em longo prazo e o ponto chave aqui, durante uma semana ou pouco mas o time consegue produzir mais trabalho com horas extras, porem a longo prazo e inviavel porque o rendimento vai decaindo semana a semana, o ritmo e constante e cadenciado e nao rapido no comeco e parado depois para todo mundo passar

### Foco no que importa

98% de nosso pensamento esta realmente acntecendo em um nivel insconsciente grande parte atraves de metaforas

Muita das coisas que interagimos em um sistema sao metaforas q ligam com significados reais, como um carrinho de comprar em um ecommerce, ou pastas de arquivos para colocar fotos de viagem e coisas do tipo, essas coisas facilitam no entendimento do que se esta sendo feito, e simplificam estruturas complexas de computacao, isso sao metaforas

No XP, a metafora de sistema traz uma visao comum que auxilia o time e o cliente a entender os elementos do sistema, essas metaforas sao otimas para comunicacao entre equipes tecnicas e nao tecnicas

O ddd tenta exemplificar essa ideia e tornar o desenvolvimento mais simples utilizando-se de linguagem ubiqua, se essa linguagem for usada o nosso codigo se torna mais expressivo e facil de se manter

A simplicidade e o mais alto grau de sofisticacao

Tentar prever o futuro e anti-XP, nenhuma funcionalidade adicional e implementada pois desvia do caminho da solucao e aumenta a complexidade do software

MVP (minimium viable product) e o produto que possui a maior quantidade de valor na menor entrega possivel, sendo suficiente para o cliente utilizar e dar feedback ao desenvolvimento

## Planejamento

Os autores nao inventaram essas praticas mas elas sugerem o que estao abaixo

### User stories

Historias nao sao requisitos; elas sao discussoes sobre como resolver problemas para nossa organizacao, nossos clientes e nossos usuarios que levam a acordos sobre oq construir

Historias sao conversas que levam a acordos sobre o q construir, ela leva a discussao sobre os requisitos e nao sao os requisitos em si

Historias de usuario descrevem seus requisitos em uma forma agil. Para discutir seus detalhes e necessaria a comunicacao face a face entre o time e o cliente, encorajando o trabalho conjunto

A essencia da utilizacao de historias de usuarios como requisitos esta de acordo com os valores do manifesto agil

#### Modelo 3C

Famoso JIRA

Cartao - as historias devem ser escritas em cartoes (ou em algo do tamanho de um cartao)

Conversacao - O requisito e comunicado do cliente ao time por conversacao de forma direta

Confirmacao - A confirmacao da historia se da atraves de criterios de aceite

Ciclo de vida - Cada historia segue um ciclo de via sendo refinada progressivamente, elas normalmente nascem como epicos, sao refinadas para historias e depois viram tarefas

#### Modelo Connextra

Como um ... (o tipo de usario)

Eu quero ... (funcionalidade em si)

Para que ... (descreve um beneficio)

----

Como um repositor de estoeques

Eu quero consultar os items disponiveis

Para que eu possa verificar quais itens repor

User Story Mapping: Discover the Whole Story, Build the Right Product (Jeff Patton): https://amzn.to/3q4gcl8
User Stories Applied: For Agile Software Development (Mike Cohn): https://amzn.to/39fOD2h

### Planejando como fazer

Planos nao sao nada, planejamento e tudo

Reagir a mudancas ao inves de seguir um plano, pq planos mudam o tempo todo, mas seguir planejamentos pontuais sao a chave aqui e as regras do jogo sao definidas pelo time

Nele o cliente tem o direito de informar as historias, bem como indicar a prioridades das mesmas, o jogo do planejamento evita essa entrega empurrada, pois o time de desenvolviemnto tem o poder de dizer o quanto vai demorar a entrega

#### Planning poker

Atribuicao de pontos de desenvolvimento pra historia 

### Entregas pequenas

Software funcionando e a medida primaria de progresso

No XP, cada release deve ser tao pequene quanto possivel e com o maior valor de negocio

As pequenas entregas contem as historias de usuario identificadas e priorizadas no jogo do planejamento

#### Vantagem de pequenas entregas

- Entrega de valor adiantado e continuo 

- O processo e aprimorado rapidamente por falhar mais cedo (conceito fail fast)

- Maior qualidade, confianca e estabilidade

- Realiza um design simplificado e suficiente apenas para a entrega em questao

- O codigo e atualizado e integrado com maior frequencia

- Maior engajamento do time por ver seu trabalho sendo util e empoderado

#### Teste de aceitacao

Testes de aceitacao sao mapas da estrada para a iteracao, dizendo ao time onde e  e preciso ir e quais pontos de referencia olhar

Quando os desenvolvedores, os testadores e o cliente concordarem com os criterios para os teste de aceitacao, todos entenderao qual e o plano para o comportamento do sistema

Os testes validam como o cliente aceitara as funcionalidades prontas, pois sao testes funcionais que guiam o time no desenvolvimento para, entao colocar em producao o que foi decidido que o sistema deve conter

Testes de aceitacao sempre tem de ser automatizados por conta do custo

Para fazer pequenas entregas e necessario que os testes de aceitacao estejam automatizados

#### Validando com criterios de aceitacao

Cada historia de usuario possui um ou mais criterio de aceitacao, craido tambem pelo cliente. 

##### Modelo de escrita (gherkin)

Dado que ... (no estado necessario)

Quando ... (uma acao for executado)

Entao ... (o resultado esperado e)

### Prototipando

Spikes de planejamento - ou prova de conceito

Algumas vezes, a melhor maneira de resolver um problema e ir para casa, jantar, assistir TV, ir para a cama e entao acordar na manha seguinte e tomar um banho

Os spikes de planejamento fazem parte de uma pratica que ajuda o time a gerar o conhecimento necessario para estimar as historias de usuarios corretamente, diminuindo, assim o risco no planejamento

O objetivo e aumentar a confianca para um bom jogo do planejamento. Um spike e um programa muito simples para explorar solucoes potenciais, e um programa simples para explorar possiveis solucoes

Faca spikes arquiteturais para descobrir respostas em dificuldades tecnicas e em problemas de design, ou para conhecer novas tecnologias (APIs, framweworks, ferramentas, linguagens de programacao, etc)

Quando uma dificuldade tecnica importante surgir, deixe um par de desenvolvedores tentar resolver por alguns dias ate ter certeza suficiente sobre sua solucao

Os spikes podem ser estimados, portanto trata-se de um momento planejado, garantindo-se que sera feito durante uma iteracao

Preferencialmente faca-o em uma iteracao e somente desenvolva a historia de usuario relativa na proxima

Lembre-se que ele serve para diminuir o risco da estimativa que servira no proximo planejamento, e tambem nao se esqueca de nao aproveitar seu codigo

Vimos neste vídeo que existe uma prática chamada Spikes de Planejamento, semelhante ao que chamamos de Prova de Conceito.

Qual o propósito de realizar provas de conceito ou spikes de planejamento?

Conhecer as tecnologias ou as dificuldades para implementar uma solução complexa.

Alternativa correta! Ao realizar esta prática, podemos ter uma noção das dificuldades que enfrentaremos no desenvolvimento real da funcionalidade.

## Pratica de codificacao

A quantia de tempo gasto lendo codigo versus escrevendo e bem mais de 10 para 1. Entao, fazer o codigo mais facil de ler, o torna mais facil de escrever

Pelo fato de todos no time XP estarem trabalhando juntos em cada parte do sistema, refatorando codigo e trocando de pares frequentemente nao se pode haver diferentes formas de codificacao

Um padrao torna-se necessario, pois deve facilitar a comunicacao entre o time, encorajando a posse coletiva, e evitando problemas na programacao em pares e na refatoracao

O padrao deve ser estabelcido e concordado pelo time, pois faz com todos o utilizem efetivamente, caso a equipe fara insatisfeita e evitara ao maximo seu uso.

Sua existencia vale muito mais do que a sua forma, por que ele pode ser revisto e evoluido de acordo com seu uso

Aqui e o eslint uahsuahs

Quando falamos de padrões de codificação, podemos falar também de ferramentas que garantem que este padrão está sendo seguido.

Não vou citar nenhuma aqui pois senão precisaria citar para diversas linguagens, mas sem dúvida sua linguagem favorita possui uma ferramenta que permite verificar se o código escrito está dentro do padrão especificado.

### Testando antes TDD

O xp nao inventou essa pratica mas insentiva muito essa

Eu nao sou um excelente programador, sou apenas um bom programador com excelentes habitos - Kent Beck

O tdd e uma tecncia para construcao de softawre que guia seu desenvolvimento por meio de escrita de testes

Write a failing test -> Make the test pass -> refactor -> write a failing test -> ....

Para você entender de forma simples o que e como é TDD: https://youtu.be/o_C_qxhPws4

Se você quiser aprender na prática sobre TDD usando alguma ferramenta para sua linguagem favorita: https://cursos.alura.com.br/search?query=TDD.

### Mantendo a consistencia

Integracao continua

Integracao continua nao livra os bugs, mas os tornam dramaticamente mais faceis de encontrar e de remover

IC e uma pratica, na qual o codigo esta sendo desenvolvido pelo time e integrado, versionado, construido e verificado diversas vezes ao dia em um ambeinte dedicado

Os programadores XP devem integrar e fazer um commit em somente uma versao ao repositorio de codigo

Cada integracao e verificada por um build com testes automatizados, detectando erros o mais cedo possivel

Essa pratica gera sinergia com as outras do XP

Os buiolds das pequenas entregas sao constuidos por meio da IC, ela verificara o build automaticamente a cada commit realizado no repositorio, em cada um o padrao de codificacao pode ser verificado automaticamente, alem de ter os testes de aceitacao executados tambem

QAuando alguem da equipe for o responsavel por ter quebrado o build, ele deve comprar um pacote de doces para preencher o pote de balas do time, essa e uma maneira leve e descontraida de evitar que ele seja quebrado por descuidos

Já falamos bastante sobre qualidade durante esse treinamento, e nesse capítulo nós focamos em algumas práticas que mostram como atingir uma maior qualidade no desenvolvimento.

Por que qualidade de software é tão importante para essa metodologia (XP)?

Alternativa correta
Pois quanto maior a qualidade de um software, mais previsível ele é, e mais fácil de evoluir também.

Alternativa correta! Um software bem escrito permite que novas funcionalidades sejam desenvolvidas com produtividade e segurança. Desta forma podemos continuar agregando valor ao longo do tempo

## Melhorando e informando

### Refatoracao

Qualquer tolo pode escrever codigo que o computador pode entender, bons programadores escrevem codigo que humanos possam entender

Sempre deixe o codigo mais limpo do que quando voce o encontrou - regra do bom escoteiro

Refatoracao e tambem chamada de refinamento incremental e mantem a semantica da funcionalidade, alterando apenas o design

Uma refatoracao e uma mudanca feita na estrutura interna do software que o faz ficar mais facil de entender e mais barato de modifica-lo, sem mudar seu comportamento observavel

Falamos bastante sobre refatoração neste treinamento, e vimos que é uma das práticas sugeridas pelo XP.

Na prática, o que significa "refatoração"?

Alternativa correta
É o ato de melhorar o código sem mudar a funcionalidade.


Alternativa correta! Essa é uma simples definição do que é refatoraçao. Quando refatoramos um código, nenhuma funcionalidade é alterada, mas temos um código com mais qualidade, que pode ser mantido e estendido com mais facilidade.

### Daily

Ter as melhores ideias, o codigo mais afinado ou o pensamento mais pragmatico e em ultima instancia esterial a menos que voce possa se comunicar com outras pessoas

Nao adianta nada ser um otimo programador se voce nao se comunica com a equipe

Para garantir que a equipe se mantenha coesa

Voce ja participou de reunioes longas e improdutivas. A resposta e tao obvia que ate parece uma pergunta boba, reunioes estao no topo da lista de coisas entediantes que desperdicam o tempo da maioria dos desenvolvedores 

A daily sao focadas e rapidas ocorrem no comeco do dia e duram ate quinz minutos

O time mantem-se alinhado, trocando conhecimento constantemente

O que voce fez ontem

O que voce vai fazer hoje

Ha impedimentos no caminho

20 s por resposta, ser o mais sucinto possivel. E falar sobre funcionalidades

A funcionalidade da daily e comunicacao, manter o time coeso e antenado ao que se esta sendo feito

#### Erros comuns

- Reunioes de status

- Discutir solucoes

- Time nao ve valor

- Nao ter horario fixo

- Sem local dedicado

- Nao sabe ouvir

- Nao se reunir pois alguem faltou

#### Programacao em par

Dados olhos suficientes, todos os erros sao obvios

nenhuma pessoa pode possuir tanto conhecimento quanto todas as pessoas juntas

Sabe-se que revisao por pares e uma boa pratica de desenvolvimento que aumenta a qualidade do software e a colaboravcao no time, visto que e produtivo que tal programar e revisar em pares o tempo inteiro:

No XP, todo o codigo de producao e criado por programacao em par, isso significa ter duas pessoas piloto e copiloto trabalhando juntas em apenas um computador, com foco em uma unica tarefa e ao mesmo tempo

O que o XP indica e programar em par quando o codigo de producao for escrito, nao necessariamente se deve programar em par 100% do tempo, pois atividades, como pesquisas e leituras nao tem esse necessidade

Trabalhar dia a dia ao lado de um colega exige habiidades sociais que levam tempo em apreder porem aumenta a cooperacao no time, independente do status da funcao de cada integrante

Programacao em par nao e mentoria, uma vez que e um trabalho colaborativo entre ambas as partes, independente de terem muita diferenca nas experiencias

##### Vantagens

- Revisao de codigo continua

- Discussao continua

- Afinamento do par

- Aprendizagem

- Gestao do conhecimento

- Trabalho colaborativo

- Motivacao

Pair programming e trabalho em equipe

- Sua ideia primeiro

- Pensar alto

- Regra dos dez segundos

- Ciclo de tempo

- Ciclo de TDD

Revezamento de piloto e copiloto, ciclo de desenvolvimento, um faz o teste e o outro aplica
