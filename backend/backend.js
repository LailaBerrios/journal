/**
 * Our server backend.
 */
//Lets require/import the HTTP module
const http = require('http');
const dispatcher = require('httpdispatcher');
const jsonfile = require('jsonfile');

//Lets define a port we want to listen to
const PORT=process.env.PORT || 5000;

function makeNewEntry(newEntryData, oldEntryData) {
    console.log(newEntryData);
    return {
        date: 'temp',
        contents: 'temp'
    };
}

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
dispatcher.onGet("/journal", function(request, response) {
    jsonfile.readFile('data.json', function(err, database) {
        if (err) {
            handleServerError(err, response);
        } else {
            const entryIdString = request.params.entry;
            response.writeHead(200, {'Content-Type': 'application/json'});
            if (entryIdString && database.entries[entryIdString]) {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(database.entries[entryIdString]));
            } else if (entryIdString) {
                handleNotFoundError('Entry not found', response);
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(database));
            }
            response.end();
        }
    });
});

dispatcher.onPost('/journal', function(request, response) {
    console.log('params: ' + JSON.stringify(request.params));
    jsonfile.readFile('data.json', function(err, database) {
        if (err) {
            handleServerError(err, response);
        } else {
            const entryIdString = request.params.entry;
            if (entryIdString) {
                if (database[entryIdString]) {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                } else {
                    response.writeHead(201, {'Content-Type': 'application/json'});
                }
                const newEntry = makeNewEntry(request, database[entryIdString]);
                database[entryIdString] = newEntry;
                jsonfile.writeFileSync('data.json', database);
                response.write(JSON.stringify(newEntry));
                response.end();
            } else {
                handleServerError('Incorrect entry string of ' + entryIdString, response);
            }
        }
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