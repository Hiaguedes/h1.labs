var corpo = document.querySelector("body");

function getRandomColor() {

    var num= Math.random()*(211-76)+76;
    var color =`rgb(${num},${num},${num})`;
    return color;
  }

setInterval(function(){
    corpo.style.background="linear-gradient("+ getRandomColor() +","+getRandomColor()+")";
},500);


