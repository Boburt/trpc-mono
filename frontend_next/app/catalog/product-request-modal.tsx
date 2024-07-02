import React from "react";
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
};

export default function ProductRequestModal({
  isOpen,
  onClose,
  onSubmit,
}: ProductRequestModalProps) {
  const { selectedProducts } = useProductRequestStore();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Product Request</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          </form>
          <div className="mt-4">
            <h4>Selected Products:</h4>
            <ul>
              {Object.entries(selectedProducts).map(([id, quantity]) => (
                <li key={id}>
                  Product ID: {id}, Quantity: {quantity}
                </li>
              ))}
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit(handleFormSubmit)}>
            Submit Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
