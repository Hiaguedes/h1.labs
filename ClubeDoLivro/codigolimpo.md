# Código Limpo - Uncle Bob

## Capítulo 1 - O código limpo

Ler livro de código é ultrapassado, não haverá mais programadores? Só precisaremos dar modelos, requisitos e especificações? Jamais! Que bom que as linguagens fiquem cada vez mais abstratas e que o numero de linguagens dedicadas a um dominio crescam, mas isso nunca acabara com a programacao pq no final é tudo codigo e elas vao precisar ser formais e detalhadas pra que um computador a possa entender e executar-las.

É no codigo que o ser humano consegue se comunicar com a maquina os requisitos do sistema que ele precisa, nós jamais eliminaremos a precisao necessaria de se criar uma estrutura formal, mesmo que criemos ferramentas que nos ajude a analisar a sintaxe ou que seja a mais proxima possivel da linguagem dos requisitos, sempre havera um codigo pra isso

### Código Ruim

No final da decade de 80, uma empresa criou um puta app e que se tornou extremamente popular e muita gente comprou e passou a utilizar-lo,só que ai o tempo foi passando o tempo das releases foi aumentando, os bugs não foram sendo concertados, o tempo de carregamento do app aumentou, os travamentos aumentaram e logo depois a empresa saiu do mercado.

Anos depois o autor encontrou um dos funcionarios da empresa e ele confirmou o que ja sabia, eles tiveram que apressar o lançamento do produto e ai o codigo foi ficando uma zona, e quanto mais features foram sendo adicionados o codigo so piorava até que simplesmente não dava mais pra gerencia-lo. 

E daí vem a primeira lição, código ruim atrasa, mas por que escrevemos dessa forma?

Mais tarde é igual a nunca e codigo confuso so diminui a produtividade

### O grande replanejamento

Vai rolar uma guerra entre trabalhar no sistema novo e manter o codigo legado funcionando, ja que que é que está funcionado, então precisa rolar uma complacencia enquanto o novo nao faz tudo aquilo q o antigo fazia e dependendo do tempo que o novo sistema leva para ficar pronto muitas pessoas podem entrar e sair da empresa, deixando o atual sistema confuso

### Atitude

As maioria dos gerentes quer a verdade, entao eles querem um codigo bom mesmo q estoure o prazo, o paciente nao reclama com o médico por que ele esta lavando muito as maos antes de atendelo, entao nao seria profissional que os programadores cedam a vontade e façam codigos ruins por conta do prazo

O lance é profissionais serios sabem que um codigo bagunçado diminuem a velocidade e por isso nao o fazemos

### O que é um codigo limpo? Por especialistas

#### O criador do C++, do nome dificil Bjarne Stroustrup - Elegancia

código elegante e eficiente, direta pra dificultar o encobrimento de bugs, dependencias minimas para facilitar a manutencao e o tratamento de erro de acordo com uma estrategia clara e desempenho proximo do eficiente de modo a nao deixar o codigo mais confuso com a alteracao de outras pessoas, o codigo limpo faz apenas uma coisa

Elegancia - leveza, simplicidade, naturalidade no modo de dispor, requintado, estiloso. A deselegancia incita em um crescimento de caos no codigo

#### Grady Booch - autor do livro Object Oriented Analysis and Design with Application - simples e direto

Um codigo limpo é simples e direto, ele é muito legível quanto uma prosa bem escrita, ele nao torna confuso o objetivo do desenvolvedor, ele esta repleta de abstracoes claras e linhas de controle objetivas

#### Dave Thomas - OTI e padrinho da estratégia eclipse - ler e entender o codigo, sem precisar chamar.

Um dev pode ler e melhorar um código limpo, eles tem testes automatizados e de aceitação, nomes claros e oferece uma maneira de resolver o problema, possui poucas dependencias as quais sao explicitamente declaradas e tem um api enxuto minimo e claro, o codigo deve ser inteligivel

#### Michael Feathers - Working Effectively with legacy code - alguem que se importa com o que escreve

Um código limpo sempre parece que foi escrito por alguém que se importava, nao ha algo obvio no que se pode fazer para tornar lo melhor, tudo foi pensando pelo autor do código.

Como se importar com o código.

#### Ron Jeffries- autor do xp programming installed and extreme programming adventure in C# - nao fazer a mesma coisa sempre

- Efetuar testes

- nao duplicar codigo

- expressar todas as ideias de codigo

- minimizar o numero de entidades, classes, metodos e funcoes

Abstracao de funcionalidades, como ele escreveu um texto bem longo vale aqui a leitura do que foi dito

#### Ward Cunningham - o criador do conceito Wiki, cocriador da xp, incentivador dos padroes de projeto, lider da smalltalk e da oo

Voce mostra que esta criando um codigo limpo quando cada rotina quee voce le se mostra como vc espera, e codigo belo é quando voce faz parecer que a linguagem foi feita para aquele problema.

Cada módulo prepara o terreno para o seguinte

#### Do autor

No final temos escolas de pensamento (como o jiu-jitsu é) e a questão é não ignorar elas

A maior parte da vida de um programador é lendo o codigo e por isso o codigo ele deve ser limpo e deve ser mantido como limpo

Deixe a área do acampamento mais limpa do que como voce encontrou

Comece devagar, troque o nome da variavel, divida funcoes que estao grandes demai, elimine um pouco as repeticoes de codigo, reduza if aninhados

## Nomes significativos

Quando fazemos um software nós damos nomes a um monte de coisas

Dar bons nomes leva tempo mas economiza mais portanto troque-os quando encontrar nomes melhores, todos que lerem seu código (incluindo voce) ficarão agradecidos.

### Dicas para bons nomes

Use nomes que revelem seu propósito 


