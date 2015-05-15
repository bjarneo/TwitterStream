'use strict';

var TweetStream = require('node-tweet-stream'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    transformTweet = require('./src/tweet-transform'),
    config = require('./config.json');

var app = express(),
    server = http.Server(app),
    io = socketIO(server),
    twitter = new TweetStream(config.auth),
    tweetHistory = [];

// Subscribe to configured keywords
config.keywords.forEach(function(keyword) {
    twitter.track(keyword);
});

// Send tweet history to new clients
io.on('connection', function(socket) {
    tweetHistory.forEach(function(tweet) {
        socket.emit('tweet', tweet);
    });
});

twitter.on('tweet', function(tweet) {
    if (tweet.lang !== 'en') {
        return;
    }

    tweet = transformTweet(tweet);
    io.emit('tweet', tweet);

    // Add tweet to history and ensure we are within the max items limit
    if (tweetHistory.length > config.history.maxItems) {
        tweetHistory.shift();
    }

    tweetHistory.push(tweet);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
