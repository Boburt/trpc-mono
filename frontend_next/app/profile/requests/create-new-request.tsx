import { apiClient } from "@frontend_next/lib/eden";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { toast } from "sonner";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";

export function CreateNewRequest() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button onPress={() => setOpen(true)} color="primary">
        Добавить обращение
      </Button>
      <Modal
        isOpen={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
        placement="auto"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Добавить обращение
              </ModalHeader>
              <ModalBody>
                {open && <CreateNewRequestForm setOpen={setOpen} />}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export function CreateNewRequestForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    description?: string;
    category_id: string;
  }>({
    defaultValues: {
      name: "",
      description: "",
      category_id: "",
    },
  });

  const { data: spTicketCategories, isLoading } = useQuery({
    queryKey: ["sp_ticket_categories"],
    queryFn: async () => {
      const { data } = await apiClient.api.sp_ticket_categories.cached.get({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
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
      return apiClient.api.sp_tickets.post(
        {
          data: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["sp_tickets"] });

      toast.success("Обращение успешно создано");

      setOpen(false);
    },
  });

  const onSubmit = (data: {
    name: string;
    description?: string;
    category_id: string;
  }) => {
    createMutation.mutate(data);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Тема обращения должна быть не менее 3 символов",
              minLength: {
                value: 3,
                message: "Тема обращения должна быть не менее 3 символов",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Тема"
                placeholder="Введите тему обращения"
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                fullWidth
                variant="bordered"
              />
            )}
          />
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Укажите категорию обращения" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Укажите категорию"
                label="Категория"
                errorMessage={
                  errors.category_id ? errors.category_id.message : ""
                }
                isInvalid={!!errors.category_id}
                fullWidth
                aria-labelledby="category_id"
                variant="bordered"
              >
                {spTicketCategories && Array.isArray(spTicketCategories) ? (
                  spTicketCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="empty" value="">
                    Не выбрано
                  </SelectItem>
                )}
              </Select>
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Текст обращения должен быть не менее 3 символов",
              minLength: {
                value: 3,
                message: "Текст обращения должен быть не менее 3 символов",
              },
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Текст обращения"
                placeholder="Введите текст обращения"
                errorMessage={
                  errors.description ? errors.description.message : ""
                }
                isInvalid={!!errors.description}
                fullWidth
                rows={6}
                variant="bordered"
              />
            )}
          />
        </div>
        <ModalFooter className="pr-0">
          <Button type="submit" color="primary">
            Отправить
          </Button>
        </ModalFooter>
      </form>
    </div>
  );
}
