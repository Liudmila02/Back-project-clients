import redis from 'redis';

const client = redis.createClient({
  url: "//127.0.0.1:6379",
  retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The redis server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Redis connection retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
});

export default client;