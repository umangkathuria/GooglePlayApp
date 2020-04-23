let mongoose = require('mongoose');
require('dotenv').config();
const server = "mongodb://admin:password123@ds035683.mlab.com:35683"; // DB SERVER
const database = 'apps'; // DB NAME


class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error', err)
            })
    }
}

module.exports = new Database()