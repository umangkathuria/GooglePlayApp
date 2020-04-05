var gplay = require('google-play-scraper');

  function getAllTopSellingFreeApps(){
    return new Promise((resolve, reject)=>{
      gplay.list({
        collection: gplay.collection.TOP_FREE,
        country: "in",
        num: 100
    }).then((result)=>{
      resolve(result)
       
    }).catch(((err)=>{
      reject({
        error: err
      })
    }))
  })
}


function getAppById(appId){
  return new Promise((resolve, reject)=>{
    gplay.app({appId: appId})
    .then(result => {
      resolve(result)
    })
    .catch((err)=>{
      reject(err)
    })
})
}
module.exports.getAllTopSellingFreeApps = getAllTopSellingFreeApps;
module.exports.getAppById = getAppById;