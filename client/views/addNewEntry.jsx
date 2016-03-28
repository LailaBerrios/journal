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
                <div className='inputField'>
                    <div className='inputTitle'>Mood</div>
                    <input
                        className='inputInput'
                        type="text"
                        value={mood}
                        onChange={this.handleMoodChange}
                    />
                </div>
                <div className='inputField'>
                    <div className='inputTitle'>Date</div>
                    <input
                        className='inputInput'
                        type="text"
                    />
                </div>
            </div>
        );
    }
});

module.exports = AddNewEntry;