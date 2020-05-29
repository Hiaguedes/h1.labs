# Linux 2

Aqui vamos abordar questões de licenças e de segurança. Como que os códigos são abertos entre empresas e pessoas físicas sem nenhum problema, quais são as diferenças entre GPL, Creative Commons e BSD e um pouco da filosofia open Source e como se ganha dinheiro com isso.

Coisas básicas de TI, questões de privacidade e senhas, o que é o terminal ou console e o shell, disponibilização de conteúdo na nuvem.

## Filosofia Open Source

Inicialmente o linux tinha sido licensidade pelo GPL (General Public License), criada pela Free Software Foundation e emcabeçado pelo Richard Stallman, gordinho barbudo e invocado. Mas isso assusta por que como assim o software é grátis? Eu trabalhei de graça e outra pessoa está recebendo isso de graça? Então deve ser ruim né por que nada que é bom vem de graça. Sim, mas não é bem assim hahaha 

O free vem de free and open-source software (FOSS), então o código inteiro do projeto está lá, livre para ser compartilhado e espalhado, o free é de livre código livre, sem amarras sem máscaras, quem quiser e ter a capacidade pode alterar e mudar o código e passar para frente. E para frisar que é livre você coloca um l de libre como FLOSS (Free and Libre Open-sour Software), já que o FOSS falhou na mensagem de dizer o código ser livre e de graça também. Então surgiram diversas regras sobre o que é livre e o que você fazer para publicar esse software e cada licensa tem sua particularidade por conta disso.

Detalhes sobre cada uma delas pode ser vista em https://www.gnu.org/licenses/license-list.en.html, então eu como desenvolvedor tenho que está atento a isso, como usuário final nós somente estamos de acordo com o End-user license agreement (EULA) que normalmente não lemos e somente concordamos no final.

As licensas que mais valem a pena são o GPL, e o BSD e a que mais está sendo usada no momento pelo GitHub é a MIT. E as licensas servem para dizer qual a responsabilidade de quem usa e de quem fez naquele projeto e tem uns que são mais permissivos e outros que só te permitem usar e só mais nada, ou seja mais restritivas. As mais permissivas tendem a pertencer ao termo FLOSS.

Quando as pessoas contribuem para um projeto específico é sobre a mesma licensa.

### Licença GPL

A free software foundation é uma organização que tenta chegar numa conclusão daquilo que deve ser gratuito daquilo que não é, sendo engajado até politicamente nesses assuntos para a vida como um todo, mas nem sempre tudo que eles defendem outras pessoas defendem tendo a Open Source Initiative (OSI), que não é tão engajado politicamente e sim focado em distribuir programas livres e no desenvolvimento de programas livres de fato.

Em termos gerais, a GPL baseia-se em 4 liberdades:

- A liberdade de executar o programa, para qualquer propósito (liberdade nº 0)

- A liberdade de estudar como o programa funciona e adaptá-lo às suas necessidades (liberdade nº 1). O acesso ao código-fonte é um pré-requisito para esta liberdade.

- A liberdade de redistribuir cópias de modo que você possa ajudar ao seu próximo (liberdade nº 2).

- A liberdade de aperfeiçoar o programa e liberar os seus aperfeiçoamentos, de modo que toda a comunidade beneficie deles (liberdade nº 3). O acesso ao código-fonte é um pré-requisito para esta liberdade.

E se o código nasce como GPL ele vai sendo auterado e mantido como GPL ainda.

Então eu até posso vender esse software, ou somente o binário dele. Mas eu forneço o código fonte no arquivo zipado ou de qq outro meio que eu for disponibilizar esse código pro cliente, e se alguém pedir eu tenho que mandar mesmo que seja por tempo limitado. Isso fez com que a Microsoft uma vez tenha dito que essa licensa é cancerígena pois se você usou em algum momento software GPL toda a fonte de códigos se torna GPL com uma velocidade imensa, uma vez que a microsft tem softwares totalmente restritos.

A licensa GPL permite a revenda (desde que seja como GPL), o que pode abrir margem para certas falcatruas que não são legais, afinal quem supervisiona tudo o que acontece né?

O GPL tem três versões e segundo o GitHub a licensa GPL mais usada é a versão 2.

O que acontece se eu como empresa não distribuo o código fonte quando alguém pede? Ou não cumpro com as regras estabelecidas? Ou seja violando com os direitos de alguém que criou aquele software de origem, ou recrio o código ou eu negocio com o cara que fez o código ou transforma em GPL o código mesmo, mas essa é mais difícil o comum é comprar os direitos mesmo.

