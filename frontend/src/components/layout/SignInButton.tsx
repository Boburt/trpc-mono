import { $isLoggedIn, $userData, logout } from "@frontend/src/store/auth";
import { useStore } from "@nanostores/react";
import { users } from "backend/drizzle/schema";
import { FaRegUserCircle, FaUsers, FaWpforms } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { InferSelectModel } from "drizzle-orm";

export default function SignInButton({
  userData,
  permissions,
}: {
  userData: InferSelectModel<typeof users>;
  permissions: string[];
}) {
  if (userData) {
    const userName = [userData.first_name, userData.last_name]
      .filter((x) => x)
      .join(" ");
    const userLogin = userData.tg_username ?? userData.login;
    return (
      <div className="hs-dropdown relative inline-flex">
        <button
          id="hs-dropdown-custom-trigger"
          type="button"
          className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          {userData.photo_url && (
            <img
              className="w-8 h-auto rounded-full"
              src={userData.photo_url}
              alt={userName}
            />
          )}
          <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
            {userName}
          </span>
          <svg
            className="hs-dropdown-open:rotate-180 w-4 h-4"
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
          aria-labelledby="hs-dropdown-with-header"
        >
          <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Вошёл как
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
              {userLogin}
            </p>
          </div>
          <div className="mt-2 py-2 first:pt-0 last:pb-0">
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
              href="/profile"
            >
              <FaRegUserCircle />
              Профиль
            </a>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
              href="/profile/requests"
            >
              <MdOutlineSettingsApplications />
              Обращения
            </a>
            {permissions && permissions.includes("forms.list") && (
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                href="/profile/forms"
              >
                <FaWpforms />
                Формы
              </a>
            )}
            <button
              type="button"
              className="w-full py-3 px-4 mt-2 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              onClick={() => logout()}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <a
        className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
        href="/login"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
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
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Войти
      </a>
    );
  }
}
