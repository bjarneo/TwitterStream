'use strict';

var React = require('react');
var TwitterStreamApp = require('./components/stream-app');

React.render(
    <TwitterStreamApp />,
    document.getElementById('TwitterStreamWrapper')
);
