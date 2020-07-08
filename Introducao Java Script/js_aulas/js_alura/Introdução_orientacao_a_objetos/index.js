import {cliente} from "./Cliente.js" // o recomendado é o caminho absoluto mas o relativo serve também

import {gerente} from "./Funcionarios/Gerente.js";
import {diretor} from "./Funcionarios/Diretor.js";
import { sistemaAutenticacao } from "./SistemaAutenticacao.js";

const diretor1 =new diretor("Astolfo",123456789);
const gerente1 =new gerente("Carlos",987654321);
const cliente1=new cliente("Ricardo",456789123,8654);

diretor1.cadastroSenha("astolfinho_hot");

console.log(sistemaAutenticacao.login(cliente1,8654));
