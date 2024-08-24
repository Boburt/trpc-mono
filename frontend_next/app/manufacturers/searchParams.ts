import {
    createSearchParamsCache,
    parseAsInteger,
    parseAsString,
    parseAsArrayOf
} from 'nuqs/server'

export const searchParams = {
    // List your search param keys and associated parsers here:
    query: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(24),
    city: parseAsArrayOf(parseAsString, '|').withDefault([]),
    capacity: parseAsArrayOf(parseAsString, '|').withDefault([]),
    sort: parseAsString.withDefault('rating:desc'),
}

export const searchParamsCache = createSearchParamsCache(searchParams)