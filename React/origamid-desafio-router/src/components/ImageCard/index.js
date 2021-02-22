import styled, { css } from 'styled-components';

export const Image = styled.div`
    width: 70%;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.1);
    background-image: ${({src}) => src && css`url(${src})`};
    background-size: cover;
    background-position: center;
    height: 200px;
    cursor: pointer;
`