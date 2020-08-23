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

app.get('/livros', (req, res) => {
    res.marko(
        require('../views/livros/listagem/listagem.marko'),
        {
            livros:[
                { 
                    id: 1,
                    titulo: 'Fundamentos do Node'
        },{
                    id: 2,
                    titulo: 'Node Avançado'
        }
        ]
        }
    );
});

};