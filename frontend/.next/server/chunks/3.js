exports.id = 3;
exports.ids = [3];
exports.modules = {

/***/ 34774:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2098, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 25813, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 63542, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 1062, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 83323, 23))

/***/ }),

/***/ 35765:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 36816));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 59257));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 264));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 56072));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7534));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 49359));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 71760))

/***/ }),

/***/ 59257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NavigationMenuDemo: () => (/* binding */ NavigationMenuDemo)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(47805);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-navigation-menu@1.1.3_@types+react-dom@18.2.7_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-navigation-menu/dist/index.mjs
var dist = __webpack_require__(54702);
// EXTERNAL MODULE: ./node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs
var class_variance_authority_dist = __webpack_require__(75237);
// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
var chevron_down = __webpack_require__(73237);
;// CONCATENATED MODULE: ./components/ui/navigation-menu.tsx






const NavigationMenu = /*#__PURE__*/ react_.forwardRef(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(dist/* Root */.fC, {
        ref: ref,
        className: (0,utils.cn)("relative z-10 flex max-w-max flex-1 items-center justify-center", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenuViewport, {})
        ]
    }));
NavigationMenu.displayName = dist/* Root */.fC.displayName;
const NavigationMenuList = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* List */.aV, {
        ref: ref,
        className: (0,utils.cn)("group flex flex-1 list-none items-center justify-center space-x-1", className),
        ...props
    }));
NavigationMenuList.displayName = dist/* List */.aV.displayName;
const NavigationMenuItem = dist/* Item */.ck;
const navigationMenuTriggerStyle = (0,class_variance_authority_dist/* cva */.j)("group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50");
const NavigationMenuTrigger = /*#__PURE__*/ react_.forwardRef(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(dist/* Trigger */.xz, {
        ref: ref,
        className: (0,utils.cn)(navigationMenuTriggerStyle(), "group", className),
        ...props,
        children: [
            children,
            " ",
            /*#__PURE__*/ jsx_runtime_.jsx(chevron_down/* default */.Z, {
                className: "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180",
                "aria-hidden": "true"
            })
        ]
    }));
NavigationMenuTrigger.displayName = dist/* Trigger */.xz.displayName;
const NavigationMenuContent = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Content */.VY, {
        ref: ref,
        className: (0,utils.cn)("left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ", className),
        ...props
    }));
NavigationMenuContent.displayName = dist/* Content */.VY.displayName;
const NavigationMenuLink = dist/* Link */.rU;
const NavigationMenuViewport = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (0,utils.cn)("absolute left-0 top-full flex justify-center"),
        children: /*#__PURE__*/ jsx_runtime_.jsx(dist/* Viewport */.l_, {
            className: (0,utils.cn)("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]", className),
            ref: ref,
            ...props
        })
    }));
NavigationMenuViewport.displayName = dist/* Viewport */.l_.displayName;
const NavigationMenuIndicator = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Indicator */.z$, {
        ref: ref,
        className: (0,utils.cn)("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in", className),
        ...props,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"
        })
    }));
NavigationMenuIndicator.displayName = dist/* Indicator */.z$.displayName;


;// CONCATENATED MODULE: ./components/layout/main-nav.tsx
/* __next_internal_client_entry_do_not_use__ NavigationMenuDemo auto */ 



const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response."
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link."
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content."
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time."
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    }
];
const settingsMenu = [
    {
        title: "Разрешения",
        href: "/settings/permissions"
    },
    {
        title: "Роли",
        href: "/settings/roles"
    },
    {
        title: "Пользователи",
        href: "/settings/users"
    }
];
function NavigationMenuDemo() {
    return /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenu, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenuList, {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(NavigationMenuItem, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenuTrigger, {
                        children: "Настройки"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenuContent, {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                            className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ",
                            children: settingsMenu.map((component)=>/*#__PURE__*/ jsx_runtime_.jsx(ListItem, {
                                    title: component.title,
                                    href: component.href
                                }, component.title))
                        })
                    })
                ]
            })
        })
    });
}
const ListItem = /*#__PURE__*/ react_.forwardRef(({ className, title, children, ...props }, ref)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/ jsx_runtime_.jsx(NavigationMenuLink, {
            asChild: true,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                ref: ref,
                className: (0,utils.cn)("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className),
                ...props,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "text-sm font-medium leading-none",
                        children: title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "line-clamp-2 text-sm leading-snug text-muted-foreground",
                        children: children
                    })
                ]
            })
        })
    });
});
ListItem.displayName = "ListItem";


