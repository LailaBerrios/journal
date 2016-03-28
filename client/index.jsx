/**
 * Starting point for all of our client side code.
 */

// My personal polyfill functions.
require('jsPolyfills');

// Our main stylesheet defining how to design our objects
require('./stylesheets/main.css');

// The react component.
const React = require('react');

const LogViewer = require('./views/logViewer.jsx');

const MainApp = React.createClass({
    render() {
        return (
            <div key='main' className='mainContainer'>
                <LogViewer/>
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));