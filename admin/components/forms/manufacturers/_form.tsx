import { useToast } from "@admin/components/ui/use-toast";
import {
  useManufacturersCreate,
  useManufacturersUpdate,
} from "@admin/store/apis/manufacturers";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { trpc } from "@admin/utils/trpc";
import {
  Manufacturers,
  ManufacturersCreateInputSchema,
} from "@backend/lib/zod";
import { useMemo, useEffect, useState, useCallback } from "react";
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
import MultiSelect from "../elements/multiSelect";
import FileUploadField from "../elements/file-upload";

const formFactory = createFormFactory<
  z.infer<typeof ManufacturersCreateInputSchema>
>({
  defaultValues: {
    active: true,
    short_name: "",
    name: "",
    description: "",
  },
});

export default function ManufacturersForm({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) {
  const { toast } = useToast();
  const closeForm = () => {
    form.reset();
    setOpen(false);
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageId, setImageId] = useState<string | null>(null);

  const onAddSuccess = (actionText: string, data: any) => {
    toast({
      title: "Success",
      description: `Manufacturer ${actionText}`,
      duration: 5000,
    });
    if (selectedCategories.length > 0)
      assignCategories(
        selectedCategories.map((category_id) => ({
          manufacturer_id: data.id,
          category_id,
        }))
      );
  };

  const onError = (error: any) => {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
      duration: 5000,
    });
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
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

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
    }

    if (manufacturerCategories && manufacturerCategories.items) {
      setSelectedCategories(
        manufacturerCategories.items.map((category) => category.category_id)
      );
    }
  }, [record, form, manufacturerCategories]);

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
  );
}
