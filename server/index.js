/**
 * This is the entry point to our server side application.
 */

// Pull in my personal polyfills.
require('jsPolyfills');

const express = require('express');
const app = express();

// Specify our parser for incoming post commands.
const bodyParser = require('body-parser');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.raw() ); // to support unencoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

// We use root for the front end and backend for the back end.
app.use('/backend', require('./routes/backend'));
app.use('/', require('./routes/frontend'));

// Images, sound files, etc. should be served from the
// public directory.
app.use(express.static('public'));
app.use('/', require('./routes/frontend'));

// The default port is 5000.  In production, the port is defined
// by the Heroku environment variable.
const PORT=process.env.PORT || 5000;

// Start the server
app.listen(PORT, function(){
    // Let the console know that we're running.
    console.log("Server listening on: http://localhost:%s", PORT);
});