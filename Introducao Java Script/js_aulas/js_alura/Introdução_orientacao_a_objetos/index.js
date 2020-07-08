import {cliente} from "./Cliente.js" // o recomendado é o caminho absoluto mas o relativo serve também
import {contaCorrente} from "./Conta/ContaCorrente.js"

import { contaPoupanca } from "./Conta/ContaPoupanca.js";


const cliente1 = new cliente("Ricardo",11122233309); //assim se cria um cliente com o construtor
const cliente2 = new cliente("Alice",33322233309); 
const cliente3=new cliente("Fernando",44422233309);

//const conta = new contaCorrente;//quando não há um construtor não necessita-se de parenteses
const Conta = new contaCorrente(cliente1,1001);
const conta1 = new contaCorrente(cliente2,1002);
const conta2 = new contaPoupanca(100,cliente3,1001);

Conta.depositar(100);
Conta.sacar(25);
Conta.mostraSaldo();

conta2.depositar(300);
conta2.sacar(30);

Conta.transferir(conta1,45);

console.log(Conta.saldo); // como usa o getter
//cliente1.CPF=-1; // se eu tentar alterar o CPF da pessoa eu não consigo
console.log(contaCorrente.numContas);// vejo quantas vezes a função foi chamada
console.log(conta2.mostraSaldo());


