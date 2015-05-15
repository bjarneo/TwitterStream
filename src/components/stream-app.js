'use strict';

var React = require('react');
var io = require('socket.io-client');
var TwitterStreamList = require('./stream-list');

var TwitterStreamApp = React.createClass({
    getInitialState: function() {
        return {
            tweets: [],
            itemLimit: 1000
        };
    },

    onItemLimitChange: function(limit) {
        this.setState({ itemLimit: limit });
    },

    onTweetReceived: function(tweet) {
        var tweets = this.state.tweets.slice();
        tweets.unshift(tweet);

        while (tweets.length > this.state.itemLimit) {
            tweets.pop();
        }

        this.setState({ tweets: tweets });
    },

    componentDidMount: function() {
        this.socket = io();

        this.socket.on('item-limit', this.onItemLimitChange);
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
