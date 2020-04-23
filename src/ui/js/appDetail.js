const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const appId = urlParams.get("pkg");

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
const host = "https://server-gplay-app.herokuapp.com";

request.open('GET', `${host}/getAppById?appId=${appId}`, true)

request.onload = function() {
    console.log(this.response);
    var data = JSON.parse(this.response);

    if (data.status >= 200 && data.status < 400) {
        const app = document.getElementById('root')
        const container = document.createElement('div')
        container.setAttribute('class', 'container')
        app.appendChild(container)

        const card = document.createElement('div')
        card.setAttribute('class', 'card-detail')

        const img = document.createElement('img')
        img.setAttribute("class", "icon-detail");
        img.src = data.payload.icon

        // Create an h1 and set the text content to the film's title
        const h1 = document.createElement('h2')
        h1.setAttribute("class", "title-detail");
        h1.textContent = data.payload.title

        // Create a p and set the text content to the app's summary
        const p = document.createElement('p')
        p.setAttribute("class", "summary-deatil");
        p.textContent = `${data.payload.summary}`

        // Create a p and set the text content to the app's description
        const p_desc = document.createElement('p')
        p.setAttribute("class", "summary-detail");
        const boldTag = document.createElement('b')
        boldTag.textContent = "Descripztion"
        p_desc.appendChild(boldTag);

        p_desc.textContent = `${data.payload.description}`

        // Create a p and set the text content to the app's summary
        const p_ss = document.createElement('p')
        p_ss.setAttribute("class", "summary-deatil");
        p_ss.textContent = `Here are a few screenshots from the app..`

        const screenshotDiv = document.createElement('div')


        p_ss.setAttribute("class", "heading");
        p_ss.textContent = `Here are a few screenshots from the app..`
        screenshotDiv.appendChild(p_ss);
        let screenshotsArray = data.payload.screenshots;
        let counter = 0;
        screenshotsArray.forEach(element => {
            if (counter < 5) {
                const img = document.createElement('img');
                img.setAttribute("class", "img-ss");
                img.src = element;
                img.setAttribute("onclick", "enlargeImage(this)");
                // img.onclick = enlargeImage(img);
                screenshotDiv.appendChild(img)
                counter++;
            }
        });

        // Create a p and set the text content to the app's description
        // const review = document.createElement('p')
        // review.setAttribute("class", "heading");
        // review.textContent = "Let's see what people are saying about this application...."
        // const reviewDiv = document.createElement('div')
        // reviewDiv.appendChild(review);

        // let reviewArray = data.payload.comments;
        // counter = 0;
        // reviewArray.forEach(element => {
        //     if (counter < 4) {
        //         const comment = document.createElement('p');
        //         comment.setAttribute("class", "comment");
        //         comment.textContent = `  -- ${element}"`;
        //         reviewDiv.appendChild(comment)
        //         counter++;
        //     }
        // });

        const downloadDiv = document.createElement('div');
        // Create a p and set the text content to the app's description
        const downloadHead = document.createElement('img')

        const url = document.createElement('a')
        url.setAttribute("href", data.payload.url)
        url.setAttribute("class", "downloadImg")
        downloadHead.setAttribute("class", "downloadImg")
        downloadHead.src = ('./img/getitongoogle.png')
        url.appendChild(downloadHead);
        downloadDiv.appendChild(url);

        // Append the cards to the container element
        container.appendChild(card)

        // Each card will contain an h1 and a p
        card.appendChild(img)
        card.appendChild(h1)
        card.appendChild(p)
        card.appendChild(p_desc)
        card.appendChild(screenshotDiv);
        // card.appendChild(reviewDiv);
        card.appendChild(downloadDiv);
    } else {
        const app = document.getElementById('root')
        const h = document.createElement('h3');
        h.textContent = "Uh-oh! :("
        const h2 = document.createElement('h3');
        h2.textContent = "Data for requested Application could not be found. Plase check ID and try agian later."
        app.appendChild(h)
        app.appendChild(h2)
    }

};

function enlargeImage(img){

    modal.style.display = "block";
    modalImg.src = img.src;
    
}

request.send()