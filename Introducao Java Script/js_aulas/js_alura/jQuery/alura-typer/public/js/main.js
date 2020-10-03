const frase = $('.texto').text();
const contadorPalavrasTextp = $('[data-contador-palavras-texto]');
const campoDigitação = $('.campo-digitacao');
const tempoDigitacao = $('[data-tempo]').text();

const numeroPalavrasTexto = frase.split(/\s+/g).length;

const temS = numeroPalavras => {
    if(numeroPalavras>1) return 's'
    else return ''
}


contadorPalavrasTextp.text(`${numeroPalavrasTexto} palavra${temS(numeroPalavrasTexto)}`)

campoDigitação.on('input',(e) => {
    let qtdLetras = e.target.value.split('').length;
    let qtdPalavras = e.target.value.split(/\s+/g).filter(n => n != '').length;

    
    $('[data-contador-letras-textArea]').text(`${qtdLetras} letra${temS(qtdLetras)}`);
    $('[data-contador-palavras-textArea]').text(`${qtdPalavras} palavras${temS(qtdPalavras)}`);
})

campoDigitação.one('focus', e => { 
    let tempo = tempoDigitacao.split(' ')[0];
    
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