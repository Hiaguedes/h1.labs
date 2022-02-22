
const listaCPFinvalidos = (cpfs) => {
    const lista =[
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ]

    return lista.includes(cpfs); // se o cpf digitado inclui na lista
}

const calcularTotal = (multiplicador) => (resultado,numeroAtual) => resultado +numeroAtual *multiplicador--;

const calcularDigitoVerificador = (cpfVetorizado, multiplicador) => {
    const total = cpfVetorizado.reduce(calcularTotal(multiplicador),0);
    
    const resto = total % 11;
    let digito = 11 - resto;

    if(digito > 9){
        digito = 0;
    }
    return digito;
}

export const validarCPF = input => {
    const cpfNumero =input.value.replace(/\D/g,"");// regex para tirar qualquer . ou / e - digitado pelo usuário (no caso letras também)
    const cpfArrayPrimeira = cpfNumero.substr(0,9).split("");//pega os nove primeiros digitos e separa em um array
    const cpfArraySegunda = cpfNumero.substr(0,10).split("");//pega os nove primeiros digitos e separa em um array
    const digitosVerificadoresArray= cpfNumero.substr(9,11).split("");

    const primeiroDigitoCalculado = calcularDigitoVerificador(cpfArrayPrimeira,10);
    const segundoDigitoCalculado = calcularDigitoVerificador(cpfArraySegunda,11);
    console.log(primeiroDigitoCalculado,segundoDigitoCalculado);

    
    if(listaCPFinvalidos(cpfNumero) || primeiroDigitoCalculado != digitosVerificadoresArray[0]   
    || segundoDigitoCalculado != digitosVerificadoresArray[1]
    ){
        input.setCustomValidity("Este CPF é inválido");
        return;
    }

    input.setCustomValidity("");
    return;
}