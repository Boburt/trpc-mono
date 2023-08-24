"use strict";
(() => {
var exports = {};
exports.id = 912;
exports.ids = [912];
exports.modules = {

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 34971:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/auth/[...nextauth]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (handler),
  POST: () => (handler),
  authOptions: () => (authOptions)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(74857);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(78041);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(36500);
// EXTERNAL MODULE: ./node_modules/.pnpm/@trpc+client@10.37.1_@trpc+server@10.37.1/node_modules/@trpc/client/dist/index.mjs + 13 modules
var dist = __webpack_require__(70069);
;// CONCATENATED MODULE: ./utils/trpc-server.ts

const trpcClient = (0,dist/* createTRPCProxyClient */.K5)({
    links: [
        (0,dist/* httpBatchLink */.N8)({
            url: `${"https://api.fungeek.net"}/trpc`
        })
    ]
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next-auth@4.23.1_next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next-auth/index.js
var next_auth = __webpack_require__(87126);
var next_auth_default = /*#__PURE__*/__webpack_require__.n(next_auth);
// EXTERNAL MODULE: ./node_modules/.pnpm/next-auth@4.23.1_next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next-auth/providers/credentials.js
var credentials = __webpack_require__(12866);
;// CONCATENATED MODULE: ./app/api/auth/[...nextauth]/route.ts



const authOptions = {
    debug: true,
    providers: [
        (0,credentials/* default */.Z)({
            name: "Credentials",
            credentials: {
                login: {
                    label: "Login",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials, req) {
                console.log("credentials", credentials);
                if (typeof credentials !== "undefined") {
                    const { login, password } = credentials;
                    const res = await trpcClient.users.login.mutate({
                        login,
                        password
                    });
                    console.log("res", res);
                    if (typeof res !== "undefined") {
                        return {
                            ...res.data,
                            accessToken: res.accessToken,
                            refreshToken: res.refreshToken,
                            rights: res.rights
                        };
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    }
};
const handler = next_auth_default()(authOptions);


;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Froot%2Fprojects%2Ftrpc-mono%2Ffrontend%2Fapp&appPaths=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/auth/[...nextauth]/route",
        pathname: "/api/auth/[...nextauth]",
        filename: "route",
        bundlePath: "app/api/auth/[...nextauth]/route"
    },
    resolvedPagePath: "/root/projects/trpc-mono/frontend/app/api/auth/[...nextauth]/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/auth/[...nextauth]/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [654,207], () => (__webpack_exec__(34971)));
module.exports = __webpack_exports__;

})();