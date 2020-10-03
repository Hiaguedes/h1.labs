const frase = $('.texto').text();
const contadorPalavrasTexto = $('[data-contador-palavras-texto]');
const campoDigitação = $('.campo-digitacao');
const tempoDigitacao = $('[data-tempo]');
const butaoReiniciar = $('[data-reiniciar]');
const valorTempo =  tempoDigitacao.text().split(' ')[0];

const numeroPalavrasTexto = frase.split(/\s+/g).length;

const temS = numeroPalavras => {
    if(numeroPalavras>1) return 's'
    else return ''
}


contadorPalavrasTexto.text(`${numeroPalavrasTexto} palavra${temS(numeroPalavrasTexto)}`)

const handleUpdateWordAndCharCounter = ()=>{
campoDigitação.on('input',(e) => {
    let qtdLetras = e.target.value.split('').length;
    let qtdPalavras = e.target.value.split(/\s+/g).filter(n => n != '').length;

    
    $('[data-contador-letras-textArea]').text(`${qtdLetras} letra${temS(qtdLetras)}`);
    $('[data-contador-palavras-textArea]').text(`${qtdPalavras} palavras${temS(qtdPalavras)}`);
})
}

const handleUserInput = () => {
campoDigitação.one('focus', e => { 
    let tempo = valorTempo;
    
    const id=setInterval(()=> {
        tempo--;
        $('[data-tempo]').text(`${tempo} segundo${temS(tempo)}`)
        //console.log(tempo) // para ver o tempo rolando
        if(tempo<1){
            campoDigitação.attr('disabled',true);
            clearInterval(id);
        } 
    },1000 )
})
}

campoDigitação.on('input',() => {
    let fraseDigitada = campoDigitação.val();
    let comparavel = frase.substr(0,fraseDigitada.length);
    
    fraseDigitada == comparavel ? 
    (campoDigitação.addClass('certo'),campoDigitação.removeClass('errado')) : 
    (campoDigitação.addClass('errado'),campoDigitação.removeClass('certo'))
})

const handleResetGame = ()=> {
butaoReiniciar.on('click', () => {
    campoDigitação.attr("disabled",false);
    campoDigitação.val('');

    tempoDigitacao.text(`${valorTempo} segundos`);
    $('[data-contador-letras-textArea]').text('0 letras')
    $('[data-contador-palavras-textArea]').text('0 palavras');
    handleUserInput();
    campoDigitação.removeClass('errado');
    campoDigitação.removeClass('certo');
})
}

$(document).ready( ()=> {
    handleUpdateWordAndCharCounter();
    handleResetGame();
    handleUserInput();
})