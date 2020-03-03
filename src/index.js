import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';
import App from './App';
import Header from './components/Header';

ReactDOM.render(
    <React.Fragment>
        <Router>
            <Header/>
            <App />
        </Router>
    </React.Fragment>,
    document.getElementById("root")
);
