TwitterStream
=============

Twitter stream based on Node.js and React.js. Just a React.js test.
<br /><br />
Feel free to test the app here: <a href="http://bjarneo.codes:3000/">http://bjarneo.codes:3000/</a>
<br /><br />
## Installation
You need to add a config-file to root folder.
###config.js
```javascript
{
    "consumer_key": "your consumer key",
    "consumer_secret": "your consumer secret",
    "token": "your token",
    "token_secret": "your token secret"
}
```

###Usage:
```bash
npm install
node index.js
```

###Note:
If you are changing the twitter-stream-app.js, remember to precompiled it with react-tools. http://facebook.github.io/react/docs/tooling-integration.html#jsx <br/>
```bash
jsx --watch public/js public/js-prod
```
