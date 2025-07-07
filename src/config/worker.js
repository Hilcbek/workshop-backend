import { queueName } from '../utils/constant'
import { redisClient } from './queue'
import { Queue, Worker } from 'bullmq'
import { logger } from './winston'
import { sendEmail } from '../utils/utils'

const workshopQueue = new Queue(queueName, {
  connection: redisClient,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  lazyConnect: true,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000)
  },
})

redisClient.on('error', err => logger.info('Redis Client Error', err));





const worker = new Worker(
  queueName,
  async (job) => {
    console.log('job.data ',job.data)
    switch (job.data.type) {
      case 'email':
        return sendEmail(job.data.data)
    }
  },
  {
    connection: redisClient,
  },
)

worker.on('completed', (job) => {
  logger.info(`Job ${job} completed`)
})

worker.on('failed', (job, err) => {
  logger.error(`Job ${job?.id} failed`, err)
})

export { workshopQueue }
