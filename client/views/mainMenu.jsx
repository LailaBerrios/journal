/**
 * This is the main menu that links to all of our other
 * routes and pages.
 */
const React = require('react');
const {Link} = require('react-router');

const MainMenu = React.createClass({
    render() {
        return (
            <div key='menu' className='mainMenu'>
                <Link to='/journal'>View Journal Entries</Link>
            </div>
        );
    }
});

module.exports = MainMenu;