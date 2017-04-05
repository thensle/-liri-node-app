//Utilizing packages for Node.js
var Twitter = require("twitter");
var spotify = require("spotify");
// var request = require("require");

//TWITTER API
	//Grabbing API token keys from other JS file for Twitter package
	var keys = require("./keys.js").twitterKeys;

	//Passing the keys to the Twitter API
	var tweets = new Twitter(keys);

//Possible user inputs
var command = process.argv[2].toLowerCase();

switch(command){
	case "my-tweets":
		myFavTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		findMovie();
		break;
	case "do-what-it-says":
		readFS();
		break;
	default:
		console.log("Oops - not a validated command. Try again!\n\n" + "Options are: \n\n my-tweets\n spotify-this-song\n movie-this\n do-what-it-says");
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
function spotifySong(){
	if(process.argv.length > 4){
		console.log(process.argv.length);
		console.log("Provide the song in one string, please!");
		return;
	};

	var title = process.argv[3].toLowerCase();

	spotify.search({type:'track', query: title}, function(error, music){
		if(error){
			console.log(error);
		} else {
			console.log(music);
		};
	});

};

function findMovie(){console.log("Yay!");};

function readFS(){console.log("Yay!");};