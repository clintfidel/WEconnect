import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../components/presentational/HomePage';

const Routes = () => (
  <Router>
    <Switch>
      <Route path='/Homepage' component={Homepage} />
    </Switch>
  </Router>
)

export default Routes
