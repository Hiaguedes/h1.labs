document.querySelector(".toggle").addEventListener("change",function(){//dark-mode
    document.querySelector(".container").classList.toggle("inverse-header");
    document.querySelector("body").classList.toggle("inverse-body");
    document.querySelector(".input-search").classList.toggle("inv-input-search");
    document.querySelector(".menu").classList.toggle("inv-menu");
    document.querySelector(".click-search").classList.toggle("inv-click-search");
    document.querySelector(".icon-search").classList.toggle("inv-icon-search");
});

document.querySelector(".menu").addEventListener("click",function(){
    document.querySelector(".nav-container").classList.add("menu-nav");
    document.querySelector(".nav-container").classList.remove("esconde");
});

document.querySelector(".menu-fechar").addEventListener("click",function(){
    document.querySelector(".nav-container").classList.remove("menu-nav");
    document.querySelector(".nav-container").classList.add("esconde");
});


