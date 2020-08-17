class SectionView{
    constructor(){
        this._secoes = document.querySelectorAll('[data-section');
        this._titulos=document.querySelectorAll('.titulo');
        this._title =['About Me', 'My Projects', 'What skills I have?', 'My proficiency level'];
        this._set= new Boolean(false);
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
        setTimeout(() =>{
            this._titulos[index].innerHTML += this._title[index].charAt(i);
            if(i<this._title[index].length){
                i++;
                this._delay(i,index);
            }
            if(i==this._title[index].length){
                this._titulos[index].classList.remove('titulo--cursor-active');
            }
        },150);
    }

    removeTitle(index){
        this._titulos[index].innerHTML = '';
    }

    /*
        this._titulos[index].classList.add('titulo--cursor-active');
        console.log(this._titulos[index]);

        if(this._i >0 && this._set.valueOf()=='true'){ 
            this._i ==0;
            this._set = Boolean(false);
        };

        if(this._i < this._title[index].length){
            this._titulos[index].innerHTML += this._title[index].charAt(this._i);
            this._i++;
            setTimeout(this.writeTitle,100);
        }

        if(this._i == this._title[index].length){
            this._set = Boolean(true);
            this._titulos[index].classList.remove('titulo--cursor-active');
        }
    */
}