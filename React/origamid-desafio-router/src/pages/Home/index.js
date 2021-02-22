import React, {useEffect} from 'react';
import useHead from '../../hooks/Head';
import useFetch from '../../hooks/Fetch';
import { Image } from '../../components/ImageCard';
import { ImageContainer } from './home.styles'
import  Loader from '../../components/Loading';
import { Link } from 'react-router-dom'

const Home = () => {
    const [, setHead] = useHead();
    const {data, loading, error, request} = useFetch();
    
    useEffect(() => {
        setHead({title: 'App | Home'});
        console.log(data)
    }, []);

    useEffect(() => {
        request('https://ranekapi.origamid.dev/json/api/produto');
      }, [request]);

    return loading ?  
    <Loader loading={loading} /> :
      (
             <ImageContainer>
            {
            data.map(res => {
                return (
                    <div style={{display: 'flex', flexDirection: 'column', width: '30%',marginBottom: '1rem'}}>
                        <Link to={`produto/${res.id}`}>
                            <Image src={res.fotos[0].src}/>
                        </Link>
                        <h2>{res.nome}</h2>
                    </div>
                    )
                })
            }
             </ImageContainer>
     );


}

export default Home;