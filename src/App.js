import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateInvoice from "./component/create-invoice/create-invoice";
// import PDFDisplay from "./component/create-invoice/pdf";
import PDFDisplay from "./component/create-invoice/pdf-design";
import Header from "./component/header/header";
import { Container } from "./style/create-style";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        {/* <Container> */}
          <Switch>
            <Route exact path="/">
              <CreateInvoice />
            </Route>

            {/*<Route path="/pdf">*/}
            {/*  <PDFDisplay />*/}
            {/*</Route>*/}

              <Route path="/pdf">
              <PDFDisplay />
            </Route>
          </Switch>
        {/* </Container> */}
      </Router>
    </div>
  );
}

export default App;
