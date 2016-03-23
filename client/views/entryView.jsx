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
            <div key='entry' className='entry'>
                <div key='date' className='date'>
                    {date}
                </div>
                <div key='content' className='content'>
                    {content}
                </div>
            </div>
        );
    }
});

module.exports = EntryView;