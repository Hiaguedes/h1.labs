document.querySelector(".toggle").addEventListener("change",function(event){
    document.querySelector(".container").classList.toggle("inverse-header");
    document.querySelector("body").classList.toggle("inverse-body");
    document.querySelector(".input-search").classList.toggle("inv-input-search");
    document.querySelector(".menu").classList.toggle("inv-menu");
    document.querySelector(".click-search").classList.toggle("inv-click-search");
    document.querySelector(".icon-search").classList.toggle("inv-icon-search");
});