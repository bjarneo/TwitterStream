'use strict';

var React = require('react');
var TwitterStreamItem = require('./stream-item');

var TwitterStreamList = React.createClass({
    render: function() {
        return (
            <div className="twitter-list message-wrap col-lg-12">
                <TwitterStreamItem data={this.props.data}></TwitterStreamItem>
            </div>
        );
    }
});

module.exports = TwitterStreamList;
