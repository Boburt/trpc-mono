import React, { Suspense } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProductRequestStore } from "@frontend_next/store/zustand/productRequest";
import ProductRequestModalProducts from "./product-request-modal-products";
import ProductRequestModalProductsSkeleton from "./product-request-modal-products-skeleton";
import { useMutation } from "@tanstack/react-query";
import { InferInsertModel } from "drizzle-orm";
import { apiClient } from "@frontend_next/lib/eden";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательно"),
  phone: z.string().min(10, "Номер телефона должен содержать 10 цифр"),
  email: z.string().email().optional().or(z.literal("")),
});

type ProductRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof schema>) => void;
  productId?: string;
};

export default function ProductRequestModal({
  isOpen,
  onClose,
  onSubmit,
  productId,
}: ProductRequestModalProps) {
  const { data: session } = useSession();
  const { selectedProducts, isRequestMode, clearSelectedProducts } =
    useProductRequestStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const requestAddMutation = useMutation({
    mutationFn: (newTodo: {
      firstName: string;
      lastName: string;
      phone: string;
      email?: string;
      products: { id: string; quantity: number }[];
    }) => {
      return apiClient.api.product_requests.post(
        {
          ...newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Запрос отправлен");
      clearSelectedProducts();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handleFormSubmit = (data: z.infer<typeof schema>) => {
    requestAddMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      products: isRequestMode
        ? Object.keys(selectedProducts).map((id) => ({
            id,
            quantity: selectedProducts[id],
          }))
        : [{ id: productId!, quantity: 1 }],
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        {/* <ModalHeader>Product Request</ModalHeader> */}
        <ModalBody className="px-0 py-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-content4 py-4 pl-2 pr-2 md:py-8 md:pl-6 md:pr-3">
              <Suspense
                fallback={
                  <ProductRequestModalProductsSkeleton
                    itemsCount={
                      isRequestMode ? Object.keys(selectedProducts).length : 1
                    }
                  ></ProductRequestModalProductsSkeleton>
                }
              >
                <ProductRequestModalProducts
                  productIds={
                    isRequestMode ? Object.keys(selectedProducts) : [productId!]
                  }
                />
              </Suspense>
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="pt-4 md:pt-8 pb-4 pr-6 pl-3 flex flex-col h-full"
            >
              <div className="pb-2 font-bold text-2xl text-content4-foreground uppercase">
                Оставить заявку
              </div>
              <div className="flex-1 flex flex-col justify-center w-full">
                <div className="space-y-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Имя"
                        placeholder="Введите ваше имя"
                        isInvalid={!!errors.firstName}
                        errorMessage={errors.firstName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Фамилия"
                        placeholder="Введите вашу фамилию"
                        isInvalid={!!errors.lastName}
                        errorMessage={errors.lastName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Номер телефона"
                        placeholder="Введите ваш номер телефона"
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Email (необязательно)"
                        placeholder="Введите ваш email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex mt-6 justify-end space-x-3">
                <Button color="danger" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button
                  isLoading={requestAddMutation.isPending}
                  color="primary"
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  Отправить
                </Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
