import React, {useEffect} from 'react';
import useHead from '../../hooks/Head';

const Contato = () => {
    const [, setHead] = useHead();

    useEffect(() => {
        setHead({title: 'App | Contato'})
    }, [])

    return (
        <div>
            <p>Oi meu nome é Hiago</p>
        </div>
    );
}

export default Contato;
