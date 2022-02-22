//Callbacks

function doSomeShit(callback){
setTimeout(function(){
    callback('Dado 1');
},1000);
}

function doSomeShit2(callback){
    setTimeout(function(){
        callback('Dado 2');
    },1000);
    }

function doAllTheShit(){
   
    doSomeShit(function (data){
        var processar_dado=data.split('');

        doSomeShit2(function (data2){
            var processar_dado2=data2.split('');

          setTimeout(function(){
              console.log(processar_dado,processar_dado2);
          },1000);  
    });
});
}

doAllTheShit();

//Promise

const doSomeShitwithPromise=new Promise((resolve,reject)=>{
    setTimeout(function(){
        resolve('Dado 1');
    },1000);
    });

const doSomeShit2withPromise=new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('Dado 2');
        },1000);
        });

doSomeShit2withPromise.then(data=>console.log(data));
doSomeShitwithPromise.then(data=>console.log(data));

/*
Um Promise está em um destes estados: 

pending (pendente): Estado inicial, que não foi realizada nem rejeitada.
fulfilled (realizada): sucesso na operação.
rejected (rejeitado):  falha na operação.
settled (estabelecida): Que foi realizada ou rejeitada

*/

//Ambas as funçoes sao uteis para programacao assincrona mas o Promise é mais fácil de se lidar com o erro.
