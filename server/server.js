/**
 * Our server backend.
 */
//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
var PORT=32100;

var mockJournal = {
    entries: [
        {
            date: 'Today',
            content: 'I did things.'
        },
        {
            date: 'Tomorrow',
            content: 'I did something else.'
        }
    ]
};

//A sample GET request
dispatcher.onGet("/journal", function(request, response) {
    response.writeHead(200, {'Content-Type': 'application/json'});

    var entryId = request.params.entry;
    if (entryId) {
        var myEntry = mockJournal.entries[Number(entryId)];
        response.write(JSON.stringify(myEntry));
    } else {
        response.write(JSON.stringify(mockJournal));
    }
    response.end();
});

dispatcher.onError(function(req, res) {
    res.writeHead(404);
    res.end();
});

//We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});