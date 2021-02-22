import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const useHead = () => {
    const [head, setHead] = useState({title: 'App'})

    useEffect(() => {
        document.title = head.title;
    }, [head])

    return [head, setHead]
}

export default useHead