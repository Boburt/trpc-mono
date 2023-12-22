import { useToast } from "@admin/components/ui/use-toast";
import {
  useManufacturersCreate,
  useManufacturersUpdate,
} from "@admin/store/apis/manufacturers";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import { ManufacturersUncheckedCreateInputSchema } from "@backend/lib/zod";
import { useMemo, useEffect, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { createFormFactory } from "@tanstack/react-form";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@admin/components/ui/textarea";
import MultiSelect from "../elements/multiSelect";
import FileUploadField from "../elements/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@admin/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@admin/components/ui/tabs";
import { ManufacturerPropertiesForm } from "./manufacturer_properties_form";
import { toast } from "sonner";
import { InferInsertModel } from "drizzle-orm";
import { manufacturers } from "backend/drizzle/schema";
import useToken from "@admin/store/get-token";
import { apiClient } from "@admin/utils/eden";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

const formFactory = createFormFactory<InferInsertModel<typeof manufacturers>>({
  defaultValues: {
    active: true,
    short_name: "",
    name: "",
    description: "",
    city_id: null,
    rating: 0,
  },
});

export default function ManufacturersForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const token = useToken();
  const closeForm = () => {
    form.reset();
    setOpen(false);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageId, setImageId] = useState<string | null>(null);

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const assignRoleMutation = useMutation({
    mutationFn: ({
      category_id,
      manufacturer_id,
    }: {
      category_id: string[];
      manufacturer_id: string;
    }) => {
      return apiClient.api.manufacturers_categories.assign_category.post({
        category_id,
        manufacturer_id,
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => closeForm(),
    onError,
  });

  const onAddSuccess = (actionText: string, data: any) => {
    toast.success(`Manufacturer ${actionText}`);
    if (selectedCategories.length > 0)
      assignRoleMutation.mutate({
        manufacturer_id: data.id,
        category_id: selectedCategories,
      });
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: InferInsertModel<typeof manufacturers>) => {
      return apiClient.api.manufacturers.post({
        data: newTodo,
        fields: ["id", "slug", "description", "active"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => onAddSuccess("added", data),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: (newTodo: {
      data: InferInsertModel<typeof manufacturers>;
      id: string;
    }) => {
      return apiClient.api.manufacturers[newTodo.id].put({
        data: newTodo.data,
        fields: ["id", "slug", "description", "active"],
        $headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (data) => onAddSuccess("updated", data),
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

  const [
    { data: record, isLoading: isRecordLoading },
    { data: categories, isLoading: isCategoriesLoading },
    { data: cities, isLoading: isCitiesLoading },
    {
      data: manufacturerCategories,
      isLoading: isManufacturerCategoriesLoading,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["one_manufacturers", recordId],
        queryFn: async () => {
          if (recordId) {
            const { data } = await apiClient.api.manufacturers[recordId].get({
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return data;
          } else {
            return null;
          }
        },
        enabled: !!recordId && !!token,
      },
      {
        enabled: !!token,
        queryKey: ["categories"],
        queryFn: async () => {
          const { data } = await apiClient.api.categories.get({
            $query: {
              limit: "1000",
              offset: "0",
            },
            $headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return data;
        },
      },
      {
        enabled: !!token,
        queryKey: ["cities"],
        queryFn: async () => {
          const { data } = await apiClient.api.cities.get({
            $query: {
              limit: "1000",
              offset: "0",
            },
            $headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return data;
        },
      },
      {
        enabled: !!recordId && !!token,
        queryKey: ["manufacturers_categories", recordId],
        queryFn: async () => {
          if (recordId) {
            const { data } = await apiClient.api.manufacturers_categories.get({
              $query: {
                limit: "30",
                offset: "0",
                filters: JSON.stringify([
                  {
                    field: "manufacturer_id",
                    operator: "=",
                    value: recordId,
                  },
                ]),
                fields: "category_id,manufacturer_id",
              },
              $headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return data;
          } else {
            return null;
          }
        },
      },
    ],
  });

  const isLoading = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending;
  }, [createMutation.isPending, updateMutation.isPending]);

  const categoriesSelectData = useMemo(() => {
    if (categories && categories.data) {
      return categories.data.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
    }
    return [];
  }, [categories]);

  useEffect(() => {
    if (record && "id" in record) {
      form.setFieldValue("active", record.active);
      form.setFieldValue("name", record.name);
      form.setFieldValue("short_name", record.short_name);
      form.setFieldValue("description", record.description);
      form.setFieldValue("city_id", record.city_id);
    }

    if (manufacturerCategories && manufacturerCategories.data) {
      setSelectedCategories(
        manufacturerCategories.data.map((category) => category.category_id)
      );
    }
  }, [record, form, manufacturerCategories]);

  return (
    <Tabs defaultValue="main" className="w-full mt-4">
      <TabsList className="w-full flex">
        <TabsTrigger value="main" className="w-full">
          Основное
        </TabsTrigger>
        <TabsTrigger value="properties" className="w-full">
          Свойства
        </TabsTrigger>
      </TabsList>
      <TabsContent value="main">
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
                <Label>Лого</Label>
              </div>
              <FileUploadField
                model="manufacturers"
                model_id={recordId}
                onValueChange={(item) => setImageId(item)}
                code="logo"
              />
            </div>
            <div className="space-y-2">
              <div>
                <Label>Короткое название</Label>
              </div>
              <form.Field name="short_name">
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
            <div className="space-y-2">
              <div>
                <Label>Город</Label>
              </div>
              <form.Field name="city_id">
                {(field) => {
                  return (
                    <>
                      <Select
                        {...field.getInputProps()}
                        onValueChange={(value: string) => field.setValue(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities?.data?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  );
                }}
              </form.Field>
            </div>
            <div className="space-y-2">
              <div>
                <Label>Категории</Label>
              </div>
              <MultiSelect
                data={categoriesSelectData}
                value={selectedCategories}
                onValueChange={(value) => setSelectedCategories(value)}
              ></MultiSelect>
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
      </TabsContent>
      <TabsContent value="properties">
        {recordId && <ManufacturerPropertiesForm recordId={recordId} />}
      </TabsContent>
    </Tabs>
  );
}
