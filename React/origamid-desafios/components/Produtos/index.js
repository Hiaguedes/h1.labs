import React from 'react';

const Produtos = ({produto}) => {
    return (
        <div style={{overflowWrap: 'break-word'}}>
            <pre style={{marginTop: '30px'}}>
                id: {produto?.id}
            </pre>
            <pre>
                descricao: {produto?.descricao},
            </pre>
            <pre>
                nome: {produto?.nome},
            </pre>
            <pre>
                preco: {produto?.preco},
                </pre>
            <pre>    
                usuario_id: {produto?.usuario_id},
                </pre>
            <pre>
                vendido: {produto?.vendido},
            </pre>
            <pre>
                fotos: <br /> {produto?.fotos.map(foto => {
                    return(
                        <>
                            <img src={foto.src} width={300} height={300}/>
                            <br />
                        </>
                        )
                })},
            </pre>
        </div>
    );
}

export default Produtos;
