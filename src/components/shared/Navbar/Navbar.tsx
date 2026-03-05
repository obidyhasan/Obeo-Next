import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/shared/Navbar/nav-menu";
import { NavigationSheet } from "@/components/shared/Navbar/navigation-sheet";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full  bg-white border-b">
        <nav className="w-full max-w-7xl mx-auto px-4">
          <div className=" flex items-center justify-between mx-auto py-3">
            <Link href={"/"}>
              <Image
                src={"/obeo.png"}
                alt="logo"
                width={70}
                height={70}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />

            <div className="flex items-center gap-3">
              <Link href={typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname.includes('localhost') ? 'localhost' : 'obeopms.com'}${window.location.port ? `:${window.location.port}` : ''}/login` : '/login'}>
                <Button variant={"outline"}>Hotel Login</Button>
              </Link>
              <Link href={typeof window !== 'undefined' ? `${window.location.protocol}//admin.${window.location.hostname.includes('localhost') ? 'localhost' : 'obeopms.com'}${window.location.port ? `:${window.location.port}` : ''}/admin/login` : '/admin/login'}>
                <Button >
                  Login
                </Button>
              </Link>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <NavigationSheet />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
