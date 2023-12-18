import { SQLWrapper, eq, inArray, ilike, gte, gt, lte, lt } from "drizzle-orm";
import { PgTable, PgTableFn, PgTableWithColumns } from "drizzle-orm/pg-core";
import { Type as t } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

type SelectArray = string[];

export const parseFilterFields = (
    filters: string,
    nativeTable: PgTable,
    relations: {
        [key: string]: PgTable;
    }
) => {
    let res: (SQLWrapper | undefined)[] = [];
    let parsedFilters = [];
    try {
        parsedFilters = JSON.parse(filters);
    } catch (e) {
        throw new Error("Invalid filters format");
    }

    const filtersType = t.Array(
        t.Object({
            field: t.String(),
            operator: t.String(),
            value: t.Any(),
        })
    );

    const isUserValid: boolean = Value.Check(filtersType, parsedFilters);

    if (!isUserValid) {
        throw new Error("Invalid filters format");
    }

    for (const filter of parsedFilters) {
        if (Object.prototype.hasOwnProperty.call(nativeTable, filter.field)) {
            switch (filter.operator) {
                case "in":
                    // @ts-ignore
                    res.push(inArray(nativeTable[filter.field], filter.value));
                    break;
                case "contains":
                    // @ts-ignore
                    res.push(ilike(nativeTable[filter.field], `%${filter.value}%`));
                    break;
                case "gte":
                    // @ts-ignore
                    res.push(gte(nativeTable[filter.field], filter.value));
                    break;
                case "gt":
                    // @ts-ignore
                    res.push(gt(nativeTable[filter.field], filter.value));
                    break;
                case "lte":
                    // @ts-ignore
                    res.push(lte(nativeTable[filter.field], filter.value));
                    break;
                case "lt":
                    // @ts-ignore
                    res.push(lt(nativeTable[filter.field], filter.value));
                    break;
                default:
                    // @ts-ignore
                    res.push(eq(nativeTable[filter.field], filter.value));
                    break;
            }
        } else if (filter.field.includes(".")) {
            const [relation, column] = filter.field.split(".");

            if (!relations[relation]) {
                throw new Error("Invalid filters format");
            }

            switch (filter.operator) {
                case "in":
                    // @ts-ignore
                    res.push(inArray(relations[relation][column], filter.value));
                    break;
                case "contains":
                    // @ts-ignore
                    res.push(ilike(relations[relation][column], `%${filter.value}%`));
                    break;
                case "gte":
                    // @ts-ignore
                    res.push(gte(relations[relation][column], filter.value));
                    break;
                case "gt":
                    // @ts-ignore
                    res.push(gt(relations[relation][column], filter.value));
                    break;
                case "lte":
                    // @ts-ignore
                    res.push(lte(relations[relation][column], filter.value));
                    break;
                case "lt":
                    // @ts-ignore
                    res.push(lt(relations[relation][column], filter.value));
                    break;
                default:
                    // @ts-ignore
                    res.push(eq(relations[relation][column], filter.value));
                    break;
            }

            // // @ts-ignore
            // if (!res[relation]) {
            //   // @ts-ignore
            //   res[relation] = {};
            // } // @ts-ignore
            // res[relation][column] = relations[relation][column];
        }
    }

    return res;
};
