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
import { toast } from "sonner";
import { InferInsertModel } from "drizzle-orm";
import { categories } from "backend/drizzle/schema";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQuery } from "@tanstack/react-query";

const formFactory = createFormFactory<InferInsertModel<typeof categories>>({
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
  const token = useToken();
  const onAddSuccess = (actionText: string) => {
    toast.success(`Category ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof categories>) => {
      return apiClient.api.categories.post({
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
      data: InferInsertModel<typeof categories>;
      id: string;
    }) => {
      return apiClient.api.categories[newTodo.id].put({
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

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateMutation.mutate({ data: values, id: recordId });
      } else {
        createMutation.mutate(values);
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_category", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api.categories[recordId].get({
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

  const { data: langs, isLoading: isLangsLoading } = useQuery({
    queryKey: ["cached_langs"],
    queryFn: async () => {
      const { data } = await apiClient.api.langs.cached.get({
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    enabled: !!token,
  });

  const isLoading = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  useEffect(() => {
    if (record?.data && "id" in record?.data) {
      form.setFieldValue("active", record.data.active);
      form.setFieldValue("code", record.data.code);
      form.setFieldValue("name", record.data.name);
      form.setFieldValue("i18n_name", record.data.i18n_name ?? {});
      form.setFieldValue("description", record.data.description);
      form.setFieldValue(
        "i18n_description",
        record.data.i18n_description ?? {}
      );
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
