//Utilizing packages for Node.js
var Twitter = require("twitter");
var spotify = require("spotify");
// var request = require("require");

//TWITTER API
	//Grabbing API token keys from other JS file for Twitter package
	var keys = require("./keys.js").twitterKeys;

	//Passing the keys to the Twitter API
	var tweets = new Twitter(keys);


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
	var title = process.argv[3];

	spotify.search({type:'track', query: title}, function(error, music){
		if(error){
			console.log(error);
		} else {
			
		};
	});

};