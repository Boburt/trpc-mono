import { useToast } from "@admin/components/ui/use-toast";
import { useCitiesCreate, useCitiesUpdate } from "@admin/store/apis/cities";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import {
  CitiesCreateInputSchema,
  LangsCreateInputSchema,
} from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@admin/components/ui/textarea";
import { toast } from "sonner";

const formFactory = createFormFactory<z.infer<typeof CitiesCreateInputSchema>>({
  defaultValues: {
    name: "",
    slug: "",
    description: "",
  },
});

export default function CitiesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const onAddSuccess = (actionText: string) => {
    toast.success(`City ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const {
    mutateAsync: createCity,
    isLoading: isAddLoading,
    data,
    error,
  } = useCitiesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateCity,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useCitiesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateCity({ data: values, where: { id: recordId } });
      } else {
        createCity({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = trpc.cities.one.useQuery(
    {
      where: { id: recordId },
    },
    {
      enabled: !!recordId,
    }
  );

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (record) {
      form.setFieldValue("description", record.description);
      form.setFieldValue("slug", record.slug);
      form.setFieldValue("name", record.name);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Символьный код</Label>
          </div>
          <form.Field name="slug">
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
            <Label>Заголовок</Label>
          </div>
          <form.Field name="name">
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
            <Label>Описание</Label>
          </div>
          <form.Field name="description">
            {(field) => {
              return (
                <>
                  <Textarea
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
