/**
 *
 */

const React = require('react');

const TextInput = React.createClass({
    render() {
        const {label, onChange, value} = this.props;
// these attributes go into this.props
        return (
            <div className='inputField'>
                <div className='inputTitle'>{label}</div>
                <input
                    className='inputInput'
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
});

module.exports = TextInput;