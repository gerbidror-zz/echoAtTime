'use strict';

const redis = require('ioredis');
const redisSettings = require('./../../settings').redis;
let instance = null;

try {
  instance = new redis(redisSettings.port, redisSettings.host);
} catch(error) {
  console.log('error while init redis instance: ' + error);
}

module.exports = {
    instance: instance
};
