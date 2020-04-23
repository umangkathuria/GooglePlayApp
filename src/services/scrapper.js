/* eslint-disable no-plusplus */
const axios = require('axios');
const cheerio = require('cheerio');

let count = 1;
const baseUrl = 'https://play.google.com';
const url = `${baseUrl}/store/apps/collection/topselling_free`;

const apps = [];
let app = {};

function crawl() {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data);

        $('div').each((i, div) => {
          const classAtt = div.attribs.class;
          if (classAtt === 'Vpfmgd') {
            const imageChild = div.children[0];
            const textChild = div.children[1];

            // Extracting Image URL
            const imageSrc = imageChild.children[0].children[0].children[0].attribs['data-src'];
            app.icon = imageSrc;
            count = count + 1;

            // Extacting ID
            const idHref = textChild.children[0].children[0].attribs.href;
            app.appId = idHref.split('=')[1];

            // Extracting Title and Description

            const child = textChild.children[0].children[1].children[0].children[0].children[0];
            app.title = child.children[0].children[0].children[0].attribs.title;
            app.summary = child.children[2].children[0].children[0].data;

            // Adding GooglePlay Link to the object
            app.url = baseUrl + idHref;

            apps.push(app);
            app = {};
          }
        });

        return getDetails(apps);
      })
      .then(appsUpdated => {
        resolve(appsUpdated);
      })
      .catch(err => {
        reject(err);
        console.log('Error->', err);
      });
  });
}


function getDetails(apps) {
  console.log('INSDE getDetails');
  const promises = [];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < apps.length; index++) {
      promises.push(axios.get(apps[index].url));
    }
    Promise.all(promises)
      .then(values => {
        let index = 0;
        // console.log("Values-- ", values);
        values.forEach(result => {
          // Loading HTML Page
          const $ = cheerio.load(result.data);

          // Extracting description
          const description = $('meta').filter(function() {
            // this === el
            return $(this).attr('name') === 'description';
          })
            .attr('content');
          apps[index].description = description;


          // Extracting screenshots
          const screenshots = [];
          $('img').filter(function() {
            return $(this).attr('alt') === 'Screenshot Image';
          })
            .each((i, element) => {
              if (element.attribs.src && (element.attribs.src.includes('https://lh3.googleusercontent.com'))) {
                screenshots.push(element.attribs.src);
              } else {
                const ss = element.attribs['data-srcset'].split(' ');
                screenshots.push(ss[0]);
              }
            });
          apps[index].screenshots = screenshots;

          // Extracting Comments
          // let reviews = [];
          // let revs = $('span').filter(function(i, el) {
          //         return $(this).attr('jsname') === 'fbQN7e';
          //     })
          //     // .each((i, element) => {
          //     //     console.log("ELEMENT - ", element);
          //     //     console.log(element.data);
          //     //     reviews.push(element.data);
          //     // });

          // // console.log("RE")
          // console.log("Reviewssssss   ", revs.contents());
          index++;
        });

        resolve(apps);
      })
      .catch(err => {
        console.log('ERROR OCCURED -- ', err);
        reject(err);
      });
  });
}

module.exports.crawl = crawl;
