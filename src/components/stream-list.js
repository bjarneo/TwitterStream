'use strict';

var React = require('react');
var TwitterStreamItem = require('./stream-item');

var TwitterStreamList = React.createClass({
    displayName: 'StreamList',

    propTypes: {
        tweets: React.PropTypes.array.isRequired
    },

    /* jshint quotmark:false */
    render: function() {
        return (
            <div className="twitter-list message-wrap col-lg-12">
                {
                    this.props.tweets.map(function(tweet) {
                        return <TwitterStreamItem key={tweet.id} {...tweet} />;
                    })
                }
            </div>
        );
    }
});

module.exports = TwitterStreamList;
