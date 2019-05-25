'use strict';

const Settings = require('./../../settings');
const echoQueue = require('./../echo_queue/queue');

module.exports = {
  run: function() {
      setInterval(echoQueue.processNextChunk, Settings.worker_sleep_ms);
    }
};
