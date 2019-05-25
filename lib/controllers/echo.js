'use strict';

const echoQueue = require('./../echo_queue/queue');
const Boom = require('boom')

module.exports = {
  create: (request) => {
    let time = request.payload.time;
    let message = request.payload.message;
    
    try {
      echoQueue.insertMessage(message, time);
    } catch (error) {
      throw Boom.badImplementation('Error while inserting message to queue');
    }
    
    return 'Inserting into queue: Time=' + time + ' message=' + message;
  },
};
