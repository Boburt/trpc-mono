import { useToast } from "@admin/components/ui/use-toast";
import {
  useCategoriesCreate,
  useCategoriesUpdate,
} from "@admin/store/apis/categories";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { CategoriesCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@admin/components/ui/accordion";
import { useCachedLangsQuery } from "@admin/store/apis/langs";
import { Textarea } from "@admin/components/ui/textarea";

const formFactory = createFormFactory<
  z.infer<typeof CategoriesCreateInputSchema>
>({
  defaultValues: {
    active: true,
    name: "",
    code: "",
    i18n_name: {},
  },
});

export default function CategoriesForm({
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
      description: `Category ${actionText}`,
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
    mutateAsync: createCategory,
    isLoading: isAddLoading,
    data,
    error,
  } = useCategoriesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateCategory,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useCategoriesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateCategory({ data: values, where: { id: recordId } });
      } else {
        createCategory({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.categories.one.useQuery(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId,
      }
    );

  const { data: langs, isLoading: isLangsLoading } = useCachedLangsQuery({});

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (record) {
      form.setFieldValue("active", record.active);
      form.setFieldValue("code", record.code);
      form.setFieldValue("name", record.name);
      form.setFieldValue("i18n_name", record.i18n_name ?? {});
      form.setFieldValue("description", record.description);
      form.setFieldValue("i18n_description", record.i18n_description ?? {});
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
            <Label>Символьный код</Label>
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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Языки заголовка</AccordionTrigger>
            <AccordionContent>
              {langs?.map((lang) => (
                <div className="space-y-2" key={lang.id}>
                  <div>
                    <Label>{lang.name}</Label>
                  </div>
                  <form.Field name={`i18n_name.${lang.code}`}>
                    {(field) => {
                      return (
                        <>
                          <Input
                            {...field.getInputProps()}
                            // @ts-ignore
                            value={field.getValue() ?? ""}
                          />
                        </>
                      );
                    }}
                  </form.Field>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Языки описания</AccordionTrigger>
            <AccordionContent>
              {langs?.map((lang) => (
                <div className="space-y-2" key={lang.id}>
                  <div>
                    <Label>{lang.name}</Label>
                  </div>
                  <form.Field name={`i18n_description.${lang.code}`}>
                    {(field) => {
                      return (
                        <>
                          <Textarea
                            {...field.getInputProps()}
                            // @ts-ignore
                            value={field.getValue() ?? ""}
                          />
                        </>
                      );
                    }}
                  </form.Field>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </form.Provider>
  );
}
