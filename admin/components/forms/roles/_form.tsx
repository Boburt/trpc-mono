import { useToast } from "@admin/components/ui/use-toast";
import { useRolesCreate, useRolesUpdate } from "@admin/store/apis/roles";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { RolesCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { toast } from "sonner";
import { roles } from "backend/drizzle/schema";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferInsertModel } from "drizzle-orm";
import useToken from "@admin/store/get-token";

export default function RolesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const token = useToken();
  const queryClient = useQueryClient();
  const onAddSuccess = (actionText: string) => {
    toast.success(`Role ${actionText}`);
    queryClient.invalidateQueries({ queryKey: ["roles"] });
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof roles>) => {
      return apiClient.api.roles.post({
        data: newTodo,
        fields: ["id", "name", "code", "active"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo: {
      data: InferInsertModel<typeof roles>;
      id: string;
    }) => {
      return apiClient.api.roles[newTodo.id].put({
        data: newTodo.data,
        fields: ["id", "name", "code", "active"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = useForm<{
    active: boolean;
    name: string;
    code: string;
  }>({
    defaultValues: {
      active: true,
      name: "",
      code: "",
    },
    onSubmit: async ({ value, formApi }) => {
      console.log(value);
      if (recordId) {
        updateMutation.mutate({ data: value, id: recordId });
      } else {
        createMutation.mutate(value);
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_role", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api.roles[recordId].get({
          $headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        return null;
      }
    },
    enabled: !!recordId && !!token,
  });

  const isLoading = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  useEffect(() => {
    if (record?.data && "id" in record.data) {
      form.setFieldValue("active", record.data.active);
      form.setFieldValue("name", record.data.name);
      form.setFieldValue("code", record.data?.code ?? "");
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
            <Label>Активность</Label>
          </div>
          <form.Field name="active">
            {(field) => {
              return (
                <>
                  <Switch
                    checked={field.getValue()}
                    onCheckedChange={field.setValue}
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Название</Label>
          </div>
          <form.Field
            name="name"
            validators={{
              onChange({ value }) {
                if (!value) {
                  return "Required";
                }
              },
            }}
          >
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
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
            <Label>Код</Label>
          </div>
          <form.Field
            name="code"
            validators={{
              onChange({ value }) {
                if (!value) {
                  return "Required";
                }
              },
            }}
          >
            {(field) => {
              return (
                <>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value!}
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
