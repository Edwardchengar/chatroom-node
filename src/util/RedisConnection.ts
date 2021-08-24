import IORedis, { Redis } from "ioredis";

export class RedisConnection {
  static client: Redis;

  constructor() {
    RedisConnection.client = new IORedis(process.env.REDISURI);
  }

  getClient() {
    return RedisConnection.client;
  }

  setClient(client: Redis) {
    RedisConnection.client = new IORedis(process.env.REDISURI);
  }
}
