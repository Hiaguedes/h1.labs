
import initCadastro from './componentes/cadastro/componente-cadastro.js';
import  initTabela  from './componentes/lista/listagem-cliente.js';
import inicializaFormEdicao from './componentes/edita/form-edicao.js'


const rotas = {
    "/": initTabela,
    "/cadastro":  initCadastro,
    "/edita": inicializaFormEdicao
};

const rootDiv = document.querySelector('[data-container]');

export const navegarPara = pathname => {
    window.history.pushState({},pathname,window.location.origin + pathname);
    rootDiv.innerHTML = "";
    const iniciarRota = rotas[window.location.pathname];

    rootDiv.appendChild(iniciarRota());
}

window.navegarPara = navegarPara;

window.onpopstate= () => {
    rootDiv.innerHTML = "";
    rootDiv.appendChild(rotas[window.location.pathname]());
}