import fs from "fs";
import path from "path";

import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";

export class AssetsService {
  constructor(
    private readonly prisma: DB,
    private readonly cacheControl: CacheControlService
  ) {}

  async addAsset({
    model,
    name,
    model_id,
    file,
  }: {
    model: string;
    name: string;
    model_id?: string;
    file: Blob;
  }) {
    if (model_id) {
      const asset = await this.prisma.assets.findFirst({
        where: {
          model,
          model_id,
          name,
        },
      });
      if (asset) {
        await fs.rmSync(`../uploads/sources/${asset.id}`, {
          recursive: true,
        });
        await this.prisma.assets.delete({
          where: {
            id: asset.id,
          },
        });
      }
    }

    const asset = await this.prisma.assets.create({
      data: {
        model,
        model_id,
        mime_type: file.type,
        name,
        size: file.size,
      },
    });
    await fs.mkdirSync(`../uploads/sources/${asset.id}`, { recursive: true });
    Bun.write(`../uploads/sources/${asset.id}/${name}`, file);
    return asset;
  }
}
