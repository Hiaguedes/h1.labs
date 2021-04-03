const Atendimento = require('./atendimento.model')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        // res.send('<title>Api Petshop | Atendimento</title>')
        Atendimento.lista(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        Atendimento.listaId(req.params.id, res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        console.log('ATENDIMENTO',atendimento)
        Atendimento.adiciona(atendimento, res);

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const valores = req.body;
        Atendimento.altera(req.params.id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        Atendimento.deleta(req.params.id, res);
    })
}