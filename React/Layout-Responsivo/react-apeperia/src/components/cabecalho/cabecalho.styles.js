import styled from 'styled-components';

import LogoImage from '../../assets/imgs/logo-apeperia.svg'

export const  Cabecalho = styled.div`
    color: #FFF;

    width: 100%;

    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-top: .75rem;
    padding-bottom: .75rem;

    border-bottom: 1px solid #103D4A;

    position: absolute;
`; 

export const Logo = styled.img`
    margin-bottom: 1rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-image: url(${LogoImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid black;
    background-color: transparent;
`;

export const Navegacao = styled.nav`
    text-align: center;
`;

export const Link = styled.a`
    font-size: 1.1rem;

    display: inline-block;

    margin-right: .7rem;
    margin-bottom: 1.25rem;
    margin-left: .7rem;
`;