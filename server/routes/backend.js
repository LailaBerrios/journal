/**
 * The backend is our location for accessing data while the
 * app is running.  Through here, we should be able to access
 * any raw data that we want to get access to.
 */

const express = require('express');
const router = express.Router();

// Pull in our server side database utility.
const database = require('../database');

/**
 * If we can an error on the server, we can write a simple
 * generic error to the client.  We technically could be
 * more specific than sending a 500 error code, but
 * this will be fine.
 *
 * @param err
 * @param response
 */
function handleServerError(err, response) {
    console.error(err);
    response.writeHead(500, {'Content-Type': 'text/plain'});
    response.write(err);
    response.end();
}

/**
 * Return all of the entries for the journal.
 *
 * When there are a lot of entries, this will be a bulky
 * request.  We should ultimately pare it down with ranges.
 */
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

/**
 * Defines the id parameter so that we can use it later.
 *
 * Stores it in the entryId field to avoid potential collisions.
 */
router.param('id', function (request, response, next, id) {
    request.params.entryId = id;
    next();
});

/**
 * Routes that deal with a specific entry.
 *
 * The get is used for getting a JSON object for that
 * specific entry.
 *
 * The post creates an entry at that location.
 */
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
        database.addEntry(entryId, request.body)
            .then((result) => {
                response.json(result);
                response.end();
            })
            .catch((error) => {
                handleServerError(error, response);
            });
    });

module.exports = router;