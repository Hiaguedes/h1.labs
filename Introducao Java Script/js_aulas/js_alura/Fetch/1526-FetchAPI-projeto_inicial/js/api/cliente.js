export const Clientes =() =>{ 
return fetch('http://localhost:4000/clientes')
    .then(response => response.json())
    .then(json => json)
};

export const cadastroCliente = (nome,cpf) => {
    return fetch('http://localhost:4000/clientes/cliente', {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            cpf: cpf
        })
    })
    .then(response => response.body);
}

export const deletaCliente = id => {
    return fetch(`http://localhost:4000/clientes/cliente/${id}`,{
        method: 'DELETE'
    })
}