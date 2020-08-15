const path = require('path');// para resolver qual a pasta absoluta que esse projeto está
const babilPlugin= require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCss =require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const webpackPlugin = require('html-webpack-plugin');

let plugins =[];

plugins.push(new webpackPlugin({
    hash:true,
    minify:{
        html5:true,
        collapseWhitespace: true,
        removeComments:true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html'
}));
plugins.push(new extractTextPlugin('styles.css'));
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery':'jquery/dist/jquery.js'
}));
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}))

if(process.env.NODE_ENV){//somente para plugins de desenvolvimento
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new babilPlugin());
    plugins.push(new optimizeCss({
        cssProcessor: require('cssnano'),
        cssProcessorOptions:{
            discardComments:{
                removeAll: true
            }
        },
        canPrint: true
    }));
}


module.exports = {
    entry: {
        app:'./app-src/app.js',// entrada
        vendor:['jquery','bootstrap','reflect-metadata']
    },
    output: {
        filename: 'bundle.js',//nome do arquivo de saida
        path: path.resolve(__dirname, 'dist'),// resolve a pasta atual e adiciona a pasta dist
        
    },
    module:{
        rules:[//regra do build
            {
                test: /\.js$/,//vejo se somente temos arquivos js
                exclude: /node_modules/,//que não estao na pasta node_modules
                use:{
                    loader: 'babel-loader'// e que usam um loader do babel
                }
            },{
                test:/\.css/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            { 
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }            
        ]
    },
    plugins
}