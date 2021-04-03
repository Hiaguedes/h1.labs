class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarTabelaAtendimento()
    }

    criarTabelaAtendimento() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, data datetime NOT NULL, createdDate datetime NOT NULL , PRIMARY KEY(id))';
        this.conexao.query(sql, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Criado tabela de Atendimentos')
            }
        })
    }
};

module.exports = new Tabelas;