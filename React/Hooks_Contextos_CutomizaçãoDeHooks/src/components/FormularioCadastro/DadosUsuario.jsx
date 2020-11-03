import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';

export default function DadosUsuario({aoEnviar,validacoes}){

    const [senha,setSenha] = useState('');
    const [email,setEmail] = useState('');  
    const [erros, setErros] = useState({senha:{valido:true, texto:""}})

    function possoEnviar(){
        
        for(let campo in erros){
            if(!erros[campo].valido) return false;
        }

        return true;
    }

    function validarCampos(e){
          const {name,value} = e.target
          const ehValido = validacoes[name](value);
          const novoEstado = {...erros}
          novoEstado[name] = ehValido;
          setErros(novoEstado);
        
    }

    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            possoEnviar() && aoEnviar({email,senha});
            }}>

            <TextField
            value={email} 
            onChange={e => setEmail(e.target.value)}
            id="email" 
            label="email" 
            type="email" 
            variant="outlined"
            margin="normal"
            fullWidth
            required
            />

            <TextField 
            id="senha" 
            label="senha" 
            value={senha}
            name='senha'
            onChange={e => setSenha(e.target.value)}
            onBlur={validarCampos}
            error={!erros.senha.valido}
            helperText={erros.senha.texto}
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            />

            <Button 
            type="submit"
            variant="contained" 
            color="primary"
            >Avançar</Button>
        </form>
    )
}