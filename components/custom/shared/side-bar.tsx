"use client";
import { Home, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import sideBarRoutes from "@/routes/side-bar-routes";
import Link from "next/link";
import { useState } from "react";
const companyLogo = "SERP DIGI SOLUTIONS";
const items = [
  {
    title: sideBarRoutes.at(0)?.name,
    url: sideBarRoutes.at(0)?.href,
    icon: Home,
  },
  {
    title: sideBarRoutes.at(1)?.name,
    url: sideBarRoutes.at(1)?.href,
    icon: Inbox,
  },
];

export default function AppSidebar() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{companyLogo}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      selectedItem === item.title
                        ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground dark:focus:bg-primary dark:focus:text-primary-foreground"
                        : ""
                    }
                  >
                    <Link
                      href={item.url as string}
                      onClick={() => setSelectedItem(item.title as string)}
                    >
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
    </Sidebar>
  );
}
