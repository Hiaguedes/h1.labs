import React, {useState, useContext} from 'react';
import {Button, TextField} from '@material-ui/core';
import validacoesCadastro from "../../contexts/validacoes";
import useErros from '../../hooks/useErros';

export default function DadosUsuario({aoEnviar}){

    const [senha,setSenha] = useState('');
    const [email,setEmail] = useState('');  
    
    const validacoes = useContext(validacoesCadastro)
    
    function possoEnviar(){
        
        for(let campo in erros){
            if(!erros[campo].valido) return false;
        }
        
        return true;
    }
    
const [erros, validarCampos] = useErros(validacoes);

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