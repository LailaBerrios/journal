/**
 * Just the doorway into the app.
 */
require('jsPolyfills');

require('./stylesheets/main.css');

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