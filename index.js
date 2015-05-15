'use strict';

var TweetStream = require('node-tweet-stream'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    transformTweet = require('./src/tweet-transform'),
    config = require('./config.json');

var port = process.env.PORT || 3000,
    app = express(),
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
    socket.emit('item-limit', config.history.maxItems);
    socket.emit('tweets', tweetHistory);
});

twitter.on('tweet', function(tweet) {
    if (tweet.lang !== 'en') {
        return;
    }

    tweet = transformTweet(tweet);
    io.emit('tweets', [tweet]);

    // Add tweet to history and ensure we are within the max items limit
    while (tweetHistory.length >= config.history.maxItems) {
        tweetHistory.shift();
    }

    tweetHistory.push(tweet);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, function() {
    console.log('http server listening on *:' + port);
});
