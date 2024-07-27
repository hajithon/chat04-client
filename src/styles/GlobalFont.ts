import { createGlobalStyle } from 'styled-components';

const GlobalFont = createGlobalStyle`    
 
  @font-face {
    font-family: "SUIT";
    src: url("../../src/assets/font/SUIT-Variable.woff2") format('woff2'); 
  }
  @font-face {
    font-family: "NanumSquare";
    src: url("../../src/assets/font/NanumSquareAcEB.woff2") format('woff2'); 
  }
 
`;

export default GlobalFont;
