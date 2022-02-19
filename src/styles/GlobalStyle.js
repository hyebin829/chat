import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    letter-spacing: -0.075em;
    padding:0;
    margin:0;
    
  }
  
  body {
   
    font-family:  'Pretendard-Light',sans-serif;
   font-weight: 300;

  }

 
  @font-face {
    font-family: 'Pretendard-Light';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}
 
 


  h1,h2,h3,h4,h5,h6,p,dl,dt,dd,ol,ul,li,tr,th,td,form,label {
    margin: 0;
    padding: 0;

  }
  ol,
  ul {
    list-style:none;
  }
`;

export default GlobalStyle;
