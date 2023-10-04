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

const formFactory = createFormFactory<
  z.infer<typeof PermissionsCreateInputSchema>
>({
  defaultValues: {
    active: true,
    slug: "",
    description: "",
  },
});

export default function PermissionsForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const onAddSuccess = (actionText: string) => {
    toast.success(`Permission ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const {
    mutateAsync: createPermission,
    isLoading: isAddLoading,
    data,
    error,
  } = usePermissionsCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updatePermission,
    isLoading: isUpdateLoading,
    error: updateError,
  } = usePermissionsUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updatePermission({ data: values, where: { id: recordId } });
      } else {
        createPermission({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.permissions.one.useQuery(
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
      form.setFieldValue("active", record.active);
      form.setFieldValue("slug", record.slug);
      form.setFieldValue("description", record.description);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
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
            <Label>Код</Label>
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
            <Label>Описание</Label>
          </div>
          <form.Field name="description">
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
