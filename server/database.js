/**
 * Helper interface to access our database.
 */

const pg = require('pg');

//pg.defaults.ssl = true;

const {DATABASE_URL} = process.env;

module.exports = {
    getAllEntries() {
        return new Promise((resolve, reject) => {
            pg.connect(DATABASE_URL, (err, client, done) => {
                if (err) {
                    done();
                    reject(err);
                } else {
                    client.query('SELECT * FROM entry_table;', (err, result) => {
                        done();
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.rows);
                        }
                    });
                }
            });
        });
    },

    addEntry(id, data) {
        return Promise.reject('Not implemented');
    },

    getEntry(id) {
        return Promise.reject('Not implemented');
    }
};
