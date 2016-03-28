/**
 * The frontend consists of all of the web pages, data files,
 * etc. that we support.  Predominantly, this returns the
 * top level homepage that renders the rest of the app.
 */
const express = require('express');
const router = express.Router();

const React = require('react');

// The root home page that loads our client code.
const homepage = React.DOM.html({},
    React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({src: '/client.js'})
    )
);

/**
 * Renders the root home page and sends it to the client.
 */
router.get('/', (request, response) => {
    response.send(React.renderToStaticMarkup(homepage));
    response.end();
});

/**
 * Enables a redirect to the client.js file.
 */
router.get('/client.js', (request, response) => {
    response.sendFile('client.js', {root: './build'});
});

module.exports = router;