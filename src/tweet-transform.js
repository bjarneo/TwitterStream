'use strict';

module.exports = function(tweet) {
    /* jshint camelcase: false */
    return {
        user: {
            name: tweet.user.name,
            screenName: tweet.user.screen_name,
            backgroundColor: tweet.user.profile_background_color,
            profileImage: tweet.user.profile_image_url
        },
        text: tweet.text,
        createdAt: tweet.created_at
    };
    /* jshint camelcase: true */
};
