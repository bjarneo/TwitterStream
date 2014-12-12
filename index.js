'use strict';

var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    config = require('./config.json'),
    twitter = require('node-tweet-stream')(config);

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

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
