// Selecting elements using jQuery and assigning them to variables
var searchBtnEl = $("#search-btn");
var movieDetailsContainerEl = $("#movie-details-container");
var topratedEl = $(".toprated-movies");

// Document Ready Function: Ensures that the document is fully loaded before executing the code inside
$(document).ready(function () {

  // Function to fetch and display top-rated movies
  function fetchAndDisplayMovies(toprated) {
    // URL for the API request to get the top-rated movies
    var apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=b959be3036efe07cdd94c9fb04a40299`;

    // Make an API request and handle the response
    fetch(apiUrl)
      .then(function (response) {
        // Check if the response status is 404 (Not Found)
        if (response.status === 404) {
          // Handle 404 response by throwing an error
          throw new Error("Movies not found");
        }
        // Parse the JSON response
        return response.json();
      })
      .then(function (data) {
        // Log the API response data
        console.log(data);
        // Check if there are movie results in the response
        if (data.results.length > 0) {
          // Create a container for movies with a class "movies-container"
          var moviesContainer = $('<div>').addClass("movies-container");

          // Loop through the array of movie data in the API response
          data.results.forEach(function (movie) {
            // Create elements for each movie card
            var movieCard = $("<div>").addClass("movie-card");
            var posterBox = $("<div>").addClass("poster-box");
            var image = $("<img>").attr("src", `https://image.tmdb.org/t/p/w200${movie.poster_path}`);
            var detailsBox = $('<div>').addClass("details-box");
            var title = $("<h2>").text(movie.title);
            var description = $("<p>").text(movie.overview);
            var posterLink = $("<a>").attr("href", `movie-details.html?id=${movie.id}`);

            // Create a button to add the movie to the watchlist
            var addToWatchlistBtn = $('<button class="add-to-watchlist-btn">Add to Watchlist</button>');
            addToWatchlistBtn.on("click", function () {
              // Call the addToWatchlist function when the button is clicked
              addToWatchlist(movie);
              // Update button text and style
              this.innerText = "Added to Watchlist";
              this.classList.add("added-to-watchlist");
            });

            // Append elements to the movie card
            movieCard.append(posterBox, detailsBox, addToWatchlistBtn);
            posterBox.append(posterLink);
            posterLink.append(image);
            detailsBox.append(title);

            // Append the movie card to the container
            moviesContainer.append(movieCard);
          });

          // Replace the content of the "Top Rated" element with the movies container
          toprated.html(moviesContainer);
        } else {
          // Handle the case where no movies are found
          toprated.html("No movies found.");
        }
      })
      .catch(function (err) {
        // Log and handle any errors, including 404
        console.log(err.message);
        if (err.message === "Movies not found") {
          // Replace the content of the "Top Rated" element with an error message
          toprated.html("No movies found.");
        } else {
          // Handle other errors
        }
      });
  }

  // Function to add a movie to the watchlist
  function addToWatchlist(movie) {
    // Retrieve the existing watchlist from local storage (if any)
    var watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if the movie is already in the watchlist
    var isMovieInWatchlist = watchlist.some(function (item) {
      return item.id === movie.id;
    });

    // If the movie is not a duplicate, add it to the watchlist
    if (!isMovieInWatchlist) {
      watchlist.push(movie);
      // Update local storage with the updated watchlist
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }

  // Call the fetchAndDisplayMovies function when the page loads, passing the .toprated-movies element
  fetchAndDisplayMovies(topratedEl);
});