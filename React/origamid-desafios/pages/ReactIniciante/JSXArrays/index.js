import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../layouts';


// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook

const apiBase= ' https://ranekapi.origamid.dev/json/api/produto';


export default function JSXAarrays() {
    // Organize os produtos como mostrado no vídeo
// Mostre apenas produtos que forem mais caros que R$ 1500
const produtos = [
    {
      id: 1,
      nome: 'Smartphone',
      preco: 'R$ 2000',
      cores: ['#29d8d5', '#252a34', '#fc3766'],
    },
    {
      id: 2,
      nome: 'Notebook',
      preco: 'R$ 3000',
      cores: ['#ffd045', '#d4394b', '#f37c59'],
    },
    {
      id: 3,
      nome: 'Tablet',
      preco: 'R$ 1500',
      cores: ['#365069', '#47c1c8', '#f95786'],
    },
  ];
  

  return (
    <>
    <Head>
      <title>Exercício de JSX Arrays</title>
    </Head>
    <Layout>
        {produtos
           .filter(produto => Number(produto.preco.replace('R$ ', '')) > 1500)
           .map(produto => {
            return (
                <>
                    <h2>{produto.nome}</h2>
                    <p>{produto.preco}</p>
                    {produto.cores.map(cor => {
                        return (
                            <>
                                <div style={{backgroundColor: cor, color: '#f1f1f1'}}>
                                    {cor}
                                </div>
                            </>
                        )
                    })}
                </>
            )
        })}

    </Layout>
    </>
  )
}