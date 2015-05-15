'use strict';

var React = require('react');
var io = require('socket.io-client');
var TwitterStreamList = require('./stream-list');

var TwitterStreamApp = React.createClass({
    getInitialState: function() {
        return {
            tweets: []
        };
    },

    onTweetReceived: function(tweet) {
        var tweets = this.state.tweets.slice();
        tweets.unshift(tweet);
        this.setState({ tweets: tweets });
    },

    componentDidMount: function() {
        this.socket = io();

        this.socket.on('tweet', this.onTweetReceived);
    },

    componentWillUnmount: function() {
        this.socket.disconnect();
    },

    render: function() {
        return (
            <div className="TwitterStream">
                <TwitterStreamList data={this.state.tweets}/>
            </div>
        );
    }
});

module.exports = TwitterStreamApp;
