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

//Event Listener to listen for a submit event
const reviewForm = document.getElementById("review-form");
reviewForm.addEventListener("submit", addReview);

//Function to handle the form submission
function addReview(event) {
    event.preventDefault();
    const reviewInput = document.getElementById("review");
    const reviewText = review.value;
    const reviewList = document.getElementById("review-list");
    const newReview = document.createElement("li");
    newReview.textContent = reviewText;
    reviewList.appendChild(newReview);
    reviewInput.value = "";
  
    // send the new review to the server
     const configObject = {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: reviewText }),  
    }
    fetch(`${pathURL}/1/reviews`, configObject)
    .then((response) => {
        return response.json();
      })
    .then((beer) => console.log(beer))
    .catch((err) => console.error(err))
}
addReview()
