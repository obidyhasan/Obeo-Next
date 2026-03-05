"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const NavMenu = ({
  onItemClick,
  ...props
}: ComponentProps<typeof NavigationMenu> & { onItemClick?: () => void }) => {
  const pathname = usePathname();

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      // On home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other pages, navigate to home with hash
      window.location.href = `/#${sectionId}`;
    }
    onItemClick?.();
  };

  return (
    <NavigationMenu
      {...props}
      className={cn(
        props.orientation === "vertical" &&
          "max-w-none w-full items-start justify-start flex-col [&>div]:w-full ",
        props.className,
      )}
    >
      <NavigationMenuList
        className={cn(
          "space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start ",
          props.orientation === "vertical" &&
            "w-full items-start justify-start",
        )}
      >
        <NavigationMenuItem
          className={cn(props.orientation === "horizontal" && "w-full")}
        >
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              props.orientation === "vertical" && "w-full justify-start",
            )}
          >
            <Link href="/" onClick={(e) => { handleSectionClick(e, 'service'); onItemClick?.(); }}>
              Service
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(props.orientation === "horizontal" && "w-full")}
        >
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              props.orientation === "vertical" && "w-full justify-start",
            )}
          >
            <Link href="/" onClick={(e) => { handleSectionClick(e, 'product'); onItemClick?.(); }}>
              Product
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(props.orientation === "horizontal" && "w-full")}
        >
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              props.orientation === "vertical" && "w-full justify-start",
            )}
          >
            <Link href="/" onClick={(e) => { handleSectionClick(e, 'about'); onItemClick?.(); }}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={cn(props.orientation === "horizontal" && "w-full")}
        >
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              props.orientation === "vertical" && "w-full justify-start",
            )}
          >
            <Link href="/" onClick={(e) => { handleSectionClick(e, 'contact'); onItemClick?.(); }}>
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
