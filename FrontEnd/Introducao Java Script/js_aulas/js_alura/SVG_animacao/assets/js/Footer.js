class Footer{
    constructor(){
        this.filtroTexto=document.querySelector('#filtro-turbulencia')
    }

    animaFilter(){
        gsap.to(this.filtroTexto,20,{attr:{
            baseFrequency:0.03
        },repeat:-1,yoyo:true});
    }
}
export default Footer;