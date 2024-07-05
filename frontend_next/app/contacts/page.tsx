"use client";
import { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32">
        <div className="flex justify-center">
          <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="mb-12 px-6 text-3xl font-bold">Контакты</h2>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
            <form>
              <div className="grid gap-4">
                <Input label="Имя" type="" />
                <Input label="Email" type="" />
                <Input label="Телефон" type="" />
                <Input label="Сообщение" type="" />

                <div
                  className="my-2 cursor-pointer  hover:underline"
                  onClick={() => setIsOpen(true)}
                >
                  Политика конфиденциальности
                </div>
                <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                  <ModalContent>
                    <ModalHeader>Политика конфиденциальности</ModalHeader>
                    <ModalBody>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    id="exampleCheck96"
                    size="sm"
                    className="w-8"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck96"
                  >
                    Я согласен с политикой конфиденциальности
                  </label>
                </div>
              </div>
              <Button className="my-2">Отправить</Button>
            </form>
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="ml-6 grow">
                    <p className="mb-2 font-bold dark:text-white">Адрес</p>
                    <p className="text-neutral-500 dark:text-neutral-200">
                      ТАШКЕНТСКАЯ ОБЛАСТЬ, ГОРОД НУРАФШАН, ТАРА ҚҚ ИЁТ МФЙ,
                      ЮКСАЛИШ КУЧАСИ, 23-УЙ, 19-ХОНАДОН
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-200">
                      <a href="tel: +998 99 414 15 50">+998 99 414 15 50</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
