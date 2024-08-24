import { $isLoggedIn, $userData, logout } from "@frontend/src/store/auth";
import { useStore } from "@nanostores/react";
import { users } from "backend/drizzle/schema";
import { FaRegUserCircle, FaUsers, FaWpforms } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { InferSelectModel } from "drizzle-orm";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import {
  CircleUser,
  ClipboardList,
  LogOut,
  MessageCircleQuestion,
  MessageSquareText,
  Barcode,
} from "lucide-react";

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
      <Dropdown placement="bottom-start" backdrop="blur">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={
              userData.photo_url
                ? {
                    isBordered: true,
                    src: userData.photo_url,
                  }
                : undefined
            }
            className="transition-transform"
            name={userName}
            description={userLogin}
            isFocusable={true}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownSection showDivider>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Вошёл как</p>
              <p className="font-bold">{userLogin}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem
              key="profile"
              startContent={<CircleUser />}
              href="/profile"
            >
              Профиль
            </DropdownItem>

            <DropdownItem
              key="my_products"
              startContent={<Barcode />}
              href="/profile/products"
            >
              Мои продукты
            </DropdownItem>

            <DropdownItem
              key="messages"
              startContent={<MessageSquareText />}
              href="/profile/messages"
            >
              Сообщения
            </DropdownItem>

            <DropdownItem
              key="requests"
              startContent={<MessageCircleQuestion />}
              href="/profile/requests"
            >
              Обращения
            </DropdownItem>
            {permissions && permissions.includes("forms.list") && (
              <DropdownItem
                key="forms"
                startContent={<ClipboardList />}
                href="/profile/forms"
              >
                Формы
              </DropdownItem>
            )}
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key="logout"
              color="primary"
              startContent={<LogOut />}
              onClick={() => logout()}
            >
              Выйти
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
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
