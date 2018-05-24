import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/presentational/HomePage';
import Login from '../components/container/auth/Login';
import Signup from '../components/container/auth/Signup';
import UserProfile from '../components/container/UserProfile';
import AllBusiness from '../components/container/AllBusiness';
import UserBusiness from '../components/container/UserBusiness';
import RegisterBusiness from '../components/container/RegisterBusiness';
import ViewBusiness from '../components/container/ViewBusiness';
import Authenticate from '../components/container/auth/Authenticate';
import PageNotFound from '../components/presentational/common/PageNotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Authenticate(Homepage)} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/myprofile" component={Authenticate(UserProfile)} />
      <Route exact path="/all-business" component={Authenticate(AllBusiness)} />
      <Route exact path="/userbusiness" component={Authenticate(UserBusiness)} />
      <Route exact path="/register-business" component={Authenticate(RegisterBusiness)} />
      <Route exact path="/view-business/:id" component={Authenticate(ViewBusiness)} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  </Router>
);

export default Routes;
