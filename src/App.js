import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import HomePage from './component/home/homepage';
import CreateInvoice from './component/create-invoice/create-invoice';
import Header from './component/header/header'


function App() {
  return (
    <div className="App">

      <Router>

        <Header />

        <Switch>
          
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/create">
            <CreateInvoice />
          </Route>

        </Switch>

        
      </Router>
    </div>
  );
}

export default App;
