import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createGlobalStyle } from "styled-components";

import {
    AppContainer,
    AppHeader,
    AppHeaderCenter,
    AppLogo,
    AppTitle,
    BodyContainer
} from "./styles/MainPageStyle";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
   'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }
`;

function App() {

    return (
        <Router>
        <React.Fragment>
            <GlobalStyle />
            <AppContainer>
                <AppHeader>
                    <AppHeaderCenter>
                        <AppLogo src={logo} alt="logo" />
                        <AppTitle>Invoice builder</AppTitle>

                    </AppHeaderCenter>
                </AppHeader>

                <BodyContainer>

                    <nav>

                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>

                    </nav>

                    <data>

                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>

                    </data>



                </BodyContainer>
            </AppContainer>
        </React.Fragment>
        </Router>
    );
}

export default App;
