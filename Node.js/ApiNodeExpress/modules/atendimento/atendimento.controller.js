const Atendimento = require('./atendimento.model')

module.exports = app => {
    app.get('/atendimentos', (req, res) => { // req -> o que nós recebemos e res a resposta
        // res.send('<title>Api Petshop | Atendimento</title>')
        Atendimento.lista()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err));
    })

    app.get('/atendimentos/:id', (req, res) => {
        Atendimento.listaId(req.params.id, res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        console.log('ATENDIMENTO',atendimento)
        Atendimento.adiciona(atendimento)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json(err));

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const valores = req.body;
        Atendimento.altera(req.params.id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        Atendimento.deleta(req.params.id, res);
    })
}