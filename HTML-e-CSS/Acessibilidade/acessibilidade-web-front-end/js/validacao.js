var campos = document.querySelectorAll('.contatoCampo input');

campos.forEach((campo)=>
    campo.addEventListener('invalid',()=>{
    campo.setCustomValidity('');
    
    if(!campo.validity.valid){
        campo.setCustomValidity('Ops! Tem algo ruim aqui :(');
        campo.classList.add('contatoCampo--validouErro');
        campo.classList.remove('contatoCampo--validouFoi');

        campo.parentNode.classList.add('contatoCampo--erro');
        campo.parentNode.classList.remove('contatoCampo--sucesso');
    }else{
        campo.classList.add('contatoCampo--validouFoi');
        campo.classList.remove('contatoCampo--validouErro');

        campo.parentNode.classList.remove('contatoCampo--erro');
        campo.parentNode.classList.add('contatoCampo--sucesso');
    }
}
));
