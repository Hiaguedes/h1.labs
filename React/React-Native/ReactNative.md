# React Native

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
