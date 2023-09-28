import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import { db } from "@backend/db";
import { ImageSizes } from "@backend/lib/zod";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import processNewImages from "./processors/new_assets_added";
import processIndexManufacturer from "./processors/index_manufacturers";

export const redisClient = new Redis({
  maxRetriesPerRequest: null,
});

const imageProcessQueueName = `${process.env.PROJECT_PREFIX}new_assets_added`;

const indexManufacturersQueueName = `${process.env.PROJECT_PREFIX}index_manufacturers`;

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

const indexManufacturersQueueWorker = new Worker(
  indexManufacturersQueueName,
  async (job) => {
    const { data } = job;
    await processIndexManufacturer(data.id);
  },
  {
    connection: redisClient,
  }
);
