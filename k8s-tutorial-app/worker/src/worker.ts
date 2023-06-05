import { Redis } from "ioredis";
import {createRedisInstance} from "./redis_client/client";

const JOBS_EVENT_CHANNEL = 'jobs';
const COMPLETED_JOBS_EVENT_CHANNEL = 'completed_jobs';

export default class WorkerService {
  private _id: string;
  private _redis: Redis;
  private _subscriber: Redis;

  constructor() {
    this._id = Math.random().toString(36).substring(7);
    this._redis = createRedisInstance();
    this._subscriber = createRedisInstance();
    this.initialiseSubscriber();
  }

  private initialiseSubscriber() {
    console.log(`[Worker] ${this._id} Initialising subscriber...`);
    this._subscriber.subscribe(JOBS_EVENT_CHANNEL, (error, count) => {
      if (error) {
        console.error('[Worker] Error subscribing to job channel', error);
      } else {
        console.log(`[Worker] Subscribed to ${count} channel. Listening for jobs...`);
      }
    });

    this._subscriber.on('message', async (channel, message) => {
      if(channel === JOBS_EVENT_CHANNEL) {
        const {jobId, userId, sessionToken} = JSON.parse(message);
        this.handleJobEvent(jobId, userId, sessionToken);
      }
    });
  }

  private async handleJobEvent(jobId: string, userId: number, sessionToken: string) {
    console.log(`[Worker] ${this._id} Received job ${jobId}`);
    const jobLock = await this._redis.setnx(jobId, this._id);
    if(jobLock === 0) {
      // Job is already being processed by another worker
      return;
    }

    const result = await this.doWork();
    const resultWithUserDetails = {...result, userId, sessionToken};
    this._redis.del(jobId);
    this._redis.publish(COMPLETED_JOBS_EVENT_CHANNEL, JSON.stringify({jobId, result: resultWithUserDetails}));
    console.log(`[Worker] Job ${jobId} completed in ${result.time} seconds by ${this._id}`);
  }

  async doWork() {
    // Generate a random number between 1 and 5
    const time = Math.floor(Math.random() * 5) + 1;
    // Sleep for that many seconds
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    return {id: this._id, time};
  }
}