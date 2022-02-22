import {funcionario} from './Funcionario.js';

export class gerente extends funcionario{
    constructor(nome,cpf){
        super(nome,cpf,7000,1.2);
    }
}