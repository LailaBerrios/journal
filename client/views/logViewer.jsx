/**
 * Simply shows us the list of entries.
 */
const React = require('react');

const EntryView = require('./entryView.jsx');

const LogViewer = React.createClass({
    propTypes: {
        entries: React.PropTypes.array
    },

    render() {
        const {entries} = this.props;

        return (
            <div key='logs'>
                { entries.map(
                    (entry) => (<EntryView key={entry.id} entry={entry}/>)
                )}
            </div>
        );
    }
});

module.exports = LogViewer;