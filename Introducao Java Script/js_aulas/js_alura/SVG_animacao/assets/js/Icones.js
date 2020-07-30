class Icones {
    constructor(){
        this.icones = document.querySelectorAll('.card-imagem');
    }

    animaLogo(){
        gsap.to(this.icones,0.5, {scale: 0.95, repeat:-1, yoyo:true})
    }
}

export default Icones;