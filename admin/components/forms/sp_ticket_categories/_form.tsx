import { useToast } from "@admin/components/ui/use-toast";
import {
  usePermissionsCreate,
  usePermissionsUpdate,
} from "@admin/store/apis/permission";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { PermissionsCreateInputSchema } from "@backend/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import {
  FieldApi,
  FormApi,
  createFormFactory,
  useField,
} from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { toast } from "sonner";
import { InferInsertModel } from "drizzle-orm";
import { permissions, sp_ticket_categories } from "backend/drizzle/schema";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const formFactory = createFormFactory<
  InferInsertModel<typeof sp_ticket_categories>
>({
  defaultValues: {
    sort: 1,
    name: "",
    description: "",
  },
});

export default function SpTicketCategoriesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const queryClient = useQueryClient();
  const token = useToken();
  const onAddSuccess = (actionText: string) => {
    toast.success(`Ticket Categories ${actionText}`);
    // form.reset();
    queryClient.invalidateQueries({ queryKey: ["sp_ticket_categories"] });
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof sp_ticket_categories>) => {
      console.log("newTodo", newTodo);
      return apiClient.api.sp_ticket_categories.post({
        data: newTodo,
        fields: ["id", "name", "description", "sort"],
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
      data: InferInsertModel<typeof sp_ticket_categories>;
      id: string;
    }) => {
      return apiClient.api.sp_ticket_categories[newTodo.id].put({
        data: newTodo.data,
        fields: ["id", "name", "description", "sort"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async ({ value, formApi }) => {
      if (recordId) {
        updateMutation.mutate({ data: value, id: recordId });
      } else {
        createMutation.mutate(value);
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_sp_ticket_categories", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api.sp_ticket_categories[recordId].get({
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
      form.setFieldValue("name", record.data.name);
      form.setFieldValue("sort", record.data.sort);
      form.setFieldValue("description", record.data.description);
    }
  }, [record?.data]);

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
            <Label>Название</Label>
          </div>
          <form.Field name="name">
            {(field) => {
              return (
                <>
                  <Input
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
            <Label>Описание</Label>
          </div>
          <form.Field name="description">
            {(field) => {
              return (
                <>
                  <Input
                    value={field.state.value as string}
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
            <Label>Сортировка</Label>
          </div>
          <form.Field name="sort">
            {(field) => {
              return (
                <>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type="number"
                    onChange={(e) => field.handleChange(+e.target.value)}
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
