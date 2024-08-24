import { $accessToken } from "@frontend/src/store/auth";
import Providers from "@frontend/src/store/provider";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "sonner";
import { useCookieState } from "use-cookie-state";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@frontend/src/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@frontend/src/components/ui/dialog";
import { useState } from "react";
import { useMediaQuery } from "@frontend/src/utils/hooks";

export function CreateNewRequest() {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button type="button" className="btn btn-primary">
            Добавить обращение
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить обращение</DialogTitle>
          </DialogHeader>
          {open && <CreateNewRequestForm setOpen={setOpen} />}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button type="button" className="btn btn-primary">
          Добавить обращение
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-3">
        <DialogHeader>
          <DialogTitle>Добавить обращение</DialogTitle>
        </DialogHeader>
        {open && <CreateNewRequestForm setOpen={setOpen} />}
      </DrawerContent>
    </Drawer>
  );
}

export function CreateNewRequestForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [accessToken, setAccessToken] = useCookieState("x-token", "");
  const queryClient = useQueryClient();
  const form = useForm<{
    name: string;
    description?: string;
    category_id: string;
  }>({
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      createMutation.mutate(value);
    },
  });
  const { data: spTicketCategories, isLoading } = useQuery({
    queryKey: ["sp_ticket_categories"],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_ticket_categories.cached.get({
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: (newTodo: {
      name: string;
      description?: string;
      category_id: string;
    }) => {
      return apiClient.api.sp_tickets.post({
        data: newTodo,
        $headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["sp_tickets"] });

      toast.success("Обращение успешно создано");

      setOpen(false);
    },
  });

  return (
    <div className="">
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange({ value }) {
                if (value.length < 3) {
                  return "Тема обращения должна быть не менее 3 символов";
                }
              },
            }}
          >
            {(field) => (
              <>
                <div className="space-y-2">
                  <label
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                    htmlFor={field.name}
                  >
                    Тема
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={clsx([
                        "border py-2 px-3 pe-11 block w-full shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none  dark:text-gray-400",
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                          : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600",
                      ])}
                      placeholder="Введите тему обращения"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors &&
                    field.state.meta.errors.length ? (
                      <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                        <svg
                          className="flex-shrink-0 h-4 w-4 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" x2="12" y1="8" y2="12" />
                          <line x1="12" x2="12.01" y1="16" y2="16" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-600 mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </form.Field>
          <form.Field
            name="category_id"
            validators={{
              onChange({ value }) {
                console.log("category_id", value);
                if (value.length < 1) {
                  return "Укажите категорию обращения";
                }
              },
            }}
          >
            {(field) => (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Категория
                  </label>

                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={clsx(
                      "border py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",
                      field.state.meta.errors && field.state.meta.errors.length
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                    )}
                  >
                    <option>Укажите категорию</option>
                    {spTicketCategories &&
                      Array.isArray(spTicketCategories) &&
                      spTicketCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-600 mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </form.Field>
          <form.Field
            name="description"
            validators={{
              onChange({ value }) {
                if (!value || value?.length < 3) {
                  return "Текст обращения должен быть не менее 3 символов";
                }
              },
            }}
          >
            {(field) => (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-gray-200"
                  >
                    Текст обращения
                  </label>

                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={clsx(
                      "border py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600",
                      field.state.meta.errors && field.state.meta.errors.length
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                        : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:focus:ring-gray-600"
                    )}
                    rows={6}
                    placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page."
                  ></textarea>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-red-600 mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </form.Field>
          <button className="btn btn-primary" type="submit">
            Отправить
          </button>
        </form>
      </form.Provider>
    </div>
  );
}
