"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@frontend_next/components/ui/navigation-menu";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    label: "Каталог",
    href: "/catalog",
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
    label: "Логин",
    href: "/login",
  },
  {
    label: "Производители",
    href: "/manufacturers",
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
  // return (
  //   <NavigationMenu>
  //     <NavigationMenuList>
  //       {menuItems.map((item) => (
  //         <NavigationMenuItem key={item.href}>
  //           <Link color="foreground" href={item.href} legacyBehavior passHref>
  //             <NavigationMenuLink
  //               className={navigationMenuTriggerStyle()}
  //               active={pathname.startsWith(item.href)}
  //             >
  //               {item.label}
  //             </NavigationMenuLink>
  //           </Link>
  //         </NavigationMenuItem>
  //       ))}
  //     </NavigationMenuList>
  //   </NavigationMenu>
  // );
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
        <NavbarItem>
          {/* <SignInButton userData={userData} permissions={permissions!} /> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
