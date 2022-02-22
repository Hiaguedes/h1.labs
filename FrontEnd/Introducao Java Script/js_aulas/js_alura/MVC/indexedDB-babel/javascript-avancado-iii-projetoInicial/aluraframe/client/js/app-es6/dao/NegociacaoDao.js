class NegociacaoDao {

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

        request.onsucess = e => {
            resolve();
        };

        request.onerror = e => {
            console.error(e.target.error);
            reject('Não adicionamos a negociação')
        };
        });
    }

    listaDados(){
        return new Promise((resolve, reject) => {
            let cursor =this._connection.transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .openCursor();
            let negociacoes = [];

            cursor.onsuccess = e => {
            let atual = e.target.result;

            if(atual){
                let dado = atual.value;
                negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));
                atual.continue();
            }else {
                resolve(negociacoes);
            }
            };

            cursor.onerror = e => {
                reject('Não foi possível listar as negociações');
            };
        });
    }

    apagaDados(){
        return new Promise((resolve, reject) => {
            let request =this._connection.transaction([this._store], 'readwrite')
                            .objectStore(this._store)
                            .clear();
            
            request.onsuccess = e => {
                resolve('Negociação removidas com sucesso');
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível remover as negociações');
            }
        });
    };
}