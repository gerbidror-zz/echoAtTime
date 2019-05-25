'use strict';

const priorityQueue = require('./../redis/priority_queue');

async function processNextChunk() {
 
  const messages = await priorityQueue.dequeue();
  
  for (let i = 0; i < messages.length; i++) {
    console.log('echo next message ' + messages[i]);    
  }
}

async function insertMessage(message, time) {
  await priorityQueue.enqueue(message, time);
}

module.exports = {
  processNextChunk: processNextChunk,
  insertMessage: insertMessage
}