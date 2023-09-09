import { db } from "@backend/db";
import { ImageSizes } from "@backend/lib/zod";
import path from "path";
import { redisClient } from "queues";
import sharp from "sharp";
import fs from "fs";

interface ImageSizesWithFileSize extends ImageSizes {
  size: number;
}

export default async function processNewImages({ id }: { id: string }) {
  let redisImageSizes = await redisClient.get(
    `${process.env.PROJECT_PREFIX}image_sizes`
  );
  const imageSizes = JSON.parse(
    redisImageSizes ?? "[]"
  ) as ImageSizesWithFileSize[];
  const asset = await db.assets.findFirst({
    where: {
      id,
    },
  });

  if (asset && imageSizes?.length > 0) {
    fs.mkdirSync(`../uploads/dist/${asset.id}`, {
      recursive: true,
    });

    const fileName = path.basename(asset.name, path.extname(asset.name));

    const imageMetadata = await sharp(
      `../uploads/sources/${asset.id}/${asset.name}`
    ).metadata();

    for (const imageSize of imageSizes) {
      if (imageSize.width > imageMetadata.width!) {
        imageSize.width = imageMetadata.width!;
      }

      if (imageSize.height > imageMetadata.height!) {
        imageSize.height = imageMetadata.height!;
      }

      await sharp(`../uploads/sources/${asset.id}/${asset.name}`)
        .resize(imageSize.width, imageSize.height, {
          fit: "outside",
        })
        .webp({
          quality: 90,
        })
        .toFile(
          `../uploads/dist/${asset.id}/${fileName}-${imageSize.code}.webp`
        );

      imageSize.size = fs.statSync(
        `../uploads/dist/${asset.id}/${fileName}-${imageSize.code}.webp`
      ).size;
    }

    await db.assets.createMany({
      data: imageSizes.map((imageSize: any) => ({
        model: asset.model,
        model_id: asset.model_id,
        name: `${fileName}-${imageSize.code}.webp`,
        path: "dist",
        parent_id: asset.id,
        mime_type: "image/webp",
        size: imageSize.size,
        resize_code: imageSize.code,
        code: asset.code,
      })),
    });
  }
}
