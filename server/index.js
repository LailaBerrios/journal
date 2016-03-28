/**
 * Our server.
 */

// Get this overwith
require('jsPolyfills');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.raw() ); // to support unencoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.use('/backend', require('./routes/backend'));
app.use('/', require('./routes/frontend'));
app.use(express.static('public'));

//Lets define a port we want to listen to
const PORT=process.env.PORT || 5000;

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});