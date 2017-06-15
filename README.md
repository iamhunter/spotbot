# spotbot
Saves all Spotify tracks posted in a Slack channel to a Spotify playlist 

# setup
1. Set up a Slack bot user in your channel (https://api.slack.com/bot-users)
2. Set up a Spotify application (https://developer.spotify.com/)

  > Getting an authorization from spotify is tricky, but first run this script (inserting your own credentials in the parentheses)
  > https://gist.github.com/iamhunter/bb4f495f2ebf3cbee3c719b01016d616.js
  > Then go to the URL that the script outputs and you will be sent to <yoururl.com>/code=COPY THIS MESS RIGHT HERE&state=notimportant.

  > Save the code that the URL gives you.  You will need to put it in heroku again.

3. Set up a new node dev environment (I like c9.io)
4. Install https://github.com/slackapi/node-slack-sdk and https://github.com/thelinmichael/spotify-web-api-node
3. Clone this repository and replace the slack channel uri and the spotify playlist uri with yours.
4. Deploy to heroku.
5. Add the environment variables to heroku.
6. If you need to restart your application, you will need to get new variables from part 2.
