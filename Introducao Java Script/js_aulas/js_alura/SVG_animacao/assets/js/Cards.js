class Cards {
    constructor(){
         this.elemento = document.querySelector('.informativo');
         this.cardEsquerda= document.querySelectorAll('.card')[0];
         this.cardDireita = document.querySelectorAll('.card')[1];
    }

    scrollCards(){
        window.requestAnimationFrame(this.calculaScroll.bind(this));
    }

 calculaScroll(){
     const posElemento = this.elemento.getBoundingClientRect()['y'];
     if(posElemento >= 446){
        this.cardEsquerda.style.transform=`translate(${(posElemento+446)/6}%)`;
        this.cardDireita.style.transform=`translate(${-(posElemento+446)/6}%)`;
     }
 }

}
export default Cards;