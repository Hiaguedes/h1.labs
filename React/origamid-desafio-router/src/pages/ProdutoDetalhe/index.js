import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/Fetch';
import useHead from '../../hooks/Head';
import { Image } from '../../components/ImageCard'
import Loader from '../../components/Loading'
import { PrecoStyle, ContentStyle } from './detalhe.styles'

const ProdutoDetalhe = () => {
    const [, setHead] = useHead();
    const { id } = useParams();
    const {data, loading, error, request} = useFetch();

    useEffect(() => {
        request(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
      }, [request, id]);

    useEffect(() => {
        setHead({title: `App | Detalhe de ${data.nome}`});
        console.log(data)
    }, [data]);


    return loading ?
    <Loader loading={loading}/>
    : (
        <ContentStyle>
          <h2>Detalhe do Produto: {data.nome}</h2>  

          <div style={{width: '30%', marginTop: '1rem'}}>
                {data.fotos && data.fotos.map((foto, index) => <Image key={index} src={foto.src} />)}
          </div>
          <PrecoStyle>R$ {Number(data.preco).toFixed(2)}</PrecoStyle>
        </ContentStyle>
    );
}

export default ProdutoDetalhe;
