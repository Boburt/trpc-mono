(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[839],{5579:function(e,s,t){Promise.resolve().then(t.bind(t,966))},966:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return T}});var n=t(4552),l=t(8243),a=t(3586),i=t(9942),r=t(2963),c=t(2009),d=t(5446),o=t(1208),u=t(77);let x=e=>{let s;let t=new Set,n=(e,n)=>{let l="function"==typeof e?e(s):e;if(!Object.is(l,s)){let e=s;s=(null!=n?n:"object"!=typeof l)?l:Object.assign({},s,l),t.forEach(t=>t(s,e))}},l=()=>s,a={setState:n,getState:l,subscribe:e=>(t.add(e),()=>t.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),t.clear()}};return s=e(n,l,a),a},h=e=>e?x(e):x;var m=t(698);let{useSyncExternalStoreWithSelector:j}=m,g=!1,p=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");let s="function"==typeof e?h(e):e,t=(e,t)=>(function(e,s=e.getState,t){t&&!g&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),g=!0);let n=j(e.subscribe,e.getState,e.getServerState||e.getState,s,t);return(0,d.useDebugValue)(n),n})(s,e,t);return Object.assign(t,s),t},f=e=>e?p(e):p,v=f((e,s)=>({selectedRows:{},toggleSelected:s=>e(e=>({...e.selectedRows})[s]?{selectedRows:{}}:{selectedRows:{[s]:!0}})}));function C(e){var s,t,x,h;let{columns:m}=e,j=v(e=>e.selectedRows),g=v(e=>e.toggleSelected),[{pageIndex:p,pageSize:f},C]=(0,d.useState)({pageIndex:0,pageSize:10}),{data:w,isLoading:b}=c.S.roles.list.useQuery({take:f,skip:p*f}),N=(0,d.useMemo)(()=>[],[]),S=(0,d.useMemo)(()=>({pageIndex:p,pageSize:f}),[p,f]),y=(0,l.b7)({data:null!==(x=null==w?void 0:w.items)&&void 0!==x?x:N,columns:m,pageCount:null!==(h=null==w?void 0:null===(s=w.meta)||void 0===s?void 0:s.pageCount)&&void 0!==h?h:-1,state:{pagination:S,rowSelection:j},getRowId:e=>e.id,enableRowSelection:!0,onPaginationChange:C,getCoreRowModel:(0,a.sC)(),manualPagination:!0,getPaginationRowModel:(0,a.G_)()});return(0,n.jsxs)("div",{className:"space-y-4",children:[(0,n.jsx)("div",{className:"rounded-md border",children:(0,n.jsxs)(i.iA,{children:[(0,n.jsx)(i.xD,{children:y.getHeaderGroups().map(e=>(0,n.jsx)(i.SC,{children:e.headers.map(e=>(0,n.jsx)(i.ss,{children:e.isPlaceholder?null:(0,l.ie)(e.column.columnDef.header,e.getContext())},e.id))},e.id))}),(0,n.jsx)(i.RM,{children:b?(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:m.length,className:"h-24 text-center relative",children:(0,n.jsxs)("div",{role:"status",className:"absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2",children:[(0,n.jsxs)("svg",{"aria-hidden":"true",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),(0,n.jsx)("span",{className:"sr-only",children:"Loading..."})]})})}):(null===(t=y.getRowModel().rows)||void 0===t?void 0:t.length)?y.getRowModel().rows.map(e=>(0,n.jsx)(i.SC,{"data-state":e.getIsSelected()&&"selected",children:e.getVisibleCells().map(s=>(0,n.jsx)(i.pj,{className:"cursor-pointer",onClick:()=>g(e.id),children:(0,l.ie)(s.column.columnDef.cell,s.getContext())},s.id))},e.id)):(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:m.length,className:"h-24 text-center",children:"No results."})})})]})}),(0,n.jsx)("div",{className:"h-2"}),(0,n.jsxs)("div",{className:"flex items-center justify-between px-2",children:[(0,n.jsx)("div",{className:"flex-1 text-sm text-muted-foreground"}),(0,n.jsx)("div",{className:"flex items-center space-x-6 lg:space-x-8",children:(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,n.jsx)("p",{className:"text-sm font-medium",children:"Rows per page"}),(0,n.jsxs)(o.Ph,{value:"".concat(y.getState().pagination.pageSize),onValueChange:e=>{y.setPageSize(Number(e))},children:[(0,n.jsx)(o.i4,{className:"h-8 w-[70px]",children:(0,n.jsx)(o.ki,{placeholder:y.getState().pagination.pageSize})}),(0,n.jsx)(o.Bw,{side:"top",children:[10,20,30,40,50].map(e=>(0,n.jsx)(o.Ql,{value:"".concat(e),children:e},e))})]})]})}),(0,n.jsxs)("div",{className:"flex w-[100px] items-center justify-center text-sm font-medium",children:["Page ",y.getState().pagination.pageIndex+1," of"," ",y.getPageCount()]}),(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,n.jsxs)(r.z,{variant:"outline",className:"hidden h-8 w-8 p-0 lg:flex",onClick:()=>y.setPageIndex(0),disabled:!y.getCanPreviousPage(),children:[(0,n.jsx)("span",{className:"sr-only",children:"Go to first page"}),(0,n.jsx)(u.kRt,{className:"h-4 w-4"})]}),(0,n.jsxs)(r.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>y.previousPage(),disabled:!y.getCanPreviousPage(),children:[(0,n.jsx)("span",{className:"sr-only",children:"Go to previous page"}),(0,n.jsx)(u.wyc,{className:"h-4 w-4"})]}),(0,n.jsxs)(r.z,{variant:"outline",className:"h-8 w-8 p-0",onClick:()=>y.nextPage(),disabled:!y.getCanNextPage(),children:[(0,n.jsx)("span",{className:"sr-only",children:"Go to next page"}),(0,n.jsx)(u.XCv,{className:"h-4 w-4"})]}),(0,n.jsxs)(r.z,{variant:"outline",className:"hidden h-8 w-8 p-0 lg:flex",onClick:()=>y.setPageIndex(y.getPageCount()-1),disabled:!y.getCanNextPage(),children:[(0,n.jsx)("span",{className:"sr-only",children:"Go to last page"}),(0,n.jsx)(u.yr4,{className:"h-4 w-4"})]})]})]})]})}var w=t(2828),b=t(7431),N=t(2183),S=t(3888),y=t(9172),R=t(1684),M=t(567),k=t(1358),P=t(3800),z=t(7793);function E(e){let{children:s,recordId:t}=e,{toast:l}=(0,P.pm)(),[a,i]=(0,d.useState)(!1),o=(0,k.cI)({resolver:(0,R.F)(z.HjD),defaultValues:{active:!0,name:"",code:""}}),u=e=>{l({title:"Success",description:"Role ".concat(e),duration:5e3}),o.reset(),i(!1)},x=e=>{l({title:"Error",description:e.message,variant:"destructive",duration:5e3})},{mutateAsync:h,isLoading:m,data:j,error:g}=function(e){let s=c.S.useContext();return c.S.roles.add.useMutation({...e,onSuccess:t=>{var n;s.roles.list.invalidate(),null==e||null===(n=e.onSuccess)||void 0===n||n.call(e,t)}})}({onSuccess:()=>u("added"),onError:x}),{mutateAsync:p,isLoading:f,error:v}=function(e){let s=c.S.useContext();return c.S.roles.renew.useMutation({...e,onSuccess:t=>{var n;s.roles.list.invalidate(),null==e||null===(n=e.onSuccess)||void 0===n||n.call(e,t)}})}({onSuccess:()=>u("updated"),onError:x}),{data:C,isLoading:w}=c.S.roles.one.useQuery({where:{id:t}},{enabled:!!t&&a,refetchOnMountOrArgChange:!0}),E=(0,d.useMemo)(()=>m||f,[m,f]);async function I(e){t?p({data:e,where:{id:t}}):h({data:e})}(0,d.useEffect)(()=>(C&&(o.setValue("active",C.active),o.setValue("name",C.name),o.setValue("code",C.code)),()=>{o.reset()}),[C,a]);let O=async e=>{e?i(!0):i(!1)};return(0,n.jsxs)(b.yo,{onOpenChange:O,open:a,children:[(0,n.jsx)(b.aM,{asChild:!0,children:s}),(0,n.jsx)(b.ue,{side:"left",children:(0,n.jsxs)(b.Tu,{children:[(0,n.jsxs)(b.bC,{children:[t?"Edit":"Add"," Role"]}),(0,n.jsx)(N.l0,{...o,children:(0,n.jsxs)("form",{onSubmit:o.handleSubmit(I),className:"space-y-8",children:[(0,n.jsx)(N.Wi,{control:o.control,name:"active",render:e=>{let{field:s}=e;return(0,n.jsxs)(N.xJ,{children:[(0,n.jsx)(N.lX,{children:"Активность"}),(0,n.jsx)(N.NI,{children:(0,n.jsx)("div",{children:(0,n.jsx)(y.r,{checked:s.value,onCheckedChange:s.onChange})})}),(0,n.jsx)(N.zG,{})]})}}),(0,n.jsx)(N.Wi,{control:o.control,name:"name",render:e=>{let{field:s}=e;return(0,n.jsxs)(N.xJ,{children:[(0,n.jsx)(N.lX,{children:"Название"}),(0,n.jsx)(N.NI,{children:(0,n.jsx)("div",{children:(0,n.jsx)(S.I,{...s})})}),(0,n.jsx)(N.zG,{})]})}}),(0,n.jsx)(N.Wi,{control:o.control,name:"code",render:e=>{let{field:s}=e;return(0,n.jsxs)(N.xJ,{children:[(0,n.jsx)(N.lX,{children:"Код"}),(0,n.jsx)(N.NI,{children:(0,n.jsx)("div",{children:(0,n.jsx)(S.I,{...s})})}),(0,n.jsx)(N.zG,{})]})}}),(0,n.jsxs)(r.z,{type:"submit",disabled:E,children:[E&&(0,n.jsx)(M.Z,{className:"mr-2 h-4 w-4 animate-spin"}),"Submit"]})]})})]})})]})}var I=t(5857);function O(e){let{recordId:s}=e,{mutateAsync:t}=function(e){let s=c.S.useContext();return c.S.roles.delete.useMutation({...e,onSuccess:t=>{var n;s.roles.list.invalidate(),null==e||null===(n=e.onSuccess)||void 0===n||n.call(e,t)}})}({});return(0,n.jsx)(I.m,{recordId:s,deleteRecord:t})}let D=[{accessorKey:"active",header:"Активен",cell:e=>{let{row:s}=e,t=s.original;return(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsx)(y.r,{checked:t.active,readOnly:!0})})}},{accessorKey:"name",header:"Заголовок"},{accessorKey:"code",header:"Код"},{id:"actions",cell:e=>{let{row:s}=e,t=s.original;return(0,n.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,n.jsx)(E,{recordId:t.id,children:(0,n.jsx)(r.z,{variant:"outline",size:"sm",children:(0,n.jsx)(w.Z,{className:"h-4 w-4"})})}),(0,n.jsx)(O,{recordId:t.id})]})}}];var V=t(5708);function Z(e){var s;let{columns:t}=e,r=v(e=>e.selectedRows),o=(0,d.useMemo)(()=>Object.keys(r)[0],[r]),{data:u,isLoading:x}=c.S.rolesPermissions.list.useQuery({where:{role_id:{equals:o}}},{enabled:Object.keys(r).length>0}),h=(0,d.useMemo)(()=>[],[]),m=(0,l.b7)({data:null!=u?u:h,columns:t,getCoreRowModel:(0,a.sC)()});return(0,n.jsx)("div",{className:"space-y-4",children:(0,n.jsx)("div",{className:"rounded-md border",children:(0,n.jsxs)(i.iA,{children:[(0,n.jsx)(i.xD,{children:m.getHeaderGroups().map(e=>(0,n.jsx)(i.SC,{children:e.headers.map(e=>(0,n.jsx)(i.ss,{children:e.isPlaceholder?null:(0,l.ie)(e.column.columnDef.header,e.getContext())},e.id))},e.id))}),(0,n.jsx)(i.RM,{children:x&&o?(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:t.length,className:"h-24 text-center relative",children:(0,n.jsxs)("div",{role:"status",className:"absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2",children:[(0,n.jsxs)("svg",{"aria-hidden":"true",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),(0,n.jsx)("span",{className:"sr-only",children:"Loading..."})]})})}):(null===(s=m.getRowModel().rows)||void 0===s?void 0:s.length)?m.getRowModel().rows.map(e=>(0,n.jsx)(i.SC,{"data-state":e.getIsSelected()&&"selected",children:e.getVisibleCells().map(e=>(0,n.jsx)(i.pj,{children:(0,l.ie)(e.column.columnDef.cell,e.getContext())},e.id))},e.id)):(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:t.length,className:"h-24 text-center",children:"No results."})})})]})})})}let _=[{accessorKey:"name",cell:e=>{let{row:s}=e,t=s.original;return t.permissions.description},header:"Заголовок"}],A=[{accessorKey:"name",cell:e=>{let{row:s}=e,t=s.original;return t.description},header:"Заголовок"}],G=f((e,s)=>({selectedRows:{},setSelectedRows:s=>e(e=>({selectedRows:s})),addSelection:s=>e(e=>{let t={...e.selectedRows};return t[s]?delete t[s]:t[s]=!0,{selectedRows:t}})}));function L(e){var s,t;let{children:o}=e,{toast:x}=(0,P.pm)(),[h,m]=(0,d.useState)(!1),j=v(e=>e.selectedRows),g=G(e=>e.selectedRows),p=G(e=>e.setSelectedRows),f=G(e=>e.addSelection),C=(0,d.useMemo)(()=>Object.keys(j)[0],[j]),[{data:w,isLoading:N},{data:S,isLoading:y}]=c.S.useQueries(e=>[e.rolesPermissions.list({where:{role_id:{equals:C}},orderBy:{permissions:{slug:"asc"}}},{enabled:Object.keys(j).length>0&&h}),e.permissions.list({},{enabled:h})]),{mutateAsync:R,isLoading:M,data:k,error:z}=function(e){let s=c.S.useContext();return c.S.rolesPermissions.addManyPermissionsForRole.useMutation({...e,onSuccess:t=>{var n;s.rolesPermissions.list.invalidate(),null==e||null===(n=e.onSuccess)||void 0===n||n.call(e,t)}})}({onSuccess:()=>{x({title:"Success",description:"Role permissions added",duration:5e3}),p({}),m(!1)}}),E=(0,d.useMemo)(()=>N||y,[N,y]),I=(0,d.useMemo)(()=>[],[]),O=(0,d.useMemo)(()=>E||M||0===Object.keys(g).length,[M,E,g]),D=(0,d.useMemo)(()=>Object.keys(g),[g]),V=(0,l.b7)({data:null!==(t=null==S?void 0:S.items)&&void 0!==t?t:I,columns:A,state:{rowSelection:g},getRowId:e=>e.id,enableRowSelection:!0,getCoreRowModel:(0,a.sC)(),manualPagination:!0,getPaginationRowModel:(0,a.G_)()}),Z=async e=>{e?m(!0):m(!1)};return(0,d.useEffect)(()=>{if(w){let e=w.reduce((e,s)=>(e[s.permission_id]=!0,e),{});p(e)}},[w]),(0,n.jsxs)(b.yo,{onOpenChange:Z,open:h,children:[(0,n.jsx)(b.aM,{asChild:!0,children:o}),(0,n.jsxs)(b.ue,{side:"right",children:[(0,n.jsx)(b.Tu,{children:(0,n.jsx)(b.bC,{children:"Link Permissions"})}),(0,n.jsx)("div",{className:"space-y-4 mt-4",children:(0,n.jsx)("div",{className:"rounded-md border",children:(0,n.jsxs)(i.iA,{children:[(0,n.jsx)(i.xD,{children:V.getHeaderGroups().map(e=>(0,n.jsx)(i.SC,{children:e.headers.map(e=>(0,n.jsx)(i.ss,{children:e.isPlaceholder?null:(0,l.ie)(e.column.columnDef.header,e.getContext())},e.id))},e.id))}),(0,n.jsx)(i.RM,{children:E?(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:A.length,className:"h-24 text-center relative",children:(0,n.jsxs)("div",{role:"status",className:"absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2",children:[(0,n.jsxs)("svg",{"aria-hidden":"true",className:"w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,n.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),(0,n.jsx)("span",{className:"sr-only",children:"Loading..."})]})})}):(null===(s=V.getRowModel().rows)||void 0===s?void 0:s.length)?V.getRowModel().rows.map(e=>(0,n.jsx)(i.SC,{"data-state":e.getIsSelected()&&"selected",children:e.getVisibleCells().map(s=>(0,n.jsx)(i.pj,{className:"cursor-pointer",onClick:()=>f(e.id),children:(0,l.ie)(s.column.columnDef.cell,s.getContext())},s.id))},e.id)):(0,n.jsx)(i.SC,{children:(0,n.jsx)(i.pj,{colSpan:A.length,className:"h-24 text-center",children:"No results."})})})]})})}),(0,n.jsx)("div",{className:"mt-4",children:(0,n.jsx)("div",{className:"flex justify-end",children:(0,n.jsxs)(r.z,{variant:"default",disabled:O,onClick:()=>R({role_id:C,permissions_ids:D}),children:[O&&(0,n.jsx)(u.BGW,{className:"mr-2 h-4 w-4 animate-spin"}),"Save"]})})})]})]})}function F(){return(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("h2",{className:"text-3xl font-bold tracking-tight",children:"Permissions List"}),(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsx)(L,{children:(0,n.jsxs)(r.z,{children:[(0,n.jsx)(V.Z,{className:"mr-2 h-4 w-4"})," Add Permission"]})})})]}),(0,n.jsx)("div",{className:"py-10",children:(0,n.jsx)(Z,{columns:_})})]})}function T(){return(0,n.jsxs)("div",{className:"flex space-x-5",children:[(0,n.jsxs)("div",{className:"w-6/12",children:[(0,n.jsxs)("div",{className:"flex justify-between",children:[(0,n.jsx)("h2",{className:"text-3xl font-bold tracking-tight",children:"Roles List"}),(0,n.jsx)("div",{className:"flex items-center space-x-2",children:(0,n.jsx)(E,{children:(0,n.jsxs)(r.z,{children:[(0,n.jsx)(V.Z,{className:"mr-2 h-4 w-4"})," Create Role"]})})})]}),(0,n.jsx)("div",{className:"py-10",children:(0,n.jsx)(C,{columns:D})})]}),(0,n.jsx)("div",{className:"w-6/12",children:(0,n.jsx)(F,{})})]})}},5857:function(e,s,t){"use strict";t.d(s,{m:function(){return h}});var n=t(4552),l=t(2963),a=t(5446),i=t(6083),r=t(7199);let c=i.fC,d=i.x8,o=i.xz,u=a.forwardRef((e,s)=>{let{className:t,align:l="center",sideOffset:a=4,...c}=e;return(0,n.jsx)(i.h_,{children:(0,n.jsx)(i.VY,{ref:s,align:l,sideOffset:a,className:(0,r.cn)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",t),...c})})});u.displayName=i.VY.displayName;var x=t(1514);function h(e){let{recordId:s,deleteRecord:t}=e;return(0,n.jsxs)(c,{children:[(0,n.jsx)(o,{asChild:!0,children:(0,n.jsx)(l.z,{variant:"destructive",size:"sm",children:(0,n.jsx)(x.Z,{className:"h-4 w-4"})})}),(0,n.jsx)(u,{className:"w-80",children:(0,n.jsxs)("div",{className:"grid gap-4",children:[(0,n.jsxs)("div",{className:"space-y-2",children:[(0,n.jsx)("h4",{className:"font-medium leading-none text-center",children:"Удалить"}),(0,n.jsx)("p",{className:"text-sm text-muted-foreground text-center",children:"Вы действительно хотите удалить эту запись?"})]}),(0,n.jsxs)("div",{className:"space-x-3 mx-auto",children:[(0,n.jsx)(l.z,{variant:"destructive",size:"sm",onClick:()=>{t({where:{id:s}})},children:"Удалить"}),(0,n.jsx)(d,{"aria-label":"Close",children:(0,n.jsx)(l.z,{variant:"secondary",size:"sm",children:"Отмена"})})]})]})})]})}},9172:function(e,s,t){"use strict";t.d(s,{r:function(){return r}});var n=t(4552),l=t(5446),a=t(7863),i=t(7199);let r=l.forwardRef((e,s)=>{let{className:t,...l}=e;return(0,n.jsx)(a.fC,{className:(0,i.cn)("peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",t),...l,ref:s,children:(0,n.jsx)(a.bU,{className:(0,i.cn)("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0")})})});r.displayName=a.fC.displayName},1973:function(e,s,t){"use strict";/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=t(5446),l=t(3916),a="function"==typeof Object.is?Object.is:function(e,s){return e===s&&(0!==e||1/e==1/s)||e!=e&&s!=s},i=l.useSyncExternalStore,r=n.useRef,c=n.useEffect,d=n.useMemo,o=n.useDebugValue;s.useSyncExternalStoreWithSelector=function(e,s,t,n,l){var u=r(null);if(null===u.current){var x={hasValue:!1,value:null};u.current=x}else x=u.current;u=d(function(){function e(e){if(!c){if(c=!0,i=e,e=n(e),void 0!==l&&x.hasValue){var s=x.value;if(l(s,e))return r=s}return r=e}if(s=r,a(i,e))return s;var t=n(e);return void 0!==l&&l(s,t)?s:(i=e,r=t)}var i,r,c=!1,d=void 0===t?null:t;return[function(){return e(s())},null===d?void 0:function(){return e(d())}]},[s,t,n,l]);var h=i(e,u[0],u[1]);return c(function(){x.hasValue=!0,x.value=h},[h]),o(h),h}},698:function(e,s,t){"use strict";e.exports=t(1973)}},function(e){e.O(0,[545,713,395,244,280,729,291,744],function(){return e(e.s=5579)}),_N_E=e.O()}]);