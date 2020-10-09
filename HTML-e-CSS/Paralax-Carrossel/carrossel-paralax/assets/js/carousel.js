export class Carousel {
    constructor(botaoAnterior,botaoPosterior,listaProdutos,slidersNavegacao) {
        this.botaoAnterior = document.querySelector(botaoAnterior);
        this.botaoPosterior = document.querySelector(botaoPosterior);
        this.listaProdutos = document.querySelector(listaProdutos);
        this.slidersNavegacao = document.querySelector(slidersNavegacao);

        this.produtos = this.getListaProdutos();
        this.sliders = this.getListaSliders();
        this.tamanhoSlide = this.getTamanhoProduto();
        this.preparaImagens();
        this.indiceProdutoAtual = 0;
        


        this.botaoPosterior.addEventListener('click',
            //e.preventDefault();
            this.proximoProduto.bind(this)
        );
        this.botaoAnterior.addEventListener('click',
            //e.preventDefault();
            this.produtoAnterior.bind(this)
        );
        this.slidersNavegacao.addEventListener('click', this.pularParaSlide.bind(this))
    }

    getListaProdutos(){
        return Array.from(this.listaProdutos.children);
    }

    getListaSliders(){
        return Array.from(this.slidersNavegacao.children)
    }

    getTamanhoProduto(){
        return this.produtos[0].getBoundingClientRect().width;
    }

    getProdutoAtual(){
        return this.getListaProdutos()[this.indiceProdutoAtual]
    }

    getSliderAtual(){
        return this.sliders[this.indiceProdutoAtual]
    }

    proximoProduto(){
        let proximaPosicao = this.indiceProdutoAtual + 1;
        if(proximaPosicao > this.produtos.length-1) proximaPosicao = 0

        this.vaParaSlide(proximaPosicao)
    }

    produtoAnterior(){
        let anteriorPosicao = this.indiceProdutoAtual - 1;
        if(anteriorPosicao < 0) anteriorPosicao = this.produtos.length - 1

        this.vaParaSlide(anteriorPosicao)
    }

    vaParaSlide(posicao){
        const slideAtual = this.getSliderAtual();

        this.indiceProdutoAtual = posicao;

        const slideSelecionado = this.getSliderAtual();

        this.scrollParaProduto(this.getProdutoAtual());
        this.atualizaSlider(slideAtual,slideSelecionado)
    }

    scrollParaProduto(produtoSelecionado){
        this.listaProdutos.style.transform = 'translateX(-'+produtoSelecionado.style.left+')';
    }

    preparaImagens(){
        this.produtos.forEach((produto, index) => {
            produto.style.left = this.tamanhoSlide * index+'px';//faz com que as imagens fiquem uma a direita da outra
        });
    }

    atualizaSlider(sliderAtual, sliderSelecionado){
        sliderAtual.classList.remove('carousel_indicador--ativo');
        sliderSelecionado.classList.add('carousel_indicador--ativo');
    }

    pularParaSlide(e){
        if(e.target === e.currentTarget) return;

        const sliderSelecionado = Number(e.target.getAttribute('data-slider'));
        this.vaParaSlide(sliderSelecionado)
    }

}