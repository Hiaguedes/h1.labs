# Webpack

Voltado para single page aplication o webpack é bastante utilizado em frameworks famosos do mercado como o Angular e o Vue e ele é um module bundler, que empacota arquivos e funcionalidades js e resolve problemas banais e nem tão banais de um single page aplication

Para utilizarmos Webpack em ambiente de desenvolvimento é necessário ter a plataforma `Node.js` instalada. O `Node.js` é um ambiente JavaScript multiplataforma disponível para Linux, Mac e Windows. Para instalá-lo, siga as instruções abaixo:

Caso você já tenha o Node instalado
Se você já tem o Node instalado em sua máquina, verifique se ele está na versão 8.6.X através do comando node -v no seu terminal, pois precisamos de uma versão atualizada do mesmo para podermos ter builds mais eficazes com Webpack. Não instale versões ímpares, essas não são tão estáveis quanto as versões pares.

## Para saber mais: webpack e sua estreita relação com SPA

Apesar de o Webpack ser altamente customizável, sua aplicação é voltada para Single Page Applications. Essas páginas que não recarregam durante seu uso tendem a carregar todos os scripts e arquivos CSS que dependem logo no primeiro carregamento e toda mudança de troca de página é feita por um sistema de rotas que manipula a única página carregada trocando seu conteúdo. Para o usuário, essa aplicação se comporta como se fosse uma aplicação nativa, pelo não carregamento durante o uso.

Por mais fabulosa que essa abordagem possa ser para o usuário, se o escopo da aplicação for grande, o primeiro carregamento será sofrível, primeiro pelo tempo de download de arquivos JS e CSS gigantes (concatenados e minificados) além do tempo para que o interpretador JavaScript realize o parser desses arquivos. Esse problema já não acontece com aplicações web tradicionais, pois cada página carrega os scripts e arquivos CSS de que precisam. Webpack soluciona esse problema das Single Page Applications.

Webpack permite dividir um bundle da aplicação em outros bundles menores que são carregados apenas quando forem utilizados pela aplicação, diminuindo assim o tempo de carregamento dessas aplicações e por conseguinte melhorando a experiência do usuário. Aprenderemos a realizar essas divisões, mas ainda há muita coisa para aprendemos antes de chegarmos a este ponto.

## Webpack e babel

O babel é o que transforma um js escrito em ES6 em outro js com por exemplo ES5 ou ES7, e podemos fazer essa mudança com o webpack ou sem o webpack, para fazer sem precisamos da dependencia bundle-cli e fariamos um comando com o node para que ele funcionasse, com o webpack precisariamos somente do bundle-core e do da dependencia de desenvolvimento webpack

O babel-core nada mais é do que o núcleo do babel desprovido de sua linha de comando e que pode ser utilizado por outras ferramentas do mercado como Webpack.

Webpack dispensa a utilização de um module loader, justamente por criar em bundles em tempo de desenvolvimento, que nada mais são do que scripts que agregam outros módulos da aplicação.

É comum utilizar um npm script para executar o webpack bastando adicioná-lo no arquivo package.json.

Exatamente, sem esse script seríamos obrigados a executar o caminho completo do webpack, algo bem improdutivo e sujeito a erros.

Para adicionar dentro de scripts temos a chave valor

`"build-dev": "webpack --config webpack.config.js"`

Lembrando que no arquivo package.json temos que ter aspas duplas na chave e no valor.

Onde webpack.config.js é o centro que tem todas as configurações do webpack

O arquivo de configuração do webpack nada mais é do que um módulo do `Node.js`.

Exatamente. Lembre-se que é a plataforma `Node.js` que executa o Webpack para nós. Aliás, o sistema de módulos da plataforma utilizado pela plataforma é o CommonJS. Diferente do ESM módulos, o CommonJS utiliza a sintaxe require e module.exports.

O código mínimo do `webpack.config.js` é:

```js
const path = require('path');// para resolver qual a pasta absoluta que esse projeto está

module.exports = {
    entry: './app-src/app.js',// entrada
    output: {
        filename: 'bundle.js',//nome do arquivo de saida
        path: path.resolve(__dirname, 'dist')// resolve a pasta atual e adiciona a pasta dist
    }
}
```

E sua explicação está no código, e cada requisição é um module diferente, só que ainda faltam as regras para usar esse módulo e para isso fazemos

```js
,
    module:{
        rules:[//regra do build
            {
                test: /\.js$/,//vejo se somente temos arquivos js
                exclude: /node_modules/,//que não estao na pasta node_modules
                use:{
                    loader: 'babel-loader'// e que usam um loader do babel
                }
            }
        ]
    }
}
```

Que são adicionados após o exports, agora rodando `npm run build-dev` conseguimos ver uma pasta nova dist e com um arquivo bundel.js com todos os arquivos concatenados lá dentro

### calopsita-loader?

Tito aprendeu que precisa utilizar um loader para poder lidar com arquivos que não conseguem ser processados diretamente pelo webpack. Foi então que ele baixou o calopsita-loader para lidar com arquivos com a extensão .calop, inclusive aqueles dentro da pasta node_modules.

Ele escreveu seu arquivo webpack.config.js dessa maneira:

```js
// client/webpack.config.js

const path = require('path');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'meu-bundle.js',
        path: path.resolve(__dirname, 'distribution')
    },
    module: {
        rules: [
            {
                test: /\.calop$/,
                use: {
                    loader: 'calopsita-loader'
                }
            }
        ]
    }
}
```

Marque a única opção verdadeira a respeito do código escrito por Tito.

É um script válido.

Exatamente. Apesar dele ter escolhido nomes diferentes para as propriedades filename e path, a estrutura do arquivo é totalmente válida. Inclusive as regras de carregamento de módulos levaram em consideração a extensão .calop e o loader calopsita-loader.
