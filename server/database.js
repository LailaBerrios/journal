/**
 * This file contains all of our methods for accessing
 * our Postgres SQL database.   It provides all the methods
 * for inserting, reading, etc., and provides them
 * externally as promises for other systems.
 */


// A useful library for building SQL queries without
// having to worry too much about their syntax.
const squel = require('squel');

// Provide the Postgres library.
const pg = require('pg');

// Make sure we connect to the postgres site securely.
pg.defaults.ssl = true;

// The URL where we can find the database is provided by
// environment variables provided by Heroku.
const {DATABASE_URL} = process.env;

// This is the table that we are storing entries in.
const ENTRY_TABLE = 'entry_table';

// These are the columns that have information we want to post
// to our entry database.
const entryColumns = [
    'date',
    'content'
];

/**
 * Return a promise that resolves when we successfully
 * connect to the database.
 *
 * resolves with a client to access the database,
 * and a done function to close the connection.
 *
 * @returns {Promise}
 */
function connectToDB() {
    return new Promise((resolve, reject) => {
        pg.connect(DATABASE_URL, (err, client, done) => {
            if (err) {
                done();
                reject(err);
            } else {
                resolve({client, done});
            }
        });
    });
}

/**
 * Returns a function that will perform the provided
 * query.  The performing of that query will return a
 * promise that resolves once the query successfully
 * completes.
 *
 * The query can be any object that has a toString() method
 * that resolves to a standard SQL query string.
 *
 * @param query
 * @returns {Function}
 */
function performQuery(query) {
    const queryString = query.toString();
    return function executeQuery({client, done}) {
        return new Promise((resolve, reject) => {
            client.query(queryString, (err, result) => {
                done();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

/**
 * Tiny little helper that pulls the rows off
 * of the query result.
 *
 * @param result
 * @returns {*}
 */
function selectRows(result) {
    return Promise.resolve(result.rows);
}

/**
 * Helper method that returns the first row from the query
 * result.
 *
 * @param result
 * @returns {*}
 */
function selectFirstRow(result) {
    if (result.rows &&
            result.rows.length &&
            result.rows.length > 0) {
        return Promise.resolve(result.rows[0]);
    } else {
        return Promise.reject(new Error('First row does not exist'));
    }
}

/**
 * Helper method that builds a query to insert an
 * entry into the database.
 *
 * @param id
 * @param data
 * @returns {*}
 */
function buildInsertQuery(id, data) {
    const fields = {id: id};
    entryColumns.forEach(columnName => {
        if(data[columnName]) {
            fields[columnName] = data[columnName];
        }
    });

    const query = squel.insert()
        .into(ENTRY_TABLE)
        .setFields(fields);

    return query;
}

module.exports = {
    /**
     * Returns an array of all of the entries.
     * @returns {*}
     */
    getAllEntries() {
        const query = squel.select()
            .from(ENTRY_TABLE)
            .order('date');
        return connectToDB()
            .then(performQuery(query))
            .then(selectRows);
    },

    /**
     * Add an entry with the provided unique id and data
     * to the database.
     *
     * @param id
     * @param data An object containing the properties we want
     *              to add to the row.
     * @returns {*}
     */
    addEntry(id, data) {
        const queryString = buildInsertQuery(id, data);
        return connectToDB()
            .then(performQuery(queryString));
    },

    /**
     * Return the entry that has this unique id
     *
     * @param id
     * @returns {*}
     */
    getEntry(id) {
        const query = squel.select()
            .from(ENTRY_TABLE)
            .where('id = ' + id);
        return connectToDB()
            .then(performQuery(query))
            .then(selectFirstRow);
    }
};
