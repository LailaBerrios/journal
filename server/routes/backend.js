/**
 * Our server backend.
 */
//Lets require/import the HTTP module
const database = require('../database');

const express = require('express');
const router = express.Router();

function handleServerError(err, response) {
    console.error(err);
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.write(err);
    response.end();
}

//Return requests for the journal data.
router.get("/allEntries", function(request, response) {
    database.getAllEntries()
        .then((allEntries) => {
            response.json(allEntries);
            response.end();
        })
        .catch((error) => {
            handleServerError(error, response);
        });
});

router.param('id', function (request, response, next, id) {
    request.params.entryId = id;
    next();
});

//Return requests for the journal d`ata.
router.route('/entry/:id')
    .get((request, response) => {
        const {entryId} = request.params;
        database.getEntry(entryId)
            .then((entry) => {
                response.json(entry);
                response.end();
            })
            .catch((error) => {
                handleServerError(error, response);
            });
    })
    .post((request, response) => {
        const {entryId} = request.params;
        database.addEntry(entryId, request.params)
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

module.exports = router;