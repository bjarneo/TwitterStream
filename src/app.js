'use strict';

var React = require('react');
var TwitterStreamApp = require('./components/stream-app');
var initialTweets = window.initialData && window.initialData.tweets;

React.render(
    <TwitterStreamApp initialTweets={initialTweets} />,
    document.getElementById('TwitterStreamWrapper')
);
