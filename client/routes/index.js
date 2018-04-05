import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/presentational/HomePage';
import Login from '../components/container/auth/Login';
import Signup from '../components/container/auth/Signup';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

    </Switch>
  </Router>
);

export default Routes;
