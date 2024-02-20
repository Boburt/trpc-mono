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

export const ProductAddingForm = ({
  setOpen,
  recordId,
}: {
  setOpen: (open: boolean) => void;
  recordId?: string;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const queryClient = useQueryClient();
  const form = useForm<{
    active: boolean;
    productName: string;
    description: string;
    price?: number | null;
  }>({
    defaultValues: {
      active: false,
      productName: "",
      description: "",
      price: undefined,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      if (recordId) {
        updateMutation.mutate({
          data: {
            active: value.active,
            name: value.productName,
            description: value.description,
            price: value.price,
          },
          id: recordId,
        });
      } else
        createMutation.mutate({
          active: value.active,
          name: value.productName,
          description: value.description,
          price: value.price,
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

  useEffect(() => {
    if (record?.data && "id" in record.data) {
      form.setFieldValue("active", record.data.active);
      form.setFieldValue("productName", record.data.name);
      form.setFieldValue(
        "description",
        record.data.description ? record.data.description : ""
      );
      form.setFieldValue("price", record.data.price);
    }
  }, [record]);

  const createMutation = useMutation({
    mutationFn: (newTodo: {
      active: boolean;
      name: string;
      description?: string;
      price?: number | null;
    }) => {
      return apiClient.api.products.post({
        data: newTodo,
        fields: ["id", "name", "active", "description", "price"],
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
      };
      id: string;
    }) => {
      const { data, error, status } = await apiClient.api.products[
        newTodo.id
      ].put({
        data: newTodo.data,
        fields: ["id", "name", "active", "description", "price"],
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

  const variants = [
    "solid",
    "underlined",
    "bordered",
    "light",
  ];

  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" >
          <Tab key="photos" title="Общие">
            <Card>
              <CardBody>

                <form.Provider>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void form.handleSubmit();
                    }}
                  >
                    <div className="py-4">
                      <form.Field
                        name="active"
                        children={(field) => (
                          <>
                            <Switch
                              checked={field.state.value}
                              onBlur={field.handleBlur}
                              isSelected={field.state.value}
                              onChange={(e) => field.handleChange(e.target.checked)}
                            />
                          </>
                        )}
                      />
                    </div>
                    <div>
                      {/* A type-safe field component*/}
                      <form.Field
                        name="productName"
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
                            <>
                              <label htmlFor={field.name}>Название продукта</label>
                              <input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="py-3 px-4 block w-full border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-70 bg-gray-100 dark:text-gray-400 dark:focus:ring-gray-600"
                              />
                              <FieldInfo field={field} />
                            </>
                          );
                        }}
                      />
                    </div>
                    <div className="py-6">
                      <form.Field
                        name="description"
                        children={(field) => (
                          <>
                            <label htmlFor={field.name}>Описание продукта</label>
                            <textarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              className="py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                            />
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                    </div>
                    <div>
                      <form.Field
                        name="price"
                        children={(field) => (
                          <>
                            <label htmlFor={field.name}>Цена:</label>
                            <input
                              id={field.name}
                              name={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              type="number"
                              onChange={(e) =>
                                field.handleChange(
                                  e.target.value ? +e.target.value : undefined
                                )
                              }
                              className="py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                            />
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                    </div>
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
                </form.Provider>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="properties" title="Характеристики">
            <Card>
              <CardBody>
                <ProductsProfile />
              </CardBody>
            </Card>
          </Tab>

        </Tabs>
      </div>
    </div>
  );
};
