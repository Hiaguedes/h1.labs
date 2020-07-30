import Cards from './Cards.js';
import Icones from './Icones.js';

window.onload = ()=>{
    let animaCards = new Cards();
    let icones = new Icones();


    document.addEventListener('scroll',()=>{
        animaCards.scrollCards();
    })

    icones.animaLogo();
}