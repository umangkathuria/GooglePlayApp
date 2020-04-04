

console.log("JS Loaded");

const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

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
        console.log(app.title)
        console.log(app.appId);
        console.log(app.score);
        console.log(app.price);
        console.log(app.icon);
    //   Create a div with a card class
    const card = document.createElement('div')
        card.setAttribute('class', 'card')

        // Create IMG tag for icon of the 
        const img = document.createElement('img') 
        img.setAttribute("class", "imgClass");
        img.src = app.icon
        // Create an h1 and set the text content to the film's title
        const h1 = document.createElement('h2')
        h1.textContent = app.title

        // Create a p and set the text content to the film's summary
        const p = document.createElement('p')
        // app.summary = app.summary.substring(0, 300) // Limit to 300 chars
        p.textContent = `${app.summary}...` // End with an ellipses

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