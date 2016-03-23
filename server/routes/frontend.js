/**
 * Renders our html stuff.
 */
const express = require('express');
const router = express.Router();

const React = require('react');

router.get('/', (request, response) => {

    var outputDOM = React.DOM.html({},
        React.DOM.body({},
            React.DOM.div({ id: 'app' }),
            React.DOM.script({src: '/client.js'})
        )
    );
    response.send(React.renderToStaticMarkup(outputDOM));
    response.end();
});

router.get('/client.js', (request, response) => {
    response.sendFile('client.js', {root: './build'});
});

module.exports = router;