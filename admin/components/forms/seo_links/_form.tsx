import { useToast } from "@admin/components/ui/use-toast";
import {
  useSeoLinksCreate,
  useSeoLinksUpdate,
} from "@admin/store/apis/seo_links";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import {
  PermissionsCreateInputSchema,
  SeoLinksCreateInputSchema,
} from "@backend/lib/zod";
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
  z.infer<typeof SeoLinksCreateInputSchema>
>({
  defaultValues: {
    link: "",
    title: "",
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
    mutateAsync: createSeoLink,
    isLoading: isAddLoading,
    data,
    error,
  } = useSeoLinksCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateSeoLink,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useSeoLinksUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateSeoLink({ data: values, where: { id: recordId } });
      } else {
        createSeoLink({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.seoLinks.one.useQuery(
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
      form.setFieldValue("link", record.link);
      form.setFieldValue("title", record.title);
      form.setFieldValue("description", record.description);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Ссылка</Label>
          </div>
          <form.Field name="link">
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
          <form.Field name="title">
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
