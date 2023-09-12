/* eslint-disable react/jsx-no-undef */
"use client";
import { Controller, useForm } from "react-hook-form";
import Iconinfo from "@/components/Map/Iconinfo";
import Location from "@/components/Map/icon/Location";
import Phone from "@/components/Map/icon/Phone";
import Mail from "@/components/Map/icon/Mail";
import FormElement from "@/components/Map/FormElement";

export default function Contact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50 bg-base-100 shadow-xl rounded-lg">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Контакты</h1>
            <p className="pt-2 pb-4">Заполните форму, чтобы начать разговор</p>
            <div className="space-y-4 mt-2">
              <p className="flex items-center">
                <a href="">
                  <Iconinfo icon={<Location />} text="Location 24 po" />
                </a>
              </p>
              <p className="flex items-center">
                <a href="tel:+99899999999">
                  <Iconinfo icon={<Phone />} text="+99899999999" />
                </a>
              </p>
              <p className="flex items-center">
                <a href="email:contact@business.com">
                  <Iconinfo icon={<Mail />} text="contact@business.com" />
                </a>
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormElement
                  type="text"
                  label="Name"
                  placeholder="Enter name here..."
                  fieldRef={field}
                  hasError={errors.name?.type === "required"}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormElement
                  type="email"
                  label="Email"
                  placeholder="Enter email here..."
                  fieldRef={field}
                  hasError={errors.email?.type === "required"}
                />
              )}
            />
            <Controller
              name="message"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormElement
                  type="textarea"
                  label="Message"
                  placeholder="Enter message here..."
                  fieldRef={field}
                  hasError={errors.message?.type === "required"}
                />
              )}
            />
            <button
              type="submit"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri dark:bg-violet-400 dark:text-gray-900 focus:ri hover:ri"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
