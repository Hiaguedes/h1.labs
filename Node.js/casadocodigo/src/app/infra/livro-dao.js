class LivroDao {
    constructor(db) {
        this._db =db;
    }

    lista(){
        return new Promise( (resolve, reject) => {
            this._db.all('SELECT * FROM livros',
            (erro,resultado)=>{
                if(erro) return reject('Não foi possível listar os livros');

                return resolve(resultado);
                
            })
        })
}

adiciona(livro){
    return new Promise((resolve,reject) => {
        this._db.run(`INSERT INTO livros(
            titulo,
            preco,
            descricao
        )values(?,?,?)`,[
            livro.titulo,
            livro.preco,
            livro.descricao
        ],
        (err) => {
            if(err){
                return reject('Não foi possível cadastrar livro')
            }
            resolve();
        })
    })
}

buscaPorId(id){
    return new Promise((resolve, reject) => {
        this._db.get(`
        SELECT *
        FROM livros 
        WHERE id= ?
        `,[id],
        (err,res) => {
            if(err){
                return reject('Não foi possível buscar livro')
            }
            return resolve(res);
        })
    })
}

remove(id){
    return new Promise((resolve,reject) =>{
        this._db.run(`
        DELETE
        FROM livros
        WHERE id=?
        `,[id],
        (err,res) =>{
            if(err){
                return reject('Não foi possível remover o livro')
            }
             resolve();
            })
    });
}

update(titulo,preco,descricao,id){
    return new Promise((resolve,reject) => {
        this._db.run(`
        UPDATE livros
        SET
        titulo = ?,
        preco = ?,
        descricao = ?
        WHERE id=?`,
        [titulo,preco,descricao,id],
        (err,res)=>{
            if(err){
                return reject('Não foi possível atualizar o livro')
            }
             resolve();
        })
    })
}

}

module.exports = LivroDao;