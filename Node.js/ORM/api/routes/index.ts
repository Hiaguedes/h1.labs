const bodyParser = require('body-parser');
import { Request, Response, Express } from 'express';
const PessoaController = require('../controllers/Pessoa.controller')
const pessoasRotas = require('./pessoas.route')
const turmasRotas = require('./turmas.route')

module.exports = (app: Express) => {
    app.use(bodyParser.json());

    app.get('/', (req: Request, res: Response) => {
        res
        .status(200)
        .send({ msg: 'Olá api!'})
    })

    app.use(pessoasRotas)
    app.use(turmasRotas)
}