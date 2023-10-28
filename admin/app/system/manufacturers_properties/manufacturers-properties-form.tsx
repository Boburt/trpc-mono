"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { Button } from "@components/ui/button";
import { trpc } from "@admin/utils/trpc";

import { useState, useMemo, useEffect } from "react";
import { useToast } from "@components/ui/use-toast";
import * as z from "zod";
import { useManufacturersPropertiesCategoriesStore } from "@admin/store/states/manufacturersPropertiesCategories";
import { createFormFactory } from "@tanstack/react-form";
import {
  useManufacturersPropertiesCreate,
  useManufacturersPropertiesUpdate,
} from "@admin/store/apis/manufacturers_properties";
import { ManufacturersPropertiesCreateInputSchema } from "@backend/lib/zod";
import { Label } from "@admin/components/ui/label";
import { Input } from "@admin/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@admin/components/ui/accordion";
import { useCachedLangsQuery } from "@admin/store/apis/langs";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@admin/components/ui/select";
import short from "short-uuid";
import { AdditionalDataItem } from "@admin/types/ui-types";
import { toast } from "sonner";
import { Switch } from "@admin/components/ui/switch";

const propertyTypesLabel = {
  string: "Строка",
  number: "Число",
  boolean: "Да/Нет",
  list: "Список",
  date: "Дата",
};

const formFactory = createFormFactory<
  z.infer<typeof ManufacturersPropertiesCreateInputSchema>
>({
  // @ts-ignore
  defaultValues: {
    name: "",
    code: "",
    i18n_name: {},
    type: "string",
    show_in_filter: false,
    show_in_list: false,
  },
});

export default function ManufacturersPropertiesForm({
  children,
  recordId,
}: {
  children: React.ReactNode;
  recordId?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const roleSelection = useManufacturersPropertiesCategoriesStore(
    (state) => state.selectedRows
  );

  const selectedRoleId = useMemo(() => {
    return Object.keys(roleSelection)[0];
  }, [roleSelection]);

  const onAddSuccess = (actionText: string) => {
    toast.success(`Property ${actionText}`);
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(error.message);
  };

  const {
    mutateAsync: createManufacturersProperty,
    isLoading: isAddLoading,
    data,
    error,
  } = useManufacturersPropertiesCreate({
    onSuccess: () => onAddSuccess("added"),
    onError,
  });

  const {
    mutateAsync: updateManufacturersProperty,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useManufacturersPropertiesUpdate({
    onSuccess: () => onAddSuccess("updated"),
    onError,
  });

  const form = formFactory.useForm({
    onSubmit: async (values, formApi) => {
      if (recordId) {
        updateManufacturersProperty({
          /** @ts-ignore */
          data: { ...values, category_id: selectedRoleId },
          where: { id: recordId },
        });
      } else {
        createManufacturersProperty({
          /** @ts-ignore */
          data: { ...values, category_id: selectedRoleId },
        });
      }
    },
  });

  const { data: record, isLoading: isRecordLoading } =
    trpc.manufacturersProperties.one.useQuery(
      {
        where: { id: recordId },
      },
      {
        enabled: !!recordId,
      }
    );

  const { data: langs, isLoading: isLangsLoading } = useCachedLangsQuery({});

  const beforeOpen = async (open: boolean) => {
    if (open) {
      // Do something before the sheet opens.
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const isLoading = useMemo(() => {
    return isAddLoading || isUpdateLoading;
  }, [isAddLoading, isUpdateLoading]);

  useEffect(() => {
    if (record) {
      form.setFieldValue("code", record.code);
      form.setFieldValue("name", record.name);
      form.setFieldValue("i18n_name", record.i18n_name ?? {});
      form.setFieldValue("type", record.type);
      form.setFieldValue("show_in_filter", record.show_in_filter);
      form.setFieldValue("show_in_list", record.show_in_list);
      form.setFieldValue("additional_data", record.additional_data ?? {});
    }
  }, [record]);

  return (
    <Sheet onOpenChange={beforeOpen} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{recordId ? "Edit" : "Add"} Property</SheetTitle>
        </SheetHeader>
        <div className="h-[85vh] overflow-y-auto w-full">
          <div className="space-y-4 mx-2">
            <div className="mt-4">
              <form.Provider>
                <form {...form.getFormProps()} className="space-y-8">
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
                      <Label>Показывать в фильтре</Label>
                    </div>
                    <form.Field name="show_in_filter">
                      {(field) => {
                        return (
                          <>
                            <Switch
                              {...field.getInputProps()}
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
                      <Label>Показывать в списке</Label>
                    </div>
                    <form.Field name="show_in_list">
                      {(field) => {
                        return (
                          <>
                            <Switch
                              {...field.getInputProps()}
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
                      <Label>Тип</Label>
                    </div>
                    <form.Field name="type">
                      {(field) => {
                        return (
                          <>
                            <Select
                              {...field.getInputProps()}
                              /** @ts-ignore */
                              onValueChange={field.setValue}
                              defaultValue={field.getValue() ?? ""}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(propertyTypesLabel).map((key) => (
                                  <SelectItem key={key} value={key}>
                                    {
                                      propertyTypesLabel[
                                        key as keyof typeof propertyTypesLabel
                                      ]
                                    }
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </>
                        );
                      }}
                    </form.Field>
                  </div>
                  <form.Subscribe selector={(state) => [state.values]}>
                    {([values]) =>
                      values.type === "list" ? (
                        <>
                          <div className="space-y-2">
                            <div>
                              <Label>Список значений</Label>
                            </div>
                            <form.Field name="additional_data">
                              {(field) => {
                                let val = field.getValue();
                                if (val && typeof val == "string") {
                                  val = JSON.parse(
                                    val as string
                                  ) as AdditionalDataItem[];
                                }
                                const items =
                                  val ?? ([] as AdditionalDataItem[]);
                                return (
                                  <>
                                    <div className="space-y-2">
                                      {
                                        /** @ts-ignore */
                                        items.map(
                                          (
                                            item: AdditionalDataItem,
                                            index: number
                                          ) => (
                                            <div
                                              className="flex space-x-2"
                                              key={item.id}
                                            >
                                              <Input
                                                value={item.value}
                                                onChange={(e) => {
                                                  const newItems = [
                                                    ...items,
                                                  ] as AdditionalDataItem[];
                                                  newItems[index].value =
                                                    e.target.value;
                                                  field.setValue(newItems);
                                                }}
                                              />
                                              <Button
                                                variant="destructive"
                                                className="cursor-pointer"
                                                onClick={() => {
                                                  const newItems = [
                                                    ...items,
                                                  ] as AdditionalDataItem[];
                                                  newItems.splice(index, 1);
                                                  field.setValue(newItems);
                                                }}
                                                asChild
                                              >
                                                <span>Delete</span>
                                              </Button>
                                            </div>
                                          )
                                        )
                                      }
                                    </div>
                                    <Button
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.setValue([
                                          /** @ts-ignore */
                                          ...items,
                                          {
                                            id: short.generate(),
                                            value: "",
                                          },
                                        ]);
                                      }}
                                      asChild
                                    >
                                      <span>Add</span>
                                    </Button>
                                  </>
                                );
                              }}
                            </form.Field>
                          </div>
                        </>
                      ) : (
                        <></>
                      )
                    }
                  </form.Subscribe>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </form>
              </form.Provider>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
