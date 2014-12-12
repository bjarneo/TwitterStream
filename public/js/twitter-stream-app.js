'use strict';

var TwitterStreamItem = React.createClass({
    render: function() {
        var tweetNodes = this.props.data.map(function(tweet) {
            var userColor = {
                background: '#' + tweet.user.backgroundColor
            };

            return (
                <div className="media msg">
                    <span className="userColor" style={userColor}></span>
                    <a className="pull-left user-image" href="#">
                        <img className="media-object" src={tweet.user.profileImage} />
                    </a>
                    <div className="media-body">
                        <small class="pull-right time">
                            <i class="glyphicon glyphicon-time"></i> {tweet.createdAt}
                        </small>
                        <h5 className="media-heading">{tweet.user.name} ~ {tweet.user.screenName}</h5>
                        <p class="col-lg-10">{tweet.text}</p>
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
