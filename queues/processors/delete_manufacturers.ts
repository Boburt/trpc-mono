export default async function processDeleteManufacturer(id: string) {
  try {
    const indexManufacturers = `${process.env.PROJECT_PREFIX}manufacturers`;
    const elasticUrl = `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}/${indexManufacturers}`;
    const res = await fetch(`${elasticUrl}/_doc/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(process.env.ELASTIC_AUTH!)}`,
      },
    });
  } catch (e) {
    console.log("error deleting manufacturer", e);
  }
}
