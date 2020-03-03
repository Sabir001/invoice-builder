import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
    <React.Fragment>
        <Router>
            <App />
        </Router>
    </React.Fragment>,
    document.getElementById("root")
);
