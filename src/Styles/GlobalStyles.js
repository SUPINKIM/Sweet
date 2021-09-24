import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        margin: 0;
    }

    #root {
        width: 100%;
        height: 100%;
    } 
`;

export default GlobalStyle;
