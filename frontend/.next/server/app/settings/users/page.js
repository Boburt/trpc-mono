(() => {
var exports = {};
exports.id = 968;
exports.ids = [968];
exports.modules = {

/***/ 18038:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 98704:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-dom/server-rendering-stub");

/***/ }),

/***/ 97897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react-server-dom-webpack/client");

/***/ }),

/***/ 56786:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 5868:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/app-render");

/***/ }),

/***/ 41844:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/get-segment-param");

/***/ }),

/***/ 96624:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/helpers/interception-routes");

/***/ }),

/***/ 75281:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/future/route-modules/route-module");

/***/ }),

/***/ 57085:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context");

/***/ }),

/***/ 20199:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hash");

/***/ }),

/***/ 39569:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/hooks-client-context");

/***/ }),

/***/ 30893:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix");

/***/ }),

/***/ 17887:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/handle-smooth-scroll");

/***/ }),

/***/ 98735:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot");

/***/ }),

/***/ 68231:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path");

/***/ }),

/***/ 54614:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix");

/***/ }),

/***/ 53750:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash");

/***/ }),

/***/ 79618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/server-inserted-html");

/***/ }),

/***/ 86545:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(78160);
/* harmony import */ var next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36500);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14893);
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15062);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
// @ts-ignore this need to be imported from next/dist to be external


const AppPageRouteModule = next_dist_server_future_route_modules_app_page_module__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule;
// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: [
        'settings',
        {
        children: [
        'users',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 50396)), "/root/projects/trpc-mono/frontend/app/settings/users/page.tsx"],
          
        }]
      },
        {
          
          
        }
      ]
      },
        {
          
          
        }
      ]
      },
        {
          'layout': [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 82202)), "/root/projects/trpc-mono/frontend/app/layout.tsx"],
          
        }
      ]
      }.children;
const pages = ["/root/projects/trpc-mono/frontend/app/settings/users/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/settings/users/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/settings/users/page",
        pathname: "/settings/users",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ 3353:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 65122))

/***/ }),

/***/ 65122:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ UsersListPage)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/.pnpm/@tanstack+react-table@8.9.3_react-dom@18.2.0_react@18.2.0/node_modules/@tanstack/react-table/build/lib/index.mjs
var lib = __webpack_require__(85346);
// EXTERNAL MODULE: ./node_modules/.pnpm/@tanstack+table-core@8.9.3/node_modules/@tanstack/table-core/build/lib/index.mjs
var build_lib = __webpack_require__(20676);
// EXTERNAL MODULE: ./components/ui/table.tsx
var ui_table = __webpack_require__(1949);
// EXTERNAL MODULE: ./components/ui/button.tsx
var ui_button = __webpack_require__(95593);
// EXTERNAL MODULE: ./utils/trpc.ts
var trpc = __webpack_require__(99805);
;// CONCATENATED MODULE: ./store/api/users.ts

function useUsersQuery(filter) {
    return trpc/* trpc */.S.users.list.useQuery(filter);
}
function useUsersCreate(options) {
    const utils = trpc/* trpc */.S.useContext();
    return trpc/* trpc */.S.users.add.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.users.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}
