import { login } from "@frontend/src/store/auth";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
type authFormData = {
  login: string;
  password: string;
};

export const AuthModal = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<authFormData>();
  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null);
    const res = await login(data.login, data.password);
    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      window.auth_modal.close();
    }
  });
  return (
    <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Авторизация
        </h3>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {errorMessage && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </div>
        )}
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="login"
              className={clsx([
                "block mb-2 text-sm font-medium",
                errors.login && "text-red-500",
                !errors.login && "text-gray-900 dark:text-white",
              ])}
            >
              Логин
            </label>
            <input
              type="text"
              id="login"
              className={clsx([
                "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500",
                errors.login &&
                  "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
                !errors.login &&
                  "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-primary-600",
              ])}
              {...register("login", { required: true })}
              aria-invalid={errors.login ? "true" : "false"}
            />
            {errors.login?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className={clsx([
                "block mb-2 text-sm font-medium",
                errors.password && "text-red-500",
                !errors.password && "text-gray-900 dark:text-white",
              ])}
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className={clsx([
                "bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500",
                errors.password &&
                  "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500",
                !errors.password &&
                  "border-gray-300 dark:border-gray-600 dark:focus:border-blue-500 focus:border-primary-600",
              ])}
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="toggle"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember">Запомнить меня</label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Забыли пароль?
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Войти
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <a
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </a>
          </p>
        </form>
        <span className="modal-backdrop"></span>
      </div>
    </dialog>
  );
};
