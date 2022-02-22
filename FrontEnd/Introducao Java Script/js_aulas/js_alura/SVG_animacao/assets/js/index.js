import Cards from './Cards.js';
import Icones from './Icones.js';
import Footer from './Footer.js';

window.onload = ()=>{
    let animaCards = new Cards();
    let icones = new Icones();
    let efeitoOnda=new Footer();


    document.addEventListener('scroll',()=>{
        animaCards.scrollCards();
    })

    icones.animaLogo();
    efeitoOnda.animaFilter();
}