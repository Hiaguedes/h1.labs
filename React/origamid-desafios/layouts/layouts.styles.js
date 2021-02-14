import styled from 'styled-components';

const SidebarBase = styled.aside`
    width: 100%;
    height: 100vh;
    background-color: lightgrey;
    padding: 2rem; 
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 6px;
    }

`;

SidebarBase.Content = styled.div``;

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem; 
`;

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: 100vh;
`;

export const LayoutStyles = {SidebarBase, Content, LayoutContainer} ;