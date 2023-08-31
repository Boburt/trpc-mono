"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import AuthLayout from "./layout";

import HP from "../../public/images/hp.jpg";
import Link from "next/link";
import Input from "../../components/Input";

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
      <div className="relative w-full h-full bg-[url('/images/alpy-gora.jpg')] bg-cover bg-center">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <div className="flex justify-between">
            <nav className="px-12 py-5">
              <h1 className="text-2xl font-bold text-white">My App</h1>
            </nav>

            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full m-auto mb-10">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login"
                  ? "Существующая компания:"
                  : "Новая компания:"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Company"
                    onChange={(ev: any) => setComp(ev.target.value)}
                    id="Company"
                    type="Company"
                    value={comp}
                  />
                )}
                <Input
                  label="Name"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="Name"
                  type="Name"
                  value={name}
                />
                <Input
                  label="Password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  id="Password"
                  type="Password"
                  value={password}
                />
                <Input
                  label="Email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  id="email"
                  type="email"
                  value={email}
                />
                <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                  {variant === "login" ? "Login" : "Sing Up"}
                </button>
                <p className="text-neutral-500 mt-12 text-center">
                  {variant === "login"
                    ? "First time using?"
                    : "Already have an account?"}
                  <span
                    onClick={toggleVariant}
                    className="text-white ml-1 hover:underline cursor-pointer"
                  >
                    {variant === "login" ? "Create and account" : "Login"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Auth;
