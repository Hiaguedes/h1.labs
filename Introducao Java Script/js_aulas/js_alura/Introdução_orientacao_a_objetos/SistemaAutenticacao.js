export class sistemaAutenticacao{

    static login(usuarioAutenticavel,senha){

        if(sistemaAutenticacao.isAutenticable(usuarioAutenticavel)){
            return usuarioAutenticavel.autenticar(senha);
        }
        return false;
    }

    static isAutenticable(usuarioAutenticavel){
       return "autenticar" in usuarioAutenticavel && usuarioAutenticavel.autenticar instanceof Function;
        // maneira de saber se existe uma chave chamada autenticar dentro do objeto usuario autenticavel
        // e se essa chave corresponde a uma função, para classes fracamente tipadas chamamos essa forma 
        // de proteção de duck typing
    }

}