'use strict';

const EchoController = require('./controllers/echo.js');
const EchoSchema = require('./schemas/echo.js');

module.exports = [
  {
    method: 'POST',
    path: '/echo',
    handler: EchoController.create,
    config: {
      description: 'Echo message at unix time (if time is lower then current time, process message at the next worker wakes)',
      validate: {
        payload: EchoSchema.create
      }
    }
  }
];
