import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Landing from './pages/landing'
import HomeOwner from './pages/homeowner'
import Installer from './pages/installer'
import App from './pages/app'

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="homeowner" component={HomeOwner} />
      <Route path="installer" component={Installer} />
    </Route>
  </Router>
);

module.exports = routes;