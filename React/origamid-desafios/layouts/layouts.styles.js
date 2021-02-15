import styled from 'styled-components';

const SidebarBase = styled.aside`
    width: 100%;
    min-height: 100vh;
    max-height: 100%;
    background-color: lightgrey;
    padding: 2rem; 
    overflow-y: scroll;
    top: 0;
    position: sticky;

    &::-webkit-scrollbar {
        width: 3px
    }

    &::-webkit-scrollbar-thumb {
            background: #53e;
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
    grid-template-columns: 300px calc(100vw - 300px);
    grid-template-rows: 100vh;
    overflow-x: hidden;
`;

export const LayoutStyles = {SidebarBase, Content, LayoutContainer} ;