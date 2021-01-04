# React Native

Usuário de teste: Usuário:Alura Senha:123456

IMPORTANTE: Usando sistemas Windows não é possível desenvolver apps com código nativo para a plataforma IOS.

Veja na página do react-native get started quais as dependencias você precisa pro seu SO para criar um projeto com react-native, mas se você já tem o react native cli na sua máquina use o comando

```cmd
react-native init <nome do app> -version <versão>
```

O react native não trabalho com HTML, ele trabalho com tags mais parecidas com as que você vai ver no mundo mobile

Quando desenvolvemos aplicações mobile, em geral, após qualquer alteração feita em um determinado ponto do código, precisamos efetuar novamente o processo de compilação, build e deploy no dispositivo onde estamos testando, para poder testar novas possibilidades ou corrigir qualquer bug. Isso tende a deixar o processo de desenvolvimento mais lento e ineficiente.

Com base no que conhecemos durante a aula, como o ambiente de desenvolvimento do React Native resolve o problema apresentado ?

O ambiente de desenvolvimento do React Native usa o React Packager para escanear nossos arquivos relativos ao projeto e assim trackear mudanças no file system, e atualizar apenas o que foi alterado facilitando o deploy automático do projeto.

Perfeito! O React Packager sobe um servidor JS disponibilizando nossos arquivos ao ambiente de desenvolvimento, facilitando nosso processo de deploy e disponibilizando logs em desenvolvimento para percebermos qualquer problema durante o teste da nossa app no simulador.

O mercado de celulares atualmente é muito diverso tanto em número de aparelhos, mas também em tamanhos de telas. Isso pode nos causar problemas quando estamos desenvolvendo a interface de nossos aplicativos.

Qual a solução mais apropriada dentro do React Native para trabalharmos com diferentes resoluções?

Podemos usar Dimensions para obter informações sobre o dispositivo onde a app está rodando.

