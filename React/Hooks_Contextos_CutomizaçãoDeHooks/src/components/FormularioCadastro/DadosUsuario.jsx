import React from 'react';
import {Button, TextField} from '@material-ui/core';

export default function DadosUsuario({aoEnviar}){
    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            aoEnviar();
            }}>

            <TextField 
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