import Head from 'next/head';
import { useState, useRef } from 'react';
import Layout from '../../../layouts';
import { InputStyles } from './input.styles';
import Button from 'react-bootstrap/Button'

// https://ranekapi.origamid.dev/json/api/produto/tablet
// https://ranekapi.origamid.dev/json/api/produto/smartphone
// https://ranekapi.origamid.dev/json/api/produto/notebook


export default function InputsQuestion() {
    const { Input } = InputStyles;
    const initialState = {
        nome: '',
        email: '',
        senha: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
    };
    const [form, setForm] = useState(initialState);
    const [feedbackMensagem, setFeedbackMensagem] = useState('');
    const firstInput = useRef();
    const otherInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

            fetch('https://ranekapi.origamid.dev/json/api/usuario', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                // form é o objeto com os dados do formulário
                body: JSON.stringify(form),
        }).then(response => {
            setFeedbackMensagem('Boa! Usuário criado');
            setForm(initialState);
            firstInput.current.focus();
        })
            .catch(e => {
            setFeedbackMensagem('Feels bad Man, usuário não criado');
            firstInput.current.focus();
        })
            .finally(() => setTimeout(() => {
                setFeedbackMensagem('');
            },3000))
    }

    const fields = ['nome', 'email', 'senha', 'cep', 'rua',
                    'numero', 'bairro', 'cidade', 'estado'];
    const renderInput = (field) => {
        return(
            <label key={field} style={{width: '100%'}}>{field.charAt(0).toUpperCase() + field.slice(1)}:
            <Input ref={field === fields[0] ? firstInput : otherInput} type="text" value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})}/>
        </label>
        )
    }
  return (
    <>
    <Head>
      <title>Exercício de Forms</title>
    </Head>
    <Layout>
    <form>

    {fields.map( field => renderInput(field))}

        <Button type="submit" onClick={e => handleSubmit(e)}>Publicar</Button>
        <p style={{color: 'red'}}>{feedbackMensagem}</p>
    </form>
    </Layout>
    </>
  )
}