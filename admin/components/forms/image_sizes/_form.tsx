import { useToast } from "@admin/components/ui/use-toast";
import {
  useImageSizesCreate,
  useImageSizesUpdate,
} from "@admin/store/apis/image_sizes";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { ImageSizesCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { toast } from "sonner";
import { InferInsertModel } from "drizzle-orm";
import { image_sizes } from "backend/drizzle/schema";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQuery } from "@tanstack/react-query";

const formFactory = createFormFactory<InferInsertModel<typeof image_sizes>>({
  defaultValues: {
    code: "",
    width: 500,
    height: 500,
  },
});

export default function ImageSizesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const token = useToken();
  const onAddSuccess = (actionText: string) => {
    toast.success(`Image Sizes ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof image_sizes>) => {
      return apiClient.api.image_sizes.post({
        data: newTodo,
        fields: ["id", "code", "width", "height"],
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
      data: InferInsertModel<typeof image_sizes>;
      id: string;
    }) => {
      return apiClient.api.image_sizes[newTodo.id].put({
        data: newTodo.data,
        fields: ["id", "code", "width", "height"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (values.width) {
        values.width = +values.width;
      }

      if (values.height) {
        values.height = +values.height;
      }

      if (recordId) {
        updateMutation.mutate({ data: values, id: recordId });
      } else {
        createMutation.mutate(values);
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_image_size", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api.image_sizes[recordId].get({
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
    if (record?.data && "id" in record?.data) {
      form.setFieldValue("code", record.data.code);
      form.setFieldValue("width", record.data.width);
      form.setFieldValue("height", record.data.height);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Код</Label>
          </div>
          <form.Field name="code">
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
            <Label>Ширина</Label>
          </div>
          <form.Field name="width">
            {(field) => {
              return (
                <>
                  <Input
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
                    type="number"
                  />
                </>
              );
            }}
          </form.Field>
        </div>
        <div className="space-y-2">
          <div>
            <Label>Высота</Label>
          </div>
          <form.Field name="height">
            {(field) => {
              return (
                <>
                  <Input
                    {...field.getInputProps()}
                    value={field.getValue() ?? ""}
                    type="number"
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
