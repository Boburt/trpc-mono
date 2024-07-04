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

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
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
  const { selectedProducts, isRequestMode } = useProductRequestStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        {/* <ModalHeader>Product Request</ModalHeader> */}
        <ModalBody className="px-0 py-0">
          <div className="grid grid-cols-2">
            <div className="bg-content4 py-8 pl-6 pr-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ProductRequestModalProducts
                  productIds={
                    isRequestMode ? Object.keys(selectedProducts) : [productId!]
                  }
                />
              </Suspense>
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="pb-4 pr-6 pl-3 flex flex-col h-full"
            >
              <div className="flex-1 flex flex-col justify-center w-full">
                <div className="space-y-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="First Name"
                        placeholder="Enter your first name"
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
                        label="Last Name"
                        placeholder="Enter your last name"
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
                        label="Phone"
                        placeholder="Enter your phone number"
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
                        label="Email (Optional)"
                        placeholder="Enter your email"
                        errorMessage={errors.email?.message}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex mt-6 justify-end">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
