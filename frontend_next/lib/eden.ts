import { treaty, edenFetch } from "@elysiajs/eden";
import type { App } from "@backend/index";

console.log('process.env.APP_API_URL', process.env.NEXT_PUBLIC_API_URL)

// @ts-ignore
export const apiClient = treaty<App>(process.env.NEXT_PUBLIC_API_URL);
// @ts-ignore
export const apiFetch = edenFetch<App>(process.env.NEXT_PUBLIC_API_URL);


