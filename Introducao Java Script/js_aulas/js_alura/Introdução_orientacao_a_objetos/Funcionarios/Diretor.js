import {funcionario} from './Funcionario.js';

export class diretor extends funcionario{
    constructor(nome,cpf){
        super(nome,cpf,10000,1.1);
    }
}