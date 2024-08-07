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
import Image from "next/image";
import { useMediaQuery } from "@frontend_next/lib/hooks";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@frontend_next/components/ui/navigation-menu";
import CatalogMenu from "./CatalogMenu";
import { cn } from "@frontend_next/lib/utils";
import { HeaderSearchInput } from "./SearchInput";
import { Lato } from "next/font/google";
import { CurrencyToggler } from "@frontend_next/components/CurrencyToggler";

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
    label: "Юристы",
    href: "/lawyers",
  },
  {
    label: "Логисты",
    href: "/logistics",
  },
];

const lato = Lato({
  weight: "700",
  subsets: ["latin"],
});

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      // isBordered
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
        content: ["flex", "items-center", "justify-between"],
        wrapper: ["container"],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            className="font-bold text-inherit flex items-center space-x-2"
            href="/"
          >
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className={cn(["hidden md:block text-2xl", lato.className])}>
              TextileHub
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.href === "/catalog" ? (
                  <>
                    <NavigationMenuTrigger>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="border-0 shadow-lg">
                      <CatalogMenu />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "hover:bg-default-100"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </NavbarContent>

      <NavbarContent justify="end">
        <CurrencyToggler />
        <SignInButton />
        {/* <HeaderSearchInput /> */}

        {/* <SignInButton userData={userData} permissions={permissions!} /> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            isActive={pathname.startsWith(item.href)}
          >
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
