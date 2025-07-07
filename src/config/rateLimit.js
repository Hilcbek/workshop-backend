import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from './enviromental';

const redisClient = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 100,        
  duration: 100,      
  blockDuration: 60 * 60 * 12, 
});

export {rateLimiter}