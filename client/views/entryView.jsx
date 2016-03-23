/**
 * Renders a single log
 */
const React = require('react');

const EntryView = React.createClass({
    propTypes: {
        entry: React.PropTypes.object
    },

    render() {
        const {entry} = this.props;
        const {date, content, id} = entry;

        return (
            <div key='entry'>
                <div key='date'>
                    {date}
                </div>
                <div key='content'>
                    {content}
                </div>
            </div>
        );
    }
});

module.exports = EntryView;