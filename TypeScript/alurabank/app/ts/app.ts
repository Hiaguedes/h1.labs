import {Negociacao} from './models/Negociacao.js';
import {NegociacaoController} from './controllers/NegociacaoController.js'

const controller = new NegociacaoController;

document.querySelector('.form').addEventListener('submit', controller.adiciona.bind(controller))