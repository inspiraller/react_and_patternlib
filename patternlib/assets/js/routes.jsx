import React from 'react';
import {IndexRoute, Router, Route, HistoryBase} from 'react-router';
import App from './app.jsx';
import Home from './pages/home.jsx';

export default
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>