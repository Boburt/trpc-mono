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
import { createFormFactory } from "@tanstack/react-form";
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

const formFactory = createFormFactory<z.infer<typeof UsersCreateInputSchema>>({
  defaultValues: {
    status: "active",
    login: "",
    password: "",
  },
});

export default function UsersForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const { toast } = useToast();
  const [changedRoleId, setChangedRoleId] = useState<string | null>(null);

  const closeForm = () => {
    form.reset();
    setOpen(false);
  };

  const onAddSuccess = (actionText: string, successData: any) => {
    toast({
      title: "Success",
      description: `Role ${actionText}`,
      duration: 5000,
    });
    assignRole(successData);
  };

  const onError = (error: any) => {
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

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateUser({ data: values, where: { id: recordId } });
      } else {
        createUser({ data: values });
      }
    },
  });

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
        enabled: !!recordId,
      }
    ),
    t.roles.list({}),
    t.usersRoles.list(
      {
        where: {
          user_id: {
            equals: recordId,
          },
        },
      },
      {
        enabled: !!recordId,
      }
    ),
  ]);

  const userRoleId = useMemo(() => {
    return userRolesData?.[0].role_id;
  }, [userRolesData]);

  const assignRole = useCallback(
    async (recordData: Users) => {
      if (!userRoleId || userRoleId != changedRoleId) {
        let userId = recordData?.id;
        if (recordId) {
          userId = recordId;
        }
        await asyncAssignRole({
          user_id: userId,
          role_id: changedRoleId!,
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
      Object.keys(record).forEach((key) => {
        form.setFieldValue(
          key as keyof typeof record,
          record[key as keyof typeof record]
        );
      });
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Статус</Label>
          </div>
          <form.Field name="status">
            {(field) => {
              return (
                <>
                  <Select
                    onValueChange={(value) =>
                      field.setValue(value as z.infer<typeof user_statusSchema>)
                    }
                    defaultValue={field.getValue() ?? ""}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {user_statusSchema.options.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
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
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
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
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
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
          <Select onValueChange={setChangedRoleId} defaultValue={userRoleId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {user_statusSchema.options.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
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
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
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
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
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
