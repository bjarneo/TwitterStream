'use strict';

var React = require('react');
var TweetDate = require('./tweet-date');

var TwitterStreamItem = React.createClass({
    displayName: 'StreamItem',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        user: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            screenName: React.PropTypes.string.isRequired,
            backgroundColor: React.PropTypes.string.isRequired,
            profileImage: React.PropTypes.string.isRequired
        })
    },

    shouldComponentUpdate: function(nextProps) {
        return this.props.id !== nextProps.id;
    },

    /* jshint quotmark:false */
    render: function() {
        var user = this.props.user,
            userStyle = { borderColor: '#' + user.backgroundColor },
            userUrl = 'http://www.twitter.com/' + user.screenName;

        return (
            <li style={userStyle}>
                <a className="pull-left user-image" href="#">
                    <img className="media-object" src={user.profileImage} />
                </a>

                <TweetDate date={this.props.createdAt} />

                <h3 className="media-heading">
                    <span className="user-real-name">
                        {user.name}&nbsp;
                    </span>

                    <a href={userUrl} className="user-screen-name">
                        @{user.screenName}
                    </a>
                </h3>

                <p className="col-lg-10">{this.props.text}</p>
            </li>
        );
    }
});

module.exports = TwitterStreamItem;
