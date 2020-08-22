class SectionView{
    constructor(){
        this._secoes = document.querySelectorAll('[data-section');
        this._titulos=document.querySelectorAll('.titulo');
        this._title =['About Me', 'My Projects and Repositorys', 'What skills I have?', 'My proficiency level'];
    }

    get title(){
        return this._title;
    }


    changeSectionView(indexAnterior, indexAtual){
        this._secoes[indexAtual].classList.remove('section--hide');
        this._secoes[indexAtual].setAttribute('data-section','active');
    
        this._secoes[indexAnterior].classList.add('section--hide');
        this._secoes[indexAnterior].setAttribute('data-section','');
    }

    writeTitle(index){
        let i=0;
        this._delay(i,index);
        this._titulos[index].classList.add('titulo--cursor-active');
    }

     _delay(i,index){
        setTimeout(() => {
            this._titulos[index].innerHTML += this._title[index].charAt(i);
            if(i<this._title[index].length){
                i++;
                this._delay(i,index);
            }
            if(i === this._title[index].length){
                this._titulos[index].classList.remove('titulo--cursor-active');
            }
        },50);
    }

    removeTitle(index){
        this._titulos[index].innerHTML = '';
    }
}