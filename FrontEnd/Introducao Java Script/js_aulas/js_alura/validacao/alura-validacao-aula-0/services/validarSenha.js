export const validarSenha = (input) => {

    const patternChar= new RegExp(/[A-Z]+/,'g'); 
    const patternNumber= new RegExp(/[0-9]+/,'g');
    const patternSpecialCharacters= new RegExp(/[+$\-\\?*ç@/#%^&*\s.,;\'\`~|\[\]]+/,'g');
    let hasError = 'false';

    const testArray=[
        patternChar.test(input.value),
        patternNumber.test(input.value),
        patternSpecialCharacters.test(input.value)
    ];

    testArray.forEach(test => {
        if(!test){
            hasError = 'true';
        }

    })


    if(hasError == 'true') {
        input.setCustomValidity("Precisa ter ao menos uma letra maiúscula, um número e um special Char (@-+!?ç)");
        return;
    }

    input.setCustomValidity("");
    return;
    

}