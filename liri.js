//Utilizing packages for Node.js
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

//TWITTER API
	//Grabbing API token keys from other JS file for Twitter package
	var keys = require("./keys.js").twitterKeys;

	//Passing the keys to the Twitter API
	var tweets = new Twitter(keys);


//Handling possible user inputs
var command = process.argv[2].toLowerCase();
doIt(command);

function doIt(command, title){
	switch(command){
	case "my-tweets":
		myFavTweets();
		break;
	case "spotify-this-song":
		spotifySong(title);
		break;
	case "movie-this":
		findMovie(title);
		break;
	case "do-what-it-says":
		readFS();
		break;
	default:
		console.log("Oops - not a validated command. Try again!\n\n" + "Options are: \n\n my-tweets\n spotify-this-song\n movie-this\n do-what-it-says");
	};
};


//Grab Tweets
function myFavTweets(){
	tweets.get('favorites/list', function(error, tweets, response) {
		if(error){
			console.log(error);
	  	} else {
	  		var availTweets;

	  		//Determine number of tweets returned
	  		if (tweets.length < 20){
				availTweets = tweets.length
	  		} else {
	  			availTweets = 20	
	  		};

	  	  	for (var i = 0; i < availTweets; i++){
	  	  		console.log('\n' + tweets[i].created_at);
	  	  		console.log(tweets[i].text + '\n');
	  	  	};
		 }; 
	});
};

//Grab Spotify information
function spotifySong(title){
	var title = processInput(title);

	if (title != undefined){
		spotify.search({type:'track', query: title}, function(error, music){
			if(error){
				console.log(error);
				return;
			} else {
				var artist = music.tracks.items[0].artists[0].name;
				var album = music.tracks.items[0].album.name;
				var preview = music.tracks.items[0].preview_url;
				var songName = music.tracks.items[0].name;

				console.log("\nSong: " + songName);
				console.log("Artist: " + artist);
				console.log("Album: " + album);
				console.log("\nPreview song here: \n" + preview);
			};
		});
	};
};

//Grabbing a movie title
function findMovie(title){
	var title = processInput(title);

	if(title != undefined){
		var formattedTitle = title.replace(" ", "+");	
		var query = "http://www.omdbapi.com/?t=" + formattedTitle;

		request(query, function (error, response, body) {
			if(error){
				console.log(error);
			} else{
				var movieTitle = JSON.parse(body).Title;
				var year = JSON.parse(body).Year;
				var imdbRating = JSON.parse(body).Ratings[0].Value;
				var country = JSON.parse(body).Country;
				var language = JSON.parse(body).Language;
				var plot = JSON.parse(body).Plot;
				var actors = JSON.parse(body).Actors;
				var rottenRating = JSON.parse(body).Ratings[1].Value;
				var rottenURL = "blah";

				console.log("\nMovie Title: " + movieTitle);
				console.log("Year Released: " + year);
				console.log("Country Filmed: " + country);
				console.log("Languages Released In: " + language);
				console.log("Actors: " + actors);
				console.log("\nPlot: " + plot);
				console.log("\nIMDB Rating: " + imdbRating);
				console.log("Rotten Tomatoes Rating: " + rottenRating);
				console.log("Rotten Tomatoes URL: " + rottenURL);
			};
		});
	};
};

function readFS(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if (error){
			console.log(error);
		} else {
			var randomArr = data.split(",");
			var command = randomArr[0].trim();
			var title = randomArr[1].trim();
			
			doIt(command, title);
		};
	});
};

function processInput(title){
	if(title != undefined){
		return title;
	} else {
	
		if(process.argv.length > 4){
			console.log("\nOops - try to provide the title in one string, please!");
			return;
		};
		var title;

		if (process.argv[3] === "" || process.argv[3] === undefined){
			if(command === "spotify-this-song"){
				title = "the sign";
				return title;
			} else if(command === "movie-this"){
				title = "mr nobody";
				return title;
			} else {
				return;
			};
		
		} else {
			title = process.argv[3].toLowerCase();
			return title;
		};
	};
			
	
};