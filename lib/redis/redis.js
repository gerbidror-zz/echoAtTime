'use strict';

const redis = require('ioredis');
const redisSettings = require('./../../settings').redis;
const instance = new redis(redisSettings.port, redisSettings.host);

module.exports = {
    instance: instance
};
