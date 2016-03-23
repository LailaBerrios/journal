/**
 * Just the doorway into the app.
 */
require('polyfills');

const React = require('react');

const database = require('./database');
const LogViewer = require('./views/logViewer.jsx');

const MainApp = React.createClass({
    getInitialState() {
        return {
            entries: []
        };
    },

    componentDidMount() {
        database.getEntries()
            .then((entries) => this.setState({entries}))
            .catch((error) => console.error(error));
    },

    render() {
        const {entries} = this.state;

        let contents;
        if (entries && entries.length > 0) {
            contents = (<LogViewer entries={entries}/>);
        }

        return (
            <div key='main'>
                {contents}
            </div>
        );
    }
});

React.render(<MainApp/>, document.getElementById('app'));