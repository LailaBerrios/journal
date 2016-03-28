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

        if (!entries) {
            return (<div key='logs'/>);
        }

        return (
            <div key='logs'>
                { entries.map(
                    (entry) => (
                        <EntryView
                            key={entry.id}
                            entry={entry}
                        />
                    )
                )}
            </div>
        );
    }
});

// Wrap the log viewer in a data requestor that requests
// the indicated data.
const DataRequestor = require('../dataRequestor.jsx');

module.exports = DataRequestor(LogViewer, {
    path: '/backend/allEntries',
    selector(entries) { return {entries};}
});