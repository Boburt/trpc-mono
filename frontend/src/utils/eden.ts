import { treaty, edenFetch } from "@elysiajs/eden";
import type { App } from "@backend/index";

console.log('process.env.APP_API_URL', import.meta.env.PUBLIC_TRPC_API_URL)

export const apiClient = treaty<App>(import.meta.env.PUBLIC_TRPC_API_URL);
export const apiFetch = edenFetch<App>(import.meta.env.PUBLIC_TRPC_API_URL);