/***/ }),

/***/ 264:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModeToggle: () => (/* binding */ ModeToggle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var modularize_import_loader_name_Moon_from_default_as_default_join_icons_moon_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83885);
/* harmony import */ var modularize_import_loader_name_Sun_from_default_as_default_join_icons_sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57419);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61675);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(95593);
/* harmony import */ var _components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7534);
/* __next_internal_client_entry_do_not_use__ ModeToggle auto */ 






function ModeToggle() {
    const { setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_2__/* .useTheme */ .F)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenu, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenuTrigger, {
                asChild: true,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__/* .Button */ .z, {
                    variant: "outline",
                    size: "icon",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_Sun_from_default_as_default_join_icons_sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                            className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_Moon_from_default_as_default_join_icons_moon_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "sr-only",
                            children: "Toggle theme"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenuContent, {
                align: "end",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenuItem, {
                        onClick: ()=>setTheme("light"),
                        children: "Light"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenuItem, {
                        onClick: ()=>setTheme("dark"),
                        children: "Dark"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ui_dropdown_menu__WEBPACK_IMPORTED_MODULE_4__.DropdownMenuItem, {
                        onClick: ()=>setTheme("system"),
                        children: "System"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 49359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61675);
/* __next_internal_client_entry_do_not_use__ ThemeProvider auto */ 


function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_themes__WEBPACK_IMPORTED_MODULE_2__/* .ThemeProvider */ .f, {
        ...props,
        children: children
    });
}


/***/ }),

/***/ 56072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Avatar: () => (/* binding */ Avatar),
/* harmony export */   AvatarFallback: () => (/* binding */ AvatarFallback),
/* harmony export */   AvatarImage: () => (/* binding */ AvatarImage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11854);
/* harmony import */ var _frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47805);
/* __next_internal_client_entry_do_not_use__ Avatar,AvatarImage,AvatarFallback auto */ 



const Avatar = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }));
Avatar.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC.displayName;
const AvatarImage = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Image */ .Ee, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("aspect-square h-full w-full", className),
        ...props
    }));
AvatarImage.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Image */ .Ee.displayName;
const AvatarFallback = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Fallback */ .NY, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
        ...props
    }));
AvatarFallback.displayName = _radix_ui_react_avatar__WEBPACK_IMPORTED_MODULE_2__/* .Fallback */ .NY.displayName;



/***/ }),

/***/ 95593:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ Button)
/* harmony export */ });
/* unused harmony export buttonVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18923);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75237);
/* harmony import */ var _frontend_lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(47805);





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__/* .Slot */ .g7 : "button";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Comp, {
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";



/***/ }),

