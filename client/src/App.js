import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import Navbar from "../src/components/layout/Navbar";
// import Home from "../src/components/pages/Home";
// import Affirmations from "../src/components/pages/Affirmations";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import Alerts from "./components/layout/Alerts";
import Gratitude from "../src/components/pages/Gratitude";

import PrivateRoute from "../src/components/routing/PrivateRoute";
import AlertState from "../src/context/alert/AlertState";
import AuthState from "../src/context/auth/AuthState";
import GratitudeState from "../src/context/gratitude/GratitudeState";
import AffirmationsState from "../src/context/affirmations/AffirmationsState";
import setAuthToken from "../src/utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // init materalize js
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <AuthState>
      <GratitudeState>
        <AffirmationsState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Gratitude} />
                  {/* <PrivateRoute
                    exact
                    path='/affirmations'
                    component={Affirmations}
                  /> */}
                  {/* <PrivateRoute exact path='/gratitude' component={Gratitude} /> */}
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </Fragment>
            </Router>
          </AlertState>
        </AffirmationsState>
      </GratitudeState>
    </AuthState>
  );
};

export default App;
