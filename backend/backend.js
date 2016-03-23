/**
 * Our server backend.
 */
//Lets require/import the HTTP module
const http = require('http');
const dispatcher = require('httpdispatcher');
const database = require('./database');

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
dispatcher.onGet("/", function(request, response) {
    database.open()
        .then((database) => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(database));
            response.end();
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

//Return requests for the journal d`ata.
dispatcher.onGet("/entry", function(request, response) {
    const entryIdString = request.params.entry;
    database.getEntry(entryIdString)
        .then((entry) => {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(entry));
            response.end();
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

dispatcher.onPost('/entry', function(request, response) {
    const entryIdString = request.params.entry;
    database.addEntry(entryIdString, request.params)
        .then((entry) => {
            return database.close()
                .then(() => {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify(entry));
                    response.end();
                });
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

dispatcher.onError(function(request, response) {
    handleNotFoundError('Path not found', response);
});

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.error(err);
    }
}

//Create a server
const server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});