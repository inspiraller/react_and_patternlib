import '../scss/global.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import routes from './routes.jsx';

// essential for hot module replacement!
if (module.hot){
  module.hot.accept();
}
ReactDOM.render(
	<Router history={Router.hashHistory} children={ routes }></Router>,
	document.getElementById('app')
);
