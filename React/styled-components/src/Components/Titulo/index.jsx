import React from "react";
import styled from "styled-components";

const WrapperTitulo = styled.h1`
    color: ${({theme}) => theme.text};
    padding: 25px 0;
`;

const Titulo = ({ children }) => {
  return <WrapperTitulo>{children}</WrapperTitulo>;
};
export default Titulo;
