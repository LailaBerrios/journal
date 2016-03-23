/**
 * Interface to our simple database.
 */
const jsonfile = require('jsonfile');

const filename = 'data.json';

let _database;

module.exports = {
    open(callback) {
        if (_database) {
            callback(null, _database);
        } else {
            jsonfile.readFile(filename, (err, fileContents) => {
                if (fileContents) _database = fileContents;
                callback(err, _database);
            });
        }
    },

    close(callback) {
        jsonfile.writeFile(filename, _database, callback);
    },

    addEntry(id, data, callback) {
        const {date, contents} = data;
        this.open((err, database) => {
            if (err) callback(err);
            if (!database) callback('Database not found');
            database.entries[id] = {
                data,
                contents
            };
            getEntry(id, callback);
        })
    },

    getEntry(id, callback) {
        this.open((err, database) => {
            if (err) callback(err);
            if (!database) callback('Database not found');

            const entry = database.entries[id];
            if (!entry) callback('Entry not found');
            callback(err, entry);
        });
    }
};
