import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import { AppRouter } from "@server/trpc/trpc.router";
import { Router } from "@backend/_routes";
export const trpc = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc", // you should update this to use env variables
      async headers(opts) {
        const { opList } = opts;
        console.log("opList", opList);
        // if (clientErrors.length) {
        //   // propagate http first error from API calls
        //   return {
        //     status: clientErrors[0].data?.httpStatus ?? 500,
        //   };
        // }
        // cache request for 1 day + revalidate once every second
        const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
        return {
          "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        };
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});

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
