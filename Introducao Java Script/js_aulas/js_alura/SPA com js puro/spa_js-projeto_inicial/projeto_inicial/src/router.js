const { default: initCadastro } = require("./componentes/cadastro/componente-cadastro");

//import initCadastro from './componentes/cadastro/componente-cadastro.js';
import  initTabela  from './componentes/lista/listagem-cliente.js';


const rotas = {
    "/": initTabela,
    "/cadastro":  initCadastro
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