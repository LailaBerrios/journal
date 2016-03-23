/**
 * Our server.
 */
const express = require('express');
const app = express();

const backend = require('./backend');

app.use('/backend', backend);
app.use(express.static('public'));

//Lets define a port we want to listen to
const PORT=process.env.PORT || 5000;

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});