/**
 * This view enables us to add a new entry to the journal.
 */
//import react
//create react class
//export it
const React = require('react');

const AddNewEntry = React.createClass({
    getInitialState() {
        return {
            mood: 'Hello!'
        };
    },

    handleMoodChange(event) {
        const textBox = event.target;
        const mood = textBox.value;
        this.setState({
            // mood: mood, not needed in es6
            mood
        });
    },

    render() {
        const {mood} = this.state;
        // same thing: var mood = this.state.mood;

        return (
            <div className='addNewEntry'>
                <input
                    type="text"
                    value={mood}
                    onChange={this.handleMoodChange}
                />
            </div>
        );
    }
});

module.exports = AddNewEntry;