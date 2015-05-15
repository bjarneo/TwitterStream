'use strict';

var TweetStream = require('node-tweet-stream'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    config = require('./config.json');

var app = express(),
    server = http.Server(app),
    io = socketIO(server),
    twitter = new TweetStream(config);

// What keywords to track
[
    'JavaSript',
    'node.js',
    'nodejs',
    'python'
].forEach(function(keyword) {
    twitter.track(keyword);
});

twitter.on('tweet', function(tweet) {
    if (tweet.lang !== 'en') {
        return;
    }

    io.emit('tweet', {
        'user': {
            'name': tweet.user.name,
            'screenName': tweet.user.screen_name,
            'backgroundColor': tweet.user.profile_background_color,
            'profileImage': tweet.user.profile_image_url
        },
        'text': tweet.text,
        'createdAt': tweet.created_at
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
