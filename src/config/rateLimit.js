import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  keyPrefix: 'middleware',
  points: 100,        
  duration: 100,      
  blockDuration: 60 * 60 * 12, 
});

export {rateLimiter}