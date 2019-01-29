//Read and set environment variables from the dotenv package
require("dotenv").config();

var request = require('request');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js")
var moment = require('moment');
var fs = require("fs");
var Spotify = new Spotify(keys.spotify);

  var nodeArgv = process.argv;
  var command = process.argv[2];

//Empty variable to place single or multi-length string from argv command
var fullPhrase = ""
// Extract full artist name, song name, or movie title
for (var i=3; i<nodeArgv.length; i++){
    if(i>3 && i<nodeArgv.length){
        fullPhrase = fullPhrase + "+" + nodeArgv[i];
    } else{
        fullPhrase = fullPhrase + nodeArgv[i];
    }
  }


  switch (command) {
    case "concert-this":
       bandsIn(fullPhrase)
       break;
 
    case "spotify-this-song":
       if (fullPhrase) {
          spotifyThis(fullPhrase)
       } else {
          // If no song provided, default to "The Sign" by Ace of Base.
          spotifyThis("Ace of Base")
       }
       break;
 
    case "movie-this":
       if (fullPhrase) {
          omdB(fullPhrase)
       } else {
          omdB("Mr. Nobody")
       }
       break;
 
    case "do-what-it-says":
       doIt();
       break;
 
    default:
       console.log(`Choose one of these search commands followed by a subject, or just do-what-it-says`);
       console.log(`"concert-this", "spotify-this-song", "movie-this"`);
       break;
 };


//Bandsintown function
function bandsIn(artist) {
    var queryUrl = `https://rest.bandsintown.com/artists/"${artist}"/events?app_id=codingbootcamp`;
 
    request(queryUrl, function (err, response, body) {
       // when successfull
       if (!err && response.statusCode === 200) {
          // Parse the body of the site.›
          var result = JSON.parse(body);
 
          console.log(`Upcoming Events:`);
 
          for (let i = 0; i < result.length; i++) {
             var inTown = result[i];
             // Terminal display: name of venue, venue location, date of event:
             console.log(`Name of Venue: ${inTown.venue.name} \nVenue location: ${inTown.venue.city}, ${inTown.venue.region}\nEvent date: ${moment(inTown.datetime).format("MM/DD/YYYY")}`);
             console.log("\n");
 
             // text append
             fs.appendFile('log.txt', `Bandsintown Search \nName of Artist/Band: ${artist} \nName of Venue: ${inTown.venue.name} \nVenue location: ${inTown.venue.city}, ${inTown.venue.region} \nEvent date: ${moment(inTown.datetime).format("MM/DD/YYYY")}\n \n`, function (err) {
                if (err) {
                   console.log(err)
                }
             })
          }
       }
    })
 };


 //Spotify function, calling Artist, 
 function spotifyThis(song) {
    Spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
       if (!err) {
          for (let i = 0; i < data.tracks.items.length; i++) {
             var songData = data.tracks.items[i];
             // Terminal display
             console.log(`Artist: ${songData.artists[0].name}\nSong Name: ${songData.name}\nPreview Song: ${songData.preview_url}\nAlbum: ${songData.album.name}`);
             console.log("\n");
 
             //log.txt append.
             fs.appendFile(`log.txt`, `Spotify Search:\nTrack Requested: ${song}\nArtist: ${songData.artists[0].name}\nSong Name: ${songData.name}\nPreview Song: ${songData.preview_url} \nAlbum: ${songData.album.name} \n \n`, function (err) {
                if (err) {
                   console.log(err)
                }
             })
          }
       } else {
          return console.log('Error');
       }
    })
 };

 //Random.txt execution function, which calls the Spotify function in turn
 function doIt(){
    fs.readFile('random.txt', "utf8", function(err, data){
        if (!err) {
            var randomCommand = data.split(',');
            spotifyThis(randomCommand[1]);
        } else {
        return console.log('Error')
        }
    });
};


// Retrieve movie data from OMDB API.
function omdB(movieTitle) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&plot=short&apikey=trilogy";
 
    request(queryUrl, function (err, response, body) {
       // If the request is successful.
       if (!err && response.statusCode === 200) {
          // Parse the body of the site.
          var body = JSON.parse(body);
          // Terminal display: movie title, year released, imbd rating, rotten tomatoes rating, country of production, language, plot, actors:
          console.log(`"Title: ${body.Title}\nRelease Year: ${body.Year}\nIMBD Rating: ${body.imdbRating}\nRotten Tomatoes Rating: ${body.Ratings.Value}\nProduced in: ${body.Country}\nLanguage: ${body.Language}\nPlot: ${body.Plot}\nActors: ${body.Actors}`);
          console.log("\n");
 
          // Append command data to log.txt file.  
          fs.appendFile(`log.txt`, `OMDB Search \nTitle: ${body.Title} \nRelease Year: ${body.Year} \nIMBD Rating: ${body.imdbRating} \nRotten Tomatoes Rating: ${body.Ratings.Value} \nProduced in: ${body.Country} \nLanguage: ${body.Language} \nPlot: ${body.Plot} \nActors: ${body.Actors} \n \n`, function (err) {
             if (err) {
                console.log(err)
             }
          })
       }
    })
 };