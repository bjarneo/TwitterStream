'use strict';

var React = require('react');
var moment = require('moment');

var TweetDate = React.createClass({
    displayName: 'TweetDate',

    propTypes: {
        date: React.PropTypes.string.isRequired
    },

    shouldComponentUpdate: function(nextProps) {
        return this.props.date !== nextProps.date;
    },

    /* jshint quotmark:false */
    render: function() {
        var formatted = moment(this.props.date).format('HH:mm:ss');

        return (
            <small className="pull-right time">
                <i className="glyphicon glyphicon-time" /> {formatted}
            </small>
        );
    }
});

module.exports = TweetDate;
