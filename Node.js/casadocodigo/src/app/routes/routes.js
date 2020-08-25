const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

app.get('/', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h1> Casa do Código </h1>
        </body>

        </html>
 `
    );
});

app.get('/livros', (req, resp) => {
    const livroDao = new LivroDao(db);
    livroDao.lista()
    .then(livros => {
        resp.marko(
            require('../views/livros/listagem/listagem.marko'),
            {
                livros:livros 
            }
        );
    })
    .catch(erro => console.log(erro));

});

};