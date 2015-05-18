TwitterStream
=============

Twitter stream based on Node.js and React.js. Just a React.js test.

Feel free to test the app here: <a href="http://bjarneo.codes:3000/">http://bjarneo.codes:3000/</a>

## Installation

You need to define some auth credentials for twitter to get started. These can either be defined as environment variables (see `config.js`) or in a JSON-file (`config.env.json`). You can get the auth credentials from Twitter: https://apps.twitter.com/.

You also need to build the javascript client bundle by running `npm run build`

### config.env.json

```json
{
    "auth": {
        "consumer_key": "your consumer key",
        "consumer_secret": "your consumer secret",
        "token": "your token",
        "token_secret": "your token secret"
    },

    "keywords": [
        "node.js",
        "javascript",
        "python"
    ],

    "history": {
        "maxItems": 500
    }
}
```

### Usage:

```bash
npm install
npm run build
npm start
```
