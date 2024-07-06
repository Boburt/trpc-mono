"use client";
import { useCanAccess } from "@frontend_next/lib/can-access";
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";
import {
  Barcode,
  CircleUser,
  LogOut,
  MessageCircleQuestion,
  MessageSquareText,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small h-fit border-default-300 dark:border-default-400 shadow-md dark:bg-default-200">
    {children}
  </div>
);

export default function ProfileNavbar() {
  const canEditProductsRequests = useCanAccess("products_requests.edit");

  const dropDownItemsDynamic = useMemo(() => {
    const res = [
      {
        key: "profile",
        textValue: "Профиль",
        startContent: <CircleUser />,
        href: "/profile",
        as: Link,
      },
      {
        key: "my_products",
        textValue: "Мои продукты",
        startContent: <Barcode />,
        closeOnSelect: false,
        href: "/profile/products",
        as: Link,
      },
      {
        key: "messages",
        textValue: "Сообщения",
        startContent: <MessageSquareText />,
        href: "/profile/messages",
        as: Link,
      },
      {
        key: "requests",
        textValue: "Запросы",
        startContent: <MessageCircleQuestion />,
        href: "/profile/requests",
        as: Link,
      },
    ];
    if (canEditProductsRequests) {
      res.push({
        key: "products_requests",
        textValue: "Запросы на продукты",
        startContent: <MessageCircleQuestion />,
        href: "/profile/products_requests",
        as: Link,
      });
    }

    return res;
  }, [canEditProductsRequests]);
  return (
    <ListboxWrapper>
      <Listbox variant="shadow" aria-label="Listbox menu with sections">
        <ListboxSection showDivider>
          <ListboxItem
            key="profile"
            href="/profile"
            startContent={<CircleUser />}
            as={Link}
          >
            Профиль
          </ListboxItem>
          <ListboxItem
            key="products"
            href="/profile/products"
            startContent={<Barcode />}
            as={Link}
          >
            Мои продукты
          </ListboxItem>
          <ListboxItem
            key="messages"
            href="/profile/messages"
            startContent={<MessageSquareText />}
            as={Link}
          >
            Сообщения
          </ListboxItem>
          <ListboxItem
            key="requests"
            href="/profile/requests"
            startContent={<MessageCircleQuestion />}
            as={Link}
          >
            Обращения
          </ListboxItem>
          {canEditProductsRequests && (
            <ListboxItem
              key="products_requests"
              href="/profile/products_requests"
              startContent={<MessageCircleQuestion />}
              as={Link}
            >
              Запросы на продукты
            </ListboxItem>
          )}
        </ListboxSection>
        <ListboxItem
          key="logout"
          href="/logout"
          startContent={<LogOut />}
          onClick={() => signOut()}
          color="danger"
          className="text-danger"
        >
          Выйти
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}
