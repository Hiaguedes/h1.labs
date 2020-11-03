import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';

export default function DadosUsuario({aoEnviar}){

    const [senha,setSenha] = useState('');
    const [email,setEmail] = useState('');

    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            aoEnviar({email,senha});
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
            onChange={e => setSenha(e.target.value)}
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
            >Cadastrar</Button>
        </form>
    )
}