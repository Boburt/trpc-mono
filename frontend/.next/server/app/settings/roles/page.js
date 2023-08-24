(() => {
var exports = {};
exports.id = 839;
exports.ids = [839];
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

/***/ 98924:
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
        'roles',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 59628)), "/root/projects/trpc-mono/frontend/app/settings/roles/page.tsx"],
          
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
const pages = ["/root/projects/trpc-mono/frontend/app/settings/roles/page.tsx"];

// @ts-expect-error - replaced by webpack/turbopack loader

const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/settings/roles/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/settings/roles/page",
        pathname: "/settings/roles",
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

/***/ 32074:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 19800))

/***/ }),

/***/ 19800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RolesListPage)
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
var utils_trpc = __webpack_require__(99805);
;// CONCATENATED MODULE: ./store/api/roles.ts

function useRolesQuery(filter) {
    return utils_trpc/* trpc */.S.roles.list.useQuery(filter);
}
function useRolesCreate(options) {
    const utils = utils_trpc/* trpc */.S.useContext();
    return utils_trpc/* trpc */.S.roles.add.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.roles.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}
function useRolesUpdate(options) {
    const utils = utils_trpc/* trpc */.S.useContext();
    return utils_trpc/* trpc */.S.roles.renew.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.roles.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}
function useRolesDestroy(options) {
    const utils = utils_trpc/* trpc */.S.useContext();
    return utils_trpc/* trpc */.S.roles.delete.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.roles.list.invalidate();
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
// EXTERNAL MODULE: ./node_modules/.pnpm/zustand@4.4.1_@types+react@18.2.20_react@18.2.0/node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(54);
;// CONCATENATED MODULE: ./store/states/roles.ts

const useRolesStore = (0,esm/* create */.Ue)((set, get)=>({
        selectedRows: {},
        toggleSelected: (index)=>set((state)=>{
                const selectedRows = {
                    ...state.selectedRows
                };
                if (selectedRows[index]) {
                    return {
                        selectedRows: {}
                    };
                } else {
                    return {
                        selectedRows: {
                            [index]: true
                        }
                    };
                }
            })
    }));

;// CONCATENATED MODULE: ./app/settings/roles/data-table.tsx
/* __next_internal_client_entry_do_not_use__ DataTable auto */ 








function DataTable({ columns }) {
    const rowSelection = useRolesStore((state)=>state.selectedRows);
    const setRowSelection = useRolesStore((state)=>state.toggleSelected);
    const [{ pageIndex, pageSize }, setPagination] = (0,react_.useState)({
        pageIndex: 0,
        pageSize: 10
    });
    const { data, isLoading } = useRolesQuery({
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
            pagination,
            rowSelection
        },
        getRowId: (row)=>row.id,
        enableRowSelection: true,
        // onRowSelectionChange: function (stateUpdater) {
        //   console.log(arguments);
        //   // setRowSelection(stateUpdater)
        // },
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
                                            className: "cursor-pointer",
                                            onClick: ()=>setRowSelection(row.id),
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
// EXTERNAL MODULE: ./components/ui/sheet.tsx
var sheet = __webpack_require__(65370);
// EXTERNAL MODULE: ./components/ui/form.tsx + 1 modules
var ui_form = __webpack_require__(77881);
// EXTERNAL MODULE: ./components/ui/input.tsx
var input = __webpack_require__(47981);
// EXTERNAL MODULE: ./components/ui/switch.tsx
var ui_switch = __webpack_require__(89110);
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
;// CONCATENATED MODULE: ./app/settings/roles/form.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 













function RolesForm({ children, recordId }) {
    const { toast } = (0,use_toast/* useToast */.pm)();
    const [open, setOpen] = (0,react_.useState)(false);
    const form = (0,index_esm/* useForm */.cI)({
        resolver: (0,zod/* zodResolver */.F)(lib_zod/* rolesCreateInputSchema */.HjD),
        defaultValues: {
            active: true,
            name: "",
            code: ""
        }
    });
    const onAddSuccess = (actionText)=>{
        toast({
            title: "Success",
            description: `Role ${actionText}`,
            duration: 5000
        });
        form.reset();
        setOpen(false);
    };
    const onError = (error)=>{
        toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
            duration: 5000
        });
    };
    const { mutateAsync: createRole, isLoading: isAddLoading, data, error } = useRolesCreate({
        onSuccess: ()=>onAddSuccess("added"),
        onError
    });
    const { mutateAsync: updateRole, isLoading: isUpdateLoading, error: updateError } = useRolesUpdate({
        onSuccess: ()=>onAddSuccess("updated"),
        onError
    });
    const { data: record, isLoading: isRecordLoading } = utils_trpc/* trpc */.S.roles.one.useQuery({
        where: {
            id: recordId
        }
    }, {
        enabled: !!recordId && open,
        refetchOnMountOrArgChange: true
    });
    const isLoading = (0,react_.useMemo)(()=>{
        return isAddLoading || isUpdateLoading;
    }, [
        isAddLoading,
        isUpdateLoading
    ]);
    (0,react_.useEffect)(()=>{
        if (record) {
            form.setValue("active", record.active);
            form.setValue("name", record.name);
            form.setValue("code", record.code);
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
            updateRole({
                data: values,
                where: {
                    id: recordId
                }
            });
        } else {
            createRole({
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
                side: "left",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* SheetHeader */.Tu, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* SheetTitle */.bC, {
                            children: [
                                recordId ? "Edit" : "Add",
                                " Role"
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
                                        name: "active",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Активность"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormControl */.NI, {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx(ui_switch/* Switch */.r, {
                                                                checked: field.value,
                                                                onCheckedChange: field.onChange
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormMessage */.zG, {})
                                                ]
                                            })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormField */.Wi, {
                                        control: form.control,
                                        name: "name",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Название"
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
                                        name: "code",
                                        render: ({ field })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_form/* FormItem */.xJ, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(ui_form/* FormLabel */.lX, {
                                                        children: "Код"
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

// EXTERNAL MODULE: ./components/ui/delete-button.tsx + 1 modules
var delete_button = __webpack_require__(23813);
;// CONCATENATED MODULE: ./app/settings/roles/delete-action.tsx



function DeleteAction({ recordId }) {
    const { mutateAsync: deletePermission } = useRolesDestroy({});
    return /*#__PURE__*/ jsx_runtime_.jsx(delete_button/* DeleteButton */.m, {
        recordId: recordId,
        deleteRecord: deletePermission
    });
}

;// CONCATENATED MODULE: ./app/settings/roles/columns.tsx
/* __next_internal_client_entry_do_not_use__ rolesColumns auto */ 





const rolesColumns = [
    {
        accessorKey: "active",
        header: "Активен",
        cell: ({ row })=>{
            const record = row.original;
            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex items-center space-x-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_switch/* Switch */.r, {
                    checked: record.active,
                    readOnly: true
                })
            });
        }
    },
    {
        accessorKey: "name",
        header: "Заголовок"
    },
    {
        accessorKey: "code",
        header: "Код"
    },
    {
        id: "actions",
        cell: ({ row })=>{
            const record = row.original;
            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(RolesForm, {
                        recordId: record.id,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                            variant: "outline",
                            size: "sm",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(pen/* default */.Z, {
                                className: "h-4 w-4"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(DeleteAction, {
                        recordId: record.id
                    })
                ]
            });
        }
    }
];

// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/plus.mjs
var plus = __webpack_require__(98041);
;// CONCATENATED MODULE: ./app/settings/roles/role-permissions-table.tsx
/* __next_internal_client_entry_do_not_use__ RolesPermissionsDataTable auto */ 





function RolesPermissionsDataTable({ columns }) {
    const rowSelection = useRolesStore((state)=>state.selectedRows);
    const selectedRoleId = (0,react_.useMemo)(()=>{
        return Object.keys(rowSelection)[0];
    }, [
        rowSelection
    ]);
    const { data, isLoading } = utils_trpc/* trpc */.S.rolesPermissions.list.useQuery({
        where: {
            role_id: {
                equals: selectedRoleId
            }
        }
    }, {
        enabled: Object.keys(rowSelection).length > 0
    });
    const defaultData = (0,react_.useMemo)(()=>[], []);
    const table = (0,lib/* useReactTable */.b7)({
        data: data ?? defaultData,
        columns,
        // onRowSelectionChange: function (stateUpdater) {
        //   console.log(arguments);
        //   // setRowSelection(stateUpdater)
        // },
        getCoreRowModel: (0,build_lib/* getCoreRowModel */.sC)()
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "space-y-4",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
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
                        children: isLoading && selectedRoleId ? /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
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
        })
    });
}

;// CONCATENATED MODULE: ./app/settings/roles/role-permissions-columns.tsx
/* __next_internal_client_entry_do_not_use__ rolesPermissionsColumns,linkedRolesPermissionsColumns auto */ const rolesPermissionsColumns = [
    {
        accessorKey: "name",
        cell: ({ row })=>{
            const record = row.original;
            return record.permissions.description;
        },
        header: "Заголовок"
    }
];
const linkedRolesPermissionsColumns = [
    {
        accessorKey: "name",
        cell: ({ row })=>{
            const record = row.original;
            return record.description;
        },
        header: "Заголовок"
    }
];

;// CONCATENATED MODULE: ./store/states/role_permissions.ts

const useRolePermissionStore = (0,esm/* create */.Ue)((set, get)=>({
        selectedRows: {},
        setSelectedRows: (selectedRows)=>set((state)=>{
                return {
                    selectedRows
                };
            }),
        addSelection: (index)=>set((state)=>{
                const selectedRows = {
                    ...state.selectedRows
                };
                if (selectedRows[index]) {
                    delete selectedRows[index];
                } else {
                    selectedRows[index] = true;
                }
                return {
                    selectedRows
                };
            })
    }));

;// CONCATENATED MODULE: ./store/api/role_permissions.ts

function useRolePermissionsCreate(options) {
    const utils = trpc.useContext();
    return trpc.rolesPermissions.add.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.rolesPermissions.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}
function useRolePermissionsUpdate(options) {
    const utils = trpc.useContext();
    return trpc.rolesPermissions.renew.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.rolesPermissions.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
}
function useCreateManyRolePermissions(options) {
    const utils = utils_trpc/* trpc */.S.useContext();
    return utils_trpc/* trpc */.S.rolesPermissions.addManyPermissionsForRole.useMutation({
        ...options,
        onSuccess: (post)=>{
            utils.rolesPermissions.list.invalidate();
            options?.onSuccess?.(post);
        }
    });
} // export function useRolePermissionsDestroy(
 //     options: ReactQueryOptions["rolesPermissions"]["delete"]
 //     ) {
 //     const utils = trpc.useContext();
 //     return trpc.rolesPermissions.delete.useMutation({
 //         ...options,
 //         onSuccess: (post) => {
 //         utils.rolesPermissions.list.invalidate();
 //         options?.onSuccess?.(post);
 //         },
 //     });
 // }

;// CONCATENATED MODULE: ./app/settings/roles/role-permissions-form.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 












function RolePermissionsForm({ children }) {
    const { toast } = (0,use_toast/* useToast */.pm)();
    const [open, setOpen] = (0,react_.useState)(false);
    const roleSelection = useRolesStore((state)=>state.selectedRows);
    const rowSelection = useRolePermissionStore((state)=>state.selectedRows);
    const setSelectedRows = useRolePermissionStore((state)=>state.setSelectedRows);
    const addSelection = useRolePermissionStore((state)=>state.addSelection);
    const selectedRoleId = (0,react_.useMemo)(()=>{
        return Object.keys(roleSelection)[0];
    }, [
        roleSelection
    ]);
    const [{ data: selectedPermissions, isLoading: selectedPermissionsLoading }, { data: permissions, isLoading: permissionsLoading }] = utils_trpc/* trpc */.S.useQueries((t)=>[
            t.rolesPermissions.list({
                where: {
                    role_id: {
                        equals: selectedRoleId
                    }
                },
                orderBy: {
                    permissions: {
                        slug: "asc"
                    }
                }
            }, {
                enabled: Object.keys(roleSelection).length > 0 && open
            }),
            t.permissions.list({}, {
                enabled: open
            })
        ]);
    const { mutateAsync: assignPermissions, isLoading: isAddLoading, data, error } = useCreateManyRolePermissions({
        onSuccess: ()=>{
            toast({
                title: "Success",
                description: `Role permissions added`,
                duration: 5000
            });
            setSelectedRows({});
            setOpen(false);
        }
    });
    const isLoading = (0,react_.useMemo)(()=>{
        return selectedPermissionsLoading || permissionsLoading;
    }, [
        selectedPermissionsLoading,
        permissionsLoading
    ]);
    const defaultData = (0,react_.useMemo)(()=>[], []);
    const isSaveLoading = (0,react_.useMemo)(()=>{
        return isLoading || isAddLoading || Object.keys(rowSelection).length === 0;
    }, [
        isAddLoading,
        isLoading,
        rowSelection
    ]);
    const selectedRowsIds = (0,react_.useMemo)(()=>{
        return Object.keys(rowSelection);
    }, [
        rowSelection
    ]);
    const table = (0,lib/* useReactTable */.b7)({
        data: permissions?.items ?? defaultData,
        columns: linkedRolesPermissionsColumns,
        state: {
            rowSelection
        },
        getRowId: (row)=>row.id,
        enableRowSelection: true,
        getCoreRowModel: (0,build_lib/* getCoreRowModel */.sC)(),
        manualPagination: true,
        getPaginationRowModel: (0,build_lib/* getPaginationRowModel */.G_)()
    });
    const beforeOpen = async (open)=>{
        if (open) {
            // Do something before the sheet opens.
            setOpen(true);
        } else {
            setOpen(false);
        }
    };
    (0,react_.useEffect)(()=>{
        if (selectedPermissions) {
            const selectedRows = selectedPermissions.reduce((acc, item)=>{
                acc[item.permission_id] = true;
                return acc;
            }, {});
            setSelectedRows(selectedRows);
        }
    }, [
        selectedPermissions
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* Sheet */.yo, {
        onOpenChange: beforeOpen,
        open: open,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(sheet/* SheetTrigger */.aM, {
                asChild: true,
                children: children
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(sheet/* SheetContent */.ue, {
                side: "right",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(sheet/* SheetHeader */.Tu, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(sheet/* SheetTitle */.bC, {
                            children: "Link Permissions"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "space-y-4 mt-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
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
                                                colSpan: linkedRolesPermissionsColumns.length,
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
                                                        className: "cursor-pointer",
                                                        onClick: ()=>addSelection(row.id),
                                                        children: (0,lib/* flexRender */.ie)(cell.column.columnDef.cell, cell.getContext())
                                                    }, cell.id))
                                            }, row.id)) : /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableRow */.SC, {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(ui_table/* TableCell */.pj, {
                                                colSpan: linkedRolesPermissionsColumns.length,
                                                className: "h-24 text-center",
                                                children: "No results."
                                            })
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex justify-end",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                variant: "default",
                                disabled: isSaveLoading,
                                onClick: ()=>assignPermissions({
                                        role_id: selectedRoleId,
                                        permissions_ids: selectedRowsIds
                                    }),
                                children: [
                                    isSaveLoading && /*#__PURE__*/ jsx_runtime_.jsx(react_icons_cjs_production_min/* ReloadIcon */.BGW, {
                                        className: "mr-2 h-4 w-4 animate-spin"
                                    }),
                                    "Save"
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./app/settings/roles/role-permissions.tsx






function RolePermissions() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        className: "text-3xl font-bold tracking-tight",
                        children: "Permissions List"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center space-x-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(RolePermissionsForm, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(plus/* default */.Z, {
                                        className: "mr-2 h-4 w-4"
                                    }),
                                    " Add Permission"
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "py-10",
                children: /*#__PURE__*/ jsx_runtime_.jsx(RolesPermissionsDataTable, {
                    columns: rolesPermissionsColumns
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./app/settings/roles/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






function RolesListPage() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex space-x-5",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-6/12",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                className: "text-3xl font-bold tracking-tight",
                                children: "Roles List"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex items-center space-x-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(RolesForm, {
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ui_button/* Button */.z, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(plus/* default */.Z, {
                                                className: "mr-2 h-4 w-4"
                                            }),
                                            " Create Role"
                                        ]
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "py-10",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(DataTable, {
                            columns: rolesColumns
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-6/12",
                children: /*#__PURE__*/ jsx_runtime_.jsx(RolePermissions, {})
            })
        ]
    });
}


/***/ }),

/***/ 59628:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31013);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/root/projects/trpc-mono/frontend/app/settings/roles/page.tsx`)

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
var __webpack_exports__ = __webpack_require__.X(0, [654,365,687,815,54,3,245,607], () => (__webpack_exec__(98924)));
module.exports = __webpack_exports__;

})();