import {Clientes} from './api/cliente.js';

const tabela = document.querySelector('[data-conteudo-tabela]');


const conteudo = (cpf,nome) =>
{
return `     
<tr>
<td>${cpf}</td>
<td>${nome}</td>
</tr>
`
    
}

const adicionaTabela = (() => {
    Clientes().then( exibe =>
            exibe.forEach(client => {
                tabela.innerHTML += conteudo(client.cpf,client.nome);
        })
    )}
)();



