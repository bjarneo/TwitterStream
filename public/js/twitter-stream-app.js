'use strict';

var TwitterStreamItem = React.createClass({
    render: function() {
        var tweetNodes = this.props.data.map(function(tweet) {
            var userColor = {
                background: '#' + tweet.user.backgroundColor
            }, userUrl = 'http://www.twitter.com/' + tweet.user.screenName;

            return (
                <div className="media msg">
                    <span className="userColor" style={userColor}></span>
                    <div className="media-body">
                        <a className="pull-left user-image" href="#">
                            <img className="media-object" src={tweet.user.profileImage} />
                        </a>
                        <small className="pull-right time">
                            <i className="glyphicon glyphicon-time"></i> {tweet.createdAt}
                        </small>
                        <h3 className="media-heading">
                            {tweet.user.name} ~<span className="userName"><a href={userUrl}>{tweet.user.screenName}</a></span>
                        </h3>
                        <p className="col-lg-10">{tweet.text}</p>
                    </div>
                </div>
            );
        });

        return (
            <div className="twitter-item">{tweetNodes}</div>
        );
    }
});

var TwitterStreamList = React.createClass({
    render: function() {
        return (
            <div className="twitter-list message-wrap col-lg-12">
                <TwitterStreamItem data={this.props.data}></TwitterStreamItem>
            </div>
        );
    }
});

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

React.render(<TwitterStreamApp />, document.getElementById('TwitterStreamWrapper'));