As pessoas são livres para distribuir e modificar um software livre, mas o seu código-fonte deve cotinuar disponível para quem utilizar o software. Portanto a licença não permite que um software que utilize GPL seja alterado e distribuído sem o código-fonte. Caso o código-fonte não seja disponibilizado junto com os binários, eles devem estar disponíveis na internet.

Quando utilizamos a GPL, também precisamos dsitribuir as alterações com essa licença.

É possível cobrar pela distribuição de um software que utilize a licença GPL. Por exemplo, você pode gravar um CD com um programa e cobrar pela mídia, etc. Mas o preço deve ser justificável, pois lembre-se que as pessoas podem obter esse software facilmente.

### BSD

Da universidade de Berkeley e a licensa leva o nome da universidade (Berkeley Software Distribution) e assim como GPL ela tem diversas licensas derivadas, a ideia dele é ser simples e livre, você pode fazer o que quiser com ela desde que você não use o nome da universidade para o seu projeto, como se tivesse recebido apoio (financeiro, político ou emocional) ou qualquer coisa do tipo e a universidade não é responsável por esse produto que ela disponibiliza. A responsabilidade é inteiramente do autor.

Não há mais a necessidade de mostrar o código fonte, e se eu alterar o código e quiser redistribuir lo eu tenho que referenciar o código original e que esse é BSD, o seu novo código pode não ter essa licensa mais, mas eu terei que referenciar-la, então por isso diversas empresas acabam aceitando mais o BSD que o GPL para seus códigos pois o BSD não restringe essa obrigatoriedade na continuade do software

### Apache e Mozilla License

A licensa da apache lembra muito a da BSD mas ela define trrchos a mais no conceito de trademarking e patentes.

A mozilla public license o código que nasce como mozilla continua como mozilla e como open source mas eu posso incorporar novos trechos de códigos com outras licensas e esses outros códigos podem estar escondidos.

O fato é cada licensas tem suas liberdades e restriçoes mas que tentam a medida do possível ser abrangentes o suficientes para que você escolha aquilo que te convém para cada projeto.

### Creative Commons

Todas as licensas acima se referem a criação de código e o seu retrabalho feito por outra pessoa para que esse código específico atenda as suas necessidades, a creative commons pegou essa idéia para outros processos criativos da vida, como pintura, vídeos de youtube, fotos, filmes. Nisso nasceu a creative commons, que é um conjunto de licensas e que pode ser visto em https://creativecommons.org/licenses/

ou em protuguês: https://br.creativecommons.org/licencas/

Um resumo das mais importantes

- **CC BY**

Esta licença permite que outros distribuam, remixem, adaptem e criem a partir do seu trabalho, mesmo para fins comerciais, desde que lhe atribuam o devido crédito pela criação original. É a licença mais flexível de todas as licenças disponíveis. É recomendada para maximizar a disseminação e uso dos materiais licenciados.

é um licensa feita para alguém que quer ser conhecido e reconhecido como um bom profissional na área, e visa a aumentar seu alvo. Ou nem tem interesse em ganhar dinheiro mesmo, vale mais para hobbystas essa idéia

- **CC BY-SA**

Esta licença permite que outros remixem, adaptem e criem a partir do seu trabalho, mesmo para fins comerciais, desde que lhe atribuam o devido crédito e que licenciem as novas criações sob termos idênticos. Esta licença costuma ser comparada com as licenças de software livre e de código aberto "copyleft". Todos os trabalhos novos baseados no seu terão a mesma licença, portanto quaisquer trabalhos derivados também permitirão o uso comercial. Esta é a licença usada pela Wikipédia e é recomendada para materiais que seriam beneficiados com a incorporação de conteúdos da Wikipédia e de outros projetos com licenciamento semelhante.

Você compartilha quem fez aquele produto mas você terá que compartilhar da mesma licença que o produto original, essa ideia é legal pois ela simplifica bastante a linguagem das licensas, como não pode isso nao pode aquilo, ou by fulano de tal e se tornou uma linguagem de fácil entendimento para a comunidade de desenvolvedores em geral.

Muito mais em  https://br.creativecommons.org/licencas/

### Domínio Público

Todo conteúdo sobre determinada licensa tem um tempo de vida útil então desde de alguns anos eu posso usar aquele produto ou obra de arte sem precisar pagar pra poder usar ela. Nos EUA tem uma convensão de que tudo que foi criado até 1930 está em domínio público e pode ser utilizado sem restrições, e 1930 é uma data limite por que o Mickey Mouse surgiu e todos os direitos pertencentes a ele ainda pertencem a Disney, já que essa empresa ainda existe e foi a criada das primeiras licensas, então para ser domínio público a partir dessa data o autor pro livre e espontanea vontade deve dizer que seu produto é de domínio público.

