import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../layouts';

// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook

const coresArray = ['azul', 'roxo', 'laranja', 'verde', 'vermelho', 'cinza'];

export default function InputsQuestion() {
    const [cores,setCores] = useState([]); 

    const handleCheck = ({target}) => {
        if(cores.includes(target.value)) {
             setCores(cores.filter(cor => cor !== target.value))
        }
        else setCores([...cores, target.value])
    };

    const renderCheckbox = (cor) => {
        return (
            <label key={cor} style={{width: '100%'}}>
            <input style={{marginRight: '0.5rem'}} type="checkbox" checked={cores.includes(cor)} value={cor} onChange={e => handleCheck(e)}/>
            {cor[0].toUpperCase() + cor.slice(1)}
        </label>    
            )
    }

  return (
    <>
    <Head>
      <title>Exercício de Checkbox</title>
    </Head>
    <Layout>
        {coresArray.map(cor => {
            return ( 
                renderCheckbox(cor)
             )
        })}
        {cores}
    </Layout>
    </>
  )
}