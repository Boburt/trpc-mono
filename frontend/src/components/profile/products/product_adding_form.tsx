import * as React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "@tanstack/react-form";
import type { FieldApi } from "@tanstack/react-form";
import { Switch } from "@nextui-org/switch";
import { Drawer } from "vaul";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { apiClient } from "@frontend/src/utils/eden";
import { toast } from "sonner";
import { useCookieState } from "use-cookie-state";
import { useState } from "react";

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
}: {
  setOpen: (open: boolean) => void;
}) => {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const queryClient = useQueryClient();
  const form = useForm<{
    isChecked: boolean;
    productName: string;
    description: string;
    price: number;
  }>({
    defaultValues: {
      isChecked: false,
      productName: "",
      description: "",
      price: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      createMutation.mutate({
        active: value.isChecked,
        name: value.productName,
        description: value.description,
        price: value.price,
      });
    },
  });
  const createMutation = useMutation({
    mutationFn: (newTodo: {
      active: boolean;
      name: string;
      description?: string;
      price?: number;
    }) => {
      return apiClient.api.products.post({
        data: newTodo,
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      form.reset();
      //HSOverlay.close("#hs-overlay-ticket-add");
      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("Новый продукт успешно создано");
      setOpen(false);
    },
  });
  return (
    <div>
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
              name="isChecked"
              children={({ state, handleChange, handleBlur }) => (
                <Switch
                  onChange={(e) => handleChange(e.target.checked)}
                  onBlur={handleBlur}
                  checked={state.value}
                  defaultSelected={state.value}
                  className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
                />
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
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type="number"
                    onChange={(e) => field.handleChange(+e.target.value)}
                    className="py-3 px-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                  />
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
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
    </div>
  );
};
