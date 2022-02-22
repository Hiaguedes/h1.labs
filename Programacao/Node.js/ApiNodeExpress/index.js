const customExpress = require('./config/customExpress');
const Tabelas = require('./infra/tabelas')
const conexao = require('./infra/conexao')

const port = 4000;

conexao.connect(err => {
    if(err) {
        console.log(err)
    } else {
        console.log('conectou! yay');

        Tabelas.init(conexao);
        const app = customExpress();
        app.listen(port, () => {
            console.log(`servidor rodando na porta ${port}`);
            
            app.get('/', (req, res) => {
                res.send(`
                <title>Api Petshop</title>
                <pre>A</pre>`)
            })
        })
    } 
});