/***/ 7534:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownMenu: () => (/* binding */ DropdownMenu),
/* harmony export */   DropdownMenuCheckboxItem: () => (/* binding */ DropdownMenuCheckboxItem),
/* harmony export */   DropdownMenuContent: () => (/* binding */ DropdownMenuContent),
/* harmony export */   DropdownMenuGroup: () => (/* binding */ DropdownMenuGroup),
/* harmony export */   DropdownMenuItem: () => (/* binding */ DropdownMenuItem),
/* harmony export */   DropdownMenuLabel: () => (/* binding */ DropdownMenuLabel),
/* harmony export */   DropdownMenuPortal: () => (/* binding */ DropdownMenuPortal),
/* harmony export */   DropdownMenuRadioGroup: () => (/* binding */ DropdownMenuRadioGroup),
/* harmony export */   DropdownMenuRadioItem: () => (/* binding */ DropdownMenuRadioItem),
/* harmony export */   DropdownMenuSeparator: () => (/* binding */ DropdownMenuSeparator),
/* harmony export */   DropdownMenuShortcut: () => (/* binding */ DropdownMenuShortcut),
/* harmony export */   DropdownMenuSub: () => (/* binding */ DropdownMenuSub),
/* harmony export */   DropdownMenuSubContent: () => (/* binding */ DropdownMenuSubContent),
/* harmony export */   DropdownMenuSubTrigger: () => (/* binding */ DropdownMenuSubTrigger),
/* harmony export */   DropdownMenuTrigger: () => (/* binding */ DropdownMenuTrigger)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63005);
/* harmony import */ var modularize_import_loader_name_Check_from_default_as_default_join_icons_check_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44373);
/* harmony import */ var modularize_import_loader_name_ChevronRight_from_default_as_default_join_icons_chevron_right_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79149);
/* harmony import */ var modularize_import_loader_name_Circle_from_default_as_default_join_icons_circle_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70133);
/* harmony import */ var _frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47805);
/* __next_internal_client_entry_do_not_use__ DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuGroup,DropdownMenuPortal,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuRadioGroup auto */ 






const DropdownMenu = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .fC;
const DropdownMenuTrigger = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .xz;
const DropdownMenuGroup = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Group */ .ZA;
const DropdownMenuPortal = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .Uv;
const DropdownMenuSub = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Sub */ .Tr;
const DropdownMenuRadioGroup = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioGroup */ .Ee;
const DropdownMenuSubTrigger = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubTrigger */ .fF, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_ChevronRight_from_default_as_default_join_icons_chevron_right_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                className: "ml-auto h-4 w-4"
            })
        ]
    }));
DropdownMenuSubTrigger.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubTrigger */ .fF.displayName;
const DropdownMenuSubContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubContent */ .tu, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
        ...props
    }));
DropdownMenuSubContent.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .SubContent */ .tu.displayName;
const DropdownMenuContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .Uv, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .VY, {
            ref: ref,
            sideOffset: sideOffset,
            className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        })
    }));
DropdownMenuContent.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .VY.displayName;
const DropdownMenuItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .ck, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className),
        ...props
    }));
DropdownMenuItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Item */ .ck.displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .CheckboxItem */ .oC, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .wU, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_Check_from_default_as_default_join_icons_check_lucide_react__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        className: "h-4 w-4"
                    })
                })
            }),
            children
        ]
    }));
DropdownMenuCheckboxItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .CheckboxItem */ .oC.displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, children, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioItem */ .Rk, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
        ...props,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .ItemIndicator */ .wU, {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(modularize_import_loader_name_Circle_from_default_as_default_join_icons_circle_lucide_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                        className: "h-2 w-2 fill-current"
                    })
                })
            }),
            children
        ]
    }));
DropdownMenuRadioItem.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .RadioItem */ .Rk.displayName;
const DropdownMenuLabel = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, inset, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .__, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
        ...props
    }));
DropdownMenuLabel.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Label */ .__.displayName;
const DropdownMenuSeparator = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .Z0, {
        ref: ref,
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }));
DropdownMenuSeparator.displayName = _radix_ui_react_dropdown_menu__WEBPACK_IMPORTED_MODULE_2__/* .Separator */ .Z0.displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: (0,_frontend_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)("ml-auto text-xs tracking-widest opacity-60", className),
        ...props
    });
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";



/***/ }),

/***/ 71760:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Toaster: () => (/* binding */ Toaster)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-toast@1.1.4_@types+react-dom@18.2.7_@types+react@18.2.20_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-toast/dist/index.mjs
var dist = __webpack_require__(22224);
// EXTERNAL MODULE: ./node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs
var class_variance_authority_dist = __webpack_require__(75237);
// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/x.mjs
var x = __webpack_require__(88047);
// EXTERNAL MODULE: ./lib/utils.ts
var utils = __webpack_require__(47805);
;// CONCATENATED MODULE: ./components/ui/toast.tsx






