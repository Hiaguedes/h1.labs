import { View } from './View.js';
export class MensagemView extends View {
    template(mensagem) {
        return `<p class="alert alert-info">${mensagem}</p>`;
    }
}
