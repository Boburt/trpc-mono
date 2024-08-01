"use client";
import { apiClient } from "@frontend_next/lib/eden";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import TelegramLoginButton from "telegram-login-button";
import { useSession, signIn as signInNextAuth } from "next-auth/react";
import { signInLocal } from "./actions/signin";
import { signIn } from "@frontend_next/auth";
interface FormValues {
  login: string;
  password: string;
}
export default function AuthForm() {
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<FormValues>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const action: () => void = handleSubmit(async (data) => {
    try {
      const signData = await signInLocal({
        login: data.login,
        password: data.password,
      });
      if (signData?.error) {
        setErrorMessage(signData.error);
      } else {
        setErrorMessage("");
        await signInNextAuth("credentials", {
          login: data.login,
          password: data.password,
          redirect: false,
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
    // const response = await signInLocal(data);
    // console.log("response", response);
    // console.log("response", response);
    // if (response?.error) {
    //   setErrorMessage(response.error);
    // } else {
    //   setErrorMessage("");
    //   await signInNextAuth("credentials", {
    //     login: data.login,
    //     password: data.password,
    //     redirect: false,
    //   });
    // }
  });

  if (session?.user) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Вы уже авторизованы
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
          </div>
          {errorMessage && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <div className="mt-5">
            <div className="mx-auto">
              <TelegramLoginButton
                botName="TexPromUzBot"
                dataAuthUrl="/api/tg"
                buttonSize="large"
                requestAccess
                usePic
                cornerRadius={10}
              />
            </div>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>
            <form action={action}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="login"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Логин
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="login"
                      {...register("login", {
                        required: "Логин обязателен",
                        minLength: {
                          value: 3,
                          message: "Логин должен быть не менее 3 символов",
                        },
                      })}
                      className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                    />
                    {errors.login && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.login.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Пароль
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "Пароль обязателен",
                        minLength: {
                          value: 3,
                          message: "Пароль должен быть не менее 3 символов",
                        },
                      })}
                      className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      ></span>
                      Загрузка...
                    </>
                  ) : (
                    "Войти"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