function useUsersUpdate(options) {
    const utils = trpc/* trpc */.S.useContext();
    return trpc/* trpc */.S.users.renew.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.users.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./components/ui/select.tsx
var ui_select = __webpack_require__(44341);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-icons@1.3.0_react@18.2.0/node_modules/@radix-ui/react-icons/dist/react-icons.cjs.production.min.js
var react_icons_cjs_production_min = __webpack_require__(73835);
;// CONCATENATED MODULE: ./app/settings/users/data-table.tsx
/* __next_internal_client_entry_do_not_use__ DataTable auto */ 







function DataTable({ columns }) {
    const [{ pageIndex, pageSize }, setPagination] = (0,react_.useState)({
        pageIndex: 0,
        pageSize: 10
    });
    const { data, isLoading } = useUsersQuery({
        take: pageSize,
        skip: pageIndex * pageSize
    });
    const defaultData = (0,react_.useMemo)(()=>[], []);
    const pagination = (0,react_.useMemo)(()=>({
            pageIndex,
            pageSize
        }), [
        pageIndex,
        pageSize
    ]);
    const table = (0,lib/* useReactTable */.b7)({
        data: data?.items ?? defaultData,
        columns,
        pageCount: data?.meta?.pageCount ?? -1,
        state: {
            pagination
        },
        onPaginationChange: setPagination,
        getCoreRowModel: (0,build_lib/* getCoreRowModel */.sC)(),
        manualPagination: true,
        getPaginationRowModel: (0,build_lib/* getPaginationRowModel */.G_)()
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "rounded-md border",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_table/* Table */.iA, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableHeader */.xD, {
                            children: table.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
                                    children: headerGroup.headers.map((header)=>{
                                        return /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableHead */.ss, {
                                            children: header.isPlaceholder ? null : (0,lib/* flexRender */.ie)(header.column.columnDef.header, header.getContext())
                                        }, header.id);
                                    })
                                }, headerGroup.id))
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableBody */.RM, {
                            children: isLoading ? /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableCell */.pj, {
                                    colSpan: columns.length,
                                    className: "h-24 text-center relative",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        role: "status",
                                        className: "absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("svg", {
                                                "aria-hidden": "true",
                                                className: "w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                                                viewBox: "0 0 100 101",
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                                                        fill: "currentColor"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                        d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                                                        fill: "currentFill"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "sr-only",
                                                children: "Loading..."
                                            })
                                        ]
                                    })
                                })
                            }) : table.getRowModel().rows?.length ? table.getRowModel().rows.map((row)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
                                    "data-state": row.getIsSelected() && "selected",
                                    children: row.getVisibleCells().map((cell)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableCell */.pj, {
                                            children: (0,lib/* flexRender */.ie)(cell.column.columnDef.cell, cell.getContext())
                                        }, cell.id))
                                }, row.id)) : /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableCell */.pj, {
                                    colSpan: columns.length,
                                    className: "h-24 text-center",
                                    children: "No results."
                                })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "h-2"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center justify-between px-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex-1 text-sm text-muted-foreground"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center space-x-6 lg:space-x-8",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm font-medium",
                                    children: "Rows per page"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_select/* Select */.Ph, {
                                    value: `${table.getState().pagination.pageSize}`,
                                    onValueChange: (value)=>{
                                        table.setPageSize(Number(value));
                                    },
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectTrigger */.i4, {
                                            className: "h-8 w-[70px]",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectValue */.ki, {
                                                placeholder: table.getState().pagination.pageSize
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectContent */.Bw, {
                                            side: "top",
                                            children: [
                                                10,
                                                20,
                                                30,
                                                40,
                                                50
                                            ].map((pageSize)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectItem */.Ql, {
                                                    value: `${pageSize}`,
                                                    children: pageSize
                                                }, pageSize))
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex w-[100px] items-center justify-center text-sm font-medium",
                        children: [
                            "Page ",
                            table.getState().pagination.pageIndex + 1,
                            " of",
                            " ",
                            table.getPageCount()
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                variant: "outline",
                                className: "hidden h-8 w-8 p-0 lg:flex",
                                onClick: ()=>table.setPageIndex(0),
                                disabled: !table.getCanPreviousPage(),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "sr-only",
                                        children: "Go to first page"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_icons_cjs_production_min/* DoubleArrowLeftIcon */.kRt, {
                                        className: "h-4 w-4"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                variant: "outline",
                                className: "h-8 w-8 p-0",
                                onClick: ()=>table.previousPage(),
                                disabled: !table.getCanPreviousPage(),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "sr-only",
                                        children: "Go to previous page"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_icons_cjs_production_min/* ChevronLeftIcon */.wyc, {
                                        className: "h-4 w-4"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                variant: "outline",
                                className: "h-8 w-8 p-0",
                                onClick: ()=>table.nextPage(),
                                disabled: !table.getCanNextPage(),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "sr-only",
                                        children: "Go to next page"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_icons_cjs_production_min/* ChevronRightIcon */.XCv, {
                                        className: "h-4 w-4"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                variant: "outline",
                                className: "hidden h-8 w-8 p-0 lg:flex",
                                onClick: ()=>table.setPageIndex(table.getPageCount() - 1),
                                disabled: !table.getCanNextPage(),
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "sr-only",
                                        children: "Go to last page"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(react_icons_cjs_production_min/* DoubleArrowRightIcon */.yr4, {
                                        className: "h-4 w-4"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/pen.mjs
var pen = __webpack_require__(19362);
// EXTERNAL MODULE: ./node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs
var dist = __webpack_require__(75237);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(47805);
;// CONCATENATED MODULE: ./components/ui/badge.tsx




const badgeVariants = (0,dist/* cva */.j)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            success: "border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (0,utils.cn)(badgeVariants({
            variant
        }), className),
        ...props
    });
}


;// CONCATENATED MODULE: ./app/settings/users/columns.tsx
/* __next_internal_client_entry_do_not_use__ usersColumns auto */ 



const usersColumns = [
    {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row })=>{
            const record = row.original;
            return /*#__PURE__*/ jsx_runtime_.jsx(Badge, {
                variant: record.status === "active" ? "success" : "destructive",
                children: record.status
            });
        }
    },
    {
        accessorKey: "login",
        header: "Логин"
    },
    {
        accessorKey: "first_name",
        header: "Имя"
    },
    {
        accessorKey: "last_name",
        header: "Фамилия"
    },
    {
        id: "actions",
        cell: ({ row })=>{
            const record = row.original;
            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex items-center space-x-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                    variant: "outline",
                    size: "sm",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(pen/* default */.Z, {
                        className: "h-4 w-4"
                    })
                })
            });
        }
    }
];

