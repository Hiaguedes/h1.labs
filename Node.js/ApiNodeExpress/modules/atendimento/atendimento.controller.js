

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('rota atendimento')
    })

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        return;
    })
}