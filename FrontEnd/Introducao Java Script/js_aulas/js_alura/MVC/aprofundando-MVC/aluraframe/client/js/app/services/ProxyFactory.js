class ProxyFactory{

    static create(obj, props, action){
       return new Proxy(obj, {

            get(target, prop, receiver) {
        
                if(props.includes(prop) && ProxyFactory.isFunction(target[prop])) {// se existe propriedade esvazia e adiciona (proprios da lista) e els são do tipo função retorne
                    //funcao que aplica na função real, a função com os argumentos dados e depois atualiza eles na tabela
        
                    return function(){
        
                      //console.log(`método '${prop}' interceptado`);
                      Reflect.apply(target[prop], target, arguments);
                      return action(target);
        
                    }
             }
        
             return Reflect.get(target, prop, receiver);
          },
          set(target, prop, value, receiver){
            if(props.includes(prop)){
                action(target);
            }
              return Reflect.set(target,prop,value,receiver);
          }
        });
    }

    static isFunction(func){
        return typeof(func) == typeof(Function)
    }
}