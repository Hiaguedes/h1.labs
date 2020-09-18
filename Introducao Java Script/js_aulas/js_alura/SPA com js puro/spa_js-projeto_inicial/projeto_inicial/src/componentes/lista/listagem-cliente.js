import {
  listarClientes,
  deletaCliente
} from '../../api/cliente.js';
import initCadastro from '../cadastro/componente-cadastro.js';
import "../../assets/css/clientes.css";

const removeCliente = (id) => {
  if(confirm("Deseja deletar o cliente ?")){
    debugger;
    deletaCliente(id)
    window.location.reload()
  }
}

const conteudo = `
<thead class= "thead-dark">
<tr>
<th scope="col">CPF</th>
<th scope="col">Nome</th>
<th scope="col"> </th>
<th scope="col"><a class="btn btn-primary">Novo Cliente</a></th>
</tr>
</thead>
`;
const container = document.querySelector('[data-container]');
const tabela = document.createElement('table');
container.appendChild(tabela);
tabela.innerHTML = conteudo;
tabela.classList.add('table');

const novoCliente = document.querySelector('.btn');

novoCliente.addEventListener('click', () => {
  initCadastro();
});

const corpoTabela = document.createElement("tbody");

const exibeCliente = (cpf, nome, id) => {
    const linha = document.createElement('tr');

    const conteudoLinha = `
    <td>${cpf}</td>
    <td>${nome}</td>
    <button type="button" class="btn btn-danger" onclick="removeCliente(${id})">Excluir</button>
    <a href="./edita/edita-clientes.html?id=${id}">
    <button type=""button class="btn btn-info">Editar</button>
    </a>
    
    
`
  
    linha.innerHTML = conteudoLinha;
    return linha;
  };
  
  listarClientes().then( exibe => {
  exibe.forEach(indice => {
    corpoTabela.appendChild(exibeCliente(indice.cpf, indice.nome, indice.id))
  })
 }

 )
  
tabela.appendChild(corpoTabela);
 
