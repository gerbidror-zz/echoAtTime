'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');

const Server = new Hapi.Server({ port: Settings.port });
const Routes = require('./lib/routes');
const ProcessMessagesWorker = require('./lib/workers/process_messages');

ProcessMessagesWorker.run();

Server.route(Routes);
Server.start((err) => {
  Hoek.assert(!err, err);
});
console.log('Server running');
