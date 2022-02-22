import { NegociacaoController } from './controllers/NegociacaoController.js';
const controller = new NegociacaoController;
document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller));
document.querySelector('[data-importar]').addEventListener('click', controller.importarDados.bind(controller));
