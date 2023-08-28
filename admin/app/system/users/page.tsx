"use client";
import { trpc } from "@admin/utils/trpc";
import { DataTable } from "./data-table";
import { usersColumns } from "./columns";
import UsersFormSheet from "@components/forms/users/sheet";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";

export default function UsersListPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users List</h2>
        <div className="flex items-center space-x-2">
          <UsersFormSheet>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create User
            </Button>
          </UsersFormSheet>
        </div>
      </div>
      <div className="py-10">
        <DataTable columns={usersColumns} />
      </div>
    </div>
  );
}
