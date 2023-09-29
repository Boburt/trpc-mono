import { db } from "@backend/db";

export default async function processIndexManufacturer(id: string) {
  try {
    const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;
    // check if index in elasticsearch exists
    //   const indexExists = await elasticClient.indices.exists({
    //     index: indexManufacturers,
    //   });
    const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}`;
    // const agent = new Agent({
    //   connect: {
    //     rejectUnauthorized: false,
    //   },
    // });

    // setGlobalDispatcher(agent);
    const response = await fetch(elasticUrl, {
      method: "HEAD",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
    });
    console.log("response", response);
    if (response.status == 404) {
      // create index with mapping and settings using fetch
      console.log("index does not exist, creating");

      const indexMapping = {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
        },
        mappings: {
          properties: {
            id: {
              type: "keyword",
            },
            name: {
              type: "text",
            },
            short_name: {
              type: "text",
            },
            description: {
              type: "text",
            },
            categories: {
              type: "nested",
              properties: {
                id: {
                  type: "keyword",
                },
                name: {
                  type: "text",
                },
                code: {
                  type: "keyword",
                },
              },
            },
            properties: {
              type: "nested",
              properties: {
                id: {
                  type: "keyword",
                },
                name: {
                  type: "keyword",
                },
                code: {
                  type: "keyword",
                },
                show_in_filter: {
                  type: "boolean",
                },
                show_in_list: {
                  type: "boolean",
                },
                value: {
                  type: "text",
                },
              },
            },
          },
        },
      };

      const response = await fetch(elasticUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(indexMapping),
      });
    } else {
      console.log("index exists, updating");
    }
    console.log("console is created");
    const manufacturer = await db.manufacturers.findFirst({
      where: {
        id,
      },
      include: {
        manufacturers_categories: {
          select: {
            manufacturers_categories_categories: {
              select: {
                name: true,
                code: true,
                id: true,
              },
            },
          },
        },
        manyfacturers_properties_values_manufacturers_properties: {
          select: {
            property_id: true,
            value: true,
            manufacturers_properties_values_manufacturers_properties: {
              select: {
                name: true,
                code: true,
                id: true,
                show_in_filter: true,
                show_in_list: true,
              },
            },
          },
        },
      },
    });
    console.log("manufacturer", manufacturer);
    if (manufacturer) {
      // index manufacturer in elasticsearch using fetch
      const indexUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}/_doc/${manufacturer.id}`;
      const indexBody = {
        id: manufacturer.id,
        name: manufacturer.name,
        short_name: manufacturer.short_name,
        description: manufacturer.description,
        categories: manufacturer.manufacturers_categories.map((item) => {
          return {
            id: item.manufacturers_categories_categories.id,
            name: item.manufacturers_categories_categories.name,
            code: item.manufacturers_categories_categories.code,
          };
        }),
        properties:
          manufacturer.manyfacturers_properties_values_manufacturers_properties.map(
            (item) => {
              return {
                id: item
                  .manufacturers_properties_values_manufacturers_properties.id,
                name: item
                  .manufacturers_properties_values_manufacturers_properties
                  .name,
                code: item
                  .manufacturers_properties_values_manufacturers_properties
                  .code,
                show_in_filter:
                  item.manufacturers_properties_values_manufacturers_properties
                    .show_in_filter,
                show_in_list:
                  item.manufacturers_properties_values_manufacturers_properties
                    .show_in_list,
                value: item.value,
              };
            }
          ),
      };
      console.log("before indexing");
      const response = await fetch(indexUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
        },
        body: JSON.stringify(indexBody),
      });
      console.log("data is indexed");
    }
  } catch (error) {
    console.log("error", error);
  }
}
