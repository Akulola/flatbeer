// Code here
//Defining the server URL
let pathURL = `http://localhost:3000/beers`

fetchOneBeer();
// Function that will fetch the first item from the server
function fetchOneBeer(index = 1) {
    fetch(`${pathURL}/${index}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {console.log(data);
        const beerName = document.getElementById("beer-name")
        beerName.textContent = data.name;
        beerName.dataset.id = data.id;
        document.getElementById("beer-image").src = data.image_url
        document.getElementById("beer-description").textContent = data.description  
        //this fetches beer reviews from the server;
        const reviews = data.reviews;
        
        const reviewList = document.getElementById("review-list");
         reviewList.innerHTML = "";   
        for (const review of reviews) {
        const listItem = document.createElement("li");
        listItem.textContent = review;
        reviewList.appendChild(listItem);
        console.log(reviews)
    }
    });
    };
// Function that will fetch all beers from the server and serve them in a list
fetchAllBeers();
function fetchAllBeers() {
    fetch(`${pathURL}`)
   .then((response) => {
    return response.json();
   })
   .then((data) => {
        const listBeers = document.getElementById("beer-list");
        listBeers.innerHTML = "";
        data.forEach(element => {
            const listItem = document.createElement("li");
            listItem.textContent = element.name;
            listBeers.appendChild(listItem);
        });
   });
}
