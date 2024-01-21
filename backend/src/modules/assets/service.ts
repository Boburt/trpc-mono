import fs from "fs";
import path from "path";

import { CacheControlService } from "../cache_control/service";
import { Queue } from "bullmq";
import { Assets, AssetsFindManyArgsSchema } from "@backend/lib/zod";
import { PaginationType } from "@backend/lib/pagination_interface";
import { DrizzleDB } from "@backend/lib/db";
import { assets } from "@backend/../drizzle/schema";
import { InferSelectModel, sql } from "drizzle-orm";

export class AssetsService {
  constructor(
    private readonly queue: Queue,
    private readonly drizzle: DrizzleDB
  ) {}

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
    // if (model_id) {
    //   const asset = await this.prisma.assets.findFirst({
    //     where: {
    //       model,
    //       model_id,
    //       code,
    //     },
    //   });
    //   if (asset) {
    //     await fs.rmSync(`../uploads/sources/${asset.id}`, {
    //       recursive: true,
    //     });
    //     await this.prisma.assets.delete({
    //       where: {
    //         id: asset.id,
    //       },
    //     });
    //     // delete all childs of asset
    //     await this.prisma.assets.deleteMany({
    //       where: {
    //         parent_id: asset.id,
    //       },
    //     });
    //     try {
    //       await fs.rmSync(`../uploads/dist/${asset.id}`, {
    //         recursive: true,
    //       });
    //     } catch (error) {}
    //   }
    // }
    // const asset = await this.prisma.assets.create({
    //   data: {
    //     model,
    //     model_id,
    //     mime_type: file.type,
    //     name,
    //     size: file.size,
    //     path: "sources",
    //     code,
    //   },
    // });
    // await fs.mkdirSync(`../uploads/sources/${asset.id}`, { recursive: true });
    // /** @ts-ignore */
    // Bun.write(`../uploads/sources/${asset.id}/${name}`, file);
    // file.type.split("/")[0] === "image" &&
    //   this.queue.add(
    //     asset.id,
    //     {
    //       asset_id: asset.id,
    //     },
    //     {
    //       removeOnComplete: true,
    //     }
    //   );
    // return asset;
  }

  async listAssets(
    input: Zod.infer<typeof AssetsFindManyArgsSchema>
    //): Promise<PaginationType<Assets>> {
  ): Promise<PaginationType<InferSelectModel<typeof assets>>> {
    let take = input.take ?? 20;
    let skip = input.skip ?? 0;
    // let skip = !input.skip ? 1 : Math.round(input.skip / take);
    // if (input.skip && input.skip > 0) {
    //   skip++;
    // }
    delete input.take;
    delete input.skip;

    const assetsCount = await this.drizzle
      .select({ count: sql<number>`count(*)` })
      .from(assets)
      .execute();

    const assetsList = await this.drizzle
      .select()
      .from(assets)
      .limit(take)
      .offset(skip);

    const isLastPage = skip + take >= +assetsCount[0].count;
    const paginationMeta = {
      isFirstPage: skip === 0,
      isLastPage,
      currentPage: skip == 0 ? 1 : skip / take + 1,
      previousPage: skip == 0 ? 0 : skip / take,
      nextPage: skip == 0 ? 2 : isLastPage ? skip / take + 1 : skip / take + 2,
      pageCount: Math.ceil(+assetsCount[0].count / take),
      totalCount: +assetsCount[0].count,
    };

    // const [assets, meta] = await this.prisma.assets.paginate(input).withPages({
    //   limit: take,
    //   page: skip,
    //   includePageCount: true,
    // });

    return {
      items: assetsList,
      meta: paginationMeta,
    };
  }
}
