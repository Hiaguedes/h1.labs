class SkillsController {
    constructor() {
        this._controls = document.querySelectorAll('.skills__control');
        this._imgs =document.querySelectorAll('.skills__image');
        this._skillsCards = document.querySelectorAll('.skills__cards');
        this._skillTitles = document.querySelectorAll('.skills__title');
        this._indexAtual=0;
    }

    update(event){
        this._controls.forEach((control,index) => {
            if(event.target == control){
                this._indexAtual = index;
            }

            if(event.target == this._imgs[index] || event.target == this._skillTitles[index]){
                if(event.target.parentElement == control){
                    this._indexAtual = index;
                }
            }
        });

        
        if(this._skillsCards[this._indexAtual].className == 'skills__cards skills__cards--hide skills__cards--erase'){
            this._skillsCards[this._indexAtual].classList.remove('skills__cards--erase');
        }
        this._imgs[this._indexAtual].classList.toggle('skills__image--active');

        setTimeout(()=> {
        this._skillsCards[this._indexAtual].classList.toggle('skills__cards--hide');
    },100);

        setTimeout(()=> {
            if(this._skillsCards[this._indexAtual].className == 'skills__cards skills__cards--hide'){
                this._skillsCards[this._indexAtual].classList.add('skills__cards--erase');
            }
            },500);
        
    }

}

let skillsCTRL = new SkillsController();