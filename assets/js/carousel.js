// Ensure that all the URLs and APIs load ONCE THE REST OF THE HTML IS READY
$(document).ready(function () {

  // Define the URLs for fetching movie data from The Movie Database (TMDb)
  var nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=b959be3036efe07cdd94c9fb04a40299';
  var upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=b959be3036efe07cdd94c9fb04a40299';
  var topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=b959be3036efe07cdd94c9fb04a40299';

  // Define arrays to store the IDs of image elements in different carousels
  var caraImageEls = [['movie-carousel-1-1', 'movie-carousel-1-2', 'movie-carousel-1-3']];
  var caraImageEls2 = [['movie-carousel-2-1', 'movie-carousel-2-2', 'movie-carousel-2-3']];
  var caraImageEls3 = [['movie-carousel-3-1', 'movie-carousel-3-2', 'movie-carousel-3-3']];

  // Fetch movie data for the "Now Playing" carousel
  fetch(nowPlayingUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Iterate through the results array to get movie information for the first carousel
      for (let j = 0; j < caraImageEls[0].length; j++) {
        var movieIndex = Math.floor(Math.random() * data.results.length);
        var posterPath = data.results[movieIndex].poster_path;

        if (posterPath) {
          var fullPosterPath = 'https://image.tmdb.org/t/p/original' + posterPath;

          // Update the source of each image for the first carousel
          $('#' + caraImageEls[0][j]).attr('src', fullPosterPath);
        } else {
          console.warn('Poster path is null or undefined for element', caraImageEls[0][j]);
        }
      }
    });

  // Fetch movie data for the "Upcoming" and "Now Playing" carousels
  for (let i = 0; i < caraImageEls2.length; i++) {
    $.ajax({
      url: upcomingUrl,
      method: 'GET',
    }).then(function (response) {
      console.log(response);

      // Iterate through the results array to get movie information for the other carousels
      for (let j = 0; j < caraImageEls2[i].length; j++) {
        var movieIndex = Math.floor(Math.random() * response.results.length);
        var posterPath = response.results[movieIndex].poster_path;

        if (posterPath) {
          var fullPosterPath = 'https://image.tmdb.org/t/p/original' + posterPath;

          // Update the source of each image for the other carousels
          $('#' + caraImageEls2[i][j]).attr('src', fullPosterPath);
        } else {
          console.warn('Poster path is null or undefined for element', caraImageEls2[i][j]);
        }
      }
    });
  }

  // Fetch movie data for the "Top Rated" carousel
  fetch(topRatedUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Iterate through the results array to get movie information for the third carousel
      for (let j = 0; j < caraImageEls3[0].length; j++) {
        var movieIndex = Math.floor(Math.random() * data.results.length);
        var posterPath = data.results[movieIndex].poster_path;

        if (posterPath) {
          var fullPosterPath = 'https://image.tmdb.org/t/p/original' + posterPath;

          // Update the source of each image for the third carousel
          $('#' + caraImageEls3[0][j]).attr('src', fullPosterPath);
        } else {
          console.warn('Poster path is null or undefined for element', caraImageEls3[0][j]);
        }
      }
    });
});