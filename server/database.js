/**
 * Helper interface to access our database.
 */

const pg = require('pg');

const squel = require('squel');

pg.defaults.ssl = true;

const ENTRY_TABLE = 'entry_table';

const entryColumns = [
    'date',
    'time',
    'content'
];

const {DATABASE_URL} = process.env;

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

function performQuery(query) {
    const queryString = query.toString();
    console.log('Setting up to perform query ' + queryString);
    return function({client, done}) {
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

function selectRows(result) {
    return Promise.resolve(result.rows);
}

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
    getAllEntries() {
        const query = squel.select()
            .from(ENTRY_TABLE)
            .order('date');
        return connectToDB()
            .then(performQuery(query))
            .then(selectRows);
    },

    addEntry(id, data) {
        const queryString = buildInsertQuery(id, data);
        return connectToDB()
            .then(performQuery(queryString));
    },

    getEntry(id) {
        const query = squel.select()
            .from(ENTRY_TABLE)
            .where('id = ' + id);
        return connectToDB()
            .then(performQuery(query))
            .then(selectRows);
    }
};
