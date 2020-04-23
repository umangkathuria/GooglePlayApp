const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container')
const loader = document.getElementById("loader");
const host = "https://server-gplay-app.herokuapp.com";

// const localHost = "http://localhost:3000";
app.appendChild(container);

function loadLandingPage() {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `${host}/getAllApps`, true)

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
            const h = document.createElement('h3');
            h.textContent = "Uh-oh! :("
            const h2 = document.createElement('h3');
            h2.textContent = "Data could not be found. Please try again later."


        }
    }

    request.onerror = function () {

        const app = document.getElementById('root')

        loader.style.display = "none"; // to hide   
        console.log('error')
        const h = document.createElement('h3');
        h.textContent = "Well, this is embarassing. :("
        const h2 = document.createElement('h3');
        h2.textContent = "Looks like our servers are down at the moment. We are working on resolving the issue. Please try again later.";
        app.appendChild(h)
        app.appendChild(h2)
    }
    // Send request
    request.send()

}

function loadDetailPage(appId) {
    window.location.assign(`./app-detail.html?pkg=${appId}`)
}

function getDetails(element) {
    let appId = element.getAttribute("id");
    console.log("Get Details called for ----> ", appId);
    loadDetailPage(appId);
}

loadLandingPage();

function updateData() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    loader.style.display = "block";
    container.style.display = "none";
    var request = new XMLHttpRequest()
    request.open('GET', `${host}/updateData`, true)
    request.onload = function () {
        loader.style.display = "none"
        
        if (request.status >= 200 && request.status < 400) {
            container.style.display = "flex";
            var data = JSON.parse(this.response)
            populateScreen(data);
        } else {
            alert("Could not update data. Reloading with stale data.");
            window.location.assign(`./index.html`)
        }
    }
    request.send();

}

function populateScreen(data) {
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

function showErrorScreen(){
    console.log('error')
    const h = document.createElement('h3');
    h.textContent = "Uh-oh! :("
    const h2 = document.createElement('h3');
    h2.textContent = "Data could not be found. Please try again later."
}