'use strict';

const redis = require('./redis');
const uuidv4 = require('uuid/v4');
const lockKeyPrefix = 'lock:';

// add lua_unlock function to redis instance, this add must be on general redis.instance
redis.instance.defineCommand('lua_unlock', {
  numberOfKeys: 1,
  lua: `if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del",KEYS[1])
        else
           return 0
        end`
});

class RedisLock {
  constructor () {
    this.lockPrefix = "lock";
    this.lockExpiration = 5000;
    this.uuid = uuidv4();
  }
  
  async withLock(key, unsafeCodeFunc) {
    const lockKey = lockKeyPrefix + key;
    
    // set redis key only if not defined
    const result = await redis.instance.set(lockKey, this.uuid, 'PX', this.lockExpiration, 'NX')
    .then(() => {
      // handle unsafe code
      return unsafeCodeFunc();
      })
    .finally(() => {
        // unlock, no matter if we had error or not
         redis.instance.lua_unlock(lockKey, this.uuid);
      })
    .then((data) => {
      return new Promise(function(resolve) {
       return resolve(data);
      });
    })
    .catch((error) => {throw error;});
    
    return result;
  }
}

module.exports = {
  RedisLock: RedisLock
};
