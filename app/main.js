import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, Link, IndexRoute, useRouterHistory } from "react-router";

import App from './components/app.jsx';
import Login from './components/login.jsx';
import Profile from './components/profile.jsx';

ReactDOM.render((
	<Router history={browserHistory} >
    <Route path="/" component={App} >
      <Route path="/profile" component={Profile} />
    </Route>
    <Route path="/login" component={Login} />
  </Router>
), document.getElementById("app"));