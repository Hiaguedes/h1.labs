'use strict';

var openRequest = window.indexedDB.open('bancoDados', 3);
var connection;

openRequest.onupgradeneeded = function (e) {
    console.log("Criando ou alterando um banco existente");
    var minhaConnection = e.target.result;

    if (minhaConnection.objectStoreNames.contains('negociacoes')) {
        minhaConnection.deleteObjectStore('negociacoes');
    }

    minhaConnection.createObjectStore('negociacoes', { autoIncrement: true });
};

openRequest.onsuccess = function (e) {
    connection = e.target.result;
    //console.log(connection);
};

openRequest.onerror = function (e) {
    console.log(e.target.error);
};

var adiciona = function adiciona() {
    var transaction = connection.transaction(['negociacoes'], 'readwrite');
    var store = transaction.objectStore('negociacoes');
    var negociacao = new Negociacao(new Date(), 1, 200);
    var request = store.add(negociacao);
    request.onsuccess = function (e) {
        console.log('Negociação incluida');
    };

    request.onerror = function (e) {
        console.log('Negociação não incluida');
    };
};

var listaDados = function listaDados() {
    var transaction = connection.transaction(['negociacoes'], 'readwrite');
    var store = transaction.objectStore('negociacoes');
    var cursor = store.openCursor();
    var negociacoes = [];

    cursor.onsuccess = function (e) {
        var atual = e.target.result;
        if (atual) {
            var dado = atual.value;
            negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
            atual.continue();
        } else {
            console.log(negociacoes);
        }
    };

    cursor.onerror = function (e) {
        console.error(e.target.error.name);
    };
};
//# sourceMappingURL=indexedDB.js.map