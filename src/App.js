import React from 'react';
import { createGlobalStyle } from 'styled-components';
import InvoiceForm from './components/InvoiceForm';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    line-height: 1.5em;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style:none;
  }

  a, a:hover, a:visited {
    text-decoration:none;
  }
`;


function App() {
  return (
    <div className="App">
        <GlobalStyle />

        <InvoiceForm />

    </div>
  );
}

export default App;
