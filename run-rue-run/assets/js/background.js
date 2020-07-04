var corpo = document.querySelector("body");

function getRandomColor() {
    var letters = '9ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
  }

setInterval(function(){
    corpo.style.background=getRandomColor();
},500);


