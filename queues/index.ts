import { Worker } from "bullmq";
import Redis from "ioredis";
import processNewImages from "./processors/new_assets_added";
import processIndexManufacturer from "./processors/index_manufacturers";
import processDeleteManufacturer from "./processors/delete_manufacturers";
import processIndexManufacturerReview from "./processors/index_manufacturer_review";

export const redisClient = new Redis({
  maxRetriesPerRequest: null,
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
});

const imageProcessQueueName = `${process.env.PROJECT_PREFIX}new_assets_added`;

const indexManufacturersQueueName = `${process.env.PROJECT_PREFIX}index_manufacturers`;
const deleteManufacturersQueueName = `${process.env.PROJECT_PREFIX}delete_manufacturers`;
const indexManufacturerReview = `${process.env.PROJECT_PREFIX}index_manufacturer_review`;

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
    console.log("job data", data);
    await processIndexManufacturer(data.id);
  },
  {
    connection: redisClient,
  }
);

const deleteManufacturersQueueWorker = new Worker(
  deleteManufacturersQueueName,
  async (job) => {
    const { data } = job;
    console.log("job data", data);
    await processDeleteManufacturer(data.id);
  },
  {
    connection: redisClient,
  }
);

const indexManufacturerReviewWorker = new Worker(
  indexManufacturerReview,
  async (job) => {
    const { data } = job;
    console.log("job data", data);
    await processIndexManufacturerReview(data.id);
  },
  {
    connection: redisClient,
  }
);
