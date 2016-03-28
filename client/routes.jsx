/**
 * Each route contains its own information and behavior.
 * This file exports all of the routes that we support in our
 * app.
 */
const React = require('react');
const { Router, Route, Link, browserHistory } = require('react-router');

const LogViewer = require('./views/logViewer.jsx');
const App = require('./views/app.jsx');
const AddNewEntry = require('./views/addNewEntry.jsx');

module.exports = (
    <Route path="/" component={App}>
        <Route path="journal" component={LogViewer}/>
        <Route path="addNewEntry" component={AddNewEntry}/>
    </Route>
);