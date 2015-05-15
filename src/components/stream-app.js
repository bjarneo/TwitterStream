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

    componentDidMount: function() {
        var socket = io();

        socket.on('tweet', function(tweet) {
            var tweets = this.state.tweets.slice();

            tweets.unshift(tweet);

            this.setState({ tweets: tweets });
        }.bind(this));
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
