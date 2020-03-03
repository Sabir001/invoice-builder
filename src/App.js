import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Hello from './components/Hello'
import Home from './components/Home'
import {Menu, MenuItem} from './components/Style'
function App() {
  return (
    <BrowserRouter>
       <div className="App">
        <header className="App-header">
          <Menu>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/hello">Hello</Link>
            </MenuItem>
          </Menu>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/hello">
            <Hello />
            </Route>
          </Switch>
          
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
