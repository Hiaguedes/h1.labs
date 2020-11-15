import React from "react";
import bank_logo from "../../assets/images/bank_logo.svg";
import styled, {css} from "styled-components";
import { corPrimaria } from '../var';

const StyledHeader= styled.nav`
  background-color: ${ corPrimaria };
  display: flex;
  justify-content: space-between;
  padding: 0 15vw;
  height: 10vh;
  align-items: center;
`;

const BtnCabecalho = styled.div`
  text-align: center;
  border-radius: 3px;
  padding: 5px 20px;
  margin: 0 10px;
  font-weight: 600;
  border: 2px solid white;

 ${({tipo}) => css`
  ${tipo === 'primario' && css`
    background: 'transparent';
    color: white;
  `}
  ${tipo === 'secundario' && css`
    background: white;
    color: ${corPrimaria};
  `}
  `}
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

const Cabecalho = () => {
  return (
    <StyledHeader>
      <Logo src={bank_logo} alt="Logo Smart Bank" />
      <div style={{display: 'flex'}}>
        <BtnCabecalho tipo="secundario" href="https://google.com">
          Ajuda
        </BtnCabecalho>
        <BtnCabecalho tipo="primario" href="https://google.com">
          Sair
        </BtnCabecalho>
      </div>
    </StyledHeader>
  );
};

export default Cabecalho;
