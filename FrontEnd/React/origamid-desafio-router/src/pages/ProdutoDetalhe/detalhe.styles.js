import styled from 'styled-components';

export const PrecoStyle = styled.p`
    color: green;
    background-color: lightgreen;
    display: inline-block;
`;

export const ContentStyle = styled.div`

    margin-left: 2rem;
    animation: leftRight 0.3s ease-in-out;

    @keyframes leftRight {
        from{
            transform: translateX(-50px);
        }
        
        to {
            transform: translateX(initial);
        }
    }

`;