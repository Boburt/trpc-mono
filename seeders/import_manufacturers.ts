import csvtojson from "csvtojson";
import { resolve } from "path";
import { db } from "@backend/db";
import { slugify } from "transliteration";

const file = Bun.file(resolve(import.meta.dir, "./data/manufacturers.csv"));

const text = await file.text();

const array = await csvtojson({
  noheader: true,
  //   output: "csv",
}).fromString(text);

// console.log(array[0]);
// console.log(db);
const categories = await db.categories.findMany({});

const categoriesByName = categories.reduce((acc, curr) => {
  acc[curr.name.toLowerCase()] = curr.id;
  return acc;
}, {});

const cities: {
  [key: string]: string;
} = {
  "ҚОРАҚАЛПОҒИСТОН РЕСПУБЛИКАСИ": "90c0ced0-5b1f-4f0e-8f00-8051fa2faf57",
  "АНДИЖОН ВИЛОЯТИ": "0b585a69-9bd3-4b37-9fef-0f8f5773fc05",
  "БУХОРО ВИЛОЯТИ": "b14b3ffd-a6b1-48c7-8851-8bba99545d56",
  "ЖИЗЗАХ ВИЛОЯТИ": "b2aa2db7-3c34-406a-8d9d-9e8b20de363b",
  "ҚАШҚАДАРЁ ВИЛОЯТИ": "e2bc5a96-93c5-4861-9964-68e64ecd7094",
  "НАВОИЙ ВИЛОЯТИ": "b820dad3-db58-403f-948f-dad9b0dcba9a",
  "НАМАНГАН ВИЛОЯТИ": "f14d71fe-2fa2-4189-902c-41a5912a0951",
  "САМАРҚАНД ВИЛОЯТИ": "89342380-60b3-437f-a2e4-ee26f42a2d8b",
  "СУРХОНДАРЁ ВИЛОЯТИ": "a7f594d7-725c-48a7-87c6-b52dda55278c",
  "СИРДАРЁ ВИЛОЯТИ": "eeaae350-8aaf-429b-a37d-a6a389cd564e",
  "ТОШКЕНТ ВИЛОЯТИ": "b5d27ad4-d6f8-4fde-83bc-89db4f7e27cc",
  "ФАРҒОНА ВИЛОЯТИ": "3c7766e5-0ab3-4547-93c9-1bae0af30f84",
  "ХОРАЗМ ВИЛОЯТИ": "341075c5-fded-4193-a7d9-ff51b8f6099c",
  "ТОШКЕНТ шахри": "6f9da1f8-b176-4c4d-98ba-fd81e4367e7d",
};

const manufacturers: {
  [key: string]: {
    short_name: string;
    name: string;
    city: string;
    categories: {
      [key: string]: string;
    };
    properties: {
      power: string;
      production_volume: string;
    };
  };
} = {};

for (const item of array) {
  const {
    field1: short_name,
    field2: name,
    field4: city_name,
    field6: category_name,
  } = item;

  if (!manufacturers[short_name]) {
    manufacturers[short_name] = {
      short_name,
      name,
      city: cities[city_name.trim()],
      categories: {},
      properties: {
        power: item.field7,
        production_volume: item.field8,
      },
    };
  }
  let categoryName = category_name.trim().toLowerCase();
  if (categoryName.length > 0) {
    manufacturers[short_name].categories[categoryName] = categoryName;
  }
}

for (const key in manufacturers) {
  let manufacturer = manufacturers[key];
  const manufacturerCategories = Object.keys(manufacturer.categories);
  let categoryIds = [];
  //   console.log("manufacturerCategories", manufacturerCategories);
  //   console.log("categoriesByName", categoriesByName);
  for (const category of manufacturerCategories) {
    const categoryId = categoriesByName[category];
    if (!categoryId) {
      let code = slugify(category);
      //   console.log("code", code);
      const { id } = await db.categories.create({
        data: {
          name: category,
          code,
          active: true,
          i18n_name: {},
        },
      });
      categoryIds.push(id);
      categoriesByName[category] = id;
    } else {
      categoryIds.push(categoryId);
    }
  }
  const { id } = await db.manufacturers.create({
    data: {
      name: manufacturer.name,
      short_name: manufacturer.short_name,
      description: "",
      city_id: manufacturer.city,
      //   cities: {
      //     connect: {
      //       id: manufacturer.city,
      //     },
      //   },

      //   manufacturers_categories: {
      //     connect: categoryIds.map((id) => ({
      //       category_id: id,
      //     })),
      //   },

      //   properties: {
      //     create: {
      //       power: manufacturer.properties.power,
      //       production_volume: manufacturer.properties.production_volume,
      //     },
      //   },
    },
  });

  for (const categoryId of categoryIds) {
    await db.manufacturersCategories.create({
      data: {
        manufacturer_id: id,
        category_id: categoryId,
      },
    });
  }

  if (manufacturer.properties.power) {
    await db.manufacturersPropertiesValues.create({
      data: {
        manufacturer_id: id,
        property_id: "f53cbb10-df03-4471-b67a-bb42b7a0a638",
        value: manufacturer.properties.power,
      },
    });
  }

  if (manufacturer.properties.production_volume) {
    await db.manufacturersPropertiesValues.create({
      data: {
        manufacturer_id: id,
        property_id: "01871fa3-cbaa-4426-8883-0b15534e028f",
        value: manufacturer.properties.production_volume,
      },
    });
  }
}
