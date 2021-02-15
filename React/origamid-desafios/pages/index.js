import Head from 'next/head'
import Layout from '../layouts';

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <Layout>
      Página da home, selecione o exercício aqui na sidebar
    </Layout>
    </>
  )
}
