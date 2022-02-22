import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../../layouts';
import perguntas from './perguntas' ;
import Widget from '../../../components/Widget';
import Button from 'react-bootstrap/Button';

const numeroPerguntas = perguntas.length;

const Quiz = () => {
    const [checked, setChecked] = useState('');
    const [answersRight, setAnswersRight] = useState([])
    const [perguntaAtual,setPerguntaAtual] = useState(0);

    const handleClickNext = () => {
        if(perguntaAtual +1 > numeroPerguntas) return;
        setAnswersRight([...answersRight, perguntas[perguntaAtual].resposta === checked]);
        setPerguntaAtual(perguntaAtual + 1);
        setChecked('');

    }

return (
    <>
    <Head>
    <title>Desafio do Quiz</title>
    </Head>
    <Layout>
        {perguntaAtual +1 > numeroPerguntas ? <>Você acertou: {answersRight.filter(n => n).length} de {numeroPerguntas}</> : (
            <>
                <Widget checked={checked} 
                        setChecked={setChecked} 
                        title={perguntas[perguntaAtual].pergunta} 
                        options={perguntas[perguntaAtual].options}/>
                <Button disabled={checked.length === 0} onClick={handleClickNext}>Próxima</Button>
            </>
        )}
    </Layout>
    </>
)
}

export default Quiz;