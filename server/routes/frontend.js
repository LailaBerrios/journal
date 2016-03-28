/**
 * The frontend consists of all of the web pages, data files,
 * etc. that we support.  Predominantly, this returns the
 * top level homepage that renders the rest of the app.
 */
const express = require('express');
const router = express.Router();

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { match, RouterContext } = require('react-router');

const routes = require('../../client/routes.jsx');

// The root home page that loads our client code.
const homepage = React.DOM.html({},
    React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({src: '/client.js'})
    )
);

const renderedHomepage = ReactDOMServer.renderToStaticMarkup(homepage);

/**
 * Renders the root home page and sends it to the client.
 */
router.get('/', (request, response) => {
    response.send(renderedHomepage);
    response.end();
});

/**
 * Enables a redirect to the client.js file.
 */
router.get('/client.js', (request, response) => {
    response.sendFile('client.js', {root: './build'});
});

// Redirect all other requests to root.
router.get('*', function(request, response) {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            response.status(500).send(error.message)
        } else if (redirectLocation) {
            response.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.
            response.status(200).send(renderedHomepage);
        } else {
            response.status(404).send('Not found')
        }
    });
});

module.exports = router;