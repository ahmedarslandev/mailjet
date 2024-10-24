export const redisConnection = {
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST,
};

export const defaultJobOptions = {
  attempts: 3,
  removeOnComplete: {
    age: 60 * 60,
    count: 20,
  },
  backoff: {
    type: "exponential",
    delay: 3000,
  },
  removeOnFail: false,
};
