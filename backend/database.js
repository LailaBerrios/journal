/**
 * Interface to our simple database.
 */
const jsonfile = require('jsonfile');

const filename = 'data.json';

let _database;

module.exports = {
    open() {
        if (_database) {
            return Promise.resolve( _database);
        } else {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(filename, (err, fileContents) => {
                    if (!err && fileContents) {
                        _database = fileContents;
                    } else {
                        _database = {};
                    }
                    resolve(_database);
                });
            });
        }
    },

    close() {
        return new Promise((resolve, reject) => {
            jsonfile.writeFile(filename, _database, () => resolve());
        });
    },

    addEntry(id, data) {
        const {date, contents} = data;

        function writeEntry(database) {
            return new Promise((resolve, reject) => {
                if (database) {
                    database.entries[id] = {
                        data,
                        contents
                    };
                    resolve();
                } else {
                    reject('Database not found');
                }
            });
        }

        return this.open()
            .then(writeEntry)
            .then(this.getEntry);
    },

    getEntry(id) {
        function readEntry(database) {
            if (!database) {
                return Promise.reject('Database not found');
            }

            const entry = database.entries[id];
            if (!entry) {
                return Promise.reject('Entry not found');
            }

            return Promise.resolve(entry);
        }

        return this.open()
            .then(readEntry);
    }
};
