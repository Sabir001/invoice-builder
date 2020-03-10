import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./component/home/homepage";
import CreateInvoice from "./component/create-invoice/create-invoice";
import PDFDisplay from "./component/create-invoice/pdf";
import Header from "./component/header/header";
import { Container } from "./style/common";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/create">
              <CreateInvoice />

            </Route>

            <Route path="/pdf" component={PDFDisplay} />

          </Switch>

        </Container>
      </Router>
    </div>
  );

}

export default App;
