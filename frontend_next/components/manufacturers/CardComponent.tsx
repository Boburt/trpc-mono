import { useState, useMemo } from "react";
import CommentComponent from "@frontend/src/components/reviews/CommentComponent";
import clsx from "clsx";
import z from "zod/lib";
import { ManufacturersPropertiesValuesWithRelationsSchema } from "@backend/lib/zod";
import { RouterOutputs } from "@frontend/src/utils/trpc";
import { group } from "radash";
import Providers from "@frontend/src/store/provider";

export default function CardComponent({
  manufacturer,
  reviewsCount,
}: {
  manufacturer: RouterOutputs["manufacturers"]["publicOne"];
  reviewsCount: number;
}) {
  const [activetab, setActiveTab] = useState("profile");

  // group properties by category
  const properties = useMemo(() => {
    if (manufacturer?.properties) {
      // let grouped = group(
      //   manufacturer.properties,
      //   (p) =>
      //     p.manufacturers_properties_values_manufacturers_properties
      //       .manufacturers_properties_categories!.code
      // );

      let grouped = manufacturer.properties.reduce<{ [key: string]: any }>(
        (acc, p) => {
          const category = p
            .manufacturers_properties_values_manufacturers_properties
            .manufacturers_properties_categories!.code as string;
          if (!acc[category]) {
            acc[category] = {
              category: {
                name: p.manufacturers_properties_values_manufacturers_properties
                  .manufacturers_properties_categories!.name,
                code: p.manufacturers_properties_values_manufacturers_properties
                  .manufacturers_properties_categories!.code,
              },
              props: [],
            };
          }
          acc[category].props.push(p);
          return acc;
        },
        {}
      );
      return Object.values(grouped);
    }

    return [];
  }, [manufacturer!.properties]);

  return (
    <Providers>
      <div className=" w-full">
        <div className="tabs rounded-md pt-4 px-6 bg-base-200 my-10">
          <span
            className={clsx([
              "tab tab-bordered",
              { "tab-active": activetab === "profile" },
            ])}
            onClick={() => setActiveTab("profile")}
          >
            Профиль{" "}
          </span>
          <span
            className={clsx([
              "tab tab-bordered",
              { "tab-active": activetab === "document" },
            ])}
            onClick={() => setActiveTab("document")}
          >
            Документы
          </span>
          <span
            className={clsx([
              "tab tab-bordered",
              { "tab-active": activetab === "reviews" },
            ])}
            onClick={() => setActiveTab("reviews")}
          >
            Отзывы
          </span>
        </div>
        <div className="rounded-md py-4 px-6 bg-base-200 my-10 min-h-max">
          {activetab === "profile" &&
            properties.map((category) => (
              <div key={category.category.code} className="flex">
                <h2 className="text-2xl font-bold w-1/3">
                  {category.category.name}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {category.props.map((p: any) => (
                    <div key={p.id}>
                      <div className="text-lg font-bold">
                        {
                          p
                            .manufacturers_properties_values_manufacturers_properties
                            .name
                        }
                      </div>
                      <div>{p.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          {activetab === "document" && <p>Document</p>}
          {activetab === "reviews" && (
            <CommentComponent
              manufacturerId={manufacturer!.id}
              reviewsCount={reviewsCount}
            />
          )}
        </div>
      </div>
    </Providers>
  );
}
