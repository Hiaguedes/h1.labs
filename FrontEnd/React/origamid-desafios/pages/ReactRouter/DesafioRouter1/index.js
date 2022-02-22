import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../layouts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProdutoRoute from '../../../components/ProdutoRoute'
// Utilize a API abaixo para puxar a lista de produto
// https://ranekapi.origamid.dev/json/api/produto
// Cada produto possui o id, o mesmo pode ser passado na api para retornar os dados desse produto específico
// https://ranekapi.origamid.dev/json/api/produto/notebook

const Router1 = () => {


return (
    <>
    <Head>
    <title>Desafio do Router</title>
    </Head>
    <Layout>
        
    </Layout>
        <BrowserRouter>
        <Switch>
            <Route path="/">
                <h1>Produto</h1>
            </Route>                
            <Route path="produto" >
                <ProdutoRoute />
            </Route>
        </Switch>                
        </BrowserRouter>
    </>
)
}

export default Router1;