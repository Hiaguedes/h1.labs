(() =>{

    const divAnimacao=document.querySelector('.header__animacao');
    let larguraJanela=window.innerWidth;

    function createImage(){
        const div=document.createElement('div');
        div.classList.add('header__animacao--imagem');
        divAnimacao.appendChild(div);
    }
    
    function eraseContent(){
        divAnimacao.innerHTML = '';
    }
    
    function arrangeByRowsAndColumns(column,row){
        eraseContent();
        for(let i=0;i<column*row;i++){
            createImage();
            }
    }

function resizeImg(larguraJanela){
    switch (true){
        case (larguraJanela>1600):
            arrangeByRowsAndColumns(12,3);
            break;

        case (larguraJanela>1280 && larguraJanela<=1600):
            arrangeByRowsAndColumns(10,3);
            break;

        case (larguraJanela>960 && larguraJanela<=1280):
            arrangeByRowsAndColumns(8,3);
            break;

        case (larguraJanela>640 && larguraJanela<=960):
            arrangeByRowsAndColumns(6,3);
            break;

        case (larguraJanela>320 && larguraJanela<=640):
            arrangeByRowsAndColumns(4,3);
            break;
        case (larguraJanela<=320):
            arrangeByRowsAndColumns(2,2);
            break;
    }
}

resizeImg(larguraJanela);

window.addEventListener('resize',() =>{
  larguraJanela=window.innerWidth;
  resizeImg(larguraJanela);
});

})();