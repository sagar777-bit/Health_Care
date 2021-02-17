import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/login";
import Dashboad from "./Pages/dashboard";
import Authentication from "./Componentes/Authentication";
import Allcases from "./Pages/Allcases";
import HealthDetails from "./Pages/healthDetails";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Authentication>
          <Dashboad />
        </Authentication>
      </Route>
      <Route exact path="/allcases">
        <Allcases />
      </Route>
      <Route exact path="/healthDetails">
        <HealthDetails />
      </Route>
      <Route exact path="/login">
        <Authentication nonAuthentication={true}>
          <Login />
        </Authentication>
      </Route>
      <Route path="*" render={() => "404 Not Found"} />
    </Switch>
  );
}

export default App;
