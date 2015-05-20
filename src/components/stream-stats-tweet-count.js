'use strict';

var React = require('react');

var TwitterStreamStatsTweetCount = React.createClass({
    displayName: 'StreamStatsTweetCount',

    propTypes: {
        tweetCount: React.PropTypes.number.isRequired,
    },

    /* jshint quotmark:false */
    render: function() {
        return (
            <li role="presentation">
                <span className="glyphicon glyphicon-stats" aria-hidden="true"></span>
                <span className="badge">{this.props.tweetCount}</span>
            </li>
        );
    }
});

module.exports = TwitterStreamStatsTweetCount;
