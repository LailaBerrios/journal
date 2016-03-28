/**
 * This is a higher Order Component that requests a specific
 * path of data for its children.  It can be used to request
 * a single endpoint for a child.
 */
const React = require('react');

/**
 * Returns a promise that resolves when the http request
 * successfully completes.
 *
 * @param path
 * @returns {Promise}
 */
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

module.exports = function(Component, {path, selector}) {
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
            let dataProps = {};
            if (selector) {
                dataProps = selector(data);
            } else {
                dataProps = {data};
            }

            return (
                <Component {...this.props} {...dataProps}/>
            );
        }
    });
};