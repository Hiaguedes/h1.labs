export const validarNascimento = (input) => {
    const dataNascimento = new Date(input.value);
    const dataAtual= new Date();

    const data18 = new Date(
        dataNascimento.getUTCFullYear()+18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    );

    if(data18 >dataAtual) {
        input.setCustomValidity("Você tem que ter 18 anos");
        return;
    }
    input.setCustomValidity("");
    return;
};