/**
 * Simply shows us the list of entries.
 */
const React = require('react');

const EntryView = require('./entryView.jsx');

const LogViewer = React.createClass({
    propTypes: {
        data: React.PropTypes.array
    },

    render() {
        const {data} = this.props;

        if (!data) {
            return (<div key='logs'/>);
        }

        return (
            <div key='logs'>
                { data.map(
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

const DataRequestor = require('../dataRequestor.jsx');

module.exports = DataRequestor(LogViewer, {
    path: '/backend/allEntries'
});