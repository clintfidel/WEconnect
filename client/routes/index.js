import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/presentational/HomePage';
import Login from '../components/container/auth/Login';
import Signup from '../components/container/auth/Signup';
import AllBusiness from '../components/container/AllBusiness';
import RegisterBusiness from '../components/container/RegisterBusiness';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/all-business" component={AllBusiness} />
      <Route path="/register-business" component={RegisterBusiness} />
    </Switch>
  </Router>
);

export default Routes;