No creative commons temos a seguinte frase para o domínio público:

Também fornecemos instrumentos que operam no espaço “todos os direitos concedidos”, do domínio público. O nosso instrumento CC0 permite que os licenciantes renunciem a todos os direitos e coloquem um trabalho no domínio público. A nossa Marca de Domínio Público permite que qualquer usuário da internet “sinalize” um trabalho para indicar que este se encontra no domínio público.

Quando uma obra está sob domínio público, isso significa que todos os direitos patrimoniais foram renunciados. Isso pode ser feito explicitamente pelo autor, ou muitos anos após seu falecimento a obra cai automaticamente em domínio público.

Uma vez em domínio público, os direitos patrimoniais deixam de existir, podendo então haver produção, reprodução (como a venda) ou criação de obras derivadas (edição, modificação).

## Como minha empresa trabalhará com open source?

Mas afinal como ganho dinheiro e sustento minha empresa e meu projeto com o open source?

Existem várias se digitarmos business model for open source nós temos muitas opções. Uma lista legal está na wikipedia e é https://en.wikipedia.org/wiki/Business_models_for_open-source_software.

- A primeira é dual-licensig, Como o nome diz são duas licensas, uma licença sendo a licensa open source e uma outra licensa que te permite fazer otras cositas mas. Tal como disponibilizar o código fonte mas não para fins comerciais, mas caso queira usar pra fins comerciais você usa a outra licensa no qual você me paga. Um exemplo é o mysql onde caso eu queira utilizar o serviço para fim comercial eu terei que pagar por ela.

O modelo dual-license significa que um software open source tem duas licenças, sendo que uma pode ser mais restrita e mesmo assim atender uma parcela dos usuários, e a outra não possui restrições, mas a empresa pode cobrar um valor pelo uso.

Um exemplo seria a empresa por trás do produto restringir seu uso para fins comerciais. Para que seja possível utilizar para fins comerciais, o usuário tem que pagar um determinado valor. Mas essa não é a única combinação possível.

Um exemplo de software que possui dual-license é o MySQL

- Oferecer treinamento e licensa para utilizar determinado serviço, e oferecer suporte para utilizar essa ferramenta. Como o certificado da cisco e o certificado da LPI, que é um certificado do linux que é open source. E é extremamente comum em comunidades open source de grande sucesso.

- Vender produtos da marca, como canecas, cadernos, canetas, bonés, livros com a marca. Até para poder divulgar a marca.

- Vender o software como um serviço, onde você paga mensalmente ou anualmente e eu configuro o serviço que você vai utilizar periodicamente. Um exemplo é o wordpress.com e o wordpress.org o segundo é totalmente de graça porém sem aspectos importantes e o .com vem com banco de dados integrado e outras coisas a mais. E o wordpress é totalmente open-source.

- Parceria com organizações- ai é mais comum com grandes empresas já, pois quem vai se interessas em um pequeno cara com eu e você. Precisa do diferencial.

- Doações, com um patreon ou em lives posso receber doações de pessoas físicas para o projeto. Ou pedindo de tempo em tempo como a wikipedia e o ubuntu

- Desenvolvimento baseado em prêmio, eu preciso de uma ferramenta específica naquela linguagem mas e minha equipe está muito atarefada para fazer isso, eu pago alguém de fora x dinheiros para que ela faça esse job para mim

- Crowdfunding, eu mostro as pessoas meus planos e minhas conquistas, e meu curriculo para pessoas fisicas e peço doações para pessoas fisicas para que meu projeto de certo. E coloco agradecimentos diferenciados para quem doar valores a mais. 1 real te mando email agradecendo, 5 reais eu dedico seu nome nos creditos, 20 reais te dou o produto quando ele ficar pronto, 1000 reais eu dou meu c*.

- Software com muitas propagandas

- Desenvolve o software open source mas para ter certas extensões a mais você tem que pagar, uma variação disso é termos propaganda na versão free e pagar para nao ter mais propaganda, é uma opção inclusive fazer com que a parte paga seja não open source.

- Relicensiar o projeto.

- Ofereço o código fonte de forma muito complicada de entender, com variáveis aleatórias e sem comentários. O que é bem babaca

- Você vende o produto e depois de um tempo você coloca ele como open source, e atualiza o código daquele produto de maneira que esse novo código seja pago. Enquanto o open source fica como uma versão antiga e sem atualizações.
