import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { FieldApi } from "@tanstack/react-form";
import { Switch } from "@nextui-org/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { apiClient } from "@frontend/src/utils/eden";
import { toast } from "sonner";
import { useCookieState } from "use-cookie-state";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import FileUploadField from "@frontend/src/components/elements/file-upload";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { ProductsProfile } from "./products_profile";
import { Input, Textarea } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";
import { Form, FormControl, FormField, FormItem } from "../../ui/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "../../ui/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { cn } from "@admin/lib/utils";
import { buttonVariants } from "../../ui/button";
import { Paperclip, UploadCloud } from "lucide-react";
import { AspectRatio } from "../../ui/aspect-ratio";

interface Properties {
  fabric_type: string;
  raw_material: string;
  fabric_density: string;
  color_and_design: string;
  strength_resistance: string;
  product_tech: string;
}
interface ProductFormValues {
  active: boolean;
  name: string;
  description: string | null;
  price?: number | null;
  files: File[] | null;
  properties: Properties | null;
}

export const ProductAddingForm = ({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");

  const { data: record, isLoading: isRecordLoading } = useQuery({
    queryKey: ["one_product", recordId],
    queryFn: () => {
      if (recordId) {
        return apiClient.api
          .products({
            id: recordId,
          })
          .get({
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
      } else {
        return null;
      }
    },
    enabled: !!recordId && !!accessToken,
  });

  if (!recordId) {
    return <ProductAddingFormWithData setOpen={setOpen} />;
  } else if (!isRecordLoading && record?.data && "id" in record.data) {
    return (
      <ProductAddingFormWithData
        setOpen={setOpen}
        recordId={recordId}
        defaultValues={record.data}
      />
    );
  } else {
    return (
      <>
        <Skeleton className="rounded-lg flex h-full w-full">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </>
    );
  }
};

export const ProductAddingFormWithData = ({
  setOpen,
  recordId,
  defaultValues,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
  defaultValues?: ProductFormValues;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const queryClient = useQueryClient();
  const dropzone = {
    multiple: true,
    maxFiles: 10,
    maxSize: 4 * 1024 * 1024,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    },
  } satisfies DropzoneOptions;
  const form = useForm<ProductFormValues>({
    defaultValues: defaultValues ?? {
      active: false,
      name: "",
      description: "",
      price: undefined,
      files: [],
      properties: {
        fabric_type: "",
        raw_material: "",
        fabric_density: "",
        color_and_design: "",
        strength_resistance: "",
        product_tech: "",
      },
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (value) => {
    console.log(value);
    if (recordId) {
      updateMutation.mutate({
        data: {
          active: value.active,
          name: value.name,
          files: value.files,
          description: value.description,
          price: value.price,
          properties: value.properties,
        },
        id: recordId,
      });
    } else
      createMutation.mutate({
        active: value.active,
        name: value.name,
        files: value.files,
        description: value.description,
        price: value.price,
        properties: value.properties,
      });
  };

  const onAddSuccess = (actionText: string) => {
    toast.success(`${actionText}`);
    queryClient.invalidateQueries({ queryKey: ["products"] });
    // form.reset();
    setOpen(false);
  };

  const onError = (error: any) => {
    toast.error(
      error.value && error.value.message
        ? error.value.message
        : JSON.stringify(error.value)
    );
  };

  const createMutation = useMutation({
    mutationFn: (newTodo: {
      active: boolean;
      name: string;
      description?: string;
      price?: number | null;
      properties: Properties;
    }) => {
      return apiClient.api.products.post(
        {
          data: newTodo,
          fields: [
            "id",
            "name",
            "active",
            "description",
            "price",
            "properties",
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    },
    onSuccess: () => onAddSuccess("Новый продукт успешно создано"),
    onError,
  });

  const updateMutation = useMutation({
    mutationFn: async (newTodo: {
      data: {
        active: boolean;
        name: string;
        description?: string;
        price?: number | null;
        properties: Properties;
      };
      id: string;
    }) => {
      const { data, error, status } = await apiClient.api
        .products({
          id: newTodo.id,
        })
        .put(
          {
            data: newTodo.data,
            fields: [
              "id",
              "name",
              "active",
              "description",
              "price",
              "properties",
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      if (status === 200) {
        return data;
      } else {
        throw error;
      }
    },
    onSuccess: () => onAddSuccess("Продукт успешно обновлен"),
    onError,
  });

  return (
    <div className="flex w-full flex-col flex-grow">
      <Form {...form}>
        <form
          className="flex flex-col h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex-grow">
            <Tabs aria-label="Options">
              <Tab key="photos" title="Общие">
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                {/* A type-safe field component*/}
                <FormField
                  control={form.control}
                  name="name"
                  // validators={{
                  //   onChange: ({ value }) =>
                  //     !value
                  //       ? "A product name is required"
                  //       : value.length < 2
                  //       ? "Product name must be at least 2 characters"
                  //       : undefined,
                  //   onChangeAsyncDebounceMs: 500,
                  //   onChangeAsync: async ({ value }) => {
                  //     await new Promise((resolve) => setTimeout(resolve, 1000));
                  //     return (
                  //       value.includes("error") &&
                  //       'No "error" allowed in product name'
                  //     );
                  //   },
                  // }}
                  render={({ field }) => {
                    // Avoid hasty abstractions. Render props are great!
                    return (
                      <div>
                        <FormControl>
                          <Input
                            label="Название продукта"
                            labelPlacement="outside"
                            placeholder="Введите название продукта"
                            onValueChange={field.onChange}
                            variant="bordered"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Textarea
                          label="Описание продукта"
                          labelPlacement="outside"
                          placeholder="Введите описание продукта"
                          variant="bordered"
                          {...field}
                          value={field.value ? field.value.toString() : ""}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Цена"
                          labelPlacement="outside"
                          placeholder="Цена"
                          type="number"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                сум
                              </span>
                            </div>
                          }
                          variant="bordered"
                          {...field}
                          value={field.value ? field.value.toString() : ""}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <div className="relative">
                      <FormItem>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          dropzoneOptions={dropzone}
                        >
                          <FileInput className="w-full px-4 py-5 flex flex-col my-3 items-center text-sm rounded-lg border border-gray-300 bg-white">
                            <UploadCloud />
                            <div>
                              <span className="font-bold">Кликните здесь</span>{" "}
                              или перетащите файлы сюда
                            </div>
                            <div>JPG, PNG, GIF, WEBP</div>
                          </FileInput>
                          {field.value && field.value.length > 0 && (
                            <FileUploaderContent className="p-2  w-full -ml-3 rounded-b-none rounded-t-md flex-row gap-2 grid grid-cols-4">
                              {field.value.map((file, i) => (
                                <FileUploaderItem
                                  key={i}
                                  index={i}
                                  aria-roledescription={`file ${
                                    i + 1
                                  } containing ${file.name}`}
                                  className="p-0 size-20"
                                >
                                  <AspectRatio className="size-full">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                      className="aspect-square rounded-md"
                                    />
                                  </AspectRatio>
                                </FileUploaderItem>
                              ))}
                            </FileUploaderContent>
                          )}
                        </FileUploader>
                      </FormItem>
                    </div>
                  )}
                />
                {/* <div>
            <FileUploadField
              model="products"
              model_id={recordId}
              onValueChange={(item) => setImageId(item)}
              code="main"
            />
          </div> */}

                {/* <div>
                    <form.Field
                      name="quantity"
                      children={(field) => (
                        <>
                          <label htmlFor={field.name}>Количество:</label>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(+e.target.value)
                            }
                            type="number"
                            className="py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                          <FieldInfo field={field} />
                        </>
                      )}
                    />
                  </div> */}
              </Tab>
              <Tab key="properties" title="Характеристики">
                <FormField
                  control={form.control}
                  name="properties.fabric_type"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Тип ткани"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="properties.raw_material"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Сырьё"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="properties.fabric_density"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Плотность ткани"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="properties.color_and_design"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Цвет и дизайн"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="properties.strength_resistance"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Прочность и износостойкость"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="properties.product_tech"
                  render={({ field }) => (
                    <div>
                      <FormControl>
                        <Input
                          label="Технологии производства"
                          labelPlacement="outside"
                          variant="bordered"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  )}
                />

                {/* <ProductsProfile /> */}
              </Tab>
            </Tabs>
          </div>
          <Button
            color="primary"
            isDisabled={form.formState.isSubmitting}
            className="mt-10 w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "..." : "Сохранить"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
