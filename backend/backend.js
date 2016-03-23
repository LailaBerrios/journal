/**
 * Our server backend.
 */
//Lets require/import the HTTP module
const database = require('./database');
const express = require('express');
const app = express();

//Lets define a port we want to listen to
const PORT=process.env.PORT || 5000;

function handleServerError(err, response) {
    console.error(err);
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.write(err);
    response.end();
}

function handleNotFoundError(err, response) {
    console.error(err);
    response.writeHead(404);
    response.write(err);
    response.end();
}

//Return requests for the journal data.
app.get("/", function(request, response) {
    database.open()
        .then((database) => {
            response.json(database);
            response.end();
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

//Return requests for the journal d`ata.
app.get("/entry", function(request, response) {
    const entryIdString = request.params.entry;
    database.getEntry(entryIdString)
        .then((entry) => {
            response.json(entry);
            response.end();
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

app.post('/entry', function(request, response) {
    const entryIdString = request.params.entry;
    database.addEntry(entryIdString, request.params)
        .then((entry) => {
            return database.close()
                .then(() => {
                    response.json(entry);
                    response.end();
                });
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});