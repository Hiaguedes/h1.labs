import React, {useEffect} from 'react'
import useHead from '../../hooks/Head';

export default function NotFound() {
    const [, setHead] = useHead();

    useEffect(() => {
        setHead({title: 'App | 404'})
    }, [])
    return (
        <p>
            Página não encontrada
        </p>
    )
}
