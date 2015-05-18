'use strict';

module.exports = function(tweet) {
    /* jshint camelcase: false */
    return {
        id: tweet.id_str,
        user: {
            name: tweet.user.name,
            screenName: tweet.user.screen_name,
            backgroundColor: tweet.user.profile_background_color,
            profileImage: tweet.user.profile_image_url
        },
        text: tweet.text,
        createdAt: (new Date(tweet.created_at)).toISOString()
    };
    /* jshint camelcase: true */
};
