"use client";
import { User as NextUser } from "@nextui-org/user";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  CircleUser,
  Barcode,
  MessageSquareText,
  MessageCircleQuestion,
  LogOut,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCanAccess } from "@frontend_next/lib/can-access";
import { useMemo } from "react";

type DropdownItemType = React.ReactElement<typeof DropdownItem>;

export const UserDropDown = ({ session }: { session: Session }) => {
  const router = useRouter();
  const canEditProductsRequests = useCanAccess("products_requests.edit");
  let userData = session!.user!;
  const userName = [userData.first_name, userData.last_name]
    .filter((x) => x)
    .join(" ");
  let userLogin = "";
  if (userData.tg_username) {
    userLogin = userData.tg_username;
  } else if (userData.login) {
    userLogin = userData.login;
  } else if (userData.email) {
    userLogin = userData.email;
  }

  const dropDownItemsDynamic = useMemo(() => {
    const res = [
      {
        key: "profile",
        textValue: "Профиль",
        startContent: <CircleUser />,
        href: "/profile",
        onPress: () => router.push("/profile"),
      },
      {
        key: "my_products",
        textValue: "Мои продукты",
        startContent: <Barcode />,
        closeOnSelect: false,
        href: "/profile/products",
        as: Link,
        onPress: () => router.push("/profile/products"),
      },
      {
        key: "messages",
        textValue: "Сообщения",
        startContent: <MessageSquareText />,
        href: "/profile/messages",
        onPress: () => router.push("/profile/messages"),
      },
      {
        key: "requests",
        textValue: "Запросы",
        startContent: <MessageCircleQuestion />,
        href: "/profile/requests",
        onPress: () => router.push("/profile/requests"),
      },
    ];
    if (canEditProductsRequests) {
      res.push({
        key: "products_requests",
        textValue: "Запросы на продукты",
        startContent: <MessageCircleQuestion />,
        href: "/profile/products_requests",
        onPress: () => router.push("/profile/products_requests"),
      });
    }

    return res;
  }, [canEditProductsRequests, router]);
  return (
    <Dropdown placement="bottom" backdrop="blur">
      <DropdownTrigger>
        <NextUser
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
      <DropdownMenu aria-label="User Actions" variant="shadow">
        <DropdownSection showDivider>
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Профиль"
          >
            <p className="font-bold">Вошёл как</p>
            <p className="font-bold">{userLogin}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          {dropDownItemsDynamic.map((item) => (
            <DropdownItem
              key={item.key}
              textValue={item.textValue}
              startContent={item.startContent}
              href={item.href}
              as={item.as}
              onClick={item.onPress}
            >
              {item.textValue}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            textValue="Выйти"
            color="danger"
            className="text-danger"
            startContent={<LogOut />}
            onClick={() => signOut()}
          >
            Выйти
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
