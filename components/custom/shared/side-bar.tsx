"use client";

import {
  Home,
  Inbox,
  Sailboat,
  ClipboardList,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "./user-dropdown";

const companyLogo = <Sailboat />;
const items = [
  {
    title: "Home",
    url: ROUTES.HOME,
    icon: Home,
  },
  {
    title: "leads",
    url: ROUTES.LEADS,
    icon: Inbox,
  },
  {
    title: "Itineraries",
    url: ROUTES.ITINERARY,
    icon: ClipboardList,
  },
  {
    title: "Quotations",
    url: ROUTES.QUOTATIONS,
    icon: FileText,
  },
];

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { open, openMobile } = useSidebar();
  const dropdownItems = [
    // { label: "Status" },
    { label: "My Profile", route: "/profile", icon: User },
    { label: "Settings", route: "/settings", icon: Settings },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        router.push(ROUTES.LOGOUT);
      },
    },
  ];
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        {open || openMobile ? (
          <span className="flex items-center gap-2 pl-2">
            {companyLogo}
            KingsLand Travels
          </span>
        ) : (
          <span className="mx-auto">{companyLogo}</span>
        )}
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      pathname === item.url ||
                      pathname.startsWith((item.url as string) + "/")
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground dark:focus:bg-primary dark:focus:text-primary-foreground"
                        : ""
                    }
                  >
                    <Link href={item.url as string}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdown DropDownItems={dropdownItems} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
