import Head from 'next/head';
import Layout from '../../../layouts';
import ProdutosContext from '../../../components/ProdutosContext';
import { ProductsProvider } from '../../../contexts/ProductsContext';

// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook


export default function Context() {

  return (
    <>
    <Head>
      <title>Exercício de Context</title>
    </Head>
    <Layout>
      <ProductsProvider>
          <ProdutosContext />
        </ProductsProvider>
    </Layout>
    </>
  )
}