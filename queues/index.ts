import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { db } from "@backend/db";
import { ImageSizes } from "@backend/lib/zod";
import path from "path";
import sharp from "sharp";
import processNewImages from "./processors/new_assets_added";

export const redisClient = new Redis({
  maxRetriesPerRequest: null,
});

const imageProcessQueueName = `${process.env.PROJECT_PREFIX}new_assets_added`;

const imageProcessQueueWorker = new Worker(
  imageProcessQueueName,
  async (job) => {
    const { data } = job;
    await processNewImages(data.asset_id);
  },
  {
    connection: redisClient,
  }
);
