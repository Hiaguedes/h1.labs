import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    height: 2rem;
    outline: none;

    &:focus {
        border-color: rgba(0,0,255,0.5)
    }
`;



export const InputStyles = { Input }