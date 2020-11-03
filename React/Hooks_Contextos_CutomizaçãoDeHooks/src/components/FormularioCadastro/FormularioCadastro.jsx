import React, {useState, useEffect} from "react";
import DadosEntrega from "./DadosEntrega";
import DadosPessoais from './DadosPessoais'
import DadosUsuario from './DadosUsuario';
import {StepLabel, Stepper,Step, Typography} from '@material-ui/core';

function FormularioCadastro({aoEnviar, validacoes}) {
  const [etapaAtual,setEtapaAtual] = useState(0);
  const [dadosColetados, setDados] = useState({});

  useEffect(()=>{
    etapaAtual === (formularios.length - 1) &&
    aoEnviar(dadosColetados); 
  })

  function proximo(){
    setEtapaAtual(etapaAtual + 1)
  }
  function coletarDados(dados){
        setDados({...dadosColetados, ...dados});
        proximo();
      }


  const formularios = [
                        <DadosUsuario aoEnviar={coletarDados} validacoes={validacoes}/>,
                        <DadosPessoais aoEnviar={coletarDados} validacoes={validacoes} />,
                        <DadosEntrega aoEnviar={coletarDados} validacoes={validacoes}/>,
                        <Typography variant="h5">Cadastro Realizado com sucesso!</Typography>
                      ]


  return (
    <>
    <Stepper activeStep={etapaAtual}>
      <Step><StepLabel>Login</StepLabel></Step>
      <Step><StepLabel>Dados Pessoais</StepLabel></Step>
      <Step><StepLabel>Dados para a Entrega</StepLabel></Step>
      <Step><StepLabel>Confirmação</StepLabel></Step>
    </Stepper>
    {
      formularios[etapaAtual]
    }
    </>
  );
}



export default FormularioCadastro;
