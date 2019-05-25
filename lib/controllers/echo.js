'use strict';

const echoQueue = require('./../echo_queue/queue');

module.exports = {
  create: (request) => {
    let time = request.payload.time;
    let message = request.payload.message;
    
    echoQueue.insertMessage(message, time);
    
    return 'Inserting into queue: Time=' + time + ' message=' + message;
  },
};
