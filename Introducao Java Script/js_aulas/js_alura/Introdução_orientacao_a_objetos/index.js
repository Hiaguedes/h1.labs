import {cliente} from "./Cliente.js" // o recomendado é o caminho absoluto mas o relativo serve também
import {contaCorrente} from "./ContaCorrente.js"


const cliente1 = new cliente; 
cliente1.nome="Ricardo";
cliente1.CPF=11122233309;

const cliente2 = new cliente; 
cliente2.nome="Alice";
cliente2.CPF=33322233309;

const conta = new contaCorrente;
conta.agencia=1001;
conta.cliente=cliente1;
conta.depositar(100);
conta.sacar(25);
conta.mostraSaldo();

const conta1 = new contaCorrente;
conta1.agencia=1002;
conta1.cliente=cliente2;

conta.transferir(conta1,45);

