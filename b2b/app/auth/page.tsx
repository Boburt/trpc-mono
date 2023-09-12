"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import AuthLayout from "./layout";

import HP from "../../public/images/hp.jpg";
import Link from "next/link";
import Input from "../../components/Input";
import Simple from "@/components/Wizard";

const Auth = () => {
  const [comp, setComp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  return (
    <AuthLayout>
      <div className="container relative hidden w-full h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={"/examples/authentication"}
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          LOGIN{" "}
        </Link>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900 w-full"></div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                {variant === "login"
                  ? "Существующая компания:"
                  : "Новая компания:"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <fieldset>
              <legend>Published status</legend>

              <input
                id="draft"
                className="peer/draft"
                type="radio"
                name="status"
                checked
              />
              <label for="draft" class="peer-checked/draft:text-sky-500">
                Новая Компания
              </label>

              <input
                id="published"
                className="peer/published"
                type="radio"
                name="status"
              />
              <label
                for="published"
                class="peer-checked/published:text-sky-500"
              >
                Существующая компания
              </label>

              <div className="hidden peer-checked/draft:block">
                <Simple />
              </div>
              <div className="hidden peer-checked/published:block">
                Существующая компания
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Auth;
