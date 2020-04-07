
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
console.log("App- ", app, typeof (app));
const container = document.createElement('div')
console.log("Container", container, typeof (container));
container.setAttribute('class', 'container')
const loader = document.getElementById("loader");

app.appendChild(container);

function loadLandingPage() {

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', "https://server-gplay-app.herokuapp.com/getAllApps", true)

  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    loader.style.display = "none"; // to hide    
    if (request.status >= 200 && request.status < 400) {
      let apps = data.payload;
      if (apps.length == 0) {
        const h = document.createElement('h3');
        h.textContent = "Uh-oh! :("
        const h2 = document.createElement('h3');
        h2.textContent = "No Applications are currently present in database. Please click the Update button to fetch new data."
        
        // Append the cards to the container element
        container.appendChild(h)
        container.appendChild(h2)
      } else {
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
          p.textContent = `${app.summary}` // End with an ellipses

          // Append the cards to the container element
          container.appendChild(card)

          // Each card will contain an h1 and a p
          card.appendChild(img)
          card.appendChild(h1)
          card.appendChild(p)

        })
      }

    } else {
      console.log('error')
    }
  }

  // Send request
  request.send()

}

function loadDetailPage(appId) {
  window.location.assign(`./app-detail.html?pkg=${appId}`)
}

function getDetails(element) {
  let appId = element.getAttribute("id");
  console.log("GEt Details called for ----> ", appId);
  loadDetailPage(appId);
}

loadLandingPage();

function updateData() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()
  request.open('GET', "https://server-gplay-app.herokuapp.com/updateData", true)
  request.onload = function () {

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      alert("Data has been updated. Updating the application data below.");
    } else {
      alert("Could not update data. Plesae try again later.");
    }
    window.location.assign(`./landing-page.html`)
    //2. On 200 Success, load the landing page..
    // loadLandingPage();
  }
  request.send();

}