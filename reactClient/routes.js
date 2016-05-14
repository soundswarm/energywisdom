import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Landing from './pages/landing'
import HomeOwner from './pages/homeowner'
import Installer from './pages/installer'

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Landing}>
      <Route path="homeowner" component={HomeOwner}>
      </Route>
      <Route path="installer" component={Installer}>
      </Route>
    </Route>
  </Router>
);

module.exports = routes;