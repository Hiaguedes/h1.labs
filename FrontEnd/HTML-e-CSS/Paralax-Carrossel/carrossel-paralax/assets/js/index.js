import { Carousel } from './carousel.js';

const botaoAnterior = '[data-anterior]';
const botaoPosterior = '[data-proximo]';
const listaProdutos = '[data-lista-produtos]';
const slidersNavegacao = '[data-navegacao]';

new Carousel(botaoAnterior,botaoPosterior,listaProdutos,slidersNavegacao)