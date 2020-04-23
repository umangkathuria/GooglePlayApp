/**
 * Require
 */

const logger = require('umang_logger_module');
const MongoClient = require('mongodb').MongoClient;

let db;

function getDbObject() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      db = client.db('apps'); // whatever your database name is
      db.collection('new-android-apps').createIndex({ appId: 1 }, { unique: true });
      resolve(db);
    });
  });
}

module.exports.getDbObject = getDbObject;
