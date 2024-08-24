import { memberships, profiles } from 'backend/drizzle/schema';
import manufacturerMembers from './data/new_manufacturer_members.json';
import { drizzleDb } from '@backend/lib/db';

console.log('manufacturerMembers', manufacturerMembers);

const measureCodes = {
    "млн.дона": "million_piece",
    "минг тонна": "thousand_ton",
    "млн.жуфт": "million_pair",
    "млн.кв.м": "million_square_meter",
}

const cityCodes = {
    "Тошкент вилояти": "UZTAS",
    "Тошкент шахри": "UZTAS",
    "Андижон вилояти": "UZAZN",
    "Жиззах вилояти": "UZJIZ",
    "Наманган вилояти": "UZNMA",
    "Самарқанд вилояти": "UZSKD",
    "Хоразм вилояти": "UZKHO",
    "Бухоро вилояти": "UZBHK",
    "Қашқадарё вилояти": "UZQAS",
    "Фарғона вилояти": "UZFEG",
    "Навоий вилояти": "UZNWY",
    "Қорақалпоғистон Республикаси": "UZKPA",
    "Сирдарё вилояти": "UZSIR",
};

(async () => {
    for (const manufacturer of manufacturerMembers) {
        try {

            const newManufacturer = await drizzleDb.insert(memberships).values({
                name: manufacturer.name,
                active: true,
                country: 'UZ',
                city: cityCodes[manufacturer.city],
                type: 'manufacturer',
                ein: manufacturer.ein,
            }).returning({
                id: memberships.id,
            }).execute();


            await drizzleDb.insert(profiles).values({
                field_name: 'capacity',
                field_value: manufacturer.items.map(item => ({
                    ...item,
                    measure: measureCodes[item.measure],
                })),
                references_id: newManufacturer[0].id,
            }).execute();
        } catch (e) {
            console.log('Error', e);
            console.log('manufacturer', {
                name: manufacturer.name,
                active: true,
                country: 'UZ',
                city: cityCodes[manufacturer.city],
                type: 'manufacturer',
                ein: manufacturer.ein,
            });

        }
    }
})();