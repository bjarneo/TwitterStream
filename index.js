'use strict';

// Install JSX support so we can require React components
require('node-jsx').install();

var fs = require('fs'),
    http = require('http'),
    express = require('express'),
    socketIO = require('socket.io'),
    path = require('path'),
    React = require('react'),
    StreamApp = require('./src/components/stream-app'),
    TweetStream = require('node-tweet-stream'),
    transformTweet = require('./src/tweet-transform'),
    config = require('./config.js');

var port = process.env.PORT || 3000,
    app = express(),
    server = http.Server(app),
    io = socketIO(server),
    twitter = new TweetStream(config.auth),
    tweetHistory = [],
    indexPath = path.join(__dirname, 'public', 'index.html'),
    indexHtml = fs.readFileSync(indexPath, { encoding: 'utf8' });

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
    tweetHistory.unshift(tweet);
    while (tweetHistory.length >= config.history.maxItems) {
        tweetHistory.pop();
    }
});

app.get('/', function(req, res) {
    var rendered = React.renderToString(
        React.createElement(StreamApp, {
            initialTweets: tweetHistory
        })
    );

    var html = (indexHtml
        .replace(/<!-- RenderTarget -->/, rendered)
        .replace(/'<!-- initialData  -->'/, JSON.stringify({
            tweets: tweetHistory
        }))
    );

    res.set('Content-Type', 'text/html');
    res.send(html);
});

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('http server listening on *:' + port);
});
