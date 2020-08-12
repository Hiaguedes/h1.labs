const path = require('path');// para resolver qual a pasta absoluta que esse projeto está
const babilPlugin= require('babili-webpack-plugin');

let plugins =[];

if(process.env.NODE_ENV){
    plugins.push(new babilPlugin())
}

module.exports = {
    entry: './app-src/app.js',// entrada
    output: {
        filename: 'bundle.js',//nome do arquivo de saida
        path: path.resolve(__dirname, 'dist'),// resolve a pasta atual e adiciona a pasta dist
        publicPath: 'dist'
    },
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
    },
    plugins
}