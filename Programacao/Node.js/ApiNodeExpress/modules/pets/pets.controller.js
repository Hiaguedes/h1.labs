const Pets = require('./pets.model')

module.exports = app => {
    app.get('/pet', (req,res) => {
        Pets.lista(res)
    })
    app.post('/pet', (req,res) => {
        Pets.adiciona(req.body, res)
    })
}