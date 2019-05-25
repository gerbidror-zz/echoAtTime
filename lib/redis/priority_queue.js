'use strict';

const redis = require('./redis');
const uuidv4 = require('uuid/v4');
const lock = require('./lock');

const redisInstance = redis.instance;
const queueName = 'priority_queue';
const redisKey = 'priority_queue_key';
const maxToDequeue = 10;
const redisLock = new lock.RedisLock();
  
async function enqueue(value, unixTime) {
  const data = {
    'value': value,
    'uuid': uuidv4()
  };
  
  // this function is inline so it may use unixTime + data and still have no params
  const enqeueUnsafe = async function() {
    // add new value with uuid, we need UUID in order to support inserting the same value more then once
    const result = await redisInstance.zadd(queueName, unixTime, JSON.stringify(data))
          .then((result) => {
            return result; 
          })
          .catch((error) => {
            throw error;
          });
    return result;      
  };
  
  return await redisLock.withLock(redisKey, enqeueUnsafe);
}

async function dequeueUnsafe() {
  const unixTimeNow = Math.floor(new Date() / 1000);
  const result = await redisInstance.zrange(queueName, 0, unixTimeNow)
  .then((result) => {     
    let len = result.length;
    if (len > 0) {
      len = Math.min(len, maxToDequeue);
    }
    let filteredMessages = result.slice(0, len);
    return filteredMessages;
  })
  .catch((error) => {
    throw error;
  });
   
  // if we have no items to delete
  if (result.length == 0 ) {
    return [];
  }
   
  await redisInstance.zrem(queueName, ...result);
  return result;
}
  
async function dequeue() {
 
 const result = await redisLock.withLock(redisKey, dequeueUnsafe)
                      .catch((error) => {throw error;});

// filter out only values, without the uuid
let values = [];
  for (let i = 0; i < result.length; i++) {
    // data is in format: {"value" : value, "uuid": uuid} 
    let obj = JSON.parse(result[i]);
    values.push(obj.value);
  }
  
 return values;
}

module.exports = {
  dequeue: dequeue,
  enqueue: enqueue
};
