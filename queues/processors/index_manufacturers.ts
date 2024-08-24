import { drizzleDb } from "@backend/lib/db";
import {
  memberships,
  profiles
} from "@backend/../drizzle/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import typesenseClient from "@backend/lib/typesense";
import { indexManufacturers, manufacturerSchema } from "@backend/modules/manufacturers/typesense_schema";


const cityCodes = {
  "UZTAS": "Тошкент вилояти",
  "UZAZN": "Андижон вилояти",
  "UZJIZ": "Жиззах вилояти",
  "UZNMA": "Наманган вилояти",
  "UZSKD": "Самарқанд вилояти",
  "UZKHO": "Хоразм вилояти",
  "UZBHK": "Бухоро вилояти",
  "UZQAS": "Қашқадарё вилояти",
  "UZFEG": "Фарғона вилояти",
  "UZNWY": "Навоий вилояти",
  "UZKPA": "Қорақалпоғистон Республикаси",
  "UZSIR": "Сирдарё вилояти",
};

export default async function processIndexManufacturer(id: string) {
  try {
    const manufacturer = await drizzleDb.query.memberships.findFirst({
      where: eq(memberships.id, id),
      columns: {
        id: true,
      },
    });

    if (!manufacturer) {
      return;
    }
    try {
      await typesenseClient.collections(indexManufacturers).retrieve();
      console.log('Collection already exists');
    } catch (err) {
      if (err.httpStatus === 404) {
        await typesenseClient.collections().create(manufacturerSchema);
        console.log('Created schema');
      } else {
        console.error('Error creating schema:', err);
      }
    }

    console.time("manufacturerSelect");
    const existingManufacturer = await drizzleDb
      .select()
      .from(memberships)
      .where(eq(memberships.id, id))
      .execute();

    const currentManufacturer = existingManufacturer[0];

    const manufacturerProfiles = await drizzleDb
      .select({
        field_name: profiles.field_name,
        field_value: profiles.field_value,
      })
      .from(profiles)
      .where(eq(profiles.references_id, id))
      .execute();

    console.timeEnd("manufacturerSelect");

    const capacity: string[] = [];
    let staff_count = 0;
    const certificates: string[] = [];

    manufacturerProfiles.forEach(profile => {
      if (profile.field_name === 'capacity') {
        const capacityValues = profile.field_value as { name: string, value: string, measure: string }[];
        capacityValues.forEach(cap => {
          capacity.push(`${cap.name}:${cap.value}:${cap.measure}`);
        });
      } else if (profile.field_name === 'staff_count') {
        staff_count = parseInt(profile.field_value as string);
      } else if (profile.field_name === 'certificates') {
        const certificateValues = profile.field_value as { name: string }[];
        certificateValues.forEach(cert => {
          certificates.push(cert.name);
        });
      }
    });

    const typesenseManufacturer = {
      id: currentManufacturer.id,
      name: currentManufacturer.name,
      short_name: currentManufacturer.short_name,
      description: currentManufacturer.description,
      active: currentManufacturer.active,
      rating: currentManufacturer.rating,
      country: currentManufacturer.country,
      type: currentManufacturer.type,
      org_type: currentManufacturer.org_type,
      city: currentManufacturer.city ? cityCodes[currentManufacturer.city] : null,
      ein: currentManufacturer.ein,
      address: currentManufacturer.address,
      fact_address: currentManufacturer.fact_address,
      email: currentManufacturer.email,
      web_site: currentManufacturer.web_site,
      vat: currentManufacturer.vat,
      verified: currentManufacturer.verified,
      verified_date: currentManufacturer.verified_date ? new Date(currentManufacturer.verified_date).getTime() : null,
      created_at: new Date(currentManufacturer.created_at).toISOString(),
      updated_at: new Date(currentManufacturer.updated_at).toISOString(),
      created_at_timestamp: dayjs(currentManufacturer.created_at).unix(),
      updated_at_timestamp: dayjs(currentManufacturer.updated_at).unix(),
      capacity,
      staff_count,
      certificates
    };



    try {
      await typesenseClient.collections(indexManufacturers).documents().upsert(typesenseManufacturer);
      console.log(`Indexed product ${id}`);

    } catch (e) {
      console.log('indexBody', typesenseManufacturer)
      console.error(`Error indexing product ${id}:`, e);
    }
  } catch (e) {
    console.error("Error indexing manufacturer:", e);
  }
}