Boa! A API Dimensions possibilita obter informações precisas sobre as dimensões do dispositivo, tendo a possibilidade inclusive de responder a eventos quando as dimensões forem alteradas adicionando event listeners . Você pode obter mais informações sobre a API [aqui](https://reactnative.dev/docs/dimensions).

É muito comum em aplicativos termos que trabalhar com coleções de elementos e listas. Fizemos isso dentro de nosso aplicativo e vimos que existem diferentes possibilidades para exibirmos essas listas.

Qual é a vantagem de usarmos o elemento FlatList dentro do nosso projeto?

Ao usar o componente FlatList facilitamos a implementação do e usamos código mais semântico, sem misturar chamadas de funções JavaScript dentro da sintaxe JSX.

Usando componentes de mais alto nível deixamos de escrever o código de mapeamento de elementos para componentes, além de todo código necessário para tratar alterações na exibição das listas.

Usando componentes de lista já contamos com suporte à interações entre o usuário e o componente que apresenta o conteúdo, como scroll ao final ou topo da lista a partir de eventos.

A FlatList, por exemplo, oferece alguns recursos interessantes, como scroll to top, scroll to end, pull to refresh, etc. Pesquise mais sobre as possibilidades [aqui](https://reactnative.dev/docs/flatlist).

Um programador JavaScript, em um determinado ponto do desenvolvimento de um componente com React Native, escreveu a seguinte folha de estilo:

```js
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  titulo: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  tituloAtivo: {
    color: 'red',
  },
});
```

Em um mesmo componente Text, no método render, ele precisa aplicar tanto o estilo previsto na propriedade titulo, quanto o estilo definido em tituloAtivo da folha de estilo. Como podemos ajudá-lo a completar seu código?

```js
...
render() {
    return(
        ...
        <Text style={ ??? }>{titulo}</Text>
        ...
    );
}
...
```

`<Text style={[styles.titulo, styles.tituloAtivo]}>{titulo}</Text>`

Boa! Quando queremos inferir para mais de uma propriedade de estilo sendo aplicada ao mesmo elemento, podemos usar uma lista com as chaves da folha de estilo que está sendo usada.

Por padrão a box do react-native usa o flexbox com flex-direction para column

Conforme aumentamos a quantidade de componentes que temos no projeto, precisamos organiza-lo em uma estrutura de pastas que nos ajuda a achar onde está cada peça do nosso sistema. Para isso é muito comum criarmos pastas para cada componente e dentro dessas pastas termos os arquivos index.js.

Qual é uma melhor abordagem para essas situações?

Podemos criar arquivos com o nome do componente e manter esses arquivos organizados em pastas juntos com seus estilos, utilizando a index.js apenas para exportar as partes necessárias para o resto do sistema

Como desenvolvedores, devemos pensar em nossa experiência de uso e alteração do sistema. Ter um monte de arquivos com o mesmo nome nos confunde na hora de editar os arquivos e dificulta sabermos que parte do sistema estamos alterando

## A api Platform do react native

Com o Platform importado da lib do react native conseguimos distinguir entre sistemas operacionais dentro no celular com o Platform.OS e requisiçoes http que com o android devem ser feitas com 10.0.2.2 no ios devemos fazer com o localhost. Entao para termos o desenvolvimento pleno nos dois sistemas nós devemos adotar essa diferenciação com o platform, pois é um problema bem comum

Durante o desenvolvimento da nossa app React Native, percebemos alternando entre as duas plataformas (ios/android), que o endereço do host da API precisava ser alterado manualmente. No ios, usamos o endereço `http://localhost:8080/api/...`, enquanto que no Android, usamos `http://10.0.2.2:8080/api/....`

De que maneira podemos minimizar este esforço e testar as o código nas duas plataformas sem ter que alterar o código?

Podemos usar a API Platform, e definindo dinamicamente o endereço adequado para cada plataforma:

```js
const caminho = Platform.OS === 'ios' ? 'http://localhost:8080/api' : 'http://10.0.2.2:8080/api';

fetch(`${caminho}/feed`)
    ...
```

Boa! Podemos usar a API Platform como fizemos na aula e programar a alteração do endereço dinamicamente.

Podemos evitar a necessidade de alterarmos o código do host se tivermos um host publicado na web. Assim os emuladores poderiam acessá-lo diretamente.

Boa! Usando o endereço do host remoto onde a API está implantada para ajudar nosso desenvolvimento podemos abstrair esse trabalho.

PRÓXIMA ATIVIDADE

Ao compararmos nossa aplicação nas duas plataforma ( IOS e Android ) reparamos que visualmente as duas aplicações tinham pequenas diferenças. No Android por exemplo o horário do relógio e a informação de bateria estavam com uma cor de texto e de fonte diferentes do que tínhamos na plataforma IOS.

Qual componente usamos para ajustar essas diferenças?

Usamos o StatusBarpara ajustar as diferenças entre as plataformas e aproveitamos de suas propriedades para definir a cor de fundo e a cor da letra desse cabeçalho

Exatamente! O único ponto que precisamos tomar cuidado é que algumas das propriedades da StatusBar só são aplicadas em um das duas plataformas. A propriedade BackgroundColor, por exemplo, só funciona no Android.

## Facilitando manutenção

Sempre que estamos em um projeto a quantidade de código e componentes dele tende a aumentar e em muitos casos acabamos com repetição de código em diferentes lugares da aplicação. Isso acaba dificultando a manutenção do projeto quando uma alteração não é repicada diretamente em todos os lugares que gostariamos pois não estamos reutilizando código.

Outro fator importante e que pode dificultar a manutenção do projeto e a correção rápida de bugs é o gerenciamento de estado da aplicação. Como podemos diminuir a quantidade de lugares onde gerenciamos estado em nossa aplicação?

Para diminuir a quantidade de lugares que gerenciam estado em nossa aplicação podemos focar em deixar os Componentes mais isolados e com menos acoplamento de outras classes, para isso injetamos pelo construtor do componente as funções e propriedades que ele deve usar.

Exatamente, injeção de dependências é algo muito importante e que nos ajuda muito a manter a qualidade de código e a criar código que é facilmente testavel.
Para diminuir a quantidade de lugares que gerenciam estado em nossa aplicação podemos focar em deixar os Componentes mais isolados e com menos acoplamento de outras classes, para isso injetamos pelo construtor do componente as funções e propriedades que ele deve usar.

## Ao chamar a requisição de tentar logar usamos um try...catch para capturar possíveis erros de login e avisar o usuário do que ele deve fazer para corrigir o erro ou se o erro está do lado do servidor.

No caos, usamos uma cláusula catch de uma forma que não é a ideal. O que faltou para seguirmos as boas práticas de tratamento de erros?

Alternativa correta
Devemos sempre validar as informações de um formulário antes de enviar a requisição para o backend. Assim evitamos chamadas que contém erros óbvios como o não preenchimento de um campo.


Sim, essa é uma boa prática que evita enviarmos requisições com erros para o backend. Não adianta mandar o backend validar um usuário em branco, por exemplo

Alternativa correta
Precisamos sempre tratar erros específicos e evitar ao máximos tratar genericamente qualquer tipo de erro em uma única cláusula catch.

Exatamente, cada tipo de erro deve ter um tratamento especifico, nem que seja para que a mensagem de erro para o usuário tenha um texto diferente. Isso porque se for um erro no lado do servidor a pessoa precisa saber que não tem muito o que fazer a não ser esperar o servidor ser ajustado.Ao chamar a requisição de tentar logar usamos um try...catch para capturar possíveis erros de login e avisar o usuário do que ele deve fazer para corrigir o erro ou se o erro está do lado do servidor.

## React navigations para navegar entre telas

Fique atento na documentação pois toda a versão trata a navegação como componentes, o que é diferente da versão 4, e para isso se atente também de instalar todas as dependencias, como o reanimation o stack o gesture e outros. A documentação do navigaation é bem extensa e cheia de nuancias e você pode ficar um tempo perdido nos erros que estão dando

Documentação: <https://reactnavigation.org/docs/getting-started>

Após a instalação do React-Navigation conseguimos configurar a tela de Login e de Feed como ponto de entrada para a aplicação. Só que para navegar entre essas telas a bliblioteca precisa nos dar acesso a algum ponto de comunicação entre a aplicação e ela.

Qual é esse ponto de comunicação e como ele é fornecido para cada componente?

Alternativa correta
O React-navigation nós fornecer um objeto navigation que é passado para os componentes através de uma propriedade.

Exatamente, confirmando que essa injeção de dependências é uma boa prática quando buscamos desacoplamento do nosso código com outros componentes.

Atente-se no header que o navigation cria que as coisas são um tanto diferentes para o android e para o ios

Use o stack actions para fazer a movimentação entre telas, sabendo que o push, coloca mais uma tela na pilha de informações, podendo voltar ela ou não. O replace tira toda a stack de movimentação para colocar uma nova tela como a principal.

Durante o fluxo de navegação de uma aplicação é muito comum precisarmos passar pequenas informações de uma Tela para outra. Existem diversas forma de se fazer isso em uma aplicação, marque os métodos que vimos no curso e que podemos usar para transmitir informações entre telas.

Uma opção é passarmos informações através do método de navegação entre telas. O segundo parâmetro do método "navigate", por exemplo, guarda as informações que quisermos.

Exatamente. Quando precisamos de uma informação pontual apenas para a próxima tela que vamos navegar essa é uma boa maneira de transmitir dados.

Alternativa correta
Podemos usar o AsyncStorage para guardar informações localmente no aparelho e recuperar ao carregar outro componente, usando o useEffect

Sim, essa é uma ótima opção quando precisamos de uma informações em diferentes telas do sistema

O asyncStorage é uma forma de você guardar dados dentro da sua aplicação de modo a ele persistir no celular

Link do conteudo do curso: <https://github.com/bugan/instalura-react-native-2/archive/aula5.zip>
