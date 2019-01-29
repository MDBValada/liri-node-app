# liri-node-app
LIRI will search Spotify for for songs, Bands in Town for concerts, and OMDB for movies. Liri is a Language Interpretation and Recognition Interface, a command line node app that takes in parameters and returns requested data.

To run this application on your own machine, you will need to acquire a unique Spotify id and secret from their API, and create a .env file in the app folder root with 

# Spotify API keys

SPOTIFY_ID=your_id_here
SPOTIFY_SECRET=your_secret_here



the commands :
#* node liri.js concert-this <Artist name/Band name>
will return 
** Name of the venue
** Venue location
**Date of the Event (use moment to format this as "MM/DD/YYYY")
from the Bandsincamp api

#* node liri.js spotify-this-song <Song title>
will return 
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")
from the Bandsincamp api

#* node liri.js movie-this <Movie title name>
will return
 * Title of the movie.
 * Year the movie came out.
 * IMDB Rating of the movie.
 * Rotten Tomatoes Rating of the movie.
 * Country where the movie was produced.
 * Language of the movie.
 * Plot of the movie.
 * Actors in the movie.

#* node liri.js do-what-it-says
will return
* A surprise?

![Inventory Table](/readme_images/readme1.jpg)


NPM Packages:
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Request](https://www.npmjs.com/package/request)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)

* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [OMDB API](http://www.omdbapi.com)