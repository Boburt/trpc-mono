import { useToast } from "@admin/components/ui/use-toast";
import {
  useManufacturersPropertiesCategoriesCreate,
  useManufacturersPropertiesCategoriesUpdate,
} from "@admin/store/apis/manufacturers_properties_categories";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import {
  ManufacturersPropertiesCategoriesCreateInputSchema,
  RolesCreateInputSchema,
} from "@backend/lib/zod";
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
import { toast } from "sonner";

const formFactory = createFormFactory<
  z.infer<typeof ManufacturersPropertiesCategoriesCreateInputSchema>
>({
  defaultValues: {
    name: "",
    code: "",
    i18n_name: {},
  },
});

export default function ManufacturersPropertiesCategoriesForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const onAddSuccess = (actionText: string) => {
    toast.success(`Manufacturers Properties Category ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const {
    mutateAsync: createManufacturersPropertiesCategories,
    isLoading: isAddLoading,
    data,
    error,
  } = useManufacturersPropertiesCategoriesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateManufacturersPropertiesCategories,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useManufacturersPropertiesCategoriesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateManufacturersPropertiesCategories({
          data: values,
          where: { id: recordId },
        });
      } else {
        createManufacturersPropertiesCategories({ data: values });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.manufacturersPropertiesCategories.one.useQuery(
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
      form.setFieldValue("name", record.name);
      form.setFieldValue("code", record.code);
      form.setFieldValue("i18n_name", record.i18n_name ?? {});
    }
  }, [record]);

  return (
    <form.Provider>
      <form {...form.getFormProps()} className="space-y-8">
        <div className="space-y-2">
          <div>
            <Label>Название</Label>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </form.Provider>
  );
}
