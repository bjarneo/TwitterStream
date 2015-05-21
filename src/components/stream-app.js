'use strict';

var React = require('react');
var io = require('socket.io-client');
var TwitterStreamList = require('./stream-list');
var TwitterStreamStats = require('./stream-stats');

var TwitterStreamApp = React.createClass({
    displayName: 'StreamApp',

    propTypes: {
        initialTweets: React.PropTypes.array,
        tweetCount: React.PropTypes.number
    },

    getInitialState: function() {
        return {
            tweets: this.props.initialTweets || [],
            itemLimit: 1000,
            stats: {
                tweetCount: this.props.initialTweets.length || 0
            }
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

        this.setState({
            tweets: tweets,
            stats: {
                tweetCount: this.state.stats.tweetCount + 1
            }
        });
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
            <div>
                <TwitterStreamStats stats={this.state.stats} />
                <TwitterStreamList tweets={this.state.tweets} />
            </div>
        );
    }
});

module.exports = TwitterStreamApp;
