class NegociacaoService{
    constructor(){
        
    }

    obterNegociacoes(url){

        return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        /*
        configurações da requisição

        Estados de uma requisição

        1: requisição não iniciada
        2: requisição recebida
        3: processando requisição
        4: requisição concluída e a resposta está pronta
        */ 
        xhr.onreadystatechange= ()=>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    //this._msg.texto='Importando dados do servidor';
                resolve(JSON.parse(xhr.responseText)// se deu certo passe como resultado o texto adiquirido pelo xhr
                .map(obj => new Negociacao(new Date(obj.data),obj.quantidade,obj.valor)))
                }else{
                    console.log('Não deu para buscar os dados lá não');
                    console.log(xhr.responseText);
                    reject(this.mensagemErro(url));// se deu errado passe a mensagem de erro
                }
            }
        };
        xhr.send();
    })
    }

    post(url, dado) {


        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
        });

    }


    mensagemErro(url){
        switch (url){
        case 'negociacoes/semana':
            return 'Não foi possível obter negociacões dessa semana';

        case 'negociacoes/anterior':
            return 'Não foi possível obter negociacões da semana passada';

        case 'negociacoes/retrasada':
            return 'Não foi possível obter negociacões da semana retrasada';
        }
    }
}