import styled from 'styled-components';

export const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: center;
    margin-top: 1rem;
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