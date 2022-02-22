export const recuperarEndereco = input  => {
    const cepNumeros = input.value.replace(/\D/g,"");

    if(input.validity.valid) {
        const url=`https://viacep.com.br/ws/${cepNumeros}/json/`;
        const options ={
            method: 'GET',
            mode: 'cors',
            headers: {
                "content-type": "application/json;charset=utf-8"
            }
        }
        
        fetch(url , options)
        .then( response => response.json())
        .then(data => {
            if(data.erro){
                input.setCustomValidity("Este não é um CEP válido");
                return;
            }
            preencherCampos(data);
            input.setCustomValidity("");
            return;
        });
    }
};

const preencherCampos = (data) => {
    const campoLograudoro = document.getElementById('logradouro');
    const campoCidade = document.getElementById('cidade');
    const campoEstado = document.getElementById('estado');

    campoLograudoro.value = data.logradouro;
    campoCidade.value = data.localidade;
    campoEstado.value = data.uf;

    campoLograudoro.setAttribute('readonly','');
    campoCidade.setAttribute('readonly','');
    campoEstado.setAttribute('readonly','');
}