var openRequest = window.indexedDB.open('bancoDados',3);
var connection;

openRequest.onupgradeneeded = e => {
    console.log("Criando ou alterando um banco existente");
    let minhaConnection = e.target.result;

    if (minhaConnection.objectStoreNames.contains('negociacoes')){
        minhaConnection.deleteObjectStore('negociacoes')
    }

    minhaConnection.createObjectStore('negociacoes',{autoIncrement: true});
}

openRequest.onsuccess = e=> {
    connection = e.target.result;
    //console.log(connection);
}

openRequest.onerror = e=> {
    console.log(e.target.error);
}

const adiciona = () => {
    let transaction = connection.transaction(['negociacoes'], 'readwrite');
    let store = transaction.objectStore('negociacoes');
    let negociacao = new Negociacao(new Date(),1,200);
    let request = store.add(negociacao);
    request.onsuccess = e => {
        console.log('Negociação incluida')
    };

    request.onerror = e => {
        console.log('Negociação não incluida')
    }
}

const listaDados = () => {
    let transaction = connection.transaction(['negociacoes'], 'readwrite');
    let store = transaction.objectStore('negociacoes');
    let cursor = store.openCursor();
    let negociacoes = [];

    cursor.onsuccess = e => {
       let atual = e.target.result;
       if(atual){
           var dado = atual.value;
           negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));
           atual.continue();
       }else {
           console.log(negociacoes);
       }
    };

    cursor.onerror = e => {
        console.error(e.target.error.name);
    };
}