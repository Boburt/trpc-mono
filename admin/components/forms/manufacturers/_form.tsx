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
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const onAddSuccess = (actionText: string, data: any) => {
    toast.success(`Manufacturer ${actionText}`);
    if (selectedCategories.length > 0)
      assignCategories(
        selectedCategories.map((category_id) => ({
          manufacturer_id: data.id,
          category_id,
        }))
      );
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const { mutateAsync: asyncAssignCategories } =
    trpc.manufacturersCategories.assignCategoriesToManufacturer.useMutation({
      onSuccess: () => closeForm(),
      onError,
    });

  const assignCategories = async (
    recordData: {
      manufacturer_id: string;
      category_id: string;
    }[]
  ) => {
    await asyncAssignCategories({
      data: recordData,
    });
    return closeForm();
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
  const {
    mutateAsync: createManufacturer,
    isLoading: isAddLoading,
    data,
    error,
  } = useManufacturersCreate({
    onSettled: (data) => onAddSuccess("added", data),
    onError,
  });

  const {
    mutateAsync: updateManufacturer,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useManufacturersUpdate({
    onSettled: (data) => onAddSuccess("updated", data),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateManufacturer({ data: values, where: { id: recordId } });
      } else {
        createManufacturer({ data: values });
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
  ] = trpc.useQueries((t) => [
    t.manufacturers.one(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId,
      }
    ),
    t.categories.list({
      take: 1000,
    }),
    t.cities.list({
      take: 1000,
    }),
    t.manufacturersCategories.categoriesByManufacturer(
      {
        where: {
          manufacturer_id: {
            equals: recordId,
          },
        },
      },
      {
        enabled: !!recordId,
      }
    ),
  ]);

  const isLoading = useMemo(() => {
    return createMutation.isPending || isUpdateLoading;
  }, [createMutation.isPending, isUpdateLoading]);

  const categoriesSelectData = useMemo(() => {
    if (categories && categories.items) {
      return categories.items.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      });
    }
    return [];
  }, [categories]);

  useEffect(() => {
    if (record) {
      form.setFieldValue("active", record.active);
      form.setFieldValue("name", record.name);
      form.setFieldValue("short_name", record.short_name);
      form.setFieldValue("description", record.description);
      form.setFieldValue("city_id", record.city_id);
    }

    if (manufacturerCategories && manufacturerCategories.items) {
      setSelectedCategories(
        manufacturerCategories.items.map((category) => category.category_id)
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
                          {cities?.items.map((item) => (
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
