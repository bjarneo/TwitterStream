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
    twitter = new TweetStream(config.auth);

// Subscribe to configured keywords
config.keywords.forEach(function(keyword) {
    twitter.track(keyword);
});

twitter.on('tweet', function(tweet) {
    if (tweet.lang !== 'en') {
        return;
    }

    tweet = transformTweet(tweet);
    io.emit('tweet', tweet);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
