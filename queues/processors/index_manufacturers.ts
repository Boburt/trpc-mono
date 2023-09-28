import https from "https";
import { Agent, setGlobalDispatcher } from "undici";

export default async function processIndexManufacturer(id: string) {
  const indexManufacturers = `${process.env.PROJECT_PREFIX}_manufacturers`;
  // check if index in elasticsearch exists
  //   const indexExists = await elasticClient.indices.exists({
  //     index: indexManufacturers,
  //   });
  const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}`;
  const agent = new Agent({
    connect: {
      rejectUnauthorized: false,
    },
  });

  setGlobalDispatcher(agent);
  const response = await fetch(elasticUrl, {
    method: "HEAD",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.ELASTIC_AUTH}`,
    },
  });

  if (response.status == 404) {
    console.log("index does not exist, creating");
  } else {
    console.log("index exists, updating");
  }
}
