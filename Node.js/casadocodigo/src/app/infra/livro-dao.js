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
}

module.exports = LivroDao;