var rue = document.querySelector(".rue");
var niko = document.querySelector(".niko");

var horizontal=0;
setInterval(function(){
    
    rue.style.backgroundPosition = `-${horizontal}px -128px`; 
    niko.style.backgroundPosition = `-${horizontal}px -128px`;

    if(horizontal <144){
        horizontal=horizontal+48;
    }else if(horizontal==144){
        horizontal=0;
    }
    
},100);