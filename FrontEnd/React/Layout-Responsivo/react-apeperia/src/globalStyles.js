import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    outline: none;
    color: black;
  }
`;

export default GlobalStyle;
