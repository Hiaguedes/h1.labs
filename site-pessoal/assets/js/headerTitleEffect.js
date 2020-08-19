(()=>{
const headerTitle = document.querySelector('.header__titulo'); 
setTimeout(()=> {
    headerTitle.innerHTML =`Hi, I'm HiagoGuedes`;
},1000);

setTimeout(()=> {
    headerTitle.innerHTML =`Hi, I'm Hiag<span class="select">G</span>uedes`;
},1500);

setTimeout(()=> {
    let goodbyeG = document.querySelector('.select');
    goodbyeG.style.display='none';
},2000);

})();