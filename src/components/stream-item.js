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
            userStyle = { background: '#' + user.backgroundColor },
            userUrl = 'http://www.twitter.com/' + user.screenName;

        return (
            <div className="twitter-item">
                <div className="media msg">
                    <span className="userColor" style={userStyle}></span>
                    <div className="media-body">
                        <a className="pull-left user-image" href="#">
                            <img className="media-object" src={user.profileImage} />
                        </a>

                        <TweetDate date={this.props.createdAt} />

                        <h3 className="media-heading">
                            {user.name} <span className="userName"><a href={userUrl}>@{user.screenName}</a></span>
                        </h3>
                        <p className="col-lg-10">{this.props.text}</p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TwitterStreamItem;
