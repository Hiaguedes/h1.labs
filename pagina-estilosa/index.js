(()=>{
    const conteudos =document.querySelectorAll('.conteudo');

    const home=document.querySelector('[data-home]');
    const section1=document.querySelector('[data-section1]');
    const section2=document.querySelector('[data-section2]');
    const section3=document.querySelector('[data-section3]');

 const apagaTodoConteudo=()=>{
    conteudos.forEach((conteudo)=>{
        conteudo.classList.add('hide');
    })
 }
 window.onload = function() {
    home.focus();
  };

 home.addEventListener('click',()=>{
     apagaTodoConteudo();
     conteudos[0].classList.remove('hide');
 })
 section1.addEventListener('click',()=>{
     apagaTodoConteudo();
     conteudos[1].classList.remove('hide');
 })
 section2.addEventListener('click',()=>{
     apagaTodoConteudo();
     conteudos[2].classList.remove('hide');
 })
 section3.addEventListener('click',()=>{
     apagaTodoConteudo();
     conteudos[3].classList.remove('hide');
 })


 home.addEventListener('keydown',(event)=>{
     if(event.keyCode==13){
        apagaTodoConteudo();
         conteudos[0].classList.remove('hide');
    }
})
section1.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        apagaTodoConteudo();
         conteudos[1].classList.remove('hide');
    }
})
section2.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        apagaTodoConteudo();
         conteudos[2].classList.remove('hide');
    }
})
section3.addEventListener('keydown',(event)=>{
    if(event.keyCode==13){
        apagaTodoConteudo();
         conteudos[3].classList.remove('hide');
    }
})
 
})();