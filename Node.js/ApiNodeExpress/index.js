const customExpress = require('./config/customExpress')

const app = customExpress();

const port = 4000;
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
    app.get('/', (req, res) => {
        res.send(`<pre>A</pre>`)
    })
})