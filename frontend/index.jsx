/**
 * Just the doorway into the app.
 */
require('polyfills');

const React = require('react');

const MainApp = React.createClass({
    render() {
        return (
            <div key='main'>
                Hello World!!!
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));