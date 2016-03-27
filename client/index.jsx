/**
 * Just the doorway into the app.
 */
require('jsPolyfills');
require('./stylesheets/main.css');

const React = require('react');
const { render } = require('react-dom');
const { Router, Route, Link, browserHistory } = require('react-router');

const routes = require('./routes.jsx');

render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.getElementById('app'));
