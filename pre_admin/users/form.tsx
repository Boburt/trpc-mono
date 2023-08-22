"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { trpc } from "@admin/utils/trpc";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@components/ui/use-toast";
import { UsersCreateInputSchema, user_statusSchema } from "@backend/lib/zod";
import { useUsersCreate, useUsersUpdate } from "@admin/store/apis/users";

export default function UsersForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [changedRoleId, setChangedRoleId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof UsersCreateInputSchema>>({
    resolver: zodResolver(UsersCreateInputSchema),
    defaultValues: {
      status: "active",
      login: "",
    },
  });

  const closeForm = () => {
    form.reset();
    setOpen(false);
  };

  const onAddSuccess = (actionText: string, successData: users) => {
    toast({
      title: "Success",
      description: `User ${actionText}`,
      duration: 5000,
    });
    assignRole(successData);
  };

  const onError = (error) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
  };

  const {
    mutateAsync: createUser,
    isLoading: isAddLoading,
    data,
    error,
  } = useUsersCreate({
    onSuccess: (data) => onAddSuccess("added", data),
    onError,
  });

  const {
    mutateAsync: updateUser,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useUsersUpdate({
    onSuccess: (data) => onAddSuccess("updated", data),
    onError,
  });

  const { mutateAsync: asyncAssignRole } = trpc.users.assignRole.useMutation({
    onSuccess: () => closeForm(),
    onError,
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

  const [
    { data: record, isLoading: isRecordLoading },
    { data: rolesData, isLoading: isRolesLoading },
    { data: userRolesData, isLoading: isUserRolesLoading },
  ] = trpc.useQueries((t) => [
    t.users.one(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId && open,
        refetchOnMountOrArgChange: true,
      }
    ),
    t.roles.list(
      {},
      {
        enabled: open,
        refetchOnMountOrArgChange: true,
      }
    ),
    t.users_roles.list(
      {
        where: {
          user_id: {
            equals: recordId,
          },
        },
      },
      {
        enabled: !!recordId && open,
        refetchOnMountOrArgChange: true,
      }
    ),
  ]);

  const userRoleId = useMemo(() => {
    return userRolesData?.items[0].role_id;
  }, [userRolesData]);

  const assignRole = useCallback(
    async (recordData: users) => {
      if (!userRoleId || userRoleId != changedRoleId) {
        let userId = recordData?.id;
        if (recordId) {
          userId = recordId;
        }
        await asyncAssignRole({
          user_id: userId,
          role_id: changedRoleId,
        });
      }
      return closeForm();
    },
    [changedRoleId, userRoleId, recordId]
  );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading || isRolesLoading;
  }, [isAddLoading, isUpdateLoading, isRolesLoading]);

  useEffect(() => {
    if (record) {
      form.setValue(
        Object.keys(record).map((key) => ({ name: key, value: record[key] }))
      );
    }

    return () => {
      form.reset();
    };
  }, [record, open]);

  async function onSubmit(
    values: z.infer<typeof permissionsCreateInputSchema>
  ) {
    if (recordId) {
      updateUser({ data: values, where: { id: recordId } });
    } else {
      createUser({ data: values });
    }
  }

  const beforeOpen = async (open: boolean) => {
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
  return (
    <Sheet onOpenChange={beforeOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{recordId ? "Edit" : "Add"} User</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {user_statusSchema.options.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Логин</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Роль</FormLabel>
                <Select
                  onValueChange={setChangedRoleId}
                  defaultValue={userRoleId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rolesData?.items.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
