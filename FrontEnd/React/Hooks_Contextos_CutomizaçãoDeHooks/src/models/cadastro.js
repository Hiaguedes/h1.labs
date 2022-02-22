export function validarCPF(cpf){
    if(cpf.length !== 11){
      return {valido:false, texto:"CPF deve ter 11 digitos."}
    }else{
      return {valido:true, texto:""}
    }
  }

  export function validarSenha(senha){
      return (senha.length <4 || senha.length>72) ? 
      
      {valido:false, texto:'senha deve ter mais que 4 letras e menos que 72'} :
       {valido:true, texto:""}
  }