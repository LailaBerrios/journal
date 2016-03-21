/**
 * Interface to our simple database.
 */
const jsonfile = require('jsonfile');

const filename = 'data.json';

let database;

module.exports = {
    open(callback) {
        jsonfile.readFile(filename, (err, fileContents) => {
            if (fileContents) database = fileContents;
            callback(err, database);
        });
    },

    close(callback) {
        jsonfile.writeFile(filename, database, callback);
    },

    addEntry(id, data) {
        const {date, contents} = data;
        database.entries[id] = {
            data,
            contents
        };
    },

    getEntry(id) {
        return database.entries[id];
    }
};
