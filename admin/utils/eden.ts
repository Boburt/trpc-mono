import { edenTreaty, edenFetch } from "@elysiajs/eden";
import type { App } from "@backend/index";

console.log('process.env.APP_API_URL', process.env.TRPC_API_URL)

export const apiClient = edenTreaty<App>(process.env.TRPC_API_URL!);
export const apiFetch = edenFetch<App>(process.env.TRPC_API_URL!);