// EXTERNAL MODULE: ./components/ui/sheet.tsx
var sheet = __webpack_require__(65370);
// EXTERNAL MODULE: ./components/ui/form.tsx + 1 modules
var ui_form = __webpack_require__(77881);
// EXTERNAL MODULE: ./components/ui/input.tsx
var input = __webpack_require__(47981);
// EXTERNAL MODULE: ./node_modules/.pnpm/@hookform+resolvers@3.2.0_react-hook-form@7.45.4/node_modules/@hookform/resolvers/zod/dist/zod.mjs + 1 modules
var zod = __webpack_require__(46978);
// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/loader-2.mjs
var loader_2 = __webpack_require__(12304);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-hook-form@7.45.4_react@18.2.0/node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(45646);
// EXTERNAL MODULE: ./components/ui/use-toast.ts
var use_toast = __webpack_require__(43773);
// EXTERNAL MODULE: ../backend/src/lib/zod/index.ts
var lib_zod = __webpack_require__(6852);
;// CONCATENATED MODULE: ./app/settings/users/form.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 













function UsersForm({ children, recordId }) {
    const { toast } = (0,use_toast/* useToast */.pm)();
    const [open, setOpen] = (0,react_.useState)(false);
    const [changedRoleId, setChangedRoleId] = (0,react_.useState)(null);
    const form = (0,index_esm/* useForm */.cI)({
        resolver: (0,zod/* zodResolver */.F)(lib_zod/* usersCreateInputSchema */.d9A),
        defaultValues: {
            status: "active",
            login: ""
        }
    });
    const closeForm = ()=>{
        form.reset();
        setOpen(false);
    };
    const onAddSuccess = (actionText, successData)=>{
        toast({
            title: "Success",
            description: `User ${actionText}`,
            duration: 5000
        });
        assignRole(successData);
    };
    const onError = (error)=>{
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
            duration: 5000
        });
    };
    const { mutateAsync: createUser, isLoading: isAddLoading, data, error } = useUsersCreate({
        onSuccess: (data)=>onAddSuccess("added", data),
        onError
    });
    const { mutateAsync: updateUser, isLoading: isUpdateLoading, error: updateError } = useUsersUpdate({
        onSuccess: (data)=>onAddSuccess("updated", data),
        onError
    });
    const { mutateAsync: asyncAssignRole } = trpc/* trpc */.S.users.assignRole.useMutation({
        onSuccess: ()=>closeForm(),
        onError
    });
    // const { data: record, isLoading: isRecordLoading } = trpc.users.one.useQuery(
    //   {
    //     where: { id: recordId },
    //   },
    //   {
    //     enabled: !!recordId && open,
    //     refetchOnMountOrArgChange: true,
    //   }
    // );
    const [{ data: record, isLoading: isRecordLoading }, { data: rolesData, isLoading: isRolesLoading }, { data: userRolesData, isLoading: isUserRolesLoading }] = trpc/* trpc */.S.useQueries((t)=>[
            t.users.one({
                where: {
                    id: recordId
                }
            }, {
                enabled: !!recordId && open,
                refetchOnMountOrArgChange: true
            }),
            t.roles.list({}, {
                enabled: open,
                refetchOnMountOrArgChange: true
            }),
            t.users_roles.list({
                where: {
                    user_id: {
                        equals: recordId
                    }
                }
            }, {
                enabled: !!recordId && open,
                refetchOnMountOrArgChange: true
            })
        ]);
    const userRoleId = (0,react_.useMemo)(()=>{
        return userRolesData?.items[0].role_id;
    }, [
        userRolesData
    ]);
    const assignRole = (0,react_.useCallback)(async (recordData)=>{
        if (!userRoleId || userRoleId != changedRoleId) {
            let userId = recordData?.id;
            if (recordId) {
                userId = recordId;
            }
            await asyncAssignRole({
                user_id: userId,
                role_id: changedRoleId
            });
        }
        return closeForm();
    }, [
        changedRoleId,
        userRoleId,
        recordId
    ]);
    const isLoading = (0,react_.useMemo)(()=>{
        return isAddLoading || isUpdateLoading || isRolesLoading;
    }, [
        isAddLoading,
        isUpdateLoading,
        isRolesLoading
    ]);
    (0,react_.useEffect)(()=>{
        if (record) {
            form.setValue(Object.keys(record).map((key)=>({
                    name: key,
                    value: record[key]
                })));
        }
        return ()=>{
            form.reset();
        };
    }, [
        record,
        open
    ]);
    async function onSubmit(values) {
        if (recordId) {
            updateUser({
                data: values,
                where: {
                    id: recordId
                }
            });
        } else {
            createUser({
                data: values
            });
        }
    }
    const beforeOpen = async (open)=>{
        if (open) {
            // Do something before the sheet opens.
            setOpen(true);
            if (recordId) {
            // const record = await trpc.permissions.one.query({ id: recordId });
            // form.setValue("active", record.active);
            // form.setValue("slug", record.slug);
            // form.setValue("description", record.description);
            }
        } else {
            setOpen(false);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* Sheet */.yo, {
        onOpenChange: beforeOpen,
        open: open,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(sheet/* SheetTrigger */.aM, {
                asChild: true,
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(sheet/* SheetContent */.ue, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* SheetHeader */.Tu, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* SheetTitle */.bC, {
                            children: [
                                recordId ? "Edit" : "Add",
                                " User"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* Form */.l0, {
                            ...form,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                onSubmit: form.handleSubmit(onSubmit),
                                className: "space-y-8",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "status",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Статус"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_select/* Select */.Ph, {
                                                        onValueChange: field.onChange,
                                                        defaultValue: field.value,
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectTrigger */.i4, {
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectValue */.ki, {})
                                                                })
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectContent */.Bw, {
                                                                children: lib_zod/* user_statusSchema */.mol.options.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectItem */.Ql, {
                                                                        value: item,
                                                                        children: item
                                                                    }, item))
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "login",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Логин"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(input/* Input */.I, {
                                                                ...field
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "password",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Пароль"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(input/* Input */.I, {
                                                                ...field
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                children: "Роль"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_select/* Select */.Ph, {
                                                onValueChange: setChangedRoleId,
                                                defaultValue: userRoleId,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectTrigger */.i4, {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectValue */.ki, {})
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectContent */.Bw, {
                                                        children: rolesData?.items.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(ui_select/* SelectItem */.Ql, {
                                                                value: item.id,
                                                                children: item.name
                                                            }, item.id))
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "first_name",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Имя"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(input/* Input */.I, {
                                                                ...field
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "last_name",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Фамилия"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(input/* Input */.I, {
                                                                ...field
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                        type: "submit",
                                        disabled: isLoading,
                                        children: [
                                            isLoading && /*#__PURE__*/ jsx_runtime_.jsx(loader_2/* default */.Z, {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }),
                                            "Submit"
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/plus.mjs
var plus = __webpack_require__(98041);
;// CONCATENATED MODULE: ./app/settings/users/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





function UsersListPage() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        className: "text-3xl font-bold tracking-tight",
                        children: "Users List"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center space-x-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(UsersForm, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(plus/* default */.Z, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    " Create User"
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "py-10",
                children: /*#__PURE__*/ jsx_runtime_.jsx(DataTable, {
                    columns: usersColumns
                })
            })
        ]
    });
}


/***/ }),

/***/ 50396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31013);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/root/projects/trpc-mono/frontend/app/settings/users/page.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [654,365,687,3,245], () => (__webpack_exec__(86545)));
module.exports = __webpack_exports__;

})();