"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { trpc } from "@admin/utils/trpc";

import { useState, useMemo, useEffect } from "react";
import { useToast } from "@components/ui/use-toast";
import { useRolesStore } from "@admin/store/states/roles";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { linkedRolesPermissionsColumns } from "./role-permissions-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { useRolePermissionStore } from "@admin/store/states/role_permissions";
import { useCreateManyRolePermissions } from "@admin/store/apis/role_permissions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function RolePermissionsForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const roleSelection = useRolesStore((state) => state.selectedRows);
  const rowSelection = useRolePermissionStore((state) => state.selectedRows);
  const setSelectedRows = useRolePermissionStore(
    (state) => state.setSelectedRows
  );
  const addSelection = useRolePermissionStore((state) => state.addSelection);

  const selectedRoleId = useMemo(() => {
    return Object.keys(roleSelection)[0];
  }, [roleSelection]);

  const [
    { data: selectedPermissions, isLoading: selectedPermissionsLoading },
    { data: permissions, isLoading: permissionsLoading },
  ] = trpc.useQueries((t) => [
    t.rolesPermissions.list(
      {
        where: {
          role_id: {
            equals: selectedRoleId,
          },
        },
        take: 1000,
        orderBy: {
          permissions: {
            slug: "asc",
          },
        },
      },
      {
        enabled: Object.keys(roleSelection).length > 0 && open,
      }
    ),
    t.permissions.list(
      {
        take: 1000,
      },
      {
        enabled: open,
      }
    ),
  ]);

  const {
    mutateAsync: assignPermissions,
    isLoading: isAddLoading,
    data,
    error,
  } = useCreateManyRolePermissions({
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Role permissions added`,
        duration: 5000,
      });
      setSelectedRows({});
      setOpen(false);
    },
  });

  const isLoading = useMemo(() => {
    return selectedPermissionsLoading || permissionsLoading;
  }, [selectedPermissionsLoading, permissionsLoading]);

  const defaultData = useMemo(() => [], []);

  const isSaveLoading = useMemo(() => {
    return isLoading || isAddLoading || Object.keys(rowSelection).length === 0;
  }, [isAddLoading, isLoading, rowSelection]);

  const selectedRowsIds = useMemo(() => {
    return Object.keys(rowSelection);
  }, [rowSelection]);

  const table = useReactTable({
    data: permissions?.items ?? defaultData,
    columns: linkedRolesPermissionsColumns,
    state: {
      rowSelection,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const beforeOpen = async (open: boolean) => {
    if (open) {
      // Do something before the sheet opens.
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (selectedPermissions) {
      const selectedRows = selectedPermissions.reduce((acc, item) => {
        acc[item.permission_id] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setSelectedRows(selectedRows);
    }
  }, [selectedPermissions]);

  return (
    <Sheet onOpenChange={beforeOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Link Permissions</SheetTitle>
        </SheetHeader>
        <div className="h-[85vh] overflow-y-auto w-full">
          <div className="space-y-4 mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={linkedRolesPermissionsColumns.length}
                        className="h-24 text-center relative"
                      >
                        <div
                          role="status"
                          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="cursor-pointer"
                            onClick={() => addSelection(row.id)}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={linkedRolesPermissionsColumns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-end">
            <Button
              variant="default"
              disabled={isSaveLoading}
              onClick={() =>
                assignPermissions({
                  role_id: selectedRoleId,
                  permissions_ids: selectedRowsIds,
                })
              }
            >
              {isSaveLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
