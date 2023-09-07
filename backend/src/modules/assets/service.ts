import fs from "fs";
import path from "path";

import { CacheControlService } from "../cache_control/service";
import { DB } from "@backend/db";
import { Queue } from "bullmq";
import { Assets, AssetsFindManyArgsSchema } from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";

export class AssetsService {
  constructor(private readonly prisma: DB, private readonly queue: Queue) {}

  async addAsset({
    model,
    name,
    model_id,
    code,
    file,
  }: {
    model: string;
    name: string;
    model_id?: string;
    code?: string;
    file: Blob;
  }) {
    if (model_id) {
      const asset = await this.prisma.assets.findFirst({
        where: {
          model,
          model_id,
          code,
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

        // delete all childs of asset
        await this.prisma.assets.deleteMany({
          where: {
            parent_id: asset.id,
          },
        });

        try {
          await fs.rmSync(`../uploads/dist/${asset.id}`, {
            recursive: true,
          });
        } catch (error) {}
      }
    }

    const asset = await this.prisma.assets.create({
      data: {
        model,
        model_id,
        mime_type: file.type,
        name,
        size: file.size,
        path: "sources",
        code,
      },
    });
    await fs.mkdirSync(`../uploads/sources/${asset.id}`, { recursive: true });
    Bun.write(`../uploads/sources/${asset.id}/${name}`, file);

    file.type.split("/")[0] === "image" &&
      this.queue.add(
        asset.id,
        {
          asset_id: asset.id,
        },
        {
          removeOnComplete: true,
        }
      );
    return asset;
  }

  async listAssets(
    input: Zod.infer<typeof AssetsFindManyArgsSchema>
  ): Promise<PaginationType<Assets>> {
    let take = input.take ?? 20;
    let skip = !input.skip ? 1 : Math.round(input.skip / take);
    if (input.skip && input.skip > 0) {
      skip++;
    }
    delete input.take;
    delete input.skip;
    const [assets, meta] = await this.prisma.assets.paginate(input).withPages({
      limit: take,
      page: skip,
      includePageCount: true,
    });

    return {
      items: assets,
      meta,
    };
  }
}
