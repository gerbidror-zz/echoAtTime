# echoAtTime
* This repository accepts messages and echo them to screen.

# Pre conditions
* Redis
* NPM
* NodeJS

# How to install
* npm install

# How to run
* node server.js

# Basic Functionality
## Redis sorted array as message queue
* Enqueue using zadd
* Dequeue using zrange (from 0 to current time in ms) to fetch messages + zrem to remove top messages.

## Redis locks
* We need to lock the queue before altering it in order to have consistent data.
* Lock using set ,with flag nx and px flag to get expiration of 5000 ms for the key (redis.lock.expiration_ms setting).
* Handle unsafe code.
* Unlock using lua script (in order to make sure the locked key we want to delete belongs to use).

# Worker
* Runs every Settings.worker_sleep_ms second (default 1) dequeue top 10 messages (redis.dequeue.max setting) and logs them to output. 

# API
* localhost:3000/echo [POST]
* time [int] - unix time to echo message
* message [string] - message to echo
