"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { SignInButton } from "@frontend_next/components/auth/SignInButton";

const menuItems = [
  {
    label: "Каталог",
    href: "/catalog",
  },
  {
    label: "Производители",
    href: "/manufacturers",
  },
  {
    label: "Заказчики",
    href: "/customers",
  },
  {
    label: "Юристы",
    href: "/lawyers",
  },
  {
    label: "Логисты",
    href: "/logistics",
  },
  {
    label: "Блог",
    href: "/blog",
  },
  {
    label: "Контакты",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Новости",
    href: "/news",
  },
  {
    label: " Политика конфиденциальности",
    href: "/privace",
  },

  {
    label: "Услуги",
    href: "/services",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            Brand
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname.startsWith(item.href)}
          >
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <SignInButton />
        {/* <SignInButton userData={userData} permissions={permissions!} /> */}
      </NavbarContent>
    </Navbar>
  );
}
