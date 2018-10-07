// server.js
'use strict';

require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  helmet = require('helmet'),
  axios = require('axios'),
  Twitter = require('twitter');

/* APP */
const app = express();
const port = process.env.PORT || 3001;
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* BLOOM */

app.post('/verifyBloom', (req, res) => {
  const data = req.body.data;
  for (var vD in data) {
    if (vD.target.type == 'full-name') {
      res.send(vD.target.data);
    }
  }
  res.status(400).end();
});

/* TWITTER */
const twitterKey = encodeURI(process.env.TWITTER_KEY);
const twitterSecret = encodeURI(process.env.TWITTER_SECRET);
const token = twitterKey + ':' + twitterSecret;
const buf = Buffer.from(token);
const token64 = buf.toString('base64');

async function getTwitterBearerToken() {
  const twitterBearerToken = await axios.post(
    'https://api.twitter.com/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${token64}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
  );
  return twitterBearerToken.data.access_token;
}

async function getTweet(url, twitterBearerToken) {
  const tweet = await axios.get(url, {
    headers: {
      Authorization: `Basic ${twitterBearerToken}`
    }
  });
  return JSON.parse(tweet).text;
}

/* ROUTES */
app.post('/verifyTweet', (req, res) => {
  const url = req.body.url;
  const urlParts = url.split('/');
  const statusId = urlParts[urlParts.length - 1];
  const base = 'https://api.twitter.com/1.1/statuses/show.json?id=';
  getTwitterBearerToken().then(twitterBearerToken => {
    const twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      bearer_token: twitterBearerToken
    });
    twitterClient.get('statuses/show/' + statusId, (err, tweet, response) => {
      let data = tweet.text;
      data = data.split(' ');
      res.send(data[0]);
    });

    // getTweet(base + statusId, twitterBearerToken).then(signature => {
    //   res.send(signature);
    // });
  });
});

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log('Server running on port:', port);
});

module.exports = server;
