"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { NavMenu } from "@/components/shared/Navbar/nav-menu";
import Image from "next/image";
import Link from "next/link";

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Link href={"/"} onClick={() => setOpen(false)}>
          <Image src={"/obeo.png"} alt="Logo" width={60} height={100} />
        </Link>

        <NavMenu
          orientation="vertical"
          className="mt-6  [&>div]:h-full w-full"
          onItemClick={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
