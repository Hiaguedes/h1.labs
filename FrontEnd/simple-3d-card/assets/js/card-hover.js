(()=>{
    const card = document.querySelector(".card");
    
    card.addEventListener('mousemove',(event)=>{

        const region = card.getBoundingClientRect();
        let x = event.x-region.x;
        let y= event.y-region.y;
        let mod=Math.sqrt(x*x+y*y);
        const x_middle=region.width/2;
        const y_middle=region.height / 2;

        let x_map=(x-x_middle)/x_middle;
        let y_map=(y-y_middle)/y_middle;
        let mod_map=Math.sqrt(x_map*x_map+y_map*y_map);

        card.style.transform= `scale(1.2) rotate3d(${-y_map},${x_map},0,${mod_map*30}deg)`;

        if(y_map<0 && x_map<0){
            card.style.boxShadow='5px 5px 10px black';
        } else if(y_map<0 && x_map>0){
            card.style.boxShadow='-5px 5px 10px black';
        }else if(y_map>0 && x_map<0){
            card.style.boxShadow='5px -5px 10px black';
        }else{
            card.style.boxShadow='-5px -5px 10px black';
        }
        
    });

    card.addEventListener('mouseout',()=>{
        card.style.transform= `scale(1) rotate3d(0,0,0,0)`;
        card.style.boxShadow='none';
    });
})();