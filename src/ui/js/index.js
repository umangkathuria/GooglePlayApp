
// function loadPage(){
//   let currentUrl = window.location.href;
//   if(currentUrl.includes("appDetails")){
//     console.log("app Detail will load......")
//     const queryString = window.location.search;
//     console.log(queryString);
//     if(queryString != ""){
//     const urlParams = new URLSearchParams(queryString);
//     const appId = urlParams.get("appId");
//     loadDetailPage(appId);
//     }else{
//       alert("The package name is missing. This page will now redirect to home page.");
//       loadLandingPage();
//     }
//   }else{
//     loadLandingPage();
//   }
// }
// loadPage();
console.log('JS Loaded');
const app = document.getElementById('root')
console.log("App- ", app, typeof(app));
const container = document.createElement('div')
console.log("Container", container, typeof(container));
container.setAttribute('class', 'container')

app.appendChild(container);

function loadLandingPage(){



// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "http://localhost:3000/getAllApps", true)

request.onload = function() {
  
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
      console.log("ALL Apps- ", data.payload);
      data.payload.forEach(app => {

    //   Create a div with a card class
    const card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('onClick', 'onClick=getDetails(this)');
        card.setAttribute('id', app.appId);

        // Create IMG tag for icon of the 
        const img = document.createElement('img') 
        img.setAttribute("class", "icon");
        img.src = app.icon

        // Create an h1 and set the text content to the film's title
        const h1 = document.createElement('h2')
        h1.setAttribute("class", "title");
        h1.textContent = app.title

        // Create a p and set the text content to the film's summary
        const p = document.createElement('p')
        p.setAttribute("class", "summary");

        // app.summary = app.summary.substring(0, 300) // Limit to 300 chars
        p.textContent = `${app.summary}` // End with an ellipses


        
        // Append the cards to the container element
        container.appendChild(card)

        // Each card will contain an h1 and a p
        card.appendChild(img)
        card.appendChild(h1)
        card.appendChild(p)
        
        })
  } else {
    console.log('error')
  }
}

// Send request
request.send()

}

function loadDetailPage(appId){
  window.location.replace(`./app-detail.html?pkg=${appId}`)
}

function getDetails(element){
  let appId = element.getAttribute("id");
  console.log("GEt Details called for ----> ", appId);
  loadDetailPage(appId);
}

loadLandingPage();