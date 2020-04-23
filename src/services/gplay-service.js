const gplay = require('google-play-scraper');

/**
 * Use this method to fetch all the free apps available.
 */
function getAllTopSellingFreeApps() {
  return new Promise((resolve, reject) => {
    gplay.list({
      collection: gplay.collection.TOP_FREE,
      country: 'in',
      num: 100,
    }).then(result => {
      resolve(result);
    })
      .catch((err => {
        reject({
          error: err,
        });
      }));
  });
}

/**
 * Use this method to fetch an application detail using the appID.
 *
 * @param {string} appId Contains the ID for an application for which
 * details are to be fetched.
 * @returns Promise
 */
function getAppById(appId) {
  return new Promise((resolve, reject) => {
    gplay.app({ appId })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// Exports
module.exports.getAllTopSellingFreeApps = getAllTopSellingFreeApps;
module.exports.getAppById = getAppById;
