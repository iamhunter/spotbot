var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : process.env.REDIRECT_URI
});


var authorizationCode = process.env.SPOTIFY_AUTHORIZATION_CODE;

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */

// When our access token will expire
var tokenExpirationEpoch;

// First retrieve an access token
spotifyApi.authorizationCodeGrant(authorizationCode)
  .then(function(data) {

    // Set the access token and refresh token
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    // Save the amount of seconds until the access token expired
    tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
    console.log('Retrieved token. It expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
  }, function(err) {
    console.log('Something went wrong when retrieving the access token!', err.message);
  });

// Continually print out the time left until the token expires..
var numberOfTimesUpdated = 0;

setInterval(function() {
  console.log('Time left: ' + Math.floor((tokenExpirationEpoch - new Date().getTime() / 1000)) + ' seconds left!');

  // OK, we need to refresh the token. Stop printing and refresh.
  if (++numberOfTimesUpdated > 200) {
    numberOfTimesUpdated = 0;

    // Refresh token and print the new time to expiration.
    spotifyApi.refreshAccessToken()
      .then(function(data) {
        tokenExpirationEpoch = (new Date().getTime() / 1000) + data.body['expires_in'];
        console.log('Refreshed token. It now expires in ' + Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
      }, function(err) {
        console.log('Could not refresh the token!', err.message);
      });
  }
}, 1000);

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bot_token = process.env.SLACK_BOT_TOKEN;

var rtm = new RtmClient(bot_token);
rtm.start();

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    if(message.channel === "C2A4ZS1T7" && message.text != null)
    {
        console.log("Message posted in correct channel");
        var splitText = message.text.split('/');
        for(var i = 0; i < splitText.length; i++)
        {
            if(splitText[i] === "track")
            {
                var trackURI = splitText[i+1].substring(0,22);
                //rtm.sendMessage("Hello <@" + message.user + ">! Your track is " + trackURI, message.channel);
                spotifyApi.addTracksToPlaylist('1219537564', '12BtcvGyfX0ieTKsSvyNe2', ["spotify:track:" + trackURI])
                    .then(function(data) {
                        console.log('Added tracks to playlist!');
                    }, function(err) {
                        console.log('Something went wrong!', err);
                    });
            }
        }
    }
    if(message.channel === "C2A4ZS1T7" && message.text != null)
    {
        var splitText = message.text.split(' ');
        
        for(var i = 0; i < splitText.length; i++)
        {
            if(splitText[i].toUpperCase() === "SPOTBOT")
            {
                rtm.sendMessage("Howdy!", message.channel);
                rtm.sendMessage("https://open.spotify.com/user/1219537564/playlist/12BtcvGyfX0ieTKsSvyNe2", message.channel);
                console.log("Someone typed 'spotbot' and i responded!");
                break;
            }
        }
    }
});