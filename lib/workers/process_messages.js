'use strict';

const Settings = require('./../../settings');
const echoQueue = require('./../echo_queue/queue');

async function processNextChunk() {
  try {
    await echoQueue.processNextChunk();
  } catch (error) {
    console.log('error in echoQueue.processNextChunk, error=' + error);
  }
}

module.exports = {
  run: function() {
      setInterval(function() {processNextChunk()}, Settings.worker_sleep_ms);
    }
};
