const conexao = require('../../infra/conexao');
const uploadAnyFile = require('../../files/upload')

class Pet {
    lista(res) {
        const sql = 'SELECT * FROM Pets';
        conexao.query(sql, (err, result) => { 
            err ? res.status(400).json(err) : res.status(200).json(result)
        })
    }
    adiciona(pet, res) {
        const sql = 'INSERT INTO Pets SET ?';


        uploadAnyFile(pet.imagem, (path, err) => {
            const novoPet = {
                nome: pet.nome, 
                imagem: path,
            }
            if(err){
                res.status(400).json({error: err})
            } else {
            conexao.query(sql, novoPet, (err) => {
                err ? res.status(400).json(err) : res.status(201).json(novoPet)
            })
        }
        }, pet.nome)

    }
}

module.exports = new Pet