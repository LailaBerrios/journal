/**
 * The core of the app, which contains all children.
 */
const React = require('react');
const MainMenu = require('./mainMenu.jsx');

const App = React.createClass({
    render() {
        return (
            <div key='main' className='mainContainer'>
                <MainMenu/>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;