'use strict';

var fs = require('fs');
var path = require('path');
var merge = require('lodash.merge');
var envConfig = {};

try {
    var config = fs.readFileSync(path.join(__dirname, 'config.env.json'));
    envConfig = JSON.parse(config);
} catch (e) {
    envConfig = {};
}

module.exports = merge({}, envConfig, {
    auth: {
        'consumer_key': process.env.CONSUMER_KEY,
        'consumer_secret': process.env.CONSUMER_SECRET,
        'token_secret': process.env.ACCESS_TOKEN_SECRET,
        'token': process.env.ACCESS_TOKEN,
    },

    keywords: (
        process.env.TWITTER_KEYWORDS ||
        'javascript,node.js,nodejs,python'
    ).split(',').filter(Boolean),

    history: {
        maxItems: process.env.MAX_TWEETS || 500
    }
});