const ToastProvider = dist/* Provider */.zt;
const ToastViewport = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Viewport */.l_, {
        ref: ref,
        className: (0,utils.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
        ...props
    }));
ToastViewport.displayName = dist/* Viewport */.l_.displayName;
const toastVariants = (0,class_variance_authority_dist/* cva */.j)("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
    variants: {
        variant: {
            default: "border bg-background",
            destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Toast = /*#__PURE__*/ react_.forwardRef(({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(dist/* Root */.fC, {
        ref: ref,
        className: (0,utils.cn)(toastVariants({
            variant
        }), className),
        ...props
    });
});
Toast.displayName = dist/* Root */.fC.displayName;
const ToastAction = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Action */.aU, {
        ref: ref,
        className: (0,utils.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
        ...props
    }));
ToastAction.displayName = dist/* Action */.aU.displayName;
const ToastClose = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Close */.x8, {
        ref: ref,
        className: (0,utils.cn)("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ jsx_runtime_.jsx(x/* default */.Z, {
            className: "h-4 w-4"
        })
    }));
ToastClose.displayName = dist/* Close */.x8.displayName;
const ToastTitle = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Title */.Dx, {
        ref: ref,
        className: (0,utils.cn)("text-sm font-semibold", className),
        ...props
    }));
ToastTitle.displayName = dist/* Title */.Dx.displayName;
const ToastDescription = /*#__PURE__*/ react_.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ jsx_runtime_.jsx(dist/* Description */.dk, {
        ref: ref,
        className: (0,utils.cn)("text-sm opacity-90", className),
        ...props
    }));
ToastDescription.displayName = dist/* Description */.dk.displayName;


// EXTERNAL MODULE: ./components/ui/use-toast.ts
var use_toast = __webpack_require__(43773);
;// CONCATENATED MODULE: ./components/ui/toaster.tsx
/* __next_internal_client_entry_do_not_use__ Toaster auto */ 


function Toaster() {
    const { toasts } = (0,use_toast/* useToast */.pm)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ToastProvider, {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Toast, {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ jsx_runtime_.jsx(ToastTitle, {
                                    children: title
                                }),
                                description && /*#__PURE__*/ jsx_runtime_.jsx(ToastDescription, {
                                    children: description
                                })
                            ]
                        }),
                        action,
                        /*#__PURE__*/ jsx_runtime_.jsx(ToastClose, {})
                    ]
                }, id);
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(ToastViewport, {})
        ]
    });
}


/***/ }),

/***/ 43773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pm: () => (/* binding */ useToast)
/* harmony export */ });
/* unused harmony exports reducer, toast */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// Inspired by react-hot-toast library

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(memoryState);
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}



/***/ }),

/***/ 47805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96925);
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56497);


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__/* .twMerge */ .m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__/* .clsx */ .W)(inputs));
}


/***/ }),

/***/ 36816:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Providers: () => (/* binding */ Providers)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75724);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33957);
/* harmony import */ var _frontend_utils_trpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99805);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _trpc_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23598);
/* __next_internal_client_entry_do_not_use__ Providers auto */ 




function Providers({ children }) {
    const [queryClient] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(()=>new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__/* .QueryClient */ .S());
    const [trpcClient] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(()=>_frontend_utils_trpc__WEBPACK_IMPORTED_MODULE_1__/* .trpc */ .S.createClient({
            links: [
                (0,_trpc_client__WEBPACK_IMPORTED_MODULE_3__/* .httpBatchLink */ .N8)({
                    url: `${"https://api.fungeek.net"}/trpc`
                })
            ]
        }));
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_frontend_utils_trpc__WEBPACK_IMPORTED_MODULE_1__/* .trpc */ .S.Provider, {
        client: trpcClient,
        queryClient: queryClient,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__/* .QueryClientProvider */ .aH, {
            client: queryClient,
            children: children
        })
    });
}


/***/ }),

