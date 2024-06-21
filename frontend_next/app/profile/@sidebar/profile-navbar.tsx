"use client";
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

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small h-fit border-default-300 dark:border-default-400 shadow-md dark:bg-default-200">
    {children}
  </div>
);

export default function ProfileNavbar() {
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
