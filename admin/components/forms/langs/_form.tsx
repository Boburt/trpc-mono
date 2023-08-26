import { useToast } from "@admin/components/ui/use-toast";
import { useLangsCreate, useLangsUpdate } from "@admin/store/apis/langs";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { LangsCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

const formFactory = createFormFactory<z.infer<typeof LangsCreateInputSchema>>({
  defaultValues: {
    name: "",
    code: "",
    is_default: false,
  },
});

export default function LangsForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const { toast } = useToast();

  // const form = useForm<z.infer<typeof PermissionsCreateInputSchema>>({
  //   resolver: zodResolver(PermissionsCreateInputSchema),
  //   defaultValues: {
  //     active: true,
  //     slug: "",
  //     description: "",
  //   },
  // });

  const onAddSuccess = (actionText: string) => {
    toast({
      title: "Success",
      description: `Permission ${actionText}`,
      duration: 5000,
    });
    // form.reset();
    setOpen(false);
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
    mutateAsync: createLang,
    isLoading: isAddLoading,
    data,
    error,
  } = useLangsCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateLang,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useLangsUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateLang({ data: values, where: { id: recordId } });
      } else {
        createLang({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = trpc.langs.one.useQuery(
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
      form.setFieldValue("is_default", record.is_default);
      form.setFieldValue("code", record.code);
      form.setFieldValue("name", record.name);
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>По-умолчанию</Label>
          </div>
          <form.Field name="is_default">
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </form.Provider>
  );
}
