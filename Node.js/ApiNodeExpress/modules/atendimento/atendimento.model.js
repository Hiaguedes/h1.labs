const conexao = require('../../infra/conexao')
const moment = require('moment');

class Atendimento {
    adiciona(atendimento, res) {
        const createdDate = new Date();
        const formatDate = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const isDateValid = moment(atendimento.data).isSameOrAfter(createdDate);
        const isClientValid = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual que a data atual',
                valido: isDateValid,
            },
            {
                nome: 'cliente',
                valido: isClientValid,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres',
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros)
        }else {
            const atendimentoData = { ...atendimento, createdDate, data: formatDate }
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoData, (err, result) => {
                err ? res.status(400).json(err) : res.status(201).json(atendimentoData)
            })
        }


    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';
        conexao.query(sql, (err, result) => { 
            err ? res.status(400).json(err) : res.status(200).json(result)
        })
    }

    listaId(id, res){
        const idNumber = Number(id);
        const sql = `SELECT * FROM Atendimentos WHERE id=${idNumber}`;

        conexao.query(sql, (err, result) => { 
            const atendimento = result[0];
            err ? res.status(400).json(err) : res.status(200).json(atendimento)
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