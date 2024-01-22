import { clear, createStore, del, get, keys, set, UseStore } from 'idb-keyval'

const indexedDbExists = !!window.indexedDB

/**
 * Creates key-value storage.
 * @param dbName the database name.
 * @param storeName the store name.
 * @returns the object for storage management.
 */
export const kvCreateStore = (dbName: string, storeName: string): UseStore => {
    if (!indexedDbExists) return {} as UseStore
    return createStore(dbName, storeName)
}

/**
 * Removes the value from the store by the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvDel = (key: IDBValidKey, customStore?: UseStore): Promise<void> => {
    if (!indexedDbExists) return Promise.reject()
    return del(key, customStore)
}

/**
 * Returns a value from the store for the specified key.
 * @param key the key.
 * @param customStore the store.
 * @returns the Promise with a value or undefined if no value is found.
 */
export const kvGet = <T = any>(key: IDBValidKey, customStore?: UseStore): Promise<T | undefined> => {
    if (!indexedDbExists) return Promise.reject()
    return get<T>(key, customStore)
}

/**
 * Returns an array with all available keys from the store.
 * @param customStore the store.
 * @returns the Promise with the array with all available keys.
 */
export const kvKeys = <KeyType extends IDBValidKey>(customStore?: UseStore): Promise<KeyType[]> => {
    if (!indexedDbExists) return Promise.reject()
    return keys(customStore)
}

/**
 * Sets the value in the store by the specified key.
 * @param key the key.
 * @param value the value.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvSet = (key: IDBValidKey, value: any, customStore?: UseStore): Promise<void> => {
    if (!indexedDbExists) return Promise.reject()
    return set(key, value, customStore)
}

/**
 * Clears all values in the store.
 * @param customStore the store.
 * @returns the Promise, which can be rejected if operations failed to complete.
 */
export const kvClear = (customStore?: UseStore): Promise<void> => {
    if (!indexedDbExists) return Promise.reject()
    return clear(customStore)
}