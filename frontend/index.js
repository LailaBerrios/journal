/**
 * Renders our html stuff.
 */
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    const html = "<html><body><div id='app'>Hello World.</div></body></html>";

    response.send(html);
    response.end();
});

module.exports = router;