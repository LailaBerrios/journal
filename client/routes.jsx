/**
 * A place to keep all of the different routes we support.
 */
const React = require('react');
const { Router, Route, Link, browserHistory } = require('react-router');

const LogViewer = require('./views/logViewer.jsx');
const App = require('./views/app.jsx');

module.exports = (
    <Route path="/" component={App}>
        <Route path="journal" component={LogViewer}/>
    </Route>
);