/***/ 99805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ trpc)
/* harmony export */ });
/* harmony import */ var _trpc_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67988);
// import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// import { AppRouter } from "@server/trpc/trpc.router";

const trpc = (0,_trpc_react_query__WEBPACK_IMPORTED_MODULE_0__/* .createTRPCReact */ .ec)(); // import { httpBatchLink } from "@trpc/client";
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


/***/ }),

/***/ 82202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/font/google/target.css?{"path":"app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(50160);
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(71701);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(31013);
;// CONCATENATED MODULE: ./components/theme-provider.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/theme-provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["ThemeProvider"];

;// CONCATENATED MODULE: ./components/layout/main-nav.tsx

const main_nav_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/layout/main-nav.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: main_nav_esModule, $$typeof: main_nav_$$typeof } = main_nav_proxy;
const main_nav_default_ = main_nav_proxy.default;

const main_nav_e0 = main_nav_proxy["NavigationMenuDemo"];

// EXTERNAL MODULE: ./node_modules/.pnpm/lucide-react@0.263.1_react@18.2.0/node_modules/lucide-react/dist/esm/icons/search.mjs + 2 modules
var search = __webpack_require__(40792);
;// CONCATENATED MODULE: ./components/ui/avatar.tsx

const avatar_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/ui/avatar.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: avatar_esModule, $$typeof: avatar_$$typeof } = avatar_proxy;
const avatar_default_ = avatar_proxy.default;

const avatar_e0 = avatar_proxy["Avatar"];

const e1 = avatar_proxy["AvatarImage"];

const e2 = avatar_proxy["AvatarFallback"];

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.13_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(94678);
// EXTERNAL MODULE: ./node_modules/.pnpm/@radix-ui+react-slot@1.0.2_@types+react@18.2.20_react@18.2.0/node_modules/@radix-ui/react-slot/dist/index.mjs + 2 modules
var dist = __webpack_require__(4732);
// EXTERNAL MODULE: ./node_modules/.pnpm/class-variance-authority@0.7.0/node_modules/class-variance-authority/dist/index.mjs
var class_variance_authority_dist = __webpack_require__(54151);
// EXTERNAL MODULE: ./node_modules/.pnpm/clsx@2.0.0/node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(66530);
// EXTERNAL MODULE: ./node_modules/.pnpm/tailwind-merge@1.14.0/node_modules/tailwind-merge/dist/lib/tw-merge.mjs + 10 modules
var tw_merge = __webpack_require__(93520);
;// CONCATENATED MODULE: ./lib/utils.ts


function cn(...inputs) {
    return (0,tw_merge/* twMerge */.m)((0,clsx/* clsx */.W)(inputs));
}

;// CONCATENATED MODULE: ./components/ui/button.tsx





const buttonVariants = (0,class_variance_authority_dist/* cva */.j)("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react_shared_subset.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? dist/* Slot */.g7 : "button";
    return /*#__PURE__*/ jsx_runtime_.jsx(Comp, {
        className: cn(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    });
});
Button.displayName = "Button";


;// CONCATENATED MODULE: ./components/ui/dropdown-menu.tsx

const dropdown_menu_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/ui/dropdown-menu.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: dropdown_menu_esModule, $$typeof: dropdown_menu_$$typeof } = dropdown_menu_proxy;
const dropdown_menu_default_ = dropdown_menu_proxy.default;

const dropdown_menu_e0 = dropdown_menu_proxy["DropdownMenu"];

const dropdown_menu_e1 = dropdown_menu_proxy["DropdownMenuTrigger"];

const dropdown_menu_e2 = dropdown_menu_proxy["DropdownMenuContent"];

const e3 = dropdown_menu_proxy["DropdownMenuItem"];

const e4 = dropdown_menu_proxy["DropdownMenuCheckboxItem"];

const e5 = dropdown_menu_proxy["DropdownMenuRadioItem"];

const e6 = dropdown_menu_proxy["DropdownMenuLabel"];

const e7 = dropdown_menu_proxy["DropdownMenuSeparator"];

