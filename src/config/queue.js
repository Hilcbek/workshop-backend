import IORedis from 'ioredis';

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from './enviromental'
import { logger } from './winston';

const redisClient = new IORedis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest : null,
  enableReadyCheck : false,
  lazyConnect : true,
});


redisClient.on('connect', () => {
  logger.info('[Redis] Connecting to server...');
});

redisClient.on('ready', () => {
  logger.info('[Redis] Connection is ready.');
});

redisClient.on('reconnecting', (time) => {
  logger.info(`[Redis] Reconnecting... delay: ${time}ms`);
});

redisClient.on('error', (err) => {
  logger.error('[Redis] Error:', err);
});

redisClient.on('close', () => {
  logger.warn('[Redis] Connection closed.');
});

redisClient.on('end', () => {
  console.warn('[Redis] Connection ended.');
});

redisClient.on('select', (db) => {
  console.log(`[Redis] Selected database ${db}`);
});

export { redisClient }
