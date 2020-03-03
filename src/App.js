import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './components/Home';
import About from './components/About';
import Family from './components/About/Family';


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
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={ ({match}) => {
            return(
              <Switch>
                <Route path={match.path} exact>
                  <About />
                </Route>
                <Route exact path={`${match.path}/family`}>
                  <Family />
                </Route>
              </Switch>
            )
          }} />
        </Switch>
    </div>
  );
}

export default App;
