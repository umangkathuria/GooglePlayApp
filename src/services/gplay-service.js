var gplay = require('google-play-scraper');
 
// gplay.list({
//     category: gplay.category.GAME_ACTION,
//     collection: gplay.collection.TOP_FREE,
//     num: 2
//   })
//   .then(console.log, console.log);

  gplay.list({
      collection: gplay.collection.TOP_FREE,
      country: "in",
      num: 10
  }).then((result)=>{
      console.log(typeof(result));
      console.log(result.length);
      for (let index = 0; index < 10; index++) {
          const element = result[index];
              console.log(element);
      }
    //   console.log(result);
  })

