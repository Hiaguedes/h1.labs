export class funcionario {
    
    constructor(nome,cpf,salario,beneficio){
        if(this.constructor==funcionario){
            throw new Error("Você não pode instanciar essa classe");
        }
    this._nome=nome;
    this._cpf=cpf;
    this._salario=salario;
    this._beneficio=beneficio;
    this._senha
    }

    cadastroSenha(senha){
        this._senha=senha;
    }

    autenticar(senha){
        return senha==this._senha;
    }
}