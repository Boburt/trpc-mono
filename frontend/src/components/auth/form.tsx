import { $isLoggedIn, $userData, setAuthData } from "@frontend/src/store/auth";
import { apiClient } from "@frontend/src/utils/eden";
import { useStore } from "@nanostores/react";
import { useForm } from "@tanstack/react-form";
import { users } from "backend/drizzle/schema";
import { useEffect, useState } from "react";
import TelegramLoginButton from "telegram-login-button";
import { InferSelectModel } from "drizzle-orm";

export default function AuthForm({
  error,
  token,
  userData,
}: {
  userData: InferSelectModel<typeof users>;
  error?: string | null;
  token?: string | null;
}) {
  const [errorMessage, setErrorMessage] = useState(error);
  const [isLoading, setIsLoading] = useState(false);

  const getMyData = async () => {
    setIsLoading(true);
    const { data, error } = await apiClient.api.users.me.get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else if (data && "user" in data) {
      setIsLoading(false);
      setAuthData(data.accessToken, data.refreshToken, data.user);
    }
  };

  const form = useForm<{
    login: string;
    password?: string;
  }>({
    defaultValues: {
      login: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const { data, error } = await apiClient.api.users.login.post({
        login: value.login,
        password: value.password!,
      });
      if (error) {
        console.log("error", data.message);
        setIsLoading(false);
        setErrorMessage(data.message);
      } else if (data && "accessToken" in data) {
        setIsLoading(false);
        setAuthData(data.accessToken, data.refreshToken, data.user);
        location.reload();
      }
    },
  });

  useEffect(() => {
    if (token) {
      getMyData();
    }
  }, []);

  if (userData) {
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
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 pl-1"
                href="../examples/html/signup.html"
              >
                Sign up here
              </a>
            </p>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <div className="grid gap-y-4">
                <form.Field
                  name="login"
                  validators={{
                    onChange({ value }) {
                      if (value.length < 3) {
                        return "Логин должен быть не менее 3 символов";
                      }
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <div>
                        <label
                          htmlFor={field.name}
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Логин
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="email-error"
                          />
                          {field.state.meta.errors &&
                          field.state.meta.errors.length ? (
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                              </svg>
                            </div>
                          ) : null}
                        </div>
                        {field.state.meta.errors ? (
                          <p className="text-sm text-red-600 mt-2">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    </>
                  )}
                </form.Field>
                <form.Field
                  name="password"
                  validators={{
                    onChange({ value }) {
                      if (!value || value.length < 3) {
                        return "Логин должен быть не менее 3 символов";
                      }
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <div>
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor={field.name}
                            className="block text-sm mb-2 dark:text-white"
                          >
                            Пароль
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="py-3 border px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="password-error"
                          />
                          {field.state.meta.errors &&
                          field.state.meta.errors.length ? (
                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="flex-shrink-0 h-4 w-4 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="12" />
                                <line x1="12" x2="12.01" y1="16" y2="16" />
                              </svg>
                            </div>
                          ) : null}
                        </div>
                        {field.state.meta.errors ? (
                          <p className="text-sm text-red-600 mt-2">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        ) : null}
                      </div>
                    </>
                  )}
                </form.Field>

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
