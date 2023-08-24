"use strict";
exports.id = 607;
exports.ids = [607];
exports.modules = {

/***/ 23813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ DeleteButton)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./components/ui/button.tsx
var ui_button = __webpack_require__(95593);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-popover@1.0.6_@types+react-dom@18.2.7_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-popover/dist/index.mjs
var dist = __webpack_require__(99010);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(47805);
;// CONCATENATED MODULE: ./components/ui/popover.tsx
/* __next_internal_client_entry_do_not_use__ Popover,PopoverTrigger,PopoverContent,PopoverClose auto */ 



const Popover = dist/* Root */.fC;
const PopoverClose = dist/* Close */.x8;
const PopoverTrigger = dist/* Trigger */.xz;
const PopoverContent = /*#__PURE__*/ react_.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Portal */.h_, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(dist/* Content */.VY, {
            ref: ref,
            align: align,
            sideOffset: sideOffset,
            className: (0,utils.cn)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        })
    }));
PopoverContent.displayName = dist/* Content */.VY.displayName;


// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/trash-2.mjs
var trash_2 = __webpack_require__(75944);
;// CONCATENATED MODULE: ./components/ui/delete-button.tsx




function DeleteButton({ recordId, deleteRecord }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Popover, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(PopoverTrigger, {
                asChild: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                    variant: "destructive",
                    size: "sm",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(trash_2/* default */.Z, {
                        className: "h-4 w-4"
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(PopoverContent, {
                className: "w-80",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "grid gap-4",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                    className: "font-medium leading-none text-center",
                                    children: "Удалить"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm text-muted-foreground text-center",
                                    children: "Вы действительно хотите удалить эту запись?"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "space-x-3 mx-auto",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                                    variant: "destructive",
                                    size: "sm",
                                    onClick: ()=>{
                                        deleteRecord({
                                            where: {
                                                id: recordId
                                            }
                                        });
                                    },
                                    children: "Удалить"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(PopoverClose, {
                                    "aria-label": "Close",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(ui_button/* Button */.z, {
                                        variant: "secondary",
                                        size: "sm",
                                        children: "Отмена"
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 89110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66479);
/* harmony import */ var _frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47805);
/* __next_internal_client_entry_do_not_use__ Switch auto */ 



const Switch = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC, {
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
        ...props,
        ref: ref,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Thumb */ .bU, {
            className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")
        })
    }));
Switch.displayName = _radix_ui_react_switch__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC.displayName;



/***/ })

};
;