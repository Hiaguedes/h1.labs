import {Clientes, deletaCliente} from './api/cliente.js';

const tabela = document.querySelector('[data-conteudo-tabela]');

 const removeClient = id => {
    if(confirm("Deseja deletar o cliente?")){
        deletaCliente(id);
    }
};

const conteudo = (cpf,nome,id) =>
{

const linha = document.createElement('tr');
const conteudoLinha = `     
<td>${cpf}</td>
<td>${nome}</td>
<button type="button" class="btn btn-danger" data-id=${id}>Excluir</button>
`

linha.innerHTML = conteudoLinha;

return linha;
}

const adicionaTabela = (() => {
    Clientes().then( exibe =>
            exibe.forEach(client => {
                tabela.appendChild(conteudo(client.cpf,client.nome,client.id));
        })
    )}
)();

tabela.addEventListener('click', e=>{
    const button = e.target;
    removeClient(button.getAttribute('data-id'));
})



