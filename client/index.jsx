/**
 * Starting point for all of our client side code.
 */

// My personal polyfill functions.
require('jsPolyfills');

// Our main stylesheet defining how to design our objects
require('./stylesheets/main.css');

// The react component.
const React = require('react');
const { render } = require('react-dom');
const { Router, browserHistory } = require('react-router');

const routes = require('./routes.jsx');

render((
    // to do client side routing
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.getElementById('app'));
