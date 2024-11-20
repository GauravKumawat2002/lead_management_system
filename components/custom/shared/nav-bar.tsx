"use client";
import { ROUTES } from "@/routes/routes";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeToken } from "@/lib/tokenStorage";

// userName will come from DB
const userName: string = "Gaurav Kumawat";
export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const dropdownItems = [
    { label: "Status" },
    { label: "My Profile", route: "/profile", icon: User },
    { label: "Settings", route: "/settings", icon: Settings },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        removeToken();
        router.push(ROUTES.LOGOUT);
      },
    },
  ];
  return (
    <header
      className={cn(
        `navbar ${state === "expanded" ? "navbar-shrinked" : "navbar-expanded"} `,
        className,
      )}
    >
      <nav className="flex items-center justify-end gap-4">
        <div className="jusity-start mr-auto flex items-center gap-4">
          <SidebarTrigger />
          {/* creating heading for Leads  */}
          {pathname === ROUTES.HOME && <GreetingTitle userName={userName} />}
          {pathname === ROUTES.LEADS && (
            <>
              <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
                Leads
              </h1>

              <Link href={"/leads/follow-up-leads"}>
                <Button className="font-semibold">Follow Up Lead</Button>
              </Link>
            </>
          )}
          {pathname === ROUTES.FOLLOW_UP_LEADS && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Follow Up Leads
            </h1>
          )}
          {pathname === ROUTES.NEW_LEADS && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Add New Lead
            </h1>
          )}
          {ROUTES.LEADS_DETAILS.test(pathname) && (
            <h1 className="inline text-xl font-bold text-gray-600 dark:text-gray-200">
              Lead Details
            </h1>
          )}
        </div>

        <Link href={"/notifications"}>
          <Bell />
        </Link>

        <ModeToggle />
        <UserDropdown DropDownItems={dropdownItems} />
      </nav>
    </header>
  );
}

const GreetingTitle = ({ userName }: { userName: string }) => {
  return (
    <h1 className="text-xl font-bold text-gray-600 dark:text-gray-200">
      <span className="text-base font-semibold text-primary">Great Day !</span>{" "}
      {userName}
    </h1>
  );
};

// things need to be in the dropdown
// - User Profile {route: /profile}
// - Settings {route: /settings} (will implement later)
// - Logout
// - Status (active, idle) (will implement later)

export function UserDropdown({
  className,
  DropDownItems,
}: {
  className?: string;
  DropDownItems: {
    label: string;
    route?: string;
    icon?: any;
    onClick?: () => void;
  }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("", className)}>
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {DropDownItems.map((item) => (
          <DropdownMenuItem key={item.label}>
            {item.route ? (
              <Link className="flex" href={item.route}>
                {item.icon && <item.icon />}
                <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
              </Link>
            ) : (
              <>
                {item.icon && <item.icon />}
                <DropdownMenuLabel onClick={item.onClick}>
                  {item.label}
                </DropdownMenuLabel>
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
