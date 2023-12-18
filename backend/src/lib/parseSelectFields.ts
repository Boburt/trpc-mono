import { PgTable, PgTableFn, PgTableWithColumns } from "drizzle-orm/pg-core";

type SelectArray = string[];

export const parseSelectFields = (
    selectFields: string | string[],
    nativeTable: PgTable,
    relations: {
        [key: string]: PgTable;
    }
) => {
    let res = {};
    if (typeof selectFields === "string") {
        selectFields = selectFields.split(",");
    }
    for (const field of selectFields) {
        if (Object.prototype.hasOwnProperty.call(nativeTable, field)) {
            // @ts-ignore
            res[field] = nativeTable[field];
        } else if (field.includes(".")) {
            const [relation, column] = field.split(".");
            // @ts-ignore
            if (!res[relation]) {
                // @ts-ignore
                res[relation] = {};
            } // @ts-ignore
            res[relation][column] = relations[relation][column];
        }
    }
    return res;
};
