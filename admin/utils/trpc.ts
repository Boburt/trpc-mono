// import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import { AppRouter } from "@server/trpc/trpc.router";
import { Router } from "@backend/_routes";
import {
  TRPCClientErrorLike,
  createTRPCReact,
  inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import { UseTRPCQueryResult } from "@trpc/react-query/dist/shared";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type ReactQueryOptions = inferReactQueryProcedureOptions<Router>;
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;

export const trpc = createTRPCReact<Router>();

// import { httpBatchLink } from "@trpc/client";
// import type { Router } from "../../../backend/src/_routes";
// import { createTRPCNext } from "@trpc/next";

// function getBaseUrl() {
//   if (typeof window !== "undefined")
//     // browser should use relative path
//     return "";
//   if (process.env.VERCEL_URL)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`;
//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }
// export const trpc = createTRPCNext<Router>({
//   config(opts) {
//     return {
//       links: [
//         httpBatchLink({
//           /**
//            * If you want to use SSR, you need to use the server's full URL
//            * @link https://trpc.io/docs/ssr
//            **/
//           url: `http://localhost:3000/trpc`,
//           // You can pass any HTTP headers you wish here
//           async headers() {
//             return {
//               // authorization: getAuthCookie(),
//             };
//           },
//         }),
//       ],
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/ssr
//    **/
//   ssr: true,
// });
