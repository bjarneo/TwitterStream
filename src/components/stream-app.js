'use strict';

var React = require('react');
var io = require('socket.io-client');
var TwitterStreamList = require('./stream-list');

var TwitterStreamApp = React.createClass({
    displayName: 'StreamApp',

    propTypes: {
        initialTweets: React.PropTypes.array
    },

    getInitialState: function() {
        return {
            tweets: this.props.initialTweets || [],
            itemLimit: 1000
        };
    },

    onItemLimitChange: function(limit) {
        this.setState({ itemLimit: limit });
    },

    onTweetsReceived: function(items) {
        var tweets = [].concat(items, this.state.tweets.slice());

        while (tweets.length >= this.state.itemLimit) {
            tweets.pop();
        }

        this.setState({ tweets: tweets });
    },

    componentDidMount: function() {
        this.socket = io();

        this.socket.on('item-limit', this.onItemLimitChange);
        this.socket.on('tweets', this.onTweetsReceived);
    },

    componentWillUnmount: function() {
        this.socket.disconnect();
    },

    /* jshint quotmark:false */
    render: function() {
        return (
            <TwitterStreamList tweets={this.state.tweets} />
        );
    }
});

module.exports = TwitterStreamApp;
