const conexao = require('../../infra/conexao')
const moment = require('moment');
const axios = require('axios');
const repositorio = require('../../repositorios/atendimento')

class Atendimento {
    constructor() {
         this.isDateValid = ({formatDate, createdDate}) => {
            return moment(formatDate).isSameOrAfter(createdDate);
         }
        this.isClientValid = ({atendimento}) => {
            return atendimento.cliente.length >= 5;
        }
        this.valida = params => {
            this.validacoes.filter(campo => {
                const { nome } = campo;
                const param = params[nome]

                return !campo.valido(param)
            })
        }
        this.validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual que a data atual',
                valido: this.isDateValid,
            },
            {
                nome: 'cliente',
                valido: this.isClientValid,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres',
            }
        ]
    }
    adiciona(atendimento) {
        const createdDate = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
        const formatDate = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const params = {
            data: {formatDate, createdDate},
            cliente: { atendimento }
        }
        const erros = this.valida(params)

        // const existemErros = erros.length;

        if(erros){
            return new Promise(( res, rej) => {
                rej(erros)
            })
        } else {
            const atendimentoData = { ...atendimento, createdDate, data: formatDate }
                     
            return repositorio.adiciona(atendimentoData)
                    .then(result => {
                        const id = result.id;
                        return { ...atendimento, id }
                    })

        }


    }

    lista() {
        return repositorio.lista()
        
    }

    listaId(id, res){
        const idNumber = Number(id);
        const sql = `SELECT * FROM Atendimentos WHERE id=${idNumber}`;

        conexao.query(sql, async (err, result) => { 
            const atendimento = result[0];
            const cpf = atendimento.cliente;
            
            if(err) {
                res.status(400).json(err)
            } else {
                const novoCliente = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = novoCliente.data;
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, values, res){
        const numberId = Number(id);
        if(values.data) values = {...values, data: moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')}
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [values, numberId], (err, result) => {
            err ? res.status(400).json(err) : res.status(200).json({...values, id: numberId});
        })
    }

    deleta(id, res){
        const numberId = Number(id);
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql, numberId, (err, result) => {
            err ? res.status(400).json(err) : res.status(200).json({id: numberId});
        })

    }

}

module.exports = new Atendimento;