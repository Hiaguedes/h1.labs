import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';

export default function DadosEntrega({aoEnviar}){
    const [CEP,setCEP]=useState('');
    const [endereco,setEndereco]=useState('');
    const [numero,setNumero]=useState('');
    const [estado,setEstado]=useState('');
    const [cidade,setCidade]=useState('');

    return (
        <form onSubmit={e => {
            e.preventDefault();
            aoEnviar({CEP,endereco,numero,estado,cidade})
        }}>
        <TextField 
            id="cep" 
            label="CEP" 
            type="number" 
            value={CEP}
            onChange={e => setCEP(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            />
            <TextField 
            id="endereco" 
            label="Endereço" 
            type="text" 
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            />
            <TextField 
            id="numero" 
            label="Número" 
            type="number" 
            value={numero}
            onChange={e => setNumero(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            />
            <TextField 
            id="estado" 
            label="Estado" 
            type="text" 
            value={estado}
            onChange={e => setEstado(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            />
            <TextField 
            id="cidade" 
            label="Cidade" 
            type="text" 
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            />
    <Button type="submit" variant="contained" color="primary" fullWidth>
        Finalizar Cadastro
      </Button>
        </form>
    )
}