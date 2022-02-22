import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../layouts';
import Button from 'react-bootstrap/Button';
import Produto from '../../../components/Produtos'

// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook

const apiBase= ' https://ranekapi.origamid.dev/json/api/produto';


export default function useStateAnswer() {
    
    const initialProductState = {
        id: '',
        descricao: '',
        nome: '',
        preco: '',
        usuario_id: '',
        vendido: '',
        fotos: [],
    };
    const [produto, setProduto] = useState(initialProductState);
    const [loading, setLoading] = useState(<></>);

    const fetchApi = async(product) => {
        setProduto(initialProductState);
        setLoading(<>Carregando...</>)
        const response = await fetch(`${apiBase}/${product}`).then(res => res.json())
        setProduto(response);
    }
  return (
    <>
    <Head>
      <title>Exercício de useState</title>
    </Head>
    <Layout>
      <pre>Resolução do exercício de useState da Origamid</pre>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button onClick={() => fetchApi('tablet')} variant="primary">Tablet</Button>
      <Button onClick={() => fetchApi('smartphone')} variant="primary">Smartphone</Button>
      <Button onClick={() => fetchApi('notebook')} variant="primary">Notebook</Button>
    </div>
    {produto.id.length >0 ? (
        <Produto produto={produto} />
    ): loading}

    </Layout>
    </>
  )
}