/**
 * This view enables us to add a new entry to the journal.
 */
//import react
//create react class
//export it
const React = require('react');
const TextInput = require('../textInput.jsx');

const AddNewEntry = React.createClass({
    getInitialState() {
        return {
            mood: 'Hello!',
            date: 'None for now'
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

    handleDateChange(event) {
        const textBox = event.target;
        const date = textBox.value;
        this.setState({
            date
        });
    },

    render() {
        const {mood, date} = this.state;
        // same thing: var mood = this.state.mood;

        return (
            <div className='addNewEntry'>
                <TextInput
                    label='Mood'
                    onChange={this.handleMoodChange}
                    value={mood}
                />
                <TextInput
                    label='Date'
                    onChange={this.handleDateChange}
                    value={date}
                />
            </div>
        );
    }
});

module.exports = AddNewEntry;