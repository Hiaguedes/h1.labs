
try{
    //console.log(name);
    
   const name='Ricardo Ohara'
   const Erro1=new Error('Aí não hein');
    
throw Erro1;

} catch(err){
    console.log('\x1b[31m%s\x1b[34m%s\x1b[0m','Ai não em cara', err);
}

console.log('Fala Amigos! Aí sim hein');
// sem o try catch o código seria quebrado e não executaria essa última linha 
// poderia se usar a função finally também 


//O const error e o throw nos possibilita colocar mensagens customizadas

