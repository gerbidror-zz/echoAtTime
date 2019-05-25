module.exports = {
  port: 3000,
  env: 'development',
  worker_sleep_ms: 1000,
  redis: {
    port: 6379,
    host: '127.0.0.1',
    lock: {
      expiration_ms: 5000
    },
    dequeue: {
      max: 10
    }
  },
};
