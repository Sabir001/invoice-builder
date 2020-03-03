import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Landing';
import Test from './components/Test';

function App() {
  return (
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </Switch>
  );
}

export default App;
