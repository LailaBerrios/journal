/**
 *
 */
const React = require('react');

function getPath(path) {
    return new Promise((resolve, reject) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    resolve(JSON.parse(httpRequest.responseText));
                } else {
                    reject(httpRequest);
                }
            }
        };
        httpRequest.open("GET", path, true);
        httpRequest.send();
    });
}

module.exports = function(Component, {path}) {
    return React.createClass({
        getInitialState() {
            return {
                data: null
            };
        },

        componentDidMount() {
            getPath(path)
                .then((data) => this.setState({data}))
                .catch((error) => console.error(error));
        },

        render() {
            return (
                <Component {...this.props} {...this.state}/>
            );
        }
    });
};