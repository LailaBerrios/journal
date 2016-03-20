/**
 * Our server backend.
 */
//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var jsonfile = require('jsonfile');

//Lets define a port we want to listen to
var PORT=32100;

//A sample GET request
dispatcher.onGet("/journal", function(request, response) {
    jsonfile.readFile('data.json', function(err, database) {
        if (err) {
            console.error(err);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(err);
            response.end();
        } else {
            var entryIdString = request.params.entry;
            var entryId = entryIdString && Number(entryIdString);
            response.writeHead(200, {'Content-Type': 'application/json'});
            if (entryIdString && entryId >= 0 && entryId < database.entries.length) {
                response.write(JSON.stringify(database.entries[entryId]));
            } else {
                response.write(JSON.stringify(database));
            }
            response.end();
        }
    });
});

dispatcher.onError(function(request, response) {
    response.writeHead(404);
    response.write('Path not found');
    response.end();
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
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});