import { useToast } from "@admin/components/ui/use-toast";
import { useUsersCreate, useUsersUpdate } from "@admin/store/apis/users";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import {
  Users,
  UsersCreateInputSchema,
  user_statusSchema,
} from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory, useForm } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { useCallback, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@components/ui/select";
import { toast } from "sonner";
import { InferInsertModel } from "drizzle-orm";
import { users } from "backend/drizzle/schema";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

export default function UsersForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const token = useToken();
  const [changedRoleId, setChangedRoleId] = useState<string | null>(null);

  const closeForm = () => {
    form.reset();
    setOpen(false);
  };

  const onAddSuccess = (actionText: string, successData: any) => {
    toast.success(`Role ${actionText}`);
    assignRole(successData);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof users>) => {
      return apiClient.api.users.post({
        data: newTodo,
        fields: [
          "id",
          "status",
          "login",
          "password",
          "first_name",
          "last_name",
        ],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => onAddSuccess("added", data),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo: {
      data: InferInsertModel<typeof users>;
      id: string;
    }) => {
      return apiClient.api.users[newTodo.id].put({
        data: newTodo.data,
        fields: [
          "id",
          "status",
          "login",
          "password",
          "first_name",
          "last_name",
        ],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => onAddSuccess("updated", data),
    onError,
  });

  const assignRoleMutation = useMutation({
    mutationFn: (newTodo: { role_id: string; user_id: string }) => {
      return apiClient.api.users.assign_role.post({
        ...newTodo,
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => closeForm(),
    onError,
  });

  const form = useForm<InferInsertModel<typeof users>>({
    defaultValues: {
      status: "active",
      login: "",
      password: "",
      first_name: "",
      last_name: "",
    },
    onSubmit: async ({ value }) => {
      if (recordId) {
        updateMutation.mutate({ data: value, id: recordId });
      } else {
        createMutation.mutate(value);
      }
    },
  });

  const [
    { data: record, isLoading: isRecordLoading },
    { data: rolesData, isLoading: isRolesLoading },
    { data: userRolesData, isLoading: isUserRolesLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ["one_user", recordId],
        queryFn: async () => {
          if (recordId) {
            const { data } = await apiClient.api.users[recordId].get({
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return data;
          } else {
            return null;
          }
        },
        enabled: !!recordId && !!token,
      },
      {
        enabled: !!token,
        queryKey: ["roles_cached"],
        queryFn: async () => {
          const { data } = await apiClient.api.roles.cached.get({
            $headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return data;
        },
      },
      {
        enabled: !!recordId && !!token,
        queryKey: ["users_roles", recordId],
        queryFn: async () => {
          if (recordId) {
            const { data } = await apiClient.api.users_roles.get({
              $query: {
                limit: "30",
                offset: "0",
                filters: JSON.stringify([
                  {
                    field: "user_id",
                    operator: "=",
                    value: recordId,
                  },
                ]),
                fields: "role_id,user_id",
              },
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return data;
          } else {
            return null;
          }
        },
      },
    ],
  });

  const userRoleId = useMemo(() => {
    if (userRolesData && userRolesData.data && userRolesData.data.length > 0) {
      return userRolesData.data[0].role_id;
    } else {
      return null;
    }
  }, [userRolesData]);

  const assignRole = useCallback(
    async (recordData: Users) => {
      if (!userRoleId || userRoleId != changedRoleId) {
        let userId = recordData?.id;
        if (recordId) {
          userId = recordId;
        }
        await assignRoleMutation.mutate({
          user_id: userId,
          role_id: changedRoleId!,
        });
      }
      return closeForm();
    },
    [changedRoleId, userRoleId, recordId]
  );

  const isLoading = useMemo(() => {
    return (
      createMutation.isPending || updateMutation.isPending || isRolesLoading
    );
  }, [createMutation.isPending, updateMutation.isPending, isRolesLoading]);

  useEffect(() => {
    if (record?.data && "id" in record.data) {
      Object.keys(record.data).forEach((key) => {
        form.setFieldValue(
          key as keyof typeof record.data,
          record.data[key as keyof typeof record.data]
        );
      });
    }
  }, [record]);

  return (
    <form.Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <div>
            <Label>Статус</Label>
          </div>
          <form.Field name="status">
            {(field) => {
              return (
                <>
                  <Select
                    onValueChange={(value) => field.setValue(value as any)}
                    defaultValue={field.getValue() ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="active" value="active">
                        active
                      </SelectItem>
                      <SelectItem key="blocked" value="blocked">
                        blocked
                      </SelectItem>
                      <SelectItem key="inactive" value="inactive">
                        inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Логин</Label>
          </div>
          <form.Field name="login">
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.getValue() ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Пароль</Label>
          </div>
          <form.Field name="password">
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.getValue() ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Роль</Label>
          </div>
          <Select
            onValueChange={setChangedRoleId}
            defaultValue={userRoleId ?? ""}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(rolesData) &&
                rolesData?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Имя</Label>
          </div>
          <form.Field name="first_name">
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.getValue() ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Фамилия</Label>
          </div>
          <form.Field name="last_name">
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.getValue() ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </form.Provider>
  );
}
