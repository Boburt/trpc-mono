import * as React from "react";
import { useForm } from "@tanstack/react-form";
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

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <em>{field.state.meta.touchedErrors}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
interface Properties {
  fabric_type: string;
  raw_material: string;
  fabric_density: string;
  color_and_design: string;
  strength_resistance: string;
  product_tech: string;
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
        return apiClient.api.products[recordId].get({
          $headers: {
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
  defaultValues?: {
    active: boolean;
    name: string;
    description: string;
    price?: number | null;
    properties: Properties;
  };
}) => {
  console.log("defaultValues", defaultValues);
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const queryClient = useQueryClient();
  const form = useForm<{
    active: boolean;
    name: string;
    description: string;
    price?: number | null;
    properties: Properties;
  }>({
    defaultValues: defaultValues ?? {
      active: false,
      name: "",
      description: "",
      price: undefined,
      properties: {
        fabric_type: "",
        raw_material: "",
        fabric_density: "",
        color_and_design: "",
        strength_resistance: "",
        product_tech: "",
      },
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      if (recordId) {
        updateMutation.mutate({
          data: {
            active: value.active,
            name: value.name,
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
          description: value.description,
          price: value.price,
          properties: value.properties,
        });
    },
  });

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
      return apiClient.api.products.post({
        data: newTodo,
        fields: ["id", "name", "active", "description", "price", "properties"],
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => onAddSuccess("Новый продукт успешно создано"),
    onError,

    // {
    //   form.reset();
    //   //HSOverlay.close("#hs-overlay-ticket-add");
    //   queryClient.invalidateQueries({ queryKey: ["products"] });

    //   setOpen(false);
    // },
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
      const { data, error, status } = await apiClient.api.products[
        newTodo.id
      ].put({
        data: newTodo.data,
        fields: ["id", "name", "active", "description", "price", "properties"],
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === 200) {
        return data;
      } else {
        throw error;
      }
    },
    onSuccess: () => onAddSuccess("Продукт успешно обновлен"),
    onError,

    // {
    //   form.reset();
    //   //HSOverlay.close("#hs-overlay-ticket-add");
    //   queryClient.invalidateQueries({ queryKey: ["products"] });

    //   toast.success("Продукт успешно обновлен");
    //   setOpen(false);
    // },
  });

  const variants = ["solid", "underlined", "bordered", "light"];

  return (
    <div className="flex w-full flex-col flex-grow">
      <form
        className="flex flex-col h-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <div className="flex-grow">
          <Tabs aria-label="Options">
            <Tab key="photos" title="Общие">
              <form.Field
                name="active"
                children={(field) => (
                  <div>
                    <Switch
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      isSelected={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                    />
                  </div>
                )}
              />
              {/* A type-safe field component*/}
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A product name is required"
                      : value.length < 2
                      ? "Product name must be at least 2 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in product name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <div>
                      <Input
                        label="Название продукта"
                        labelPlacement="outside"
                        placeholder="Введите название продукта"
                        value={field.state.value}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onValueChange={(value) => field.handleChange(value)}
                        variant="bordered"
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              />
              <form.Field
                name="description"
                children={(field) => (
                  <div>
                    <Textarea
                      label="Описание продукта"
                      labelPlacement="outside"
                      placeholder="Введите описание продукта"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onValueChange={(value) => field.handleChange(value)}
                      variant="bordered"
                    />
                  </div>
                )}
              />
              <form.Field
                name="price"
                children={(field) => (
                  <div>
                    <Input
                      label="Цена"
                      labelPlacement="outside"
                      placeholder="Цена"
                      value={field.state.value ?? ""}
                      type="number"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value ? +e.target.value : undefined
                        )
                      }
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
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
              <form.Field
                name="properties.fabric_type"
                children={(field) => (
                  <div>
                    <Input
                      label="Тип ткани"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="properties.raw_material"
                children={(field) => (
                  <div>
                    <Input
                      label="Сырьё"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="properties.fabric_density"
                children={(field) => (
                  <div>
                    <Input
                      label="Плотность ткани"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="properties.color_and_design"
                children={(field) => (
                  <div datatype={field.state.value}>
                    <Input
                      label="Цвет и дизайн"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="properties.strength_resistance"
                children={(field) => (
                  <div>
                    <Input
                      label="Прочность и износостойкость"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />
              <form.Field
                name="properties.product_tech"
                children={(field) => (
                  <div>
                    <Input
                      label="Технологии производства"
                      labelPlacement="outside"
                      value={field.state.value}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      variant="bordered"
                    />
                    <FieldInfo field={field} />
                  </div>
                )}
              />

              {/* <ProductsProfile /> */}
            </Tab>
          </Tabs>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              color="primary"
              isDisabled={!canSubmit}
              className="mt-10 w-full"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Сохранить"}
            </Button>
          )}
        />
      </form>
    </div>
  );
};
