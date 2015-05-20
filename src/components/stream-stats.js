'use strict';

var React = require('react');
var TwitterStreamStatsTweetCount = require('./stream-stats-tweet-count');

var TwitterStreamStats = React.createClass({
    displayName: 'StreamStats',

    propTypes: {
        stats: React.PropTypes.shape({
            tweetCount: React.PropTypes.number.isRequired
        })
    },

    /* jshint quotmark:false */
    render: function() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav nav-pills" role="tablist">
                        <TwitterStreamStatsTweetCount tweetCount={this.props.stats.tweetCount} />
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = TwitterStreamStats;
