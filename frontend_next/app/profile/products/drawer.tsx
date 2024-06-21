"use client";

import { useState } from "react";
import { ProductAddingForm } from "./product_adding_form";
import { Button } from "@nextui-org/button";
import { Edit2Icon, PlusIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

export function ProductDrawer({ record_id }: { record_id?: string }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        isIconOnly
        size="sm"
        onPress={() => setOpen(true)}
        color="primary"
        endContent={!record_id && <PlusIcon />}
      >
        {record_id ? (
          <Edit2Icon className="text-default-500" />
        ) : (
          "Добавить новый продукт"
        )}
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
                {open && (
                  <ProductAddingForm setOpen={setOpen} recordId={record_id} />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