const e8 = dropdown_menu_proxy["DropdownMenuShortcut"];

const e9 = dropdown_menu_proxy["DropdownMenuGroup"];

const e10 = dropdown_menu_proxy["DropdownMenuPortal"];

const e11 = dropdown_menu_proxy["DropdownMenuSub"];

const e12 = dropdown_menu_proxy["DropdownMenuSubContent"];

const e13 = dropdown_menu_proxy["DropdownMenuSubTrigger"];

const e14 = dropdown_menu_proxy["DropdownMenuRadioGroup"];

;// CONCATENATED MODULE: ./components/layout/user-nav.tsx




function UserNav() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(dropdown_menu_e0, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(dropdown_menu_e1, {
                asChild: true,
                children: /*#__PURE__*/ jsx_runtime_.jsx(Button, {
                    variant: "ghost",
                    className: "relative h-8 w-8 rounded-full",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(avatar_e0, {
                        className: "h-8 w-8",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(e1, {
                                src: "/avatars/01.png",
                                alt: "@shadcn"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(e2, {
                                children: "SC"
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(dropdown_menu_e2, {
                className: "w-56",
                align: "end",
                forceMount: true,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(e6, {
                        className: "font-normal",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex flex-col space-y-1",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm font-medium leading-none",
                                    children: "shadcn"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-xs leading-none text-muted-foreground",
                                    children: "m@example.com"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(e7, {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e9, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e3, {
                                children: [
                                    "Profile",
                                    /*#__PURE__*/ jsx_runtime_.jsx(e8, {
                                        children: "⇧⌘P"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e3, {
                                children: [
                                    "Billing",
                                    /*#__PURE__*/ jsx_runtime_.jsx(e8, {
                                        children: "⌘B"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e3, {
                                children: [
                                    "Settings",
                                    /*#__PURE__*/ jsx_runtime_.jsx(e8, {
                                        children: "⌘S"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(e3, {
                                children: "New Team"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(e7, {}),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e3, {
                        children: [
                            "Log out",
                            /*#__PURE__*/ jsx_runtime_.jsx(e8, {
                                children: "⇧⌘Q"
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./components/layout/mode-toggle.tsx

const mode_toggle_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/layout/mode-toggle.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: mode_toggle_esModule, $$typeof: mode_toggle_$$typeof } = mode_toggle_proxy;
const mode_toggle_default_ = mode_toggle_proxy.default;

const mode_toggle_e0 = mode_toggle_proxy["ModeToggle"];

;// CONCATENATED MODULE: ./components/ui/toaster.tsx

const toaster_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/components/ui/toaster.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: toaster_esModule, $$typeof: toaster_$$typeof } = toaster_proxy;
const toaster_default_ = toaster_proxy.default;

const toaster_e0 = toaster_proxy["Toaster"];

;// CONCATENATED MODULE: ./store/provider.tsx

const provider_proxy = (0,module_proxy.createProxy)(String.raw`/root/projects/trpc-mono/frontend/store/provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: provider_esModule, $$typeof: provider_$$typeof } = provider_proxy;
const provider_default_ = provider_proxy.default;

const provider_e0 = provider_proxy["Providers"];

;// CONCATENATED MODULE: ./app/layout.tsx










const metadata = {
    title: "Dashboard",
    description: "Generated by create next app"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("head", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                className: (layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
                children: /*#__PURE__*/ jsx_runtime_.jsx(provider_e0, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e0, {
                        attribute: "class",
                        defaultTheme: "system",
                        enableSystem: true,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "border-b",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "flex h-16 items-center px-4",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(main_nav_e0, {}),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "ml-auto flex items-center space-x-4",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(search/* default */.Z, {}),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(UserNav, {}),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(mode_toggle_e0, {})
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "mx-4 mt-10 mb-4",
                                        children: children
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(toaster_e0, {})
                        ]
                    })
                })
            })
        ]
    });
}


/***/ }),

/***/ 71701:
/***/ (() => {



/***/ })

};
;